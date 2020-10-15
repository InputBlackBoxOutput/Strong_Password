# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 5 Oct 2020

from passwd import PasswordFeatures

#-----------------------------------------------------------------------------------------------------
'''
Used by Microsoft (You are most probably using Windows!)
Grading: 1-Weak 2-Medium 3-Strong 4-Best
'''
class Microsoft3(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		count_lower = 0
		count_numeric = 0
		count_upper = 0
		count_special = 0

		score = 0

		for each in self.password:
			asciiVal = ord(each)

			if (asciiVal >= 97) and (asciiVal <= 122):
				count_lower += 1

			elif ((asciiVal >= 65) and (asciiVal <= 90)):
				count_upper += 1

			elif ((asciiVal >= 48) and (asciiVal <= 57)):
				count_numeric += 1

			elif ((asciiVal <= 47) or ((asciiVal >= 58) and (asciiVal <= 64)) or ((asciiVal >= 91) and (asciiVal <= 96)) or ((asciiVal >= 123) and (asciiVal <= 126))):
				count_special += 1


		if self.length < 8:
			score = (1, "Weak", 4)

		if self.length >= 8:
			score = (2, "Medium", 4)   

		if self.length >= 14:
			score = (3, "Strong", 4)

			if count_upper and count_special and count_numeric and count_lower:
				score = (4, "Best", 4)

		return score

#----------------------------------------------------------------------------------------------		
if __name__ == '__main__':
	microsoft3 = Microsoft3("P@ssword")
	print(microsoft3.get_score())

#----------------------------------------------------------------------------------------------
# EOF