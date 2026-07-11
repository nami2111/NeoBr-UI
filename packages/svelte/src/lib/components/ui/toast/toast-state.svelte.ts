import { isBrowser } from "../../../utils/browser";

type ToastType = "default" | "success" | "error" | "warning";

export interface ToastOptions {
    title?: string;
    description: string;
    duration?: number;
    type?: ToastType;
}

export interface ToastItem extends Omit<ToastOptions, "duration" | "type"> {
    id: string;
    duration: number;
    type: ToastType;
}

type ToastTimer = ReturnType<typeof setTimeout>;

export class ToastManager {
    #toasts = $state<ToastItem[]>([]);
    #timers = new Map<string, ToastTimer>();

    get toasts() {
        return this.#toasts;
    }

    add(options: ToastOptions) {
        const id = crypto.randomUUID();
        const toast: ToastItem = {
            ...options,
            id,
            type: options.type ?? "default",
            duration: options.duration ?? 3000,
        };

        this.#toasts.push(toast);

        if (isBrowser && toast.duration !== Infinity) {
            const timer = setTimeout(() => {
                this.dismiss(id);
            }, toast.duration);
            this.#timers.set(id, timer);
        }

        return id;
    }

    dismiss(id: string) {
        const timer = this.#timers.get(id);
        if (timer) {
            clearTimeout(timer);
            this.#timers.delete(id);
        }

        this.#toasts = this.#toasts.filter((t) => t.id !== id);
    }

    clear() {
        for (const timer of this.#timers.values()) {
            clearTimeout(timer);
        }

        this.#timers.clear();
        this.#toasts = [];
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
