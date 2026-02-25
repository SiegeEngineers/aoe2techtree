let tree;
let data = {};
let parentConnections;
let focusedNodeId = null;

const PADDING = 20;
const PADDING_BETWEEN_COLUMNS = 10;
const TOP_PADDING = 20;

const locales = {
    en: 'English',
    zh: '简体中文',
    tw: '繁體中文',
    fr: 'Français',
    de: 'Deutsch',
    hi: 'हिंदी',
    it: 'Italiano',
    jp: '日本語',
    ko: '한국어',
    ms: 'Bahasa Melayu',
    pl: 'Polski',
    ru: 'Русский',
    es: 'Español',
    mx: 'Español (México)',
    tr: 'Türkçe',
    vi: 'Tiếng Việt',
    br: 'Português (Brasil)',
};
const defaultLocale = 'en';
let currentLocale = 'en';

function loadLocale(localeCode) {
    if (!Object.keys(locales).includes(localeCode)) {
        localeCode = defaultLocale;
    }
    currentLocale = localeCode;
    loadJson('data/locales/' + localeCode + '/strings.json', function (strings) {
        data.strings = strings;
        updatePageTitle();
        createXRefBadges();
        displayData();
        document.getElementById('localeselect').value = localeCode;
        document.documentElement.setAttribute('lang', localeCode);
    });
}

function updatePageTitle() {
    const aoe2 = data.strings[data.tech_tree_strings['Age of Empires II']];
    const mode = data.strings[data.tech_tree_strings['mode']]
    const suffix = mode ? ' – ' + mode : ''
    const techtree = data.strings[data.tech_tree_strings['Technology Tree']];
    document.title = `${aoe2}${suffix} ${techtree}`;
}

function displayData() {
    // Reset containers
    document.getElementById('civselect').innerHTML = '';
    document.getElementById('buildingindex__table').innerHTML = '';
    document.getElementById('key__table').innerHTML = '';

    fillCivSelector();
    let civWasLoaded = updateCivselectValue();
    if (!civWasLoaded) {
        loadCiv();
    }
    create_colour_key();
    window.onhashchange = function () {
        updateCivselectValue();
    };
}

function updateCivselectValue() {
    let hash = window.location.hash.substring(1);
    let capitalisedHash = hash.substring(0, 1).toUpperCase() + hash.substring(1).toLowerCase();
    if (capitalisedHash in data.civs) {
        const civSelect = document.getElementById('civselect');
        if (civSelect.value !== capitalisedHash) {
            civSelect.value = capitalisedHash;
            loadCiv();
            return true;
        }
    }
    return false;
}

function setAdvancedStatsState() {
    try {
        let showAdvancedStats = localStorage.getItem('showAdvancedStats');
        let advancedStats = document.getElementById('advanced-stats');
        if (showAdvancedStats === 'true') {
            advancedStats.open = true;
        }
        advancedStats.onclick = onAdvancedStatsStateUpdate;
    } catch (e) {
        // pass
    }
}

function onAdvancedStatsStateUpdate() {
    try {
        localStorage.setItem('showAdvancedStats', (!document.getElementById('advanced-stats').open).toString());
    } catch (e) {
        // pass
    }
}

function loadCiv() {
    const selectedCiv = document.getElementById('civselect').value;
    civ(selectedCiv, tree);
    if (selectedCiv in data.civs) {
        document.getElementById('civtext').innerHTML = data.strings[data.civs[selectedCiv].help_string_id];
        document.getElementById('civlogo').src = `./img/Civs/${selectedCiv.toLowerCase()}.png`;
        window.location.hash = selectedCiv;
    } else {
        document.getElementById('civtext').innerHTML = '';
        document.getElementById('civlogo').src = document.getElementById('civlogo').dataset.transparent;
    }
    hideHelp();
}

function loadJson(file, callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function resetHighlightPath() {
    unhighlightPath();
    if (focusedNodeId) {
        highlightPath(focusedNodeId);
    }
}

function unhighlightPath() {
    SVG.find('.node.is-highlight, .connection.is-highlight')
        .each((el) => {
            el.removeClass('is-highlight')
        });
}

function highlightPath(caretId) {
    recurse(caretId);

    function recurse(caretId) {
        SVG('#' + caretId).addClass('is-highlight');

        const parentIds = parentConnections.get(caretId);
        if (!parentIds) return;

        for (let parentId of parentIds) {
            const line = SVG(`#connection_${parentId}_${caretId}`);
            if (line) {
                // Move to the end of the <g> element so that it is drawn on top.
                // Without this, the line would be highlighted, but other unhighlighted
                // connection lines could be drawn on top, undoing the highlighting.
                line.front().addClass('is-highlight');
            }
            recurse(parentId);
        }
    }
}

function displayHelp(caretId, helpStringId, element_height, tree_height) {
    focusedNodeId = caretId;
    let helptextContent = document.getElementById('helptext__content');
    let helptextAdvancedStats = document.getElementById('helptext__advanced_stats');
    let overlay = SVG(`#${caretId}_overlay`);
    let name = overlay.data('name');
    let fullId = overlay.data('id').replace('_copy', '');
    let caret = overlay.data('caret');
    helptextContent.innerHTML = getHelpText(name, fullId, helpStringId);
    helptextAdvancedStats.innerHTML = getAdvancedStats(name, fullId);
    styleXRefBadges(name, fullId);
    positionHelptext(caret, element_height, tree_height);
    resetHighlightPath();
}

function hideHelp() {
    focusedNodeId = null;
    const helptext = document.getElementById('helptext');
    helptext.style.display = 'none';
    resetHighlightPath();
}

function positionHelptext(caret, element_height, tree_height) {
    const helptext = document.getElementById('helptext');
    helptext.style.display = 'block';
    positionHelptextBelow(caret, helptext, element_height, tree_height)
    || positionHelptextAbove(caret, helptext)
    || positionHelptextToLeftOrRight(caret, helptext, element_height);
}

function positionHelptextBelow(caret, helptext, element_height, tree_height) {
    let top = caret.y + element_height + document.getElementById('root').getBoundingClientRect().top;
    let helpbox = helptext.getBoundingClientRect();
    if (top + helpbox.height > tree_height) {
        return false;
    }

    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('techtree');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = techtree.scrollLeft;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
    return true;
}

function positionHelptextAbove(caret, helptext) {
    let helpbox = helptext.getBoundingClientRect();
    let top = caret.y - helpbox.height + document.getElementById('root').getBoundingClientRect().top;
    if (top < 0) {
        return false;
    }

    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('techtree');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = techtree.scrollLeft;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
    return true;
}

function positionHelptextToLeftOrRight(caret, helptext, element_height) {
    let helpbox = helptext.getBoundingClientRect();
    let top = 0;
    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('techtree');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = caret.x + element_height;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
}

function chargeText(type) {
    switch (type) {
        case 1:
            return 'Charge Attack:&nbsp;';
        case 2:
            return 'Charge Hit Points:&nbsp;';
        case 3:
            return 'Charged Area Attack:&nbsp;';
        case 4:
            return 'Projectile Dodging:&nbsp;';
        case 5:
            return 'Melee Attack Blocking:&nbsp;';
        case 6:
            return 'Charged Ranged Attack (type 1):&nbsp;';
        case 7:
            return 'Charged Ranged Attack (type 2):&nbsp;';
        default:
            return 'Unknown Charge:&nbsp;';
    }
}

function splitTrait(trait) {
    const traits = [];
    for (let x of [1, 2, 4, 8, 16, 32, 64, 128]) {
        if ((trait & x) > 0) {
            traits.push(x);
        }
    }
    return traits;
}

function traitsIfDefined(trait, traitPiece) {
    let traitdescriptions = [];
    if (trait === undefined || trait === 0) {
        return false;
    }
    const traits = splitTrait(trait);
    for (let singleTrait of traits) {
        switch (singleTrait) {
            case 1:
                traitdescriptions.push('Garrison Unit');
                break;
            case 2:
                traitdescriptions.push('Ship Unit');
                break;
            case 4:
                traitdescriptions.push('Builds:&nbsp;' + data.strings[data.data['Building'][traitPiece]['LanguageNameId']]);
                break;
            case 8:
                traitdescriptions.push('Transforms into:&nbsp;' + data.strings[(data.data['Building'][traitPiece] || data.data['Unit'][traitPiece])['LanguageNameId']]);
                break;
            case 16:
                traitdescriptions.push('<abbr title="has auto-scout behaviour if placed at start">Scout Unit</abbr>');
                break;
            default:
                traitdescriptions.push('Unknown Trait:&nbsp;' + trait);
        }
    }
    return traitdescriptions;
}

function getHelpText(name, fullId, helpStringId) {
    const trueHelpStringId = helpStringId - 79000;
    const items = fullId.split('_');
    const type = items[0];
    const id = items[1];
    let text = data.strings[trueHelpStringId];
    if (text === undefined) {
        return '? ' + trueHelpStringId;
    }
    text = text.replace(/\n/g, '');
    if (type === 'Tech') {
        text = text.replace(/(.+?\(.+?\))(.*)/m,
            '<p class="helptext__heading">$1</p>' +
            '<p class="helptext__desc">$2</p>' +
            '<p class="helptext__stats">&nbsp;</p>');
    } else if (type === 'Unit') {
        text = text.replace(/(.+?\(‹cost›\))(.+?)<i>\s*(.+?)<\/i>(.*)/m,
            '<p class="helptext__heading">$1</p>' +
            '<p class="helptext__desc">$2</p>' +
            '<p class="helptext__upgrade_info"><em>$3</em></p>' +
            '<p class="helptext__stats">$4</p>');
    } else if (type === 'Building') {
        // convert the 'Required for' text in <i> to <em> so that it doesn't break the next regex
        text = text.replace(/<b><i>(.+?)<\/b><\/i>/m, '<b><em>$1</em></b>');
        if (text.indexOf('<i>') >= 0) {
            text = text.replace(/(.+?\(‹cost›\))(.+?)<i>\s*(.+?)<\/i>(.*)/m,
                '<p class="helptext__heading">$1</p>' +
                '<p class="helptext__desc">$2</p>' +
                '<p class="helptext__upgrade_info"><em>$3</em></p>' +
                '<p class="helptext__stats">$4</p>');
        } else {
            // Handle certain buildings like Wonders separately as the upgrades text is missing for them.
            text = text.replace(/(.+?\(‹cost›\))(.*)<br>(.*)/m,
                '<p>$1</p>' +
                '<p>$2</p>' +
                '<p class="helptext__stats">$3</p>');
        }
    }
    text = text.replace(/<br>/g, '');
    if ((type === 'Unit') && id in data.data.unit_upgrades) {
        text = text.replace(/<p class="helptext__stats">/,
            '<h3>Upgrade</h3><p class="helptext__upgrade_cost">' + cost(data.data.unit_upgrades[id].Cost)
            + ' (' + data.data.unit_upgrades[id].ResearchTime + 's)<p><p class="helptext__stats">');
    }
    let meta = data.data[type][id];
    if (meta !== undefined) {
        let displayAttack = false;
        let ranged = meta.Range > 1;
        text = text.replace(/‹cost›/, cost(meta.Cost));
        // The format is ‹static_cost=Gold,200› as with Spies/Treason.
        text = text.replaceAll(/‹static_cost=([^,›]*),([^›]*)›/g, (_, resource, cost) => {
            const className = resource.toLowerCase();
            return `<span class="cost ${className}" title="${cost} ${resource}">${cost}</span>`;
        });
        let stats = []
        if (text.match(/‹hp›/)) {
            stats.push('HP:&nbsp;' + meta.HP);
        }
        if (text.match(/‹attack›/) && meta.Attack > 0) {
            stats.push('Attack:&nbsp;' + meta.Attack);
            displayAttack = true;
        }
        if (text.match(/‹[Aa]rmor›/)) {
            stats.push('Armor:&nbsp;' + meta.MeleeArmor);
        }
        if (text.match(/‹[Pp]iercearmor›/)) {
            stats.push('Pierce armor:&nbsp;' + meta.PierceArmor);
        }
        if (text.match(/‹garrison›/)) {
            stats.push('Garrison:&nbsp;' + meta.GarrisonCapacity);
        }
        if (text.match(/‹range›/) && displayAttack) {
            stats.push('Range:&nbsp;' + meta.Range);
        }
        stats.push(ifDefinedAndGreaterZero(meta.MinRange, 'Min Range:&nbsp;'));
        stats.push(ifDefined(meta.LineOfSight, 'Line of Sight:&nbsp;'));
        stats.push(ifDefined(meta.Speed, 'Speed:&nbsp;'));
        stats.push(secondsIfDefined(meta.TrainTime, 'Build Time:&nbsp;'));
        stats.push(secondsIfDefined(meta.ResearchTime, 'Research Time:&nbsp;'));
        stats.push(ifDefined(meta.FrameDelay, 'Frame Delay:&nbsp;', ranged));
        stats.push(ifDefinedAndGreaterZero(meta.BlastWidth, 'Blast Radius:&nbsp;'));
        stats.push(traitsIfDefined(meta.Trait, meta.TraitPiece));
        stats.push(ifDefinedAndGreaterZero(meta.MaxCharge, chargeText(meta.ChargeType)));
        stats.push(ifDefinedAndGreaterZero(meta.RechargeRate, 'Recharge Rate:&nbsp;'));
        stats.push(secondsIfDefined(meta.RechargeDuration, 'Recharge Duration:&nbsp;'));
        if (displayAttack) {
            stats.push(secondsIfDefined(meta.AttackDelaySeconds, 'Attack Delay:&nbsp;', ranged));
            stats.push(secondsIfDefined(meta.ReloadTime, 'Reload Time:&nbsp;'));
        }
        stats.push(accuracyIfDefined(meta.AccuracyPercent, 'Accuracy:&nbsp;', ranged));
        stats.push(repeatableIfDefined(meta.Repeatable));
        text = text.replace(/<p class="helptext__stats">(.+?)<\/p>/, '<h3>Stats</h3><p>' + stats.filter(Boolean).join(', ') + '<p>')
    } else {
        console.error('No metadata found for ' + name);
    }
    return text;
}

function getAdvancedStats(name, fullId) {
    const items = fullId.split('_');
    const entitytype = items[0];
    const id = items[1];
    let meta = data.data[entitytype][id];
    let text = ''
    if (meta !== undefined) {
        text += arrayIfDefinedAndNonEmpty(meta.Attacks, '<h3>Attacks</h3>');
        text += arrayIfDefinedAndNonEmpty(meta.Armours, '<h3>Armours</h3>');
    } else {
        console.error('No metadata found for ' + name + ' (fullId=' + fullId + ')');
    }
    return text;
}

/**
 * Create the Cross-Reference badges. This is done at load time in order to avoid re-making the
 * badges at runtime per-click on a new unit.
 *
 * @return A container with buttons + images for each civ to be used in cross referencing.
 */
function createXRefBadges() {
    let xRefLinks = document.getElementById('helptext__x_ref__container');
    xRefLinks.innerHTML = '';
    for (let civ of Object.keys(data.civs)) {
        let xRefLink = document.createElement('button');
        xRefLink.addEventListener('click', function () {
            document.getElementById('civselect').value = civ;
            loadCiv();
        });

        let xRefImage = document.createElement('img');

        xRefImage.src = `./img/Civs/${civ.toLowerCase()}.png`;
        xRefImage.title = data.strings[data.civs[civ].name_string_id];
        xRefImage.id = `xRef__badge__${civ}`;
        xRefImage.classList.add('xRef__badge')
        xRefLink.appendChild(xRefImage);
        xRefLinks.appendChild(xRefLink);
    }
}

/**
 * Set on/off of all cross reference badges for a single unit.
 *
 * @param {string} name The name of the entity being cross-referenced.
 * @param {string} fullId The type_id_buildingId of the entity being cross-referenced.
 * @param {string} type The type of the entity being cross-referenced.
 */
function styleXRefBadges(name, fullId) {
    const items = fullId.split('_');
    const type = items[0];
    const id = parseInt(items[1]);
    for (let civ of Object.keys(data.civs)) {
        let xRefImage = document.getElementById(`xRef__badge__${civ}`);
        let found = false;
        if (type === 'Unit') {
            if (data.civs[civ].Unit.includes(id)) {
                found = true;
            }
        } else if (type === 'Tech') {
            if (data.civs[civ].Tech.includes(id)) {
                found = true;
            }
        } else if (type === 'Building') {
            if (data.civs[civ].Building.includes(id)) {
                found = true;
            }
        }
        if (found) {
            xRefImage.style.opacity = '1.0';
        } else {
            xRefImage.style.opacity = '0.2';
        }
    }
}

function ifDefined(value, prefix, alwaysDisplay = true) {
    if (value !== undefined && (alwaysDisplay || value > 0)) {
        return ' ' + prefix + value;
    }
    return '';
}

function secondsIfDefined(value, prefix, alwaysDisplay = true) {
    if (value !== undefined && (alwaysDisplay || value > 0)) {
        return ' ' + prefix + toMaxFixed2(value) + 's';
    }
    return '';
}

function toMaxFixed2(value) {
    return Math.round(value * 100) / 100;
}

function accuracyIfDefined(value, prefix, alwaysDisplay) {
    if (value !== undefined && (alwaysDisplay || (0 < value && value < 100))) {
        return ' ' + prefix + value + '%';
    }
    return '';
}

function ifDefinedAndGreaterZero(value, prefix) {
    if (value !== undefined && value > 0) {
        return ' ' + prefix + value;
    }
    return '';
}

function arrayIfDefinedAndNonEmpty(attacks, prefix) {
    if (attacks !== undefined && 0 < attacks.length) {
        const strings = [];
        for (let attack of attacks) {
            const amount = attack['Amount'];
            const clazz = attackAndArmorClasses[attack['Class']];
            strings.push(`${amount} (${clazz})`);
        }
        return prefix + '<p>' + strings.join(', ') + '</p>';
    }
    return '';
}

function repeatableIfDefined(value) {
    if (value !== undefined) {
        return value ? 'Repeatable' : 'Not Repeatable';
    }
    return '';
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

function create_building_index(treeData) {
    const buildingIndexRowLength = 7;

    const kc = document.getElementById('buildingindex__table');
    kc.innerHTML = '';
    let tr = null;
    let count = 0;
    for (let building of treeData.buildings) {
        if (building.building_in_new_column === false){
            continue;
        }
        if ((count % buildingIndexRowLength) === 0) {
            if (tr) {
                kc.appendChild(tr);
            }
            tr = document.createElement('tr');
        }
        ++count;
        let img = document.createElement('img');
        img.id = 'building_index_' + building.id + '_img';
        img.src = 'img/Building/' + building.picture_index + '.png';
        img.style.height = '24px';
        img.style.width = '24px';
        let td = document.createElement('td');
        td.onclick = function () {
            scrollToBuildingId(building.id);
        }
        td.appendChild(img);
        tr.appendChild(td);
    }
    if (tr) {
        kc.appendChild(tr);
    }
}

function create_colour_key() {
    let table = document.getElementById('key__table');
    let tr = document.createElement('tr');

    let td = document.createElement('td');
    td.style.fontWeight = 'bold';
    td.innerText = data.strings[data.tech_tree_strings['Key']];
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = data.strings[data.tech_tree_strings['Common']];
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = data.strings[data.tech_tree_strings['Regional']];
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = data.strings[data.tech_tree_strings['Unique']];
    tr.appendChild(td);
    table.appendChild(tr);

    tr = document.createElement('tr');
    td = document.createElement('td');
    td.innerText = data.strings[data.tech_tree_strings['Unit']];
    tr.appendChild(td);
    addSquareToKey(tr, 'Unit');
    addSquareToKey(tr, 'RegionalUnit');
    addSquareToKey(tr, 'UniqueUnit');
    table.appendChild(tr);

    tr = document.createElement('tr');
    td = document.createElement('td');
    td.innerText = data.strings[data.tech_tree_strings['Building']];
    tr.appendChild(td);
    addSquareToKey(tr, 'BuildingTech');
    addSquareToKey(tr, 'RegionalBuilding');
    addSquareToKey(tr, 'UniqueBuilding');
    table.appendChild(tr);

    tr = document.createElement('tr');
    td = document.createElement('td');
    td.innerText = data.strings[data.tech_tree_strings['Technology']];
    tr.appendChild(td);
    addSquareToKey(tr, 'Research');
    td = document.createElement('td');
    tr.appendChild(td);
    table.appendChild(tr);
}

function addSquareToKey(tr, nodeType) {
    const td = document.createElement('td');
    td.style.textAlign = 'center';
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.backgroundColor = getColourForNodeType(nodeType);
    span.style.border = '1px outset #8a5d21';
    span.style.width = '23px';
    span.style.height = '23px';
    td.appendChild(span);
    tr.appendChild(td);
}

function changeLocale() {
    const newLocale = document.getElementById('localeselect').value;
    setLocaleInUrl(newLocale);
    setLocaleInLocalStorage(newLocale);
    loadLocale(newLocale);
}

function fillLocaleSelector(currentLocale) {
    Object.keys(locales).map(function (locale) {
        const option = document.createElement('option');
        option.setAttribute('value', locale);
        option.textContent = locales[locale];
        if (currentLocale === locale) {
            option.setAttribute('selected', '')
        }
        document.getElementById('localeselect').appendChild(option);
    });
}

function getCompareLocale() {
    switch (currentLocale) {
        case 'tw':
            return 'zh-TW'
        case 'jp':
            return 'ja';
        default:
            return currentLocale;
    }
}

function fillCivSelector() {
    const compareLocale = getCompareLocale();
    const sorted_civ_names = Object.keys(data.civs).sort((a, b) => {
        const localised_name_a = data.strings[data.civs[a].name_string_id];
        const localised_name_b = data.strings[data.civs[b].name_string_id];
        return localised_name_a.localeCompare(localised_name_b, compareLocale);
    });

    for (let civ_name of sorted_civ_names) {
        const option = document.createElement('option');
        option.setAttribute('value', civ_name);
        option.textContent = data.strings[data.civs[civ_name].name_string_id];
        document.getElementById('civselect').appendChild(option);
    }
}

function hasItemsInGrid(building) {
    for (const row of building.grid) {
        for (const item of row) {
            if (item !== null) {
                return true;
            }
        }
    }
    return false;
}

function civ(civName) {

    loadJson('data/trees/' + civName.toUpperCase() + '.json', function (treeData) {
        const root = document.getElementById('root');
        if (root) {
            document.getElementById('techtree').removeChild(root);
        }

        const tree_height = Math.max(window.innerHeight - 80, 100);
        const row_height = tree_height / 4;
        const element_height = row_height / 3;

        const connections = [];
        const index = {}
        for (const building of treeData.buildings) {
            index[building.id] = building;
        }
        for (const item of treeData.units_techs) {
            index[item.id] = item;
            item.y = item.row * row_height / 2 + TOP_PADDING;
        }
        let startX = 172;
        let width = 0;
        let alreadyOccupiedRows = [];
        let previousRow = 0;
        let previousBuildingInOwnColumn = true;
        let previousNodeType = '';
        for (let building of treeData.buildings) {
            const thisBuildingWidth = building.grid[0].length * (element_height + PADDING_BETWEEN_COLUMNS);
            if (building.building_in_new_column === true
                || previousBuildingInOwnColumn ||
                hasItemsInGrid(building)
                || previousRow > building.row
                || previousNodeType !== building.node_type) {
                // put in new column
                startX += width + PADDING;
                width = thisBuildingWidth;
                alreadyOccupiedRows = [];
            } else {
                // put in same column
                width = Math.max(width, thisBuildingWidth);
                if (previousRow === building.row) {
                    building.row++;
                }
            }
            if (building.link_id !== -1) {
                for (let linked_building of treeData.buildings) {
                    if (linked_building.node_id === building.link_id) {
                        if (linked_building.row === building.row) {
                            building.row++;
                        }
                    }
                }
            }
            building.x = startX + width / 2 - (element_height + PADDING_BETWEEN_COLUMNS) / 2;
            building.y = building.row * row_height / 2 + TOP_PADDING;
            for (let row = 0; row < building.grid.length; row++) {
                for (let col = 0; col < building.grid[row].length; col++) {
                    const itemId = building.grid[row][col];
                    if (itemId) {
                        const item = index[itemId];
                        item.x = startX + col * (element_height + PADDING_BETWEEN_COLUMNS);
                    }
                }
            }
            alreadyOccupiedRows.push(building.row);
            previousRow = building.row;
            previousNodeType = building.node_type;
            previousBuildingInOwnColumn = building.building_in_new_column !== false;
        }
        startX += width;

        for (let building of treeData.buildings) {
            if (building.building_upgraded_from_id !== -1 && building.building_upgraded_from_id !== null) {
                for (let linked_building of treeData.buildings) {
                    if (linked_building.node_id === building.building_upgraded_from_id) {
                        connections.push([linked_building.id, building.id]);
                    }
                }
            } else if (building.link_id !== -1) {
                for (let linked_building of treeData.buildings) {
                    if (linked_building.node_id === building.link_id
                        && building.link_node_type === linked_building.node_type
                        && ((linked_building.building_in_new_column !== false) || (linked_building.node_id === building.building_id))) {
                        connections.push([linked_building.id, building.id]);
                    }
                }
            }
            for (let row = 0; row < building.grid.length; row++) {
                for (let col = 0; col < building.grid[row].length; col++) {
                    const itemId = building.grid[row][col];
                    if (itemId) {
                        const item = index[itemId];
                        if (item.link_id !== -1) {
                            for (let search_row = row - 1; search_row >= 0; search_row--) {
                                const itemOnTopId = building.grid[search_row][col];
                                if (itemOnTopId) {
                                    const itemOnTop = index[itemOnTopId];
                                    if (item.link_id === itemOnTop.node_id && item.link_node_type === itemOnTop.node_type) {
                                        connections.push([itemOnTop.id, item.id]);
                                    }
                                    break;
                                }
                            }
                        } else {
                            let drawLineToBuilding = true;
                            for (let search_row = row - 1; search_row >= 0; search_row--) {
                                const itemOnTopId = building.grid[search_row][col];
                                if (itemOnTopId) {
                                    drawLineToBuilding = false;
                                    break;
                                }
                            }
                            if (drawLineToBuilding) {
                                connections.push([building.id, item.id]);
                            }
                        }
                    }
                }
            }
        }

        parentConnections = new Map();
        connections.forEach(([parent, child]) => {
            if (!parentConnections.has(child)) {
                parentConnections.set(child, []);
            }
            parentConnections.get(child).push(parent);
        });

        create_building_index(treeData);

        const tree_width = startX + PADDING_BETWEEN_COLUMNS;


        const draw = SVG().addTo('#techtree').id('root').size(tree_width, tree_height)
            .click((e) => {
                if (e.target.id === 'root') {
                    hideHelp();
                }
            });

        document.getElementById('techtree').onclick = (e) => {
            if (e.target.id === 'techtree') {
                hideHelp();
            }
        };

        // Draw Age Row Highlighters
        draw.rect(tree_width, row_height).attr({fill: '#4d3617', opacity: 0.3}).click(hideHelp);
        draw.rect(tree_width, row_height).attr({fill: '#4d3617', opacity: 0.3}).click(hideHelp).y(row_height * 2);

        // Add Age Icons
        let icon_height = Math.min(row_height / 2, 112);
        let icon_width = 112;
        let vertical_spacing = (row_height - icon_height) / 2 - 10;
        let margin_left = 20;
        let image_urls = AGE_IMAGES[data.civs[civName].era];
        let age_names = getAgeNames(data.civs[civName].era);
        for (let i = 0; i < image_urls.length; i++) {
            let age_image_group = draw.group().click(hideHelp);
            let age_image = age_image_group.image('img/Ages/' + image_urls[i])
                .size(icon_width, icon_height)
                .x(margin_left)
                .y(row_height * i + vertical_spacing);
            age_image_group
                .text(age_names[i])
                .font({size: 16, weight: 'bold'}) /* Text-anchor: middle does not work. */
                .cx(icon_width / 2 + margin_left)
                .y(age_image.attr('y') + age_image.attr('height') + 5)
            ;
        }

        const connectionGroup = draw.group().attr({id: 'connection_lines'});
        for (let connection of connections) {
            let from = index[connection[0]];
            let to = index[connection[1]];
            const offset = element_height / 2;
            const from_x = from.x + offset;
            const from_y = from.y + offset;
            const to_x = to.x + offset;
            const to_y = to.y + offset;
            let intermediate_height = from_y + (element_height * 2 / 3);
            connectionGroup.polyline([from_x, from_y, from_x, intermediate_height, to_x, intermediate_height, to_x, to_y])
                .attr({id: `connection_${connection[0]}_${connection[1]}`})
                .addClass('connection')
                .click(hideHelp);
        }

        for (const building of treeData.buildings) {
            drawItem(building, element_height, tree_height, draw);
            drawGrid(building, element_height, tree_height, draw, index);
        }
    });
}

function drawGrid(building, element_height, tree_height, draw, index) {
    for (let row = 0; row < building.grid.length; row++) {
        for (let col = 0; col < building.grid[row].length; col++) {
            const itemId = building.grid[row][col];
            if (itemId) {
                const item = index[itemId];
                drawItem(item, element_height, tree_height, draw);
            }
        }
    }
}

function drawItem(itemToDraw, element_height, tree_height, draw) {
    const item = draw.group().attr({id: itemToDraw.id}).addClass('node');
    const rect = item.rect(element_height, element_height).attr({
        fill: getColourForNodeType(itemToDraw.node_type),
        id: `${itemToDraw.id}_bg`
    }).move(itemToDraw.x, itemToDraw.y);
    let name = formatName(data.strings[itemToDraw.name_string_id]);
    const text = item.text(name.toString())
        .font({size: 9, weight: 'bold'})
        .attr({fill: '#ffffff', opacity: 0.95, 'text-anchor': 'middle', id: itemToDraw.id + '_text'})
        .cx(itemToDraw.x + element_height / 2)
        .y(itemToDraw.y + element_height / 1.5);
    const image_placeholder = item.rect(element_height * 0.6, element_height * 0.6)
        .attr({fill: '#000000', opacity: 0.5, id: itemToDraw.id + '_imgph'})
        .move(itemToDraw.x + element_height * 0.2, itemToDraw.y);
    const prefix = 'img/';
    const imgPrefix = prefix + itemToDraw.use_type + '/';
    const image = item.image(imgPrefix + itemToDraw.picture_index + '.png')
        .size(element_height * 0.6, element_height * 0.6)
        .attr({id: itemToDraw.id + '_img'})
        .move(itemToDraw.x + element_height * 0.2, itemToDraw.y);
    if (itemToDraw.node_status === 'NotAvailable') {
        const rect_disabled_gray = item.rect(element_height, element_height).attr({
            fill: '#000',
            opacity: 0.2,
            id: `${itemToDraw.id}_disabled_gray`
        }).move(itemToDraw.x, itemToDraw.y);
        const cross = item.image(prefix + 'cross.png')
            .size(element_height * 0.7, element_height * 0.7)
            .attr({id: itemToDraw.id + '_x'})
            .addClass('cross')
            .move(itemToDraw.x + element_height * 0.15, itemToDraw.y - element_height * 0.04);
    }
    const overlaytrigger = item.rect(element_height, element_height)
        .attr({id: itemToDraw.id + '_overlay'})
        .addClass('node__overlay')
        .move(itemToDraw.x, itemToDraw.y)
        .data({'type': itemToDraw.node_type, 'caret': itemToDraw, 'name': itemToDraw.name, 'id': itemToDraw.id})
        .mouseover(function () {
            highlightPath(itemToDraw.id);
        })
        .mouseout(function () {
            resetHighlightPath();
        })
        .click(function () {
            if (focusedNodeId === itemToDraw.id) {
                hideHelp();
            } else {
                displayHelp(itemToDraw.id, itemToDraw.help_string_id, element_height, tree_height);
            }
        });
}

function techtreeDoesNotHaveScrollbar() {
    const techtreeElement = document.getElementById('techtree');
    return techtreeElement.scrollHeight <= techtreeElement.clientHeight;
}

function shiftKeyIsNotPressed(e) {
    return !e.shiftKey;
}

function scrollToBuildingId(buildingId) {
    const buildingElement = document.getElementById(`${buildingId}_bg`);
    buildingElement.scrollIntoView({block: 'center', inline: 'center'});
}

function getLocaleFromUrlIfExists(defaultValue) {
    const urlParams = new URLSearchParams(window.location.search);
    const lng = urlParams.get('lng');
    if (Object.keys(locales).includes(lng)) {
        return lng;
    }
    return defaultValue;
}

function setLocaleInUrl(locale) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set('lng', locale);
    history.pushState({}, null, `?${searchParams}${window.location.hash}`);
}

function setLocaleInLocalStorage(localeCode) {
    try {
        window.localStorage.setItem('locale', localeCode);
    } catch (e) {
        // pass
    }
}

function getInitialLocale() {
    let storedLocale = defaultLocale;
    try {
        storedLocale = window.localStorage.getItem('locale');
    } catch (e) {
        // pass
    }
    storedLocale = getLocaleFromUrlIfExists(storedLocale);
    return storedLocale;
}

function main() {

    history.pushState = (f => function pushState() {
        const ret = f.apply(this, arguments); // Fixme: Void function return value is used.
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.pushState);

    history.replaceState = (f => function replaceState() {
        const ret = f.apply(this, arguments); // Fixme: Void function return value is used.
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.replaceState);

    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
    });

    window.addEventListener('locationchange', () => {
        const newLocale = getLocaleFromUrlIfExists(undefined);
        const oldLocale = document.getElementById('localeselect').value;
        if (newLocale && (newLocale !== oldLocale)) {
            loadLocale(newLocale);
        }
    })

    setAdvancedStatsState();

    let storedLocale = getInitialLocale();
    fillLocaleSelector(storedLocale);

    loadJson('data/data.json', function (response) {
        data = response;
        loadLocale(storedLocale);
    });

    let doVerticalScroll = true;
    const techtreeElement = document.getElementById('techtree');
    techtreeElement.addEventListener('wheel', function (e) {
        if (e.deltaX !== 0) {
            doVerticalScroll = false;
        }
        if (doVerticalScroll && techtreeDoesNotHaveScrollbar() && shiftKeyIsNotPressed(e)) {
            if (e.deltaY > 0) {
                techtreeElement.scrollLeft += 150;
            } else if (e.deltaY < 0) {
                techtreeElement.scrollLeft -= 150;
            }
        }
    });
}

if ('loading' === document.readyState) {
    // Loading hasn't finished yet.
    document.addEventListener('DOMContentLoaded', main)
} else {
    // `DOMContentLoaded` has already fired.
    main();
}
