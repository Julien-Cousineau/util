'use strict';

/*eslint key-spacing: 0, comma-spacing: 0 */


const {extend,hex2rgba,rgb2hsv,rgb2hex,hsv2rgb,
        isArray,isUint32Array,isFloat32Array,
        humanFileSize,
        getFileExtension,
        range} = require('../src'),
    t = require('tape');

t('#testing Extend', function (t) {
    const obj1 = {id:'IDfromObj1',value:1,avalue:'10'};
    const obj2 = {id:'IDfromObj2',value:2};
    const obj3 = {id:'IDfromObj2',value:2,avalue:'10'};
    t.same(extend(obj1,obj2),obj3);
    t.end();
});

t('#testing String.prototype.format', function (t) {

    t.same('{0}'.format('My String'),'My String');
    t.same('{0} {0}'.format('My String'),'My String My String');
    t.same('{1} {0}'.format('First',"Last"),'Last First');
    t.same('{2}'.format('First',"Last"),'{2}');
    t.same('{name}'.format({name:'My String'}),'My String');
    t.same('{last}'.format({name:'My String'}),'{last}');
    t.same('{name} + {lastname}'.format({name:'First',lastname:"Last"}),'First + Last');
    t.same('{quad} + {quad}'.format({quad:0.65424,lastname:"Last"}),'0.65 + 0.65');
    t.end();
});

t('#testing String.prototype.replaceAll', function (t) {
    const input ='Hello World. Goodbye World'.replaceAll('World','Everyone');
    const output ='Hello Everyone. Goodbye Everyone';
    t.same(input,output);
    t.end();
});

t('#testing String.prototype.padZero', function (t) {
    const input ='1'.padZero(2);
    const output ='01';
    
    const input_b ='1'.padZero(4);
    const output_b ='0001';
    
    const input_c ='1'.padZero(4,'c');
    const output_c ='ccc1';
    
    t.same(input,output);
    t.same(input_b,output_b);
    t.same(input_c,output_c);
    t.same('pad'.rpad(" ",10),'pad       ');
    t.same('pad'.lpad(" ",10),'       pad');
    t.end();
});



t('#testing Date.prototype.addHours', function (t) {
    const input = new Date('1995-12-17T03:24:00').addHours(1);
    const output = new Date('1995-12-17T04:24:00');
    const input_b =new Date('1995-12-17T03:24:00').addHours(24);
    const output_b =new Date('1995-12-18T03:24:00');
    t.same(input,output);
    t.same(input_b,output_b);
    t.end();
});

t('#testing Number.prototype.padZero', function (t) {
    const value = 1;
    const input = value.padZero(2);
    const output ='01';
    
    const input_b =value.padZero(4);
    const output_b ='0001';
    
    const input_c =value.padZero(4,'c');
    const output_c ='ccc1';
    
    t.same(input,output);
    t.same(input_b,output_b);
    t.same(input_c,output_c);
    t.end();
});

t('#testing Number.prototype.clamp', function (t) {
    const value = 50;
    const input = value.clamp(0,100);
    const output = 50;
    
    const value_b = -50;
    const input_b = value_b.clamp(0,100);
    const output_b = 0;
    
    const value_c = 150;
    const input_c = value_c.clamp(0,100);
    const output_c = 100;  
 
    t.same(input,output);
    t.same(input_b,output_b);
    t.same(input_c,output_c);
    t.end();
});
t('#testing Number.prototype.ordermag', function (t) {
    const value = 1.1;
    const input = value.ordermag();
    const output = 1;
    
    const value_b = 51;
    const input_b = value_b.ordermag();
    const output_b = 10;
    
    const value_c = 0.99;
    const input_c = value_c.ordermag();
    const output_c = 0.1;  
    
    const value_d = 8230;
    const input_d = value_d.ordermag();
    const output_d = 1000; 
 
    t.same(input,output);
    t.same(input_b,output_b);
    t.same(input_c,output_c);
    t.same(input_d,output_d);
    t.end();
});

t('#testing IsObject', function (t) {
    t.same(isArray(new Array(5)),true);
    t.same(isUint32Array(new Uint32Array(5)),true);
    t.same(isFloat32Array(new Float32Array(5)),true);
    t.same(isArray(new Float32Array(5)),false);
    t.same(isUint32Array(new Float32Array(5)),false);
    t.same(isFloat32Array(new Array(5)),false);    

    t.end();    
});

t('#testing functions', function (t) {
    t.same(humanFileSize(Math.pow(1024,0)),'1 B');
    t.same(humanFileSize(Math.pow(1024,1)),'1 kB');
    t.same(humanFileSize(Math.pow(1024,2)),'1 MB');
    t.same(humanFileSize(Math.pow(1024,3)),'1 GB');
    
    t.same(humanFileSize(Math.pow(1024,0)+Math.pow(1024,0)),'2 B');
    t.same(humanFileSize(Math.pow(1024,1)-Math.pow(1024,0.1)),'1022 B');
    t.same(humanFileSize(Math.pow(1024,2)-Math.pow(1024,1.1)),'1022 kB');
    t.same(humanFileSize(Math.pow(1024,3)-Math.pow(1024,2.1)),'1022 MB');    
    
    t.same(getFileExtension('x.abc'),'abc');
    t.same(getFileExtension('x.y.abc'),'abc');
    t.same(getFileExtension('x.y.z.abc'),'abc');

    t.end();    
});




t('#testing Operations', function (t) {
    // Array
    t.same(new Array(5).range(),[0,1,2,3,4]);
    t.same(new Array(5).range().clamp(2,3),[2,2,2,3,3]);
    t.same(new Array(101).range().min(),0);
    t.same(new Array(101).range().max(),100); 
    t.same(new Array(5).range().add(1), [1,2,3,4,5]);
    t.same(new Array(5).range().subtract(1), [-1,0,1,2,3]);
    t.same(new Array(5).range().multiply(10), [0,10,20,30,40]);
    t.same(new Array(5).range().multiply(10).divide(10), [0,1,2,3,4]);
    t.same(new Array(5).range().compare([0,1,2,3,4]),true);
    
    // TypedArray
    [Int8Array,Int16Array, Int32Array,Uint8Array,Uint16Array, Uint32Array,Float32Array].forEach(item=>{
        t.same(new item(5).range(),new item([0,1,2,3,4]));
        t.same(new item(5).range().clamp(2,3),new item([2,2,2,3,3]));
        t.same(new item(101).range().min(),0);
        t.same(new item(101).range().max(),100);  
        t.same(new item(5).range().add(1), new item([1,2,3,4,5]));
        t.same(new item(5).range().subtract(1), new item([-1,0,1,2,3]));
        t.same(new item(5).range().multiply(10), new item([0,10,20,30,40]));
        t.same(new item(5).range().multiply(10).divide(10), new item([0,1,2,3,4]));
        t.same(new item(5).range().compare(new item([0,1,2,3,4])),true);
        t.same(new item(5).range().move(0,1),new item([1,0,2,3,4]));
        t.same(new item(5).range().move(4,0),new item([4,0,1,2,3]));
        t.same(new item(5).range().sortIndices(),[0,1,2,3,4]);
        t.same(new item([3,0,2]).sortIndices(),[1,2,0]);
        t.same(new item([3,0,2]).sortIndices(true),[0,2,1]);
    });
    t.end();
});

t('#testing range function', function (t) {
    t.same(range(5),new Array(5).range());
    t.same(range(5,'Int8'),new Int8Array(5).range());
    t.same(range(5,'Int16'),new Int16Array(5).range());
    t.same(range(5,'Int32'),new Int32Array(5).range());    
    t.same(range(5,'Uint8'),new Uint8Array(5).range());
    t.same(range(5,'Uint16'),new Uint16Array(5).range());
    t.same(range(5,'Uint32'),new Uint32Array(5).range());
    t.same(range(5,'Float32'),new Float32Array(5).range());
    t.same(range(5,'unknown'),new Array(5).range());
    t.end();    
});

t('#testing hex2rgba', function (t) {
    const input = hex2rgba('#bc1465');
    const output = {r:188,g:20,b:101,a:1};
    
    const input_b = hex2rgba('#bc146580');
    const output_b = {r:188,g:20,b:101,a:0.5};
    
    const input_c = hex2rgba('#bc1');
    const output_c = {r:187,g:204,b:17,a:1};    
    
    t.same(input,output);
    t.same(input_b,output_b);
    t.same(input_c,output_c);
    t.end();
});

t('#testing rgb2hsv', function (t) {
    const input = rgb2hsv({r:188,g:20,b:101});
    const output = {h:331,s:0.89,v:0.74};
    t.same(input,output);
    t.end();
});

t('#testing rgb2hex', function (t) {
    const input = rgb2hex({r:188,g:20,b:101});
    const output = '#bc1465';
    
    const input_b = rgb2hex({r:188,g:20,b:101,a:0.5});
    const output_b = '#bc146580';
    t.same(input,output);
    t.same(input_b,output_b);
    t.end();
});

t('#testing hsv2rgb', function (t) {
    const input = hsv2rgb({h:331,s:0.89,v:0.74});
    const output = {r:188,g:20,b:101};
    
    
    t.same(input,output);
    
    t.end();
});

t('#testing getHostName', function (t) {
    const input = 'https://www.google.ca/search?ei=XWw'.getHostName();
    const output = 'google.ca';
    t.same(input,output);
    t.end();
});


t('#testing stringify', function (t) {
    const obj_1 = {string:'Name',number:1,arrayn:[0,1],arrays:['a','b'],obj:{string:'Inside Object'}};
    const json_1 = JSON.stringify(obj_1);
    t.same(json_1,`{"string":"Name","number":1,"arrayn":[0,1],"arrays":["a","b"],"obj":{"string":"Inside Object"}}`);
    
    class MyClass{
        constructor(){
            this.string='Name';
            this.number=1;
            this.arrayn = [0,1];
            this.arrays = ['a','b'];
            this.obj = {string:'Inside Object'};
        }
    }
    
    const json_2 = JSON.stringify(new MyClass());    
    t.same(json_2,`{"string":"Name","number":1,"arrayn":[0,1],"arrays":["a","b"],"obj":{"string":"Inside Object"}}`);
    
    
    class OutsideClass{
        constructor(){
            this.myclass=new MyClass();
        }
    }
    const json_3 = JSON.stringify(new OutsideClass());    
    t.same(json_3,`{"myclass":{"string":"Name","number":1,"arrayn":[0,1],"arrays":["a","b"],"obj":{"string":"Inside Object"}}}`);
    
    
    t.end();
});
