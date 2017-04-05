// BUTTON
GAME.Button = function(config){
    var _self = this;

    _self.x = config.x;
    _self.y = config.y;

    _self.up = config.up;
    _self.over = config.over;
    _self.down = config.down;

    _self.onStart = config.onStart || function(){};
    _self.onEnd = config.onEnd || function(){};

    _self.rotation = config.rotation || 0;

    _self.view = new PIXI.Sprite(config.up);
    _self.view.buttonMode = true;
    _self.view.anchor.set(0.5, 0.5);
    _self.view.position.set(_self.x, _self.y);
    _self.view.rotation = _self.rotation;
    _self.view.alpha = .5;
    // make the button interactive..
    _self.view.interactive = true;

    //button.action = config.action || function(){};
    _self.action = config.action || function(){};

    //button.tap = button.click = function(data) {};
   
    _self.view.mouseover = function(data){
        _self.view.alpha = .8;
    }
    _self.view.mouseout = function(data){
        _self.view.alpha = .5;
    }

    _self.view.mousedown = _self.view.touchstart = function(data) {
        _self.view.texture = config.down;
        _self.view.alpha = 1;
        KEYBOARD.keyDown(config.key);
        _self.onStart();
    };

    _self.view.mouseup =  _self.view.mouseupoutside = _self.view.touchend =  _self.view.touchendoutside = function(data) {
        _self.view.texture = config.up;
        _self.view.alpha = .5;
        KEYBOARD.keyUp(config.key);
        _self.onEnd();
    };

    GAME.stage.container.addChild(_self.view);
}
