## Cinema Scope API
Cinema Scope is a simple RESTful API built with Go that allows you to manage a collection of movies. The API provides basic CRUD operations (Create, Read, Update, Delete) to handle movie data including the movie name, director, release date, and a link to more information (such as a trailer).

### Features
- Get All Movies: Retrieve a list of all movies stored in the system.
- Get Movie by ID: Retrieve details of a specific movie by its unique ID.
- Add a New Movie: Add a new movie entry to the database.
- Update a Movie: Modify the details of an existing movie.
- Delete a Movie: Remove a movie from the database.
- 
### Installation
- Prerequisites
- Go installed on your machine
- Gorilla Mux package for routing

#### Steps
 - Clone the repository:
```
bash
Copy code
git clone https://github.com/yourusername/cinema-scope.git
cd cinema-scope
```

 - Install dependencies:
```
bash
Copy code
go get -u github.com/gorilla/mux
```

 - Run the server:
```
bash
Copy code
go run main.go
```

The server will start on http://localhost:8080.

### API Endpoints
1. Get All Movies
- Endpoint: `/api/movies`
- Method: `GET`
- Response: JSON array of all movie objects.
  
2. Get Movie by ID
- Endpoint: `/api/movies/{id}`
- Method: `GET`
- Response: JSON object of the movie with the specified ID.
  
3. Add a New Movie
- Endpoint: `/api/movies`
- Method: `POST`
- Request Body:
```json
Copy code
{
  "name": "Inception",
  "director": "Christopher Nolan",
  "release_date": "2010-07-16T00:00:00Z",
  "link": "https://www.youtube.com/watch?v=YoHD9XEInc0"
}
```
- Response: JSON object of the created movie.

4. Update a Movie
- Endpoint: `/api/movies/{id}`
- Method: `PUT`
- Request Body:
```json
Copy code
{
  "name": "Inception Updated",
  "director": "Christopher Nolan",
  "release_date": "2010-07-16T00:00:00Z",
  "link": "https://www.youtube.com/watch?v=YoHD9XEInc0"
}
```
- Response: JSON object of the updated movie.
  
5. Delete a Movie
- Endpoint: `/api/movies/{id}`
- Method: `DELETE`
- Response: A confirmation message indicating the movie has been deleted.
  
