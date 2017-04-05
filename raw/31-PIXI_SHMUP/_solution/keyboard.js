var KEYBOARD = {
    up : false,
    down : false,
    left : false,
    right : false,
    space : false,
    keyDown : function(key){
        switch(key){
            case 38:
            case 90:
            case "up":
                KEYBOARD.up = true;
            break;
            case 39:
            case 68:
            case "right":
                KEYBOARD.right = true;
            break;
            case 40:
            case 83:
            case "down":
                KEYBOARD.down = true;
            break;
            case 37:
            case 81:
            case "left":
                KEYBOARD.left = true;
            break;
            case 32:
            case "space":
                KEYBOARD.space = true;
            break;
        }
    },
    keyUp : function(key){
        switch(key){
            case 38:
            case 90:
            case "up":
                KEYBOARD.up = false;
            break;
            case 39:
            case 68:
            case "right":
                KEYBOARD.right = false;
            break;
            case 40:
            case 83:
            case "down":
                KEYBOARD.down = false;
            break;
            case 37:
            case 81:
            case "left":
                KEYBOARD.left = false;
            break;
            case 32:
            case "space":
                KEYBOARD.space = false;
            break;
        }
    }
}

window.addEventListener("keydown", function(e){
    KEYBOARD.keyDown(e.keyCode || e.which);
}, false);
window.addEventListener("keyup", function(e){
    KEYBOARD.keyUp(e.keyCode || e.which);
}, false);

