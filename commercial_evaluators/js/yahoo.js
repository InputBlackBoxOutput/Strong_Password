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
/* adapted from Yahoo script */
    return ymem_validation.PasswdMeter.checkPass(pass);
}

var ymem_validation = {};

ymem_validation.config = {};
ymem_validation.config.bgcolor_mediocre="yellow";
ymem_validation.config.bgcolor_strong="#4AE817";
ymem_validation.config.bgcolor_strongest="#4AE817";
ymem_validation.config.bgcolor_weak="red";
ymem_validation.config.max_len=32;
ymem_validation.config.min_len=6;
ymem_validation.config.msg_initialState="Password Strength";
ymem_validation.config.msg_invalid="Invalid Password";
ymem_validation.config.msg_mediocre="Weak";
ymem_validation.config.msg_strong="Strong";
ymem_validation.config.msg_strongest="Very strong";
ymem_validation.config.msg_weak="Too short";

ymem_validation.empty = function(a) {
    var b = false;
    if (a == null || a == "" || a == "undefined") {
        b = true
    }
    return b
};
ymem_validation.formatValidationResponse = function(b) {
    var a = {};
    if (b.length == 0) {
        a.resultCode = ymem_validation.SUCCESS
    } else {
        a.resultCode = ymem_validation.FAIL;
        a.errorCodes = b
    }
    return a
};

ymem_validation.password = {};
ymem_validation.password.validate = function(userpwd, fname, lname, yid) {
    var errorArray = new Array();
    if (ymem_validation.empty(userpwd)) {
        errorArray[errorArray.length] = ymem_validation.USERINPUTISEMPTY;
        return ymem_validation.formatValidationResponse(errorArray)
    }
    var regex = "";
    var original = userpwd;
    var re = "";
    var lengthArray = new Array();
    var lengthToDataArray = new Array();
    if (fname != "") {
        lengthArray[lengthArray.length] = fname.length;
        lengthToDataArray[fname.length] = fname
    }
    if (lname != "") {
        lengthArray[lengthArray.length] = lname.length;
        if (lengthToDataArray[lname.length] != undefined) {
            lengthToDataArray[lname.length] += "|" + lname
        } else {
            lengthToDataArray[lname.length] = lname
        }
    }
    if (yid != "") {
        lengthArray[lengthArray.length] = yid.length;
        if (lengthToDataArray[yid.length] != undefined) {
            lengthToDataArray[yid.length] += "|" + yid
        } else {
            lengthToDataArray[yid.length] = yid
        }
    }
    var pwd = "password";
    lengthArray[lengthArray.length] = pwd.length;
    if (lengthToDataArray[pwd.length] != undefined) {
        lengthToDataArray[pwd.length] += "|" + pwd
    } else {
        lengthToDataArray[pwd.length] = pwd
    }
    lengthArray.sort(function(a, b) {
        return b - a
    });
    for (var i in lengthArray) {
        if (lengthToDataArray[lengthArray[i]] != undefined && lengthToDataArray[lengthArray[i]] == null) {
            continue
        } else {
            if (lengthToDataArray[lengthArray[i]] != undefined && lengthToDataArray[lengthArray[i]] != null) {
                re += lengthToDataArray[lengthArray[i]] + "|";
                lengthToDataArray[lengthArray[i]] = null
            }
        }
    }
    re = eval("/" + re + "/gi");
    userpwd = userpwd.replace(re, "");
    if (userpwd.length < 3) {
        var pwdre = /password/gi;
        if (original) {
            if (pwdre.test(original)) {
                errorArray[errorArray.length] = ymem_validation.PWDCONTAINSPWDWORD
            }
        }
        if (fname) {
            var fnamere = eval("/" + fname + "/gi");
            if (fnamere.test(original)) {
                errorArray[errorArray.length] = ymem_validation.PWDCONTAINSFNAME
            }
        }
        if (lname) {
            var lnamere = eval("/" + lname + "/gi");
            if (lnamere.test(original)) {
                errorArray[errorArray.length] = ymem_validation.PWDCONTAINSLNAME
            }
        }
        if (yid) {
            var yidre = eval("/" + yid + "/gi");
            if (yidre.test(original)) {
                errorArray[errorArray.length] = ymem_validation.PWDCONTAINSYID
            }
        }
    } else {
        if (fname != "" && userpwd.indexOf(fname) != -1) {
            errorArray[errorArray.length] = ymem_validation.PWDCONTAINSFNAME
        }
        if (lname != "" && userpwd.indexOf(lname) != -1) {
            errorArray[errorArray.length] = ymem_validation.PWDCONTAINSLNAME
        }
        if (yid != "" && userpwd.indexOf(yid) != -1) {
            errorArray[errorArray.length] = ymem_validation.PWDCONTAINSYID
        }
        if (userpwd.indexOf(pwd) != -1) {
            errorArray[errorArray.length] = ymem_validation.PWDCONTAINSPWDWORD
        }
    }
    return ymem_validation.formatValidationResponse(errorArray)
};

ymem_validation.PasswdMeter = {config: {},result: "weak",checkPass: function(strPasswd) {
        this.len = false;
        this.letters = false;
        this.numbers = false;
        this.name = false;
        this.specials = false;
        this.repeat = false;
        this.order = false;
        //strPasswd = ymem_validation.config.passwd.value;
        if (strPasswd.length > 0) {
            this.len = this.test_len(strPasswd);
            this.name = this.test_name(strPasswd);
            this.letters = this.test_letters(strPasswd);
            this.numbers = this.test_numbers(strPasswd);
            this.specials = this.test_special(strPasswd);
            this.draw();
            return this.result;
        } else {
            if (strPasswd.length == "") {
                this.draw(true)
            }
        }
    },do_results: function() {
        result = "weak";
        if (this.name) {
            result = "invalid"
        } else {
            if (!this.len) {
                result = "weak"
            } else {
                if (!this.len && !this.letters && !this.numbers && !this.specials) {
                    result = "weak"
                } else {
                    if (this.len && !this.letters && !this.numbers && !this.specials) {
                        result = "mediocre"
                    } else {
                        if (this.len && !this.letters && this.numbers && !this.specials) {
                            result = "strong"
                        } else {
                            if (this.len && !this.letters && !this.numbers && this.specials) {
                                result = "strong"
                            } else {
                                if (this.len && this.letters && !this.numbers && !this.specials) {
                                    result = "strong"
                                } else {
                                    if (this.len && !this.letters && this.numbers && this.specials) {
                                        result = "strongest"
                                    } else {
                                        if (this.len && this.letters && !this.numbers && this.specials) {
                                            result = "strongest"
                                        } else {
                                            if (this.len && this.letters && this.numbers && !this.specials) {
                                                result = "strongest"
                                            } else {
                                                if (this.len && this.letters && this.numbers && this.specials) {
                                                    result = "strongest"
                                                } else {
                                                    result = "weak"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.result = result
    },draw: function(d) {
        var e = ymem_validation.config.msg_initialState;
        var a = "white";
        var c = 0;
        if (d) {
            this.result = "lame"
        } else {
            this.do_results()
        }
        switch (this.result) {
            case "strongest":
                a = ymem_validation.config.bgcolor_strongest;
                e = ymem_validation.config.msg_strongest;
                c = 4;
                break;
            case "strong":
                a = ymem_validation.config.bgcolor_strong;
                e = ymem_validation.config.msg_strong;
                c = 3;
                break;
            case "mediocre":
                a = ymem_validation.config.bgcolor_mediocre;
                e = ymem_validation.config.msg_mediocre;
                c = 2;
                break;
            case "weak":
                a = ymem_validation.config.bgcolor_weak;
                e = ymem_validation.config.msg_weak;
                c = 1;
                break;
            case "invalid":
                a = ymem_validation.config.bgcolor_weak;
                e = ymem_validation.config.msg_invalid;
                c = 1;
                break
        }
        //ymem_validation.config.passwordGuidence.innerHTML = e;
        this.result = e;
        // for (i = 1; i < 5; i++) {
        //     var b = "meter" + i;
        //     if (document.getElementById(b)) {
        //         if (i > c) {
        //             a = "white"
        //         }
        //         document.getElementById(b).style.backgroundColor = a
        //     }
        // }
    },test_name: function(e) {
        var d = (ymem_validation.config.fnameData != undefined) ? ymem_validation.config.fnameData.value : "";
        var c = (ymem_validation.config.lnameData != undefined) ? ymem_validation.config.lnameData.value : "";
        var b = (ymem_validation.config.uidData != undefined) ? ymem_validation.config.uidData.value : "";
        var a = ymem_validation.password.validate(e, d, c, b);
        return a.resultCode == ymem_validation.SUCCESS ? false : true
    },test_len: function(a) {
        if ((a.length > (ymem_validation.config.min_len - 1)) && (a.length < (ymem_validation.config.max_len + 1))) {
            return true
        }
        return false
    },test_letters: function(a) {
        if (a.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            return true
        }
        return false
    },test_numbers: function(d) {
        var b = false;
        var a = false;
        var c = false;
        if (d.match(/\d+/)) {
            a = true
        }
        if (d.match(/[a-z].*/i)) {
            c = true
        }
        if (a && c) {
            b = true
        }
        return b
    },test_special: function(b) {
        var a = b;
        a = a.replace(/[!@#\$%^&\*?_~\(\)]*/, "");
        if (a != "" && b.match(/[!,@,#,\$,%,^,&,\*,?,_,~]/)) {
            return true
        }
        return false
    }};
