// ============================================================
// main.js – Assicurazioni Palermo
// ============================================================

// ── SLIDER ──
let cur=0;
const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.s-dot');
let timer=null;
function showSlide(n){
  slides[cur].classList.remove('active');
  dots[cur].classList.remove('active');
  cur=(n+slides.length)%slides.length;
  slides[cur].classList.add('active');
  dots[cur].classList.add('active');
}
function moveSlider(d){clearTimeout(timer);showSlide(cur+d);startAuto()}
function goSlide(n){clearTimeout(timer);showSlide(n);startAuto()}
function startAuto(){timer=setTimeout(()=>{showSlide(cur+1);startAuto()},6000)}
startAuto();

// ── REVEAL ──
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})
},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ── FORM ──
function submitForm(){
  const n=document.getElementById('fn').value;
  const t=document.getElementById('ft').value;
  const p=document.getElementById('priv').checked;
  if(!n||!t){alert('Inserisci nome e telefono.');return}
  if(!p){alert('Accetta la Privacy Policy per procedere.');return}
  const s=document.getElementById('succ');
  s.style.display='block';
  setTimeout(()=>s.style.display='none',6000);
}

// ── MOBILE MENU ──
var menuOpen=false;
function openMenu(){
  menuOpen=true;
  var n=document.getElementById('mobnav'),h=document.getElementById('ham');
  if(!n||!h)return;
  n.style.display='flex';
  requestAnimationFrame(function(){n.classList.add('is-open')});
  h.classList.add('is-open');
  document.body.style.overflow='hidden';
}
function closeMenu(){
  menuOpen=false;
  var n=document.getElementById('mobnav'),h=document.getElementById('ham');
  if(!n||!h)return;
  n.classList.remove('is-open');
  h.classList.remove('is-open');
  document.body.style.overflow='';
  setTimeout(function(){if(!menuOpen)n.style.display='none';},350);
}
function toggleMenu(){menuOpen?closeMenu():openMenu();}
document.addEventListener('DOMContentLoaded',function(){
  var n=document.getElementById('mobnav');
  if(n){n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu)});}
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menuOpen)closeMenu();});
});

document.querySelectorAll('#mobnav a').forEach(a=>a.addEventListener('click',()=>{
  mo=false;document.getElementById('mobnav').style.display='none';
  document.querySelectorAll('.ham span').forEach(s=>{s.style.transform='';s.style.opacity=''});
}));

// Dropdown Persona nel menu mobile
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.mnv-dropdown-toggle');
  if (toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var body = this.nextElementSibling;
      var isOpen = this.classList.contains('open');
      this.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
    });
  }
});


function toggleDropdown(btn) {
  var body = btn.nextElementSibling;
  var isOpen = btn.classList.contains('open');
  // Chiudi tutti gli altri
  document.querySelectorAll('.mnv-dropdown-toggle.open').forEach(function(b) {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    body.classList.add('open');
  }
}

// ── FORMSPREE SUCCESS ──
// Formspree success message
if(window.location.search.includes('success')){
  document.addEventListener('DOMContentLoaded',function(){
    var msg = document.createElement('div');
    msg.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#27ae60;color:#fff;padding:16px 28px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,.2);font-size:.88rem';
    msg.textContent='La richiesta è stata inoltrata correttamente. Verrai contattato al più presto da un nostro consulente.';
    document.body.appendChild(msg);
    setTimeout(function(){msg.remove()},6000);
  });
}
