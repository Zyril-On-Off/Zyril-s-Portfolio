// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navLinks = document.querySelector(".nav-links")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    mobileMenuBtn.classList.toggle("active")
  })
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        mobileMenuBtn.classList.remove("active")
      }
    }
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Here you would typically send the data to a server
    // For GitHub Pages, you might want to use a service like Formspree or EmailJS
    console.log("Form submitted:", data)

    // Show success message (you can customize this)
    alert("Thank you for your message! I'll get back to you soon.")
    contactForm.reset()
  })
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections and cards
document.querySelectorAll(".section, .project-card, .stat-card, .skill-category").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Active Navigation Link on Scroll
const sections = document.querySelectorAll(".section")
const navLinksArray = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinksArray.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Parallax Effect for Hero Background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    heroContent.style.opacity = 1 - scrolled / 600
  }
})

// Add cursor trail effect (optional cyberpunk enhancement)
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div")
  trail.className = "cursor-trail"
  trail.style.left = e.pageX + "px"
  trail.style.top = e.pageY + "px"
  document.body.appendChild(trail)

  setTimeout(() => {
    trail.remove()
  }, 500)
})

// Add CSS for cursor trail
const style = document.createElement("style")
style.textContent = `
    .cursor-trail {
        position: absolute;
        width: 4px;
        height: 4px;
        background-color: var(--color-primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        animation: fadeOut 0.5s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(10px);
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`
document.head.appendChild(style)
