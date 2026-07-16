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
const container = document.querySelector("#projectsContainer");

if (container) {
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
      <a href="${project.link}" class="project-link">
        Live Demo <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  `).join("");

  container.innerHTML = projectsHTML;
}

// ===== HIDE LOADER FUNCTION =====
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
    // Force hide after 1.5s maximum
    setTimeout(() => {
      loader.style.display = 'none';
    }, 1500);
  }
}

// ===== SHOW LOADER FUNCTION =====
function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.remove('hidden');
    loader.style.display = 'flex';
  }
}

// ===== AOS INITIALIZATION =====
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: "ease-out"
});

AOS.refresh();

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const words = ['Frontend Developer', 'UI/UX Enthusiast', 'Web Creator', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

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
      setTimeout(typeEffect, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
      return;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const startTime = Date.now();

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// ===== NAVBAR SCROLL EFFECT =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.style.display = 'none';
    });
  });
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== LOADER - HIDE WHEN EVERYTHING IS READY =====
// Multiple ways to ensure loader hides

// Method 1: Hide on window load
window.addEventListener('load', () => {
  hideLoader();
});

// Method 2: Hide after DOM is ready (fallback)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 500);
});

// Method 3: Force hide after 3 seconds (safety net)
setTimeout(hideLoader, 3000);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      // Show success message
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #00E5A8, #00C2FF)';
      
      // Reset form
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 2000);
  });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== PARTICLES.JS =====
// ===== PARTICLES.JS - ألوان متطابقة مع التصميم =====
(async () => {
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
          color: "#0A0A0A"  // نفس لون الخلفية
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
            value: ["#2563EB", "#60A5FA", "#7C3AED", "#FFFFFF"]  // ألوان متناسقة
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
})();
// ===== PARALLAX EFFECT FOR HERO =====
const hero = document.querySelector('.hero');
if (hero) {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    
    const heroImage = hero.querySelector('.hero-image img');
    if (heroImage) {
      heroImage.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    }
  });
}

// ===== OBSERVER FOR SKILL BARS =====
const skillBars = document.querySelectorAll('.skill-progress');
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

// ===== PREVENT DEFAULT ON EMPTY LINKS =====
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => e.preventDefault());
});

console.log('%c🚀 Ziad Sayed Portfolio', 'font-size: 20px; font-weight: bold; color: #00C2FF;');
console.log('%c💻 Built with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #9CA9B8;');

// ===== FORCE HIDE LOADER ON ANY ERROR =====
window.addEventListener('error', () => {
  hideLoader();
});
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            alert("Message sent successfully!");
            contactForm.reset();
        } else {
            alert("Failed to send message.");
        }

    } catch (error) {
        alert("Something went wrong.");
    }
}); 