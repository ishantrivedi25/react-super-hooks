import { useState, useRef, useEffect, MutableRefObject } from 'react';

const useHover = (): [MutableRefObject<HTMLElement | null>, boolean] => {
    const [isHovering, setIsHovering] = useState(false);

    const ref = useRef<HTMLElement | null>(null);

    const handleMouseOver = () => setIsHovering(true);

    const handleMouseOut = () => setIsHovering(false);

    useEffect(() => {
        const node = ref.current;

        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);

            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };
        }

    }, [ref.current]);

    return [ref, isHovering];
}

export default useHover;