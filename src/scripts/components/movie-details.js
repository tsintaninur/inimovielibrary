class MovieDetails extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    this._data = data;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
      *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          color: white;
      }
      :host {
        text-align: center;
        padding: 10px;
        margin-bottom: 20px;
      }
      .detail-row {
        padding: 0 30px;
      }
      .detail-row::after {
        content: "";
        clear: both;
        display: table;
      }
      .detail-row > .col-4 {
        width: 33.33%;
        display: flex;
        justify-content: center;
      }
      .detail-row > .col-8 {
        width: 66.66%;
        padding-right: 30px;
      }
      .detail-row > .col-4,
      .detail-row > .col-8 {
        float: left;
        padding: 15px;
      }
      .detail-row > .col-4 > img {
        width: 300px;
        max-height: 400px;
        object-fit: cover;
        border-radius: 10px;
      }
      .detail-row > .col-8 > h3 {
        padding: 10px 0;
      }
      .detail-row > .col-8 > p > span {
        font-weight: lighter;
      }
      @media screen and (max-width: 768px) {
        .detail-row > .col-4 {
          width: 100%;
        }
        .detail-row > .col-8 {
          width: 100%;
        }  
      }
      </style>

      <div class="detail-row">
        <div class="col-4">
          <img src="${this._data.backdrop_path}" alt="">
        </div>
        <div class="col-8">
          <h3>${this._data.title}</h3>
          <p>Release Year: <span>${this._data.release_date.split("-")[0]}</span></p>
          <p>Genres: <span>${this._data.genres[0].name}</span></p>
          <p>Rating: <span>${this._data.vote_average.toFixed(1)}</span></p>
          <p>Country: <span>${this._data.production_countries[0].name}</span></p>
          <p>Production Company: <span>${this._data.production_companies[0].name}</span></p>
          <p>Overview: <span>${this._data.overview}</span></p>
        </div>
      </div>`;

    const movieContainer = document.getElementById("movie-container");
    movieContainer.appendChild(this.shadowDOM);
  }
}

customElements.define("movie-details", MovieDetails);
