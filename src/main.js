var storage = window.sessionStorage;
let input = null;

var headers = new Headers();
headers.append("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com");
headers.append(
  "X-RapidAPI-Key",
  "5a5cf0081dmsh49d2c653a5f76d5p19598djsndaeceaacd74c"
);

var opciones = {
  method: "GET",
  headers: headers,
  mode: "cors",
  cache: "default",
};

function start() {
  input = document.querySelector("input");
  input.onkeyup = (e) => {
    if (e.key == "Enter") {
      artist = input.value;
      query();
    }
  };
}

//Fetch al API

function query() {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, opciones)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const data = json.data;

      if (data.length > 0) {
        storage.setItem("songs", JSON.stringify(data));
        redirect();
      } else {
        console.log("No existe ese artista");
        input.value = "";
      }
    });
}

function redirect() {
  window.location = "./player.html";
}
