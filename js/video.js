var video = document.getElementById("videoBox"),
    wrap = document.querySelector(".wrap");
//获取三个按钮
var prev = document.querySelector(".prev"),
    prevId = document.getElementById("prevId");
    play = document.querySelector(".play"),
    next = document.querySelector(".wrap .next");
//进度条
var bar = document.querySelector('.wrap .nameBar .bar'),
    barPlay = document.querySelector(".wrap .nameBar .bar .bar-play"),
    barControl = document.querySelector(".wrap .nameBar .bar .bar-control"),
    fullScreen = document.querySelector(".wrap .fullScreen"), //全屏
    volume = document.querySelector(".wrap .volume"), //音量
    volBar = document.querySelector(".volume .volBar"),
    horn = document.querySelector('.volume .horn'),
    volumeControl = document.querySelector(".volumeControl"),
    volCol = document.querySelector(".volBar span");

barWidth = bar.offsetWidth;
console.log(barWidth);
//    时间
var playTime = document.querySelector(".wrap .time-play"),
    duration = document.querySelector(".wrap .time-duration");
//      视频

console.log(video);
// index = 0;
//     按钮事件
// prev.onclick = function (e) {
//     if (video.length === 0) return;
//     else if (index === 0) index = video.length -1;
//     else index--;
//     reload();
// };

play.onclick = function (e) {
    // if (video.readyState < 3)return;
    var icon = this.firstElementChild;
    console.log(icon.className);
    if (icon.className == "fa fa-play") {
        icon.className = "fa fa-pause";
        video.play();
    }else {
        icon.className = "fa fa-play";
        video.pause()
    }

}
// next.onclick = function (e) {
//     if (video.length === 0) return;
//     else if (index === video.length - 1) index = 0;
//     else index++;
//     // reload();
// }

//进度条处理

barControl.onmousedown = function (e) { //控制条（杆）
    console.log('move');
    window.onmousemove = function (e) {
        var length = e.clientX - bar.getBoundingClientRect().left;
        if (length <= 0) {
            changeBar(0,-6);
            video.currentTime = 0;
        }else  if (length >= barWidth) {
            changeBar(barWidth,barWidth-6);
            video.currentTime = video.duration;
        }else {
            changeBar(length,length-6);
            video.currentTime = length/barWidth*video.duration;
        }
    };

    window.onmouseup = function (e) {
        window.onmouseup = null;
        window.onmousemove = null;
    }
}
//轨道的点击
bar.onclick = function (e) {
    
    var length = e.clientX - bar.getBoundingClientRect().left;
    changeBar(length,length-6);
    video.currentTime = length / barWidth*video.duration;
    playTime.innerHTML = timeCon(video.currentTime);
    console.log(length);
    
}

//

video.ontimeupdate = function () {
    timeUpDate();
}

//音量
horn.onmouseover = function () {
    var flag = true;
    volBar.style.display = "block";


}
horn.onmouseout = function () {
    volBar.style.display = "none";
}
// volCol.onmousedown = function (e) {
//     volCol.onmousemove = function () {
//         console.log('ad');
//     }
// }

//全屏
console.log(fullScreen);
fullScreen.onclick = function () {
    if(video.requestFullscreen){
    
        video.requestFullscreen();
    }
//FireFox
    else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
//Chrome等
    else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    }
//IE11
    else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

//播放滑块的位置
function changeBar(width,left) {
    barPlay.style.width = width + "px";
    barControl.style.left = left + "px";
    // console.log('asd');
}

//时间转化  >具体的时间
function timeCon(num) {
    var time = Math.floor(num),
        min = Math.floor(time / 60), //分
        sec = Math.floor(time % 60); //秒
    return (min>=10?min:'0'+min)+':'+(sec>=10?sec:'0'+sec);
}
//动态
function timeUpDate(event) {
    var nowTime = video.currentTime,
        allTime = video.duration;
    playTime.innerHTML = timeCon(nowTime);
    duration.innerHTML = timeCon(allTime);
    var len = nowTime / allTime * 400;
    
    return len <= 6? changeBar(0,0) : changeBar(len,len-6);
    
}


//弹窗
var fade = document.getElementById('fade');
var myDiv = document.getElementById('myDiv');
function  showWin() { //显示
    alert('adf');
    console.log(fade);
    fade.style.display = "block";
    myDiv.style.display = "block";
    $("#myDiv").animate({top:"20%"},800);
    fade.style.width = document.body.scrollWidth;
    fade.style.height = document.body.height;
}

function  hideWin() { //隐藏
    fade.style.display = "none";
    myDiv.style.display = "none";
}

//
var select = document.getElementById("select");
var check = document.getElementById("tui-fei");
console.log(check);
console.log(select);
$("#select").on("change",function () {
    if ($("option:selected",this).val() == 4) {
        console.log("asd");
        $("#word").show();
    } else{
        $("#word").hide();
    }
})


