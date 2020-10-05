# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 30 Sept 2020

from passwd import PasswordFeatures
import string
#----------------------------------------------------------------------------------------
'''
Used by Microsoft (Windows!)
Grading: 0-Not rated 1-Weak 2-Medium 3-Strong 4-Best
'''
class Microsoft1(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		if (self.is_long_enough(14) and self.char_set_span(3) and (!(IsCloseVariationOfAWordInDictionary(, "0.6", , )))):
		  return 4
		  
		elif (self.is_long_enough(8) and self.char_set_span(3) and (!(IsCloseVariationOfAWordInDictionary(ClientSideStrongPassword.arguments[0], "0.6", ClientSideStrongPassword.arguments[1], ClientSideStrongPassword.arguments[2])))):
		  return 3

		elif (self.is_long_enough(8) and self.char_set_span(2) and (!(in_dictonary(ClientSideMediumPassword.arguments[0], ClientSideMediumPassword.arguments[1], ClientSideMediumPassword.arguments[2])))):
		  return 2
		  
		elif (self.is_long_enough(1) or not self.is_long_enough(0)):
		  return 1
		  
		else:
		  return 0

		def is_long_enough(self, expected):
			if self.length < expected:
				return False
			
			return True

		def char_set_span(self, expected):
			upper = 0
			lower = 0
			digit = 0
			special = 0

			for char in self.password:
				if char in string.ascii_lowercase:
					lower = 1
				elif char in string.ascii_uppercase:
					upper = 1
				elif char in string.digits:
					digit = 1
				elif char in string.punctuation:
					special = 1

			if (lower + upper + digit + special) < expected:
				return False
			return True

#----------------------------------------------------------------------------------------
if __name__ == '__main__':
	microsoft1 = Microsoft1("Password")
	print(microsoft1.get_score())

#----------------------------------------------------------------------------------------