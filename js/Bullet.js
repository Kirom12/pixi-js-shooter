/**
 * Bullet class
 */
class Bullet {
 	constructor(data) {
 		this.x = data.x;
 		this.y = data.y;
 		this.speed = data.speed;
 		this.scale = data.scale;

 		this.vx = this.speed;

 		this.texture = Shooter.assets["assets/images/bullet.png"].texture;

 		this.sprite = new Shooter.Sprite(this.texture);

 		this.sprite.position.set(this.x, this.y);
 		this.sprite.scale.set(this.scale, this.scale);

 		Shooter.layers.bullets.addChild(this.sprite);
 	}

 	destroy() {
 		//Remove sprite
 		Shooter.layers.bullets.removeChild(this.sprite);
 		//Remove from array
 		let index = Shooter.bullets.indexOf(this);
 		Shooter.bullets.splice(index, 1);
 	}

 	move() {
		this.sprite.x += this.vx;
 	}

 	update() {
 		if (this.sprite.x > Shooter.stage.width) {
 			this.destroy();
 		}

 		for (let i in Shooter.enemies) {
 			if (Collison.box(this.sprite, Shooter.enemies[i].container) && !Shooter.enemies[i].isAnimating) {
 				Shooter.playerShip.score++;
 				Shooter.enemies[i].explode();
 				this.destroy();
 			}	
 		}
 	}
}