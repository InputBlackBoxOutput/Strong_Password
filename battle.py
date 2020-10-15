# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 3 Oct 2020

from passwd import PasswordFeatures
import re

#-----------------------------------------------------------------------------------------------------
'''
Used by Battle (Unknown)
Grading: 0-Invaild 1-Too Short 2-Weak 3-Fair 4-Strong
'''
class Battle(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		result = None

		if self.length > 0:
			if self.length >= 8:
				if (self.matches_patterns() and self.length > 10 and not self.repeating(allowed=2)[0] and not hasSequentiality(password1)):
					result = (4, "Strong", 4)

				else:
					if (self.matches_patterns() and self.length > 8 and not self.repeating(allowed=2)[0] and not hasSequentiality(password1)):
						result = (3, "Fair", 4)
					else:
						result = (2, "Weak", 4)
									
			else:
				result = (1, "Too short", 4)

		return result

	def matches_patterns(self):
		test1 = re.search('^[\x20-\x7E]+$', self.password)
		test2 = re.search('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*).+$', self.password)
		return test1 and test2

	def sequential(self):
		if self.sequential_letters() or self.sequential_numbers() or self.sequential_qwerty():
			return True
		return False

#-----------------------------------------------------------------------------
if __name__ == '__main__':
	battle = Battle("P@ssw0rd")
	print(battle.get_score())
	
#-----------------------------------------------------------------------------
#EOF