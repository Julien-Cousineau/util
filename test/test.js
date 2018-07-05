'use strict';

/*eslint key-spacing: 0, comma-spacing: 0 */


const {extend,hex2rgba,rgb2hsv} = require('../src'),
    t = require('tape');

t('#testing Extend', function (t) {
    const obj1 = {id:'IDfromObj1',value:1,avalue:'10'};
    const obj2 = {id:'IDfromObj2',value:2};
    const obj3 = {id:'IDfromObj2',value:2,avalue:'10'};
    t.same(extend(obj1,obj2),obj3);
    t.end();
});

t('#testing String.prototype.format', function (t) {
    const input ='{0}'.format('My String');
    const output ='My String';
    t.same(input,output);
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

t('#testing Array.prototype.range', function (t) {
    const input = new Array(5).range();
    const output = [0,1,2,3,4];
    console.log(input);
    
    t.same(input,output);
    t.end();
});

t('#testing Array.prototype.max', function (t) {
    
    const input = new Array(101).range().max();
    const output = 100;
    t.same(input,output);
    t.end();
});

t('#testing Array.prototype.min', function (t) {
    const input = new Array(101).range().min();
    const output = 0;
    t.same(input,output);
    t.end();
});

t('#testing Float32Array.prototype.range', function (t) {
    const input = new Float32Array(5).range();
    const output = new Float32Array([0,1,2,3,4]);
    t.same(input,output);
    t.end();
});

t('#testing Float32Array.prototype.max', function (t) {
    const input = new Float32Array(101).range().max();
    const output = 100;
    t.same(input,output);
    t.end();
});

t('#testing Float32Array.prototype.min', function (t) {
    const input = new Float32Array(101).range().min();
    const output = 0;
    t.same(input,output);
    t.end();
});

t('#testing Float32Array.prototype.clamp', function (t) {
    const input = new Float32Array(5).range().clamp(2,3);
    const output = new Float32Array([2,2,2,3,3]);
    t.same(input,output);
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

t('#testing getHostName', function (t) {
    const input = 'https://www.google.ca/search?ei=XWw'.getHostName();
    const output = 'google.ca';
    t.same(input,output);
    t.end();
});