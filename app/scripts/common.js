var phoneCheck = function(val) {
	var flag = true;
	var patternTwo = /^0\d{2,3}-?\d{7,8}$/;
	var pattern = /^1[3|4|5|7|8][0-9]\d{4,8}$/;

	if(pattern.test(val) || patternTwo.test(val)) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}
var emailCheck = function(val) {
	var flag = true;
	var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(pattern.test(val)) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}
var passwordCheck = function(val) {
	var flag = true;
	var pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/
	if(pattern.test(val)) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}

function getUrlParam(url, name) {
	var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
	var matcher = pattern.exec(url);
	var items = null;
	if(null != matcher) {
		try {
			items = decodeURIComponent(decodeURIComponent(matcher[1]));
		} catch(e) {
			try {
				items = decodeURIComponent(matcher[1]);
			} catch(e) {
				items = matcher[1];
			}
		}
	}
	return items;
}

function setCookie(name, value) {
	var exdate = new Date();
	var Days=2*24*60*60*1000;
    exdate.setTime(exdate.getTime() + Days);
    document.cookie = name + "=" + value+ ";expires=" + exdate;
}

function getsec(str) {
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if(str2 == "s") {
		return str1 * 1000;
	} else if(str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if(str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function deleteCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}