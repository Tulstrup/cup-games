import { DartSettings } from '../objects/dart';

export let CONST = {
	BALLOON: {
		MINSPEED: 1,
		MAXSPEED: 3,
		MIN_X_POSITION: 30,
		MIN_Y_POSITION: 150,
		MAX_Y_POSITION: 350,
		TOTAL: 10,
		SIZE: 140
	},

	SLINGSHOT_POSITION_PERCENTAGE: new Phaser.Math.Vector2(0.5, 0.8)
};

export let DART_SETTINGS: DartSettings = {
	minSpeed: 125,
	maxSpeed: 150,
	deAccleration: 0.95
};
