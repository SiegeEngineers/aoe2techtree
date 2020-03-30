#! /usr/bin/env python3

import argparse
import json
import re
from pathlib import Path

CIVS = {
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
    "Tatars": "120182"
}

BUILDINGS = {
    12: {"internal_name": "Barracks Age1", "Name": "Barracks"},
    45: {"internal_name": "DOCK", "Name": "Dock"},
    49: {"internal_name": "SIWS", "Name": "Siege Workshop"},
    50: {"internal_name": "FARM", "Name": "Farm"},
    64: {"internal_name": "GTAA2", "Name": "Gate"},
    68: {"internal_name": "MILL", "Name": "Mill"},
    70: {"internal_name": "HOUS", "Name": "House"},
    71: {"internal_name": "RTWC2", "Name": "Town Center"},
    72: {"internal_name": "WALL", "Name": "Palisade Wall"},
    79: {"internal_name": "WCTW", "Name": "Watch Tower"},
    82: {"internal_name": "CSTL", "Name": "Castle"},
    84: {"internal_name": "MRKT", "Name": "Market"},
    87: {"internal_name": "ARRG", "Name": "Archery Range"},
    101: {"internal_name": "STBL", "Name": "Stable"},
    103: {"internal_name": "BLAC", "Name": "Blacksmith"},
    104: {"internal_name": "CRCH", "Name": "Monastery"},
    109: {"internal_name": "RTWC", "Name": "Town Center"},
    117: {"internal_name": "WALL2", "Name": "Stone Wall"},
    155: {"internal_name": "WALL3", "Name": "Fortified Wall"},
    199: {"internal_name": "FTRAP", "Name": "Fish Trap"},
    209: {"internal_name": "UNIV", "Name": "University"},
    234: {"internal_name": "WCTW2", "Name": "Guard Tower"},
    235: {"internal_name": "WCTW3", "Name": "Keep"},
    236: {"internal_name": "WCTW4", "Name": "Bombard Tower"},
    276: {"internal_name": "WNDR", "Name": "Wonder"},
    562: {"internal_name": "SMIL", "Name": "Lumber Camp"},
    584: {"internal_name": "MINE", "Name": "Mining Camp"},
    598: {"internal_name": "WCTWX", "Name": "Outpost"},
    789: {"internal_name": "PGTAA", "Name": "Palisade Gate"},
    1021: {"internal_name": "FEITO", "Name": "Feitoria"},
    1251: {"internal_name": "KREPOST", "Name": "Krepost"},
}

UNITS = {
    4: {"internal_name": "ARCHR", "Name": "Archer"},
    5: {"internal_name": "HCANR", "Name": "Hand Cannoneer"},
    6: {"internal_name": "HXBOW", "Name": "Elite Skirmisher"},
    7: {"internal_name": "XBOWM", "Name": "Skirmisher"},
    8: {"internal_name": "LNGBW", "Name": "Longbowman"},
    11: {"internal_name": "MOSUN", "Name": "Mangudai"},
    13: {"internal_name": "FSHSP", "Name": "Fishing Ship"},
    17: {"internal_name": "COGXX", "Name": "Trade Cog"},
    21: {"internal_name": "GALLY", "Name": "War Galley"},
    24: {"internal_name": "CARCH", "Name": "Crossbowman"},
    25: {"internal_name": "TKNIT", "Name": "Teutonic Knight"},
    35: {"internal_name": "BTRAM", "Name": "Battering Ram"},
    36: {"internal_name": "BCANN", "Name": "Bombard Cannon"},
    38: {"internal_name": "KNGHT", "Name": "Knight"},
    39: {"internal_name": "CVRCH", "Name": "Cavalry Archer"},
    40: {"internal_name": "CATAP", "Name": "Cataphract"},
    41: {"internal_name": "GBRSK", "Name": "Huskarl"},
    42: {"internal_name": "TREBU", "Name": "Trebuchet"},
    46: {"internal_name": "JANNI", "Name": "Janissary"},
    73: {"internal_name": "CHUKN", "Name": "Chu Ko Nu"},
    74: {"internal_name": "SPRMN", "Name": "Militia"},
    75: {"internal_name": "SWDMN", "Name": "Man-at-Arms"},
    77: {"internal_name": "THSWD", "Name": "Long Swordsman"},
    83: {"internal_name": "VMBAS", "Name": "Villager"},
    93: {"internal_name": "PKEMN", "Name": "Spearman"},
    125: {"internal_name": "MONKX", "Name": "Monk"},
    128: {"internal_name": "TCART", "Name": "Trade Cart"},
    185: {"internal_name": "SLINGR", "Name": "Slinger"},
    207: {"internal_name": "SHCLRY", "Name": "Imperial Camel Rider"},
    232: {"internal_name": "WBRSK", "Name": "Woad Raider"},
    239: {"internal_name": "MPCAV", "Name": "War Elephant"},
    250: {"internal_name": "LNGBT", "Name": "Longboat"},
    279: {"internal_name": "SCBAL", "Name": "Scorpion"},
    280: {"internal_name": "MANGO", "Name": "Mangonel"},
    281: {"internal_name": "TAXEM", "Name": "Throwing Axeman"},
    282: {"internal_name": "DERVI", "Name": "Mameluke"},
    283: {"internal_name": "PALDN", "Name": "Cavalier"},
    291: {"internal_name": "SMURI", "Name": "Samurai"},
    329: {"internal_name": "CVLRY", "Name": "Camel Rider"},
    330: {"internal_name": "HCLRY", "Name": "Heavy Camel Rider"},
    358: {"internal_name": "ISPKM", "Name": "Pikeman"},
    359: {"internal_name": "HLBDM", "Name": "Halberdier"},
    420: {"internal_name": "CANGA", "Name": "Cannon Galleon"},
    422: {"internal_name": "CBATR", "Name": "Capped Ram"},
    440: {"internal_name": "PETARD", "Name": "Petard"},
    441: {"internal_name": "HUSSAR", "Name": "Hussar"},
    442: {"internal_name": "WARGA", "Name": "Galleon"},
    448: {"internal_name": "SCOUT", "Name": "Scout Cavalry"},
    473: {"internal_name": "HTHSW", "Name": "Two-Handed Swordsman"},
    474: {"internal_name": "HCVAR", "Name": "Heavy Cav Archer"},
    492: {"internal_name": "ACOAR", "Name": "Arbalester"},
    527: {"internal_name": "RMSHP", "Name": "Demolition Ship"},
    528: {"internal_name": "CRMSH", "Name": "Heavy Demo Ship"},
    529: {"internal_name": "FRGAL", "Name": "Fire Ship"},
    530: {"internal_name": "ULGBW", "Name": "Elite Longbowman"},
    531: {"internal_name": "UTAXE", "Name": "Elite Throwing Axeman"},
    532: {"internal_name": "HFGAL", "Name": "Fast Fire Ship"},
    533: {"internal_name": "ULNGB", "Name": "Elite Longboat"},
    534: {"internal_name": "UWBRS", "Name": "Elite Woad Raider"},
    539: {"internal_name": "SGALY", "Name": "Galley"},
    542: {"internal_name": "HWBAL", "Name": "Heavy Scorpion"},
    545: {"internal_name": "XPORT", "Name": "Transport Ship"},
    546: {"internal_name": "LTCAV", "Name": "Light Cavalry"},
    548: {"internal_name": "SGRAM", "Name": "Siege Ram"},
    550: {"internal_name": "ONAGR", "Name": "Onager"},
    553: {"internal_name": "UCATA", "Name": "Elite Cataphract"},
    554: {"internal_name": "UTKNI", "Name": "Elite Teutonic Knight"},
    555: {"internal_name": "UGBRS", "Name": "Elite Huskarl"},
    556: {"internal_name": "UDERV", "Name": "Elite Mameluke"},
    557: {"internal_name": "UJANI", "Name": "Elite Janissary"},
    558: {"internal_name": "UMPCAV", "Name": "Elite War Elephant"},
    559: {"internal_name": "UCHUK", "Name": "Elite Chu Ko Nu"},
    560: {"internal_name": "USMUR", "Name": "Elite Samurai"},
    561: {"internal_name": "UMOSU", "Name": "Elite Mangudai"},
    567: {"internal_name": "HEROI", "Name": "Champion"},
    569: {"internal_name": "HEROC", "Name": "Paladin"},
    588: {"internal_name": "SNAGR", "Name": "Siege Onager"},
    691: {"internal_name": "CNGAU", "Name": "Elite Cannon Galleon"},
    692: {"internal_name": "VBRSK", "Name": "Berserk"},
    694: {"internal_name": "UVBRK", "Name": "Elite Berserk"},
    725: {"internal_name": "JAGUAR", "Name": "Jaguar Warrior"},
    726: {"internal_name": "JAGUARX", "Name": "Elite Jaguar Warrior"},
    751: {"internal_name": "EAGLE", "Name": "Eagle Scout"},
    752: {"internal_name": "EAGLEX", "Name": "Elite Eagle Warrior"},
    753: {"internal_name": "EAGLEH", "Name": "Eagle Warrior"},
    755: {"internal_name": "TARKAN", "Name": "Tarkan"},
    757: {"internal_name": "UTARK", "Name": "Elite Tarkan"},
    763: {"internal_name": "PLUME", "Name": "Plumed Archer"},
    765: {"internal_name": "UPLUM", "Name": "Elite Plumed Archer"},
    771: {"internal_name": "CONQI", "Name": "Conquistador"},
    773: {"internal_name": "UCONQ", "Name": "Elite Conquistador"},
    775: {"internal_name": "MONKY", "Name": "Missionary"},
    827: {"internal_name": "WAGON", "Name": "War Wagon"},
    829: {"internal_name": "UWAGO", "Name": "Elite War Wagon"},
    831: {"internal_name": "TURTL", "Name": "Turtle Ship"},
    832: {"internal_name": "UTURT", "Name": "Elite Turtle Ship"},
    866: {"internal_name": "GENOE", "Name": "Genoese Crossbowman"},
    868: {"internal_name": "GENOE_E", "Name": "Elite Genoese Crossbowman"},
    869: {"internal_name": "UMAGYX", "Name": "Magyar Huszar"},
    871: {"internal_name": "UMAGYX", "Name": "Elite Magyar Huszar"},
    873: {"internal_name": "ELEAR", "Name": "Elephant Archer"},
    875: {"internal_name": "UELEA", "Name": "Elite Elephant Archer"},
    876: {"internal_name": "BOYAR", "Name": "Boyar"},
    878: {"internal_name": "EBOYA", "Name": "Elite Boyar"},
    879: {"internal_name": "KAMAY", "Name": "Kamayuk"},
    881: {"internal_name": "EKAMA", "Name": "Elite Kamayuk"},
    882: {"internal_name": "CONDO", "Name": "Condottiero"},
    1001: {"internal_name": "ORGAN", "Name": "Organ Gun"},
    1003: {"internal_name": "EORGAN", "Name": "Elite Organ Gun"},
    1004: {"internal_name": "CARAV", "Name": "Caravel"},
    1006: {"internal_name": "CARAV", "Name": "Elite Caravel"},
    1007: {"internal_name": "CAMAR", "Name": "Camel Archer"},
    1009: {"internal_name": "ECAMAR", "Name": "Elite Camel Archer"},
    1010: {"internal_name": "GENITO", "Name": "Genitour"},
    1012: {"internal_name": "EGENITO", "Name": "Elite Genitour"},
    1013: {"internal_name": "GBETO", "Name": "Gbeto"},
    1015: {"internal_name": "EGBETO", "Name": "Elite Gbeto"},
    1016: {"internal_name": "SHOTEL", "Name": "Shotel Warrior"},
    1018: {"internal_name": "ESHOTEL", "Name": "Elite Shotel Warrior"},
    1103: {"internal_name": "SFRGAL", "Name": "Fire Galley"},
    1104: {"internal_name": "SDGAL", "Name": "Demolition Raft"},
    1105: {"internal_name": "SIEGTWR", "Name": "Siege Tower"},
    1120: {"internal_name": "ELEBALI", "Name": "Ballista Elephant"},
    1122: {"internal_name": "EELEBALI", "Name": "Elite Ballista Elephant"},
    1123: {"internal_name": "KARAM", "Name": "Karambit Warrior"},
    1125: {"internal_name": "EKARAM", "Name": "Elite Karambit Warrior"},
    1126: {"internal_name": "ARAMBAI", "Name": "Arambai"},
    1128: {"internal_name": "EARAMBAI", "Name": "Elite Arambai"},
    1129: {"internal_name": "RATAN", "Name": "Rattan Archer"},
    1131: {"internal_name": "ERATAN", "Name": "Elite Rattan Archer"},
    1132: {"internal_name": "BATELE", "Name": "Battle Elephant"},
    1134: {"internal_name": "EBATELE", "Name": "Elite Battle Elephant"},
    1155: {"internal_name": "IHXBOW", "Name": "Imperial Skirmisher"},
    1228: {"internal_name": "KESHIK", "Name": "Keshik"},
    1230: {"internal_name": "EKESHIK", "Name": "Elite Keshik"},
    1231: {"internal_name": "KIPCHAK", "Name": "Kipchak"},
    1233: {"internal_name": "EKIPCHAK", "Name": "Elite Kipchak"},
    1234: {"internal_name": "LEITIS", "Name": "Leitis"},
    1236: {"internal_name": "ELEITIS", "Name": "Elite Leitis"},
    1254: {"internal_name": "KONNIK", "Name": "Konnik"},
    1255: {"internal_name": "EKONNIK", "Name": "Elite Konnik"},
    1370: {"internal_name": "SLANCER", "Name": "Steppe Lancer"},
    1372: {"internal_name": "ESLANCER", "Name": "Elite Steppe Lancer"},
}

TECHS = {
    3: {"internal_name": "British Yeoman", "Name": "Yeomen"},
    4: {"internal_name": "Mayan El Dorado", "Name": "El Dorado"},
    5: {"internal_name": "Celtic Furor Celtica", "Name": "Furor Celtica"},
    6: {"internal_name": "Mongol Siege Drill", "Name": "Drill"},
    7: {"internal_name": "Persian Mahouts", "Name": "Mahouts"},
    8: {"internal_name": "Town Watch", "Name": "Town Watch"},
    9: {"internal_name": "Saracen Zealotry", "Name": "Zealotry"},
    10: {"internal_name": "Turkish Artillery", "Name": "Artillery"},
    11: {"internal_name": "Teuton Crenellations", "Name": "Crenellations"},
    12: {"internal_name": "Crop rotation", "Name": "Crop Rotation"},
    13: {"internal_name": "Heavy plow", "Name": "Heavy Plow"},
    14: {"internal_name": "Horse collar", "Name": "Horse Collar"},
    15: {"internal_name": "Guilds", "Name": "Guilds"},
    16: {"internal_name": "Gothic Anarchy", "Name": "Anarchy"},
    17: {"internal_name": "Banking", "Name": "Banking"},
    19: {"internal_name": "Cartography", "Name": "Cartography"},
    21: {"internal_name": "Hun Atheism", "Name": "Atheism"},
    22: {"internal_name": "Loom", "Name": "Loom"},
    23: {"internal_name": "Coinage", "Name": "Coinage"},
    24: {"internal_name": "Aztec Garland Wars", "Name": "Garland Wars"},
    39: {"internal_name": "Husbandry", "Name": "Husbandry"},
    45: {"internal_name": "Faith", "Name": "Faith"},
    47: {"internal_name": "Chemistry", "Name": "Chemistry"},
    48: {"internal_name": "Caravan", "Name": "Caravan"},
    49: {"internal_name": "Viking Berserkergang", "Name": "Berserkergang"},
    50: {"internal_name": "Masonry", "Name": "Masonry"},
    51: {"internal_name": "Architecture", "Name": "Architecture"},
    52: {"internal_name": "Chinese Rocketry", "Name": "Rocketry"},
    54: {"internal_name": "Stone cutting", "Name": "Treadmill Crane"},
    55: {"internal_name": "Gold Mining", "Name": "Gold Mining"},
    59: {"internal_name": "Japanese Kataparuto", "Name": "Kataparuto"},
    61: {"internal_name": "Byzantine Logistica", "Name": "Logistica"},
    63: {"internal_name": "Keep", "Name": "Keep"},
    64: {"internal_name": "Bombard Tower", "Name": "Bombard Tower"},
    65: {"internal_name": "Gillnets", "Name": "Gillnets"},
    67: {"internal_name": "Forging", "Name": "Forging"},
    68: {"internal_name": "Iron casting", "Name": "Iron Casting"},
    74: {"internal_name": "Scale Mail Armor", "Name": "Scale Mail Armor"},
    75: {"internal_name": "Blast Furnace", "Name": "Blast Furnace"},
    76: {"internal_name": "Chain Mail Armor", "Name": "Chain Mail Armor"},
    77: {"internal_name": "Plate Mail Armor", "Name": "Plate Mail Armor"},
    80: {"internal_name": "Plate Barding Armor", "Name": "Plate Barding Armor"},
    81: {"internal_name": "Scale Barding Armor", "Name": "Scale Barding Armor"},
    82: {"internal_name": "Chain Barding Armor", "Name": "Chain Barding Armor"},
    83: {"internal_name": "Frankish Bearded Axe", "Name": "Bearded Axe"},
    90: {"internal_name": "Tracking", "Name": "Tracking"},
    93: {"internal_name": "Ballistics", "Name": "Ballistics"},
    101: {"internal_name": "Middle Age", "Name": "Feudal Age"},
    102: {"internal_name": "Feudal Age", "Name": "Castle Age"},
    103: {"internal_name": "Imperial Age", "Name": "Imperial Age"},
    140: {"internal_name": "Guard Tower", "Name": "Guard Tower"},
    182: {"internal_name": "Gold Shaft Mining", "Name": "Gold Shaft Mining"},
    194: {"internal_name": "Fortified Wall", "Name": "Fortified Wall"},
    199: {"internal_name": "Fletching", "Name": "Fletching"},
    200: {"internal_name": "Bodkin Arrow", "Name": "Bodkin Arrow"},
    201: {"internal_name": "Bracer", "Name": "Bracer"},
    202: {"internal_name": "Double Bit Axe", "Name": "Double-Bit Axe"},
    203: {"internal_name": "Bow Saw", "Name": "Bow Saw"},
    211: {"internal_name": "Padded Archer Armor", "Name": "Padded Archer Armor"},
    212: {"internal_name": "Leather Archer Armor", "Name": "Leather Archer Armor"},
    213: {"internal_name": "Wheel Barrow", "Name": "Wheelbarrow"},
    215: {"internal_name": "Squires", "Name": "Squires"},
    219: {"internal_name": "Ring Archer Armor", "Name": "Ring Archer Armor"},
    221: {"internal_name": "Two Man Saw", "Name": "Two-Man Saw"},
    230: {"internal_name": "Block Printing", "Name": "Block Printing"},
    231: {"internal_name": "Sanctity", "Name": "Sanctity"},
    233: {"internal_name": "Illumination", "Name": "Illumination"},
    249: {"internal_name": "Hand Cart", "Name": "Hand Cart"},
    252: {"internal_name": "Fervor", "Name": "Fervor"},
    278: {"internal_name": "Stone Mining", "Name": "Stone Mining"},
    279: {"internal_name": "Stone Shaft Mining", "Name": "Stone Shaft Mining"},
    280: {"internal_name": "Town Patrol", "Name": "Town Patrol"},
    315: {"internal_name": "Conscription", "Name": "Conscription"},
    316: {"internal_name": "Redemption", "Name": "Redemption"},
    319: {"internal_name": "Atonement", "Name": "Atonement"},
    321: {"internal_name": "Sappers", "Name": "Sappers"},
    322: {"internal_name": "Murder Holes", "Name": "Murder Holes"},
    373: {"internal_name": "Shipwright", "Name": "Shipwright"},
    374: {"internal_name": "Careening", "Name": "Careening"},
    375: {"internal_name": "Dry Dock", "Name": "Dry Dock"},
    377: {"internal_name": "Siege Engineers", "Name": "Siege Engineers"},
    379: {"internal_name": "Hoardings", "Name": "Hoardings"},
    380: {"internal_name": "Heated Shot", "Name": "Heated Shot"},
    408: {"internal_name": "Spy Technology", "Name": "Spies/Treason"},
    435: {"internal_name": "Bloodlines", "Name": "Bloodlines"},
    436: {"internal_name": "Parthian Tactics", "Name": "Parthian Tactics"},
    437: {"internal_name": "Thumb Ring", "Name": "Thumb Ring"},
    438: {"internal_name": "Theocracy", "Name": "Theocracy"},
    439: {"internal_name": "Heresy", "Name": "Heresy"},
    440: {"internal_name": "Spanish Supremacy", "Name": "Supremacy"},
    441: {"internal_name": "Herbal Medicine", "Name": "Herbal Medicine"},
    445: {"internal_name": "Korean catapults", "Name": "Shinkichon"},
    457: {"internal_name": "Gothic Perfusion", "Name": "Perfusion"},
    460: {"internal_name": "Aztec Sacrifice", "Name": "Atlatl"},
    461: {"internal_name": "Britons City Rights", "Name": "Warwolf"},
    462: {"internal_name": "Chinese Great Wall", "Name": "Great Wall"},
    463: {"internal_name": "Viking Chieftains", "Name": "Chieftains"},
    464: {"internal_name": "Byzantines Greek Fire", "Name": "Greek Fire"},
    482: {"internal_name": "Stronghold", "Name": "Stronghold"},
    483: {"internal_name": "Huns UT", "Name": "Marauders"},
    484: {"internal_name": "Japanese UT", "Name": "Yasama"},
    485: {"internal_name": "Mayans UT", "Name": "Obsidian Arrows"},
    486: {"internal_name": "Koreans UT", "Name": "Panokseon"},
    487: {"internal_name": "Mongols UT", "Name": "Nomads"},
    488: {"internal_name": "Persians UT", "Name": "Kamandaran"},
    489: {"internal_name": "Teutons UT", "Name": "Ironclad"},
    490: {"internal_name": "Saracens UT", "Name": "Madrasah"},
    491: {"internal_name": "Sipahi", "Name": "Sipahi"},
    492: {"internal_name": "Spanish UT", "Name": "Inquisition"},
    493: {"internal_name": "Franks UT", "Name": "Chivalry"},
    494: {"internal_name": "Pavise", "Name": "Pavise"},
    499: {"internal_name": "Silk Route", "Name": "Silk Road"},
    506: {"internal_name": "Indians UT", "Name": "Sultans"},
    507: {"internal_name": "Indians UT2", "Name": "Shatagni"},
    512: {"internal_name": "Slavs UT", "Name": "Orthodoxy"},
    513: {"internal_name": "Slavs UT", "Name": "Druzhina"},
    514: {"internal_name": "Magyars UT", "Name": "Corvinian Army"},
    515: {"internal_name": "Indians UT", "Name": "Recurve Bow"},
    516: {"internal_name": "Incas UT", "Name": "Andean Sling"},
    517: {"internal_name": "Indians UT", "Name": "Couriers"},
    572: {"internal_name": "Portuguese UT", "Name": "Carrack"},
    573: {"internal_name": "Portuguese UT", "Name": "Arquebus"},
    574: {"internal_name": "Ethiopian UT", "Name": "Royal Heirs"},
    575: {"internal_name": "Ethiopian UT", "Name": "Torsion Engines"},
    576: {"internal_name": "Malian UT", "Name": "Tigui"},
    577: {"internal_name": "Malian UT", "Name": "Farimba"},
    578: {"internal_name": "Berber UT", "Name": "Kasbah"},
    579: {"internal_name": "Berber UT", "Name": "Maghrabi Camels"},
    602: {"internal_name": "Arson", "Name": "Arson"},
    608: {"internal_name": "Arrowslits", "Name": "Arrowslits"},
    622: {"internal_name": "Khmer UT", "Name": "Tusk Swords"},
    623: {"internal_name": "Khmer UT", "Name": "Double Crossbow"},
    624: {"internal_name": "Malay UT", "Name": "Thalassocracy"},
    625: {"internal_name": "Malay UT", "Name": "Forced Levy"},
    626: {"internal_name": "Burmese UT", "Name": "Howdah"},
    627: {"internal_name": "Burmese UT", "Name": "Manipur Cavalry"},
    628: {"internal_name": "Vietnamese UT", "Name": "Chatras"},
    629: {"internal_name": "Vietnamese UT", "Name": "Paper Money"},
    685: {"internal_name": "Khmer UT", "Name": "Stirrups"},
    686: {"internal_name": "Khmer UT", "Name": "Bagains"},
    687: {"internal_name": "Malay UT", "Name": "Silk Armor"},
    688: {"internal_name": "Malay UT", "Name": "Timurid Siegecraft"},
    689: {"internal_name": "Burmese UT", "Name": "Steppe Husbandry"},
    690: {"internal_name": "Burmese UT", "Name": "Cuman Mercenaries"},
    691: {"internal_name": "Vietnamese UT", "Name": "Hill Forts"},
    692: {"internal_name": "Vietnamese UT", "Name": "Tower Shields"},
    716: {"internal_name": "Tracking", "Name": "Supplies"},
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
    parser = argparse.ArgumentParser(description='Generate data files for aoe2techtree')
    parser.add_argument('datafile', help='A full.json file generated by aoe2dat')
    parser.add_argument('resourcesdir', help='The resources folder of an aoe2de installation, usually '
                                             'C:/Program Files (x86)/Steam/steamapps/common/AoE2DE/resources/')

    args = parser.parse_args()

    datafile = Path(args.datafile)
    content = json.loads(datafile.read_text())

    data = gather_data(content)

    resourcesdir = Path(args.resourcesdir)
    key_value_filtered, name_key = gather_language_data(resourcesdir, 'en')

    print(json.dumps({"civs": CIVS, "key_value": key_value_filtered, "name_key": name_key, "meta": data}, indent=4,
                     sort_keys=True))


def gather_language_data(resourcesdir, language):
    key_value_strings_file_en = resourcesdir / language / 'strings' / 'key-value' / 'key-value-strings-utf8.txt'
    key_value = {}
    name_key = {"buildings": {}, "units": {}, "techs": {"Spies/Treason": "28408", "Cartography": "28019"}}
    with key_value_strings_file_en.open() as f:
        for line in f:
            parse_line(key_value, line, name_key)
        name_key["units"]["Heavy Cav Archer"] = name_key["units"]["Heavy Cavalry Archer"]
        name_key["units"]["Heavy Demo Ship"] = name_key["units"]["Heavy Demolition Ship"]
        name_key["techs"]["Double Crossbow"] = name_key["techs"]["Double Crossbows"]
    key_value_filtered = {}
    for lv1 in name_key:
        for lv2 in name_key[lv1]:
            key = int(name_key[lv1][lv2])
            key_value_filtered[key] = key_value[key]
    for name in CIVS:
        key = int(CIVS[name])
        key_value_filtered[key] = key_value[key]
    return key_value_filtered, name_key


def parse_line(key_value, line, name_key):
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
    check_upgrade(line, name_key)
    check_research(line, name_key)
    check_unit(line, name_key)
    check_buildings_and_ships(line, name_key)
    check_ages(line, name_key)


def check_upgrade(line, name_key):
    xmatch = re.search('(?P<number>\d+) "Upgrade to (?P<text>.+) \(<cost>\)', line)
    if (xmatch):
        text = xmatch.group('text')
        text = re.sub(r'<b>(.+?)<b>', r'\1', text)
        text = text.strip()
        name_key["techs"][text] = xmatch.group('number')


def check_research(line, name_key):
    rmatch = re.search('(?P<number>\d+) "Research (?P<text>.+) \(<cost>\)', line)
    if (rmatch):
        text = rmatch.group('text')
        text = re.sub(r'<b>(.+?)<b>', r'\1', text)
        text = text.strip()
        name_key["techs"][text] = rmatch.group('number')


def check_unit(line, name_key):
    umatch = re.search('(?P<number>\d+) "Create (?P<text>.+) \(<cost>\)', line)
    if (umatch):
        text = umatch.group('text')
        text = re.sub(r'<b>(.+?)<b>', r'\1', text)
        text = text.strip()
        name_key["units"][text] = umatch.group('number')


def check_buildings_and_ships(line, name_key):
    bmatch = re.search('(?P<number>\d+) "Build (?P<text>.+) \(<cost>\)', line)
    if (bmatch):
        text = bmatch.group('text')
        text = re.sub(r'<b>(.+?)<b>', r'\1', text)
        text = text.strip()
        name_key["buildings"][text] = bmatch.group('number')
        name_key["units"][text] = bmatch.group('number')  # ships are 'built', not 'created' :-(


def check_ages(line, name_key):
    amatch = re.search('(?P<number>\d+) "Advance to (?P<text>.+) \(<cost>', line)
    if (amatch):
        text = amatch.group('text')
        text = re.sub(r'<b>(.+?)<b>', r'\1', text)
        text = text.strip()
        name_key["techs"][text] = amatch.group('number')


def gather_data(content):
    civs = content["Civs"]
    gaia = civs[0]
    data = {"buildings": {}, "units": {}, "techs": {}}
    for unit in gaia["Units"]:
        for key, value in BUILDINGS.items():
            if unit_matches_building(unit, key, value):
                add_building(key, value, unit, data)
        for key, value in UNITS.items():
            if unit_matches_unit(unit, key, value):
                add_unit(key, value, unit, data)
    tech_id = 0
    for tech in content["Techs"]:
        for key, value in TECHS.items():
            if tech_matches(tech_id, tech, key, value):
                add_tech(key, value, tech, data)
        tech_id += 1
    return data


def unit_matches_building(gaia_unit, building_id, building):
    return gaia_unit["ID"] == building_id and gaia_unit["Name"] == building['internal_name']


def unit_matches_unit(gaia_unit, unit_id, unit):
    return gaia_unit["ID"] == unit_id and gaia_unit["Name"] == unit['internal_name']


def tech_matches(tech_id, tech, key, value):
    return tech_id == key and tech["Name"] == value['internal_name']


def add_building(building_id, value, unit, data):
    data['buildings'][value['Name']] = {
        'internal_name': value['internal_name'],
        'Name': value['Name'],
        'ID': building_id,
        'HP': unit["HitPoints"],
        'Cost': get_unit_cost(unit),
        'Attack': unit["Type50"]["DisplayedAttack"],
        'Range': unit["Type50"]["DisplayedRange"],
        'MeleeArmor': unit["Type50"]["DisplayedMeleeArmour"],
        'PierceArmor': unit["Creatable"]["DisplayedPierceArmour"],
        'GarrisonCapacity': unit["GarrisonCapacity"],
        'LineOfSight': unit["LineOfSight"],
        'TrainTime': unit["Creatable"]["TrainTime"],
    }


def add_unit(key, value, unit, data):
    data['units'][value['Name']] = {
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
        'LineOfSight': unit["LineOfSight"],
        'Speed': unit["Speed"],
        'Attacks': unit["Type50"]["Attacks"],
        'Armours': unit["Type50"]["Armours"],
        'ReloadTime': unit["Type50"]["ReloadTime"],
        'AccuracyPercent': unit["Type50"]["AccuracyPercent"],
        'FrameDelay': unit["Type50"]["FrameDelay"],
        'MinRange': unit["Type50"]["MinRange"],
        'TrainTime': unit["Creatable"]["TrainTime"],
    }


def add_tech(key, value, tech, data):
    data['techs'][value['Name']] = {
        'internal_name': value['internal_name'],
        'Name': value['Name'],
        'ResearchTime': tech['ResearchTime'],
        'ID': key,
        'Cost': get_cost(tech),
    }


if __name__ == '__main__':
    main()
