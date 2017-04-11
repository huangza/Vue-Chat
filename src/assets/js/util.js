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
	_util.setCookie = _setCookie
	_util.getCookie = _getCookie
	_util.delCookie = _delCookie

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

	// 将数据保存在 LS 中
	// 返回操作是否成功
	function _setLocalStorage(name, param) {
		// 检查是否支持 LS （包括无痕模式）
		if (_isSupportLocalStorage()) {
			if (name && param) {
				_delLocalStorage(name);
				window.localStorage.setItem(name, JSON.stringify(param) );
				return true;
			}
		} else {
		// 不支持则使用 cookie
			var res = this.setCookie(name, param)
			return res
		}
		return false;
	}

	// 从 LS 中获取数据
	// 返回字符串数据或者空字符串
	function _getLocalStorage(name) {
		// 检查是否支持 LS
		if (_isSupportLocalStorage()) {
			if (name) {
				return JSON.parse(window.localStorage.getItem(name))
			}
		} else {
			// 从 cookie 中拿
			var res = this.getCookie(name).replace(/["']/g, '')	// 返回的串有引号包裹着
			// console.log(res.length)
			return res
		}
		return '';
	}

	// 在 LS 中删除指定名称的数据
	// 返回操作是否成功
	function _delLocalStorage(name) {
		if (_isSupportLocalStorage()) {
			if (name) {
				window.localStorage.removeItem(name);
				return true;
			}
		} else {
			// cookie 方案
			var res = this.delCookie(name)
			return res
		}
		return false;
	}

	// 检查是否支持 LS，或者是无痕模式下是否能用 LS
	function _isSupportLocalStorage() {
		if (!window.localStorage) {
			// alert('no localStorage')
			return false
		} else {
			try {
				localStorage.setItem('test', 'testValue')
				localStorage.removeItem('test')
				// return true
				return false	// debug
			} catch (e) {
				// alert('无痕中'+ e.code)
				return false
			}
		}
	}

	// 检查是否支持 cookie
	function _isSupportCookie() {
		if (!(document.cookie || navigator.cookieEnabled)) {
			alert('no cookie')
			return false
		}
		return true
	}

	// 设置 cookie
	// 返回操作是否成功
	function _setCookie(name, param, expires) {
		if (_isSupportCookie()) {
			try {
				/*var d = new Date();
				d.setTime(d.getTime()+(24*60*60*1000));	// 默认保存一天
				var expires = "expires="+d.toGMTString();
				document.cookie = name + "=" + JSON.stringify(param) + "; " + expires + "; path=/";*/

				if (param === null) {
					value = "";
				}
				// 暂时不需要这些变量
				var path, domain, secure;
				// 有效期（天数）
                expires = expires || 1;	// 默认保存一天
                expires = new Date( +new Date() + 86400000*expires );
                // JSON.stringify 将对象序列化成 json 格式，基本类型不受影响
                // encodeURIComponent 编码加密
                document.cookie = name + "=" + encodeURIComponent(JSON.stringify(param))
                    + ((expires)?"; expires="+expires.toUTCString():"")
                    + ((path)?"; path="+path:"; path=/")
                    + ((domain)?"; domain="+domain:"")
                    + ((secure)?"; secure":"");
				return true;
			} catch(e) {
				console.log(e)
				return false
			}
		} else {
			return false
		}
	}

	function _getCookie(name) {
		if (_isSupportCookie()) {
			/*name = name + "=";
			var cookieArr = document.cookie.split(';');
			for(var i=0, len=cookieArr.length; i<len; i++) {
				var c = cookieArr[i].trim();
				if (c.indexOf(name)===0) return c.substring(name.length,c.length);
			}
			return "";*/
			// 在 cookie 中，通过匹配 name 值的正则，最后看是否有数据内容
			// 有的话将解码后的字符串返回，否则返回空字符串
			var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            return arr != null ? decodeURIComponent(arr[2]) : '';
		}
		return ''
	}

	function _delCookie(name) {
		if (_isSupportCookie()) {
			/*var d = new Date('1 1,1970')
			var expires = "expires="+d.toGMTString();
			document.cookie = name + "=; " + expires + "; path=/";*/

			// 检查是否存在该 cookie
			if (this.getCookie(name)) {
				// 将有效期设为当前日期之前来清除 cookie
				this.setCookie(name, '', -365)
				return true
			}
		}
		return false
	}

})(window)