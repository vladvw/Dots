const colors = ['coral', 'gold', 'blue', 'sage'];
const goal = ['coral', 'gold', 'blue', 'coral'];
const positions = [
  [15,18],[37,13],[63,15],[85,23],[24,34],[49,31],[76,39],
  [11,53],[34,50],[66,53],[89,56],[22,70],[48,72],[76,72],
  [10,88],[36,88],[63,88],[89,86]
];
const board = document.querySelector('#board');
const trails = document.querySelector('#trails');
let nodes = [], path = [], drawing = false, completed = 0, score = 0, moves = 12, shuffles = 2;

function seedBoard() {
  nodes.forEach(node => node.remove()); nodes = []; path = []; trails.innerHTML = '';
  // The first arc always contains one complete rhythm; the remaining sky varies.
  const seeded = ['coral','gold','blue','coral'];
  const drifting = ['gold','coral','blue','sage','coral','gold','coral','blue','gold','sage','blue','coral','gold','coral'];
  drifting.sort(() => Math.random() - .5); seeded.push(...drifting);
  positions.forEach(([x,y], index) => {
    const node = document.createElement('button');
    node.className = `node ${seeded[index]}`; node.dataset.color = seeded[index];
    node.style.left = `${x}%`; node.style.top = `${y}%`; node.setAttribute('aria-label', `${seeded[index]} light`);
    board.appendChild(node); nodes.push(node);
  });
}
function point(node) { return { x:node.offsetLeft, y:node.offsetTop }; }
function renderTrail(pointer) {
  trails.innerHTML = '';
  const pts = path.map(point); if (pointer && pts.length) pts.push(pointer);
  if (pts.length < 2) return;
  const line = document.createElementNS('http://www.w3.org/2000/svg','polyline');
  line.setAttribute('points', pts.map(p=>`${p.x},${p.y}`).join(' ')); line.setAttribute('class','trail'); trails.appendChild(line);
}
function expectedColor() { return goal[path.length % goal.length]; }
function addNode(node) {
  if (path.includes(node) || node.dataset.color !== expectedColor()) return;
  if (path.length) { const a=point(path.at(-1)), b=point(node); if (Math.hypot(a.x-b.x,a.y-b.y)>145) return; }
  path.push(node); node.classList.add('active'); renderTrail();
  document.querySelector('#hint').textContent = path.length === goal.length ? 'Release to complete the weave.' : `Now find ${expectedColor()}.`;
}
function start(e) { const node=e.target.closest('.node'); if (!node || node.dataset.color!==goal[0] || moves<=0) return; drawing=true; path=[]; addNode(node); board.setPointerCapture?.(e.pointerId); }
function move(e) { if(!drawing)return; const rect=board.getBoundingClientRect(); const p={x:e.clientX-rect.left,y:e.clientY-rect.top}; renderTrail(p); const near=nodes.find(n=>{const q=point(n);return Math.hypot(q.x-p.x,q.y-p.y)<24}); if(near)addNode(near); }
function end() {
  if(!drawing)return; drawing=false;
  if(path.length>=goal.length && path.length%goal.length===0) { completed++; moves--; score += path.length*25; updateStatus(); celebrate(); }
  else { path.forEach(n=>n.classList.remove('active')); renderTrail(); document.querySelector('#hint').textContent='Begin with coral, then follow the colors above.'; }
}
function updateStatus(){ document.querySelector('#movesValue').textContent=moves; document.querySelector('#scoreValue').textContent=String(score).padStart(3,'0'); document.querySelector('#goalCount').textContent=`${Math.min(completed,3)} / 3`; }
function celebrate(){ document.querySelector('#instruction').textContent=completed>=3?'The dusk is glowing':'Beautifully woven'; document.querySelector('#hint').textContent=`+${path.length*25} glow · the rhythm held`; path.forEach((n,i)=>setTimeout(()=>n.style.opacity='0',i*60)); setTimeout(seedBoard,700); }
board.addEventListener('pointerdown',start); board.addEventListener('pointermove',move); board.addEventListener('pointerup',end); board.addEventListener('pointercancel',end);

const dialog=document.querySelector('#infoDialog'); document.querySelector('#infoButton').onclick=()=>dialog.showModal(); document.querySelector('#closeInfo').onclick=()=>dialog.close(); document.querySelector('#playButton').onclick=()=>dialog.close();
document.querySelector('#soundButton').onclick=e=>{e.currentTarget.style.opacity=e.currentTarget.style.opacity==='0.45'?'1':'0.45'};
document.querySelector('#shuffleButton').onclick=()=>{if(shuffles<1)return; shuffles--; seedBoard(); document.querySelector('#shuffleButton small').textContent=`${shuffles} left`; const t=document.querySelector('#toast'); t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1400)};
let installPrompt;
const installButton = document.querySelector('#installButton');
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); installPrompt = event; installButton.hidden = false;
});
installButton.addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt(); await installPrompt.userChoice; installPrompt = undefined; installButton.hidden = true;
});
seedBoard();
