const navWrap=document.querySelector('.nav-wrap');
const menuBtn=document.querySelector('.menu-btn');
menuBtn.addEventListener('click',()=>{const open=navWrap.classList.toggle('open');menuBtn.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',open);menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu')});

document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navWrap.classList.remove('open');menuBtn.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open menu')}));

const heroLetters=document.querySelectorAll('.hero-name span');
heroLetters.forEach(letter=>{letter.addEventListener('mousemove',e=>{const r=letter.getBoundingClientRect();const x=((e.clientX-r.left)/r.width-.5)*8;const y=((e.clientY-r.top)/r.height-.5)*5;letter.style.setProperty('--mx',`${x}px`);letter.style.setProperty('--my',`${y}px`);letter.classList.add('magnetic')});letter.addEventListener('mouseleave',()=>{letter.classList.remove('magnetic');letter.style.removeProperty('--mx');letter.style.removeProperty('--my')})});

document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{const target=document.querySelector(button.dataset.scroll);if(target)target.scrollIntoView({behavior:'smooth',block:'start'})}));

const pageDots=document.querySelectorAll('.page-dot');
const sections=['#home','#about','#skills'].map(s=>document.querySelector(s));
function updatePagination(){const p=scrollY+innerHeight*.45;let active=0;sections.forEach((s,i)=>{if(s&&p>=s.offsetTop)active=i});pageDots.forEach((d,i)=>d.classList.toggle('active',i===active))}addEventListener('scroll',updatePagination);addEventListener('load',updatePagination);

const themeButton=document.querySelector('.theme-toggle');
const icon=themeButton.querySelector('.theme-icon');
const label=themeButton.querySelector('.theme-label');
function setTheme(theme){document.body.classList.toggle('light',theme==='light');localStorage.setItem('portfolio-theme',theme);const light=theme==='light';icon.textContent=light?'☀':'☾';label.textContent=light?'Light':'Dark';themeButton.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme')}
setTheme(localStorage.getItem('portfolio-theme')||'dark');
themeButton.addEventListener('click',()=>setTheme(document.body.classList.contains('light')?'dark':'light'));
