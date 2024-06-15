import { useCallback, useState, useEffect, Dispatch, SetStateAction } from "react";

interface StorageObject {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
type SetValue<T> = Dispatch<SetStateAction<T>>;

const isClient = typeof window === "object";

const useStorage = <TDefault, TStored>(
    key: string,
    defaultValue: TDefault,
    storageObject: StorageObject,
): [TStored | TDefault | null, SetValue<TStored | TDefault | null>, () => void] => {
    const [value, setValue] = useState<TStored | TDefault | null>(() => {
        if (!isClient) return defaultValue;

        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) {
            try {
                return JSON.parse(jsonValue) as TStored;
            } catch {
                return defaultValue;
            }
        }

        if (typeof defaultValue === "function") {
            return (defaultValue as () => TDefault)();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (!isClient) return;

        if (value === null) {
            storageObject.removeItem(key);
        } else {
            storageObject.setItem(key, JSON.stringify(value));
        }
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(null);
    }, []);

    return [value, setValue, remove];
};

const useLocalStorage = <TDefault, TStored>(
    key: string,
    defaultValue: TDefault,
): [TDefault | TStored | null, SetValue<TDefault | TStored | null>, () => void] => {
    return useStorage(
        key,
        defaultValue,
        isClient
            ? window.localStorage
            : {
                  getItem: () => null,
                  setItem: () => {},
                  removeItem: () => {},
              },
    );
};

const useSessionStorage = <TDefault, TStored>(
    key: string,
    defaultValue: TDefault,
): [TDefault | TStored | null, SetValue<TDefault | TStored | null>, () => void] => {
    return useStorage(
        key,
        defaultValue,
        isClient
            ? window.sessionStorage
            : {
                  getItem: () => null,
                  setItem: () => {},
                  removeItem: () => {},
              },
    );
};

export { useLocalStorage, useSessionStorage };
