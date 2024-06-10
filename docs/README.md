# Documentation

## Index

- [useFetch](#usefetch)
- [useToggle](#usetoggle)
- [usePrevious](#useprevious)
- [useForm](#useform)
- [useHover](#usehover)
- [useUpdateEffect](#useupdateeffect)
- [useOnClickOutside](#useonclickoutside)

## useFetch

Manages data fetching within components

### Usage

```jsx
import React, { useState } from "react";
import { useFetch } from "react-super-hooks";

const FetchComponent = () => {
  const [id, setId] = useState(1);
  const { data, error, loading } = useFetch(
    `https://api.example.com/data/${id}`,
    [id]
  );

  return (
    <div className="wrapper">
      <button onClick={() => setId((currentId) => currentId + 1)}>
        Call API with id: {id + 1}
      </button>
      <div>Loading: {loading.toString()}</div>
      <div>Error: {JSON.stringify(error, null, 2)}</div>
      <div>Data: {JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

export default FetchComponent;
```

### Parameters

1. `url` (_string_): The URL from which to fetch data.
2. `dependencies` (_array_): An optional array of dependencies, The effect will re-run if any of these dependencies change.

### Return value

`{ data, error, loading }`

1. `data` (_any_): fetched data from a specified URL.
2. `error` (_Error_): any errors encountered during the fetch.
3. `loading` (_boolean_): loading status during the fetch.

</br>

## useToggle

Handles boolean state toggling in components

### Usage

```jsx
import React from "react";
import { useToggle } from "react-super-hooks";

const ToggleComponent = () => {
  const [isPizza, toggleIsPizza] = useToggle(true);

  return (
    <div>
      <p>{`Do you like pizza? ${isPizza ? "Yes" : "No"}`}</p>
      <button onClick={toggleIsPizza}>Toggle</button>
    </div>
  );
};

export default ToggleComponent;
```

### Parameters

1. `initialValue` (_boolean_) : Initial value of the state.

### Return value

`[state, toggleFunction]`

1. `state` (_boolean_) : The booelan state.
2. `toggleFunction` (_function_) : Function to toggle the state value.

</br>

## usePrevious

Tracks the previous value of a state

### Usage

```jsx
import React, { useState } from "react";
import { usePrevious } from "react-super-hooks";

function PreviousComponent() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div className="wrapper">
      <h3>
        Now: {count}, before: {prevCount}
      </h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default PreviousComponent;
```

### Parameters

1. `currentState` (_any_) : The current value (This will be the previous value in the next render).

### Return value

1. `previousState` (_any_) : The previous state.

</br>

## useForm

Simplifies form state management

### Usage

```jsx
import React from "react";
import { useForm } from "react-super-hooks";

const FormComponent = () => {
  const { values, handleChange, handleSubmit } = useForm(
    { username: "", password: "" },
    () => {
      console.log("Credentials: ", values);
    }
  );

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username:</span>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
```

### Parameters

1. `initialValues` (_object_): An object containing the initial values for the form fields.
2. `callback` (_function_): A callback function that is called when the form is submitted.

### Return value

1. `values` (_object_): An object containing the current values of the form fields.
2. `handleChange` (_function_): A function to handle changes to the form fields. This function updates the corresponding field value in the values object.
3. `handleSubmit` (_function_): A function to handle form submission.

## useHover

Detects whether an element is being hovered over

### Usage

```jsx
import React from "react";
import { useHover } from "react-super-hooks";

const HoverComponent = () => {
  const [hoverRef, isHovering] = useHover();

  return (
    <div className="wrapper">
      <div ref={hoverRef}>{isHovering ? "Hovering" : "Not hovering"}</div>
    </div>
  );
};

export default HoverComponent;
```

### Parameters

The `useHover` hook does not accept any parameters

### Return value

1. `hoverRef ` (_ref_): A ref object that should be attached to the element you want to monitor for hover events.
2. `isHovering` (_boolean_): A boolean value indicating whether the mouse is currently hovering over the specified element.

## useUpdateEffect

Executes an effect only after the first render

### Usage

```jsx
import React, { useState } from "react";
import { useUpdateEffect } from "react-super-hooks";

const UpdateEffectComponent = () => {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    console.log("Alert: ", count);
  }, [count]);

  return (
    <div className="wrapper">
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};

export default UpdateEffectComponent;
```

### Parameters

1. `effect` (_function_): A function to be executed after every update, excluding the initial render.
2. `dependencies` (_array_): An optional array of dependencies. The effect will only re-run if one of these dependencies has changed since the previous render.

### Return value

The `useUpdateEffect` hook does not return any value.

## useOnClickOutside

Detects clicks that occur outside a specified element

### Usage

```jsx
import React, { useState, useRef } from "react";
import { useOnClickOutside } from "react-super-hooks";

const ClickOutSideComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="wrapper">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle menu</button>
      {isOpen && (
        <ul ref={ref}>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>
      )}
    </div>
  );
};

export default ClickOutSideComponent;
```

### Parameters

1. `ref` (_ref_): A React ref object that is attached to the element you want to monitor for outside clicks.
2. `handler` (_function_): A callback function that is called when a click outside of the specified element is detected.

### Return value

The `useOnClickOutside` hook does not return any value.

</br>
