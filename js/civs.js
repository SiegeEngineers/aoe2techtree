function civ(name, tree) {
    resetToDefault(tree);
    switch (name) {
        case "Aztecs":
            disableHorses(tree);
            enable([], ["Eagle Scout", "Eagle Warrior", "Elite Eagle Warrior"], []);
            disable(["Keep", "Bombard Tower"],
                ["Hand Cannoneer", "Halberdier",
                    "Cannon Galleon", "Elite Cannon Galleon", "Heavy Demo Ship", "Galleon", "Heavy Scorpion",
                    "Bombard Cannon"],
                ["Thumb Ring", "Parthian Tactics", "Hoardings", "Ring Archer Armor", "Masonry", "Architecture",
                    "Bombard Tower", "Keep", "Two-Man Saw", "Guilds"]);
            unique(["Jaguar Warrior", "Elite Jaguar Warrior", "Atlatl", "Garland Wars"], "meso_");
            break;
        case "Berbers":
            enable([], ["Genitour", "Elite Genitour"], []);
            disable(["Bombard Tower", "Keep"],
                ["Halberdier", "Paladin", "Siege Ram", "Siege Onager"],
                ["Parthian Tactics", "Shipwright", "Sanctity", "Block Printing", "Sappers", "Architecture",
                    "Bombard Tower", "Keep", "Two-Man Saw"]);
            unique(["Camel Archer", "Elite Camel Archer", "Kasbah", "Maghrabi Camels"], "african_");
            break;
        case "Britons":
            disable(["Bombard Tower"],
                ["Hand Cannoneer", "Hussar", "Paladin", "Camel", "Heavy Camel", "Elite Cannon Galleon", "Siege Ram",
                    "Siege Onager", "Bombard Cannon"],
                ["Thumb Ring", "Parthian Tactics", "Bloodlines", "Redemption", "Atonement", "Heresy", "Bombard Tower",
                    "Treadmill Crane", "Stone Shaft Mining", "Crop Rotation"]);
            unique(["Longbowman", "Elite Longbowman", "Yeomen", "Warwolf"]);
            break;
        case "Burmese":
            enable([], ["Battle Elephant", "Elite Battle Elephant"], []);
            disable([],
                ["Arbalest", "Hand Cannoneer", "Camel", "Heavy Camel", "Paladin", "Fast Fire Ship", "Heavy Demo Ship",
                    "Siege Ram", "Siege Onager"],
                ["Thumb Ring", "Shipwright", "Heresy", "Hoardings", "Sappers", "Leather Archer Armor",
                    "Ring Archer Armor", "Bombard Tower", "Arrowslits", "Stone Shaft Mining"]);
            unique(["Arambai", "Elite Arambai", "Howdah", "Manipur Cavalry"], "asian_");
            break;
        case "Byzantines":
            disable([],
                ["Heavy Scorpion", "Siege Onager"],
                ["Parthian Tactics", "Bloodlines", "Herbal Medicine", "Sappers", "Blast Furnace", "Masonry",
                    "Architecture", "Siege Engineers", "Heated Shot", "Treadmill Crane"]);
            unique(["Cataphract", "Elite Cataphract", "Greek Fire", "Logistica"]);
            break;
        case "Celts":
            disable(["Bombard Tower"],
                ["Arbalest", "Hand Cannoneer", "Camel", "Heavy Camel", "Fast Fire Ship", "Elite Cannon Galleon",
                    "Bombard Cannon"],
                ["Thumb Ring", "Parthian Tactics", "Squires", "Bloodlines", "Redemption", "Illumination", "Atonement",
                    "Block Printing", "Theocracy", "Ring Archer Armor", "Bracer", "Plate Barding Armor", "Architecture",
                    "Bombard Tower", "Two-Man Saw", "Crop Rotation"]);
            unique(["Woad Raider", "Elite Woad Raider", "Stronghold", "Furor Celtica"]);
            break;
        case "Chinese":
            disable([],
                ["Hand Cannoneer", "Hussar", "Paladin", "Fast Fire Ship", "Elite Cannon Galleon", "Siege Onager",
                    "Bombard Cannon"],
                ["Parthian Tactics", "Heresy", "Block Printing", "Hoardings", "Siege Engineers", "Treadmill Crane",
                    "Guilds", "Crop Rotation"]);
            unique(["Chu Ko Nu", "Elite Chu Ko Nu", "Great Wall", "Rocketry"], "asian_");
            break;
        case "Ethiopians":
            disable(["Bombard Tower"],
                ["Hand Cannoneer", "Champion", "Paladin", "Fast Fire Ship", "Elite Cannon Galleon", "Heavy Demo Ship"],
                ["Parthian Tactics", "Bloodlines", "Redemption", "Block Printing", "Hoardings", "Plate Barding Armor",
                    "Treadmill Crane", "Arrowslits", "Bombard Tower", "Crop Rotation"]);
            unique(["Shotel Warrior", "Elite Shotel Warrior", "Royal Heirs", "Torsion Engines"], "african_");
            break;
        case "Franks":
            disable(["Keep", "Bombard Tower"],
                ["Arbalest", "Camel", "Heavy Camel", "Hussar", "Elite Cannon Galleon", "Siege Ram", "Siege Onager",],
                ["Thumb Ring", "Parthian Tactics", "Bloodlines", "Shipwright", "Redemption", "Atonement", "Sappers",
                    "Ring Archer Armor", "Bracer", "Heated Shot", "Keep", "Bombard Tower", "Stone Shaft Mining",
                    "Two-Man Saw", "Guilds"]);
            unique(["Throwing Axeman", "Elite Throwing Axeman", "Chivalry", "Bearded Axe"]);
            break;
        case "Goths":
            disable(["Guard Tower", "Keep", "Bombard Tower", "Gate", "Stone Wall", "Fortified Wall"],
                ["Arbalest", "Camel", "Heavy Camel", "Paladin", "Elite Cannon Galleon", "Siege Ram", "Siege Onager"],
                ["Thumb Ring", "Parthian Tactics", "Dry Dock", "Keep", "Bombard Tower", "Fortified Wall", "Redemption",
                    "Atonement", "Block Printing", "Heresy", "Hoardings", "Plate Barding Armor", "Plate Mail Armor",
                    "Siege Engineers", "Treadmill Crane", "Arrowslits", "Gold Shaft Mining"]);
            unique(["Huskarl", "Elite Huskarl", "Anarchy", "Perfusion"]);
            break;
        case "Huns":
            disable(["Guard Tower", "Keep", "Bombard Tower", "Fortified Wall"],
                ["Arbalest", "Hand Cannoneer", "Champion", "Camel", "Heavy Camel", "Fast Fire Ship", "Cannon Galleon",
                    "Elite Cannon Galleon", "Onager", "Siege Onager", "Heavy Scorpion", "Bombard Cannon"],
                ["Shipwright", "Guard Tower", "Keep", "Bombard Tower", "Redemption", "Herbal Medicine",
                    "Block Printing", "Theocracy", "Hoardings", "Ring Archer Armor", "Plate Mail Armor",
                    "Fortified Wall", "Heated Shot", "Treadmill Crane", "Architecture", "Siege Engineers",
                    "Arrowslits", "Stone Shaft Mining", "Crop Rotation"]);
            unique(["Tarkan", "Elite Tarkan", "Marauders", "Atheism"]);
            break;
        case "Incas":
            disableHorses(tree);
            enable([], ["Eagle Scout", "Eagle Warrior", "Elite Eagle Warrior"], []);
            enable([], ["Slinger"], []);
            disable(["Bombard Tower"],
                ["Hand Cannoneer", "Cannon Galleon", "Elite Cannon Galleon", "Heavy Demo Ship", "Siege Onager",
                    "Bombard Cannon"],
                ["Bombard Tower", "Atonement", "Fervor", "Architecture", "Two-Man Saw"]);
            unique(["Kamayuk", "Elite Kamayuk", "Andean Sling", "Couriers"], "meso_");
            break;
        case "Indians":
            enable([], ["Imperial Camel"], []);
            disable(["Keep", "Bombard Tower"],
                ["Arbalest", "Knight", "Cavalier", "Paladin", "Fast Fire Ship", "Heavy Scorpion", "Siege Ram",
                    "Siege Onager"],
                ["Shipwright", "Keep", "Bombard Tower", "Atonement", "Heresy", "Sappers", "Plate Mail Armor",
                    "Architecture", "Arrowslits", "Treadmill Crane", "Crop Rotation"]);
            unique(["Elephant Archer", "Elite Elephant Archer", "Sultans", "Shatagni"], "african_");
            break;
        case "Italians":
            enable([], ["Condottiero"], []);
            disable([],
                ["Heavy Cav Archer", "Halberdier", "Camel", "Heavy Camel", "Paladin", "Heavy Demo Ship",
                    "Heavy Scorpion", "Siege Ram", "Siege Onager"],
                ["Parthian Tactics", "Heresy", "Sappers", "Siege Engineers", "Gold Shaft Mining"]);
            unique(["Genoese Crossbowman", "Elite Genoese Crossbowman", "Pavise", "Silk Road"]);
            break;
        case "Japanese":
            disable(["Bombard Tower",],
                ["Hussar", "Camel", "Heavy Camel", "Paladin", "Heavy Demo Ship", "Siege Ram", "Siege Onager",
                    "Bombard Cannon"],
                ["Bombard Tower", "Heresy", "Hoardings", "Sappers", "Plate Barding Armor", "Architecture",
                    "Heated Shot", "Stone Shaft Mining", "Guilds", "Crop Rotation"]);
            unique(["Samurai", "Elite Samurai", "Yasama", "Kataparuto"], "asian_");
            break;
        case "Khmer":
            enable([], ["Battle Elephant", "Elite Battle Elephant"], []);
            disable(["Bombard Tower"],
                ["Arbalest", "Champion", "Camel", "Heavy Camel", "Hussar", "Paladin", "Heavy Demo Ship", "Siege Onager"],
                ["Thumb Ring", "Squires", "Bombard Tower", "Atonement", "Heresy", "Faith", "Block Printing",
                    "Plate Mail Armor", "Arrowslits", "Two-Man Saw", "Guilds"]);
            unique(["Ballista Elephant", "Elite Ballista Elephant", "Tusk Swords", "Double Crossbow"], "asian_");
            break;
        case "Koreans":
            enable([], ["Turtle Ship", "Elite Turtle Ship"], []);
            disable([],
                ["Camel", "Heavy Camel", "Paladin", "Elite Cannon Galleon", "Demolition Raft", "Demolition Ship",
                    "Heavy Demo Ship", "Siege Ram", "Heavy Scorpion"],
                ["Parthian Tactics", "Bloodlines", "Redemption", "Atonement", "Heresy", "Illumination", "Hoardings",
                    "Sappers", "Blast Furnace", "Plate Barding Armor", "Crop Rotation"]);
            unique(["War Wagon", "Elite War Wagon", "Panokseon", "Shinkichon"], "asian_");
            break;
        case "Magyars":
            disable(["Keep", "Bombard Tower", "Fortified Wall"],
                ["Hand Cannoneer", "Camel", "Heavy Camel", "Elite Cannon Galleon", "Heavy Demo Ship", "Siege Ram",
                    "Siege Onager", "Bombard Cannon"],
                ["Squires", "Keep", "Bombard Tower", "Fortified Wall", "Redemption", "Atonement",
                    "Faith", "Plate Mail Armor", "Architecture", "Arrowslits", "Stone Shaft Mining", "Guilds"]);
            unique(["Magyar Huszar", "Elite Magyar Huszar", "Mercenaries", "Recurve Bow"]);
            break;
        case "Malay":
            enable([], ["Battle Elephant", "Elite Battle Elephant"], []);
            disable(["Fortified Wall"],
                ["Hand Cannoneer", "Heavy Cav Archer", "Champion", "Hussar", "Camel", "Heavy Camel", "Paladin",
                    "Heavy Demo Ship", "Siege Ram", "Siege Onager",],
                ["Parthian Tactics", "Bloodlines", "Fortified Wall", "Fervor", "Theocracy", "Hoardings",
                    "Chain Barding Armor", "Plate Barding Armor", "Architecture", "Arrowslits", "Treadmill Crane",
                    "Two-Man Saw"]);
            unique(["Karambit Warrior", "Elite Karambit Warrior", "Thalassocracy", "Forced Levy"], "asian_");
            break;
        case "Malians":
            disable(["Bombard Tower"],
                ["Halberdier", "Hussar", "Paladin", "Fast Fire Ship", "Elite Cannon Galleon", "Siege Ram",
                    "Heavy Scorpion"],
                ["Parthian Tactics", "Shipwright", "Bombard Tower", "Bracer", "Illumination", "Blast Furnace",
                    "Siege Engineers", "Arrowslits", "Two-Man Saw"]);
            unique(["Gbeto", "Elite Gbeto", "Tigui", "Farimba"], "african_");
            break;
        case "Mayans":
            disableHorses(tree);
            enable([], ["Eagle Scout", "Eagle Warrior", "Elite Eagle Warrior"], []);
            disable(["Bombard Tower"],
                ["Hand Cannoneer", "Champion", "Cannon Galleon", "Elite Cannon Galleon", "Siege Onager", "Bombard Cannon"],
                ["Bombard Tower", "Redemption", "Illumination", "Siege Engineers", "Arrowslits", "Gold Shaft Mining"]);
            unique(["Plumed Archer", "Elite Plumed Archer", "Obsidian Arrows", "El Dorado"], "meso_");
            break;
        case "Mongols":
            disable(["Keep", "Bombard Tower"],
                ["Hand Cannoneer", "Halberdier", "Paladin", "Elite Cannon Galleon", "Bombard Cannon"],
                ["Dry Dock", "Keep", "Bombard Tower", "Redemption", "Illumination", "Sanctity", "Block Printing",
                    "Theocracy", "Ring Archer Armor", "Plate Barding Armor", "Architecture", "Heated Shot",
                    "Treadmill Crane", "Arrowslits", "Two-Man Saw", "Guilds", "Crop Rotation"]);
            unique(["Mangudai", "Elite Mangudai", "Nomads", "Drill"], "asian_");
            break;
        case "Persians":
            disable(["Fortified Wall", "Keep", "Bombard Tower"],
                ["Arbalest", "Two-Handed Swordsman", "Champion", "Siege Onager"],
                ["Shipwright", "Fortified Wall", "Keep", "Bombard Tower", "Redemption", "Illumination", "Atonement",
                    "Heresy", "Sanctity", "Bracer", "Siege Engineers", "Arrowslits", "Treadmill Crane"]);
            unique(["War Elephant", "Elite War Elephant", "Boiling Oil", "Mahouts"], "african_");
            break;
        case "Portuguese":
            enable(["Feitoria"], [], []);
            disable([],
                ["Heavy Cav Archer", "Hussar", "Camel", "Heavy Camel", "Paladin", "Fast Fire Ship", "Siege Ram",
                    "Siege Onager", "Heavy Scorpion"],
                ["Parthian Tactics", "Squires", "Shipwright", "Illumination", "Hoardings", "Arrowslits",
                    "Gold Shaft Mining"]);
            unique(["Organ Gun", "Elite Organ Gun", "Carrack", "Arquebus"]);
            break;
        case "Saracens":
            disable(["Bombard Tower"],
                ["Halberdier", "Cavalier", "Paladin", "Fast Fire Ship", "Heavy Scorpion"],
                ["Shipwright", "Bombard Tower", "Sappers", "Architecture", "Heated Shot", "Stone Shaft Mining",
                    "Guilds", "Crop Rotation"]);
            unique(["Mameluke", "Elite Mameluke", "Madrasah", "Zealotry"], "african_");
            break;
        case "Slavs":
            disable(["Keep", "Bombard Tower"],
                ["Arbalest", "Hand Cannoneer", "Camel", "Heavy Camel", "Paladin", "Elite Cannon Galleon",
                    "Heavy Demo Ship", "Bombard Cannon"],
                ["Thumb Ring", "Parthian Tactics", "Shipwright", "Keep", "Bombard Tower", "Faith", "Heresy", "Bracer",
                    "Architecture", "Arrowslits", "Heated Shot", "Stone Shaft Mining", "Guilds"]);
            unique(["Boyar", "Elite Boyar", "Orthodoxy", "Druzhina"]);
            break;
        case "Spanish":
            enable([], ["Missionary"], []);
            disable([],
                ["Crossbowman", "Arbalest", "Camel", "Heavy Camel", "Siege Onager", "Heavy Scorpion"],
                ["Parthian Tactics", "Siege Engineers", "Heated Shot", "Treadmill Crane", "Gold Shaft Mining",
                    "Crop Rotation"]);
            unique(["Conquistador", "Elite Conquistador", "Inquisition", "Supremacy"]);
            break;
        case "Teutons":
            disable([],
                ["Arbalest", "Heavy Cav Archer", "Light Cavalry", "Hussar", "Camel", "Heavy Camel",
                    "Elite Cannon Galleon", "Siege Ram"],
                ["Thumb Ring", "Parthian Tactics", "Husbandry", "Dry Dock", "Shipwright", "Herbal Medicine", "Bracer",
                    "Architecture", "Gold Shaft Mining"]);
            unique(["Teutonic Knight", "Elite Teutonic Knight", "Ironclad", "Crenellations"]);
            break;
        case "Turks":
            disable([],
                ["Arbalest", "Elite Skirmisher", "Pikeman", "Halberdier", "Paladin", "Fast Fire Ship", "Onager",
                    "Siege Onager"],
                ["Herbal Medicine", "Illumination", "Block Printing", "Stone Shaft Mining", "Crop Rotation",
                    "Siege Engineers"]);
            unique(["Janissary", "Elite Janissary", "Sipahi", "Artillery"], "african_");
            break;
        case "Vietnamese":
            enable([], ["Battle Elephant", "Elite Battle Elephant", "Imperial Skirmisher"], []);
            disable([],
                ["Hand Cannoneer", "Hussar", "Paladin", "Camel", "Heavy Camel", "Fast Fire Ship", "Siege Ram",
                    "Siege Onager", "Heavy Scorpion",],
                ["Parthian Tactics", "Husbandry", "Shipwright", "Redemption", "Heresy", "Fervor", "Blast Furnace",
                    "Masonry", "Architecture", "Gold Shaft Mining"]);
            unique(["Rattan Archer", "Elite Rattan Archer", "Chatras", "Paper Money"], "asian_");
            break;
        case "Vikings":
            enable([], ["Longboat", "Elite Longboat"], []);
            disable(["Keep", "Bombard Tower"],
                ["Hand Cannoneer", "Heavy Cav Archer", "Halberdier", "Hussar", "Camel", "Heavy Camel", "Paladin",
                    "Fire Galley", "Fire Ship", "Fast Fire Ship", "Siege Onager", "Bombard Cannon"],
                ["Parthian Tactics", "Bloodlines", "Husbandry", "Shipwright", "Keep", "Bombard Tower", "Redemption",
                    "Herbal Medicine", "Sanctity", "Illumination", "Theocracy", "Plate Barding Armor",
                    "Stone Shaft Mining", "Guilds"]);
            unique(["Berserk", "Elite Berserk", "Chieftains", "Berserkergang"]);
            break;
    }
}