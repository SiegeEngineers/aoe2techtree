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

const UNIQUE_UNIT = "UNIQUE UNIT";
const ELITE_UNIQUE_UNIT = "ELITE UNIQUE UNIT";
const UNIQUE_TECH_1 = "UNIQUE TECH 1";
const UNIQUE_TECH_2 = "UNIQUE TECH 2";
const MONK_PREFIX_MESO = "meso_";
const MONK_PREFIX_AFRICAN = "african_";
const MONK_PREFIX_ASIAN = "asian_";
const MONK_PREFIX_GENERIC = "";
const EAGLE_SCOUT = "Eagle Scout";
const EAGLE_WARRIOR = "Eagle Warrior";
const ELITE_EAGLE_WARRIOR = "Elite Eagle Warrior";
const BATTLE_ELEPHANT = "Battle Elephant";
const STEPPE_LANCER = "Steppe Lancer";
const ELITE_BATTLE_ELEPHANT = "Elite Battle Elephant";
const ELITE_STEPPE_LANCER = "Elite Steppe Lancer";
const KREPOST = "Krepost";
const FEITORIA = "Feitoria";
const MONK = "Monk";
const CAVALRY_ARCHER = "Cavalry Archer";
const HEAVY_CAV_ARCHER = "Heavy Cav Archer";
const PARTHIAN_TACTICS = "Parthian Tactics";
const STABLE = "Stable";
const SCALE_BARDING_ARMOR = "Scale Barding Armor";
const CHAIN_BARDING_ARMOR = "Chain Barding Armor";
const PLATE_BARDING_ARMOR = "Plate Barding Armor";
const ARCHERY_RANGE = "Archery Range";
const ARCHER = "Archer";
const SKIRMISHER = "Skirmisher";
const CROSSBOWMAN = "Crossbowman";
const ELITE_SKIRMISHER = "Elite Skirmisher";
const SLINGER = "Slinger";
const GENITOUR = "Genitour";
const THUMB_RING = "Thumb Ring";
const ARBALESTER = "Arbalester";
const IMPERIAL_SKIRMISHER = "Imperial Skirmisher";
const HAND_CANNONEER = "Hand Cannoneer";
const ELITE_GENITOUR = "Elite Genitour";
const BARRACKS = "Barracks";
const MILITIA = "Militia";
const MAN_AT_ARMS = "Man-at-Arms";
const SPEARMAN = "Spearman";
const SUPPLIES = "Supplies";
const LONG_SWORDSMAN = "Long Swordsman";
const PIKEMAN = "Pikeman";
const SQUIRES = "Squires";
const ARSON = "Arson";
const TWO_HANDED_SWORDSMAN = "Two-Handed Swordsman";
const CHAMPION = "Champion";
const HALBERDIER = "Halberdier";
const CONDOTTIERO = "Condottiero";
const SCOUT_CAVALRY = "Scout Cavalry";
const BLOODLINES = "Bloodlines";
const LIGHT_CAVALRY = "Light Cavalry";
const KNIGHT = "Knight";
const CAMEL_RIDER = "Camel Rider";
const HUSBANDRY = "Husbandry";
const HUSSAR = "Hussar";
const CAVALIER = "Cavalier";
const HEAVY_CAMEL_RIDER = "Heavy Camel Rider";
const IMPERIAL_CAMEL_RIDER = "Imperial Camel Rider";
const PALADIN = "Paladin";
const WONDER = "Wonder";
const DOCK = "Dock";
const FISHING_SHIP = "Fishing Ship";
const TRANSPORT_SHIP = "Transport Ship";
const FIRE_GALLEY = "Fire Galley";
const TRADE_COG = "Trade Cog";
const DEMOLITION_RAFT = "Demolition Raft";
const GALLEY = "Galley";
const FIRE_SHIP = "Fire Ship";
const GILLNETS = "Gillnets";
const DEMOLITION_SHIP = "Demolition Ship";
const WAR_GALLEY = "War Galley";
const TURTLE_SHIP = "Turtle Ship";
const LONGBOAT = "Longboat";
const CARAVEL = "Caravel";
const CAREENING = "Careening";
const FAST_FIRE_SHIP = "Fast Fire Ship";
const CANNON_GALLEON = "Cannon Galleon";
const HEAVY_DEMO_SHIP = "Heavy Demo Ship";
const GALLEON = "Galleon";
const ELITE_TURTLE_SHIP = "Elite Turtle Ship";
const ELITE_LONGBOAT = "Elite Longboat";
const ELITE_CARAVEL = "Elite Caravel";
const ELITE_CANNON_GALLEON = "Elite Cannon Galleon";
const DRY_DOCK = "Dry Dock";
const SHIPWRIGHT = "Shipwright";
const FISH_TRAP = "Fish Trap";
const OUTPOST = "Outpost";
const WATCH_TOWER = "Watch Tower";
const GUARD_TOWER = "Guard Tower";
const KEEP = "Keep";
const BOMBARD_TOWER = "Bombard Tower";
const PALISADE_WALL = "Palisade Wall";
const PALISADE_GATE = "Palisade Gate";
const GATE = "Gate";
const STONE_WALL = "Stone Wall";
const FORTIFIED_WALL = "Fortified Wall";
const MONASTERY = "Monastery";
const MISSIONARY = "Missionary";
const REDEMPTION = "Redemption";
const FERVOR = "Fervor";
const SANCTITY = "Sanctity";
const ATONEMENT = "Atonement";
const HERBAL_MEDICINE = "Herbal Medicine";
const HERESY = "Heresy";
const BLOCK_PRINTING = "Block Printing";
const ILLUMINATION = "Illumination";
const FAITH = "Faith";
const THEOCRACY = "Theocracy";
const CASTLE = "Castle";
const PETARD = "Petard";
const TREBUCHET = "Trebuchet";
const HOARDINGS = "Hoardings";
const SAPPERS = "Sappers";
const CONSCRIPTION = "Conscription";
const SPIES_TREASON = "Spies/Treason";
const HOUSE = "House";
const TOWN_CENTER = "Town Center";
const VILLAGER = "Villager";
const FEUDAL_AGE = "Feudal Age";
const LOOM = "Loom";
const TOWN_WATCH = "Town Watch";
const CASTLE_AGE = "Castle Age";
const WHEELBARROW = "Wheelbarrow";
const TOWN_PATROL = "Town Patrol";
const IMPERIAL_AGE = "Imperial Age";
const HAND_CART = "Hand Cart";
const SIEGE_WORKSHOP = "Siege Workshop";
const MANGONEL = "Mangonel";
const BATTERING_RAM = "Battering Ram";
const SCORPION = "Scorpion";
const SIEGE_TOWER = "Siege Tower";
const ONAGER = "Onager";
const CAPPED_RAM = "Capped Ram";
const HEAVY_SCORPION = "Heavy Scorpion";
const BOMBARD_CANNON = "Bombard Cannon";
const SIEGE_ONAGER = "Siege Onager";
const SIEGE_RAM = "Siege Ram";
const BLACKSMITH = "Blacksmith";
const PADDED_ARCHER_ARMOR = "Padded Archer Armor";
const FLETCHING = "Fletching";
const FORGING = "Forging";
const SCALE_MAIL_ARMOR = "Scale Mail Armor";
const LEATHER_ARCHER_ARMOR = "Leather Archer Armor";
const BODKIN_ARROW = "Bodkin Arrow";
const IRON_CASTING = "Iron Casting";
const CHAIN_MAIL_ARMOR = "Chain Mail Armor";
const RING_ARCHER_ARMOR = "Ring Archer Armor";
const BRACER = "Bracer";
const BLAST_FURNACE = "Blast Furnace";
const PLATE_MAIL_ARMOR = "Plate Mail Armor";
const UNIVERSITY = "University";
const MASONRY = "Masonry";
const BALLISTICS = "Ballistics";
const HEATED_SHOT = "Heated Shot";
const MURDER_HOLES = "Murder Holes";
const TREADMILL_CRANE = "Treadmill Crane";
const ARCHITECTURE = "Architecture";
const CHEMISTRY = "Chemistry";
const SIEGE_ENGINEERS = "Siege Engineers";
const ARROWSLITS = "Arrowslits";
const MINING_CAMP = "Mining Camp";
const STONE_MINING = "Stone Mining";
const GOLD_MINING = "Gold Mining";
const STONE_SHAFT_MINING = "Stone Shaft Mining";
const GOLD_SHAFT_MINING = "Gold Shaft Mining";
const LUMBER_CAMP = "Lumber Camp";
const DOUBLE_BIT_AXE = "Double-Bit Axe";
const BOW_SAW = "Bow Saw";
const TWO_MAN_SAW = "Two-Man Saw";
const MARKET = "Market";
const TRADE_CART = "Trade Cart";
const COINAGE = "Coinage";
const CARAVAN = "Caravan";
const BANKING = "Banking";
const GUILDS = "Guilds";
const MILL = "Mill";
const HORSE_COLLAR = "Horse Collar";
const HEAVY_PLOW = "Heavy Plow";
const CROP_ROTATION = "Crop Rotation";
const FARM = "Farm";
const JAGUAR_WARRIOR = "Jaguar Warrior";
const ELITE_JAGUAR_WARRIOR = "Elite Jaguar Warrior";
const ATLATL = "Atlatl";
const GARLAND_WARS = "Garland Wars";
const CAMEL_ARCHER = "Camel Archer";
const ELITE_CAMEL_ARCHER = "Elite Camel Archer";
const KASBAH = "Kasbah";
const MAGHRABI_CAMELS = "Maghrabi Camels";
const LONGBOWMAN = "Longbowman";
const ELITE_LONGBOWMAN = "Elite Longbowman";
const YEOMEN = "Yeomen";
const WARWOLF = "Warwolf";
const KONNIK = "Konnik";
const ELITE_KONNIK = "Elite Konnik";
const STIRRUPS = "Stirrups";
const BAGAINS = "Bagains";
const ARAMBAI = "Arambai";
const ELITE_ARAMBAI = "Elite Arambai";
const HOWDAH = "Howdah";
const MANIPUR_CAVALRY = "Manipur Cavalry";
const CATAPHRACT = "Cataphract";
const ELITE_CATAPHRACT = "Elite Cataphract";
const GREEK_FIRE = "Greek Fire";
const LOGISTICA = "Logistica";
const WOAD_RAIDER = "Woad Raider";
const ELITE_WOAD_RAIDER = "Elite Woad Raider";
const STRONGHOLD = "Stronghold";
const FUROR_CELTICA = "Furor Celtica";
const CHU_KO_NU = "Chu Ko Nu";
const ELITE_CHU_KO_NU = "Elite Chu Ko Nu";
const GREAT_WALL = "Great Wall";
const ROCKETRY = "Rocketry";
const KIPCHAK = "Kipchak";
const ELITE_KIPCHAK = "Elite Kipchak";
const STEPPE_HUSBANDRY = "Steppe Husbandry";
const CUMAN_MERCENARIES = "Cuman Mercenaries";
const SHOTEL_WARRIOR = "Shotel Warrior";
const ELITE_SHOTEL_WARRIOR = "Elite Shotel Warrior";
const ROYAL_HEIRS = "Royal Heirs";
const TORSION_ENGINES = "Torsion Engines";
const THROWING_AXEMAN = "Throwing Axeman";
const ELITE_THROWING_AXEMAN = "Elite Throwing Axeman";
const CHIVALRY = "Chivalry";
const BEARDED_AXE = "Bearded Axe";
const HUSKARL = "Huskarl";
const ELITE_HUSKARL = "Elite Huskarl";
const ANARCHY = "Anarchy";
const PERFUSION = "Perfusion";
const TARKAN = "Tarkan";
const ELITE_TARKAN = "Elite Tarkan";
const MARAUDERS = "Marauders";
const ATHEISM = "Atheism";
const KAMAYUK = "Kamayuk";
const ELITE_KAMAYUK = "Elite Kamayuk";
const ANDEAN_SLING = "Andean Sling";
const COURIERS = "Couriers";
const ELEPHANT_ARCHER = "Elephant Archer";
const ELITE_ELEPHANT_ARCHER = "Elite Elephant Archer";
const SULTANS = "Sultans";
const SHATAGNI = "Shatagni";
const GENOESE_CROSSBOWMAN = "Genoese Crossbowman";
const ELITE_GENOESE_CROSSBOWMAN = "Elite Genoese Crossbowman";
const PAVISE = "Pavise";
const SILK_ROAD = "Silk Road";
const SAMURAI = "Samurai";
const ELITE_SAMURAI = "Elite Samurai";
const YASAMA = "Yasama";
const KATAPARUTO = "Kataparuto";
const BALLISTA_ELEPHANT = "Ballista Elephant";
const ELITE_BALLISTA_ELEPHANT = "Elite Ballista Elephant";
const TUSK_SWORDS = "Tusk Swords";
const DOUBLE_CROSSBOW = "Double Crossbow";
const WAR_WAGON = "War Wagon";
const ELITE_WAR_WAGON = "Elite War Wagon";
const PANOKSEON = "Panokseon";
const SHINKICHON = "Shinkichon";
const LEITIS = "Leitis";
const ELITE_LEITIS = "Elite Leitis";
const HILL_FORTS = "Hill Forts";
const TOWER_SHIELDS = "Tower Shields";
const MAGYAR_HUSZAR = "Magyar Huszar";
const ELITE_MAGYAR_HUSZAR = "Elite Magyar Huszar";
const MERCENARIES = "Corvinian Army";
const RECURVE_BOW = "Recurve Bow";
const KARAMBIT_WARRIOR = "Karambit Warrior";
const ELITE_KARAMBIT_WARRIOR = "Elite Karambit Warrior";
const THALASSOCRACY = "Thalassocracy";
const FORCED_LEVY = "Forced Levy";
const GBETO = "Gbeto";
const ELITE_GBETO = "Elite Gbeto";
const TIGUI = "Tigui";
const FARIMBA = "Farimba";
const PLUMED_ARCHER = "Plumed Archer";
const ELITE_PLUMED_ARCHER = "Elite Plumed Archer";
const OBSIDIAN_ARROWS = "Obsidian Arrows";
const EL_DORADO = "El Dorado";
const MANGUDAI = "Mangudai";
const ELITE_MANGUDAI = "Elite Mangudai";
const NOMADS = "Nomads";
const DRILL = "Drill";
const WAR_ELEPHANT = "War Elephant";
const ELITE_WAR_ELEPHANT = "Elite War Elephant";
const KAMANDARAN = "Kamandaran";
const MAHOUTS = "Mahouts";
const ORGAN_GUN = "Organ Gun";
const ELITE_ORGAN_GUN = "Elite Organ Gun";
const CARRACK = "Carrack";
const ARQUEBUS = "Arquebus";
const MAMELUKE = "Mameluke";
const ELITE_MAMELUKE = "Elite Mameluke";
const MADRASAH = "Madrasah";
const ZEALOTRY = "Zealotry";
const BOYAR = "Boyar";
const ELITE_BOYAR = "Elite Boyar";
const ORTHODOXY = "Orthodoxy";
const DRUZHINA = "Druzhina";
const CONQUISTADOR = "Conquistador";
const ELITE_CONQUISTADOR = "Elite Conquistador";
const INQUISITION = "Inquisition";
const SUPREMACY = "Supremacy";
const KESHIK = "Keshik";
const ELITE_KESHIK = "Elite Keshik";
const SILK_ARMOR = "Silk Armor";
const TIMURID_SIEGECRAFT = "Timurid Siegecraft";
const TEUTONIC_KNIGHT = "Teutonic Knight";
const ELITE_TEUTONIC_KNIGHT = "Elite Teutonic Knight";
const IRONCLAD = "Ironclad";
const CRENELLATIONS = "Crenellations";
const JANISSARY = "Janissary";
const ELITE_JANISSARY = "Elite Janissary";
const SIPAHI = "Sipahi";
const ARTILLERY = "Artillery";
const RATTAN_ARCHER = "Rattan Archer";
const ELITE_RATTAN_ARCHER = "Elite Rattan Archer";
const CHATRAS = "Chatras";
const PAPER_MONEY = "Paper Money";
const BERSERK = "Berserk";
const ELITE_BERSERK = "Elite Berserk";
const CHIEFTAINS = "Chieftains";
const BERSERKERGANG = "Berserkergang";

const horseDisabledBuildings = [STABLE];
const horseDisabledUnits = [SCOUT_CAVALRY, LIGHT_CAVALRY, HUSSAR, KNIGHT, PALADIN, CAMEL_RIDER,
    HEAVY_CAMEL_RIDER, CAVALIER, CAVALRY_ARCHER, HEAVY_CAV_ARCHER];
const horseDisabledTech = [BLOODLINES, HUSBANDRY, SCALE_BARDING_ARMOR, CHAIN_BARDING_ARMOR,
    PLATE_BARDING_ARMOR, PARTHIAN_TACTICS];

const defaultDisabledUnits = [EAGLE_SCOUT, EAGLE_WARRIOR, ELITE_EAGLE_WARRIOR, BATTLE_ELEPHANT,
    ELITE_BATTLE_ELEPHANT, STEPPE_LANCER, ELITE_STEPPE_LANCER,];
    
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
    enable([], [UNIQUE_UNIT, ELITE_UNIQUE_UNIT], []);
    disable(defaultDisabledBuildings, defaultDisabledUnits, []);
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
        monk_prefix = MONK_PREFIX_GENERIC;
    }
    SVG.get('unit_' + formatId(UNIQUE_UNIT) + '_text').text(formatName(names[0]));
    SVG.get('unit_' + formatId(UNIQUE_UNIT) + '_overlay').data({'name': names[0]});
    SVG.get('unit_' + formatId(ELITE_UNIQUE_UNIT) + '_text').text(formatName(names[1]));
    SVG.get('unit_' + formatId(ELITE_UNIQUE_UNIT) + '_overlay').data({'name': names[1]});
    SVG.get('tech_' + formatId(UNIQUE_TECH_1) + '_text').text(formatName(names[2]));
    SVG.get('tech_' + formatId(UNIQUE_TECH_1) + '_overlay').data({'name': names[2]});
    SVG.get('tech_' + formatId(UNIQUE_TECH_2) + '_text').text(formatName(names[3]));
    SVG.get('tech_' + formatId(UNIQUE_TECH_2) + '_overlay').data({'name': names[3]});
    SVG.get('unit_' + formatId(UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(names[0]) + '.png');
    SVG.get('unit_' + formatId(ELITE_UNIQUE_UNIT) + '_img').load('img/Units/' + formatId(names[1]) + '.png');
    SVG.get('unit_' + formatId(MONK) + '_img').load('img/Units/' + monk_prefix + 'monk.png');
}


function disableHorses() {
    disable(horseDisabledBuildings, horseDisabledUnits, horseDisabledTech);
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


    let wonderlane = new Lane();
    wonderlane.rows.imperial_1.push(building(WONDER));
    tree.lanes.push(wonderlane);


    let feitorialane = new Lane();
    feitorialane.rows.castle_1.push(building(KREPOST));
    feitorialane.rows.imperial_1.push(building(FEITORIA));
    tree.lanes.push(feitorialane);


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

    let castlelane = new Lane();
    castlelane.rows.castle_1.push(building(CASTLE));
    castlelane.rows.castle_2.push(new Caret(TYPES.UNIQUEUNIT, UNIQUE_UNIT, UNIQUE_UNIT));
    castlelane.rows.castle_2.push(unit(PETARD));
    castlelane.rows.castle_2.push(tech(UNIQUE_TECH_1));
    castlelane.rows.imperial_1.push(new Caret(TYPES.UNIQUEUNIT, ELITE_UNIQUE_UNIT, ELITE_UNIQUE_UNIT));
    castlelane.rows.imperial_1.push(unit(TREBUCHET));
    castlelane.rows.imperial_1.push(tech(UNIQUE_TECH_2));
    castlelane.rows.imperial_1.push(tech(HOARDINGS));
    castlelane.rows.imperial_1.push(tech(SAPPERS));
    castlelane.rows.imperial_1.push(tech(CONSCRIPTION));
    castlelane.rows.imperial_1.push(tech(SPIES_TREASON));
    tree.lanes.push(castlelane);


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
    additionaltowncenterlane.rows.castle_1.push(new Caret(TYPES.BUILDING, TOWN_CENTER, "additional Town Center"));
    tree.lanes.push(additionaltowncenterlane);


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


    let universitylane = new Lane();
    universitylane.rows.castle_1.push(building(UNIVERSITY));
    universitylane.rows.castle_2.push(tech(MASONRY));
    universitylane.rows.castle_2.push(new Caret(TYPES.TECHNOLOGY, FORTIFIED_WALL, FORTIFIED_WALL));
    universitylane.rows.castle_2.push(tech(BALLISTICS));
    universitylane.rows.castle_2.push(new Caret(TYPES.TECHNOLOGY, GUARD_TOWER, GUARD_TOWER));
    universitylane.rows.castle_2.push(tech(HEATED_SHOT));
    universitylane.rows.castle_2.push(tech(MURDER_HOLES));
    universitylane.rows.castle_2.push(tech(TREADMILL_CRANE));
    universitylane.rows.imperial_1.push(tech(ARCHITECTURE));
    universitylane.rows.imperial_1.push(tech(CHEMISTRY));
    universitylane.rows.imperial_1.push(tech(SIEGE_ENGINEERS));
    universitylane.rows.imperial_1.push(new Caret(TYPES.TECHNOLOGY, KEEP, KEEP));
    universitylane.rows.imperial_1.push(tech(ARROWSLITS));
    universitylane.rows.imperial_2.push(new Caret(TYPES.TECHNOLOGY, BOMBARD_TOWER, BOMBARD_TOWER));
    tree.lanes.push(universitylane);

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
    marketlane.rows.feudal_2.push(tech(COINAGE));
    marketlane.rows.castle_1.push(tech(CARAVAN));
    marketlane.rows.castle_1.push(tech(BANKING));
    marketlane.rows.imperial_1.push(tech(GUILDS));
    tree.lanes.push(marketlane);


    let milllane = new Lane();
    milllane.rows.dark_1.push(building(MILL));
    milllane.rows.feudal_1.push(tech(HORSE_COLLAR));
    milllane.rows.castle_1.push(tech(HEAVY_PLOW));
    milllane.rows.imperial_1.push(tech(CROP_ROTATION));
    tree.lanes.push(milllane);


    let farmlane = new Lane();
    farmlane.rows.dark_2.push(building(FARM));
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
        [b(CASTLE), t(HOARDINGS)],
        [b(CASTLE), t(SAPPERS)],
        [b(CASTLE), t(CONSCRIPTION)],
        [b(CASTLE), t(SPIES_TREASON)],
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
        [b(UNIVERSITY), t(FORTIFIED_WALL)],
        [b(UNIVERSITY), t(BALLISTICS)],
        [b(UNIVERSITY), t(GUARD_TOWER)],
        [t(GUARD_TOWER), t(KEEP)],
        [b(UNIVERSITY), t(HEATED_SHOT)],
        [b(UNIVERSITY), t(MURDER_HOLES)],
        [b(UNIVERSITY), t(TREADMILL_CRANE)],
        [t(CHEMISTRY), t(BOMBARD_TOWER)],
        [b(MINING_CAMP), t(STONE_MINING)],
        [t(STONE_MINING), t(STONE_SHAFT_MINING)],
        [b(MINING_CAMP), t(GOLD_MINING)],
        [t(GOLD_MINING), t(GOLD_SHAFT_MINING)],
        [b(LUMBER_CAMP), t(DOUBLE_BIT_AXE)],
        [t(DOUBLE_BIT_AXE), t(BOW_SAW)],
        [t(BOW_SAW), t(TWO_MAN_SAW)],
        [b(MARKET), t(COINAGE)],
        [t(COINAGE), t(BANKING)],
        [b(MARKET), u(TRADE_CART)],
        [b(MILL), b(MARKET)],
        [b(MILL), t(HORSE_COLLAR)],
        [t(HORSE_COLLAR), t(HEAVY_PLOW)],
        [t(HEAVY_PLOW), t(CROP_ROTATION)],
        [b(MILL), b(FARM)],
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

