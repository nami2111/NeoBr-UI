<script lang="ts">
    import { createFormState } from "../../../utils/form-validation.svelte";
    import { z } from "zod";

    let {
        onSubmit = async () => {},
        validateOnChange = true,
        validateOnBlur = true,
    }: {
        onSubmit?: (values: unknown) => void | Promise<void>;
        validateOnChange?: boolean;
        validateOnBlur?: boolean;
    } = $props();

    const schema = z.object({
        email: z.string().email("Invalid email"),
        age: z.number().optional(),
        joined: z.date().optional(),
        profile: z.object({
            name: z.string().min(2, "Name is too short"),
        }),
    });

    const initialProfile = { name: "Neo" };
    const form = createFormState({
        schema,
        initialValues: {
            email: "neo@example.com",
            profile: initialProfile,
        },
        validateOnChange,
        validateOnBlur,
        onSubmit: (values) => onSubmit(values),
    });
</script>

<p data-testid="email">{form.values.email}</p>
<p data-testid="age-type">{typeof form.values.age}</p>
<p data-testid="profile-name">{form.values.profile.name}</p>
<p data-testid="email-error">{form.errors.email ?? ""}</p>
<p data-testid="profile-error">{form.errors.profile ?? ""}</p>
<p data-testid="is-dirty">{String(form.isDirty)}</p>
<p data-testid="is-valid">{String(form.isValid)}</p>
<p data-testid="is-submitting">{String(form.isSubmitting)}</p>
<p data-testid="submit-error">{form.submitError ? "submit failed" : ""}</p>
<p data-testid="initial-profile-name">{initialProfile.name}</p>

<button type="button" onclick={() => form.handleChange("email", "invalid")}>Invalid Email</button>
<button type="button" onclick={() => form.handleChange("email", "ok@example.com")}>
    Valid Email
</button>
<button type="button" onclick={() => form.setFieldError("email", "Already taken")}>
    Server Error
</button>
<button type="button" onclick={() => form.handleChange("joined", new Date(2026, 0, 2))}>
    Set Joined Date
</button>
<button type="button" onclick={() => form.handleBlur("email")}>Blur Email</button>
<button type="button" onclick={() => form.setFieldValue("profile", { name: "A" })}>
    Invalid Profile
</button>
<button type="button" onclick={() => form.validateAll()}>Validate All</button>
<button type="button" onclick={() => (form.values.profile.name = "Mutated")}>Mutate Profile</button>
<button type="button" onclick={() => form.reset()}>Reset</button>
<form onsubmit={form.handleSubmit}>
    <button type="submit">Submit</button>
</form>
