(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

  const filterButtons = [...document.querySelectorAll('.filter')];
  const projects = [...document.querySelectorAll('.project-card')];
  const emptyState = document.querySelector('.filter-empty');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let count = 0;
      projects.forEach((project) => {
        const visible = filter === 'all' || project.dataset.category === filter;
        project.hidden = !visible;
        if (visible) count += 1;
      });
      emptyState.hidden = count !== 0;
    });
  });

  const form = document.querySelector('#quote-form');
  const steps = [...form.querySelectorAll('.form-step')];
  const progress = [...document.querySelectorAll('.estimator-progress span')];
  const success = form.querySelector('[data-success]');
  const summary = form.querySelector('[data-summary]');
  let currentStep = 1;

  const selectedServices = () => [...form.querySelectorAll('input[name="service"]:checked')].map((input) => input.value);

  const showStep = (stepNumber) => {
    currentStep = stepNumber;
    steps.forEach((step) => {
      const active = Number(step.dataset.step) === stepNumber;
      step.hidden = !active;
      step.classList.toggle('is-active', active);
      const error = step.querySelector('.form-error');
      if (error) error.hidden = true;
    });
    progress.forEach((item, index) => {
      item.classList.toggle('is-current', index + 1 === stepNumber);
      item.classList.toggle('is-done', index + 1 < stepNumber);
    });
    steps[stepNumber - 1].querySelector('legend').scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const validateStep = (stepNumber) => {
    const step = steps[stepNumber - 1];
    const error = step.querySelector('.form-error');
    let valid = true;
    if (stepNumber === 1) valid = selectedServices().length > 0;
    if (stepNumber === 2) valid = Boolean(form.elements.space.value && form.elements.timing.value);
    if (stepNumber === 3) valid = Boolean(form.elements.name.value.trim() && form.elements.phone.value.trim());
    error.hidden = valid;
    return valid;
  };

  form.querySelectorAll('.next-step').forEach((button) => {
    button.addEventListener('click', () => {
      if (!validateStep(currentStep)) return;
      if (currentStep === 2) {
        summary.innerHTML = `<strong>${selectedServices().join(' · ')}</strong><span>${form.elements.space.value} · ${form.elements.timing.value}</span>`;
      }
      showStep(Math.min(3, currentStep + 1));
    });
  });

  form.querySelectorAll('.back-step').forEach((button) => button.addEventListener('click', () => showStep(Math.max(1, currentStep - 1))));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateStep(3)) return;
    steps.forEach((step) => { step.hidden = true; });
    document.querySelector('.estimator-progress').hidden = true;
    success.hidden = false;
    success.focus();
  });

  form.querySelector('.reset-form').addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    document.querySelector('.estimator-progress').hidden = false;
    showStep(1);
  });
})();
