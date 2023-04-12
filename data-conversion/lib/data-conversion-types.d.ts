import DATA from '../../data/data.json';

export type DataTechTree = typeof DATA.techtrees.Aztecs;
export type DataTechTrees = Record<string, DataTechTree>;
export type DataUnits = Record<string, any>;
export type DataTechs = Record<string, any>;
export type DataBuildings = Record<string, any>;
export type DataUniques = typeof DATA.techtrees.Aztecs.unique;

export type LocaleStrings = Record<string, string>;

export type ConvertedUnit = {
  unitName: string;
  age?: string;
  buildings?: ConvertedBuilding[];
};

export type ConvertedTech = {
  techName: string;
  age?: string;
  buildings?: ConvertedBuilding[];
};

export type ConvertedBuilding = {
  buildingName: string;
  age?: string;
  units?: ConvertedUnit[];
  techs?: ConvertedTech[];
};

export type ConvertedCiv = {
  civName: string;
  units: ConvertedUnit[];
  techs: ConvertedTech[];
  buildings: ConvertedBuilding[];
};
