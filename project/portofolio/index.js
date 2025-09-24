  // Dark mode toggle
      const toggle = document.getElementById("toggle");
      const toggleMobile = document.getElementById("toggle-mobile");
      const html = document.documentElement;

      // Check for saved user preference, if any, on load of the website
      if (localStorage.getItem("darkMode") === "true") {
        html.classList.add("dark");
        toggle.checked = true;
        if (toggleMobile) toggleMobile.checked = true;
      } else {
        html.classList.remove("dark");
        toggle.checked = false;
        if (toggleMobile) toggleMobile.checked = false;
      }

      // Toggle dark mode
      function toggleDarkMode() {
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");
        localStorage.setItem("darkMode", isDark);
      }

      toggle.addEventListener("change", toggleDarkMode);
      if (toggleMobile) toggleMobile.addEventListener("change", toggleDarkMode);

      // Mobile menu toggle
      const mobileMenuButton = document.getElementById("mobile-menu-button");
      const mobileMenu = document.getElementById("mobile-menu");

      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      // Close mobile menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll("a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });

            // Update active nav link
            document.querySelectorAll(".nav-link").forEach((link) => {
              link.classList.remove("active-nav");
            });
            this.classList.add("active-nav");
          }
        });
      });

      // Back to top button
      const backToTopButton = document.getElementById("back-to-top");

      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.remove("opacity-0", "invisible");
          backToTopButton.classList.add("opacity-100", "visible");
        } else {
          backToTopButton.classList.remove("opacity-100", "visible");
          backToTopButton.classList.add("opacity-0", "invisible");
        }
      });

      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Intersection Observer for scroll animations
      const animateElements = document.querySelectorAll(".animate-fadeIn");

      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      animateElements.forEach((element) => {
        observer.observe(element);
      });

      // Form submission
      const contactForm = document.querySelector("form");

      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();

          // Get form values
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const subject = document.getElementById("subject").value;
          const message = document.getElementById("message").value;

          // Here you would typically send the data to a server
          console.log("Form submitted:", { name, email, subject, message });

          // Show success message
          alert("Thank you for your message! I will get back to you soon.");

          // Reset form
          contactForm.reset();
        });
      }

      // Tooltip initialization
      const tooltips = document.querySelectorAll(".tooltip");

      tooltips.forEach((tooltip) => {
        tooltip.addEventListener("mouseenter", () => {
          const tooltipText = tooltip.querySelector(".tooltip-text");
          tooltipText.style.visibility = "visible";
          tooltipText.style.opacity = "1";
        });

        tooltip.addEventListener("mouseleave", () => {
          const tooltipText = tooltip.querySelector(".tooltip-text");
          tooltipText.style.visibility = "hidden";
          tooltipText.style.opacity = "0";
        });
      });

      // Project card flip on mobile touch
      const projectCards = document.querySelectorAll(".project-card");

      projectCards.forEach((card) => {
        card.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            // Only for mobile
            const inner = card.querySelector(".project-card-inner");
            const currentTransform = inner.style.transform;

            if (currentTransform === "rotateY(180deg)") {
              inner.style.transform = "rotateY(0deg)";
            } else {
              inner.style.transform = "rotateY(180deg)";
            }
          }
        });
      });

      // posisi scroll
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        document.querySelectorAll("section").forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            document.querySelectorAll(".nav-link").forEach((link) => {
              link.classList.remove("active-nav");
              if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active-nav");
              }
            });
          }
        });
      });

      // animasi page load
      document.addEventListener("DOMContentLoaded", () => {
        // Animasi delay
        setTimeout(() => {
          const heroElements = document.querySelectorAll("#home > div > div");
          heroElements.forEach((el, index) => {
            el.classList.add("animate-fadeIn");
            el.style.animationDelay = `${index * 0.1}s`;
          });
        }, 100);
      });