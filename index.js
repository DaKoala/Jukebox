class Song {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    };
    play() {
        const audio = new Audio(this.sound);
        audio.play();
    };
}

class Jukebox {
    constructor(songs) {
        this.songs = songs;
    }
}


