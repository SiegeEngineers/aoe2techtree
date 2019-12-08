#! /usr/bin/env python3

import sys
import os
import re
import json

IDS = {"Britons":120150, 
            "Franks":120151,
            "Goths":120152,
            "Teutons":120153,
            "Japanese":120154,
            "Chinese":120155,
            "Byzantines":120156,
            "Persians":120157,
            "Saracens":120158,
            "Turks":120159,
            "Vikings":120160,
            "Mongols":120161,
            "Celts":120162,
            "Spanish":120163,
            "Aztecs":120164,
            "Mayans":120165,
            "Huns":120166,
            "Koreans":120167,
            "Italians":120168,
            "Indians":120169,
            "Incas":120170,
            "Magyars":120171,
            "Slavs":120172,
            "Portuguese":120173,
            "Ethiopians":120174,
            "Malians":120175,
            "Berbers":120176,
            "Khmer":120177,
            "Malay":120178,
            "Burmese":120179,
            "Vietnamese":120180,
            "Bulgarians":120181,
            "Cumans":120183,
            "Lithuanians":120184,
            "Tatars":120182
}

def main():
    if len(sys.argv) < 2 or not os.path.isfile(sys.argv[1]):
        print("Usage: {} <path to key-value-(modded-)strings-utf8.txt>".format(sys.argv[0]))
        sys.exit()
    
    kv = {}
    with open(sys.argv[1], "r") as f:
        for line in f:
            items = line.split(" ")
            if items[0].isnumeric():
                number = int(items[0])
                match = re.search('".+"', line)
                if(match):
                    text = match.group(0)[1:-1]
                    text = re.sub(r'<b>(.+?)<b>', r'<b>\1</b>', text)
                    text = re.sub(r'\\n', r'<br>\n', text)
                    kv[number] = text
    
    mapping = {}
    for civ in IDS:
        mapping[civ] = kv[IDS[civ]]
    print(json.dumps(mapping, indent=4, sort_keys=True))



if __name__ == "__main__":
    main()
