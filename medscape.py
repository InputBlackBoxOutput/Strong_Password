# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 3 Oct 2020

from passwd import PasswordFeatures

#-----------------------------------------------------------------------------------------------------
'''
Used by Medscape (Medical information website)
Grading: 0-Invalid 1-Short 2- Level1 3- Level2 4- sLevel3
Note: Special symbols have been ignored during evaluation
'''
class Medscape(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	def get_score(self):
	    score = 0
	    level = 0

	    if self.length > 4:
	    	score += 1

	    if self.lowercase_count() and self.digit_count():
	    	score += 1
	    
	    if self.length > 7:
	    	score += 1

	    # if self.special_count(custom="~`!@#$%^&*( )_-+{|};'./?><\":"):
	    #     level = 0

	    if self.length < 5 and self.length != 0: 
	        level = 1
	        
	    else:
	        level = score + 1
	    
	    if (self.length == 0 ):
	    	level = 0
	    
	    return level


if __name__ == '__main__':
	medscape = Medscape("CoolCat123")
	print(medscape.get_score())