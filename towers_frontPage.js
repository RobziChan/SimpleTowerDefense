/*
Set the front page stats for the basic towers for easy update
*/
function addEach_tower() {
    let D_main = document.getElementById("tower_infos");
    let H1_main = document.createElement("h1");

    H1_main.innerHTML = "<u>Towers</u>";

    let D_holder = document.createElement("div");
    D_holder.appendChild(H1_main);

    towers_all_array.forEach(tower => {
        let D_tower = document.createElement("div");
        let D_tower_name = document.createElement("div");
        let H3_tower_name = document.createElement("h3");
        let P_tower_icon = document.createElement("p");

        D_tower_name.className = "tower_name";
        H3_tower_name.innerHTML = "<u>" + tower.name + "</u>";
        P_tower_icon.className = "icon";
        P_tower_icon.innerHTML = tower.icons[0];

        D_tower_name.appendChild(H3_tower_name);
        D_tower_name.appendChild(P_tower_icon);

        D_tower.appendChild(D_tower_name);
        //stats for the tower
        let D_tower_stats = document.createElement("div");

        D_tower_stats.className = "tower_stats";
        if (tower.effect == "damage") {
            D_tower_stats.appendChild(table_creater(["Damage for each level:",tower.damage_levels, "!br", "Range: ", tower.range, "!br", "Crit Chance: ", tower.crit_rate, "!br", "Crit Damage: ", tower.crit_damage, "!br", "Cost: ", tower.cost]));
        } else {
            D_tower_stats.appendChild(table_creater(["Amount for each level:",tower.amount_levels, "!br", "Range: ", tower.range, "!br", "Cost: ", tower.cost]));
        }
        D_tower.appendChild(D_tower_stats);
        D_holder.className = "holder";
        D_holder.appendChild(D_tower);
    });
    D_main.appendChild(D_holder);

    
}