import { DartSettings } from '../objects/dart';

export let CONST = {
	BALLOON: {
		MIN_SPEED: 1,
		MAX_SPEED: 5,
		MIN_X_POSITION: 30,
		MIN_Y_POSITION: 60,
		MAX_Y_POSITION: 350,
		TOTAL: 25,
		SCALE: 0.2
	},

	DART: {
		SCALE: 0.07
	},

	SLINGSHOT: {
		POSITION_PERCENTAGE: new Phaser.Math.Vector2(0.5, 0.8),
		SCALE: 0.07
	}
};

export let DART_SETTINGS: DartSettings = {
	minSpeed: 125,
	maxSpeed: 150,
	deAccleration: 0.95
};
