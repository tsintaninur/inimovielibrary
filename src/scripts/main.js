import "./components/movie-item.js";
import "./components/movie-details.js";
import moviePoster from "../images/movie-poster.png";

const main = () => {
  const apiKey = "fa393f754c8d3fa51db32ebc361a7b82";
  const apiBaseURL = "https://api.themoviedb.org/3";
  const imgBaseURL = "https://image.tmdb.org/t/p/w500";
  const searchInput = document.querySelector("#search-input");
  const movieListTitle = document.querySelector("#movie-list-title");
  const movieDetailURL = "https://api.themoviedb.org/3/movie/";
  const movieContainer = document.getElementById("movie-container");

  // fetching popular movie
  fetch(
    apiBaseURL +
      "/discover/movie?" +
      new URLSearchParams({
        api_key: apiKey,
        sort_by: "popularity.desc",
        page: "1",
      })
  )
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderAllMovies(responseJson.results);
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });

  const renderAllMovies = (movies) => {
    movieContainer.innerHTML = "";

    const movieListElement = document.createElement("div");
    movieListElement.setAttribute("class", "movie-list");
    movieContainer.appendChild(movieListElement);

    movies.forEach((movie) => {
      const movieItemElement = document.createElement("movie-item");

      if (movie.poster_path == null) {
        movie.backdrop_path = moviePoster;
      } else {
        movie.backdrop_path = imgBaseURL + "" + movie.poster_path;
      }

      movieItemElement.setAttribute("id", `${movie.id}`);
      movieItemElement.movie = movie;
      movieListElement.appendChild(movieItemElement);
      movieItemElement.onclick = () => {
        showMovieDetails(movie.id);
      };
    });
  };

  // search event
  searchInput.onkeyup = (event) => {
    if (event.keyCode === 13 && searchInput.value) {
      fetch(
        apiBaseURL +
          "/search/movie?" +
          new URLSearchParams({
            api_key: apiKey,
            query: searchInput.value,
            page: "1",
          })
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            showResponseMessage(responseJson.message);
          } else {
            renderAllMovies(responseJson.results);
            movieListTitle.innerHTML = "";
            movieListTitle.innerHTML += `Search result for "${searchInput.value}"`;
          }
        })
        .catch((error) => {
          showResponseMessage(error);
        });
    }
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  const showMovieDetails = (id) => {
    // fetching movie details
    fetch(
      `${movieDetailURL}${id}?` +
        new URLSearchParams({
          api_key: apiKey,
        })
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderMovieDetails(responseJson);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });

    const renderMovieDetails = (data) => {
      movieContainer.innerHTML = "";

      if (data.poster_path == null) {
        data.backdrop_path = moviePoster;
      } else {
        data.backdrop_path = imgBaseURL + "" + data.poster_path;
      }

      movieListTitle.innerHTML = "";
      movieListTitle.innerHTML += `Movie Details`;
      const movieDetailElement = document.createElement("movie-details");
      movieDetailElement.data = data;
    };
  };
};

export default main;
