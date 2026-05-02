import { isBrowser } from "./browser";

let lockCount = 0;
const originalStyles: { overflow: string; paddingRight: string } = {
    overflow: "",
    paddingRight: "",
};

export function useScrollLock() {
    let locked = false;

    function lock() {
        if (!isBrowser || locked) return;
        locked = true;
        if (lockCount === 0) {
            originalStyles.overflow = document.body.style.overflow;
            originalStyles.paddingRight = document.body.style.paddingRight;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        }
        lockCount++;
    }

    function unlock() {
        if (!isBrowser || !locked) return;
        locked = false;
        lockCount = Math.max(0, lockCount - 1);
        if (lockCount === 0) {
            document.body.style.overflow = originalStyles.overflow;
            document.body.style.paddingRight = originalStyles.paddingRight;
        }
    }

    return { lock, unlock };
}
