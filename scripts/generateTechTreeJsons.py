#! /usr/bin/env python3

import argparse
import json
import random
from dataclasses import dataclass, asdict, field
from itertools import chain
from pathlib import Path

random.seed(1997)


@dataclass
class TechTreeItem:
    id: str
    age_id: int
    row: int
    building_id: int
    help_string_id: int
    link_id: int
    link_node_type: str
    name: str
    name_string_id: str
    node_id: int
    node_status: str
    node_type: str
    picture_index: int
    building_in_new_column: bool | None
    building_upgraded_from_id: int
    use_type: str
    grid: list[list[str | None]] | None = field(default_factory=lambda: [[None] for _ in range(8)])

    @staticmethod
    def from_json(json_data):
        use_type = json_data['Use Type']
        node_id = json_data['Node ID']
        building_id = json_data['Building ID']
        age_id = json_data['Age ID']
        return TechTreeItem(
            id=f'{use_type}_{node_id}_{building_id}',
            age_id=age_id,
            row=(age_id - 1) * 2,
            building_id=building_id,
            help_string_id=json_data['Help String ID'],
            link_id=json_data['Link ID'],
            link_node_type=json_data['Link Node Type'],
            name=json_data['Name'],
            name_string_id=json_data['Name String ID'],
            node_id=node_id,
            node_status=json_data['Node Status'],
            node_type=json_data['Node Type'],
            picture_index=json_data['Picture Index'],
            building_in_new_column=json_data.get('Building in new column'),
            building_upgraded_from_id=json_data.get('Building upgraded from ID'),
            use_type=use_type,
        )


def get_linked_item_coordinates(building: TechTreeItem, linked_item: TechTreeItem) -> tuple[int, int] | None:
    for row_id, row in enumerate(building.grid):
        for col_id, value in enumerate(row):
            cell: str | None = building.grid[row_id][col_id]
            if cell == linked_item.id:
                return row_id, col_id
    return None


def add_column(building: TechTreeItem):
    for row in building.grid:
        row.append(None)


def grid_printable(building: TechTreeItem):
    value = ''
    for i, row in enumerate(building.grid):
        value += f'{i}|'
        for col in row:
            value += f'{col or '':^14}|'
        value += '\n'
        if i % 2:
            value += '-' * (len(row) * 15 + 2) + '\n'
    return value


def main():
    parser = argparse.ArgumentParser(description='Generate tree json files for aoe2techtree')
    parser.add_argument('programdir', help='The main folder of an aoe2de installation, usually '
                                           'C:/Program Files (x86)/Steam/steamapps/common/AoE2DE/')

    args = parser.parse_args()

    for jsonfile in sorted((Path(args.programdir) / 'resources/_common/dat/CivTechTrees/').glob('*.json')):
        print(jsonfile.name)
        data = json.loads(jsonfile.read_text())
        buildings: list[TechTreeItem] = []
        units_techs: list[TechTreeItem] = []

        for item in data['civ_techs_buildings']:
            tti = TechTreeItem.from_json(item)
            buildings.append(tti)
        for item in data['civ_techs_units']:
            tti = TechTreeItem.from_json(item)
            units_techs.append(tti)
        registry = buildings + units_techs
        assert len(set(item.id for item in registry)) == len(registry)

        for item in units_techs:
            building_candidates = list(filter(lambda x: x.node_id == item.building_id, buildings))
            if len(building_candidates) < 1:
                building_candidates = list(
                    filter(lambda x: x.node_id == item.building_id and x.use_type != 'Tech', units_techs))
                assert len(building_candidates)
            building = building_candidates[0]
            if building.row == item.row:
                item.row += 1
            linked_item_coordinates = None
            if item.link_id != -1:
                linked_items_with_id = list(filter(lambda x: x.node_id == item.link_id, registry))
                if len(linked_items_with_id) != 1:
                    linked_items_with_id = list(
                        filter(lambda x: x.node_id == item.link_id and x.building_id == item.building_id,
                               registry))
                if len(linked_items_with_id) != 1:
                    linked_items_with_id = list(
                        filter(lambda x: x.node_id == item.link_id and x.node_type != 'Research', registry))
                linked_item: TechTreeItem = linked_items_with_id[0]
                linked_item_coordinates = get_linked_item_coordinates(building, linked_item)
            last_row = -1
            for r in range(8):
                if building.grid[r][-1] is not None:
                    last_row = r
            row = item.row
            col = len(building.grid[row]) - 1
            if linked_item_coordinates:
                li_row, li_col = linked_item_coordinates
                col = li_col
                if item.row == li_row:
                    item.row += 1
                    row += 1
            else:
                if building.grid[row][-1] is not None or last_row >= row:
                    add_column(building)
                    col += 1
            if building.grid[row][col] is not None:
                offending_item = next(filter(lambda x: x.id == building.grid[row][col], registry))
                if offending_item.building_in_new_column:
                    add_column(building)
                    building.grid[row][col + 1] = building.grid[row][col]
                    building.grid[row][col] = None
                else:
                    raise Exception(
                        f'{building.id}.grid[{row}][{col}] already occupied by {building.grid[row][col]}, cannot put {item.id}\n' + \
                        str(item) + '\n' + grid_printable(building))
            building.grid[row][col] = item.id
        for item in units_techs:
            if not any(chain.from_iterable(item.grid)):
                item.grid = None
        buildings_dicts = [asdict(item) for item in buildings]
        units_techs_dicts = [asdict(item) for item in units_techs]
        target_filename = jsonfile.name
        if target_filename == 'MAGYAR.json':
            target_filename = 'MAGYARS.json'
        if target_filename == 'INDIANS.json':
            target_filename = 'HINDUSTANIS.json'
        target_file = Path(__file__).parent.with_name('data') / 'trees' / target_filename
        target_file.write_text(
            json.dumps({'buildings': buildings_dicts, 'units_techs': units_techs_dicts}, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
