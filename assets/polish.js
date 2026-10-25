(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const $$=s=>document.querySelectorAll(s);
if(!reduce&&fine){
  // spotlight follows the cursor inside cards
  $$('.f-card,.proc-card,.f-step,.f-quote,.svc-card,.team-card,.chart-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px');}));
  // magnetic buttons
  $$('.btn-gold,.btn-outline,.nav-btn').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--tx',((e.clientX-r.left-r.width/2)*.18).toFixed(1)+'px');b.style.setProperty('--ty',((e.clientY-r.top-r.height/2)*.28).toFixed(1)+'px');});
    b.addEventListener('pointerleave',()=>{b.style.setProperty('--tx','0px');b.style.setProperty('--ty','0px');});
  });
}
// nav hides on scroll down, returns on scroll up; portrait parallax
const nav=document.querySelector('nav'),fr=document.querySelector('.f-frame');let y0=scrollY,tick=false;
addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{
  const y=scrollY;
  if(nav&&!reduce)nav.classList.toggle('pl-hide',y>y0&&y>240);
  if(fr&&!reduce&&y<innerHeight*1.2)fr.style.setProperty('--py',(y*-.06).toFixed(1)+'px');
  y0=y;tick=false;});},{passive:true});

document.documentElement.classList.add('pl-js');
// divider lines draw in when scrolled into view
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('pl-in');io.unobserve(e.target);}}),{threshold:.4});$$('.glow-rule').forEach(el=>io.observe(el));}
else $$('.glow-rule').forEach(el=>el.classList.add('pl-in'));
// soft glow that trails the cursor
if(!reduce&&fine){const g=document.createElement('div');g.className='pl-cursor';g.setAttribute('aria-hidden','true');document.body.appendChild(g);
  let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty,run=false;
  const loop=()=>{x+=(tx-x)*.09;y+=(ty-y)*.09;g.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.5)requestAnimationFrame(loop);else run=false;};
  addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;g.classList.add('on');if(!run){run=true;requestAnimationFrame(loop);}},{passive:true});
  document.addEventListener('pointerleave',()=>g.classList.remove('on'));}
// fade between pages
if(!reduce)document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');
  if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank'||a.hasAttribute('download'))return;
  const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname||!/\.html$|\/$/.test(u.pathname))return;
  e.preventDefault();document.documentElement.classList.add('pl-leave');setTimeout(()=>{location.href=u.href;},320);});
addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('pl-leave');});

// price: quick, believable markdown. The old price stays crossed out while the number
// drops from it to the real price in ~0.9s, then the discount badge pops in.
document.querySelectorAll('.p-big').forEach(el=>{
  const final=el.textContent.trim(),to=parseInt(final.replace(/[^0-9]/g,''),10),box=el.closest('.price-box')||el.parentElement,
    was=box.querySelector('.p-was'),from=was?parseInt(was.textContent.replace(/[^0-9]/g,''),10):0;
  if(reduce||!to||!from||to>=from||!('IntersectionObserver' in window)){return;}
  const fmt=n=>Math.round(n).toLocaleString('en-US');
  // arm a little before the box scrolls in, so the viewer never sees the final price flash first
  const arm=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;arm.disconnect();
    el.textContent=fmt(from);box.classList.add('pl-price-wait');},{rootMargin:'0px 0px 60% 0px'});
  const go=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;go.disconnect();
    if(!box.classList.contains('pl-price-wait')){el.textContent=fmt(from);box.classList.add('pl-price-wait');}
    const t0=performance.now()+250,D=900,ease=t=>1-Math.pow(1-t,3);
    const step=now=>{const k=Math.max(0,Math.min((now-t0)/D,1));el.textContent=fmt(from-(from-to)*ease(k));
      if(k<1)requestAnimationFrame(step);else{el.textContent=final;box.classList.remove('pl-price-wait');box.classList.add('pl-price-done');}};
    requestAnimationFrame(step);},{threshold:.3});
  arm.observe(box);go.observe(box);
});

// deterrents: block right-click, dragging media, and the usual inspect / view-source / save shortcuts
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('dragstart',e=>{if(e.target.closest&&e.target.closest('img,svg,picture,a'))e.preventDefault();});
document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase(),m=e.ctrlKey||e.metaKey;
  if(e.key==='F12'||(m&&e.shiftKey&&['i','j','c','k'].includes(k))||(m&&e.altKey&&['i','j','u'].includes(k))||(m&&['u','s','p'].includes(k)))e.preventDefault();});
})();
