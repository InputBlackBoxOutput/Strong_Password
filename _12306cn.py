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
def _12306cn(password):
	pf = PasswordFeatures(password)
	if pf.length <= 6 or pf.letters_only() or pf.numbers_only():
		return 1

	else:
		if pf.length > 6 and pf.alpha_count() and pf.digit_count():
			return 3
		else:
			return 2

if __name__ == '__main__':
	print(_12306cn("p@ssw0rd"))
#-----------------------------------------------------------------------------------------------------
#EOF