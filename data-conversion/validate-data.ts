import { exit } from 'process';

import { buildings } from './converted-data/buildings';
import { units } from './converted-data/units';
import { techs } from './converted-data/techs';
import { civs } from './converted-data/civs';

// globals
let isValid = true;

// main
console.log('validating data...');
validateUnits();
validateTechs();
validateBuildings();
validateCivs();

isValid
  ? console.log('Data validation successful.')
  : console.log('Errors found: Validation failed.');

// functions

function logError(msg: string) {
  isValid = false;
  console.log(msg);
}

function validateUnits() {
  units.forEach((unit: any) => {
    const { unitName, buildings, age } = unit;

    unitName ?? logError(`Error: unitName not found`);
    age ?? logError(`Error: age not found for unit ${unitName}`);

    if (!buildings || buildings.length === 0) {
      logError(`Error: buildings not found for unit ${unitName}`);
    }
  });
}

function validateTechs() {
  techs.forEach((tech: any) => {
    const { techName, buildings, age } = tech;

    techName ?? logError(`Error: techName not found`);
    age ?? logError(`Error: age not found for tech ${techName}`);

    if (!buildings || buildings.length === 0) {
      logError(`Error: buildings not found for tech ${techName}`);
    }
  });
}

function validateBuildings() {
  buildings.forEach((building: any) => {
    const { buildingName, units, techs, age } = building;

    buildingName ?? logError(`Error: buildingName not found`);
    age ?? logError(`Error: age not found for building ${buildingName}`);
  });
}

function validateCivs() {
  civs.forEach((civ: any) => {
    const { civName, units, techs, buildings } = civ;

    civName ?? logError(`Error: civName not found`);

    if (!units || units.length === 0) {
      logError(`Error: units not found for civ ${civName}`);
    }

    if (!techs || techs.length === 0) {
      logError(`Error: techs not found for civ ${civName}`);
    }

    if (!buildings || buildings.length === 0) {
      logError(`Error: buildings not found for civ ${civName}`);
    }
  });
}
