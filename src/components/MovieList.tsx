import React from 'react';
import MovieCard from './MovieCard';
import { type Pelicula } from '../types';

interface Props {
  peliculas: Pelicula[];
  onViewDetails: (id: number) => void;
}

function MovieList({ peliculas, onViewDetails }: Props) {
  return (
    <div className="movie-list-container">
      {peliculas.map(pelicula => (
        <MovieCard 
          key={pelicula.id} 
          pelicula={pelicula} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
}

export default MovieList;