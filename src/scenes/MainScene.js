import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  create() {
    // Skapa en enkel spelare (fyrkant)
    this.player = this.add.rectangle(195, 330, 50, 50, 0x6366f1)
    this.physics.add.existing(this.player)
    this.player.body.setCollideWorldBounds(true)

    // Lägg till tangentbordskontroller
    this.cursors = this.input.keyboard.createCursorKeys()

    // Touch-kontroller för mobil
    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        this.touchTarget = { x: pointer.x, y: pointer.y }
      }
    })
    this.input.on('pointerdown', (pointer) => {
      this.touchTarget = { x: pointer.x, y: pointer.y }
    })
    this.input.on('pointerup', () => {
      this.touchTarget = null
    })

    // Välkomsttext
    this.add.text(195, 50, 'Mitt Första Spel!', {
      fontSize: '28px',
      fill: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Instruktioner
    this.add.text(195, 620, 'Piltangenter eller touch för att röra dig', {
      fontSize: '14px',
      fill: '#aaaaaa',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
  }

  update() {
    const speed = 200

    // Nollställ hastighet
    this.player.body.setVelocity(0)

    // Touch-styrning
    if (this.touchTarget) {
      const dx = this.touchTarget.x - this.player.x
      const dy = this.touchTarget.y - this.player.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 10) {
        this.player.body.setVelocityX((dx / distance) * speed)
        this.player.body.setVelocityY((dy / distance) * speed)
      }
    }

    // Tangentbordsstyrning (överskrider touch)
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
