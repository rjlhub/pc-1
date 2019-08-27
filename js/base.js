'user strict'
var iframe;
window.onload = function () {
    var log = console.log.bind(console);
    var $mnavh = document.querySelector(".mnavh");
    var $searchbtn = document.querySelector(".search");
    var $closeSearch = document.querySelector(".close-search");
    var $searchbox = document.querySelector(".search-box");
    iframe = document.querySelector('iframe');

    var head = document.querySelector('header');
    var sidebar = document.querySelector('.sidebar');
    var $navicon = document.querySelector('.navicon');
    var open = false;
    var agent = navigator.userAgent;
    if (/.*Firefox.*/.test(agent)) {
        document.addEventListener("DOMMouseScroll", function (e) {
            e = e || window.event;
            var detail = e.detail;
            if (detail < 0) {
                head.style.top = 0
                sidebar.style.top = 0
            } else {
                head.style.top = -60 + 'px'
                sidebar.style.top = 60 + 'px'
            }
        })
    } else {
        document.onmousewheel = function (e) {
            e = e || window.event;
            var wheelDelta = e.wheelDelta;
            if (wheelDelta > 0) {
                head.style.top = 0
                sidebar.style.top = 60 + 'px'
            } else {
                head.style.top = -60 + 'px'
                sidebar.style.top = 0
            }
        }
    };
    findDimensions();
    window.onresize = findDimensions;

    $searchbtn.onclick = function () {
        if (hasClass(this, 'prompt')) {
            removeClass(this, 'prompt')
            removeClass($searchbox, 'hide')
        } else {
            addClass(this, 'prompt')
            addClass($searchbox, 'hide')
        }
    }

    var toggle;
    // $mnavh.addEventListener('onclick',addClass($mnavh,"open"),false);
    $mnavh.onclick = function (str) {
        if (!hasClass(this, 'open')) {
            addClass(this, 'open')
        } else {
            removeClass(this, 'open')
        }
    };


    $navicon.onclick = function () {
        if (open) {
            removeClass(sidebar, 'open')
            open = false;
        } else {
            addClass(sidebar, 'open')
            open = true;
        }
    }

};

function addClass(elem, str) {
    if (elem.className) {
        var oriName = elem.className;
        var newClass = oriName + " " + str;
        elem.className = newClass;
    } else {
        elem.className = str;
    }
}

function removeClass(elem, str) {
    var string = elem.className,
        index = string.indexOf(str);
    if (index > -1) {
        elem.className = (string.replace(str, "")).trim();
    }
}

function hasClass(elem, str) {
    var cls = str || '';
    if (cls.replace(/\s/g, '').length == 0) {
        return false;
    } else {
        // console.log(new RegExp(' ' + cls + '').test(' ' + elem.className))
        return new RegExp(' ' + cls + '').test(' ' + elem.className);
    }
}
console.log(Date.now(), '时间戳')
window.my = {};

my.transitionEnd = function (dom, callback) {
    if (!dom || typeof dom != 'object') {
        return false;
    }

    dom.addEventListener('transitionEnd', function () {
        callback && callback();
    })
    dom.addEventListener('webkitTransitionEnd', function () {
        callback && callback();
    })
}

my.tap = function (dom, callback) {
    if (dom || typeof dom != 'object') {
        return false;
    }

    var isMove = false; //是否滑动过
    var time = 0;
    dom.addEventListener('touchstart', function () {
        time = Date.now();
    });
    dom.addEventListener('touchmove', function () {
        isMove = true;
    });
    window.addEventListener('touchend', function (e) {
        // 1.没有滑动过
        // 2.响应事件150s,
        if (!isMove && (Date.now() - time) < 150) {
            callback && callback(e);
        }
        // 重置参数
        isMove = false;
        time = 0;
    })
}


var winWidth, winHeight;

function findDimensions() {
    // 获取宽度
    if (window.innerWidth) {
        winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }
    // 获取高度
    if (window.innerHeight) {
        winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }

    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winWidth = document.documentElement.clientWidth;
        winHeight = document.documentElement.clientHeight;
    }

    iframe.style.height = (winHeight - 114) + 'px';
}

