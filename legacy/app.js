const pages = [
  { id: 'index', label: 'Home', href: 'index.html' },
  { id: 'portfolio', label: 'Portfolio', href: 'portfolio.html' },
  { id: 'services', label: 'Services', href: 'services.html' },
  { id: 'skills', label: 'Skills', href: 'skills.html' },
  { id: 'project', label: 'Project', href: 'project.html' },
  { id: 'contact', label: 'Contact', href: 'contact.html' },
];

const currentPage = document.documentElement.dataset.page;

const railNav = document.getElementById('rail-nav');
if (railNav) {
  railNav.innerHTML = pages
    .map(
      (page) => `
        <a class="rail-link ${page.id === currentPage ? 'is-active' : ''}" href="${page.href}">
          <span>${page.label}</span>
        </a>
      `,
    )
    .join('');
}

const topbar = document.getElementById('topbar');
if (topbar) {
  const active = pages.find((page) => page.id === currentPage);
  topbar.innerHTML = `
    <div>
      <span class="eyebrow">Roman Merk / Interface System</span>
      <strong>${active ? active.label : 'Overview'}</strong>
    </div>
    <div class="topbar__meta">
      <span>Remote-first</span>
      <span>Security + AI</span>
      <span>Static Build</span>
    </div>
  `;
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name') || 'there';
    formStatus.textContent = `Thanks, ${name}. Wire this form to your backend or Formspree endpoint.`;
  });
}
