import { CONST } from '../const/const';

interface BalloonParameters {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
}

export class Balloon extends Phaser.GameObjects.Sprite {

    private velocity: Phaser.Math.Vector2;
    private radius: number;

    body: Phaser.Physics.Arcade.Body;

    constructor(params: BalloonParameters) {
        super(params.scene, params.x, params.y, params.texture)

        this.displayWidth = CONST.BALLOON.SIZE;
        this.displayHeight = CONST.BALLOON.SIZE;
        this.radius = 0;

        this.applyPhysics();

        this.scene.add.existing(this);
    }

    update(): void {
        this.applyVelocity();
        this.checkIfOffScreen();
    }

    private applyPhysics(): void {
        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.body.setCircle(this.radius);
        this.body.setOffset(-this.radius, -this.radius);

        this.velocity = this.getRandomVelocity(
            CONST.BALLOON.MINSPEED,
            CONST.BALLOON.MAXSPEED
        );
    }

    private applyVelocity(): void {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    private checkIfOffScreen(): void {
        // horizontal check
        if (this.x > this.scene.sys.canvas.width + CONST.BALLOON.SIZE) {
            this.x = -CONST.BALLOON.SIZE;
        } else if (this.x < -CONST.BALLOON.SIZE) {
            this.x = this.scene.sys.canvas.width + CONST.BALLOON.SIZE;
        }

        // vertical check
        if (this.y > this.scene.sys.canvas.height + CONST.BALLOON.SIZE) {
            this.y = -CONST.BALLOON.SIZE;
        } else if (this.y < -CONST.BALLOON.SIZE) {
            this.y = this.scene.sys.canvas.height + CONST.BALLOON.SIZE;
        }
    }

    private getRandomVelocity(aMin: number, aMax: number): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(
            Phaser.Math.RND.between(
                this.getRndNumber(aMin, aMax),
                this.getRndNumber(aMin, aMax)
            ),
            Phaser.Math.RND.between(
                this.getRndNumber(aMin, aMax),
                this.getRndNumber(aMin, aMax)
            )
        );
    }

    private getRndNumber(aMin: number, aMax: number): number {
        let num = Math.floor(Math.random() * aMax) + aMin;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        return num;
    }
}