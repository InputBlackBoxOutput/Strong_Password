# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 26 Sept 2020
#-----------------------------------------------------------------------------------------------------
from passwd import PasswordFeatures
import math, re

'''
Used by Intel (Processor manufacturer)
Grading: 0-Fail 1-Pass
'''
class Intel(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)
		self.cutofftime=24*365*1000 

	def time_to_words(self, seconds):
		minutes = (seconds / 60)
		hours = math.floor(minutes / 60)
		days = math.floor(hours / 24)
		weeks = math.floor(days / 7)
		months = math.floor(days / 30)
		years = math.floor(days / 365)
		  
		return f"{years} year(s) {months} month(s) {weeks} week(s) {days} day(s) {hours} hour(s) {minutes} minute(s)"

	def passwd_entropy(self):
		return math.pow(26,self.lowercase_count()) * math.pow(26,self.uppercase_count()) * math.pow(10,self.digit_count()) * math.pow(32, self.special_count());

	def get_score(self, time_to_crack=False):
		entropy = self.passwd_entropy() /2
		hours = entropy / (2 * math.pow(2, 33)); # Divided by std computer power
		seconds = (math.floor(hours * 36000000))/10000;
		
		if time_to_crack is False:
			if seconds >= self.cutofftime:
				return (1, "Pass", 1)
			return (0, "Fail", 1)
		else:
			return self.time_to_words(seconds)
		
if __name__ == '__main__':
	intel = Intel("P@ssw0rd")
	print(intel.get_score())
	# print(intel.get_score(time_to_crack=True))


#-----------------------------------------------------------------------------------------------------
#EOF