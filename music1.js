var play = document.getElementById('play-songs');
var inforFooter = document.querySelector('.okokok');
var display = document.querySelector('.title-songs .title-songs-img');

var audio = document.getElementById('song-plays');

var changePause1 = document.querySelector('#play-songs i');
var changePause2 = document.querySelector('#play-songs h3');
var changePause3 = document.querySelector('#play i');

var footerPlay = document.querySelector('.button-played #play');
var footerSkipLeft = document.querySelector('.button-played #skip-left');
var footerSkipRight = document.querySelector('.button-played #skip-right');
var footerRepeat = document.querySelector('.button-played #repeat');
var footerRandom = document.querySelector('.button-played #random');


var footerFirstTimeRun = document.querySelector('#start-time');
var footerLastTimeRun = document.querySelector('#end-time');


var runTime = document.querySelector('.playing-time');
var checkPlaySong = false
var checkRandom = false
var checkRepeat = false


var currentIndex = 0
var rotateCD

//chuyen do so thanh phut
function numberToTime(second){
    var minute = 0
    if(second > 59)
    {
        minute = Math.floor(second / 60)
        second = second % 60
    }
    if(minute < 10) minute = '0' + minute
    if(second < 10) second = '0' + second
    return minute + ':' + second
}
console.log(numberToTime(121))
const app = {
    songs: [{
        name: 'Bang Khuang',
        single: 'Justatee',
        pathImg: '2022-02-23.png',
        pathSong: 'music.mp3'
    },
    {
        name: 'Happy New Year',
        single: 'Justatee',
        pathImg: 'bangkhuang.jpg',
        pathSong: 'music.mp3'
    },
    {
        name: 'Happy New Year1',
        single: 'Justatee',
        pathImg: 'bangkhuang.jpg',
        pathSong: 'music.mp3'
    },
    {
        name: 'Happy New Year3',
        single: 'MTP',
        pathImg: 'bangkhuang.jpg',
        pathSong: 'music.mp3'
    }],
    render: function(){
        song1 = this.songs.map(item=>{    
            audio.src = item.pathSong
            return `
            <div class="music-right-body">
                    <div class="music-right-body-title">
                        <div class="mrbt-icon">
                            <i class='bx bx-heart'></i>
                        </div>
                        <div class="mrbt-img">
                            <img src="${item.pathImg}"/>
                        </div>
                        <div class="mrbt-name">
                            <h3>${item.name}</h3>
                            <a href="#">${item.single}</a>
                        </div>
                    </div>
                    <div class="music-right-body-albums">
                        <h3>${item.name}</h3>
                        <i class='bx bx-heart'></i>
                        <i class='bx bx-microphone' ></i>
                    </div>
                    <div class="music-right-body-time">
                        <h3>0</h3>
                    </div>
                    <audio class="song-plays-temp" src="${item.pathSong}"></audio>
            </div>`;
        });
        inforFooter.innerHTML = song1.join(' ');
        //inforFooter.append()
    
    },
    //Neu nhu thay ca the audio thi bai hat se bi lap lai. Neu su dung 1 the audio chi thay src thi oke
    playClickSong: function(){
        var _this = this;
        var clickSong = document.querySelectorAll('.okokok .music-right-body');
        var audioTemp = document.querySelectorAll('.song-plays-temp')
        clickSong.forEach((element,index)=>{
            element.addEventListener('click',function(){
                var notiSong = `<div class="title-songs-img">
                                    <img src="${_this.songs[index].pathImg}"/>
                                </div>
                                <div class="title-songs-name">
                                    <h2>${_this.songs[index].name}</h2>
                                </div>
                                <div class="title-songs-dayrelease">
                                    <h4>${_this.songs[index].single}</h4>
                                    <i class='bx bx-plus'></i>
                                    <h4>Ngay phat hanh</h4>
                                </div>
                                <div class="title-songs-heart">
                                    <h4>4 </h4>
                                    <h4>Luot yeu thich</h4>
                                </div>`
                document.querySelector('.title-songs').innerHTML = notiSong
                display = document.querySelector('.title-songs .title-songs-img');                
                checkPlaySong = true;
                display.style.borderRadius = 50 +'%'; 
                display.style.transition = 0.5 +'s';
                changePause1.classList.remove('bx-play');
                changePause1.classList.add('bx-pause');
                changePause2.innerHTML = 'Pause';
                changePause3.classList.remove('bx-play');
                changePause3.classList.add('bx-pause');
                audio.src = _this.songs[index].pathSong           
                currentIndex = index 
                audio.play()
                rotateCD = display.animate([
                    {transform: 'rotate(360deg)'}
                ],{
                    duration: 10000,
                    interations: Infinity
                }) 
            })
        });
    },
    //duration k the di cung src
    playSong: function(){      
            if(checkPlaySong){
                checkPlaySong = false;
                changePause1.classList.remove('bx-pause');
                changePause1.classList.add('bx-play');
                changePause2.innerHTML = 'Play';
                changePause3.classList.remove('bx-pause');
                changePause3.classList.add('bx-play');
                audio.pause();
                rotateCD.pause()
            }else{
                checkPlaySong = true;  
                changePause1.classList.remove('bx-play');
                changePause1.classList.add('bx-pause');
                changePause2.innerHTML = 'Pause';
                changePause3.classList.remove('bx-play');
                changePause3.classList.add('bx-pause');
                audio.play();
                rotateCD.play()
            }
    },
    footerPlayMid: function(){
        var _this = this;
        footerPlay.onclick = function(){
            _this.playSong();        
        }
        //cap nhat thoi gian bai hat hien tai
        audio.ontimeupdate = function(){
            runTime.max = Math.round(audio.duration)
            runTime.value = Math.round(audio.currentTime)           
            footerFirstTimeRun.innerHTML = numberToTime(runTime.value)
            footerLastTimeRun.innerHTML = numberToTime(runTime.max)
            if(runTime.value == runTime.max && checkRepeat){
                audio.load()
                audio.play()
            }
            else if(runTime.value == runTime.max && !checkRepeat){
                if(currentIndex < _this.songs.length - 1){
                    currentIndex++
                }
                else{
                    currentIndex = 0
                }
                audio.src = _this.songs[currentIndex].pathSong
                var notiSong = `<div class="title-songs-img">
                                    <img src="${_this.songs[currentIndex].pathImg}"/>
                                </div>
                                <div class="title-songs-name">
                                    <h2>${_this.songs[currentIndex].name}</h2>
                                </div>
                                <div class="title-songs-dayrelease">
                                    <h4>${_this.songs[currentIndex].single}</h4>
                                    <i class='bx bx-plus'></i>
                                    <h4>Ngay phat hanh</h4>
                                </div>
                                <div class="title-songs-heart">
                                    <h4>4 </h4>
                                    <h4>Luot yeu thich</h4>
                                </div>`
                document.querySelector('.title-songs').innerHTML = notiSong
                display = document.querySelector('.title-songs .title-songs-img');                
                checkPlaySong = true;
                display.style.borderRadius = 50 +'%'; 
                display.style.transition = 0.5 +'s';  
                changePause1.classList.remove('bx-play');
                changePause1.classList.add('bx-pause');
                changePause2.innerHTML = 'Pause';
                changePause3.classList.remove('bx-play');
                changePause3.classList.add('bx-pause');       
                audio.play()
                rotateCD = display.animate([
                    {transform: 'rotate(360deg)'}
                ],{
                    duration: 10000,
                    interations: Infinity
                }) 
            }
        }
        //tua bai hat tren thanh chay
        runTime.onchange = e => {
            var v = e.target.value
            audio.currentTime = v
        };
        //chuyen bai hat tiep theo
        footerSkipLeft.onclick = function(){
            var randomIndex
            if(checkRandom)
            {
                do
                {
                    randomIndex = Math.floor(Math.random() * _this.songs.length)
                } while(randomIndex == currentIndex)
                currentIndex = randomIndex
                audio.src = _this.songs[currentIndex].pathSong
            }
            else{
                if(currentIndex > 0)
                {
                    currentIndex--
                    audio.src = _this.songs[currentIndex].pathSong
                }
                else{
                    alert('Het bai hat roi!!')
                }
            }    
            var notiSong = `<div class="title-songs-img">
                                    <img src="${_this.songs[currentIndex].pathImg}"/>
                                </div>
                                <div class="title-songs-name">
                                    <h2>${_this.songs[currentIndex].name}</h2>
                                </div>
                                <div class="title-songs-dayrelease">
                                    <h4>${_this.songs[currentIndex].single}</h4>
                                    <i class='bx bx-plus'></i>
                                    <h4>Ngay phat hanh</h4>
                                </div>
                                <div class="title-songs-heart">
                                    <h4>4 </h4>
                                    <h4>Luot yeu thich</h4>
                                </div>`
                document.querySelector('.title-songs').innerHTML = notiSong
                display = document.querySelector('.title-songs .title-songs-img');                
                checkPlaySong = true;
                display.style.borderRadius = 50 +'%'; 
                display.style.transition = 0.5 +'s';  
                changePause1.classList.remove('bx-play');
                changePause1.classList.add('bx-pause');
                changePause2.innerHTML = 'Pause';
                changePause3.classList.remove('bx-play');
                changePause3.classList.add('bx-pause');       
            audio.play()
            rotateCD = display.animate([
                {transform: 'rotate(360deg)'}
            ],{
                duration: 10000,
                interations: Infinity
            }) 
        }
        //chuyen bai hat truoc do
        footerSkipRight.onclick = function(){    
            var randomIndex
            if(checkRandom)
            {
                do
                {
                    randomIndex = Math.floor(Math.random() * _this.songs.length)
                } while(randomIndex == currentIndex)
                currentIndex = randomIndex
                audio.src = _this.songs[currentIndex].pathSong
            }
            else{
                if(currentIndex < _this.songs.length - 1)
                {
                    currentIndex++
                    audio.src = _this.songs[currentIndex].pathSong
                }
                else{
                    alert('Het bai hat rui!!')
                }
            }   
            var notiSong = `<div class="title-songs-img">
                                    <img src="${_this.songs[currentIndex].pathImg}"/>
                                </div>
                                <div class="title-songs-name">
                                    <h2>${_this.songs[currentIndex].name}</h2>
                                </div>
                                <div class="title-songs-dayrelease">
                                    <h4>${_this.songs[currentIndex].single}</h4>
                                    <i class='bx bx-plus'></i>
                                    <h4>Ngay phat hanh</h4>
                                </div>
                                <div class="title-songs-heart">
                                    <h4>4 </h4>
                                    <h4>Luot yeu thich</h4>
                                </div>`
                document.querySelector('.title-songs').innerHTML = notiSong
                display = document.querySelector('.title-songs .title-songs-img');                
                checkPlaySong = true;
                display.style.borderRadius = 50 +'%'; 
                display.style.transition = 0.5 +'s';  
                changePause1.classList.remove('bx-play');
                changePause1.classList.add('bx-pause');
                changePause2.innerHTML = 'Pause';
                changePause3.classList.remove('bx-play');
                changePause3.classList.add('bx-pause');
            audio.play()
                rotateCD = display.animate([
                    {transform: 'rotate(360deg)'}
                ],{
                    duration: 10000,
                    interations: Infinity
                }) 
        }
        //bat tat che do random
        footerRandom.onclick = function(){
            checkRandom = !checkRandom
            if(checkRandom){
                footerRandom.style.color = 'cornflowerblue'
            }
            else{
                footerRandom.style.color = 'white' 
            }
        }
        //bat tat che do lap lai
        footerRepeat.onclick = function(){
            checkRepeat = !checkRepeat
            if(checkRepeat){
                footerRepeat.style.color = 'cornflowerblue'
            }
            else{
                footerRepeat.style.color = 'white' 
            }
        }
    },
    middlePlay: function(){
        var _this = this;
        var check = false;
        play.onclick = function(){
            _this.playSong();
        };
    },
    footerPlayRight: function(){
        
    },
    start: function(){
        this.render()
        this.playClickSong()
        this.middlePlay()
        this.footerPlayMid()
    }
};
app.start();