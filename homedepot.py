# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 2 Oct 2020

from passwd import PasswordFeatures
import re

#-----------------------------------------------------------------------------------------------------
'''
Used by Home Depot (Retail Store)
Grading: 1-Weak 2-Good 3-Strong (Modified)
'''
class HomeDepot(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)
		self.commonPasswordArray = ["12345678", "123123123", "123456789", "987654321", "1234567890", "1q2w3e4r", "1qaz2wsx", "abcd1234", "alexander", "asdfasdf", "asdfghjkl", "baseball", "chocolate", "computer", "football", "homedepot", "homedepot123", "iloveyou", "internet", "jennifer", "liverpool", "michelle", "password", "password1", "princess", "qwertyuiop", "sunshine", "superman", "testpassword", "trustno1", "welcome1", "whatever", "abcdefghi", "abcdefgh", "12345678"];

	def get_score(self):
		if self.length < 8 or (self.password.lower() in self.commonPasswordArray) or ((len(self.password.lower().split(self.password[0].lower())) - 1) == self.length):
			return 1

		score = 0
		if self.lowercase_count():
		    score += 1

		if self.uppercase_count(): 
		    score += 1

		if self.digit_count():
		    score += 1

		if re.search("^[a-zA-Z0-9- ]*$", self.password):
			score += 1

		if (score > 1 and self.length > 12) or (score > 2 and self.length > 8):
		    return 3

		return 2

#-----------------------------------------------------------------------------------------------------
if __name__ == '__main__':
	homedepot = HomeDepot("CoolCat")
	print(homedepot.get_score())

#-----------------------------------------------------------------------------------------------------
# EOF