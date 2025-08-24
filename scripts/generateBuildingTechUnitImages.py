#! /usr/bin/env python3
import json
import re
import shutil
import subprocess
from pathlib import Path

from PIL import Image
from PIL.Image import Resampling

PLAYER_COLOUR = (0, 119, 228)
# PLAYER_COLOUR = (236,9,9)

UPPER_CASE_CHRONICLES_CIV_NAMES = {"ACHAEMENIDS", "ATHENIANS", "SPARTANS"}

BASE_PATH = Path.home() / 'aoe/Aoe2DE proton/widgetui/textures/ingame'
TARGET_SIZE = (48, 48)

COLOURS = {
    "Blue": {
        "Text": [110, 166, 235, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [0, 0, 255, 255],
        "HealthBar": [110, 166, 235, 255],
        "TimelineDark": [60, 60, 150, 255],
        "TimelineLight": [75, 74, 200, 255],
        "MiniMap": [0, 0, 255, 255],
        "TechtreePreviewCiv": [110, 166, 235, 255]
    },
    "Red": {
        "Text": [255, 100, 100, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [255, 0, 0, 255],
        "HealthBar": [255, 100, 100, 255],
        "TimelineDark": [160, 35, 35, 255],
        "TimelineLight": [200, 35, 35, 255],
        "MiniMap": [254, 0, 0, 255],
        "TechtreePreviewCiv": [255, 100, 100, 255]
    },
    "Green": {
        "Text": [0, 255, 0, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [0, 255, 0, 255],
        "HealthBar": [0, 255, 0, 255],
        "TimelineDark": [45, 135, 45, 255],
        "TimelineLight": [35, 200, 35, 255],
        "MiniMap": [0, 255, 0, 255],
        "TechtreePreviewCiv": [0, 255, 0, 255]
    },
    "Yellow": {
        "Text": [255, 255, 0, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [215, 215, 30, 255],
        "HealthBar": [255, 255, 0, 255],
        "TimelineDark": [150, 150, 20, 255],
        "TimelineLight": [200, 200, 25, 255],
        "MiniMap": [255, 255, 1, 255],
        "TechtreePreviewCiv": [255, 255, 0, 255]
    },
    "Aqua": {
        "Text": [0, 255, 225, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [126, 242, 225, 255],
        "HealthBar": [0, 255, 225, 255],
        "TimelineDark": [60, 140, 140, 255],
        "TimelineLight": [35, 175, 175, 255],
        "MiniMap": [0, 255, 225, 255],
        "TechtreePreviewCiv": [0, 255, 225, 255]
    },
    "Purple": {
        "Text": [241, 108, 232, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [150, 15, 250, 255],
        "HealthBar": [241, 108, 232, 255],
        "TimelineDark": [140, 45, 140, 255],
        "TimelineLight": [200, 35, 200, 255],
        "MiniMap": [255, 0, 255, 255],
        "TechtreePreviewCiv": [241, 108, 232, 255]
    },
    "Grey": {
        "Text": [172, 172, 172, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [99, 103, 112, 255],
        "HealthBar": [100, 100, 100, 255],
        "TimelineDark": [64, 64, 64, 255],
        "TimelineLight": [136, 136, 136, 255],
        "MiniMap": [67, 67, 67, 255],
        "TechtreePreviewCiv": [172, 172, 172, 255]
    },
    "Orange": {
        "Text": [255, 180, 21, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [255, 180, 21, 255],
        "HealthBar": [255, 150, 5, 255],
        "TimelineDark": [145, 85, 20, 255],
        "TimelineLight": [200, 130, 50, 255],
        "MiniMap": [255, 130, 1, 255],
        "TechtreePreviewCiv": [255, 180, 21, 255]
    },
    "White": {
        "Text": [232, 238, 255, 255],
        "TextOutline": [0, 0, 0, 255],
        "Icons": [232, 238, 255, 255],
        "HealthBar": [232, 238, 255, 255],
        "TimelineDark": [200, 200, 200, 255],
        "TimelineLight": [255, 255, 255, 255],
        "MiniMap": [255, 255, 255, 255],
        "TechtreePreviewCiv": [232, 238, 255, 255]
    }
}

filelist = [
    '404_50730.dds',
    '406_50730.dds',
    '405_50730.dds',
]


def scale(v):
    return (int(PLAYER_COLOUR[0] * (v[0] / 255)), int(PLAYER_COLOUR[1] * (v[1] / 255)),
            int(PLAYER_COLOUR[2] * (v[2] / 255)), 255)


def main():
    techtreesfile = Path.home() / 'aoe' / 'Aoe2DE proton' / 'resources' / '_common' / 'dat' / 'civTechTrees.json'
    ttfcontent = techtreesfile.read_text()
    ttfcontent = re.sub(r',\n( +)\]', r'\n\1]', ttfcontent)
    techtrees = json.loads(ttfcontent)
    process_aoe2(techtrees)
    process_chronicles(techtrees)

def process_aoe2(techtrees):
    ids = {'Units': set(), 'Buildings': set(), 'Techs': set()}
    for civ in techtrees['civs']:
        if civ['civ_id'] in UPPER_CASE_CHRONICLES_CIV_NAMES:
            continue
        for item in (civ['civ_techs_buildings'] + civ['civ_techs_units']):
            if item['Use Type'] == 'Unit':
                ids['Units'].add((item['Node ID'], item['Picture Index']))
            if item['Use Type'] == 'Building':
                ids['Buildings'].add((item['Node ID'], item['Picture Index']))
            if item['Use Type'] == 'Tech':
                ids['Techs'].add((item['Node ID'], item['Picture Index']))
    for type_, ids_for_type in sorted(ids.items()):
        for pair in sorted(ids_for_type):
            id_, picture_index = pair
            print(type_, picture_index)
            sourcetype = type_.lower()
            if sourcetype == 'techs':
                sourcetype = 'tech';
            source_dds_list = (list((BASE_PATH / sourcetype).glob(f'{picture_index:03}_*.dds')) +
                          list((BASE_PATH / sourcetype).glob(f'{picture_index:03}_*.DDS')))
            if len(source_dds_list) > 1:
                print(source_dds_list)
                raise AssertionError(f'list too long for {id_=}, {type_=}, {picture_index=}')
            source_dds = source_dds_list[0]
            target_file = Path(__file__).parent.resolve().parent / 'img' / type_ / f'{id_}.png'
            if id_ == 125:  # Monk
                target_file = Path(__file__).parent.resolve().parent / 'img' / type_ / f'{id_}_{picture_index}.png'
            convert(source_dds, target_file)


def process_chronicles(techtrees):
    ids = {'Units': set(), 'Buildings': set(), 'Techs': set()}
    for civ in techtrees['civs']:
        if civ['civ_id'] not in UPPER_CASE_CHRONICLES_CIV_NAMES:
            continue
        for item in (civ['civ_techs_buildings'] + civ['civ_techs_units']):
            if item['Use Type'] == 'Unit':
                ids['Units'].add((item['Node ID'], item['Picture Index']))
            if item['Use Type'] == 'Building':
                ids['Buildings'].add((item['Node ID'], item['Picture Index']))
            if item['Use Type'] == 'Tech':
                ids['Techs'].add((item['Node ID'], item['Picture Index']))
    for type_, ids_for_type in sorted(ids.items()):
        for pair in sorted(ids_for_type):
            id_, picture_index = pair
            print(type_, picture_index)
            sourcetype = type_.lower()
            if sourcetype == 'techs':
                sourcetype = 'tech';
            source_dds_list = (list((BASE_PATH / sourcetype).glob(f'{picture_index:03}_*.dds')) +
                          list((BASE_PATH / sourcetype).glob(f'{picture_index:03}_*.DDS')))
            if len(source_dds_list) > 1:
                print(source_dds_list)
                raise AssertionError(f'list too long for {id_=}, {type_=}, {picture_index=}')
            source_dds = source_dds_list[0]
            target_file = Path(__file__).parent.resolve().parent / 'chronicles' / 'img' / type_ / f'{id_}.png'
            if id_ == 125:  # Monk
                target_file = Path(__file__).parent.resolve().parent / 'chronicles' / 'img' / type_ / f'{id_}_{picture_index}.png'
            convert(source_dds, target_file)


def convert(source_dds: Path, target_file: Path):
    assert source_dds.is_file()
    print(f'Converting {source_dds} → {target_file}')
    with Image.open(source_dds) as im:
        r, g, b, a = im.split()

        rgb = Image.merge("RGB", (r, g, b))
        rgb.putalpha(255)

        overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))

        w, h = im.size
        for x in range(w):
            for y in range(h):
                alphavalue = a.getpixel((x, y))
                grayscalevalue = rgb.getpixel((x, y))
                overlay.putpixel((x, y), scale(grayscalevalue))

        composite = Image.composite(rgb, overlay, a)
        resized = composite.resize(TARGET_SIZE, resample=Resampling.BICUBIC)
        resized.save('/tmp/gbtui-uwu.png')
    result_file = Path('/tmp/gbtui-uwu-fs8.png')
    result_file.unlink(missing_ok=True)
    subprocess.run(['pngquant', '/tmp/gbtui-uwu.png'])
    shutil.move(result_file, target_file)


if __name__ == '__main__':
    main()
