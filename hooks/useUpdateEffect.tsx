import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useUpdateEffect = (effect: EffectCallback, dependencies: DependencyList = []) => {
    const initialMountRef = useRef(true);

    useEffect(() => {
        if (initialMountRef.current) {
            initialMountRef.current = false;
        } else {
            return effect();
        }
    }, dependencies);
};

export default useUpdateEffect;