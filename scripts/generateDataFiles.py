#! /usr/bin/env python3

import argparse
import json
import re
import sys
from pathlib import Path

TECH_TREE_STRINGS = {
    "Age of Empires II": "1001",
    "Civilization": "9681",
    "Technology Tree": "9799",
    "Key": "300081",
    "Unique Unit": "300082",
    "Unit": "300083",
    "Building": "300084",
    "Technology": "300085",
}

AGE_NAMES = {
    "Dark Age": "4201",
    "Feudal Age": "4202",
    "Castle Age": "4203",
    "Imperial Age": "4204"
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
}

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
}

RTWC2 = 71
PTREB = 42
KONNIK_INF = 1252
EKONNIK_INF = 1253
RATHA = 1738
ERATHA = 1740
CARTOGRAPHY = 19
TRACKING = 90

def get_unit_cost(unit):
    return get_cost(unit["Creatable"])


def get_cost(creatable):
    cost = {}
    resource_costs = creatable["ResourceCosts"]
    for rc in resource_costs:
        if rc["Type"] == 0:
            cost["Food"] = rc["Amount"]
        if rc["Type"] == 1:
            cost["Wood"] = rc["Amount"]
        if rc["Type"] == 2:
            cost["Stone"] = rc["Amount"]
        if rc["Type"] == 3:
            cost["Gold"] = rc["Amount"]
    return cost


def gather_language_data(resourcesdir, data, language):
    key_value_strings_file_en = resourcesdir / language / 'strings' / 'key-value' / 'key-value-strings-utf8.txt'
    key_value = {}
    with key_value_strings_file_en.open() as f:
        for line in f:
            parse_line(key_value, line)

    key_value[26708] = key_value[26186]  # Palisade Gate
    key_value[26097] = key_value[26381]  # Trebuchet
    key_value[26768] = key_value[28314]  # Gillnets
    key_value[42057] = key_value[26288]  # Use Konnik for Dismounted Konnik
    key_value[42058] = key_value[26290]  # Use Elite Konnik for Dismounted Elite Konnik
    key_value[21104] = key_value[5414]  # Fix Ratha name
    key_value[42104] = key_value[26414]  # Fix Ratha description
    key_value[42096] = key_value[26414]  # Fix Ratha (melee) description
    key_value[21105] = key_value[5420]  # Fix Elite Ratha name
    key_value[42105] = key_value[26420]  # Fix Elite Ratha description
    key_value[42097] = key_value[26420]  # Fix Elite Ratha (melee) description

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


def parse_line(key_value, line):
    items = line.split(" ")
    if items[0].isnumeric():
        number = int(items[0])
        match = re.search('".+"', line)
        if match:
            text = match.group(0)[1:-1]
            text = re.sub(r'<(.+?)>', r'‹\1›', text)
            text = re.sub(r'‹b›(.+?)‹b›', r'<b>\1</b>', text)
            text = re.sub(r'‹i›(.+?)‹i›', r'<i>\1</i>', text)
            text = re.sub(r'\\n', r'<br>\n', text)
            key_value[number] = text


def gather_data(content, civs, unit_upgrades):
    building_ids = set.union({b for c in civs.values() for b in c['buildings']}, \
        {RTWC2})
    unit_ids = set.union({u for c in civs.values() for u in c['units']}, \
        {c['unique']['castleAgeUniqueUnit'] for c in civs.values()}, \
        {c['unique']['imperialAgeUniqueUnit'] for c in civs.values()}, \
        {PTREB, KONNIK_INF, EKONNIK_INF, RATHA, ERATHA})
    tech_ids = set.union({t for c in civs.values() for t in c['techs']}, \
        {c['unique']['castleAgeUniqueTech'] for c in civs.values()}, \
        {c['unique']['imperialAgeUniqueTech'] for c in civs.values()}, \
        {CARTOGRAPHY, TRACKING})
    gaia = content["Civs"][0]
    graphics = content["Graphics"]
    data = {"buildings": {}, "units": {}, "techs": {}, "unit_upgrades": {}}
    for unit in gaia["Units"]:
        if unit["ID"] in building_ids:
            add_building(unit["ID"], unit, data)
        if unit["ID"] in unit_ids:
            add_unit(unit["ID"], unit, graphics, data)
    tech_id = 0
    for tech in content["Techs"]:
        if tech_id in tech_ids:
            add_tech(tech_id, tech, data)
        tech_id += 1

    for unit_id, upgrade_id in unit_upgrades.items():
        tech = content["Techs"][upgrade_id]
        add_unit_upgrade(unit_id, tech_id, tech, data)

    data["units"][83]['LanguageNameId'] = 5606  # Villager
    data["units"][128]['LanguageNameId'] = 19052  # Trade Cart
    data["units"][331]['LanguageNameId'] = 5097  # Trebuchet

    return data


def add_building(building_id, unit, data):
    data['buildings'][building_id] = {
        'internal_name': unit['Name'],
        'ID': building_id,
        'HP': unit["HitPoints"],
        'Cost': get_unit_cost(unit),
        'Attack': unit["Type50"]["DisplayedAttack"],
        'Range': unit["Type50"]["DisplayedRange"],
        'MeleeArmor': unit["Type50"]["DisplayedMeleeArmour"],
        'PierceArmor': unit["Creatable"]["DisplayedPierceArmour"],
        'GarrisonCapacity': unit["GarrisonCapacity"],
        'LineOfSight': unit["LineOfSight"],
        'Attacks': unit["Type50"]["Attacks"],
        'Armours': unit["Type50"]["Armours"],
        'ReloadTime': unit["Type50"]["ReloadTime"],
        'AccuracyPercent': unit["Type50"]["AccuracyPercent"],
        'MinRange': unit["Type50"]["MinRange"],
        'TrainTime': unit["Creatable"]["TrainTime"],
        'LanguageNameId': unit['LanguageDLLName'],
        'LanguageHelpId': unit['LanguageDLLName'] + 21_000,
    }


def add_unit(key, unit, graphics, data):
    if unit["Type50"]["FrameDelay"] == 0 or unit["Type50"]["AttackGraphic"] == -1:
        attack_delay_seconds = 0.0
    else:
        attack_graphic = graphics[unit["Type50"]["AttackGraphic"]]
        animation_duration = attack_graphic["AnimationDuration"]
        frame_delay = unit["Type50"]["FrameDelay"]
        frame_count = attack_graphic["FrameCount"]
        attack_delay_seconds = animation_duration * frame_delay / frame_count
    data['units'][key] = {
        'internal_name': unit['Name'],
        'ID': key,
        'HP': unit["HitPoints"],
        'Cost': get_unit_cost(unit),
        'Attack': unit["Type50"]["DisplayedAttack"],
        'Range': unit["Type50"]["DisplayedRange"],
        'MeleeArmor': unit["Type50"]["DisplayedMeleeArmour"],
        'PierceArmor': unit["Creatable"]["DisplayedPierceArmour"],
        'GarrisonCapacity': unit["GarrisonCapacity"],
        'LineOfSight': unit["LineOfSight"],
        'Speed': unit["Speed"],
        'Trait': unit["Trait"],
        'TraitPiece': unit["Nothing"],
        'Attacks': unit["Type50"]["Attacks"],
        'Armours': unit["Type50"]["Armours"],
        'ReloadTime': unit["Type50"]["ReloadTime"],
        'AccuracyPercent': unit["Type50"]["AccuracyPercent"],
        'FrameDelay': unit["Type50"]["FrameDelay"],
        'AttackDelaySeconds': attack_delay_seconds,
        'MinRange': unit["Type50"]["MinRange"],
        'TrainTime': unit["Creatable"]["TrainTime"],
        'MaxCharge': unit["Creatable"]["MaxCharge"],
        'RechargeRate': unit["Creatable"]["RechargeRate"],
        'ChargeEvent': unit["Creatable"]["ChargeEvent"],
        'ChargeType': unit["Creatable"]["ChargeType"],
        'LanguageNameId': unit['LanguageDLLName'],
        'LanguageHelpId': unit['LanguageDLLName'] + 21_000,
    }
    if unit["Creatable"]["RechargeRate"] > 0:
        data['units'][key]['RechargeDuration'] = unit["Creatable"]["MaxCharge"] / unit["Creatable"]["RechargeRate"]


def add_tech(key, tech, data):
    data['techs'][key] = {
        'internal_name': tech['Name'],
        'ResearchTime': tech['ResearchTime'],
        'ID': key,
        'Cost': get_cost(tech),
        'LanguageNameId': tech['LanguageDLLName'],
        'LanguageHelpId': tech['LanguageDLLName'] + 21_000,
        'Repeatable': tech['Repeatable'] == "1",
    }


def add_unit_upgrade(key, tech_id, tech, data):
    data['unit_upgrades'][key] = {
        'internal_name': tech['Name'],
        'ResearchTime': tech['ResearchTime'],
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
    for language in ('br', 'de', 'en', 'es', 'fr', 'hi', 'it', 'jp', 'ko', 'ms', 'mx', 'pl', 'ru', 'tr', 'tw', 'vi', 'zh'):
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
    for civ in techtrees['civs']:
        current_civ = {'buildings': [], 'units': [], 'techs': [], 'unique': {}, 'monkPrefix': ''}
        for building in civ['civ_techs_buildings']:
            if building['Node Status'] != 'NotAvailable':
                current_civ['buildings'].append(building['Node ID'])
        for unit in civ['civ_techs_units']:
            if unit['Name'] == 'Monk' and unit['Picture Index'] == 131:
                current_civ['monkPrefix'] = 'meso_'
            if unit['Node Type'] in ('Unit', 'UniqueUnit', 'UnitUpgrade') and unit['Node Status'] != 'NotAvailable':
                if is_castle_age_unique_unit(unit):
                    current_civ['unique']['castleAgeUniqueUnit'] = unit['Node ID']
                elif is_imperial_age_unique_unit(unit):
                    current_civ['unique']['imperialAgeUniqueUnit'] = unit['Node ID']
                elif unit['Node ID'] not in unit_excludelist:
                    current_civ['units'].append(unit['Node ID'])
                if unit['Trigger Tech ID'] > -1:
                    unit_upgrades[unit['Node ID']] = unit['Trigger Tech ID']

        for tech in civ['civ_techs_units']:
            if tech['Node Type'] == 'Research' and tech['Node Status'] != 'NotAvailable':
                if is_castle_age_unique_tech(tech):
                    current_civ['unique']['castleAgeUniqueTech'] = tech['Node ID']
                elif is_imperial_age_unique_tech(tech):
                    current_civ['unique']['imperialAgeUniqueTech'] = tech['Node ID']
                else:
                    current_civ['techs'].append(tech['Node ID'])

        current_civ['buildings'] = sorted(current_civ['buildings'])
        current_civ['units'] = sorted(current_civ['units'])
        current_civ['techs'] = sorted(current_civ['techs'])

        civname = civ['civ_id'].capitalize()
        if civname == 'Magyar':
            civname = 'Magyars'
        if civname == 'Indians':
            civname = 'Hindustanis'
        civs[civname] = current_civ

    XOLOTL_WARRIOR = 1570
    for civname in ('Aztecs', 'Mayans', 'Incas'):
        civs[civname]['units'].append(XOLOTL_WARRIOR)
        civs[civname]['units'] = sorted(civs[civname]['units'])

    DEMOLITION_SHIP = 527
    FIRE_SHIP = 529
    WAR_GALLEY_UPGRADE = 34
    unit_upgrades[DEMOLITION_SHIP] = WAR_GALLEY_UPGRADE
    unit_upgrades[FIRE_SHIP] = WAR_GALLEY_UPGRADE

    return civs, unit_upgrades


def write_datafile(data, techtrees, outputdir):
    datafile = outputdir / 'data.json'
    with datafile.open('w') as f:
        print(f'Writing data file {datafile}')
        json.dump({"tech_tree_strings": TECH_TREE_STRINGS, "age_names": AGE_NAMES, "civ_names": CIV_NAMES,
                   "civ_helptexts": CIV_HELPTEXTS, "techtrees": techtrees, "data": data}, f, indent=4, sort_keys=True,
                  ensure_ascii=False)


def main():
    parser = argparse.ArgumentParser(description='Generate data files for aoe2techtree')
    parser.add_argument('datafile', help='A full.json file generated by aoe2dat')
    parser.add_argument('programdir', help='The main folder of an aoe2de installation, usually '
                                           'C:/Program Files (x86)/Steam/steamapps/common/AoE2DE/')
    parser.add_argument('--output', help='The data directory to place the output files into')

    args = parser.parse_args()

    if args.output and not Path(args.output).is_dir():
        print(f'The output path {args.output} is not an existing directory.')
        sys.exit()

    outputdir = Path(__file__).parent / '..' / 'data'
    if args.output:
        outputdir = Path(args.output)

    techtreesfile = Path(args.programdir) / 'widgetui' / 'civTechTrees.json'
    techtrees = json.loads(techtreesfile.read_text())
    civs, unit_upgrades = gather_civs(techtrees)

    datafile = Path(args.datafile)
    content = json.loads(datafile.read_text())
    data = gather_data(content, civs, unit_upgrades)

    write_datafile(data, civs, outputdir)
    write_language_files(args, data, outputdir)


if __name__ == '__main__':
    main()
