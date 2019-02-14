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
        this.songPointer = 0;
        this.playBtn = document.getElementById(playId);
        this.playBtn.addEventListener('click', () => {
            this.playCurrent();
        });
    }

    playCurrent() {
        const song = this.songs[this.songPointer].audio;
        if (song.paused) {
            song.play();
        } else {
            song.pause();
        }
    }
}

const songs = [
    new Song('whatever', 'whatever.mp3'),
];
const jukebox = new Jukebox(songs, 'play');
