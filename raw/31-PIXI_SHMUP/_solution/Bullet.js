GAME.Bullet = function(config){
    var _self = this;
    
    _self.ticker = 0        
    _self.tick = config.tick || .1;

    _self.x = config.x;
    _self.y = config.y;
    _self.rotation = config.rotation || 0;
    _self.width = 34;
    _self.height = 18;
    _self.velocity = config.velocity || 5;

    /* PIXI GFX */
    _self.view = new PIXI.Sprite(GAME.assets.bullet.texture);
    _self.view.anchor.set(0.5, 0.5);
    _self.view.position.set(_self.x, _self.y);
    // CREATION and adding to the view
    GAME.layers.bullets.addChild( _self.view );
    GAME.objects.bullets.push(_self);
}

GAME.Bullet.prototype.hide = function(){
    /// PIXI GFX
    this.view.alpha = 0;
}

GAME.Bullet.prototype.destroy = function(){
    /// PIXI GFX
    GAME.layers.bullets.removeChild(this.view);
    /// REMOVE FROM ARRAY 
    var key = GAME.objects.bullets.indexOf(this);
    GAME.objects.bullets.splice(key, 1);
}

GAME.Bullet.prototype.update = function(){
    this.ticker += this.tick;
    this.x += this.velocity;

    //out of screen
    if(this.x < 0 || this.x > GAME.stage.width){
        this.destroy();
    }

    for (var i = 0; i < GAME.objects.enemies.length; i++) {
       if(MathUtil.hitSquare(this, GAME.objects.enemies[i])){
            this.destroy();
            GAME.objects.enemies[i].explode();
            break;
        }
    }
}

GAME.Bullet.prototype.move = function(){
    /* PIXI GFX */
    this.view.position.x = this.x;
    this.view.position.y = this.y;
    this.view.rotation = this.rotation;  
}
