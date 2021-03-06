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

/**
 * Allows a class to inherit the methods of an external class without actually extending it
 * Provides an interface/implements of sorts
 *
 * Methods may still be overloaded but are defined in extern
 * Only static methods/properties will be inherited
 *
 * @addon
 */
Function.prototype.bind = function(object) {
  var __method = this;
  return function() {
    return __method.apply(object, arguments);
  };
};

/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

//// array-like enumeration
//if (!Array.forEach) { // mozilla already supports this
//	Array.forEach = function(array, block, context) {
//		for (var i = 0; i < array.length; i++) {
//			block.call(context, array[i], i, array);
//		}
//	};
//}
//
//// generic enumeration
//Function.prototype.forEach = function(object, block, context) {
//	for (var key in object) {
//		if (typeof this.prototype[key] == "undefined") {
//			block.call(context, object[key], key, object);
//		}
//	}
//};
//
//// character enumeration
//String.forEach = function(string, block, context) {
//	Array.forEach(string.split(""), function(chr, index) {
//		block.call(context, chr, index, string);
//	});
//};
//
//// globally resolve forEach enumeration
//var forEach = function(object, block, context) {
//	if (object) {
//		var resolve = Object; // default
//		if (object instanceof Function) {
//			// functions have a "length" property
//			resolve = Function;
//		} else if (object.forEach instanceof Function) {
//			// the object implements a custom forEach method so use that
//			object.forEach(block, context);
//			return;
//		} else if (typeof object == "string") {
//			// the object is a string
//			resolve = String;
//		} else if (typeof object.length == "number") {
//			// the object is array-like
//			resolve = Array;
//		}
//		resolve.forEach(object, block, context);
//	}
//};
//

if (!Array.indexOf)
{
	Array.prototype.indexOf = function(searchElement,fromIndex)
	{
		fromIndex = fromIndex ? fromIndex : 0;
		for(var i=fromIndex; i<this.length; i++)
		{
			if (this[i] == searchElement) return i;
		}
		return -1;
	};
}
//
//if (!Array.remove)
//{
//// Array Remove - By John Resig (MIT Licensed)
//Array.remove = function(from, to) {
//  var rest = this.slice((to || from) + 1 || this.length);
//  this.length = from < 0 ? this.length + from : from;
//  return this.push.apply(this, rest);
//};
//}
//
//if (!Object.hasProperty)
//{
//	Object.hasProperty = function(searchElement)
//	{
//		for(var i in this)
//		{
//			if (this.hasOwnProperty(i))
//			{
//				if (typeof this[i] != 'undefined') return true;
//			}
//		}
//	}
//}
