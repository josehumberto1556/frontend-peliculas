import { type Pelicula } from '../types';

interface Props {
  pelicula: Pelicula;
  onViewDetails: (id: number) => void;
}

function MovieCard({ pelicula, onViewDetails }: Props) {
  return (
    <div className="movie-card">
      <img 
        src={pelicula.posterUrl} 
        alt={`Póster de ${pelicula.title}`} 
        className="movie-poster" 
        loading="lazy" // Mejora el rendimiento de carga de imágenes
      />
      <div className="movie-info">
        <h3>{pelicula.title}</h3>
        <p className="movie-genre">{pelicula.genre}</p>
      </div>
      <button className="view-details-btn" onClick={() => onViewDetails(pelicula.id)}>
        Ver Detalles
      </button>
    </div>
  );
}

export default MovieCard;