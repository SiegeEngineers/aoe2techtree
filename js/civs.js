function civ(name, tree) {
    resetToDefault(tree);

    let selectedCiv = civsConfig[name];

    let enabled = selectedCiv.enabled || {};
    let disabled = selectedCiv.disabled || {};
    let uniqueConfig = selectedCiv.unique || {};
    if (selectedCiv.disableHorses) {
        disableHorses(tree);
    }

    enable(enabled.buildings || [], enabled.units || [], enabled.techs || []);
    disable(disabled.buildings || [], disabled.units || [], disabled.techs || []);
    unique(uniqueConfig || [], selectedCiv.monkPrefix);
}

const civsConfig = { 
    Aztecs: { 
       disableHorses: true,
       enabled: { 
          units: [ 
             EAGLE_SCOUT,
             EAGLE_WARRIOR,
             ELITE_EAGLE_WARRIOR
          ]
       },
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
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
          ],
          techs: [ 
             THUMB_RING,
             PARTHIAN_TACTICS,
             HOARDINGS,
             RING_ARCHER_ARMOR,
             MASONRY,
             ARCHITECTURE,
             BOMBARD_TOWER,
             KEEP,
             TWO_MAN_SAW,
             GUILDS
          ]
       },
       unique: [ 
          JAGUAR_WARRIOR,
          ELITE_JAGUAR_WARRIOR,
          ATLATL,
          GARLAND_WARS
       ],
       monkPrefix: MONK_PREFIX_MESO
    },
    Berbers: { 
       enabled: { 
          units: [ 
             GENITOUR,
             ELITE_GENITOUR
          ]
       },
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER,
             KEEP
          ],
          units: [ 
             ARBALESTER,
             HALBERDIER,
             PALADIN,
             SIEGE_RAM,
             SIEGE_ONAGER
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
          ]
       },
       unique: [ 
          CAMEL_ARCHER,
          ELITE_CAMEL_ARCHER,
          KASBAH,
          MAGHRABI_CAMELS
       ],
       monkPrefix: MONK_PREFIX_AFRICAN
    },
    Britons: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
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
       enabled: { 
          buildings: [ 
             KREPOST
          ]
       },
       disabled: { 
          buildings: [ 
             FORTIFIED_WALL,
             BOMBARD_TOWER
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
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT
          ]
       },
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
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
          ]
       },
       unique: [ 
          ARAMBAI,
          ELITE_ARAMBAI,
          HOWDAH,
          MANIPUR_CAVALRY
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Byzantines: { 
       disabled: { 
          units: [ 
             HEAVY_SCORPION,
             SIEGE_ONAGER
          ],
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
          units: [ 
             ARBALESTER,
             HAND_CANNONEER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             FAST_FIRE_SHIP,
             ELITE_CANNON_GALLEON,
             BOMBARD_CANNON
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
          units: [ 
             HAND_CANNONEER,
             HUSSAR,
             PALADIN,
             FAST_FIRE_SHIP,
             ELITE_CANNON_GALLEON,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             HERESY,
             HOARDINGS,
             SIEGE_ENGINEERS,
             TREADMILL_CRANE,
             GUILDS,
             CROP_ROTATION
          ]
       },
       unique: [ 
          CHU_KO_NU,
          ELITE_CHU_KO_NU,
          GREAT_WALL,
          ROCKETRY
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Cumans: { 
       enabled: { 
          units: [ 
             STEPPE_LANCER,
             ELITE_STEPPE_LANCER
          ]
       },
       disabled: { 
          buildings: [ 
             GATE,
             STONE_WALL,
             FORTIFIED_WALL,
             GUARD_TOWER,
             KEEP,
             BOMBARD_TOWER
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
          ]
       },
       unique: [ 
          KIPCHAK,
          ELITE_KIPCHAK,
          STEPPE_HUSBANDRY,
          CUMAN_MERCENARIES
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Ethiopians: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          units: [ 
             HAND_CANNONEER,
             CHAMPION,
             PALADIN,
             FAST_FIRE_SHIP,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP
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
          ]
       },
       unique: [ 
          SHOTEL_WARRIOR,
          ELITE_SHOTEL_WARRIOR,
          ROYAL_HEIRS,
          TORSION_ENGINES
       ],
       monkPrefix: MONK_PREFIX_AFRICAN
    },
    Franks: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
          ],
          units: [ 
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             HUSSAR,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM,
             SIEGE_ONAGER
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
          units: [ 
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM,
             SIEGE_ONAGER
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
       enabled: { 
          units: [ 
             EAGLE_SCOUT,
             EAGLE_WARRIOR,
             ELITE_EAGLE_WARRIOR,
             SLINGER
          ]
       },
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          units: [ 
             HAND_CANNONEER,
             CANNON_GALLEON,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ],
          techs: [ 
             BOMBARD_TOWER,
             ATONEMENT,
             FERVOR,
             ARCHITECTURE,
             TWO_MAN_SAW
          ]
       },
       unique: [ 
          KAMAYUK,
          ELITE_KAMAYUK,
          ANDEAN_SLING,
          COURIERS
       ],
       monkPrefix: MONK_PREFIX_MESO
    },
    Indians: { 
       enabled: { 
          units: [ 
             IMPERIAL_CAMEL_RIDER
          ]
       },
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
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
          ]
       },
       unique: [ 
          ELEPHANT_ARCHER,
          ELITE_ELEPHANT_ARCHER,
          SULTANS,
          SHATAGNI
       ],
       monkPrefix: MONK_PREFIX_AFRICAN
    },
    Italians: { 
       enabled: { 
          units: [ 
             CONDOTTIERO
          ]
       },
       disabled: { 
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
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             HERESY,
             SAPPERS,
             SIEGE_ENGINEERS,
             GOLD_SHAFT_MINING
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
          units: [ 
             HUSSAR,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             HEAVY_DEMO_SHIP,
             SIEGE_RAM,
             SIEGE_ONAGER,
             BOMBARD_CANNON
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
          ]
       },
       unique: [ 
          SAMURAI,
          ELITE_SAMURAI,
          YASAMA,
          KATAPARUTO
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Khmer: { 
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT
          ]
       },
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          units: [ 
             CHAMPION,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             PALADIN,
             HEAVY_DEMO_SHIP,
             SIEGE_ONAGER
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
          ]
       },
       unique: [ 
          BALLISTA_ELEPHANT,
          ELITE_BALLISTA_ELEPHANT,
          TUSK_SWORDS,
          DOUBLE_CROSSBOW
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Koreans: { 
       enabled: { 
          units: [ 
             TURTLE_SHIP,
             ELITE_TURTLE_SHIP
          ]
       },
       disabled: { 
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
          ],
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
          ]
       },
       unique: [ 
          WAR_WAGON,
          ELITE_WAR_WAGON,
          PANOKSEON,
          SHINKICHON
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Lithuanians: { 
       disabled: { 
          units: [ 
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             SIEGE_RAM,
             SIEGE_ONAGER,
             HEAVY_SCORPION,
             HEAVY_DEMO_SHIP
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             PLATE_MAIL_ARMOR,
             SHIPWRIGHT,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             SAPPERS,
             GOLD_SHAFT_MINING
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
          units: [ 
             HAND_CANNONEER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             ELITE_CANNON_GALLEON,
             HEAVY_DEMO_SHIP,
             SIEGE_RAM,
             SIEGE_ONAGER,
             BOMBARD_CANNON
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
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT
          ]
       },
       disabled: { 
          buildings: [ 
             FORTIFIED_WALL
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
          ]
       },
       unique: [ 
          KARAMBIT_WARRIOR,
          ELITE_KARAMBIT_WARRIOR,
          THALASSOCRACY,
          FORCED_LEVY
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Malians: { 
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          units: [ 
             HALBERDIER,
             HUSSAR,
             PALADIN,
             GALLEON,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM,
             HEAVY_SCORPION
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
          ]
       },
       unique: [ 
          GBETO,
          ELITE_GBETO,
          TIGUI,
          FARIMBA
       ],
       monkPrefix: MONK_PREFIX_AFRICAN
    },
    Mayans: { 
       disableHorses: true,
       enabled: { 
          units: [ 
             EAGLE_SCOUT,
             EAGLE_WARRIOR,
             ELITE_EAGLE_WARRIOR
          ]
       },
       disabled: { 
          buildings: [ 
             BOMBARD_TOWER
          ],
          units: [ 
             HAND_CANNONEER,
             CHAMPION,
             CANNON_GALLEON,
             ELITE_CANNON_GALLEON,
             SIEGE_ONAGER,
             BOMBARD_CANNON
          ],
          techs: [ 
             BOMBARD_TOWER,
             REDEMPTION,
             ILLUMINATION,
             SIEGE_ENGINEERS,
             ARROWSLITS,
             GOLD_SHAFT_MINING
          ]
       },
       unique: [ 
          PLUMED_ARCHER,
          ELITE_PLUMED_ARCHER,
          OBSIDIAN_ARROWS,
          EL_DORADO
       ],
       monkPrefix: MONK_PREFIX_MESO
    },
    Mongols: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
          ],
          units: [ 
             HAND_CANNONEER,
             HALBERDIER,
             PALADIN,
             ELITE_CANNON_GALLEON,
             BOMBARD_CANNON
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
          ]
       },
       unique: [ 
          MANGUDAI,
          ELITE_MANGUDAI,
          NOMADS,
          DRILL
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Persians: { 
       disabled: { 
          buildings: [ 
             FORTIFIED_WALL,
             KEEP,
             BOMBARD_TOWER
          ],
          units: [ 
             ARBALESTER,
             TWO_HANDED_SWORDSMAN,
             CHAMPION,
             SIEGE_ONAGER
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
          ]
       },
       unique: [ 
          WAR_ELEPHANT,
          ELITE_WAR_ELEPHANT,
          KAMANDARAN,
          MAHOUTS
       ],
       monkPrefix: MONK_PREFIX_AFRICAN
    },
    Portuguese: { 
       enabled: { 
          buildings: [ 
             FEITORIA
          ],
          units: [ 
             CARAVEL,
             ELITE_CARAVEL
          ]
       },
       disabled: { 
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
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             SQUIRES,
             SHIPWRIGHT,
             ILLUMINATION,
             HOARDINGS,
             ARROWSLITS,
             GOLD_SHAFT_MINING
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
          units: [ 
             HALBERDIER,
             CAVALIER,
             PALADIN,
             FAST_FIRE_SHIP,
             HEAVY_SCORPION
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
          ]
       },
       unique: [ 
          MAMELUKE,
          ELITE_MAMELUKE,
          MADRASAH,
          ZEALOTRY
       ],
       monkPrefix: MONK_PREFIX_AFRICAN
    },
    Slavs: { 
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
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
       enabled: { 
          units: [ 
             MISSIONARY
          ]
       },
       disabled: { 
          units: [ 
             CROSSBOWMAN,
             ARBALESTER,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             SIEGE_ONAGER,
             HEAVY_SCORPION
          ],
          techs: [ 
             PARTHIAN_TACTICS,
             SIEGE_ENGINEERS,
             HEATED_SHOT,
             TREADMILL_CRANE,
             GOLD_SHAFT_MINING,
             CROP_ROTATION
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
       enabled: { 
          units: [ 
             STEPPE_LANCER,
             ELITE_STEPPE_LANCER
          ]
       },
       disabled: { 
          buildings: [ 
             KEEP
          ],
          units: [ 
             ARBALESTER,
             CHAMPION,
             HALBERDIER,
             PALADIN,
             SIEGE_ONAGER,
             BOMBARD_CANNON,
             HEAVY_DEMO_SHIP
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
          units: [ 
             ARBALESTER,
             HEAVY_CAV_ARCHER,
             LIGHT_CAVALRY,
             HUSSAR,
             CAMEL_RIDER,
             HEAVY_CAMEL_RIDER,
             ELITE_CANNON_GALLEON,
             SIEGE_RAM
          ],
          techs: [ 
             THUMB_RING,
             PARTHIAN_TACTICS,
             HUSBANDRY,
             DRY_DOCK,
             SHIPWRIGHT,
             BRACER,
             ARCHITECTURE,
             GOLD_SHAFT_MINING
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
          units: [ 
             ARBALESTER,
             ELITE_SKIRMISHER,
             PIKEMAN,
             HALBERDIER,
             PALADIN,
             FAST_FIRE_SHIP,
             ONAGER,
             SIEGE_ONAGER
          ],
          techs: [ 
             HERBAL_MEDICINE,
             ILLUMINATION,
             BLOCK_PRINTING,
             STONE_SHAFT_MINING,
             CROP_ROTATION,
             SIEGE_ENGINEERS
          ]
       },
       unique: [ 
          JANISSARY,
          ELITE_JANISSARY,
          SIPAHI,
          ARTILLERY
       ],
       monkPrefix: MONK_PREFIX_AFRICAN
    },
    Vietnamese: { 
       enabled: { 
          units: [ 
             BATTLE_ELEPHANT,
             ELITE_BATTLE_ELEPHANT,
             IMPERIAL_SKIRMISHER
          ]
       },
       disabled: { 
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
          ],
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
          ]
       },
       unique: [ 
          RATTAN_ARCHER,
          ELITE_RATTAN_ARCHER,
          CHATRAS,
          PAPER_MONEY
       ],
       monkPrefix: MONK_PREFIX_ASIAN
    },
    Vikings: { 
       enabled: { 
          units: [ 
             LONGBOAT,
             ELITE_LONGBOAT
          ]
       },
       disabled: { 
          buildings: [ 
             KEEP,
             BOMBARD_TOWER
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
