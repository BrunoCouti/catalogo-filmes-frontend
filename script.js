// script.js

const API_BASE_URL = 'http://127.0.0.1:5000/filmes'; // URL base da sua API Flask

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayMovies(); // Carrega os filmes ao carregar a página

    const addMovieForm = document.getElementById('addMovieForm');
    if (addMovieForm) {
        addMovieForm.addEventListener('submit', handleAddMovie);
    }
});

async function fetchAndDisplayMovies() {
    const moviesListDiv = document.getElementById('moviesList');
    moviesListDiv.innerHTML = '<p>Carregando filmes...</p>';

    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const movies = await response.json();

        moviesListDiv.innerHTML = '';

        if (movies.length === 0) {
            moviesListDiv.innerHTML = '<p>Nenhum filme cadastrado ainda.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesListDiv.appendChild(movieCard);
        });

    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        moviesListDiv.innerHTML = '<p>Ocorreu um erro ao carregar os filmes: Failed to fetch</p>';
    }
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.setAttribute('data-id', movie.id);

    movieCard.innerHTML = `
        <h3>${movie.titulo}</h3>
        <p><strong>Diretor:</strong> ${movie.diretor}</p>
        <p><strong>Ano:</strong> ${movie.ano}</p>
        <p><strong>Gênero:</strong> ${movie.genero}</p>
        <button class="delete-btn" data-id="${movie.id}">Excluir</button>
    `;

    const deleteButton = movieCard.querySelector('.delete-btn');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => handleDeleteMovie(movie.id));
    }

    // Torna o card clicável para chamar a rota GET /filmes/<id> (ver detalhes)
    movieCard.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/${movie.id}`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar detalhes! Status: ${response.status}`);
            }
            const movieDetails = await response.json();
            alert(`Detalhes do Filme:\nID: ${movieDetails.id}\nTítulo: ${movieDetails.titulo}\nDiretor: ${movieDetails.diretor}\nAno: ${movieDetails.ano}\nGênero: ${movieDetails.genero}`);
            console.log('GET /filmes/:id chamado para:', movieDetails); // Para ver no console do navegador
        } catch (error) {
            console.error("Erro ao buscar detalhes do filme:", error);
            alert(`Ocorreu um erro ao buscar detalhes do filme: ${error.message}`);
        }
    });

    return movieCard;
}

async function handleDeleteMovie(id) {
    if (!confirm('Tem certeza que deseja excluir este filme?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir! Status: ${response.status}`);
        }

        const movieCardToRemove = document.querySelector(`.movie-card[data-id="${id}"]`);
        if (movieCardToRemove) {
            movieCardToRemove.remove();
        }
        alert('Filme excluído com sucesso!');
        fetchAndDisplayMovies();
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
        alert(`Ocorreu um erro ao excluir o filme: ${error.message}`);
    }
}

async function handleAddMovie(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const diretor = document.getElementById('diretor').value;
    const ano = parseInt(document.getElementById('ano').value);
    const genero = document.getElementById('genero').value;

    if (!titulo || !diretor || !ano || !genero) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const newMovie = {
        titulo,
        diretor,
        ano,
        genero
    };

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao adicionar filme! Status: ${response.status} - ${errorText}`);
        }

        const addedMovie = await response.json();
        alert('Filme adicionado com sucesso!');
        addMovieForm.reset();
        fetchAndDisplayMovies();

    } catch (error) {
        console.error("Erro ao adicionar filme:", error);
        alert(`Ocorreu um erro ao adicionar o filme: ${error.message}`);
    }
}