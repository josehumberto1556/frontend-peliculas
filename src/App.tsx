import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MovieDetail from './components/MovieDetail';
import type { Pelicula } from './types';
import './App.css'; 
function App() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para cargar las películas cuando el componente se monta
  useEffect(() => {
    setLoading(true);
    setError(null); // Limpiar errores previos
    fetch('/api/peliculas') // <--- ¡AJUSTA ESTA URL SI TU BACKEND ES DIFERENTE!
      .then(response => {
        if (!response.ok) {
          // Si la respuesta HTTP no es exitosa (ej. 404, 500), lanzamos un error
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPeliculas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar películas:", err);
        setError(err.message || 'No se pudieron cargar las películas.');
        setLoading(false);
      });
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  // Función para manejar la búsqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filtrar películas basándose en el término de búsqueda
  const filteredMovies = peliculas.filter(pelicula =>
    pelicula.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para mostrar los detalles de una película específica
  const handleViewDetails = (id: number) => {
    setSelectedMovieId(id);
  };

  // Función para cerrar la vista de detalles
  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>Listado de Películas</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main className="portfolio-main">
        {loading ? (
          <div className="loading-message">Cargando películas...</div>
        ) : error ? (
          <div className="error-message">Error al cargar las películas: {error}</div>
        ) : (
          <>
            {/* Si no hay películas filtradas, mostrar un mensaje */}
            {filteredMovies.length === 0 && searchTerm !== '' ? (
              <div className="no-results-message">No se encontraron películas para "{searchTerm}".</div>
            ) : filteredMovies.length === 0 && searchTerm === '' ? (
              <div className="no-results-message">No hay películas disponibles.</div>
            ) : (
              <MovieList peliculas={filteredMovies} onViewDetails={handleViewDetails} />
            )}
            
            {/* Mostrar el componente de detalles si hay una película seleccionada */}
            {selectedMovieId && (
              <MovieDetail movieId={selectedMovieId} onClose={handleCloseDetails} />
            )}
          </>
        )}
      </main>
      <footer className="portfolio-footer">
        <p>&copy; {new Date().getFullYear()} Listado de Películas</p>
      </footer>
    </div>
  );
}

export default App;