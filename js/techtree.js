var TYPES = Object.freeze({ "BUILDING": {colour: '#922602'}, "UNIT": {colour: '#3a6a80'}, "UNIQUEUNIT": {colour: '#af30a3'}, "TECHNOLOGY": {colour: '#2c5729'}});

class Tree {
    constructor() {
        this.offsets = {
            dark_1_y: 0,
            dark_2_y: 0,
            feudal_1_y: 0,
            feudal_2_y: 0,
            castle_1_y: 0,
            castle_2_y: 0,
            imperial_1_y: 0,
            imperial_2_y: 0
        }
        this.height = 800;
        this.width = 0;
        this.padding = 10;
        this.element_height = 0;
        this.lanes = [];
    }

    updateOffsets() {
        this.element_height = this.height / 4 / 3;
        let element_offset = this.element_height / 2;

        this.offsets.dark_1 = 0;
        this.offsets.dark_2 = this.offsets.dark_1 + this.element_height + element_offset;
        this.offsets.feudal_1 = this.offsets.dark_2 + this.element_height + element_offset;
        this.offsets.feudal_2 = this.offsets.feudal_1 + this.element_height + element_offset;
        this.offsets.castle_1 = this.offsets.feudal_2 + this.element_height + element_offset;
        this.offsets.castle_2 = this.offsets.castle_1 + this.element_height + element_offset;
        this.offsets.imperial_1 = this.offsets.castle_2 + this.element_height + element_offset;
        this.offsets.imperial_2 = this.offsets.imperial_1 + this.element_height + element_offset;
    }

    updatePositions() {
        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets, this.element_height);
        }

        let x = 0;
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].x = x;
            x = x + this.lanes[i].width + this.padding;
        }
        this.width = x;

        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets, this.element_height);
        }
    }
}

class Lane {
    constructor() {
        this.rows = {
            dark_1: [],
            dark_2: [],
            feudal_1: [],
            feudal_2: [],
            castle_1: [],
            castle_2: [],
            imperial_1: [],
            imperial_2: []
        }
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.padding = 10;
    }

    updatePositions(offsets, element_height) {
        let lane_width = 0;
        for (let r of Object.keys(this.rows)) {
            let x = this.x;
            let row_width = 0;
            for (let i = 0; i < this.rows[r].length; i++) {
                this.rows[r][i].y = offsets[r];
                this.rows[r][i].x = x;
                this.rows[r][i].width = element_height;
                this.rows[r][i].height = element_height;
                x = x + this.rows[r][i].width + this.padding;
                row_width = row_width + this.rows[r][i].width + this.padding;
            }
            lane_width = Math.max(lane_width, row_width);
        }
        this.width = lane_width;
    }

}

class Caret {
    constructor(type, name) {
        this.type = type;
        this.icon = null;
        this.name = name;
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
    }
}

function getDefaultTree(){
    let tree = new Tree();
    tree.updateOffsets();

    let archerylane = new Lane();
    let archeryrange = new Caret(TYPES.BUILDING, "Archery Range");
    archerylane.rows.feudal_1.push(archeryrange);
    let archer = new Caret(TYPES.UNIT, "Archer");
    archerylane.rows.feudal_2.push(archer);
    let skirmisher = new Caret(TYPES.UNIT, "Skirmisher");
    archerylane.rows.feudal_2.push(skirmisher);
    let crossbowman = new Caret(TYPES.UNIT, "Crossbowman");
    archerylane.rows.castle_1.push(crossbowman);
    let eliteskirmisher = new Caret(TYPES.UNIT, "Elite Skirmisher");
    archerylane.rows.castle_1.push(eliteskirmisher);
    let cavalryarcher = new Caret(TYPES.UNIT, "Cavalry Archer");
    archerylane.rows.castle_1.push(cavalryarcher);
    let thumbring = new Caret(TYPES.TECHNOLOGY, "Thumbring");
    archerylane.rows.castle_1.push(thumbring);
    let arbalest = new Caret(TYPES.UNIT, "Arbalest");
    archerylane.rows.imperial_1.push(arbalest);
    let handcannoneer = new Caret(TYPES.UNIT, "Hand Cannoneer");
    archerylane.rows.imperial_1.push(handcannoneer);
    let heavycavarcher = new Caret(TYPES.UNIT, "Heavy Cav Archer");
    archerylane.rows.imperial_1.push(heavycavarcher);
    let parthiantactics = new Caret(TYPES.TECHNOLOGY, "Parthian Tactics");
    archerylane.rows.imperial_1.push(parthiantactics);
    tree.lanes.push(archerylane);

    let barrackslane = new Lane();
    let barracks = new Caret(TYPES.BUILDING, "Barracks");
    barrackslane.rows.dark_1.push(barracks);
    let militia = new Caret(TYPES.UNIT, "Militia");
    barrackslane.rows.dark_2.push(militia);
    let manatarms = new Caret(TYPES.UNIT, "Man-at-Arms");
    barrackslane.rows.feudal_1.push(manatarms);
    let spearman = new Caret(TYPES.UNIT, "Spearman");
    barrackslane.rows.feudal_1.push(spearman);
    let eaglescout = new Caret(TYPES.UNIT, "Eagle Scout");
    barrackslane.rows.feudal_1.push(eaglescout);
    let tracking = new Caret(TYPES.TECHNOLOGY, "Tracking");
    barrackslane.rows.feudal_1.push(tracking);
    let longswordsman = new Caret(TYPES.UNIT, "Long Swordsman");
    barrackslane.rows.castle_1.push(longswordsman);
    let pikeman = new Caret(TYPES.UNIT, "Pikeman");
    barrackslane.rows.castle_1.push(pikeman);
    let eaglewarrior = new Caret(TYPES.UNIT, "Eagle Warrior");
    barrackslane.rows.castle_1.push(eaglewarrior);
    let twohandendwordsman = new Caret(TYPES.UNIT, "Two Handed Swordsman");
    barrackslane.rows.castle_1.push(twohandendwordsman);
    let halberdier = new Caret(TYPES.UNIT, "Halberdier");
    barrackslane.rows.castle_1.push(halberdier);
    let eliteeaglewarrior = new Caret(TYPES.UNIT, "Elite Eagle Warrior");
    barrackslane.rows.castle_1.push(eliteeaglewarrior);
    tree.lanes.push(barrackslane);

    let wonderlane = new Lane();
    let wonder = new Caret(TYPES.BUILDING, "Wonder");
    wonderlane.rows.imperial_1.push(wonder);
    tree.lanes.push(wonderlane);

    let towerlane = new Lane();
    let outpost = new Caret(TYPES.BUILDING, "Outpost");
    towerlane.rows.dark_1.push(outpost);
    let watchtower = new Caret(TYPES.BUILDING, "Watch Tower");
    towerlane.rows.feudal_1.push(watchtower);
    let guardtower = new Caret(TYPES.BUILDING, "Guard Tower");
    towerlane.rows.castle_1.push(guardtower);
    let keep = new Caret(TYPES.BUILDING, "Keep");
    towerlane.rows.imperial_1.push(keep);
    let bombardtower = new Caret(TYPES.BUILDING, "Bombard Tower");
    towerlane.rows.imperial_2.push(bombardtower);
    tree.lanes.push(towerlane);

    tree.updatePositions();

    return tree;
}