/**
 * Standard JavaScript Library
 *
 * LICENSE
 *
 * This source file is subject to the sjl Public License license that
 * is bundled with this package in the file LICENSE.txt.
 *
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 * @copyright Copyright (c) 2008, Danny Graham, Scott Thundercloud
 */

Import("com.sjl.EventDispatcher");
Import("com.sjl.io.XMLHttpRequest");

Namespace ("com.sjl.io");

/**
 * Creates an instance of com.sjl.io.Http
 *
 * @class Handles XHR requests and provides abstration and compatability to browsers that
 * don't natively implement XMLHttpRequest
 *
 * @constructor
 * @requires com.sjl.EventDispatcher Implements EventDispatcher 'interface'
 * @see com.sjl.EventDispatcher
 * @author Scott Thundercloud
 */
com.sjl.io.Http = Class.create();
com.sjl.io.Http.inherits("com.sjl.EventDispatcher");
com.sjl.io.Http.prototype.initialize = function(obj)
{
	/**
	 * Cross browser XHR Object
	 * @private
	 * @type XMLHttpRequest
	 */
	var xhr = new com.sjl.io.XMLHttpRequest();

	/**
	 * Method for the request GET|POST|HEAD|PUT|DELETE|OPTIONS
	 * @private
	 * @type {string}
	 */
	var method = null;

	/**
	 * URI for the request
	 * @private
	 * @type {string}
	 */
	var url = null;

	/**
	 * Indicates whether or not the request should be made asyncronously. Defaults to true.
	 * @type {boolean}
	 * @private
	 */
	var async = null;

	/**
	 * Optional username for the request
	 * @private
	 * @type {string}
	 */
	var username = null;

	/**
	 * Optional password for the request
	 * @private
	 * @type {string}
	 */
	var password = null;

	/**
	 * Optional array of headers to set on the request object
	 * @private
	 * @type {array}
	 */
	var headers = null;

	/**
	 * Optional data to be sent with the request (most commonly for POST)
	 * @private
	 * @type {mixed}
	 */
	var payload = null;

	/**
	 * Optional compatability option for sending a direct callback signature
	 * @private
	 * @type {function}
	 * @deprecated Use addListener() on an instance of Http instead
	 */
	var callback = null;

	/**
	 * Optional identifier for the content type.  This can help with determining expected response type.
	 * @type {string}
	 */
	this.contentType = null;

	/**
	 * Optional identifier for the mime type.  This can help with determining expected response data.
	 * @type {string}
	 */
	this.mimeType = null;

	/**
	 * Looks at the request passed in and sets up internal values
	 * @private
	 * @type Void
	 */
	var SetupRequest = function(request)
	{
		method = request.method||'GET';
		url = request.url;
		async = request.async||true;
		username = request.username||null;
		password = request.password||null;
		headers = request.headers||null;
		payload = request.payload||request.sendData||request.data||null;

		callback = request.loaded||null;

		this.contentType = request.contentType||'text/xml';
		this.mimeType = request.mimeType||null;
	}

	/**
	 * Callback handler for the requests's onreadystatechange
	 * @type Void
	 */
	this._onreadystatechange = function()
	{
		var event;
		switch(xhr.readyState)
		{
			case 0: // UNSENT
				event = 'onInit';
			break;
			case 1: // OPEN
				event = 'onOpen';
			break;
			case 2: // SENT
				event = 'onSend';
			break;
			case 3: // LOADING
				event = 'onData';
			break;
			case 4: // DONE
				event = 'onLoad';
			break;
			default: // ERROR
				event = 'onError';
			break;
		}

		if (callback && event == 'onLoad') callback(xhr,url);

		this.dispatch({
			type:event,
			xhr:xhr,
			url:url
		});
	};

	/**
	 * Opens the request and sets up the onreadystatechange callback for IE
	 * @type Void
	 */
	this.Open = function()
	{
		xhr.open(method,url,async,username,password);

		if (headers)
		{
			for(var i in headers)
			{
				if(headers.hasOwnProperty(i))
				{
					xhr.setRequestHeader(i,headers[i]);
				}
			}
		}

		// Setup callback for IE compatability
		if (document.all) xhr.onreadystatechange = this._onreadystatechange.bind(this);
	}

	/**
	 * Sends the request to the server
	 * @type Void
	 */
	this.Send = function()
	{
		// TODO: Implement object conversion to JSON
		xhr.send(payload);
	};

	/**
	 * Method for calling a request subsequent to an earlier request, or for defferred requests
	 * @type Void
	 */
	this.Request = function(obj)
	{
		SetupRequest(obj);
		this.Open();
		this.Send();
	};

	// If we're in IE we don't want to set this up until after we've called open - IE does a reset on open
	if (!document.all) xhr.onreadystatechange = this._onreadystatechange.bind(this);

	if (typeof(obj) == 'undefined') return;

	SetupRequest(obj);

	this.Open();
	this.Send();
}