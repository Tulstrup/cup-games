import { MainScene } from './scenes/main-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
	title: 'Template',
	version: '1.0',
	backgroundColor: 0xffffff,
	type: Phaser.AUTO,
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 0 }
		}
	},
	scene: [MainScene]
};
