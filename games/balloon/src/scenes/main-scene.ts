import { CONST } from '../const/const';
import { Balloon } from '../objects/balloon';
import { Slingshot } from '../objects/slingshot';
import { Gameworld } from '../interfaces/gameworld.interface';
import { Dart } from '../objects/dart';

export class MainScene extends Phaser.Scene implements Gameworld {
	dartGroup: Phaser.GameObjects.Group;
	balloonGroup: Phaser.GameObjects.Group;
	winningScreenGroup: Phaser.GameObjects.Group;
	balloonCounterGroup: Phaser.GameObjects.Group;
	balloonCounterText: Phaser.GameObjects.Text;

	slingshot: Slingshot;
	background: Phaser.GameObjects.Sprite;

	isGameover: boolean;

	constructor() {
		super({ key: 'MainScene' });
	}

	preload(): void {
		this.load.image('background', 'images/background.png');
		this.load.image('dart', 'images/dart.png');
		this.load.image('balloon', 'images/balloon.png');
		this.load.image('hand', 'images/hand.png');
	}

	create(): void {
		this.background = new Phaser.GameObjects.Sprite(
			this,
			0,
			0,
			'background'
		);
		this.background.height = this.scale.height;
		this.background.displayHeight = this.scale.height;
		this.background.setOrigin(0, 0);
		this.add.existing(this.background);

		// this.setupWinningScreen();
		this.setupBalloonCounter();

		this.slingshot = new Slingshot({
			scene: this,
			gameworld: this,
			position: new Phaser.Math.Vector2(
				this.scale.width * CONST.SLINGSHOT.POSITION_PERCENTAGE.x,
				this.scale.height * CONST.SLINGSHOT.POSITION_PERCENTAGE.y
			)
		});

		this.dartGroup = this.add.group({
			runChildUpdate: true
		});

		this.balloonGroup = this.add.group({
			runChildUpdate: true
		});

		this.spawnBalloons();
	}

	update(total: number, deltaTime: number): void {
		this.slingshot.update(deltaTime);

		this.physics.overlap(
			this.dartGroup,
			this.balloonGroup,
			(dart, balloon) => {
				// this.dartGroup.remove(dart, true, true);
				this.balloonGroup.remove(balloon, true, true);
			}
		);

		const balloonCount = this.balloonGroup.children.entries.length;
		this.balloonCounterText.text = balloonCount.toString();

		if (balloonCount === 0) {
			this.endGame();
		}
	}

	endGame() {
		if (this.isGameover) return;
		this.isGameover = true;

		this.setupWinningScreen();

		setTimeout(() => {
			Android.onGameComplete();
		}, 1000);
	}

	spawnDart(position: Phaser.Math.Vector2, direction: Phaser.Math.Vector2) {
		const newDart = new Dart({
			scene: this,
			position: position,
			direction: direction
		});

		this.dartGroup.add(newDart);
	}

	spawnBalloons(): void {
		let createInLeftSide = false;

		for (let i = 0; i < CONST.BALLOON.TOTAL; i++) {
			const balloon = new Balloon({
				scene: this,
				x: createInLeftSide ? -125 : this.scale.width + 125,
				y: this.getRandomSpawnPostion(
					CONST.BALLOON.MIN_Y_POSITION,
					CONST.BALLOON.MAX_Y_POSITION
				),
				texture: 'balloon',
				hasGift: false,
				direction: createInLeftSide
					? Phaser.Math.Vector2.RIGHT
					: Phaser.Math.Vector2.LEFT
			});

			createInLeftSide = !createInLeftSide;

			this.balloonGroup.add(balloon);
		}
	}

	private getRandomSpawnPostion(min: number, max: number): number {
		return Phaser.Math.RND.between(min, max);
	}

	setupWinningScreen() {
		this.winningScreenGroup = this.add.group();

		let continueButtonWidth = this.scale.width * 0.5;
		continueButtonWidth = Phaser.Math.Clamp(
			continueButtonWidth,
			300,
			Number.MAX_VALUE
		);

		const continueButtonHeight = 100;
		const continueButtonY =
			this.scale.height / 2 - continueButtonHeight / 2 + 100;
		const continueButton = this.add.graphics();
		continueButton.fillStyle(0x74b9ff, 1);
		continueButton.lineStyle(10, 0x0984e3, 1);
		continueButton.fillRoundedRect(
			this.scale.width / 2 - continueButtonWidth / 2,
			continueButtonY,
			continueButtonWidth,
			continueButtonHeight,
			50
		);
		continueButton.strokeRoundedRect(
			this.scale.width / 2 - continueButtonWidth / 2,
			continueButtonY,
			continueButtonWidth,
			continueButtonHeight,
			50
		);

		continueButton.setInteractive(
			new Phaser.Geom.Rectangle(
				continueButton.x,
				continueButton.y,
				continueButtonWidth,
				continueButtonHeight
			),
			(a, b, c, d) => {}
		);

		const continueText = this.add.text(
			0,
			continueButtonY + continueButtonHeight / 4,
			'CONTINUE',
			{
				fontSize: '5em',
				align: 'center',
				fixedWidth: this.scale.width
			}
		);

		const winningText = this.add.text(
			0,
			continueButtonY - continueButtonHeight,
			'You win!',
			{
				fontSize: '7em',
				align: 'center',
				fixedWidth: this.scale.width
			}
		);

		this.winningScreenGroup.add(winningText, true);
		this.winningScreenGroup.add(continueButton, true);
		this.winningScreenGroup.add(continueText, true);
		this.winningScreenGroup.setDepth(Number.MAX_VALUE);
	}

	setupBalloonCounter() {
		const textSize = 50;
		const backgroundRadius = 50;
		const x = this.scale.width - 75;
		const y = this.scale.height - 75;
		const backgroundAlpha = 0.5;
		const background = new Phaser.GameObjects.Graphics(this);
		background.fillStyle(0x74b9ff, backgroundAlpha);
		background.fillCircle(x, y, backgroundRadius);
		background.lineStyle(10, 0x0984e3, backgroundAlpha);
		background.strokeCircle(x, y, backgroundRadius);

		this.balloonCounterText = new Phaser.GameObjects.Text(
			this,
			x - backgroundRadius,
			y - textSize / 2,
			'10',
			{
				fontSize: `${textSize}px`,
				align: 'center',
				fixedWidth: backgroundRadius * 2
			}
		);

		this.balloonCounterGroup = this.add.group([
			this.balloonCounterText,
			background
		]);

		this.add.existing(background);
		this.add.existing(this.balloonCounterText);
		this.balloonCounterGroup.setDepth(Number.MAX_VALUE);
	}
}
