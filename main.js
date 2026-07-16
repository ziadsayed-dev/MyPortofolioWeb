// ===== CONFIGURATION =====
const CONFIG = {
  FORM_ENDPOINT: 'https://formspree.io/f/xojgjzwe', // Replace with your Formspree ID
  TYPING_SPEED: 100,
  DELETING_SPEED: 50,
  COUNTER_DURATION: 2000,
  PARTICLES_ENABLED: window.innerWidth > 768,
  NOTIFICATION_DURATION: 3000
};

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 10px;
    background: ${type === 'success' ? '#00E5A8' : type === 'error' ? '#FF6B6B' : '#2563EB'};
    color: white;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transform: translateX(120%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Poppins', sans-serif;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 300);
  }, CONFIG.NOTIFICATION_DURATION);
}

// ===== VALIDATION FUNCTIONS =====
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form) {
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const message = form.querySelector('#message');
  
  if (!name?.value?.trim()) {
    showNotification('Please enter your name', 'error');
    name?.focus();
    return false;
  }
  
  if (!email?.value?.trim()) {
    showNotification('Please enter your email', 'error');
    email?.focus();
    return false;
  }
  
  if (!isValidEmail(email.value)) {
    showNotification('Please enter a valid email address', 'error');
    email?.focus();
    return false;
  }
  
  if (!message?.value?.trim()) {
    showNotification('Please enter your message', 'error');
    message?.focus();
    return false;
  }
  
  return true;
}

// ===== PROJECTS DATA =====
const projects = [
  {
    title: "CubMart",
    description: "A modern e-commerce experience featuring product filtering, shopping cart management, and responsive layouts.",
    link: "#",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "fa-shopping-cart"
  },
  {
    title: "TaskFlow",
    description: "A productivity-focused task manager with persistent storage, task completion tracking, and a clean user experience.",
    link: "#",
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    icon: "fa-tasks"
  },
  {
    title: "Calculator",
    description: "A responsive calculator built using HTML, CSS, and JavaScript with a modern UI.",
    link: "#",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "fa-calculator"
  }
];

// ===== RENDER PROJECTS =====
function renderProjects() {
  const container = document.querySelector("#projectsContainer");
  
  if (!container) return;
  
  const projectsHTML = projects.map((project, index) => `
    <div
      class="project-card"
      data-aos="fade-up"
      data-aos-delay="${index * 150}"
    >
      <i class="fas ${project.icon} project-icon"></i>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>
      <a href="${project.link}" class="project-link" aria-label="View ${project.title} live demo">
        Live Demo <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  `).join("");
  
  container.innerHTML = projectsHTML;
}

// ===== LOADER FUNCTIONS =====
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 1500);
  }
}

function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.remove('hidden');
    loader.style.display = 'flex';
  }
}

function updateLoader(progress) {
  const loader = document.getElementById('loader');
  const progressBar = loader?.querySelector('.loader-progress');
  if (progressBar) {
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;
  
  const words = ['Frontend Developer', 'UI/UX Enthusiast', 'Web Creator', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeoutId = null;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      timeoutId = setTimeout(typeEffect, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      timeoutId = setTimeout(typeEffect, 500);
      return;
    }

    const speed = isDeleting ? CONFIG.DELETING_SPEED : CONFIG.TYPING_SPEED;
    timeoutId = setTimeout(typeEffect, speed);
  }

  typeEffect();
  
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = CONFIG.COUNTER_DURATION;
    const startTime = Date.now();
    
    let animationFrameId = null;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      
      element.textContent = current;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
  const header = document.querySelector('.header');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
          header?.classList.add('scrolled');
        } else {
          header?.classList.remove('scrolled');
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!menuToggle || !navLinks) return;

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    navLinks.style.display = isOpen ? 'flex' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      navLinks.style.display = 'none';
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      navLinks.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      navLinks.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(contactForm)) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(CONFIG.FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #00E5A8, #00C2FF)';
        contactForm.reset();
        showNotification('Your message was sent successfully!', 'success');
      } else {
        submitBtn.innerHTML = "Failed To Send!";
        showNotification('Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      submitBtn.innerHTML = "Error!";
      showNotification('Connection error. Please try again.', 'error');
      console.error('Form submission error:', error);
    }

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    }, 3000);
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== PARTICLES.JS =====
async function initParticles() {
  if (!CONFIG.PARTICLES_ENABLED) return;
  
  try {
    if (typeof tsParticles === 'undefined' || typeof loadSlim === 'undefined') {
      console.warn('Particles library not loaded, skipping...');
      return;
    }

    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        background: {
          color: "#0A0A0A"
        },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ["#2563EB", "#60A5FA", "#7C3AED", "#FFFFFF"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: {
              min: 0.2,
              max: 0.6
            },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1
            }
          },
          size: {
            value: {
              min: 1,
              max: 3
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.5
            }
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "bottom",
            straight: true,
            outModes: {
              default: "out"
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            onClick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            repulse: {
              distance: 120,
              duration: 0.4
            },
            push: {
              quantity: 3
            }
          }
        },
        detectRetina: true
      }
    });
  } catch (error) {
    console.error('Particles initialization error:', error);
  }
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let animationFrameId = null;

  const handleMouseMove = (e) => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    animationFrameId = requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      const heroImage = hero.querySelector('.hero-image img');
      if (heroImage) {
        heroImage.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
      }
    });
  };

  document.addEventListener('mousemove', handleMouseMove);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  if (!skillBars.length) return;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===== AOS INITIALIZATION =====
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out"
    });
    AOS.refresh();
  }
}

// ===== PREVENT EMPTY LINKS =====
function initEmptyLinks() {
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
  });
}

// ===== ANALYTICS TRACKING =====
function trackEvent(eventName, properties = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
}

// ===== TRACK PROJECT CLICKS =====
function initProjectTracking() {
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', () => {
      const projectCard = link.closest('.project-card');
      const projectTitle = projectCard?.querySelector('h3')?.textContent || 'Unknown';
      trackEvent('project_click', { project: projectTitle });
    });
  });
}

// ===== SERVICE WORKER (PWA) =====
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered successfully');
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    });
  }
}

// ===== MAIN INITIALIZATION =====
function init() {
  showLoader();
  updateLoader(20);

  renderProjects();
  updateLoader(40);
  
  initAOS();
  updateLoader(50);
  
  initTypingEffect();
  updateLoader(60);
  
  initCounters();
  initNavbarScroll();
  initMobileMenu();
  initBackToTop();
  initContactForm();
  initSmoothScroll();
  initEmptyLinks();
  initSkillBars();
  initProjectTracking();
  
  updateLoader(80);
  
  initParticles();
  initParallax();
  
  registerServiceWorker();
  
  updateLoader(100);
  
  console.log('%c🚀 Ziad Sayed Portfolio', 'font-size: 20px; font-weight: bold; color: #00C2FF;');
  console.log('%c💻 Built with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #9CA9B8;');
}

// ===== LOADER HANDLING =====
window.addEventListener('load', () => {
  setTimeout(hideLoader, 500);
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 1000);
});

setTimeout(hideLoader, 3000);

window.addEventListener('error', () => {
  hideLoader();
});

// ===== START APPLICATION =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ===== EXPOSE FOR DEBUGGING =====
if (process.env.NODE_ENV === 'development') {
  window.__APP = {
    CONFIG,
    projects,
    showNotification,
    hideLoader,
    showLoader
  };
}