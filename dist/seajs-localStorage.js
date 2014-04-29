(function () {

	if(!('localStorage' in window) || !('slice' in [])) {
		return ;
	}

	function save(uri, dataUri) {
		dataUri = dataUri.toString();
		localStorage.setItem('seajscache<' + uri + '>', 'data:text/javascript,define(' + dataUri + ');');
	}

	function load(uri) {
		var dataUri = localStorage.getItem('seajscache<' + uri + '>');
		if(dataUri && dataUri.length > 0) {
			return dataUri;
		} else {
			return uri;
		}
	}

	function latestSource(uri) {
		// TODO:
		// 检测本地缓存是否最新
		// 
		return load(uri);
	}

	var oldRequest = seajs.request;
	seajs.request = function (url, callback, charset) {
		if(!/\.css(?:\?|$)/i.test(url)) {
			var cacheUri = latestSource(url);
			if(cacheUri && cacheUri.length > 0) {
				url = cacheUri;
			}
		}
		return oldRequest.apply(this, Array.prototype.slice.call(arguments));
	};

	var oldExec = seajs.Module.prototype.exec;
	seajs.Module.prototype.exec = function () {

		if(this.uri && this.factory && !/\.css(?:\?|$)/i.test(this.uri)) {
			save(this.uri, this.factory.toString()/*.replace(/\r/, '').replace(/\n/, '')*/);
		}
		return oldExec.apply(this, Array.prototype.slice.call(arguments));
	}

})();