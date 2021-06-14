import { useEffect, useState } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [size, setSize] = useState<"small" | "medium" | "big" | "more">("more")

    function getSize() {
        let { width } = getWindowDimensions()

        if (width < 600) {
            setSize("small")
        }
        else if (width < 950) {
            setSize("medium")
        }
        else if (width < 1100) {
            setSize("big")
        }
        else {
            setSize("more")
        }
    }
    

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }




        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { ...windowDimensions, size };
}

