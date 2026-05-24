// ==================== NAVEGACION ENTRE MODULOS ====================

// Funcion para cambiar de modulo
function goToModule(moduleId) {
  // Ocultar todos los modulos
  const modules = document.querySelectorAll('.module');
  modules.forEach(module => {
    module.classList.remove('active');
  });
  
  // Mostrar el modulo seleccionado
  const targetModule = document.getElementById(moduleId);
  if (targetModule) {
    targetModule.classList.add('active');
    
    // Actualizar enlaces de navegacion
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + moduleId) {
        link.classList.add('active');
      }
    });
    
    // Scroll hacia arriba suavemente
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}


// ==================== FORMULARIO ====================

function toggleForm() {
  const form = document.getElementById('contact-form');
  if (form.style.display === 'none' || form.style.display === '') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const groupScrum = document.getElementById('group-scrum').value;
  const score = document.getElementById('score').value;
  const message = document.getElementById('message').value;
  
  // Mostrar mensaje de confirmacion
  alert('Mensaje enviado correctamente!\n\nName: ' + name + '\nGroup-Scrum: ' + groupScrum + '\nScore: ' + score + '\nMessage: ' + message);
  
  // Limpiar formulario
  event.target.reset();
  
  // Cerrar formulario
  document.getElementById('contact-form').style.display = 'none';
}


// ==================== FILTRO DE MÚSICA ====================

function filterMusic(genre) {
  const cards = document.querySelectorAll('.music-card');
  const buttons = document.querySelectorAll('.genre-btn');
  
  // Actualizar botones activos
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Filtrar tarjetas
  cards.forEach(card => {
    const cardGenre = card.getAttribute('data-genre');
    
    if (genre === 'todos' || cardGenre === genre) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}


// ==================== BOTÓN DE LIKE ====================

function toggleLike(button) {
  button.classList.toggle('liked');
  
  // Animación pequeña
  button.style.transform = 'scale(1.3)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}


// ==================== MANGA SECRETOS ====================

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
    toggle.innerHTML = '<span>🙈</span> Ocultar secretos';
    
    // Revelar contenido
    if (lockedCover) {
      lockedCover.innerHTML = '<div class="manga-placeholder">📖</div><span class="manga-status completed">Completado</span><span class="secret-badge">👁️ Secreto</span>';
      lockedCover.classList.remove('locked');
    }
    
    if (lockedContent) lockedContent.style.display = 'none';
    if (revealedContent) revealedContent.style.display = 'block';
    
  } else {
    toggle.classList.remove('active');
    toggle.innerHTML = '<span>👁️</span> Mostrar secretos';
    
    // Ocultar contenido
    const cover = secretManga.querySelector('.manga-cover');
    if (cover) {
      cover.innerHTML = '<div class="lock-icon">🔒</div><span class="secret-badge">Secreto</span>';
      cover.classList.add('locked');
    }
    
    if (lockedContent) lockedContent.style.display = 'block';
    if (revealedContent) revealedContent.style.display = 'none';
  }
}


// ==================== ANIMACIONES DE ENTRADA ====================

// Observador para animaciones al scroll
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

// Aplicar animaciones a elementos cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
  // Animar barras de progreso
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
  
  // Observar tarjetas para animaciones
  const cards = document.querySelectorAll('.section-card, .content-card, .game-card, .goal-card, .music-card, .manga-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
  
  // Trigger inmediato para elementos visibles
  setTimeout(() => {
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }, 100);
});


// ==================== ATAJOS DE TECLADO ====================

document.addEventListener('keydown', (e) => {
  // Números 1-6 para navegar módulos
  const modules = ['inicio', 'peliculas', 'juegos', 'metas', 'musica', 'manga'];
  const num = parseInt(e.key);
  
  if (num >= 1 && num <= 6) {
    goToModule(modules[num - 1]);
  }
});
