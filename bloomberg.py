# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 24 Sept 2020

from passwd import PasswordFeatures
#-----------------------------------------------------------------------------------------------------
'''
Used by www.bloomberg.com (Media company)
Grading: 1-Too short 2-Weak 3-Good 4-Strong (Modified)
'''
class Bloomberg(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		c = 0
		if self.length > 5:
			if self.lowercase_count():
				c += 1
			if self.uppercase_count():
				c += 1
			if self.digit_count():
				c += 3
			if self.special_count(custom="#$%&*()!@'") != 0:
				c += 4

		if c == 0:
			return (1, "Too short", 4)
		elif c > 0 and c < 4:
			return (2, "Weak", 4)
		elif c >= 4 and c <=7:
			return (3, "Good", 4)
		else:
			return (4, "Strong", 4)

if __name__ == "__main__":
	bloomberg = Bloomberg("abc12345")
	print(bloomberg.get_score())
#-----------------------------------------------------------------------------------------------------
#EOF