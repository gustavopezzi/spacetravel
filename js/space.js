$(document).ready(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var c = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var centerX = width / 2;
    var centerY = height / 2;

    $('canvas').fadeTo(2000, 1);

    function setCanvas() {
        c.width = width;
        c.height = height;

        centerX = width / 2;
        centerY = height / 2;

        mousex = width / 2;
        mousey = height / 2;
    }

    window.onload = function() {
        setCanvas();
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        draw();
    }

    window.onresize = function() {
        setCanvas();
    }

    window.onmousemove = function(event) {
        mousex = event.clientX;
        mousey = event.clientY;
    }

    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', wheel, false);

    window.onmousewheel = document.onmousewheel = wheel;

    function wheel(e) {
        var delta = 0;
        
        if (e.detail)
            delta = -e.detail / 3;
        else
            delta = e.wheelDelta / 120;
    
        var doff = (delta / 25);
        
        if (delta > 0 && Z + doff <= 0.5 || delta < 0 && Z + doff >= 0.01)
            Z += (delta / 25);
    }

    var warpZ = 10;
    var units = 2000;
    var stars = [];
    var cycle = 0;
    var Z = 0.050 + 1 / 25;

    function resetstar(a) {
        a.x = (Math.random() * width - (width * 0.5)) * warpZ;
        a.y = (Math.random() * height - (height * 0.5)) * warpZ;
        a.z = warpZ;
        a.px = 0;
        a.py = 0;
    }

    for (var i = 0, n; i < units; i++) {
        n = {};
        resetstar(n);
        stars.push(n);
    }

    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, width, height);

        var cx = (mousex - width / 2) + centerX;
        var cy = (mousey - height / 2) + centerY;

        var sat = Math.floor(Z * 500);

        if (sat > 100)
            sat = 100;

        for (var i = 0; i < units; i++) {
            var n = stars[i];
            var xx = n.x / n.z;
            var yy = n.y / n.z;

            if (n.px !== 0) {
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(xx + cx, yy + cy);
                ctx.lineTo(n.px + cx, n.py + cy);
                ctx.stroke();
            }

            n.px = xx;
            n.py = yy;
            n.z -= Z;

            if (n.z < Z || n.px > width || n.py > height)
                resetstar(n);
        }

        cycle += 0.01;
    };

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function() {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame       ||
                window.oRequestAnimationFrame         ||
                window.msRequestAnimationFrame        ||
                function(callback, element) {
                    window.setTimeout(callback, 1000/60);
                };
        })();
    }
});