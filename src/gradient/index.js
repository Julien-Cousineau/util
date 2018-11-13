import uigradients from './gradients.json';
import Color from '../color/index.js';
import {scaleLinear} from "d3-scale";
import {interpolateHsl,interpolateHcl,interpolateRgb} from "d3-interpolate";

export default  class Gradient {
  constructor(options){
    options    =options || {};
    const stops=options.stops || [0];
    const colors = options.colors || [new Color()];
    this.interpolateType=options.interpolateType || 'interpolateRgb'; //interpolateHsl interpolateHcl interpolateRgb
    this.update(stops,colors);
  }
  get interpolateTypes(){
    return {
      interpolateRgb:interpolateRgb,
      interpolateHsl:interpolateHsl,
      interpolateHcl:interpolateHcl,
    };
  }
  update(stops,colors){
    this.stops=stops;
    this.colors=colors;
    
    const rgba = colors.map(color=>color.rgba2str());
   
    if(!this.interpolateTypes[this.interpolateType])throw new Error("Does not exist");
    this.interpolator = scaleLinear()
      .domain(stops)
      .range(rgba)
      .interpolate(this.interpolateTypes[this.interpolateType]);
  }
  static parseUIGradients(){
    const array = uigradients;
    const obj={};
    array.forEach(item=>obj[item.name]=item.colors);
    return obj;
  }
  static parseObj(obj){
    const stops = [];
    const colors = [];
    for(const stop in obj){
      stops.push(parseFloat(stop));
      colors.push(Color.parseString(obj[stop]));
    }
    return new Gradient({stops:stops,colors:colors});
  }
  static parseName(name){
    const gradients = Gradient.parseUIGradients();
    if(!gradients[name]){
      console.warn("name does not exist");
      return gradients['Skyline'];
    }
    
    const hexs = gradients[name];
    
    const n = hexs.length;
    const stops = [];
    const colors = [];    
    for(let i=0;i<n;i++){
      const hex = hexs[i];
      stops.push(i / (n-1));
      colors.push(Color.parseString(hex));
    }
    return new Gradient({stops:stops,colors:colors});
    
  }
  get background(){
    const background = this.stops.map((stop,i)=>[stop,this.colors[i]]).sort((a,b)=>a[0]-b[0]).map((item)=>{      
      return '{0} {1}%'.format(item[1].rgba2str(),item[0]*100);    
    });
   
    
    if(background.length>1)return 'linear-gradient({0})'.format(background.join(','));    
    return background[0];       
  }
  get obj(){
    const {stops,colors}=this;
    const obj={};
    stops.forEach((s,i)=>obj[s]=colors[i].hex); 
    return obj;
  }
  interpolate(value){
    const {interpolator}=this;
    if(!Array.isArray(value))return interpolator(value);
    if(Array.isArray(value))return value.map(v=>interpolator(v));
  }
  get fontColor(){
    const color = Color.parseString(this.interpolate(0.5));
    return color.fontColor();
  }
  fontColorstr(){
    return this.fontColor.rgba2str();
    
  }
  colorgroups(){
    return this.colors.map(color=>color.colorgroup);
  }
  toJSON(){return JSON.stringify(this.obj);}
  
  static parse(obj){
    if(typeof obj==='string')return Gradient.parseName(obj);
    return Gradient.parseObj(obj);
  }
}