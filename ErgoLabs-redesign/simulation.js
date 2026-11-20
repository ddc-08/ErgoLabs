/* Original Mulberry32 and path-major draw order retained for seed compatibility. */
(function(root){
'use strict';
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function generate(seed,n=1000,t=100){
 if(!Number.isInteger(seed)||seed<0||seed>4294967295)throw Error('Invalid seed');
 const random=rng(seed);return Array.from({length:n},()=>{const p=[100];for(let i=1;i<=t;i++)p.push(p[i-1]*(random()<.5?1.5:.6));return p});
}
function summarize(paths,n=paths.length,t=paths[0].length-1){
 const means=[],medians=[];for(let r=0;r<=t;r++){const a=paths.slice(0,n).map(p=>p[r]).sort((a,b)=>a-b);means.push(a.reduce((s,v)=>s+v,0)/n);medians.push(n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2)}
 return {means,medians,loss:paths.slice(0,n).filter(p=>p[t]<100).length/n};
}
function sequence(order,stop){let exited=false;const p=[100];for(const f of order){let v=p.at(-1);if(!exited)v*=f;if(stop&&v<10)exited=true;p.push(v)}return p}
function lossProbability(t){let term=2**-t,p=0;for(let h=0;h<=t;h++){if(100*1.5**h*.6**(t-h)<100)p+=term;term*=(t-h)/(h+1)}return p}
const api={rng,generate,summarize,sequence,lossProbability,g:.5*Math.log(1.5)+.5*Math.log(.6),expected:t=>100*1.05**t};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ErgoSim=api;
})(globalThis);
