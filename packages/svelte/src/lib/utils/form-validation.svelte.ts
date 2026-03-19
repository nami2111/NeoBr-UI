/**
 * Form validation utilities using Zod schema validation.
 * Provides type-safe form handling with Neo-Brutalist styling.
 *
 * @note This file uses .svelte.ts extension to enable Svelte 5 runes.
 */
import { z } from "zod";

export type FormState<T extends z.ZodTypeAny> = {
    values: z.infer<T>;
    errors: Partial<Record<keyof z.infer<T>, string>>;
    touched: Partial<Record<keyof z.infer<T>, boolean>>;
    isValid: boolean;
    isSubmitting: boolean;
    isDirty: boolean;
};

export type FormOptions<T extends z.ZodTypeAny> = {
    schema: T;
    initialValues?: Partial<z.infer<T>>;
    onSubmit: (values: z.infer<T>) => void | Promise<void>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
};

/**
 * Creates a reactive form state with Zod validation.
 *
 * @example
 * ```svelte
 * <script>
 *   import { createFormState, z } from "@neobr/svelte/form";
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
 *
 * <form onsubmit={form.handleSubmit}>
 *   <FormItem>
 *     <FormLabel>Email</FormLabel>
 *     <Input bind:value={form.values.email} onblur={() => form.handleBlur("email")} />
 *     {#if form.errors.email}
 *       <FormMessage error>{form.errors.email}</FormMessage>
 *     {/if}
 *   </FormItem>
 * </form>
 * ```
 */
export function createFormState<T extends z.ZodObject>(options: FormOptions<T>) {
    const {
        schema,
        initialValues = {},
        onSubmit,
        validateOnChange = true,
        validateOnBlur = true,
    } = options;

    // Initialize values with initialValues or empty strings for all fields in the schema
    // This avoids "props_invalid_value" error when binding undefined to components with fallbacks
    const initialData = { ...(initialValues as any) };
    const shape = (schema as any).shape || {};
    for (const key in shape) {
        if (initialData[key] === undefined) {
            initialData[key] = "";
        }
    }

    // Initialize state with runes
    let values = $state<z.infer<T>>(initialData as z.infer<T>);
    let errors = $state<Partial<Record<keyof z.infer<T>, string>>>({});
    let touched = $state<Partial<Record<keyof z.infer<T>, boolean>>>({});
    let isSubmitting = $state(false);
    let isDirty = $state(false);

    // Derived state
    let isValid = $derived(Object.keys(errors).length === 0);

    /**
     * Validates a single field by name
     */
    function validateField(name: keyof z.infer<T>): string | null {
        try {
            const fieldSchema = (schema.shape as any)?.[name as string];
            if (fieldSchema) {
                fieldSchema.parse(values[name]);
            }
            return null;
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.issues[0]?.message || "Invalid value";
            }
            return null;
        }
    }

    /**
     * Validates all fields in the form
     */
    function validateAll(): boolean {
        const result = schema.safeParse(values);

        if (result.success) {
            errors = {};
            return true;
        } else {
            const newErrors: Partial<Record<keyof z.infer<T>, string>> = {};
            for (const error of result.error.issues) {
                const path = error.path[0] as keyof z.infer<T>;
                if (!newErrors[path]) {
                    newErrors[path] = error.message;
                }
            }
            errors = newErrors;
            return false;
        }
    }

    /**
     * Handles field blur event
     */
    function handleBlur(name: keyof z.infer<T>): void {
        touched[name] = true;

        if (validateOnBlur) {
            const error = validateField(name);
            if (error) {
                errors[name] = error;
            } else {
                delete errors[name];
            }
        }
    }

    /**
     * Handles input change event
     */
    function handleChange(name: keyof z.infer<T>, value: unknown): void {
        values[name] = value as z.infer<T>[keyof z.infer<T>];
        isDirty = true;

        if (validateOnChange && touched[name]) {
            const error = validateField(name);
            if (error) {
                errors[name] = error;
            } else {
                delete errors[name];
            }
        }
    }

    /**
     * Sets a field value programmatically
     */
    function setFieldValue(name: keyof z.infer<T>, value: z.infer<T>[keyof z.infer<T>]): void {
        values[name] = value;
        isDirty = true;
    }

    /**
     * Sets a field error programmatically
     */
    function setFieldError(name: keyof z.infer<T>, error: string): void {
        errors[name] = error;
    }

    /**
     * Clears a field error
     */
    function clearFieldError(name: keyof z.infer<T>): void {
        delete errors[name];
    }

    /**
     * Resets the form to initial values
     */
    function reset(): void {
        values = initialData as z.infer<T>;
        errors = {};
        touched = {};
        isSubmitting = false;
        isDirty = false;
    }

    /**
     * Form submit handler
     */
    async function handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        isSubmitting = true;

        // Mark all fields as touched
        const allFields = Object.keys(schema.shape || {}) as (keyof z.infer<T>)[];
        for (const field of allFields) {
            touched[field] = true;
        }

        // Validate all fields
        if (!validateAll()) {
            isSubmitting = false;
            return;
        }

        try {
            await onSubmit(values);
        } finally {
            isSubmitting = false;
        }
    }

    return {
        // State
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

        // Methods
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

// Re-export zod for convenience
export { z };
