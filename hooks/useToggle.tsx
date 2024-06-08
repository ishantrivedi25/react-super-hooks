import { useState } from "react";

type ToggleFunction = (value?: boolean) => void;

const useToggle = (defaultValue: boolean) : [boolean, ToggleFunction] => {
    const [value, setValue] = useState(defaultValue);

    const toggleValue: ToggleFunction = (value?: boolean) => {
        setValue(currentValue => (typeof value === "boolean" ? value : !currentValue));
    };

    return [value, toggleValue];
};

export default useToggle;