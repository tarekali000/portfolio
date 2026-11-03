const $ = (selector) => document.querySelector(selector);

const boot = $('#bootScreen');
const shell = $('#siteShell');
const bar = $('#progressBar');
const pct = $('#bootPercent');
const status = $('#bootStatus');
const line = $('#bootLine');

const bootLines = [
  'Loading profile components...',
  'Connecting GitHub public API...',
  'Preparing project workspace...',
  'Rendering interface...'
];

let progress = 0;
let lineIndex = 0;

const bootTimer = setInterval(() => {
  progress = Math.min(100, progress + Math.ceil(Math.random() * 9));

  if (bar) bar.style.width = progress + '%';
  if (pct) pct.textContent = String(progress).padStart(2, '0') + '%';

  if (progress > 24 && lineIndex === 0) {
    lineIndex = 1;
    if (line) line.textContent = bootLines[1];
  }

  if (progress > 52 && lineIndex === 1) {
    lineIndex = 2;
    if (line) line.textContent = bootLines[2];
  }

  if (progress > 78 && lineIndex === 2) {
    lineIndex = 3;
    if (line) line.textContent = bootLines[3];
  }

  if (progress >= 100) {
    clearInterval(bootTimer);

    if (status) status.textContent = 'READY';

    setTimeout(() => {
      if (boot) boot.classList.add('done');
      if (shell) shell.classList.add('ready');
      startTyping();
    }, 350);
  }
}, 115);

// Typing animation
const roles = [
  'Backend Software Engineer',
  'Full-Stack Developer',
  'AI / ML Developer',
  'API Architect'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function startTyping() {
  const target = $('#typedRole');

  if (!target) return;

  function tick() {
    const word = roles[roleIndex];

    charIndex += deleting ? -1 : 1;
    target.textContent = word.slice(0, charIndex);

    let delay = deleting ? 35 : 75;

    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1500;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// Current year
const year = $('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Theme toggle
const themeToggle = $('#themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const light = document.documentElement.dataset.theme !== 'light';

    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    themeToggle.textContent = light ? '☀' : '◐';
  });
}

// Mobile menu
const menuToggle = $('#menuToggle');
const nav = $('#nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
  });
});

// Language toggle
let lang = 'en';

const langToggle = $('#langToggle');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    lang = lang === 'en' ? 'ar' : 'en';

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    langToggle.textContent = lang === 'en' ? 'AR' : 'EN';

    document.querySelectorAll('[data-en]').forEach((element) => {
      const translation = element.dataset[lang];

      if (translation !== undefined) {
        element.innerHTML = translation;
      }
    });
  });
}

// Project filters
document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => {
      item.classList.remove('active');
    });

    button.classList.add('active');

    const filter = button.dataset.filter;

    document.querySelectorAll('.project-card').forEach((card) => {
      const visible =
        filter === 'all' || card.dataset.kind === filter;

      card.style.display = visible ? 'flex' : 'none';
    });
  });
});

// GitHub API integration
async function loadGithub() {
  const note = $('#apiNote');
  const avatar = $('#githubAvatar');
  const repoCount = $('#repoCount');
  const followerCount = $('#followerCount');

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/tarekali000'),
      fetch(
        'https://api.github.com/users/tarekali000/repos?per_page=100&sort=updated'
      )
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('GitHub API unavailable');
    }

    const user = await userResponse.json();
    const repos = await reposResponse.json();

    if (avatar && user.avatar_url) {
      avatar.src = user.avatar_url;
    }

    if (repoCount) {
      repoCount.textContent = user.public_repos ?? '—';
    }

    if (followerCount) {
      followerCount.textContent = user.followers ?? '—';
    }

    if (note) {
      note.innerHTML =
        '<span class="status-dot"></span> Live GitHub data loaded · ' +
        repos.length +
        ' public repositories retrieved.';
    }
  } catch (error) {
    console.error('GitHub API error:', error);

    if (note) {
      note.innerHTML =
        '<span class="status-dot"></span> GitHub live data is temporarily unavailable. Profile links and verified projects remain accessible.';
    }
  }
}

loadGithub();

// Scroll reveal animations
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll('.skill-card, .project-card, .stat')
    .forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(16px)';
      element.style.transition =
        'opacity .65s ease, transform .65s ease, border-color .25s';

      revealObserver.observe(element);
    });

  const style = document.createElement('style');

  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(style);
} else {
  document
    .querySelectorAll('.skill-card, .project-card, .stat')
    .forEach((element) => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
}