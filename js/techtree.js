var TYPES = Object.freeze({
    "BUILDING": { colour: '#922602' },
    "UNIT": { colour: '#3a6a80' },
    "UNIQUEUNIT": { colour: '#af30a3' },
    "TECHNOLOGY": { colour: '#2c5729' },
    "VOID": { colour: '#000000' }
});

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

function building(name){
    return new Caret(TYPES.BUILDING, name);
}

function unit(name){
    return  new Caret(TYPES.UNIT, name);
}

function tech(name){
    return  new Caret(TYPES.TECHNOLOGY, name);
}

function getDefaultTree() {
    let tree = new Tree();
    tree.updateOffsets();

    let archerylane = new Lane();
    archerylane.rows.feudal_1.push(building("Archery Range"));
    archerylane.rows.feudal_2.push(unit("Archer"));
    archerylane.rows.feudal_2.push(unit("Skirmisher"));

    archerylane.rows.castle_1.push(unit("Crossbowman"));
    archerylane.rows.castle_1.push(unit("Elite Skirmisher"));
    archerylane.rows.castle_1.push(unit("Cavalry Archer"));
    archerylane.rows.castle_1.push(tech("Thumbring"));

    archerylane.rows.imperial_1.push(unit("Arbalest"));
    archerylane.rows.imperial_1.push(unit("Hand Cannoneer"));
    archerylane.rows.imperial_1.push(unit("Heavy Cav Archer"));
    archerylane.rows.imperial_1.push(tech("Parthian Tactics"));
    tree.lanes.push(archerylane);


    let barrackslane = new Lane();
    barrackslane.rows.dark_1.push(building("Barracks"));
    barrackslane.rows.dark_2.push(unit("Militia"));

    barrackslane.rows.feudal_1.push(unit("Man-at-Arms"));
    barrackslane.rows.feudal_1.push(unit("Spearman"));
    barrackslane.rows.feudal_1.push(unit("Eagle Scout"));
    barrackslane.rows.feudal_1.push(tech("Tracking"));

    barrackslane.rows.castle_1.push(unit("Long Swordsman"));
    barrackslane.rows.castle_1.push(unit("Pikeman"));
    barrackslane.rows.castle_1.push(unit("Eagle Warrior"));
    barrackslane.rows.castle_1.push(tech("Squires"));

    barrackslane.rows.imperial_1.push(unit("Two Handed Swordsman"));
    barrackslane.rows.imperial_2.push(unit("Champion"));
    barrackslane.rows.imperial_1.push(unit("Halberdier"));
    barrackslane.rows.imperial_1.push(unit("Elite Eagle Warrior"));
    tree.lanes.push(barrackslane);


    let stablelane = new Lane();
    stablelane.rows.feudal_1.push(building("Stable"));
    stablelane.rows.feudal_2.push(tech("Bloodlines"));
    stablelane.rows.feudal_2.push(new Caret(TYPES.VOID, ""));
    stablelane.rows.feudal_2.push(unit("Scout Cavalry"));
    stablelane.rows.castle_1.push(unit("Camel"));
    stablelane.rows.castle_1.push(unit("Knight"));
    stablelane.rows.castle_1.push(unit("Light Cavalry"));
    stablelane.rows.castle_1.push(tech("Husbandry"));
    stablelane.rows.imperial_1.push(unit("Heavy Camel"));
    stablelane.rows.imperial_1.push(unit("Cavalier"));
    stablelane.rows.imperial_2.push(unit("Paladin"));
    stablelane.rows.imperial_1.push(unit("Hussar"));
    tree.lanes.push(stablelane);


    let wonderlane = new Lane();
    wonderlane.rows.imperial_1.push(building("Wonder"));
    tree.lanes.push(wonderlane);


    let docklane = new Lane();
    docklane.rows.dark_1.push(building("Dock"));
    docklane.rows.dark_2.push(unit("Fishing Ship"));
    docklane.rows.feudal_1.push(unit("Trade Cog"));
    docklane.rows.feudal_1.push(unit("Transport Ship"));
    docklane.rows.feudal_1.push(unit("Galley"));
    docklane.rows.castle_1.push(unit("Fire Ship"));
    docklane.rows.castle_1.push(unit("Demolition Ship"));
    docklane.rows.castle_1.push(unit("War Galley"));
    docklane.rows.castle_1.push(tech("Careening"));
    docklane.rows.imperial_1.push(unit("Fast Fire Ship"));
    docklane.rows.imperial_1.push(unit("Heavy Demolition Ship"));
    docklane.rows.imperial_1.push(unit("Galleon"));
    docklane.rows.imperial_1.push(unit("Cannon Galleon"));
    docklane.rows.imperial_2.push(unit("Elite Cannon Galleon"));
    docklane.rows.imperial_1.push(tech("Dry Dock"));
    docklane.rows.imperial_1.push(tech("Shipwright"));
    tree.lanes.push(docklane);


    let fishtraplane = new Lane();
    fishtraplane.rows.feudal_1.push(building("Fish Trap"));
    tree.lanes.push(fishtraplane);


    let towerlane = new Lane();
    towerlane.rows.dark_1.push(building("Outpost"));
    towerlane.rows.feudal_1.push(building("Watch Tower"));
    towerlane.rows.castle_1.push(building("Guard Tower"));
    towerlane.rows.imperial_1.push(building("Keep"));
    towerlane.rows.imperial_2.push(building("Bombard Tower"));
    tree.lanes.push(towerlane);


    let walllane = new Lane();
    walllane.rows.dark_1.push(building("Palisade Wall"));
    walllane.rows.feudal_1.push(building("Gate"));
    walllane.rows.feudal_2.push(building("Stone Wall"));
    walllane.rows.castle_1.push(building("Fortified Wall"));
    tree.lanes.push(walllane);


    let monasterylane = new Lane();
    monasterylane.rows.castle_1.push(building("Monastery"));
    monasterylane.rows.castle_2.push(tech("Redemption"));
    monasterylane.rows.castle_2.push(tech("Fervor"));
    monasterylane.rows.castle_2.push(tech("Sanctity"));
    monasterylane.rows.castle_2.push(tech("Atonement"));
    monasterylane.rows.castle_2.push(unit("Monk"));
    monasterylane.rows.castle_2.push(tech("Herbal Medicine"));
    monasterylane.rows.castle_2.push(tech("Heresy"));
    monasterylane.rows.imperial_1.push(tech("Block Printing"));
    monasterylane.rows.imperial_1.push(tech("Illumination"));
    monasterylane.rows.imperial_1.push(tech("Faith"));
    monasterylane.rows.imperial_1.push(tech("Theocracy"));
    tree.lanes.push(monasterylane);

    let castlelane = new Lane();
    castlelane.rows.castle_1.push(building("Castle"));
    tree.lanes.push(castlelane);


    tree.updatePositions();

    return tree;
}