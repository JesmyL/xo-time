'use strict';
class MyLib{
 constructor(){
  this.rememberedTransformations= {};
  this.milliseconds= {
   inYear: 31536000000,
   inMonth: 2592000000,
   inHour: 3600000,
   inDay: 86400000
  };
 }
 
 count(obj){
  let count= 0;
  for(let co in obj) count++;
  return count;
 }
 
 random(min, max, fx){
  return((Math.random()*(max-min))+min).toFixed(fx||0);
 }
 
 setDB(name,value){
  value= typeof value== 'string'? value: JSON.stringify(value);
  localStorage.setItem(name,value);
 }
 
 getDB(name, str){return JSON.parse( localStorage.getItem(name)) && !str ? JSON.parse( localStorage.getItem(name)): localStorage.getItem(name); }
  
 delDB(name){ delete localStorage[name] }
 
 compute(element){
  return getComputedStyle(this.isStr(element)?document.querySelector(element):element);
 }
 
 coords(e){
  return e.getBoundingClientRect();
 }
 
 randomName(S){
  let str= '';
  S= !this.isObj(S)? {digits:S,list:{}}: S;
  S.digits= S.digits|| 7;
  S.list= S.list|| {};
  for(let i=0; i<S.digits; i++ )
   str+= charNumbers[ my.rand( 0, charNumbers.length-1)];
  if(!this.isUnd(S.list[str]))
  return this.randomName({
   list: S.list,
   digits: S.digits,
   value: S.value
  });
  else{
   S.list[str]= S.value|| '';
   return str;
  }
 }

 getValues(O){
  let R= [];
  let i= 0;
  for(let v in O)
   R[i++]= O[v];
  return R;
 }

 getKeys(O){
  let R= [];
  let i= 0;
  for(let k in O)
   R[i++]= k;
  return R;
 }
 
 Obj(O){for(let o in O)this[o]= O[o];}
 
 newExist(o){
  return this.isObj(o)?{}:this.isArr(o)?[]:this.isNum(o)?0:'';
 }

 allIndexes(O, str){
  let R= [];
  let i=0;
  for(let o in O) if(O[o]== str) R[i++]= o;
  return R;
 }
 
 attributer(element, O){
  var qAppend;
  if(typeof element== 'string') element= document.querySelector(element);
  
  for(var b in O){
  var Or= O[b];
  var s= b.replace(/^_+/,'').split(',');
  for(var d in s){
  var r= s[d].replace(/\s/g, '');
  attributers:
  switch(r){
   case'add': this.attributer(element, Or); break;
   case'Add': for(var i in Or) this.cre(i, Or[i]); break;
   case'Title':
    element.setAttribute(r, Or);
    element.addEventListener('click', ()=> document.title= this.q(element, 'title'), false);
   break;
   case'justDoIt': Or(element); break;
   case'doAfter':
    if(this.isObj(Or)){
     let each= parseFloat(Or.each|| 1);
     let ifFunc= Or.if;
     let wait= Or.wait;
     let after= Or.after;
     
     for(var time in Or){
      let action= Or[time];
      
      if(time=== 'each'|| time=== 'if'|| time=== 'wait'|| time=== 'after') continue;
      
      let Time= parseFloat(time.replace(/^_+/, '').replace(/_+/, '.'));
      setTimeout(()=> {
       if(this.isUnd(ifFunc)|| (!this.isUnd(ifFunc)&& (this.isFunc(ifFunc)? ifFunc(): ifFunc))){
        if(this.isFunc(wait)){
         var waitInterval= setInterval(()=> {
          if(wait()){
           clearInterval(waitInterval);
           this.isFunc(action)? actio5n(element): this.attributer(element, action);
          }
         }, 10);
        }else if(this.isFunc(after)){
         var afterInterval= setInterval(()=> {
          if(after()){
           clearInterval(waitInterval);
           setTimeout(()=> { this.isFunc(action)? action(element): this.attributer(element, action) }, each* Time);
          }
         }, 10);
        }else this.isFunc(action)? action(element): this.attributer(element, action);
       }
      }, each* Time);
     }
    }
   break;
   case'in':this.q(Or).appendChild(element); break;
   case'inAsFirst':
    var first= this.q(Or).children[0];
    var el= this.q(element, first? {
     inBefore: first
    }: {
     in: Or
    });
    
   break;
   case'inBefore':
    var el= this.q(Or);
    var parent= el.parentNode;
    parent.insertBefore(element, el);
   break;
   case'app':case'appBefore':
    if(this.isObj(Or)){
     Or.similars= {
      [r=== 'app'? 'in': 'inBefore']: element
     }
     this.cre(this.group(Or));
    }
   break;
   case'remChild':
    if(this.isArr(Or))
     Or.forEach(f=> {
      element.children[f].remove();
     });
    else if(Or=== -1){
     let children= element.children;
     let length= children.length;
     
     for(let i=length-1; i>=0; i--) children[i].remove();
    }else element.children[Or].remove();
    
   break;
   case'canMove':
    element.style.cursor= '-webkit-grab';
    var el= this.isFunc(Or)? this.q(Or()): this.q(Or);
    var isComp= !('ontouchstart' in window);
    var lastMoveX;
    var defined= false;
    
    el.style.zIndex= '10000';
    
    var initX, initY;
    var moving= false;
    var movingScreen;
    
    this.q(element, {
     on: {
      mousedown: (e)=> {
       var cords= (this.coords(el));
       moving= true;
       initX= e.pageX- cords.left- (isComp? window.pageXOffset: 0);
       initY= (e.pageY- cords.top- (isComp? window.pageYOffset: 0));
       var top= (e.pageY- initY)+'px';
       var bodyHeight= this.compute('html').height;
       
       movingScreen= this.cre('div', {
        in: 'body',
        style: {
         position: 'absolute',
         cursor: '-webkit-grabbing',
         left: '0',
         top: isComp? 'calc('+top+' - 50%)': '0',
         width: '100%',
         backgroundColor: 'rgba(0,0,0,0)',
         border: 'none',
         height: 'calc('+bodyHeight+' * 1.5)',
         zIndex: '10001'
        },
        on: {
         'mouseout,mousemove'(e){
          e.preventDefault();
          e.stopPropagation();
          if(!moving) return;
          var top= (e.pageY- initY)+'px';
          
          el.style.top= top;
          el.style.left= (e.pageX- initX)+'px';
          movingScreen.style.top= '0';
         },
         mouseup(){
          if(!isComp) return;
          moving= false;
          movingScreen.remove();
         },
         mousedown(e){
          if(isComp) return;
          el.style.top= (e.pageY- initY)+'px';
          el.style.left= (e.pageX- initX)+'px';
          movingScreen.remove();
         }
        }
       });
      },
      mousemove(e){
       el.style.transition= `top, left 0ms linear 0ms`;
      },
      mouseout(){this.isUnd(lastMoveX)}
     }
    });
   break;
   case'destroy':
    var destroySpeed= Or.speed;
    var type= Or.type;
    
    this.q(element, {
     style: {
      transtion: `all ${destroySpeed}ms ease-in ${destroySpeed}ms`,
      add: type=== 'opacity'? {
       opacity: '0'
      }: type=== 'height'? {
       height: '0',
       fontSize: '0'
      }: type=== 'width'? {
       width: '0',
       fontSize: '0'
      }: {
       display: 'none'
      }
     },
     doAfter: {
      each: destroySpeed,
      1: ()=> {element.remove()}
     }
    });
   break;
   case'remAttr':
    if(this.isArr(Or)) for(var i in Or) element.removeAttribute(Or[i]);
    else if(this.isStr(Or)) element.removeAttribute(Or);
   break;
   case'removeMe':
    if(Or) element.remove();
   break;
   case'html':
    element.innerHTML= Or;
   break;
   case'text':
    element.innerText= Or;
   break;
   case'with':
    if(this.isObj(Or))
     for(let child in Or){
      let Child= Or[child];
      child.split(/\s*,\s*/).forEach((e, i, a)=> {
       this.q(element.children[e], {
        add: Child
       });
      });
     }
    
   break;
   case'on':
    if(this.isFunc(Or)) element.addEventListener('click', Or);
    else if(this.isArr(Or)) for(var i in Or) element.addEventListener('click', Or[i]);
    else if(this.isObj(Or))
     for(var t in Or){
      var tt= t.split(',');
      for(var y in tt) element.addEventListener(tt[y], Or[t]);
     }
   break;
   case'NS':break;
   default:
    if(this.isObj(Or)){
     for(var t in Or){
      if( t=== 'add'&& this.isObj( Or[t])){
       for(var y in Or[t])
        element[r][y]= Or[t][y];
      }else t.split(',').forEach(n=> element[r][n]= Or[t]);
     }
    }else if(r[0]=== '$'){
     var id= O.id|| element.getAttribute('id');
     if(!id) break;
     Or= !!Or;
     var _r= r.substr(1);
     var rt= (this.rememberedTransformations);
     var l_r= _r.toLowerCase(); 
     
     if(_r!== l_r){
      if(this.isUnd(rt[l_r])){
       rt[l_r]= {};
       element[l_r]= Or;
      }else element[l_r]= !this.isUnd(rt[l_r][id])? rt[l_r][id]: Or;
     }else{
      if(this.isUnd(rt[l_r])) rt[l_r]= {[id]:Or};
      else rt[l_r][id]= Or;
      element[l_r]= Or;
     }
     rt[l_r][id];
    }else if(element.hasOwnProperty(r)) element[r]= Or;
     else element.setAttribute(r, Or);
    }
   }
  }
  return element;
 }

 Title(f){document.title=(this.isUnd(f)? this.rand(1000, 9999): f);return f;}
 join(arr, joins){
  let level= 0;
  let R= '';
  for(let i=0; i<arr.length; i++){
   R+= arr[i]+ joins[i%joins.length];
  }
  return R.slice(0, -1);
 }
 randomSort(O){
  let R= newExist(O);
  let keys= this.getKeys(O);
  let Keys= this.getKeys(keys);
  let kl= keys.length;
  
  for(let i=0; i<kl; i++){
   let rdm= my.rand(0, Keys.length-1);
   R[keys[rdm]]= O[keys[rdm]];
   keys.splice(rdm, 1);
   Keys.splice(rdm, 1);
  }
  return R;
 }

 group(S, Sim){
  Sim= Sim|| 'similars';
  let sim= Sim;
  
  while(!this.isUnd(S[sim])){
  for(let r in S){
    if(r.replace(/^_+/, '')!= Sim&& !this.isUnd(S[sim].except)? typeof S[sim].except== 'object'? !(S[sim].except.indexOf(r.replace(/^_+/, ''))+1): r.replace(/^_+/, '')!= S[sim].except: true)
     for(let t in S[sim])
      if(this.isObj(S[sim][t])){
       for(let y in S[sim][t])
        if(!this.isUnd(S[r][t]))
         S[r][t][y]= this.isUnd(S[r][t][y])? S[sim][t][y]: S[r][t][y] ;
        else{
         let N= {};
         N[y]= S[sim][t][y] ;
         S[r][t]= N;
        }
      }else
        if(t!= 'except'&& this.isUnd(S[r][t]))
         S[r][t]= S[sim][t];
  }
   delete S[sim];
   sim= '_'+sim;
  }
  return S;
 }

 dump(O, S, space){
  let R= '';
  let colors= ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'violet'];
  let typer= [];
  space= space|| '';
  if(this.isNum(S)|| this.isUnd(S)){
   let level= S;
   S= {};
   S.level= level;
   S.elementsLevel= 0;
  }else{
   S.level= S.level|| 0;
   S.elementsLevel= S.elementsLevel|| 0;
  }
  S.html= S.html|| false;
  S.dumpLevel= (S.dumpLevel||0)+1;
  
  for(let o in O){
   let Oo= O[o];
   let color= !this.isUnd(S.colored)? (S.colored.map((f, i)=>{if(o.search(f)+1)return colors[i]||'rgb('+this.random(0, 255)+','+this.random(0, 255)+','+this.random(0, 255)+')';else return false}).filter(f=>f))[0]: '';
   let colored= S.html? ['<b style="color:'+(color||'white')+'" >', '</b>']: ['', ''];
   if(this.isObj(Oo)|| this.isArr(Oo)&& S.dumpLevel<= S.level|| (this.isobj(Oo)&& !this.isObj(Oo)&& !this.isArr(Oo)&& dumpLevel<= S.elementsLevel)){
    typer= this.isArr(Oo)? ['[', ']']: this.isObj(Oo)? ['{', '}']: ['<', '>'];
    R+= (space+colored[0]+'"'+o+'" : '+typer[0]+'##@##'+this.dump(Oo, S, space+colored[0]+typer[0]+typer[1]+colored[1])+'##@##'+space+typer[1]+colored[1]+',##@##');//.replace(new RegExp('(##@##){2}'+typer.join(''),'g'), '')
    
   }else{
    let typer= this.isArr(Oo)? ['[', ']']: this.isStr(Oo)? ['"', '"']: ['', ''];
    
    R+= space+colored[0]+'"'+o+'" : '+typer[0]+(S.dumpLevel>= S.level&& this.isFunc(Oo)? 'function': Oo)+typer[1]+','+colored[1]+'##@##';
   }
  }
  S.dumpLevel--;
  return R.replace(new RegExp('##@##','g'), '\n');
 }

 cre(el, O){
  let R= {}; 
  if(this.isObj(el)&& O== undefined){
   el= this.group(el); 
   for(let r in el) R[r]= this.cre(r, el[r]);
   return R;
  }else if(this.isStr(el)){
   el= el.replace(/^_+/,''); 
   let element= O.NS=== true? document.createElementNS( 'http://www.w3.org/2000/svg', el): document.createElement(el); 
   this.isObj(O)?
    this.attributer( element, O):
    this.isStr(O)|| this.isNum(O)?
     element.innerHTML= O:  0;
   
   return element;
  } 
  
  return undefined; 
 }

 q(query, O, context= document){
  let R;
   if(this.isStr(context)) context= document.querySelector(context);
   if(this.isObj(O)){
    if(this.isStr(query)){
     let Q= context.querySelectorAll(query);
     for(let i=0; i<Q.length; i++) this.attributer(Q[i], O);
     R= (Q[0]);
    }else if(this.isobj(query)&& !this.isObj(query)&& !this.isArr(query)){
     this.attributer(query, O);
     R= (query);
    }else if(this.isObj(query)){
     R= {};
     for(let que in query){
      R[que]= this.attributer(context.querySelector(query), O);
     }
    }else if(this.isArr(query)){
     R= [];
     query.forEach((e, i, a)=> {
      if(this.isStr(e)){
       let index= R.push([])-1;
       let Q= context.querySelectorAll(e);
       for(let j=0; j< Q.length; j++) R[index].push(this.attributer(Q[j], O));
      }else R.push(this.attributer(e, O));
     });
    }
   }else if(this.isStr(O)){ R= this.isStr(query)? context.querySelector(query).getAttribute(O): query.getAttribute(O);
   }else R= this.isStr(query)? context.querySelector(query): query;
  return R;
 }
 
 isObj(obj){return obj== '[object Object]'}
 isobj(obj){return typeof obj=== 'object'}
 isArr(obj){return Object.prototype.toString.call(obj) == '[object Array]' }
 isNum(obj){return typeof obj=== 'number'&& Number(obj)?true:false }
 isNUM(obj){return Number(obj)?true:false }
 isStr(obj){return typeof obj=== 'string'}
 isFunc(obj){return typeof obj=== 'function'}
 isUnd(obj){return typeof obj=== 'undefined'}
 isBool(obj){return typeof obj=== 'boolean'}
 
 
}
let mylib= new MyLib();

function ra(s){alert(s);return s;}
let rad= (s, S)=> {alert(mylib.dump(s, S));return s;}
