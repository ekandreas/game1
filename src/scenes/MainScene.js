import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  create() {
    // Skapa en enkel spelare (fyrkant)
    this.player = this.add.rectangle(400, 300, 50, 50, 0x6366f1)
    this.physics.add.existing(this.player)

    // Lägg till tangentbordskontroller
    this.cursors = this.input.keyboard.createCursorKeys()

    // Välkomsttext
    this.add.text(400, 50, 'Mitt Första Spel!', {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Instruktioner
    this.add.text(400, 550, 'Använd piltangenterna för att röra dig', {
      fontSize: '16px',
      fill: '#aaaaaa',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
  }

  update() {
    const speed = 200

    // Nollställ hastighet
    this.player.body.setVelocity(0)

    // Rörelse baserat på tangenttryckningar
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed)
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed)
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed)
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed)
    }
  }
}
