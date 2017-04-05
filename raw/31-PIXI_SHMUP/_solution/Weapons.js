//WEAPON
GAME.Weapon = {}


GAME.Weapon.allowed = true;
GAME.Weapon.timeout = 0;
GAME.Weapon.cadence = 10;
GAME.Weapon.current = null;

GAME.Weapon.type = "simple";

GAME.Weapon.names = ["simple","double","tailgun"];

GAME.Weapon.set = function(type){
    this.type = type;
    this.timeout = 0;
    this.current = GAME.Weapon[GAME.Weapon.type];
    this.cadence = this.current.cadence;
}

GAME.Weapon.timing = function(){
    if(this.timeout == this.cadence){
        this.timeout = 0;
        this.allowed = true;
    }
    this.timeout += 1;
}

GAME.Weapon.fire = function(){
    if(this.allowed){
        this.allowed = false;
        this.current.fire(); 
    }
}

GAME.Weapon.simple = {
    cadence : 16,
    fire : function(){
        new GAME.Bullet({
            x : GAME.ship.x + GAME.ship.width/4,
            y : GAME.ship.y + GAME.ship.height/4,
            velocity : 10
        });
    }
}

GAME.Weapon.double = {
    cadence : 12,
    fire : function(){
        new GAME.Bullet({
            x : GAME.ship.x + GAME.ship.width/4,
            y : GAME.ship.y - GAME.ship.height/3,
            velocity : 10
        });
        new GAME.Bullet({
            x : GAME.ship.x + GAME.ship.width/4,
            y : GAME.ship.y + GAME.ship.height/3,
            velocity : 10
        });
    }
}

GAME.Weapon.tailgun = {
    cadence : 8,
    fire : function(){
        new GAME.Bullet({
            x : GAME.ship.x ,
            y : GAME.ship.y - 5,
            rotation : PI,
            velocity : -10
        });
        new GAME.Bullet({
            x : GAME.ship.x + GAME.ship.width/4,
            y : GAME.ship.y + GAME.ship.height/4,
            velocity : 10
        });
    }
}





