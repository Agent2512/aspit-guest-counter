import { useEffect, useState } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function getSize(width: number) {

    if (width < 600) {
        return "small"
    }
    else if (width < 950) {
        return "medium"
    }
    else if (width < 1100) {
        return "big"
    }
    else {
        return "more"
    }
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<{
        width: number
        height: number
    }>({ height: 0, width: 0 });

    const [size, setSize] = useState<"small" | "medium" | "big" | "more">("more")




    useEffect(() => {
        function handleResize() {
            const { width, height } = getWindowDimensions()
            setWindowDimensions({ width, height });
            setSize(getSize(width))
        }

        const { width, height } = getWindowDimensions()
        setWindowDimensions({ width, height });
        setSize(getSize(width))

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { ...windowDimensions, size };
}

