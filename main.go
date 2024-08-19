package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

// Movie struct to hold movie information
type Movie struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Director    string    `json:"director"`
	ReleaseDate time.Time `json:"release_date"`
	Link        string    `json:"link"`
}

// In-memory movie list
var movies []Movie
var idCounter int

// API: Get all movies
func GetMovies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
}

// API: Get a movie by ID
func GetMovieByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}
	for _, movie := range movies {
		if movie.ID == id {
			json.NewEncoder(w).Encode(movie)
			return
		}
	}
}

// API: Add a new movie
func AddMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var movie Movie
	if err := json.NewDecoder(r.Body).Decode(&movie); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	idCounter++
	movie.ID = idCounter
	movies = append(movies, movie)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(movie)
}

// API: Update a movie
func UpdateMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}
	for i, movie := range movies {
		if movie.ID == id {
			var updatedMovie Movie
			if err := json.NewDecoder(r.Body).Decode(&updatedMovie); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			updatedMovie.ID = id
			movies[i] = updatedMovie
			json.NewEncoder(w).Encode(updatedMovie)
			return
		}
	}
	http.Error(w, "Movie not found", http.StatusNotFound)
}

// API: Delete a movie
func DeleteMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}
	for i, movie := range movies {
		if movie.ID == id {
			movies = append(movies[:i], movies[i+1:]...)
			json.NewEncoder(w).Encode("Movie deleted")
			return
		}
	}
	http.Error(w, "Movie not found", http.StatusNotFound)
}

func main() {
	// Initialize the router
	r := mux.NewRouter()

	// Prepopulate some example movies
	movies = append(movies, Movie{
		ID:          1,
		Name:        "A Quiet Place: Day One",
		Director:    "Michael Sarnoski",
		ReleaseDate: time.Date(2024, 6, 28, 0, 0, 0, 0, time.UTC),
		Link:        "https://youtu.be/fxGf3wObi_0?si=wpC2NqkHv83R4QkI",
	})
	movies = append(movies, Movie{
		ID:          2,
		Name:        "Furiosa: A Mad Max Saga",
		Director:    "George Miller",
		ReleaseDate: time.Date(2024, 5, 24, 0, 0, 0, 0, time.UTC),
		Link:        "https://youtu.be/p08MmWoFbg8?si=zA8zkIGrfsCB5Ke4",
	})

	// API routes
	r.HandleFunc("/api/movies", GetMovies).Methods("GET")
	r.HandleFunc("/api/movies/{id}", GetMovieByID).Methods("GET")
	r.HandleFunc("/api/movies", AddMovie).Methods("POST")
	r.HandleFunc("/api/movies/{id}", UpdateMovie).Methods("PUT")
	r.HandleFunc("/api/movies/{id}", DeleteMovie).Methods("DELETE")

	// Start the server
	fmt.Println("Server is listening on port 8080...")
	http.ListenAndServe(":8080", r)
}
