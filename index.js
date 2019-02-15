class Song {
    constructor(name, artist) {
        this.name = name;
        this.audio = new Audio(`audio/${name}.mp3`);
        this.artist = artist;
        this.cover = `cover/${name}.JPG`;
    };

    play() {
        this.audio.play();
    };
}

class Jukebox {
    static secondToTimer(second) {
        const sec = Math.floor(second % 60);
        const min = Math.floor(second / 60);
        const secStr = sec >= 10 ? String(sec) : `0${sec}`;
        const minStr = min >= 10 ? String(min) : `0${min}`;
        return `${minStr}:${secStr}`;
    }

    constructor(params) {
        this.songs = params.songs;
        this.songs.forEach(({ audio }) => {
            audio.addEventListener('ended', () => {
                this.next();
            });
        });
        this.songPointer = 0;
        this.rotateDeg = 0;
        this.dom = {};
        this.dom.title = document.getElementById(params.titleId);
        this.dom.playIcon = document.getElementById(params.playIconId);
        this.dom.cover = document.getElementById(params.coverId);
        this.dom.progress = document.getElementById(params.progressId);
        this.dom.timer = document.getElementById(params.timerId);
        this.dom.playBtn = document.getElementById(params.playId);
        this.dom.playBtn.addEventListener('click', () => {
            this.playCurrent();
        });
        this.dom.nextBtn = document.getElementById(params.nextId);
        this.dom.nextBtn.addEventListener('click', () => {
            this.next();
        });
        this.dom.previousBtn = document.getElementById(params.previousId);
        this.dom.previousBtn.addEventListener('click', () => {
            this.previous();
        });
        this.dom.stopBtn = document.getElementById(params.stopId);
        this.dom.stopBtn.addEventListener('click', () => {
            this.stop();
        });
        this.getCurrentAudio().addEventListener('loadeddata', () => {
            this.updateInfo();
            this.rotateCover();
        });
        this.getCurrentAudio().addEventListener('timeupdate', () => {
            this.updateProgress()
        });
    }

    rotateCover() {
        const cover = this.dom.cover;
        const audio = this.getCurrentAudio();
        this.rotateDeg = audio.paused ? this.rotateDeg : (this.rotateDeg + 1) % 360;
        cover.style.transform = `rotate(${this.rotateDeg}deg)`;
        setTimeout(this.rotateCover.bind(this), 20);
    }

    changeIconToPlay() {
        const icon = this.dom.playIcon;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }

    changeIconToPause() {
        const icon = this.dom.playIcon;
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }

    getCurrentSong() {
        return this.songs[this.songPointer];
    }

    getCurrentAudio() {
        return this.getCurrentSong().audio;
    }

    updateInfo() {
        const song = this.getCurrentSong();
        this.dom.title.textContent = `${song.artist} - ${song.name}`;
        this.dom.cover.style.backgroundImage = `url('${song.cover}')`;
        this.updateProgress();
    }

    updateProgress() {
        const audio = this.getCurrentAudio();
        const { currentTime, duration } = audio;
        this.dom.progress.style.width = `${currentTime / duration * 100}%`;
        this.dom.timer.textContent = `${Jukebox.secondToTimer(currentTime)}/${Jukebox.secondToTimer(duration)}`;
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

    changeSong(pointerFunc=(function(){})) {
        this.stop();
        pointerFunc();
        this.playCurrent();
        this.changeIconToPause();
        this.updateInfo();
        this.getCurrentAudio().addEventListener('timeupdate', () => {
            this.updateProgress()
        });
    }

    stop() {
        const audio = this.getCurrentAudio();
        audio.pause();
        audio.currentTime = 0;
        this.changeIconToPlay();
        return this;
    }

    next() {
        this.changeSong(this.increasePointer.bind(this));
        return this;
    }

    previous() {
        this.changeSong(this.decreasePointer.bind(this));
        return this;
    }

    increasePointer() {
        const isOutOfBound = this.songPointer >= this.songs.length - 1;
        this.songPointer = isOutOfBound ? 0 : this.songPointer + 1;
    }

    decreasePointer() {
        const isOutOfBound = this.songPointer <= 0;
        this.songPointer = isOutOfBound ? this.songs.length - 1 : this.songPointer - 1;
    }
}

const songs = [
    new Song('Believe', 'Dima Bilan'),
    new Song('Just A Dream', 'Drew Ryniewicz'),
    new Song('Just Cant Get Enough', 'Black Eyed Peas'),
    new Song('Letting Go', 'Jo De La Rosa'),
];
const jukebox = new Jukebox({
    songs,
    playId: 'play',
    nextId: 'next',
    previousId: 'previous',
    stopId: 'stop',
    playIconId: 'play-icon',
    titleId: 'title',
    coverId: 'cover',
    progressId: 'progress',
    timerId: 'timer',
});
