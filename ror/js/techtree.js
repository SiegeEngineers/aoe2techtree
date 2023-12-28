const TYPES = Object.freeze({
    'BUILDING': {colour: '#922602', type: 'BUILDING', name: 'Building'},
    'UNIT': {colour: '#3a6a80', type: 'UNIT', name: 'Unit'},
    'UNIQUEUNIT': {colour: '#af30a3', type: 'UNIQUEUNIT', name: 'Unique Unit'},
    'TECHNOLOGY': {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'}
});

const LEGEND = [TYPES.UNIT, TYPES.BUILDING, TYPES.TECHNOLOGY];

const PREFIX = Object.freeze({
    'BUILDING': 'building_',
    'UNIT': 'unit_',
    'UNIQUEUNIT': 'unit_',
    'TECHNOLOGY': 'tech_'
});

const AGE_IMAGES = ['techtree_stone_age.png', 'techtree_tool_age.png', 'techtree_bronze_age.png', 'techtree_iron_age.png'];

const getAgeNames = (data) => {
    return [
        data.strings[data.age_names['Stone Age']],
        data.strings[data.age_names['Tool Age']],
        data.strings[data.age_names['Bronze Age']],
        data.strings[data.age_names['Iron Age']]
    ];
}

const unitClasses = {
    0: '<abbr title="unused">Wonders</abbr>',
    1: 'Infantry',
    2: 'Turtle Ships and Thirisadai',
    3: 'Base Pierce',
    4: 'Base Melee',
    5: 'Elephants',
    6: 'Unused',
    7: 'Unused',
    8: '<abbr title="except Camels">Mounted Units</abbr>',
    9: 'Unused',
    10: 'Unused',
    11: 'All Buildings',
    12: 'Unused',
    13: 'Stone Walls & Gates & Towers',
    14: 'Wolves etc.',
    15: 'All Archers',
    16: '<abbr title="except Fishing Ships">Ships</abbr>',
    17: 'High Pierce Armor Siege Units',
    18: 'Trees',
    19: 'Unique Units',
    20: 'Siege Units',
    21: '<abbr title="except Wonders">Standard Buildings</abbr>',
    22: 'Walls & Gates',
    23: 'Gunpowder Units',
    24: 'Boars etc.',
    25: 'Monks',
    26: 'Castles & Kreposts',
    27: 'Spearmen',
    28: 'Mounted Archers',
    29: 'Eagle Warriors',
    30: 'Camels',
    31: '<abbr title="previously used by the Leitis as armor-ignoring attack">Obsolete</abbr>',
    32: 'Condottieri',
    33: '<abbr title="no unit has this armor class">Gunpowder units secondary projectile attack</abbr>',
    34: 'Fishing Ships',
    35: 'Mamelukes',
    36: '<abbr title="unused">Heroes & Kings</abbr>',
    37: 'Hussite Wagons',
    38: 'Skirmishers',
    39: 'Cavalry Resistance',
};

const animation_duration = 50;

const UNIQUE_UNIT = 'UNIQUE UNIT';
const ELITE_UNIQUE_UNIT = 'ELITE UNIQUE UNIT';
const UNIQUE_TECH_1 = 'UNIQUE TECH 1';
const UNIQUE_TECH_2 = 'UNIQUE TECH 2';
const MONK_PREFIX_MESO = 'meso_';
const MONK_PREFIX_AFRICAN = 'african_';
const MONK_PREFIX_ASIAN = 'asian_';
const MONK_PREFIX_GENERIC = '';
const BUILDING_STYLE_GENERIC = '';
const BARRACKS = 12;
const DOCK = 45;
const SIEGE_WORKSHOP = 49;
const FARM = 50;
const FORTIFIED_GATE = 63;
const MEDIUM_GATE = 64;
const GRANARY = 68;
const HOUSE = 70;
const SMALL_WALL = 72;
const WATCH_TOWER = 79;
const MARKET = 84;
const ARCHERY_RANGE = 87;
const STABLE = 101;
const ACADEMY = 103;
const TEMPLE = 104;
const TOWN_CENTER = 109;
const MEDIUM_WALL = 117;
const FORTIFIED_WALL = 155;
const GOVERNMENT_CENTER = 209;
const SENTRY_TOWER = 234;
const GUARD_TOWER = 235;
const BALLISTA_TOWER = 236;
const WONDER = 276;
const STORAGE_PIT = 562;
const TOWN_CENTER_2 = 621;
const SMALL_GATE = 789;
const BOWMAN = 4;
const CHARIOT_ARCHER = 5;
const SLINGER = 7;
const MERCHANT_SHIP = 11;
const FISHING_BOAT = 13;
const FISHING_SHIP = 15;
const TRADE_BOAT = 17;
const WAR_GALLEY = 21;
const IMPROVED_BOWMAN = 24;
const HEAVY_TRANSPORT = 37;
const CAVALRY = 38;
const HORSE_ARCHER = 39;
const SHORT_SWORDSMAN = 74;
const BROAD_SWORDSMAN = 75;
const LONG_SWORDSMAN = 77;
const VILLAGER = 83;
const HOPLITE = 93;
const PRIEST = 125;
const TRADE_CART = 128;
const BALLISTA = 279;
const STONE_THROWER = 280;
const CLUBMAN = 281;
const HEAVY_CAVALRY = 283;
const CAMEL_RIDER = 329;
const PHALANGITE = 358;
const CENTURION = 359;
const CATAPULT_TRIREME = 420;
const TRIREME = 442;
const SCOUT = 448;
const LEGIONARY = 473;
const HEAVY_HORSE_ARCHER = 474;
const COMPOSITE_BOWMAN = 492;
const AXEMAN = 531;
const SCOUT_SHIP = 539;
const HELEPOLIS = 542;
const LIGHT_TRANSPORT = 545;
const CATAPULT = 550;
const CATAPHRACT = 569;
const HEAVY_CATAPULT = 588;
const JUGGERNAUT = 691;
const ELEPHANT_ARCHER = 873;
const FIRE_GALLEY = 1103;
const WAR_ELEPHANT = 1132;
const ARMORED_ELEPHANT = 1134;
const CHARIOT = 1370;
const SCYTHE_CHARIOT = 1372;
const BALLISTA_TOWER_TECH = 2;
const SMALL_WALL_TECH = 11;
const SENTRY_TOWER_TECH = 12;
const MEDIUM_WALL_TECH = 13;
const FORTIFIED_WALL_TECH = 14;
const GUARD_TOWER_TECH = 15;
const WATCH_TOWER_TECH = 16;
const AFTERLIFE = 18;
const WRITING = 19;
const FANATICISM = 20;
const MYSTICISM = 21;
const ASTROLOGY = 22;
const ZEALOTRY = 23;
const POLYTHEISM = 24;
const WHEEL = 28;
const COINAGE = 30;
const PLOW = 31;
const ARTISANSHIP = 32;
const NOBILITY = 34;
const ENGINEERING = 35;
const ALCHEMY = 37;
const INFANTRY_LEATHER_ARMOR = 40;
const ARCHER_LEATHER_ARMOR = 41;
const CAVALRY_LEATHER_ARMOR = 42;
const INFANTRY_SCALE_ARMOR = 43;
const ARCHER_SCALE_ARMOR = 44;
const CAVALRY_SCALE_ARMOR = 45;
const TOOLWORKING = 46;
const BRONZE_SHIELD = 47;
const INFANTRY_CHAIN_MAIL = 48;
const ARCHER_CHAIN_MAIL = 49;
const CAVALRY_CHAIN_MAIL = 50;
const METALWORKING = 51;
const METALLURGY = 52;
const IRRIGATION = 80;
const DOMESTICATION = 81;
const TOOL_AGE = 101;
const BRONZE_AGE = 102;
const IRON_AGE = 103;
const BALLISTICS = 106;
const WOODWORKING = 107;
const GOLD_MINING = 108;
const STONE_MINING = 109;
const CRAFTSMANSHIP = 110;
const SIEGECRAFT = 111;
const ARCHITECTURE = 112;
const ARISTOCRACY = 113;
const MONOTHEISM = 114;
const IRON_SHIELD = 117;
const MEDICINE = 119;
const THEOCRACY = 120;
const LOGISTICS = 121;
const TOWER_SHIELD = 122;
const CITY_WATCH = 128;
const CONSCRIPTION = 129;
const URBANIZATION = 150;

const BUILDING_INDEX = [
    BARRACKS,
    ARCHERY_RANGE,
    SIEGE_WORKSHOP,
    STABLE,
    ACADEMY,
    STORAGE_PIT,
    GRANARY,
    WATCH_TOWER,
    MARKET,
    GOVERNMENT_CENTER,
    TEMPLE,
    DOCK,
];
class Tree {
    constructor() {
        this.offsets = {
            stone_1_y: 0,
            stone_2_y: 0,
            tool_1_y: 0,
            tool_2_y: 0,
            bronze_1_y: 0,
            bronze_2_y: 0,
            iron_1_y: 0,
            iron_2_y: 0
        };
        this.height = Math.max(window.innerHeight - 80, 100);
        this.width = 0;
        this.padding = 20;
        this.element_height = 0;
        this.lanes = [];
        this.offset_x = 150;  // 150 is starting offset from the left to accommodate age icons
    }

    updateOffsets() {
        this.element_height = this.height / 4 / 3;
        let element_offset = this.element_height / 2;

        this.offsets.stone_1 = this.padding;
        this.offsets.stone_2 = this.offsets.stone_1 + this.element_height + element_offset;
        this.offsets.tool_1 = this.offsets.stone_2 + this.element_height + element_offset;
        this.offsets.tool_2 = this.offsets.tool_1 + this.element_height + element_offset;
        this.offsets.bronze_1 = this.offsets.tool_2 + this.element_height + element_offset;
        this.offsets.bronze_2 = this.offsets.bronze_1 + this.element_height + element_offset;
        this.offsets.iron_1 = this.offsets.bronze_2 + this.element_height + element_offset;
        this.offsets.iron_2 = this.offsets.iron_1 + this.element_height + element_offset;
    }

    updatePositions() {
        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets, this.element_height);
        }

        let x = this.padding + this.offset_x;
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
            stone_1: [],
            stone_2: [],
            tool_1: [],
            tool_2: [],
            bronze_1: [],
            bronze_2: [],
            iron_1: [],
            iron_2: []
        };
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.padding = 10;
    }

    updatePositions(offsets, element_length) {
        let lane_width = 0;
        for (let r of Object.keys(this.rows)) {
            let x = this.x;
            let row_width = 0;
            for (let i = 0; i < this.rows[r].length; i++) {
                this.rows[r][i].y = offsets[r];
                this.rows[r][i].x = x;
                this.rows[r][i].width = element_length;
                this.rows[r][i].height = element_length;
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
            let allConnectionsForFrom = connections.filter(c => c[0] === from && carets.has(c[0]) && carets.has(c[1]));
            let allRelevantTos = allConnectionsForFrom.map(c => c[1]);
            if (carets.has(from) && carets.get(from).x < Math.min(allRelevantTos.map(to_ => carets.get(to_).x))){
                carets.get(from).x = Math.min(allRelevantTos.map(to_ => carets.get(to_).x));
            }
            if (carets.has(from) && carets.get(from).x > Math.max(allRelevantTos.map(to_ => carets.get(to_).x))){
                console.assert(allRelevantTos.length === 1, `Overlapping carets: ${allRelevantTos}`)
                allRelevantTos.forEach(to_ => carets.get(to_).x = carets.get(from).x);
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

    caretIds() {
        const idList = [];
        for (let r of Object.keys(this.rows)) {
            for (let i = 0; i < this.rows[r].length; i++) {
                idList.push(this.rows[r][i].id);
            }
        }
        return idList;
    }
}

class Caret {
    constructor(type, name, id) {
        this.type = type;
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
}

function formatId(string) {
    return string.toString().replace(/\s/g, '_').replace(/\//g, '_').toLowerCase();
}

function checkIdUnique(tree) {
    let ids = new Set();
    for (let lane of tree.lanes) {
        for (let r of Object.keys(lane.rows)) {
            for (let caret of lane.rows[r]) {
                if (ids.has(caret.id)) {
                    console.error('ID ' + caret.id + ' is not unique!');
                }
                ids.add(caret.id);
            }
        }
    }
}

function enable(buildings, units, techs) {
    for (let item of buildings) {
        SVG('#building_' + formatId(item.id) + '_x').attr({'opacity': 0});
        SVG('#building_' + formatId(item.id) + '_disabled_gray').attr({'opacity': 0});
    }
    for (let item of units) {
        SVG('#unit_' + formatId(item.id) + '_x').attr({'opacity': 0});
        SVG('#unit_' + formatId(item.id) + '_disabled_gray').attr({'opacity': 0});
    }
    for (let item of techs) {
        SVG('#tech_' + formatId(item.id) + '_x').attr({'opacity': 0});
        SVG('#tech_' + formatId(item.id) + '_disabled_gray').attr({'opacity': 0});
    }
}

function applySelectedCiv(selectedCiv) {
    enable(selectedCiv.buildings, selectedCiv.units, selectedCiv.techs);
    unique(selectedCiv.buildingStyle);

    document.getElementById('building_index_12_img').src = `./img/Buildings/12_${selectedCiv.buildingStyle}.png`;
    document.getElementById('building_index_103_img').src = `./img/Buildings/103_${selectedCiv.buildingStyle}.png`;
    document.getElementById('building_index_209_img').src = `./img/Buildings/209_${selectedCiv.buildingStyle}.png`;
}

function formatName(originalname) {
    let name = originalname.toString().replace(/<br>/g, '\n').replace(/\n+/g, '\n');
    const items = name.split('\n');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (items[i].length > 10) {
            let space = item.indexOf(' ');
            if (space !== -1) {
                items[i] = item.slice(0, space) + '\n' + item.slice(space + 1);
                let alternativeSpace = space + 1 + item.slice(space + 1).indexOf(' ');
                if (alternativeSpace !== -1) {
                    if (Math.abs((item.length / 2) - alternativeSpace) < Math.abs((item.length / 2) - space)) {
                        items[i] = item.slice(0, alternativeSpace) + '\n' + item.slice(alternativeSpace + 1);
                    }
                }
            } else {
                let hyphen = item.indexOf('-');
                if (hyphen !== -1) {
                    items[i] = item.slice(0, hyphen) + '-\n' + item.slice(hyphen + 1);
                    let alternativeHyphen = hyphen + 1 + item.slice(hyphen + 1).indexOf('-');
                    if (alternativeHyphen !== -1) {
                        if (Math.abs((item.length / 2) - alternativeHyphen) < Math.abs((item.length / 2) - hyphen)) {
                            items[i] = item.slice(0, alternativeHyphen) + '-\n' + item.slice(alternativeHyphen + 1);
                        }
                    }
                }
            }
        }
    }
    return items.join('\n');
}

function unique(building_style) {
	if (building_style === undefined) {
		building_style = BUILDING_STYLE_GENERIC;
	}
	SVG('#building_' + formatId(BARRACKS) + '_img').load('img/Buildings/' + BARRACKS + '_' + building_style + '.png');
	SVG('#building_' + formatId(ACADEMY) + '_img').load('img/Buildings/' + ACADEMY + '_' + building_style + '.png');
	SVG('#building_' + formatId(TOWN_CENTER) + '_img').load('img/Buildings/' + TOWN_CENTER + '_' + building_style + '.png');
	SVG('#building_' + formatId(TOWN_CENTER_2) + '_img').load('img/Buildings/' + TOWN_CENTER + '_' + building_style + '.png');
	SVG('#building_' + formatId(MEDIUM_WALL) + '_img').load('img/Buildings/' + MEDIUM_WALL + '_' + building_style + '.png');
	SVG('#building_' + formatId(FORTIFIED_WALL) + '_img').load('img/Buildings/' + FORTIFIED_WALL + '_' + building_style + '.png');
	SVG('#building_' + formatId(GOVERNMENT_CENTER) + '_img').load('img/Buildings/' + GOVERNMENT_CENTER + '_' + building_style + '.png');
	SVG('#building_' + formatId(GUARD_TOWER) + '_img').load('img/Buildings/' + GUARD_TOWER + '_' + building_style + '.png');
	SVG('#building_' + formatId(BALLISTA_TOWER) + '_img').load('img/Buildings/' + GUARD_TOWER + '_' + building_style + '.png');
	SVG('#building_' + formatId(WONDER) + '_img').load('img/Buildings/' + WONDER + '_' + building_style + '.png');
}

function getName(id, itemtype) {
    //ToDo handle unique stuff properly
    if(id.toString().startsWith('UNIQUE')){
        return id;
    }
    const languageNameId = data['data'][itemtype][id]['LanguageNameId'];
    return data['strings'][languageNameId];
}

function building(id) {
    return new Caret(TYPES.BUILDING, getName(id, 'buildings'), id);
}

function unit(id) {
    return new Caret(TYPES.UNIT, getName(id, 'units'), id);
}

function uniqueunit(id) {
    return new Caret(TYPES.UNIQUEUNIT, getName(id, 'units'), id);
}

function tech(id) {
    return new Caret(TYPES.TECHNOLOGY, getName(id, 'techs'), id);
}

function getDefaultTree() {
    let tree = new Tree();
    tree.updateOffsets();


 	let barrackslane = new Lane();
	barrackslane.rows.stone_1.push(building(BARRACKS));
	barrackslane.rows.stone_2.push(unit(CLUBMAN));
	barrackslane.rows.tool_1.push(unit(AXEMAN));
	barrackslane.rows.tool_1.push(unit(SLINGER));
	barrackslane.rows.bronze_1.push(unit(SHORT_SWORDSMAN));
	barrackslane.rows.bronze_2.push(unit(BROAD_SWORDSMAN));
	barrackslane.rows.iron_1.push(unit(LONG_SWORDSMAN));
	barrackslane.rows.iron_2.push(unit(LEGIONARY));
	tree.lanes.push(barrackslane);


 	let archerylane = new Lane();
	archerylane.rows.tool_1.push(building(ARCHERY_RANGE));
	archerylane.rows.tool_2.push(unit(BOWMAN));
	archerylane.rows.bronze_1.push(unit(CHARIOT_ARCHER));
	archerylane.rows.bronze_1.push(unit(IMPROVED_BOWMAN));
	archerylane.rows.bronze_2.push(unit(COMPOSITE_BOWMAN));
	archerylane.rows.iron_1.push(unit(ELEPHANT_ARCHER));
	tree.lanes.push(archerylane);
	let horsearcherlane = new Lane();
	horsearcherlane.rows.iron_1.push(unit(HORSE_ARCHER));
	horsearcherlane.rows.iron_2.push(unit(HEAVY_HORSE_ARCHER));
	tree.lanes.push(horsearcherlane);


	let siegeworkshoplane = new Lane();
	siegeworkshoplane.rows.bronze_1.push(building(SIEGE_WORKSHOP));
	siegeworkshoplane.rows.bronze_2.push(unit(STONE_THROWER));
	siegeworkshoplane.rows.iron_1.push(unit(CATAPULT));
	siegeworkshoplane.rows.iron_1.push(unit(BALLISTA));
	siegeworkshoplane.rows.iron_2.push(unit(HEAVY_CATAPULT));
	siegeworkshoplane.rows.iron_2.push(unit(HELEPOLIS));
    tree.lanes.push(siegeworkshoplane);


	let scoutlane = new Lane();
	scoutlane.rows.tool_2.push(unit(SCOUT));
	tree.lanes.push(scoutlane);
	let stablelane = new Lane();
	stablelane.rows.tool_1.push(building(STABLE));
	stablelane.rows.bronze_1.push(unit(CHARIOT));
	stablelane.rows.bronze_1.push(unit(CAVALRY));
	stablelane.rows.bronze_1.push(unit(CAMEL_RIDER));
	stablelane.rows.iron_1.push(unit(SCYTHE_CHARIOT));
	stablelane.rows.iron_1.push(unit(HEAVY_CAVALRY));
	stablelane.rows.iron_1.push(unit(WAR_ELEPHANT));
	stablelane.rows.iron_2.push(unit(CATAPHRACT));
	stablelane.rows.iron_2.push(unit(ARMORED_ELEPHANT));
	tree.lanes.push(stablelane);


	let academylane = new Lane();
	academylane.rows.bronze_1.push(building(ACADEMY));
	academylane.rows.bronze_2.push(unit(HOPLITE));
	academylane.rows.iron_1.push(unit(PHALANGITE));
	academylane.rows.iron_2.push(unit(CENTURION));
	tree.lanes.push(academylane);


	let storagepitlane = new Lane();
	storagepitlane.rows.stone_1.push(building(STORAGE_PIT));
	storagepitlane.rows.tool_1.push(tech(TOOLWORKING));
	storagepitlane.rows.tool_1.push(tech(INFANTRY_LEATHER_ARMOR));
	storagepitlane.rows.tool_1.push(tech(ARCHER_LEATHER_ARMOR));
	storagepitlane.rows.tool_1.push(tech(CAVALRY_LEATHER_ARMOR));
	storagepitlane.rows.bronze_1.push(tech(METALWORKING));
	storagepitlane.rows.bronze_1.push(tech(INFANTRY_SCALE_ARMOR));
	storagepitlane.rows.bronze_1.push(tech(ARCHER_SCALE_ARMOR));
	storagepitlane.rows.bronze_1.push(tech(CAVALRY_SCALE_ARMOR));
	storagepitlane.rows.bronze_1.push(tech(BRONZE_SHIELD));
	storagepitlane.rows.iron_1.push(tech(METALLURGY));
	storagepitlane.rows.iron_1.push(tech(INFANTRY_CHAIN_MAIL));
	storagepitlane.rows.iron_1.push(tech(ARCHER_CHAIN_MAIL));
	storagepitlane.rows.iron_1.push(tech(CAVALRY_CHAIN_MAIL));
	storagepitlane.rows.iron_1.push(tech(IRON_SHIELD));
	storagepitlane.rows.iron_2.push(tech(TOWER_SHIELD));
	tree.lanes.push(storagepitlane);


	let granarylane = new Lane();
	granarylane.rows.stone_1.push(building(GRANARY));
	granarylane.rows.tool_1.push(tech(SMALL_WALL_TECH));
	granarylane.rows.tool_1.push(tech(WATCH_TOWER_TECH));
	granarylane.rows.bronze_1.push(tech(MEDIUM_WALL_TECH));
	granarylane.rows.bronze_1.push(tech(SENTRY_TOWER_TECH));
	granarylane.rows.iron_1.push(tech(FORTIFIED_WALL_TECH));
	granarylane.rows.iron_1.push(tech(GUARD_TOWER_TECH));
	granarylane.rows.iron_2.push(tech(BALLISTA_TOWER_TECH));
	tree.lanes.push(granarylane);


    let walllane = new Lane();
    walllane.rows.tool_1.push(building(SMALL_WALL));
    walllane.rows.bronze_1.push(building(MEDIUM_WALL));
    walllane.rows.iron_1.push(building(FORTIFIED_WALL));
    tree.lanes.push(walllane);


    let towerlane = new Lane();
    towerlane.rows.tool_1.push(building(WATCH_TOWER));
    towerlane.rows.bronze_1.push(building(SENTRY_TOWER));
    towerlane.rows.iron_1.push(building(GUARD_TOWER));
    towerlane.rows.iron_2.push(building(BALLISTA_TOWER));
    tree.lanes.push(towerlane);


    let gatelane = new Lane();
    gatelane.rows.tool_1.push(building(SMALL_GATE));
    gatelane.rows.bronze_1.push(building(MEDIUM_GATE));
    gatelane.rows.iron_1.push(building(FORTIFIED_GATE));
    tree.lanes.push(gatelane);


    let marketlane = new Lane();
    marketlane.rows.tool_1.push(building(MARKET));
    marketlane.rows.tool_2.push(tech(WOODWORKING));
	marketlane.rows.tool_2.push(tech(STONE_MINING));
	marketlane.rows.tool_2.push(tech(GOLD_MINING));
	marketlane.rows.tool_2.push(tech(DOMESTICATION));
	marketlane.rows.bronze_1.push(tech(ARTISANSHIP));
	marketlane.rows.bronze_1.push(tech(PLOW));
	marketlane.rows.iron_1.push(tech(CRAFTSMANSHIP));
	marketlane.rows.iron_1.push(tech(SIEGECRAFT));
	marketlane.rows.iron_1.push(tech(COINAGE));
	marketlane.rows.iron_1.push(tech(IRRIGATION));
    tree.lanes.push(marketlane);
	let wheellane = new Lane();
	wheellane.rows.bronze_1.push(tech(WHEEL));
	wheellane.rows.bronze_2.push(unit(TRADE_CART));
	tree.lanes.push(wheellane);


    let farmlane = new Lane();
    farmlane.rows.tool_2.push(building(FARM));
    tree.lanes.push(farmlane);


	let governmentcenterlane = new Lane();
	governmentcenterlane.rows.bronze_1.push(building(GOVERNMENT_CENTER));
	governmentcenterlane.rows.bronze_2.push(tech(NOBILITY));
	governmentcenterlane.rows.bronze_2.push(tech(WRITING));
	governmentcenterlane.rows.bronze_2.push(tech(ARCHITECTURE));
	governmentcenterlane.rows.bronze_2.push(tech(LOGISTICS));
	governmentcenterlane.rows.bronze_2.push(tech(URBANIZATION));
	governmentcenterlane.rows.iron_1.push(tech(ARISTOCRACY));
	governmentcenterlane.rows.iron_1.push(tech(BALLISTICS));
	governmentcenterlane.rows.iron_1.push(tech(ALCHEMY));
	governmentcenterlane.rows.iron_1.push(tech(ENGINEERING));
	governmentcenterlane.rows.iron_1.push(tech(CONSCRIPTION));
	tree.lanes.push(governmentcenterlane);

	let newtowncenterlane = new Lane()
	newtowncenterlane.rows.bronze_2.push(building(TOWN_CENTER_2));
	tree.lanes.push(newtowncenterlane);


	let templelane = new Lane();
	templelane.rows.bronze_1.push(building(TEMPLE));
	templelane.rows.bronze_2.push(tech(ASTROLOGY));
	templelane.rows.bronze_2.push(tech(MYSTICISM));
	templelane.rows.bronze_2.push(tech(POLYTHEISM));
	templelane.rows.bronze_2.push(unit(PRIEST));
	templelane.rows.iron_1.push(tech(AFTERLIFE));
	templelane.rows.iron_1.push(tech(MONOTHEISM));
	templelane.rows.iron_1.push(tech(FANATICISM));
	templelane.rows.iron_1.push(tech(ZEALOTRY));
	templelane.rows.iron_2.push(tech(MEDICINE));
	templelane.rows.iron_2.push(tech(THEOCRACY));
	tree.lanes.push(templelane);


    let wonderlane = new Lane();
    wonderlane.rows.iron_1.push(building(WONDER));
    tree.lanes.push(wonderlane);


    let towncenterlane = new Lane();
    towncenterlane.rows.stone_1.push(building(TOWN_CENTER));
    towncenterlane.rows.stone_2.push(unit(VILLAGER));
    towncenterlane.rows.stone_2.push(tech(TOOL_AGE));
    towncenterlane.rows.tool_1.push(tech(CITY_WATCH));
    towncenterlane.rows.tool_1.push(tech(BRONZE_AGE));
    towncenterlane.rows.bronze_1.push(tech(IRON_AGE));
    tree.lanes.push(towncenterlane);


    let houselane = new Lane();
    houselane.rows.stone_1.push(building(HOUSE));
    tree.lanes.push(houselane);


	let fishinglane = new Lane();
	fishinglane.rows.stone_2.push(unit(FISHING_BOAT));
	fishinglane.rows.bronze_1.push(unit(FISHING_SHIP));
	tree.lanes.push(fishinglane);
    let docklane = new Lane();
    docklane.rows.stone_1.push(building(DOCK));
	docklane.rows.tool_1.push(unit(LIGHT_TRANSPORT));
	docklane.rows.tool_1.push(unit(SCOUT_SHIP));
	docklane.rows.bronze_1.push(unit(WAR_GALLEY));
	docklane.rows.iron_1.push(unit(HEAVY_TRANSPORT));
	docklane.rows.iron_1.push(unit(TRIREME));
	docklane.rows.iron_2.push(unit(FIRE_GALLEY));
	tree.lanes.push(docklane);
	let tradeboatlane = new Lane();
	tradeboatlane.rows.bronze_1.push(unit(TRADE_BOAT));
	tradeboatlane.rows.bronze_2.push(unit(MERCHANT_SHIP));
	tradeboatlane.rows.iron_1.push(unit(CATAPULT_TRIREME));
	tradeboatlane.rows.iron_2.push(unit(JUGGERNAUT));
    tree.lanes.push(tradeboatlane);


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
		[b(ARCHERY_RANGE), b(SIEGE_WORKSHOP)],
		[b(ARCHERY_RANGE), u(BOWMAN)],
//		[b(ARCHERY_RANGE), u(CHARIOT_ARCHER)],
		[b(ARCHERY_RANGE), u(IMPROVED_BOWMAN)],
		[u(IMPROVED_BOWMAN), u(COMPOSITE_BOWMAN)],
//		[b(ARCHERY_RANGE), u(ELEPHANT_ARCHER)],
		[b(ARCHERY_RANGE), u(HORSE_ARCHER)],
		[u(HORSE_ARCHER), u(HEAVY_HORSE_ARCHER)],
		[b(SIEGE_WORKSHOP), u(STONE_THROWER)],
		[u(STONE_THROWER), u(CATAPULT)],
		[u(CATAPULT), u(HEAVY_CATAPULT)],
		[b(SIEGE_WORKSHOP), u(BALLISTA)],
		[u(BALLISTA), u(HELEPOLIS)],
        [b(BARRACKS), b(ARCHERY_RANGE)],
        [b(BARRACKS), b(STABLE)],
        [b(BARRACKS), u(CLUBMAN)],
        [u(CLUBMAN), u(AXEMAN)],
		[b(BARRACKS), u(SLINGER)],
//		[b(BARRACKS), u(SHORT_SWORDSMAN)],
		[u(SHORT_SWORDSMAN), u(BROAD_SWORDSMAN)],
		[u(BROAD_SWORDSMAN), u(LONG_SWORDSMAN)],
		[u(LONG_SWORDSMAN), u(LEGIONARY)],
		[b(STABLE), b(ACADEMY)],
		[b(STABLE), u(SCOUT)],
		[b(STABLE), u(CHARIOT)],
		[u(CHARIOT), u(SCYTHE_CHARIOT)],
		[b(STABLE), u(CAVALRY)],
		[u(CAVALRY), u(HEAVY_CAVALRY)],
		[u(HEAVY_CAVALRY), u(CATAPHRACT)],
		[b(STABLE), u(CAMEL_RIDER)],
//		[b(STABLE), u(WAR_ELEPHANT)],
		[u(WAR_ELEPHANT), u(ARMORED_ELEPHANT)],
		[b(ACADEMY), u(HOPLITE)],
		[u(HOPLITE), u(PHALANGITE)],
		[u(PHALANGITE), u(CENTURION)],
		[b(STORAGE_PIT), t(TOOLWORKING)],
		[t(TOOLWORKING), t(METALWORKING)],
		[t(METALWORKING), t(METALLURGY)],
		[b(STORAGE_PIT), t(INFANTRY_LEATHER_ARMOR)],
		[t(INFANTRY_LEATHER_ARMOR), t(INFANTRY_SCALE_ARMOR)],
		[t(INFANTRY_SCALE_ARMOR), t(INFANTRY_CHAIN_MAIL)],
		[b(STORAGE_PIT), t(ARCHER_LEATHER_ARMOR)],
		[t(ARCHER_LEATHER_ARMOR), t(ARCHER_SCALE_ARMOR)],
		[t(ARCHER_SCALE_ARMOR), t(ARCHER_CHAIN_MAIL)],
		[b(STORAGE_PIT), t(CAVALRY_LEATHER_ARMOR)],
		[t(CAVALRY_LEATHER_ARMOR), t(CAVALRY_SCALE_ARMOR)],
		[t(CAVALRY_SCALE_ARMOR), t(CAVALRY_CHAIN_MAIL)],
		[b(STORAGE_PIT), t(BRONZE_SHIELD)],
		[t(BRONZE_SHIELD), t(IRON_SHIELD)],
		[t(IRON_SHIELD), t(TOWER_SHIELD)],
		[b(GRANARY), b(MARKET)],
		[b(GRANARY), t(SMALL_WALL_TECH)],
		[t(SMALL_WALL_TECH), t(MEDIUM_WALL_TECH)],
		[t(MEDIUM_WALL_TECH), t(FORTIFIED_WALL_TECH)],
		[b(GRANARY), t(WATCH_TOWER_TECH)],
		[t(WATCH_TOWER_TECH), t(SENTRY_TOWER_TECH)],
		[t(SENTRY_TOWER_TECH), t(GUARD_TOWER_TECH)],
		[t(GUARD_TOWER_TECH), t(BALLISTA_TOWER_TECH)],
		[b(SMALL_WALL), b(MEDIUM_WALL)],
		[b(MEDIUM_WALL), b(FORTIFIED_WALL)],
		[b(SMALL_GATE), b(MEDIUM_GATE)],
		[b(MEDIUM_GATE), b(FORTIFIED_GATE)],
		[b(WATCH_TOWER), b(SENTRY_TOWER)],
		[b(SENTRY_TOWER), b(GUARD_TOWER)],
		[b(GUARD_TOWER), b(BALLISTA_TOWER)],
		[b(MARKET), b(FARM)],
		[b(MARKET), b(GOVERNMENT_CENTER)],
		[b(MARKET), b(TEMPLE)],
		[b(MARKET), t(WOODWORKING)],
		[t(WOODWORKING), t(ARTISANSHIP)],
		[t(ARTISANSHIP), t(CRAFTSMANSHIP)],
		[b(MARKET), t(STONE_MINING)],
		[t(STONE_MINING), t(SIEGECRAFT)],
		[b(MARKET), t(GOLD_MINING)],
		[t(GOLD_MINING), t(COINAGE)],
		[b(MARKET), t(DOMESTICATION)],
		[t(DOMESTICATION), t(PLOW)],
		[t(PLOW), t(IRRIGATION)],
		[b(MARKET), t(WHEEL)],
		[t(WHEEL), u(TRADE_CART)],
		[b(GOVERNMENT_CENTER), t(NOBILITY)],
		[b(GOVERNMENT_CENTER), t(WRITING)],
		[b(GOVERNMENT_CENTER), t(ARCHITECTURE)],
		[b(GOVERNMENT_CENTER), t(LOGISTICS)],
		[b(GOVERNMENT_CENTER), t(URBANIZATION)],
		[b(GOVERNMENT_CENTER), b(TOWN_CENTER_2)],
		// [b(GOVERNMENT_CENTER), t(ARISTOCRACY)],
		// [b(GOVERNMENT_CENTER), t(BALLISTICS)],
		// [b(GOVERNMENT_CENTER), t(ALCHEMY)],
		// [b(GOVERNMENT_CENTER), t(ENGINEERING)],
		// [b(GOVERNMENT_CENTER), t(CONSCRIPTION)],
		[b(TEMPLE), t(ASTROLOGY)],
		[b(TEMPLE), t(MYSTICISM)],
		[b(TEMPLE), t(POLYTHEISM)],
		[b(TEMPLE), u(PRIEST)],
		// [b(TEMPLE), t(AFTERLIFE)],
		// [b(TEMPLE), t(MONOTHEISM)],
		// [b(TEMPLE), t(FANATICISM)],
		// [b(TEMPLE), t(ZEALOTRY)],
		// [b(TEMPLE), t(MEDICINE)],
		// [b(TEMPLE), t(THEOCRACY)],
		[b(TOWN_CENTER), u(VILLAGER)],
		[b(TOWN_CENTER), t(TOOL_AGE)],
		[t(TOOL_AGE), t(BRONZE_AGE)],
		[t(BRONZE_AGE), t(IRON_AGE)],
		[b(DOCK), u(FISHING_BOAT)],
		[u(FISHING_BOAT), u(FISHING_SHIP)],
		[b(DOCK), u(TRADE_BOAT)],
		[u(TRADE_BOAT), u(MERCHANT_SHIP)],
		[b(DOCK), u(LIGHT_TRANSPORT)],
		[u(LIGHT_TRANSPORT), u(HEAVY_TRANSPORT)],
		[b(DOCK), u(SCOUT_SHIP)],
		[u(SCOUT_SHIP), u(WAR_GALLEY)],
		[u(WAR_GALLEY), u(TRIREME)],
		// [b(DOCK), u(FIRE_GALLEY)],
		// [b(DOCK), u(CATAPULT_TRIREME)],
		[u(CATAPULT_TRIREME), u(JUGGERNAUT)],
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
