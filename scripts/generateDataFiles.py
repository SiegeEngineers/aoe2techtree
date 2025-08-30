#! /usr/bin/env python3

import argparse
import json
import re
from genieutils.datfile import DatFile
from genieutils.civ import Civ
from genieutils.unit import Unit, Creatable
from genieutils.tech import Tech
from pathlib import Path

TECH_TREE_STRINGS = {
    "Age of Empires II": "1001",
    "mode": "1",
    "Civilization": "9681",
    "Technology Tree": "9799",
    "Key": "300081",
    "Unique Unit": "300082",
    "Unit": "300083",
    "Building": "300084",
    "Technology": "300085",
    "Common": "20132",
    "Regional": "20133",
    "Unique": "20134",
}

AGE_NAMES = {
    "Dark Age": "4201",
    "Feudal Age": "4202",
    "Castle Age": "4203",
    "Imperial Age": "4204"
}

ROR_AGE_NAMES = {
    "Stone Age": "4201",
    "Tool Age": "4202",
    "Bronze Age": "4203",
    "Iron Age": "4204"
}

CIV_NAMES = {
    "Britons": "10271",
    "Franks": "10272",
    "Goths": "10273",
    "Teutons": "10274",
    "Japanese": "10275",
    "Chinese": "10276",
    "Byzantines": "10277",
    "Persians": "10278",
    "Saracens": "10279",
    "Turks": "10280",
    "Vikings": "10281",
    "Mongols": "10282",
    "Celts": "10283",
    "Spanish": "10284",
    "Aztecs": "10285",
    "Mayans": "10286",
    "Huns": "10287",
    "Koreans": "10288",
    "Italians": "10289",
    "Hindustanis": "10290",
    "Incas": "10291",
    "Magyars": "10292",
    "Slavs": "10293",
    "Portuguese": "10294",
    "Ethiopians": "10295",
    "Malians": "10296",
    "Berbers": "10297",
    "Khmer": "10298",
    "Malay": "10299",
    "Burmese": "10300",
    "Vietnamese": "10301",
    "Bulgarians": "10302",
    "Tatars": "10303",
    "Cumans": "10304",
    "Lithuanians": "10305",
    "Burgundians": "10306",
    "Sicilians": "10307",
    "Poles": "10308",
    "Bohemians": "10309",
    "Bengalis": "10311",
    "Dravidians": "10310",
    "Gurjaras": "10312",
    "Romans": "10313",
    "Armenians": "10314",
    "Georgians": "10315",
    "Shu": "10319",
    "Wu": "10320",
    "Wei": "10321",
    "Jurchens": "10322",
    "Khitans": "10323",
}

ROR_CIV_NAMES = {
    "Egyptians": "310271",
    "Greeks": "310272",
    "Babylonians": "310273",
    "Assyrians": "310274",
    "Minoans": "310275",
    "Hittites": "310276",
    "Phoenicians": "310277",
    "Sumerians": "310278",
    "Persians": "310279",
    "Shang": "310280",
    "Yamato": "310281",
    "Choson": "310282",
    "Romans": "310283",
    "Carthaginians": "310284",
    "Palmyrans": "310285",
    "Macedonians": "310286",
    "Lac Viet": "310287",
}

CHRONICLES_CIV_NAMES = {
    "Achaemenids": "10316",
    "Athenians": "10317",
    "Spartans": "10318"
}

UPPER_CASE_CHRONICLES_CIV_NAMES = {key.upper() for key in CHRONICLES_CIV_NAMES}

CIV_HELPTEXTS = {
    "Britons": "120150",
    "Franks": "120151",
    "Goths": "120152",
    "Teutons": "120153",
    "Japanese": "120154",
    "Chinese": "120155",
    "Byzantines": "120156",
    "Persians": "120157",
    "Saracens": "120158",
    "Turks": "120159",
    "Vikings": "120160",
    "Mongols": "120161",
    "Celts": "120162",
    "Spanish": "120163",
    "Aztecs": "120164",
    "Mayans": "120165",
    "Huns": "120166",
    "Koreans": "120167",
    "Italians": "120168",
    "Hindustanis": "120169",
    "Incas": "120170",
    "Magyars": "120171",
    "Slavs": "120172",
    "Portuguese": "120173",
    "Ethiopians": "120174",
    "Malians": "120175",
    "Berbers": "120176",
    "Khmer": "120177",
    "Malay": "120178",
    "Burmese": "120179",
    "Vietnamese": "120180",
    "Bulgarians": "120181",
    "Cumans": "120183",
    "Lithuanians": "120184",
    "Tatars": "120182",
    "Burgundians": "120185",
    "Sicilians": "120186",
    "Poles": "120187",
    "Bohemians": "120188",
    "Bengalis": "120190",
    "Dravidians": "120189",
    "Gurjaras": "120191",
    "Romans": "120192",
    "Armenians": "120193",
    "Georgians": "120194",
    "Shu": "120198",
    "Wu": "120199",
    "Wei": "120200",
    "Jurchens": "120201",
    "Khitans": "120202",
}

ROR_CIV_HELPTEXTS = {
    "Egyptians": "120150",
    "Greeks": "120151",
    "Babylonians": "120152",
    "Assyrians": "120153",
    "Minoans": "120154",
    "Hittites": "120155",
    "Phoenicians": "120156",
    "Sumerians": "120157",
    "Persians": "120158",
    "Shang": "120159",
    "Yamato": "120160",
    "Choson": "120161",
    "Romans": "120162",
    "Carthaginians": "120163",
    "Palmyrans": "120164",
    "Macedonians": "120165",
    "Lac Viet": "120166",
}

ROR_BUILDING_STYLES = {
    "Egyptians": "3",
    "Greeks": "4",
    "Babylonians": "2",
    "Assyrians": "3",
    "Minoans": "4",
    "Hittites": "3",
    "Phoenicians": "4",
    "Sumerians": "2",
    "Persians": "2",
    "Shang": "1",
    "Yamato": "1",
    "Choson": "1",
    "Romans": "5",
    "Carthaginians": "5",
    "Palmyrans": "5",
    "Macedonians": "5",
    "Lac Viet": "1",
}

LANGUAGES = [
    'br',
    'de',
    'en',
    'es',
    'fr',
    'hi',
    'it',
    'jp',
    'ko',
    'ms',
    'mx',
    'pl',
    'ru',
    'tr',
    'tw',
    'vi',
    'zh',
]

RTWC2 = 71
PTREB = 42
KONNIK_INF = 1252
EKONNIK_INF = 1253
RATHA = 1738
ERATHA = 1740
WARCHAR_FF = 1962
WARCHAR_B = 1980
CARTOGRAPHY = 19
TRACKING = 90

def cpp_round(value: float) -> int | float:
    rounded_int = round(value)
    if abs(rounded_int - value) < 0.0000001:
        return rounded_int
    return round(value, 6)


def get_unit_cost(unit: Unit):
    return get_cost(unit.creatable)


def get_cost(creatable: Creatable | Tech) -> dict[str, int]:
    cost = {}
    resource_costs = creatable.resource_costs
    for rc in resource_costs:
        if rc.type == 0:
            cost["Food"] = rc.amount
        if rc.type == 1:
            cost["Wood"] = rc.amount
        if rc.type == 2:
            cost["Stone"] = rc.amount
        if rc.type == 3:
            cost["Gold"] = rc.amount
    return cost


def gather_language_data(resourcesdir, data, language):
    key_value_strings_file_en = resourcesdir / language / 'strings' / 'key-value' / 'key-value-strings-utf8.txt'
    key_value = {1: ''}
    with key_value_strings_file_en.open() as f:
        for line in f:
            parse_line(key_value, line)

    key_value[1] = ''  # Mode
    key_value[26708] = key_value[26186]  # Palisade Gate
    key_value[26097] = key_value[26381]  # Trebuchet
    key_value[26768] = key_value[28314]  # Gillnets
    key_value[42057] = key_value[26288]  # Use Konnik for Dismounted Konnik
    key_value[42058] = key_value[26290]  # Use Elite Konnik for Dismounted Elite Konnik
    key_value[21104] = key_value[5414]   # Fix Ratha name
    key_value[42104] = key_value[26414]  # Fix Ratha description
    key_value[42096] = key_value[26414]  # Fix Ratha (melee) description
    key_value[21105] = key_value[5420]   # Fix Elite Ratha name
    key_value[42105] = key_value[26420]  # Fix Elite Ratha description
    key_value[42097] = key_value[26420]  # Fix Elite Ratha (melee) description
    key_value[42198] = key_value[26364]  # Fix War Chariot (Barrage) description

    key_value_filtered = {}
    for datatype in ("buildings", "units", "techs"):
        for item_id in data[datatype]:
            name_id = data[datatype][item_id]['LanguageNameId']
            help_id = data[datatype][item_id]['LanguageHelpId']
            key_value_filtered[name_id] = key_value[name_id]
            key_value_filtered[help_id] = key_value[help_id]
    for name in CIV_HELPTEXTS:
        key = int(CIV_HELPTEXTS[name])
        key_value_filtered[key] = key_value[key]
    for name in CIV_NAMES:
        key = int(CIV_NAMES[name])
        key_value_filtered[key] = key_value[key]
    for name in AGE_NAMES:
        key = int(AGE_NAMES[name])
        key_value_filtered[key] = key_value[key]
    for name in TECH_TREE_STRINGS:
        key = int(TECH_TREE_STRINGS[name])
        key_value_filtered[key] = key_value[key]
    return key_value_filtered


def ror_gather_language_data(programdir, data, language):
    key_value = {1: ''}
    # some strings are shared with the base game; read these in first
    key_value_strings_file_en = programdir / 'resources' / language / 'strings' / 'key-value' / 'key-value-strings-utf8.txt'
    with key_value_strings_file_en.open(encoding='utf-8') as f:
        for line in f:
            parse_line(key_value, line)
    # override strings with everything specific to AoE1 / Return of Rome
    key_value_pompeii_strings_file_en = programdir / 'modes' / 'Pompeii' / 'resources' / language / 'strings' / 'key-value' / 'key-value-pompeii-strings-utf8.txt'
    with key_value_pompeii_strings_file_en.open(encoding='utf-8') as f:
        for line in f:
            parse_line(key_value, line)

    key_value[5121] = key_value[305131]  # Villager
    key_value[26121] = key_value[326131]

    key_value[305471] = key_value[305470]  # Trade Cart
    key_value[326471] = key_value[326470]

    key_value_filtered = {}
    for datatype in ("buildings", "units", "techs"):
        for item_id in data[datatype]:
            name_id = data[datatype][item_id]['LanguageNameId']
            help_id = data[datatype][item_id]['LanguageHelpId']
            key_value_filtered[name_id] = key_value[name_id]
            key_value_filtered[help_id] = key_value[help_id]

    for name in ROR_CIV_HELPTEXTS:
        key = int(ROR_CIV_HELPTEXTS[name])
        key_value_filtered[key] = key_value[key]
    for name in ROR_CIV_NAMES:
        key = int(ROR_CIV_NAMES[name])
        key_value_filtered[key] = key_value[key]
    for name in ROR_AGE_NAMES:
        key = int(ROR_AGE_NAMES[name])
        key_value_filtered[key] = key_value[key]
    for name in TECH_TREE_STRINGS:
        key = int(TECH_TREE_STRINGS[name])
        key_value_filtered[key] = key_value[key]
    return key_value_filtered


def parse_line(key_value, line):
    items = line.split(" ")
    if items[0].isnumeric():
        number = int(items[0])
        match = re.search('".+"', line)
        if match:
            text = match.group(0)[1:-1]
            if len(re.findall(r'<i>', text)) == 1:
                text = re.sub(r'<i>', r'', text)
            if len(re.findall(r'<GREY>', text)) == 1:
                text = re.sub(r'<GREY>', r'', text)
            text = re.sub(r'<(.+?)>', r'‹\1›', text)
            text = re.sub(r'‹b›(.+?)‹b›', r'<b>\1</b>', text)
            text = re.sub(r'‹i›(.+?)‹i›', r'<i>\1</i>', text)
            text = re.sub(r'\\n', r'<br>\n', text)
            key_value[number] = text
    elif items[0] == 'IDS_MPS_RETURN_OF_ROME_TOGGLE':
        match = re.search('".+"', line)
        if match:
            text = match.group(0)[1:-1]
            key_value[1] = text


def gather_data(content: DatFile, civs, unit_upgrades, node_types):
    building_ids = set.union({b['id'] for c in civs.values() for b in c['buildings']}, \
                             {RTWC2})
    unit_ids = set.union({u['id'] for c in civs.values() for u in c['units']}, \
                         {c['unique']['castleAgeUniqueUnit'] for c in civs.values()}, \
        {c['unique']['imperialAgeUniqueUnit'] for c in civs.values()}, \
        {PTREB, KONNIK_INF, EKONNIK_INF, RATHA, ERATHA, WARCHAR_FF, WARCHAR_B})
    tech_ids = set.union({t['id'] for c in civs.values() for t in c['techs']}, \
                         {c['unique']['castleAgeUniqueTech'] for c in civs.values()}, \
        {c['unique']['imperialAgeUniqueTech'] for c in civs.values()}, \
        {CARTOGRAPHY, TRACKING})
    gaia: Civ = content.civs[0]
    graphics = content.graphics
    data = {"buildings": {}, "units": {}, "techs": {}, "unit_upgrades": {}, "node_types": node_types}
    for unit in gaia.units:
        if not unit:
            continue
        if unit.id in building_ids:
            add_building(unit.id, unit, data)
        if unit.id in unit_ids:
            add_unit(unit.id, unit, graphics, data)
    tech_id = 0
    for tech in content.techs:
        if tech_id in tech_ids:
            add_tech(tech_id, tech, data)
        tech_id += 1

    for unit_id, upgrade_id in unit_upgrades.items():
        tech = content.techs[upgrade_id]
        add_unit_upgrade(unit_id, upgrade_id, tech, data)

    data["units"][83]['LanguageNameId'] = 5606  # Villager
    data["units"][128]['LanguageNameId'] = 19052  # Trade Cart
    data["units"][331]['LanguageNameId'] = 5097  # Trebuchet

    return data


def ror_gather_data(content: DatFile, civs, unit_upgrades, node_types):
    ages = list(ROR_AGE_NAMES.keys())[1:]
    building_ids = {b['id'] for c in civs.values() for b in c['buildings']}
    unit_ids = {u['id'] for c in civs.values() for u in c['units']}
    tech_ids = set.union(
        {t['id'] for c in civs.values() for t in c['techs']},
        {t for t, tech in enumerate(content.techs) if tech.name in ages},
        {t for t, tech in enumerate(content.techs) if 'Wall' in tech.name},
        {t for t, tech in enumerate(content.techs) if 'Tower' in tech.name},
    )
    gaia = content.civs[0]
    graphics = content.graphics
    data = {"buildings": {}, "units": {}, "techs": {}, "unit_upgrades": {}, "node_types": node_types}
    for unit in gaia.units:
        if not unit:
            continue
        if unit.id in building_ids:
            add_building(unit.id, unit, data)
        if unit.id in unit_ids:
            add_unit(unit.id, unit, graphics, data)
    tech_id = 0
    for tech in content.techs:
        if tech_id in tech_ids:
            add_tech(tech_id, tech, data)
        tech_id += 1

    for unit_id, upgrade_id in unit_upgrades.items():
        tech = content.techs[upgrade_id]
        add_unit_upgrade(unit_id, upgrade_id, tech, data)

    return data


def add_building(building_id, unit: Unit, data):
    data['buildings'][building_id] = {
        'internal_name': unit.name,
        'ID': building_id,
        'HP': unit.hit_points,
        'Cost': get_unit_cost(unit),
        'Attack': unit.type_50.displayed_attack,
        'Range': cpp_round(unit.type_50.displayed_range),
        'MeleeArmor': unit.type_50.displayed_melee_armour,
        'PierceArmor': unit.creatable.displayed_pierce_armour,
        'GarrisonCapacity': unit.garrison_capacity,
        'LineOfSight': cpp_round(unit.line_of_sight),
        'Attacks': [{'Amount': item.amount, 'Class': item.class_} for item in unit.type_50.attacks],
        'Armours': [{'Amount': item.amount, 'Class': item.class_} for item in unit.type_50.armours],
        'ReloadTime': cpp_round(unit.type_50.reload_time),
        'AccuracyPercent': unit.type_50.accuracy_percent,
        'MinRange': cpp_round(unit.type_50.min_range),
        'TrainTime': unit.creatable.train_locations[0].train_time,
        'LanguageNameId': unit.language_dll_name,
        'LanguageHelpId': unit.language_dll_name + 21_000,
    }


def add_unit(key, unit: Unit, graphics, data):
    if unit.type_50.frame_delay == 0 or unit.type_50.attack_graphic == -1:
        attack_delay_seconds = 0.0
    else:
        attack_graphic = graphics[unit.type_50.attack_graphic]
        animation_duration = attack_graphic.frame_duration * attack_graphic.frame_count
        frame_delay = unit.type_50.frame_delay
        frame_count = attack_graphic.frame_count
        attack_delay_seconds = animation_duration * frame_delay / frame_count
    data['units'][key] = {
        'internal_name': unit.name,
        'ID': key,
        'HP': unit.hit_points,
        'Cost': get_unit_cost(unit),
        'Attack': unit.type_50.displayed_attack,
        'Range': cpp_round(unit.type_50.displayed_range),
        'MeleeArmor': unit.type_50.displayed_melee_armour,
        'PierceArmor': unit.creatable.displayed_pierce_armour,
        'GarrisonCapacity': unit.garrison_capacity,
        'LineOfSight': cpp_round(unit.line_of_sight),
        'Speed': cpp_round(unit.speed),
        'Trait': unit.trait,
        'TraitPiece': unit.nothing,
        'Attacks': [{'Amount': item.amount, 'Class': item.class_} for item in unit.type_50.attacks],
        'Armours': [{'Amount': item.amount, 'Class': item.class_} for item in unit.type_50.armours],
        'ReloadTime': cpp_round(unit.type_50.reload_time),
        'AccuracyPercent': unit.type_50.accuracy_percent,
        'FrameDelay': unit.type_50.frame_delay,
        'AttackDelaySeconds': cpp_round(attack_delay_seconds),
        'MinRange': cpp_round(unit.type_50.min_range),
        'TrainTime': unit.creatable.train_locations[0].train_time,
        'MaxCharge': cpp_round(unit.creatable.max_charge),
        'RechargeRate': cpp_round(unit.creatable.recharge_rate),
        'ChargeEvent': unit.creatable.charge_event,
        'ChargeType': unit.creatable.charge_type,
        'LanguageNameId': unit.language_dll_name,
        'LanguageHelpId': unit.language_dll_name + 21_000,
        'BlastWidth': cpp_round(unit.type_50.blast_width),
    }
    if unit.creatable.recharge_rate > 0:
        data['units'][key]['RechargeDuration'] = unit.creatable.max_charge / unit.creatable.recharge_rate


def add_tech(key, tech: Tech, data):
    data['techs'][key] = {
        'internal_name': tech.name,
        'ResearchTime': tech.research_locations[0].research_time,
        'ID': key,
        'Cost': get_cost(tech),
        'LanguageNameId': tech.language_dll_name,
        'LanguageHelpId': tech.language_dll_name + 21_000,
        'Repeatable': tech.repeatable == 1,
    }


def add_unit_upgrade(key, tech_id, tech: Tech, data):
    data['unit_upgrades'][key] = {
        'internal_name': tech.name,
        'ResearchTime': tech.research_locations[0].research_time,
        'ID': tech_id,
        'Cost': get_cost(tech),
    }


def is_castle_age_unique_unit(unit):
    if unit['Node Type'] != 'UniqueUnit':
        return False
    if unit['Building ID'] != 82:
        return False
    if unit['Age ID'] != 3:
        return False
    if unit['Link Node Type'] != 'BuildingTech':
        return False
    return True


def is_imperial_age_unique_unit(unit):
    if unit['Node Type'] != 'UniqueUnit':
        return False
    if unit['Building ID'] != 82:
        return False
    if unit['Age ID'] != 4:
        return False
    if unit['Link Node Type'] != 'UniqueUnit':
        return False
    return True


def is_castle_age_unique_tech(tech):
    if tech['Node Type'] != 'Research':
        return False
    if tech['Building ID'] != 82:
        return False
    if tech['Age ID'] != 3:
        return False
    if tech['Link Node Type'] != 'BuildingTech':
        return False
    return tech['Picture Index'] == 33


def is_imperial_age_unique_tech(tech):
    if tech['Node Type'] != 'Research':
        return False
    if tech['Building ID'] != 82:
        return False
    if tech['Age ID'] != 4:
        return False
    if tech['Link Node Type'] != 'BuildingTech':
        return False
    return tech['Picture Index'] == 107


def write_language_files(args, data, outputdir):
    resourcesdir = Path(args.programdir) / 'resources'
    for language in LANGUAGES:
        key_value_filtered = gather_language_data(resourcesdir, data, language)

        languagedir = outputdir / 'locales' / language
        languagedir.mkdir(parents=True, exist_ok=True)
        languagefile = languagedir / 'strings.json'
        with languagefile.open('w') as f:
            print(f'Writing language file {languagefile}')
            json.dump(key_value_filtered, f, indent=4, sort_keys=True, ensure_ascii=False)


def gather_civs(techtrees):
    unit_excludelist = (
        759,  # Huskarl from Barracks
        761,  # Elite Huskarl from Barracks
        886,  # Tarkan from Stable
        887,  # Elite Tarkan from Stable
        1260,  # Elite Kipchak from the Cuman Mercenaries tech
    )
    civs = {}
    unit_upgrades = {}
    node_types = {'buildings': {}, 'units':{}}
    for civ in techtrees['civs']:
        if civ['civ_id'] in UPPER_CASE_CHRONICLES_CIV_NAMES:
            continue
        current_civ = {'buildings': [], 'units': [], 'techs': [], 'unique': {}, 'monkSuffix': ''}
        for building in civ['civ_techs_buildings']:
            node_types['buildings'][building['Node ID']] = building['Node Type']
            if building['Node Status'] != 'NotAvailable':
                current_civ['buildings'].append({'id': building['Node ID'], 'age': building['Age ID']})
        for unit in civ['civ_techs_units']:
            if unit['Name'] == 'Monk':
                current_civ['monkSuffix'] = f"_{unit['Picture Index']}"
            if unit['Node Type'] in ('Unit', 'UniqueUnit', 'UnitUpgrade', 'RegionalUnit') and unit['Node Status'] != 'NotAvailable':
                node_types['units'][unit['Node ID']] = unit['Node Type']
                if is_castle_age_unique_unit(unit):
                    current_civ['unique']['castleAgeUniqueUnit'] = unit['Node ID']
                elif is_imperial_age_unique_unit(unit):
                    current_civ['unique']['imperialAgeUniqueUnit'] = unit['Node ID']
                elif unit['Node ID'] not in unit_excludelist:
                    current_civ['units'].append({'id': unit['Node ID'], 'age': unit['Age ID']})
                if unit['Trigger Tech ID'] > -1:
                    unit_upgrades[unit['Node ID']] = unit['Trigger Tech ID']
            if unit['Node Type'] in ('BuildingNonTech', 'UniqueBuilding'):
                node_types['buildings'][unit['Node ID']] = unit['Node Type']
                current_civ['buildings'].append({'id': unit['Node ID'], 'age': unit['Age ID']})


        for tech in civ['civ_techs_units']:
            if tech['Node Type'] == 'Research' and tech['Node Status'] != 'NotAvailable':
                if is_castle_age_unique_tech(tech):
                    current_civ['unique']['castleAgeUniqueTech'] = tech['Node ID']
                elif is_imperial_age_unique_tech(tech):
                    current_civ['unique']['imperialAgeUniqueTech'] = tech['Node ID']
                else:
                    current_civ['techs'].append({'id': tech['Node ID'], 'age': tech['Age ID']})

        current_civ['buildings'] = sorted(current_civ['buildings'], key=lambda x: x['id'])
        current_civ['units'] = sorted(current_civ['units'], key=lambda x: x['id'])
        current_civ['techs'] = sorted(current_civ['techs'], key=lambda x: x['id'])

        civname = civ['civ_id'].capitalize()
        if civname == 'Magyar':
            civname = 'Magyars'
        if civname == 'Indians':
            civname = 'Hindustanis'
        civs[civname] = current_civ

    XOLOTL_WARRIOR = 1570
    for civname in ('Aztecs', 'Mayans', 'Incas'):
        for item in civs[civname]['units']:
            assert item['id'] != XOLOTL_WARRIOR
        civs[civname]['units'].append({'id': XOLOTL_WARRIOR, 'age': 3})
        civs[civname]['units'] = sorted(civs[civname]['units'], key=lambda x: x['id'])
    assert XOLOTL_WARRIOR not in node_types['units']
    node_types['units'][XOLOTL_WARRIOR] = 'RegionalUnit'

    DEMOLITION_SHIP = 527
    FIRE_SHIP = 529
    WAR_GALLEY_UPGRADE = 34
    assert unit_upgrades[DEMOLITION_SHIP] != WAR_GALLEY_UPGRADE
    unit_upgrades[DEMOLITION_SHIP] = WAR_GALLEY_UPGRADE
    assert unit_upgrades[FIRE_SHIP] != WAR_GALLEY_UPGRADE
    unit_upgrades[FIRE_SHIP] = WAR_GALLEY_UPGRADE

    return civs, unit_upgrades, node_types


def write_datafile(data, techtrees, outputdir):
    datafile = outputdir / 'data.json'
    with datafile.open('w') as f:
        print(f'Writing data file {datafile}')
        json.dump({"tech_tree_strings": TECH_TREE_STRINGS, "age_names": AGE_NAMES, "civ_names": CIV_NAMES,
                   "civ_helptexts": CIV_HELPTEXTS, "techtrees": techtrees, "data": data}, f, indent=4, sort_keys=True,
                  ensure_ascii=False)


def ror_is_unit(unit):
    is_unit_type = (unit.get('Node Type') in ('Unit', 'UnitUpgrade'))
    is_available = (unit.get('Node Status', 'NotAvailable') != 'NotAvailable')
    return (is_unit_type and is_available)


def ror_is_tech(tech):
    is_tech_type = (tech.get('Node Type') == 'Research')
    is_available = (tech.get('Node Status', 'NotAvailable') != 'NotAvailable')
    return (is_tech_type and is_available)


def ror_gather_civs(techtrees):
    unit_excludelist = ()
    civs = {}
    unit_upgrades = {}
    node_types = {'buildings': {}, 'units':{}}
    for civ in techtrees['civs']:
        current_civ = {'buildings': [], 'units': [], 'techs': []}
        for building in civ['civ_techs_buildings']:
            node_types['buildings'][building['Node ID']] = building['Node Type']
            if building['Node Status'] != 'NotAvailable':
                current_civ['buildings'].append({'id': building['Node ID'], 'age': building['Age ID']})
        for unit in filter(ror_is_unit, civ['civ_techs_units']):
            node_types['units'][unit['Node ID']] = unit['Node Type']
            current_civ['units'].append({'id': unit['Node ID'], 'age': unit['Age ID']})
            if unit['Trigger Tech ID'] > -1:
                unit_upgrades[unit['Node ID']] = unit['Trigger Tech ID']
        for tech in filter(ror_is_tech, civ['civ_techs_units']):
            current_civ['techs'].append({'id': tech['Node ID'], 'age': tech['Age ID']})

        current_civ['buildings'] = sorted(current_civ['buildings'], key=lambda x: x['id'])
        current_civ['units'] = sorted(current_civ['units'], key=lambda x: x['id'])
        current_civ['techs'] = sorted(current_civ['techs'], key=lambda x: x['id'])

        civname = civ['civ_id'].capitalize()
        if civname == 'Carthagians':
            civname = 'Carthaginians'  # correct spelling; Carthag_IN_ians
        elif civname == 'Lacviet':
            civname = 'Lac Viet'  # add space
        civs[civname] = current_civ

        current_civ['buildingStyle'] = ROR_BUILDING_STYLES[civname]

    return civs, unit_upgrades, node_types


def ror_update_civ_techs(civs, data):
    age_ups = [{'id':t['ID'], 'age': -1} for t in data['techs'].values()
               if t['internal_name'].endswith('Age')]
    wall_tower_techs = {
        72: {'id':11, 'age': 2},  # Small Wall
        117: {'id':13, 'age': 3},  # Medium Wall
        155: {'id':14, 'age': 4},  # Fortified Wall
        79: {'id':16, 'age': 2},  # Watch Tower
        234: {'id':12, 'age': 3},  # Sentry Tower
        235: {'id':15, 'age': 4},  # Guard Tower
        236: {'id':2, 'age': 4},  # Ballista Tower
    }
    for civ in civs.values():
        civ['techs'].extend(age_ups)
        for building_id, tech_id in wall_tower_techs.items():
            if building_id in civ['buildings']:
                civ['techs'].append(tech_id)
        civ['techs'].sort(key=lambda x: x['id'])


def ror_write_datafile(data, techtrees, outputdir):
    datafile = outputdir / 'data.json'
    data = {
        "age_names": ROR_AGE_NAMES,
        "civ_helptexts": ROR_CIV_HELPTEXTS,
        "civ_names": ROR_CIV_NAMES,
        "data": data,
        "tech_tree_strings": TECH_TREE_STRINGS,
        "techtrees": techtrees,
    }
    with datafile.open('w') as f:
        print(f'Writing data file {datafile}')
        json.dump(data, f, indent=4, sort_keys=True, ensure_ascii=False)


def ror_write_language_files(args, data, outputdir):
    programdir = Path(args.programdir)
    for language in LANGUAGES:
        key_value_filtered = ror_gather_language_data(programdir, data, language)

        languagedir = outputdir / 'locales' / language
        languagedir.mkdir(parents=True, exist_ok=True)
        languagefile = languagedir / 'strings.json'
        with languagefile.open('w', encoding='utf-8') as f:
            print(f'Writing language file {languagefile}')
            json.dump(key_value_filtered, f, indent=4, sort_keys=True, ensure_ascii=False)


def process_ror(args, outputdir):
    techtreesfile = Path(args.programdir) / 'modes' / 'Pompeii' / 'resources' / '_common' / 'dat' / 'civTechTrees.json'
    ttfcontent = techtreesfile.read_text()
    ttfcontent = re.sub(r',\n( +)\]', r'\n\1]', ttfcontent)
    techtrees = json.loads(ttfcontent)
    civs, unit_upgrades, node_types = ror_gather_civs(techtrees)
    datafile = Path(args.programdir) / 'modes' / 'Pompeii' / 'resources' / '_common' / 'dat' / 'empires2_x2_p1.dat'
    content = DatFile.parse(datafile)
    data = ror_gather_data(content, civs, unit_upgrades, node_types)
    ror_update_civ_techs(civs, data)
    ror_write_datafile(data, civs, outputdir)
    ror_write_language_files(args, data, outputdir)


def process_aoe2(args, outputdir):
    techtreesfile = Path(args.programdir) / 'resources' / '_common' / 'dat' / 'civTechTrees.json'
    ttfcontent = techtreesfile.read_text()
    ttfcontent = re.sub(r',\n( +)\]', r'\n\1]', ttfcontent)
    techtrees = json.loads(ttfcontent)
    civs, unit_upgrades, node_types = gather_civs(techtrees)
    datafile = Path(args.programdir) / 'resources' / '_common' / 'dat' / 'empires2_x2_p1.dat'
    content = DatFile.parse(datafile)
    data = gather_data(content, civs, unit_upgrades, node_types)
    write_datafile(data, civs, outputdir)
    write_language_files(args, data, outputdir)


def main():
    parser = argparse.ArgumentParser(description='Generate data files for aoe2techtree')
    parser.add_argument('programdir', help='The main folder of an aoe2de installation, usually '
                                           'C:/Program Files (x86)/Steam/steamapps/common/AoE2DE/')

    args = parser.parse_args()

    outputdir = Path(__file__).parent / '..' / 'data'
    process_aoe2(args, outputdir)

    outputdir = Path(__file__).parent / '..' / 'ror' / 'data'
    process_ror(args, outputdir)



if __name__ == '__main__':
    main()
