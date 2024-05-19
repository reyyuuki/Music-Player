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

let index = 1;
let isShuffled = false;
let isLooping = false;
let previous;

const Musiclist = [
    {
        name: "Let The World Burn",
        source: "Music.mp3",
        artistName: "Chris Grey",
        imgSource: "LetTheWorldBurn.jpg",
        color: "orange",
        duration: "2:43"
    },
    {
        name: "Lost On You",
        source: "Lost On You.mp3",
        artistName: "LP",
        imgSource: "Lost On You.jpg",
        color: "white",
        duration: "4:30"
    },
    {
        name: "Outrunning Karma",
        source: "Outrunning Karma.mp3",
        artistName: "Alec Benjamin",
        imgSource: "Outrunning Karma.jpg",
        color: "black",
        duration: "3:08"
    },
    {
        name: "Hurts So Good",
        source: "Hurts So Good.mp3",
        artistName: "John Mellencamp",
        imgSource: "Hurts So Good.jpg",
        color: "brown",
        duration: "3:28"
    },
    {
        name: "Runaway",
        source: "Runaway.mp3",
        artistName: "Aurora",
        imgSource: "Runaway.png",
        color: "grey",
        duration: "4:09"
    }

]

MusicContainer.innerHTML = "";
MusicContainer.innerHTML = `<h1 style = "transform: translateY(-40px);font-size:36px; color:white;">Songs List</h1>`;
for(let i = 0; i < Musiclist.length; i++){
    MusicContainer.innerHTML += SongList.outerHTML;
}

 Open.addEventListener('click', () => {
    for(var i = 0; i < Musiclist.length; i++) {
    Tittle[i].textContent = Musiclist[i].name;
    Singer[i].textContent = Musiclist[i].artistName;
    Duration[i].textContent = Musiclist[i].duration;
    Songimage[i].style.backgroundImage = `url('${Musiclist[i].imgSource}')`;
    }
 });

 for(let i = 0; i < Musiclist.length; i++) {
   
 SongsLists[i].addEventListener("click",() => {
    index = i;
    MusicPlay();
});

 }

function fillElements(){
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
    Song.src = Musiclist[index].source;
    Name.textContent = Musiclist[index].name;
    Artist.textContent = Musiclist[index].artistName;
    Photo.src = Musiclist[index].imgSource;
    ProgressBar.style.backgroundColor = Musiclist[index].color;
    document.body.style.backgroundImage = `url('${Musiclist[index].imgSource}')`;
    document.body.style.backdropFilter = "blur(50px)";

    Song.play();
    setInterval(() => {
        var Minutes = parseInt(Song.currentTime / 60) % 60;
        var Seconds = parseInt(Song.currentTime % 60);
        let percentage = Math.floor((Song.currentTime / Song.duration)*100);
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

Seek.onclick = function(e){
    Song.currentTime = parseInt((e.offsetX/Seek.offsetWidth)*Song.duration);
    console.log(Song.currentTime);
}
function PauseMusic() {
    Song.pause();
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
      else{
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
let counter = 0;
function Openlist(){
    if(counter == 0){
        Container.style.transform = "translateX(850px)";
        MusicContainer.style.transform ="translateY(0px)";
        Open.style.transform = "rotate(180deg)";
        counter++;
    }
    else{
        Container.style.transform = "translateX(0px)";
        MusicContainer.style.transform ="translateY(-700px)";
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
    isShuffled = true;
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
    isLooping = true;
  }

