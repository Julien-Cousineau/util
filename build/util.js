(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.util = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// String :Formatter, Python approach to add values in strings. 
if (!String.prototype.format) {
    String.prototype.format = function() {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}


//String :pads left
String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};
 
//String :pads right
String.prototype.rpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
};

// Extract host name from url
if (!String.prototype.getHostName) {
    String.prototype.getHostName = function() {
        let match = this.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) return match[2];
        return null;
    };
}

// String : replaceAll
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(search, replacement) {
        let target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
}

// String : Add zeros(or c) infront of numbers.
if (!String.prototype.padZero) {
    String.prototype.padZero= function(_len, _c){
        let s= '', 
            c= _c || '0', 
            len= (_len || 2)-this.length;
        while(s.length<len) s+= c;
        return s+this;
    };
}

// Date : Add hours
if (!Date.prototype.addHours) {
    Date.prototype.addHours = function(h) {    
        this.setTime(this.getTime() + (h*60*60*1000)); 
        return this;   
    };
}

// Number : Convert to String, add zeros(or c) infront of numbers.
if (!Number.prototype.padZero) {
    Number.prototype.padZero= function(len, c){
        return String(this).padZero(len,c);
    };
}

// Number : Clamp number between min and max
if (!Number.prototype.clamp) {
    Number.prototype.clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
    };
}

// Number : Create simple range
if (!Number.prototype.ordermag) {
    Number.prototype.ordermag = function() {
        const order = Math.floor(Math.log(this) / Math.LN10 + 0.000000001); // because float math sucks like that
        return Math.pow(10,order);
    };
    
}

[Array,Int8Array,Int16Array, Int32Array,Uint8Array,Uint16Array, Uint32Array,Float32Array].forEach(item=>{
    if (!item.prototype.range) {
        item.prototype.range = function() {
            for(let i=0;i<this.length;i++)this[i]=i;
            return this;
        };
    }
    
    if (!item.prototype.clamp) {
        item.prototype.clamp = function(min, max) {
            for(let i=0;i<this.length;i++)this[i]=i.clamp(min,max);
            return this;
        };
    }

    if (!item.prototype.min) {
        item.prototype.min = function(){
            let min = +Infinity,len = this.length;
            for (let i=0 ; i < len; i++ )
                if ( this[i] < min ) min = this[i];
            return min;
        };
    }    
    
    
    if (!item.prototype.max) {
        item.prototype.max = function(){
            let max = -Infinity, len = this.length;
            for (let i=0 ; i < len; i++ )
                if ( this[i] > max ) max = this[i];
            return max;
        };
    }   
    
    if (!item.prototype.add) {
        item.prototype.add = function(value){
            for(let i=0,n=this.length;i<n;i++)this[i]+=value;
            return this;
        };
    }
    
    if (!item.prototype.subtract) {
        item.prototype.subtract = function(value){
            for(let i=0,n=this.length;i<n;i++)this[i]-=value;
            return this;
        };
    }
    if (!item.prototype.multiply) {
        item.prototype.multiply = function(value){
            for(let i=0,n=this.length;i<n;i++)this[i]*=value;
            return this;
        };
    }
    
    if (!item.prototype.divide) {
        item.prototype.divide = function(value){
            for(let i=0,n=this.length;i<n;i++)this[i]/=value;
            return this;
        };
    }        
    
    if (!item.prototype.compare) {
        item.prototype.compare = function( a ) {
            const epsilon = 1.0E-7;
            for (var i = 0, n = this.length; i<n; i++) {
                if (a[i] - this[i] > epsilon) return false;
            }
            return true;
        };        
    }
    if (!item.prototype.move) {
        item.prototype.move = function(from, to) {
            if( to === from ) return this;
            const target = this[from];                         
            const increment = to < from ? -1 : 1;
            for(var k = from; k != to; k += increment){
                this[k] = this[k + increment];
            }
            this[to] = target;
            return this;
        };
    }

    
    
});

module.exports.range = function(n,type) {
    n = (typeof n !== 'undefined') ?  n : 0;
    if (!(Number.isInteger(n))) throw Error("Error in range: Value must be an integer");
    let array;
    
    if(type=='Uint8')  array = new Uint8Array(n);
    if(type=='Uint16') array = new Uint16Array(n);
    if(type=='Uint32') array = new Uint32Array(n);
    if(type=='Int8')  array = new Int8Array(n);
    if(type=='Int16') array = new Int16Array(n);
    if(type=='Int32') array = new Int32Array(n);
    if(type=='Float32')  array = new Float32Array(n);
    if((typeof type === 'undefined') || !array)array = new Array(n);
    
    for(let i=0;i<n;i++)array[i]=i;
    return array;
};


module.exports.isFloat32Array = function( value ) {
    return Object.prototype.toString.call( value ) === '[object Float32Array]';
}; 
module.exports.isUint32Array = function( value ) {
    return Object.prototype.toString.call( value ) === '[object Uint32Array]';
};
module.exports.isArray = function( value ) {
    return Object.prototype.toString.call( value ) === '[object Array]';
}; 


module.exports.humanFileSize = function(size){
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return Math.round(100 * (size / Math.pow(1024, i))) / 100 + ' ' + ['B', 'kB', 'MB', 'GB'][i];
    
};

module.exports.getFileExtension = function(filename){
    return filename.split('.').pop();
};

// Debounce function
module.exports.debounce=function(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


// Copy/Replace properties from another
module.exports.extend = function (dest, src) {
    for (var i in src) dest[i] = src[i];
    return dest;
};





// Convert hex string to rgba object 
module.exports.hex2rgba = function (hex) {
    hex = hex.replace(/\s/g, '');

    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b + 'ff';
    });
    var noTransRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    hex = hex.replace(noTransRegex, function(m, r, g, b) {
        return r + g + b + 'ff';
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: Math.round(parseInt(result[4], 16) / 255.0 * 100.0) * 0.01
    } : null;
};

// Convert rgb object to hsv object 
module.exports.rgb2hsv = function (rgb) {
    let rr, gg, bb,
        r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    }
    else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }
        else if (g === v) {
            h = (1 / 3) + rr - bb;
        }
        else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }
        else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100) * 0.01,
        v: Math.round(v * 100) * 0.01
    };
};

module.exports.hsv2rgb=function(hsv) {
    const h=hsv.h /360.0,s=hsv.s,v=hsv.v;
    
    let r, g, b;
    
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    
    switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    }
    
    return {r:Math.floor(r*255), g:Math.floor(g*255), b:Math.floor(b*255)};

};


module.exports.rgb2hex=function(rgb){
    const trans = (rgb.a)?("0" + parseInt(Math.round(rgb.a*255),10).toString(16)).slice(-2):'';
 
    return "#" +
  ("0" + parseInt(rgb.r,10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb.g,10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb.b,10).toString(16)).slice(-2) +
  trans;
};

},{}]},{},[1])(1)
});
