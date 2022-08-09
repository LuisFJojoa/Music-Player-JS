var headers = new Headers();
    headers.append("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com");
    headers.append("X-RapidAPI-Key", "5a5cf0081dmsh49d2c653a5f76d5p19598djsndaeceaacd74c");

    var opciones = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
    };
      
class AudioPlayer {

    

    constructor(params) {

        this.songs = [];
        this.queue = [];
        this._index = 0;
        this.player = new Audio();
        this._src = ""; 

        this._gui = {
            progressBar: { value: null, DOMElement: null },
            artistName: { value: null, DOMElement: null },
            songName: { value: null, DOMElement: null },
            currentTime: { value: null, DOMElement: null },
            totalTime: { value: null, DOMElement: null },
            albumCover: { value: null, DOMElement: null }
        };

        if (params.hasOwnProperty("gui")) {
            var { progressBar, artistName, songName, currentTime, totalTime, albumCover } = params.gui;
            this._initGUI(progressBar, artistName, songName, currentTime, totalTime, albumCover);
        }

        this._buttons = {
            queue: null,
            volume: null,
            back: null,
            playPause: null,
            next: null,
            close: null
        }

        //this._loadSong(src);

        if (params.hasOwnProperty("buttons")) {
            var { queue, volume, back, playPause, next, close } = params.buttons;
            this._initButtons(queue, volume, back, playPause, next, close);
        }

        let player = document.querySelector("#player");
        player.classList.add("placeholder");

    }

    set src(value){
        this._loadSong(value);
    }

    get src(){
        return this._src;
    }

    set index(value){
        if(value >= 0 && 
           value < songs.length ){
            this._index = value;  
        } else {
            this._index = 0;
        }
        
        this.loadSong();
    }

    get index(){
        return this._index;
    }

    loadSong(){
        
        console.log(this.index);
        
        ap.src = songs[this.index].file;
            ap.gui = {
                artistName: {
                    value: songs[this.index].artist,
                    DOMElement: ap.gui.artistName.DOMElement
                },
                songName: {
                    value: songs[this.index].name,
                    DOMElement: ap.gui.songName.DOMElement
                },
                albumCover: {
                    value: songs[this.index].cover,
                    DOMElement: ap.gui.albumCover.DOMElement
                }
            }
    }

    _loadSong(src) {
        this._src = src;
        this.player.src = src;
        this.player.onloadedmetadata = () => {
            this.gui = {
                totalTime: { value: this.player.duration, DOMElement: this.gui.totalTime.DOMElement},
                currentTime: { value: 0, DOMElement: this.gui.currentTime.DOMElement }
            }
        }
        this.player.ontimeupdate = () => {
            //console.log(this.player.currentTime);
            this.gui = {
                currentTime: { value: this.player.currentTime, DOMElement: this.gui.currentTime.DOMElement }
            }
            var [totalTime, currentTime] = [this.gui.totalTime.value, this.gui.currentTime.value];
            var progress = (currentTime / totalTime) * 100;
            let pBar = this.gui.progressBar.DOMElement.querySelector("div");
            pBar.style.width = `${progress}%`;

            if (currentTime) {
                
            }
        }

    }

    _setToMinsSecond(time){
        var time    = parseInt(time);
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        var hours = Math.floor(time / 3600);
        time = time - hours * 3600;
        let finalTime = this._str_pad_left(minutes,'0',2)+':'+this._str_pad_left(seconds,'0',2);
        return finalTime;
    }
    _str_pad_left(string,pad,length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }

    _initGUI(...params) {
        this.gui = {
            progressBar: params[0] || { value: null, DOMElement: null },
            artistName: params[1] || { value: null, DOMElement: null },
            songName: params[2] || { value: null, DOMElement: null },
            currentTime: params[3] || { value: null, DOMElement: null },
            totalTime: params[4] || { value: null, DOMElement: null },
            albumCover: params[5] || { value: null, DOMElement: null }
        };
    }

    _initButtons(...params) {
        this.buttons = {
            queue: params[0] || null,
            volume: params[1] || null,
            back: params[2] || null,
            playPause: params[3] || null,
            next: params[4] || null,
            close: params[5] || null
        };
    }

    _addClickEvent(element, callback) {
        //console.log(element);
        if (element instanceof HTMLElement) {
            element.onclick = callback;
        } else {
            if (element.hasOwnProperty("DOMElement")) {
                element = element.DOMElement;
                if (element instanceof HTMLElement) {
                    element.onclick = callback;
                }
            }
        }
    }

    _toggleIcon(el, aClass, bClass) {
        let i = el.querySelector("i");
        if (i.classList.contains(aClass)) {
            var [a, b] = [aClass, bClass];
        } else {
            var [b, a] = [aClass, bClass];
        }
        i.classList.remove(a);
        i.classList.add(b);
    }

    _assignValues(toAssign, elements, actions = []) {
        const keys = Object.keys(elements);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (elements[key] != null) {
                toAssign[key] = elements[key];
                if (Object.keys(actions).length > 0) {
                    if (actions.hasOwnProperty(key)) {
                        console.log(key);
                        this._addClickEvent(toAssign[key], actions[key]);
                    }
                }
            }
        }
    }

    set buttons(btns) {
        let actions = {
            playPause: () => {
                if (this.player.paused) {
                    this.player.play();
                } else {
                    this.player.pause();
                }
                this._toggleIcon(this.buttons.playPause, "fa-play", "fa-pause");
            },
            queue: () => false,
            volume: () => {
                if (!this.player.paused) {
                    this.player.volume = (this.player.volume != 0) ? 0 : 1
                    this._toggleIcon(this.buttons.volume, "fa-volume-up", "fa-volume-mute");
                } 
                

            },
            back: () => {this.index--; this.player.play(); 
                        let player = document.querySelector("#player");
                        player.classList.add("placeholder");
                        this.gui.albumCover.DOMElement.style.backgroundImage = `url(./assets/placeholder.png)`;
                    },

            next: () => {this.index++; this.player.play(); 
                        let player = document.querySelector("#player");
                        player.classList.add("placeholder");
                        this.gui.albumCover.DOMElement.style.backgroundImage = `url(./assets/placeholder.png)`;
                    },

            close: () => {window.sessionStorage.clear(); window.location = "index.html"},

        }
        this._assignValues(this._buttons, btns, actions);
    }

    get buttons() {
        return this._buttons;
    }

    set gui(elments) {
        let actions = {
            progressBar: (e) => {
                let x = e.offsetX;
                let w = this.gui.progressBar.DOMElement.offsetWidth;
                let newCurrentTime = this.gui.totalTime.value * (x/w);
                this.player.currentTime = newCurrentTime;
                this.gui = {
                    currentTime: {value: newCurrentTime, DOMElement: this.gui.currentTime.DOMElement}
                }
            }
        }
        this._assignValues(this._gui, elments, actions);
        this._updateBasigGUIElement(this.gui.totalTime, true);
        this._updateBasigGUIElement(this.gui.currentTime, true);
        this._updateBasigGUIElement(this.gui.artistName);
        this._updateBasigGUIElement(this.gui.songName);
        this.query(this.gui.albumCover);
    }

    query(cover){

        console.log(cover.value);
        
        let image = document.createElement("img");
        image.src = cover.value;
        image.onload = function() {
            let player = document.querySelector("#player");
            player.classList.remove("placeholder");
            cover.DOMElement.style.backgroundImage = `url('${image.src}')`;
        };

        }
    
        arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(buffer));
          
            bytes.forEach((b) => binary += String.fromCharCode(b));
          
            return window.btoa(binary);
        }
    
        _updateBasigGUIElement(el, n = false) {
            if (el.DOMElement instanceof HTMLElement) {
                if (n){
                    el.DOMElement.innerHTML = this._setToMinsSecond(el.value) ;
                }else{
                    el.DOMElement.innerHTML = el.value;
                }
            }
        }
    
        get gui() {
            return this._gui;
        }
    }
