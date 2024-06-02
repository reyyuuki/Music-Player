const Play = document.getElementsByClassName("Play")[0];
const Previous = document.getElementsByClassName("Left")[0];
const Next = document.getElementsByClassName("Right")[0];
const Seek = document.getElementById("Seek");
const Pause = document.getElementsByClassName("Pause")[0];
const Start = document.getElementsByClassName("Start")[0];
const StartTime = document.getElementsByClassName("StartTime")[0];
const EndTime = document.getElementsByClassName("EndTime")[0];
const Song = document.getElementById("Song");
const Name = document.getElementById("Name");
const Artist = document.getElementById("Artist");
const ProgressBar = document.getElementById("Progress-bar");
const Photo = document.getElementsByClassName("Photo")[0];
const SongList = document.getElementsByClassName("SongLists")[0];
const Songimage = document.getElementsByClassName("Music-icon");
const Tittle = document.getElementsByClassName("Tittle");
const Singer = document.getElementsByClassName("Singer");
const Duration = document.getElementsByClassName("Duration");
const Open = document.getElementById("Open");
const MusicContainer = document.getElementById("Music-List");
const SongsLists = document.getElementsByClassName("SongLists");
const Close = document.getElementById("Close");
const Container = document.getElementsByClassName("container")[0];

let index = 2;
let isShuffled = false;
let isLooping = false;
let previous;

const Musiclist = [
    {
        name: "Let The World Burn",
        source: "Music.mp3",
        artistName: "Chris Grey",
        imgSource: "LetTheWorldBurn.jpg",
        color: "orangered",
        duration: "02:43"
    },
    {
        name: "Mine",
        source: "Mine.mp3",
        artistName: "Bazzi",
        imgSource: "Mine.png",
        color: "lightblue",
        duration: "02:14"
    },
    {
        name: "Lost On You",
        source: "Lost On You.mp3",
        artistName: "LP",
        imgSource: "Lost On You.jpg",
        color: "white",
        duration: "04:30"
    },
    {
        name: "Outrunning Karma",
        source: "Outrunning Karma.mp3",
        artistName: "Alec Benjamin",
        imgSource: "Outrunning Karma.jpg",
        color: "rgb(107, 11, 86)",
        duration: "03:08"
    },
    {
        name: "Beautiful",
        source: "Beautiful.mp3",
        artistName: "Bazzi",
        imgSource: "Beautiful.jpg",
        color: "yellow",
        duration: "03:00"
    },
    {
        name: "Hurts So Good",
        source: "Hurts So Good.mp3",
        artistName: "John Mellencamp",
        imgSource: "Hurts So Good.jpg",
        color: "lightgoldenrodyellow",
        duration: "03:28"
    },
    {
        name: "OverNight",
        source: "Overnight.mp3",
        artistName: "Queen Herby",
        imgSource: "Overnight.png",
        color: "darkmagenta",
        duration: "02:15"
    },
    {
        name: "Runaway",
        source: "Runaway.mp3",
        artistName: "Aurora",
        imgSource: "Runaway.png",
        color: "black",
        duration: "04:09"
    }

]

MusicContainer.innerHTML = "";
MusicContainer.innerHTML = `<h1 style = "font-size:36px; color:white;">Songs List</h1>`;
for (let i = 0; i < Musiclist.length; i++) {
    MusicContainer.innerHTML += SongList.outerHTML;
}

Open.addEventListener('click', () => {
    for (var i = 0; i < Musiclist.length; i++) {
        Tittle[i].textContent = Musiclist[i].name;
        Singer[i].textContent = Musiclist[i].artistName;
        Duration[i].textContent = Musiclist[i].duration;
        Songimage[i].style.backgroundImage = `url('${Musiclist[i].imgSource}')`;
    }
});

for (let i = 0; i < Musiclist.length; i++) {

    SongsLists[i].addEventListener("click", () => {
        index = i;
        for (let i = 0; i < Musiclist.length; i++) {
            SongsLists[i].style.color = "black";
        }
        SongsLists[index].style.color = "white";
        MusicPlay();
    });

}

function fillElements() {
    Song.src = Musiclist[index].source;
    Name.textContent = Musiclist[index].name;
    Artist.textContent = Musiclist[index].artistName;
    Photo.src = Musiclist[index].imgSource;
    ProgressBar.style.backgroundColor = Musiclist[index].color;
    document.body.style.backgroundImage = `url('${Musiclist[index].imgSource}')`;
    document.body.style.backdropFilter = "blur(50px)";
}
fillElements();
function MusicPlay() {
    fillElements();
    Song.play();
    Container.style.backgroundColor = "rgba(20, 18, 18, 0.216)";
    setInterval(() => {
        var Minutes = parseInt(Song.currentTime / 60) % 60;
        var Seconds = parseInt(Song.currentTime % 60);
        let percentage = Math.floor((Song.currentTime / Song.duration) * 100);
        ProgressBar.style.width = `${percentage + "%"}`;
        let formattedTime = `${(Minutes.toString().padStart(2, "0"))}:${Seconds.toString().padStart(2, "0")}`;
        StartTime.textContent = formattedTime;
        let endSeconds = parseInt(Song.duration % 60).toString();
        let endMinutes = parseInt((Song.duration / 60) % 60).toString();
        EndTime.textContent = `${endMinutes.padStart(2, "0")}:` + `${endSeconds.padStart(2, "0")}`;
        Seek.addEventListener('change', () => {
            Song.currentTime = (Seek.value / 100) * Song.duration;
        });
    }, 1000)
    Play.style.display = "none";
    Pause.style.display = "grid";

    Song.addEventListener('ended', () => {
        if (isLooping) {
            Song.currentTime = 0;
            Song.play();
        }
        else {
            NextSong();
        }
    });
}

Seek.onclick = function (e) {
    Song.currentTime = parseInt((e.offsetX / Seek.offsetWidth) * Song.duration);
}
function PauseMusic() {
    Song.pause();
    Container.style.backgroundColor = "rgba(33, 29, 29, 0.097)"
    Pause.style.display = "none";
    Play.style.display = "grid";
}
function NextSong() {
    if (isShuffled) {
        do {
            index = Math.floor(Math.random() * Musiclist.length);
            Song.src = Musiclist[index].source;
        } while (index == previous)
        previous = index;
        MusicPlay();
    }
    else {
        index++;
        if (index > Musiclist.length - 1) {
            index = 0;
            Song.src = Musiclist[index].source;
            MusicPlay();
        }
        else {
            Song.src = Musiclist[index].source;
            MusicPlay();
        }
    }
}
function PreviousSong() {
    index--;
    if (isShuffled) {
        index = Math.floor(Math.random() * Musiclist.length) + 1;
        Song.src = Musiclist[index].source;
        MusicPlay();
    }
    else {
        if (index < 0) {
            index = Musiclist.length - 1;
            Song.src = Musiclist[index].source;
            MusicPlay();
        }
        else {
            Song.src = Musiclist[index].source;
            MusicPlay();
        }
    }
}
let counter = 0;
function Openlist() {
    if (counter == 0) {
        Open.style.backgroundColor = "rgba(0, 0, 0, 0.333)";
        Open.style.color = "white";
        Container.style.transform = "translateX(950px)";
        MusicContainer.style.transform = "translateY(0px)";
        Open.style.transform = "rotate(180deg)";
        counter++;
    }
    else {
        Open.style.backgroundColor = "rgba(255, 255, 255, 0.201)";
        Open.style.color = "black";
        Container.style.transform = "translateX(0px)";
        MusicContainer.style.transform = "translateY(-900px)";
        Open.style.transform = "rotate(0deg)";
        counter = 0;
    }

}
function Shuffling() {
    if (isShuffled) {
        document.getElementById("Shuffle").style.background = `rgba(255, 255, 255, 0.201)`;
        document.getElementById("Shuffle").style.color = "white";
    }
    else {
        document.getElementById("Shuffle").style.backgroundColor = "black";
        document.getElementById("Shuffle").style.color = "white";
    }
    isShuffled = !isShuffled;
}
function Looping() {
    if (isLooping) {
        document.getElementById("Loop").style.background = `rgba(255, 255, 255, 0.201)`;
        document.getElementById("Loop").style.color = "white";
    }
    else {
        document.getElementById("Loop").style.backgroundColor = "black";
        document.getElementById("Loop").style.color = "white";
    }
    isLooping = !isLooping;
}

