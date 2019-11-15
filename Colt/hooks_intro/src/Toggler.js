import React from 'react';
import useToggle from './hooks/useToggle';

export default function Toggler() {
  const [isHappy, toggleIsHappy] = useToggle();
  const [isInLove, toggleIsInLove] = useToggle(true);
  const [isBanana, toggleIsBanana] = useToggle(true);

  return (
    <div>
      <h1 onClick={toggleIsHappy}>{isHappy ? '🙂' : '🙁'}</h1>
      <h1 onClick={toggleIsInLove}>{isInLove ? '💖' : '💔'}</h1>
      <h1 onClick={toggleIsBanana}>{isBanana ? '🍌' : '🥝'}</h1>
    </div>
  );
}
