// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level_1":
            case "level2":return tiles.createTilemap(hex`280008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030200000000000000020000000000000000000000000000000000000000000000000000000001010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
`, [myTiles.transparency16,sprites.dungeon.darkGroundNorth,tiles.util.object15,tiles.util.object7], TileScale.Sixteen);
            case "level0":
            case "level1":return tiles.createTilemap(hex`280008001000000000020000000000020000000000000d00000d0000000200000000000002000000000000020000000000020000000000020000000000000000000000000002000000000000020000000000000200000000000200000000000200000000040000000000000000020000000000000200000000000002000000000002000000000002000000000300000000000000000200000000000002000000000000020000000000020000000000020000090101010a000000000000020000000000000200000000000002000000000002000c000000020000080004000f0a00000000000200000000000002000000000000020500000c0002000c000000020600080b030b0f00000000000002000600001100020000000e00000201010101010101010101010101010701010101010101010101010101010101010101010101010101`, img`
........................................
........................................
........................................
........................................
..............22222.....................
.......2......2...22....................
...2...2......2...2.....................
2222222222222222222222222222222222222222
`, [myTiles.transparency16,sprites.dungeon.darkGroundNorth,sprites.dungeon.floorDark1,myTiles.tile5,myTiles.tile6,tiles.util.object7,tiles.util.arrow4,sprites.dungeon.darkGroundSouthEast1,sprites.dungeon.darkGroundWest,sprites.dungeon.darkGroundNorthWest0,sprites.dungeon.darkGroundNorthEast0,tiles.util.object8,sprites.dungeon.floorLight0,tiles.util.arrow5,sprites.dungeon.doorOpenNorth,sprites.dungeon.floorLight2,sprites.dungeon.floorDarkDiamond,tiles.util.object10,myTiles.tile3], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "hourglass-bottom1":
            case "tile5":return tile5;
            case "hourglass-top0":
            case "tile6":return tile6;
            case "hourglass-bottom0":
            case "tile1":return tile1;
            case "hourglass-top":
            case "tile4":return tile4;
            case "sandVortex":
            case "tile2":return tile2;
            case "helpSign":
            case "tile3":return tile3;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
