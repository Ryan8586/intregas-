/* Interações: menu, submenu, mobile menu, modal, toasts, validação */
document.addEventListener('DOMContentLoaded', () => {
  // Submenu toggle
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // next element is submenu, CSS shows/hides via attribute selector
    });
  });

  // Burger / mobile menu
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger && burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    if (mobileMenu.hasAttribute('hidden')) mobileMenu.removeAttribute('hidden');
    else mobileMenu.setAttribute('hidden','');
  });

  // Modal
  const modal = document.getElementById('demoModal');
  const openModal = document.getElementById('openModal');
  const closeModal = modal && modal.querySelector('.modal-close');
  openModal && openModal.addEventListener('click', () => {
    modal.setAttribute('aria-hidden','false');
  });
  closeModal && closeModal.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));

  // Toast
  const toastContainer = document.getElementById('toastContainer');
  document.getElementById('showToast').addEventListener('click', () => {
    showToast('Ação realizada com sucesso!');
  });
  function showToast(message, timeout=3500){
    const t = document.createElement('div');
    t.className='toast';
    t.textContent = message;
    toastContainer.appendChild(t);
    setTimeout(()=> t.remove(), timeout);
  }

  // Form validation visual enhancement
  const form = document.getElementById('contactForm');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll('input, textarea');
    let valid = true;
    fields.forEach(f => {
      if (!f.checkValidity()) { f.classList.remove('valid'); f.classList.add('invalid'); valid = false; }
      else { f.classList.remove('invalid'); f.classList.add('valid'); }
    });
    if (valid) {
      showToast('Formulário enviado!');
      form.reset();
      fields.forEach(f => f.classList.remove('valid'));
    } else {
      showToast('Corrija os campos em vermelho.', 4500);
    }
  });
});