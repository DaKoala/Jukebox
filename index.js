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
    constructor(songs, playId,nextId, previousId,stopId) {
        this.songs = songs;
        this.songPointer = 0;
        this.playBtn = document.getElementById(playId);
        this.playBtn.addEventListener('click', () => {
            this.playCurrent();
        });
        this.nextBtn = document.getElementById(nextId);
        this.nextBtn.addEventListener('click', () => {
            this.next();
        });
        this.previousBtn = document.getElementById(previousId);
        this.previousBtn.addEventListener('click', () => {
            this.previous();
        });
        this.stopBtn = document.getElementById(stopId);
        this.stopBtn.addEventListener('click', () => {
            this.stop();
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
    stop(){
      this.songs[this.songPointer].audio.pause();
      this.songs[this.songPointer].audio.currentTime = 0;
    }
    next(){
      this.songs[this.songPointer].audio.pause();
      this.songs[this.songPointer].audio.currentTime = 0;
      this.songPointer++;
      this.songs[this.songPointer].audio.play();
    }
    previous(){
      this.songs[this.songPointer].audio.pause();
      this.songs[this.songPointer].audio.currentTime = 0;
      this.songPointer--;
      this.songs[this.songPointer].audio.play();
    }

}

const songs = [
    new Song('whatever', 'whatever.mp3'),
    new Song('heyjude', 'heyjude.mp3'),
];
const jukebox = new Jukebox(songs, 'play','next','previous','stop');
