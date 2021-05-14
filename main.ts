namespace SpriteKind {
    export const Construct = SpriteKind.create()
    export const SleepingEnemy = SpriteKind.create()
    export const TempSprite = SpriteKind.create()
    export const Ammo = SpriteKind.create()
}
namespace StatusBarKind {
    export const Environment = StatusBarKind.create()
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
    } else {
    	
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_isPlaying) {
    	
    } else if (upContextAction()) {
    	
    } else if (player_canJump) {
        player_sprite.vy = -85
        player_sprite.ay = -10
        player_canJump = false
        controller.configureRepeatEventDefaults(250, 30)
    } else {
    	
    }
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
                projectile = sprites.createProjectileFromSprite(assets.image`sand`, player_sprite, randint(60, 80) * player_facing, randint(0, -20))
                projectile.ay = 100
            }
        }
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`hourglass-top0`, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-top0`)) {
        sprite.say("A to Fill", 200)
    }
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    if (cutscene_isPlaying) {
    	
    } else {
        player_sprite.ay = player_gravity
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cutscene_isPlaying) {
    	
    } else if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-bottom1`) || player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-top0`)) {
        fillHourglass()
    } else {
        dropHourglass()
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
    for (let value of tiles.getTilesByType(sprites.dungeon.floorDarkDiamond)) {
        tiles.setWallAt(value, true)
    }
    tiles.replaceAllTiles(sprites.dungeon.floorDarkDiamond, sprites.dungeon.floorLight2)
    music.bigCrash.play()
    status.spriteAttachedTo().destroy()
    status.destroy()
})
function fillHourglass () {
    if (payCost(cost_fillHourglass)) {
        tiles.replaceAllTiles(assets.tile`hourglass-top0`, assets.tile`hourglass-top`)
        tiles.replaceAllTiles(assets.tile`hourglass-bottom1`, assets.tile`hourglass-bottom0`)
    }
    for (let value2 of tiles.getTilesByType(sprites.dungeon.floorLight2)) {
        tiles.setWallAt(value2, false)
    }
    tiles.replaceAllTiles(sprites.dungeon.floorLight2, sprites.dungeon.floorDarkDiamond)
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
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (cutscene_isPlaying) {
    	
    } else {
        animation.stopAnimation(animation.AnimationTypes.ImageAnimation, player_sprite)
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (cutscene_isPlaying) {
    	
    } else {
        animation.stopAnimation(animation.AnimationTypes.ImageAnimation, player_sprite)
    }
})
scene.onHitWall(SpriteKind.Construct, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        tiles.setWallAt(tiles.locationOfSprite(sprite), true)
        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Top), true)
    }
})
tiles.onMapLoaded(function (tilemap2) {
    tiles.placeOnRandomTile(player_sprite, tiles.util.object7)
    player_sprite.setPosition(player_sprite.x + tiles.tileWidth(), player_sprite.y)
    tiles.replaceAllTiles(tiles.util.object7, assets.tile`sandVortex`)
    tiles.createSpritesOnTiles(tiles.util.object8, SpriteKind.Ammo)
    tiles.replaceAllTiles(tiles.util.object8, assets.tile`transparency16`)
    tiles.createSpritesOnTiles(tiles.util.object10, SpriteKind.Food)
    tiles.replaceAllTiles(tiles.util.object10, assets.tile`transparency16`)
    tiles.replaceAllTiles(sprites.dungeon.floorDarkDiamond, assets.tile`transparency16`)
    tiles.createSpritesOnTiles(tiles.util.arrow4, SpriteKind.Enemy)
    tiles.replaceAllTiles(tiles.util.arrow4, assets.tile`transparency16`)
    tiles.createSpritesOnTiles(tiles.util.arrow5, SpriteKind.Enemy)
    tiles.replaceAllTiles(tiles.util.arrow5, assets.tile`transparency16`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ammo, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 500)
    info.changeScoreBy(1)
    info.setScore(Math.min(info.score(), player_sandMax))
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
info.onLifeZero(function () {
    game.over(false)
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
    sprite.setImage(img`
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
        `)
    sprite.ay = 100
})
function startLevel () {
    tiles.loadMap(tiles.createMap(tilemap`level0`))
}
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
        player_canJump = true
    } else {
        for (let value7 of sprites.allOfKind(SpriteKind.Construct)) {
            if (player_sprite.overlapsWith(value7)) {
                player_canJump = true
            }
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`hourglass-bottom1`, function (sprite, location) {
    if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`hourglass-bottom1`)) {
        sprite.say("A to Fill", 200)
    }
})
function dropHourglass () {
    timer.throttle("dropHourglass", 1000, function () {
        if (payCost(cost_makeHourglass)) {
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
        player_sprite.say("UP to Enter", 200)
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
        player_sprite.say("UP to Get Sand", 200)
    }
})
function upContextAction () {
    if (player_sprite.tileKindAt(TileDirection.Center, sprites.dungeon.doorOpenNorth)) {
        game.over(true, effects.confetti)
        return true
    } else if (player_sprite.tileKindAt(TileDirection.Center, assets.tile`sandVortex`)) {
        info.setScore(Math.max(player_sandMax, info.score()))
        return true
    } else if (false) {
    	
    } else {
        return false
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    takeDamage()
})
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let hourglass: Sprite = null
let status_bar_list: StatusBarSprite[] = []
let flipStatusbar: StatusBarSprite = null
let statusbar3: StatusBarSprite = null
let tempSprite: Sprite = null
let sand: Sprite = null
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
game.showLongText("Use Left and Right buttons to move and Up to jump", DialogLayout.Center)
game.showLongText("Press B to Throw Sand to put enemies to sleep", DialogLayout.Center)
game.showLongText("You only have so much Sand but more can be collected from Vortexes", DialogLayout.Center)
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
info.setScore(player_sandMax)
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
startLevel()
player_gravity = 300
player_sprite.ay = player_gravity
controller.moveSprite(player_sprite, 50, 0)
scene.cameraFollowSprite(player_sprite)
game.onUpdate(function () {
    getCanJump()
})
game.onUpdateInterval(duration_tickRate, function () {
    updateTimers()
})
