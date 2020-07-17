class Song{
    
    constructor(name,artist,cover,file){
        this.name = name;
        this.artist = artist;
        this.cover = cover;
        this.file = file;
    }

    set name(value){
        this._name = value;
    }

    get name(){
        return this._name;
    }

    set artist(value){
        this._artist = value;
    }

    get artist(){
        return this._artist;
    }

    set cover(value){
        this._cover = value;
    }

    get cover(){
        return this._cover;
    }

    set file(value){
        this._file = value;
    }

    get file(){
        return this._file;
    }
}