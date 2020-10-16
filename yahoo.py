# Password strength evaluation
# Written by Rutuparn Pawar
# Created on 7 Oct 2020

from passwd import PasswordFeatures
import re

#---------------------------------------------------------------------------------
'''
Used by Yahoo (Internet mini-giant)
Grading: 0-Invalid 1-Weak 2-Mediocre 3-Strong 4-Strongest
(Note: Similarity to user's name has not been implemented)  
'''
class Yahoo(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		if self.length > 0:
			len_ = True if self.length > 5 else False
			letters = True if re.search("([a-z].*[A-Z])|([A-Z].*[a-z])", self.password) else False
			numbers = True if re.search("\d+", self.password) and re.search("[a-z].*", self.password) else False
			specials = True if re.search("[!,@,#,\$,%,^,&,\*,?,_,~]", self.password) else False

		else:
			return None

		result = 0
		if not len_:
			result = (1, "Weak", 4)
		else:
			if not len_ and not letters and not numbers and not specials:
				result = (1, "Weak", 4)
			elif len_ and not letters and not numbers and not specials:
				result = (2, "Mediocre", 4)
			elif len_ and not letters and numbers and not specials:
				result = (3, "Strong", 4)
			elif len_ and not letters and not numbers and specials:
				result = (3, "Strong", 4)
			elif len_ and letters and not numbers and not specials:
				result = (3, "Strong", 4)
			elif len_ and not letters and numbers and specials:
				result = (4, "Strongest", 4)
			elif len_ and letters and not numbers and specials:
				result = (4, "Strongest", 4)
			elif len_ and letters and numbers and not specials:
				result = (4, "Strongest", 4)
			elif len_ and letters and numbers and specials:
				result = (4, "Strongest", 4)
			else:
				result = (1, "Weak", 4)

		return result

#---------------------------------------------------------------------------------
if __name__ == '__main__':
	yahoo = Yahoo("Password")
	print(yahoo.get_score())

#---------------------------------------------------------------------------------