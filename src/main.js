import Phaser from 'phaser'
import { MainScene } from './scenes/MainScene.js'

const config = {
  type: Phaser.AUTO,
  width: 390,
  height: 660,
  parent: 'game-container',
  backgroundColor: '#2d2d44',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [MainScene]
}

const game = new Phaser.Game(config)
