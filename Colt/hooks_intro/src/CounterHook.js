import React, { useState } from 'react';

export default function CounterHook() {
  const [count, addCount] = useState(0);
  const setCount = () => {
    addCount(count + 1);
  };
  return (
    <div>
      <h1>The Count is: {count}</h1>
      <button onClick={setCount}>add 1</button>
    </div>
  );
}
