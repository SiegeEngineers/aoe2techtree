#! /usr/bin/env python3
import json
import re
import shutil
import subprocess
from itertools import chain
from pathlib import Path

from PIL import Image
from PIL.Image import Resampling

PLAYER_COLOUR = (0, 119, 228)
# PLAYER_COLOUR = (236,9,9)

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


def scale(v):
    return (int(PLAYER_COLOUR[0] * (v[0] / 255)), int(PLAYER_COLOUR[1] * (v[1] / 255)),
            int(PLAYER_COLOUR[2] * (v[2] / 255)), 255)


def main():
    techtreesdir = Path.home() / 'aoe' / 'Aoe2DE proton' / 'resources' / '_common' / 'dat' / 'CivTechTrees'
    ids = {'Unit': set(), 'Building': set(), 'Tech': set()}
    print(techtreesdir)
    for json_file in sorted(techtreesdir.glob('*.json')):
        data = json.loads(json_file.read_text())
        for item in chain(data['civ_techs_buildings'], data['civ_techs_units']):
            ids[item['Use Type']].add(item['Picture Index'])
    for type_, ids_for_type in sorted(ids.items()):
        for picture_index in sorted(ids_for_type):
            print(type_, picture_index)
            sourcetype = 'tech' if type_ == 'Tech' else 'buildings' if type_ == 'Building' else 'units'
            source_dds_list = (list((BASE_PATH / sourcetype).glob(f'{picture_index:03}_*.dds')) +
                          list((BASE_PATH / sourcetype).glob(f'{picture_index:03}_*.DDS')))
            if len(source_dds_list) > 1:
                print(source_dds_list)
                raise AssertionError(f'list too long for {type_=}, {picture_index=}')
            if len(source_dds_list) < 1:
                print(source_dds_list)
                raise AssertionError(f'list too short for {type_=}, {picture_index=}')
            source_dds = source_dds_list[0]
            target_file = Path(__file__).parent.resolve().parent / 'img' / type_ / f'{picture_index}.png'
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
