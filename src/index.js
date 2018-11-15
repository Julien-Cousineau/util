import Color from './color/index.js';
import Gradient from './gradient/index.js';
import to from './to/index.js';

// String :Formatter, Python approach to add values in strings. 
if (!String.prototype.formatold) {
  String.prototype.formatold = function() {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ?
        args[number] :
        match;
    });
  };
}
if (!String.prototype.format) {
  String.prototype.format = function() {
    const args = arguments;
    if(!args)return this;                    
    return this.replace(/{([^}]*)}/g, function(match) {
      let key = match.replace(/{/, '').replace(/}/, '');
      if(!isNaN(parseInt(key))) return (typeof args[key] != 'undefined')?args[key] :match;
      if (!args[0][key])return match;
      return args[0][key];
    });                     
  };
}

//String :pads left
if (!String.prototype.lpad) {
  String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
      str = padString + str;
    return str;
  };
}
 
//String :pads right
if (!String.prototype.rpad) {
  String.prototype.rpad = function(padString, length) {
    var str = this;
    while (str.length < length)
      str = str + padString;
    return str;
  };
}

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
// const quickSortIndices = function(arr,indices,left, right){
//   let pivot,partitionIndex;
   
//   const partition = function(pivot, left, right){
//     var pivotValue = arr[pivot],
//         partitionIndex = left;
  
//     for(var i = left; i < right; i++){
//       if(arr[i] < pivotValue){
//         swap(arr, i, partitionIndex);
//         swap(indices, i, partitionIndex);
//         partitionIndex++;
//       }
//     }
//     swap(arr, right, partitionIndex);
//     swap(indices, right, partitionIndex);
//     return partitionIndex;
//   };


//   if(left < right){
//     pivot = right;
//     partitionIndex = partition(arr, pivot, left, right);
    
//     //sort left and right
//     quickSortIndices(arr,indices, left, partitionIndex - 1);
//     quickSortIndices(arr,indices, partitionIndex + 1, right);
//   }
  
//   return indices;
// };
// const swap = function(arr, i, j){
//   var temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// };



[Array,Int8Array,Int16Array, Int32Array,Uint8Array,Uint16Array, Uint32Array,Float32Array].forEach(item=>{
  if (!item.prototype.range) {
    item.prototype.range = function() {
      for(let i=0;i<this.length;i++)this[i]=i;
      return this;
    };
  }
  if (!item.prototype.random) {
    item.prototype.random = function() {
      for(let i=0;i<this.length;i++)this[i]=parseInt(Math.random()*(this.length-1));
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
  if (!item.prototype.sortIndices) {
    item.prototype.sortIndices = function(desc) {
      const f = desc?(a,b)=>b[1]-a[1]:
        (a,b)=>a[1]-b[1];
      const copy = this.slice(0);
      const keys = new Array(this.length).fill();
      return keys.map((key,i)=>[i,copy[i]]).sort(f).map(item=>item[0]);
    };
  }    
  // if (!item.prototype.quickSortIndices) {
  //   item.prototype.quickSortIndices = function() {
  //     const arr=this.slice(0);
  //     const indices = new Uint32Array(this.length);
  //     for(let i=0;i<indices.length;i++)indices[i]=i;
  //     quickSortIndices(arr,indices,0,this.length-1);
  //     // console.log(arr)
  //     return indices;
  //   };
  // } 
    
    
});

// const quickSort = function(arr, left, right){
//   let pivot,partitionIndex;
   
//   const partition = function(arr, pivot, left, right){
//     var pivotValue = arr[pivot],
//         partitionIndex = left;
  
//     for(var i = left; i < right; i++){
//       if(arr[i] < pivotValue){
//         swap(arr, i, partitionIndex);
//         partitionIndex++;
//       }
//     }
//     swap(arr, right, partitionIndex);
//     return partitionIndex;
//   };


//   if(left < right){
//     pivot = right;
//     partitionIndex = partition(arr, pivot, left, right);
    
//   //sort left and right
//   quickSort(arr, left, partitionIndex - 1);
//   quickSort(arr, partitionIndex + 1, right);
//   }
//   return arr;
// };



// module.exports.quickSort = quickSort;
// module.exports.quickSortIndices = quickSortIndices;

function range(n,type) {
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
}

function isArray(value) {
  return Object.prototype.toString.call( value ) === '[object Array]';
}
function isInt8Array(value) {
  return Object.prototype.toString.call( value ) === '[object Int8Array]';
}
function isInt16Array(value) {
  return Object.prototype.toString.call( value ) === '[object Int16Array]';
}
function isInt32Array(value) {
  return Object.prototype.toString.call( value ) === '[object Int32Array]';
}
function isUint8Array(value) {
  return Object.prototype.toString.call( value ) === '[object Uint8Array]';
}
function isUint16Array(value) {
  return Object.prototype.toString.call( value ) === '[object Uint16Array]';
}
function isUint32Array(value) {
  return Object.prototype.toString.call( value ) === '[object Uint32Array]';
}
function isFloat32Array(value) {
  return Object.prototype.toString.call( value ) === '[object Float32Array]';
}

function humanFileSize(size){
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return Math.round(100 * (size / Math.pow(1024, i))) / 100 + ' ' + ['B', 'kB', 'MB', 'GB'][i];
    
}

function getFileExtension(filename){
  return filename.split('.').pop();
}

// Debounce function
function debounce(func, wait, immediate) {
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
}

// Copy/Replace properties from another
function extend(dest, src) {
  for (var i in src) dest[i] = src[i];
  return dest;
}

export {
  Color,
  Gradient,
  to,
  extend,
  debounce,
  getFileExtension,
  humanFileSize,
  range,
  isArray,
  isInt8Array,
  isInt16Array,
  isInt32Array,
  isUint8Array,
  isUint16Array,
  isUint32Array,
  isFloat32Array
};

