(function(window){
	var _util = {}

	if (window.util) {
	} else {
		window.util = _util
	}

	_util.typeof = _typeof
	_util.isPC = _isPC
	_util.setLocal = _setLocalStorage
	_util.getLocal = _getLocalStorage
	_util.delLocal = _delLocalStorage

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

	function _setLocalStorage(name, param) {
		if (window.localStorage) {
			if (name && param) {
				_delLocalStorage(name);
				window.localStorage.setItem(name, JSON.stringify(param) );
				return true;
			}
		}
		return false;
	}

	function _getLocalStorage(name) {
		if (window.localStorage) {
			if (name) {
				return JSON.parse(window.localStorage.getItem(name))
			}
		}
		return void 0;
	}

	function _delLocalStorage(name) {
		if (window.localStorage) {
			if (name) {
				window.localStorage.removeItem(name);
				return true;
			}
		}
		return false;
	}

})(window)