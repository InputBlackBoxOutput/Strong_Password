from passwd import PasswordFeatures

class CommercialEvaluators(PasswordFeatures):
	def __init__(self, password):
		super().__init__(password)

	'''
	Used by www.12306.cn (China railways)
	Grading: 1-Secure  2-Average  3-Dangerous
	Note: Special characters other then underscore not accepted by this evaluator
	'''
	def _12306cn(self):
		if self.length > 6 or self.letters_only() or self.numbers_only():
			return 3

		else:
			if (self.alpha_count() != 0) and (self.digit_count() != 0) and self.contains('_'):
				return 1
			else:
				return 2
	'''
	Used by www.bloomberg.com (Media company)
	Grading: 0-Too short 1-Weak 2-Good 3-Strong
	'''
	def bloomberg(self):
		c = 0
		if self.length > 5:
			if self.lowercase_count() != 0:
				c += 1
			if self.uppercase_count() != 0:
				c += 1
			if self.digit_count() != 0:
				c += 3
			if self.special_count(custom="#$%&*()!@'") != 0:
				c += 4

		if c == 0:
			return 0
		elif c > 0 and c < 4:
			return 1
		elif c >= 4 and c <=7:
			return 2
		else:
			return 3

if __name__ == '__main__':
	CE = CommercialEvaluators("cool")
	print(CE._12306cn())
	print(CE.bloomberg())