let tree;
let data = {};
let connections;
let parentConnections;
let connectionpoints;
let focusedNodeId = null;

const unitClasses = {
    0: "Unused",
    1: "Infantry",
    2: "Turtle Ships",
    3: "Base Pierce",
    4: "Base Melee",
    5: "War Elephants",
    6: "Unused",
    7: "Unused",
    8: "Cavalry",
    9: "Unused",
    10: "Unused",
    11: "<abbr title='(except Port)'>All Buildings</abbr>",
    12: "Unused",
    13: "Stone Defense",
    14: "FE Predator Animals",
    15: "Archers",
    16: "Ships & Camels & Saboteurs",
    17: "Rams",
    18: "Trees",
    19: "<abbr title='(except Turtle Ship)'>Unique Units</abbr>",
    20: "Siege Weapons",
    21: "Standard Buildings",
    22: "Walls & Gates",
    23: "FE Gunpowder Units",
    24: "Boars",
    25: "Monks",
    26: "Castle",
    27: "Spearmen",
    28: "Cavalry Archers",
    29: "Eagle Warriors",
    30: "HD Camels",
    31: "Anti-Leitis",
    32: "Condottieros",
    33: "Organ Gun Damage",
    34: "Fishing Ships",
    35: "Mamelukes",
    36: "Heroes and Kings",
};

const locales = {
    en: "English",
    zh: "简体中文",
    tw: "繁體中文",
    fr: "Français",
    de: "Deutsch",
    hi: "हिंदी",
    it: "Italiano",
    jp: "日本語",
    ko: "한국어",
    ms: "Bahasa Melayu",
    ru: "Русский",
    es: "Español",
    mx: "Español (México)",
    tr: "Türkçe",
    vi: "Tiếng Việt",
    br: "Português (Brasil)",
};
const defaultLocale = "en";

setAdvancedStatsState();

let storedLocale = defaultLocale;
try {
    storedLocale = window.localStorage.getItem('locale');
} catch (e) {
    // pass
}
fillLocaleSelector(storedLocale);

loadJson("data/data.json", function (response) {
    data = response;
    loadLocale(storedLocale);
});

function loadLocale(localeCode) {
    if (!Object.keys(locales).includes(localeCode)) {
        localeCode = defaultLocale;
    }
    try {
        window.localStorage.setItem('locale', localeCode);
    } catch (e) {
        // pass
    }
    loadJson("data/locales/" + localeCode + "/strings.json", function (strings) {
        data.strings = strings;
        createXRefBadges();
        displayData();
    });
}

function displayData() {
    // Reset containers
    const root = document.getElementById('root');
    if (root) {
        document.getElementById('techtree').removeChild(root);
    }
    document.getElementById('civselect').innerHTML = "";
    document.getElementById('key__table').innerHTML = "";

    tree = getDefaultTree();
    connections = getConnections();
    parentConnections = new Map(connections.map(([parent, child]) => [child, parent]));
    connectionpoints = getConnectionPoints(tree);
    fillCivSelector();

    const draw = SVG('techtree').id('root').size(tree.width, tree.height)
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
    let image_urls = ['dark_age_de.png', 'feudal_age_de.png', 'castle_age_de.png', 'imperial_age_de.png'];
    let age_names = [
        data.strings[data.age_names["Dark Age"]],
        data.strings[data.age_names["Feudal Age"]],
        data.strings[data.age_names["Castle Age"]],
        data.strings[data.age_names["Imperial Age"]]
    ];
    for (let i = 0; i < image_urls.length; i++) {
        let age_image_group = draw.group().click(hideHelp);
        let age_image = age_image_group.image('img/Ages/' + image_urls[i], icon_width, icon_height).y(row_height * i + vertical_spacing).x(margin_left);
        age_image_group.text(age_names[i])
            .font({size: 16, weight: 'bold'})
            .attr({fill: '#000000', opacity: 0.8, 'text-anchor': 'middle'})
            .move(icon_width / 2 + margin_left, age_image.attr('y') + icon_height + 5);
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
        for (let r of Object.keys(lane.rows)) {
            let row = lane.rows[r];
            for (let caret of row) {
                var item = draw.group().attr({id: caret.id}).addClass('node')
                var rect = item.rect(caret.width, caret.height).attr({
                    fill: caret.type.colour,
                    id: `${caret.id}_bg`
                }).move(caret.x, caret.y);
                let name = formatName(caret.name);
                var text = item.text(name.toString())
                    .font({size: 9, weight: 'bold'})
                    .attr({fill: '#ffffff', opacity:0.95, 'text-anchor': 'middle', id: caret.id + '_text'})
                    .move(caret.x + caret.width / 2, caret.y + caret.height / 1.5);
                var image_placeholder = item.rect(caret.width * 0.6, caret.height * 0.6)
                    .attr({fill: '#000000', opacity:0.5, id: caret.id + '_imgph'})
                    .move(caret.x + caret.width * 0.2, caret.y);
                let prefix = 'img/';
                var image = item.image(prefix + imagePrefix(caret.id) + '.png', caret.width * 0.6, caret.height * 0.6)
                    .attr({id: caret.id + '_img'})
                    .move(caret.x + caret.width * 0.2, caret.y);
                var cross = item.polygon([1, 0, 3, 2, 5, 0, 6, 1, 4, 3, 6, 5, 5, 6, 3, 4, 1, 6, 0, 5, 2, 3, 0, 1])
                    .attr({fill: '#ff0000', opacity:0.5, id: caret.id + '_x'})
                    .addClass('cross')
                    .size(caret.width * 0.6, caret.height * 0.6)
                    .move(caret.x + caret.width * 0.2, caret.y);
                var overlaytrigger = item.rect(caret.width, caret.height)
                    .attr({id: caret.id + '_overlay'})
                    .addClass('node__overlay')
                    .move(caret.x, caret.y)
                    .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id})
                    .mouseover(function () {
                        highlightPath(caret.id);
                    })
                    .mouseout(resetHighlightPath)
                    .click(function () {
                        displayHelp(caret.id);
                    });

            }
        }
    }


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
    let hash = window.location.hash.substr(1);
    let capitalisedHash = hash.substring(0, 1).toUpperCase() + hash.substring(1).toLowerCase();
    if (capitalisedHash in data.civ_names) {
        console.log(capitalisedHash);
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
    return name.replace('_copy', '')
        .replace("building_", "Buildings/")
        .replace("unit_", "Units/")
        .replace("tech_", "Techs/");
}

function loadCiv() {
    const selectedCiv = document.getElementById('civselect').value;
    civ(selectedCiv, tree);
    if (selectedCiv in data.civ_helptexts) {
        document.getElementById('civtext').innerHTML = data.strings[data.civ_helptexts[selectedCiv]];
        document.getElementById('civlogo').src = `./img/Civs/${selectedCiv.toLowerCase()}.png`;
        window.location.hash = selectedCiv;
    } else {
        document.getElementById('civtext').innerHTML = "";
        document.getElementById('civlogo').src = document.getElementById('civlogo').dataset.transparent;
    }
    hideHelp();
}

function loadJson(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
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
    SVG.select('.node.is-highlight, .connection.is-highlight')
        .removeClass('is-highlight');
}

function highlightPath(caretId) {
    recurse(caretId);

    function recurse(caretId) {
        SVG.get(caretId).addClass('is-highlight');

        const parentId = parentConnections.get(caretId);
        if (!parentId) return;

        const line = SVG.get(`connection_${parentId}_${caretId}`);
        if (line) {
            // Move to the end of the <g> element so that it is drawn on top.
            // Without this, the line would be highlighted, but other unhighlighted
            // connection lines could be drawn on top, undoing the highlighting.
            line.front().addClass('is-highlight');
        }
        recurse(parentId);
    }
}

function displayHelp(caretId) {
    focusedNodeId = caretId;
    let helptextContent = document.getElementById("helptext__content");
    let helptextAdvancedStats = document.getElementById("helptext__advanced_stats");
    let overlay = SVG.get(`${caretId}_overlay`);
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
    const helptext = document.getElementById("helptext");
    helptext.style.display = "none";
    resetHighlightPath();
}

function positionHelptext(caret) {
    const helptext = document.getElementById("helptext");
    helptext.style.display = "block";
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
    helptext.style.top = top + "px";
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
    helptext.style.top = top + "px";
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
    helptext.style.top = top + "px";
    helptext.style.left = destX + 'px';
}

function getHelpText(name, id, type) {
    let entitytype = getEntityType(type);
    const items = id.split('_', 1);
    id = id.substring(items[0].length + 1);
    let text = data.strings[data.data[entitytype][id]['LanguageHelpId']];
    if (text === undefined) {
        return "?";
    }
    text = text.replace(/\s<br>/g, '');
    text = text.replace(/\n/g, '');
    if (type === "TECHNOLOGY") {
        text = text.replace(/(.+?\(.+?\))(.*)/m,
            '<p class="helptext__heading">$1</p>' +
            '<p class="helptext__desc">$2</p>' +
            '<p class="helptext__stats">&nbsp;</p>');
    } else if (type === "UNIT" || type === "UNIQUEUNIT" ) {
        text = text.replace(/(.+?\(‹cost›\))(.+?)<i>\s*(.+?)<\/i>(.*)/m,
            '<p>$1</p>' +
            '<p>$2</p>' +
            '<p><em>$3</em></p>' +
            '<p class="helptext__stats">$4</p>');
    } else if (type === "BUILDING") {
        // convert the "Required for" text in <i> to <em> so that it doesn't break the next regex
        text = text.replace(/<b><i>(.+?)<\/b><\/i>/m, '<b><em>$1</em></b>');
        if (text.indexOf('<i>') >= 0) {
            text = text.replace(/(.+?\(‹cost›\))(.+?)<i>\s*(.+?)<\/i>(.*)/m,
                '<p>$1</p>' +
                '<p>$2</p>' +
                '<p><em>$3</em></p>' +
                '<p class="helptext__stats">$4</p>');
        } else {
            // Handle certain buildings like Wonders separately as the upgrades text is missing for them.
            text = text.replace(/(.+?\(‹cost›\))(.*)<br>(.*)/m,
                '<p>$1</p>' +
                '<p>$2</p>' +
                '<p class="helptext__stats">$3</p>');
        }
    }
    let meta = data.data[entitytype][id];
    if (meta !== undefined) {
        text = text.replace(/‹cost›/, "Cost: " + cost(meta.Cost));
        let stats = []
        if (text.match(/‹hp›/)) {
            stats.push("HP:&nbsp;" + meta.HP);
        }
        if (text.match(/‹attack›/)) {
            stats.push("Attack:&nbsp;" + meta.Attack);
        }
        if (text.match(/‹(A|a)rmor›/)) {
            stats.push("Armor:&nbsp;" + meta.MeleeArmor);
        }
        if (text.match(/‹(P|p)iercearmor›/)) {
            stats.push("Pierce armor:&nbsp;" + meta.PierceArmor);
        }
        if (text.match(/‹garrison›/)) {
            stats.push("Garrison:&nbsp;" + meta.GarrisonCapacity);
        }
        if (text.match(/‹range›/)) {
            stats.push("Range:&nbsp;" + meta.Range);
        }
        stats.push(minRangeIfDefined(meta.MinRange, "Min Range:&nbsp;"));
        stats.push(ifDefined(meta.LineOfSight, "Line of Sight:&nbsp;"));
        stats.push(ifDefined(meta.Speed, "Speed:&nbsp;"));
        stats.push(secondsIfDefined(meta.TrainTime, "Build Time:&nbsp;"));
        stats.push(secondsIfDefined(meta.ResearchTime, "Research Time:&nbsp;"));
        stats.push(ifDefined(meta.FrameDelay, "Frame Delay:&nbsp;"));
        stats.push(secondsIfDefined(meta.AttackDelaySeconds, "Attack Delay:&nbsp;"));
        stats.push(secondsIfDefined(meta.ReloadTime, "Reload Time:&nbsp;"));
        stats.push(accuracyIfDefined(meta.AccuracyPercent, "Accuracy:&nbsp;"));
        text = text.replace(/<p class="helptext__stats">(.+?)<\/p>/, "<h3>Stats</h3><p>" + stats.filter(Boolean).join(', ') + "<p>")
    } else {
        console.error("No metadata found for " + name);
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
        console.error("No metadata found for " + name);
    }
    return text;
}

function getEntityType(type) {
    let entitytype = 'buildings';
    if (type === "UNIT" || type === "UNIQUEUNIT") {
        entitytype = 'units';
    }
    if (type === "TECHNOLOGY") {
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
    let horseDisabledAll = horseDisabledBuildings.map((id)=>`building_${id}`)
        .concat(horseDisabledUnits.map((id)=>`unit_${id}`))
        .concat(horseDisabledTechs.map((id)=>`tech_${id}`));
    for (let civ of Object.keys(data.civ_names)) {
        let xRefImage = document.getElementById(`xRef__badge__${civ}`);
        // By default, assume that this unit can be built.
        let found = true;
        // Get the config objects
        let enabled = civsConfig[`${civ}`]['enabled'];
        let disabled = civsConfig[`${civ}`]['disabled'];
        let unique = civsConfig[`${civ}`]['unique'];

        // Make sure this civ exists
        if (civsConfig[`${civ}`]) {
            // Fast-Fail horses if civ disablesHorses
            if (civsConfig[`${civ}`]['disableHorses'] &&
                horseDisabledAll.includes(id)) {
                found = false;
            }
            if (type === "UNIT") {
                // There are 2 ways for a UNIT to be disabled.
                //      1. The unit is disabled by default, and not
                //         specifically enabled in the config.
                //      2. The unit is disabled in the specific config.
                if (defaultDisabledUnits.map((id)=>`unit_${id}`).includes(id) &&
                    (!enabled ||
                      !enabled['units'] ||
                      !enabled['units'].map((id)=>`unit_${id}`).includes(id))) {
                    found = false;
                } else if (disabled &&
                        disabled['units'] &&
                        disabled['units'].map((id)=>`unit_${id}`).includes(id)) {
                    found = false;
                }
            } else if (type === "UNIQUEUNIT") {
                // There are 2 ways for a UNIQUEUNIT to be disabled.
                //      1. The UNIQUEUNIT can be enabled in 'unique'.
                //      2. The UNIQUEUNIT can be enabled in 'unit'.
                //          e.g. genitour
                if ((!unique ||
                      !('unit_'+unique[0] === id || 'unit_'+unique[1] === id)) &&
                    (!enabled || !enabled['units'] ||
                      !enabled['units'].map((id)=>`unit_${id}`).includes(id))) {
                    found = false;
                }
            } else if (type === "TECHNOLOGY") {
                // Unique Technologies are disabled by default
                // Regular Technologies are only ever disabled. See js/techtree.js#resetToDefault
                // if there is a tech object in disabled, and this tech is in it
                if (getDefaultDisabledTechs().map((id) => `tech_${id}`).includes(id) &&
                    (!unique ||
                      !unique.slice(2,4).map((id) => `tech_${id}`).includes(id))) {
                    found = false;
                } else if (disabled['techs'] && disabled['techs'].map((id) => `tech_${id}`).includes(id)) {
                    found = false;
                }
            }
            else if (type === "BUILDING") {
                // There are 2 ways for a BUILDING to be disabled.
                //      1. The building is disabled by default, and not
                //         specifically enabled in the config.
                //      2. The building is disabled in the specific config.
                if (defaultDisabledBuildings.map((id)=>`building_${id}`).includes(id) &&
                (!enabled ||
                !enabled['buildings'] ||
                !enabled['buildings'].map((id)=>`building_${id}`).includes(id))) {
                    found = false;
                } else if (disabled &&
                            disabled['buildings'] &&
                            disabled['buildings'].map((id)=>`building_${id}`).includes(id)) {
                    found = false;
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

function getDefaultDisabledTechs() {
    return Object.keys(civsConfig).map((key) => civsConfig[key].unique.slice(2, 4)).flat();
}

function ifDefined(value, prefix) {
    if (value !== undefined) {
        return " " + prefix + value;
    } else {
        return "";
    }
}

function secondsIfDefined(value, prefix) {
    if (value !== undefined) {
        return " " + prefix + toMaxFixed2(value) + "s";
    } else {
        return "";
    }
}

function toMaxFixed2(value) {
    return Math.round(value * 100) / 100;
}

function accuracyIfDefined(value, prefix) {
    if (value !== undefined && value < 100) {
        return " " + prefix + value + "%";
    } else {
        return "";
    }
}

function minRangeIfDefined(value, prefix) {
    if (value !== undefined && value > 0) {
        return " " + prefix + value;
    } else {
        return "";
    }
}

function arrayIfDefinedAndNonEmpty(attacks, prefix) {
    if (attacks === undefined || attacks.length < 1) {
        return "";
    } else {
        const strings = [];
        for (let attack of attacks) {
            const amount = attack['Amount'];
            const clazz = unitClasses[attack['Class']];
            strings.push(`${amount} (${clazz})`);
        }
        return prefix + '<p>' + strings.join(', ') + "</p>";
    }
}

function cost(cost_object) {
    let value = "";
    if ("Food" in cost_object) {
        value += " " + cost_object.Food + "F";
    }
    if ("Wood" in cost_object) {
        value += " " + cost_object.Wood + "W";
    }
    if ("Gold" in cost_object) {
        value += " " + cost_object.Gold + "G";
    }
    if ("Stone" in cost_object) {
        value += " " + cost_object.Stone + "S";
    }
    return value;
}

function create_colour_key() {
    let legend = [TYPES.UNIQUEUNIT, TYPES.UNIT, TYPES.BUILDING, TYPES.TECHNOLOGY];
    let kc = document.getElementById('key__table');
    let tr = null
    for (let index in legend) {
        if (index % 2 === 0) {
            tr = document.createElement('tr');
        }
        let td_color = document.createElement('td');
        td_color.style.backgroundColor = legend[index]['colour'];
        td_color.style.border = '1px outset #8a5d21';
        td_color.style.width = '23px';
        tr.appendChild(td_color);
        let td_type = document.createElement('td');
        td_type.innerText = data.strings[data.tech_tree_strings[legend[index]['name']]];
        tr.appendChild(td_type);
        if (index % 2 === 1) {
            kc.appendChild(tr);
        }
    }
    document.getElementById('key__label').innerText = data.strings[data.tech_tree_strings["Key"]];
}

function changeLocale() {
    const locale = document.getElementById('localeselect').value;
    loadLocale(locale);
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

function fillCivSelector() {
    Object.keys(data.civ_names).map(function(civ_name) {
        const option = document.createElement('option');
        option.setAttribute('value', civ_name);
        option.textContent = data.strings[data.civ_names[civ_name]];
        document.getElementById('civselect').appendChild(option);
    });
}

const techtreeElement = document.getElementById('techtree');
techtreeElement.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) {
        techtreeElement.scrollLeft += 100;
    } else if (e.deltaY < 0) {
        techtreeElement.scrollLeft -= 100;
    }
});
