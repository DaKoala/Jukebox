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
        this.songPointer = 0;
        this.rotateDeg = 0;
        this.dom = {};
        this.dom.title = document.getElementById(params.titleId);
        this.dom.playIcon = document.getElementById(params.playIconId);
        this.dom.cover = document.getElementById(params.coverId);
        this.dom.progress = document.getElementById(params.progressId);
        this.dom.timer = document.getElementById(params.timerId);
        this.dom.playBtn = document.getElementById(params.playId);
        this.dom.container = document.getElementById(params.containerId);
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
        this.songs.forEach((song, index) => {
            song.audio.addEventListener('ended', () => {
                this.next();
            });
            this.appendSongElement(this.createSongElement(song, index));
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

    upList(index) {
        if (index === 0) {
            return;
        }
        const currSong = this.getCurrentSong();
        const tmp = this.songs[index];
        this.songs[index] = this.songs[index - 1];
        this.songs[index - 1] = tmp;
        this.songPointer = this.songs.indexOf(currSong);
        this.reloadSongElement();
        return this;
    }

    downList(index) {
        if (index === this.songs.length - 1) {
            return;
        }
        const currSong = this.getCurrentSong();
        const tmp = this.songs[index];
        this.songs[index] = this.songs[index + 1];
        this.songs[index + 1] = tmp;
        this.songPointer = this.songs.indexOf(currSong);
        this.reloadSongElement();
        return this;
    }

    selectSong(index) {
        this.changeSong(() => {
            this.songPointer = index;
        });
    }

    changeSong(pointerFunc=(function(){})) {
        const currState = this.getCurrentAudio().paused;
        this.stop();
        this.getCurrentSongElement().classList.remove('list__cell--active');
        pointerFunc();
        this.getCurrentSongElement().classList.add('list__cell--active');
        if (currState) {
            this.getCurrentAudio().pause();
            this.changeIconToPlay();
        } else {
            this.getCurrentAudio().play();
            this.changeIconToPause();
        }
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

    getNthSongElement(index) {
        return this.dom.container.childNodes[index];
    }

    getCurrentSongElement() {
        return this.getNthSongElement(this.songPointer);
    }

    createSongElement(song, index) {
        const item = document.createElement('div');
        const number = document.createElement('div');
        const title = document.createElement('div');
        const singer = document.createElement('div');
        const buttons = document.createElement('div');
        number.textContent = index >= 9 ? String(index + 1) : `0${index + 1}`;
        number.classList.add('list__item');
        title.textContent = song.name;
        title.classList.add('list__item');
        singer.textContent = song.artist;
        singer.classList.add('list__item');
        const upListBtn = document.createElement('i');
        upListBtn.classList.add('fas', 'fa-sort-amount-up', 'list__btn');
        upListBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.upList(index);
        });
        const downListBtn = document.createElement('i');
        downListBtn.classList.add('fas', 'fa-sort-amount-down', 'list__btn');
        downListBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.downList(index);
        });
        buttons.appendChild(upListBtn);
        buttons.appendChild(downListBtn);
        item.classList.add('list__cell');
        if (this.songPointer === index) {
            item.classList.add('list__cell--active');
        }
        item.appendChild(number);
        item.appendChild(title);
        item.appendChild(singer);
        item.appendChild(buttons);
        item.addEventListener('click', () => {
            this.selectSong(index);
        });
        return item;
    }

    appendSongElement(element) {
        this.dom.container.appendChild(element);
        return this;
    }

    reloadSongElement() {
        this.dom.container.innerHTML = '';
        this.songs.forEach((song, index) => {
            this.appendSongElement(this.createSongElement(song, index));
        });
        return this;
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
    containerId: 'songs',
});
