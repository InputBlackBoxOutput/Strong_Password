# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 19 Sept 2020

#-----------------------------------------------------------------------------
import sys, string, math, re
# import zxcvbn

try:
	with open("top_10k.txt", 'r') as wordlist:
		top_10k = wordlist.read().splitlines()
except FileNotFoundError:
	print("File not found: top_10k.txt")
	sys.exit()

try:
	with open("common_words.txt", 'r') as dictonary:
		common_words = dictonary.read().splitlines()
except FileNotFoundError:
	print("File not found: common_words.txt")
	sys.exit()

#-----------------------------------------------------------------------------
''' Implements commonly used password features for determining password strength'''
class PasswordFeatures():
	def __init__(self, password, verbose=False):
		self.password = str(password)
		self.length = len(self.password)

		if verbose == True:
			self.verbose()


	''' Helper function: Count character of a particular type '''
	def count(self, password, chartype):
		c = 0
		for char in self.password:
			if char in chartype:
				c += 1
		return c

	''' Does the password contain the specified character? '''
	def contains(self, char):
		if char in self.password:
			return True
		return False

	''' Count uppercase characters in password '''
	def uppercase_count(self):		
		return len(re.findall("[A-Z]", self.password))

	''' Count lowercase characters in password '''
	def lowercase_count(self):
		return len(re.findall("[a-z]", self.password))

	''' Count all lowercase and uppercase characters '''
	def alpha_count(self):
		return len(re.findall("[a-zA-Z]", self.password))

	''' Count digits in password'''
	def digit_count(self):
		return len(re.findall("[0-9]", self.password))

	''' Count special characters in password'''
	def special_count(self, custom=None):
		if custom != None:
			return self.count(self.password, custom)

		return self.count(self.password, string.punctuation)
		
	''' Count special characters & digits within password '''
	def middle_count(self):
		c = 0
		for char in self.password[1:-1]:
			if char in set(string.punctuation + string.digits):
				c += 1
		
		return c

	''' Does the password contain only letters ? '''
	def letters_only(self):
		letter_count = self.count(self.password, string.ascii_lowercase + string.ascii_uppercase)
		
		if self.length == letter_count:
			return True
		return False

	''' Does the password contain only numbers ? '''
	def numbers_only(self):
		digit_count = self.count(self.password, string.digits)
		
		if self.length == digit_count:
			return True
		return False

	''' Does the password contain repeating characters ? '''
	def repeating(self):
		repeats = self.length - len(set(self.password))
		if repeats > 0:
			return (True, repeats)
		return (False, 0)


	''' Does the password contains consecutive characters with the same case/type ? 
		Fxn returns tuple ==> (lowercase, uppercase, digits, special)
	'''
	def consecutive(self):
		char_types = {
			string.ascii_lowercase: 0,
			string.ascii_uppercase: 0,
			string.digits		 : 0,
			string.punctuation	: 0
			}

		for c1, c2 in zip(self.password, self.password[1:]):
			for char_type in char_types:
				if c1 in char_type and c2 in char_type:
					char_types[char_type] += 1
		
		return tuple(char_types.values())

	''' Does the password contain numbers in a numerical sequence ? '''
	def sequential_numbers(self):
		c = 0
		for i in range(10000):
			if str(i) + str(i + 1) in self.password:
				c += 1

		if c > 0:
			return 1
		else:
			return 0

	''' Does the password contain alphabets in an alphabetical sequence ? '''
	def sequential_letters(self):
		c = 0
		seeing = False
		for c1, c2 in zip(self.password, self.password[1:]):
			if ord(c1)+1 == ord(c2) and c1 in string.ascii_lowercase[:-1]:
				c += 1
				if not seeing:
					c += 1
					seeing = True
			else:
				seeing = False

		if c > 0:
			return 1
		else:
			return 0

	''' Does the password follow generally followed password requirements?'''
	def general_practice(self):
		upper = False
		lower = False
		special = False
		number = False

		for char in self.password:
			if char in string.ascii_uppercase:
				upper = True
			elif char in string.ascii_lowercase:
				lower = True
			elif char in string.punctuation:
				special = True
			elif char in string.digits:
				number = True

		if (self.length >= 8) and upper and lower and special and number:
			return True

		return False

	'''Generator to create substrings of atleast 3 characters'''
	def substrings(self, word):
		for i in range(len(word)):
			for j in range(i+3, len(word)+1):
				yield word[i:j]

	''' Does the password contain common words? '''
	def dictionary_word(self):
			password_substrings = self.substrings(self.password)

			intersection = [s for s in password_substrings if s in common_words]
			if len(intersection) > 0:
				return True
			return False

	''' Check if password has made it to the top 10k most probable passwords'''
	def popularity(self):
		if self.password in top_10k:
			return True
		return False
	''' Find entropy (Measure of randomness) of password. 
		See https://www.pleacher.com/mp/mlessons/algebra/entropy.html
	'''
	def entropy(self):
		R = 0
		upper = 0
		lower = 0
		digit = 0
		special = 0

		for char in self.password:
			if char in string.ascii_uppercase:
				upper = 26
			elif char in string.ascii_lowercase:
				lower = 26  
			elif char in string.digits:
				digit = 10
			elif char in string.punctuation:
				special = 32

		R = upper + lower + digit + special
		ent = math.log2(R**(self.length))
		return ent
		
	def table_print(self, desc, value):
		print("{:<65s}{:>10s}".format(desc, str(value)))

	''' Verbose output showing breakdown of score calulation'''
	def verbose(self):
		self.table_print("Password:" , self.password)
		print('-' * 80)

		self.table_print("Length:", self.length)
		self.table_print("Number of uppercase characters:", self.uppercase_count())
		self.table_print("Number of lowercase characters:", self.lowercase_count())
		self.table_print("Number of digits:", self.digit_count())
		self.table_print("Number of special characters:", self.special_count())
		self.table_print("Number of special characters & digits in middle of password:", self.middle_count())
		self.table_print("Password is made up of letters only:", self.letters_only())
		self.table_print("Password is made up of numbers only:", self.numbers_only())
		self.table_print("Contains same character more than one:", self.repeating())
		self.table_print("Consecutive characters having same case/type:", self.consecutive())
		self.table_print("Contains numbers in a numerical sequence:", self.sequential_numbers())
		self.table_print("Contains alphabets in an alphabetical sequence:", self.sequential_letters())
		self.table_print("Follows current password rules:", self.general_practice())
		self.table_print("Entropy of password:", self.entropy())
		self.table_print("Contains common words from the english dictonary:", self.dictionary_word())
		self.table_print("In the top 10k popular password list:", self.popularity())

#-----------------------------------------------------------------------------
if __name__ == "__main__":
	passwd = PasswordFeatures("P@ssw0rd", True) #This is not my password ;-)
	
#-----------------------------------------------------------------------------
#EOF