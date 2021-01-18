# Password strength evaluation 
# Written by Rutuparn Pawar (InputBlackBoxOutput)
# Created on 15 Oct 2020

#---------------------------------------------------------------------------------------
from passwd import PasswordFeatures

from _12306cn import _12306CN
from battle import Battle
from bloomberg import Bloomberg
# from dropbox import Dropbox 
from fedex import Fedex
# from gmail import Gmail # Not implemented yet
from homedepot import HomeDepot
from intel import Intel
# from jquery import jQuery # Not implemented yet
from medscape import Medscape
# from microsoft1 import Microsoft1 # Not fully implemented
from microsoft2 import Microsoft2
from microsoft3 import Microsoft3
from qq import QQ 
from target import Target 
from twitter import Twitter
from yahoo import Yahoo

#---------------------------------------------------------------------------------------
class StrongPassword:
	def __init__(self, passwd):
		print(f"Password under evaluation: {passwd}\n")
		self.weights = {
			"_12306cn"       :1,
			"battle"         :1,
			"bloomberg"      :1,
			# "dropbox"      :1,
			"fedex"          :1,
			# "gmail"        :1,
			"homedepot"      :1,
			"intel"          :1,
			# "jquery"       :1,
			"medscape"       :1,
			# "microsoft1"   :1,
			"microsoft2"     :1,
			"microsoft3"     :1,
			"qq"             :1,
			"target"         :1,
			"twitter"        :1,
			"yahoo"          :1
		}

		self.score = {
			"_12306cn"   : _12306CN(passwd).get_score(),
			"battle"     : Battle(passwd).get_score(),
			"bloomberg"  : Bloomberg(passwd).get_score(),
			# "dropbox"    : Dropbox(passwd).get_score(),
			"fedex"      : Fedex(passwd).get_score(),
			# "gmail"      :Gmail(passwd).get_score(),
			"homedepot"  :HomeDepot(passwd).get_score(),
			"intel"      :Intel(passwd).get_score(),
			# "jquery"     :JQuery(passwd).get_score(),
			"medscape"   :Medscape(passwd).get_score(),
			# "microsoft1" :Microsoft1(passwd).get_score(),
			"microsoft2" :Microsoft2(passwd).get_score(),
			"microsoft3" :Microsoft3(passwd).get_score(),
			"qq"         :QQ(passwd).get_score(),
			"target"     :Target(passwd).get_score(),
			"twitter"    :Twitter(passwd).get_score(),
			"yahoo"      :Yahoo(passwd).get_score()
		}

	#---------------------------------------------------------------------------------------
	def table_print(self, eval, rating, first_entry=False, last_entry = False):
		if first_entry:
			print('-' * 45)
			print("{:<15s}{:>10s}{:>15s}".format("Evaluator used by", "Score", "Comment"))
				
		print('-' * 45)
		print("{:<15s}{:>10s}{:>15s}".format(eval, f"{rating[0]}/{rating[2]}", rating[1]))

		if last_entry:
			print('-' * 45)


	def score_table(self):
		self.table_print("12306cn", self.score["_12306cn"], first_entry=True)

		self.table_print("Battle", self.score["battle"])

		self.table_print("Bloomberg", self.score["bloomberg"])
	 
		# self.table_print("Dropbox", self.score["dropbox"])
		
		self.table_print("Fedex", self.score["fedex"])
		
		# self.table_print("Gmail", self.score["gmail"])
		
		self.table_print("Home Depot", self.score["homedepot"])

		self.table_print("Intel", self.score["intel"])
		
		# self.table_print("jQuery", self.score["jquery"])
		
		self.table_print("Medscape", self.score["medscape"])

		# self.table_print("Microsoft 1", self.score["microsoft1"])

		self.table_print("Microsoft 2", self.score["microsoft2"])
		
		self.table_print("Microsoft 3", self.score["microsoft3"])
		 
		self.table_print("QQ", self.score["qq"])
		
		self.table_print("Target", self.score["target"])
		
		self.table_print("Twitter", self.score["twitter"])
		
		self.table_print("Yahoo", self.score["yahoo"], last_entry=True)

	#---------------------------------------------------------------------------------------
	def set_weights(self, **kwargs):
		for w in kwargs.keys():
			if w in self.weights.keys():
				self.weights[w] = kwargs[w]
			else:
				print(f"Incorrect assignment of weight: {w}")

	# Score needs to be normalized
	def get_weighted_score(self):
		w_score = 0

		for each in self.score.keys():
			w_score += self.weights[each] * (self.score[each][0]/self.score[each][2])

		return w_score

#---------------------------------------------------------------------------------------
if __name__ == '__main__':
	evaluator = StrongPassword("P@ssw0rd")

	# Print the score card
	evaluator.score_table()

	# Print weighted score 
	print(f"\nWeighted score: {evaluator.get_weighted_score()}")
	
	# Set weights
	# evaluator.set_weights(fedex=4)
	# print(evaluator.weights)

#---------------------------------------------------------------------------------------
# EOF