document.addEventListener('DOMContentLoaded', () => {
  const morphGroups = document.querySelectorAll('.morphong-text');

  morphGroups.forEach(group => {
    const texts = group.querySelectorAll('.anim-common');
    let index = 0;

    setInterval(() => {
      texts[index].classList.remove('active');
      index = (index + 1) % texts.length;
      texts[index].classList.add('active');
    }, 3000);
  });
});


// ================= SELECTORS =================
const sections = document.querySelectorAll("section");
const factCards = document.querySelectorAll(".fact-card");

let currentSection = 0;
let isScrolling = false;

// ================= CONTENT FADE-IN =================
const contentObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

// Observe all content-wrapper elements dynamically
function observeContentWrappers() {
  const allWrappers = document.querySelectorAll("section .content-wrapper");
  allWrappers.forEach(wrapper => contentObserver.observe(wrapper));
}

// Initial observation
observeContentWrappers();

// If new sections are added dynamically in the future, just call:
// observeContentWrappers() again to observe new content

// ================= FACT CARDS STAGGER FADE-IN =================
const cardObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = [...factCards].indexOf(card);

        setTimeout(() => {
          card.classList.add("show-stagger");
        }, (index % 3) * 180);

        cardObserver.unobserve(card);
      }
    });
  },
  { threshold: 0.3 }
);

factCards.forEach(card => cardObserver.observe(card));

// ================= FULL PAGE AUTO SCROLL (SMART & SAFE) =================
let scrollDelta = 0;
const SCROLL_THRESHOLD = 140; // force-scroll strength

function scrollToSection(index) {
  if (isScrolling || index < 0 || index >= sections.length) return;

  isScrolling = true;
  sections[index].scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    isScrolling = false;
  }, 1000);

  currentSection = index;
  scrollDelta = 0;
}

// Detect if section can still scroll internally
function canScrollDown(section) {
  return section.scrollTop + window.innerHeight < section.scrollHeight - 5;
}

function canScrollUp(section) {
  return section.scrollTop > 5;
}

window.addEventListener(
  "wheel",
  e => {
    if (isScrolling) return;

    const section = sections[currentSection];
    scrollDelta += e.deltaY;

    // ================= SCROLL DOWN =================
    if (e.deltaY > 0) {
      // Allow natural scrolling first
      if (canScrollDown(section)) return;

      // Force-scroll only when at bottom
      if (scrollDelta > SCROLL_THRESHOLD) {
        scrollToSection(currentSection + 1);
      }
    }

    // ================= SCROLL UP =================
    if (e.deltaY < 0) {
      if (canScrollUp(section)) return;

      if (scrollDelta < -SCROLL_THRESHOLD) {
        scrollToSection(currentSection - 1);
      }
    }
  },
  { passive: true }
);

// ================= KEYBOARD SUPPORT =================
window.addEventListener("keydown", e => {
  if (isScrolling) return;

  if (e.key === "ArrowDown") {
    scrollToSection(currentSection + 1);
  }
  if (e.key === "ArrowUp") {
    scrollToSection(currentSection - 1);
  }
});

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollTopBtn');
const heroSection = document.querySelector('.hero'); // target hero section

// Show button when user scrolls past hero
window.addEventListener('scroll', () => {
    if (!heroSection) return;
    const heroHeight = heroSection.offsetHeight;
    if (window.scrollY > heroHeight) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Scroll smoothly to top when button clicked
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ========================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".learning-approach .card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      const row = card.dataset.row;

      // Blur all cards
      cards.forEach(c => c.classList.add("blur"));

      // Remove blur from hovered card
      card.classList.remove("blur");

      // Remove blur from same-row card in other column
      cards.forEach(c => {
        if (c !== card && c.dataset.row === row) {
          c.classList.remove("blur");
        }
      });
    });

    card.addEventListener("mouseleave", () => {
      // Remove all blur
      cards.forEach(c => c.classList.remove("blur"));
    });
  });
  const allCards = document.querySelectorAll(".learning-approach .card");

allCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        const row = card.dataset.row;

        allCards.forEach(c => {
            if (c.dataset.row === row) {
                // Zoom the hovered card and its pair
                c.style.transform = "scale(1.1)";
                c.style.zIndex = "2";
            } else {
                // Blur other cards
                c.classList.add("blur");
            }
        });
    });

    card.addEventListener("mouseleave", () => {
        allCards.forEach(c => {
            c.style.transform = "scale(1)";
            c.style.zIndex = "1";
            c.classList.remove("blur");
        });
    });
});
});

// 
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("aboutParticles");
    if (!canvas) return; // safety check if canvas not found

    const ctx = canvas.getContext("2d");

    // Set canvas to full size of section
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.color = `rgba(55, 255, 139, ${Math.random() * 0.6 + 0.2})`;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
    }

    // Create particles
    const particles = [];
    const PARTICLE_COUNT = 80;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    // Connect particles with lines if close
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(55, 255, 139, ${0.15 - dist / 700})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();

        requestAnimationFrame(animate);
    }

    animate();
});



// ===============================
// LOGIN ↔ SIGNUP SWITCH
// ===============================
function switchAuth() {
    const loginForm = document.querySelector(".login-form");
    const signupForm = document.querySelector(".signup-form");
    const card = document.querySelector('.glass-card[data-text]');

    if (!loginForm || !signupForm || !card) return;

    const isLoginActive = loginForm.classList.contains("active");

    if (isLoginActive) {
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
        card.setAttribute("data-text", "Sign Up");
    } else {
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
        card.setAttribute("data-text", "Login");
    }
}

// ===============================
// FEEDBACK FORM HANDLER
// ===============================
const feedbackForm = document.querySelector('.glass-card form');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // prevent page reload

        const textarea = feedbackForm.querySelector('textarea');
        const feedback = textarea.value.trim();
        const msgDiv = feedbackForm.querySelector('.feedback-msg');

        if (!feedback) {
            // Show error message if textarea empty
            if (msgDiv) {
                msgDiv.textContent = "Please write your feedback!";
                msgDiv.classList.add('show');
                setTimeout(() => msgDiv.classList.remove('show'), 2000);
            }
            return;
        }

        try {
            const response = await fetch('/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback })
            });

            if (response.ok) {
                // Show thank you message
                if (msgDiv) {
                    msgDiv.textContent = "Thank you for your feedback!";
                    msgDiv.classList.add('show');
                    setTimeout(() => msgDiv.classList.remove('show'), 2000);
                }

                textarea.value = ''; // clear textarea
            } else {
                if (msgDiv) {
                    msgDiv.textContent = "Oops! Something went wrong.";
                    msgDiv.classList.add('show');
                    setTimeout(() => msgDiv.classList.remove('show'), 2000);
                }
            }
        } catch (err) {
            if (msgDiv) {
                msgDiv.textContent = "Error: " + err.message;
                msgDiv.classList.add('show');
                setTimeout(() => msgDiv.classList.remove('show'), 2000);
            }
        }
    });
}