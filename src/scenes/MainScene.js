import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  preload() {
    // Ladda fotsteg-ljud
    this.load.audio('step', 'assets/step.ogg')
  }

  create() {
    // Skapa enkel ljudeffekt för fotsteg
    this.stepSound = this.sound.add('step', { volume: 0.3 })
    this.lastStepTime = 0

    // Skapa en enkel gubbe med grafik
    this.player = this.add.container(195, 330)

    // Kropp (rektangel)
    const body = this.add.rectangle(0, 8, 30, 36, 0x6366f1)

    // Huvud (cirkel)
    const head = this.add.circle(0, -14, 18, 0x6366f1)

    // Ögon
    this.leftEye = this.add.circle(-6, -16, 4, 0xffffff)
    this.rightEye = this.add.circle(6, -16, 4, 0xffffff)
    this.leftPupil = this.add.circle(-6, -16, 2, 0x000000)
    this.rightPupil = this.add.circle(6, -16, 2, 0x000000)

    // Lägg till alla delar i containern
    this.player.add([body, head, this.leftEye, this.rightEye, this.leftPupil, this.rightPupil])

    // Lägg till fysik
    this.physics.add.existing(this.player)
    this.player.body.setSize(30, 50)
    this.player.body.setOffset(-15, -25)
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

    // Animation-timer för att "vicka" gubben
    this.walkTimer = 0
  }

  update(time) {
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
      }
    }

    // Tangentbordsstyrning (överskrider touch)
    if (this.cursors.left.isDown) {
      velocityX = -speed
      isMoving = true
    } else if (this.cursors.right.isDown) {
      velocityX = speed
      isMoving = true
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed
      isMoving = true
    } else if (this.cursors.down.isDown) {
      velocityY = speed
      isMoving = true
    }

    // Sätt hastighet
    this.player.body.setVelocity(velocityX, velocityY)

    // Animera gubben när den rör sig
    if (isMoving) {
      // Vicka gubben
      this.walkTimer += 0.3
      this.player.rotation = Math.sin(this.walkTimer) * 0.1

      // Spela fotsteg-ljud med jämna mellanrum
      if (time - this.lastStepTime > 250) {
        this.stepSound.play()
        this.lastStepTime = time
      }

      // Flytta pupillerna i rörelseriktningen
      const pupilOffsetX = (velocityX / speed) * 2
      const pupilOffsetY = (velocityY / speed) * 2
      this.leftPupil.setPosition(-6 + pupilOffsetX, -16 + pupilOffsetY)
      this.rightPupil.setPosition(6 + pupilOffsetX, -16 + pupilOffsetY)
    } else {
      // Stå still
      this.player.rotation = 0
      this.leftPupil.setPosition(-6, -16)
      this.rightPupil.setPosition(6, -16)
    }
  }
}
