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

const AGE_IMAGES = {
    'base': ['base_dark_age.png', 'base_feudal_age.png', 'base_castle_age.png', 'base_imperial_age.png'],
    'antiquity': ['ant_archaic_age.png', 'ant_civic_age.png', 'ant_classical_age.png', 'ant_imperial_age.png'],
}

const getAgeNames = (era)=>{
    return [
        data.strings[data.age_names[era][0]],
        data.strings[data.age_names[era][1]],
        data.strings[data.age_names[era][2]],
        data.strings[data.age_names[era][3]],
    ];
}

const attackAndArmorClasses = {
    0: 'Wonders',
    1: 'Infantry',
    2: 'Heavy Warships',
    3: 'Base Pierce',
    4: 'Base Melee',
    5: 'Elephants',
    8: '<abbr title="except Camels">Mounted Units</abbr>',
    11: 'All Buildings',
    13: '<abbr title="except Castles and Kreposts">Stone Defense & Harbors</abbr>',
    14: 'Predator Animals',
    15: 'All Archers',
    16: 'Ships',
    17: 'High Pierce Armor Siege Units',
    18: 'Trees',
    19: 'Unique Units',
    20: 'Siege Units',
    21: '<abbr title="All buildings except Wonders">Standard Buildings</abbr>',
    22: 'Walls & Gates',
    23: 'Gunpowder Units',
    24: 'Aggressive Huntable Animals',
    25: 'Monastery Units',
    26: 'Castles & Kreposts',
    27: 'Spearmen',
    28: 'Mounted Archers',
    29: 'Shock Infantry',
    30: 'Camels',
    31: '<abbr title="Armor-ignoring melee attack against units, but not against buildings">Unblockable Melee</abbr>',
    32: 'Condottieri',
    34: 'Fishing Ships',
    35: 'Mamelukes',
    36: 'Heroes & Kings',
    37: 'Heavy Siege',
    38: 'Skirmishers',
    39: 'Cavalry Resistance',
    40: 'Houses',
    41: 'Fire Ships',
    60: 'Long-Range Warships',
};

const animation_duration = 50;



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

function formatName(originalname) {
    return originalname.toString().replace(/<br>/g, '\n').replace(/\n+/g, '\n');
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
        case 'ResearchedCompleted':
            return '#00739c';
        case 'RegionalUnit':
            return '#515ae3';
        case 'UniqueUnit':
            return '#703b7a';
        case 'Research':
            return '#397139';
        default:
            return '#ff0000';
    }
}
