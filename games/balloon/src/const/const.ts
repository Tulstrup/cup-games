import { DartSettings } from '../objects/dart';

export let CONST = {
	BALLOON_MIN_X_POSITION: 30,
	BALLOON_MIN_Y_POSITION: 150,
	BALLOON_MAX_Y_POSITION: 50,
	BALLOON_COUNT: 10,

	SLINGSHOT_POSITION_PERCENTAGE: new Phaser.Math.Vector2(0.5, 0.8)
};

export let DART_SETTINGS: DartSettings = {
	minSpeed: 125,
	maxSpeed: 150,
	deAccleration: 0.95
};
