/**
 * The main.js file is supposed to contain logic specific to the website, like those modifying the HTML elements, and the event listeners.
 * To reduce size of the main.js file, this file includes the logic of the game engine-specific logic, logic for the 'Caret' class, or any other simple logic.
 */

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

const armorClasses = {
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
    16: '<abbr title="except Fishing Ships">Ships</abbr>',
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
    60: 'Long-Range Warships'
};

const animation_duration = 50;

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

function imagePrefix(name) {
    return name.replace('_copy', '')
        .replace('building_', 'Buildings/')
        .replace('unit_', 'Units/')
        .replace('tech_', 'Techs/');
}

function cost(cost_object) {
    let value = '';
    if (cost_object.Food) {
        value += `<span class="cost food" title="${cost_object.Food} Food">${cost_object.Food}</span>`;
    }
    if (cost_object.Wood) {
        value += `<span class="cost wood" title="${cost_object.Wood} Wood">${cost_object.Wood}</span>`;
    }
    if (cost_object.Gold) {
        value += `<span class="cost gold" title="${cost_object.Gold} Gold">${cost_object.Gold}</span>`;
    }
    if (cost_object.Stone) {
        value += `<span class="cost stone" title="${cost_object.Stone} Stone">${cost_object.Stone}</span>`;
    }
    if (value === '') return 'free';
    return value;
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

function chargeText(type) {
    switch (type) {
        case 1: return 'Charge Attack:&nbsp;';
        case 2: return 'Charge Hit Points:&nbsp;';
        case 3: return 'Charged Area Attack:&nbsp;';
        case 4: return 'Projectile Dodging:&nbsp;';
        case 5: return 'Melee Attack Blocking:&nbsp;';
        case 6: return 'Charged Ranged Attack (type 1):&nbsp;';
        case 7: return 'Charged Ranged Attack (type 2):&nbsp;';
        default: return 'Unknown Charge:&nbsp;';
    }
}

function getEntityType(type) {
    switch (type) {
        case 'TECHNOLOGY':
            return 'techs';
        case 'UNIT':
        case 'UNIQUEUNIT':
            return 'units';
    }
    return 'buildings';
}

/**
 * @param {number} trait
 * @return {number[]}
 */
function splitTrait(trait) {
    const traits = [];
    for (let x of [1, 2, 4, 8, 16, 32, 64, 128]) {
        if ((trait & x) > 0) {
            traits.push(x);
        }
    }
    return traits;
}

/**
 * @param {number} traitId
 * @param {number} traitPiece
 * @return {string}
 */
function getTraitDefinition(traitId, traitPiece) {
    switch (traitId) {
        case 1: return 'Garrison Unit';
        case 2: return 'Ship Unit';
        case 4: return 'Builds:&nbsp;' + data.strings[data.data['buildings'][traitPiece]['LanguageNameId']];
        case 8: return 'Transforms into:&nbsp;' + data.strings[(data.data['buildings'][traitPiece] || data.data['units'][traitPiece])['LanguageNameId']];
        case 16: return '<abbr title="has auto-scout behaviour">Scout Unit</abbr>';
        default: return 'Unknown Trait:&nbsp;' + traitId;
    }
}

/**
 * @param {number} trait
 * @param {string} traitPiece
 * @return {*[]|boolean}
 */
function traitsIfDefined(trait, traitPiece) {
    let traitdescriptions = [];
    if (trait === undefined || trait === 0) {
        return false;
    }
    const traits = splitTrait(trait);
    for (let singleTrait of traits) {
        traitdescriptions.push(getTraitDefinition(singleTrait, Number(traitPiece)));
    }
    return traitdescriptions;
}

function getName(id, itemtype) {
    // ToDo handle unique stuff properly
    if (id.toString().startsWith('UNIQUE')) {
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
    let nodeType = data['data']?.['node_types']?.[itemtype]?.[id];
    if (!nodeType) {
        nodeType = itemtype === 'units' ? 'Unit' : 'BuildingTech';
    }
    return getColourForNodeType(nodeType);
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

function u(unit) {
    return 'unit_' + formatId(unit);
}

function b(building) {
    return 'building_' + formatId(building);
}

function t(tech) {
    return 'tech_' + formatId(tech);
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
