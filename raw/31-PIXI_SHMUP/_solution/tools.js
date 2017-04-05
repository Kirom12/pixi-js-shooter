if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

PIXI.sayHello = function(){}; //remove pixi sayhello ha ha ha !

var randomRange = function (min, max) {
    return Math.random() * (max - min) + min;
}

var PI = Math.PI;


function getDistance(point1, point2) {
    var xs = point2.x - point1.x;
    xs = xs * xs;
    var ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys);
}

var getDegreeDirection =  function(x1, y1, x2, y2){
    return Math.atan2(y2 - y1, x2 - x1);// * 180 / Math.PI;
}

function toggleFullScreen(el) {

  var domElement = el || document;


  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods

    if (domElement.requestFullscreen) {
      domElement.requestFullscreen();
    } else if (domElement.mozRequestFullScreen) {
      domElement.mozRequestFullScreen();
    } else if (domElement.webkitRequestFullscreen) {
      domElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }

    //return domElement;

  } else {

    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }

  }

}

    