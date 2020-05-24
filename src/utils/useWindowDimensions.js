import { useEffect, useState } from 'react';

function calculateState(width) {
    if (576 >= width) return 'sm';
    if (768 >= width) return 'md';
    if (992 >= width) return 'lg';
    if (1200 <= width) return 'xl';
}

function getWindowDimensionsAndState() {
    const { innerWidth: width, innerHeight: height } = window;
    let state = calculateState(width)
    return {
        width,
        height,
        state,
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensionsAndState());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensionsAndState());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions;
}