var buttonMenu = document.querySelectorAll('.items button')
buttonMenu.forEach((item, index)=>{
    item.onclick = function(){
        window.location.href = 'music1.html'
    }
})
var songs = document.querySelectorAll('.songs')
songs.forEach((item, index)=>{
    item.onclick = function(){
        window.location.href = 'music1.html'
    }
})



var next_songs1 = document.querySelector('.setup-audio .ns1');
var prev_songs1 = document.querySelector('.setup-audio .ps1');
var images_songs1 = document.querySelectorAll('.song-img1 img');
next_songs1.addEventListener('click', function(){
    images_songs1.forEach((item,index)=>{
        item.src =  'bangkhuang.jpg';
    });
});
var images_songs1 = document.querySelectorAll('.song-img1 img');
prev_songs1.addEventListener('click', function(){
    images_songs1.forEach((item,index)=>{
        item.src =  '2022-02-23.png';
    });
});

var next_songs2 = document.querySelector('.setup-audio .ns2');
var prev_songs2 = document.querySelector('.setup-audio .ps2');
var images_songs2 = document.querySelectorAll('.song-img2 img');
next_songs2.addEventListener('click', function(){
    images_songs2.forEach((item,index)=>{
        item.src =  'bangkhuang.jpg';
    });
});
prev_songs2.addEventListener('click', function(){
    images_songs2.forEach((item,index)=>{
        item.src =  '2022-02-23.png';
    });
});

var next_songs3 = document.querySelector('.setup-audio .ns3');
var prev_songs3 = document.querySelector('.setup-audio .ps3');
var images_songs3 = document.querySelectorAll('.song-img3 img');
next_songs3.addEventListener('click', function(){
    images_songs3.forEach((item,index)=>{
        item.src =  'bangkhuang.jpg';
    });
});
prev_songs3.addEventListener('click', function(){
    images_songs3.forEach((item,index)=>{
        item.src =  '2022-02-23.png';
    });
});
