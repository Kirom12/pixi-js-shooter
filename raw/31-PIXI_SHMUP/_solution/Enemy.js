//Enemy
GAME.Enemy = function(){

    this.x = GAME.stage.width;
    this.y = randomRange(50, GAME.stage.height - 50); //GAME.stage.height/2; //

    this.width = 30;
    this.height = 20;
    this.speed = randomRange(2, 6);
    this.wave = randomRange(0, 4);
    this.isAnimating = false;

    //the laser shot

    this.view = new PIXI.Container();
    //_self.enemy.buttonMode = true;
    this.view.pivot.set(0.5, 0.5);
    this.view.position.set(this.x, this.y);
   

    this.enemySprite = new PIXI.Sprite(GAME.assets.enemy.texture);

    // EXPLODE MOVIE CLIP
    var explosionTextures = [];
    for(var prop in GAME.assets.explode.textures){
        explosionTextures.push( GAME.assets.explode.textures[prop] );
    }

    // create an explosion MovieCli
    this.explosion = new PIXI.extras.MovieClip(explosionTextures);
    this.explosion.anchor.set(0.5, 0.5);
    this.explosion.visible = false;
    this.explosion.loop = false;
    this.explosion.rotation = Math.random() * Math.PI;
    this.explosion.animationSpeed = 1;
    this.explosion.scale.x = this.explosion.scale.y = 0.5 + Math.random();

    this.view.addChild(this.enemySprite);
    this.view.addChild(this.explosion);
    
    // CREATION and adding to the view
    GAME.layers.enemies.addChild(this.view);
    GAME.objects.enemies.push(this);
}

GAME.Enemy.prototype.explode = function(){
    var _self = this;

    GAME.score.count += 100;
    GAME.score.view.text = "SCORE : " + GAME.score.count;
   
    if(!this.isAnimating){
        this.isAnimating = true;
        this.explosion.visible = true;
        this.explosion.onComplete = function(){
            _self.destroy();
        }
        this.explosion.play();
    }
    
}

GAME.Enemy.prototype.destroy = function(){
    /// PIXI GFX
    GAME.layers.enemies.removeChild(this.view);
    /// REMOVE FROM ARRAY 
    var key = GAME.objects.enemies.indexOf(this);
    GAME.objects.enemies.splice(key, 1);
}


GAME.Enemy.prototype.update = function(){
    this.x -= this.speed;
    this.y += (Math.sin(this.x / 50) * this.wave) / this.speed;
    
    //hitTest with bullets
    /*if(MathUtil.hitSquare(this, GAME.ship)){
        GAME.ship.isHitting = true;
    } else {
        GAME.ship.isHitting = false;
    }*/

    //out of screen
    if(this.x < 0){
        this.destroy();
    }
 
}

GAME.Enemy.prototype.move = function(){
    /* PIXI GFX */
    this.view.position.x = this.x;
    this.view.position.y = this.y;
    this.view.rotation = this.rotation;
}

