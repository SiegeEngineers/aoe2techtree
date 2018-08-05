#! /usr/bin/env python3

import sys
import os
import re
import json


def main():
    if len(sys.argv) < 2 or not os.path.isfile(sys.argv[1]):
        print("Usage: {} <path to key-value-(modded-)strings-utf8.txt> <meta.json>".format(sys.argv[0]))
        sys.exit()
    civs = {"Britons": "120150",
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
            "Vietnamese": "120180"
            }
    kv = {}
    name_key = {"buildings": {}, "units": {}, "techs": {"Spies/Treason": "28408", "Cartography": "28019"}}
    with open(sys.argv[1], "r") as f:
        for line in f:
            items = line.split(" ")
            if items[0].isnumeric():
                number = int(items[0])
                match = re.search('".+"', line)
                if (match):
                    text = match.group(0)[1:-1]
                    text = re.sub(r'<(.+?)>', r'‹\1›', text)
                    text = re.sub(r'‹b›(.+?)‹b›', r'<b>\1</b>', text)
                    text = re.sub(r'‹i›(.+?)‹i›', r'<i>\1</i>', text)
                    text = re.sub(r'\\n', r'<br>\n', text)
                    kv[number] = text
            xmatch = re.search('(?P<number>\d+) "Upgrade to (?P<text>.+) \(<cost>\)', line)
            if (xmatch):
                text = xmatch.group('text')
                text = re.sub(r'<b>(.+?)<b>', r'\1', text)
                text = text.strip()
                name_key["techs"][text] = xmatch.group('number')
            rmatch = re.search('(?P<number>\d+) "Research (?P<text>.+) \(<cost>\)', line)
            if (rmatch):
                text = rmatch.group('text')
                text = re.sub(r'<b>(.+?)<b>', r'\1', text)
                text = text.strip()
                name_key["techs"][text] = rmatch.group('number')
            umatch = re.search('(?P<number>\d+) "Create (?P<text>.+) \(<cost>\)', line)
            if (umatch):
                text = umatch.group('text')
                text = re.sub(r'<b>(.+?)<b>', r'\1', text)
                text = text.strip()
                name_key["units"][text] = umatch.group('number')
            bmatch = re.search('(?P<number>\d+) "Build (?P<text>.+) \(<cost>\)', line)
            if (bmatch):
                text = bmatch.group('text')
                text = re.sub(r'<b>(.+?)<b>', r'\1', text)
                text = text.strip()
                name_key["buildings"][text] = bmatch.group('number')
                name_key["units"][text] = bmatch.group('number')  # ships are 'built', not 'created' :-(
            amatch = re.search('(?P<number>\d+) "Advance to (?P<text>.+) \(<cost>', line)
            if (amatch):
                text = amatch.group('text')
                text = re.sub(r'<b>(.+?)<b>', r'\1', text)
                text = text.strip()
                name_key["techs"][text] = amatch.group('number')
        name_key["units"]["Heavy Cav Archer"] = name_key["units"]["Heavy Cavalry Archer"]
        name_key["units"]["Heavy Demo Ship"] = name_key["units"]["Heavy Demolition Ship"]

    meta = {}
    if len(sys.argv) > 2:
        with open(sys.argv[2], "r") as f:
            meta = json.load(f)

    print(json.dumps({"civs": civs, "key_value": kv, "name_key": name_key, "meta": meta}, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
