
(()=>{
"use strict";
const $=id=>document.getElementById(id),N=1000,T=100;
const fmt=v=>v>0&&v<.01?'$'+v.toPrecision(3):new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(v);
let paths=[],means=[],medians=[],selected=0,currentSeed=0;
const expected=Array.from({length:T+1},(_,t)=>100*1.05**t);
const g=.5*Math.log(1.5)+.5*Math.log(.6),theoryMedian=100*.9**50;
let probability=0,term=2**-100;
for(let h=0;h<=100;h++){if(h<=55)probability+=term;term*=(100-h)/(h+1)}
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function freshSeed(){if(globalThis.crypto?.getRandomValues){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]}return(Date.now()+Math.random()*1e9)>>>0}
function generate(seed){
currentSeed=seed;selected=0;const random=rng(seed);
paths=Array.from({length:N},()=>{
const p=[100];let heads=0;
for(let t=1;t<=T;t++){const head=random()<.5;heads+=Number(head);p.push(p[t-1]*(head?1.5:.6))}
const analytic=100*1.5**heads*.6**(T-heads);
if(Math.abs(p[T]-analytic)>1e-9*Math.max(1,analytic))throw Error('Path verification failed');
return p;
});
means=[];medians=[];
for(let t=0;t<=T;t++){const a=paths.map(p=>p[t]).sort((a,b)=>a-b);means.push(a.reduce((x,y)=>x+y,0)/N);medians.push((a[499]+a[500])/2)}
$('seed').value=seed;
}
function chart(id,series,{height=350,rounds=100,log=true,threshold=100}={}){
const W=860,L=80,R=20,top=20,bottom=49,H=height;
let low=threshold,high=threshold;
for(const s of series)for(const v of s.values){low=Math.min(low,v);high=Math.max(high,v)}
let min=log?Math.floor(Math.log10(low)):0,max=log?Math.ceil(Math.log10(high)):high*1.05;
if(max<=min)max=min+1;
const x=t=>L+t/rounds*(W-L-R),y=v=>top+(max-(log?Math.log10(v):v))/(max-min)*(H-top-bottom);
let out='';
if(log){
const step=Math.max(1,Math.ceil((max-min)/7));
for(let k=min;k<=max;k+=step){
const label=k>=0&&k<=4?'$'+(10**k).toLocaleString('en-US'):'$10<tspan baseline-shift="super" font-size="9">'+k+'</tspan>',yy=y(10**k);
out+=`<line x1="${L}" x2="${W-R}" y1="${yy}" y2="${yy}" stroke="#e0e4da"/><text x="${L-10}" y="${yy+4}" text-anchor="end" font-size="11" fill="#62746b">${label}</text>`;
}
}else{
for(let i=0;i<=4;i++){
const v=max*i/4,yy=y(v),label=v>=1e6?'$'+(v/1e6).toFixed(1)+'m':v>=1e3?'$'+(v/1e3).toFixed(1)+'k':fmt(v);
out+=`<line x1="${L}" x2="${W-R}" y1="${yy}" y2="${yy}" stroke="#e0e4da"/><text x="${L-10}" y="${yy+4}" text-anchor="end" font-size="11" fill="#62746b">${label}</text>`;
}}
out+=`<line x1="${L}" x2="${W-R}" y1="${y(threshold)}" y2="${y(threshold)}" stroke="#8b9b8f" stroke-dasharray="3 5"/>`;
for(let t=0;t<=rounds;t+=rounds/5)out+=`<text x="${x(t)}" y="${H-23}" text-anchor="middle" font-size="11" fill="#62746b">${t}</text>`;
for(const s of series){
const d=s.values.map((v,t)=>(t?'L':'M')+x(t).toFixed(2)+' '+y(v).toFixed(2)).join(' ');
out+=`<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.width||2.5}" opacity="${s.opacity||1}" ${s.dash?'stroke-dasharray="7 5"':''} stroke-linejoin="round"/>`;
}
out+=`<text x="${(L+W-R)/2}" y="${H-3}" text-anchor="middle" font-size="11" fill="#62746b">Round · ${log?'logarithmic':'linear'} wealth axis</text>`;
$(id).innerHTML=out;
}
function drawOne(){
chart('oneChart',[{values:paths[selected],color:'#27654e'}],{height:320,log:$('scaleOne').dataset.scale==='log'});
$('oneResult').textContent='Player '+(selected+1)+' · Final wealth '+fmt(paths[selected][T]);
}
function drawMany(){
const s=[];
for(let i=0;i<10;i++)if(i!==selected)s.push({values:paths[i],color:'#bac3b8',width:1,opacity:.55});
s.push({values:means,color:'#4777b3'},{values:medians,color:'#bd673a'});
s.push({values:expected,color:'#213b32',dash:true});
s.push({values:paths[selected],color:'#27654e',width:2.6});
chart('manyChart',s,{log:$('scaleMany').dataset.scale==='log'});
const loss=paths.filter(p=>p[T]<100).length/N;
$('median').textContent=fmt(medians[T]);$('mean').textContent=fmt(means[T]);$('loss').textContent=(100*loss).toFixed(1)+'%';
$('comparison').innerHTML=`<tr><td>Expected / mean wealth</td><td>${fmt(expected[T])}</td><td>${fmt(means[T])}</td></tr><tr><td>Median wealth</td><td>${fmt(theoryMedian)}</td><td>${fmt(medians[T])}</td></tr><tr><td>Finishing below $100</td><td>${(100*probability).toFixed(2)}%</td><td>${(100*loss).toFixed(1)}%</td></tr>`;
$('runInfo').textContent='Seed '+currentSeed+' · 1,000 players · 100 rounds · Highlighted player '+(selected+1);
}
function scroll(id){$(id).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
function refresh(){drawOne();drawMany()}

let currentStep=1,initialChoice=null,prediction=null;
const stageIds=['intro','rules','one','many','explanation','results'];
const stageNames=['Your initial choice','Rules and prediction','One player','The population','The explanation','Conclusion and quiz'];
function showStep(n,focus=true){
n=Math.max(1,Math.min(6,n));currentStep=n;
if(n>=3&&!paths.length)generate(freshSeed());
if(n>=3){drawOne();drawMany()}
for(let i=0;i<stageIds.length;i++)$(stageIds[i]).hidden=i!==n-1;
$('stepStatus').textContent='Step '+n+' of 6 · '+stageNames[n-1];$('journeyProgress').value=n;$('previousStep').disabled=n===1;
if(n===6){drawStoppingComparison();const start=initialChoice?'Your initial response was “'+initialChoice+'”. ':'You skipped the initial choice. ';const p=prediction==='above'?'You predicted that most players would finish above $100. Theory instead gives about an 86% chance of finishing below $100 after 100 rounds.':prediction==='below'?'You predicted that most players would finish below $100, which agrees with the theoretical result.':prediction==='unsure'?'You began unsure where most players would finish. The theoretical chance of finishing below $100 is about 86% after 100 rounds.':'You did not make a prediction. The theoretical chance of finishing below $100 is about 86% after 100 rounds.';$('personalRecap').textContent=start+p+' A finite simulated sample can differ. Would you keep your original decision?'}
if(focus){const section=$(stageIds[n-1]);const heading=section.querySelector('h1, h2');heading?.focus();section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
}
function go(n){history.pushState(null,'','#step-'+n);showStep(n)}
function readRoute(){const hash=location.hash;showStep(hash==='#results'?6:Number(hash.match(/^#step-([1-6])$/)?.[1]||1),false)}
window.addEventListener('popstate',readRoute);window.addEventListener('hashchange',readRoute);
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{if(currentStep===5&&b.dataset.step==='6'){try{sessionStorage.setItem('ergolabsAExplored','true')}catch{}}go(Number(b.dataset.step))}));
$('previousStep').addEventListener('click',()=>go(currentStep-1));
document.querySelectorAll('.opening').forEach(b=>b.addEventListener('click',()=>{initialChoice=b.dataset.answer;document.querySelectorAll('.opening').forEach(other=>other.setAttribute('aria-pressed',String(other===b)));$('openingStatus').textContent='Initial response: '+initialChoice+'. Keep it in mind as you explore.';$('introContinue').disabled=false}));
$('introContinue').addEventListener('click',()=>go(2));
document.querySelectorAll('.guess').forEach(b=>b.addEventListener('click',()=>{prediction=b.dataset.answer;document.querySelectorAll('.guess').forEach(other=>other.setAttribute('aria-pressed',String(other===b)));$('predictionStatus').textContent='Prediction recorded. You can change it before continuing.';go(3)}));
$('nextPlayer').addEventListener('click',()=>{selected=(selected+1)%N;refresh()});
$('populationButton').addEventListener('click',()=>go(4));$('populationButton').removeAttribute('aria-expanded');
for(const [id,draw] of [['scaleOne',drawOne],['scaleMany',drawMany]]){
$(id).addEventListener('click',()=>{
 const log=$(id).dataset.scale!=='log';
 $(id).dataset.scale=log?'log':'linear';
 $(id).setAttribute('aria-pressed',String(log));
 $(id+'Log').setAttribute('data-selected',String(log));
 $(id+'Linear').setAttribute('data-selected',String(!log));
 $(id).setAttribute('aria-label','Toggle scale: '+(log?'Log':'Linear')+' selected. Switch to '+(log?'Linear':'Log')+'.');
 draw();
});
}
$('seedForm').addEventListener('submit',e=>{e.preventDefault();const seed=Number($('seed').value);if(!Number.isInteger(seed)||seed<0||seed>4294967295||$('seed').value===''){$('seedStatus').textContent='Enter an integer in the stated range.';return}generate(seed);refresh();$('seedStatus').textContent='Seed applied. Highlighted player reset to player 1.'});
$('newRun').addEventListener('click',()=>{generate(freshSeed());refresh();$('seedStatus').textContent='New population generated.'});
$('explainButton').addEventListener('click',()=>go(5));
$('skipResults').addEventListener('click',()=>{const d=$('skipResultsDialog');if(typeof d.showModal==='function')d.showModal();else if(confirm('Go straight to the results? Following the steps will help explain the game.'))go(6)});
$('keepExploring').addEventListener('click',()=>$('skipResultsDialog').close());$('confirmResults').addEventListener('click',()=>{$('skipResultsDialog').close();go(6)});
const quizQuestions=Array.from(document.querySelectorAll('.quiz-question'));
function clearQuizFeedback(){
for(const question of quizQuestions){question.removeAttribute('data-state');const feedback=question.querySelector('.quiz-feedback');feedback.hidden=true;feedback.textContent=''}
}
$('quizForm').addEventListener('submit',e=>{
e.preventDefault();
if(!$('quizForm').reportValidity())return;
let correct=0;
try{sessionStorage.setItem('ergolabsAExplored','true')}catch{}
for(const question of quizQuestions){
const answer=question.querySelector('input:checked');
const isCorrect=answer.value===question.dataset.correct;
if(isCorrect)correct++;
question.setAttribute('data-state',isCorrect?'correct':'review');
const feedback=question.querySelector('.quiz-feedback');
const correctOption=question.querySelector('input[value="'+question.dataset.correct+'"]').closest('label').querySelector('span').textContent;
feedback.textContent=(isCorrect?'Correct. ':'Not quite. Correct answer: '+correctOption+' ')+question.dataset.explanation;
feedback.hidden=false;
}
$('quizResult').hidden=false;
$('quizResult').textContent='You answered '+correct+' of '+quizQuestions.length+' correctly. '+(correct===quizQuestions.length?'Review the explanations below to consolidate what you learned.':'Review the explanations below, then change your answers and check again.');
$('quizResult').focus();
});
$('quizForm').addEventListener('change',()=>{
if(!$('quizResult').hidden){clearQuizFeedback();$('quizResult').textContent='Answers changed. Check answers again to update your feedback.'}
});
$('quizForm').addEventListener('reset',()=>{clearQuizFeedback();$('quizResult').hidden=true;$('quizResult').textContent=''});
function sequence(order,stop){
const result=[100];let exited=false;
for(const factor of order){let next=result[result.length-1];if(!exited)next*=factor;if(stop&&next<10)exited=true;result.push(next)}
return result;
}
function drawStoppingComparison(){
const headFirst=[...Array(5).fill(1.5),...Array(5).fill(.6)],tailFirst=[...Array(5).fill(.6),...Array(5).fill(1.5)];
chart('stopChart',[{values:sequence(tailFirst,false),color:'#89978d',dash:true,width:2},{values:sequence(headFirst,true),color:'#27654e'},{values:sequence(tailFirst,true),color:'#bd673a'}],{height:330,rounds:10,threshold:10});
}
if(Math.abs(Math.exp(g)-Math.sqrt(.9))>1e-12)throw Error('Growth conversion check failed');
const tooltips=Array.from(document.querySelectorAll('.tooltip'));
function closeTip(tip){tip.setAttribute('data-open','false');tip.dataset.pinned='false'}
for(const tip of tooltips){
 const trigger=tip.querySelector('button'),bubble=tip.querySelector('[role="tooltip"]');
 function place(){
  const rect=trigger.getBoundingClientRect(),width=bubble.offsetWidth,height=bubble.offsetHeight;
  const left=Math.max(12,Math.min(rect.left+(rect.width-width)/2,window.innerWidth-width-12));
  const top=rect.bottom+8+height<=window.innerHeight-12?rect.bottom+8:Math.max(12,rect.top-height-8);
  bubble.style.left=left+'px';bubble.style.top=top+'px';
 }
 function show(){tip.setAttribute('data-open','true');place()}
 tip.addEventListener('mouseenter',show);
 tip.addEventListener('mouseleave',()=>{if(tip.dataset.pinned!=='true')closeTip(tip)});
 trigger.addEventListener('focus',show);
 trigger.addEventListener('blur',()=>closeTip(tip));
 trigger.addEventListener('click',()=>{if(tip.dataset.pinned==='true')closeTip(tip);else{tip.dataset.pinned='true';show()}});
}
document.addEventListener('keydown',event=>{if(event.key==='Escape')tooltips.forEach(closeTip)});
document.addEventListener('click',event=>{for(const tip of tooltips)if(!tip.contains(event.target))closeTip(tip)});
window.addEventListener('resize',()=>tooltips.forEach(closeTip));
window.addEventListener('scroll',()=>tooltips.forEach(closeTip),true);
readRoute();
})();