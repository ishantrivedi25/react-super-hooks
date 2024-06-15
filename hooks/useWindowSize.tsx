import { useState, useEffect } from "react";

interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

const isClient = typeof window === "object";

const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
    });

    useEffect(() => {
        if (!isClient) {
            return; // Do nothing if code is running on the server
        }

        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
