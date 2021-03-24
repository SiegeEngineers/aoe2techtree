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
    "Indians": "10290",
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
    "Indians": "120169",
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
}

BUILDINGS = {
    12: {"internal_name": "Barracks Age1"},
    45: {"internal_name": "DOCK"},
    49: {"internal_name": "SIWS"},
    50: {"internal_name": "FARM"},
    68: {"internal_name": "MILL"},
    70: {"internal_name": "HOUS"},
    71: {"internal_name": "RTWC2"},
    72: {"internal_name": "WALL"},
    79: {"internal_name": "WCTW"},
    82: {"internal_name": "CSTL"},
    84: {"internal_name": "MRKT"},
    87: {"internal_name": "ARRG"},
    101: {"internal_name": "STBL"},
    103: {"internal_name": "BLAC"},
    104: {"internal_name": "CRCH"},
    109: {"internal_name": "RTWC"},
    117: {"internal_name": "WALL2"},
    155: {"internal_name": "WALL3"},
    199: {"internal_name": "FTRAP"},
    209: {"internal_name": "UNIV"},
    234: {"internal_name": "WCTW2"},
    235: {"internal_name": "WCTW3"},
    236: {"internal_name": "WCTW4"},
    276: {"internal_name": "WNDR"},
    487: {"internal_name": "GTAX2"},
    562: {"internal_name": "SMIL"},
    584: {"internal_name": "MINE"},
    598: {"internal_name": "WCTWX"},
    621: {"internal_name": "RTWC1X"},
    792: {"internal_name": "PGTAX"},
    1021: {"internal_name": "FEITO"},
    1251: {"internal_name": "KREPOST"},
    1665: {"internal_name": "DONJON"},
}

UNITS = {
    4: {"internal_name": "ARCHR"},
    5: {"internal_name": "HCANR"},
    6: {"internal_name": "HXBOW"},
    7: {"internal_name": "XBOWM"},
    8: {"internal_name": "LNGBW"},
    11: {"internal_name": "MOSUN"},
    13: {"internal_name": "FSHSP"},
    17: {"internal_name": "COGXX"},
    21: {"internal_name": "GALLY"},
    24: {"internal_name": "CARCH"},
    25: {"internal_name": "TKNIT"},
    36: {"internal_name": "BCANN"},
    38: {"internal_name": "KNGHT"},
    39: {"internal_name": "CVRCH"},
    40: {"internal_name": "CATAP"},
    41: {"internal_name": "GBRSK"},
    42: {"internal_name": "TREBU"},
    46: {"internal_name": "JANNI"},
    73: {"internal_name": "CHUKN"},
    74: {"internal_name": "SPRMN"},
    75: {"internal_name": "SWDMN"},
    77: {"internal_name": "THSWD"},
    83: {"internal_name": "VMBAS"},
    93: {"internal_name": "PKEMN"},
    125: {"internal_name": "MONKX"},
    128: {"internal_name": "TCART"},
    185: {"internal_name": "SLINGR"},
    207: {"internal_name": "SHCLRY"},
    232: {"internal_name": "WBRSK"},
    239: {"internal_name": "MPCAV"},
    250: {"internal_name": "LNGBT"},
    279: {"internal_name": "SCBAL"},
    280: {"internal_name": "MANGO"},
    281: {"internal_name": "TAXEM"},
    282: {"internal_name": "DERVI"},
    283: {"internal_name": "PALDN"},
    291: {"internal_name": "SMURI"},
    329: {"internal_name": "CVLRY"},
    330: {"internal_name": "HCLRY"},
    331: {"internal_name": "PTREB"},
    358: {"internal_name": "ISPKM"},
    359: {"internal_name": "HLBDM"},
    420: {"internal_name": "CANGA"},
    422: {"internal_name": "CBATR"},
    440: {"internal_name": "PETARD"},
    441: {"internal_name": "HUSSAR"},
    442: {"internal_name": "WARGA"},
    448: {"internal_name": "SCOUT"},
    473: {"internal_name": "HTHSW"},
    474: {"internal_name": "HCVAR"},
    492: {"internal_name": "ACOAR"},
    527: {"internal_name": "RMSHP"},
    528: {"internal_name": "CRMSH"},
    529: {"internal_name": "FRGAL"},
    530: {"internal_name": "ULGBW"},
    531: {"internal_name": "UTAXE"},
    532: {"internal_name": "HFGAL"},
    533: {"internal_name": "ULNGB"},
    534: {"internal_name": "UWBRS"},
    539: {"internal_name": "SGALY"},
    542: {"internal_name": "HWBAL"},
    545: {"internal_name": "XPORT"},
    546: {"internal_name": "LTCAV"},
    548: {"internal_name": "SGRAM"},
    550: {"internal_name": "ONAGR"},
    553: {"internal_name": "UCATA"},
    554: {"internal_name": "UTKNI"},
    555: {"internal_name": "UGBRS"},
    556: {"internal_name": "UDERV"},
    557: {"internal_name": "UJANI"},
    558: {"internal_name": "UMPCAV"},
    559: {"internal_name": "UCHUK"},
    560: {"internal_name": "USMUR"},
    561: {"internal_name": "UMOSU"},
    567: {"internal_name": "HEROI"},
    569: {"internal_name": "HEROC"},
    588: {"internal_name": "SNAGR"},
    691: {"internal_name": "CNGAU"},
    692: {"internal_name": "VBRSK"},
    694: {"internal_name": "UVBRK"},
    725: {"internal_name": "JAGUAR"},
    726: {"internal_name": "JAGUARX"},
    751: {"internal_name": "EAGLE"},
    752: {"internal_name": "EAGLEX"},
    753: {"internal_name": "EAGLEH"},
    755: {"internal_name": "TARKAN"},
    757: {"internal_name": "UTARK"},
    763: {"internal_name": "PLUME"},
    765: {"internal_name": "UPLUM"},
    771: {"internal_name": "CONQI"},
    773: {"internal_name": "UCONQ"},
    775: {"internal_name": "MONKY"},
    827: {"internal_name": "WAGON"},
    829: {"internal_name": "UWAGO"},
    831: {"internal_name": "TURTL"},
    832: {"internal_name": "UTURT"},
    866: {"internal_name": "GENOE"},
    868: {"internal_name": "GENOE_E"},
    869: {"internal_name": "UMAGYX"},
    871: {"internal_name": "UMAGYX"},
    873: {"internal_name": "ELEAR"},
    875: {"internal_name": "UELEA"},
    876: {"internal_name": "BOYAR"},
    878: {"internal_name": "EBOYA"},
    879: {"internal_name": "KAMAY"},
    881: {"internal_name": "EKAMA"},
    882: {"internal_name": "CONDO"},
    1001: {"internal_name": "ORGAN"},
    1003: {"internal_name": "EORGAN"},
    1004: {"internal_name": "CARAV"},
    1006: {"internal_name": "CARAV"},
    1007: {"internal_name": "CAMAR"},
    1009: {"internal_name": "ECAMAR"},
    1010: {"internal_name": "GENITO"},
    1012: {"internal_name": "EGENITO"},
    1013: {"internal_name": "GBETO"},
    1015: {"internal_name": "EGBETO"},
    1016: {"internal_name": "SHOTEL"},
    1018: {"internal_name": "ESHOTEL"},
    1103: {"internal_name": "SFRGAL"},
    1104: {"internal_name": "SDGAL"},
    1105: {"internal_name": "SIEGTWR"},
    1120: {"internal_name": "ELEBALI"},
    1122: {"internal_name": "EELEBALI"},
    1123: {"internal_name": "KARAM"},
    1125: {"internal_name": "EKARAM"},
    1126: {"internal_name": "ARAMBAI"},
    1128: {"internal_name": "EARAMBAI"},
    1129: {"internal_name": "RATAN"},
    1131: {"internal_name": "ERATAN"},
    1132: {"internal_name": "BATELE"},
    1134: {"internal_name": "EBATELE"},
    1155: {"internal_name": "IHXBOW"},
    1225: {"internal_name": "KONNIK"},
    1227: {"internal_name": "EKONNIK"},
    1228: {"internal_name": "KESHIK"},
    1230: {"internal_name": "EKESHIK"},
    1231: {"internal_name": "KIPCHAK"},
    1233: {"internal_name": "EKIPCHAK"},
    1234: {"internal_name": "LEITIS"},
    1236: {"internal_name": "ELEITIS"},
    1252: {"internal_name": "KONNIK_INF"},
    1253: {"internal_name": "EKONNIK_INF"},
    1254: {"internal_name": "KONNIK"},
    1255: {"internal_name": "EKONNIK"},
    1258: {"internal_name": "BTRAM"},
    1263: {"internal_name": "FCAMEL"},
    1370: {"internal_name": "SLANCER"},
    1372: {"internal_name": "ESLANCER"},
    1570: {"internal_name": "AZTRAIDER"},
    1655: {"internal_name": "COUSTILLIER"},
    1657: {"internal_name": "ECOUSTILLIER"},
    1658: {"internal_name": "SERJEANT"},
    1659: {"internal_name": "ESERJEANT"},
    1660: {"internal_name": "DSERJEANT"},
    1661: {"internal_name": "EDSERJEANT"},
    1699: {"internal_name": "FLEMISHPIKEMAN2"},
}

TECHS = {
    3: {"internal_name": "British Yeoman"},
    4: {"internal_name": "Mayan El Dorado"},
    5: {"internal_name": "Celtic Furor Celtica"},
    6: {"internal_name": "Mongol Siege Drill"},
    7: {"internal_name": "Persian Mahouts"},
    8: {"internal_name": "Town Watch"},
    9: {"internal_name": "Saracen Zealotry"},
    10: {"internal_name": "Turkish Artillery"},
    11: {"internal_name": "Teuton Crenellations"},
    12: {"internal_name": "Crop rotation"},
    13: {"internal_name": "Heavy plow"},
    14: {"internal_name": "Horse collar"},
    15: {"internal_name": "Guilds"},
    16: {"internal_name": "Gothic Anarchy"},
    17: {"internal_name": "Banking"},
    19: {"internal_name": "Cartography"},
    21: {"internal_name": "Hun Atheism"},
    22: {"internal_name": "Loom"},
    23: {"internal_name": "Coinage"},
    24: {"internal_name": "Aztec Garland Wars"},
    39: {"internal_name": "Husbandry"},
    45: {"internal_name": "Faith"},
    47: {"internal_name": "Chemistry"},
    48: {"internal_name": "Caravan"},
    49: {"internal_name": "Viking Berserkergang"},
    50: {"internal_name": "Masonry"},
    51: {"internal_name": "Architecture"},
    52: {"internal_name": "Chinese Rocketry"},
    54: {"internal_name": "Stone cutting"},
    55: {"internal_name": "Gold Mining"},
    59: {"internal_name": "Japanese Kataparuto"},
    61: {"internal_name": "Byzantine Logistica"},
    63: {"internal_name": "Keep"},
    64: {"internal_name": "Bombard Tower"},
    65: {"internal_name": "Gillnets"},
    67: {"internal_name": "Forging"},
    68: {"internal_name": "Iron casting"},
    74: {"internal_name": "Scale Mail Armor"},
    75: {"internal_name": "Blast Furnace"},
    76: {"internal_name": "Chain Mail Armor"},
    77: {"internal_name": "Plate Mail Armor"},
    80: {"internal_name": "Plate Barding Armor"},
    81: {"internal_name": "Scale Barding Armor"},
    82: {"internal_name": "Chain Barding Armor"},
    83: {"internal_name": "Frankish Bearded Axe"},
    90: {"internal_name": "Tracking"},
    93: {"internal_name": "Ballistics"},
    101: {"internal_name": "Middle Age"},
    102: {"internal_name": "Feudal Age"},
    103: {"internal_name": "Imperial Age"},
    140: {"internal_name": "Guard Tower"},
    182: {"internal_name": "Gold Shaft Mining"},
    194: {"internal_name": "Fortified Wall"},
    199: {"internal_name": "Fletching"},
    200: {"internal_name": "Bodkin Arrow"},
    201: {"internal_name": "Bracer"},
    202: {"internal_name": "Double Bit Axe"},
    203: {"internal_name": "Bow Saw"},
    211: {"internal_name": "Padded Archer Armor"},
    212: {"internal_name": "Leather Archer Armor"},
    213: {"internal_name": "Wheel Barrow"},
    215: {"internal_name": "Squires"},
    219: {"internal_name": "Ring Archer Armor"},
    221: {"internal_name": "Two Man Saw"},
    230: {"internal_name": "Block Printing"},
    231: {"internal_name": "Sanctity"},
    233: {"internal_name": "Illumination"},
    249: {"internal_name": "Hand Cart"},
    252: {"internal_name": "Fervor"},
    278: {"internal_name": "Stone Mining"},
    279: {"internal_name": "Stone Shaft Mining"},
    280: {"internal_name": "Town Patrol"},
    315: {"internal_name": "Conscription"},
    316: {"internal_name": "Redemption"},
    319: {"internal_name": "Atonement"},
    321: {"internal_name": "Sappers"},
    322: {"internal_name": "Murder Holes"},
    373: {"internal_name": "Shipwright"},
    374: {"internal_name": "Careening"},
    375: {"internal_name": "Dry Dock"},
    377: {"internal_name": "Siege Engineers"},
    379: {"internal_name": "Hoardings"},
    380: {"internal_name": "Heated Shot"},
    408: {"internal_name": "Spy Technology"},
    435: {"internal_name": "Bloodlines"},
    436: {"internal_name": "Parthian Tactics"},
    437: {"internal_name": "Thumb Ring"},
    438: {"internal_name": "Theocracy"},
    439: {"internal_name": "Heresy"},
    440: {"internal_name": "Spanish Supremacy"},
    441: {"internal_name": "Herbal Medicine"},
    445: {"internal_name": "Korean catapults"},
    457: {"internal_name": "Gothic Perfusion"},
    460: {"internal_name": "Aztec Sacrifice"},
    461: {"internal_name": "Britons City Rights"},
    462: {"internal_name": "Chinese Great Wall"},
    463: {"internal_name": "Viking Chieftains"},
    464: {"internal_name": "Byzantines Greek Fire"},
    482: {"internal_name": "Stronghold"},
    483: {"internal_name": "Huns UT"},
    484: {"internal_name": "Japanese UT"},
    485: {"internal_name": "Mayans UT"},
    486: {"internal_name": "Koreans UT"},
    487: {"internal_name": "Mongols UT"},
    488: {"internal_name": "Persians UT"},
    489: {"internal_name": "Teutons UT"},
    490: {"internal_name": "Saracens UT"},
    491: {"internal_name": "Sipahi"},
    492: {"internal_name": "Spanish UT"},
    493: {"internal_name": "Franks UT"},
    494: {"internal_name": "Pavise"},
    499: {"internal_name": "Silk Route"},
    506: {"internal_name": "Indians UT"},
    507: {"internal_name": "Indians UT2"},
    512: {"internal_name": "Slavs UT"},
    513: {"internal_name": "Slavs UT"},
    514: {"internal_name": "Magyars UT"},
    515: {"internal_name": "Indians UT"},
    516: {"internal_name": "Incas UT"},
    517: {"internal_name": "Indians UT"},
    572: {"internal_name": "Portuguese UT"},
    573: {"internal_name": "Portuguese UT"},
    574: {"internal_name": "Ethiopian UT"},
    575: {"internal_name": "Ethiopian UT"},
    576: {"internal_name": "Malian UT"},
    577: {"internal_name": "Malian UT"},
    578: {"internal_name": "Berber UT"},
    579: {"internal_name": "Berber UT"},
    602: {"internal_name": "Arson"},
    608: {"internal_name": "Arrowslits"},
    622: {"internal_name": "Khmer UT"},
    623: {"internal_name": "Khmer UT"},
    624: {"internal_name": "Malay UT"},
    625: {"internal_name": "Malay UT"},
    626: {"internal_name": "Burmese UT"},
    627: {"internal_name": "Burmese UT"},
    628: {"internal_name": "Vietnamese UT"},
    629: {"internal_name": "Vietnamese UT"},
    685: {"internal_name": "Khmer UT"},
    686: {"internal_name": "Khmer UT"},
    687: {"internal_name": "Malay UT"},
    688: {"internal_name": "Malay UT"},
    689: {"internal_name": "Burmese UT"},
    690: {"internal_name": "Burmese UT"},
    691: {"internal_name": "Vietnamese UT"},
    692: {"internal_name": "Vietnamese UT"},
    716: {"internal_name": "Tracking"},
    754: {"internal_name": "Burgundian Vineyards"},
    755: {"internal_name": "Flemish Revolution"},
    756: {"internal_name": "First Crusade"},
    757: {"internal_name": "Scutage"},
}


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

    key_value_filtered = {}
    for datatype in data:
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


def gather_data(content):
    civs = content["Civs"]
    gaia = civs[0]
    graphics = content["Graphics"]
    data = {"buildings": {}, "units": {}, "techs": {}}
    for unit in gaia["Units"]:
        for key, value in BUILDINGS.items():
            if unit_matches_building(unit, key, value):
                add_building(key, value, unit, data)
        for key, value in UNITS.items():
            if unit_matches_unit(unit, key, value):
                add_unit(key, value, unit, graphics, data)
    tech_id = 0
    for tech in content["Techs"]:
        for key, value in TECHS.items():
            if tech_matches(tech_id, tech, key, value):
                add_tech(key, value, tech, data)
        tech_id += 1

    data["units"][83]['LanguageNameId'] = 5606  # Villager
    data["units"][128]['LanguageNameId'] = 19052  # Trade Cart
    data["units"][331]['LanguageNameId'] = 5097  # Trebuchet

    return data


def unit_matches_building(gaia_unit, building_id, building):
    return gaia_unit["ID"] == building_id and gaia_unit["Name"] == building['internal_name']


def unit_matches_unit(gaia_unit, unit_id, unit):
    return gaia_unit["ID"] == unit_id and gaia_unit["Name"] == unit['internal_name']


def tech_matches(tech_id, tech, key, value):
    return tech_id == key and tech["Name"] == value['internal_name']


def add_building(building_id, value, unit, data):
    data['buildings'][building_id] = {
        'internal_name': value['internal_name'],
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


def add_unit(key, value, unit, graphics, data):
    if unit["Type50"]["FrameDelay"] == 0 or unit["Type50"]["AttackGraphic"] == -1:
        attack_delay_seconds = 0.0
    else:
        attack_graphic = graphics[unit["Type50"]["AttackGraphic"]]
        animation_duration = attack_graphic["AnimationDuration"]
        frame_delay = unit["Type50"]["FrameDelay"]
        frame_count = attack_graphic["FrameCount"]
        attack_delay_seconds = animation_duration * frame_delay / frame_count
    data['units'][key] = {
        'internal_name': value['internal_name'],
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
        'LanguageNameId': unit['LanguageDLLName'],
        'LanguageHelpId': unit['LanguageDLLName'] + 21_000,
    }
    if unit["Creatable"]["RechargeRate"] > 0:
        data['units'][key]['RechargeDuration'] = unit["Creatable"]["MaxCharge"] / unit["Creatable"]["RechargeRate"]


def add_tech(key, value, tech, data):
    data['techs'][key] = {
        'internal_name': value['internal_name'],
        'ResearchTime': tech['ResearchTime'],
        'ID': key,
        'Cost': get_cost(tech),
        'LanguageNameId': tech['LanguageDLLName'],
        'LanguageHelpId': tech['LanguageDLLName'] + 21_000,
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
    for language in ('br', 'de', 'en', 'es', 'fr', 'hi', 'it', 'jp', 'ko', 'ms', 'mx', 'ru', 'tr', 'tw', 'vi', 'zh'):
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
        civs[civname] = current_civ

    XOLOTL_WARRIOR = 1570
    for civname in ('Aztecs', 'Mayans', 'Incas'):
        civs[civname]['units'].append(XOLOTL_WARRIOR)
        civs[civname]['units'] = sorted(civs[civname]['units'])
    return civs


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

    datafile = Path(args.datafile)
    content = json.loads(datafile.read_text())
    data = gather_data(content)

    techtreesfile = Path(args.programdir) / 'widgetui' / 'civTechTrees.json'
    techtrees = json.loads(techtreesfile.read_text())
    civs = gather_civs(techtrees)

    write_datafile(data, civs, outputdir)
    write_language_files(args, data, outputdir)


if __name__ == '__main__':
    main()
