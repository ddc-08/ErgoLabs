(()=>{'use strict';
const $=id=>document.getElementById(id), S=ErgoSim;
const money=v=>v>0&&v<.01?'$'+v.toPrecision(3):new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(v);
const pct=v=>new Intl.NumberFormat('en-US',{style:'percent',maximumFractionDigits:2}).format(v);
const stages=['intro','rules','one','many','explanation','results'];
const names=['The game','Your prediction','One player','Compare players','The explanation','Results and exploration'];
let seed,selected=0,paths,stats,current=1,choice=null,prediction=null;
const scales={one:'log',many:'log',explore:'log',stop:'log'};
const params=new URLSearchParams(location.search), initialSeed=params.get('seed');
if(initialSeed!==null&&/^\d+$/.test(initialSeed)&&Number(initialSeed)<=4294967295)seed=Number(initialSeed);
else seed=freshSeed();
if(/^\d+$/.test(params.get('player')||''))selected=Math.max(0,Math.min(999,Number(params.get('player'))-1));
for(const key of Object.keys(scales))if(params.get(key)==='linear')scales[key]='linear';
for(const [id,key,allowed] of [['exploreN','n',['1','10','100','1000']],['exploreT','t',['10','50','100']]])if(allowed.includes(params.get(key)))$(id).value=params.get(key);
function syncURL(){const u=new URL(location.href);u.searchParams.set('seed',seed);u.searchParams.set('player',selected+1);for(const k of Object.keys(scales))scales[k]==='linear'?u.searchParams.set(k,'linear'):u.searchParams.delete(k);u.searchParams.set('n',$('exploreN').value);u.searchParams.set('t',$('exploreT').value);try{history.replaceState(null,'',u)}catch{}}
function generate(v){seed=v;paths=S.generate(seed);stats=S.summarize(paths);$('seed').value=seed;$('player').value=selected+1;syncURL()}
function freshSeed(){if(globalThis.crypto?.getRandomValues)return crypto.getRandomValues(new Uint32Array(1))[0];return Date.now()>>>0}
function chart(key,series,{rounds=100,threshold=100,round=null}={}){
 const svg=$(key+'Chart');if(svg.closest('[hidden]'))return;
 const W=Math.max(280,Math.round(svg.parentElement.clientWidth-2*parseFloat(getComputedStyle(svg.parentElement).paddingLeft))),H=320,L=W<500?61:78,R=16,top=18,bottom=46;
 const log=scales[key]==='log';let lo=threshold,hi=threshold;
 for(const s of series)for(const v of s.values){lo=Math.min(lo,v);hi=Math.max(hi,v)}
 let min=log?Math.floor(Math.log10(lo)):0,max=log?Math.ceil(Math.log10(hi)):hi*1.06;if(max<=min)max=min+1;
 const x=t=>L+t/rounds*(W-L-R),y=v=>top+(max-(log?Math.log10(v):v))/(max-min)*(H-top-bottom);
 const number=v=>v>=1e6?'$'+(v/1e6).toFixed(1)+'m':v>=1000?'$'+(v/1000).toFixed(1)+'k':v<.01?'$'+v.toExponential(0):money(v);
 let out='';const ticks=log?Math.max(1,Math.ceil((max-min)/5)):0;
 const values=log?Array.from({length:Math.floor((max-min)/ticks)+1},(_,i)=>10**(min+i*ticks)):Array.from({length:5},(_,i)=>max*i/4);
 for(const v of values)out+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#d9dfd5"/><text x="${L-9}" y="${y(v)+4}" text-anchor="end">${number(v)}</text>`;
 out+=`<line x1="${L}" x2="${W-R}" y1="${y(threshold)}" y2="${y(threshold)}" stroke="#7b8d80" stroke-dasharray="2 5"/>`;
 for(let i=0;i<=5;i++){const t=rounds*i/5;out+=`<text x="${x(t)}" y="${H-25}" text-anchor="middle">${t}</text>`}
 for(const s of series){const d=s.values.map((v,t)=>(t?'L':'M')+x(t).toFixed(2)+' '+y(v).toFixed(2)).join(' ');out+=`<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.width||2.5}" ${s.dash?'stroke-dasharray="7 5"':''} stroke-linejoin="round"/>`}
 if(round!==null){out+=`<line x1="${x(round)}" x2="${x(round)}" y1="${top}" y2="${H-bottom}" stroke="#213b32" stroke-dasharray="2 3"/>`;for(const s of series.filter(s=>!s.example))out+=`<circle cx="${x(round)}" cy="${y(s.values[round])}" r="3.5" fill="${s.color}" stroke="#fffef9"/>`}
 out+=`<text x="${(L+W-R)/2}" y="${H-5}" text-anchor="middle">Round · ${log?'log':'linear'} wealth axis</text>`;
 svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.innerHTML=out;
 document.querySelectorAll(`[data-chart="${key}"]`).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scale===scales[key])));
}
const expected=t=>Array.from({length:t+1},(_,r)=>S.expected(r));
function drawOne(){const r=Number($('oneRound').value);chart('one',[{values:paths[selected],color:'#27654e'}],{round:r});$('oneResult').textContent=`Player ${selected+1} finishes with ${money(paths[selected][100])}.`;$('oneRoundLabel').textContent=r;$('oneAtRound').textContent=`Round ${r}: player ${selected+1} has ${money(paths[selected][r])}. Starting balance: $100.`}
function drawMany(){const r=Number($('manyRound').value);const series=[];for(let i=0;i<10;i++)series.push({values:paths[i],color:'#c3ccc0',width:1,example:true});series.push({values:stats.means,color:'#3569a5'},{values:stats.medians,color:'#a45129'},{values:expected(100),color:'#213b32',dash:true},{values:paths[selected],color:'#27654e',width:2});chart('many',series,{round:r});$('median').textContent=money(stats.medians[100]);$('mean').textContent=money(stats.means[100]);$('loss').textContent=pct(stats.loss);$('manyRoundLabel').textContent=r;$('manyAtRound').textContent=`Round ${r}: selected player ${money(paths[selected][r])}; sample median ${money(stats.medians[r])}; sample average ${money(stats.means[r])}; theoretical expectation ${money(S.expected(r))}.`;$('runInfo').textContent=`Seed ${seed} · 1,000 players · 100 rounds · Selected player ${selected+1}`;if($('dataDetails').open)drawTable()}
function drawTable(){$('chartData').innerHTML=stats.means.map((v,r)=>`<tr><th scope="row">${r}</th><td>${money(paths[selected][r])}</td><td>${money(stats.medians[r])}</td><td>${money(v)}</td><td>${money(S.expected(r))}</td></tr>`).join('')}
function drawExplore(){const n=Number($('exploreN').value),t=Number($('exploreT').value),s=S.summarize(paths,n,t);chart('explore',[{values:s.means,color:'#3569a5'},{values:s.medians,color:'#a45129'},{values:expected(t),color:'#213b32',dash:true},{values:paths[0].slice(0,t+1),color:'#27654e',width:2}],{rounds:t});$('exploreReadout').textContent=`${n.toLocaleString('en-US')} player${n===1?'':'s'}, ${t} rounds: sample median ${money(s.medians[t])}; sample average ${money(s.means[t])}; theoretical expectation ${money(S.expected(t))}; ${pct(s.loss)} below $100.`;$('growthReadout').textContent=`Player 1 ends at ${money(paths[0][t])}. Their realised average log growth is ${(Math.log(paths[0][t]/100)/t).toFixed(6)} per round. The model’s long-run benchmark is ${S.g.toFixed(6)}.`}
function drawStop(){const h=[...Array(5).fill(1.5),...Array(5).fill(.6)],t=[...h].reverse();chart('stop',[{values:S.sequence(t,false),color:'#213b32',dash:true},{values:S.sequence(h,true),color:'#27654e'},{values:S.sequence(t,true),color:'#a45129'}],{rounds:10,threshold:10})}
function drawResults(){$('personalRecap').textContent=(choice?`You initially chose “${choice}”. `:'You did not record an initial choice. ')+(prediction?`Your prediction: ${prediction==='unsure'?'not sure':`most players ${prediction} $100`}. `:'You did not record a prediction. ')+'Under the model, each player has an 86.44% chance of finishing below $100 after 100 rounds.';$('resultSample').textContent=`This run (seed ${seed}): ${pct(stats.loss)} of the 1,000 players finished below $100. Sample median ${money(stats.medians[100])}; sample average ${money(stats.means[100])}.`;drawExplore();drawStop()}
function render(){if(current===3)drawOne();if(current===4)drawMany();if(current===6)drawResults()}
function show(n,focus=false){current=Math.max(1,Math.min(6,n));stages.forEach((id,i)=>$(id).hidden=i!==current-1);document.querySelectorAll('.journey-nav [data-step]').forEach(b=>b.setAttribute('aria-current',Number(b.dataset.step)===current?'step':'false'));$('stepStatus').textContent=`Step ${current} of 6 · ${names[current-1]}`;render();if(focus){const heading=$(stages[current-1]).querySelector('h1,h2');heading.focus({preventScroll:true});heading.scrollIntoView({block:'start',behavior:'auto'})}}
function route(){const hash=location.hash;show(hash==='#results'||hash==='#extension'?6:Number(hash.match(/^#step-([1-6])$/)?.[1]||1));if(hash==='#extension')$('extension').scrollIntoView()}
function go(n){try{history.pushState(null,'','#step-'+n)}catch{}show(n,true)}
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.step))));$('skipResults').addEventListener('click',()=>go(6));
document.querySelectorAll('.opening').forEach(b=>b.addEventListener('click',()=>{choice=b.dataset.answer;document.querySelectorAll('.opening').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('openingStatus').textContent=`You chose “${choice}”. You can change your mind as you explore.`}));
document.querySelectorAll('.guess').forEach(b=>b.addEventListener('click',()=>{prediction=b.dataset.answer;document.querySelectorAll('.guess').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('predictionStatus').textContent='Prediction recorded. Follow one player when you’re ready.'}));
for(const key of Object.keys(scales))document.querySelectorAll(`[data-chart="${key}"]`).forEach(b=>b.addEventListener('click',()=>{scales[key]=b.dataset.scale;syncURL();render()}));
$('oneRound').addEventListener('input',drawOne);$('manyRound').addEventListener('input',drawMany);
$('nextPlayer').addEventListener('click',()=>{selected=(selected+1)%1000;$('player').value=selected+1;syncURL();drawOne()});
$('selectPlayer').addEventListener('click',()=>{const v=Number($('player').value);if(!$('player').value||!Number.isInteger(v)||v<1||v>1000){$('playerStatus').textContent='Enter a whole player number from 1 to 1,000.';$('player').focus();return}selected=v-1;syncURL();drawOne();$('playerStatus').textContent=`Showing player ${v}.`});
$('seedForm').addEventListener('submit',e=>{e.preventDefault();const v=Number($('seed').value);if(!$('seed').value||!Number.isInteger(v)||v<0||v>4294967295){$('seedStatus').textContent='Enter a whole seed from 0 to 4,294,967,295.';return}selected=0;generate(v);render();$('seedStatus').textContent=`Seed ${seed} applied. Player 1 is selected.`});
$('newRun').addEventListener('click',()=>{selected=0;generate(freshSeed());render();$('seedStatus').textContent=`New seed ${seed} generated. Player 1 is selected.`});
$('dataDetails').addEventListener('toggle',()=>{if($('dataDetails').open)drawTable()});
for(const id of ['exploreN','exploreT'])$(id).addEventListener('change',()=>{syncURL();drawExplore()});
const questions=[...document.querySelectorAll('.quiz-question')];
function clearQuiz(){for(const q of questions){q.removeAttribute('data-state');const f=q.querySelector('.quiz-feedback');f.hidden=true;f.textContent=''}}
$('quizForm').addEventListener('submit',e=>{e.preventDefault();if(!$('quizForm').reportValidity())return;let correct=0;for(const q of questions){const yes=q.querySelector('input:checked').value===q.dataset.correct;correct+=Number(yes);q.dataset.state=yes?'correct':'review';const f=q.querySelector('.quiz-feedback');f.textContent=(yes?'Correct. ':'Not quite. ')+q.dataset.explanation;f.hidden=false}$('quizResult').hidden=false;$('quizResult').textContent=`${correct} of ${questions.length} correct. Review the explanations, then change any answer and check again.`;$('quizResult').focus()});
$('quizForm').addEventListener('change',()=>{if(!$('quizResult').hidden){clearQuiz();$('quizResult').textContent='Answers changed. Check again for updated feedback.'}});$('quizForm').addEventListener('reset',()=>{clearQuiz();$('quizResult').hidden=true});
document.querySelectorAll('.chart-help').forEach(d=>{d.addEventListener('mouseenter',()=>d.open=true);d.addEventListener('mouseleave',()=>{if(!d.contains(document.activeElement))d.open=false});d.addEventListener('focusout',e=>{if(!d.contains(e.relatedTarget))d.open=false})});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.chart-help').forEach(d=>d.open=false)});document.addEventListener('click',e=>document.querySelectorAll('.chart-help').forEach(d=>{if(!d.contains(e.target))d.open=false}));
window.addEventListener('popstate',route);window.addEventListener('hashchange',route);let resize;window.addEventListener('resize',()=>{clearTimeout(resize);resize=setTimeout(render,100)});
generate(seed);route();
})();
