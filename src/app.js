let ap = null;
const storage = window.sessionStorage;
let dataStorage = null;
let songs = [];

function start() {
    ap = new AudioPlayer({
        gui: {
            totalTime: { value: "0:00", DOMElement: document.querySelector(".totalTime") },
            currentTime: { value: "0:00", DOMElement: document.querySelector(".currentTime") },
            progressBar: { value: "0:00", DOMElement: document.querySelector(".progressBar") },
            artistName: { value: "Loading...", DOMElement: document.querySelector(".artistName") },
            songName: { value: "Loading...", DOMElement: document.querySelector(".songName") },
            albumCover: { value: "./assets/placeholder.png", DOMElement: document.querySelector("#player") },
        },
        buttons: {
            playPause: document.querySelector(".play"),
            volume: document.querySelector(".volume"),
            close: document.querySelector(".add"),
            back: document.querySelector(".previous"),
            next: document.querySelector(".next")
        }
    });

    dataStorage = JSON.parse(storage.getItem("songs"));
    chargeSongsArray();
}

    function chargeSongsArray(){
        console.log(dataStorage);
        
        for (let i = 0; i < dataStorage.length; i++) {
                    var { title_short: name, artist, album, preview: file } = dataStorage[i];
                    songs.push( new Song(name,artist.name,album.cover_big,file) );
                }
                ap.loadSong(); 
                console.log(dataStorage);
    }
                
            
          
    
        function redirect(){
            window.location = "./index.html";
        }
    


