$(document).ready(()=>{
  $('#searchForm').on('submit', (e) => {
    var searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  })
});

let API_KEY = '40c6fdf1d72bd3cb00b21ded9a9dfa1c';
function getMovies(searchText){
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`)
      .then((response)=>{
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class='col-md-3'>
              <div class='well text-center'>
                <img src='https://image.tmdb.org/t/p/w320/${movie.poster_path}' />
                <h5>${movie.title}</h5>
                <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          `
        });
        $('#movies').html(output);
      })
      .catch((error)=>{
        console.log(error);
      })
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((response) =>{
        let movie = response.data;
        console.log(response.data);
        let output = `
          <div class="row">
            <div class="col-md-4" >
              <img src="https://image.tmdb.org/t/p/w600/${movie.poster_path}" class="thumbnail" />
            </div>
            <div class="col-md-8" >
              <h2>${movie.title}</h2>
              <ul>
                <li class="list-group-item"><strong>Genre:</strong>${movie.genres.map((genre)=> ' ' + genre.name.toLowerCase())}<li>
                <li class="list-group-item"><strong>Released Date:</strong> ${movie.release_date}<li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}/10 on IMDb<li>
                <li class="list-group-item"><strong>Budget:</strong> ${movie.budget}$<li>
                <li class="list-group-item"><strong>Quote:</strong> ${movie.tagline}<li>
                <li class="list-group-item"><strong>Overview:</strong> ${movie.overview}<li>
              </ul>
            </div>
          </div>
          <div class="row details_btn">
            <a class="btn btn-primary" href="http://imdb.com/title/${movie.imdb_id}" target="_blank">See On IMDB</a>
            <a class="btn btn-primary" href="index.html">Go Back To Search</a>
          </div>
        `
        $('#movie').html(output);
      })
}
