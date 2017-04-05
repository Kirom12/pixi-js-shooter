var GAME = {};

GAME.objects = {}
GAME.controls = {};

GAME.tick = 0;
GAME.score = {};
GAME.enemies = {
	delay : 20,
	max : 100
}

var i, j, k, l, m, enemyText; 

GAME.init = function(){
	// j'initialize quelques variables de jeu
	GAME.stage = { 
		width : 800, // window.innerWidth
		height : 600,   // window.innerHeight
        container : null
	}
	GAME.fonts = { 
		info : { font:"12px Monospace", fill:"white" } 
	}
	// crée un tableau des fichiers a loader
	GAME.assetsUrls = [
	    { name : "bg1",            url: "img/background.jpg"   },
	    { name : "bg2",            url: "img/background_2.png" },
	    { name : "bg3",            url: "img/background_3.png" },
	    { name : "bullet",         url: "img/bullet.png" },
	    { name : "button",         url: "img/button.png" },
	    { name : "buttonDown",     url: "img/buttonDown.png" },
	    { name : "enemy",          url: "img/enemy.png" },
	    { name : "shoot",          url: "img/shoot.png" },
	    { name : "shootDown",      url: "img/shootDown.png" },
	    { name : "space_ship_hit", url: "img/space_ship_hit.png" },
	    { name : "space_ship",     url: "img/space_ship.png" },
	    { name : "explode",        url: "img/explode.json"}
	]

	GAME.preload();
}

// Il faut précharger les contenu avant de les dessiner dans le jeu
GAME.preload = function(){
	// Crée un nouveau loader
	var _loader = new PIXI.loaders.Loader();
	// ajoute les fichier du tableau dau loader
		_loader.add(GAME.assetsUrls);
	// methode a lancer a quand les ressources sont changées
	var _onAssetsLoaded = function(event, ressources) {
		// je stoque les ressources dans le jeu pour qu'elles puissent être accessible de n'importe où dans le jeu
	    GAME.assets = ressources;
	    // je lance la fonction qui va construire le jeu
	    GAME.create();
	}
	// begin load and callback
	_loader.load(_onAssetsLoaded);
}

// création de l'environement du jeu
GAME.create = function(){
	// create a renderer instance
	GAME.renderer = new PIXI.autoDetectRenderer(GAME.stage.width, GAME.stage.height);
	// add render view to DOM
	document.body.appendChild(GAME.renderer.view);

	// create an new instance of a pixi stage
	GAME.stage.container = new PIXI.Container(0x000000, true);
	// build structure
    GAME.createLevel();
    GAME.createControls();
    //refresh
    GAME.update();
}



GAME.createLevel = function(){
	
	GAME.layers = { 
		background : new PIXI.Container(), 
		enemies : new PIXI.Container(),
		bullets : new PIXI.Container()
	}
	// add layers to stage
	for(var k in GAME.layers){
    	GAME.stage.container.addChild( GAME.layers[k] )
    }

    GAME.objects.bullets = [];
    GAME.objects.enemies = [];
    GAME.objects.backgrounds = [];
    
    /*
    [TODO] finish this
    GAME.objects.remove = function(type, obj){
    	//console.log( GAME.objects[type] )
    	var key = GAME.objects[type].indexOf(obj);
    	GAME.objects[type].splice(key, 1);
    }
    */

    // create a tiling sprite ...
    // requires a texture, a width and a height
    // in order to work in webGL the texture size must be a power of two
    var bg1 = new PIXI.extras.TilingSprite(GAME.assets.bg1.texture, GAME.stage.width, GAME.stage.height);
    	bg1.tileScale.x = bg1.tileScale.y = GAME.stage.height / bg1.texture.height;

    var bg2 = new PIXI.extras.TilingSprite(GAME.assets.bg2.texture, GAME.stage.width, GAME.stage.height);
    	bg2.tileScale.x = bg2.tileScale.y = GAME.stage.height / bg2.texture.height;

    var bg3 = new PIXI.extras.TilingSprite(GAME.assets.bg3.texture, GAME.stage.width, GAME.stage.height);
	    bg3.tileScale.x = bg3.tileScale.y = GAME.stage.height / bg3.texture.height;
    
    GAME.layers.background.addChild(bg1, bg2, bg3);
    GAME.objects.backgrounds.push(bg1, bg2, bg3);

    GAME.ship = new GAME.Ship({
    	x :100, 
    	y: 300,
	    speed : 5,
	    width : 80,
	    height : 38
    });

    // AFFICHAGES
    GAME.score.count = 0;
    GAME.score.view = new PIXI.Text("SCORE : "+GAME.score.count, GAME.fonts.info);
    GAME.score.view.position.x = 20;
    GAME.score.view.position.y = 10;

    enemyText = new PIXI.Text("Enemies : 0", GAME.fonts.info);
    enemyText.position.x = 250;
    enemyText.position.y = 10;

    GAME.stage.container.addChild(enemyText);
    GAME.stage.container.addChild(GAME.score.view);

    GAME.Weapon.set("simple");
}


GAME.createControls = function() {
	GAME.controls.buttons = {}
    GAME.controls.buttons.up = new GAME.Button({ 
    	key : "up", 
    	up : GAME.assets.button.texture, 
    	down : GAME.assets.buttonDown.texture, 
    	x : 100, 
    	y : 490
    })

    GAME.controls.buttons.down = new GAME.Button({ 
    	key : "down", 
    	up : GAME.assets.button.texture, 
    	down : GAME.assets.buttonDown.texture, 
    	x : 100, 
    	y : 560,
    	rotation : PI
    })
    
    GAME.controls.buttons.left = new GAME.Button({ 
    	key : "left", 
    	up : GAME.assets.button.texture, 
    	down : GAME.assets.buttonDown.texture, 
    	x : 50, 
    	y : 525,
    	rotation : PI + PI/2
    })
    
    GAME.controls.buttons.right = new GAME.Button({ 
    	key : "right", 
    	up : GAME.assets.button.texture, 
    	down : GAME.assets.buttonDown.texture, 
    	x : 150, 
    	y : 525,
    	rotation : PI/2
    })

    GAME.controls.buttons.shoot = new GAME.Button({ 
    	key : "space", 
    	up : GAME.assets.shoot.texture,
    	down : GAME.assets.shootDown.texture,
    	x : 760, 
    	y : 525,
    	rotation : PI,
    	action : function(){
	        GAME.Weapon.fire();
	    }
	})
}

GAME.createEnemy = function(){
	if(GAME.objects.enemies.length < GAME.enemies.max){
		new GAME.Enemy();
	}
}


/*
    	CALCULS
*/
GAME.calculate = function () {

	GAME.Weapon.timing();
	//random weapons
	if(Math.random() > .993){
		var randomWeapon = GAME.Weapon.names[ Math.floor(Math.random() * GAME.Weapon.names.length) ];
		GAME.Weapon.set(randomWeapon);
	}

    if(GAME.tick % GAME.enemies.delay == 1){
        GAME.createEnemy();
    }

	if(KEYBOARD.space){
        GAME.controls.buttons.shoot.action();
    }

    // update space ship
    GAME.ship.update();

	//update bullets
    for (i = 0; i < GAME.objects.bullets.length; i++) {
       GAME.objects.bullets[i].update(); 
    }
    
    //update enemies
    for (j = 0; j < GAME.objects.enemies.length; j++) {
       GAME.objects.enemies[j].update(); 
    }
   
    GAME.tick += 1;
}

/*
    DESSINE TOUT
*/
GAME.animate = function () {

    for (i = 0; i < GAME.objects.backgrounds.length; i++) {
    	GAME.objects.backgrounds[i].tilePosition.x -= (i+1) * 0.4;
    }

    GAME.ship.move();
    
    //update bullets
    for (j = 0; j < GAME.objects.bullets.length; j++) {
       GAME.objects.bullets[j].move();
    }
    //update enemies
    for (k = 0; k < GAME.objects.enemies.length; k++) {
      GAME.objects.enemies[k].move();
    }


    enemyText.text = "Bullets : " + GAME.objects.bullets.length +
    				" Enemies : " + GAME.objects.enemies.length + 
    				" Bullets layer : " + GAME.layers.bullets.children.length + 
    				" Enemies layer : " + GAME.layers.enemies.children.length + 
    				" new one in " + GAME.enemies.delay;
    

    GAME.renderer.render(GAME.stage.container); 
}


// fonction qui va être executée en boucle pour mettre le jeu à jour
GAME.update = function(){
    GAME.calculate();
    GAME.animate();
    requestAnimationFrame( GAME.update );
}

