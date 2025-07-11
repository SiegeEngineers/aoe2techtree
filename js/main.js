let tree;
let data = {};
let civs = {};
let connections;
let parentConnections;
let connectionpoints;
let focusedNodeId = null;

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

function getAgeNumber(row) {
    const age = row.split('_')[0];
    for (let i = 0; i < AGE_IMAGES.length; i++) {
        const ageimage = AGE_IMAGES[i];
        if (ageimage.includes(age)) {
            return i;
        }
    }
    return 1;
}

function displayData() {
    // Reset containers
    const root = document.getElementById('root');
    if (root) {
        document.getElementById('techtree').removeChild(root);
    }
    document.getElementById('civselect').innerHTML = '';
    document.getElementById('buildingindex__table').innerHTML = '';
    document.getElementById('key__table').innerHTML = '';

    tree = getDefaultTree();
    connections = getConnections();
    parentConnections = new Map();
    connections.forEach(([parent, child]) => {
        if (!parentConnections.has(child)) {
            parentConnections.set(child, []);
        }
        parentConnections.get(child).push(parent);
    });
    connectionpoints = getConnectionPoints(tree);
    fillCivSelector();

    const draw = SVG().addTo('#techtree').id('root').size(tree.width, tree.height)
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
    let row_height = tree.height / 4;
    draw.rect(tree.width, row_height).attr({fill: '#4d3617', opacity:0.3}).click(hideHelp);
    draw.rect(tree.width, row_height).attr({fill: '#4d3617', opacity:0.3}).click(hideHelp).y(row_height * 2);

    // Add Age Icons
    let icon_height = Math.min(row_height / 2, 112);
    let icon_width = 112;
    let vertical_spacing = (row_height - icon_height) / 2 - 10;
    let margin_left = 20;
    let image_urls = AGE_IMAGES;
    let age_names = getAgeNames(data);
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
        let from = connectionpoints.get(connection[0]);
        let to = connectionpoints.get(connection[1]);
        let intermediate_height = from.y + (tree.element_height * 2 / 3);
        connectionGroup.polyline([from.x, from.y, from.x, intermediate_height, to.x, intermediate_height, to.x, to.y])
            .attr({id: `connection_${connection[0]}_${connection[1]}`})
            .addClass('connection')
            .click(hideHelp);
    }

    for (let lane of tree.lanes) {
        draw.rect(lane.width + 10, tree.height)
            .attr({fill: '#ffeeaa', 'opacity': 0, class: lane.caretIds().map((id) => `lane-with-${id}`)})
            .move(lane.x - 10, lane.y)
            .click(hideHelp);
        for (let r of Object.keys(lane.rows)) {
            let row = lane.rows[r];
            const ageNumber = getAgeNumber(r);
            for (let caret of row) {
                const item = draw.group().attr({id: caret.id}).addClass('node');
                const rect = item.rect(caret.width, caret.height).attr({
                    fill: caret.colour || caret.type.colour,
                    id: `${caret.id}_bg`
                }).move(caret.x, caret.y);
                let name = formatName(caret.name);
                const y_correction = caret.name ? 0 : 9;
                const text = item.text(name.toString())
                    .font({size: 9, weight: 'bold'})
                    .attr({fill: '#ffffff', opacity: 0.95, 'text-anchor': 'middle', id: caret.id + '_text'})
                    .cx(caret.x + caret.width / 2)
                    .y(caret.y + caret.height / 1.5 + y_correction);
                const image_placeholder = item.rect(caret.width * 0.6, caret.height * 0.6)
                    .attr({fill: '#000000', opacity: 0.5, id: caret.id + '_imgph'})
                    .move(caret.x + caret.width * 0.2, caret.y);
                const prefix = 'img/';
                const image = item.image(prefix + imagePrefix(caret.id) + '.png')
                    .size(caret.width * 0.6, caret.height * 0.6)
                    .attr({id: caret.id + '_img'})
                    .move(caret.x + caret.width * 0.2, caret.y);
                const rect_disabled_gray = item.rect(caret.width, caret.height).attr({
                    fill: '#000',
                    opacity: 0.2,
                    id: `${caret.id}_disabled_gray`
                }).move(caret.x, caret.y);
                const cross = item.image(prefix + 'cross.png')
                    .size(caret.width * 0.7, caret.height * 0.7)
                    .attr({id: caret.id + '_x'})
                    .addClass('cross')
                    .move(caret.x + caret.width * 0.15, caret.y - caret.height * 0.04);
                const earlier_age_image = item.image('img/missing.png')
                    .size(caret.width * 0.3, caret.height * 0.3)
                    .attr({id: caret.id + '_age_img_' + ageNumber, 'opacity': 0})
                    .addClass('earlier-age')
                    .move(caret.x + caret.width * 0.85, caret.y - caret.width * 0.15);
                const overlaytrigger = item.rect(caret.width, caret.height)
                    .attr({id: caret.id + '_overlay'})
                    .addClass('node__overlay')
                    .move(caret.x, caret.y)
                    .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id})
                    .mouseover(function () {
                        highlightPath(caret.id);
                    })
                    .mouseout(function () {
                        resetHighlightPath();
                    })
                    .click(function () {
                        if (focusedNodeId === caret.id) {
                            hideHelp();
                        } else {
                            displayHelp(caret.id);
                        }
                    });
            }
        }
    }

    create_building_index();
    let civWasLoaded = updateCivselectValue();
    if(!civWasLoaded){
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
    if (capitalisedHash in data.civ_names) {
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

function imagePrefix(name) {
    if (name.includes('placeholder')) return 'missing';
    return name.replace('_copy', '')
        .replace('building_', 'Buildings/')
        .replace('unit_', 'Units/')
        .replace('tech_', 'Techs/');
}

function loadCiv() {
    const selectedCiv = document.getElementById('civselect').value;
    civ(selectedCiv, tree);
    if (selectedCiv in data.civ_helptexts) {
        document.getElementById('civtext').innerHTML = data.strings[data.civ_helptexts[selectedCiv]];
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
        .each((el) => {el.removeClass('is-highlight')});
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

function displayHelp(caretId) {
    focusedNodeId = caretId;
    let helptextContent = document.getElementById('helptext__content');
    let helptextAdvancedStats = document.getElementById('helptext__advanced_stats');
    let overlay = SVG(`#${caretId}_overlay`);
    let name = overlay.data('name');
    let id = overlay.data('id').replace('_copy', '');
    let caret = overlay.data('caret');
    let type = overlay.data('type');
    helptextContent.innerHTML = getHelpText(name, id, type);
    helptextAdvancedStats.innerHTML = getAdvancedStats(name, id, type);
    styleXRefBadges(name, id, type);
    positionHelptext(caret);
    resetHighlightPath();
}

function hideHelp() {
    focusedNodeId = null;
    const helptext = document.getElementById('helptext');
    helptext.style.display = 'none';
    resetHighlightPath();
}

function positionHelptext(caret) {
    const helptext = document.getElementById('helptext');
    helptext.style.display = 'block';
    positionHelptextBelow(caret, helptext)
    || positionHelptextAbove(caret, helptext)
    || positionHelptextToLeftOrRight(caret, helptext);
}

function positionHelptextBelow(caret, helptext) {
    let top = caret.y + caret.height + document.getElementById('root').getBoundingClientRect().top;
    let helpbox = helptext.getBoundingClientRect();
    if (top + helpbox.height > tree.height) {
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

function positionHelptextToLeftOrRight(caret, helptext) {
    let helpbox = helptext.getBoundingClientRect();
    let top = 0;
    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('techtree');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = caret.x + caret.width;
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
                traitdescriptions.push('Builds:&nbsp;' + data.strings[data.data['buildings'][traitPiece]['LanguageNameId']]);
                break;
            case 8:
                traitdescriptions.push('Transforms into:&nbsp;' + data.strings[(data.data['buildings'][traitPiece]||data.data['units'][traitPiece])['LanguageNameId']]);
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

function getHelpText(name, id, type) {
    let entitytype = getEntityType(type);
    const items = id.split('_', 1);
    id = id.substring(items[0].length + 1);
    if (id === "null") {
        return '?';
    }
    let text = data.strings[data.data[entitytype][id]['LanguageHelpId']];
    if (text === undefined) {
        return '?';
    }
    text = text.replace(/\n/g, '');
    if (type === 'TECHNOLOGY') {
        text = text.replace(/(.+?\(.+?\))(.*)/m,
            '<p class="helptext__heading">$1</p>' +
            '<p class="helptext__desc">$2</p>' +
            '<p class="helptext__stats">&nbsp;</p>');
    } else if (type === 'UNIT' || type === 'UNIQUEUNIT' ) {
        text = text.replace(/(.+?\(‹cost›\))(.+?)<i>\s*(.+?)<\/i>(.*)/m,
            '<p class="helptext__heading">$1</p>' +
            '<p class="helptext__desc">$2</p>' +
            '<p class="helptext__upgrade_info"><em>$3</em></p>' +
            '<p class="helptext__stats">$4</p>');
    } else if (type === 'BUILDING') {
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
    if ((type === 'UNIT' || type === 'UNIQUEUNIT') && id in data.data.unit_upgrades) {
        text = text.replace(/<p class="helptext__stats">/,
            '<h3>Upgrade</h3><p class="helptext__upgrade_cost">' + cost(data.data.unit_upgrades[id].Cost)
            + ' (' + data.data.unit_upgrades[id].ResearchTime + 's)<p><p class="helptext__stats">');
    }
    let meta = data.data[entitytype][id];
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

function getAdvancedStats(name, id, type) {
    let entitytype = getEntityType(type);
    const items = id.split('_', 1);
    id = id.substring(items[0].length + 1);
    let meta = data.data[entitytype][id];
    let text = ''
    if (meta !== undefined) {
        text += arrayIfDefinedAndNonEmpty(meta.Attacks, '<h3>Attacks</h3>');
        text += arrayIfDefinedAndNonEmpty(meta.Armours, '<h3>Armours</h3>');
    } else {
        console.error('No metadata found for ' + name);
    }
    return text;
}

function getEntityType(type) {
    let entitytype = 'buildings';
    if (type === 'UNIT' || type === 'UNIQUEUNIT') {
        entitytype = 'units';
    }
    if (type === 'TECHNOLOGY') {
        entitytype = 'techs';
    }
    return entitytype;
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
    for (let civ of Object.keys(data.civ_names)) {
        let xRefLink = document.createElement('button');
        xRefLink.addEventListener('click', function() {
          document.getElementById('civselect').value=civ;
          loadCiv();
        });

        let xRefImage = document.createElement('img');

        xRefImage.src = `./img/Civs/${civ.toLowerCase()}.png`;
        xRefImage.title = data.strings[data.civ_names[civ]];
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
 * @param {string} id The id of the entity being cross-referenced.
 * @param {string} type The type of the entity being cross-referenced.
 */
function styleXRefBadges(name, id, type) {
    for (let civ of Object.keys(data.civ_names)) {
        let xRefImage = document.getElementById(`xRef__badge__${civ}`);
        let found = false;
        // Make sure this civ exists
        if (civs[civ]) {
            if (type === 'UNIT' || type === 'UNIQUEUNIT') {
                if (civs[civ].units.map((item) => `unit_${item.id}`).includes(id)) {
                    found = true;
                } else if (`unit_${civs[civ]?.unique?.castleAgeUniqueUnit}` === id || `unit_${civs[civ]?.unique?.imperialAgeUniqueUnit}` === id) {
                    found = true;
                }
            } else if (type === 'TECHNOLOGY') {
                if (civs[civ].techs.map((item) => `tech_${item.id}`).includes(id)) {
                    found = true;
                } else if (`tech_${civs[civ]?.unique?.castleAgeUniqueTech1}` === id || `tech_${civs[civ]?.unique?.castleAgeUniqueTech2}` === id || `tech_${civs[civ]?.unique?.imperialAgeUniqueTech1}` === id || `tech_${civs[civ]?.unique?.imperialAgeUniqueTech2}` === id) {
                    found = true;
                } else if (`tech_${civs[civ]?.unique?.castleAgeUniqueTech}` === id || `tech_${civs[civ]?.unique?.imperialAgeUniqueTech}` === id) {
                    found = true;
                }
            } else if (type === 'BUILDING') {
                if (civs[civ].buildings.map((item) => `building_${item.id}`).includes(id)) {
                    found = true;
                }
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
            const clazz = unitClasses[attack['Class']];
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
    if ('Food' in cost_object) {
        value += `<span class="cost food" title="${cost_object.Food} Food">${cost_object.Food}</span>`;
    }
    if ('Wood' in cost_object) {
        value += `<span class="cost wood" title="${cost_object.Wood} Wood">${cost_object.Wood}</span>`;
    }
    if ('Gold' in cost_object) {
        value += `<span class="cost gold" title="${cost_object.Gold} Gold">${cost_object.Gold}</span>`;
    }
    if ('Stone' in cost_object) {
        value += `<span class="cost stone" title="${cost_object.Stone} Stone">${cost_object.Stone}</span>`;
    }
    return value;
}

function create_building_index() {
    const buildingIndexRowLength = 6;

    let kc = document.getElementById('buildingindex__table');
    let tr = null;
    let count = 0;
    for (let index in BUILDING_INDEX) {
        let buildingId = BUILDING_INDEX[index];
        if ((count % buildingIndexRowLength) === 0) {
            if (tr) {
              kc.appendChild(tr);
            }
            tr = document.createElement('tr');
        }
        ++count;
        let img = document.createElement('img');
        img.id = 'building_index_' + String(buildingId) + '_img';
        img.src = 'img/Buildings/' + String(buildingId) + '.png';
        img.style.height = '24px';
        img.style.width = '24px';
        let td = document.createElement('td');
        td.onclick = function() { scrollToBuildingId(buildingId); }
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
    addSquareToKey(tr, 'Technology');
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
    Object.keys(locales).map(function(locale) {
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
    switch (currentLocale){
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
    const sorted_civ_names = Object.keys(data.civ_names).sort((a, b) => {
        const localised_name_a = data.strings[data.civ_names[a]];
        const localised_name_b = data.strings[data.civ_names[b]];
        return localised_name_a.localeCompare(localised_name_b, compareLocale);
    });

    for (let civ_name of sorted_civ_names) {
        const option = document.createElement('option');
        option.setAttribute('value', civ_name);
        option.textContent = data.strings[data.civ_names[civ_name]];
        document.getElementById('civselect').appendChild(option);
    }
}

function civ(name) {
    let selectedCiv = civs[name];
    selectedCiv.name = name;

    SVG.find('.cross').each(function () {
        if (SVGObjectIsOpaque(this)) {
            return;
        }

        let {id, type} = parseSVGObjectId(this.id());
        if (id === undefined || type === undefined) {
            return;
        }

        if (type === 'unit') {
            if (selectedCiv.units.map((item) => item.id).includes(id)) {
                return;
            }
        } else if (type === 'building') {
            if (selectedCiv.buildings.map((item) => item.id).includes(id)) {
                return;
            }
        } else if (type === 'tech') {
            if (selectedCiv.techs.map((item) => item.id).includes(id)) {
                return;
            }
        }
        makeSVGObjectOpaque(this);
        makeSVGObjectOpaque(SVG('#' + this.id().replace('_x', '_disabled_gray')), 0.2);
    });

    applySelectedCiv(selectedCiv);
}

function getShieldForEarlierAge(svgObj, actualAge) {
    makeSVGObjectOpaque(svgObj);
    SVG('#' + svgObj.node.id).load('img/Ages/' + AGE_IMAGES[actualAge-1]);
}

function SVGObjectIsOpaque(svgObj) {
    return svgObj.attr('opacity') === 1
}

function SVGObjectIsTransparent(svgObj) {
    return svgObj.attr('opacity') === 0
}

function makeSVGObjectOpaque(svgObj, opacity = 1) {
    svgObj.attr({'opacity': opacity});
}

function parseSVGObjectId(svgObjId) {
    const id_regex = /(.+)_([\d]+)_(x|copy)/;

    const found = svgObjId.match(id_regex);
    if (!found) {
        return {id: undefined, type: undefined};
    }
    let id = parseInt(found[2]);
    let type = found[1];

    return {id, type}
}

function parseSVGObjectId2(svgObjId) {
    const id_regex = /^(unit|tech|building)_([\w]+)_age_img_(\d+)$/;

    const found = svgObjId.match(id_regex);
    if (!found) {
        return {id: undefined, type: undefined, ageId: undefined};
    }
    let id = found[2];
    if (!isNaN(parseInt(id))) id = parseInt(id);
    let type = found[1];
    let ageId = parseInt(found[3]);

    return {id, type, ageId}
}

function techtreeDoesNotHaveScrollbar() {
    const techtreeElement = document.getElementById('techtree');
    return techtreeElement.scrollHeight <= techtreeElement.clientHeight;
}

function shiftKeyIsNotPressed(e) {
    return !e.shiftKey;
}

function scrollToBuildingId(buildingId) {
    const buildingElementId = `building_${buildingId}_bg`;
    const laneBackground = SVG(`.lane-with-building_${buildingId}`);
    laneBackground.attr({'opacity': 0.5});
    setTimeout(() => {
        laneBackground.animate(animation_duration * 10).attr({'opacity': 0});
    }, 500);
    const buildingElement = document.getElementById(buildingElementId);
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
        civs = data.techtrees;
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

if('loading' === document.readyState) {
    // Loading hasn't finished yet.
    document.addEventListener('DOMContentLoaded', main)
} else {
    // `DOMContentLoaded` has already fired.
    main();
}
