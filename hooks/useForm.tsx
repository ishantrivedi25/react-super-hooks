import { ChangeEvent, FormEvent, useState } from "react";

type FormValues = Record<string, string>;

interface FormActions {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event?: FormEvent<HTMLFormElement>) => void;
    values: FormValues;
}

const useForm = (initialValues: FormValues, callback: () => void): FormActions => {
    const [values, setValues] = useState(initialValues);

    const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        callback();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setValues((values: FormValues) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
    };
};

export default useForm;
