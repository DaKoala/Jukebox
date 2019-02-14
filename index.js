class Song {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    };
    play() {
        const audio = new Audio(this.sound);
    };
}

class Jukebox {
    constructor(songs, playId) {
        this.songs = songs;
        this.playBtn = document.getElementById(playId);
        this.playBtn.addEventListener('click', () => {
            this.playTheFirst();
        });
    }

    playTheFirst() {
        this.songs[0].play();
    }
}

const song = new Song('whatever', 'whatever.mp3');
const jukebox = new Jukebox([
    song,
], 'play');
