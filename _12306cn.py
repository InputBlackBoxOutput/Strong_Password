# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 24 Sept 2020

from passwd import PasswordFeatures

#-----------------------------------------------------------------------------------------------------
'''
Used by www.12306.cn (China railways)
Grading: 1-Dangerous  2-Average  3-Secure (Modified)
Note: Special characters other then underscore not accepted by this evaluator: Special symbols ignored altogether
'''
class _12306CN(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		if self.length <= 6 or self.letters_only() or self.numbers_only():
			return (1, "Dangerous", 3)

		else:
			if self.length > 6 and self.alpha_count() and self.digit_count():
				return (3, "Secure", 3)
			else:
				return (2, "Average", 3)
				
#----------------------------------------------------------------------------------------------
if __name__ == '__main__':
	cn = _12306CN("Passw0rd")
	print(cn.get_score())

#----------------------------------------------------------------------------------------------
#EOF