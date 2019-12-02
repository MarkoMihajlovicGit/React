import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SWMovies() {
  const [number, setNumber] = useState(1);
  const [movie, setMovie] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://swapi.co/api/films/${number}/`);
      setMovie(response.data);
    }
    fetchData();
  }, [number]);

  const options = [1, 2, 3, 4, 5, 6, 7];
  let optionsSelected = options.map(option => {
    return (
      <option value={option} key={option}>
        {option}
      </option>
    );
  });

  return (
    <div>
      <h1>Pick a movie</h1>
      <h4>You chose {movie.title}</h4>
      <p>{movie.opening_crawl}</p>
      <select value={number} onChange={e => setNumber(e.target.value)}>
        {optionsSelected}
      </select>
    </div>
  );
}
