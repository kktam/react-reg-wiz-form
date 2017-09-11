/*
 * react-reg-wiz-form
 * Copyright(c) 2017 Nelson Tam
 * MIT Licensed
 */

/* 
 * Gem algorithm from juhana 
 * https://codepen.io/juhana/pen/Ccghv?page=3
 */

import React, { Component } from 'react';
import Snap from 'snapsvg-cjs'
import {TweenLite, Sine} from 'gsap'
import Delaunay from 'delaunay-fast'

export default class Gem extends Component {

  // properties
  width = 0;
  height = 0;
  lineColor = "rgba(255,255,255,0.1)";

  s = null;
  triangles = [];
  vertices = [];
  triangleHolder = null;
  pointMarks = null;
  objIndex = 0;
  node;

  constructor(props){
    super(props)
    this.width = (props.width) ? props.width : 50;
    this.height = (props.height) ? props.height : 50;
    if (props.height) {
      this.lineColor = props.lineColor;
    }  

    this.getRandomPoint = this.getRandomPoint.bind(this);
    this.tweenPoint = this.tweenPoint.bind(this);
    this.applyValue = this.applyValue.bind(this);
    this.getRandomPoint = this.getRandomPoint.bind(this);    
    this.randomNumber = this.randomNumber.bind(this);
    this.makeObj = this.makeObj.bind(this);
    this.draw = this.draw.bind(this);
    this.doDelaunay = this.doDelaunay.bind(this);
  }

  componentDidMount() {
    this.s = Snap("#svg");

    this.triangles = [];
    this.vertices = [];
    this.triangleHolder = this.s.g();
    this.pointMarks = this.s.g();
    this.objIndex = 0;

    for (var i = 0; i < 14; i++) {
      this.vertices.push(this.makeObj());
    }

    window.requestAnimationFrame(this.doDelaunay);
  }
  
  getRandomPoint(){
    var point={};
    var min = 0;
    var max = this.width;
    point.x= Math.random() * (max - min) + min;
    max = this.height;
    point.y= Math.random() * (max - min) + min;
    return point;
  }
  
  tweenPoint(tweenObject,targetEl) {
    var point= this.getRandomPoint();
    var point2= this.getRandomPoint();
    var randX=point.x;
    var randY=point.y;
    var randX2=point2.x
    var randY2=point2.y;
    TweenLite.to(tweenObject, 16, {bezier:[{x:randX, y:randY}, {x:randX2, y:randY2}],ease:Sine.easeInOut, onComplete:this.tweenPoint,onCompleteParams:[tweenObject,targetEl],onUpdate:this.applyValue, onUpdateParams:["{self}",targetEl]});
  }
  
  applyValue(tween, targetEl) {
    this.vertices[targetEl.data("index")][0]=tween.target.x;
    this.vertices[targetEl.data("index")][1]=tween.target.y;
    targetEl.attr({cx:tween.target.x,cy:tween.target.y})
  }
  
  randomNumber(min, max) {
      return Math.floor(Math.random() * (1 + max - min) + min);
  }
   
  makeObj(){
    var point = this.getRandomPoint();
    var c = this.s.circle(point.x, point.y, 4);
    c.attr({fill:"rgba(110,70,110,0)"})
    var dummyObject={}
    dummyObject.x=c.getBBox().x;
    dummyObject.y=c.getBBox().y;
    this.tweenPoint(dummyObject,c);
    c.data("index", this.objIndex)
    var returnArr =[dummyObject.x,dummyObject.y,c]
    this.objIndex++;
    return returnArr;
  }
  
  draw(){
    this.triangleHolder.clear();
      for(var i= this.triangles.length; i>0 ;i-=3 ) {
        var cString = 
          "M"+this.vertices[this.triangles[i-1]][0]+" "+this.vertices[this.triangles[i-1]][1]+
          "L"+this.vertices[this.triangles[i-2]][0]+" "+this.vertices[this.triangles[i-2]][1]+
          "L"+this.vertices[this.triangles[i-3]][0]+" "+this.vertices[this.triangles[i-3]][1]+"z";
        var c = this.s.path(cString).attr({  fill: "rgba(255,225,215,"+i*.004+")",
        stroke: this.lineColor,
        strokeWidth: 2});
        this.triangleHolder.add(c)  
      }
  }
    
  doDelaunay() {
    this.triangles = Delaunay.triangulate(this.vertices);
    if(this.triangles.length > 2){ this.draw() };
    
    window.requestAnimationFrame(this.doDelaunay);
  }

  render() {
    const styles = {
      width: this.props.width,
      height: this.props.height
    }

    return (
      <svg id="svg" 
           className="App-logo-svg"
           styles={styles}
           ref={node => this.node = node}></svg>
    );  
  }
}