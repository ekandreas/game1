import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  preload() {
    // Ladda karaktärs-spritesheet (16x16 pixlar per frame)
    this.load.spritesheet('player', 'assets/characters.png', {
      frameWidth: 16,
      frameHeight: 16
    })
  }

  create() {
    // Skapa animationer för spelaren
    // Spritesheet layout: 24 kolumner, 8 rader
    // Rad 0: front idle, Rad 1: front walk
    // Rad 2: back idle, Rad 3: back walk
    // Rad 4: left idle, Rad 5: left walk
    // Rad 6: right idle, Rad 7: right walk
    // Vi använder karaktär i kolumn 3 (brunt hår)

    const cols = 24
    const char = 3 // Karaktär nummer (kolumn)

    this.anims.create({
      key: 'walk-down',
      frames: [
        { key: 'player', frame: 0 * cols + char },
        { key: 'player', frame: 1 * cols + char }
      ],
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: 'walk-up',
      frames: [
        { key: 'player', frame: 2 * cols + char },
        { key: 'player', frame: 3 * cols + char }
      ],
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: 'walk-left',
      frames: [
        { key: 'player', frame: 4 * cols + char },
        { key: 'player', frame: 5 * cols + char }
      ],
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: 'walk-right',
      frames: [
        { key: 'player', frame: 6 * cols + char },
        { key: 'player', frame: 7 * cols + char }
      ],
      frameRate: 8,
      repeat: -1
    })

    // Skapa spelaren (skalad upp för mobilskärm)
    this.player = this.add.sprite(195, 330, 'player', 0 * cols + char)
    this.player.setScale(3) // Gör gubben större
    this.cols = cols
    this.char = char
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

    // Håll koll på rörelseriktning
    this.lastDirection = 'down'
  }

  update() {
    const speed = 150
    let velocityX = 0
    let velocityY = 0
    let isMoving = false

    // Touch-styrning
    if (this.touchTarget) {
      const dx = this.touchTarget.x - this.player.x
      const dy = this.touchTarget.y - this.player.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 10) {
        velocityX = (dx / distance) * speed
        velocityY = (dy / distance) * speed
        isMoving = true

        // Bestäm riktning baserat på största rörelsen
        if (Math.abs(dx) > Math.abs(dy)) {
          this.lastDirection = dx > 0 ? 'right' : 'left'
        } else {
          this.lastDirection = dy > 0 ? 'down' : 'up'
        }
      }
    }

    // Tangentbordsstyrning (överskrider touch)
    if (this.cursors.left.isDown) {
      velocityX = -speed
      this.lastDirection = 'left'
      isMoving = true
    } else if (this.cursors.right.isDown) {
      velocityX = speed
      this.lastDirection = 'right'
      isMoving = true
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed
      this.lastDirection = 'up'
      isMoving = true
    } else if (this.cursors.down.isDown) {
      velocityY = speed
      this.lastDirection = 'down'
      isMoving = true
    }

    // Sätt hastighet
    this.player.body.setVelocity(velocityX, velocityY)

    // Spela animation baserat på rörelse
    if (isMoving) {
      this.player.anims.play('walk-' + this.lastDirection, true)
    } else {
      this.player.anims.stop()
      // Visa stillastående frame i rätt riktning
      const rowMap = { down: 0, up: 2, left: 4, right: 6 }
      this.player.setFrame(rowMap[this.lastDirection] * this.cols + this.char)
    }
  }
}
