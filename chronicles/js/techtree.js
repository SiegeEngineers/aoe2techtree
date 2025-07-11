const TYPES = Object.freeze({
    'BUILDING': {colour: '#ff0000', type: 'BUILDING', name: 'Building'},
    'UNIT': {colour: '#ff0000', type: 'UNIT', name: 'Unit'},
    'UNIQUEUNIT': {colour: '#703b7a', type: 'UNIQUEUNIT', name: 'Unique Unit'},
    'TECHNOLOGY': {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'}
});

const PREFIX = Object.freeze({
    'BUILDING': 'building_',
    'UNIT': 'unit_',
    'UNIQUEUNIT': 'unit_',
    'TECHNOLOGY': 'tech_'
});

const AGE_IMAGES = ['archaic_age_chronicles.png', 'civic_age_chronicles.png', 'classical_age_chronicles.png', 'imperial_age_chronicles.png'];

const getAgeNames = (data)=>{
    return [
        data.strings[data.age_names['Archaic Age']],
        data.strings[data.age_names['Civic Age']],
        data.strings[data.age_names['Classical Age']],
        data.strings[data.age_names['Imperial Age']],
    ];
}

const unitClasses = {
    0: '<abbr title="unused">Wonders</abbr>',
    1: 'Infantry',
    2: 'Heavy Warships',
    3: 'Base Pierce',
    4: 'Base Melee',
    5: 'Elephants',
    6: 'Unused',
    7: 'Unused',
    8: '<abbr title="except Camels">Mounted Units</abbr>',
    9: 'Unused',
    10: 'Unused',
    11: '<abbr title="except Fish Traps">All Buildings</abbr>',
    12: 'Unused',
    13: '<abbr title="except Castles and Kreposts">Stone Defense & Harbors</abbr>',
    14: 'Wolves etc.',
    15: 'All Archers',
    16: '<abbr title="except Fishing Ships">Ships</abbr>',
    17: 'High Pierce Armor Siege Units',
    18: 'Trees',
    19: 'Unique Units',
    20: 'Siege Units',
    21: '<abbr title="except Fish Traps and Wonders">Standard Buildings</abbr>',
    22: 'Walls & Gates',
    23: 'Gunpowder Units',
    24: 'Boars etc.',
    25: 'Monks',
    26: 'Castles & Kreposts',
    27: 'Spear Units',
    28: 'Mounted Archers',
    29: 'Shock Infantry',
    30: 'Camels',
    31: '<abbr title="previously used by the Leitis as armor-ignoring attack">Obsolete</abbr>',
    32: 'Condottieri',
    33: '<abbr title="no unit has this armor class">Gunpowder units secondary projectile attack</abbr>',
    34: 'Fishing Ships',
    35: 'Mamelukes',
    36: 'Heroes & Kings',
    37: 'Heavy Siege',
    38: 'Skirmishers',
    39: 'Cavalry Resistance',
    40: 'Houses',
    60: 'Light Ranged Warships',
};

const animation_duration = 50;

const UNIQUE_UNIT = 'UNIQUE UNIT';
const ELITE_UNIQUE_UNIT = 'ELITE UNIQUE UNIT';
const UNIQUE_TECH_CASTLE_1 = 'UNIQUE TECH CASTLE 1';
const UNIQUE_TECH_CASTLE_2 = 'UNIQUE TECH CASTLE 2';
const UNIQUE_TECH_IMPERIAL_1 = 'UNIQUE TECH IMPERIAL 1';
const UNIQUE_TECH_IMPERIAL_2 = 'UNIQUE TECH IMPERIAL 2';
const MONK_SUFFIX_GENERIC = '_629';

// Buildings
const BARRACKS = 12;
const PORT = 2172;
const SHIPYARD = 2119;
const SIEGE_WORKSHOP = 49;
const FARM = 50;
const MILL = 68;
const HOUSE = 70;
const PALISADE_WALL = 72;
const WATCH_TOWER = 79;
const FORT = 82;
const MARKET = 84;
const ARCHERY_RANGE = 87;
const STABLE = 101;
const BLACKSMITH = 103;
const MONASTERY = 104;
const TOWN_CENTER = 109;
const STONE_WALL = 117;
const FORTIFIED_WALL = 155;
const FISH_TRAP = 199;
const UNIVERSITY = 209;
const GUARD_TOWER = 234;
const KEEP = 235;
const WONDER = 276;
const GATE = 487;
const LUMBER_CAMP = 562;
const MINING_CAMP = 584;
const OUTPOST = 598;
const TOWN_CENTER_2 = 621;
const PALISADE_GATE = 792;

// Archery Range
const ARCHER = 4;
const CROSSBOWMAN = 24;
const ARBALESTER = 492;
const SKIRMISHER = 7;
const ELITE_SKIRMISHER = 6;
const HAND_CANNONEER = 5;
const CAVALRY_ARCHER = 39;
const HEAVY_CAV_ARCHER = 474;
const PARTHIAN_TACTICS = 436;
const THUMB_RING = 437;

// Barracks
const MILITIA = 74;
const MAN_AT_ARMS = 75;
const LONG_SWORDSMAN = 77;
const CHAMPION = 567;
const SPEARMAN = 93;
const PIKEMAN = 358;
const HALBERDIER = 359;
const HOPLITE = 2110;
const ELITE_HOPLITE = 2111;
const ARSON = 602;
const SQUIRES = 215;
const BATTLE_DRILLS = 1173;
const SUPPLIES = 716;

// Stable
const SCOUT_CAVALRY = 448;
const LIGHT_CAVALRY = 546;
const HUSSAR = 441;
const KNIGHT = 38;
const CAVALIER = 283;
const PALADIN = 569;
const WAR_CHARIOT = 2150;
const ELITE_WAR_CHARIOT = 2151;
const HUSBANDRY = 39;
const BLOODLINES = 435;

// Siege Workshop
const SIEGE_TOWER = 1105;
const BATTERING_RAM = 1258;
const CAPPED_RAM = 422;
const SIEGE_RAM = 548;
const MANGONEL = 280;
const ONAGER = 550;
const SCORPION = 279;
const HEAVY_SCORPION = 542;

// Port
const FISHING_SHIP = 13;
const MERCHANT_SHIP = 2149;
const TRANSPORT_SHIP = 2148;
const SCOOP_NETS = 1161;
const SHIPWRIGHT = 1167;
const DRUMS = 1162;

const LEMBOS = 2123;
const WAR_LEMBOS = 2124;
const HEAVY_LEMBOS = 2125;
const ELITE_LEMBOS = 2126;

// Shipyard
const MONOREME = 2127;
const BIREME = 2128;
const TRIREME = 2129;
const GALLEY = 2130;
const WAR_GALLEY = 2131;
const ELITE_GALLEY = 2132;
const INCENDIARY_RAFT = 2133;
const INCENDIARY_SHIP = 2134;
const HEAVY_INCENDIARY_SHIP = 2135;
const CATAPULT_SHIP = 2138;
const ONAGER_SHIP = 2139;
const LEVIATHAN = 2140;
const HYPOZOMATA = 1165;

// Town Center
const VILLAGER = 83;
const LOOM = 22;
const TOWN_WATCH = 8;
const TOWN_PATROL = 280;
const FEUDAL_AGE = 101;
const CASTLE_AGE = 102;
const IMPERIAL_AGE = 103;
const WHEELBARROW = 213;
const HAND_CART = 249;
const POLEMARCH = 2162;

const TC_SPECIAL_TECHS_PLACEHOLDERS = ['Classical Age placeholder', 'Imperial Age placeholder 1',
    'Imperial Age placeholder 2', 'Imperial Age placeholder 3', 'Imperial Age placeholder 4'];
const TC_SPECIAL_TECHS_PLACEHOLDERS_IDS = TC_SPECIAL_TECHS_PLACEHOLDERS.map(name => name.toLowerCase().replace(/ /g, '_'));

// Market
const TRADE_CART = 128;
const GUILDS = 15;
const COINAGE = 23;
const BANKING = 17;
const CARAVAN = 48;

// Castle
const TREBUCHET = 331;
const CONSCRIPTION = 315;
const HOARDINGS = 379;
const SPIES_TREASON = 408;

// University
const CHEMISTRY = 47;
const MASONRY = 50;
const ARCHITECTURE = 51;
const TREADMILL_CRANE = 54;
const GUARD_TOWER_TECH = 140;
const KEEP_TECH = 63;
const FORTIFIED_WALL_TECH = 194;
const BALLISTICS = 93;
const ARROWSLITS = 608;
const MURDER_HOLES = 322;
const SIEGE_ENGINEERS = 377;
const HEATED_SHOT = 380;

// Economy
const HORSE_COLLAR = 14;
const HEAVY_PLOW = 13;
const CROP_ROTATION = 12;
const GOLD_MINING = 55;
const GOLD_SHAFT_MINING = 182;
const STONE_MINING = 278;
const STONE_SHAFT_MINING = 279;
const DOUBLE_BIT_AXE = 202;
const BOW_SAW = 203;
const TWO_MAN_SAW = 221;

// Monastery
const MONK = 125;
const FAITH = 45;
const BLOCK_PRINTING = 230;
const SANCTITY = 231;
const ILLUMINATION = 233;
const FERVOR = 252;
const REDEMPTION = 316;
const ATONEMENT = 319;
const THEOCRACY = 438;
const HERESY = 439;
const HERBAL_MEDICINE = 441;

// Blacksmith
const FLETCHING = 199;
const BODKIN_ARROW = 200;
const BRACER = 201;
const FORGING = 67;
const IRON_CASTING = 68;
const SCALE_MAIL_ARMOR = 74;
const BLAST_FURNACE = 75;
const CHAIN_MAIL_ARMOR = 76;
const PLATE_MAIL_ARMOR = 77;
const PLATE_BARDING_ARMOR = 80;
const SCALE_BARDING_ARMOR = 81;
const CHAIN_BARDING_ARMOR = 82;
const PADDED_ARCHER_ARMOR = 211;
const LEATHER_ARCHER_ARMOR = 212;
const RING_ARCHER_ARMOR = 219;

const BUILDING_INDEX = [
    ARCHERY_RANGE,
    BARRACKS,
    STABLE,
    SIEGE_WORKSHOP,
    BLACKSMITH,
    PORT,
    SHIPYARD,
    UNIVERSITY,
    FORT,
    MONASTERY,
    TOWN_CENTER,
    MARKET
];

class Tree {
    constructor() {
        this.offsets = {
            archaic_1_y: 0,
            archaic_2_y: 0,
            civic_1_y: 0,
            civic_2_y: 0,
            classical_1_y: 0,
            classical_2_y: 0,
            imperial_1_y: 0,
            imperial_2_y: 0
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

        this.offsets.archaic_1 = this.padding;
        this.offsets.archaic_2 = this.offsets.archaic_1 + this.element_height + element_offset;
        this.offsets.civic_1 = this.offsets.archaic_2 + this.element_height + element_offset;
        this.offsets.civic_2 = this.offsets.civic_1 + this.element_height + element_offset;
        this.offsets.classical_1 = this.offsets.civic_2 + this.element_height + element_offset;
        this.offsets.classical_2 = this.offsets.classical_1 + this.element_height + element_offset;
        this.offsets.imperial_1 = this.offsets.classical_2 + this.element_height + element_offset;
        this.offsets.imperial_2 = this.offsets.imperial_1 + this.element_height + element_offset;
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
            archaic_1: [],
            archaic_2: [],
            civic_1: [],
            civic_2: [],
            classical_1: [],
            classical_2: [],
            imperial_1: [],
            imperial_2: []
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
    constructor(type, name, id, colour = null) {
        this.type = type;
        this.name = name;
        this.id = PREFIX[type.type] + formatId(id);
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
        this.colour = colour;
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

function enable(shenanigans, buildings, units, techs) {
    for (let item of buildings) {
        SVG('#building_' + formatId(item.id) + '_x').attr({'opacity': 0});
        SVG('#building_' + formatId(item.id) + '_disabled_gray').attr({'opacity': 0});
    }
    for (let item of units) {
        try {
            SVG('#unit_' + formatId(item.id) + '_x').attr({'opacity': 0});
            SVG('#unit_' + formatId(item.id) + '_disabled_gray').attr({'opacity': 0});
        } catch (e) {
            console.log(item);
        }
    }
    for (let item of techs) {
        if (shenanigans.includes(item.id)) continue;
        try {
            SVG('#tech_' + formatId(item.id) + '_x').attr({'opacity': 0});
            SVG('#tech_' + formatId(item.id) + '_disabled_gray').attr({'opacity': 0});
        } catch (e) {
            console.log(item);
        }
    }
}

/**
 * @param civ
 * @return {number[]}
 */
function find_shenanigans(civ) {
    switch (civ) {
        case 'Achaemenids': return [null, 1195, 1196, 1197, null];
        case 'Athenians': return [null, 1202, 1203, 1204, null];
        case 'Spartans': return [1225, 1223, 1224, null, 1226];
        default: return [null, null, null, null, null];
    }
}

function applyEarlierAges(selectedCiv, shenanigans) {
    SVG.find('.earlier-age').each(function () {
        let {id, type, ageId} = parseSVGObjectId2(this.id());
        if (id === undefined || type === undefined || ageId === undefined) {
            console.error("Could not process: ", this.id());
            return;
        }
        const index = TC_SPECIAL_TECHS_PLACEHOLDERS_IDS.indexOf(id);
        if (index !== -1) {
            id = shenanigans[index];
        }

        let earlyItem;
        switch (type) {
            case 'unit': earlyItem = selectedCiv.units.find((item) => item.id === id && item.age <= ageId);
                break;
            case 'building': earlyItem = selectedCiv.buildings.find((item) => item.id === id && item.age <= ageId);
                break;
            case 'tech': earlyItem = selectedCiv.techs.find((item) => item.id === id && item.age <= ageId);
        }
        if (earlyItem) {
            getShieldForEarlierAge(this, earlyItem.age);
            return;
        }
        if (SVGObjectIsOpaque(this)) {
            makeSVGObjectOpaque(this, 0);
        }
    });
}

function applySelectedCiv(selectedCiv) {
    const shenanigans = find_shenanigans(selectedCiv.name);
    applyEarlierAges(selectedCiv, shenanigans);
    enable(shenanigans, selectedCiv.buildings,
        [...selectedCiv.units, {id:UNIQUE_UNIT, age: 3}, {id: ELITE_UNIQUE_UNIT, age: 4}],
        [...selectedCiv.techs, {id: UNIQUE_TECH_CASTLE_1, age: 3}, {id: UNIQUE_TECH_CASTLE_2, age: 3}, {id: UNIQUE_TECH_IMPERIAL_1, age: 4}, {id: UNIQUE_TECH_IMPERIAL_2, age: 4}]);
    unique([selectedCiv.unique.classicalAgeUniqueUnit,
        selectedCiv.unique.imperialAgeUniqueUnit,
        selectedCiv.unique.classicalAgeUniqueTech1,
        selectedCiv.unique.classicalAgeUniqueTech2,
        selectedCiv.unique.imperialAgeUniqueTech1,
        selectedCiv.unique.imperialAgeUniqueTech2], selectedCiv.monkSuffix, shenanigans);
}

function formatName(originalname) {
    if (!originalname) return "";
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

function unique(ids, monk_suffix, shenanigans) {
    monk_suffix = monk_suffix || MONK_SUFFIX_GENERIC;
    try {
        SVG('#unit_' + formatId(MONK) + '_img').load('img/Units/' + '125' + monk_suffix + '.png');
        SVG('#unit_' + formatId(UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(ids[0]) + '.png');
        SVG('#unit_' + formatId(ELITE_UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(ids[1]) + '.png');
        SVG('#unit_' + formatId(UNIQUE_UNIT) + '_text').text(formatName(data.strings[data.data.units[ids[0]].LanguageNameId]));
        SVG('#unit_' + formatId(UNIQUE_UNIT) + '_overlay').data({'name': data.strings[data.data.units[ids[0]].LanguageNameId], 'id':'unit_'+ids[0]});
        SVG('#unit_' + formatId(ELITE_UNIQUE_UNIT) + '_text').text(formatName(data.strings[data.data.units[ids[1]].LanguageNameId]));
        SVG('#unit_' + formatId(ELITE_UNIQUE_UNIT) + '_overlay').data({'name': data.strings[data.data.units[ids[1]].LanguageNameId], 'id':'unit_'+ids[1]});
        SVG('#tech_' + formatId(UNIQUE_TECH_CASTLE_1) + '_text').text(formatName(data.strings[data.data.techs[ids[2]].LanguageNameId]));
        SVG('#tech_' + formatId(UNIQUE_TECH_CASTLE_1) + '_overlay').data({'name': data.strings[data.data.techs[ids[2]].LanguageNameId], 'id':'tech_'+ids[2]});
        SVG('#tech_' + formatId(UNIQUE_TECH_CASTLE_2) + '_text').text(formatName(data.strings[data.data.techs[ids[3]].LanguageNameId]));
        SVG('#tech_' + formatId(UNIQUE_TECH_CASTLE_2) + '_overlay').data({'name': data.strings[data.data.techs[ids[3]].LanguageNameId], 'id':'tech_'+ids[3]});
        SVG('#tech_' + formatId(UNIQUE_TECH_IMPERIAL_1) + '_text').text(formatName(data.strings[data.data.techs[ids[4]].LanguageNameId]));
        SVG('#tech_' + formatId(UNIQUE_TECH_IMPERIAL_1) + '_overlay').data({'name': data.strings[data.data.techs[ids[4]].LanguageNameId], 'id':'tech_'+ids[4]});
        SVG('#tech_' + formatId(UNIQUE_TECH_IMPERIAL_2) + '_text').text(formatName(data.strings[data.data.techs[ids[5]].LanguageNameId]));
        SVG('#tech_' + formatId(UNIQUE_TECH_IMPERIAL_2) + '_overlay').data({'name': data.strings[data.data.techs[ids[5]].LanguageNameId], 'id':'tech_'+ids[5]});

        for (let i = 0; i < TC_SPECIAL_TECHS_PLACEHOLDERS.length; i++) {
            const formattedId = formatId(TC_SPECIAL_TECHS_PLACEHOLDERS[i]);
            if (shenanigans[i] == null) {
                SVG('#tech_' + formattedId + '_img').load('img/cross.png');
                SVG('#tech_' + formattedId + '_text').text("");
                SVG('#tech_' + formattedId + '_overlay').data({'name': TC_SPECIAL_TECHS_PLACEHOLDERS[i], 'id':'tech_'+shenanigans[i]});
                SVG('#tech_' + formattedId + '_x').attr({'opacity': 1});
                SVG('#tech_' + formattedId + '_disabled_gray').attr({'opacity': 1});
            } else {
                SVG('#tech_' + formattedId + '_img').load('img/Techs/' + formatId(shenanigans[i]) + '.png');
                SVG('#tech_' + formattedId + '_text').text(formatName(data.strings[data.data.techs[shenanigans[i]].LanguageNameId]));
                SVG('#tech_' + formattedId + '_overlay').data({'name': data.strings[data.data.techs[shenanigans[i]].LanguageNameId], 'id':'tech_'+shenanigans[i]});
                SVG('#tech_' + formattedId + '_x').attr({'opacity': 0});
                SVG('#tech_' + formattedId + '_disabled_gray').attr({'opacity': 0});
            }
        }
    } catch (e) {
        console.log(ids);
    }
}

function getName(id, itemtype) {
    if (typeof id === 'string' && id.includes("placeholder")) return;
    //ToDo handle unique stuff properly
    if(id.toString().startsWith('UNIQUE')){
        return id;
    }
    try {
        const languageNameId = data['data'][itemtype][id]['LanguageNameId'];
        return data['strings'][languageNameId];
    } catch {
        console.log(id, itemtype);
    }
}

function getColour(id, itemtype) {
    const nodeType = data['data']['node_types'][itemtype][id];
    if (!nodeType) {
        return null;
    }
    return getColourForNodeType(nodeType);
}

function getColourForNodeType(nodeType) {
    switch (nodeType) {
        case 'BuildingTech':
        case 'BuildingNonTech':
            return '#b54e18';
        case 'RegionalBuilding':
            return '#cc4422';
        case 'UniqueBuilding':
            return '#d43652';
        case 'Unit':
        case 'UnitUpgrade':
            return '#00739c';
        case 'RegionalUnit':
            return '#515ae3';
        case 'UniqueUnit':
            return '#703b7a';
        case 'Technology':
            return '#397139';
        default:
            return '#ff0000';
    }
}

function building(id) {
    return new Caret(TYPES.BUILDING, getName(id, 'buildings'), id, getColour(id, 'buildings'));
}

function unit(id) {
    return new Caret(TYPES.UNIT, getName(id, 'units'), id, getColour(id, 'units'));
}

function tech(id) {
    return new Caret(TYPES.TECHNOLOGY, getName(id, 'techs'), id);
}

function getDefaultTree() {
    let tree = new Tree();
    tree.updateOffsets();

    let archerylane = new Lane();
    archerylane.rows.civic_1.push(building(ARCHERY_RANGE));
    archerylane.rows.civic_2.push(unit(ARCHER));
    archerylane.rows.civic_2.push(unit(SKIRMISHER));
    archerylane.rows.classical_1.push(unit(CROSSBOWMAN));
    archerylane.rows.classical_1.push(unit(ELITE_SKIRMISHER));
    archerylane.rows.classical_1.push(unit(CAVALRY_ARCHER));
    archerylane.rows.classical_1.push(tech(THUMB_RING));
    archerylane.rows.imperial_1.push(unit(ARBALESTER));
    archerylane.rows.imperial_1.push(unit(HAND_CANNONEER));
    archerylane.rows.imperial_1.push(unit(HEAVY_CAV_ARCHER));
    archerylane.rows.imperial_1.push(tech(PARTHIAN_TACTICS));
    tree.lanes.push(archerylane);


    let barrackslane = new Lane();
    barrackslane.rows.archaic_1.push(building(BARRACKS));
    barrackslane.rows.archaic_2.push(unit(MILITIA));
    barrackslane.rows.civic_1.push(unit(MAN_AT_ARMS));
    barrackslane.rows.civic_1.push(unit(SPEARMAN));
    barrackslane.rows.civic_1.push(tech(ARSON));
    barrackslane.rows.civic_1.push(tech(SUPPLIES));
    barrackslane.rows.classical_1.push(unit(LONG_SWORDSMAN));
    barrackslane.rows.classical_1.push(unit(PIKEMAN));
    barrackslane.rows.classical_1.push(tech(SQUIRES));
    barrackslane.rows.classical_1.push(unit(HOPLITE));
    barrackslane.rows.imperial_1.push(unit(CHAMPION));
    barrackslane.rows.imperial_1.push(unit(HALBERDIER));
    barrackslane.rows.imperial_1.push(tech(BATTLE_DRILLS));
    barrackslane.rows.imperial_1.push(unit(ELITE_HOPLITE));
    tree.lanes.push(barrackslane);


    let stablelane = new Lane();
    stablelane.rows.civic_1.push(building(STABLE));
    stablelane.rows.civic_2.push(unit(SCOUT_CAVALRY));
    stablelane.rows.civic_2.push(tech(BLOODLINES));
    stablelane.rows.classical_1.push(unit(LIGHT_CAVALRY));
    stablelane.rows.classical_1.push(unit(KNIGHT));
    stablelane.rows.classical_1.push(unit(WAR_CHARIOT));
    stablelane.rows.classical_1.push(tech(HUSBANDRY));
    stablelane.rows.imperial_1.push(unit(HUSSAR));
    stablelane.rows.imperial_1.push(unit(CAVALIER));
    stablelane.rows.imperial_1.push(unit(ELITE_WAR_CHARIOT));
    stablelane.rows.imperial_2.push(unit(PALADIN));
    tree.lanes.push(stablelane);


    let siegeworkshoplane = new Lane();
    siegeworkshoplane.rows.classical_1.push(building(SIEGE_WORKSHOP));
    siegeworkshoplane.rows.classical_2.push(unit(BATTERING_RAM));
    siegeworkshoplane.rows.classical_2.push(unit(MANGONEL));
    siegeworkshoplane.rows.classical_2.push(unit(SCORPION));
    siegeworkshoplane.rows.classical_2.push(unit(SIEGE_TOWER));
    siegeworkshoplane.rows.imperial_1.push(unit(CAPPED_RAM));
    siegeworkshoplane.rows.imperial_1.push(unit(ONAGER));
    siegeworkshoplane.rows.imperial_1.push(unit(HEAVY_SCORPION));
    siegeworkshoplane.rows.imperial_2.push(unit(SIEGE_RAM));
    tree.lanes.push(siegeworkshoplane);


    let blacksmithlane = new Lane();
    blacksmithlane.rows.civic_1.push(building(BLACKSMITH));
    blacksmithlane.rows.civic_2.push(tech(PADDED_ARCHER_ARMOR));
    blacksmithlane.rows.civic_2.push(tech(FLETCHING));
    blacksmithlane.rows.civic_2.push(tech(FORGING));
    blacksmithlane.rows.civic_2.push(tech(SCALE_BARDING_ARMOR));
    blacksmithlane.rows.civic_2.push(tech(SCALE_MAIL_ARMOR));
    blacksmithlane.rows.classical_1.push(tech(LEATHER_ARCHER_ARMOR));
    blacksmithlane.rows.classical_1.push(tech(BODKIN_ARROW));
    blacksmithlane.rows.classical_1.push(tech(IRON_CASTING));
    blacksmithlane.rows.classical_1.push(tech(CHAIN_BARDING_ARMOR));
    blacksmithlane.rows.classical_1.push(tech(CHAIN_MAIL_ARMOR));
    blacksmithlane.rows.imperial_1.push(tech(RING_ARCHER_ARMOR));
    blacksmithlane.rows.imperial_1.push(tech(BRACER));
    blacksmithlane.rows.imperial_1.push(tech(BLAST_FURNACE));
    blacksmithlane.rows.imperial_1.push(tech(PLATE_BARDING_ARMOR));
    blacksmithlane.rows.imperial_1.push(tech(PLATE_MAIL_ARMOR));
    tree.lanes.push(blacksmithlane);

    let portlane = new Lane();
    portlane.rows.archaic_1.push(building(PORT));
    portlane.rows.archaic_2.push(unit(LEMBOS));
    portlane.rows.archaic_2.push(unit(FISHING_SHIP));
    portlane.rows.archaic_2.push(unit(TRANSPORT_SHIP));
    portlane.rows.civic_1.push(unit(WAR_LEMBOS));
    portlane.rows.civic_1.push(building(FISH_TRAP));
    portlane.rows.civic_1.push(unit(MERCHANT_SHIP));
    portlane.rows.classical_1.push(unit(HEAVY_LEMBOS));
    portlane.rows.classical_1.push(tech(SCOOP_NETS));
    portlane.rows.classical_1.push(tech(DRUMS));
    portlane.rows.imperial_1.push(unit(ELITE_LEMBOS));
    portlane.rows.imperial_1.push(tech(SHIPWRIGHT));
    tree.lanes.push(portlane);


    let shipyardlane = new Lane();
    shipyardlane.rows.civic_1.push(building(SHIPYARD));
    shipyardlane.rows.civic_2.push(unit(MONOREME));
    shipyardlane.rows.civic_2.push(unit(GALLEY));
    shipyardlane.rows.civic_2.push(unit(INCENDIARY_RAFT));
    shipyardlane.rows.classical_1.push(unit(BIREME));
    shipyardlane.rows.classical_1.push(unit(WAR_GALLEY));
    shipyardlane.rows.classical_1.push(unit(INCENDIARY_SHIP));
    shipyardlane.rows.classical_1.push(unit(CATAPULT_SHIP));
    shipyardlane.rows.classical_1.push(tech(HYPOZOMATA));
    shipyardlane.rows.imperial_1.push(unit(TRIREME));
    shipyardlane.rows.imperial_1.push(unit(ELITE_GALLEY));
    shipyardlane.rows.imperial_1.push(unit(HEAVY_INCENDIARY_SHIP));
    shipyardlane.rows.imperial_1.push(unit(ONAGER_SHIP));
    shipyardlane.rows.imperial_1.push(unit(LEVIATHAN));
    tree.lanes.push(shipyardlane);


    let universitylane = new Lane();
    universitylane.rows.classical_1.push(building(UNIVERSITY));
    universitylane.rows.classical_2.push(tech(MASONRY));
    universitylane.rows.classical_2.push(tech(FORTIFIED_WALL_TECH));
    universitylane.rows.classical_2.push(tech(BALLISTICS));
    universitylane.rows.classical_2.push(tech(GUARD_TOWER_TECH));
    universitylane.rows.classical_2.push(tech(HEATED_SHOT));
    universitylane.rows.classical_2.push(tech(MURDER_HOLES));
    universitylane.rows.classical_2.push(tech(TREADMILL_CRANE));
    universitylane.rows.imperial_1.push(tech(ARCHITECTURE));
    universitylane.rows.imperial_1.push(tech(CHEMISTRY));
    universitylane.rows.imperial_1.push(tech(SIEGE_ENGINEERS));
    universitylane.rows.imperial_1.push(tech(KEEP_TECH));
    universitylane.rows.imperial_1.push(tech(ARROWSLITS));
    tree.lanes.push(universitylane);


    let towerlane = new Lane();
    towerlane.rows.archaic_1.push(building(OUTPOST));
    towerlane.rows.civic_1.push(building(WATCH_TOWER));
    towerlane.rows.classical_1.push(building(GUARD_TOWER));
    towerlane.rows.imperial_1.push(building(KEEP));
    tree.lanes.push(towerlane);


    let walllane = new Lane();
    walllane.rows.archaic_1.push(building(PALISADE_WALL));
    walllane.rows.archaic_2.push(building(PALISADE_GATE));
    walllane.rows.civic_1.push(building(GATE));
    walllane.rows.civic_2.push(building(STONE_WALL));
    walllane.rows.classical_1.push(building(FORTIFIED_WALL));
    tree.lanes.push(walllane);


    let classicallane = new Lane();
    classicallane.rows.classical_1.push(building(FORT));
    classicallane.rows.classical_2.push(new Caret(TYPES.UNIQUEUNIT, UNIQUE_UNIT, UNIQUE_UNIT));
    classicallane.rows.classical_2.push(tech(UNIQUE_TECH_CASTLE_1));
    classicallane.rows.classical_2.push(tech(UNIQUE_TECH_CASTLE_2));
    classicallane.rows.imperial_1.push(new Caret(TYPES.UNIQUEUNIT, ELITE_UNIQUE_UNIT, ELITE_UNIQUE_UNIT));
    classicallane.rows.imperial_1.push(tech(UNIQUE_TECH_IMPERIAL_1));
    classicallane.rows.imperial_1.push(tech(UNIQUE_TECH_IMPERIAL_2));
    classicallane.rows.imperial_1.push(tech(SPIES_TREASON));
    classicallane.rows.imperial_2.push(unit(TREBUCHET));
    classicallane.rows.imperial_2.push(tech(HOARDINGS));
    classicallane.rows.imperial_2.push(tech(CONSCRIPTION));
    tree.lanes.push(classicallane);


    let monasterylane = new Lane();
    monasterylane.rows.classical_1.push(building(MONASTERY));
    monasterylane.rows.classical_2.push(unit(MONK));
    monasterylane.rows.classical_2.push(tech(REDEMPTION));
    monasterylane.rows.classical_2.push(tech(ATONEMENT));
    monasterylane.rows.classical_2.push(tech(HERBAL_MEDICINE));
    monasterylane.rows.classical_2.push(tech(HERESY));
    monasterylane.rows.classical_2.push(tech(SANCTITY));
    monasterylane.rows.classical_2.push(tech(FERVOR));
    monasterylane.rows.imperial_1.push(tech(ILLUMINATION));
    monasterylane.rows.imperial_1.push(tech(BLOCK_PRINTING));
    monasterylane.rows.imperial_1.push(tech(FAITH));
    monasterylane.rows.imperial_1.push(tech(THEOCRACY));
    tree.lanes.push(monasterylane);

    let towncenterlane = new Lane();
    towncenterlane.rows.archaic_1.push(building(TOWN_CENTER));
    towncenterlane.rows.archaic_2.push(unit(VILLAGER));
    towncenterlane.rows.archaic_2.push(tech(FEUDAL_AGE));
    towncenterlane.rows.archaic_2.push(tech(LOOM));
    towncenterlane.rows.civic_1.push(tech(TOWN_WATCH));
    towncenterlane.rows.civic_1.push(tech(CASTLE_AGE));
    towncenterlane.rows.civic_1.push(tech(WHEELBARROW));
    towncenterlane.rows.civic_1.push(unit(POLEMARCH));
    towncenterlane.rows.classical_1.push(tech(TOWN_PATROL));
    towncenterlane.rows.classical_1.push(tech(IMPERIAL_AGE));
    towncenterlane.rows.classical_1.push(tech(HAND_CART));
    towncenterlane.rows.classical_1.push(tech(TC_SPECIAL_TECHS_PLACEHOLDERS[0]));
    towncenterlane.rows.imperial_1.push(tech(TC_SPECIAL_TECHS_PLACEHOLDERS[1]));
    towncenterlane.rows.imperial_1.push(tech(TC_SPECIAL_TECHS_PLACEHOLDERS[2]));
    towncenterlane.rows.imperial_1.push(tech(TC_SPECIAL_TECHS_PLACEHOLDERS[3]));
    towncenterlane.rows.imperial_1.push(tech(TC_SPECIAL_TECHS_PLACEHOLDERS[4]));
    tree.lanes.push(towncenterlane);


    let additionaltowncenterlane = new Lane();
    additionaltowncenterlane.rows.archaic_1.push(building(HOUSE));
    additionaltowncenterlane.rows.classical_1.push(building(TOWN_CENTER_2));
    additionaltowncenterlane.rows.imperial_1.push(building(WONDER));
    tree.lanes.push(additionaltowncenterlane);


    let miningcamplane = new Lane();
    miningcamplane.rows.archaic_1.push(building(MINING_CAMP));
    miningcamplane.rows.civic_1.push(tech(GOLD_MINING));
    miningcamplane.rows.civic_1.push(tech(STONE_MINING));
    miningcamplane.rows.classical_1.push(tech(GOLD_SHAFT_MINING));
    miningcamplane.rows.classical_1.push(tech(STONE_SHAFT_MINING));
    tree.lanes.push(miningcamplane);


    let lumbercamplane = new Lane();
    lumbercamplane.rows.archaic_1.push(building(LUMBER_CAMP));
    lumbercamplane.rows.civic_1.push(tech(DOUBLE_BIT_AXE));
    lumbercamplane.rows.classical_1.push(tech(BOW_SAW));
    lumbercamplane.rows.imperial_1.push(tech(TWO_MAN_SAW));
    tree.lanes.push(lumbercamplane);


    let marketlane = new Lane();
    marketlane.rows.civic_1.push(building(MARKET));
    marketlane.rows.civic_2.push(unit(TRADE_CART));
    marketlane.rows.classical_1.push(tech(COINAGE));
    marketlane.rows.classical_1.push(tech(CARAVAN));
    marketlane.rows.imperial_1.push(tech(BANKING));
    marketlane.rows.imperial_1.push(tech(GUILDS));
    tree.lanes.push(marketlane);


    let milllane = new Lane();
    milllane.rows.archaic_1.push(building(MILL));
    milllane.rows.archaic_2.push(building(FARM));
    milllane.rows.civic_1.push(tech(HORSE_COLLAR));
    milllane.rows.classical_1.push(tech(HEAVY_PLOW));
    milllane.rows.imperial_1.push(tech(CROP_ROTATION));
    tree.lanes.push(milllane);


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
        [b(ARCHERY_RANGE), u(ARCHER)],
        [u(ARCHER), u(CROSSBOWMAN)],
        [u(CROSSBOWMAN), u(ARBALESTER)],
        [b(ARCHERY_RANGE), u(SKIRMISHER)],
        [u(SKIRMISHER), u(ELITE_SKIRMISHER)],
        [b(ARCHERY_RANGE), u(CAVALRY_ARCHER)],
        [u(CAVALRY_ARCHER), u(HEAVY_CAV_ARCHER)],
        [b(ARCHERY_RANGE), t(THUMB_RING)],
        [b(BARRACKS), b(ARCHERY_RANGE)],
        [b(BARRACKS), b(STABLE)],
        [b(BARRACKS), u(MILITIA)],
        [u(MILITIA), u(MAN_AT_ARMS)],
        [u(MAN_AT_ARMS), u(LONG_SWORDSMAN)],
        [u(LONG_SWORDSMAN), u(CHAMPION)],
        [b(BARRACKS), u(SPEARMAN)],
        [u(SPEARMAN), u(PIKEMAN)],
        [u(PIKEMAN), u(HALBERDIER)],
        [b(BARRACKS), t(SUPPLIES)],
        [u(HOPLITE), u(ELITE_HOPLITE)],
        [b(BARRACKS), t(ARSON)],
        [b(STABLE), u(SCOUT_CAVALRY)],
        [u(SCOUT_CAVALRY), u(LIGHT_CAVALRY)],
        [u(LIGHT_CAVALRY), u(HUSSAR)],
        [b(STABLE), t(BLOODLINES)],
        [b(STABLE), u(WAR_CHARIOT)],
        [u(WAR_CHARIOT), u(ELITE_WAR_CHARIOT)],
        [b(STABLE), t(HUSBANDRY)],
        [u(KNIGHT), u(CAVALIER)],
        [u(CAVALIER), u(PALADIN)],
        [b(PORT), u(FISHING_SHIP)],
        [b(PORT), u(TRANSPORT_SHIP)],
        [b(PORT), u(LEMBOS)],
        [u(LEMBOS), u(WAR_LEMBOS)],
        [u(WAR_LEMBOS), u(HEAVY_LEMBOS)],
        [u(HEAVY_LEMBOS), u(ELITE_LEMBOS)],
        [b(SHIPYARD), u(MONOREME)],
        [u(MONOREME), u(BIREME)],
        [u(BIREME), u(TRIREME)],
        [b(SHIPYARD), u(INCENDIARY_RAFT)],
        [u(INCENDIARY_RAFT), u(INCENDIARY_SHIP)],
        [u(INCENDIARY_SHIP), u(HEAVY_INCENDIARY_SHIP)],
        [b(SHIPYARD), u(GALLEY)],
        [u(GALLEY), u(WAR_GALLEY)],
        [u(WAR_GALLEY), u(ELITE_GALLEY)],
        [b(SHIPYARD), t(HYPOZOMATA)],
        [u(CATAPULT_SHIP), u(ONAGER_SHIP)],
        [b(WATCH_TOWER), b(GUARD_TOWER)],
        [b(GUARD_TOWER), b(KEEP)],
        [b(STONE_WALL), b(FORTIFIED_WALL)],
        [b(MONASTERY), u(MONK)],
        [b(MONASTERY), t(REDEMPTION)],
        [b(MONASTERY), t(ATONEMENT)],
        [b(MONASTERY), t(HERBAL_MEDICINE)],
        [b(MONASTERY), t(HERESY)],
        [b(MONASTERY), t(SANCTITY)],
        [b(MONASTERY), t(FERVOR)],
        [b(FORT), u(UNIQUE_UNIT)],
        [u(UNIQUE_UNIT), u(ELITE_UNIQUE_UNIT)],
        [b(FORT), t(UNIQUE_TECH_CASTLE_1)],
        [b(FORT), t(UNIQUE_TECH_CASTLE_2)],
        [b(FORT), t(SPIES_TREASON)],
        [b(TOWN_CENTER), u(VILLAGER)],
        [b(TOWN_CENTER), u(POLEMARCH)],
        [t(TC_SPECIAL_TECHS_PLACEHOLDERS[0]), t(TC_SPECIAL_TECHS_PLACEHOLDERS[4])],
        [b(TOWN_CENTER), t(FEUDAL_AGE)],
        [t(FEUDAL_AGE), t(CASTLE_AGE)],
        [t(CASTLE_AGE), t(IMPERIAL_AGE)],
        [b(TOWN_CENTER), t(LOOM)],
        [t(TOWN_WATCH), t(TOWN_PATROL)],
        [t(WHEELBARROW), t(HAND_CART)],
        [b(SIEGE_WORKSHOP), u(MANGONEL)],
        [u(MANGONEL), u(ONAGER)],
        [b(SIEGE_WORKSHOP), u(BATTERING_RAM)],
        [u(BATTERING_RAM), u(CAPPED_RAM)],
        [u(CAPPED_RAM), u(SIEGE_RAM)],
        [b(SIEGE_WORKSHOP), u(SCORPION)],
        [u(SCORPION), u(HEAVY_SCORPION)],
        [b(SIEGE_WORKSHOP), u(SIEGE_TOWER)],
        [b(BLACKSMITH), b(SIEGE_WORKSHOP)],
        [b(BLACKSMITH), t(PADDED_ARCHER_ARMOR)],
        [t(PADDED_ARCHER_ARMOR), t(LEATHER_ARCHER_ARMOR)],
        [t(LEATHER_ARCHER_ARMOR), t(RING_ARCHER_ARMOR)],
        [b(BLACKSMITH), t(FLETCHING)],
        [t(FLETCHING), t(BODKIN_ARROW)],
        [t(BODKIN_ARROW), t(BRACER)],
        [b(BLACKSMITH), t(FORGING)],
        [t(FORGING), t(IRON_CASTING)],
        [t(IRON_CASTING), t(BLAST_FURNACE)],
        [b(BLACKSMITH), t(SCALE_BARDING_ARMOR)],
        [t(SCALE_BARDING_ARMOR), t(CHAIN_BARDING_ARMOR)],
        [t(CHAIN_BARDING_ARMOR), t(PLATE_BARDING_ARMOR)],
        [b(BLACKSMITH), t(SCALE_MAIL_ARMOR)],
        [t(SCALE_MAIL_ARMOR), t(CHAIN_MAIL_ARMOR)],
        [t(CHAIN_MAIL_ARMOR), t(PLATE_MAIL_ARMOR)],
        [b(UNIVERSITY), t(MASONRY)],
        [t(MASONRY), t(ARCHITECTURE)],
        [b(UNIVERSITY), t(FORTIFIED_WALL_TECH)],
        [b(UNIVERSITY), t(BALLISTICS)],
        [b(UNIVERSITY), t(GUARD_TOWER_TECH)],
        [t(GUARD_TOWER_TECH), t(KEEP_TECH)],
        [b(UNIVERSITY), t(HEATED_SHOT)],
        [b(UNIVERSITY), t(MURDER_HOLES)],
        [b(UNIVERSITY), t(TREADMILL_CRANE)],
        [b(MINING_CAMP), t(STONE_MINING)],
        [t(STONE_MINING), t(STONE_SHAFT_MINING)],
        [b(MINING_CAMP), t(GOLD_MINING)],
        [t(GOLD_MINING), t(GOLD_SHAFT_MINING)],
        [b(LUMBER_CAMP), t(DOUBLE_BIT_AXE)],
        [t(DOUBLE_BIT_AXE), t(BOW_SAW)],
        [t(BOW_SAW), t(TWO_MAN_SAW)],
        [b(MARKET), t(CARAVAN)],
        [t(COINAGE), t(BANKING)],
        [b(MARKET), u(TRADE_CART)],
        [b(MILL), b(MARKET)],
        [b(MILL), t(HORSE_COLLAR)],
        [t(HORSE_COLLAR), t(HEAVY_PLOW)],
        [t(HEAVY_PLOW), t(CROP_ROTATION)],
        [b(MILL), b(FARM)],
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
