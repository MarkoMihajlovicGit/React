import React, { useState, useEffect } from 'react';

export default function Clicker() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You Clicked ${count} times`;
  });
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Clicker{count}</button>
    </div>
  );
}
