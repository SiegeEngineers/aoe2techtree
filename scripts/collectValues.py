#! /usr/bin/env python3

import sys
import os
import re
import json


def main():
    if len(sys.argv) < 4 or not os.path.isfile(sys.argv[1]):
        print("Usage: {} <units.json> <buildings.json> <techs.json>".format(sys.argv[0]))
        sys.exit()

    values = {}
    with open(sys.argv[3], "r") as f:
        content = json.load(f)
        data = content['data']
        for item in data:
            values[item['name']] = {
                'cost': item['cost'],
                'hp': "0",
                'attack': "0",
                'armor': "0",
                'piercearmor': "0",
                'garrison': "0"
            }
            values[item['name'] + ' (Tech)'] = {
                'cost': item['cost'],
                'hp': "0",
                'attack': "0",
                'armor': "0",
                'piercearmor': "0",
                'garrison': "0"
            }
    with open(sys.argv[1], "r") as f:
        content = json.load(f)
        data = content['data']
        for item in data:
            armor, piercearmor = item['ar'].split(" ")[0].split("/")
            values[item['name']] = {
                'cost': item['cost'],
                'hp': item['hp'],
                'attack': item['at'],
                'armor': armor,
                'piercearmor': piercearmor,
                'garrison': "0"
            }
    with open(sys.argv[2], "r") as f:
        content = json.load(f)
        data = content['data']
        for item in data:
            armor, piercearmor = item['ar'].split(" ")[0].split("/")
            values[item['name']] = {
                'cost': item['cost'],
                'hp': item['hp'],
                'attack': item['at'],
                'armor': armor,
                'piercearmor': piercearmor,
                'garrison': "0"
            }

    values["Man-at-Arms"] = values["Man-at-arms"]
    values["Two-Handed Swordsman"] = values["Two-handed Swordsman"]
    values["Heavy Cav Archer"] = values["Heavy Cavalry Archer"]
    values["Trebuchet"] = values["Trebuchet (packed)"]
    values["Heavy Demo Ship"] = values["Heavy Demolition Ship"]
    values["Obsidian Arrows"] = values["Obsidian Arrow"]
    values["Spies/Treason"] = {'cost': '', 'hp': '', 'attack': '', 'armor': '', 'piercearmor': '', 'garrison': ''}

    print(json.dumps(values, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
