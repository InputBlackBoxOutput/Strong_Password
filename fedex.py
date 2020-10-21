# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 26 Sept 2020
#-----------------------------------------------------------------------------------------------------
from passwd import PasswordFeatures

'''
Used by Fedex (Shipping company)
Grading: 1-Very Weak 2-Weak 3-Medium 4-Strong 5-Very Strong
'''

class SubstituteMap:
    def __init__(self):
        self.characters = ["e", "s", "s", "g", "t", "b", "l", "g", "t", "a", "o", "l", "z", "i", "i"]
        self.substitutions = ["3", "5", "$", "6", "7", "8", "|", "9", "+", "@", "0", "1", "2", "!", "1"]
    
    def subLookup(self, in_substitute):
        subCharacter = 0
        index = -1
        for i in range(len(self.substitutions)):
            if (self.substitutions[i] == in_substitute):
                index = i
        
        if (index >= 0):
            subCharacter = self.characters[index]
        
        return subCharacter

class Fedex(PasswordFeatures):
    def __init__(self, password):
        super().__init__(password)
        self.dictonary = ["1234qwer", "abcdef", "abcdefg", "abcdefgh", "abcabc", "abc123", "a1b2c3", "a12345", "abcd1234", "a1b2c3d4", "azsxdcfv", "asdfqwer", "academia", "academic", "access", "adrian", "adrianna", "aerobics", "airplane", "albany", "albatross", "albert", "alexander", "algebra", "aliases", "alicia", "alison", "allison", "alphabet", "amadeus", "amanda", "amorphous", "analog", "anchor", "andrea", "andromache", "angela", "angerine", "animals", "annette", "answer", "anthropogenic", "anvils", "anything", "april", "ariadne", "arlene", "arthur", "asshole", "athena", "atmosphere", "aztecs", "bacchus", "badass", "bailey", "banana", "bananas", "basketball", "bandit", "barbara", "barber", "baritone", "bartman", "bassoon", "batman", "beater", "beauty", "beaver", "beethoven", "beloved", "beowulf", "berkeley", "berlin", "berliner", "betsie", "beverly", "bicameral", "bishop", "bradley", "brandi", "brandy", "brenda", "bridget", "broadway", "bumbling", "burgess", "camille", "campanile", "cantor", "cardinal", "carmen", "carole", "carolina", "caroline", "carrie", "carson", "cascades", "castle", "cat", "catherine", "cathy", "cayuga", "cecily", "celtics", "cerulean", "change", "charity", "charles", "charming", "charon", "chat", "chem", "chemistry", "chess", "chester", "christina", "christine", "christy", "classic", "claudia", "cluster", "clusters", "coffee", "C0ffee", "collins", "commrades", "computer", "comrade", "comrades", "condom", "connect", "connie", "console", "cookie", "cooper", "cornelius", "couscous", "create", "creation", "creosote", "cretin", "criminal", "cristina", "crystal", "cynthia", "daemon", "dancer", "daniel", "danielle", "dapper", "debbie", "deborah", "december", "default", "deluge", "denise", "desiree", "desperate", "develop", "device", "dieter", "digital", "discovery", "disney", "drought", "duncan", "easier", "edinburgh", "edwina", "egghead", "eiderdown", "eileen", "einstein", "elaine", "elanor", "elephant", "elizabeth", "emerald", "emily", "emmanuel", "enemy", "engine", "engineer", "enterprise", "enzyme", "erenity", "ersatz", "establish", "estate", "eternity", "euclid", "evelyn", "extension", "fairway", "felicia", "fender", "fermat", "ferrari", "fidelity", "finite", "fishers", "flakes", "flower", "flowers", "foolproof", "football", "foresight", "format", "forsythe", "fourier", "friend", "frighten", "function", "fungible", "gabriel", "gardner", "garfield", "george", "gertrude", "gibson", "ginger", "glacier", "golfer", "gorgeous", "gorges", "gosling", "graham", "gryphon", "guitar", "gumption", "guntis", "hacker", "hamlet", "handily", "happening", "harmony", "harold", "harvey", "hawaii", "heather", "hebrides", "heinlein", "herbert", "hiawatha", "hibernia", "hidden", "homework", "hutchins", "hydrogen", "imbroglio", "imperial", "include", "ingres", "ingress", "ingrid", "innocuous", "internet", "irishman", "jackie", "janice", "jasmin", "jeanne", "jennifer", "jessica", "jester", "jixian", "joanne", "johnny", "joseph", "joshua", "judith", "juggle", "jupiter", "karina", "kathleen", "kathrine", "katina", "katrina", "kermit", "kernel", "kerrie", "kimberly", "kirkland", "kitten", "knight", "krista", "kristen", "kristi", "kristie", "kristin", "kristine", "kristy", "lambda", "lamination", "larkin", "lazarus", "lebesgue", "leland", "leslie", "library", "lockout", "lorraine", "macintosh", "maggot", "malcolm", "malcom", "manager", "marietta", "markus", "marvin", "master", "maurice", "meagan", "melissa", "mellon", "memory", "mercury", "merlin", "michael", "michele", "michelle", "mickey", "minimum", "minsky", "moguls", "monica", "morley", "mozart", "mutant", "napoleon", "nepenthe", "neptune", "network", "newton", "nicole", "nobody", "noreen", "noxious", "nuclear", "nutrition", "nyquist", "oceanography", "ocelot", "office", "olivetti", "olivia", "open", "operator", "oracle", "orca", "orwell", "osiris", "outlaw", "oxford", "pacific", "painless", "pakistan", "pamela", "papers", "password", "patricia", "pencil", "penelope", "penguin", "peoria", "percolate", "persimmon", "persona", "pete", "peter", "philip", "phoenix", "phone", "pierre", "playboy", "plover", "plymouth", "polynomial", "pondering", "porsche", "poster", "praise", "precious", "prelude", "presto", "prince", "princeton", "private", "professor", "profile", "program", "protect", "protozoa", "public", "pumpkin", "puneet", "puppet", "qwerty", "qawsed", "rabbit", "rachel", "rachelle", "rachmaninoff", "rainbow", "raindrop", "raleigh", "rascal", "reagan", "really", "rebecca", "regional", "remote", "ripple", "robotics", "rochelle", "rochester", "rodent", "romano", "ronald", "rosebud", "rosemary", "samantha", "sandra", "saturn", "scamper", "scheme", "school", "scotty", "secret", "security", "sensor", "serenity", "service", "sesame", "shannon", "sharks", "sharon", "sheffield", "sheldon", "sherri", "shirley", "shivers", "shuttle", "signature", "simple", "simpsons", "singer", "single", "smiles", "smooch", "smother", "snatch", "snoopy", "socrates", "somebody", "sondra", "sossina", "sparrows", "spring", "springer", "squires", "stacey", "stacie", "stephanie", "strangle", "stratford", "student", "stuttgart", "subway", "success", "summer", "superstage", "superuser", "support", "supported", "surfer", "susanne", "suzanne", "swearer", "symmetry", "sysadmin", "system", "tamara", "tangerine", "target", "tarragon", "taylor", "telephone", "temptation", "testtest", "tennis", "terminal", "thailand", "theresa", "tiffany", "toggle", "tomato", "topography", "tortoise", "toyota", "tracie", "trails", "transfer", "trisha", "trivial", "trombone", "tuttle", "tidewater", "testament", "territory", "tennessee", "tarantula", "tarantara", "unhappy", "unicorn", "unknown", "uranus", "urchin", "ursula", "utility", "valerie", "vasant", "veronica", "vertigo", "venomous", "vitamin", "vitriol", "vitrify", "vitiate", "village", "virgin", "virginia", "visitor", "vitriolic", "ventricle", "ventilate", "valentine", "wargames", "warren", "weenie", "whatever", "whatnot", "whiting", "whistler", "whitney", "wholesale", "william", "williamsburg", "willie", "winston", "wisconsin", "wizard", "wombat", "woodwind", "wormwood", "wyoming", "xmodem", "yellowstone", "yolanda", "yosemite", "yankee", "yamaha", "yakima", "y7u8i9", "zimmerman", "zmodem"]

    def min_requirements(self):
        if self.uppercase_count() and self.lowercase_count() and self.digit_count():
            if not self.four_consecutive() and self.length > 8:
                return True
        return False

    def four_consecutive(self):
        if self.length > 3:
            p = self.password
            for i in range(3, self.length):   
                if p[i] == p[i-1] and p[0] == p[i-2] and p[0] == p[i-3]:
                    return True
        return False

    def count_unique(self):
        return self.length - self.repeating()[0]

    def lookup_dictonary(self):
        if self.getSubWord() in self.dictonary:
            return True
        return False

    def getSubWord(self):
        subMap = SubstituteMap()
        charSub = 0
        subWord = ""
        length = 0

        if self.password != None and len(self.password) > 0:
            subWord = self.password.lower()
            length = len(subWord)

            for index in range(length):
                charSub = subMap.subLookup(subWord[index])
                if (charSub != 0):
                    subWord = subWord[0:index] + charSub + subWord[index + 1: length]
        
        return subWord

    def get_score(self):
        if self.length >= 10 and self.min_requirements() and self.count_unique() >= 6 and not self.lookup_dictonary():
            return (5, "Very strong", 5)
        elif self.length >= 9 and self.min_requirements() and self.special_count() and self.count_unique() >= 6 and not self.lookup_dictonary(): 
            return (5, "Very strong", 5)
        elif self.length >= 9 and self.min_requirements() and self.count_unique() >= 6 and not self.lookup_dictonary():
            return (4, "Strong", 5)
        elif self.min_requirements() and self.count_unique() >= 4 and not self.lookup_dictonary(): 
            return (3, "Medium", 5)
        elif self.min_requirements():
            return (2, "Weak", 5)
        else:
            return (1, "Very weak", 5)

if __name__ == '__main__':
    fedex = Fedex("Password@123")
    print(fedex.get_score())
    # print(fedex.getSubWord())
#-----------------------------------------------------------------------------------------------------
#EOF