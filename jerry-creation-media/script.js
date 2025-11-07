// script.js - theme, mobile menu, lightbox, prefill package, contact form fallback
document.addEventListener('DOMContentLoaded', ()=> {
  // set years
  document.querySelectorAll('#year,#year2,#year3,#year4,#year5').forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // THEME (light default)
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('jc_theme');
  if(saved === 'dark') body.classList.add('dark');
  if(themeToggle){
    themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    themeToggle.addEventListener('click', ()=> {
      const isDark = body.classList.toggle('dark');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('jc_theme', isDark ? 'dark' : 'light');
    });
  }

  // mobile menu
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if(mobileToggle && mobileMenu){ mobileToggle.addEventListener('click', ()=> { mobileMenu.classList.add('active'); mobileMenu.setAttribute('aria-hidden','false'); }); }
  if(mobileClose && mobileMenu){ mobileClose.addEventListener('click', ()=> { mobileMenu.classList.remove('active'); mobileMenu.setAttribute('aria-hidden','true'); }); }
  document.querySelectorAll('.mobile-menu a').forEach(a => a && a.addEventListener('click', ()=> { if(mobileMenu) mobileMenu.classList.remove('active'); }));

  // preloader
  window.addEventListener('load', ()=> { const pre = document.getElementById('preloader'); if(pre){ pre.style.opacity='0'; setTimeout(()=> pre.remove(),600); } });

  // lightbox for gallery / preview items
  document.querySelectorAll('.gallery-item, .preview-card, .portfolio-item').forEach(el => {
    if(!el) return;
    el.addEventListener('click', (e) => {
      const src = el.dataset?.src || (el.querySelector ? (el.querySelector('img') ? el.querySelector('img').src : null) : null);
      if(!src) return;
      const lb = document.getElementById('lightbox');
      const lbImg = document.getElementById('lightboxImg');
      if(lb && lbImg){ lbImg.src = src; lb.classList.add('active'); lb.setAttribute('aria-hidden','false'); }
    });
  });
  const lb = document.getElementById('lightbox'); if(lb) lb.addEventListener('click', ()=> { lb.classList.remove('active'); lb.setAttribute('aria-hidden','true'); });

  // prefill project type from URL (pricing -> contact)
  (function prefillFromURL(){
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('pkg') || params.get('source');
    if(pkg){
      const projectInput = document.getElementById('projectType') || document.querySelector('input[name="Project"]');
      if(projectInput) projectInput.value = pkg;
      // scroll to form if on contact page
      if(window.location.pathname.endsWith('contact.html')) document.getElementById('inquiryForm')?.scrollIntoView({behavior:'smooth'});
    }
  })();

  // contact form submit: (FormSubmit handles POST). Provide mailto fallback
  const form = document.getElementById('inquiryForm');
  const mailBtn = document.getElementById('mailtoBtn');
  if(mailBtn){
    mailBtn.addEventListener('click', ()=> {
      const name = encodeURIComponent(document.getElementById('name')?.value || '');
      const email = encodeURIComponent(document.getElementById('email')?.value || '');
      const proj = encodeURIComponent(document.getElementById('projectType')?.value || document.querySelector('input[name="Project"]')?.value || '');
      const details = encodeURIComponent(document.getElementById('details')?.value || '');
      const subject = encodeURIComponent(`Design request: ${proj} — ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject: ${proj}\n\nDetails:\n${details}`);
      window.location.href = `mailto:jerrycreationmedia@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // ESC closes lightbox & mobile menu
  document.addEventListener('keydown', (e)=> {
    if(e.key === 'Escape'){
      document.getElementById('lightbox')?.classList.remove('active');
      mobileMenu?.classList.remove('active');
    }
  });
});
