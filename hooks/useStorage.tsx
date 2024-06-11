import { useCallback, useState, useEffect, Dispatch, SetStateAction } from "react";

type StorageObject = {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
};

type SetValue<T> = Dispatch<SetStateAction<T | undefined>>;

const isClient = typeof window === 'object';

const useStorage = <T,>(key:string, defaultValue: T, storageObject: StorageObject):[T | undefined, SetValue<T>, () => void] => {
    const [value, setValue] = useState(() => {
        if (!isClient) return defaultValue;

        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof defaultValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (!isClient) return;

        if (value === undefined) return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}

const useLocalStorage = <T,>(key:string, defaultValue:T): [T | undefined, SetValue<T>, () => void] => {
    return useStorage(key, defaultValue, isClient ? window.localStorage:{
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
    });
}

const useSessionStorage = <T,>(key:string, defaultValue:T): [T | undefined, SetValue<T>, () => void] => {
    return useStorage(key, defaultValue, isClient ? window.sessionStorage:{
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
    });
}

export { useLocalStorage, useSessionStorage };