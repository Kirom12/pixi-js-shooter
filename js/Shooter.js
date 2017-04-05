
/**
 * Shooter static class
 */
class Shooter {
	constructor() {}

	/**
	 * Init static method
	 */
	static init() {
		Shooter.gameStatus = 1;

		//Aliases
		Shooter.Container = PIXI.Container;
		Shooter.autoDetectRenderer = PIXI.autoDetectRenderer;
		Shooter.loader = PIXI.loader;
		Shooter.resources = PIXI.loader.resources;
		Shooter.Sprite = PIXI.Sprite;
		Shooter.TextureCache = PIXI.utils.TextureCache;
		Shooter.BaseTexture = PIXI.BaseTexture;
		Shooter.Texture = PIXI.Texture;
		Shooter.Graphics = PIXI.Graphics;
		Shooter.Rectangle = PIXI.Rectangle;
		Shooter.TilingSprite = PIXI.extras.TilingSprite;
		Shooter.MovieClip = PIXI.extras.MovieClip;

		Shooter.stage = { // Not working ??
			width : 1200,
			height : 768,
			margin : 10,
			container : new Shooter.Container()
		}

		Shooter.tick = 0;
		Shooter.enemiesInfo = {
			delay: 4,
			max: 100
		}

		Shooter.bullets = []; //TODO: Use objects json..
		Shooter.enemies = [];
		
		Shooter.renderer = new Shooter.autoDetectRenderer(Shooter.stage.width, Shooter.stage.height);
		document.body.appendChild(Shooter.renderer.view);

		Shooter.assetsDir = "assets/images/";

		Shooter.layers = {
			background : new Shooter.Container(),
			enemies : new Shooter.Container(),
			bullets : new Shooter.Container(),
			text : new Shooter.Container()
		}

		Shooter.textFont = {fontFamily: "Arial", fontSize: 32, fill: "white"};

		Shooter.preload();
	}

	/**
	 * Load and stock images
	 */
	static preload() {

		let _onAssetsLoaded = function(e, ressources) {
			Shooter.assets = ressources;

			Shooter.setup();
		}

		Shooter.loader
			.add(Shooter.assetsDir + "background.jpg") //TODO : use json objects with index
			.add(Shooter.assetsDir + "space_ship.png")
			.add(Shooter.assetsDir + "space_ship_hit.png")
			.add(Shooter.assetsDir + "enemy.png")
			.add(Shooter.assetsDir + "bullet.png")
			.add(Shooter.assetsDir + "explode.json");
			
		Shooter.loader.load(_onAssetsLoaded);
	}

	/**
	 * Setup static method
	 */
	static setup() {
		//Create Game
		//Add layers to the stage
		for (let i in Shooter.layers) {
			Shooter.stage.container.addChild(Shooter.layers[i]);
		}

		let background = new Shooter.TilingSprite(Shooter.assets["assets/images/background.jpg"].texture, Shooter.stage.width, Shooter.stage.height);
		//Resize to backgeround (default 1) OR repeat
		//background.tileScale.x = background.tileScale.y = Shooter.gameWidth / Shooter.gameHeight;

		Shooter.layers.background.addChild(background);

		//Create ship
		Shooter.playerShip = new Ship({
			x : 50,
			y : this.stage.height/2,
			speed : 5,
			scale : 0.8
		});

		//Set text. TODO: user function ?
		Shooter.text = {
			lifes : new PIXI.Text("Lifes : " + Shooter.playerShip.lifes, this.textFont),
			score : new PIXI.Text("Score : " + Shooter.playerShip.score, this.textFont)
		}

		Shooter.text.lifes.position.set(20, 10);
		Shooter.text.score.position.set(Shooter.stage.width-200, 10);
		Shooter.layers.text.addChild(Shooter.text.lifes);
		Shooter.layers.text.addChild(Shooter.text.score);

		Shooter.gameLoop();
	}

	/**
	 * Game loop static
	 */
	static gameLoop() {
		requestAnimationFrame(Shooter.gameLoop);

		switch (Shooter.gameStatus) {
			case 0:
				Shooter.menu();
				break;
			case 1:
				Shooter.play();
				break;
			case 2:
				Shooter.gameOver();
				break;
		}

		Shooter.tick++;

		Shooter.renderer.render(Shooter.stage.container);
	}

	/**
	 * Menu static method
	 */
	static menu() {

	}

	/**
	 * Menu static method
	 */
	static gameOver() {
		let text = new PIXI.Text("Game Over !", this.textFont);
		text.position.set(Shooter.stage.width/2-text.width/2, Shooter.stage.height/2-text.height/2);
		Shooter.layers.text.addChild(text);
	}

	/**
	 * Play static method
	 */
	static play() {
		Shooter.contain(Shooter.playerShip.sprite, {x: this.stage.margin, y: this.stage.margin, width: this.stage.width-this.stage.margin, height: this.stage.height-this.stage.margin});

		//Create enemy
		if (Shooter.tick % Shooter.enemiesInfo.delay == 1) {
			let enemy = new Enemy({
				x : this.stage.width,
				y : Math.floor((Math.random() * (this.stage.height-20)) + 20),
				speed : 5,
				scale : 1
			})
		}

		//****Update. TODO: function
		Shooter.playerShip.update();

		for (let i in Shooter.bullets) {
			Shooter.bullets[i].update();
		}

		for (let j in Shooter.enemies) {
			Shooter.enemies[j].update();
		}

		//****Move. TODO: function
		Shooter.playerShip.move();

		//Move bullets
		for (let i in Shooter.bullets) {
			Shooter.bullets[i].move();
		}
		//Move enemies
		for (let j in Shooter.enemies) {
			Shooter.enemies[j].move();
		}

		//****UpdateUi TODO: function
		Shooter.text.lifes.text = "Lifes : " + Shooter.playerShip.lifes;
		Shooter.text.score.text = "Score : " + Shooter.playerShip.score;
	}

	/**
	 * Contain a sprite in a area
	 */
	static contain(sprite, container) {
		//Left
		if (sprite.x < container.x) {
			sprite.x = container.x;
		}
		//Top
		if (sprite.y < container.y) {
			sprite.y = container.y;
		}
		//Right
		if (sprite.x + sprite.width > container.width) {
			sprite.x = container.width - sprite.width;
		}
		//Bottom
		if (sprite.y + sprite.height > container.height) {
			sprite.y = container.height - sprite.height;
		}
	}
}