class Song {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    };
    play() {
        const audio = new Audio(this.sound);
        console.log(audio.play());
    };
}

class Jukebox {
    constructor(songs) {
        this.songs = songs;
    }

    playTheFirst() {
        this.songs[0].play();
    }
}

// const song = new Song('whatever', 'whatever.mp3');
// const jukebox = new Jukebox([
//     song,
// ]);
//
// jukebox.playTheFirst();
//const music = document.getElementById('music');
music.play();
