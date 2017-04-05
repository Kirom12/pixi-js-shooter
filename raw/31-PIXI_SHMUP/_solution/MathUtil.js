MathUtil = {}

MathUtil.RADIANS = Math.PI / 180;
MathUtil.DEGREES = 180 / Math.PI;

MathUtil.rndRange = function(min, max){
    return min + (Math.random() * (max - min));
}

MathUtil.rndIntRange = function(min, max){
    return Math.round(MathUtil.rndRange(min, max));
}

MathUtil.toRadians = function(degrees){
    return degrees * MathUtil.RADIANS;
}

MathUtil.toDegrees = function(radians){
    return radians * MathUtil.DEGREES;
}

MathUtil.sinusoide = function(obj, a, b) {
    obj.x = obj.time;
    obj.y = a * Math.sin(obj.x / b);
}

MathUtil.parabole = function(obj, a, step) {
    obj.x = a * Math.cos(obj.time / step) * Math.cos(obj.time / step) / Math.sin(obj.time / step);
    obj.y = a * Math.sin(obj.time / step) * Math.sin(obj.time / step) / Math.cos(obj.time / step);
}
MathUtil.boucle = function(obj, a, b, step) {
    obj.x = a * Math.cos(obj.time / step);
    obj.y = b * Math.sin(obj.time / step);
}

MathUtil.translate = function(obj, x, y) {
    obj.x = obj.x + x;
    obj.y = obj.y + y;
}

MathUtil.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){
    if (x1 + w1 > x2){
        if (x1 < x2 + w2){
            if (y1 + h1 > y2){
                if (y1 < y2 + h2){
                    return true;
                }
            }
        }
    }

    return false;
}


MathUtil.hitSquare = function(objA, objB){
    if (objA.x + objA.width > objB.x){
        if (objA.x < objB.x + objB.width){

            if (objA.y + objA.height > objB.y){
                if (objA.y < objB.y + objB.height){
                    return true;
                }
            }
        }
    }

    return false;
}
