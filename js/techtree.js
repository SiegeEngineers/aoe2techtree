const TYPES = Object.freeze({
    'BUILDING': {colour: '#922602', type: 'BUILDING', name: 'Building'},
    'UNIT': {colour: '#3a6a80', type: 'UNIT', name: 'Unit'},
    'UNIQUEUNIT': {colour: '#af30a3', type: 'UNIQUEUNIT', name: 'Unique Unit'},
    'TECHNOLOGY': {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'}
});

const LEGEND = [TYPES.UNIQUEUNIT, TYPES.UNIT, TYPES.BUILDING, TYPES.TECHNOLOGY];

const PREFIX = Object.freeze({
    'BUILDING': 'building_',
    'UNIT': 'unit_',
    'UNIQUEUNIT': 'unit_',
    'TECHNOLOGY': 'tech_'
});

const AGE_IMAGES = ['dark_age_de.png', 'feudal_age_de.png', 'castle_age_de.png', 'imperial_age_de.png'];

const getAgeNames = (data)=>{
    return [
        data.strings[data.age_names['Dark Age']],
        data.strings[data.age_names['Feudal Age']],
        data.strings[data.age_names['Castle Age']],
        data.strings[data.age_names['Imperial Age']],
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
const BARRACKS = 12;
const DOCK = 45;
const SIEGE_WORKSHOP = 49;
const FARM = 50;
const MILL = 68;
const HOUSE = 70;
const PALISADE_WALL = 72;
const WATCH_TOWER = 79;
const CASTLE = 82;
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
const BOMBARD_TOWER = 236;
const WONDER = 276;
const GATE = 487;
const LUMBER_CAMP = 562;
const MINING_CAMP = 584;
const OUTPOST = 598;
const TOWN_CENTER_2 = 621;
const PALISADE_GATE = 792;
const FEITORIA = 1021;
const HARBOR = 1189;
const KREPOST = 1251;
const DONJON = 1665;
const FORTIFIED_CHURCH = 1806;
const MULE_CART = 1808;
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
const BOMBARD_CANNON = 36;
const KNIGHT = 38;
const CAVALRY_ARCHER = 39;
const CATAPHRACT = 40;
const HUSKARL = 41;
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
const TREBUCHET = 331;
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
const KONNIK = 1225;
const ELITE_KONNIK = 1227;
const KESHIK = 1228;
const ELITE_KESHIK = 1230;
const KIPCHAK = 1231;
const ELITE_KIPCHAK = 1233;
const LEITIS = 1234;
const ELITE_LEITIS = 1236;
const DISMOUNTED_KONNIK = 1252;
const DISMOUNTED_ELITE_KONNIK = 1253;
const KONNIK_2 = 1254;
const ELITE_KONNIK_2 = 1255;
const BATTERING_RAM = 1258;
const FLAMING_CAMEL = 1263;
const STEPPE_LANCER = 1370;
const ELITE_STEPPE_LANCER = 1372;
const XOLOTL_WARRIOR = 1570;
const COUSTILLIER = 1655;
const ELITE_COUSTILLIER = 1657;
const SERJEANT = 1658;
const ELITE_SERJEANT = 1659;
const DSERJEANT = 1660;
const ELITE_DSERJEANT = 1661;
const FLEMISHPIKEMAN = 1699;
const OBUCH = 1701;
const ELITE_OBUCH = 1703;
const HUSSITE_WAGON = 1704;
const ELITE_HUSSITE_WAGON = 1706;
const WINGED_HUSSAR = 1707;
const HOUFNICE = 1709;
const FOLWARK = 1734;
const ARMORED_ELEPHANT = 1744;
const SIEGE_ELEPHANT = 1746;
const THIRISADAI = 1750;
const SHRIVAMSHA_RIDER = 1751;
const ELITE_SHRIVAMSHA_RIDER = 1753;
const CARAVANSERAI = 1754;
const CAMEL_SCOUT = 1755;
const DSPEARMAN = 1786;
const DPIKEMAN = 1787;
const DHALBERDIER = 1788;
const LEGIONARY = 1793;
const DROMON = 1795;
const WARRIOR_PRIEST = 1811;
const SAVAR = 1813;
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
const DEVOTION = 46;
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
const BURGUNDIAN_VINEYARDS = 754;
const FLEMISH_REVOLUTION = 755;
const FIRST_CRUSADE = 756;
const SCUTAGE = 757;
const GAMBESONS = 875;

const BUILDING_INDEX = [
    ARCHERY_RANGE,
    BARRACKS,
    STABLE,
    SIEGE_WORKSHOP,
    BLACKSMITH,
    DOCK,
    UNIVERSITY,
    WATCH_TOWER,
    CASTLE,
    MONASTERY,
    TOWN_CENTER,
    MARKET
];

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

    updatePositions(offsets, element_length) {
        let lane_width = 0;
        let parentpos = [];
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
                parentpos[+this.rows[r][i].id.split('_')[1]] = this.rows[r][i].x;
            }
            this.rows[r].forEach((y) => {
                if (y.parent) {
                    const match = this.rows[r].find(el => el.x === parentpos[y.parent]);
                    if (match === y);
                    else if (match) {
                        [y.x, match.x] = [match.x, y.x];
                        parentpos[+match.id.split('_')[1]] = match.x;
                    } else {
                        y.x = parentpos[y.parent];
                    }
                    parentpos[+y.id.split('_')[1]] = y.x;
                }
            });
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

        // let connections = getConnections();
        // let carets = this.nonBuildingCarets();
        // for (let connection of connections) {
        //     let from = connection[0];
        //     let to = connection[1];
        //     let allConnectionsForFrom = connections.filter(c => c[0] === from && carets.has(c[0]) && carets.has(c[1]));
        //     let allRelevantTos = allConnectionsForFrom.map(c => c[1]);
        //     if (carets.has(from) && carets.get(from).x < Math.min(allRelevantTos.map(to_ => carets.get(to_).x))){
        //         carets.get(from).x = Math.min(allRelevantTos.map(to_ => carets.get(to_).x));
        //     }
        //     if (carets.has(from) && carets.get(from).x > Math.max(allRelevantTos.map(to_ => carets.get(to_).x))){
        //         console.assert(allRelevantTos.length === 1, `Overlapping carets: ${allRelevantTos}`)
        //         allRelevantTos.forEach(to_ => carets.get(to_).x = carets.get(from).x);
        //     }
        // }
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
    constructor(type, name, id, status, parent) {
        this.type = type;
        this.name = name;
        this.id = PREFIX[type.type] + formatId(id);
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
        this.parent = parent !== -1 ? parent : undefined;
        this.status = status;
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
    enable(selectedCiv.buildings,
        [...selectedCiv.units, {id:UNIQUE_UNIT, age: 3}, {id: ELITE_UNIQUE_UNIT, age: 4}],
        [...selectedCiv.techs, {id: UNIQUE_TECH_1, age: 3}, {id: UNIQUE_TECH_2, age: 4}]);
    unique([selectedCiv.unique.castleAgeUniqueUnit,
        selectedCiv.unique.imperialAgeUniqueUnit,
        selectedCiv.unique.castleAgeUniqueTech,
        selectedCiv.unique.imperialAgeUniqueTech], selectedCiv.monkPrefix);
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

function unique(ids, monk_prefix) {
    if (monk_prefix === undefined) {
        monk_prefix = MONK_PREFIX_GENERIC;
    }
    SVG('#unit_' + formatId(UNIQUE_UNIT) + '_text').text(formatName(data.strings[data.data.units[ids[0]].LanguageNameId]));
    SVG('#unit_' + formatId(UNIQUE_UNIT) + '_overlay').data({'name': data.strings[data.data.units[ids[0]].LanguageNameId], 'id':'unit_'+ids[0]});
    SVG('#unit_' + formatId(ELITE_UNIQUE_UNIT) + '_text').text(formatName(data.strings[data.data.units[ids[1]].LanguageNameId]));
    SVG('#unit_' + formatId(ELITE_UNIQUE_UNIT) + '_overlay').data({'name': data.strings[data.data.units[ids[1]].LanguageNameId], 'id':'unit_'+ids[1]});
    SVG('#tech_' + formatId(UNIQUE_TECH_1) + '_text').text(formatName(data.strings[data.data.techs[ids[2]].LanguageNameId]));
    SVG('#tech_' + formatId(UNIQUE_TECH_1) + '_overlay').data({'name': data.strings[data.data.techs[ids[2]].LanguageNameId], 'id':'tech_'+ids[2]});
    SVG('#tech_' + formatId(UNIQUE_TECH_2) + '_text').text(formatName(data.strings[data.data.techs[ids[3]].LanguageNameId]));
    SVG('#tech_' + formatId(UNIQUE_TECH_2) + '_overlay').data({'name': data.strings[data.data.techs[ids[3]].LanguageNameId], 'id':'tech_'+ids[3]});
    SVG('#unit_' + formatId(UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(ids[0]) + '.png');
    SVG('#unit_' + formatId(ELITE_UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(ids[1]) + '.png');
    SVG('#unit_' + formatId(MONK) + '_img').load('img/Units/' + monk_prefix + '125.png');
}

function getName(id, itemtype) {
    //ToDo handle unique stuff properly
    if(id.toString().startsWith('UNIQUE')){
        return id;
    }
    console.log(itemtype, id)
    const languageNameId = data['data'][itemtype][id]['LanguageNameId'];
    return data['strings'][languageNameId];
}

function building(id, status) {
    return new Caret(TYPES.BUILDING, getName(id, 'buildings'), id, status);
}

function unit(id, status, parent) {
    return new Caret(TYPES.UNIT, getName(id, 'units'), id, status, parent);
}

function tech(id, status, parent) {
    return new Caret(TYPES.TECHNOLOGY, getName(id, 'techs'), id, status, parent);
}

const AGES = [
    '', 'dark_1', 'feudal_1', 'castle_1', 'imperial_1',
    'dark_2', 'feudal_2', 'castle_2', 'imperial_2',
]

class BuildingLane {
    constructor(buildingId, startAgeId) {
        this.buildingId = buildingId;
        this.startAgeId = startAgeId;
        this.elements = [];
    }
}

function newLane(item, lastAgeId) {
    return item["Building in new column"] || item["Age ID"] < lastAgeId;
}

function collectLanes(civ) {
    const lanes = [];
    let lastAgeId = 1;
    let lane = new BuildingLane(null);
    for (let item of civ.civ_techs_buildings) {
        if (newLane(item, lastAgeId)) {
            if (lane.buildingId) {
                lanes.push(lane);
            }
            lane = new BuildingLane(item["Node ID"], item["Age ID"]);
        }
        lastAgeId = item["Age ID"];
        if (item["Node ID"] !== item["Building ID"]) {
            alert(item["Node ID"])
        }
        lane.elements.push(item);
    }
    if (lane.buildingId) {
        lanes.push(lane);
    }
    for (let item of civ.civ_techs_units) {
        const lane = lanes.find(value => value.buildingId === item["Building ID"])
        if (!lane) {
            console.log(item);
        } else {
            lane.elements.push(item);
        }
    }
    return lanes;
}

function getCustomTree(civ) {
    const tree = new Tree();
    tree.updateOffsets();
    const buildingLanes = collectLanes(civ);
    for (const buildingLane of buildingLanes) {
        const lane = new Lane();
        let lastAge = -1;
        for (const item of buildingLane.elements) {
            let index = item["Age ID"]
            if (item["Age ID"] === lastAge) {
                index = item["Age ID"] + 4;
            }
            if (item["Age ID"] === buildingLane.startAgeId && item["Node ID"] !== buildingLane.buildingId) {
                index = item["Age ID"] + 4;
            }
            lastAge = item["Age ID"];
            const age = AGES[index];
            if (item["Use Type"] === 'Building') {
                lane.rows[age].push(building(item["Node ID"], item["Node Status"]));
            } else if (item["Use Type"] === 'Unit') {
                lane.rows[age].push(unit(item["Node ID"], item["Node Status"], item["Link ID"]));
            } else if (item["Use Type"] === 'Tech') {
                lane.rows[age].push(tech(item["Node ID"], item["Node Status"], item["Link ID"]));
            } else {
                alert(item["Use Type"])
            }
        }
        tree.lanes.push(lane);
    }
    console.log(tree);
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

function getCustomConnections(civ) {
    const connections = [];

    for(const lane of tree.lanes){
        let active = false;
        let usedIndexes = new Set();
        let from = null;
        for(const rowId of [
            'dark_1',
            'dark_2',
            'feudal_1',
            'feudal_2',
            'castle_1',
            'castle_2',
            'imperial_1',
            'imperial_2',
        ]){
            if(active){
                for(let i=0; i < lane.rows[rowId].length; i++){
                    if(!usedIndexes.has(i)){
                        connections.push([from.id, lane.rows[rowId][i].id]);
                        usedIndexes.add(i);
                    }
                }
            }
            if(!active && lane.rows[rowId].length){
                active = true;
                from = lane.rows[rowId][0];
            }
        }
    }
    console.log(connections);

    for (let item of civ.civ_techs_buildings) {
        if (item["Link ID"] >= 0) {
            connections.push([b(item["Link ID"]), b(item["Node ID"])]);
        }
    }
    for (let item of civ.civ_techs_units) {
        let from = null;
        let to = null;
        if (item["Link ID"] >= 0) {
            if (item["Link Node Type"] === 'BuildingTech') {
                from = b(item["Link ID"]);
            } else if (['UnitTech', 'UnitUpgrade', 'Unit', 'UniqueUnit'].includes(item["Link Node Type"])) {
                from = u(item["Link ID"]);
            } else if (item["Link Node Type"] === 'Research') {
                from = t(item["Link ID"]);
            } else {
                alert('from' + item["Link Node Type"])
            }
            if (item["Use Type"] === 'Building') {
                to = b(item["Node ID"]);
            } else if (item["Use Type"] === 'Unit') {
                to = u(item["Node ID"]);
            } else if (item["Use Type"] === 'Tech') {
                to = t(item["Node ID"]);
            } else {
                alert('to' + item["Use Type"])
            }
            connections.push([from, to]);
        }
    }
    return connections;
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
