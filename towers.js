/*
 [By Robz
 [ If you want to add more towers copy one and change it or make it an upgrade to another tower.
 [ When adding a new tower you need to put it in the array at the bottom of this file.
 [
*/
//towers
var tower_builder = {
    id: 0,
    name: "tower",
    icon: "",
    effect: "damage",
    type: "cannon",
    damage: 1,
    speed: 1,
    range: 1,
    crit_rate: 1.1,
    crit_damage: 2,
    stun_chance: 0,
    upgrade_cost: 20,
    cost: 10,
    level: 1,
    paths: [],
    element: null,
    setID: function() {
        let id = Math.floor(Math.random()*1000);
        let match = false;
        if (Player.active_towers.length >= 1) {
            for (let i = 0; i < Player.active_towers.length; i++) {
                if (i == Player.active_towers.length-1 && match == false) {
                    this.id = Math.floor(Math.random()*1000);
                } else if (match) {
                    this.setID();
                }
                if (Player.active_towers[i].id == id) {
                    match = true;
                }
            }
        } else {
            this.id = Math.floor(Math.random()*1000);
        }
    },
    upgrade_button: function() {
        let D_upgrade = document.createElement("div");
        D_upgrade.className = "tower_upgrade";
        if (this.level < this.levels) {
            D_upgrade.innerHTML = "Upgrade $" + this.upgrade_costs[this.level-1] + this.icons[this.level];
            D_upgrade.addEventListener("click", () => this.upgrade());
        } else {
            D_upgrade.innerHTML = "Tower Maxed " + "&#128683";
            D_upgrade.addEventListener("click", () => this.upgrade());
        }
        active_shown_divs.push(D_upgrade);
        return  D_upgrade;
    },
    upgrade: function() {
        if (this.level < this.levels) {
            if (Player.money >= this.upgrade_costs[this.level-1]) {
                active_shown_divs.forEach(element => {
                    element.remove();
                });
                Player.money -= this.upgrade_costs[this.level-1];
                this.level++;
                this.element.innerHTML = this.icons[this.level-1];
                if (this.effect == "damage") {
                    this.damage = this.damage_levels[this.level-1];
                } else if (this.effect == "space") {
                    Player.max_towers -=this.amount_levels[this.level-2];
                    Player.max_towers += this.amount_levels[this.level-1];
                } else {
                    this.amount = this.amount_levels[this.level-1];
                }
            } else {
                active_shown_divs.forEach(element => {
                    element.remove();
                });
                message_popup("You don't have enough money!");
            }
        } else {
            active_shown_divs.forEach(element => {
                element.remove();
            });
            message_popup("This tower is max level!");
        }
        update_ui_values();
        
        
    },
    get_damage: function() {
        let damage = [];
        let plus_damage;
        if (this.effect == "damage") {
            crit = Math.floor(Math.random()*10)+this.crit_rate;
            if (crit >= 10) {
                plus_damage = parseInt(Math.round(this.damage_levels[this.level-1]*this.crit_damage));
                damage.push([this.type]);
                damage.push([plus_damage]);
                damage.push(["crit"]);
            } else {
                damage.push([this.type]);
                damage.push([this.damage_levels[this.level-1]]);
                damage.push([false]);
            }
        } else {
            damage.push([this.type]);
            damage.push([this.amount_levels[this.level-1]]);
            damage.push([false]);
        }
        return damage;
    },
}
var cannon_tower = Object.create(tower_builder);

var cannon = {
    name: "Cannon",
    icon: null,
    effect: "damage",
    type: "cannon",
    speed: 2,
    range: 1,
    crit_rate: 1.1,
    crit_damage: 2,
    stun_chance: 0,
    cost: 10,
    paths: [],
    element:null,
    level: 1,
    levels: 3,
    icons: ["&#128163","&#128640","&#127776"],
    damage_levels: [1,4,8],
    upgrade_costs: [15,30],
};

var fire = {
    name: "Fire",
    icon: null,
    effect: "damage",
    type: "fire",
    speed: 3,
    range: 1,
    crit_rate: 1.5,
    crit_damage: 1.8,
    stun_chance: 0,
    cost: 30,
    level: 1,
    element: null,
    levels: 3,
    icons: ["&#128312","&#128293","&#127755"],
    damage_levels: [3,9,15],
    upgrade_costs: [45,90],
};

var laser = {
    name: "Laser",
    icon: null,
    effect: "damage",
    type: "laser",
    speed: 1,
    range: 3,
    crit_rate: 1.3,
    crit_damage: 5,
    stun_chance: 0,
    cost: 200,
    level: 1,
    element: null,
    levels: 3,
    icons: ["&#128313","&#128311","&#128160"],
    damage_levels: [7,14,21],
    upgrade_costs: [300,500],
};



//support
var money = {
    name: "Money",
    icon: null,
    effect: "money",
    type: "money",
    range: 1,
    cost: 50,
    level: 1,
    element:null,
    levels: 3,
    icons: ["&#128178","&#128181","&#127974"],
    amount_levels: [1,2,4],
    upgrade_costs: [100,150],
};
var house = {
    name: "House",
    icon: null,
    effect: "space",
    type: "house",
    range: 0,
    cost: 45,
    level: 1,
    on_add: function() {
        Player.max_towers += this.amount_levels[0]*this.level;
    },
    levels: 3,
    icons: ["&#127968","&#127970","&#127981"],
    amount_levels: [2,3,4],
    upgrade_costs: [60,80],
};

//TODO-whenever-->terrain
//terrain
var mounten = {
    name: "Mounten",
    icon: "&#127956",
};
var tree_0 = {
    name: "Tree_0",
    icon: "&#127794",
};
var tree_1 = {
    name: "Tree_1",
    icon: "&#127796",
};
var flower_0 = {
    name: "Flower_0",
    icon: "&#127799;",
};
var bambo = {
    name: "bambo",
    icon: "&#127883",
};
var camping = {
    name: "Camping",
    icon: "&#127957",
};





var towers_all_array = [
    cannon,
    fire,
    laser,
    money,
    house,
];
var tower_all_types = [
    "cannon",
    "fire",
    "laser",
    "money",
    "house",
];