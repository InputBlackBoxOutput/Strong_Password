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
        /* adapted from Twitter script */
        switch(validatePassword(pass, false, null)) {
          case "obvious":
            return "Obvious";
          case "invalid":
            return "Too short";
          case "ok":
            return "Okay";
          case "perfect":
            return "Perfect";
          case "weak.isaok":
            return "Could be more secure";
          case "weak.error":
            return "Not secure enough";
          default:
            return "?";
        }
}

var _ = function(a) {return a;}
var attr = {};
attr = JSON.parse('{"baseFoucClass":"swift-loading","debugAllowed":false,"experiments":{},"asyncSocialProof":true,"preflight":false,"mediaGrid":true,"loggedIn":false,"typeaheadData":{"useThrottle":true,"accountsOnTop":false,"accounts":{"remoteQueriesEnabled":false,"showTypeaheadAccountSocialContext":false,"enabled":false,"localQueriesEnabled":false,"limit":6},"tweetContextEnabled":false,"topics":{"remoteQueriesEnabled":false,"enabled":false,"prefetchLimit":500,"showTypeaheadTopicSocialContext":false,"localQueriesEnabled":false,"limit":4},"dmAccounts":{"remoteQueriesEnabled":false,"onlyDMable":true,"enabled":false,"localQueriesEnabled":false},"remoteDebounceInterval":300,"savedSearches":{"items":[],"enabled":false},"showDebugInfo":false,"remoteThrottleInterval":300,"hashtags":{"remoteQueriesEnabled":false,"enabled":false,"prefetchLimit":500,"localQueriesEnabled":false}},"scribeParameters":{},"deciders":{"oembed_use_macaw_syndication":false,"pushState":true,"preserve_scroll_position":false,"remove_expando_after_collapse":true},"formAuthenticityToken":"ec02ea054634e6a451f8ea8001d33df71e806e42","scribeContext":null,"researchExperiments":{},"viewContainer":"#page-container","geoEnabled":false,"timelineCardsGallery":true,"notifications_timeline":null,"notifications_dm":null,"notifications_spoonbill":null,"internalReferer":"\/","routes":{"profile":"\/"},"sandboxes":{"detailsPane":"https:\/\/abs.twimg.com\/a\/1370544606\/details_pane_content_sandbox.html","jsonp":"https:\/\/abs.twimg.com\/a\/1370544606\/jsonp_sandbox.html"},"mark_old_dms_read":false,"captchaAvailable":false,"pushState":true,"environment":"production","hasPushDevice":null,"permalinkCardsGallery":false,"initialState":{"page_container_class_names":"wrapper wrapper-signup white","section":null,"body_class_names":"t1 logged-out ms-windows phx-signup","doc_class_names":null,"module":"app\/pages\/signup\/signup","ttft_navigation":false,"cache_ttl":300,"title":"Twitter \/ Create an Account"},"sectionName":"form","htmlClassNames":"","assetsBasePath":"https:\/\/abs.twimg.com\/a\/1370544606\/","searchPathWithQuery":"\/search?q=query&amp;src=typd","screenName":null,"pushStatePageLimit":500000,"latest_incoming_direct_message_id":null,"isDeviceCompletion":false,"scribeBufferSize":3,"smsDeviceVerified":null,"userId":null,"pageName":"signup","htmlFoucClassNames":"swift-loading","dragAndDropPhotoUpload":true,"deviceEnabled":false,"href":"\/signup","bannedPasswords":["000000","111111","11111111","112233","121212","123123","123456","1234567","12345678","123456789","131313","232323","654321","666666","696969","777777","7777777","8675309","987654","nnnnnn","nop123","nop123","nopqrs","noteglh","npprff","npprff14","npgvba","nyoreg","nyoregb","nyrkvf","nyrwnaqen","nyrwnaqeb","nznaqn","nzngrhe","nzrevpn","naqern","naqerj","natryn","natryf","navzny","nagubal","ncbyyb","nccyrf","nefrany","neguhe","nfqstu","nfqstu","nfuyrl","nffubyr","nhthfg","nhfgva","onqobl","onvyrl","onanan","onearl","onfronyy","ongzna","orngevm","ornire","ornivf","ovtpbpx","ovtqnqql","ovtqvpx","ovtqbt","ovtgvgf","oveqvr","ovgpurf","ovgrzr","oynmre","oybaqr","oybaqrf","oybjwbo","oybjzr","obaq007","obavgn","obaavr","obbobb","obbtre","obbzre","obfgba","oenaqba","oenaql","oenirf","oenmvy","oebapb","oebapbf","ohyyqbt","ohfgre","ohggre","ohggurnq","pnyiva","pnzneb","pnzreba","pnanqn","pncgnva","pneybf","pnegre","pnfcre","puneyrf","puneyvr","purrfr","puryfrn","purfgre","puvpntb","puvpxra","pbpnpbyn","pbssrr","pbyyrtr","pbzcnd","pbzchgre","pbafhzre","pbbxvr","pbbcre","pbeirggr","pbjobl","pbjoblf","pelfgny","phzzvat","phzfubg","qnxbgn","qnyynf","qnavry","qnavryyr","qroovr","qraavf","qvnoyb","qvnzbaq","qbpgbe","qbttvr","qbycuva","qbycuvaf","qbanyq","qentba","qernzf","qevire","rntyr1","rntyrf","rqjneq","rvafgrva","rebgvp","rfgeryyn","rkgerzr","snypba","sraqre","sreenev","sveroveq","svfuvat","sybevqn","sybjre","sylref","sbbgonyy","sberire","serqql","serrqbz","shpxrq","shpxre","shpxvat","shpxzr","shpxlbh","tnaqnys","tngrjnl","tngbef","trzvav","trbetr","tvnagf","tvatre","tvmzbqb","tbyqra","tbysre","tbeqba","tertbel","thvgne","thaare","unzzre","unaanu","uneqpber","uneyrl","urngure","uryczr","uragnv","ubpxrl","ubbgref","ubearl","ubgqbt","uhagre","uhagvat","vprzna","vybirlbh","vagrearg","vjnagh","wnpxvr","wnpxfba","wnthne","wnfzvar","wnfcre","wraavsre","wrerzl","wrffvpn","wbuaal","wbuafba","wbeqna","wbfrcu","wbfuhn","whavbe","whfgva","xvyyre","xavtug","ynqvrf","ynxref","ynhera","yrngure","yrtraq","yrgzrva","yrgzrva","yvggyr","ybaqba","ybiref","znqqbt","znqvfba","znttvr","zntahz","znevar","znevcbfn","zneyobeb","znegva","zneiva","znfgre","zngevk","znggurj","znirevpx","znkjryy","zryvffn","zrzore","zreprqrf","zreyva","zvpunry","zvpuryyr","zvpxrl","zvqavtug","zvyyre","zvfgerff","zbavpn","zbaxrl","zbaxrl","zbafgre","zbetna","zbgure","zbhagnva","zhssva","zhecul","zhfgnat","anxrq","anfpne","anguna","anhtugl","app1701","arjlbex","avpubynf","avpbyr","avccyr","avccyrf","byvire","benatr","cnpxref","cnagure","cnagvrf","cnexre","cnffjbeq","cnffjbeq","cnffjbeq1","cnffjbeq12","cnffjbeq123","cngevpx","crnpurf","crnahg","crccre","cunagbz","cubravk","cynlre","cyrnfr","cbbxvr","cbefpur","cevapr","cevaprff","cevingr","checyr","chffvrf","dnmjfk","djregl","djreglhv","enoovg","enpury","enpvat","envqref","envaobj","enatre","enatref","erorppn","erqfxvaf","erqfbk","erqjvatf","evpuneq","eboreg","eboregb","ebpxrg","ebfrohq","ehaare","ehfu2112","ehffvn","fnznagun","fnzzl","fnzfba","fnaqen","fnghea","fpbbol","fpbbgre","fpbecvb","fpbecvba","fronfgvna","frperg","frkfrk","funqbj","funaaba","funirq","fvreen","fvyire","fxvccl","fynlre","fzbxrl","fabbcl","fbppre","fbcuvr","fcnaxl","fcnexl","fcvqre","fdhveg","fevavinf","fgnegerx","fgnejnef","fgrryref","fgrira","fgvpxl","fghcvq","fhpprff","fhpxvg","fhzzre","fhafuvar","fhcrezna","fhesre","fjvzzvat","flqarl","grdhvreb","gnlybe","graavf","grerfn","grfgre","grfgvat","gurzna","gubznf","guhaqre","guk1138","gvssnal","gvtref","gvttre","gbzpng","gbctha","gblbgn","genivf","gebhoyr","gehfgab1","ghpxre","ghegyr","gjvggre","havgrq","intvan","ivpgbe","ivpgbevn","ivxvat","ibbqbb","iblntre","jnygre","jneevbe","jrypbzr","jungrire","jvyyvnz","jvyyvr","jvyfba","jvaare","jvafgba","jvagre","jvmneq","knivre","kkkkkk","kkkkkkkk","lnznun","lnaxrr","lnaxrrf","lryybj","mkpioa","mkpioaz","mmmmmm"]}');
attr.minLength=6;
attr.requireStrong= !1;
attr.username="";

function validatePassword(a, b, c) {
	var d = "tip", e = a.length > 6;
    var f = strength(a, c);
    f.score || (e = !1);
    switch (f.reason) {
    case "obvious":
    case "banned":
      d = "obvious", e = !1;
      break;
    case "whitespace":
    case "tooshort":
    case "tooweak":
      d = "invalid", e = !1;
      break;
    case "verystrong":
      d = "perfect", e = !0;
      break;
    case "good":
    case "strong":
      d = "ok", e = !0;
      break;
    case "weak":
    default:
      var g = f.score > 9;
      d = "weak." + (g ? "isaok" : "error"), e = g
    }
    return d;
}

function strength(b, c) {
	function i(a, b) {
		var c = "";
		for (var d = 0; d < b.length; d++) {
			var e = !0;
			for (var f = 0; f < a && f + d + a < b.length; f++)
				e = e && b.charAt(f + d) == b.charAt(f + d + a);
			f < a && (e = !1), e ? (d += a - 1, e = !1) : c += b.charAt(d)
		}
		return c
	}
	var d = 0, c = c || attr.username;
	if (b.length < attr.minLength)
		return {score: b.length,message: _('Too Short'),reason: "tooshort"};
	if (c && c && b.toLowerCase() == c.toLowerCase())
		return {score: 0,message: _('Too Obvious'),reason: "obvious"};
	if (attr.bannedPasswords.indexOf(b.toLowerCase()) > -1)
		return {score: 0,message: _('Too Obvious'),reason: "obvious"};
	if (attr.requireStrong) {
		var e = 10, f = "# ` ~ ! @ $ % ^ & * ( ) - _ = + [ ] { } \\ | ; : ' \" , . < > / ?".split(" ");
		f = f.map(function(a) {
			return "\\" + a
		}).join("");
		var g = ["\\d", "[a-z]", "[A-Z]", "[" + f + "]"], h = g.map(function(a) {
			return "(?=.*" + a + ")"
		}).join("");
		if (!b.match(new RegExp("(" + h + "){10,}")))
			return {score: 0,message: _('Too Weak'),reason: "tooweak"}
	}
	d += b.length * 4, d += (i(1, b).length - b.length) * 1, d += (i(2, b).length - b.length) * 1, d += (i(3, b).length - b.length) * 1, d += (i(4, b).length - b.length) * 1, b.match(/(.*[0-9].*[0-9].*[0-9])/) && (d += 5), b.match(/(.*[!@#$%^&*?_~].*[!@#$%^&*?_~])/) && (d += 5), b.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && (d += 10), b.match(/([a-zA-Z])/) && b.match(/([0-9])/) && (d += 15), b.match(/([!@#$%^&*?_~])/) && b.match(/([0-9])/) && (d += 15), b.match(/([!@#$%^&*?_~])/) && b.match(/([a-zA-Z])/) && (d += 15);
	if (b.match(/^\w+$/) || b.match(/^\d+$/))
		d -= 10;
	return d < 0 && (d = 0), d > 100 && (d = 100), d < 34 ? {score: d,message: _('Weak'),reason: "weak"} : d < 50 ? {score: d,message: _('Good'),reason: "good"} : d < 75 ? {score: d,message: _('Strong'),reason: "strong"} : {score: d,message: _('Very Strong'),reason: "verystrong"}
}

function undoBannedPasswordROT13() {
	var a = [];
	for (var b = 0, c = attr.bannedPasswords.length; b < c; b++)
		a.push(attr.bannedPasswords[b].replace(/[a-z]/gi, function(a) {
			var b = a.charCodeAt(0), c = b + 13;
			if (b <= 90 && c > 90 || c > 122)
				c -= 26;
			return String.fromCharCode(c)
		}));
	attr.bannedPasswords = a
}
