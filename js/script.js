// ==================== NAVIGATION BETWEEN MODULES ====================

// Function to switch modules
function goToModule(moduleId) {
  // Hide all modules
  const modules = document.querySelectorAll('.module');
  modules.forEach(module => {
    module.classList.remove('active');
  });

  // Show the selected module
  const targetModule = document.getElementById(moduleId);
  if (targetModule) {
    targetModule.classList.add('active');

    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + moduleId) {
        link.classList.add('active');
      }
    });

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}


// ==================== FORM ====================

// SHOW / HIDE FORM
function toggleForm() {

  const form = document.getElementById("contact-form");

  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

// SAVE TXT FILE
document
  .getElementById("contactForm")
  .addEventListener("submit", function (e) {

    e.preventDefault();

    // GET VALUES
    const name = document.getElementById("name").value;
    const group = document.getElementById("group").value;
    const score = document.getElementById("score").value;
    const message = document.getElementById("message").value;

    // FILE CONTENT
    const contenido = `
=========================
NEW FORM RESPONSE
=========================

Name: ${name}

Group Scrum: ${group}

Score: ${score}

Message:
${message}

=========================
`;

    // CREATE TXT FILE
    const blob = new Blob(
      [contenido],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    // CREATE DOWNLOAD
    const a = document.createElement("a");

    a.href = url;

    // FILE NAME
    a.download = `${name}-response.txt`;

    // AUTO DOWNLOAD
    a.click();

    // FREE MEMORY
    URL.revokeObjectURL(url);

    // RESET FORM
    document
      .getElementById("contactForm")
      .reset();

    alert("Response saved successfully!");

  });


// ==================== MUSIC FILTER ====================

function filterMusic(genre) {
  const cards = document.querySelectorAll('.music-card');
  const buttons = document.querySelectorAll('.genre-btn');

  // Update active buttons
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Filter cards
  cards.forEach(card => {
    const cardGenre = card.getAttribute('data-genre');

    if (genre === 'all' || cardGenre === genre) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}


// ==================== LIKE BUTTON ====================

function toggleLike(button) {
  button.classList.toggle('liked');

  // Small animation
  button.style.transform = 'scale(1.3)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}


// ==================== SECRET MANGA ====================

let secretsVisible = false;

function toggleSecrets() {
  secretsVisible = !secretsVisible;

  const toggle = document.getElementById('secret-toggle');
  const secretManga = document.getElementById('secret-manga');
  const lockedCover = secretManga.querySelector('.manga-cover.locked');
  const lockedContent = secretManga.querySelector('.locked-content');
  const revealedContent = secretManga.querySelector('.revealed-content');

  if (secretsVisible) {
    toggle.classList.add('active');
    toggle.innerHTML = '<span>🙈</span> Hide secrets';

    // Reveal content
    if (lockedCover) {
      lockedCover.innerHTML = '<div class="manga-placeholder">📖</div><span class="manga-status completed">Completed</span><span class="secret-badge">👁️ Secret</span>';
      lockedCover.classList.remove('locked');
    }

    if (lockedContent) lockedContent.style.display = 'none';
    if (revealedContent) revealedContent.style.display = 'block';

  } else {
    toggle.classList.remove('active');
    toggle.innerHTML = '<span>👁️</span> Show secrets';

    // Hide content
    const cover = secretManga.querySelector('.manga-cover');
    if (cover) {
      cover.innerHTML = '<div class="lock-icon">🔒</div><span class="secret-badge">Secret</span>';
      cover.classList.add('locked');
    }

    if (lockedContent) lockedContent.style.display = 'block';
    if (revealedContent) revealedContent.style.display = 'none';
  }
}


// ==================== ENTRY ANIMATIONS ====================

// Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Animate progress bars
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });

  // Observe cards for animations
  const cards = document.querySelectorAll('.section-card, .content-card, .game-card, .goal-card, .music-card, .manga-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  // Immediate trigger for visible elements
  setTimeout(() => {
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }, 100);
});


// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener('keydown', (e) => {
  // Numbers 1-6 to navigate modules
  const modules = ['home', 'movies', 'games', 'goals', 'music', 'manga'];
  const num = parseInt(e.key);

  if (num >= 1 && num <= 6) {
    goToModule(modules[num - 1]);
  }
});