import { Slingshot } from '../objects/slingshot';
import { DartParameters } from '../objects/dart';

export interface Gameworld {
	slingshot: Slingshot;

	spawnDart(
		position: Phaser.Math.Vector2,
		direction: Phaser.Math.Vector2
	): void;
}
