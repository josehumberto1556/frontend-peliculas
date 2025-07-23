import React, { useState, useEffect } from 'react';

// Interfaz para los detalles de la película (puede ser la misma que Pelicula o más extensa)
interface PeliculaDetail {
  id: number;
  title: string;
  genre: string;
  director: string;
  releaseYear: number;
  posterUrl: string;
  // Añade aquí cualquier otro campo detallado que tu backend pueda proporcionar
  // Por ejemplo: description?: string; cast?: string[];
}

interface Props {
  movieId: number;
  onClose: () => void;
}

function MovieDetail({ movieId, onClose }: Props) {
  const [movie, setMovie] = useState<PeliculaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL: string = import.meta.env.VITE_APP_API_URL || 'http://localhost:4000';

  // Efecto para cargar los detalles de una película específica
  useEffect(() => {
    setLoading(true);
    setError(null); // Limpiar errores previos
    fetch(`${API_BASE_URL}/peliculas/${movieId}`)
    //local
    // fetch(`/api/peliculas/${movieId}`) // <--- ¡AJUSTA ESTA URL SI TU BACKEND ES DIFERENTE!
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar detalles de película:", err);
        setError(err.message || 'No se pudieron cargar los detalles de la película.');
        setLoading(false);
      });
  }, [movieId]); // Se ejecuta cada vez que cambia el movieId

  // Renderizado condicional para estados de carga, error o película no encontrada
  if (loading) {
    return (
      <div className="movie-detail-overlay">
        <div className="movie-detail-content">Cargando detalles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail-overlay">
        <div className="movie-detail-content">
          <p>Error al cargar detalles: {error}</p>
          <button onClick={onClose} className="close-btn-bottom">Cerrar</button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail-overlay">
        <div className="movie-detail-content">
          <p>Película no encontrada.</p>
          <button onClick={onClose} className="close-btn-bottom">Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-overlay">
      <div className="movie-detail-content">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>{movie.title}</h2>
        <img 
          src={movie.posterUrl} 
          alt={`Póster de ${movie.title}`} 
          className="movie-detail-poster" 
        />
        <p><strong>Género:</strong> {movie.genre}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Año de Lanzamiento:</strong> {movie.releaseYear}</p>
        {/* Aquí puedes añadir más detalles si los tienes en PeliculaDetail */}
      </div>
    </div>
  );
}

export default MovieDetail;