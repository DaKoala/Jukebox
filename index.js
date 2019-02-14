class Song {
    constructor(name, sound) {
        this.name = name;
        this.audio = new Audio(sound);
    };
    play() {
        this.audio.play();
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
