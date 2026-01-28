import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  preload() {
    // Ladda ljud senare
  }

  create() {
    // Spelkonstanter
    this.scrollSpeed = 2
    this.playerSpeed = 200

    // Poäng
    this.score = 0
    this.scoreText = this.add.text(16, 16, 'POÄNG: 0', {
      fontSize: '20px',
      fill: '#00ff00',
      fontFamily: 'monospace'
    })

    // Bränsle
    this.fuel = 100
    this.fuelText = this.add.text(16, 42, 'BRÄNSLE: 100', {
      fontSize: '16px',
      fill: '#ffff00',
      fontFamily: 'monospace'
    })

    // Bränslemätare (grafisk)
    this.add.rectangle(300, 30, 74, 18, 0x333333)
    this.fuelBar = this.add.rectangle(300, 30, 70, 14, 0x00ff00)

    // Skapa rymdskeppet (en triangel som pekar uppåt)
    this.player = this.add.container(195, 550)

    // Skeppets kropp
    const shipBody = this.add.triangle(0, 0, 0, -20, -15, 15, 15, 15, 0x00aaff)
    const shipWing1 = this.add.triangle(-12, 10, 0, -5, -8, 8, 5, 8, 0x0077cc)
    const shipWing2 = this.add.triangle(12, 10, 0, -5, -5, 8, 8, 8, 0x0077cc)
    const flame = this.add.triangle(0, 20, 0, 0, -6, 12, 6, 12, 0xff6600)

    this.player.add([shipBody, shipWing1, shipWing2, flame])
    this.flame = flame

    // Lägg till fysik på spelaren
    this.physics.add.existing(this.player)
    this.player.body.setSize(30, 35)
    this.player.body.setOffset(-15, -20)
    this.player.body.setCollideWorldBounds(true)

    // Skott-grupp
    this.bullets = this.add.group()

    // Fiende-grupp
    this.enemies = this.add.group()

    // Terräng-grupp (väggar)
    this.terrain = this.add.group()

    // Bränsletankar
    this.fuelTanks = this.add.group()

    // Tangentbord
    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // Touch-kontroller
    this.touchLeft = false
    this.touchRight = false
    this.touchShoot = false

    // Dela skärmen i zoner för touch
    this.input.on('pointerdown', (pointer) => {
      if (pointer.y > 400) {
        // Nedre delen - skjut
        this.touchShoot = true
      }
      if (pointer.x < 195) {
        this.touchLeft = true
      } else {
        this.touchRight = true
      }
    })

    this.input.on('pointerup', () => {
      this.touchLeft = false
      this.touchRight = false
      this.touchShoot = false
    })

    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        this.touchLeft = pointer.x < 195
        this.touchRight = pointer.x >= 195
      }
    })

    // Timer för att skapa terräng
    this.terrainTimer = 0
    this.enemyTimer = 0
    this.fuelTimer = 0

    // Skapa initial terräng
    this.createInitialTerrain()

    // Skott-cooldown
    this.lastShotTime = 0

    // Game over-flagga
    this.gameOver = false

    // Instruktioner
    this.add.text(195, 630, '← → för att styra | SPACE/touch för att skjuta', {
      fontSize: '11px',
      fill: '#888888',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
  }

  createInitialTerrain() {
    // Skapa startterräng längs sidorna
    for (let y = 0; y < 700; y += 50) {
      this.createTerrainPiece(y)
    }
  }

  createTerrainPiece(y) {
    // Vänster vägg (varierande bredd för att skapa grotta-känsla)
    const leftWidth = 30 + Math.sin(y * 0.02) * 20 + Math.random() * 15
    const leftWall = this.add.rectangle(leftWidth / 2, y, leftWidth, 52, 0x664422)
    this.terrain.add(leftWall)
    this.physics.add.existing(leftWall, true)

    // Höger vägg
    const rightWidth = 30 + Math.cos(y * 0.02) * 20 + Math.random() * 15
    const rightWall = this.add.rectangle(390 - rightWidth / 2, y, rightWidth, 52, 0x664422)
    this.terrain.add(rightWall)
    this.physics.add.existing(rightWall, true)
  }

  createEnemy() {
    // Skapa en fiende (raket som kommer uppifrån)
    const x = Phaser.Math.Between(80, 310)
    const enemy = this.add.container(x, -20)

    // Fiendens utseende (röd raket)
    const body = this.add.triangle(0, 0, 0, -12, -8, 10, 8, 10, 0xff0000)
    const fin1 = this.add.triangle(-6, 8, 0, -4, -5, 5, 3, 5, 0xaa0000)
    const fin2 = this.add.triangle(6, 8, 0, -4, -3, 5, 5, 5, 0xaa0000)
    enemy.add([body, fin1, fin2])

    this.physics.add.existing(enemy)
    enemy.body.setSize(16, 22)
    enemy.body.setOffset(-8, -12)
    enemy.body.setVelocityY(100 + this.scrollSpeed * 30)

    this.enemies.add(enemy)
  }

  createFuelTank() {
    // Skapa en bränsletank
    const x = Phaser.Math.Between(80, 310)
    const tank = this.add.container(x, -20)

    // Tankens utseende (gul cylinder)
    const body = this.add.rectangle(0, 0, 20, 25, 0xffcc00)
    const top = this.add.rectangle(0, -10, 14, 6, 0xffaa00)
    const label = this.add.text(0, 2, 'F', { fontSize: '12px', fill: '#000' }).setOrigin(0.5)
    tank.add([body, top, label])

    this.physics.add.existing(tank)
    tank.body.setSize(20, 25)
    tank.body.setOffset(-10, -12)
    tank.body.setVelocityY(50 + this.scrollSpeed * 30)

    this.fuelTanks.add(tank)
  }

  shoot() {
    // Skapa ett skott
    const bullet = this.add.rectangle(this.player.x, this.player.y - 25, 4, 12, 0x00ff00)
    this.physics.add.existing(bullet)
    bullet.body.setVelocityY(-400)
    this.bullets.add(bullet)
  }

  update(time) {
    if (this.gameOver) return

    // Minska bränsle över tid
    this.fuel -= 0.03
    this.updateFuelDisplay()

    if (this.fuel <= 0) {
      this.endGame('BRÄNSLET SLUT!')
      return
    }

    // Spelarkontroller
    let velocityX = 0

    if (this.cursors.left.isDown || this.touchLeft) {
      velocityX = -this.playerSpeed
    } else if (this.cursors.right.isDown || this.touchRight) {
      velocityX = this.playerSpeed
    }

    this.player.body.setVelocityX(velocityX)

    // Skjut
    if ((this.spaceKey.isDown || this.touchShoot) && time - this.lastShotTime > 200) {
      this.shoot()
      this.lastShotTime = time
    }

    // Animera flamman
    this.flame.scaleY = 0.8 + Math.sin(time * 0.02) * 0.3

    // Skapa ny terräng
    this.terrainTimer += this.scrollSpeed
    if (this.terrainTimer >= 50) {
      this.createTerrainPiece(-25)
      this.terrainTimer = 0
    }

    // Skapa fiender
    this.enemyTimer++
    if (this.enemyTimer > 90) {
      this.createEnemy()
      this.enemyTimer = 0
    }

    // Skapa bränsletankar
    this.fuelTimer++
    if (this.fuelTimer > 200) {
      this.createFuelTank()
      this.fuelTimer = 0
    }

    // Flytta terräng nedåt
    this.terrain.getChildren().forEach(piece => {
      piece.y += this.scrollSpeed
      if (piece.body) {
        piece.body.updateFromGameObject()
      }
      // Ta bort terräng som är utanför skärmen
      if (piece.y > 700) {
        piece.destroy()
      }
    })

    // Uppdatera skott
    this.bullets.getChildren().forEach(bullet => {
      if (bullet.y < -20) {
        bullet.destroy()
      }
    })

    // Uppdatera fiender
    this.enemies.getChildren().forEach(enemy => {
      if (enemy.y > 700) {
        enemy.destroy()
      }
    })

    // Uppdatera bränsletankar
    this.fuelTanks.getChildren().forEach(tank => {
      if (tank.y > 700) {
        tank.destroy()
      }
    })

    // Kollisioner: spelare mot terräng
    this.physics.overlap(this.player, this.terrain, () => {
      this.endGame('KRASCH!')
    })

    // Kollisioner: spelare mot fiender
    this.physics.overlap(this.player, this.enemies, () => {
      this.endGame('TRÄFFAD!')
    })

    // Kollisioner: skott mot fiender
    this.physics.overlap(this.bullets, this.enemies, (bullet, enemy) => {
      bullet.destroy()
      enemy.destroy()
      this.score += 100
      this.scoreText.setText('POÄNG: ' + this.score)
    })

    // Kollisioner: skott mot bränsletankar
    this.physics.overlap(this.bullets, this.fuelTanks, (bullet, tank) => {
      bullet.destroy()
      tank.destroy()
      this.fuel = Math.min(100, this.fuel + 30)
      this.score += 50
      this.scoreText.setText('POÄNG: ' + this.score)
    })

    // Kollisioner: spelare mot bränsletankar (samla direkt)
    this.physics.overlap(this.player, this.fuelTanks, (player, tank) => {
      tank.destroy()
      this.fuel = Math.min(100, this.fuel + 30)
      this.score += 50
      this.scoreText.setText('POÄNG: ' + this.score)
    })

    // Öka poäng för överlevnad
    this.score += 0.1
    if (Math.floor(this.score) % 10 === 0) {
      this.scoreText.setText('POÄNG: ' + Math.floor(this.score))
    }
  }

  updateFuelDisplay() {
    this.fuelText.setText('BRÄNSLE: ' + Math.floor(this.fuel))
    this.fuelBar.scaleX = this.fuel / 100

    // Ändra färg baserat på bränslenivå
    if (this.fuel > 50) {
      this.fuelBar.fillColor = 0x00ff00
    } else if (this.fuel > 25) {
      this.fuelBar.fillColor = 0xffff00
    } else {
      this.fuelBar.fillColor = 0xff0000
    }
  }

  endGame(reason) {
    this.gameOver = true
    this.player.body.setVelocity(0)

    // Game over-text
    const overlay = this.add.rectangle(195, 330, 390, 660, 0x000000, 0.7)

    this.add.text(195, 280, 'GAME OVER', {
      fontSize: '40px',
      fill: '#ff0000',
      fontFamily: 'monospace'
    }).setOrigin(0.5)

    this.add.text(195, 330, reason, {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5)

    this.add.text(195, 380, 'Poäng: ' + Math.floor(this.score), {
      fontSize: '28px',
      fill: '#00ff00',
      fontFamily: 'monospace'
    }).setOrigin(0.5)

    // Tryck för att starta om
    this.add.text(195, 450, 'Tryck för att spela igen', {
      fontSize: '18px',
      fill: '#aaaaaa',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.restart()
    })

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.restart()
    })
  }
}
