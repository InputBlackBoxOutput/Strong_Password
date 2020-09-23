var args = process.argv.slice(2);
var fs = require('fs');
var rs = fs.createReadStream(args[0]);
var ws = fs.createWriteStream(args[1]);
var rl = require('readline').createInterface(rs,ws);
rl.on('line', function (line) {
        ws.write(line+'\t'+tryPs(line)+'\n');
});
rl.on('close', function() {
          ws.end();
          process.exit(0);
});
function tryPs(pass) {
	/* adapted from battle script */
	switch (checkPassword(pass)) {
		case 0:
		return "Invalid";
		break;
		case 1:
            //$.report.monitor("weakPwd");
            return "Too Short";
            break;
            case 2:
            //$.report.monitor("midPwd");
            return "Weak";
            break;
            case 3:
            //$.report.monitor("strongPwd")
            return "Fair";
            break;
            case 4:
            return "Strong";
        }
    }
function checkPassword(password){


	/**
	 * Regex patterns for password validation.
	 * passwordPattern1: The ASCII printable character set
	 * passwordPattern2: At least one letter and one number
	 * maxRepetition: Use lower values to permit greater repetition.
	 * maxSequentiality: Use lower values to permit greater sequentiality.
     * maxSimilarity: Max similar characters allowed between password and email.
	 */

			this.passwordPattern1 = new RegExp('^[\x20-\x7E]+$');
			this.passwordPattern2 = new RegExp('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*).+$');
			this.maxRepetition = 2;
			this.maxSequentiality = 4;
            this.maxSimilarity = 4;
            return rate(password);
}

function rate(password1) {

		password1 = typeof password1 !== 'undefined' ? password1 : '';
		
		var result = 0;

		if (password1.length > 0) {
			if (password1.length >= 8) {
				if (this.passwordPattern1.test(password1) && this.passwordPattern2.test(password1) && password1.length > 10 && !hasRepetition(password1) && !hasSequentiality(password1)) {
					result = 4;
				} else {
					if (this.passwordPattern1.test(password1) && this.passwordPattern2.test(password1) && password1.length > 8 && !hasRepetition(password1) && !hasSequentiality(password1)) {
						result = 3;
					} else {
						result = 2;
					}
				}
			} else {
				result = 1;
			}
		}

		return result;

}

function hasRepetition(string) {

		string = typeof string !== 'undefined' ? string : '';
		pLen = typeof pLen !== 'undefined' ? pLen : 2;

		var pLen = this.maxRepetition,
			res = '',
			repeated;

		for (var i = 0, len = string.length; i < len; i++) {
			repeated = true;
			for (var j = 0; j < pLen && (j + i + pLen) < string.length; j++) {
				repeated = repeated && (string.charAt(j + i) === string.charAt(j + i + pLen));
			}
			if (j < pLen) {
				repeated = false;
			}
			if (repeated) {
				i += pLen - 1;
				repeated = false;
			} else {
				res += string.charAt(i);
			}
		}

		return res.length - string.length < 0;

	}

function hasSequentiality(string) {

		string = typeof string !== 'undefined' ? string.toLowerCase() : '';

		var pLen = this.maxSequentiality,
			lowercase = 'abcdefghijklmnopqrstuvwxyz',
			lowercaseReverse = lowercase.split('').reverse().join(''),
			numbers = '1234567890',
			numbersReverse = numbers.split('').reverse().join(''),
			qwerty = 'qwertyuiopasdfghjklzxcvbnm!@#$%^&*()_+',
			qwertyReverse = qwerty.split('').reverse().join(''),
			chunk = ' ' + string.slice(0, pLen - 1);

		for (var i = pLen, len = string.length; i < len; i++) {
			chunk = chunk.slice(1) + string.charAt(i);
			if (lowercase.indexOf(chunk) > -1 || numbers.indexOf(chunk) > -1 || qwerty.indexOf(chunk) > -1 ||
				lowercaseReverse.indexOf(chunk) > -1 || numbersReverse.indexOf(chunk) > -1 || qwertyReverse.indexOf(chunk) > -1) {
				return true;
			}
		}

		return false;

	}


	/**
	 * Check password to ensure it meets minimum requirements.
	 * Returns 0 if condition was not checked or password was empty.
	 * Returns -1 if condition was not met.
	 * Returns 1 if condition was met.
	 *
	 * @param password1 The password to be checked.
	 * @param password2 The re-entered password.
	 * @param email The user’s email address.
	 */
	// check: function(password1, password2, email) {

	// 	password1 = typeof password1 !== 'undefined' ? password1 : '';
	// 	password2 = typeof password2 !== 'undefined' ? password2 : '';
	// 	email = typeof email !== 'undefined' ? email : '';

	// 	var results = [0, 0, 0, 0, 0];

	// 	if (password1.length > 0) {
	// 		// Password must be between 8–16 characters in length.
	// 		if (password1.length >= 8 && password1.length <= 16) {
	// 			results[0] = 1;
	// 		} else {
	// 			results[0] = -1;
	// 		}
	// 		// Password may only contain ASCII printable characters.
	// 		if (this.passwordPattern1.test(password1)) {
	// 			results[1] = 1;
	// 		} else {
	// 			results[1] = -1;
	// 		}
	// 		// Password must contain at least one alphabetic character and one numeric character.
	// 		if (this.passwordPattern2.test(password1)) {
	// 			results[2] = 1;
	// 		} else {
	// 			results[2] = -1;
	// 		}
	// 		// Cannot use password similar to account name.
 //            results[3] = this.isSimilar(password1, email);

	// 		// Passwords must match.
	// 		if (password2 === '') {
	// 			results[4] = 0;
	// 		} else if (password1 === password2) {
	// 			results[4] = 1;
	// 		} else {
	// 			results[4] = -1;
	// 		}
	// 	}

	// 	return results;
	// },

    /**
     * Check if password is similar to account name.
     * Returns -1 if similar.
     * Returns 1 if not.
     *
     * @param password1 The password to be checked.
     * @param email The user’s email address.
     */
    // isSimilar: function(password1, email) {
    //     if (password1 === "" || email === "" || password1.length < this.maxSimilarity) {
    //         return 1;
    //     }
    //     password1 = password1.toLowerCase();
    //     email = email.toLowerCase();
    //     for (var i = 0; i <= email.length - this.maxSimilarity; i++) {
    //         if (password1.indexOf(email.substring(i, i + this.maxSimilarity)) > -1) {
    //             return -1;
    //         }
    //     }
    //     return 1;
    // },

	/**
	 * Rate a password’s strength.
	 * Returns 0 if password is empty or untested.
	 * Returns 1 if password is too short.
	 * Returns 2 if password is weak.
	 * Returns 3 if password is fair.
	 * Returns 4 if password is strong.
	 *
	 * @param password1 The password to be rated.
	 */
	// rate: function(password1) {

	// 	password1 = typeof password1 !== 'undefined' ? password1 : '';
		
	// 	var result = 0;

	// 	if (password1.length > 0) {
	// 		if (password1.length >= 8) {
	// 			if (this.passwordPattern1.test(password1) && this.passwordPattern2.test(password1) && password1.length > 10 && !this.hasRepetition(password1) && !this.hasSequentiality(password1)) {
	// 				result = 4;
	// 			} else {
	// 				if (this.passwordPattern1.test(password1) && this.passwordPattern2.test(password1) && password1.length > 8 && !this.hasRepetition(password1) && !this.hasSequentiality(password1)) {
	// 					result = 3;
	// 				} else {
	// 					result = 2;
	// 				}
	// 			}
	// 		} else {
	// 			result = 1;
	// 		}
	// 	}

	// 	return result;

	// },

	/**
	 * Check for repetition in a string.
	 * Returns true if the string has high repetition, false otherwise.
	 *
	 * @param string The string to check.
	 */
	// hasRepetition: function(string) {

	// 	string = typeof string !== 'undefined' ? string : '';
	// 	pLen = typeof pLen !== 'undefined' ? pLen : 2;

	// 	var pLen = this.maxRepetition,
	// 		res = '',
	// 		repeated;

	// 	for (var i = 0, len = string.length; i < len; i++) {
	// 		repeated = true;
	// 		for (var j = 0; j < pLen && (j + i + pLen) < string.length; j++) {
	// 			repeated = repeated && (string.charAt(j + i) === string.charAt(j + i + pLen));
	// 		}
	// 		if (j < pLen) {
	// 			repeated = false;
	// 		}
	// 		if (repeated) {
	// 			i += pLen - 1;
	// 			repeated = false;
	// 		} else {
	// 			res += string.charAt(i);
	// 		}
	// 	}

	// 	return res.length - string.length < 0;

	// },

	/**
	 * Check for sequentiality in a string.
	 * Returns true if the string has high sequentiality, false otherwise.
	 *
	 * @param string The string to check.
	 */
// 	hasSequentiality: function(string) {

// 		string = typeof string !== 'undefined' ? string.toLowerCase() : '';

// 		var pLen = this.maxSequentiality,
// 			lowercase = 'abcdefghijklmnopqrstuvwxyz',
// 			lowercaseReverse = lowercase.split('').reverse().join(''),
// 			numbers = '1234567890',
// 			numbersReverse = numbers.split('').reverse().join(''),
// 			qwerty = 'qwertyuiopasdfghjklzxcvbnm!@#$%^&*()_+',
// 			qwertyReverse = qwerty.split('').reverse().join(''),
// 			chunk = ' ' + string.slice(0, pLen - 1);

// 		for (var i = pLen, len = string.length; i < len; i++) {
// 			chunk = chunk.slice(1) + string.charAt(i);
// 			if (lowercase.indexOf(chunk) > -1 || numbers.indexOf(chunk) > -1 || qwerty.indexOf(chunk) > -1 ||
// 				lowercaseReverse.indexOf(chunk) > -1 || numbersReverse.indexOf(chunk) > -1 || qwertyReverse.indexOf(chunk) > -1) {
// 				return true;
// 			}
// 		}

// 		return false;

// 	}


// });

/**
 * Email validation.
 *
 * @copyright   2011, Blizzard Entertainment, Inc
 * @class       Email
 */
// var Email = Class.extend({

// 	/**
// 	 * Regex patterns for password validation.
// 	 */
// 	emailPattern: new RegExp(),

// 	/**
// 	 * Configuration.
// 	 */
// 	config: {},

// 	/**
// 	 * Initialize the class and apply the config.
// 	 */
// 	init: function(config) {

// 		config = typeof config !== 'undefined' ? config : {};

// 		// Merge configuration
// 		this.config = $.extend({
// 			emailPattern: new RegExp('^[0-9a-zA-Z+_.-]+@[0-9a-zA-Z_-]+\\.[0-9a-zA-Z_.-]+$')
// 		}, config);

// 		this.emailPattern = this.config.emailPattern;

// 	},

	/**
	 * Check email address to ensure it meets minimum requirements.
	 * Returns 0 if condition was not checked or email was empty.
	 * Returns -1 if condition was not met.
	 * Returns 1 if condition was met.
	 *
	 * @param email1 The email address to be checked.
	 * @param email2 The re-entered email address (only checked if config.verify is true).
	 */
// 	check: function(email1, email2) {

// 		email1 = typeof email1 !== 'undefined' ? email1 : '';
// 		email2 = typeof email2 !== 'undefined' ? email2 : '';

// 		var results = [0, 0];

// 		if (email1 === '') {
// 			results[0] = 0; // no data
// 		} else if (this.emailPattern.test(email1)) {
// 			results[0] = 1; // valid
// 		} else {
// 			results[0] = -1; // invalid
// 		}

// 		if (email1 === '') {
// 			results[1] = 0; // no data
// 		} else if (email1.toLocaleLowerCase() === email2.toLocaleLowerCase()) {
// 			results[1] = 1; // match
// 		} else {
// 			results[1] = -1; // mismatch
// 		}

// 		return results;

// 	}

// });
