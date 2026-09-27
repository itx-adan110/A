const navWrap=document.querySelector('.nav-wrap');
const menuBtn=document.querySelector('.menu-btn');
menuBtn.addEventListener('click',()=>{const open=navWrap.classList.toggle('open');menuBtn.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',open);menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu')});

document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navWrap.classList.remove('open');menuBtn.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open menu')}));

document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{const target=document.querySelector(button.dataset.scroll);if(target)target.scrollIntoView({behavior:'smooth',block:'start'})}));

const pageDots=document.querySelectorAll('.page-dot');
const sections=['#home','#about','#skills'].map(s=>document.querySelector(s));
function updatePagination(){const p=scrollY+innerHeight*.45;let active=0;sections.forEach((s,i)=>{if(s&&p>=s.offsetTop)active=i});pageDots.forEach((d,i)=>d.classList.toggle('active',i===active))}
addEventListener('scroll',updatePagination);addEventListener('load',updatePagination);


const themeButton=document.querySelector('.theme-toggle');
const icon=themeButton.querySelector('.theme-icon');
const label=themeButton.querySelector('.theme-label');
function setTheme(theme){document.body.classList.toggle('light',theme==='light');localStorage.setItem('portfolio-theme',theme);const light=theme==='light';icon.textContent=light?'☀':'☾';label.textContent=light?'Light':'Dark';themeButton.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme')}
setTheme(localStorage.getItem('portfolio-theme')||'dark');
themeButton.addEventListener('click',()=>setTheme(document.body.classList.contains('light')?'dark':'light'));

const hero=document.querySelector('.hero');
const beam=document.querySelector('.cursor-beam');
const revealNames=document.querySelectorAll('.hero-name');
let pointerX=0,pointerY=0,beamX=0,beamY=0,beamFrame=0;
const coarse=matchMedia('(pointer:coarse)').matches;
function updateReveal(x,y){
  revealNames.forEach(name=>{
    const r=name.getBoundingClientRect();
    name.style.setProperty('--rx',`${Math.max(0,Math.min(r.width,x-r.left))}px`);
    name.style.setProperty('--ry',`${Math.max(0,Math.min(r.height,y-r.top))}px`);
  });
}
function animateBeam(){
  beamX+=(pointerX-beamX)*.16; beamY+=(pointerY-beamY)*.16;
  if(beam){beam.style.transform=`translate3d(${beamX}px,${beamY}px,0) rotate(18deg)`;}
  beamFrame=requestAnimationFrame(animateBeam);
}
if(!coarse){
  addEventListener('pointermove',e=>{
    pointerX=e.clientX; pointerY=e.clientY;
    if(beam)beam.style.opacity='1';
    updateReveal(e.clientX,e.clientY);
    if(!beamFrame)animateBeam();
  },{passive:true});
  addEventListener('pointerleave',()=>{if(beam)beam.style.opacity='0'});
  addEventListener('blur',()=>{if(beam)beam.style.opacity='0'});
}
