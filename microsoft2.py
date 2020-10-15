# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 30 Sept 2020

from passwd import PasswordFeatures
import string, math

#-----------------------------------------------------------------------------------------------------
'''
Used by Microsoft (Does not require an introduction!)
Grading: 0-Not rated 1-Weak 2-Medium 3-Strong 4-Best
'''
class Microsoft2(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		bits = self.calculate_bits()
		# print(bits)

		if bits >= 128:
			return (4, "Best", 4)

		elif bits < 128 and bits >= 64:
			return (3, "Strong", 4)
		  
		elif bits < 64 and bits >= 56:
			return (2, "Medium", 4)
		  
		elif bits < 56:
			return (1, "Weak", 4)
		  
		else:
			return None

	def calculate_bits(self):
		if self.length < 0:
		    return 0

		upper = 0
		lower = 0
		digit = 0
		punct = 0
		other = 0

		for char in self.password:
			if char in string.ascii_lowercase:
				lower = 1
			elif char in string.ascii_uppercase:
				upper = 1
			elif char in string.digits:
				digit = 1
			elif char in "~`!@#$%^&*()-_+=":
				punct = 1
			else:
				other = 1

		charset = 0
		
		if lower:
		    charset += 26
		if upper:
		    charset += 26
		if digit:
		    charset += 10
		if punct:
		    charset += 16
		if other:
		    charset += 95

		bits = math.log2(charset) * self.length
		return math.floor(bits)

#----------------------------------------------------------------------------------------
if __name__ == '__main__':
	microsoft2 = Microsoft2("P@ssword123")
	print(microsoft2.get_score())

#----------------------------------------------------------------------------------------