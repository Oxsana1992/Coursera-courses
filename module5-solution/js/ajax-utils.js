(function (global) {
	//Set up a namespace for our utility
	var ajaxUtils = {};

	// Reyurns an HTTP request object
	function getRequestObject() {
		if (window.XMLHttpRequest) {
			return (new XMLHttpRequest());
		}
		else if (window.ActiveXObject) {
			// For very old IE browsers (optional)
			return (new ActiveXObject("Microsoft.XMLHTTP"));
		}	
		else {
			global.alert("Ajax is njt supported!");
			return(null);
		}	
	}

//Makes an Aja GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
	function(requestUrl, responseHandler) {
		var request = getRequestObject();
		request.onreadystatechange = 
			function() {
				handleResponse(request, responseHandler);
			};
			request.open("GET", requestUrl, true);
			request.send(null); //for POST only
	};


//Only calls user provided 'responseHandler'
function handleResponse(request, responseHandler) {
	if ((request.readyState == 4) &&
		(request.status == 200)) {
		responseHandler(request);
	}
}

// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;

})(window);
