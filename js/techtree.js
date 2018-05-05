var TYPES = Object.freeze({
    "BUILDING": { colour: '#922602' },
    "UNIT": { colour: '#3a6a80' },
    "UNIQUEUNIT": { colour: '#af30a3' },
    "TECHNOLOGY": { colour: '#2c5729' }
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

}

class Caret {
    constructor(type, name, id) {
        this.type = type;
        this.icon = null;
        this.name = name;
        this.id = formatId(id);
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
    }

    isBuilding() {
        return this.type == TYPES.BUILDING;
    }
}

function formatId(string) {
    return string.replace(/\s/g, "_").toLowerCase();
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
    barrackslane.rows.feudal_1.push(tech("Tracking"));
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
    stablelane.rows.castle_1.push(tech("Husbandry"));
    stablelane.rows.imperial_1.push(unit("Hussar"));
    stablelane.rows.imperial_1.push(unit("Cavalier"));
    stablelane.rows.imperial_1.push(unit("Heavy Camel"));
    stablelane.rows.imperial_1.push(unit("Elite Battle Elephant"));
    stablelane.rows.imperial_2.push(uniqueunit("Imperial Camel"));
    stablelane.rows.imperial_2.push(unit("Paladin"));
    tree.lanes.push(stablelane);


    let wonderlane = new Lane();
    wonderlane.rows.imperial_1.push(building("Wonder"));
    tree.lanes.push(wonderlane);


    let docklane = new Lane();
    docklane.rows.dark_1.push(building("Dock"));
    docklane.rows.dark_2.push(unit("Fishing Ship"));
    docklane.rows.dark_2.push(unit("Transport Ship"));
    docklane.rows.feudal_1.push(unit("Fire Galley"));
    docklane.rows.feudal_1.push(unit("Trade Cog"));
    docklane.rows.feudal_1.push(unit("Demolition Raft"));
    docklane.rows.feudal_1.push(unit("Galley"));
    docklane.rows.castle_1.push(unit("Fire Ship"));
    docklane.rows.castle_1.push(unit("Gillnets"));
    docklane.rows.castle_1.push(unit("Demolition Ship"));
    docklane.rows.castle_1.push(unit("War Galley"));
    docklane.rows.castle_1.push(uniqueunit("Turtle Ship"));
    docklane.rows.castle_1.push(uniqueunit("Longboat"));
    docklane.rows.castle_1.push(uniqueunit("Caravel"));
    docklane.rows.castle_1.push(tech("Careening"));
    docklane.rows.imperial_1.push(unit("Fast Fire Ship"));
    docklane.rows.imperial_1.push(unit("Cannon Galleon"));
    docklane.rows.imperial_1.push(unit("Heavy Demolition Ship"));
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
    universitylane.rows.castle_2.push(new Caret(TYPES.TECHNOLOGY, "Fortified Wall", "Fortified Wall (Tech)"));
    universitylane.rows.castle_2.push(tech("Ballistics"));
    universitylane.rows.castle_2.push(new Caret(TYPES.TECHNOLOGY, "Guard Tower", "Guard Tower (Tech)"));
    universitylane.rows.castle_2.push(tech("Heated Shot"));
    universitylane.rows.castle_2.push(tech("Murder Holes"));
    universitylane.rows.castle_2.push(tech("Treadmill Crane"));
    universitylane.rows.imperial_1.push(tech("Architecture"));
    universitylane.rows.imperial_1.push(tech("Chemistry"));
    universitylane.rows.imperial_1.push(tech("Siege Engineers"));
    universitylane.rows.imperial_1.push(new Caret(TYPES.TECHNOLOGY, "Keep", "Keep (Tech)"));
    universitylane.rows.imperial_2.push(new Caret(TYPES.TECHNOLOGY, "Bombard Tower", "Bombard Tower (Tech)"));
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
    milllane.rows.dark_2.push(building("Farm"));
    milllane.rows.feudal_1.push(tech("Horse Collar"));
    milllane.rows.castle_1.push(tech("Heavy Plow"));
    milllane.rows.imperial_1.push(tech("Crop Rotation"));
    tree.lanes.push(milllane);

    tree.updatePositions();

    checkIdUnique(tree);

    return tree;
}


function getConnections() {
    let connections = [
        ["Archery Range", "Archer"],
        ["Archer", "Crossbowman"],
        ["Crossbowman", "Arbalest"],
        ["Archery Range", "Skirmisher"],
        ["Skirmisher", "Elite Skirmisher"],
        ["Archery Range", "Cavalry Archer"],
        ["Cavalry Archer", "Heavy Cav Archer"],
        ["Archery Range", "Thumb Ring"],
        ["Barracks", "Archery Range"],
        ["Barracks", "Stable"],
        ["Barracks", "Militia"],
        ["Militia", "Man-at-Arms"],
        ["Man-at-Arms", "Long Swordsman"],
        ["Long Swordsman", "Two-Handed Swordsman"],
        ["Two-Handed Swordsman", "Champion"],
        ["Barracks", "Spearman"],
        ["Spearman", "Pikeman"],
        ["Pikeman", "Halberdier"],
        ["Barracks", "Eagle Scout"],
        ["Eagle Scout", "Eagle Warrior"],
        ["Eagle Warrior", "Elite Eagle Warrior"],
        ["Barracks", "Tracking"],
        ["Barracks", "Arson"],
        ["Stable", "Scout Cavalry"],
        ["Scout Cavalry", "Light Cavalry"],
        ["Light Cavalry", "Hussar"],
        ["Stable", "Bloodlines"],
        ["Stable", "Camel"],
        ["Camel", "Heavy Camel"],
        ["Stable", "Battle Elephant"],
        ["Battle Elephant", "Elite Battle Elephant"],
        ["Stable", "Husbandry"],
        ["Knight", "Cavalier"],
        ["Cavalier", "Paladin"],
        ["Dock", "Fishing Ship"],
        ["Dock", "Transport Ship"],
        ["Dock", "Demolition Raft"],
        ["Demolition Raft", "Demolition Ship"],
        ["Demolition Ship", "Heavy Demolition Ship"],
        ["Dock", "Galley"],
        ["Galley", "War Galley"],
        ["War Galley", "Galleon"],
        ["Dock", "Careening"],
        ["Careening", "Dry Dock"],
        ["Dock", "Shipwright"],
        ["Dock", "Fish Trap"],
        ["Fire Galley", "Fire Ship"],
        ["Fire Ship", "Fast Fire Ship"],
        ["Cannon Galleon", "Elite Cannon Galleon"],
        ["Watch Tower", "Guard Tower"],
        ["Guard Tower", "Keep"],
        ["Stone Wall", "Fortified Wall"],
        ["Monastery", "Monk"],
        ["Monastery", "Redemption"],
        ["Monastery", "Atonement"],
        ["Monastery", "Herbal Medicine"],
        ["Monastery", "Heresy"],
        ["Monastery", "Sanctity"],
        ["Monastery", "Fervor"],
        ["Castle", "UNIQUE UNIT"],
        ["UNIQUE UNIT", "ELITE UNIQUE UNIT"],
        ["Castle", "Petard"],
        ["Castle", "UNIQUE TECH 1"],
        ["Castle", "Hoardings"],
        ["Castle", "Sappers"],
        ["Castle", "Conscription"],
        ["Castle", "Spies/Treason"],
        ["Town Center", "Villager"],
        ["Town Center", "Feudal Age"],
        ["Feudal Age", "Castle Age"],
        ["Castle Age", "Imperial Age"],
        ["Town Center", "Loom"],
        ["Town Watch", "Town Patrol"],
        ["Wheelbarrow", "Hand Cart"],
        ["Siege Workshop", "Mangonel"],
        ["Mangonel", "Onager"],
        ["Onager", "Siege Onager"],
        ["Siege Workshop", "Battering Ram"],
        ["Battering Ram", "Capped Ram"],
        ["Capped Ram", "Siege Ram"],
        ["Siege Workshop", "Scorpion"],
        ["Scorpion", "Heavy Scorpion"],
        ["Siege Workshop", "Bombard Cannon"],
        ["Blacksmith", "Siege Workshop"],
        ["Blacksmith", "Padded Archer Armor"],
        ["Padded Archer Armor", "Leather Archer Armor"],
        ["Leather Archer Armor", "Ring Archer Armor"],
        ["Blacksmith", "Fletching"],
        ["Fletching", "Bodkin Arrow"],
        ["Bodkin Arrow", "Bracer"],
        ["Blacksmith", "Forging"],
        ["Forging", "Iron Casting"],
        ["Iron Casting", "Blast Furnace"],
        ["Blacksmith", "Scale Barding Armor"],
        ["Scale Barding Armor", "Chain Barding Armor"],
        ["Chain Barding Armor", "Plate Barding Armor"],
        ["Blacksmith", "Scale Mail Armor"],
        ["Scale Mail Armor", "Chain Mail Armor"],
        ["Chain Mail Armor", "Plate Mail Armor"],
        ["University", "Masonry"],
        ["Masonry", "Architecture"],
        ["University", "Fortified Wall (Tech)"],
        ["University", "Ballistics"],
        ["University", "Guard Tower (Tech)"],
        ["Guard Tower (Tech)", "Keep (Tech)"],
        ["University", "Heated Shot"],
        ["University", "Murder Holes"],
        ["University", "Treadmill Crane"],
        ["Chemistry", "Bombard Tower (Tech)"],
        ["Mining Camp", "Stone Mining"],
        ["Stone Mining", "Stone Shaft Mining"],
        ["Mining Camp", "Gold Mining"],
        ["Gold Mining", "Gold Shaft Mining"],
        ["Lumber Camp", "Double-Bit Axe"],
        ["Double-Bit Axe", "Bow Saw"],
        ["Bow Saw", "Two-Man Saw"],
        ["Market", "Cartography"],
        ["Cartography", "Caravan"],
        ["Market", "Coinage"],
        ["Coinage", "Banking"],
        ["Market", "Trade Cart"],
        ["Mill", "Market"],
        ["Mill", "Horse Collar"],
        ["Horse Collar", "Heavy Plow"],
        ["Heavy Plow", "Crop Rotation"],
        ["Mill", "Farm"],
        ["Genitour", "Elite Genitour"],
        ["Heavy Camel", "Imperial Camel"],
        ["Turtle Ship", "Elite Turtle Ship"],
        ["Longboat", "Elite Longboat"],
        ["Elite Skirmisher", "Imperial Skirmisher"],
        ["Monastery", "Missionary"],
        ["Caravel", "Elite Caravel"],
        ["Dock", "Caravel"],
        ["Dock", "Turtle Ship"],
        ["Archery Range", "Slinger"],
        ["Archery Range", "Genitour"],
        ["Dock", "Longboat"]
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

