#---------------------------------------------------------------------------------
# Password strength evaluation
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 6 Oct 2020

#---------------------------------------------------------------------------------
import sys
try:
	from zxcvbn import zxcvbn
except ModuleNotFoundError:
	print("Module 'zxcvbn' not found\nPlease use the following command to install the module\npip(3) install zxcvbn")
	sys.exit()

#---------------------------------------------------------------------------------
'''
Used by many software applications (Popular library/module for password strength evaluation)
Originated from Dropbox.
Grading: < Grading > (Note: Return integers representing grade & return 0 when invalid) 
'''
class ZXCVBN:
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		return zxcvbn(self.password)["score"]

#---------------------------------------------------------------------------------
if __name__ == '__main__':
	z = ZXCVBN("Password")
	print(z.get_score())

#---------------------------------------------------------------------------------