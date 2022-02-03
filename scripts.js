/*
STEPS FOR THIS PROCCESS
1. get our elements
2. build our functions
3. hook up the event listeners
*/ 

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//toggle function- pause() is a property that lives on the video
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

//updateButton will change the button from play to pause when the video is playing or paused
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

//this will change the current time of the video based on which dataset is attached to the skip button that was clicked
//wrap in parse float bc it returns a string at first
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}
//changes volume and speed

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}
//will update the progress bar in real time

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
//this will enable you to skip to certain times/parts in the video through the progress bar
//need the event

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
//these two will allow you to click the play button or video screen to play and pause video
//also attaches the pause or play button

video.addEventListener('timeupdate', handleProgress);
//attaching the progress bar when the video triggers the event time update
//with this when its paused it wont run the function

skipButtons.forEach(button => button.addEventListener('click', skip));
//goes through the foward and back skip buttons- when played runs function
//this is connected to a data-set so it will set the this to whatever that defined data set is (forwrds 25 seconds or back 10)

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
//looking through range buttons- if you use queryselectorAll you will pry have to loop through node list with forEach
ranges.forEach(range => range.addEventListener('mouseover', handleRangeUpdate));
//when you move the range button it will run handleRangeUpdate

//need to create flag variable for the scrub
let mousedown = false;

progress.addEventListener('click', scrub);
//connects clicks on progress bar to skip to where you click in time in the vide
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
//now if you move the mouse on progress bar it will drag and change the time
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//when someone moves their mouse and the mouse down is true it moves on to setting the progress using scrub- if the mousedown is false it wont run the scrub
//need to pass event because the function is based on the screen position of the mouse down even