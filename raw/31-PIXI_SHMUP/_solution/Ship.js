//Ship
GAME.Ship = function(config){
     //the space ship
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.speed = config.speed;
    this.distance = 0;
    this.isHitting = false;

    this.texture = GAME.assets.space_ship.texture;

    this.view = new PIXI.Sprite(this.texture);
    this.view.buttonMode = true;
    this.view.anchor.set(0.5, 0.5);
    this.view.position.set(this.x, this.y);

    this.bounds = {
        top :  this.view.height/ 2,
        bottom : GAME.stage.height -  this.view.height/2,
        left :  this.view.width /2,
        right : GAME.stage.width -  this.view.width/2
    }

    GAME.stage.container.addChild(this.view);
}

GAME.Ship.prototype.hit = function() {
    var _self = this;
    if(!this.isHitting){
        this.isHitting = true;
        this.view.texture = GAME.assets.space_ship_hit.texture; 
        setTimeout(function(){
            _self.isHitting = false;
            _self.view.texture = GAME.assets.space_ship.texture; 
        }, 200)
    }
}   

GAME.Ship.prototype.update = function() {
    if(KEYBOARD.up){
        this.y -= this.speed;
    }
    if(KEYBOARD.down){
        this.y += this.speed;
    }
    if(KEYBOARD.left){
        this.x -= this.speed;
    }
    if(KEYBOARD.right){
        this.x += this.speed;
    }

    //checkCollision
    if(this.x > this.bounds.right){
        this.x = this.bounds.right;
    }
    if(this.x < this.bounds.left){
        this.x = this.bounds.left;
    }
    if(this.y < this.bounds.top){
        this.y = this.bounds.top;
    }
    if(this.y > this.bounds.bottom){
        this.y = this.bounds.bottom;
    }

    /*
    if(this.isHitting){
        this.view.texture = GAME.assets.space_ship_hit.texture; 
    } else {
        this.view.texture = GAME.assets.space_ship.texture;
    }
    */

    for (var i = 0; i < GAME.objects.enemies.length; i++) {
        if(MathUtil.hitSquare(this, GAME.objects.enemies[i])){
            this.hit();
            break;
        } 
    }

}



GAME.Ship.prototype.move = function() {
    /* PIXI GFX */
    /*
    if(this.isHitting){
        this.view.texture = GAME.assets.space_ship_hit.texture; 
    } else {
        this.view.texture = GAME.assets.space_ship.texture;
    }
    */

    this.view.position.x = this.x;
    this.view.position.y = this.y;
    this.view.rotation = this.rotation;
}












