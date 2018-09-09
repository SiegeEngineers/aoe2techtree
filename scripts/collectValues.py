#! /usr/bin/env python3

import sys
import os
import re
import json

BUILDINGS = {
    12: {"internal_name": "BRKS", "Name": "Barracks"},
    45: {"internal_name": "DOCK", "Name": "Dock"},
    598: {"internal_name": "WCTWX", "Name": "Outpost"},
    72: {"internal_name": "WALL", "Name": "Palisade Wall"},
    789: {"internal_name": "PGTAA", "Name": "Palisade Gate"},
    70: {"internal_name": "HOUS", "Name": "House"},
    109: {"internal_name": "RTWC", "Name": "Town Center"},
    584: {"internal_name": "MINE", "Name": "Mining Camp"},
    562: {"internal_name": "SMIL", "Name": "Lumber Camp"},
    68: {"internal_name": "MILL", "Name": "Mill"},
    50: {"internal_name": "FARM", "Name": "Farm"},
    87: {"internal_name": "ARRG", "Name": "Archery Range"},
    101: {"internal_name": "STBL", "Name": "Stable"},
    199: {"internal_name": "FTRAP", "Name": "Fish Trap"},
    79: {"internal_name": "WCTW", "Name": "Watch Tower"},
    64: {"internal_name": "GTAA2", "Name": "Gate"},
    117: {"internal_name": "WALL2", "Name": "Stone Wall"},
    103: {"internal_name": "BLAC", "Name": "Blacksmith"},
    84: {"internal_name": "MRKT", "Name": "Market"},
    234: {"internal_name": "WCTW2", "Name": "Guard Tower"},
    155: {"internal_name": "WALL3", "Name": "Fortified Wall"},
    104: {"internal_name": "CRCH", "Name": "Monastery"},
    82: {"internal_name": "CSTL", "Name": "Castle"},
    71: {"internal_name": "RTWC2", "Name": "Town Center"},
    49: {"internal_name": "SIWS", "Name": "Siege Workshop"},
    209: {"internal_name": "UNIV", "Name": "University"},
    276: {"internal_name": "WNDR", "Name": "Wonder"},
    1021: {"internal_name": "FEITO", "Name": "Feitoria"},
    235: {"internal_name": "WCTW3", "Name": "Keep"},
    236: {"internal_name": "WCTW4", "Name": "Bombard Tower"},
}

UNITS = {
    74: {"internal_name": "SPRMN", "Name": "Militia"},
    13: {"internal_name": "FSHSP", "Name": "Fishing Ship"},
    545: {"internal_name": "XPORT", "Name": "Transport Ship"},
    83: {"internal_name": "VMBAS", "Name": "Villager"},
    4: {"internal_name": "ARCHR", "Name": "Archer"},
    7: {"internal_name": "XBOWM", "Name": "Skirmisher"},
    75: {"internal_name": "SWDMN", "Name": "Man-at-Arms"},
    93: {"internal_name": "PKEMN", "Name": "Spearman"},
    751: {"internal_name": "EAGLE", "Name": "Eagle Scout"},
    448: {"internal_name": "SCOUT", "Name": "Scout Cavalry"},
    1103: {"internal_name": "SFRGAL", "Name": "Fire Galley"},
    17: {"internal_name": "COGXX", "Name": "Trade Cog"},
    1104: {"internal_name": "SDGAL", "Name": "Demolition Raft"},
    539: {"internal_name": "SGALY", "Name": "Galley"},
    128: {"internal_name": "TCART", "Name": "Trade Cart"},
    24: {"internal_name": "CARCH", "Name": "Crossbowman"},
    6: {"internal_name": "HXBOW", "Name": "Elite Skirmisher"},
    185: {"internal_name": "SLINGR", "Name": "Slinger"},
    39: {"internal_name": "CVRCH", "Name": "Cavalry Archer"},
    583: {"internal_name": "GENIT", "Name": "Genitour"},
    77: {"internal_name": "THSWD", "Name": "Long Swordsman"},
    358: {"internal_name": "ISPKM", "Name": "Pikeman"},
    753: {"internal_name": "EAGLEH", "Name": "Eagle Warrior"},
    546: {"internal_name": "LTCAV", "Name": "Light Cavalry"},
    38: {"internal_name": "KNGHT", "Name": "Knight"},
    329: {"internal_name": "CVLRY", "Name": "Camel"},
    1132: {"internal_name": "BATELE", "Name": "Battle Elephant"},
    529: {"internal_name": "FRGAL", "Name": "Fire Ship"},
    527: {"internal_name": "RMSHP", "Name": "Demolition Ship"},
    21: {"internal_name": "GALLY", "Name": "War Galley"},
    831: {"internal_name": "TURTL", "Name": "Turtle Ship"},
    250: {"internal_name": "LNGBT", "Name": "Longboat"},
    1004: {"internal_name": "CARAV", "Name": "Caravel"},
    125: {"internal_name": "MONKX", "Name": "Monk"},
    775: {"internal_name": "MONKY", "Name": "Missionary"},
    440: {"internal_name": "PETARD", "Name": "Petard"},
    42: {"internal_name": "TREBU", "Name": "Trebuchet"},
    280: {"internal_name": "MANGO", "Name": "Mangonel"},
    35: {"internal_name": "BTRAM", "Name": "Battering Ram"},
    279: {"internal_name": "SCBAL", "Name": "Scorpion"},
    492: {"internal_name": "ACOAR", "Name": "Arbalest"},
    1155: {"internal_name": "IHXBOW", "Name": "Imperial Skirmisher"},
    5: {"internal_name": "HCANR", "Name": "Hand Cannoneer"},
    474: {"internal_name": "HCVAR", "Name": "Heavy Cav Archer"},
    596: {"internal_name": "GENITX", "Name": "Elite Genitour"},
    473: {"internal_name": "HTHSW", "Name": "Two-Handed Swordsman"},
    567: {"internal_name": "HEROI", "Name": "Champion"},
    359: {"internal_name": "HLBDM", "Name": "Halberdier"},
    752: {"internal_name": "EAGLEX", "Name": "Elite Eagle Warrior"},
    882: {"internal_name": "CONDO", "Name": "Condottiero"},
    441: {"internal_name": "HUSSAR", "Name": "Hussar"},
    283: {"internal_name": "PALDN", "Name": "Cavalier"},
    569: {"internal_name": "HEROC", "Name": "Paladin"},
    330: {"internal_name": "HCLRY", "Name": "Heavy Camel"},
    207: {"internal_name": "SHCLRY", "Name": "Imperial Camel"},
    1134: {"internal_name": "EBATELE", "Name": "Elite Battle Elephant"},
    532: {"internal_name": "HFGAL", "Name": "Fast Fire Ship"},
    420: {"internal_name": "CANGA", "Name": "Cannon Galleon"},
    691: {"internal_name": "CNGAU", "Name": "Elite Cannon Galleon"},
    528: {"internal_name": "CRMSH", "Name": "Heavy Demo Ship"},
    442: {"internal_name": "WARGA", "Name": "Galleon"},
    832: {"internal_name": "UTURT", "Name": "Elite Turtle Ship"},
    533: {"internal_name": "ULNGB", "Name": "Elite Longboat"},
    1006: {"internal_name": "CARAV", "Name": "Elite Caravel"},
    550: {"internal_name": "ONAGR", "Name": "Onager"},
    588: {"internal_name": "SNAGR", "Name": "Siege Onager"},
    422: {"internal_name": "CBATR", "Name": "Capped Ram"},
    548: {"internal_name": "SGRAM", "Name": "Siege Ram"},
    542: {"internal_name": "HWBAL", "Name": "Heavy Scorpion"},
    36: {"internal_name": "BCANN", "Name": "Bombard Cannon"},
    725: {"internal_name": "JAGUAR", "Name": "Jaguar Warrior"},
    726: {"internal_name": "JAGUARX", "Name": "Elite Jaguar Warrior"},
    1007: {"internal_name": "CAMAR", "Name": "Camel Archer"},
    1009: {"internal_name": "ECAMAR", "Name": "Elite Camel Archer"},
    8: {"internal_name": "LNGBW", "Name": "Longbowman"},
    530: {"internal_name": "ULGBW", "Name": "Elite Longbowman"},
    1126: {"internal_name": "ARAMBAI", "Name": "Arambai"},
    1128: {"internal_name": "EARAMBAI", "Name": "Elite Arambai"},
    40: {"internal_name": "CATAP", "Name": "Cataphract"},
    553: {"internal_name": "UCATA", "Name": "Elite Cataphract"},
    232: {"internal_name": "WBRSK", "Name": "Woad Raider"},
    534: {"internal_name": "UWBRS", "Name": "Elite Woad Raider"},
    73: {"internal_name": "CHUKN", "Name": "Chu Ko Nu"},
    559: {"internal_name": "UCHUK", "Name": "Elite Chu Ko Nu"},
    1016: {"internal_name": "SHOTEL", "Name": "Shotel Warrior"},
    1018: {"internal_name": "ESHOTEL", "Name": "Elite Shotel Warrior"},
    281: {"internal_name": "TAXEM", "Name": "Throwing Axeman"},
    531: {"internal_name": "UTAXE", "Name": "Elite Throwing Axeman"},
    41: {"internal_name": "GBRSK", "Name": "Huskarl"},
    555: {"internal_name": "UGBRS", "Name": "Elite Huskarl"},
    755: {"internal_name": "TARKAN", "Name": "Tarkan"},
    757: {"internal_name": "UTARK", "Name": "Elite Tarkan"},
    879: {"internal_name": "KAMAY", "Name": "Kamayuk"},
    881: {"internal_name": "EKAMA", "Name": "Elite Kamayuk"},
    873: {"internal_name": "ELEAR", "Name": "Elephant Archer"},
    875: {"internal_name": "UELEA", "Name": "Elite Elephant Archer"},
    866: {"internal_name": "GENOE", "Name": "Genoese Crossbowman"},
    868: {"internal_name": "GENOE_E", "Name": "Elite Genoese Crossbowman"},
    291: {"internal_name": "SMURI", "Name": "Samurai"},
    560: {"internal_name": "USMUR", "Name": "Elite Samurai"},
    1120: {"internal_name": "ELEBALI", "Name": "Ballista Elephant"},
    1122: {"internal_name": "EELEBALI", "Name": "Elite Ballista Elephant"},
    827: {"internal_name": "WAGON", "Name": "War Wagon"},
    829: {"internal_name": "UWAGO", "Name": "Elite War Wagon"},
    869: {"internal_name": "UMAGYX", "Name": "Magyar Huszar"},
    871: {"internal_name": "UMAGYX", "Name": "Elite Magyar Huszar"},
    1123: {"internal_name": "KARAM", "Name": "Karambit Warrior"},
    1125: {"internal_name": "EKARAM", "Name": "Elite Karambit Warrior"},
    1013: {"internal_name": "GBETO", "Name": "Gbeto"},
    1015: {"internal_name": "EGBETO", "Name": "Elite Gbeto"},
    763: {"internal_name": "PLUME", "Name": "Plumed Archer"},
    765: {"internal_name": "UPLUM", "Name": "Elite Plumed Archer"},
    11: {"internal_name": "MOSUN", "Name": "Mangudai"},
    561: {"internal_name": "UMOSU", "Name": "Elite Mangudai"},
    239: {"internal_name": "MPCAV", "Name": "War Elephant"},
    558: {"internal_name": "UMPCAV", "Name": "Elite War Elephant"},
    1001: {"internal_name": "ORGAN", "Name": "Organ Gun"},
    1003: {"internal_name": "EORGAN", "Name": "Elite Organ Gun"},
    282: {"internal_name": "DERVI", "Name": "Mameluke"},
    556: {"internal_name": "UDERV", "Name": "Elite Mameluke"},
    876: {"internal_name": "BOYAR", "Name": "Boyar"},
    878: {"internal_name": "EBOYA", "Name": "Elite Boyar"},
    771: {"internal_name": "CONQI", "Name": "Conquistador"},
    773: {"internal_name": "UCONQ", "Name": "Elite Conquistador"},
    25: {"internal_name": "TKNIT", "Name": "Teutonic Knight"},
    554: {"internal_name": "UTKNI", "Name": "Elite Teutonic Knight"},
    46: {"internal_name": "JANNI", "Name": "Janissary"},
    557: {"internal_name": "UJANI", "Name": "Elite Janissary"},
    1129: {"internal_name": "RATAN", "Name": "Rattan Archer"},
    1131: {"internal_name": "ERATAN", "Name": "Elite Rattan Archer"},
    692: {"internal_name": "VBRSK", "Name": "Berserk"},
    694: {"internal_name": "UVBRK", "Name": "Elite Berserk"},
}

TECHS = {
    101: {"internal_name": "Middle Age", "Name": "Feudal Age"},
    22: {"internal_name": "Loom", "Name": "Loom"},
    90: {"internal_name": "Tracking", "Name": "Tracking"},
    435: {"internal_name": "Bloodlines", "Name": "Bloodlines"},
    8: {"internal_name": "Town Watch", "Name": "Town Watch"},
    102: {"internal_name": "Feudal Age", "Name": "Castle Age"},
    213: {"internal_name": "Wheel Barrow", "Name": "Wheelbarrow"},
    211: {"internal_name": "Padded Archer Armor", "Name": "Padded Archer Armor"},
    199: {"internal_name": "Fletching", "Name": "Fletching"},
    67: {"internal_name": "Forging", "Name": "Forging"},
    81: {"internal_name": "Scale Barding Armor", "Name": "Scale Barding Armor"},
    74: {"internal_name": "Scale Mail Armor", "Name": "Scale Mail Armor"},
    278: {"internal_name": "Stone Mining", "Name": "Stone Mining"},
    55: {"internal_name": "Gold Mining", "Name": "Gold Mining"},
    202: {"internal_name": "Double Bit Axe", "Name": "Double-Bit Axe"},
    19: {"internal_name": "Cartography", "Name": "Cartography"},
    23: {"internal_name": "Coinage", "Name": "Coinage"},
    14: {"internal_name": "Horse collar", "Name": "Horse Collar"},
    437: {"internal_name": "Thumb Ring", "Name": "Thumb Ring"},
    215: {"internal_name": "Squires", "Name": "Squires"},
    602: {"internal_name": "Arson", "Name": "Arson"},
    39: {"internal_name": "Husbandry", "Name": "Husbandry"},
    65: {"internal_name": "Gillnets", "Name": "Gillnets"},
    374: {"internal_name": "Careening", "Name": "Careening"},
    316: {"internal_name": "Redemption", "Name": "Redemption"},
    252: {"internal_name": "Fervor", "Name": "Fervor"},
    231: {"internal_name": "Sanctity", "Name": "Sanctity"},
    319: {"internal_name": "Atonement", "Name": "Atonement"},
    441: {"internal_name": "Herbal Medicine", "Name": "Herbal Medicine"},
    439: {"internal_name": "Heresy", "Name": "Heresy"},
    280: {"internal_name": "Town Patrol", "Name": "Town Patrol"},
    103: {"internal_name": "Imperial Age", "Name": "Imperial Age"},
    249: {"internal_name": "Hand Cart", "Name": "Hand Cart"},
    212: {"internal_name": "Leather Archer Armor", "Name": "Leather Archer Armor"},
    200: {"internal_name": "Bodkin Arrow", "Name": "Bodkin Arrow"},
    68: {"internal_name": "Iron casting", "Name": "Iron Casting"},
    82: {"internal_name": "Chain Barding Armor", "Name": "Chain Barding Armor"},
    76: {"internal_name": "Chain Mail Armor", "Name": "Chain Mail Armor"},
    50: {"internal_name": "Masonry", "Name": "Masonry"},
    194: {"internal_name": "Fortified Wall", "Name": "Fortified Wall"},
    93: {"internal_name": "Ballistics", "Name": "Ballistics"},
    140: {"internal_name": "Guard Tower", "Name": "Guard Tower"},
    380: {"internal_name": "Heated Shot", "Name": "Heated Shot"},
    322: {"internal_name": "Murder Holes", "Name": "Murder Holes"},
    54: {"internal_name": "Stone cutting", "Name": "Treadmill Crane"},
    279: {"internal_name": "Stone Shaft Mining", "Name": "Stone Shaft Mining"},
    182: {"internal_name": "Gold Shaft Mining", "Name": "Gold Shaft Mining"},
    203: {"internal_name": "Bow Saw", "Name": "Bow Saw"},
    48: {"internal_name": "Caravan", "Name": "Caravan"},
    17: {"internal_name": "Banking", "Name": "Banking"},
    13: {"internal_name": "Heavy plow", "Name": "Heavy Plow"},
    436: {"internal_name": "Parthian Tactics", "Name": "Parthian Tactics"},
    375: {"internal_name": "Dry Dock", "Name": "Dry Dock"},
    373: {"internal_name": "Shipwright", "Name": "Shipwright"},
    230: {"internal_name": "Block Printing", "Name": "Block Printing"},
    233: {"internal_name": "Illumination", "Name": "Illumination"},
    45: {"internal_name": "Faith", "Name": "Faith"},
    438: {"internal_name": "Theocracy", "Name": "Theocracy"},
    379: {"internal_name": "Hoardings", "Name": "Hoardings"},
    321: {"internal_name": "Sappers", "Name": "Sappers"},
    315: {"internal_name": "Conscription", "Name": "Conscription"},
    408: {"internal_name": "Spy Technology", "Name": "Spies/Treason"},
    219: {"internal_name": "Ring Archer Armor", "Name": "Ring Archer Armor"},
    201: {"internal_name": "Bracer", "Name": "Bracer"},
    75: {"internal_name": "Blast Furnace", "Name": "Blast Furnace"},
    80: {"internal_name": "Plate Barding Armor", "Name": "Plate Barding Armor"},
    77: {"internal_name": "Plate Mail Armor", "Name": "Plate Mail Armor"},
    51: {"internal_name": "Architecture", "Name": "Architecture"},
    47: {"internal_name": "Chemistry", "Name": "Chemistry"},
    64: {"internal_name": "Bombard Tower", "Name": "Bombard Tower"},
    377: {"internal_name": "Siege Engineers", "Name": "Siege Engineers"},
    63: {"internal_name": "Keep", "Name": "Keep"},
    608: {"internal_name": "Arrowslits", "Name": "Arrowslits"},
    221: {"internal_name": "Two Man Saw", "Name": "Two-Man Saw"},
    15: {"internal_name": "Guilds", "Name": "Guilds"},
    12: {"internal_name": "Crop rotation", "Name": "Crop Rotation"},
    460: {"internal_name": "Aztec Sacrifice", "Name": "Atlatl"},
    24: {"internal_name": "Aztec Garland Wars", "Name": "Garland Wars"},
    578: {"internal_name": "Berber UT", "Name": "Kasbah"},
    579: {"internal_name": "Berber UT", "Name": "Maghrabi Camels"},
    3: {"internal_name": "British Yeoman", "Name": "Yeomen"},
    461: {"internal_name": "Britons City Rights", "Name": "Warwolf"},
    626: {"internal_name": "Burmese UT", "Name": "Howdah"},
    627: {"internal_name": "Burmese UT", "Name": "Manipur Cavalry"},
    464: {"internal_name": "Byzantines Greek Fire", "Name": "Greek Fire"},
    61: {"internal_name": "Byzantine Logistica", "Name": "Logistica"},
    482: {"internal_name": "Stronghold", "Name": "Stronghold"},
    5: {"internal_name": "Celtic Furor Celtica", "Name": "Furor Celtica"},
    462: {"internal_name": "Chinese Great Wall", "Name": "Great Wall"},
    52: {"internal_name": "Chinese Rocketry", "Name": "Rocketry"},
    574: {"internal_name": "Ethiopian UT", "Name": "Royal Heirs"},
    575: {"internal_name": "Ethiopian UT", "Name": "Torsion Engines"},
    493: {"internal_name": "Franks UT", "Name": "Chivalry"},
    83: {"internal_name": "Frankish Bearded Axe", "Name": "Bearded Axe"},
    16: {"internal_name": "Gothic Anarchy", "Name": "Anarchy"},
    457: {"internal_name": "Gothic Perfusion", "Name": "Perfusion"},
    483: {"internal_name": "Huns UT", "Name": "Marauders"},
    21: {"internal_name": "Hun Atheism", "Name": "Atheism"},
    516: {"internal_name": "Incas UT", "Name": "Andean Sling"},
    517: {"internal_name": "Indians UT", "Name": "Couriers"},
    506: {"internal_name": "Indians UT", "Name": "Sultans"},
    507: {"internal_name": "Indians UT2", "Name": "Shatagni"},
    494: {"internal_name": "Pavise", "Name": "Pavise"},
    499: {"internal_name": "Silk Route", "Name": "Silk Road"},
    484: {"internal_name": "Japanese UT", "Name": "Yasama"},
    59: {"internal_name": "Japanese Kataparuto", "Name": "Kataparuto"},
    622: {"internal_name": "Khmer UT", "Name": "Tusk Swords"},
    623: {"internal_name": "Khmer UT", "Name": "Double Crossbow"},
    486: {"internal_name": "Koreans UT", "Name": "Panokseon"},
    445: {"internal_name": "Korean catapults", "Name": "Shinkichon"},
    514: {"internal_name": "Magyars UT", "Name": "Mercenaries"},
    515: {"internal_name": "Indians UT", "Name": "Recurve Bow"},
    624: {"internal_name": "Malay UT", "Name": "Thalassocracy"},
    625: {"internal_name": "Malay UT", "Name": "Forced Levy"},
    576: {"internal_name": "Malian UT", "Name": "Tigui"},
    577: {"internal_name": "Malian UT", "Name": "Farimba"},
    485: {"internal_name": "Mayans UT", "Name": "Obsidian Arrows"},
    4: {"internal_name": "Mayan El Dorado", "Name": "El Dorado"},
    487: {"internal_name": "Mongols UT", "Name": "Nomads"},
    6: {"internal_name": "Mongol Siege Drill", "Name": "Drill"},
    488: {"internal_name": "Persians UT", "Name": "Boiling Oil"},
    7: {"internal_name": "Persian Mahouts", "Name": "Mahouts"},
    572: {"internal_name": "Portuguese UT", "Name": "Carrack"},
    573: {"internal_name": "Portuguese UT", "Name": "Arquebus"},
    490: {"internal_name": "Saracens UT", "Name": "Madrasah"},
    9: {"internal_name": "Saracen Zealotry", "Name": "Zealotry"},
    512: {"internal_name": "Slavs UT", "Name": "Orthodoxy"},
    513: {"internal_name": "Slavs UT", "Name": "Druzhina"},
    492: {"internal_name": "Spanish UT", "Name": "Inquisition"},
    440: {"internal_name": "Spanish Supremacy", "Name": "Supremacy"},
    489: {"internal_name": "Teutons UT", "Name": "Ironclad"},
    11: {"internal_name": "Teuton Crenellations", "Name": "Crenellations"},
    491: {"internal_name": "Sipahi", "Name": "Sipahi"},
    10: {"internal_name": "Turkish Artillery", "Name": "Artillery"},
    628: {"internal_name": "Vietnamese UT", "Name": "Chatras"},
    629: {"internal_name": "Vietnamese UT", "Name": "Paper Money"},
    463: {"internal_name": "Viking Chieftains", "Name": "Chieftains"},
    49: {"internal_name": "Viking Berserkergang", "Name": "Berserkergang"},
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


def main():
    if len(sys.argv) < 2 or not os.path.isfile(sys.argv[1]):
        print("Usage: {} <full.json>".format(sys.argv[0]))
        print("Get full.json from github.com/HSZemi/aoe2dat")
        sys.exit()

    with open(sys.argv[1], "r") as f:
        content = json.load(f)

        buildings = []
        units = []
        techs = []

        civs = content["Civs"]
        gaia = civs[0]

        building_set = set()
        unit_set = set()
        tech_set = set()
        for key in BUILDINGS:
            building_set.add(key)
        for key in UNITS:
            unit_set.add(key)
        for key in TECHS:
            tech_set.add(key)

        for unit in gaia["Units"]:
            for key, value in BUILDINGS.items():
                if unit["ID"] == key and unit["Name"] == value['internal_name']:
                    buildings.append({
                        'internal_name': value['internal_name'],
                        'Name': value['Name'],
                        'ID': key,
                        'HP': unit["HitPoints"],
                        'Cost': get_unit_cost(unit),
                        'Attack': unit["Type50"]["DisplayedAttack"],
                        'Range': unit["Type50"]["DisplayedRange"],
                        'MeleeArmor': unit["Type50"]["DisplayedMeleeArmour"],
                        'PierceArmor': unit["Creatable"]["DisplayedPierceArmour"],
                        'GarrisonCapacity': unit["GarrisonCapacity"],
                    })
                    building_set.remove(key)
            for key, value in UNITS.items():
                if unit["ID"] == key and unit["Name"] == value['internal_name']:
                    units.append({
                        'internal_name': value['internal_name'],
                        'Name': value['Name'],
                        'ID': key,
                        'HP': unit["HitPoints"],
                        'Cost': get_unit_cost(unit),
                        'Attack': unit["Type50"]["DisplayedAttack"],
                        'Range': unit["Type50"]["DisplayedRange"],
                        'MeleeArmor': unit["Type50"]["DisplayedMeleeArmour"],
                        'PierceArmor': unit["Creatable"]["DisplayedPierceArmour"],
                        'GarrisonCapacity': unit["GarrisonCapacity"],
                    })
                    unit_set.remove(key)
        tech_id = 0
        for tech in content["Techs"]:
            for key, value in TECHS.items():
                if tech_id == key and tech["Name"] == value['internal_name']:
                    techs.append({
                        'internal_name': value['internal_name'],
                        'Name': value['Name'],
                        'ID': key,
                        'Cost': get_cost(tech),
                    })
                    tech_set.remove(key)
            tech_id += 1

        data = {"buildings": {}, "units": {}, "techs": {}}
        for b in buildings:
            data["buildings"][b["Name"]] = b
        for u in units:
            data["units"][u["Name"]] = u
        for t in techs:
            data["techs"][t["Name"]] = t

        print(json.dumps(data, indent="\t"))


if __name__ == "__main__":
    main()
