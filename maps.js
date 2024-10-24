/*
 [By Robz
 [ If you want to add more maps copy one and change it or just change one below.
 [ When adding a new map you need to put it in the array at the bottom of this file.
 [
 [ 1 = start right | 2 = start down | 3 = start left | 4 = start up | x = tower block | 
 [ r = to right    | d = to down    | l = to left    | u = to up    | s = split block |
*/
var map_builder = {
    type: "",
    points: 1.0,
    waves: 35,
    size: "18x12",
    map: [],
}
//only used to copy and to make a new map of (18x12 maps)
var map_clean = {
    type: "clean",
    points: 1.1,
    waves: 35,
    size: "18x12",
    map: [
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
    ],
}
//easy
var map_easy_1 = Object.create(map_builder);
    map_easy_1.type = "easy";
    map_easy_1.map = [
        "xxxxxxxxxxxxxxxxxx",
        "1rrrrrrrrrrrrrrrdx",
        "xxxxxxxxxxxxxxxxdx",
        "xxxxdllllllllllllx",
        "xxxxdxxxxxxxxxxxxx",
        "xxxxdxxxxxrrrrrrdx",
        "xxdllxxxxxuxxxxxdx",
        "xxdxxxxxxxuxxxxxdx",
        "xxrrrrrrrruxxxxxdx",
        "xxxxxxxxxxxxxxxxdx",
        "xxellllllllllllllx",
        "xxxxxxxxxxxxxxxxxx",    
    ];
var map_easy_2 = Object.create(map_builder);
    map_easy_2.type = "easy";
    map_easy_2.map = [
        "x2xrrdxrrdxrrdxrrd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xdxuxdxuxdxuxdxuxd",
        "xrruxrruxrruxrruxe",    
    ];
var map_easy_3 = Object.create(map_builder);
    map_easy_3.type = "easy";
    map_easy_3.map = [
        "xxxxxxxxxxxxxxxxxx",
        "1rrrrrrrrrrrrrrrdx",
        "xxxxxxxxxxxxxxxxdx",
        "xrrrrrrrrrrrrrdxdx",
        "xuxxxxxxxxxxxxdxdx",
        "xuxrrrrrrrrrdxdxdx",
        "xuxuxxxxxxxxexdxdx",
        "xuxuxxxxxxxxxxdxdx",
        "xuxulllllllllllxdx",
        "xuxxxxxxxxxxxxxxdx",
        "xulllllllllllllllx",
        "xxxxxxxxxxxxxxxxxx",    
    ];
//normal
var map_normal_1 = Object.create(map_builder);
    map_normal_1.type = "normal";
    map_normal_1.points = 1.2;
    map_normal_1.waves = 60;
    map_normal_1.map = [
        "xxxxxxxx2xxexxxxxx",
        "xxxxxxxxdxxuxxxxxx",
        "xxxxxxxxdxxuxxxxxx",
        "xxxdlllllxxuxxxxxx",
        "xxxdxxxxxxxuxxxxxx",
        "xxxdxxxxxxxuxxxxxx",
        "xxxdxxxxxxxuxxxxxx",
        "xxxrrrrdxxxuxxxxxx",
        "xxxxxxxdxxxuxxxxxx",
        "xxxdllllxxxuxxxxxx",
        "xxxdxxxxxxxuxxxxxx",
        "xxxrrrrrrrruxxxxxx",   
    ];
var map_normal_2 = Object.create(map_builder);
    map_normal_2.type = "normal";
    map_normal_2.points = 1.2;
    map_normal_2.waves = 60;
    map_normal_2.map = [
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xdlllllllxxxxxxxxx",
        "xdxxxxxxuxxxxxxxxx",
        "xdxxxxxxuxxxxxxxxx",
        "xdxxxxxxuxxxxdllll",
        "xdxxxxxxuxxxxdxxxu",
        "xdxxxxxxuxxxxdxxxu",
        "xdxxxxxxulllllxxxu",
        "xdxxxxxxxxxxxxxxxu",
        "xexxxxxxxxxxxxxxx4",  
    ];
var map_normal_3 = Object.create(map_builder);
    map_normal_3.type = "normal";
    map_normal_3.points = 1.2;
    map_normal_3.waves = 60;
    map_normal_3.map = [
        "xxxxxxxxxxxxxxxxxx",
        "elllllllllxxxxxxxx",
        "xxxrrrrrruxxxxxxxx",
        "xxxuxxxxxxxxxxxxxx",
        "xxxuxxxxxxxxxxxxxx",
        "xxxuxxxxxxxxxxxxxx",
        "xxxuxxxdlllllllllx",
        "xxxuxxxdxxxxxxxxux",
        "xxxuxxxrrrrrdxxxux",
        "xxxuxxxxxxxxdxxxu3",
        "xxxulllllllllxxxxx",
        "xxxxxxxxxxxxxxxxxx",  
    ];
//hard
var map_hard_1 = Object.create(map_builder);
    map_hard_1.type = "hard";
    map_hard_1.points = 1.4;
    map_hard_1.waves = 100;
    map_hard_1.map = [
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "1rrrrrrrrrrrrrrrre",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",  
    ];
var map_hard_2 = Object.create(map_builder);
    map_hard_2.type = "hard";
    map_hard_2.points = 1.4;
    map_hard_2.waves = 100;
    map_hard_2.map = [
        "xxxxxxxxxxxrrdxxxx",
        "xxxxxxxxxxruxrdxxx",
        "xxxxxxxxxruxxxrdxx",
        "xxxxxxxxruxxxxxrdx",
        "xxxxxxxruxxxxxxxre",
        "xxxxxxruxxxxxxxxxx",
        "xxxxxruxxxxxxxxxxx",
        "xxxxruxxxxxxxxxxxx",
        "xxxruxxxxxxxxxxxxx",
        "xxruxxxxxxxxxxxxxx",
        "xruxxxxxxxxxxxxxxx",
        "1uxxxxxxxxxxxxxxxx",  
    ];
var map_hard_3 = Object.create(map_builder);
    map_hard_3.type = "hard";
    map_hard_3.points = 1.4;
    map_hard_3.waves = 100;
    map_hard_3.map = [
        "xxxxxxxxrrdxxxxxxx",
        "xxxxxxxxuxdxxxxxxx",
        "xxxxxxxxuxdxxxxxxx",
        "xxxxxxxxuxdxxxxxxx",
        "xxxxxxxruxdxxxxxxx",
        "xxxxxxruxxexxxxxxx",
        "xxxxxruxxxxxxxxxxx",
        "xxxxruxxxxxxxxxxxx",
        "xxxruxxxxxxxxxxxxx",
        "xxruxxxxxxxxxxxxxx",
        "xruxxxxxxxxxxxxxxx",
        "1uxxxxxxxxxxxxxxxx",  
    ];
//hell
var map_hell = Object.create(map_builder);
    map_hell.type = "hell";
    map_hell.points = 2.0;
    map_hell.waves = 666;
    map_hell.map = [
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxx",
        "xxx1rrrrrrrrrrexxx",  
    ];



//map size for tablet
var map_tablet_easy_1 = Object.create(map_builder);
    map_tablet_easy_1.type = "easy";
    map_tablet_easy_1.points = 1.1;
    map_tablet_easy_1.size = "12x10";
    map_tablet_easy_1.map = [
        "x2xxxxxxxxxx",
        "xrrrrrrrrrdx",
        "xxxxxxxxxxdx",
        "xxxxxxdllllx",
        "xxxxxxdxxxxx",
        "xdlllllxxxxx",
        "xdxxxxxxxxxx",
        "xdxxxxxxxxxx",
        "xrrrrrrrrrre",
        "xxxxxxxxxxxx",   
    ];
var map_tablet_easy_2 = Object.create(map_builder);
    map_tablet_easy_2.type = "easy";
    map_tablet_easy_2.points = 1.1;
    map_tablet_easy_2.size = "12x10";
    map_tablet_easy_2.map = [
        "xxexxxxxxxxx",
        "xxuxxxdllllx",
        "xxuxxxdxxxux",
        "xxulxxdxxxux",
        "xxxuxxdxxxux",
        "xxruxxrrdxux",
        "xxuxxxxxdxux",
        "xxuxxxxxdxux",
        "xxullllllxux",
        "xxxxxxxxxxu3",   
    ];
var map_tablet_easy_3 = Object.create(map_builder);
    map_tablet_easy_3.type = "easy";
    map_tablet_easy_3.points = 1.1;
    map_tablet_easy_3.size = "12x10";
    map_tablet_easy_3.map = [
        "xxxxxxxxxxxx",
        "1rrrrrrrrrrd",
        "xxxxxxxxxxxd",
        "dlllllllllll",
        "dxxxxxxxxxxx",
        "rrrrrrrrrrrd",
        "xxxxxxxxxxxd",
        "dlllllllllll",
        "dxxxxxxxxxxx",
        "rrrrrrrrrrre",   
    ];
var map_tablet_normal_1 = Object.create(map_builder);
    map_tablet_normal_1.type = "normal";
    map_tablet_normal_1.points = 1.3;
    map_tablet_normal_1.waves = 60;
    map_tablet_normal_1.size = "12x10";
    map_tablet_normal_1.map = [
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxrrrrrdx",
        "xxxxxuxxxxdx",
        "xxxxxuxexxdx",
        "xxxxxuxuxxdx",
        "xxxxxuxulllx",
        "xxxxxuxxxxxx",
        "xxxxxuxxxxxx",
        "xxxxx4xxxxxx",   
    ];
var map_tablet_normal_2 = Object.create(map_builder);
    map_tablet_normal_2.type = "normal";
    map_tablet_normal_2.points = 1.3;
    map_tablet_normal_2.waves = 60;
    map_tablet_normal_2.size = "12x10";
    map_tablet_normal_2.map = [
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xdlllllxxxxx",
        "xdxxxxuxxxxx",
        "xdxxexuxxxxx",
        "xdxxuxuxxxxx",
        "xrrruxuxxxxx",
        "xxxxxxuxxxxx",
        "xxxxxxuxxxxx",
        "xxxxxx4xxxxx",   
    ];
var map_tablet_hard_1 = Object.create(map_builder);
    map_tablet_hard_1.type = "hard";
    map_tablet_hard_1.points = 1.5;
    map_tablet_hard_1.waves = 100;
    map_tablet_hard_1.size = "12x10";
    map_tablet_hard_1.map = [
        "xxxxxelxxxxx",
        "xxxxxruxxxxx",
        "xxxxxulxxxxx",
        "xxxxxruxxxxx",
        "xxxxxulxxxxx",
        "xxxxxruxxxxx",
        "xxxxxulxxxxx",
        "xxxxxruxxxxx",
        "xxxxxulxxxxx",
        "xxxxx1uxxxxx",   
    ];
var map_tablet_hard_2 = Object.create(map_builder);
    map_tablet_hard_2.type = "hard";
    map_tablet_hard_2.points = 1.5;
    map_tablet_hard_2.waves = 100;
    map_tablet_hard_2.size = "12x10";
    map_tablet_hard_2.map = [
        "xxxxx2xxxxxx",
        "xxxxxdxxxxxx",
        "xxxxdlxxxxxx",
        "xxxdlxxxxxxx",
        "xxxdxxxxxxxx",
        "xxxdxxxexxxx",
        "xxxrdxxuxxxx",
        "xxxxrdxuxxxx",
        "xxxxxrruxxxx",
        "xxxxxxxxxxxx",   
    ];
var map_tablet_hard_3 = Object.create(map_builder);
    map_tablet_hard_3.type = "hard";
    map_tablet_hard_3.points = 1.5;
    map_tablet_hard_3.waves = 100;
    map_tablet_hard_3.size = "12x10";
    map_tablet_hard_3.map = [
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "elxxxxxxxxxx",
        "xulllxxxxxxx",
        "xxxxulllxxxx",
        "xxxxxxxuxxxx",
        "xxxxxxxuxxxx",
        "xx1rrrruxxxx",
        "xxxxxxxxxxxx",   
    ];
var map_tablet_hell = Object.create(map_builder);
    map_tablet_hell.type = "hell";
    map_tablet_hell.points = 3;
    map_tablet_hell.waves = 666;
    map_tablet_hell.size = "12x10";
    map_tablet_hell.map = [
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "xxxxxxxxxxxx",
        "x1rrrrrrrrex",   
    ];
//map size for mobile
var map_mobile_easy_1 = Object.create(map_builder);
    map_mobile_easy_1.type = "easy";
    map_mobile_easy_1.points = 1.2;
    map_mobile_easy_1.size = "08x10";
    map_mobile_easy_1.map = [
        "1dxxxxxx",
        "xdxrrrdx",
        "xdxuxxdx",
        "xdxuxxdx",
        "xrruxxdx",
        "xxxxxxdx",
        "xdlllllx",
        "xdxxxxxx",
        "xrrrrrre",
        "xxxxxxxx",
    ];
var map_mobile_normal_1 = Object.create(map_builder);
    map_mobile_normal_1.type = "normal";
    map_mobile_normal_1.points = 1.4;
    map_mobile_normal_1.waves = 60;
    map_mobile_normal_1.size = "08x10";
    map_mobile_normal_1.map = [
        "xxxxxxxx",
        "xxxxxxxx",
        "xrrrrrre",
        "xuxxxxxx",
        "xullxxxx",
        "xxxuxxxx",
        "xxxuxxxx",
        "xxxuxxxx",
        "xxxulllx",
        "xxxxxx4x",
    ];
var map_mobile_hard_1 = Object.create(map_builder);
    map_mobile_hard_1.type = "hard";
    map_mobile_hard_1.points = 1.6;
    map_mobile_hard_1.waves = 100;
    map_mobile_hard_1.size = "08x10";
    map_mobile_hard_1.map = [
        "xxxxxxxx",
        "xxxxxxxx",
        "dllllll3",
        "dxxxxxxx",
        "dxxxxxxx",
        "dxxxxxxx",
        "dxxxxxxx",
        "rrrrrrre",
        "xxxxxxxx",
        "xxxxxxxx",
    ];
var map_mobile_hell = Object.create(map_builder);
    map_mobile_hell.type = "hell";
    map_mobile_hell.points = 4;
    map_mobile_hell.waves = 666;
    map_mobile_hell.size = "08x10";
    map_mobile_hell.map = [
        "xxxxxxxx",
        "xxxxxxxx",
        "xxxxxxxx",
        "xxxxxxxx",
        "xxxxxxxx",
        "xxxxxxxx",
        "xxxxxxxx",
        "xxxxxxxx",
        "xxxxxxxx",
        "x1rrrrex",
    ];
var maps_all_array = [
    //pc
    //easy
    map_easy_1,
    map_easy_2,
    map_easy_3,
    //normal
    map_normal_1,
    map_normal_2,
    map_normal_3,
    //hard
    map_hard_1,
    map_hard_2,
    map_hard_3,
    //hell
    map_hell,
    //tablet
    //easy
    map_tablet_easy_1,
    map_tablet_easy_1,
    map_tablet_easy_1,
    //normal
    map_tablet_normal_1,
    map_tablet_normal_2,
    //hard
    map_tablet_hard_1,
    map_tablet_hard_2,
    map_tablet_hard_3,
    //hell
    map_tablet_hell,
    //mobile
    //easy
    map_mobile_easy_1,
    //normal
    map_mobile_normal_1,
    //hard
    map_mobile_hard_1,
    //hell
    map_mobile_hell
];