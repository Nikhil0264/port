const profile = window.PORTFOLIO_PROFILE;
const projects = window.PORTFOLIO_PROJECTS || [];
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dialog = document.querySelector('#project-detail');
const dialogContent = document.querySelector('.dialog-content');

// Populate editable content from project-data.js and personal-data.js.
const projectList = document.querySelector('#project-list');
const skillGrid = document.querySelector('#skills-grid');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function projectCard(project, index) {
  const links = [project.github && `<a href="${escapeHtml(project.github)}" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>`, project.demo && `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Live demo <span>↗</span></a>`].filter(Boolean).join('');
  return `<article class="project-row reveal" tabindex="0" data-project="${escapeHtml(project.slug)}"><div class="project-visual project-architecture"><div class="project-arch-head"><span>PROJECT ARCHITECTURE</span><span>${String(index + 1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</span></div><div class="arch-nodes">${project.architecture.slice(0,7).map((step, i) => `<div class="arch-node"><span>${String(i + 1).padStart(2,'0')}</span><b>${escapeHtml(step)}</b></div>`).join('<i class="arch-arrow">↓</i>')}</div><span class="visual-caption">${escapeHtml(project.category.toUpperCase())}</span></div><div class="project-content"><div class="project-meta"><span>${String(index + 1).padStart(2,'0')} — ${escapeHtml(project.category.toUpperCase())}</span><span class="project-open">↗</span></div><h3>${escapeHtml(project.title)}</h3><p class="project-category">${escapeHtml(project.category)}</p><p class="project-description">${escapeHtml(project.description)}</p><div class="project-highlights">${project.decisions.slice(0,3).map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div><div class="tags">${project.technologies.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><div class="project-links"><a href="#project-detail" class="detail-link" data-open-project="${escapeHtml(project.slug)}">View case study <span>↗</span></a>${links}</div></div></article>`;
}
projectList.innerHTML = projects.map(projectCard).join('');

// Skills are centrally editable and use evidence labels rather than ratings.
const skillGroups = window.PORTFOLIO_SKILLS || [];
const skillStatusLabels = {
  'used-in-projects': 'Used in projects',
  'familiar-with': 'Familiar with',
  'currently-learning': 'Currently learning'
};
if (skillGrid) {
  skillGrid.innerHTML = skillGroups.map((group, index) => `<div class="skill-group reveal"><span class="skill-index" aria-hidden="true">${escapeHtml(group.icon || String(index + 1).padStart(2, '0'))}</span><div><h3>${escapeHtml(group.category)}</h3><div class="skill-list">${group.skills.map(skill => `<span title="${escapeHtml(skillStatusLabels[skill.status] || '')}">${escapeHtml(skill.name)}<small>${escapeHtml(skillStatusLabels[skill.status] || '')}</small></span>`).join('')}</div></div></div>`).join('');
}

if (profile) {
  // Keep resume controls unavailable until the actual PDF exists at its configured URL.
  const resumeActions = document.querySelectorAll('.resume-action');
  if (profile.resume) {
    fetch(profile.resume, { method: 'HEAD' }).then(response => {
      if (!response.ok) return;
      resumeActions.forEach(button => {
        button.disabled = false;
        button.removeAttribute('title');
        button.setAttribute('aria-label', 'Download Nikhil Padul resume PDF');
        button.addEventListener('click', () => {
          const link = document.createElement('a');
          link.href = profile.resume;
          link.download = 'Nikhil-Padul-Resume.pdf';
          document.body.append(link);
          link.click();
          link.remove();
        });
      });
    }).catch(() => {});
  }
  document.querySelectorAll('.contact-actions a[href^="mailto:"]').forEach(link => link.href = `mailto:${profile.email}`);
  document.querySelectorAll('.footer-links a[href^="mailto:"]').forEach(link => link.href = `mailto:${profile.email}`);
  document.querySelectorAll('.footer-links a').forEach(link => { if (link.textContent.includes('LinkedIn') && profile.linkedin) { link.href = profile.linkedin; link.target = '_blank'; link.rel = 'noreferrer'; } });
  const education = document.querySelector('#education-list');
  if (education) education.innerHTML = profile.education.map((item, index) => `<article class="education-card reveal"><span class="skill-index">0${index + 1}</span><div><h3>${escapeHtml(item.degree)}</h3><p>${escapeHtml(item.institution)}</p><small>${escapeHtml(item.detail)}</small></div></article>`).join('');
  const facts = document.querySelector('.profile-facts');
  if (facts && profile.education[0]) {
    const degree = profile.education[0];
    facts.innerHTML = `<div><span>DEGREE</span><b>${escapeHtml(degree.degree)}</b></div><div><span>COLLEGE</span><b>${escapeHtml(degree.institution)}</b></div><div><span>EXPECTED</span><b>${escapeHtml(profile.expectedGraduation)}</b></div><div><span>CGPA</span><b>${escapeHtml(profile.cgpa)}</b></div>`;
  }
  const topics = document.querySelector('#exploring-topics');
  if (topics) topics.innerHTML = profile.exploring.map(topic => `<span><i></i> ${escapeHtml(topic)}</span>`).join('');
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold: .12});
function observeReveals(root = document) { root.querySelectorAll('.reveal:not(.visible)').forEach(item => observer.observe(item)); }
observeReveals();

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), {passive:true});
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navLinks.classList.toggle('open', open);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open navigation');
}));

const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  }
}), {rootMargin:'-35% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

function openProject(slug) {
  const project = projects.find(item => item.slug === slug);
  if (!project) return;
  const flow = project.architecture.map(step => `<span>${escapeHtml(step)}</span>`).join('');
  const choices = project.decisions.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  const links = [project.github && `<a href="${escapeHtml(project.github)}" target="_blank" rel="noreferrer">GitHub repository <span>↗</span></a>`, project.demo && `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Live demo <span>↗</span></a>`].filter(Boolean).join('');
  dialogContent.innerHTML = `<p class="overline">${escapeHtml(project.featuredStatus)} PROJECT / ${escapeHtml(project.category.toUpperCase())}</p><h2>${escapeHtml(project.title)}</h2><p class="dialog-subtitle">${escapeHtml(project.description)}</p><h3>Problem</h3><p>${escapeHtml(project.problem)}</p><h3>Architecture</h3><div class="dialog-flow">${flow}</div><h3>Implementation &amp; engineering decisions</h3><ul>${choices}</ul><p>${escapeHtml(project.solution)}</p><h3>Challenges</h3><p>${escapeHtml(project.challenges)}</p><h3>Outcome</h3><p>${escapeHtml(project.outcome)}</p><div class="tags">${project.technologies.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>${links ? `<div class="project-links">${links}</div>` : ''}`;
  dialog.showModal();
}
projectList.addEventListener('click', event => {
  const detailLink = event.target.closest('[data-open-project]');
  if (detailLink) {
    event.preventDefault();
    openProject(detailLink.dataset.openProject);
  }
});
document.querySelectorAll('.project-row').forEach(row => {
  row.addEventListener('click', event => { if (!event.target.closest('a')) openProject(row.dataset.project); });
  row.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target === row) { event.preventDefault(); openProject(row.dataset.project); } });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => document.activeElement?.blur());
observeReveals(projectList);
if (skillGrid) observeReveals(skillGrid);
