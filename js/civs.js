function civ(name, tree) {
    resetToDefault(tree);
    switch (name) {
        case "Aztecs":
            disableHorses(tree);
            enable(["Eagle Scout", "Eagle Warrior", "Elite Eagle Warrior"]);
            disable(["Hand Cannoneer", "Thumb Ring", "Parthian Tactics", "Halberdier",
                "Cannon Galleon", "Elite Cannon Galleon", "Heavy Demo Ship", "Galleon",
                "Keep", "Bombard Tower", "Hoardings", "Heavy Scorpion", "Bombard Cannon",
                "Ring Archer Armor", "Masonry", "Architecture", "Bombard Tower (Tech)",
                "Keep (Tech)", "Two-Man Saw", "Guilds"]);
            unique(["Jaguar Warrior", "Elite Jaguar Warrior", "Atlatl", "Garland Wars"], "meso_");
            break;
        case "Berbers":
            enable(["Genitour", "Elite Genitour"]);
            disable(["Halberdier", "Parthian Tactics", "Paladin", "Shipwright", "Keep",
                "Bombard Tower", "Sanctity", "Block Printing", "Sappers", "Siege Ram",
                "Siege Onager", "Architecture", "Bombard Tower (Tech)", "Keep (Tech)",
                "Two-Man Saw"]);
            unique(["Camel Archer", "Elite Camel Archer", "Kasbah", "Maghrabi Camels"], "african_");
            break;
        case "Britons":
            disable(["Thumb Ring", "Parthian Tactics", "Hand Cannoneer", "Hussar", "Bloodlines",
                "Paladin", "Camel", "Heavy Camel", "Elite Cannon Galleon", "Bombard Tower",
                "Redemption", "Atonement", "Heresy", "Siege Ram", "Siege Onager", "Bombard Cannon",
                "Bombard Tower (Tech)", "Treadmill Crane", "Stone Shaft Mining", "Crop Rotation"]);
            unique(["Longbowman", "Elite Longbowman", "Yeomen", "Warwolf"]);
            break;
        case "Burmese":
            enable(["Battle Elephant", "Elite Battle Elephant"]);
            disable(["Arbalest", "Hand Cannoneer", "Thumb Ring", "Camel", "Heavy Camel",
                "Paladin", "Fast Fire Ship", "Heavy Demo Ship", "Shipwright", "Heresy",
                "Hoardings", "Sappers", "Siege Ram", "Siege Onager", "Leather Archer Armor",
                "Ring Archer Armor", "Bombard Tower (Tech)", "Arrowslits", "Stone Shaft Mining"]);
            unique(["Arambai", "Elite Arambai", "Howdah", "Manipur Cavalry"], "asian_");
            break;
        case "Byzantines":
            disable(["Parthian Tactics", "Bloodlines", "Herbal Medicine", "Sappers", "Heavy Scorpion",
                "Siege Onager", "Blast Furnace", "Masonry", "Architecture", "Siege Engineers", "Heated Shot",
                "Treadmill Crane"]);
            unique(["Cataphract", "Elite Cataphract", "Greek Fire", "Logistica"]);
            break;
        case "Celts":
            disable(["Arbalest", "Hand Cannoneer", "Thumb Ring", "Parthian Tactics", "Squires", "Bloodlines",
                "Camel", "Heavy Camel", "Fast Fire Ship", "Elite Cannon Galleon", "Bombard Tower",
                "Redemption", "Illumination", "Atonement", "Block Printing", "Theocracy", "Bombard Cannon",
                "Ring Archer Armor", "Bracer", "Plate Barding Armor", "Architecture", "Bombard Tower (Tech)",
                "Two-Man Saw", "Crop Rotation"]);
            unique(["Woad Raider", "Elite Woad Raider", "Stronghold", "Furor Celtica"]);
            break;
        case "Chinese":
            disable(["Hand Cannoneer", "Parthian Tactics", "Hussar", "Paladin", "Fast Fire Ship",
                "Elite Cannon Galleon", "Heresy", "Block Printing", "Hoardings", "Siege Onager",
                "Bombard Cannon", "Siege Engineers", "Treadmill Crane", "Guilds", "Crop Rotation"]);
            unique(["Chu Ko Nu", "Elite Chu Ko Nu", "Great Wall", "Rocketry"], "asian_");
            break;
        case "Ethiopians":
            disable(["Hand Cannoneer", "Parthian Tactics", "Champion", "Bloodlines", "Paladin",
                "Fast Fire Ship", "Elite Cannon Galleon", "Heavy Demo Ship", "Bombard Tower", "Redemption",
                "Block Printing", "Hoardings", "Plate Barding Armor", "Treadmill Crane", "Arrowslits",
                "Bombard Tower (Tech)", "Crop Rotation"]);
            unique(["Shotel Warrior", "Elite Shotel Warrior", "Royal Heirs", "Torsion Engines"], "african_");
            break;
        case "Franks":
            disable(["Arbalest", "Thumb Ring", "Parthian Tactics", "Bloodlines", "Camel", "Heavy Camel",
                "Hussar", "Elite Cannon Galleon", "Shipwright", "Keep", "Bombard Tower", "Redemption",
                "Atonement", "Sappers", "Siege Ram", "Siege Onager", "Ring Archer Armor", "Bracer",
                "Heated Shot", "Keep (Tech)", "Bombard Tower (Tech)", "Stone Shaft Mining", "Two-Man Saw",
                "Guilds"]);
            unique(["Throwing Axeman", "Elite Throwing Axeman", "Chivalry", "Bearded Axe"]);
            break;
        case "Goths":
            disable(["Arbalest", "Thumb Ring", "Parthian Tactics", "Camel", "Heavy Camel", "Paladin",
                "Elite Cannon Galleon", "Dry Dock", "Guard Tower", "Keep", "Bombard Tower", "Keep (Tech)",
                "Bombard Tower (Tech)", "Gate", "Stone Wall", "Fortified Wall", "Fortified Wall (Tech)",
                "Redemption", "Atonement", "Block Printing", "Heresy", "Hoardings", "Siege Ram", "Siege Onager",
                "Plate Barding Armor", "Plate Mail Armor", "Siege Engineers", "Treadmill Crane", "Arrowslits",
                "Gold Shaft Mining"]);
            unique(["Huskarl", "Elite Huskarl", "Anarchy", "Perfusion"]);
            break;
        case "Huns":
            disable(["Arbalest", "Hand Cannoneer", "Champion", "Camel", "Heavy Camel", "Fast Fire Ship",
                "Cannon Galleon", "Elite Cannon Galleon", "Shipwright", "Guard Tower", "Keep", "Bombard Tower",
                "Guard Tower (Tech)", "Keep (Tech)", "Bombard Tower (Tech)", "Fortified Wall", "Redemption",
                "Herbal Medicine", "Block Printing", "Theocracy", "Hoardings", "Onager", "Siege Onager",
                "Heavy Scorpion", "Bombard Cannon", "Ring Archer Armor", "Plate Mail Armor", "Fortified Wall (Tech)",
                "Heated Shot", "Treadmill Crane", "Architecture", "Siege Engineers", "Arrowslits",
                "Stone Shaft Mining", "Crop Rotation"]);
            unique(["Tarkan", "Elite Tarkan", "Marauders", "Atheism"]);
            break;
        case "Incas":
            disableHorses(tree);
            enable(["Eagle Scout", "Eagle Warrior", "Elite Eagle Warrior"]);
            enable(["Slinger"]);
            disable(["Hand Cannoneer", "Cannon Galleon", "Elite Cannon Galleon", "Heavy Demo Ship",
                "Bombard Tower", "Bombard Tower (Tech)", "Atonement", "Fervor", "Siege Onager",
                "Bombard Cannon", "Architecture", "Two-Man Saw"]);
            unique(["Kamayuk", "Elite Kamayuk", "Andean Sling", "Couriers"], "meso_");
            break;
        case "Indians":
            enable(["Imperial Camel"]);
            disable(["Arbalest", "Knight", "Cavalier", "Paladin", "Fast Fire Ship", "Shipwright", "Keep",
                "Bombard Tower", "Keep (Tech)", "Bombard Tower (Tech)", "Atonement", "Heresy", "Sappers",
                "Heavy Scorpion", "Siege Ram", "Siege Onager", "Plate Mail Armor", "Architecture", "Arrowslits",
                "Treadmill Crane", "Crop Rotation"]);
            unique(["Elephant Archer", "Elite Elephant Archer", "Sultans", "Shatagni"], "african_");
            break;
        case "Italians":
            enable(["Condottiero"]);
            disable(["Heavy Cav Archer", "Parthian Tactics", "Halberdier", "Camel", "Heavy Camel", "Paladin",
                "Heavy Demo Ship", "Heresy", "Sappers", "Heavy Scorpion", "Siege Ram", "Siege Onager",
                "Siege Engineers", "Gold Shaft Mining"]);
            unique(["Genoese Crossbowman", "Elite Genoese Crossbowman", "Pavise", "Silk Road"]);
            break;
        case "Japanese":
            disable(["Hussar", "Camel", "Heavy Camel", "Paladin", "Heavy Demo Ship", "Bombard Tower",
                "Bombard Tower (Tech)", "Heresy", "Hoardings", "Sappers", "Siege Ram", "Siege Onager",
                "Bombard Cannon", "Plate Barding Armor", "Architecture", "Heated Shot", "Stone Shaft Mining",
                "Guilds", "Crop Rotation"]);
            unique(["Samurai", "Elite Samurai", "Yasama", "Kataparuto"], "asian_");
            break;
        case "Khmer":
            enable(["Battle Elephant", "Elite Battle Elephant"]);
            disable(["Arbalest", "Thumb Ring", "Champion", "Squires", "Camel", "Heavy Camel", "Hussar",
                "Paladin", "Heavy Demo Ship", "Bombard Tower", "Bombard Tower (Tech)", "Atonement", "Heresy",
                "Faith", "Block Printing", "Siege Onager", "Plate Mail Armor", "Arrowslits", "Two-Man Saw",
                "Guilds"]);
            unique(["Ballista Elephant", "Elite Ballista Elephant", "Tusk Swords", "Double Crossbow"], "asian_");
            break;
        case "Koreans":
            enable(["Turtle Ship", "Elite Turtle Ship"])
            disable(["Parthian Tactics", "Bloodlines", "Camel", "Heavy Camel", "Paladin", "Elite Cannon Galleon",
                "Demolition Raft", "Demolition Ship", "Heavy Demo Ship", "Redemption", "Atonement", "Heresy",
                "Illumination", "Hoardings", "Sappers", "Siege Ram", "Heavy Scorpion", "Blast Furnace",
                "Plate Barding Armor", "Crop Rotation"]);
            unique(["War Wagon", "Elite War Wagon", "Panokseon", "Shinkichon"], "asian_");
            break;
        case "Magyars":
            disable(["Hand Cannoneer", "Squires", "Camel", "Heavy Camel", "Elite Cannon Galleon", "Heavy Demo Ship",
                "Keep", "Bombard Tower", "Keep (Tech)", "Bombard Tower (Tech)", "Fortified Wall", "Fortified Wall (Tech)",
                "Redemption", "Atonement", "Faith", "Siege Ram", "Siege Onager", "Bombard Cannon", "Plate Mail Armor",
                "Architecture", "Arrowslits", "Stone Shaft Mining", "Guilds"]);
            unique(["Magyar Huszar", "Elite Magyar Huszar", "Mercenaries", "Recurve Bow"]);
            break;
        case "Malay":
            enable(["Battle Elephant", "Elite Battle Elephant"]);
            disable(["Hand Cannoneer", "Heavy Cav Archer", "Parthian Tactics", "Champion", "Bloodlines",
                "Hussar", "Camel", "Heavy Camel", "Paladin", "Heavy Demo Ship", "Fortified Wall", "Fortified Wall (Tech)",
                "Fervor", "Theocracy", "Hoardings", "Siege Ram", "Siege Onager", "Chain Barding Armor", "Plate Barding Armor",
                "Architecture", "Arrowslits", "Treadmill Crane", "Two-Man Saw"]);
            unique(["Karambit Warrior", "Elite Karambit Warrior", "Thalassocracy", "Forced Levy"], "asian_");
            break;
        case "Malians":
            disable(["Parthian Tactics", "Halberdier", "Hussar", "Paladin", "Fast Fire Ship", "Elite Cannon Galleon",
                "Shipwright", "Bombard Tower", "Bombard Tower (Tech)", "Illumination", "Siege Ram", "Heavy Scorpion",
                "Bracer", "Blast Furnace", "Siege Engineers", "Arrowslits", "Two-Man Saw"]);
            unique(["Gbeto", "Elite Gbeto", "Tigui", "Farimba"], "african_");
            break;
        case "Mayans":
            disableHorses(tree);
            enable(["Eagle Scout", "Eagle Warrior", "Elite Eagle Warrior"]);
            disable(["Hand Cannoneer", "Champion", "Cannon Galleon", "Elite Cannon Galleon", "Bombard Tower",
                "Bombard Tower (Tech)", "Redemption", "Illumination", "Siege Onager", "Bombard Cannon",
                "Siege Engineers", "Arrowslits", "Gold Shaft Mining"]);
            unique(["Plumed Archer", "Elite Plumed Archer", "Obsidian Arrows", "El Dorado"], "meso_");
            break;
        case "Mongols":
            disable(["Hand Cannoneer", "Halberdier", "Paladin", "Elite Cannon Galleon", "Dry Dock", "Keep",
                "Keep (Tech)", "Bombard Tower", "Bombard Tower (Tech)", "Redemption", "Illumination", "Sanctity",
                "Block Printing", "Theocracy", "Bombard Cannon", "Ring Archer Armor", "Plate Barding Armor",
                "Architecture", "Heated Shot", "Treadmill Crane", "Arrowslits", "Two-Man Saw", "Guilds", "Crop Rotation"]);
            unique(["Mangudai", "Elite Mangudai", "Nomads", "Drill"], "asian_");
            break;
        case "Persians":
            disable(["Arbalest", "Two-Handed Swordsman", "Champion", "Shipwright", "Fortified Wall", "Fortified Wall (Tech)",
                "Keep", "Bombard Tower", "Keep (Tech)", "Bombard Tower (Tech)", "Redemption", "Illumination", "Atonement",
                "Heresy", "Sanctity", "Siege Onager", "Bracer", "Siege Engineers", "Arrowslits", "Treadmill Crane"]);
            unique(["War Elephant", "Elite War Elephant", "Boiling Oil", "Mahouts"], "african_");
            break;
        case "Portuguese":
            enable(["Feitoria"]);
            disable(["Heavy Cav Archer", "Parthian Tactics", "Squires", "Hussar", "Camel", "Heavy Camel", "Paladin",
                "Fast Fire Ship", "Shipwright", "Illumination", "Hoardings", "Siege Ram", "Siege Onager", "Heavy Scorpion",
                "Arrowslits", "Gold Shaft Mining"]);
            unique(["Organ Gun", "Elite Organ Gun", "Carrack", "Arquebus"]);
            break;
        case "Saracens":
            disable(["Halberdier", "Cavalier", "Paladin", "Fast Fire Ship", "Shipwright", "Bombard Tower", "Bombard Tower (Tech)",
                "Sappers", "Heavy Scorpion", "Architecture", "Heated Shot", "Stone Shaft Mining", "Guilds", "Crop Rotation"]);
            unique(["Mameluke", "Elite Mameluke", "Madrasah", "Zealotry"], "african_");
            break;
        case "Slavs":
            disable(["Arbalest", "Hand Cannoneer", "Thumb Ring", "Parthian Tactics", "Camel", "Heavy Camel", "Paladin",
                "Elite Cannon Galleon", "Heavy Demo Ship", "Shipwright", "Keep", "Bombard Tower", "Keep (Tech)",
                "Bombard Tower (Tech)", "Faith", "Heresy", "Bombard Cannon", "Bracer", "Architecture", "Arrowslits",
                "Heated Shot", "Stone Shaft Mining", "Guilds"]);
            unique(["Boyar", "Elite Boyar", "Orthodoxy", "Druzhina"]);
            break;
        case "Spanish":
            enable(["Missionary"]);
            disable(["Crossbowman", "Arbalest", "Parthian Tactics", "Camel", "Heavy Camel", "Siege Onager",
                "Heavy Scorpion", "Siege Engineers", "Heated Shot", "Treadmill Crane", "Gold Shaft Mining",
                "Crop Rotation"]);
            unique(["Conquistador", "Elite Conquistador", "Inquisition", "Supremacy"]);
            break;
        case "Teutons":
            disable(["Arbalest", "Thumb Ring", "Heavy Cav Archer", "Parthian Tactics", "Light Cavalry", "Hussar",
                "Camel", "Heavy Camel", "Husbandry", "Elite Cannon Galleon", "Dry Dock", "Shipwright",
                "Herbal Medicine", "Siege Ram", "Bracer", "Architecture", "Gold Shaft Mining"]);
            unique(["Teutonic Knight", "Elite Teutonic Knight", "Ironclad", "Crenellations"]);
            break;
        case "Turks":
            disable(["Arbalest", "Elite Skirmisher", "Pikeman", "Halberdier", "Paladin", "Fast Fire Ship",
                "Herbal Medicine", "Illumination", "Block Printing", "Onager", "Siege Onager", "Siege Engineers",
                "Stone Shaft Mining", "Crop Rotation"]);
            unique(["Janissary", "Elite Janissary", "Sipahi", "Artillery"], "african_");
            break;
        case "Vietnamese":
            enable(["Battle Elephant", "Elite Battle Elephant", "Imperial Skirmisher"]);
            disable(["Hand Cannoneer", "Parthian Tactics", "Hussar", "Paladin", "Camel", "Heavy Camel",
                "Husbandry", "Fast Fire Ship", "Shipwright", "Redemption", "Heresy", "Fervor", "Siege Ram",
                "Siege Onager", "Heavy Scorpion", "Blast Furnace", "Masonry", "Architecture", "Gold Shaft Mining"]);
            unique(["Rattan Archer", "Elite Rattan Archer", "Chatras", "Paper Money"], "asian_");
            break;
        case "Vikings":
            enable(["Longboat", "Elite Longboat"]);
            disable(["Hand Cannoneer", "Heavy Cav Archer", "Parthian Tactics", "Halberdier", "Bloodlines", "Hussar",
                "Camel", "Heavy Camel", "Paladin", "Husbandry", "Fire Galley", "Fire Ship", "Fast Fire Ship",
                "Shipwright", "Keep", "Bombard Tower", "Keep (Tech)", "Bombard Tower (Tech)", "Redemption",
                "Herbal Medicine", "Sanctity", "Illumination", "Theocracy", "Siege Onager", "Bombard Cannon",
                "Plate Barding Armor", "Stone Shaft Mining", "Guilds"]);
            unique(["Berserk", "Elite Berserk", "Chieftains", "Berserkergang"]);
            break;
    }
}