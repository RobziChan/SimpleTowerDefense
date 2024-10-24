/*
 [By Robz
 [ If you want to add more enemies copy one and change it or just change one below.
 [ When adding a new enemies you need to put it in the array at the bottom of this file.
 [
*/


//enemies
var enemy_builder = {
    name: "enemy",
    icon: "",
    type: "easy",
    health: 3,
    weak: "none",
    damage: 1,
    give: 2,
    step: 0,
    flip: false,
    set_health: function() {
        let new_health;
        enemies_all_types.forEach(types => {
            if (types == this.type) {
                new_health = parseInt(Math.round(((this.health+Game_info.wave*2)*(enemies_all_types.indexOf(types)+1))*Game_info.map.points));
            }
        });
        this.health = new_health
        return new_health;
    },
    move: function() {
        if (this.step < 0) {
            this.step++;
        } else {
            if (this.flip) {
                let D_holder = document.createElement("div");
                mobs_spawn_path[this.step].appendChild(D_holder);
                mobs_spawn_path[this.step].childNodes[0].style.transform = "scaleX(-1)";
                
                mobs_spawn_path[this.step].childNodes[0].innerHTML = this.icon;
                mobs_spawn_path[this.step].setAttribute("E","");
                this.step++;
            } else {
                mobs_spawn_path[this.step].innerHTML = this.icon;
                mobs_spawn_path[this.step].setAttribute("E","");
                this.step++;
            }
        }
    },
    die: function() {
        if (mobs_spawn_path[this.step-2] != undefined) {
            mobs_spawn_path[this.step-2].innerHTML = "";
            mobs_spawn_path[this.step-2].removeAttribute("E","");
        }
        this.step = "end";
    },
}

//easy
var enemy_invader = {
    name: "Invader",
    icon: "&#128126", 
    type: "easy",
    health: 3,
    weak: "none",
    damage: 1,
    give: 2,
    step: 0,
    flip: false,
};
var enemy_rat = {
    name: "Rat",
    icon: "&#128000",
    type: "easy",
    health: 3,
    weak: "fire",
    damage: 1,
    give: 2,
    step: 0,
    flip: true,
};
var enemy_bunny = {
    name: "Bunny",
    icon: "&#128007",
    type: "easy",
    health: 4,
    weak: "laser",
    damage: 1,
    give: 2,
    step: 0,
    flip: true,
};
//normal
var enemy_turtle = {
    name: "Turtle",
    icon: "&#128034",
    type: "normal",
    health: 6,
    weak: "laser",
    damage: 1,
    give: 5,
    step: 0,
    flip: true,
};
var enemy_shark = {
    name: "Shark",
    icon: "&#129416",
    type: "normal",
    health: 6,
    weak: "laser",
    damage: 1,
    give: 5,
    step: 0,
    flip: true,
};
//hard
var enemy_snail = {
    name: "Snail",
    icon: "&#128012",
    type: "hard",
    health: 7,
    weak: "laser",
    damage: 2,
    give: 8,
    step: 0,
    flip: false,
};
var enemy_poop = {
    name: "Poop",
    icon: "&#128169",
    type: "hard",
    health: 7,
    weak: "cannon",
    damage: 2,
    give: 8,
    step: 0,
    flip: false,
};

//boss
var boss_chicken_egg = {
    name: "Chicken_egg",
    icon: "&#128035",
    type: "boss",
    health: 8,
    weak: "cannon",
    damage: 5,
    give: 15,
    step: 0,
    flip: false,
};

var boss_dragon = {
    name: "Dragon",
    icon: "&#128009",
    type: "boss",
    health: 8,
    weak: "laser",
    damage: 5,
    give: 15,
    step: 0,
    flip: true,
};

//special
var special_ghost = {
    name: "Ghost",
    icon: "&#128123",
    type: "special",
    health: 13,
    weak: "cannon",
    damage: 2,
    give: 20,
    step: 0,
    flip: false,
};
var special_finger = {
    name: "Finger",
    icon: "&#128405",
    type: "special",
    health: 13,
    weak: "cannon",
    damage: 2,
    give: 1,
    step: 0,
    flip: false,
};


var enemies_all_array = [
    //easy
    enemy_invader,
    enemy_rat,
    enemy_bunny,
    //normal
    enemy_turtle,
    enemy_shark,
    //hard
    enemy_snail,
    enemy_poop,
    //boss
    boss_chicken_egg,
    boss_dragon,
    //special
    special_ghost,
    special_finger,
];
var enemies_all_weakness = [
    "cannon",
    "fire",
    "laser",
];
var enemies_all_types = [
    "easy",
    "normal",
    "hard",
    "boss",
    "special",
];