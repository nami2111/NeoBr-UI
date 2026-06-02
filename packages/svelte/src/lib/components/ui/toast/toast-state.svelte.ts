import { isBrowser } from "../../../utils/browser";

type ToastType = "default" | "success" | "error" | "warning";

export interface ToastOptions {
    title?: string;
    description: string;
    duration?: number;
    type?: ToastType;
}

export interface ToastItem extends ToastOptions {
    id: string;
}

class ToastManager {
    #toasts = $state<ToastItem[]>([]);

    get toasts() {
        return this.#toasts;
    }

    add(options: ToastOptions) {
        const id = crypto.randomUUID();
        const toast: ToastItem = {
            id,
            type: "default",
            duration: 3000,
            ...options,
        };

        this.#toasts.push(toast);

        if (isBrowser && toast.duration !== Infinity) {
            setTimeout(() => {
                this.dismiss(id);
            }, toast.duration);
        }

        return id;
    }

    dismiss(id: string) {
        this.#toasts = this.#toasts.filter((t) => t.id !== id);
    }

    success(description: string, options?: Omit<ToastOptions, "description" | "type">) {
        return this.add({ ...options, description, type: "success" });
    }

    error(description: string, options?: Omit<ToastOptions, "description" | "type">) {
        return this.add({ ...options, description, type: "error" });
    }

    warning(description: string, options?: Omit<ToastOptions, "description" | "type">) {
        return this.add({ ...options, description, type: "warning" });
    }
}

export const toast = new ToastManager();
