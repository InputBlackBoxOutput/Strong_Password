# Password strength evaluation
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 6 Oct 2020

from passwd import PasswordFeatures
import re

#---------------------------------------------------------------------------------
'''
Used by Target (Retail company)
Grading: 0-Invalid 1-Weak 2-Good 3-Strong 4-Extra Strong
'''
class Target(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)


	def get_score(self):
		if self.length < 8 or not self.valid_password():
			return (0, "Not rated", 4) 

		if self.length >= 15 and self.lowercase_count() and self.uppercase_count() and self.digit_count():
			return (4, "Extra strong", 4)
		elif self.length >= 11 and self.lowercase_count() and self.uppercase_count() and self.digit_count():
			return (3, "Strong", 4)
		elif self.length >= 9 and self.lowercase_count() and self.uppercase_count():
			return (2, "Good", 4)
		elif self.password != "":
			return (1, "Weak", 4)
		
	def valid_password(self):
		d = re.search("^\d*$", self.password)
		W = re.search("^\W*$", self.password)
		a = re.search("^[a-z]*$", self.password)
		A = re.search("^[A-Z]*$", self.password)
		# print(d, W, a, A)
		
		return False if (d or W or a or A) else True

#---------------------------------------------------------------------------------
if __name__ == '__main__':
	target = Target("P@ssw0rd123")
	print(target.get_score())

#---------------------------------------------------------------------------------