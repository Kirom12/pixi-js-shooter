/**
 * Class enemy
 */
class Enemy {
	constructor(data) {
		this.isAnimating = false;

		this.x = data.x;
 		this.y = data.y;
 		this.speed = data.speed;
 		this.scale = data.scale;

 		this.vx = this.speed;

 		this.container = new Shooter.Container();
 		this.container.position.set(this.x, this.y);
 		this.container.scale.set(this.scale, this.scale);

 		this.sprite = new Shooter.Sprite(Shooter.assets["assets/images/enemy.png"].texture);

 		this.container.addChild(this.sprite);

 		//Explosion animation
 		//Load every enemy. Better way to do ???
 		let explosionTextures = [];

 		for (let i in Shooter.assets["assets/images/explode.json"].textures) {
 			explosionTextures.push(Shooter.assets["assets/images/explode.json"].textures[i]);
 		}

 		this.explosion = new Shooter.MovieClip(explosionTextures);
 		this.explosion.visible = false;
 		this.explosion.animationSpeed = 0.4;
		this.explosion.anchor.set(0.5, 0.5);
		this.explosion.loop = false;
		this.explosion.rotation = Math.random() * Math.PI;
		this.explosion.scale.x = this.explosion.scale.y = 0.5 + Math.random();
 		
 		this.container.addChild(this.explosion);

 		Shooter.layers.enemies.addChild(this.container);
 		Shooter.enemies.push(this);
	}

	destroy() {
		//Remove sprite
		Shooter.layers.enemies.removeChild(this.container);
		//Remove from array
		let index = Shooter.enemies.indexOf(this);
		Shooter.enemies.splice(index, 1);
	}

	explode() {
		if (!this.isAnimating) {
			this.isAnimating = true;
			this.explosion.visible = true;
			this.sprite.visible = false;

			this.explosion.onComplete = () => {this.destroy();}
			this.explosion.play()	
		}
	}

	move() {
		this.container.x += -this.vx;
 	}

 	update() {
 		if (this.container.x < 0) {
			this.destroy();
		}

 		if (Collison.box(this.container, Shooter.playerShip.sprite) && !this.isAnimating) {
 			Shooter.playerShip.hit();
 			this.explode();
 		}
 	}
}