var TYPES = Object.freeze({
    "BUILDING": {colour: '#922602', type: 'BUILDING', name: 'Building'},
    "UNIT": {colour: '#3a6a80', type: 'UNIT', name: 'Unit'},
    "UNIQUEUNIT": {colour: '#af30a3', type: 'UNIQUEUNIT', name: 'Unique Unit'},
    "TECHNOLOGY": {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'}
});

var PREFIX = Object.freeze({
    "BUILDING": 'building_',
    "UNIT": 'unit_',
    "UNIQUEUNIT": 'unit_',
    "TECHNOLOGY": 'tech_'
});

var animation_duration = 50;

const UNIQUE_UNIT = "UNIQUE UNIT";
const ELITE_UNIQUE_UNIT = "ELITE UNIQUE UNIT";
const UNIQUE_TECH_1 = "UNIQUE TECH 1";
const UNIQUE_TECH_2 = "UNIQUE TECH 2";
const MONK_PREFIX_MESO = "meso_";
const MONK_PREFIX_AFRICAN = "african_";
const MONK_PREFIX_ASIAN = "asian_";
const MONK_PREFIX_GENERIC = "";
const BARRACKS = 12;
const DOCK = 45;
const SIEGE_WORKSHOP = 49;
const FARM = 50;
const MILL = 68;
const HOUSE = 70;
const TOWN_CENTER = 71;
const PALISADE_WALL = 72;
const GATE = 78;
const WATCH_TOWER = 79;
const CASTLE = 82;
const MARKET = 84;
const ARCHERY_RANGE = 87;
const STABLE = 101;
const BLACKSMITH = 103;
const MONASTERY = 104;
const STONE_WALL = 117;
const FORTIFIED_WALL = 155;
const FISH_TRAP = 199;
const UNIVERSITY = 209;
const GUARD_TOWER = 234;
const KEEP = 235;
const BOMBARD_TOWER = 236;
const WONDER = 276;
const LUMBER_CAMP = 562;
const MINING_CAMP = 584;
const OUTPOST = 598;
const PALISADE_GATE = 790;
const FEITORIA = 1021;
const KREPOST = 1251;
const ARCHER = 4;
const HAND_CANNONEER = 5;
const ELITE_SKIRMISHER = 6;
const SKIRMISHER = 7;
const LONGBOWMAN = 8;
const MANGUDAI = 11;
const FISHING_SHIP = 13;
const TRADE_COG = 17;
const WAR_GALLEY = 21;
const CROSSBOWMAN = 24;
const TEUTONIC_KNIGHT = 25;
const BATTERING_RAM = 35;
const BOMBARD_CANNON = 36;
const KNIGHT = 38;
const CAVALRY_ARCHER = 39;
const CATAPHRACT = 40;
const HUSKARL = 41;
const TREBUCHET = 42;
const JANISSARY = 46;
const CHU_KO_NU = 73;
const MILITIA = 74;
const MAN_AT_ARMS = 75;
const LONG_SWORDSMAN = 77;
const VILLAGER = 83;
const SPEARMAN = 93;
const MONK = 125;
const TRADE_CART = 128;
const SLINGER = 185;
const IMPERIAL_CAMEL_RIDER = 207;
const WOAD_RAIDER = 232;
const WAR_ELEPHANT = 239;
const LONGBOAT = 250;
const SCORPION = 279;
const MANGONEL = 280;
const THROWING_AXEMAN = 281;
const MAMELUKE = 282;
const CAVALIER = 283;
const SAMURAI = 291;
const CAMEL_RIDER = 329;
const HEAVY_CAMEL_RIDER = 330;
const PIKEMAN = 358;
const HALBERDIER = 359;
const CANNON_GALLEON = 420;
const CAPPED_RAM = 422;
const PETARD = 440;
const HUSSAR = 441;
const GALLEON = 442;
const SCOUT_CAVALRY = 448;
const TWO_HANDED_SWORDSMAN = 473;
const HEAVY_CAV_ARCHER = 474;
const ARBALESTER = 492;
const DEMOLITION_SHIP = 527;
const HEAVY_DEMO_SHIP = 528;
const FIRE_SHIP = 529;
const ELITE_LONGBOWMAN = 530;
const ELITE_THROWING_AXEMAN = 531;
const FAST_FIRE_SHIP = 532;
const ELITE_LONGBOAT = 533;
const ELITE_WOAD_RAIDER = 534;
const GALLEY = 539;
const HEAVY_SCORPION = 542;
const TRANSPORT_SHIP = 545;
const LIGHT_CAVALRY = 546;
const SIEGE_RAM = 548;
const ONAGER = 550;
const ELITE_CATAPHRACT = 553;
const ELITE_TEUTONIC_KNIGHT = 554;
const ELITE_HUSKARL = 555;
const ELITE_MAMELUKE = 556;
const ELITE_JANISSARY = 557;
const ELITE_WAR_ELEPHANT = 558;
const ELITE_CHU_KO_NU = 559;
const ELITE_SAMURAI = 560;
const ELITE_MANGUDAI = 561;
const CHAMPION = 567;
const PALADIN = 569;
const SIEGE_ONAGER = 588;
const ELITE_CANNON_GALLEON = 691;
const BERSERK = 692;
const ELITE_BERSERK = 694;
const JAGUAR_WARRIOR = 725;
const ELITE_JAGUAR_WARRIOR = 726;
const EAGLE_SCOUT = 751;
const ELITE_EAGLE_WARRIOR = 752;
const EAGLE_WARRIOR = 753;
const TARKAN = 755;
const ELITE_TARKAN = 757;
const PLUMED_ARCHER = 763;
const ELITE_PLUMED_ARCHER = 765;
const CONQUISTADOR = 771;
const ELITE_CONQUISTADOR = 773;
const MISSIONARY = 775;
const WAR_WAGON = 827;
const ELITE_WAR_WAGON = 829;
const TURTLE_SHIP = 831;
const ELITE_TURTLE_SHIP = 832;
const GENOESE_CROSSBOWMAN = 866;
const ELITE_GENOESE_CROSSBOWMAN = 868;
const MAGYAR_HUSZAR = 869;
const ELITE_MAGYAR_HUSZAR = 871;
const ELEPHANT_ARCHER = 873;
const ELITE_ELEPHANT_ARCHER = 875;
const BOYAR = 876;
const ELITE_BOYAR = 878;
const KAMAYUK = 879;
const ELITE_KAMAYUK = 881;
const CONDOTTIERO = 882;
const ORGAN_GUN = 1001;
const ELITE_ORGAN_GUN = 1003;
const CARAVEL = 1004;
const ELITE_CARAVEL = 1006;
const CAMEL_ARCHER = 1007;
const ELITE_CAMEL_ARCHER = 1009;
const GENITOUR = 1010;
const ELITE_GENITOUR = 1012;
const GBETO = 1013;
const ELITE_GBETO = 1015;
const SHOTEL_WARRIOR = 1016;
const ELITE_SHOTEL_WARRIOR = 1018;
const FIRE_GALLEY = 1103;
const DEMOLITION_RAFT = 1104;
const SIEGE_TOWER = 1105;
const BALLISTA_ELEPHANT = 1120;
const ELITE_BALLISTA_ELEPHANT = 1122;
const KARAMBIT_WARRIOR = 1123;
const ELITE_KARAMBIT_WARRIOR = 1125;
const ARAMBAI = 1126;
const ELITE_ARAMBAI = 1128;
const RATTAN_ARCHER = 1129;
const ELITE_RATTAN_ARCHER = 1131;
const BATTLE_ELEPHANT = 1132;
const ELITE_BATTLE_ELEPHANT = 1134;
const IMPERIAL_SKIRMISHER = 1155;
const KESHIK = 1228;
const ELITE_KESHIK = 1230;
const KIPCHAK = 1231;
const ELITE_KIPCHAK = 1233;
const LEITIS = 1234;
const ELITE_LEITIS = 1236;
const KONNIK = 1254;
const ELITE_KONNIK = 1255;
const FLAMING_CAMEL = 1263;
const STEPPE_LANCER = 1370;
const ELITE_STEPPE_LANCER = 1372;
const YEOMEN = 3;
const EL_DORADO = 4;
const FUROR_CELTICA = 5;
const DRILL = 6;
const MAHOUTS = 7;
const TOWN_WATCH = 8;
const ZEALOTRY = 9;
const ARTILLERY = 10;
const CRENELLATIONS = 11;
const CROP_ROTATION = 12;
const HEAVY_PLOW = 13;
const HORSE_COLLAR = 14;
const GUILDS = 15;
const ANARCHY = 16;
const BANKING = 17;
const ATHEISM = 21;
const LOOM = 22;
const COINAGE = 23;
const GARLAND_WARS = 24;
const HUSBANDRY = 39;
const FAITH = 45;
const CHEMISTRY = 47;
const CARAVAN = 48;
const BERSERKERGANG = 49;
const MASONRY = 50;
const ARCHITECTURE = 51;
const ROCKETRY = 52;
const TREADMILL_CRANE = 54;
const GOLD_MINING = 55;
const KATAPARUTO = 59;
const LOGISTICA = 61;
const KEEP_TECH = 63;
const BOMBARD_TOWER_TECH = 64;
const GILLNETS = 65;
const FORGING = 67;
const IRON_CASTING = 68;
const SCALE_MAIL_ARMOR = 74;
const BLAST_FURNACE = 75;
const CHAIN_MAIL_ARMOR = 76;
const PLATE_MAIL_ARMOR = 77;
const PLATE_BARDING_ARMOR = 80;
const SCALE_BARDING_ARMOR = 81;
const CHAIN_BARDING_ARMOR = 82;
const BEARDED_AXE = 83;
const BALLISTICS = 93;
const FEUDAL_AGE = 101;
const CASTLE_AGE = 102;
const IMPERIAL_AGE = 103;
const GUARD_TOWER_TECH = 140;
const GOLD_SHAFT_MINING = 182;
const FORTIFIED_WALL_TECH = 194;
const FLETCHING = 199;
const BODKIN_ARROW = 200;
const BRACER = 201;
const DOUBLE_BIT_AXE = 202;
const BOW_SAW = 203;
const PADDED_ARCHER_ARMOR = 211;
const LEATHER_ARCHER_ARMOR = 212;
const WHEELBARROW = 213;
const SQUIRES = 215;
const RING_ARCHER_ARMOR = 219;
const TWO_MAN_SAW = 221;
const BLOCK_PRINTING = 230;
const SANCTITY = 231;
const ILLUMINATION = 233;
const HAND_CART = 249;
const FERVOR = 252;
const STONE_MINING = 278;
const STONE_SHAFT_MINING = 279;
const TOWN_PATROL = 280;
const CONSCRIPTION = 315;
const REDEMPTION = 316;
const ATONEMENT = 319;
const SAPPERS = 321;
const MURDER_HOLES = 322;
const SHIPWRIGHT = 373;
const CAREENING = 374;
const DRY_DOCK = 375;
const SIEGE_ENGINEERS = 377;
const HOARDINGS = 379;
const HEATED_SHOT = 380;
const SPIES_TREASON = 408;
const BLOODLINES = 435;
const PARTHIAN_TACTICS = 436;
const THUMB_RING = 437;
const THEOCRACY = 438;
const HERESY = 439;
const SUPREMACY = 440;
const HERBAL_MEDICINE = 441;
const SHINKICHON = 445;
const PERFUSION = 457;
const ATLATL = 460;
const WARWOLF = 461;
const GREAT_WALL = 462;
const CHIEFTAINS = 463;
const GREEK_FIRE = 464;
const STRONGHOLD = 482;
const MARAUDERS = 483;
const YASAMA = 484;
const OBSIDIAN_ARROWS = 485;
const PANOKSEON = 486;
const NOMADS = 487;
const KAMANDARAN = 488;
const IRONCLAD = 489;
const MADRASAH = 490;
const SIPAHI = 491;
const INQUISITION = 492;
const CHIVALRY = 493;
const PAVISE = 494;
const SILK_ROAD = 499;
const SULTANS = 506;
const SHATAGNI = 507;
const ORTHODOXY = 512;
const DRUZHINA = 513;
const CORVINIAN_ARMY = 514;
const RECURVE_BOW = 515;
const ANDEAN_SLING = 516;
const FABRIC_SHIELDS = 517;
const CARRACK = 572;
const ARQUEBUS = 573;
const ROYAL_HEIRS = 574;
const TORSION_ENGINES = 575;
const TIGUI = 576;
const FARIMBA = 577;
const KASBAH = 578;
const MAGHRABI_CAMELS = 579;
const ARSON = 602;
const ARROWSLITS = 608;
const TUSK_SWORDS = 622;
const DOUBLE_CROSSBOW = 623;
const THALASSOCRACY = 624;
const FORCED_LEVY = 625;
const HOWDAH = 626;
const MANIPUR_CAVALRY = 627;
const CHATRAS = 628;
const PAPER_MONEY = 629;
const STIRRUPS = 685;
const BAGAINS = 686;
const SILK_ARMOR = 687;
const TIMURID_SIEGECRAFT = 688;
const STEPPE_HUSBANDRY = 689;
const CUMAN_MERCENARIES = 690;
const HILL_FORTS = 691;
const TOWER_SHIELDS = 692;
const SUPPLIES = 716;


const horseDisabledBuildings = [STABLE];
const horseDisabledUnits = [SCOUT_CAVALRY, LIGHT_CAVALRY, HUSSAR, KNIGHT, PALADIN, CAMEL_RIDER,
    HEAVY_CAMEL_RIDER, CAVALIER, CAVALRY_ARCHER, HEAVY_CAV_ARCHER];
const horseDisabledTechs = [BLOODLINES, HUSBANDRY, SCALE_BARDING_ARMOR, CHAIN_BARDING_ARMOR,
    PLATE_BARDING_ARMOR, PARTHIAN_TACTICS];

const defaultDisabledUnits = [EAGLE_SCOUT, EAGLE_WARRIOR, ELITE_EAGLE_WARRIOR, BATTLE_ELEPHANT,
    ELITE_BATTLE_ELEPHANT, STEPPE_LANCER, ELITE_STEPPE_LANCER, FLAMING_CAMEL];
    
const defaultDisabledBuildings = [KREPOST, FEITORIA,];

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
        this.padding = 20;
        this.element_height = 0;
        this.lanes = [];
        this.offset_x = 150;  // 150 is starting offset from the left to accommodate age icons
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
    return string.toString().replace(/\s/g, "_").replace(/\//g, "_").toLowerCase();
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
    enable([], [UNIQUE_UNIT, ELITE_UNIQUE_UNIT], []);
    disable(defaultDisabledBuildings, defaultDisabledUnits, []);
}

function disable(buildings, units, techs) {
    for (let name of buildings) {
        SVG.get('building_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 1});
    }
    for (let name of units) {
        SVG.get('unit_' + formatId(name) + '_x').animate(animation_duration).attr({'fill-opacity': 1});
    }
    for (let name of techs) {
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
    for (let key of carets.keys()) {
        let caret = carets.get(key);
        if (caret.isUniqueUnit()) {
            SVG.get(caret.id + '_x').animate(animation_duration).attr({'fill-opacity': 1});
        }
    }
}

function formatName(originalname) {
    let name = originalname.toString();
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
        } else {
            let hyphen = originalname.indexOf("-");
            if (hyphen !== -1) {
                name = originalname.slice(0, hyphen) + "-\n" + originalname.slice(hyphen + 1);
                let alternativeHyphen = hyphen + 1 + originalname.slice(hyphen + 1).indexOf("-");
                if (alternativeHyphen !== -1) {
                    if (Math.abs((originalname.length / 2) - alternativeHyphen) < Math.abs((originalname.length / 2) - hyphen)) {
                        name = originalname.slice(0, alternativeHyphen) + "-\n" + originalname.slice(alternativeHyphen + 1);
                    }
                }
            }
        }
    }
    return name;
}

function unique(ids, monk_prefix) {
    if (monk_prefix === undefined) {
        monk_prefix = MONK_PREFIX_GENERIC;
    }
    SVG.get('unit_' + formatId(UNIQUE_UNIT) + '_text').text(formatName(data.strings[data.data.units[ids[0]].LanguageNameId]));
    SVG.get('unit_' + formatId(UNIQUE_UNIT) + '_overlay').data({'name': data.strings[data.data.units[ids[0]].LanguageNameId], 'id':'unit_'+ids[0]});
    SVG.get('unit_' + formatId(ELITE_UNIQUE_UNIT) + '_text').text(formatName(data.strings[data.data.units[ids[1]].LanguageNameId]));
    SVG.get('unit_' + formatId(ELITE_UNIQUE_UNIT) + '_overlay').data({'name': data.strings[data.data.units[ids[1]].LanguageNameId], 'id':'unit_'+ids[1]});
    SVG.get('tech_' + formatId(UNIQUE_TECH_1) + '_text').text(formatName(data.strings[data.data.techs[ids[2]].LanguageNameId]));
    SVG.get('tech_' + formatId(UNIQUE_TECH_1) + '_overlay').data({'name': data.strings[data.data.techs[ids[2]].LanguageNameId], 'id':'tech_'+ids[2]});
    SVG.get('tech_' + formatId(UNIQUE_TECH_2) + '_text').text(formatName(data.strings[data.data.techs[ids[3]].LanguageNameId]));
    SVG.get('tech_' + formatId(UNIQUE_TECH_2) + '_overlay').data({'name': data.strings[data.data.techs[ids[3]].LanguageNameId], 'id':'tech_'+ids[3]});
    SVG.get('unit_' + formatId(UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(ids[0]) + '.png');
    SVG.get('unit_' + formatId(ELITE_UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(ids[1]) + '.png');
    SVG.get('unit_' + formatId(MONK) + '_img').load('img/Units/' + monk_prefix + 'monk.png');
}


function disableHorses() {
    disable(horseDisabledBuildings, horseDisabledUnits, horseDisabledTechs);
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

    let archerylane = new Lane();
    archerylane.rows.feudal_1.push(building(ARCHERY_RANGE));
    archerylane.rows.feudal_2.push(unit(ARCHER));
    archerylane.rows.feudal_2.push(unit(SKIRMISHER));
    archerylane.rows.castle_1.push(unit(CROSSBOWMAN));
    archerylane.rows.castle_1.push(unit(ELITE_SKIRMISHER));
    archerylane.rows.castle_1.push(uniqueunit(SLINGER));
    archerylane.rows.castle_1.push(unit(CAVALRY_ARCHER));
    archerylane.rows.castle_1.push(uniqueunit(GENITOUR));
    archerylane.rows.castle_1.push(tech(THUMB_RING));
    archerylane.rows.imperial_1.push(unit(ARBALESTER));
    archerylane.rows.imperial_1.push(uniqueunit(IMPERIAL_SKIRMISHER));
    archerylane.rows.imperial_1.push(unit(HAND_CANNONEER));
    archerylane.rows.imperial_1.push(unit(HEAVY_CAV_ARCHER));
    archerylane.rows.imperial_1.push(uniqueunit(ELITE_GENITOUR));
    archerylane.rows.imperial_1.push(tech(PARTHIAN_TACTICS));
    tree.lanes.push(archerylane);


    let barrackslane = new Lane();
    barrackslane.rows.dark_1.push(building(BARRACKS));
    barrackslane.rows.dark_2.push(unit(MILITIA));
    barrackslane.rows.feudal_1.push(unit(MAN_AT_ARMS));
    barrackslane.rows.feudal_1.push(unit(SPEARMAN));
    barrackslane.rows.feudal_1.push(unit(EAGLE_SCOUT));
    barrackslane.rows.feudal_1.push(tech(SUPPLIES));
    barrackslane.rows.castle_1.push(unit(LONG_SWORDSMAN));
    barrackslane.rows.castle_1.push(unit(PIKEMAN));
    barrackslane.rows.castle_1.push(unit(EAGLE_WARRIOR));
    barrackslane.rows.castle_1.push(tech(SQUIRES));
    barrackslane.rows.castle_1.push(tech(ARSON));
    barrackslane.rows.imperial_1.push(unit(TWO_HANDED_SWORDSMAN));
    barrackslane.rows.imperial_2.push(unit(CHAMPION));
    barrackslane.rows.imperial_1.push(unit(HALBERDIER));
    barrackslane.rows.imperial_1.push(unit(ELITE_EAGLE_WARRIOR));
    barrackslane.rows.imperial_1.push(uniqueunit(CONDOTTIERO));
    tree.lanes.push(barrackslane);


    let stablelane = new Lane();
    stablelane.rows.feudal_1.push(building(STABLE));
    stablelane.rows.feudal_2.push(unit(SCOUT_CAVALRY));
    stablelane.rows.feudal_2.push(tech(BLOODLINES));
    stablelane.rows.castle_1.push(unit(LIGHT_CAVALRY));
    stablelane.rows.castle_1.push(unit(KNIGHT));
    stablelane.rows.castle_1.push(unit(CAMEL_RIDER));
    stablelane.rows.castle_1.push(unit(BATTLE_ELEPHANT));
    stablelane.rows.castle_1.push(unit(STEPPE_LANCER));
    stablelane.rows.castle_1.push(tech(HUSBANDRY));
    stablelane.rows.imperial_1.push(unit(HUSSAR));
    stablelane.rows.imperial_1.push(unit(CAVALIER));
    stablelane.rows.imperial_1.push(unit(HEAVY_CAMEL_RIDER));
    stablelane.rows.imperial_1.push(unit(ELITE_BATTLE_ELEPHANT));
    stablelane.rows.imperial_1.push(unit(ELITE_STEPPE_LANCER));
    stablelane.rows.imperial_2.push(uniqueunit(IMPERIAL_CAMEL_RIDER));
    stablelane.rows.imperial_2.push(unit(PALADIN));
    tree.lanes.push(stablelane);


    let siegeworkshoplane = new Lane();
    siegeworkshoplane.rows.castle_1.push(building(SIEGE_WORKSHOP));
    siegeworkshoplane.rows.castle_2.push(unit(MANGONEL));
    siegeworkshoplane.rows.castle_2.push(unit(BATTERING_RAM));
    siegeworkshoplane.rows.castle_2.push(unit(SCORPION));
    siegeworkshoplane.rows.castle_2.push(unit(SIEGE_TOWER));
    siegeworkshoplane.rows.imperial_1.push(unit(ONAGER));
    siegeworkshoplane.rows.imperial_1.push(unit(CAPPED_RAM));
    siegeworkshoplane.rows.imperial_1.push(unit(HEAVY_SCORPION));
    siegeworkshoplane.rows.imperial_1.push(unit(BOMBARD_CANNON));
    siegeworkshoplane.rows.imperial_2.push(unit(SIEGE_ONAGER));
    siegeworkshoplane.rows.imperial_2.push(unit(SIEGE_RAM));
    tree.lanes.push(siegeworkshoplane);


    let blacksmithlane = new Lane();
    blacksmithlane.rows.feudal_1.push(building(BLACKSMITH));
    blacksmithlane.rows.feudal_2.push(tech(PADDED_ARCHER_ARMOR));
    blacksmithlane.rows.feudal_2.push(tech(FLETCHING));
    blacksmithlane.rows.feudal_2.push(tech(FORGING));
    blacksmithlane.rows.feudal_2.push(tech(SCALE_BARDING_ARMOR));
    blacksmithlane.rows.feudal_2.push(tech(SCALE_MAIL_ARMOR));
    blacksmithlane.rows.castle_1.push(tech(LEATHER_ARCHER_ARMOR));
    blacksmithlane.rows.castle_1.push(tech(BODKIN_ARROW));
    blacksmithlane.rows.castle_1.push(tech(IRON_CASTING));
    blacksmithlane.rows.castle_1.push(tech(CHAIN_BARDING_ARMOR));
    blacksmithlane.rows.castle_1.push(tech(CHAIN_MAIL_ARMOR));
    blacksmithlane.rows.imperial_1.push(tech(RING_ARCHER_ARMOR));
    blacksmithlane.rows.imperial_1.push(tech(BRACER));
    blacksmithlane.rows.imperial_1.push(tech(BLAST_FURNACE));
    blacksmithlane.rows.imperial_1.push(tech(PLATE_BARDING_ARMOR));
    blacksmithlane.rows.imperial_1.push(tech(PLATE_MAIL_ARMOR));
    tree.lanes.push(blacksmithlane);

    let docklane = new Lane();
    docklane.rows.dark_1.push(building(DOCK));
    docklane.rows.dark_2.push(unit(FISHING_SHIP));
    docklane.rows.dark_2.push(unit(TRANSPORT_SHIP));
    docklane.rows.feudal_1.push(unit(FIRE_GALLEY));
    docklane.rows.feudal_1.push(unit(TRADE_COG));
    docklane.rows.feudal_1.push(unit(DEMOLITION_RAFT));
    docklane.rows.feudal_1.push(unit(GALLEY));
    docklane.rows.castle_1.push(unit(FIRE_SHIP));
    docklane.rows.castle_1.push(tech(GILLNETS));
    docklane.rows.castle_1.push(unit(DEMOLITION_SHIP));
    docklane.rows.castle_1.push(unit(WAR_GALLEY));
    docklane.rows.castle_1.push(uniqueunit(TURTLE_SHIP));
    docklane.rows.castle_1.push(uniqueunit(LONGBOAT));
    docklane.rows.castle_1.push(uniqueunit(CARAVEL));
    docklane.rows.castle_1.push(tech(CAREENING));
    docklane.rows.imperial_1.push(unit(FAST_FIRE_SHIP));
    docklane.rows.imperial_1.push(unit(CANNON_GALLEON));
    docklane.rows.imperial_1.push(unit(HEAVY_DEMO_SHIP));
    docklane.rows.imperial_1.push(unit(GALLEON));
    docklane.rows.imperial_1.push(uniqueunit(ELITE_TURTLE_SHIP));
    docklane.rows.imperial_1.push(uniqueunit(ELITE_LONGBOAT));
    docklane.rows.imperial_1.push(uniqueunit(ELITE_CARAVEL));
    docklane.rows.imperial_2.push(unit(ELITE_CANNON_GALLEON));
    docklane.rows.imperial_1.push(tech(DRY_DOCK));
    docklane.rows.imperial_1.push(tech(SHIPWRIGHT));
    tree.lanes.push(docklane);


    let fishtraplane = new Lane();
    fishtraplane.rows.feudal_1.push(building(FISH_TRAP));
    tree.lanes.push(fishtraplane);


    let universitylane = new Lane();
    universitylane.rows.castle_1.push(building(UNIVERSITY));
    universitylane.rows.castle_2.push(tech(MASONRY));
    universitylane.rows.castle_2.push(tech(FORTIFIED_WALL_TECH));
    universitylane.rows.castle_2.push(tech(BALLISTICS));
    universitylane.rows.castle_2.push(tech(GUARD_TOWER_TECH));
    universitylane.rows.castle_2.push(tech(HEATED_SHOT));
    universitylane.rows.castle_2.push(tech(MURDER_HOLES));
    universitylane.rows.castle_2.push(tech(TREADMILL_CRANE));
    universitylane.rows.imperial_1.push(tech(ARCHITECTURE));
    universitylane.rows.imperial_1.push(tech(CHEMISTRY));
    universitylane.rows.imperial_1.push(tech(SIEGE_ENGINEERS));
    universitylane.rows.imperial_1.push(tech(KEEP_TECH));
    universitylane.rows.imperial_1.push(tech(ARROWSLITS));
    universitylane.rows.imperial_2.push(tech(BOMBARD_TOWER_TECH));
    tree.lanes.push(universitylane);


    let towerlane = new Lane();
    towerlane.rows.dark_1.push(building(OUTPOST));
    towerlane.rows.feudal_1.push(building(WATCH_TOWER));
    towerlane.rows.castle_1.push(building(GUARD_TOWER));
    towerlane.rows.imperial_1.push(building(KEEP));
    towerlane.rows.imperial_2.push(building(BOMBARD_TOWER));
    tree.lanes.push(towerlane);


    let walllane = new Lane();
    walllane.rows.dark_1.push(building(PALISADE_WALL));
    walllane.rows.dark_2.push(building(PALISADE_GATE));
    walllane.rows.feudal_1.push(building(GATE));
    walllane.rows.feudal_2.push(building(STONE_WALL));
    walllane.rows.castle_1.push(building(FORTIFIED_WALL));
    tree.lanes.push(walllane);


    let castlelane = new Lane();
    castlelane.rows.castle_1.push(building(CASTLE));
    castlelane.rows.castle_2.push(new Caret(TYPES.UNIQUEUNIT, UNIQUE_UNIT, UNIQUE_UNIT));
    castlelane.rows.castle_2.push(unit(PETARD));
    castlelane.rows.castle_2.push(tech(UNIQUE_TECH_1));
    castlelane.rows.imperial_1.push(new Caret(TYPES.UNIQUEUNIT, ELITE_UNIQUE_UNIT, ELITE_UNIQUE_UNIT));
    castlelane.rows.imperial_1.push(unit(TREBUCHET));
    castlelane.rows.imperial_1.push(uniqueunit(FLAMING_CAMEL));
    castlelane.rows.imperial_1.push(tech(UNIQUE_TECH_2));
    castlelane.rows.imperial_1.push(tech(HOARDINGS));
    castlelane.rows.imperial_1.push(tech(SAPPERS));
    castlelane.rows.imperial_1.push(tech(CONSCRIPTION));
    castlelane.rows.imperial_1.push(tech(SPIES_TREASON));
    tree.lanes.push(castlelane);


    let krepostlane = new Lane();
    krepostlane.rows.castle_1.push(building(KREPOST));
    krepostlane.rows.castle_2.push(uniqueunit(KONNIK));
    krepostlane.rows.imperial_1.push(uniqueunit(ELITE_KONNIK));
    tree.lanes.push(krepostlane);


    let monasterylane = new Lane();
    monasterylane.rows.castle_1.push(building(MONASTERY));
    monasterylane.rows.castle_2.push(unit(MONK));
    monasterylane.rows.castle_2.push(uniqueunit(MISSIONARY));
    monasterylane.rows.castle_2.push(tech(REDEMPTION));
    monasterylane.rows.castle_2.push(tech(FERVOR));
    monasterylane.rows.castle_2.push(tech(SANCTITY));
    monasterylane.rows.castle_2.push(tech(ATONEMENT));
    monasterylane.rows.castle_2.push(tech(HERBAL_MEDICINE));
    monasterylane.rows.castle_2.push(tech(HERESY));
    monasterylane.rows.imperial_1.push(tech(BLOCK_PRINTING));
    monasterylane.rows.imperial_1.push(tech(ILLUMINATION));
    monasterylane.rows.imperial_1.push(tech(FAITH));
    monasterylane.rows.imperial_1.push(tech(THEOCRACY));
    tree.lanes.push(monasterylane);


    let houselane = new Lane();
    houselane.rows.dark_1.push(building(HOUSE));
    tree.lanes.push(houselane);

    let towncenterlane = new Lane();
    towncenterlane.rows.dark_1.push(building(TOWN_CENTER));
    towncenterlane.rows.dark_2.push(unit(VILLAGER));
    towncenterlane.rows.dark_2.push(tech(FEUDAL_AGE));
    towncenterlane.rows.dark_2.push(tech(LOOM));
    towncenterlane.rows.feudal_1.push(tech(TOWN_WATCH));
    towncenterlane.rows.feudal_1.push(tech(CASTLE_AGE));
    towncenterlane.rows.feudal_1.push(tech(WHEELBARROW));
    towncenterlane.rows.castle_1.push(tech(TOWN_PATROL));
    towncenterlane.rows.castle_1.push(tech(IMPERIAL_AGE));
    towncenterlane.rows.castle_1.push(tech(HAND_CART));
    tree.lanes.push(towncenterlane);


    let additionaltowncenterlane = new Lane();
    additionaltowncenterlane.rows.castle_1.push(new Caret(TYPES.BUILDING, getName(TOWN_CENTER, 'buildings'), `${TOWN_CENTER}_copy`));
    tree.lanes.push(additionaltowncenterlane);


    let wonderlane = new Lane();
    wonderlane.rows.imperial_1.push(building(WONDER));
    tree.lanes.push(wonderlane);


    let feitorialane = new Lane();
    feitorialane.rows.imperial_1.push(building(FEITORIA));
    tree.lanes.push(feitorialane);


    let miningcamplane = new Lane();
    miningcamplane.rows.dark_1.push(building(MINING_CAMP));
    miningcamplane.rows.feudal_1.push(tech(STONE_MINING));
    miningcamplane.rows.feudal_1.push(tech(GOLD_MINING));
    miningcamplane.rows.castle_1.push(tech(STONE_SHAFT_MINING));
    miningcamplane.rows.castle_1.push(tech(GOLD_SHAFT_MINING));
    tree.lanes.push(miningcamplane);


    let lumbercamplane = new Lane();
    lumbercamplane.rows.dark_1.push(building(LUMBER_CAMP));
    lumbercamplane.rows.feudal_1.push(tech(DOUBLE_BIT_AXE));
    lumbercamplane.rows.castle_1.push(tech(BOW_SAW));
    lumbercamplane.rows.imperial_1.push(tech(TWO_MAN_SAW));
    tree.lanes.push(lumbercamplane);


    let marketlane = new Lane();
    marketlane.rows.feudal_1.push(building(MARKET));
    marketlane.rows.feudal_2.push(unit(TRADE_CART));
    marketlane.rows.castle_1.push(tech(COINAGE));
    marketlane.rows.castle_1.push(tech(CARAVAN));
    marketlane.rows.imperial_1.push(tech(BANKING));
    marketlane.rows.imperial_1.push(tech(GUILDS));
    tree.lanes.push(marketlane);


    let farmlane = new Lane();
    farmlane.rows.dark_2.push(building(FARM));
    tree.lanes.push(farmlane);
    

    let milllane = new Lane();
    milllane.rows.dark_1.push(building(MILL));
    milllane.rows.feudal_1.push(tech(HORSE_COLLAR));
    milllane.rows.castle_1.push(tech(HEAVY_PLOW));
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
        [u(LONG_SWORDSMAN), u(TWO_HANDED_SWORDSMAN)],
        [u(TWO_HANDED_SWORDSMAN), u(CHAMPION)],
        [b(BARRACKS), u(SPEARMAN)],
        [u(SPEARMAN), u(PIKEMAN)],
        [u(PIKEMAN), u(HALBERDIER)],
        [b(BARRACKS), u(EAGLE_SCOUT)],
        [u(EAGLE_SCOUT), u(EAGLE_WARRIOR)],
        [u(EAGLE_WARRIOR), u(ELITE_EAGLE_WARRIOR)],
        [b(BARRACKS), t(SUPPLIES)],
        [b(BARRACKS), t(ARSON)],
        [b(STABLE), u(SCOUT_CAVALRY)],
        [u(SCOUT_CAVALRY), u(LIGHT_CAVALRY)],
        [u(LIGHT_CAVALRY), u(HUSSAR)],
        [b(STABLE), t(BLOODLINES)],
        [b(STABLE), u(CAMEL_RIDER)],
        [u(CAMEL_RIDER), u(HEAVY_CAMEL_RIDER)],
        [b(STABLE), u(BATTLE_ELEPHANT)],
        [u(BATTLE_ELEPHANT), u(ELITE_BATTLE_ELEPHANT)],
        [b(STABLE), u(STEPPE_LANCER)],
        [u(STEPPE_LANCER), u(ELITE_STEPPE_LANCER)],
        [b(STABLE), t(HUSBANDRY)],
        [u(KNIGHT), u(CAVALIER)],
        [u(CAVALIER), u(PALADIN)],
        [b(DOCK), u(FISHING_SHIP)],
        [b(DOCK), u(TRANSPORT_SHIP)],
        [b(DOCK), u(DEMOLITION_RAFT)],
        [u(DEMOLITION_RAFT), u(DEMOLITION_SHIP)],
        [u(DEMOLITION_SHIP), u(HEAVY_DEMO_SHIP)],
        [b(DOCK), u(GALLEY)],
        [u(GALLEY), u(WAR_GALLEY)],
        [u(WAR_GALLEY), u(GALLEON)],
        [b(DOCK), t(CAREENING)],
        [t(CAREENING), t(DRY_DOCK)],
        [b(DOCK), t(SHIPWRIGHT)],
        [b(DOCK), b(FISH_TRAP)],
        [u(FIRE_GALLEY), u(FIRE_SHIP)],
        [u(FIRE_SHIP), u(FAST_FIRE_SHIP)],
        [u(CANNON_GALLEON), u(ELITE_CANNON_GALLEON)],
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
        [b(CASTLE), u(UNIQUE_UNIT)],
        [u(UNIQUE_UNIT), u(ELITE_UNIQUE_UNIT)],
        [b(CASTLE), u(PETARD)],
        [b(CASTLE), t(UNIQUE_TECH_1)],
        [b(CASTLE), t(UNIQUE_TECH_2)],
        [b(CASTLE), t(HOARDINGS)],
        [b(CASTLE), t(SAPPERS)],
        [b(CASTLE), t(CONSCRIPTION)],
        [b(CASTLE), t(SPIES_TREASON)],
        [b(KREPOST), u(KONNIK)],
        [u(KONNIK), u(ELITE_KONNIK)],
        [b(TOWN_CENTER), u(VILLAGER)],
        [b(TOWN_CENTER), t(FEUDAL_AGE)],
        [t(FEUDAL_AGE), t(CASTLE_AGE)],
        [t(CASTLE_AGE), t(IMPERIAL_AGE)],
        [b(TOWN_CENTER), t(LOOM)],
        [t(TOWN_WATCH), t(TOWN_PATROL)],
        [t(WHEELBARROW), t(HAND_CART)],
        [b(SIEGE_WORKSHOP), u(MANGONEL)],
        [u(MANGONEL), u(ONAGER)],
        [u(ONAGER), u(SIEGE_ONAGER)],
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
        [t(CHEMISTRY), t(BOMBARD_TOWER_TECH)],
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
        [b(MILL), b(FARM)],
        [b(MILL), t(HORSE_COLLAR)],
        [t(HORSE_COLLAR), t(HEAVY_PLOW)],
        [t(HEAVY_PLOW), t(CROP_ROTATION)],
        [u(GENITOUR), u(ELITE_GENITOUR)],
        [u(HEAVY_CAMEL_RIDER), u(IMPERIAL_CAMEL_RIDER)],
        [u(TURTLE_SHIP), u(ELITE_TURTLE_SHIP)],
        [u(LONGBOAT), u(ELITE_LONGBOAT)],
        [u(ELITE_SKIRMISHER), u(IMPERIAL_SKIRMISHER)],
        [b(MONASTERY), u(MISSIONARY)],
        [u(CARAVEL), u(ELITE_CARAVEL)],
        [b(DOCK), u(CARAVEL)],
        [b(DOCK), u(TURTLE_SHIP)],
        [b(ARCHERY_RANGE), u(SLINGER)],
        [b(ARCHERY_RANGE), u(GENITOUR)],
        [b(DOCK), u(LONGBOAT)]
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
