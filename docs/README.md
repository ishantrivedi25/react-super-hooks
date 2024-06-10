# Documentation

## Index

- [useFetch](#usefetch)
- [useToggle](#usetoggle)
- [usePrevious](#useprevious)

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

`currentState` (_any_) : The current value (This will be the previous value in the next render).

### Return value

`previousState` (_any_) : The previous state.

</br>
