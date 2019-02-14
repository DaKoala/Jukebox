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
    constructor(songs, playId, nextId, previousId, stopId, playIconId) {
        this.songs = songs;
        this.songPointer = 0;
        this.playIconId = playIconId;
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

    changeIconToPlay() {
        const icon = document.getElementById(this.playIconId);
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }

    changeIconToPause() {
        const icon = document.getElementById(this.playIconId);
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }

    getCurrentSong() {
        return this.songs[this.songPointer];
    }

    getCurrentAudio() {
        return this.getCurrentSong().audio;
    }

    playCurrent() {
        const audio = this.getCurrentAudio();
        if (audio.paused) {
            audio.play();
            this.changeIconToPause();
        } else {
            audio.pause();
            this.changeIconToPlay();
        }
        return this;
    }

    stop() {
        const audio = this.getCurrentAudio();
        audio.pause();
        audio.currentTime = 0;
        this.changeIconToPlay();
        return this;
    }

    next() {
        this.stop();
        this.increasePointer();
        this.playCurrent();
        this.changeIconToPause();
        return this;
    }

    previous() {
        this.stop();
        this.decreasePointer();
        this.playCurrent();
        this.changeIconToPause();
        return this;
    }

    increasePointer() {
        const isOutOfBound = this.songPointer >= this.songs.length;
        this.songPointer = isOutOfBound ? 0 : this.songPointer + 1;
    }

    decreasePointer() {
        const isOutOfBound = this.songPointer <= 0;
        this.songPointer = isOutOfBound ? this.songs.length - 1 : this.songPointer - 1;
    }
}

const songs = [
    new Song('whatever', 'whatever.mp3'),
    new Song('heyjude', 'heyjude.mp3'),
];
const jukebox = new Jukebox(songs, 'play', 'next', 'previous', 'stop', 'play-icon');
