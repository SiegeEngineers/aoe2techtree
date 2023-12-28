import { exit } from 'process';

import { buildings } from './converted-data/buildings';
import { units } from './converted-data/units';
import { techs } from './converted-data/techs';
import {
  buildingsWriteStream,
  unitsWriteStream,
  techsWriteStream,
  openWriteStreams,
  writeToFile,
} from './lib/file-io';
import {
  ConvertedBuilding,
  ConvertedTech,
  ConvertedUnit,
} from './lib/data-conversion-types';

// main
console.log('populating full tech tree...');
constructFullTechTree();
addBuildingsToUnits();
addBuildingsToTechs();
writeFiles();
console.log('populating full tech tree complete');

// functions

function addBuildingsToUnits() {
  units.forEach((unit: ConvertedUnit) => {
    unit.buildings = [];
    buildings.forEach((building: ConvertedBuilding) => {
      building.units.forEach((bunit: ConvertedUnit) => {
        if (unit.unitName === bunit.unitName) {
          unit.age = bunit.age;
          delete bunit.age;
          unit.buildings.push({ buildingName: building.buildingName });
        }
      });
    });
  });
}

function addBuildingsToTechs() {
  techs.forEach((tech: ConvertedTech) => {
    tech.buildings = [];
    buildings.forEach((building: ConvertedBuilding) => {
      building.techs.forEach((btech: ConvertedTech) => {
        if (tech.techName === btech.techName) {
          tech.age = btech.age;
          delete btech.age;
          tech.buildings.push({ buildingName: building.buildingName });
        }
      });
    });
  });
}

function writeFiles() {
  openWriteStreams({ units: true, techs: true, buildings: true, civs: false });
  writeToFile(buildings, buildingsWriteStream);
  writeToFile(units, unitsWriteStream);
  writeToFile(techs, techsWriteStream);
}

function getBuilding(name: string): ConvertedBuilding {
  const building = buildings.find(
    (building: ConvertedBuilding) => building.buildingName === name,
  );

  if (!building) {
    console.log(`ERROR: ${name} not found`);
    exit(1);
  }

  building.units = [];
  building.techs = [];

  return building;
}

function constructFullTechTree() {
  const archeryRange = getBuilding('archery range');

  archeryRange.age = 'feudal age';

  archeryRange.units.push({ unitName: 'archer', age: 'feudal age' });
  archeryRange.units.push({ unitName: 'skirmisher', age: 'feudal age' });
  archeryRange.units.push({ unitName: 'crossbowman', age: 'castle age' });
  archeryRange.units.push({ unitName: 'elite skirmisher', age: 'castle age' });
  archeryRange.units.push({ unitName: 'slinger', age: 'castle age' });
  archeryRange.units.push({ unitName: 'cavalry archer', age: 'castle age' });
  archeryRange.units.push({ unitName: 'elephant archer', age: 'castle age' });
  archeryRange.units.push({ unitName: 'genitour', age: 'castle age' });
  archeryRange.units.push({ unitName: 'arbalester', age: 'imperial age' });
  archeryRange.units.push({
    unitName: 'imperial skirmisher',
    age: 'imperial age',
  });
  archeryRange.units.push({ unitName: 'hand cannoneer', age: 'imperial age' });
  archeryRange.units.push({
    unitName: 'heavy cavalry archer',
    age: 'imperial age',
  });
  archeryRange.units.push({
    unitName: 'elite elephant archer',
    age: 'imperial age',
  });
  archeryRange.units.push({ unitName: 'elite genitour', age: 'imperial age' });

  archeryRange.techs.push({ techName: 'thumb ring', age: 'castle age' });
  archeryRange.techs.push({
    techName: 'parthian tactics',
    age: 'imperial age',
  });

  const barracks = getBuilding('barracks');

  barracks.age = 'dark age';

  barracks.units.push({ unitName: 'militia', age: 'dark age' });
  barracks.units.push({ unitName: 'man-at-arms', age: 'feudal age' });
  barracks.units.push({ unitName: 'spearman', age: 'feudal age' });
  barracks.units.push({ unitName: 'eagle scout', age: 'feudal age' });
  barracks.units.push({ unitName: 'long swordsman', age: 'castle age' });
  barracks.units.push({ unitName: 'pikeman', age: 'castle age' });
  barracks.units.push({ unitName: 'eagle warrior', age: 'castle age' });
  barracks.units.push({ unitName: 'huskarl', age: 'castle age' });
  barracks.units.push({ unitName: 'elite huskarl', age: 'imperial age' });
  barracks.units.push({
    unitName: 'two-handed swordsman',
    age: 'imperial age',
  });
  barracks.units.push({ unitName: 'champion', age: 'imperial age' });
  barracks.units.push({ unitName: 'halberdier', age: 'imperial age' });
  barracks.units.push({ unitName: 'elite eagle warrior', age: 'imperial age' });
  barracks.units.push({ unitName: 'condottiero', age: 'imperial age' });
  barracks.units.push({ unitName: 'legionary', age: 'imperial age' });

  barracks.techs.push({ techName: 'supplies', age: 'feudal age' });
  barracks.techs.push({ techName: 'squires', age: 'castle age' });
  barracks.techs.push({ techName: 'arson', age: 'castle age' });
  barracks.techs.push({ techName: 'gambesons', age: 'castle age' });

  const stable = getBuilding('stable');

  stable.age = 'feudal age';

  stable.units.push({ unitName: 'scout cavalry', age: 'feudal age' });
  stable.units.push({ unitName: 'camel scout', age: 'feudal age' });
  stable.units.push({ unitName: 'light cavalry', age: 'castle age' });
  stable.units.push({ unitName: 'shrivamsha rider', age: 'castle age' });
  stable.units.push({ unitName: 'camel rider', age: 'castle age' });
  stable.units.push({ unitName: 'knight', age: 'castle age' });
  stable.units.push({ unitName: 'battle elephant', age: 'castle age' });
  stable.units.push({ unitName: 'steppe lancer', age: 'castle age' });
  stable.units.push({ unitName: 'xolotl warrior', age: 'castle age' });
  stable.units.push({ unitName: 'tarkan', age: 'castle age' });
  stable.units.push({ unitName: 'elite tarkan', age: 'imperial age' });
  stable.units.push({ unitName: 'hussar', age: 'imperial age' });
  stable.units.push({
    unitName: 'elite shrivamsha rider',
    age: 'imperial age',
  });
  stable.units.push({ unitName: 'heavy camel rider', age: 'imperial age' });
  stable.units.push({ unitName: 'cavalier', age: 'imperial age' });
  stable.units.push({ unitName: 'elite battle elephant', age: 'imperial age' });
  stable.units.push({ unitName: 'elite steppe lancer', age: 'imperial age' });
  stable.units.push({ unitName: 'winged hussar', age: 'imperial age' });
  stable.units.push({ unitName: 'imperial camel rider', age: 'imperial age' });
  stable.units.push({ unitName: 'paladin', age: 'imperial age' });
  stable.units.push({ unitName: 'savar', age: 'imperial age' });

  stable.techs.push({ techName: 'bloodlines', age: 'feudal age' });
  stable.techs.push({ techName: 'husbandry', age: 'castle age' });

  const siegeWorkshop = getBuilding('siege workshop');

  siegeWorkshop.age = 'castle age';

  siegeWorkshop.units.push({ unitName: 'battering ram', age: 'castle age' });
  siegeWorkshop.units.push({ unitName: 'armored elephant', age: 'castle age' });
  siegeWorkshop.units.push({ unitName: 'mangonel', age: 'castle age' });
  siegeWorkshop.units.push({ unitName: 'scorpion', age: 'castle age' });
  siegeWorkshop.units.push({ unitName: 'siege tower', age: 'castle age' });
  siegeWorkshop.units.push({ unitName: 'capped ram', age: 'imperial age' });
  siegeWorkshop.units.push({ unitName: 'siege elephant', age: 'imperial age' });
  siegeWorkshop.units.push({ unitName: 'onager', age: 'imperial age' });
  siegeWorkshop.units.push({ unitName: 'heavy scorpion', age: 'imperial age' });
  siegeWorkshop.units.push({ unitName: 'bombard cannon', age: 'imperial age' });
  siegeWorkshop.units.push({ unitName: 'siege ram', age: 'imperial age' });
  siegeWorkshop.units.push({ unitName: 'siege onager', age: 'imperial age' });
  siegeWorkshop.units.push({ unitName: 'houfnice', age: 'imperial age' });

  const blacksmith = getBuilding('blacksmith');

  blacksmith.age = 'feudal age';

  blacksmith.techs.push({ techName: 'padded archer armor', age: 'feudal age' });
  blacksmith.techs.push({ techName: 'fletching', age: 'feudal age' });
  blacksmith.techs.push({ techName: 'forging', age: 'feudal age' });
  blacksmith.techs.push({ techName: 'scale barding armor', age: 'feudal age' });
  blacksmith.techs.push({ techName: 'scale mail armor', age: 'feudal age' });
  blacksmith.techs.push({
    techName: 'leather archer armor',
    age: 'castle age',
  });
  blacksmith.techs.push({ techName: 'bodkin arrow', age: 'castle age' });
  blacksmith.techs.push({ techName: 'iron casting', age: 'castle age' });
  blacksmith.techs.push({ techName: 'chain barding armor', age: 'castle age' });
  blacksmith.techs.push({ techName: 'chain mail armor', age: 'castle age' });
  blacksmith.techs.push({ techName: 'ring archer armor', age: 'imperial age' });
  blacksmith.techs.push({ techName: 'bracer', age: 'imperial age' });
  blacksmith.techs.push({ techName: 'blast furnace', age: 'imperial age' });
  blacksmith.techs.push({
    techName: 'plate barding armor',
    age: 'imperial age',
  });
  blacksmith.techs.push({ techName: 'plate mail armor', age: 'imperial age' });

  const dock = getBuilding('dock');

  dock.age = 'dark age';

  dock.units.push({ unitName: 'fishing ship', age: 'dark age' });
  dock.units.push({ unitName: 'transport ship', age: 'dark age' });
  dock.units.push({ unitName: 'fire galley', age: 'feudal age' });
  dock.units.push({ unitName: 'trade cog', age: 'feudal age' });
  dock.units.push({ unitName: 'demolition raft', age: 'feudal age' });
  dock.units.push({ unitName: 'galley', age: 'feudal age' });
  dock.units.push({ unitName: 'fire ship', age: 'castle age' });
  dock.units.push({ unitName: 'demolition ship', age: 'castle age' });
  dock.units.push({ unitName: 'war galley', age: 'castle age' });
  dock.units.push({ unitName: 'turtle ship', age: 'castle age' });
  dock.units.push({ unitName: 'longboat', age: 'castle age' });
  dock.units.push({ unitName: 'caravel', age: 'castle age' });
  dock.units.push({ unitName: 'fast fire ship', age: 'imperial age' });
  dock.units.push({ unitName: 'cannon galleon', age: 'imperial age' });
  dock.units.push({ unitName: 'heavy demolition ship', age: 'imperial age' });
  dock.units.push({ unitName: 'galleon', age: 'imperial age' });
  dock.units.push({ unitName: 'elite turtle ship', age: 'imperial age' });
  dock.units.push({ unitName: 'elite longboat', age: 'imperial age' });
  dock.units.push({ unitName: 'elite caravel', age: 'imperial age' });
  dock.units.push({ unitName: 'thirisadai', age: 'imperial age' });
  dock.units.push({ unitName: 'elite cannon galleon', age: 'imperial age' });
  dock.units.push({ unitName: 'dromon', age: 'imperial age' });

  dock.techs.push({ techName: 'gillnets', age: 'castle age' });
  dock.techs.push({ techName: 'careening', age: 'castle age' });
  dock.techs.push({ techName: 'dry dock', age: 'imperial age' });
  dock.techs.push({ techName: 'shipwright', age: 'imperial age' });

  const harbor = getBuilding('harbor');

  harbor.age = 'castle age';

  harbor.units.push({ unitName: 'fishing ship', age: 'dark age' });
  harbor.units.push({ unitName: 'transport ship', age: 'dark age' });
  harbor.units.push({ unitName: 'fire galley', age: 'feudal age' });
  harbor.units.push({ unitName: 'trade cog', age: 'feudal age' });
  harbor.units.push({ unitName: 'demolition raft', age: 'feudal age' });
  harbor.units.push({ unitName: 'galley', age: 'feudal age' });
  harbor.units.push({ unitName: 'fire ship', age: 'castle age' });
  harbor.units.push({ unitName: 'demolition ship', age: 'castle age' });
  harbor.units.push({ unitName: 'war galley', age: 'castle age' });
  harbor.units.push({ unitName: 'fast fire ship', age: 'imperial age' });
  harbor.units.push({ unitName: 'cannon galleon', age: 'imperial age' });
  harbor.units.push({ unitName: 'galleon', age: 'imperial age' });
  harbor.units.push({ unitName: 'elite cannon galleon', age: 'imperial age' });

  harbor.techs.push({ techName: 'gillnets', age: 'castle age' });
  harbor.techs.push({ techName: 'careening', age: 'castle age' });
  harbor.techs.push({ techName: 'dry dock', age: 'imperial age' });
  harbor.techs.push({ techName: 'shipwright', age: 'imperial age' });

  const university = getBuilding('university');

  university.age = 'castle age';

  university.techs.push({ techName: 'masonry', age: 'castle age' });
  university.techs.push({ techName: 'fortified wall', age: 'castle age' });
  university.techs.push({ techName: 'ballistics', age: 'castle age' });
  university.techs.push({ techName: 'guard tower', age: 'castle age' });
  university.techs.push({ techName: 'heated shot', age: 'castle age' });
  university.techs.push({ techName: 'murder holes', age: 'castle age' });
  university.techs.push({ techName: 'treadmill crane', age: 'castle age' });
  university.techs.push({ techName: 'architecture', age: 'imperial age' });
  university.techs.push({ techName: 'chemistry', age: 'imperial age' });
  university.techs.push({ techName: 'siege engineers', age: 'imperial age' });
  university.techs.push({ techName: 'keep', age: 'imperial age' });
  university.techs.push({ techName: 'arrowslits', age: 'imperial age' });
  university.techs.push({ techName: 'bombard tower', age: 'imperial age' });

  const krepost = getBuilding('krepost');

  krepost.age = 'castle age';

  krepost.units.push({ unitName: 'konnik', age: 'castle age' });
  krepost.units.push({ unitName: 'elite konnik', age: 'imperial age' });

  const donjon = getBuilding('donjon');

  donjon.age = 'feudal age';

  donjon.units.push({ unitName: 'serjeant', age: 'feudal age' });
  donjon.units.push({ unitName: 'spearman', age: 'feudal age' });
  donjon.units.push({ unitName: 'pikeman', age: 'castle age' });
  donjon.units.push({ unitName: 'elite serjeant', age: 'imperial age' });
  donjon.units.push({ unitName: 'halberdier', age: 'imperial age' });

  const monastery = getBuilding('monastery');

  monastery.age = 'castle age';

  monastery.units.push({ unitName: 'monk', age: 'castle age' });
  monastery.units.push({ unitName: 'missionary', age: 'castle age' });

  monastery.techs.push({ techName: 'redemption', age: 'castle age' });
  monastery.techs.push({ techName: 'atonement', age: 'castle age' });
  monastery.techs.push({ techName: 'herbal medicine', age: 'castle age' });
  monastery.techs.push({ techName: 'heresy', age: 'castle age' });
  monastery.techs.push({ techName: 'sanctity', age: 'castle age' });
  monastery.techs.push({ techName: 'fervor', age: 'castle age' });
  monastery.techs.push({ techName: 'devotion', age: 'castle age' });
  monastery.techs.push({ techName: 'faith', age: 'imperial age' });
  monastery.techs.push({ techName: 'illumination', age: 'imperial age' });
  monastery.techs.push({ techName: 'block printing', age: 'imperial age' });
  monastery.techs.push({ techName: 'theocracy', age: 'imperial age' });

  const fortifiedChurch = getBuilding('fortified church');

  fortifiedChurch.age = 'castle age';

  fortifiedChurch.units.push({ unitName: 'monk', age: 'castle age' });
  fortifiedChurch.units.push({ unitName: 'warrior priest', age: 'castle age' });

  fortifiedChurch.techs.push({ techName: 'redemption', age: 'castle age' });
  fortifiedChurch.techs.push({ techName: 'atonement', age: 'castle age' });
  fortifiedChurch.techs.push({
    techName: 'herbal medicine',
    age: 'castle age',
  });
  fortifiedChurch.techs.push({ techName: 'heresy', age: 'castle age' });
  fortifiedChurch.techs.push({ techName: 'sanctity', age: 'castle age' });
  fortifiedChurch.techs.push({ techName: 'fervor', age: 'castle age' });
  fortifiedChurch.techs.push({ techName: 'devotion', age: 'castle age' });
  fortifiedChurch.techs.push({ techName: 'faith', age: 'imperial age' });
  fortifiedChurch.techs.push({ techName: 'illumination', age: 'imperial age' });
  fortifiedChurch.techs.push({
    techName: 'block printing',
    age: 'imperial age',
  });
  fortifiedChurch.techs.push({ techName: 'theocracy', age: 'imperial age' });

  const townCenter = getBuilding('town center');

  townCenter.age = 'castle age';

  townCenter.units.push({ unitName: 'villager', age: 'dark age' });
  townCenter.units.push({ unitName: 'flemish militia', age: 'imperial age' });

  townCenter.techs.push({ techName: 'feudal age', age: 'dark age' });
  townCenter.techs.push({ techName: 'loom', age: 'dark age' });
  townCenter.techs.push({ techName: 'town watch', age: 'feudal age' });
  townCenter.techs.push({ techName: 'castle age', age: 'feudal age' });
  townCenter.techs.push({ techName: 'wheelbarrow', age: 'feudal age' });
  townCenter.techs.push({ techName: 'town patrol', age: 'imperial age' });
  townCenter.techs.push({ techName: 'imperial age', age: 'imperial age' });
  townCenter.techs.push({ techName: 'hand cart', age: 'imperial age' });

  const miningCamp = getBuilding('mining camp');

  miningCamp.age = 'dark age';

  miningCamp.techs.push({ techName: 'gold mining', age: 'feudal age' });
  miningCamp.techs.push({ techName: 'stone mining', age: 'feudal age' });
  miningCamp.techs.push({ techName: 'gold shaft mining', age: 'castle age' });
  miningCamp.techs.push({ techName: 'stone shaft mining', age: 'castle age' });

  const lumberCamp = getBuilding('lumber camp');

  lumberCamp.age = 'dark age';

  lumberCamp.techs.push({ techName: 'double-bit axe', age: 'feudal age' });
  lumberCamp.techs.push({ techName: 'bow saw', age: 'castle age' });
  lumberCamp.techs.push({ techName: 'two-man saw', age: 'imperial age' });

  const market = getBuilding('market');

  market.age = 'feudal age';

  market.units.push({ unitName: 'trade cart', age: 'feudal age' });
  market.techs.push({ techName: 'coinage', age: 'castle age' });
  market.techs.push({ techName: 'caravan', age: 'castle age' });
  market.techs.push({ techName: 'banking', age: 'imperial age' });
  market.techs.push({ techName: 'guilds', age: 'imperial age' });

  const mill = getBuilding('mill');

  mill.age = 'dark age';

  mill.techs.push({ techName: 'horse collar', age: 'feudal age' });
  mill.techs.push({ techName: 'heavy plow', age: 'castle age' });
  mill.techs.push({ techName: 'crop rotation', age: 'imperial age' });

  const folwark = getBuilding('folwark');

  folwark.age = 'dark age';

  folwark.techs.push({ techName: 'horse collar', age: 'feudal age' });
  folwark.techs.push({ techName: 'heavy plow', age: 'castle age' });
  folwark.techs.push({ techName: 'crop rotation', age: 'imperial age' });

  const muleCart = getBuilding('mule cart');

  muleCart.age = 'dark age';

  muleCart.techs.push({ techName: 'double-bit axe', age: 'feudal age' });
  muleCart.techs.push({ techName: 'bow saw', age: 'castle age' });
  muleCart.techs.push({ techName: 'two-man saw', age: 'imperial age' });
  muleCart.techs.push({ techName: 'gold mining', age: 'feudal age' });
  muleCart.techs.push({ techName: 'stone mining', age: 'feudal age' });
  muleCart.techs.push({ techName: 'gold shaft mining', age: 'castle age' });
  muleCart.techs.push({ techName: 'stone shaft mining', age: 'castle age' });

  const fishTrap = getBuilding('fish trap');
  fishTrap.age = 'feudal age';

  const outpost = getBuilding('outpost');
  outpost.age = 'dark age';

  const palisadeWall = getBuilding('palisade wall');
  palisadeWall.age = 'dark age';

  const palisadeGate = getBuilding('palisade gate');
  palisadeGate.age = 'dark age';

  const gate = getBuilding('gate');
  gate.age = 'feudal age';

  const stoneWall = getBuilding('stone wall');
  stoneWall.age = 'feudal age';

  const fortifiedWall = getBuilding('fortified wall');
  fortifiedWall.age = 'castle age';

  const watchTower = getBuilding('watch tower');
  watchTower.age = 'feudal age';

  const guardTower = getBuilding('guard tower');
  guardTower.age = 'castle age';

  const keep = getBuilding('keep');
  keep.age = 'imperial age';

  const bombardTower = getBuilding('bombard tower');
  bombardTower.age = 'imperial age';

  const house = getBuilding('house');
  house.age = 'dark age';

  const farm = getBuilding('farm');
  farm.age = 'dark age';

  const wonder = getBuilding('wonder');
  wonder.age = 'imperial age';

  const feitoria = getBuilding('feitoria');
  feitoria.age = 'imperial age';

  const caravanserai = getBuilding('caravanserai');
  caravanserai.age = 'imperial age';

  const castle = getBuilding('castle');

  castle.age = 'castle age';

  castle.units.push({ unitName: 'petard', age: 'castle age' });
  castle.units.push({ unitName: 'trebuchet', age: 'imperial age' });
  castle.units.push({ unitName: 'flaming camel', age: 'imperial age' });

  castle.techs.push({ techName: 'hoardings', age: 'imperial age' });
  castle.techs.push({ techName: 'sappers', age: 'imperial age' });
  castle.techs.push({ techName: 'conscription', age: 'imperial age' });
  castle.techs.push({ techName: 'spies - treason', age: 'imperial age' });

  /* uniques */

  // armenians
  castle.units.push({ unitName: 'composite bowman', age: 'castle age' });
  castle.units.push({
    unitName: 'elite composite bowman',
    age: 'imperial age',
  });
  castle.techs.push({ techName: 'cilician fleet', age: 'castle age' });
  castle.techs.push({ techName: 'fereters', age: 'imperial age' });

  // aztecs
  castle.units.push({ unitName: 'jaguar warrior', age: 'castle age' });
  castle.units.push({ unitName: 'elite jaguar warrior', age: 'imperial age' });
  castle.techs.push({ techName: 'atlatl', age: 'castle age' });
  castle.techs.push({ techName: 'garland wars', age: 'imperial age' });

  // bengalis
  castle.units.push({ unitName: 'ratha', age: 'castle age' });
  castle.units.push({ unitName: 'elite ratha', age: 'imperial age' });
  castle.techs.push({ techName: 'paiks', age: 'castle age' });
  castle.techs.push({ techName: 'mahayana', age: 'imperial age' });

  // berbers
  castle.units.push({ unitName: 'camel archer', age: 'castle age' });
  castle.units.push({ unitName: 'elite camel archer', age: 'imperial age' });
  castle.techs.push({ techName: 'kasbah', age: 'castle age' });
  castle.techs.push({ techName: 'maghrebi camels', age: 'imperial age' });

  // bohemians
  castle.units.push({ unitName: 'hussite wagon', age: 'castle age' });
  castle.units.push({ unitName: 'elite hussite wagon', age: 'imperial age' });
  castle.techs.push({ techName: 'wagenburg tactics', age: 'castle age' });
  castle.techs.push({ techName: 'hussite reforms', age: 'imperial age' });

  // britons
  castle.units.push({ unitName: 'longbowman', age: 'castle age' });
  castle.units.push({ unitName: 'elite longbowman', age: 'imperial age' });
  castle.techs.push({ techName: 'yeomen', age: 'castle age' });
  castle.techs.push({ techName: 'warwolf', age: 'imperial age' });

  // bulgarians
  castle.units.push({ unitName: 'konnik', age: 'castle age' });
  castle.units.push({ unitName: 'elite konnik', age: 'imperial age' });
  castle.techs.push({ techName: 'stirrups', age: 'castle age' });
  castle.techs.push({ techName: 'bagains', age: 'imperial age' });

  // burgundians
  castle.units.push({ unitName: 'coustillier', age: 'castle age' });
  castle.units.push({ unitName: 'elite coustillier', age: 'imperial age' });
  castle.techs.push({ techName: 'burgundian vineyards', age: 'castle age' });
  castle.techs.push({ techName: 'flemish revolution', age: 'imperial age' });

  // burmese
  castle.units.push({ unitName: 'arambai', age: 'castle age' });
  castle.units.push({ unitName: 'elite arambai', age: 'imperial age' });
  castle.techs.push({ techName: 'howdah', age: 'castle age' });
  castle.techs.push({ techName: 'manipur cavalry', age: 'imperial age' });

  // byzantines
  castle.units.push({ unitName: 'cataphract', age: 'castle age' });
  castle.units.push({ unitName: 'elite cataphract', age: 'imperial age' });
  castle.techs.push({ techName: 'greek fire', age: 'castle age' });
  castle.techs.push({ techName: 'logistica', age: 'imperial age' });

  // celts
  castle.units.push({ unitName: 'woad raider', age: 'castle age' });
  castle.units.push({ unitName: 'elite woad raider', age: 'imperial age' });
  castle.techs.push({ techName: 'stronghold', age: 'castle age' });
  castle.techs.push({ techName: 'furor celtica', age: 'imperial age' });

  // chinese
  castle.units.push({ unitName: 'chu ko nu', age: 'castle age' });
  castle.units.push({ unitName: 'elite chu ko nu', age: 'imperial age' });
  castle.techs.push({ techName: 'great wall', age: 'castle age' });
  castle.techs.push({ techName: 'rocketry', age: 'imperial age' });

  // cumans
  castle.units.push({ unitName: 'kipchak', age: 'castle age' });
  castle.units.push({ unitName: 'elite kipchak', age: 'imperial age' });
  castle.techs.push({ techName: 'steppe husbandry', age: 'castle age' });
  castle.techs.push({ techName: 'cuman mercenaries', age: 'imperial age' });

  // dravidians
  castle.units.push({ unitName: 'urumi swordsman', age: 'castle age' });
  castle.units.push({ unitName: 'elite urumi swordsman', age: 'imperial age' });
  castle.techs.push({ techName: 'medical corps', age: 'castle age' });
  castle.techs.push({ techName: 'wootz steel', age: 'imperial age' });

  // ethiopians
  castle.units.push({ unitName: 'shotel warrior', age: 'castle age' });
  castle.units.push({ unitName: 'elite shotel warrior', age: 'imperial age' });
  castle.techs.push({ techName: 'royal heirs', age: 'castle age' });
  castle.techs.push({ techName: 'torsion engines', age: 'imperial age' });

  // franks
  castle.units.push({ unitName: 'throwing axeman', age: 'castle age' });
  castle.units.push({ unitName: 'elite throwing axeman', age: 'imperial age' });
  castle.techs.push({ techName: 'bearded axe', age: 'castle age' });
  castle.techs.push({ techName: 'chivalry', age: 'imperial age' });

  // georgians
  castle.units.push({ unitName: 'monaspa', age: 'castle age' });
  castle.units.push({ unitName: 'elite monaspa', age: 'imperial age' });
  castle.techs.push({ techName: 'svan towers', age: 'castle age' });
  castle.techs.push({ techName: 'aznauri cavalry', age: 'imperial age' });

  // goths
  castle.units.push({ unitName: 'huskarl', age: 'castle age' });
  castle.units.push({ unitName: 'elite huskarl', age: 'imperial age' });
  castle.techs.push({ techName: 'anarchy', age: 'castle age' });
  castle.techs.push({ techName: 'perfusion', age: 'imperial age' });

  // gurjaras
  castle.units.push({ unitName: 'chakram thrower', age: 'castle age' });
  castle.units.push({ unitName: 'elite chakram thrower', age: 'imperial age' });
  castle.techs.push({ techName: 'kshatriyas', age: 'castle age' });
  castle.techs.push({ techName: 'frontier guards', age: 'imperial age' });

  // hindustanis
  castle.units.push({ unitName: 'ghulam', age: 'castle age' });
  castle.units.push({ unitName: 'elite ghulam', age: 'imperial age' });
  castle.techs.push({ techName: 'grand trunk road', age: 'castle age' });
  castle.techs.push({ techName: 'shatagni', age: 'imperial age' });

  // huns
  castle.units.push({ unitName: 'tarkan', age: 'castle age' });
  castle.units.push({ unitName: 'elite tarkan', age: 'imperial age' });
  castle.techs.push({ techName: 'marauders', age: 'castle age' });
  castle.techs.push({ techName: 'atheism', age: 'imperial age' });

  // incas
  castle.units.push({ unitName: 'kamayuk', age: 'castle age' });
  castle.units.push({ unitName: 'elite kamayuk', age: 'imperial age' });
  castle.techs.push({ techName: 'andean sling', age: 'castle age' });
  castle.techs.push({ techName: 'fabric shields', age: 'imperial age' });

  // italians
  castle.units.push({ unitName: 'genoese crossbowman', age: 'castle age' });
  castle.units.push({
    unitName: 'elite genoese crossbowman',
    age: 'imperial age',
  });
  castle.techs.push({ techName: 'pavise', age: 'castle age' });
  castle.techs.push({ techName: 'silk road', age: 'imperial age' });

  // japanese
  castle.units.push({ unitName: 'samurai', age: 'castle age' });
  castle.units.push({ unitName: 'elite samurai', age: 'imperial age' });
  castle.techs.push({ techName: 'yasama', age: 'castle age' });
  castle.techs.push({ techName: 'kataparuto', age: 'imperial age' });

  // khmer
  castle.units.push({ unitName: 'ballista elephant', age: 'castle age' });
  castle.units.push({
    unitName: 'elite ballista elephant',
    age: 'imperial age',
  });
  castle.techs.push({ techName: 'tusk swords', age: 'castle age' });
  castle.techs.push({ techName: 'double crossbow', age: 'imperial age' });

  // koreans
  castle.units.push({ unitName: 'war wagon', age: 'castle age' });
  castle.units.push({ unitName: 'elite war wagon', age: 'imperial age' });
  castle.techs.push({ techName: 'eupseong', age: 'castle age' });
  castle.techs.push({ techName: 'shinkichon', age: 'imperial age' });

  // lithuanians
  castle.units.push({ unitName: 'leitis', age: 'castle age' });
  castle.units.push({ unitName: 'elite leitis', age: 'imperial age' });
  castle.techs.push({ techName: 'hill forts', age: 'castle age' });
  castle.techs.push({ techName: 'tower shields', age: 'imperial age' });

  // magyars
  castle.units.push({ unitName: 'magyar huszar', age: 'castle age' });
  castle.units.push({ unitName: 'elite magyar huszar', age: 'imperial age' });
  castle.techs.push({ techName: 'corvinian army', age: 'castle age' });
  castle.techs.push({ techName: 'recurve bow', age: 'imperial age' });

  // malay
  castle.units.push({ unitName: 'karambit warrior', age: 'castle age' });
  castle.units.push({
    unitName: 'elite karambit warrior',
    age: 'imperial age',
  });
  castle.techs.push({ techName: 'thalassocracy', age: 'castle age' });
  castle.techs.push({ techName: 'forced levy', age: 'imperial age' });

  // malians
  castle.units.push({ unitName: 'gbeto', age: 'castle age' });
  castle.units.push({ unitName: 'elite gbeto', age: 'imperial age' });
  castle.techs.push({ techName: 'tigui', age: 'castle age' });
  castle.techs.push({ techName: 'farimba', age: 'imperial age' });

  // mayans
  castle.units.push({ unitName: 'plumed archer', age: 'castle age' });
  castle.units.push({ unitName: 'elite plumed archer', age: 'imperial age' });
  castle.techs.push({ techName: "hul'che javelineers", age: 'castle age' });
  castle.techs.push({ techName: 'el dorado', age: 'imperial age' });

  // mongols
  castle.units.push({ unitName: 'mangudai', age: 'castle age' });
  castle.units.push({ unitName: 'elite mangudai', age: 'imperial age' });
  castle.techs.push({ techName: 'nomads', age: 'castle age' });
  castle.techs.push({ techName: 'drill', age: 'imperial age' });

  // persians
  castle.units.push({ unitName: 'war elephant', age: 'castle age' });
  castle.units.push({ unitName: 'elite war elephant', age: 'imperial age' });
  castle.techs.push({ techName: 'kamandaran', age: 'castle age' });
  castle.techs.push({ techName: 'citadels', age: 'imperial age' });

  // poles
  castle.units.push({ unitName: 'obuch', age: 'castle age' });
  castle.units.push({ unitName: 'elite obuch', age: 'imperial age' });
  castle.techs.push({ techName: 'szlachta privileges', age: 'castle age' });
  castle.techs.push({ techName: 'lechitic legacy', age: 'imperial age' });

  // portuguese
  castle.units.push({ unitName: 'organ gun', age: 'castle age' });
  castle.units.push({ unitName: 'elite organ gun', age: 'imperial age' });
  castle.techs.push({ techName: 'carrack', age: 'castle age' });
  castle.techs.push({ techName: 'arquebus', age: 'imperial age' });

  // romans
  castle.units.push({ unitName: 'centurion', age: 'castle age' });
  castle.units.push({ unitName: 'elite centurion', age: 'imperial age' });
  castle.techs.push({ techName: 'ballistas', age: 'castle age' });
  castle.techs.push({ techName: 'comitatenses', age: 'imperial age' });

  // saracens
  castle.units.push({ unitName: 'mameluke', age: 'castle age' });
  castle.units.push({ unitName: 'elite mameluke', age: 'imperial age' });
  castle.techs.push({ techName: 'bimaristan', age: 'castle age' });
  castle.techs.push({ techName: 'counterweights', age: 'imperial age' });

  // sicilians
  castle.units.push({ unitName: 'serjeant', age: 'castle age' });
  castle.units.push({ unitName: 'elite serjeant', age: 'imperial age' });
  castle.techs.push({ techName: 'first crusade', age: 'castle age' });
  castle.techs.push({ techName: 'hauberk', age: 'imperial age' });

  // slavs
  castle.units.push({ unitName: 'boyar', age: 'castle age' });
  castle.units.push({ unitName: 'elite boyar', age: 'imperial age' });
  castle.techs.push({ techName: 'detinets', age: 'castle age' });
  castle.techs.push({ techName: 'druzhina', age: 'imperial age' });

  // spanish
  castle.units.push({ unitName: 'conquistador', age: 'castle age' });
  castle.units.push({ unitName: 'elite conquistador', age: 'imperial age' });
  castle.techs.push({ techName: 'inquisition', age: 'castle age' });
  castle.techs.push({ techName: 'supremacy', age: 'imperial age' });

  // tatars
  castle.units.push({ unitName: 'keshik', age: 'castle age' });
  castle.units.push({ unitName: 'elite keshik', age: 'imperial age' });
  castle.techs.push({ techName: 'silk armor', age: 'castle age' });
  castle.techs.push({ techName: 'timurid siegecraft', age: 'imperial age' });

  // teutons
  castle.units.push({ unitName: 'teutonic knight', age: 'castle age' });
  castle.units.push({ unitName: 'elite teutonic knight', age: 'imperial age' });
  castle.techs.push({ techName: 'ironclad', age: 'castle age' });
  castle.techs.push({ techName: 'crenellations', age: 'imperial age' });

  // turks
  castle.units.push({ unitName: 'janissary', age: 'castle age' });
  castle.units.push({ unitName: 'elite janissary', age: 'imperial age' });
  castle.techs.push({ techName: 'sipahi', age: 'castle age' });
  castle.techs.push({ techName: 'artillery', age: 'imperial age' });

  // vietnamese
  castle.units.push({ unitName: 'rattan archer', age: 'castle age' });
  castle.units.push({ unitName: 'elite rattan archer', age: 'imperial age' });
  castle.techs.push({ techName: 'chatras', age: 'castle age' });
  castle.techs.push({ techName: 'paper money', age: 'imperial age' });

  // vikings
  castle.units.push({ unitName: 'berserk', age: 'castle age' });
  castle.units.push({ unitName: 'elite berserk', age: 'imperial age' });
  castle.techs.push({ techName: 'chieftains', age: 'castle age' });
  castle.techs.push({ techName: 'bogsveigar', age: 'imperial age' });
}
