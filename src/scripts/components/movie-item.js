class MovieItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :host {
      text-align: center;
      padding: 10px;
    }
    .card {
      width: 14rem;
      border-radius: 25px;
      background-color: var(--bs-dark);
    }
    .card:hover {
      background-color: var(--bs-danger);
      cursor: pointer;
    }
    .card-body {
      padding-bottom: 15px;
    }
    .card-body > img {
      width: 14rem;
      max-height: 290px;
      object-fit: cover;
      border-radius: 25px 25px 0 0;
      padding-bottom: 5px;
    }
    .card-body > h5,
    .card-body > p {
      color: white;
      padding: 0 10px;
    }
    .card-body > p {
      font-size: smaller;
    }
    </style>
    
    <div class="card">
      <div class="card-body">
        <img src="${this._movie.backdrop_path}" alt="">
        <h5>${this._movie.title}</h5>
      </div>
    </div>`;

    this.shadowDOM.addEventListener("click", this._clickEvent);
  }
}

customElements.define("movie-item", MovieItem);
