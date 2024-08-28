document.addEventListener('DOMContentLoaded', () => {
    const moviesList = document.getElementById('movies-list');
    const movieDetails = document.getElementById('movie-details');

    // Fetch and display all movies
    document.getElementById('get-movies-btn').addEventListener('click', () => {
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(data => {
                moviesList.innerHTML = ''; // Clear previous content
                data.forEach(movie => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${movie.id} - ${movie.name}`;
                    listItem.classList.add('list-group-item');
                    listItem.setAttribute('data-id', movie.id);
                    moviesList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching movies:', error));
    });

    // Fetch and display movie details by ID
    document.getElementById('get-movie-btn').addEventListener('click', () => {
        const movieId = document.getElementById('movie-id-input').value;
        if (movieId) {
            fetch(`http://localhost:8080/api/movies/${movieId}`)
                .then(response => response.json())
                .then(data => {
                    displayMovieDetails(data);
                })
                .catch(error => console.error('Error fetching movie details:', error));
        } else {
            alert('Please enter a valid movie ID');
        }
    });

    // Event listener to handle clicks on movie items for details
    moviesList.addEventListener('click', (event) => {
        if (event.target && event.target.nodeName === 'LI') {
            const movieId = event.target.getAttribute('data-id');
            fetchMovieDetails(movieId);
        }
    });

    function fetchMovieDetails(movieId) {
        fetch(`http://localhost:8080/api/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                displayMovieDetails(data);
            })
            .catch(error => console.error('Error fetching movie details:', error));
    }

    function displayMovieDetails(movie) {
        movieDetails.innerHTML = `
            <h4>Movie Details</h4>
            <p><strong>Name:</strong> ${movie.name}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Release Date:</strong> ${new Date(movie.releaseDate).toLocaleDateString()}</p>
            <p><strong>Link:</strong> <a href="${movie.link}" target="_blank">${movie.link}</a></p>
        `;
    }

    // Add new movie
    document.getElementById('add-movie-btn').addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.getElementById('add-movie-form');
        const formData = new FormData(form);
        const movie = {};
        formData.forEach((value, key) => {
            movie[key] = value;
        });

        fetch('http://localhost:8080/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        .then(response => response.json())
        .then(data => {
            alert('Movie added successfully!');
            form.reset();
        })
        .catch(error => console.error('Error adding movie:', error));
    });

    // Update movie
    document.getElementById('update-movie-btn').addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = document.getElementById('update-movie-id-input').value;
        if (!movieId) {
            alert('Please enter a valid movie ID');
            return;
        }

        const form = document.getElementById('update-movie-form');
        const formData = new FormData(form);
        const movie = {};
        formData.forEach((value, key) => {
            movie[key] = value;
        });

        fetch(`http://localhost:8080/api/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        .then(response => response.json())
        .then(data => {
            alert('Movie updated successfully!');
            form.reset();
        })
        .catch(error => console.error('Error updating movie:', error));
    });

    // Delete movie
    document.getElementById('delete-movie-btn').addEventListener('click', () => {
        const movieId = document.getElementById('delete-movie-id-input').value;
        if (movieId) {
            fetch(`http://localhost:8080/api/movies/${movieId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('Movie deleted successfully!');
            })
            .catch(error => console.error('Error deleting movie:', error));
        } else {
            alert('Please enter a valid movie ID');
        }
    });
});
