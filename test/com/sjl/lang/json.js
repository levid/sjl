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
if(!Object.prototype.toJSONString){
Array.prototype.toJSONString=function(){
var a=[],i,l=this.length,v;
for(i=0;i<l;i+=1){
v=this[i];
switch(typeof v){
case "object":
if(v){
if(typeof v.toJSONString==="function"){
a.push(v.toJSONString());
}
}else{
a.push("null");
}
break;
case "string":
case "number":
case "boolean":
a.push(v.toJSONString());
}
}
return "["+a.join(",")+"]";
};
Boolean.prototype.toJSONString=function(){
return String(this);
};
Date.prototype.toJSONString=function(){
function f(n){
return n<10?"0"+n:n;
}
return "\""+this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z\"";
};
Number.prototype.toJSONString=function(){
return isFinite(this)?String(this):"null";
};
Object.prototype.toJSONString=function(){
var a=[],k,v;
for(k in this){
if(typeof k==="string"&&this.hasOwnProperty(k)){
v=this[k];
switch(typeof v){
case "object":
if(v){
if(typeof v.toJSONString==="function"){
a.push(k.toJSONString()+":"+v.toJSONString());
}
}else{
a.push(k.toJSONString()+":null");
}
break;
case "string":
case "number":
case "boolean":
a.push(k.toJSONString()+":"+v.toJSONString());
}
}
}
return "{"+a.join(",")+"}";
};
(function(s){
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
s.parseJSON=function(_b){
var j;
function walk(k,v){
var i;
if(v&&typeof v==="object"){
for(i in v){
if(v.hasOwnProperty(i)){
v[i]=walk(i,v[i]);
}
}
}
return _b(k,v);
}
if(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(this.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,""))){
j=eval("("+this+")");
return typeof _b==="function"?walk("",j):j;
}
throw new SyntaxError("parseJSON");
};
s.toJSONString=function(){
if(/["\\\x00-\x1f]/.test(this)){
return "\""+this.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+this+"\"";
};
})(String.prototype);
}

