<script lang="ts">
    import { createFormState, z } from "../../../utils/form-validation.svelte";

    let { onSubmit = async () => {} }: { onSubmit?: (values: unknown) => void | Promise<void> } =
        $props();

    const schema = z.object({
        email: z.string().email("Invalid email"),
        age: z.number().optional(),
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
