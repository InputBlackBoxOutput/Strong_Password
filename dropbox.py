# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 30 Sept 2020

from passwd import PasswordFeatures

#-----------------------------------------------------------------------------------------------------
'''
Used by Dropbox (Cloud storage)
Grading: 
'''
class Dropbox(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		pass