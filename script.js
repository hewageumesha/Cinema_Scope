$('#movies-list').empty();
$.each(data, function(index, movie) {
    $('#movies-list').append('<p>Movie ID: ' + movie.ID + ', Name: ' + movie.Name + ', Director: ' + movie.Director + ', Release Date: ' + movie.ReleaseDate + ', Link: ' + movie.Link + '</p>');
});

// Get movie by ID
$('#get-movie-btn').click(function() {
var movieID = $('#movie-id-input').val();
$.ajax({
type: 'GET',
url: 'http://localhost:8080/api/movies/' + movieID,
success: function(data) {
$('#movie-details').empty();
$('#movie-details').append('<p>Movie ID: ' + data.ID + ', Name: ' + data.Name + ', Director: ' + data.Director + ', Release Date: ' + data.ReleaseDate + ', Link: ' + data.Link + '</p>');
},
error: function(xhr, status, error) {
$('#movie-details').empty();
$('#movie-details').append('<p>Movie not found</p>');
}
});
});

// Add new movie
$('#add-movie-btn').click(function() {
var movie = {
Name: $('#name').val(),
Director: $('#director').val(),
ReleaseDate: $('#releaseDate').val(),
Link: $('#link').val()
};
$.ajax({
type: 'POST',
url: 'http://localhost:8080/api/movies',
data: JSON.stringify(movie),
contentType: 'application/json',
success: function(data) {
alert('Movie added successfully');
},
error: function(xhr, status, error) {
alert('Error adding movie: ' + error);
}
});
});

// Update movie
$('#update-movie-btn').click(function() {
var movieID = $('#update-movie-id-input').val();
var movie = {
ID: movieID,
Name: $('#name').val(),
Director: $('#director').val(),
ReleaseDate: $('#releaseDate').val(),
Link: $('#link').val()
};
$.ajax({
type: 'PUT',
url: 'http://localhost:8080/api/movies/' + movieID,
data: JSON.stringify(movie),
contentType: 'application/json',
success: function(data) {
alert('Movie updated successfully');
},
error: function(xhr, status, error) {
alert('Error updating movie: ' + error);
}
});
});

// Delete movie
$('#delete-movie-btn').click(function() {
var movieID = $('#delete-movie-id-input').val();
$.ajax({
type: 'DELETE',
url: 'http://localhost:8080/api/movies/' + movieID,
success: function(data) {
alert('Movie deleted successfully');
},
error: function(xhr, status, error) {
alert('Error deleting movie: ' + error);
}
});
});