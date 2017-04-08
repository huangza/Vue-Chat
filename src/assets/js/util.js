(function(window){
	var _util = {}

	if (window.util) {
	} else {
		window.util = _util
	}

	_util.typeof = _typeof
	_util.isPC = _isPC

	function _typeof (param) {
		return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
	}

	function _isPC() {  
	    var userAgentInfo = navigator.userAgent;  
	    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]; 
	    var flag = true;  
	    for (var v = 0, len = Agents.length; v < len; v++) {  
	       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
	    }  
	    return flag;  
	}

})(window)