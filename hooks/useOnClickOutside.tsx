import { RefObject, useEffect } from "react";

const isClient = typeof window === "object";

const useOnClickOutside = (
    ref: RefObject<HTMLElement> | undefined,
    handler: (event: MouseEvent | TouchEvent) => void,
) => {
    useEffect(() => {
        if (!isClient) {
            return;
        }

        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref?.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
