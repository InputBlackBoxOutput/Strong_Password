# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 19 Sept 2020

#-----------------------------------------------------------------------------
import string

with open("top_10k.txt", 'r') as wordlist:
	top_10k = wordlist.readlines()

#-----------------------------------------------------------------------------
class PasswordStrength():
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

	''' Count uppercase characters in password '''
	def uppercase_count(self):		
		return self.count(self.password, string.ascii_uppercase)


	''' Count lowercase characters in password'''
	def lowercase_count(self):
		return self.count(self.password, string.ascii_lowercase)

	''' Count digits in password'''
	def digit_count(self):
		return self.count(self.password, string.digits)

	''' Count special characters in password'''
	def special_count(self):
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
		if self.length - len(set(self.password)) > 0:
			return True
		return False


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

	def current_practice(self):
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

	''' Verbose output showing breakdown of score calulation'''
	def verbose(self):
		print(f"Password: {self.password}")
		print('-' * 80)

		print(f"Length: {self.length}")
		print(f"Number of uppercase characters: {self.uppercase_count()}")
		print(f"Number of lowercase characters: {self.lowercase_count()}")
		print(f"Number of digits: {self.digit_count()}")
		print(f"Number of special characters: {self.special_count()}")
		print(f"Number of special characters & digits in middle of password: {self.middle_count()}")
		print(f"Password is made up of letters only: {self.letters_only()}")
		print(f"Password is made up of numbers only: {self.numbers_only()}")
		print(f"Contains same character more than one: {self.repeating()}")
		print(f"Consecutive characters having same case/type: {self.consecutive()}")
		print(f"Contains numbers in a numerical sequence: {self.sequential_numbers()}")
		print(f"Contains alphabets in an alphabetical sequence: {self.sequential_letters()}")
		print(f"Follows current password rules: {self.current_practice()}")

#-----------------------------------------------------------------------------
if __name__ == "__main__":
	passwd = PasswordStrength("P@ssw0rd", True) #This is not my password ;-)

#-----------------------------------------------------------------------------
#EOF