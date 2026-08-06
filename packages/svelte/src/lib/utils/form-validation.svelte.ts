/**
 * Form validation utilities using Zod schema validation.
 * Provides type-safe form handling with Neo-Brutalist styling.
 *
 * @note This file uses .svelte.ts extension to enable Svelte 5 runes.
 */
import { z } from "zod";

type FormSchema = z.ZodObject<z.ZodRawShape>;
type FormValues<T extends FormSchema> = z.infer<T>;
type FormFieldName<T extends FormSchema> = Extract<keyof FormValues<T>, string>;
type FormFieldErrors<T extends FormSchema> = Partial<Record<FormFieldName<T>, string>>;
type FormTouched<T extends FormSchema> = Partial<Record<FormFieldName<T>, boolean>>;

export type FormState<T extends FormSchema> = {
    values: FormValues<T>;
    errors: FormFieldErrors<T>;
    touched: FormTouched<T>;
    isValid: boolean;
    isSubmitting: boolean;
    isDirty: boolean;
    submitError: unknown;
};

export type FormOptions<T extends FormSchema> = {
    schema: T;
    initialValues?: Partial<FormValues<T>>;
    onSubmit: (values: FormValues<T>) => void | Promise<void>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
};

/**
 * Creates a reactive form state with Zod validation.
 *
 * @example
 * ```svelte
 * <script>
 *   import { createFormState } from "@neobr/svelte/form";
 *   import { z } from "zod";
 *
 *   const schema = z.object({
 *     email: z.string().email("Invalid email"),
 *     password: z.string().min(8, "Password must be at least 8 characters")
 *   });
 *
 *   const form = createFormState({
 *     schema,
 *     onSubmit: async (values) => {
 *       await submitForm(values);
 *     }
 *   });
 * </script>
 * ```
 */
export function createFormState<T extends FormSchema>(options: FormOptions<T>) {
    const {
        schema,
        initialValues = {},
        onSubmit,
        validateOnChange = true,
        validateOnBlur = true,
    } = options;

    const shape = schema.shape;
    const fieldNames = Object.keys(shape) as FormFieldName<T>[];
    const createInitialValues = () => {
        const next = cloneValue(initialValues) as Partial<FormValues<T>> & Record<string, unknown>;
        const nextByKey = next as Record<string, unknown>;

        for (const key of fieldNames) {
            if (nextByKey[key] === undefined && shape[key] instanceof z.ZodString) {
                nextByKey[key] = "";
            }
        }

        return next as FormValues<T>;
    };

    let values = $state<FormValues<T>>(createInitialValues());
    let errors = $state<FormFieldErrors<T>>({});
    let touched = $state<FormTouched<T>>({});
    let isSubmitting = $state(false);
    let isDirty = $state(false);
    let submitError = $state<unknown>(null);

    let isValid = $derived(Object.keys(errors).length === 0);

    function validateField(name: FormFieldName<T>): string | null {
        try {
            const fieldSchema = shape[name] as z.ZodType | undefined;
            if (fieldSchema) fieldSchema.parse(values[name]);
            return null;
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.issues[0]?.message || "Invalid value";
            }

            // Never mask an unexpected bug as a valid field.
            throw error;
        }
    }

    function validateAll(): boolean {
        const result = schema.safeParse(values);

        if (result.success) {
            errors = {};
            return true;
        }

        const newErrors: FormFieldErrors<T> = {};
        for (const issue of result.error.issues) {
            const path = issue.path[0];
            if (typeof path !== "string") continue;

            const field = path as FormFieldName<T>;
            if (!newErrors[field]) newErrors[field] = issue.message;
        }

        errors = newErrors;
        return false;
    }

    function handleBlur(name: FormFieldName<T>): void {
        touched[name] = true;
        // Clear stale errors (incl. server-set ones) so a corrected field
        // doesn't keep showing an outdated message when blur validation is off.
        delete errors[name];

        if (validateOnBlur) {
            const error = validateField(name);
            if (error) {
                errors[name] = error;
            }
        }
    }

    function handleChange(name: FormFieldName<T>, value: FormValues<T>[FormFieldName<T>]): void {
        values[name] = value;
        isDirty = true;
        // Clear stale errors (incl. server-set ones); re-validation below
        // re-applies a fresh error when the new value is still invalid.
        delete errors[name];

        if (validateOnChange) {
            const error = validateField(name);
            if (error) {
                errors[name] = error;
            }
        }
    }

    function setFieldValue(name: FormFieldName<T>, value: FormValues<T>[FormFieldName<T>]): void {
        values[name] = value;
        isDirty = true;
        delete errors[name];
    }

    function setFieldError(name: FormFieldName<T>, error: string): void {
        errors[name] = error;
    }

    function clearFieldError(name: FormFieldName<T>): void {
        delete errors[name];
    }

    function reset(): void {
        values = createInitialValues();
        errors = {};
        touched = {};
        isSubmitting = false;
        isDirty = false;
        submitError = null;
    }

    async function handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        isSubmitting = true;
        submitError = null;

        for (const field of fieldNames) {
            touched[field] = true;
        }

        if (!validateAll()) {
            isSubmitting = false;
            return;
        }

        try {
            await onSubmit(cloneValue(values));
        } catch (error) {
            submitError = error;
        } finally {
            isSubmitting = false;
        }
    }

    return {
        get values() {
            return values;
        },
        get errors() {
            return errors;
        },
        get touched() {
            return touched;
        },
        get isValid() {
            return isValid;
        },
        get isSubmitting() {
            return isSubmitting;
        },
        get isDirty() {
            return isDirty;
        },
        get submitError() {
            return submitError;
        },
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldError,
        clearFieldError,
        validateField,
        validateAll,
        reset,
    };
}

function cloneValue<T>(value: T): T {
    try {
        // Plain (non-reactive) data — e.g. `initialValues`.
        return structuredClone(value);
    } catch {
        // `$state` proxies can't be structured-cloned. `$state.snapshot` returns
        // a plain deep copy that preserves Dates, BigInts and `undefined` keys —
        // the old JSON fallback silently dropped all three.
        return $state.snapshot(value) as T;
    }
}
