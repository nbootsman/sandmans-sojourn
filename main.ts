namespace SpriteKind {
    export const Construct = SpriteKind.create()
    export const SleepingEnemy = SpriteKind.create()
    export const TempSprite = SpriteKind.create()
    export const Ammo = SpriteKind.create()
    export const Door = SpriteKind.create()
    export const Cannon = SpriteKind.create()
    export const CannonProjectile = SpriteKind.create()
}
namespace StatusBarKind {
    export const Environment = StatusBarKind.create()
}
namespace ConnectionKind {
    export const Door3 = ConnectionKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    if (tiles.tileIs(tiles.locationOfSprite(sprite), tiles.util.arrow4)) {
        sprite.setImage(assets.image`enemy_ghost`)
        sprite.vx = -50
        sprite.setBounceOnWall(true)
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), tiles.util.arrow5)) {
        sprite.setImage(assets.image`enemy_ghost2`)
        sprite.vy = 50
        sprite.setBounceOnWall(true)
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), tiles.util.arrow0)) {
        sprite.setImage(assets.image`enemy_ghost2`)
        sprite.vy = -50
        sprite.setBounceOnWall(true)
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), tiles.util.arrow1)) {
        sprite.setImage(assets.image`enemy_ghost`)
        sprite.vx = 50
        sprite.setBounceOnWall(true)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("upAction", 100, function () {
        if (cutscene_isPlaying) {
        	
        } else if (upContextAction()) {
        	
        } else if (upDoorAction()) {
            updateRespawn()
        } else if (player_canJump) {
            player_sprite.vy = -85
            player_sprite.ay = -10
            player_canJump = false
            controller.configureRepeatEventDefaults(250, 30)
        } else {
        	
        }
    })
})
sprites.onDestroyed(SpriteKind.Construct, function (sprite) {
    tiles.setWallAt(tiles.locationOfSprite(sprite), false)
    tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Top), false)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("throwSand", 500, function () {
        if (cutscene_isPlaying) {
        	
        } else if (payCost(cost_throwSand)) {
            for (let index = 0; index < 5; index++) {
                projectile = sprites.createProjectileFromSprite(assets.image`sand`, player_sprite, randint(100, 120) * player_facing, randint(0, -20))
                projectile.ay = 100
            }
        }
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`hourglass-top0`, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-top0`)) {
        if (upgrade_fillHourglass) {
            sprite.say("A: Fill", 200)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
        player_respawnX = player_sprite.x
        player_respawnY = player_sprite.y
    }
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    if (cutscene_isPlaying) {
    	
    } else {
        player_sprite.ay = player_gravity
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.CannonProjectile, function (sprite, otherSprite) {
    takeDamage()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_isPlaying) {
    	
    } else if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-bottom1`) || player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-top0`)) {
        fillHourglass()
    } else {
        dropHourglass()
    }
})
scene.onOverlapTile(SpriteKind.Player, tiles.util.door0, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, tiles.util.door0)) {
        player_sprite.say("UP: Enter", 200)
    }
})
sprites.onCreated(SpriteKind.Food, function (sprite) {
    sprite.setImage(assets.image`pickup_health`)
    sprite.ay = 100
})
statusbars.onZero(StatusBarKind.Environment, function (status) {
    tiles.replaceAllTiles(assets.tile`hourglass-top`, assets.tile`hourglass-top0`)
    tiles.replaceAllTiles(assets.tile`hourglass-bottom0`, assets.tile`hourglass-bottom1`)
    for (let index2 = 0; index2 <= cost_fillHourglass - 1; index2++) {
        sand = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 4 e 4 . . . . . . 
            . . . . . 4 4 4 4 e 4 . . . . . 
            . . . . 4 4 4 e 4 4 e 4 . . . . 
            . . . 4 4 4 4 4 e 4 e 4 . . . . 
            . . . 4 4 4 e 4 4 e 4 e 4 . . . 
            . . 4 4 4 4 4 e 4 4 e 4 e 4 . . 
            . 4 4 4 4 e e 4 e 4 4 e 4 e 4 . 
            4 4 4 e e e e e e e 4 4 e 4 e 4 
            `, SpriteKind.Ammo)
        sand.setPosition(status.spriteAttachedTo().x + index2, status.spriteAttachedTo().y)
    }
    list = tiles.getTilesByType(sprites.dungeon.floorLight2)
    for (let value of tiles.getTilesByType(sprites.dungeon.floorDarkDiamond)) {
        tiles.setWallAt(value, true)
    }
    tiles.replaceAllTiles(sprites.dungeon.floorDarkDiamond, sprites.dungeon.floorLight2)
    for (let value2 of list) {
        tiles.setWallAt(value2, false)
        tiles.setTileAt(value2, sprites.dungeon.floorDarkDiamond)
    }
    music.bigCrash.play()
    status.spriteAttachedTo().destroy()
    status.destroy()
})
function startGame () {
    connectRooms()
    tiles.loadMap(list_Rooms[0])
    tiles.placeOnRandomTile(player_sprite, tiles.util.object7)
    player_sprite.setPosition(player_sprite.x + tiles.tileWidth(), player_sprite.y)
}
function connectRooms () {
    list_Rooms = [tiles.createMap(tilemap`level_1`)]
    list_Rooms.push(tiles.createMap(tilemap`level_2`))
    list_Rooms.push(tiles.createMap(tilemap`level_3`))
    list_Rooms.push(tiles.createMap(tilemap`level_4`))
    list_Rooms.push(tiles.createMap(tilemap`level_5`))
    list_Rooms.push(tiles.createMap(tilemap`level_6`))
    list_Rooms.push(tiles.createMap(tilemap`level0`))
    tiles.connectMapById(list_Rooms[0], list_Rooms[1], ConnectionKind.Door1)
    tiles.connectMapById(list_Rooms[1], list_Rooms[2], ConnectionKind.Door2)
    tiles.connectMapById(list_Rooms[1], list_Rooms[5], ConnectionKind.Door3)
    tiles.connectMapById(list_Rooms[2], list_Rooms[3], ConnectionKind.Door1)
    tiles.connectMapById(list_Rooms[2], list_Rooms[3], ConnectionKind.Door3)
    tiles.connectMapById(list_Rooms[3], list_Rooms[4], ConnectionKind.Door2)
}
function fillHourglass () {
    if (upgrade_fillHourglass && payCost(cost_fillHourglass)) {
        tiles.replaceAllTiles(assets.tile`hourglass-top0`, assets.tile`hourglass-top`)
        tiles.replaceAllTiles(assets.tile`hourglass-bottom1`, assets.tile`hourglass-bottom0`)
        list = tiles.getTilesByType(sprites.dungeon.floorDarkDiamond)
        for (let value2 of tiles.getTilesByType(sprites.dungeon.floorLight2)) {
            tiles.setWallAt(value2, false)
        }
        tiles.replaceAllTiles(sprites.dungeon.floorLight2, sprites.dungeon.floorDarkDiamond)
        for (let value2 of list) {
            tiles.setWallAt(value2, true)
            tiles.setTileAt(value2, sprites.dungeon.floorLight2)
        }
        music.smallCrash.play()
        tempSprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.TempSprite)
        tempSprite.setPosition(tiles.locationXY(tiles.locationOfSprite(player_sprite), tiles.XY.x), tiles.locationXY(tiles.locationOfSprite(player_sprite), tiles.XY.y))
        statusbar3 = statusbars.create(4, 32, StatusBarKind.Environment)
        statusbar3.attachToSprite(tempSprite, 0, -8)
        statusbar3.setColor(5, 4)
        statusbar3.positionDirection(CollisionDirection.Left)
        statusbar3.max = duration_hourglass / duration_tickRate
        statusbar3.value = duration_hourglass / duration_tickRate
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_isPlaying) {
    	
    } else {
        player_facing = -1
        animation.runImageAnimation(
        player_sprite,
        assets.animation`sandman_walkLeft`,
        200,
        true
        )
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Door, function (sprite, otherSprite) {
    if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row) == tiles.locationXY(tiles.locationOfSprite(otherSprite), tiles.XY.row) && tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.column) == tiles.locationXY(tiles.locationOfSprite(otherSprite), tiles.XY.column)) {
        player_sprite.say("UP to Enter", 200)
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (cutscene_isPlaying) {
    	
    } else if (!(controller.left.isPressed())) {
        animation.stopAnimation(animation.AnimationTypes.ImageAnimation, player_sprite)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`pickup_cosmicFunnel`, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`pickup_cosmicFunnel`)) {
        sprite.say("UP: Pickup", 200)
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (cutscene_isPlaying) {
    	
    } else if (!(controller.right.isPressed())) {
        animation.stopAnimation(animation.AnimationTypes.ImageAnimation, player_sprite)
    }
})
scene.onHitWall(SpriteKind.Construct, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.x = tiles.locationXY(location, tiles.XY.x)
        tiles.setWallAt(tiles.locationOfSprite(sprite), true)
        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Top), true)
    }
})
tiles.onMapLoaded(function (tilemap2) {
    tiles.replaceAllTiles(tiles.util.object7, assets.tile`background_purple`)
    tiles.coverAllTiles(tiles.util.door0, sprites.dungeon.doorOpenNorth)
    tiles.coverAllTiles(tiles.util.door2, sprites.dungeon.doorOpenNorth)
    tiles.coverAllTiles(tiles.util.door8, sprites.dungeon.doorOpenNorth)
    tiles.replaceAllTiles(tiles.util.object13, assets.tile`sandVortex`)
    tiles.createSpritesOnTiles(tiles.util.object8, SpriteKind.Ammo)
    tiles.coverAllTiles(tiles.util.object8, assets.tile`background_purple`)
    tiles.createSpritesOnTiles(tiles.util.object10, SpriteKind.Food)
    tiles.coverAllTiles(tiles.util.object10, assets.tile`background_purple`)
    tiles.createSpritesOnTiles(tiles.util.arrow4, SpriteKind.Enemy)
    tiles.coverAllTiles(tiles.util.arrow4, assets.tile`background_purple`)
    tiles.createSpritesOnTiles(tiles.util.arrow5, SpriteKind.Enemy)
    tiles.coverAllTiles(tiles.util.arrow5, assets.tile`background_purple`)
    tiles.createSpritesOnTiles(tiles.util.arrow0, SpriteKind.Enemy)
    tiles.coverAllTiles(tiles.util.arrow0, assets.tile`background_purple`)
    tiles.createSpritesOnTiles(tiles.util.arrow1, SpriteKind.Enemy)
    tiles.coverAllTiles(tiles.util.arrow1, assets.tile`background_purple`)
    tiles.createSpritesOnTiles(tiles.util.arrow8, SpriteKind.Cannon)
    tiles.coverAllTiles(tiles.util.arrow8, assets.tile`background_purple`)
    if (upgrade_fillHourglass) {
        tiles.replaceAllTiles(assets.tile`pickup_cosmicFunnel`, assets.tile`background_purple`)
    }
    if (upgrade_makeHourglasas) {
        tiles.replaceAllTiles(assets.tile`pickup_hourglassForge`, assets.tile`background_purple`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ammo, function (sprite, otherSprite) {
    if (info.score() < player_sandMax) {
        info.changeScoreBy(1)
        otherSprite.destroy(effects.warmRadial, 500)
    }
})
function takeDamage () {
    timer.throttle("action", duration_damageImmunity, function () {
        player_sprite.startEffect(effects.ashes, duration_damageImmunity)
        scene.cameraShake(4, 500)
        info.changeLifeBy(-1)
    })
}
statusbars.onZero(StatusBarKind.Magic, function (status) {
    status.destroy()
})
function getHasFallen () {
    if (tiles.locationXY(tiles.locationOfSprite(player_sprite), tiles.XY.row) >= tiles.tilemapRows() - 1) {
        if (!(cutscene_isPlaying)) {
            takeDamage()
            cutscene_isPlaying = true
            if (player_facing == -1) {
                animation.runImageAnimation(
                player_sprite,
                assets.animation`player_fallingLeft`,
                100,
                false
                )
            } else {
                animation.runImageAnimation(
                player_sprite,
                assets.animation`player_fallingRight`,
                100,
                false
                )
            }
            timer.after(500, function () {
                animation.stopAnimation(animation.AnimationTypes.All, player_sprite)
                player_sprite.setImage(assets.image`sandman`)
                player_sprite.setVelocity(0, 0)
                player_sprite.setPosition(player_respawnX, player_respawnY)
                cutscene_isPlaying = false
            })
        }
    }
}
function upDoorAction () {
    if (player_sprite.tileKindAt(TileDirection.Center, sprites.dungeon.doorOpenNorth)) {
        game.over(true, effects.confetti)
        return true
    } else if (player_sprite.tileKindAt(TileDirection.Center, tiles.util.door0)) {
        tiles.loadConnectedMap(ConnectionKind.Door1)
        tiles.placeOnRandomTile(player_sprite, tiles.util.door0)
        return true
    } else if (player_sprite.tileKindAt(TileDirection.Center, tiles.util.door2)) {
        tiles.loadConnectedMap(ConnectionKind.Door2)
        tiles.placeOnRandomTile(player_sprite, tiles.util.door2)
        return true
    } else if (player_sprite.tileKindAt(TileDirection.Center, tiles.util.door8)) {
        tiles.loadConnectedMap(ConnectionKind.Door3)
        tiles.placeOnRandomTile(player_sprite, tiles.util.door8)
        return true
    } else {
        return false
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_isPlaying) {
    	
    } else {
        player_facing = 1
        animation.runImageAnimation(
        player_sprite,
        assets.animation`sandman_walkRight`,
        200,
        true
        )
    }
})
tiles.onMapUnloaded(function (tilemap2) {
    tiles.destroySpritesOfKind(SpriteKind.Construct)
    tiles.destroySpritesOfKind(SpriteKind.Projectile)
    tiles.destroySpritesOfKind(SpriteKind.Enemy)
    tiles.destroySpritesOfKind(SpriteKind.Food)
    tiles.destroySpritesOfKind(SpriteKind.Ammo)
    tiles.destroySpritesOfKind(SpriteKind.TempSprite)
    tiles.destroySpritesOfKind(SpriteKind.SleepingEnemy)
    tiles.destroySpritesOfKind(SpriteKind.Door)
    tiles.destroySpritesOfKind(SpriteKind.Cannon)
    tiles.destroySpritesOfKind(SpriteKind.CannonProjectile)
})
function updateRespawn () {
    timer.after(50, function () {
        player_respawnX = player_sprite.x
        player_respawnY = player_sprite.y
    })
}
scene.onOverlapTile(SpriteKind.Player, tiles.util.door2, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, tiles.util.door2)) {
        player_sprite.say("UP: Enter", 200)
    }
})
function fireCannons () {
    timer.throttle("fireCannons", 2000, function () {
        for (let value of sprites.allOfKind(SpriteKind.Cannon)) {
            if (value.image.equals(assets.image`enemy_cannonUp`)) {
                projectile2 = sprites.createProjectileFromSprite(assets.image`myImage`, value, 0, -120)
                projectile2.setKind(SpriteKind.CannonProjectile)
                projectile2.startEffect(effects.fire)
            }
        }
    })
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.CannonProjectile, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 500)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (cutscene_isPlaying) {
    	
    } else {
    	
    }
    player_sprite.ay = player_gravity
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_isPlaying) {
    	
    } else {
        for (let value3 of sprites.allOfKind(SpriteKind.Construct)) {
            if (value3.image.equals(assets.image`hourglass_broken`)) {
                continue;
            }
            flipStatusbar = statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, value3)
            flipStatusbar.value = flipStatusbar.max - flipStatusbar.value
            value3.setImage(assets.image`hourglass_broken`)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`pickup_hourglassForge`, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`pickup_hourglassForge`)) {
        sprite.say("UP: Pickup", 200)
    }
})
info.onLifeZero(function () {
    game.over(false)
})
sprites.onCreated(SpriteKind.Cannon, function (sprite) {
    if (tiles.tileIs(tiles.locationOfSprite(sprite), tiles.util.arrow8)) {
        sprite.setImage(assets.image`enemy_cannonUp`)
    }
})
function putEnemyToSleep (enemySprite: Sprite, orignalVx: number, originalVy: number) {
    enemySprite.setKind(SpriteKind.SleepingEnemy)
    enemySprite.setVelocity(0, 0)
    enemySprite.say("Zzzz", duration_sleep)
    timer.background(function () {
        timer.after(duration_sleep, function () {
            enemySprite.setKind(SpriteKind.Enemy)
            if (orignalVx != 0 || originalVy != 0) {
                enemySprite.setVelocity(orignalVx, originalVy)
            }
        })
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (info.life() < player_lifeMax) {
        otherSprite.destroy(effects.coolRadial, 500)
        info.changeLifeBy(1)
    }
})
function payCost (cost: number) {
    if (info.score() >= cost) {
        info.changeScoreBy(cost * -1)
        return true
    } else {
        return false
    }
}
scene.onOverlapTile(SpriteKind.Player, tiles.util.door8, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, tiles.util.door8)) {
        player_sprite.say("UP: Enter", 200)
    }
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    status.spriteAttachedTo().destroy(effects.disintegrate, 500)
    for (let index3 = 0; index3 <= cost_fillHourglass - 1; index3++) {
        sand = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 4 e 4 . . . . . . 
            . . . . . 4 4 4 4 e 4 . . . . . 
            . . . . 4 4 4 e 4 4 e 4 . . . . 
            . . . 4 4 4 4 4 e 4 e 4 . . . . 
            . . . 4 4 4 e 4 4 e 4 e 4 . . . 
            . . 4 4 4 4 4 e 4 4 e 4 e 4 . . 
            . 4 4 4 4 e e 4 e 4 4 e 4 e 4 . 
            4 4 4 e e e e e e e 4 4 e 4 e 4 
            `, SpriteKind.Ammo)
        sand.setPosition(status.spriteAttachedTo().x + index3 * 4, status.spriteAttachedTo().top)
    }
})
sprites.onCreated(SpriteKind.Ammo, function (sprite) {
    sprite.setImage(assets.image`pickup_sand`)
    sprite.ay = 100
})
function updateTimers () {
    status_bar_list = statusbars.allOfKind(StatusBarKind.Energy)
    for (let value4 of status_bar_list) {
        value4.value += -1
    }
    status_bar_list = statusbars.allOfKind(StatusBarKind.Magic)
    for (let value5 of status_bar_list) {
        value5.value += -1
    }
    status_bar_list = statusbars.allOfKind(StatusBarKind.Environment)
    for (let value6 of status_bar_list) {
        value6.value += -1
    }
}
function getCanJump () {
    if (player_sprite.isHittingTile(CollisionDirection.Bottom)) {
        return true
    } else {
        for (let value7 of sprites.allOfKind(SpriteKind.Construct)) {
            if (player_sprite.overlapsWith(value7) && value7.isHittingTile(CollisionDirection.Bottom)) {
                return true
            }
        }
        return false
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`hourglass-bottom1`, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-bottom1`)) {
        if (upgrade_fillHourglass) {
            sprite.say("A: Fill", 200)
        }
    }
})
function dropHourglass () {
    timer.throttle("dropHourglass", 1000, function () {
        if (upgrade_makeHourglasas && payCost(cost_makeHourglass)) {
            hourglass = sprites.create(assets.image`hourglass_filled`, SpriteKind.Construct)
            hourglass.setPosition(player_sprite.x, player_sprite.top)
            hourglass.setVelocity(50 * player_facing, -50)
            hourglass.ay = 100
            hourglass.fx = 75
            statusbar = statusbars.create(4, 32, StatusBarKind.Energy)
            statusbar.attachToSprite(hourglass, -2, 0)
            statusbar.max = duration_hourglass / duration_tickRate
            statusbar.value = duration_hourglass / duration_tickRate
            statusbar.positionDirection(CollisionDirection.Left)
        }
    })
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorOpenNorth, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, sprites.dungeon.doorOpenNorth)) {
        player_sprite.say("UP: Escape!", 200)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar2 = statusbars.create(16, 4, StatusBarKind.Magic)
    statusbar2.attachToSprite(otherSprite, 0, 0)
    statusbar2.max = duration_sleep / duration_tickRate
    statusbar2.value = duration_sleep / duration_tickRate
    putEnemyToSleep(otherSprite, otherSprite.vx, otherSprite.vy)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`sandVortex`, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Center, assets.tile`sandVortex`)) {
        player_sprite.say("UP: Gather", 200)
    }
})
function upContextAction () {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`sandVortex`)) {
        if (!(upgrade_firstSand)) {
            game.showLongText("Press B to Throw Sand to put enemies to sleep", DialogLayout.Top)
            game.showLongText("How much Sand you have is shown in the top right corner", DialogLayout.Top)
            game.showLongText("Sand can be picked from piles or refilled at the Sand Vortexes", DialogLayout.Top)
            upgrade_firstSand = true
        }
        info.setScore(Math.max(player_sandMax, info.score()))
        return true
    } else if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`pickup_cosmicFunnel`)) {
        upgrade_fillHourglass = true
        tiles.replaceAllTiles(assets.tile`pickup_cosmicFunnel`, assets.tile`transparency16`)
        game.showLongText("Cosmic Funnel - Converts the Sands of Sleep to the Sands of Time", DialogLayout.Top)
        game.showLongText("Press A when standing near an Hourglass to fill it and temporarily change the dream around you", DialogLayout.Top)
        game.showLongText("It costs 2 Sand to fill an Hourglass which will be returned when it runs out", DialogLayout.Top)
        return true
    } else if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`pickup_hourglassForge`)) {
        upgrade_makeHourglasas = true
        tiles.replaceAllTiles(assets.tile`pickup_hourglassForge`, assets.tile`transparency16`)
        game.showLongText("Forge of Time: Hourglass - Melts the sands of time into an Hourglass", DialogLayout.Top)
        game.showLongText("Press A to drop an Hourglass that acts as a wall and a platform", DialogLayout.Top)
        game.showLongText("It costs 3 Sand to make the Hourglass and fill it ", DialogLayout.Top)
        game.showLongText("When the sand filling it runs out, the Hourglass will disappear and drop the sand inside", DialogLayout.Top)
        return true
    } else if (false) {
    	
    } else if (false) {
    	
    } else {
        return false
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    takeDamage()
})
let upgrade_firstSand = false
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let hourglass: Sprite = null
let status_bar_list: StatusBarSprite[] = []
let flipStatusbar: StatusBarSprite = null
let projectile2: Sprite = null
let upgrade_makeHourglasas = false
let statusbar3: StatusBarSprite = null
let tempSprite: Sprite = null
let list_Rooms: tiles.WorldMap[] = []
let list: tiles.Location[] = []
let sand: Sprite = null
let player_respawnY = 0
let player_respawnX = 0
let upgrade_fillHourglass = false
let projectile: Sprite = null
let player_canJump = false
let player_gravity = 0
let player_sprite: Sprite = null
let player_lifeMax = 0
let player_sandMax = 0
let cost_makeHourglass = 0
let cost_fillHourglass = 0
let cost_throwSand = 0
let duration_tickRate = 0
let duration_damageImmunity = 0
let duration_sleep = 0
let duration_hourglass = 0
let player_facing = 0
let cutscene_isPlaying = false
game.splash("Sandman's Sojourn")
game.showLongText("The Sandman has become trapped in someone's dream", DialogLayout.Full)
game.showLongText("Use Left and Right buttons to move and Up to jump", DialogLayout.Full)
game.showLongText("Watch out for enemies and bottomless pits", DialogLayout.Full)
game.showLongText("If you get hurt, collecting dream orbs will refill your health", DialogLayout.Full)
cutscene_isPlaying = false
scene.setBackgroundColor(12)
player_facing = 1
duration_hourglass = 5000
duration_sleep = 2500
duration_damageImmunity = 1000
duration_tickRate = 500
cost_throwSand = 1
cost_fillHourglass = 2
cost_makeHourglass = 3
player_sandMax = 10
player_lifeMax = 3
info.setScore(0)
info.setLife(player_lifeMax)
player_sprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . f f e e e e f 2 f . . . . 
    . . f f e e e e f 2 2 2 f . . . 
    . . f e e e f f e e e e f . . . 
    . . f f f f e e 2 2 2 2 e f . . 
    . . f e 2 2 2 f f f f e 2 f . . 
    . f f f f f f f e e e f f f . . 
    . f f e 4 4 e b f 4 4 e e f . . 
    . f e e 4 d 4 1 f d d e f . . . 
    . . f e e e e e d d d f . . . . 
    . . . . f 4 d d e 4 e f . . . . 
    . . . . f e d d e 2 2 f . . . . 
    . . . f f f e e f 5 5 f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . f f . . . f f f . . . . 
    `, SpriteKind.Player)
startGame()
player_gravity = 300
player_sprite.ay = player_gravity
controller.moveSprite(player_sprite, 50, 0)
scene.cameraFollowSprite(player_sprite)
game.onUpdate(function () {
    player_canJump = getCanJump()
    getHasFallen()
})
game.onUpdateInterval(duration_tickRate, function () {
    updateTimers()
    fireCannons()
})
