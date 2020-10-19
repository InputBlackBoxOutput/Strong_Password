# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 30 Sept 2020

from passwd import PasswordFeatures
import re
from collections import Counter

#-----------------------------------------------------------------------------------------------------
'''
Used by Twitter (Social network)
Grading: 1-Too short/Obvious 2-Too weak 3-Weak 4-Good 5-Strong 6-Very strong
'''
class Twitter(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)
		self.minLength = 6;
		
		self.bannedPasswords = ["000000","111111","11111111","112233","121212","123123","123456","1234567","12345678","123456789","131313","232323","654321","666666","696969","777777","7777777","8675309","987654","nnnnnn","nop123","nop123","nopqrs","noteglh","npprff","npprff14","npgvba","nyoreg","nyoregb","nyrkvf","nyrwnaqen","nyrwnaqeb","nznaqn","nzngrhe","nzrevpn","naqern","naqerj","natryn","natryf","navzny","nagubal","ncbyyb","nccyrf","nefrany","neguhe","nfqstu","nfqstu","nfuyrl","nffubyr","nhthfg","nhfgva","onqobl","onvyrl","onanan","onearl","onfronyy","ongzna","orngevm","ornire","ornivf","ovtpbpx","ovtqnqql","ovtqvpx","ovtqbt","ovtgvgf","oveqvr","ovgpurf","ovgrzr","oynmre","oybaqr","oybaqrf","oybjwbo","oybjzr","obaq007","obavgn","obaavr","obbobb","obbtre","obbzre","obfgba","oenaqba","oenaql","oenirf","oenmvy","oebapb","oebapbf","ohyyqbt","ohfgre","ohggre","ohggurnq","pnyiva","pnzneb","pnzreba","pnanqn","pncgnva","pneybf","pnegre","pnfcre","puneyrf","puneyvr","purrfr","puryfrn","purfgre","puvpntb","puvpxra","pbpnpbyn","pbssrr","pbyyrtr","pbzcnd","pbzchgre","pbafhzre","pbbxvr","pbbcre","pbeirggr","pbjobl","pbjoblf","pelfgny","phzzvat","phzfubg","qnxbgn","qnyynf","qnavry","qnavryyr","qroovr","qraavf","qvnoyb","qvnzbaq","qbpgbe","qbttvr","qbycuva","qbycuvaf","qbanyq","qentba","qernzf","qevire","rntyr1","rntyrf","rqjneq","rvafgrva","rebgvp","rfgeryyn","rkgerzr","snypba","sraqre","sreenev","sveroveq","svfuvat","sybevqn","sybjre","sylref","sbbgonyy","sberire","serqql","serrqbz","shpxrq","shpxre","shpxvat","shpxzr","shpxlbh","tnaqnys","tngrjnl","tngbef","trzvav","trbetr","tvnagf","tvatre","tvmzbqb","tbyqra","tbysre","tbeqba","tertbel","thvgne","thaare","unzzre","unaanu","uneqpber","uneyrl","urngure","uryczr","uragnv","ubpxrl","ubbgref","ubearl","ubgqbt","uhagre","uhagvat","vprzna","vybirlbh","vagrearg","vjnagh","wnpxvr","wnpxfba","wnthne","wnfzvar","wnfcre","wraavsre","wrerzl","wrffvpn","wbuaal","wbuafba","wbeqna","wbfrcu","wbfuhn","whavbe","whfgva","xvyyre","xavtug","ynqvrf","ynxref","ynhera","yrngure","yrtraq","yrgzrva","yrgzrva","yvggyr","ybaqba","ybiref","znqqbt","znqvfba","znttvr","zntahz","znevar","znevcbfn","zneyobeb","znegva","zneiva","znfgre","zngevk","znggurj","znirevpx","znkjryy","zryvffn","zrzore","zreprqrf","zreyva","zvpunry","zvpuryyr","zvpxrl","zvqavtug","zvyyre","zvfgerff","zbavpn","zbaxrl","zbaxrl","zbafgre","zbetna","zbgure","zbhagnva","zhssva","zhecul","zhfgnat","anxrq","anfpne","anguna","anhtugl","app1701","arjlbex","avpubynf","avpbyr","avccyr","avccyrf","byvire","benatr","cnpxref","cnagure","cnagvrf","cnexre","cnffjbeq","cnffjbeq","cnffjbeq1","cnffjbeq12","cnffjbeq123","cngevpx","crnpurf","crnahg","crccre","cunagbz","cubravk","cynlre","cyrnfr","cbbxvr","cbefpur","cevapr","cevaprff","cevingr","checyr","chffvrf","dnmjfk","djregl","djreglhv","enoovg","enpury","enpvat","envqref","envaobj","enatre","enatref","erorppn","erqfxvaf","erqfbk","erqjvatf","evpuneq","eboreg","eboregb","ebpxrg","ebfrohq","ehaare","ehfu2112","ehffvn","fnznagun","fnzzl","fnzfba","fnaqen","fnghea","fpbbol","fpbbgre","fpbecvb","fpbecvba","fronfgvna","frperg","frkfrk","funqbj","funaaba","funirq","fvreen","fvyire","fxvccl","fynlre","fzbxrl","fabbcl","fbppre","fbcuvr","fcnaxl","fcnexl","fcvqre","fdhveg","fevavinf","fgnegerx","fgnejnef","fgrryref","fgrira","fgvpxl","fghcvq","fhpprff","fhpxvg","fhzzre","fhafuvar","fhcrezna","fhesre","fjvzzvat","flqarl","grdhvreb","gnlybe","graavf","grerfn","grfgre","grfgvat","gurzna","gubznf","guhaqre","guk1138","gvssnal","gvtref","gvttre","gbzpng","gbctha","gblbgn","genivf","gebhoyr","gehfgab1","ghpxre","ghegyr","gjvggre","havgrq","intvan","ivpgbe","ivpgbevn","ivxvat","ibbqbb","iblntre","jnygre","jneevbe","jrypbzr","jungrire","jvyyvnz","jvyyvr","jvyfba","jvaare","jvafgba","jvagre","jvmneq","knivre","kkkkkk","kkkkkkkk","lnznun","lnaxrr","lnaxrrf","lryybj","mkpioa","mkpioaz","mmmmmm"]
		self.undoBannedPasswordROT13()

	def get_score(self):
		if self.length < self.minLength:
			return (1, "Short/Obvious", 6)

		if self.password.lower() in self.bannedPasswords:
			return (1, "Short/Obvious", 6)
		
		regex = '''(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\#\`\~\!\@\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\.\<\>\/\?])'''	
		if re.search(f"{regex}{10,}", self.password):
			return (2, "Too weak", 6)
		
		d = 0
		d += self.length * 4

		d += (self.repeat(1) - self.length) * 1
		d += (self.repeat(2) - self.length) * 1
		d += (self.repeat(3) - self.length) * 1
		d += (self.repeat(4) - self.length) * 1

		if re.search("(.*[0-9].*[0-9].*[0-9])", self.password): 
			d += 5
		if re.search("(.*[!@#$%^&*?_~].*[!@#$%^&*?_~])", self.password):
			d += 5
		if re.search("([a-z].*[A-Z])|([A-Z].*[a-z])", self.password): 
			d += 10
		if re.search("([a-zA-Z])", self.password) and re.search("([0-9])", self.password): 
			d += 15
		if re.search("([!@#$%^&*?_~])", self.password) and re.search("([0-9])", self.password):
			d += 15
		if re.search("([!@#$%^&*?_~])", self.password) and re.search("([a-zA-Z])", self.password):
			d += 15

		if re.search("^\w+$", self.password) or re.search("^\d+$", self.password):
			d -= 10;

		if d < 34:
			return (3, "Weak", 6)
		elif d < 50:
			return (4, "Good", 6)
		elif d < 75:
			return (5, "Strong", 6)
		else:
			return (6, "Very strong", 6)

	def repeat(self, count):
		c = 0
		count_dict = Counter(self.password)
		for each in count_dict.values():
			if each > count:
				c += count
			else:
				c += each
		
		return c
		
	def undoBannedPasswordROT13(self):
		undone = [] 
		alphabets = "abcdefghijklmnopqrstuvwxyz"
		for each in self.bannedPasswords:
			mod = ""
			for char in each:
			    location = alphabets.find(char)
			    if location < 0:
			        mod += char
			    else:
			        mod += alphabets[(location + 13)%26]
			
			undone.append(mod)
			self.bannedPasswords = undone

if __name__ == '__main__':
	twitter = Twitter("P@ssw0rd")
	print(twitter.get_score())
