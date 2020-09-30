# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 24 Sept 2020

from passwd import PasswordFeatures
#-----------------------------------------------------------------------------------------------------
'''
Used by www.bloomberg.com (Media company)
Grading: 0-Too short 1-Weak 2-Good 3-Strong
'''
def bloomberg(password):
	pf = PasswordFeatures(password)
	c = 0
	if pf.length > 5:
		if pf.lowercase_count():
			c += 1
		if pf.uppercase_count():
			c += 1
		if pf.digit_count():
			c += 3
		if pf.special_count(custom="#$%&*()!@'") != 0:
			c += 4

	if c == 0:
		return 0
	elif c > 0 and c < 4:
		return 1
	elif c >= 4 and c <=7:
		return 2
	else:
		return 3

if __name__ == "__main__":
	print(bloomberg("abc12345"))
#-----------------------------------------------------------------------------------------------------
#EOF