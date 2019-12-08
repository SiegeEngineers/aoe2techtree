var TYPES = Object.freeze({
    "BUILDING": {colour: '#922602', type: 'BUILDING'},
    "UNIT": {colour: '#3a6a80', type: 'UNIT'},
    "UNIQUEUNIT": {colour: '#af30a3', type: 'UNIQUEUNIT'},
    "TECHNOLOGY": {colour: '#2c5729', type: 'TECHNOLOGY'}
});

var PREFIX = Object.freeze({
    "BUILDING": 'building_',
    "UNIT": 'unit_',
    "UNIQUEUNIT": 'unit_',
    "TECHNOLOGY": 'tech_'
});

var animation_duration = 50;

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
        };
        this.height = Math.max(window.innerHeight - 80, 100);
        this.width = 0;
        this.padding = 10;
        this.element_height = 0;
        this.lanes = [];
    }

    updateOffsets() {
        this.element_height = this.height / 4 / 3;
        let element_offset = this.element_height / 2;

        this.offsets.dark_1 = this.padding;
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

        let x = this.padding;
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].x = x;
            x = x + this.lanes[i].width + this.padding;
        }
        this.width = x;

        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets, this.element_height);
        }
    }

    carets() {
        let c = new Map();
        for (let lane of this.lanes) {
            let lanecarets = lane.carets();
            for (let key of lanecarets.keys()) {
                c.set(key, lanecarets.get(key));
            }
        }
        return c;
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
        };
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

        for (let r of Object.keys(this.rows)) {
            for (let i = 0; i < this.rows[r].length; i++) {
                if (this.rows[r][i].isBuilding()) {
                    this.rows[r][i].x = this.x + ((this.width - this.padding) / 2) - (this.rows[r][i].width / 2);
                }
            }
        }

        let connections = getConnections();
        let carets = this.nonBuildingCarets();
        for (let connection of connections) {
            let from = connection[0];
            let to = connection[1];
            if (carets.has(from) && carets.has(to)) {
                let from_x = carets.get(from).x;
                let to_x = carets.get(to).x;
                carets.get(from).x = Math.max(from_x, to_x);
                carets.get(to).x = Math.max(from_x, to_x);
            }
        }
    }

    nonBuildingCarets() {
        let c = new Map();
        for (let r of Object.keys(this.rows)) {
            for (let caret of this.rows[r]) {
                if (!caret.isBuilding()) {
                    c.set(caret.id, caret);
                }
            }
        }
        return c;
    }

    carets() {
        let c = new Map();
        for (let r of Object.keys(this.rows)) {
            for (let caret of this.rows[r]) {
                c.set(caret.id, caret);
            }
        }
        return c;
    }

}

class Caret {
    constructor(type, name, id) {
        this.type = type;
        this.icon = null;
        this.name = name;
        this.id = PREFIX[type.type] + formatId(id);
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
    }

    isBuilding() {
        return this.type === TYPES.BUILDING;
    }

    isUniqueUnit() {
        return this.type === TYPES.UNIQUEUNIT;
    }

    isUnit() {
        return this.type === TYPES.UNIT;
    }

    isTech() {
        return this.type === TYPES.TECHNOLOGY;
    }
}

function formatId(string) {
    return string.replace(/\s/g, "_").replace(/\//g, "_").toLowerCase();
}

function checkIdUnique(tree) {
    let ids = new Set();
    for (let lane of tree.lanes) {
        for (let r of Object.keys(lane.rows)) {
            for (let caret of lane.rows[r]) {
                if (ids.has(caret.id)) {
                    console.error("ID " + caret.id + " is not unique!");
                }
                ids.add(caret.id);
            }
        }
    }
}

function resetToDefault(tree) {
    SVG.select('.cross').animate(animation_duration).attr({'fill-opacity': 0});
    disableUniqueUnits(tree);
    enable([], ["UNIQUE UNIT", "ELITE UNIQUE UNIT"], []);
    disable([], ["Eagle Scout", "Eagle Warrior", "Elite Eagle Warrior"], []);
    disable([], ["Battle Elephant", "Elite Battle Elephant"], []);
    disable([], ["Steppe Lancer", "Elite Steppe Lancer"], []);
    disable(["Krepost", "Feitoria"], [], []);
}

function disable(buildings, units, techs) {
    for (name of buildings) {
        SVG.get('building_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 1});
    }
    for (name of units) {
        SVG.get('unit_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 1});
    }
    for (name of techs) {
        SVG.get('tech_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 1});
    }
}

function enable(buildings, units, techs) {
    for (name of buildings) {
        SVG.get('building_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 0});
    }
    for (name of units) {
        SVG.get('unit_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 0});
    }
    for (name of techs) {
        SVG.get('tech_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 0});
    }
}

function disableUniqueUnits(tree) {
    let carets = tree.carets();
    for (key of carets.keys()) {
        let caret = carets.get(key);
        if (caret.isUniqueUnit()) {
            SVG.get(caret.id + '_x').animate(animation_duration).attr({'fill-opacity': 1});
        }
    }
}

function formatName(originalname) {
    let name = originalname;
    if (name.length > 10) {
        let space = originalname.indexOf(" ");
        if (space !== -1) {
            name = originalname.slice(0, space) + "\n" + originalname.slice(space + 1);
            let alternativeSpace = space + 1 + originalname.slice(space + 1).indexOf(" ");
            if (alternativeSpace !== -1) {
                if (Math.abs((originalname.length / 2) - alternativeSpace) < Math.abs((originalname.length / 2) - space)) {
                    name = originalname.slice(0, alternativeSpace) + "\n" + originalname.slice(alternativeSpace + 1);
                }
            }
        }
    }
    return name;
}

function unique(names, monk_prefix) {
    if (monk_prefix === undefined) {
        monk_prefix = "";
    }
    SVG.get('unit_' + formatId("UNIQUE UNIT") + '_text').text(formatName(names[0]));
    SVG.get('unit_' + formatId("UNIQUE UNIT") + '_overlay').data({'name': names[0]});
    SVG.get('unit_' + formatId("ELITE UNIQUE UNIT") + '_text').text(formatName(names[1]));
    SVG.get('unit_' + formatId("ELITE UNIQUE UNIT") + '_overlay').data({'name': names[1]});
    SVG.get('tech_' + formatId("UNIQUE TECH 1") + '_text').text(formatName(names[2]));
    SVG.get('tech_' + formatId("UNIQUE TECH 1") + '_overlay').data({'name': names[2]});
    SVG.get('tech_' + formatId("UNIQUE TECH 2") + '_text').text(formatName(names[3]));
    SVG.get('tech_' + formatId("UNIQUE TECH 2") + '_overlay').data({'name': names[3]});
    SVG.get('unit_' + formatId("UNIQUE UNIT") + '_img').load('img/Units/' + formatId(names[0]) + '.png');
    SVG.get('unit_' + formatId("ELITE UNIQUE UNIT") + '_img').load('img/Units/' + formatId(names[1]) + '.png');
    SVG.get('unit_' + formatId("Monk") + '_img').load('img/Units/' + monk_prefix + 'monk.png');
}


function disableHorses(tree) {
    let stable_index = -1;
    for (let i = 0; i < tree.lanes.length; i++) {
        let lane = tree.lanes[i];
        for (let r of Object.keys(lane.rows)) {
            for (let caret of lane.rows[r]) {
                if (caret.id === 'building_' + formatId("Stable")) {
                    stable_index = i;
                }
            }
        }
    }
    let lane = tree.lanes[stable_index];
    for (let r of Object.keys(lane.rows)) {
        for (let caret of lane.rows[r]) {
            SVG.get(caret.id + '_x').animate(animation_duration).attr({'fill-opacity': 1});
        }
    }
    disable([], ["Cavalry Archer", "Heavy Cav Archer"], ["Scale Barding Armor", "Chain Barding Armor", "Plate Barding Armor", "Parthian Tactics"]);
}


function building(name) {
    return new Caret(TYPES.BUILDING, name, name);
}

function unit(name) {
    return new Caret(TYPES.UNIT, name, name);
}

function uniqueunit(name) {
    return new Caret(TYPES.UNIQUEUNIT, name, name);
}

function tech(name) {
    return new Caret(TYPES.TECHNOLOGY, name, name);
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
    archerylane.rows.castle_1.push(uniqueunit("Slinger"));
    archerylane.rows.castle_1.push(unit("Cavalry Archer"));
    archerylane.rows.castle_1.push(uniqueunit("Genitour"));
    archerylane.rows.castle_1.push(tech("Thumb Ring"));
    archerylane.rows.imperial_1.push(unit("Arbalest"));
    archerylane.rows.imperial_1.push(uniqueunit("Imperial Skirmisher"));
    archerylane.rows.imperial_1.push(unit("Hand Cannoneer"));
    archerylane.rows.imperial_1.push(unit("Heavy Cav Archer"));
    archerylane.rows.imperial_1.push(uniqueunit("Elite Genitour"));
    archerylane.rows.imperial_1.push(tech("Parthian Tactics"));
    tree.lanes.push(archerylane);


    let barrackslane = new Lane();
    barrackslane.rows.dark_1.push(building("Barracks"));
    barrackslane.rows.dark_2.push(unit("Militia"));
    barrackslane.rows.feudal_1.push(unit("Man-at-Arms"));
    barrackslane.rows.feudal_1.push(unit("Spearman"));
    barrackslane.rows.feudal_1.push(unit("Eagle Scout"));
    barrackslane.rows.feudal_1.push(tech("Supplies"));
    barrackslane.rows.castle_1.push(unit("Long Swordsman"));
    barrackslane.rows.castle_1.push(unit("Pikeman"));
    barrackslane.rows.castle_1.push(unit("Eagle Warrior"));
    barrackslane.rows.castle_1.push(tech("Squires"));
    barrackslane.rows.castle_1.push(tech("Arson"));
    barrackslane.rows.imperial_1.push(unit("Two-Handed Swordsman"));
    barrackslane.rows.imperial_2.push(unit("Champion"));
    barrackslane.rows.imperial_1.push(unit("Halberdier"));
    barrackslane.rows.imperial_1.push(unit("Elite Eagle Warrior"));
    barrackslane.rows.imperial_1.push(uniqueunit("Condottiero"));
    tree.lanes.push(barrackslane);


    let stablelane = new Lane();
    stablelane.rows.feudal_1.push(building("Stable"));
    stablelane.rows.feudal_2.push(unit("Scout Cavalry"));
    stablelane.rows.feudal_2.push(tech("Bloodlines"));
    stablelane.rows.castle_1.push(unit("Light Cavalry"));
    stablelane.rows.castle_1.push(unit("Knight"));
    stablelane.rows.castle_1.push(unit("Camel"));
    stablelane.rows.castle_1.push(unit("Battle Elephant"));
    stablelane.rows.castle_1.push(unit("Steppe Lancer"));
    stablelane.rows.castle_1.push(tech("Husbandry"));
    stablelane.rows.imperial_1.push(unit("Hussar"));
    stablelane.rows.imperial_1.push(unit("Cavalier"));
    stablelane.rows.imperial_1.push(unit("Heavy Camel"));
    stablelane.rows.imperial_1.push(unit("Elite Battle Elephant"));
    stablelane.rows.imperial_1.push(unit("Elite Steppe Lancer"));
    stablelane.rows.imperial_2.push(uniqueunit("Imperial Camel"));
    stablelane.rows.imperial_2.push(unit("Paladin"));
    tree.lanes.push(stablelane);


    let wonderlane = new Lane();
    wonderlane.rows.imperial_1.push(building("Wonder"));
    tree.lanes.push(wonderlane);


    let feitorialane = new Lane();
    feitorialane.rows.castle_1.push(building("Krepost"));
    feitorialane.rows.imperial_1.push(building("Feitoria"));
    tree.lanes.push(feitorialane);


    let docklane = new Lane();
    docklane.rows.dark_1.push(building("Dock"));
    docklane.rows.dark_2.push(unit("Fishing Ship"));
    docklane.rows.dark_2.push(unit("Transport Ship"));
    docklane.rows.feudal_1.push(unit("Fire Galley"));
    docklane.rows.feudal_1.push(unit("Trade Cog"));
    docklane.rows.feudal_1.push(unit("Demolition Raft"));
    docklane.rows.feudal_1.push(unit("Galley"));
    docklane.rows.castle_1.push(unit("Fire Ship"));
    docklane.rows.castle_1.push(tech("Gillnets"));
    docklane.rows.castle_1.push(unit("Demolition Ship"));
    docklane.rows.castle_1.push(unit("War Galley"));
    docklane.rows.castle_1.push(uniqueunit("Turtle Ship"));
    docklane.rows.castle_1.push(uniqueunit("Longboat"));
    docklane.rows.castle_1.push(uniqueunit("Caravel"));
    docklane.rows.castle_1.push(tech("Careening"));
    docklane.rows.imperial_1.push(unit("Fast Fire Ship"));
    docklane.rows.imperial_1.push(unit("Cannon Galleon"));
    docklane.rows.imperial_1.push(unit("Heavy Demo Ship"));
    docklane.rows.imperial_1.push(unit("Galleon"));
    docklane.rows.imperial_1.push(uniqueunit("Elite Turtle Ship"));
    docklane.rows.imperial_1.push(uniqueunit("Elite Longboat"));
    docklane.rows.imperial_1.push(uniqueunit("Elite Caravel"));
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
    walllane.rows.dark_2.push(building("Palisade Gate"));
    walllane.rows.feudal_1.push(building("Gate"));
    walllane.rows.feudal_2.push(building("Stone Wall"));
    walllane.rows.castle_1.push(building("Fortified Wall"));
    tree.lanes.push(walllane);


    let monasterylane = new Lane();
    monasterylane.rows.castle_1.push(building("Monastery"));
    monasterylane.rows.castle_2.push(unit("Monk"));
    monasterylane.rows.castle_2.push(uniqueunit("Missionary"));
    monasterylane.rows.castle_2.push(tech("Redemption"));
    monasterylane.rows.castle_2.push(tech("Fervor"));
    monasterylane.rows.castle_2.push(tech("Sanctity"));
    monasterylane.rows.castle_2.push(tech("Atonement"));
    monasterylane.rows.castle_2.push(tech("Herbal Medicine"));
    monasterylane.rows.castle_2.push(tech("Heresy"));
    monasterylane.rows.imperial_1.push(tech("Block Printing"));
    monasterylane.rows.imperial_1.push(tech("Illumination"));
    monasterylane.rows.imperial_1.push(tech("Faith"));
    monasterylane.rows.imperial_1.push(tech("Theocracy"));
    tree.lanes.push(monasterylane);

    let castlelane = new Lane();
    castlelane.rows.castle_1.push(building("Castle"));
    castlelane.rows.castle_2.push(new Caret(TYPES.UNIQUEUNIT, "UNIQUE UNIT", "UNIQUE UNIT"));
    castlelane.rows.castle_2.push(unit("Petard"));
    castlelane.rows.castle_2.push(tech("UNIQUE TECH 1"));
    castlelane.rows.imperial_1.push(new Caret(TYPES.UNIQUEUNIT, "ELITE UNIQUE UNIT", "ELITE UNIQUE UNIT"));
    castlelane.rows.imperial_1.push(unit("Trebuchet"));
    castlelane.rows.imperial_1.push(tech("UNIQUE TECH 2"));
    castlelane.rows.imperial_1.push(tech("Hoardings"));
    castlelane.rows.imperial_1.push(tech("Sappers"));
    castlelane.rows.imperial_1.push(tech("Conscription"));
    castlelane.rows.imperial_1.push(tech("Spies/Treason"));
    tree.lanes.push(castlelane);


    let houselane = new Lane();
    houselane.rows.dark_1.push(building("House"));
    tree.lanes.push(houselane);

    let towncenterlane = new Lane();
    towncenterlane.rows.dark_1.push(building("Town Center"));
    towncenterlane.rows.dark_2.push(unit("Villager"));
    towncenterlane.rows.dark_2.push(tech("Feudal Age"));
    towncenterlane.rows.dark_2.push(tech("Loom"));
    towncenterlane.rows.feudal_1.push(tech("Town Watch"));
    towncenterlane.rows.feudal_1.push(tech("Castle Age"));
    towncenterlane.rows.feudal_1.push(tech("Wheelbarrow"));
    towncenterlane.rows.castle_1.push(tech("Town Patrol"));
    towncenterlane.rows.castle_1.push(tech("Imperial Age"));
    towncenterlane.rows.castle_1.push(tech("Hand Cart"));
    tree.lanes.push(towncenterlane);


    let additionaltowncenterlane = new Lane();
    additionaltowncenterlane.rows.castle_1.push(new Caret(TYPES.BUILDING, "Town Center", "additional Town Center"));
    tree.lanes.push(additionaltowncenterlane);


    let siegeworkshoplane = new Lane();
    siegeworkshoplane.rows.castle_1.push(building("Siege Workshop"));
    siegeworkshoplane.rows.castle_2.push(unit("Mangonel"));
    siegeworkshoplane.rows.castle_2.push(unit("Battering Ram"));
    siegeworkshoplane.rows.castle_2.push(unit("Scorpion"));
    siegeworkshoplane.rows.castle_2.push(unit("Siege Tower"));
    siegeworkshoplane.rows.imperial_1.push(unit("Onager"));
    siegeworkshoplane.rows.imperial_1.push(unit("Capped Ram"));
    siegeworkshoplane.rows.imperial_1.push(unit("Heavy Scorpion"));
    siegeworkshoplane.rows.imperial_1.push(unit("Bombard Cannon"));
    siegeworkshoplane.rows.imperial_2.push(unit("Siege Onager"));
    siegeworkshoplane.rows.imperial_2.push(unit("Siege Ram"));
    tree.lanes.push(siegeworkshoplane);


    let blacksmithlane = new Lane();
    blacksmithlane.rows.feudal_1.push(building("Blacksmith"));
    blacksmithlane.rows.feudal_2.push(tech("Padded Archer Armor"));
    blacksmithlane.rows.feudal_2.push(tech("Fletching"));
    blacksmithlane.rows.feudal_2.push(tech("Forging"));
    blacksmithlane.rows.feudal_2.push(tech("Scale Barding Armor"));
    blacksmithlane.rows.feudal_2.push(tech("Scale Mail Armor"));
    blacksmithlane.rows.castle_1.push(tech("Leather Archer Armor"));
    blacksmithlane.rows.castle_1.push(tech("Bodkin Arrow"));
    blacksmithlane.rows.castle_1.push(tech("Iron Casting"));
    blacksmithlane.rows.castle_1.push(tech("Chain Barding Armor"));
    blacksmithlane.rows.castle_1.push(tech("Chain Mail Armor"));
    blacksmithlane.rows.imperial_1.push(tech("Ring Archer Armor"));
    blacksmithlane.rows.imperial_1.push(tech("Bracer"));
    blacksmithlane.rows.imperial_1.push(tech("Blast Furnace"));
    blacksmithlane.rows.imperial_1.push(tech("Plate Barding Armor"));
    blacksmithlane.rows.imperial_1.push(tech("Plate Mail Armor"));
    tree.lanes.push(blacksmithlane);


    let universitylane = new Lane();
    universitylane.rows.castle_1.push(building("University"));
    universitylane.rows.castle_2.push(tech("Masonry"));
    universitylane.rows.castle_2.push(new Caret(TYPES.TECHNOLOGY, "Fortified Wall", "Fortified Wall"));
    universitylane.rows.castle_2.push(tech("Ballistics"));
    universitylane.rows.castle_2.push(new Caret(TYPES.TECHNOLOGY, "Guard Tower", "Guard Tower"));
    universitylane.rows.castle_2.push(tech("Heated Shot"));
    universitylane.rows.castle_2.push(tech("Murder Holes"));
    universitylane.rows.castle_2.push(tech("Treadmill Crane"));
    universitylane.rows.imperial_1.push(tech("Architecture"));
    universitylane.rows.imperial_1.push(tech("Chemistry"));
    universitylane.rows.imperial_1.push(tech("Siege Engineers"));
    universitylane.rows.imperial_1.push(new Caret(TYPES.TECHNOLOGY, "Keep", "Keep"));
    universitylane.rows.imperial_1.push(tech("Arrowslits"));
    universitylane.rows.imperial_2.push(new Caret(TYPES.TECHNOLOGY, "Bombard Tower", "Bombard Tower"));
    tree.lanes.push(universitylane);

    let miningcamplane = new Lane();
    miningcamplane.rows.dark_1.push(building("Mining Camp"));
    miningcamplane.rows.feudal_1.push(tech("Stone Mining"));
    miningcamplane.rows.feudal_1.push(tech("Gold Mining"));
    miningcamplane.rows.castle_1.push(tech("Stone Shaft Mining"));
    miningcamplane.rows.castle_1.push(tech("Gold Shaft Mining"));
    tree.lanes.push(miningcamplane);


    let lumbercamplane = new Lane();
    lumbercamplane.rows.dark_1.push(building("Lumber Camp"));
    lumbercamplane.rows.feudal_1.push(tech("Double-Bit Axe"));
    lumbercamplane.rows.castle_1.push(tech("Bow Saw"));
    lumbercamplane.rows.imperial_1.push(tech("Two-Man Saw"));
    tree.lanes.push(lumbercamplane);


    let marketlane = new Lane();
    marketlane.rows.feudal_1.push(building("Market"));
    marketlane.rows.feudal_2.push(tech("Cartography"));
    marketlane.rows.feudal_2.push(tech("Coinage"));
    marketlane.rows.feudal_2.push(unit("Trade Cart"));
    marketlane.rows.castle_1.push(tech("Caravan"));
    marketlane.rows.castle_1.push(tech("Banking"));
    marketlane.rows.imperial_1.push(tech("Guilds"));
    tree.lanes.push(marketlane);


    let milllane = new Lane();
    milllane.rows.dark_1.push(building("Mill"));
    milllane.rows.feudal_1.push(tech("Horse Collar"));
    milllane.rows.castle_1.push(tech("Heavy Plow"));
    milllane.rows.imperial_1.push(tech("Crop Rotation"));
    tree.lanes.push(milllane);


    let farmlane = new Lane();
    farmlane.rows.dark_2.push(building("Farm"));
    tree.lanes.push(farmlane);

    tree.updatePositions();

    checkIdUnique(tree);

    return tree;
}

function u(unit) {
    return 'unit_' + unit;
}

function b(building) {
    return 'building_' + building;
}

function t(tech) {
    return 'tech_' + tech;
}

function getConnections() {
    let connections = [
        [b("Archery Range"), u("Archer")],
        [u("Archer"), u("Crossbowman")],
        [u("Crossbowman"), u("Arbalest")],
        [b("Archery Range"), u("Skirmisher")],
        [u("Skirmisher"), u("Elite Skirmisher")],
        [b("Archery Range"), u("Cavalry Archer")],
        [u("Cavalry Archer"), u("Heavy Cav Archer")],
        [b("Archery Range"), t("Thumb Ring")],
        [b("Barracks"), b("Archery Range")],
        [b("Barracks"), b("Stable")],
        [b("Barracks"), u("Militia")],
        [u("Militia"), u("Man-at-Arms")],
        [u("Man-at-Arms"), u("Long Swordsman")],
        [u("Long Swordsman"), u("Two-Handed Swordsman")],
        [u("Two-Handed Swordsman"), u("Champion")],
        [b("Barracks"), u("Spearman")],
        [u("Spearman"), u("Pikeman")],
        [u("Pikeman"), u("Halberdier")],
        [b("Barracks"), u("Eagle Scout")],
        [u("Eagle Scout"), u("Eagle Warrior")],
        [u("Eagle Warrior"), u("Elite Eagle Warrior")],
        [b("Barracks"), t("Supplies")],
        [b("Barracks"), t("Arson")],
        [b("Stable"), u("Scout Cavalry")],
        [u("Scout Cavalry"), u("Light Cavalry")],
        [u("Light Cavalry"), u("Hussar")],
        [b("Stable"), t("Bloodlines")],
        [b("Stable"), u("Camel")],
        [u("Camel"), u("Heavy Camel")],
        [b("Stable"), u("Battle Elephant")],
        [u("Battle Elephant"), u("Elite Battle Elephant")],
        [b("Stable"), u("Steppe Lancer")],
        [u("Steppe Lancer"), u("Elite Steppe Lancer")],
        [b("Stable"), t("Husbandry")],
        [u("Knight"), u("Cavalier")],
        [u("Cavalier"), u("Paladin")],
        [b("Dock"), u("Fishing Ship")],
        [b("Dock"), u("Transport Ship")],
        [b("Dock"), u("Demolition Raft")],
        [u("Demolition Raft"), u("Demolition Ship")],
        [u("Demolition Ship"), u("Heavy Demo Ship")],
        [b("Dock"), u("Galley")],
        [u("Galley"), u("War Galley")],
        [u("War Galley"), u("Galleon")],
        [b("Dock"), t("Careening")],
        [t("Careening"), t("Dry Dock")],
        [b("Dock"), t("Shipwright")],
        [b("Dock"), b("Fish Trap")],
        [u("Fire Galley"), u("Fire Ship")],
        [u("Fire Ship"), u("Fast Fire Ship")],
        [u("Cannon Galleon"), u("Elite Cannon Galleon")],
        [b("Watch Tower"), b("Guard Tower")],
        [b("Guard Tower"), b("Keep")],
        [b("Stone Wall"), b("Fortified Wall")],
        [b("Monastery"), u("Monk")],
        [b("Monastery"), t("Redemption")],
        [b("Monastery"), t("Atonement")],
        [b("Monastery"), t("Herbal Medicine")],
        [b("Monastery"), t("Heresy")],
        [b("Monastery"), t("Sanctity")],
        [b("Monastery"), t("Fervor")],
        [b("Castle"), u("UNIQUE UNIT")],
        [u("UNIQUE UNIT"), u("ELITE UNIQUE UNIT")],
        [b("Castle"), u("Petard")],
        [b("Castle"), t("UNIQUE TECH 1")],
        [b("Castle"), t("Hoardings")],
        [b("Castle"), t("Sappers")],
        [b("Castle"), t("Conscription")],
        [b("Castle"), t("Spies/Treason")],
        [b("Town Center"), u("Villager")],
        [b("Town Center"), t("Feudal Age")],
        [t("Feudal Age"), t("Castle Age")],
        [t("Castle Age"), t("Imperial Age")],
        [b("Town Center"), t("Loom")],
        [t("Town Watch"), t("Town Patrol")],
        [t("Wheelbarrow"), t("Hand Cart")],
        [b("Siege Workshop"), u("Mangonel")],
        [u("Mangonel"), u("Onager")],
        [u("Onager"), u("Siege Onager")],
        [b("Siege Workshop"), u("Battering Ram")],
        [u("Battering Ram"), u("Capped Ram")],
        [u("Capped Ram"), u("Siege Ram")],
        [b("Siege Workshop"), u("Scorpion")],
        [u("Scorpion"), u("Heavy Scorpion")],
        [b("Siege Workshop"), u("Siege Tower")],
        [b("Blacksmith"), b("Siege Workshop")],
        [b("Blacksmith"), t("Padded Archer Armor")],
        [t("Padded Archer Armor"), t("Leather Archer Armor")],
        [t("Leather Archer Armor"), t("Ring Archer Armor")],
        [b("Blacksmith"), t("Fletching")],
        [t("Fletching"), t("Bodkin Arrow")],
        [t("Bodkin Arrow"), t("Bracer")],
        [b("Blacksmith"), t("Forging")],
        [t("Forging"), t("Iron Casting")],
        [t("Iron Casting"), t("Blast Furnace")],
        [b("Blacksmith"), t("Scale Barding Armor")],
        [t("Scale Barding Armor"), t("Chain Barding Armor")],
        [t("Chain Barding Armor"), t("Plate Barding Armor")],
        [b("Blacksmith"), t("Scale Mail Armor")],
        [t("Scale Mail Armor"), t("Chain Mail Armor")],
        [t("Chain Mail Armor"), t("Plate Mail Armor")],
        [b("University"), t("Masonry")],
        [t("Masonry"), t("Architecture")],
        [b("University"), t("Fortified Wall")],
        [b("University"), t("Ballistics")],
        [b("University"), t("Guard Tower")],
        [t("Guard Tower"), t("Keep")],
        [b("University"), t("Heated Shot")],
        [b("University"), t("Murder Holes")],
        [b("University"), t("Treadmill Crane")],
        [t("Chemistry"), t("Bombard Tower")],
        [b("Mining Camp"), t("Stone Mining")],
        [t("Stone Mining"), t("Stone Shaft Mining")],
        [b("Mining Camp"), t("Gold Mining")],
        [t("Gold Mining"), t("Gold Shaft Mining")],
        [b("Lumber Camp"), t("Double-Bit Axe")],
        [t("Double-Bit Axe"), t("Bow Saw")],
        [t("Bow Saw"), t("Two-Man Saw")],
        [b("Market"), t("Cartography")],
        [t("Cartography"), t("Caravan")],
        [b("Market"), t("Coinage")],
        [t("Coinage"), t("Banking")],
        [b("Market"), u("Trade Cart")],
        [b("Mill"), b("Market")],
        [b("Mill"), t("Horse Collar")],
        [t("Horse Collar"), t("Heavy Plow")],
        [t("Heavy Plow"), t("Crop Rotation")],
        [b("Mill"), b("Farm")],
        [u("Genitour"), u("Elite Genitour")],
        [u("Heavy Camel"), u("Imperial Camel")],
        [u("Turtle Ship"), u("Elite Turtle Ship")],
        [u("Longboat"), u("Elite Longboat")],
        [u("Elite Skirmisher"), u("Imperial Skirmisher")],
        [b("Monastery"), u("Missionary")],
        [u("Caravel"), u("Elite Caravel")],
        [b("Dock"), u("Caravel")],
        [b("Dock"), u("Turtle Ship")],
        [b("Archery Range"), u("Slinger")],
        [b("Archery Range"), u("Genitour")],
        [b("Dock"), u("Longboat")]
    ];

    let connection_ids = [];
    for (let c of connections) {
        connection_ids.push([formatId(c[0]), formatId(c[1])]);
    }
    return connection_ids;
}


function getConnectionPoints(tree) {
    let points = new Map();
    for (let lane of tree.lanes) {
        for (let r of Object.keys(lane.rows)) {
            for (let caret of lane.rows[r]) {
                points.set(caret.id, {
                    x: caret.x + (caret.width / 2),
                    y: caret.y + (caret.height / 2)
                });
            }
        }
    }
    return points;
}

