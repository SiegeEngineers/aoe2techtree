function parseCiv(civ) {
   let builder = new CivBuilder({uniqueUnit: civ.unique[0],
         uniqueUnitElite: civ.unique[1],
         uniqueTechOne: civ.unique[2],
         uniqueTechTwo: civ.unique[3],
         monkPrefix: civ.monkPrefix});

   if (civ.disabled) {
      if (civ.disabled.buildings) {
         builder.disableBuildings(civ.disabled.buildings);
      }
      if (civ.disabled.units) {
         builder.disableUnits(civ.disabled.units);
      }
      if (civ.disabled.techs) {
         builder.disableTechs(civ.disabled.techs);
      }
   }

   if (civ.enabled) {
      if (civ.enabled.buildings) {
         builder.enableBuildings(civ.enabled.buildings);
      }
      if (civ.enabled.units) {
         builder.enableUnits(civ.enabled.units);
      }
      if (civ.enabled.techs) {
         builder.enableTechs(civ.enabled.techs);
      }
   }

   if (civ.disableHorses) builder.disableHorses();
   
   return builder.build();
}

function civ(name) {
   let selectedCiv = parseCiv(civsConfig[name]);

   SVG.select('.cross').each(function (i) {
      if (SVGObjectIsTransparent(this)) {
         return;
      }

      let {id, type} = parseSVGObjectId(this.id());
      if (id === undefined || type === undefined) {
         return;
      }

      if (type === 'unit') {
         if (selectedCiv.disabledUnits.includes(id)) {
            return;
         }
      } else if (type === 'building') {
         if (selectedCiv.disabledBuildings.includes(id)) {
            return;
         }
      } else if (type === 'tech') {
         if (selectedCiv.disabledTechs.includes(id)) {
            return;
         }
      }

      makeSVGObjectTransparent(this);
   });

   enable([], [UNIQUE_UNIT, ELITE_UNIQUE_UNIT], []);
   disable(selectedCiv.disabledBuildings, selectedCiv.disabledUnits, selectedCiv.disabledTechs);
   unique([selectedCiv.uniqueConfig.uniqueUnit,
     selectedCiv.uniqueConfig.uniqueUnitElite,
     selectedCiv.uniqueConfig.uniqueTechOne,
     selectedCiv.uniqueConfig.uniqueTechTwo], selectedCiv.monkPrefix);
}

function SVGObjectIsTransparent(svgObj) {
   return svgObj.attr('fill-opacity') === 0
}

function makeSVGObjectTransparent(svgObj) {
   svgObj.attr({'fill-opacity': 0});
}

function parseSVGObjectId(svgObjId) {
   const id_regex = /(.+)_([\d]+)_(x|copy)/;

   const found = svgObjId.match(id_regex);
   if (!found) {
      return {id: undefined, type: undefined};
   }
   let id = parseInt(found[0]);
   let type = found[1];

   return {id, type}
}

class Civ {
  constructor(buildings, techs, units, monkPrefix, uniqueConfig) {
     this.disabledBuildings = buildings || [];
     this.disabledTechs = techs || [];
     this.disabledUnits = units || [];
     this.monkPrefix = monkPrefix;
     this.uniqueConfig = uniqueConfig;
  }
}

class CivBuilder {
  constructor(uniqueConfig) {
     this.disabledBuildings = [
        // Unique Buildings
        KREPOST,
        FEITORIA,
        DONJON,
     ];
     this.disabledUnits = [
        // Units that are not often enabled
        BATTLE_ELEPHANT,
        ELITE_BATTLE_ELEPHANT,
        STEPPE_LANCER,
        ELITE_STEPPE_LANCER,
        EAGLE_SCOUT,
        EAGLE_WARRIOR,
        ELITE_EAGLE_WARRIOR,
        // Unique units
        SLINGER,
        IMPERIAL_SKIRMISHER,
        GENITOUR,
        ELITE_GENITOUR,
        CONDOTTIERO,
        IMPERIAL_CAMEL_RIDER,
        XOLOTL_WARRIOR,
        TURTLE_SHIP,
        ELITE_TURTLE_SHIP,
        LONGBOAT,
        ELITE_LONGBOAT,
        CARAVEL,
        ELITE_CARAVEL,
        FLAMING_CAMEL,
        KONNIK,
        ELITE_KONNIK,
        MISSIONARY,
        DSERJEANT,
        ELITE_DSERJEANT,
        FLEMISHPIKEMAN,
     ];
     this.disabledTechs = [];
     this.uniqueUnit = uniqueConfig.uniqueUnit;
     this.uniqueUnitElite = uniqueConfig.uniqueUnitElite;
     this.uniqueTechOne = uniqueConfig.uniqueTechOne;
     this.uniqueTechTwo = uniqueConfig.uniqueTechTwo;
     this.monkPrefix = uniqueConfig.monkPrefix;
  }

  disableHorses() {
     this.disabledBuildings = this.disabledBuildings.concat([STABLE]);
     this.disabledTechs = this.disabledTechs.concat([
        BLOODLINES,
        HUSBANDRY,
        SCALE_BARDING_ARMOR,
        CHAIN_BARDING_ARMOR,
        PLATE_BARDING_ARMOR,
        PARTHIAN_TACTICS,
     ]);
     this.disabledUnits = this.disabledUnits.concat([
        SCOUT_CAVALRY,
        LIGHT_CAVALRY,
        HUSSAR,
        KNIGHT,
        PALADIN,
        CAMEL_RIDER,
        HEAVY_CAMEL_RIDER,
        CAVALIER,
        CAVALRY_ARCHER,
        HEAVY_CAV_ARCHER,
     ]);
     return this;
  }

  disableBuildings(toDisable) {
     this.disabledBuildings = this.disabledBuildings.concat(toDisable);
     return this;
  }

  disableUnits(toDisable) {
     this.disabledUnits = this.disabledUnits.concat(toDisable);
     return this;
  }

  disableTechs(toDisable) {
     this.disabledTechs = this.disabledTechs.concat(toDisable);
     return this;
  }

  enableUnits(toEnable) {
     for (let enable of toEnable) {
        let index = this.disabledUnits.indexOf(enable);
        if (index >= 0) {
           this.disabledUnits.splice(index, 1);
        }
     }
     return this;
  }

  enableBuildings(toEnable) {
     for (let enable of toEnable) {
        let index = this.disabledBuildings.indexOf(enable);
        if (index >= 0) {
           this.disabledBuildings.splice(index, 1);
        }
     }
     return this;
  }

  enableTechs(toEnable) {
   for (let enable of toEnable) {
      let index = this.disabledTechs.indexOf(enable);
      if (index >= 0) {
         this.disabledTechs.splice(index, 1);
      }
   }
   return this;
}

  build() {
     return new Civ(this.disabledBuildings,
                this.disabledTechs,
                this.disabledUnits,
                this.monkPrefix,
                {
                   uniqueUnit: this.uniqueUnit,
                   uniqueUnitElite: this.uniqueUnitElite,
                   uniqueTechOne: this.uniqueTechOne,
                   uniqueTechTwo: this.uniqueTechTwo,
                 })
  }
}

const civsConfig = { 
    Aztecs: { 
       disableHorses: true,
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
          ],
          techs: [ 
             THUMB_RING,
             HOARDINGS,
             RING_ARCHER_ARMOR,
             MASONRY,
             ARCHITECTURE,
             BOMBARD_TOWER_TECH,
             KEEP_TECH,
             TWO_MAN_SAW,
             GUILDS
          ],
          units: [ 
             HAND_CANNONEER,
             HALBERDIER,
             CANNON_GALLEON,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP,
             GALLEON,
             HEAVY_SCORPION,
             BOMBARD_CANNON
          ]
       },
       enabled: { 
          units: [
             EAGLE_SCOUT,
             EAGLE_WARRIOR,
             ELITE_EAGLE_WARRIOR,
             XOLOTL_WARRIOR,
          ]
       },
       monkPrefix: MONK_PREFIX_MESO,
       unique: [ 
          JAGUAR_WARRIOR,
          ELITE_JAGUAR_WARRIOR,
          ATLATL,
          GARLAND_WARS
       ]
    },
    Berbers: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER,
             KEEP
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             SHIPWRIGHT,
             SANCTITY,
             BLOCK_PRINTING,
             SAPPERS,
             ARCHITECTURE,
             BOMBARD_TOWER_TECH,
             KEEP_TECH,
             TWO_MAN_SAW
          ],
          units: [ 
             ARBALESTER,
             HALBERDIER,
             PALADIN,
             SIEGE_RAM,
             SIEGE_ONAGER
          ]
       },
       enabled: { 
          units: [ 
             GENITOUR,
             ELITE_GENITOUR
          ]
       },
       monkPrefix: MONK_PREFIX_AFRICAN,
       unique: [ 
          CAMEL_ARCHER,
          ELITE_CAMEL_ARCHER,
          KASBAH,
          MAGHRABI_CAMELS
       ]
    },
    Britons: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             THUMB_RING,
             PARTHIAN_TACTICS,
             BLOODLINES,
             REDEMPTION,
             ATONEMENT,
             HERESY,
             BOMBARD_TOWER_TECH,
             TREADMILL_CRANE,
             STONE_SHAFT_MINING,
             CROP_ROTATION
          ],
          units: [ 
             HAND_CANNONEER,
             HUSSAR,
             PALADIN,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ]
       },
       unique: [ 
          LONGBOWMAN,
          ELITE_LONGBOWMAN,
          YEOMEN,
          WARWOLF
       ]
    },
    Bulgarians: { 
       disabled: { 
          buildings: [ 
             FORTIFIED_WALL,
             BOMBARD_TOWER
          ],
          techs: [ 
             RING_ARCHER_ARMOR,
             DRY_DOCK,
             SHIPWRIGHT,
             FORTIFIED_WALL_TECH,
             TREADMILL_CRANE,
             ARROWSLITS,
             BOMBARD_TOWER_TECH,
             HOARDINGS,
             SAPPERS,
             ATONEMENT,
             SANCTITY,
             FAITH,
             BLOCK_PRINTING,
             TWO_MAN_SAW,
             GUILDS
          ],
          units: [ 
             CROSSBOWMAN,
             ARBALESTER,
             HAND_CANNONEER,
             CHAMPION,
             PALADIN,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             BOMBARD_CANNON,
             FAST_FIRE_SHIP,
             HEAVY_DEMO_SHIP,
             ELITE_CANNON_GALLEON
          ]
       },
       enabled: { 
          buildings: [ 
             KREPOST
          ],
          units: [
             KONNIK,
             ELITE_KONNIK
          ]
       },
       unique: [
          KONNIK,
          ELITE_KONNIK,
          STIRRUPS,
          BAGAINS
       ]
    },
   Burgundians: {
      disabled: {
         buildings: [],
         techs: [
            THUMB_RING,
            PARTHIAN_TACTICS,
            SUPPLIES,
            BLOODLINES,
            RING_ARCHER_ARMOR,
            DRY_DOCK,
            SHIPWRIGHT,
            SIEGE_ENGINEERS,
            HEATED_SHOT,
            THEOCRACY,
            HERESY,
         ],
         units: [
            ARBALESTER,
            HEAVY_CAV_ARCHER,
            CAMEL_RIDER,
            HEAVY_CAMEL_RIDER,
            SIEGE_RAM,
            SIEGE_ONAGER,
            HEAVY_SCORPION,
            HEAVY_DEMO_SHIP,
         ]
      },
      enabled: {
         buildings: [],
         units: [
            FLEMISHPIKEMAN,
         ]
      },
      unique: [
         COUSTILLIER,
         ELITE_COUSTILLIER,
         BURGUNDIAN_VINEYARDS,
         FLEMISH_REVOLUTION,
      ]
   },
   Burmese: {
      disabled: {
         buildings: [
            BOMBARD_TOWER
         ],
         techs: [
            THUMB_RING,
            SHIPWRIGHT,
            HERESY,
            HOARDINGS,
            SAPPERS,
            LEATHER_ARCHER_ARMOR,
            RING_ARCHER_ARMOR,
            BOMBARD_TOWER_TECH,
            ARROWSLITS,
            STONE_SHAFT_MINING
         ],
         units: [
            ARBALESTER,
            HAND_CANNONEER,
            CAMEL_RIDER,
            HEAVY_CAMEL_RIDER,
            PALADIN,
            FAST_FIRE_SHIP,
            HEAVY_DEMO_SHIP,
            SIEGE_RAM,
            SIEGE_ONAGER
         ]
      },
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          ARAMBAI,
          ELITE_ARAMBAI,
          HOWDAH,
          MANIPUR_CAVALRY
       ]
    },
    Byzantines: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             BLOODLINES,
             HERBAL_MEDICINE,
             SAPPERS,
             BLAST_FURNACE,
             MASONRY,
             ARCHITECTURE,
             SIEGE_ENGINEERS,
             HEATED_SHOT,
             TREADMILL_CRANE
          ],
          units: [ 
             HEAVY_SCORPION,
             SIEGE_ONAGER
          ]
       },
       unique: [ 
          CATAPHRACT,
          ELITE_CATAPHRACT,
          GREEK_FIRE,
          LOGISTICA
       ]
    },
    Celts: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             THUMB_RING,
             PARTHIAN_TACTICS,
             SQUIRES,
             BLOODLINES,
             REDEMPTION,
             ILLUMINATION,
             ATONEMENT,
             BLOCK_PRINTING,
             THEOCRACY,
             RING_ARCHER_ARMOR,
             BRACER,
             PLATE_BARDING_ARMOR,
             ARCHITECTURE,
             BOMBARD_TOWER_TECH,
             TWO_MAN_SAW,
             CROP_ROTATION
          ],
          units: [ 
             ARBALESTER,
             HAND_CANNONEER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             FAST_FIRE_SHIP,
             ELITE_CANNON_GALLEON,
             BOMBARD_CANNON
          ]
       },
       unique: [ 
          WOAD_RAIDER,
          ELITE_WOAD_RAIDER,
          STRONGHOLD,
          FUROR_CELTICA
       ]
    },
    Chinese: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             HERESY,
             REDEMPTION,
             HOARDINGS,
             SIEGE_ENGINEERS,
             TREADMILL_CRANE,
             GUILDS,
             CROP_ROTATION,
             SUPPLIES,
          ],
          units: [ 
             HAND_CANNONEER,
             HUSSAR,
             PALADIN,
             FAST_FIRE_SHIP,
             ELITE_CANNON_GALLEON,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          CHU_KO_NU,
          ELITE_CHU_KO_NU,
          GREAT_WALL,
          ROCKETRY
       ]
    },
    Cumans: { 
       disabled: { 
          buildings: [ 
             GATE,
             STONE_WALL,
             FORTIFIED_WALL,
             GUARD_TOWER,
             KEEP,
             BOMBARD_TOWER
          ],
          techs: [ 
             BRACER,
             DRY_DOCK,
             SHIPWRIGHT,
             FORTIFIED_WALL_TECH,
             GUARD_TOWER_TECH,
             TREADMILL_CRANE,
             ARCHITECTURE,
             SIEGE_ENGINEERS,
             KEEP_TECH,
             ARROWSLITS,
             BOMBARD_TOWER_TECH,
             ILLUMINATION,
             REDEMPTION,
             BLOCK_PRINTING,
             THEOCRACY,
             STONE_SHAFT_MINING,
             HUSBANDRY,
             SUPPLIES,
          ],
          units: [ 
             ARBALESTER,
             HAND_CANNONEER,
             HEAVY_CAMEL_RIDER,
             HEAVY_SCORPION,
             BOMBARD_CANNON,
             CANNON_GALLEON,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP
          ]
       },
       enabled: { 
          units: [ 
             STEPPE_LANCER,
             ELITE_STEPPE_LANCER
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          KIPCHAK,
          ELITE_KIPCHAK,
          STEPPE_HUSBANDRY,
          CUMAN_MERCENARIES
       ]
    },
    Ethiopians: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             BLOODLINES,
             REDEMPTION,
             BLOCK_PRINTING,
             HOARDINGS,
             PLATE_BARDING_ARMOR,
             TREADMILL_CRANE,
             ARROWSLITS,
             BOMBARD_TOWER_TECH,
             CROP_ROTATION
          ],
          units: [ 
             HAND_CANNONEER,
             CHAMPION,
             PALADIN,
             FAST_FIRE_SHIP,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP
          ]
       },
       monkPrefix: MONK_PREFIX_AFRICAN,
       unique: [ 
          SHOTEL_WARRIOR,
          ELITE_SHOTEL_WARRIOR,
          ROYAL_HEIRS,
          TORSION_ENGINES
       ]
    },
    Franks: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
          ],
          techs: [ 
             THUMB_RING,
             PARTHIAN_TACTICS,
             BLOODLINES,
             SHIPWRIGHT,
             REDEMPTION,
             ATONEMENT,
             SAPPERS,
             RING_ARCHER_ARMOR,
             BRACER,
             HEATED_SHOT,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             TREADMILL_CRANE,
             STONE_SHAFT_MINING,
             TWO_MAN_SAW,
             GUILDS
          ],
          units: [ 
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             HUSSAR,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM,
             SIEGE_ONAGER
          ]
       },
       unique: [ 
          THROWING_AXEMAN,
          ELITE_THROWING_AXEMAN,
          CHIVALRY,
          BEARDED_AXE
       ]
    },
    Goths: { 
       disabled: { 
          buildings: [ 
             GUARD_TOWER,
             KEEP,
             BOMBARD_TOWER,
             GATE,
             STONE_WALL,
             FORTIFIED_WALL
          ],
          techs: [
             THUMB_RING,
             PARTHIAN_TACTICS,
             DRY_DOCK,
             GUARD_TOWER_TECH,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             FORTIFIED_WALL_TECH,
             REDEMPTION,
             ATONEMENT,
             BLOCK_PRINTING,
             HERESY,
             HOARDINGS,
             PLATE_BARDING_ARMOR,
             PLATE_MAIL_ARMOR,
             SIEGE_ENGINEERS,
             TREADMILL_CRANE,
             ARROWSLITS,
             GOLD_SHAFT_MINING,
             SUPPLIES,
             ARSON,
          ],
          units: [ 
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM,
             SIEGE_ONAGER
          ]
       },
       unique: [ 
          HUSKARL,
          ELITE_HUSKARL,
          ANARCHY,
          PERFUSION
       ]
    },
    Huns: { 
       disabled: { 
          buildings: [ 
             GUARD_TOWER,
             KEEP,
             BOMBARD_TOWER,
             FORTIFIED_WALL,
             HOUSE
          ],
          techs: [ 
             SHIPWRIGHT,
             GUARD_TOWER_TECH,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             REDEMPTION,
             HERBAL_MEDICINE,
             BLOCK_PRINTING,
             THEOCRACY,
             HOARDINGS,
             RING_ARCHER_ARMOR,
             PLATE_MAIL_ARMOR,
             FORTIFIED_WALL_TECH,
             HEATED_SHOT,
             TREADMILL_CRANE,
             ARCHITECTURE,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             STONE_SHAFT_MINING,
             CROP_ROTATION,
             SUPPLIES,
          ],
          units: [ 
             ARBALESTER,
             HAND_CANNONEER,
             CHAMPION,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             FAST_FIRE_SHIP,
             CANNON_GALLEON,
             ELITE_CANNON_GALLEON,
             ONAGER,
             SIEGE_ONAGER,
             HEAVY_SCORPION,
             BOMBARD_CANNON
          ]
       },
       unique: [ 
          TARKAN,
          ELITE_TARKAN,
          MARAUDERS,
          ATHEISM
       ]
    },
    Incas: { 
       disableHorses: true,
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             BOMBARD_TOWER_TECH,
             ATONEMENT,
             FERVOR,
             ARCHITECTURE,
             TWO_MAN_SAW
          ],
          units: [ 
             HAND_CANNONEER,
             CANNON_GALLEON,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ]
       },
       enabled: { 
          units: [
             EAGLE_SCOUT,
             EAGLE_WARRIOR,
             ELITE_EAGLE_WARRIOR,
             SLINGER,
             XOLOTL_WARRIOR,
          ]
       },
       monkPrefix: MONK_PREFIX_MESO,
       unique: [ 
          KAMAYUK,
          ELITE_KAMAYUK,
          ANDEAN_SLING,
          FABRIC_SHIELDS
       ]
    },
    Indians: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
          ],
          techs: [ 
             SHIPWRIGHT,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             ATONEMENT,
             HERESY,
             SAPPERS,
             PLATE_MAIL_ARMOR,
             PLATE_BARDING_ARMOR,
             ARCHITECTURE,
             ARROWSLITS,
             TREADMILL_CRANE,
             CROP_ROTATION
          ],
          units: [ 
             ARBALESTER,
             KNIGHT,
             CAVALIER,
             PALADIN,
             FAST_FIRE_SHIP,
             HEAVY_SCORPION,
             SIEGE_RAM,
             SIEGE_ONAGER
          ]
       },
       enabled: { 
          units: [ 
             IMPERIAL_CAMEL_RIDER
          ]
       },
       monkPrefix: MONK_PREFIX_AFRICAN,
       unique: [ 
          ELEPHANT_ARCHER,
          ELITE_ELEPHANT_ARCHER,
          SULTANS,
          SHATAGNI
       ]
    },
    Italians: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             HERESY,
             SAPPERS,
             SIEGE_ENGINEERS,
             GOLD_SHAFT_MINING
          ],
          units: [ 
             HEAVY_CAV_ARCHER,
             HALBERDIER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             HEAVY_DEMO_SHIP,
             HEAVY_SCORPION,
             SIEGE_RAM,
             SIEGE_ONAGER
          ]
       },
       enabled: { 
          units: [ 
             CONDOTTIERO
          ]
       },
       unique: [ 
          GENOESE_CROSSBOWMAN,
          ELITE_GENOESE_CROSSBOWMAN,
          PAVISE,
          SILK_ROAD
       ]
    },
    Japanese: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             BOMBARD_TOWER_TECH,
             HERESY,
             HOARDINGS,
             SAPPERS,
             PLATE_BARDING_ARMOR,
             ARCHITECTURE,
             HEATED_SHOT,
             STONE_SHAFT_MINING,
             GUILDS,
             CROP_ROTATION
          ],
          units: [ 
             HUSSAR,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             HEAVY_DEMO_SHIP,
             SIEGE_RAM,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          SAMURAI,
          ELITE_SAMURAI,
          YASAMA,
          KATAPARUTO
       ]
    },
    Khmer: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             THUMB_RING,
             SQUIRES,
             BOMBARD_TOWER_TECH,
             ATONEMENT,
             HERESY,
             BLOCK_PRINTING,
             SHIPWRIGHT,
             PLATE_MAIL_ARMOR,
             ARROWSLITS,
             TREADMILL_CRANE,
             TWO_MAN_SAW,
             GUILDS,
             SUPPLIES,
          ],
          units: [ 
             CHAMPION,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             HEAVY_DEMO_SHIP,
             SIEGE_ONAGER,
             BOMBARD_CANNON,
          ]
       },
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          BALLISTA_ELEPHANT,
          ELITE_BALLISTA_ELEPHANT,
          TUSK_SWORDS,
          DOUBLE_CROSSBOW
       ]
    },
    Koreans: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             BLOODLINES,
             REDEMPTION,
             ATONEMENT,
             HERESY,
             ILLUMINATION,
             HOARDINGS,
             SAPPERS,
             BLAST_FURNACE,
             PLATE_BARDING_ARMOR,
             CROP_ROTATION
          ],
          units: [ 
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             DEMOLITION_RAFT,
             DEMOLITION_SHIP,
             HEAVY_DEMO_SHIP,
             SIEGE_RAM,
             HEAVY_SCORPION
          ]
       },
       enabled: { 
          units: [ 
             TURTLE_SHIP,
             ELITE_TURTLE_SHIP
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          WAR_WAGON,
          ELITE_WAR_WAGON,
          PANOKSEON,
          SHINKICHON
       ]
    },
    Lithuanians: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             PLATE_MAIL_ARMOR,
             SHIPWRIGHT,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             SAPPERS,
             GOLD_SHAFT_MINING,
             SUPPLIES,
          ],
          units: [ 
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             SIEGE_RAM,
             SIEGE_ONAGER,
             HEAVY_SCORPION,
             HEAVY_DEMO_SHIP
          ]
       },
       unique: [ 
          LEITIS,
          ELITE_LEITIS,
          HILL_FORTS,
          TOWER_SHIELDS
       ]
    },
    Magyars: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER,
             FORTIFIED_WALL
          ],
          techs: [ 
             SQUIRES,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             FORTIFIED_WALL_TECH,
             REDEMPTION,
             ATONEMENT,
             FAITH,
             PLATE_MAIL_ARMOR,
             ARCHITECTURE,
             ARROWSLITS,
             STONE_SHAFT_MINING,
             GUILDS
          ],
          units: [ 
             HAND_CANNONEER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP,
             SIEGE_RAM,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ]
       },
       unique: [ 
          MAGYAR_HUSZAR,
          ELITE_MAGYAR_HUSZAR,
          CORVINIAN_ARMY,
          RECURVE_BOW
       ]
    },
    Malay: { 
       disabled: { 
          buildings: [ 
             FORTIFIED_WALL
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             BLOODLINES,
             FORTIFIED_WALL_TECH,
             FERVOR,
             THEOCRACY,
             HOARDINGS,
             CHAIN_BARDING_ARMOR,
             PLATE_BARDING_ARMOR,
             ARCHITECTURE,
             ARROWSLITS,
             TREADMILL_CRANE,
             TWO_MAN_SAW
          ],
          units: [ 
             HAND_CANNONEER,
             HEAVY_CAV_ARCHER,
             CHAMPION,
             HUSSAR,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             HEAVY_DEMO_SHIP,
             SIEGE_RAM,
             SIEGE_ONAGER
          ]
       },
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          KARAMBIT_WARRIOR,
          ELITE_KARAMBIT_WARRIOR,
          THALASSOCRACY,
          FORCED_LEVY
       ]
    },
    Malians: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             SHIPWRIGHT,
             BOMBARD_TOWER_TECH,
             BRACER,
             ILLUMINATION,
             BLAST_FURNACE,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             TWO_MAN_SAW
          ],
          units: [ 
             HALBERDIER,
             HUSSAR,
             PALADIN,
             GALLEON,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM,
             HEAVY_SCORPION
          ]
       },
       monkPrefix: MONK_PREFIX_AFRICAN,
       unique: [ 
          GBETO,
          ELITE_GBETO,
          TIGUI,
          FARIMBA
       ]
    },
    Mayans: { 
       disableHorses: true,
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             BOMBARD_TOWER_TECH,
             REDEMPTION,
             ILLUMINATION,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             GOLD_SHAFT_MINING,
             SUPPLIES,
          ],
          units: [ 
             HAND_CANNONEER,
             CHAMPION,
             CANNON_GALLEON,
             ELITE_CANNON_GALLEON,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ]
       },
       enabled: { 
          units: [
             EAGLE_SCOUT,
             EAGLE_WARRIOR,
             ELITE_EAGLE_WARRIOR,
             XOLOTL_WARRIOR,
          ]
       },
       monkPrefix: MONK_PREFIX_MESO,
       unique: [ 
          PLUMED_ARCHER,
          ELITE_PLUMED_ARCHER,
          OBSIDIAN_ARROWS,
          EL_DORADO
       ]
    },
    Mongols: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
          ],
          techs: [ 
             DRY_DOCK,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             REDEMPTION,
             ILLUMINATION,
             SANCTITY,
             BLOCK_PRINTING,
             THEOCRACY,
             RING_ARCHER_ARMOR,
             PLATE_BARDING_ARMOR,
             ARCHITECTURE,
             HEATED_SHOT,
             TREADMILL_CRANE,
             ARROWSLITS,
             TWO_MAN_SAW,
             GUILDS,
             CROP_ROTATION,
             SUPPLIES,
          ],
          units: [ 
             HAND_CANNONEER,
             HALBERDIER,
             PALADIN,
             ELITE_CANNON_GALLEON,
             BOMBARD_CANNON
          ]
       },
       enabled: {
          units: [
             STEPPE_LANCER,
             ELITE_STEPPE_LANCER
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          MANGUDAI,
          ELITE_MANGUDAI,
          NOMADS,
          DRILL
       ]
    },
    Persians: { 
       disabled: { 
          buildings: [ 
             FORTIFIED_WALL,
             KEEP,
             BOMBARD_TOWER
          ],
          techs: [ 
             SHIPWRIGHT,
             FORTIFIED_WALL_TECH,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             REDEMPTION,
             ILLUMINATION,
             ATONEMENT,
             HERESY,
             SANCTITY,
             BRACER,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             TREADMILL_CRANE
          ],
          units: [ 
             ARBALESTER,
             TWO_HANDED_SWORDSMAN,
             CHAMPION,
             SIEGE_ONAGER
          ]
       },
       monkPrefix: MONK_PREFIX_AFRICAN,
       unique: [ 
          WAR_ELEPHANT,
          ELITE_WAR_ELEPHANT,
          KAMANDARAN,
          MAHOUTS
       ]
    },
    Portuguese: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             SQUIRES,
             SHIPWRIGHT,
             ILLUMINATION,
             HOARDINGS,
             ARROWSLITS,
             GOLD_SHAFT_MINING
          ],
          units: [ 
             HEAVY_CAV_ARCHER,
             HUSSAR,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             FAST_FIRE_SHIP,
             SIEGE_RAM,
             SIEGE_ONAGER,
             HEAVY_SCORPION
          ]
       },
       enabled: { 
          buildings: [ 
             FEITORIA
          ],
          units: [ 
             CARAVEL,
             ELITE_CARAVEL
          ]
       },
       unique: [ 
          ORGAN_GUN,
          ELITE_ORGAN_GUN,
          CARRACK,
          ARQUEBUS
       ]
    },
    Saracens: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          techs: [ 
             SHIPWRIGHT,
             BOMBARD_TOWER_TECH,
             SAPPERS,
             ARCHITECTURE,
             HEATED_SHOT,
             STONE_SHAFT_MINING,
             GUILDS,
             CROP_ROTATION
          ],
          units: [ 
             HALBERDIER,
             CAVALIER,
             PALADIN,
             FAST_FIRE_SHIP,
             HEAVY_SCORPION
          ]
       },
       monkPrefix: MONK_PREFIX_AFRICAN,
       unique: [
          MAMELUKE,
          ELITE_MAMELUKE,
          MADRASAH,
          ZEALOTRY
       ]
    },
   Sicilians: {
      disabled: {
         buildings: [
            FORTIFIED_WALL,
            WATCH_TOWER,
            GUARD_TOWER,
            KEEP,
            BOMBARD_TOWER,
         ],
         techs: [
            THUMB_RING,
            PARTHIAN_TACTICS,
            RING_ARCHER_ARMOR,
            ARCHITECTURE,
            FORTIFIED_WALL_TECH,
            BOMBARD_TOWER_TECH,
            GUARD_TOWER_TECH,
            KEEP_TECH,
            REDEMPTION,
            ATONEMENT,
            BLOCK_PRINTING,
            THEOCRACY,
            HERESY,
            TWO_MAN_SAW,
         ],
         units: [
            HAND_CANNONEER,
            HEAVY_CAV_ARCHER,
            HUSSAR,
            PALADIN,
            CAMEL_RIDER,
            HEAVY_CAMEL_RIDER,
            SIEGE_ONAGER,
            BOMBARD_CANNON,
            ELITE_CANNON_GALLEON,
         ]
      },
      enabled: {
         buildings: [
            DONJON,
         ],
         units: [
            DSERJEANT,
            ELITE_DSERJEANT,
         ]
      },
      unique: [
         SERJEANT,
         ELITE_SERJEANT,
         FIRST_CRUSADE,
         SCUTAGE,
      ]
   },
   Slavs: {
      disabled: {
         buildings: [
            KEEP,
            BOMBARD_TOWER
         ],
         techs: [
            THUMB_RING,
            PARTHIAN_TACTICS,
            SHIPWRIGHT,
            KEEP_TECH,
            BOMBARD_TOWER_TECH,
            HERESY,
            BRACER,
            ARCHITECTURE,
            ARROWSLITS,
            HEATED_SHOT,
            TREADMILL_CRANE,
            STONE_SHAFT_MINING,
            GUILDS
         ],
         units: [
            ARBALESTER,
            HAND_CANNONEER,
            CAMEL_RIDER,
            HEAVY_CAMEL_RIDER,
            PALADIN,
            ELITE_CANNON_GALLEON,
            HEAVY_DEMO_SHIP,
            BOMBARD_CANNON
          ]
       },
       unique: [ 
          BOYAR,
          ELITE_BOYAR,
          ORTHODOXY,
          DRUZHINA
       ]
    },
    Spanish: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             SIEGE_ENGINEERS,
             HEATED_SHOT,
             TREADMILL_CRANE,
             GOLD_SHAFT_MINING,
             CROP_ROTATION
          ],
          units: [ 
             CROSSBOWMAN,
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             SIEGE_ONAGER,
             HEAVY_SCORPION
          ]
       },
       enabled: { 
          units: [ 
             MISSIONARY
          ]
       },
       unique: [ 
          CONQUISTADOR,
          ELITE_CONQUISTADOR,
          INQUISITION,
          SUPREMACY
       ]
    },
    Tatars: { 
       disabled: { 
          buildings: [ 
             KEEP
          ],
          techs: [ 
             CHAIN_MAIL_ARMOR,
             PLATE_MAIL_ARMOR,
             SHIPWRIGHT,
             ARCHITECTURE,
             KEEP_TECH,
             ARROWSLITS,
             HOARDINGS,
             REDEMPTION,
             HERESY,
             SANCTITY,
             FAITH,
             THEOCRACY,
             STONE_SHAFT_MINING,
             TWO_MAN_SAW,
             SUPPLIES,
          ],
          units: [ 
             ARBALESTER,
             CHAMPION,
             PALADIN,
             SIEGE_ONAGER,
             BOMBARD_CANNON,
             HEAVY_DEMO_SHIP
          ]
       },
       enabled: { 
          units: [ 
             STEPPE_LANCER,
             ELITE_STEPPE_LANCER,
             FLAMING_CAMEL,
          ]
       },
       unique: [ 
          KESHIK,
          ELITE_KESHIK,
          SILK_ARMOR,
          TIMURID_SIEGECRAFT
       ]
    },
    Teutons: { 
       disabled: { 
          techs: [ 
             THUMB_RING,
             PARTHIAN_TACTICS,
             HUSBANDRY,
             DRY_DOCK,
             SHIPWRIGHT,
             BRACER,
             ARCHITECTURE,
             GOLD_SHAFT_MINING
          ],
          units: [ 
             ARBALESTER,
             HEAVY_CAV_ARCHER,
             LIGHT_CAVALRY,
             HUSSAR,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM
          ]
       },
       unique: [ 
          TEUTONIC_KNIGHT,
          ELITE_TEUTONIC_KNIGHT,
          IRONCLAD,
          CRENELLATIONS
       ]
    },
    Turks: { 
       disabled: { 
          techs: [ 
             HERBAL_MEDICINE,
             ILLUMINATION,
             BLOCK_PRINTING,
             STONE_SHAFT_MINING,
             CROP_ROTATION,
             SIEGE_ENGINEERS
          ],
          units: [ 
             ARBALESTER,
             ELITE_SKIRMISHER,
             PIKEMAN,
             HALBERDIER,
             PALADIN,
             FAST_FIRE_SHIP,
             ONAGER,
             SIEGE_ONAGER
          ]
       },
       monkPrefix: MONK_PREFIX_AFRICAN,
       unique: [ 
          JANISSARY,
          ELITE_JANISSARY,
          SIPAHI,
          ARTILLERY
       ]
    },
    Vietnamese: { 
       disabled: { 
          techs: [ 
             PARTHIAN_TACTICS,
             SHIPWRIGHT,
             REDEMPTION,
             HERESY,
             FERVOR,
             BLAST_FURNACE,
             MASONRY,
             ARCHITECTURE,
             GOLD_SHAFT_MINING
          ],
          units: [ 
             HAND_CANNONEER,
             HUSSAR,
             PALADIN,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             FAST_FIRE_SHIP,
             SIEGE_RAM,
             SIEGE_ONAGER,
             HEAVY_SCORPION
          ]
       },
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT,
             IMPERIAL_SKIRMISHER
          ]
       },
       monkPrefix: MONK_PREFIX_ASIAN,
       unique: [ 
          RATTAN_ARCHER,
          ELITE_RATTAN_ARCHER,
          CHATRAS,
          PAPER_MONEY
       ]
    },
    Vikings: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             BLOODLINES,
             HUSBANDRY,
             SHIPWRIGHT,
             KEEP_TECH,
             BOMBARD_TOWER_TECH,
             REDEMPTION,
             HERBAL_MEDICINE,
             SANCTITY,
             ILLUMINATION,
             THEOCRACY,
             PLATE_BARDING_ARMOR,
             STONE_SHAFT_MINING,
             GUILDS
          ],
          units: [ 
             HAND_CANNONEER,
             HEAVY_CAV_ARCHER,
             HALBERDIER,
             HUSSAR,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             FIRE_GALLEY,
             FIRE_SHIP,
             FAST_FIRE_SHIP,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ]
       },
       enabled: { 
          units: [ 
             LONGBOAT,
             ELITE_LONGBOAT
          ]
       },
       unique: [ 
          BERSERK,
          ELITE_BERSERK,
          CHIEFTAINS,
          BERSERKERGANG
       ]
    }
 };
