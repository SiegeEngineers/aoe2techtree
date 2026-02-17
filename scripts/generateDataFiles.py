#! /usr/bin/env python3

import argparse
import json
import re
from itertools import chain

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
    "base": [
        "4201",  # Dark Age
        "4202",  # Feudal Age
        "4203",  # Castle Age
        "4204",  # Imperial Age
    ],
    "antiquity": [
        "407089",  # Archaic Age
        "407090",  # Civic Age
        "407091",  # Classical Age
        "407092",  # Imperial Age
    ],
}

ROR_AGE_NAMES = {
    "Stone Age": "4201",
    "Tool Age": "4202",
    "Bronze Age": "4203",
    "Iron Age": "4204"
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


def gather_language_data(resourcesdir, techtrees, civs_info, extra_ids, language):
    key_value = {1: ''}
    key_value_strings_file_en = resourcesdir / language / 'strings' / 'key-value' / 'key-value-strings-utf8.txt'
    with key_value_strings_file_en.open() as f:
        for line in f:
            parse_line(key_value, line)

    key_value_paphos_strings_file_en = resourcesdir / language / 'strings' / 'key-value' / 'key-value-paphos-strings-utf8.txt'
    with key_value_paphos_strings_file_en.open(encoding='utf-8') as f:
        for line in f:
            parse_line(key_value, line)

    key_value[1] = ''  # Mode

    key_value_filtered = {}
    for civ in techtrees['civs']:
        for item in chain(civ['civ_techs_buildings'], civ['civ_techs_units']):
            name_id = item['Name String ID']
            help_id = item['Help String ID'] - 79000
            key_value_filtered[name_id] = key_value[name_id]
            key_value_filtered[help_id] = key_value[help_id]
    for civ_info in civs_info.values():
        if civ_info['tech_tree_name'] != 'GAIA':
            key_value_filtered[civ_info['name_string_id']] = key_value[civ_info['name_string_id']]
            key_value_filtered[civ_info['name_string_id'] + 109879] = key_value[civ_info['name_string_id'] + 109879]
    for era, values in AGE_NAMES.items():
        for key in values:
            key_value_filtered[int(key)] = key_value[int(key)]
    for name in TECH_TREE_STRINGS:
        key = int(TECH_TREE_STRINGS[name])
        key_value_filtered[key] = key_value[key]
    for key in extra_ids:
        key_value_filtered[key] = key_value[key]
    return key_value_filtered


def ror_gather_language_data(programdir, techtrees, language):
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
    for civ in techtrees['civs']:
        for item in chain(civ['civ_techs_buildings'], civ['civ_techs_units']):
            name_id = item['Name String ID']
            help_id = item.get('Help String ID', 79001) - 79000
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


def gather_data(content: DatFile, civs, unit_upgrades):
    extra_ids = set()
    building_ids = set.union(*(set(civ['Building']) for civ in civs.values()), {RTWC2})
    unit_ids = set.union(*(set(civ['Unit']) for civ in civs.values()),
                         {PTREB, KONNIK_INF, EKONNIK_INF, RATHA, ERATHA, WARCHAR_FF, WARCHAR_B})
    tech_ids = set.union(*(set(civ['Tech']) for civ in civs.values()), {CARTOGRAPHY, TRACKING})
    gaia: Civ = content.civs[0]
    graphics = content.graphics
    data = {"Building": {}, "Unit": {}, "Tech": {}, "unit_upgrades": {}}
    for unit in gaia.units:
        if not unit:
            continue
        if unit.id in building_ids:
            add_building(unit.id, unit, data)
        if unit.id in unit_ids:
            add_unit(unit.id, unit, graphics, data)
        extra_ids = extra_ids.union(get_extra_ids(unit, gaia.units))
    tech_id = 0
    for tech in content.techs:
        if tech_id in tech_ids:
            add_tech(tech_id, tech, data)
        tech_id += 1

    for unit_id, upgrade_id in unit_upgrades.items():
        tech = content.techs[upgrade_id]
        add_unit_upgrade(unit_id, upgrade_id, tech, data)

    return data, extra_ids


def get_extra_ids(unit: Unit, all_units: list[Unit | None]):
    extra_ids = set()
    traits = split_trait(unit.trait)
    if 4 in traits:  # Builds:
        extra_ids.add(all_units[unit.nothing].language_dll_name)
    if 8 in traits:  # Transforms into:
        extra_ids.add(all_units[unit.nothing].language_dll_name)
    return extra_ids


def split_trait(trait: int):
    traits = []
    for x in [1, 2, 4, 8, 16, 32, 64, 128]:
        if (trait & x) > 0:
            traits.append(x)
    return traits


def ror_gather_data(content: DatFile, civs, unit_upgrades):
    ages = list(ROR_AGE_NAMES.keys())[1:]
    building_ids = {b['id'] for c in civs.values() for b in c['Building']}
    unit_ids = {u['id'] for c in civs.values() for u in c['Unit']}
    tech_ids = set.union(
        {t['id'] for c in civs.values() for t in c['Tech']},
        {t for t, tech in enumerate(content.techs) if tech.name in ages},
        {t for t, tech in enumerate(content.techs) if 'Wall' in tech.name},
        {t for t, tech in enumerate(content.techs) if 'Tower' in tech.name},
    )
    gaia = content.civs[0]
    graphics = content.graphics
    data = {"Building": {}, "Unit": {}, "Tech": {}, "unit_upgrades": {}}
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
    data['Building'][building_id] = {
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
    data['Unit'][key] = {
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
        'BlastWidth': cpp_round(unit.type_50.blast_width),
    }
    if unit.creatable.recharge_rate > 0:
        data['Unit'][key]['RechargeDuration'] = unit.creatable.max_charge / unit.creatable.recharge_rate


def add_tech(key, tech: Tech, data):
    data['Tech'][key] = {
        'internal_name': tech.name,
        'ResearchTime': tech.research_locations[0].research_time,
        'ID': key,
        'Cost': get_cost(tech),
        'LanguageNameId': tech.language_dll_name,
        'Repeatable': tech.repeatable == 1,
    }


def add_unit_upgrade(key, tech_id, tech: Tech, data):
    data['unit_upgrades'][key] = {
        'internal_name': tech.name,
        'ResearchTime': tech.research_locations[0].research_time,
        'ID': tech_id,
        'Cost': get_cost(tech),
    }


def write_language_files(args, techtrees, civs_info, extra_ids, outputdir):
    resourcesdir = Path(args.programdir) / 'resources'
    for language in LANGUAGES:
        key_value_filtered = gather_language_data(resourcesdir, techtrees, civs_info, extra_ids, language)

        languagedir = outputdir / 'locales' / language
        languagedir.mkdir(parents=True, exist_ok=True)
        languagefile = languagedir / 'strings.json'
        with languagefile.open('w') as f:
            print(f'Writing language file {languagefile}')
            json.dump(key_value_filtered, f, indent=4, sort_keys=True, ensure_ascii=False)


def gather_civs(techtrees, civs_info):
    civs = {}
    unit_upgrades = {}
    for civ in techtrees['civs']:
        current_civ = {'Building': [], 'Unit': [], 'Tech': [], 'meta': {}}
        for building in civ['civ_techs_buildings']:
            if building['Node Status'] != 'NotAvailable':
                current_civ['Building'].append(building['Node ID'])
        for item in chain(civ['civ_techs_buildings'], civ['civ_techs_units']):
            if item['Trigger Tech ID'] > -1:
                unit_upgrades[item['Node ID']] = item['Trigger Tech ID']
            if item['Node Status'] != 'NotAvailable':
                current_civ[item['Use Type']].append(item['Node ID'])

        current_civ['Building'] = sorted(set(current_civ['Building']))
        current_civ['Unit'] = sorted(set(current_civ['Unit']))
        current_civ['Tech'] = sorted(set(current_civ['Tech']))
        civ_info = civs_info[civ['civ_id']]
        current_civ['name_string_id'] = civ_info['name_string_id']
        current_civ['help_string_id'] = civ_info['name_string_id'] + 109879
        current_civ['era'] = civ_info['era']
        current_civ['internal_name'] = civ_info['internal_name']

        civname = civ_info['internal_name']
        if civname == 'Indians':
            civname = 'Hindustanis'
        civs[civname] = current_civ

    return civs, unit_upgrades


def write_datafile(data, techtrees, outputdir):
    datafile = outputdir / 'data.json'
    with datafile.open('w') as f:
        print(f'Writing data file {datafile}')
        json.dump({"tech_tree_strings": TECH_TREE_STRINGS, "age_names": AGE_NAMES,
                   "civs": techtrees, "data": data}, f, indent=4, sort_keys=True,
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
    for civ in techtrees['civs']:
        current_civ = {'Building': [], 'Unit': [], 'Tech': []}
        for building in civ['civ_techs_buildings']:
            if building['Node Status'] != 'NotAvailable':
                current_civ['Building'].append({'id': building['Node ID'], 'age': building['Age ID']})
        for unit in filter(ror_is_unit, civ['civ_techs_units']):
            current_civ['Unit'].append({'id': unit['Node ID'], 'age': unit['Age ID']})
            if unit['Trigger Tech ID'] > -1:
                unit_upgrades[unit['Node ID']] = unit['Trigger Tech ID']
        for tech in filter(ror_is_tech, civ['civ_techs_units']):
            current_civ['Tech'].append({'id': tech['Node ID'], 'age': tech['Age ID']})

        current_civ['Building'] = sorted(current_civ['Building'], key=lambda x: x['id'])
        current_civ['Unit'] = sorted(current_civ['Unit'], key=lambda x: x['id'])
        current_civ['Tech'] = sorted(current_civ['Tech'], key=lambda x: x['id'])

        civname = civ['civ_id'].capitalize()
        if civname == 'Carthagians':
            civname = 'Carthaginians'  # correct spelling; Carthag_IN_ians
        elif civname == 'Lacviet':
            civname = 'Lac Viet'  # add space
        civs[civname] = current_civ

        current_civ['buildingStyle'] = ROR_BUILDING_STYLES[civname]

    return civs, unit_upgrades


def ror_update_civ_techs(civs, data):
    age_ups = [{'id': t['ID'], 'age': -1} for t in data['Tech'].values()
               if t['internal_name'].endswith('Age')]
    wall_tower_techs = {
        72: {'id': 11, 'age': 2},  # Small Wall
        117: {'id': 13, 'age': 3},  # Medium Wall
        155: {'id': 14, 'age': 4},  # Fortified Wall
        79: {'id': 16, 'age': 2},  # Watch Tower
        234: {'id': 12, 'age': 3},  # Sentry Tower
        235: {'id': 15, 'age': 4},  # Guard Tower
        236: {'id': 2, 'age': 4},  # Ballista Tower
    }
    for civ in civs.values():
        civ['Tech'].extend(age_ups)
        for building_id, tech_id in wall_tower_techs.items():
            if building_id in civ['Building']:
                civ['Tech'].append(tech_id)
        civ['Tech'].sort(key=lambda x: x['id'])


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


def ror_write_language_files(args, techtrees, outputdir):
    programdir = Path(args.programdir)
    for language in LANGUAGES:
        key_value_filtered = ror_gather_language_data(programdir, techtrees, language)

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
    civs, unit_upgrades = ror_gather_civs(techtrees)
    datafile = Path(args.programdir) / 'modes' / 'Pompeii' / 'resources' / '_common' / 'dat' / 'empires2_x2_p1.dat'
    content = DatFile.parse(datafile)
    data = ror_gather_data(content, civs, unit_upgrades)
    ror_update_civ_techs(civs, data)
    ror_write_datafile(data, civs, outputdir)
    ror_write_language_files(args, techtrees, outputdir)


def process_aoe2(args, outputdir):
    techtreesfiles = sorted((Path(args.programdir) / 'resources' / '_common' / 'dat' / 'CivTechTrees').glob('*.json'))
    techtrees = {"civs": [json.loads(ttfile.read_text()) for ttfile in techtreesfiles]}
    civ_info_file = Path(args.programdir) / 'resources' / '_common' / 'dat' / 'civilizations.json'
    civ_info_raw = json.loads(civ_info_file.read_text())
    civs_info = {civ['tech_tree_name']: civ for civ in civ_info_raw['civilization_list']}
    civs, unit_upgrades = gather_civs(techtrees, civs_info)
    datafile = Path(args.programdir) / 'resources' / '_common' / 'dat' / 'empires2_x2_p1.dat'
    content = DatFile.parse(datafile)
    data, extra_ids = gather_data(content, civs, unit_upgrades)
    write_datafile(data, civs, outputdir)
    write_language_files(args, techtrees, civs_info, extra_ids, outputdir)


def main():
    parser = argparse.ArgumentParser(description='Generate data files for aoe2techtree')
    parser.add_argument('programdir', help='The main folder of an aoe2de installation, usually '
                                           'C:/Program Files (x86)/Steam/steamapps/common/AoE2DE/')

    args = parser.parse_args()

    outputdir = Path(__file__).parent / '..' / 'data'
    process_aoe2(args, outputdir)

    print('RoR needs to be fully migrated still')
    raise SystemExit(0)
    outputdir = Path(__file__).parent / '..' / 'ror' / 'data'
    process_ror(args, outputdir)


if __name__ == '__main__':
    main()
