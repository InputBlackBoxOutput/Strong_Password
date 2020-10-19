# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 2 Oct 2020

from passwd import PasswordFeatures
import re

#-----------------------------------------------------------------------------------------------------
'''
Used by Tencent QQ (Instant messaging service)
Grading: 0-Invalid 1-Weak 2-Moderate 3-Strong
'''

class QQ(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		score = 0

		if self.lowercase_count():
			score += 1
		if self.uppercase_count():
			score += 1
		if self.digit_count():
			score += 1

		if re.search("[^a-zA-Z0-9]", self.password):
			score += 1

		score = 3 if score > 3 else score
		if score == 1:
			score = (1, "Weak", 4)
		elif score == 2:
			score = (2, "Moderate", 4)
		else:
			score = (3, "Strong", 4)

		#-------------------------------------------------------------
		if self.length < 6 or re.search("^\d{1,8}$", self.password):
		    score = (0, "Not rated", 3)

		if self.length < 8 and score[0] > 1:
			score = (1, "Weak", 3)
		
		return score

#-----------------------------------------------------------------------------------------------------
if __name__ == '__main__':
	qq = QQ("p@ssword")
	print(qq.get_score())

#-----------------------------------------------------------------------------------------------------
# EOF