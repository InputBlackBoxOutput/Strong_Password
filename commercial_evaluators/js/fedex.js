var args = process.argv.slice(2);
var fs = require('fs');
var rs = fs.createReadStream(args[0]);
var ws = fs.createWriteStream(args[1]);
var rl = require('readline').createInterface(rs,ws);
rl.on('line', function (line) {
        ws.write(line+'\t'+tryPs(line)+'\n');
});
rl.on('close', function() {
          ws.end();
          process.exit(0);
});
function tryPs(pass) {
        /* adapted from FedEx script */

        return PasswordTester.main(pass);
}
var PasswordTester = {setup: function(str) {
        this.strengthLevel = null;
        this.advice = null;
        this.passwordEntered = str;
        this.strengthIndicator = {};//document.getElementById('passwordStrength');
        this.indicatorClasses = new Array("invalid", "veryweak", "weak", "medium", "strong", "verystrong")
    },meetsMinStds: function(pWord) {
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
        //alert(pWord+': '+re.test(pWord));
        return re.test(pWord) && !this.hasFourRepeatingChars(pWord) && pWord.length >= 8
    },indexInArray: function(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val)
                return i
        }
        ;
        return -1
    },DictionaryLookup: function(pWord) {
        var entries = new Array("1234qwer", "abcdef", "abcdefg", "abcdefgh", "abcabc", "abc123", "a1b2c3", "a12345", "abcd1234", "a1b2c3d4", "azsxdcfv", "asdfqwer", "academia", "academic", "access", "adrian", "adrianna", "aerobics", "airplane", "albany", "albatross", "albert", "alexander", "algebra", "aliases", "alicia", "alison", "allison", "alphabet", "amadeus", "amanda", "amorphous", "analog", "anchor", "andrea", "andromache", "angela", "angerine", "animals", "annette", "answer", "anthropogenic", "anvils", "anything", "april", "ariadne", "arlene", "arthur", "asshole", "athena", "atmosphere", "aztecs", "bacchus", "badass", "bailey", "banana", "bananas", "basketball", "bandit", "barbara", "barber", "baritone", "bartman", "bassoon", "batman", "beater", "beauty", "beaver", "beethoven", "beloved", "beowulf", "berkeley", "berlin", "berliner", "betsie", "beverly", "bicameral", "bishop", "bradley", "brandi", "brandy", "brenda", "bridget", "broadway", "bumbling", "burgess", "camille", "campanile", "cantor", "cardinal", "carmen", "carole", "carolina", "caroline", "carrie", "carson", "cascades", "castle", "cat", "catherine", "cathy", "cayuga", "cecily", "celtics", "cerulean", "change", "charity", "charles", "charming", "charon", "chat", "chem", "chemistry", "chess", "chester", "christina", "christine", "christy", "classic", "claudia", "cluster", "clusters", "coffee", "C0ffee", "collins", "commrades", "computer", "comrade", "comrades", "condom", "connect", "connie", "console", "cookie", "cooper", "cornelius", "couscous", "create", "creation", "creosote", "cretin", "criminal", "cristina", "crystal", "cynthia", "daemon", "dancer", "daniel", "danielle", "dapper", "debbie", "deborah", "december", "default", "deluge", "denise", "desiree", "desperate", "develop", "device", "dieter", "digital", "discovery", "disney", "drought", "duncan", "easier", "edinburgh", "edwina", "egghead", "eiderdown", "eileen", "einstein", "elaine", "elanor", "elephant", "elizabeth", "emerald", "emily", "emmanuel", "enemy", "engine", "engineer", "enterprise", "enzyme", "erenity", "ersatz", "establish", "estate", "eternity", "euclid", "evelyn", "extension", "fairway", "felicia", "fender", "fermat", "ferrari", "fidelity", "finite", "fishers", "flakes", "flower", "flowers", "foolproof", "football", "foresight", "format", "forsythe", "fourier", "friend", "frighten", "function", "fungible", "gabriel", "gardner", "garfield", "george", "gertrude", "gibson", "ginger", "glacier", "golfer", "gorgeous", "gorges", "gosling", "graham", "gryphon", "guitar", "gumption", "guntis", "hacker", "hamlet", "handily", "happening", "harmony", "harold", "harvey", "hawaii", "heather", "hebrides", "heinlein", "herbert", "hiawatha", "hibernia", "hidden", "homework", "hutchins", "hydrogen", "imbroglio", "imperial", "include", "ingres", "ingress", "ingrid", "innocuous", "internet", "irishman", "jackie", "janice", "jasmin", "jeanne", "jennifer", "jessica", "jester", "jixian", "joanne", "johnny", "joseph", "joshua", "judith", "juggle", "jupiter", "karina", "kathleen", "kathrine", "katina", "katrina", "kermit", "kernel", "kerrie", "kimberly", "kirkland", "kitten", "knight", "krista", "kristen", "kristi", "kristie", "kristin", "kristine", "kristy", "lambda", "lamination", "larkin", "lazarus", "lebesgue", "leland", "leslie", "library", "lockout", "lorraine", "macintosh", "maggot", "malcolm", "malcom", "manager", "marietta", "markus", "marvin", "master", "maurice", "meagan", "melissa", "mellon", "memory", "mercury", "merlin", "michael", "michele", "michelle", "mickey", "minimum", "minsky", "moguls", "monica", "morley", "mozart", "mutant", "napoleon", "nepenthe", "neptune", "network", "newton", "nicole", "nobody", "noreen", "noxious", "nuclear", "nutrition", "nyquist", "oceanography", "ocelot", "office", "olivetti", "olivia", "open", "operator", "oracle", "orca", "orwell", "osiris", "outlaw", "oxford", "pacific", "painless", "pakistan", "pamela", "papers", "password", "patricia", "pencil", "penelope", "penguin", "peoria", "percolate", "persimmon", "persona", "pete", "peter", "philip", "phoenix", "phone", "pierre", "playboy", "plover", "plymouth", "polynomial", "pondering", "porsche", "poster", "praise", "precious", "prelude", "presto", "prince", "princeton", "private", "professor", "profile", "program", "protect", "protozoa", "public", "pumpkin", "puneet", "puppet", "qwerty", "qawsed", "rabbit", "rachel", "rachelle", "rachmaninoff", "rainbow", "raindrop", "raleigh", "rascal", "reagan", "really", "rebecca", "regional", "remote", "ripple", "robotics", "rochelle", "rochester", "rodent", "romano", "ronald", "rosebud", "rosemary", "samantha", "sandra", "saturn", "scamper", "scheme", "school", "scotty", "secret", "security", "sensor", "serenity", "service", "sesame", "shannon", "sharks", "sharon", "sheffield", "sheldon", "sherri", "shirley", "shivers", "shuttle", "signature", "simple", "simpsons", "singer", "single", "smiles", "smooch", "smother", "snatch", "snoopy", "socrates", "somebody", "sondra", "sossina", "sparrows", "spring", "springer", "squires", "stacey", "stacie", "stephanie", "strangle", "stratford", "student", "stuttgart", "subway", "success", "summer", "superstage", "superuser", "support", "supported", "surfer", "susanne", "suzanne", "swearer", "symmetry", "sysadmin", "system", "tamara", "tangerine", "target", "tarragon", "taylor", "telephone", "temptation", "testtest", "tennis", "terminal", "thailand", "theresa", "tiffany", "toggle", "tomato", "topography", "tortoise", "toyota", "tracie", "trails", "transfer", "trisha", "trivial", "trombone", "tuttle", "tidewater", "testament", "territory", "tennessee", "tarantula", "tarantara", "unhappy", "unicorn", "unknown", "uranus", "urchin", "ursula", "utility", "valerie", "vasant", "veronica", "vertigo", "venomous", "vitamin", "vitriol", "vitrify", "vitiate", "village", "virgin", "virginia", "visitor", "vitriolic", "ventricle", "ventilate", "valentine", "wargames", "warren", "weenie", "whatever", "whatnot", "whiting", "whistler", "whitney", "wholesale", "william", "williamsburg", "willie", "winston", "wisconsin", "wizard", "wombat", "woodwind", "wormwood", "wyoming", "xmodem", "yellowstone", "yolanda", "yosemite", "yankee", "yamaha", "yakima", "y7u8i9", "zimmerman", "zmodem");
        var subWord = this.getSubWord(pWord);
        if (this.indexInArray(entries, subWord) > -1)
            return true;
        else
            return false
    },contains: function(arr, val) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] === val)
                return true;
        return false
    },countUniqueChars: function(val) {
        var seenChars = new Array();
        if (!val || val.length < 1)
            return 0;
        for (i = 0; i < val.length; i++) {
            if (!this.contains(seenChars, val.substring(i, i + 1)))
                seenChars.push(val.substring(i, i + 1))
        }
        return seenChars.length
    },hasFourRepeatingChars: function(val) {
        if (!val || val.length > 3) {
            for (i = 3; i < val.length; i++) {
                var ch = val.charAt(i);
                if ((ch == val.charAt(i - 1)) && (ch == val.charAt(i - 2)) && (ch == val.charAt(i - 3)))
                    return true
            }
        }
        return false
    },hasSpecialChars: function(pWord) {
        var reSpecial = /[!@#$%^&*?~]/;
        return reSpecial.test(pWord)
    },SubstituteMap: function() {
        this.characters = new Array("e", "s", "s", "g", "t", "b", "l", "g", "t", "a", "o", "l", "z", "i", "i");
        this.substitutions = new Array("3", "5", "$", "6", "7", "8", "|", "9", "+", "@", "0", "1", "2", "!", "1");
        this.subLookup = function(in_substitute) {
            var subCharacter = 0;
            var index = -1;
            for (var i = 0; i < this.substitutions.length; i++) {
                if (this.substitutions[i] == in_substitute)
                    index = i
            }
            if (index >= 0) {
                subCharacter = this.characters[index]
            } else {
            }
            return subCharacter
        }
    },getSubWord: function(pWord) {
        var subMap = new this.SubstituteMap();
        var charSub = 0;
        var subWord = "";
        var length = 0;
        if ((pWord != null) && (pWord.length > 0)) {
            subWord = pWord.toLowerCase();
            length = subWord.length;
            for (var index = 0; index < length; index++) {
                charSub = subMap.subLookup(subWord.charAt(index));
                if (charSub != 0) {
                    subWord = subWord.substring(0, index) + charSub + subWord.substring(index + 1, length)
                } else {
                }
            }
        } else {
        }
        return subWord
    },test: function() {
        if ((this.passwordEntered == null) || (this.passwordEntered.length == 0)) {
            this.strengthLevel = 0
        } else if ((this.passwordEntered.length >= 10) && (this.meetsMinStds(this.passwordEntered)) && this.countUniqueChars(this.passwordEntered) >= 6 && (!this.DictionaryLookup(this.passwordEntered))) {
            this.strengthLevel = 5
        } else if (this.passwordEntered.length >= 9 && this.meetsMinStds(this.passwordEntered) && this.hasSpecialChars(this.passwordEntered) && this.countUniqueChars(this.passwordEntered) >= 6 && (!this.DictionaryLookup(this.passwordEntered))) {
            this.strengthLevel = 5
        } else if (this.passwordEntered.length >= 9 && this.meetsMinStds(this.passwordEntered) && this.countUniqueChars(this.passwordEntered) >= 6 && (!this.DictionaryLookup(this.passwordEntered))) {
            this.strengthLevel = 4
        } else if (this.meetsMinStds(this.passwordEntered) && this.countUniqueChars(this.passwordEntered) >= 4 && !this.DictionaryLookup(this.passwordEntered)) {
            this.strengthLevel = 3
        } else if (this.meetsMinStds(this.passwordEntered)) {
            this.strengthLevel = 2
        } else {
            this.strengthLevel = 1
        }
    },advise: function() {
        /*this.strengthIndicator.className = */

        return this.indicatorClasses[this.strengthLevel];

        /*if (this.strengthLevel == 2 || this.strengthLevel == 3) {
            show("pwdMetrYellow")
        } else if (this.strengthLevel == 4 || this.strengthLevel == 5) {
            show("pwdMetrGreen")
        }*/
    },main: function(str) {
        hide("pwdMetrYellow");
        hide("pwdMetrGreen");
        this.setup(str);
        this.test();
        return this.advise()
    }};
function show(id) {
    /*if (document.getElementById) {
        document.getElementById(id).style.display = "block"
    } else if (document.all) {
        document.all[id].style.display = "block"
    } else if (document.layers) {
        document.layers[id].display = "block"
    }*/
}
function hide(id) {
    /*if (document.getElementById) {
        document.getElementById(id).style.display = "none"
    } else if (document.all) {
        document.all[id].style.display = "none"
    } else if (document.layers) {
        document.layers[id].display = "none"
    }*/
}
