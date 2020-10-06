# Template for adding more commercial password strength evaulators 
# Please add evaluator name in the README and edit main.py to accomodate this evaluator

#---------------------------------------------------------------------------------
# Password strength evaluation
# Written by <Author> (<Github Username>)
# Created on Day Month 2020

from passwd import PasswordFeatures

#---------------------------------------------------------------------------------
'''
Used by <Company Name> (<Short Description>)
Grading: < Grading > (Note: Return integers representing grade & return 0 when invalid) 
'''
class Object(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
		pass

#---------------------------------------------------------------------------------
if __name__ == '__main__':
	obj = Object("Password")
	print(obj.get_score())

#---------------------------------------------------------------------------------