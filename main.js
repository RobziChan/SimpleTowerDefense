//Vars
const wrapper_div = document.getElementById("wrapper");
const startbutton_button = document.getElementById("startbutton");
const settings_div = document.getElementById("settings");
const map_size = document.getElementById("map_size");
var boxes_per_row_input = 0;
var number_of_rows_input = 0;
var Tower_holder_div = document.createElement("div");
Tower_holder_div.className = "tower_holder";
var Tower_holder_div_inner = document.createElement("div");
Tower_holder_div_inner.className = "inner";
Tower_holder_div.appendChild(Tower_holder_div_inner);
//difficulty
const difficulty_input = document.getElementById("difficulty");
//special settings
const game_mode_tower_input = document.getElementById("game_mode_tower");
const game_mode_wave_input = document.getElementById("game_mode_wave");

var all_platforms;
var active_shown_divs = [];
random_tower_cost = 10;

//Local storage for getting highscore
var all_scores;
var toDay = new Date();
var score_array = new Array(5);
var score_obj = {
    date: date_order(),
    difficulty: "easy",
    points: 000,
}

if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("highscores_list")) {
        all_scores = JSON.parse(localStorage.getItem("highscores_list"));
    } else {
        all_scores = new Array(5);
        localStorage.setItem("highscores_list", JSON.stringify(score_array));
    }
} else {
    alert("Sorry, the browser you are using doesn't support web storage");
}

//game vars
var Player = {
    max_towers: 6,
    total_towers: 0,
    money: 20,
    kills: 0,
    random_tower_mode: false,
    random_wave_mode: false,
    difficulty: "easy",
    map_size: "",
    active_towers: [],
};
var Game_info = {
    wave: 1,
    spawn: 0,
    boss: 0,
    map: "",
};
//base
var base = {
    name: "Base",
    icon: "&#127984",
    max_health: 20,
    health: 20,
};

//Map size event listener, needs to be before most of things
map_size.addEventListener("change", function() {
    let map_size_array = Array.from(map_size.value);
    map_size_array.splice(map_size_array.indexOf("x"),1);
    boxes_per_row_input = map_size_array[0] + map_size_array[1];
    number_of_rows_input = map_size_array[2] + map_size_array[3];
    preStart();
});



//Event listeners
window.addEventListener("keyup", check_key);
startbutton_button.addEventListener("click",start_game);
difficulty_input.addEventListener("change", function() {Player.difficulty = this.value});
//special settings
game_mode_tower_input.addEventListener("change", function() {Player.random_tower_mode = this.checked});
game_mode_wave_input.addEventListener("change", function() {Player.random_wave_mode = this.checked});

//info patch blocks and towers

//map vars; platform vertical, mobs path, 
var mobs_spawn_path = [];
var plathforms_vertical;

var towers_slots = [];
var stats_to_update = [];

var path_blocks_events = [];

function date_order() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let space = " / ";
    let all_together = year+space+month+space+day;
    return all_together;
}
function preStart() {
    Player.map_size = boxes_per_row_input + "x" + number_of_rows_input;
    plathforms_vertical = new Array(parseInt(boxes_per_row_input));
    startbutton_button.disabled = false;
}
function start_game() {
    if (map_size.value != "0x0") {
        remove_menu();
        wrapper_div.style.backgroundImage = "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(0,128, 128,1))";
        create_game_Area();
        setgame_ui();
    } else {
        message_popup("Please select a map size!");
    }
}
function slider_show(id_name, text) {
    document.getElementById(id_name).innerText = text;
}
function remove_menu() {
    wrapper_div.innerHTML = "";
}
// ;)
var sixsixsix;
function create_mob_spawn_path() {
    let to_go;
    let matched_self;
    let start;
    let path;
    if (mobs_spawn_path.length-2 < path_blocks_holder.length) {
        if (mobs_spawn_path.length == 1) {
            //search from start block
            switch (mobs_spawn_path[0].getAttribute("dir")) {
                case "r":
                    //1 in maps.js is to start from right so we do "to_go = start+1" because thats the right of it
                    start = towers_slots.indexOf(mobs_spawn_path[0]);
                    to_go = start+1;
                    mobs_spawn_path.push(towers_slots[to_go]);
                    create_mob_spawn_path();
                    break;
                case "d":
                    matched_self = plathforms_vertical_match_element(mobs_spawn_path[mobs_spawn_path.length-1]);
                    to_go = plathforms_vertical[matched_self.row].indexOf(mobs_spawn_path[mobs_spawn_path.length-1])+1;
                    path = plathforms_vertical[matched_self.row][to_go];
                    mobs_spawn_path.push(path);
                    create_mob_spawn_path();
                    break;
                case "l":
                    start = towers_slots.indexOf(mobs_spawn_path[0]);
                    to_go = start-1;
                    mobs_spawn_path.push(towers_slots[to_go]);
                    create_mob_spawn_path();
                    break;
                case "u":
                    matched_self = plathforms_vertical_match_element(mobs_spawn_path[mobs_spawn_path.length-1]);
                    to_go = plathforms_vertical[matched_self.row].indexOf(mobs_spawn_path[mobs_spawn_path.length-1])-1;
                    path = plathforms_vertical[matched_self.row][to_go];
                    mobs_spawn_path.push(path);
                    create_mob_spawn_path();
                    break;
            
                default:
                    console.log("error: create_mob_spawn_path-> no DIR");
                    break;
            }
        } else {
            //search from next pos in mobs_spawn_path
            //get the "dir" attribute from the platfrom block
            switch (mobs_spawn_path[mobs_spawn_path.length-1].getAttribute("dir")) {
                case "r":
                    //look to the rigth
                    start = towers_slots.indexOf(mobs_spawn_path[mobs_spawn_path.length-1]);
                    to_go = start+1;
                    mobs_spawn_path.push(towers_slots[to_go]);
                    create_mob_spawn_path();
                break;
                case "d":
                    //look underneath itself
                    matched_self = plathforms_vertical_match_element(mobs_spawn_path[mobs_spawn_path.length-1]);
                    to_go = plathforms_vertical[matched_self.row].indexOf(mobs_spawn_path[mobs_spawn_path.length-1])+1;
                    path = plathforms_vertical[matched_self.row][to_go];
                    mobs_spawn_path.push(path);
                    create_mob_spawn_path();
                    break;
                case "l":
                    //look left itself aka -1
                    start = towers_slots.indexOf(mobs_spawn_path[mobs_spawn_path.length-1]);
                    to_go = start-1;
                    mobs_spawn_path.push(towers_slots[to_go]);
                    create_mob_spawn_path();
                    break;
                case "u":
                    //look above itself
                    matched_self = plathforms_vertical_match_element(mobs_spawn_path[mobs_spawn_path.length-1]);
                    to_go = plathforms_vertical[matched_self.row].indexOf(mobs_spawn_path[mobs_spawn_path.length-1])-1;
                    path = plathforms_vertical[matched_self.row][to_go];
                    mobs_spawn_path.push(path);
                    create_mob_spawn_path();
                    break;
                case "e":
                    //set the base icon
                    if (Player.difficulty == "hell") {
                        mobs_spawn_path[mobs_spawn_path.length-1].innerHTML = "&#127757";
                    } else {
                        mobs_spawn_path[mobs_spawn_path.length-1].innerHTML = base.icon;
                    }
                    
                    //set the background image
                    switch (mobs_spawn_path[mobs_spawn_path.length-2].getAttribute("dir")) {
                        case "r":
                            if (Player.difficulty == "hell") {
                                mobs_spawn_path[mobs_spawn_path.length-1].style.backgroundImage = "url(blocks/N_path_el_hell.png)";
                            } else {
                                mobs_spawn_path[mobs_spawn_path.length-1].style.backgroundImage = "url(blocks/N_path_el.png)";
                            }
                            break;
                        case "d":
                            mobs_spawn_path[mobs_spawn_path.length-1].style.backgroundImage = "url(blocks/N_path_ed.png)";
                            break;
                        case "l":
                            mobs_spawn_path[mobs_spawn_path.length-1].style.backgroundImage = "url(blocks/N_path_er.png)";
                            break;
                        case "u":
                            mobs_spawn_path[mobs_spawn_path.length-1].style.backgroundImage = "url(blocks/N_path_eu.png)";
                            break;
                        default:
                            console.log("error: create_mob_spawn_path -> Set base background -> no DIR");
                            break;
                    }
                    //run after the path has been set
                    set_background_image_path();
                    mobs_spawn_path.forEach(path => {
                        path.addEventListener("mouseover", function() {hover_path_info(this)});
                        path.addEventListener("mouseout", function() {hover_path_info.delete_info(true)});
                    });
                    towers_slots.forEach(element => {
                        if (element.id != "path") {
                            element.setAttribute("tower",false);
                            element.addEventListener("click", function() {click_platform(this)});
                            element.addEventListener("mouseover", function() {hover_platform(this)});
                            element.addEventListener("mouseout", function() {hover_platform.delete_info(this)});
                            if (Player.difficulty == "hell") {
                                element.style.backgroundImage = "url(blocks/tower_hell.png)";
                            }
                        }
                    });
                    break;
                default:
                    console.log("error: create_mob_spawn_path -> else -> no DIR");
                    break;
            }        
        }
    }
    
}
function set_background_image_path() {
    let behind_dir;
    let infront_dir;
    for(var i = 1; i < mobs_spawn_path.length; i++) {
        switch (mobs_spawn_path[i].getAttribute("dir")) {
            case "r":
                behind_dir = mobs_spawn_path[i-1].getAttribute("dir");
                infront_dir = mobs_spawn_path[i+1].getAttribute("dir");
                switch (behind_dir) {
                    case "r":
                        if (Player.difficulty == "hell") {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_hell.png)";
                        } else {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path.png)";
                        }
                        break;
                    case "d":
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_dr.png)";
                        break;
                    case "l":
                        if (Player.difficulty == "hell") {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_hell.png)";
                        } else {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path.png)";
                        }
                        break;
                    case "u":
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_ur.png)";
                        break;
                    default:
                        break;
                }
                switch (infront_dir) {
                    case "u":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_dl.png)";
                        break;
                    case "d":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_ul.png)";
                        break;
                    default:
                        break;
                }
                break;
            case "d":
                behind_dir = mobs_spawn_path[i-1].getAttribute("dir");
                infront_dir = mobs_spawn_path[i+1].getAttribute("dir");
                switch (behind_dir) {
                    case "r":
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_ul.png)";
                        break;
                    case "l":
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_ur.png)";
                        break;
                    default:
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_d.png)";
                        break;
                }
                switch (infront_dir) {
                    case "r":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_dr.png)";
                        break;
                    case "l":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_dl.png)";
                        break;
                    default:
                        break;
                }
                break;
            case "l":
                behind_dir = mobs_spawn_path[i-1].getAttribute("dir");
                infront_dir = mobs_spawn_path[i+1].getAttribute("dir");
                switch (behind_dir) {
                    case "r":
                        if (Player.difficulty == "hell") {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_hell.png)";
                        } else {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path.png)";
                        }
                        break;
                    case "d":
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_dl.png)";
                        break;
                    case "l":
                        if (Player.difficulty == "hell") {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_hell.png)";
                        } else {
                            mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path.png)";
                        }
                        break;
                    case "u":
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_ul.png)";
                        break;
                    default:
                        break;
                }
                switch (infront_dir) {
                    case "u":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_dr.png)";
                        break;
                    case "d":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_ur.png)";
                        break;
                    default:
                        break;
                }
                break;
            case "u":
                behind_dir = mobs_spawn_path[i-1].getAttribute("dir");
                infront_dir = mobs_spawn_path[i+1].getAttribute("dir");
                switch (behind_dir) {
                    case "r":
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_dl.png)";
                        break;
                    case "l":
                        
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_dr.png)";
                        break;
                    default:
                        mobs_spawn_path[i].style.backgroundImage = "url(blocks/N_path_u.png)";
                        break;
                }
                switch (infront_dir) {
                    case "r":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_ur.png)";
                        break;
                    case "l":
                        mobs_spawn_path[i+1].style.backgroundImage = "url(blocks/N_path_ul.png)";
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
}
var path_blocks_holder = [];
function create_game_Area() {
    var playAera = document.createElement("div");
    playAera.setAttribute("class","playAera");
    let active_map;
    let active_map_group = [];
    maps_all_array.forEach(map => {
        if (map.size == Player.map_size && map.type == Player.difficulty) {
            active_map_group.push(map);
        }
    });    
    active_map = active_map_group[Math.floor(Math.random()*active_map_group.length)];
    Game_info.map = active_map;
    for (i = 0; i < active_map.map.length; i++) {
        let block = Array.from(active_map.map[i]);
        for (j = 0; j < block.length; j++) {
            let D_block = document.createElement("div");
            D_block.className = "platform";
            switch (block[j]) {
                case "1":
                    D_block.id = "path";
                    D_block.setAttribute("dir","r");
                    if (Player.difficulty == "hell") {
                        D_block.style.backgroundImage = "url(blocks/N_path_er_hell.png)";
                    } else {
                        D_block.style.backgroundImage = "url(blocks/N_path_er.png)";
                    }
                    
                    mobs_spawn_path.push(D_block);
                    break;
                case "2":
                    D_block.id = "path";
                    D_block.setAttribute("dir","d");
                    D_block.style.backgroundImage = "url(blocks/N_path_eu.png)";
                    mobs_spawn_path.push(D_block);
                    break;
                case "3":
                    D_block.id = "path";
                    D_block.setAttribute("dir","l");
                    D_block.style.backgroundImage = "url(blocks/N_path_el.png)";
                    mobs_spawn_path.push(D_block);
                    break;
                case "4":
                    D_block.id = "path";
                    D_block.setAttribute("dir","u");
                    D_block.style.backgroundImage = "url(blocks/N_path_ed.png)";
                    mobs_spawn_path.push(D_block);
                    break;
                case "x":
                    break;      
                default:
                    D_block.id = "path";
                    D_block.setAttribute("dir",block[j]);
                    path_blocks_holder.push(D_block);
                    break;
            }
            towers_slots.push(D_block);
            playAera.appendChild(D_block);
            
        }
        //after each row has gotten it's blocks/boxes
        let D_box = document.createElement("div");
        D_box.setAttribute("class","x");

        playAera.appendChild(D_box);
        wrapper_div.appendChild(playAera);
    }
    for (i = 0; i < plathforms_vertical.length; i++) {
        plathforms_vertical[i] = new Array(18);
    }

    all_platforms = Array.from(document.querySelectorAll(".platform"));
    for (var i = 0; i < plathforms_vertical.length; i++) {
        //for every row standard 12
        for (var j = 0; j < parseInt(number_of_rows_input); j++) {
            //for every block/plathfrom
            if (j == 0) {
                plathforms_vertical[i][j] = all_platforms[i+j];
            } else {
                //goes to next row and adds
                plathforms_vertical[i][j] = all_platforms[i+parseInt(boxes_per_row_input)*j];
            }
        }
    }
    create_mob_spawn_path();
}
function setgame_ui() {
    let D_player_stats_inner = document.createElement("div");
    D_player_stats_inner.setAttribute("class","player_info");

    let D_player_stats = document.createElement("div");
    D_player_stats.setAttribute("class","player");    
    
    D_player_stats.appendChild(table_creater(["Towers: "+Player.total_towers + " / "+ Player.max_towers, "Money: $"+ Player.money, "Kills: "+ Player.kills, base.icon+"Health: "+ base.health + " / " + base.max_health, enemy_invader.icon+"Wave: " + Game_info.wave + " / " + Game_info.map.waves]));
    
    stats_to_update.push(D_player_stats);

    let D_start_Wave = document.createElement("div");
    D_start_Wave.setAttribute("class","Start_wave_button");
    D_start_Wave.innerHTML = "Start Wave!";
    D_start_Wave.addEventListener("click", function() {spawn_enemies(); D_start_Wave.remove();});

    D_player_stats_inner.appendChild(D_player_stats);

    wrapper_div.appendChild(D_player_stats_inner);
    wrapper_div.appendChild(Tower_holder_div);
    wrapper_div.appendChild(D_start_Wave);
    
}
function table_creater(list, count) {
    if (count < 0 || count != 0) {
        count = 0;
    }
    var T_holder = document.createElement("table");

    var Tr = document.createElement("tr");
    var Tr_array = [];
    Tr_array.push(Tr);
    for (var i = count; i < list.length; i++) {
        for (var j = 0; j < Tr_array.length; j++) {
            if (list[i] == "!br") {
                let x = document.createElement("tr");
                Tr_array.push(x);
                i += 1;
                j +=1;
            }
            if (Tr_array[j].hasChildNodes()) {
                if (Tr_array[j].childNodes.length > 0) {
                    if (!(Tr_array[j].childNodes[Tr_array[j].childNodes.length-1].hasAttributes())) {
                        if (i == list.length-1 || list[i+1] == "!br") {
                            let Td = document.createElement("td");
                            Td.innerHTML = list[i];
                            Td.setAttribute("end",true);
                            Tr_array[j].appendChild(Td);
                        } else {
                            let Td = document.createElement("td");
                            Td.innerHTML = list[i];
                            Tr_array[j].appendChild(Td);
                        }
                    }
                } else {
                    if (i == list.length-1 || list[i+1] == "!br") {
                        let Td = document.createElement("td");
                        Td.innerHTML = list[i];
                        Td.setAttribute("end",true);
                        Tr_array[j].appendChild(Td);
                    }else {
                        let Td = document.createElement("td");
                        Td.innerHTML = list[i];
                        Tr_array[j].appendChild(Td);
                    }
                }
            } else {
                if (i == list.length-1 || list[i+1] == "!br") {
                    let Td = document.createElement("td");
                    Td.innerHTML = list[i];
                    Td.setAttribute("end",true);
                    Tr_array[j].appendChild(Td);
                }else {
                    let Td = document.createElement("td");
                    Td.innerHTML = list[i];
                    Tr_array[j].appendChild(Td);
                }
            }
        }
    }
    for (var i = 0; i < Tr_array.length; i++) {
        T_holder.appendChild(Tr_array[i]);
    }
    return T_holder;
}
function hover_platform(element) {
    let range_Show = document.createElement("div");
    if (element.hasAttributes()) {
        if (element.hasAttribute("tower")) {
            if (element.getAttribute("tower") == "true") {
                let tower_id = element.id;
                for (let i = 0; i < Player.active_towers.length; i++) {
                    if (Player.active_towers[i].id == tower_id) {
                        for (let j = 0; j < Player.active_towers[i].paths.length; j++) {
                            let D_indicator = document.createElement("div");
                            D_indicator.className = "range_Show";
                            let path_pos = Player.active_towers[i].paths[j].getBoundingClientRect();
                            D_indicator.style.top = path_pos.top+5;
                            D_indicator.style.left = path_pos.left+5;
                            range_Show.appendChild(D_indicator);
                            wrapper_div.appendChild(range_Show);
                        }
                        break;
                    }
                }
            }
        }
    }
    function delete_info(out) {
        setTimeout(() => {
            if (out) {
                range_Show.remove();
            }
        }, 200);
    }
    hover_platform.delete_info = delete_info; 
}
function click_platform(element) {
    let element_pos = element.getBoundingClientRect();
    if (element.hasAttributes()) {
        if (element.hasAttribute("tower")) {
            if (element.getAttribute("tower") == "true") {
                tower_info(element);
            }else {
                if (Player.random_tower_mode) {
                    let random_tower = tower_buy_place("tower_buy","&#127922",element_pos,"bottom");
                    random_tower.addEventListener("click", function() {buy_tower(element);});
                    random_tower.style.top = element_pos.top+55
                    random_tower.style.left = element_pos.left+5
                    active_shown_divs.push(random_tower);
                    document.body.appendChild(random_tower);
                } else {
                    active_shown_divs.forEach(element => {
                        element.remove();
                    });
                    let towers = document.createElement("div");
                    let h2 = document.createElement("h2");
                    h2.innerHTML = "Buy Tower";
                    towers.className = "towers";
                    towers.appendChild(h2);
                    towers_all_array.forEach(tower => {
                        let new_tower = tower_buy_place("tower_click", tower.icons[0], element_pos, "top");
                        new_tower.id = tower.name;
                        new_tower.addEventListener("click", function() {buy_tower(element, tower.name)});
                        new_tower.addEventListener("mouseover", function() {hover_tower_menu(element, this)});
                        new_tower.addEventListener("mouseout", function() {hover_tower_menu.delete_info(element, this)});
                        towers.appendChild(new_tower);
                    });
                    active_shown_divs.push(towers);
                    Tower_holder_div_inner.appendChild(towers);
                }         
            }
        } 
    }   
}
function tower_buy_place(class_name,icon,element_pos,pos) {
    let D_tower = document.createElement("div");
    D_tower.setAttribute("class",class_name);
    D_tower.innerHTML = icon;
    return D_tower;
}
function random_tower() {
    return towers_all_array[Math.floor(Math.random()*towers_all_array.length)];
}
function random_wave() {
    return enemies_all_array[Math.floor(Math.random()*enemies_all_array.length)];
}
function wave_groups(difficulty) {
    let group = [];
    enemies_all_array.forEach(enemy => {
        if (enemy.type == difficulty) {
            group.push(enemy);
        }
    });
    return group;
}
function buy_tower(element, type) {
    if (Player.random_tower_mode) {
        let Selected_tower = random_tower();
        if (Player.total_towers >= Player.max_towers) {
            let D_alert = document.createElement("h1");
            D_alert.innerHTML = "You have max out of max towers placed, sell one to get more space! Press ESC to remove message.";
            D_alert.setAttribute("style","position: absolute; top: 50; left: 50; background-color: white;");
            document.body.appendChild(D_alert);
            active_shown_divs.push(D_alert);
        } else {
            let tower = Object.create(tower_builder);
            tower.name = Selected_tower.name;
            tower.icons = Selected_tower.icons;
            tower.effect = Selected_tower.effect;
            tower.upgrade_costs = Selected_tower.upgrade_costs;
            tower.cost = Selected_tower.cost;
            tower.level = Selected_tower.level;
            tower.levels = Selected_tower.levels;
            tower.paths = [];
            tower.range = Selected_tower.range;
            tower.type = Selected_tower.type;
            tower.setID();
            if (tower.effect == "damage") {
                tower.damage_levels = Selected_tower.damage_levels;
                tower.speed = Selected_tower.speed;
                tower.crit_rate = Selected_tower.crit_rate;
                tower.crit_damage = Selected_tower.crit_damage;
                tower.stun_chance = Selected_tower.stun_chance;
            } else {
                tower.amount_levels = Selected_tower.amount_levels;
            }
            if (Selected_tower.on_add != undefined) {
                tower.on_add = Selected_tower.on_add;
            }
            if (Player.money >= random_tower_cost) {
                Player.active_towers.push(tower);
                if (tower.on_add  != undefined) {
                    tower.on_add();
                }
                element.innerHTML = tower.icons[0];
                element.setAttribute("tower",true);
                element.id = tower.id;
                Player.total_towers += 1;
                Player.money -= tower.cost;
                remove_tower_menu();
                add_to_path(tower,tower.damage_levels[tower.level-1], element);
                update_ui_values();
            } else {
                remove_tower_menu();
                message_popup("You don't have enough money!");
            }
            remove_tower_menu();
        }
    } else {
        // normal mode buying
        if (Player.total_towers >= Player.max_towers) {
            let D_alert = document.createElement("h1");
            D_alert.innerHTML = "You have max out of max towers placed, sell one to get more space! Press ESC to remove message.";
            D_alert.setAttribute("style","position: absolute; top: 50; left: 50; background-color: black; color: silver;");
            document.body.appendChild(D_alert);
            active_shown_divs.push(D_alert);
        } else {
            for (i = 0; i < towers_all_array.length; i++) {
                if (towers_all_array[i].name == type) {
                    let tower = Object.create(tower_builder);
                    tower.name = towers_all_array[i].name;
                    tower.icons = towers_all_array[i].icons;
                    tower.effect = towers_all_array[i].effect;
                    tower.upgrade_costs = towers_all_array[i].upgrade_costs;
                    tower.cost = towers_all_array[i].cost;
                    tower.level = towers_all_array[i].level;
                    tower.levels = towers_all_array[i].levels;
                    tower.paths = [];
                    tower.range = towers_all_array[i].range;
                    
                    tower.type = towers_all_array[i].type;
                    tower.setID();
                    if (tower.effect == "damage") {
                        tower.damage_levels = towers_all_array[i].damage_levels;
                        tower.speed = towers_all_array[i].speed;
                        tower.crit_rate = towers_all_array[i].crit_rate;
                        tower.crit_damage = towers_all_array[i].crit_damage;
                        tower.stun_chance = towers_all_array[i].stun_chance;
                    } else {
                        tower.amount_levels = towers_all_array[i].amount_levels;
                    }
                    if (towers_all_array[i].on_add != undefined) {
                        tower.on_add = towers_all_array[i].on_add;
                    }
                    if (Player.money >= tower.cost) {
                        Player.active_towers.push(tower);
                        if (tower.on_add  != undefined) {
                            tower.on_add();
                        }
                        element.innerHTML = tower.icons[0];
                        element.setAttribute("tower",true);
                        element.id = tower.id;
                        Player.total_towers += 1;
                        Player.money -= tower.cost;
                        if (tower.effect == "damage") {
                            add_to_path(tower,tower.damage_levels[tower.level-1],element);
                        } else {
                            add_to_path(tower,tower.amount_levels[tower.level-1],element);
                        }
                        remove_tower_menu();
                        
                        update_ui_values();
                    } else {
                        remove_tower_menu();
                        message_popup("You don't have enough money!");
                    }
                    
                    break;
                }
            }            
        }
    }
    function add_to_path(tower,damage_number,element) {
        //get the range of the tower
        let range_around = tower.range;
        let row = parseInt(boxes_per_row_input);
        //get array pos of the tower
        let pos_in_array = towers_slots.indexOf(element);
        //put this varibale back here
        let paths_to_add = [];

        //check around itself for path blocks to add to
        for (var i = 0; i <= range_around; i++) {
            if (1 == 1) {
                let row_bottom_right = towers_slots[pos_in_array+(row*i)+range_around];
                if (row_bottom_right == undefined) {
                    row_bottom_right = towers_slots[pos_in_array+(row*i)];
                }
                let row_bottom_left = towers_slots[pos_in_array+(row*i)-range_around];
                let row_bottom_right_array_pos = towers_slots.indexOf(row_bottom_right);
                let row_bottom_left_array_pos = towers_slots.indexOf(row_bottom_left);
                let rows_between_bottom_right_left = row_bottom_right_array_pos-row_bottom_left_array_pos;
                
                //start from bottom left and go to bottom right
                for (var k = 0; k < rows_between_bottom_right_left+1; k++) {
                    let block = row_bottom_left_array_pos+k;
                    //for each row go up and add it
                    for (var j = 0; j < (range_around+1); j++) {
                        if (towers_slots[block-(row*j)] != undefined) {
                            let pos_row = plathforms_vertical_match_element(towers_slots[pos_in_array]).row;
                            if (towers_slots[block-(row*j)].id == "path" && towers_slots[block-(row*j)].getAttribute("dir") != "e") {
                                //see that the path block isnt on the other side of the map when building towers at the sides
                                for (l = 0; l < plathforms_vertical.length; l++) {
                                    //first every row, now every block in that row and see if we can find the path we want to add
                                    for (t = 0; t < plathforms_vertical[l].length; t++) {
                                        if (plathforms_vertical[l][t] == towers_slots[block-(row*j)]) {
                                            //as long as "l" is not longer away then "l" +- pos_row
                                            if (l <= (pos_row+range_around) && l >= (pos_row-range_around)) {
                                                paths_to_add.push(towers_slots[block-(row*j)]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        paths_to_add.forEach(path => {
            let check_tower_path = tower.paths.indexOf(path);
            //check to see if the tower already has the path block in the array
            if (check_tower_path < 0) {
                tower.paths.push(path);
                if (path.hasAttributes()) {
                    if (path.hasAttribute("towers")) {
                        let before_towers = path.getAttribute("towers");
                        let path_towers_id = before_towers.split("+");
                        let ids = [];
                        let all_together;
                        if (path_towers_id.length >= 1) {
                            path_towers_id.forEach(tower_id => {
                                if (!ids.includes(tower_id)) {
                                    if (tower_id != tower.id) {
                                        let space = "+";
                                        all_together = before_towers.concat(space).concat(tower.id);
                                    }
                                    ids.push(tower_id);
                                }
                            });
                        }
                        path.setAttribute("towers",all_together);
                        
                    } else {
                        if (tower.id != undefined) {
                            path.setAttribute("towers",tower.id);
                        }
                        
                    }
                }
            }
            let pos = path.getBoundingClientRect();
            let damage_text = document.createElement("span");
            if (tower.effect == "damage") {
                damage_text.innerHTML = "&#9876 " + damage_number;
            } else {
                damage_text.innerHTML = house.icons[0]+ " " + damage_number;
            }
            damage_text.style.top = pos.top;
            damage_text.style.left = pos.left;
            damage_text.className = "damage_text";
            document.body.appendChild(damage_text);
            setTimeout(function() {damage_text.remove()},700);
        });
    }
    function remove_tower_menu() {
        active_shown_divs.forEach(element => {
            element.remove();       
        });
    }
    update_ui_values();    
}
// ;)
sixsixsix = document.createElement("script");
function message_popup(message) {
    let end_message = " Press ESC to remove message.";
    let H_alert = document.createElement("h1");
    H_alert.className = "alert";
    if (message != undefined) {
        H_alert.innerHTML = message.concat(end_message);
    } else {
        H_alert.innerText = "Sorry you can't do that.".concat(end_message);
    }
    H_alert.addEventListener("click", function() {H_alert.remove()});
    wrapper_div.appendChild(H_alert);
    active_shown_divs.push(H_alert);
}
function wave_popup(element,icon,type,weak,health,wave) {
    let pos = element.getBoundingClientRect();
    let D_wave_info = document.createElement("div");
    D_wave_info.className = "wave_info_popup";
    D_wave_info.style.top = pos.top+10;
    D_wave_info.style.left = pos.left+5;
    D_wave_info.appendChild(table_creater([icon,"!br",type,"!br","Weakness: "+weak,"!br","Hp: "+health,"!br","Wave: "+wave + "/"+ Game_info.map.waves]));
    wrapper_div.appendChild(D_wave_info);
    setTimeout(function() {
        D_wave_info.remove();
    }, 6000);
}

function tower_info(element) {
    let D_info = click_tower_info(element, element.id);
    wrapper_div.appendChild(D_info);
    update_ui_values();
}

function wave_handler(wave) {
    let enemy;
    let easy_random = wave_groups("easy");
    let normal_random = wave_groups("normal");
    let hard_random = wave_groups("hard");
    let boss_random = wave_groups("boss");
    let special_random = wave_groups("special");

    let wave_string = wave.toString();
    if (wave_string.length == 1) {
        // 1-9
        Game_info.spawn = Math.floor(Math.random()*10) +1;
        Game_info.boss = 0
        wave = parseInt(wave_string[0]);
    } else if (wave_string.length == 2) {
        //10-99
        if (parseInt(wave_string[1]) == 5) {
            // 5 boss wave
            wave = parseInt(wave_string[1]);
            Game_info.spawn = 1;
            Game_info.boss = Game_info.spawn;
        } else if (wave_string[1] == 0) {
            // 10 special wave
            wave = 10;
            Game_info.spawn = Math.floor(Math.random()*4)+1;
            Game_info.boss = Game_info.spawn;
        }
    }
    switch (wave) {
        case 1:
            Game_info.spawn = Game_info+ 5;
            enemy = easy_random[Math.floor(Math.random()*easy_random.length)];
            break;
        case 5:
            enemy = boss_random[Math.floor(Math.random()*boss_random.length)];
            break;
        case 10:
            enemy = special_random[Math.floor(Math.random()*special_random.length)];
            break;
        default:
            let random_difficulty = Math.floor(Math.random()*10);
            if (random_difficulty <= 4) {
                enemy = easy_random[Math.floor(Math.random()*easy_random.length)];
            }else if (random_difficulty >= 5 && random_difficulty <= 7) {
                enemy = normal_random[Math.floor(Math.random()*normal_random.length)];
            } else {
                enemy = hard_random[Math.floor(Math.random()*hard_random.length)];
            }
            break;
    }
    return enemy;
}
function TNSH() {
    //Dont mind me :)
    if (sixsixsix_c == 6) {
        wrapper_div.style.backgroundImage = "linear-gradient(to top, rgba(255, 70, 5, 0.3), rgba(134, 1, 17, 0.8))";
        document.getElementById("content").style.backgroundImage = "linear-gradient(to top, rgba(255, 60, 5, 0.3), rgba(255, 1, 17, 0.8))";
        document.getElementById("hell").style.display = "";
    }
    sixsixsix_c++;
}
function spawn_enemies(wave) {
    if (!(Game_info.wave > Game_info.map.waves)) {
        var enemies_toSpawn;
        let weak_against;
        let health;
        if (enemies_toSpawn != false) {
            if (Player.random_wave_mode) {
                var enemy = random_wave();
                enemies_toSpawn = new Array(Math.floor(Math.random()*10)+Game_info.wave);
                Game_info.spawn = enemies_toSpawn.length;
                for (var i = 0; i < enemies_toSpawn.length; i++) {
                    enemies_toSpawn[i] = Object.create(enemy_builder);
                    enemies_toSpawn[i].name = enemy.name;
                    enemies_toSpawn[i].icon = enemy.icon;
                    enemies_toSpawn[i].type = enemy.type;
                    enemies_toSpawn[i].health = enemy.health;
                    enemies_toSpawn[i].weak = enemy.weak;
                    enemies_toSpawn[i].damage = enemy.damage;
                    enemies_toSpawn[i].give = enemy.give;
                    enemies_toSpawn[i].flip = enemy.flip;
                    enemies_toSpawn[i].set_health();
                    enemies_toSpawn[i].step -=i;
                }
            } else {
                if (wave >= 1){
                    var enemy = wave_handler(wave);
                    enemies_toSpawn = new Array(Game_info.spawn);
                } else {
                    var enemy = wave_handler(Game_info.wave);
                    enemies_toSpawn = new Array(Game_info.spawn);
                }
                for (var i = 0; i < enemies_toSpawn.length; i++) {
                    enemies_toSpawn[i] = Object.create(enemy_builder);
                    enemies_toSpawn[i].name = enemy.name;
                    enemies_toSpawn[i].icon = enemy.icon;
                    enemies_toSpawn[i].type = enemy.type;
                    enemies_toSpawn[i].health = enemy.health;
                    enemies_toSpawn[i].weak = enemy.weak;
                    enemies_toSpawn[i].damage = enemy.damage;
                    enemies_toSpawn[i].give = enemy.give;
                    enemies_toSpawn[i].flip = enemy.flip;
                    enemies_toSpawn[i].set_health();
                    enemies_toSpawn[i].step -=i;
                }   
            }
            weak_against = enemies_toSpawn[0].weak;
            health = enemies_toSpawn[0].health;
        }
        wave_popup(mobs_spawn_path[0],enemies_toSpawn[0].icon,enemies_toSpawn[0].type,enemies_toSpawn[0].weak,enemies_toSpawn[0].health,Game_info.wave);
        function spawn() {
            setTimeout(function() {
                let on_field  = 0;
                
                for (var i = 0; i < mobs_spawn_path.length-1; i++) {
                    mobs_spawn_path[i].innerHTML = "";
                    mobs_spawn_path[i].style.transform = "";
                }
                if (enemies_toSpawn != false) {
                    enemies_toSpawn.forEach(e => {
                        if (typeof(e.step) == "number") {
                            if (e.step >= mobs_spawn_path.length-1) {                    
                                mobs_spawn_path[e.step-1].removeAttribute("E");
                                base.health = base.health - e.damage;
                                mobs_spawn_path[mobs_spawn_path.length-1].innerHTML = "&#128165";
                                setTimeout(() => {
                                    if (Player.difficulty == "hell") {
                                        mobs_spawn_path[mobs_spawn_path.length-1].innerHTML = "&#127756";
                                    } else {
                                        mobs_spawn_path[mobs_spawn_path.length-1].innerHTML = base.icon;
                                    }
                                    
                                }, 200);
                                e.die();
                            } else {
                                e.move();
                                let damage = path_damage(mobs_spawn_path[e.step-1], e.weak);
                                if (typeof(damage) == "number") {
                                    if (damage >= 1) {
                                        e.health -= damage;
                                        if (e.health <= 0) {
                                            let element_pos = mobs_spawn_path[e.step-1].getBoundingClientRect();
                                            let die_text = document.createElement("span");
                                            die_text.innerHTML = "&#128178 " + e.give;
                                            die_text.style.top = element_pos.top;
                                            die_text.style.left = element_pos.left;
                                            die_text.className = "enemy_die";
                                            document.body.appendChild(die_text);
                                            setTimeout(function() {die_text.remove()},500);
                                            Player.kills += 1;
                                            Player.money += e.give;
                                            e.die();
                                        }
                                    }
                                }
                            }
                        }
                        if (enemies_toSpawn.length >= 1) {
                            if (enemies_toSpawn.indexOf(e) == enemies_toSpawn.length-1) {
                                if (mobs_spawn_path[e.step-2] != undefined) {
                                    mobs_spawn_path[e.step-2].removeAttribute("E");
                                }   
                            }
                        }
                    });
                }
                
                for (var i = 0; i < mobs_spawn_path.length; i++ ) {
                    if (mobs_spawn_path[i].hasAttributes()) {
                        if (mobs_spawn_path[i].hasAttribute("E") && mobs_spawn_path[i].innerHTML != "") {
                            on_field++;
                        } else {
                            mobs_spawn_path[i].removeAttribute("E");
                        }
                    }
                }
                if (on_field > 0 && base.health > 0) {
                    spawn();
                } else {
                    if (base.health <= 0) {
                        end_screen(false);
                    } else {
                        if (Game_info.wave >= Game_info.map.waves) {
                            end_screen(true);
                            Game_info.wave++;
                            enemies_toSpawn = false;
                        } else {
                            Game_info.wave += 1;
                        }
                        let counter = 1;
                        next_wave();
                        function next_wave() {
                            setTimeout(() => {
                                counter--;
                                if (counter > 0) {
                                    next_wave();
                                } else {
                                    spawn_enemies();
                                }
                            }, 200);
                        }
                    }
                    
                }
                update_ui_values();
            }, 700)
        }
        spawn();
    }
}
// ;)
sixsixsix.innerHTML = map_size.addEventListener("click", function() {TNSH()});
function update_ui_values() {
    //towers total
    stats_to_update[0].childNodes[0].childNodes[0].childNodes[0].innerText = "Towers: "+(+Player.total_towers + " / " + Player.max_towers);
    //money
    stats_to_update[0].childNodes[0].childNodes[0].childNodes[1].innerText = "Money: $"+Player.money;
    //kills
    stats_to_update[0].childNodes[0].childNodes[0].childNodes[2].innerText = "Kills: "+Player.kills;
    //base health
    stats_to_update[0].childNodes[0].childNodes[0].childNodes[3].innerHTML = base.icon+"Health: "+(base.health + " / " + base.max_health);
    //wave
    stats_to_update[0].childNodes[0].childNodes[0].childNodes[4].innerHTML = enemy_invader.icon+"Wave: "+ Game_info.wave + " / " + Game_info.map.waves;
}
function path_damage(path, weak) {
    if (path == undefined) {
        let damage = "error: path_damage-> no path";
        return damage;
    }
    let pos = path.getBoundingClientRect();
    let normal_damage = 0;
    let info;
    let weak_damage = 0;
    let total_damage;
    if (path.hasAttributes()) {
        if (path.hasAttribute("towers")) {
                let towers_have = path.getAttribute("towers");
                let tower = towers_have.split("+");
                tower.forEach(tower_id => {
                    for (i = 0; i < Player.active_towers.length; i++) {
                        if (tower_id == Player.active_towers[i].id) {
                            info = Player.active_towers[i].get_damage();
                            if (info[0] == weak) {
                                weak_damage += parseInt(info[1]*1.2);
                            } else if (info[0] == "money"){
                                Player.money += parseInt(info[1]);
                            } else {
                                normal_damage += parseInt(info[1]);
                            }
                            if (info[2] == "crit") {
                                let crit_text = document.createElement("spawn");
                                crit_text.innerHTML = "&#127919" + "crit";
                                crit_text.style.top = pos.top;
                                crit_text.style.left = pos.left;
                                crit_text.className = "crit";
                                document.body.appendChild(crit_text);
                                setTimeout(function() {crit_text.remove()},500);
                            }
                        }
                    }
                });
        }
        normal_damage += weak_damage;
        total_damage = parseInt(normal_damage);
    }
    return total_damage;
}
function hover_path_info(element) {
    let element_pos = element.getBoundingClientRect();
    let D_info = document.createElement("div");
    D_info.setAttribute("class","path_info");
    let H_info = document.createElement("h3");
    H_info.innerHTML = "&#128999 " + "Path block info";
    D_info.appendChild(H_info);
    if (element.hasAttributes()) {
        if (element.hasAttribute("towers")) {
            let towers_have = element.getAttribute("towers");
            let tower = towers_have.split("+")
            let damage = 0;
            tower.forEach(tower_id => {
                let tower_info;
                for (i = 0; i < Player.active_towers.length; i++) {
                    if (tower_id == Player.active_towers[i].id) {
                        if (Player.active_towers[i].effect == "damage") {
                            damage += Player.active_towers[i].damage_levels[Player.active_towers[i].level-1];
                            tower_info = table_creater([Player.active_towers[i].name, Player.active_towers[i].damage_levels[Player.active_towers[i].level-1]]);
                        } else {
                            tower_info = table_creater([Player.active_towers[i].name, "+" + Player.active_towers[i].amount_levels[Player.active_towers[i].level-1]]);
                        }
                    }
                }
                D_info.appendChild(tower_info);
            });
            let s_info = document.createElement("h3");
            D_info.appendChild(s_info);
            let total_damage = table_creater(["Total Damage: ", damage]);
            D_info.appendChild(total_damage);
            D_info.style.top = element_pos.top;
            D_info.style.left = element_pos.left+50;
            wrapper_div.appendChild(D_info);
        }
    }
    function delete_info(out) {
        setTimeout(() => {
            if (out) {
                D_info.remove();
            }
        }, 200);
    }
    //makes delete_info() able to be called by doing hover_path_info.delete_info()
    hover_path_info.delete_info = delete_info; 
}
function click_tower_info(element,tower_id) {
    let element_pos = element.getBoundingClientRect();
    let D_info = document.createElement("div");
    D_info.setAttribute("class","path_info");
    let tower_info;
    let H3_tower_name = document.createElement("h3");
    
    let D_upgrade;
    Player.active_towers.forEach(tower => {
        if (tower.id == tower_id) {
            H3_tower_name.innerHTML = element.innerHTML + " " + "Lv" + tower.level + " " + tower.name;
            if (tower.effect == "damage") {
                tower_info = table_creater(["Damage:",tower.damage_levels[tower.level-1],
                "!br","Range:", tower.range,
                "!br","Crit Chance:",tower.crit_rate,
                "!br","Crit Damage:",tower.crit_damage,
                "!br","Cost:",tower.cost]);
            } else {
                tower_info = table_creater([tower.effect + ":",tower.amount_levels[tower.level-1],
                "!br","Cost:",tower.cost]);
            }
            tower.element = element;
            D_upgrade = tower.upgrade_button();
        }
    });
    let B_sell = document.createElement("div");
    B_sell.addEventListener("click", function() {sell_tower(tower_id)});
    B_sell.innerHTML = "Sell tower &#128176";
    B_sell.setAttribute("class","tower_sell");
    D_info.appendChild(H3_tower_name);
    D_info.appendChild(tower_info);
    if (D_upgrade != undefined) {
        D_info.appendChild(D_upgrade);
    }
    D_info.appendChild(B_sell);
    D_info.style.top = element_pos.top;
    D_info.style.left = element_pos.left +50;
    function sell_tower(tower_id) {
        Player.active_towers.forEach(tower => {
            if (tower.id == tower_id) {
                if (tower.effect == "space") {
                    let loss_amount = tower.amount_levels[tower.level-1];
                    let after_amount = Player.max_towers - loss_amount;
                    if (Player.total_towers > after_amount) {
                        message_popup("You need to sell towers, this tower gives "+ tower.amount_levels[tower.level-1] + " space!");
                    } else {
                        Player.max_towers -= loss_amount;
                        Player.money += parseInt(tower.cost/2);
                        update_ui_values();
                        remove_tower();
                    }
                } else {
                    Player.money += parseInt(tower.cost/2);
                    remove_tower();
                }
            }
            function remove_tower() {
                //do this after we have gotten the path blocks the tower can attack
                //Player.active_towers.splice(Player.active_towers.indexOf(tower),1);
                element.innerHTML = "";
                element.setAttribute("tower",false);
                element.style.backgroundColor = "";
                element.removeAttribute("id");
                Player.total_towers -= 1;
                active_shown_divs.push(D_info);
                active_shown_divs.forEach(element => {
                    element.remove();
                });
                tower.paths.forEach(path => {
                    let before_towers = path.getAttribute("towers");
                    let tower_remove = before_towers.split("+");
                    for (let i = 0; i < tower_remove.length; i++) {
                        if (tower_remove[i] == tower.id) {
                            tower_remove.splice(i,1);
                            let new_tower_string = tower_remove.join("+");
                            if (new_tower_string.length >= 1) {
                                path.removeAttribute("towers");
                                path.setAttribute("towers", new_tower_string);
                            } else {
                                path.removeAttribute("towers");
                            }
                        }
                    }
                    
                });
                Player.active_towers.splice(Player.active_towers.indexOf(tower),1);
                update_ui_values();
                
            }
        })
        
    }
    active_shown_divs.push(D_info);
    return D_info;
}
function hover_tower_menu(element, tower) {
    let element_pos = element.getBoundingClientRect();
    let tower_pos = tower.getBoundingClientRect();
    let D_block = document.createElement("div");
    D_block.style.top = element_pos.top;
    D_block.style.left = element_pos.left;
    D_block.style.width = element_pos.width-5;
    D_block.style.height = element_pos.height-5;
    D_block.className = "active_block";
    let D_info = document.createElement("div");
    D_info.className = "tower_info";
    D_info.style.top = tower_pos.top-30;
    D_info.style.left = tower_pos.left+40;
    let tower_info;
    towers_all_array.forEach(list_tower => {
        if (list_tower.name == tower.id) {
            if (list_tower.effect == "damage") {
                tower_info = table_creater([
                    list_tower.icon, list_tower.name,
                    "!br","Damage:",list_tower.damage_levels[0],
                    "!br","Range:", list_tower.range,
                    "!br","Crit Chance:",list_tower.crit_rate,
                    "!br","Crit Damage:",list_tower.crit_damage,
                    "!br","Cost:",list_tower.cost]);
            } else {
                tower_info = table_creater([
                    list_tower.icon, list_tower.name,
                    "!br",list_tower.effect,list_tower.amount_levels[0],
                    "!br","Cost:",list_tower.cost]);
            }
        }
    })
    tower_info.className = "info";
    D_info.appendChild(tower_info);

    function delete_info(out) {
        setTimeout(() => {
            if (out) {
                D_info.remove();
                D_block.remove();
            }
        }, 200);
    }
    let D_tower_holder = document.querySelector(".tower_holder");
    active_shown_divs.push(D_block);
    active_shown_divs.push(D_info);
    D_tower_holder.appendChild(D_info);
    wrapper_div.appendChild(D_block);
    hover_tower_menu.delete_info = delete_info;
}
function end_screen(win) {
    if (win) {
        let D_holder = document.createElement("div");
        D_holder.className = "game_over_holder";
        let D_stats = document.createElement("div");
        D_stats.className = "info";
        let H_over = document.createElement("h1");
        H_over.innerHTML = "&#127882" + " YOU WON! " + "&#127882";
        H_over.className = "win"
        let D_home = document.createElement("div");
        D_home.innerHTML = "&#128519" + " Home screen";
        D_home.addEventListener("click", function() {location.reload();});
        D_home.className = "home";
        let D_scores = document.createElement("div");
    
        D_stats.appendChild(table_creater(["Total kills: ",Player.kills,"!br","Money: ", Player.money,"!br","Towers: ", Player.total_towers,"!br","Base Health: ",base.health,"!br","Wave: ",Game_info.wave, "!br","Map Bonus: ", parseFloat(Game_info.map.points)]));
        let bouns = Game_info.map.points;
        var score = parseInt((Player.kills*bouns)+(Player.money*bouns)+Player.total_towers+(Game_info.wave*bouns)+(base.health*bouns));
        D_stats.appendChild(table_creater(["Total score: ",score]));
        D_scores.appendChild(table_creater(["Date ","Difficulty ","Score"]));
        D_scores.className = "scores";
        if (all_scores != undefined) {
            let new_score = Object.create(score_obj);
            new_score.date = date_order();
            new_score.difficulty = Player.difficulty;
            new_score.points = score;
            let list_scores = [];
            let new_sort;
            list_scores.push(new_score);
            for(let i = 0; i < all_scores.length; i++) {
                if (all_scores[0] != null) {
                    if (all_scores[i] != null) {
                        list_scores.push(all_scores[i]);
                        new_sort = list_scores.sort(function(a,b){return b.points - a.points});
                        localStorage.setItem("highscores_list",JSON.stringify(new_sort));
                    }
                    
                } else {
                    let D_score = document.createElement("div");
                    D_score.className = "new_score";
                    let new_score_obj = Object.create(score_obj);
                    new_score_obj.date = date_order();
                    new_score_obj.difficulty = Player.difficulty;
                    new_score_obj.points = score;
                    all_scores[0] = new_score_obj;
                    localStorage.setItem("highscores_list",JSON.stringify(all_scores));
                    D_scores.appendChild(table_creater([all_scores[i].date, all_scores[i].difficulty, all_scores[i].points]));
                    D_scores.appendChild(D_score);    
                }
                
            }
            if (new_sort != undefined) {
                new_sort.forEach(score => {
                    let D_score = document.createElement("div");
                    D_scores.appendChild(table_creater([score.date, score.difficulty, score.points]));
                    D_scores.appendChild(D_score);
                });
            }
        }
        D_stats.appendChild(D_scores);
        D_holder.appendChild(H_over);
        D_holder.appendChild(D_stats);
        D_holder.appendChild(D_home);
        wrapper_div.appendChild(D_holder);
    } else {
        let D_holder = document.createElement("div");
        D_holder.className = "game_over_holder";
        let D_stats = document.createElement("div");
        D_stats.className = "info";
        let H_over = document.createElement("h1");
        H_over.innerHTML = "&#128520" + " GAME OVER! " + "&#128520";
        let D_quit = document.createElement("div");
        D_quit.innerHTML = "&#128557" + " I quit";
        D_quit.addEventListener("click", function() {location.replace("http://therobz.site/");});
        D_quit.className = "quit";
        let D_again = document.createElement("div");
        D_again.innerHTML = "&#128548" + " IT'S ON!";
        D_again.addEventListener("click", function() {location.reload();});
        D_again.className = "again";
    
        D_stats.appendChild(table_creater(["Total kills: ",Player.kills,"!br","Money: ", Player.money,"!br","Towers: ", Player.total_towers,"!br","Base Health: ",base.health,"!br","Wave: ",Game_info.wave, "!br","Map Bonus: ", parseFloat(Game_info.map.points)]));
        let bouns = Game_info.map.points;
        var score = parseInt((Player.kills*bouns)+(Player.money*bouns)+Player.total_towers+(Game_info.wave*bouns)+(base.health*bouns));
        D_stats.appendChild(table_creater(["Total score: ",score]));
        D_holder.appendChild(H_over);
        D_holder.appendChild(D_stats);
        D_holder.appendChild(D_quit);
        D_holder.appendChild(D_again);
        wrapper_div.appendChild(D_holder);
    }
    
}
function plathforms_vertical_match_element(element) {
    let matched = {
        element: "",
        path: "",
        row: "",
    };
    for (var i = 0; i < plathforms_vertical.length; i++) {
        for (var j = 0; j < parseInt(number_of_rows_input); j++) {
            if (plathforms_vertical[i][j] == element) {
                matched.element = plathforms_vertical[i][j];
                for (var j = 0; j < parseInt(number_of_rows_input); j++) {
                    if (plathforms_vertical[i][j].id == "path") {
                        matched.path = plathforms_vertical[i][j];
                        matched.row = i;
                    }
                }
            }
        }
    }
    return matched; 
}
function check_key(event) {
    if (event.keyCode == 27) {
        for (i = 0; i < active_shown_divs.length; i++) {
            active_shown_divs[i].remove();
        }
    }
}