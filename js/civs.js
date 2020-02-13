function civ(name, tree) {
    resetToDefault(tree);

    let selectedCiv = civsConfig[name];

    let enabled = selectedCiv.enabled || {};
    let disabled = selectedCiv.disabled || {};
    let uniqueConfig = selectedCiv.unique || {};
    if (selectedCiv.disableHorses) {
        disableHorses();
    }

    enable(enabled.buildings || [], enabled.units || [], enabled.techs || []);
    disable(disabled.buildings || [], disabled.units || [], disabled.techs || []);
    unique(uniqueConfig || [], selectedCiv.monkPrefix);
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
             BOMBARD_TOWER,
             KEEP,
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
             ELITE_EAGLE_WARRIOR
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
             BOMBARD_TOWER,
             KEEP,
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
             BOMBARD_TOWER,
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
             FORTIFIED_WALL,
             TREADMILL_CRANE,
             ARROWSLITS,
             BOMBARD_TOWER,
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
          ]
       },
       unique: [ 
          KONNIK,
          ELITE_KONNIK,
          STIRRUPS,
          BAGAINS
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
             BOMBARD_TOWER,
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
             BOMBARD_TOWER,
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
             HOARDINGS,
             SIEGE_ENGINEERS,
             TREADMILL_CRANE,
             GUILDS,
             CROP_ROTATION
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
             FORTIFIED_WALL,
             GUARD_TOWER,
             TREADMILL_CRANE,
             ARCHITECTURE,
             SIEGE_ENGINEERS,
             KEEP,
             ARROWSLITS,
             BOMBARD_TOWER,
             ILLUMINATION,
             BLOCK_PRINTING,
             THEOCRACY,
             STONE_SHAFT_MINING,
             HUSBANDRY
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
             BOMBARD_TOWER,
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
             KEEP,
             BOMBARD_TOWER,
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
             GUARD_TOWER,
             KEEP,
             BOMBARD_TOWER,
             FORTIFIED_WALL,
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
             SUPPLIES
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
             FORTIFIED_WALL
          ],
          techs: [ 
             SHIPWRIGHT,
             GUARD_TOWER,
             KEEP,
             BOMBARD_TOWER,
             REDEMPTION,
             HERBAL_MEDICINE,
             BLOCK_PRINTING,
             THEOCRACY,
             HOARDINGS,
             RING_ARCHER_ARMOR,
             PLATE_MAIL_ARMOR,
             FORTIFIED_WALL,
             HEATED_SHOT,
             TREADMILL_CRANE,
             ARCHITECTURE,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             STONE_SHAFT_MINING,
             CROP_ROTATION
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
             BOMBARD_TOWER,
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
             SLINGER
          ]
       },
       monkPrefix: MONK_PREFIX_MESO,
       unique: [ 
          KAMAYUK,
          ELITE_KAMAYUK,
          ANDEAN_SLING,
          COURIERS
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
             KEEP,
             BOMBARD_TOWER,
             ATONEMENT,
             HERESY,
             SAPPERS,
             PLATE_MAIL_ARMOR,
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
             BOMBARD_TOWER,
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
             BOMBARD_TOWER,
             ATONEMENT,
             HERESY,
             BLOCK_PRINTING,
             SHIPWRIGHT,
             PLATE_MAIL_ARMOR,
             ARROWSLITS,
             TWO_MAN_SAW,
             GUILDS
          ],
          units: [ 
             CHAMPION,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             HEAVY_DEMO_SHIP,
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
             ELITE_CANNON_GALLEON,
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
             GOLD_SHAFT_MINING
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
             KEEP,
             BOMBARD_TOWER,
             FORTIFIED_WALL,
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
          MERCENARIES,
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
             FORTIFIED_WALL,
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
             BOMBARD_TOWER,
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
             BOMBARD_TOWER,
             REDEMPTION,
             ILLUMINATION,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             GOLD_SHAFT_MINING
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
             ELITE_EAGLE_WARRIOR
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
             KEEP,
             BOMBARD_TOWER,
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
             CROP_ROTATION
          ],
          units: [ 
             HAND_CANNONEER,
             HALBERDIER,
             PALADIN,
             ELITE_CANNON_GALLEON,
             BOMBARD_CANNON
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
             FORTIFIED_WALL,
             KEEP,
             BOMBARD_TOWER,
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
             BOMBARD_TOWER,
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
             KEEP,
             BOMBARD_TOWER,
             HERESY,
             BRACER,
             ARCHITECTURE,
             ARROWSLITS,
             HEATED_SHOT,
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
             KEEP,
             ARROWSLITS,
             HOARDINGS,
             REDEMPTION,
             HERESY,
             SANCTITY,
             FAITH,
             THEOCRACY,
             STONE_SHAFT_MINING,
             TWO_MAN_SAW
          ],
          units: [ 
             ARBALESTER,
             CHAMPION,
             HALBERDIER,
             PALADIN,
             SIEGE_ONAGER,
             BOMBARD_CANNON,
             HEAVY_DEMO_SHIP
          ]
       },
       enabled: { 
          units: [ 
             STEPPE_LANCER,
             ELITE_STEPPE_LANCER
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
             KEEP,
             BOMBARD_TOWER,
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
