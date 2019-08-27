window.onload = function () {
    // 1.自动轮播，定时器，无缝衔接，动画瞬间定位
    // 2.分页随着轮播图滚动改变到响应的分页器
    // 3.手指滑动，touch，记录坐标轴的改变
    // 4.滑动不到一定距离时，自动的吸附回去
    // 5.
    var imgageCount = 5;
    var banner = document.querySelector('#loopdiv');
    // 图片的宽度
    var width = 10;
    console.log(width);
    var imageBox = banner.querySelector('#looplist');
    // 分页器
    var paginationBox = banner.querySelector('.pagination');
    // 所有的分页点
    var points = paginationBox.querySelectorAll('li');
    console.log(points)
    // 加过渡
    var addTransition = function () {
        imageBox.style.transition = "all 0.3s";
        imageBox.style.webkitTransition = "all 0.3s";
    }
    // 清除过渡
    var removeTransition = function () {
        imageBox.style.transition = "none";
        imageBox.style.webkitTransition = "none";
    }
    // 定位
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + '%)';
        imageBox.style.webkittransform = 'translateX(' + translateX + '%)';
    }
    // 自动轮播-定时器 、 无缝衔接 、动画结束
    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition(); //加过渡
        setTranslateX(-index * width)
    }, 2000);

    my.transitionEnd(imageBox, function () {
        if (index > imgageCount) {
            index = 1;
        } else if (index <= 0) {
            index = imgageCount
        }
        removeTransition();
        setTranslateX(-index * width);
        setPoint()
    });

    var setPoint = function () {
        // 清除now样式
        for (var i = 0; i < points.length; i++) {
            points[i].className = ''
        }
        points[index - 1].className = 'now'
    }

    // touch
    var touchX = 0; // 触摸点的位置 x 的位置
    var moveX = 0; // 滑动 x 的位置
    var distanceX = 0; // 滑动的距离
    var isMove = false; // 是否滑动过

    imageBox.addEventListener('touchstart', function (e) {
        clearInterval(timer); //清除定时器
        touchX = e.touches[0].clientX; // 记录起始
        console.log(touchX, e)
    });

    imageBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - touchX;
        removeTransition();
        setTranslateX(-index * width + distanceX);
        isMove = true;
    });

    imageBox.addEventListener('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > width / 3) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
        }
        addTransition();
        setTranslateX(-index * width);

        if (index > imgageCount) {
            index = 1;
        } else if (index <= 0) {
            index = imgageCount;
        }

        touchX = 0;
        moveX = 0;
        isMove = 0;

        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width)
        },3000);
    })
};