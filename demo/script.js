const loader = document.getElementById("pageLoader");
if (loader) {
  const hide = () => {
    loader.classList.add("is-hidden");
    setTimeout(() => loader.remove(), 400);
  };
  const minDisplay = 700;
  const start = performance.now();
  const finish = () => {
    const elapsed = performance.now() - start;
    setTimeout(hide, Math.max(0, minDisplay - elapsed));
  };
  if (document.readyState === "complete") finish();
  else window.addEventListener("load", finish);
}

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollToCurrentHash = () => {
  if (!window.location.hash) return;
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;
  requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
};

window.addEventListener("load", () => setTimeout(scrollToCurrentHash, 80));
window.addEventListener("hashchange", () => setTimeout(scrollToCurrentHash, 0));

const reveals = document.querySelectorAll("[data-reveal]");
if (reveals.length && !reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  reveals.forEach((el, index) => {
    el.style.setProperty("--reveal-delay", `${(index % 5) * 60}ms`);
    observer.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

const counters = document.querySelectorAll("[data-count]");
if (counters.length && "IntersectionObserver" in window) {
  const animate = (el) => {
    const end = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = reduceMotion ? 0 : 1300;
    if (!duration) {
      el.textContent = end.toLocaleString() + suffix;
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * end).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = end.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  };
  const counterObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        counterObserver.unobserve(entry.target);
      }
    }),
    { threshold: 0.4 }
  );
  counters.forEach((counter) => counterObserver.observe(counter));
}

const navLinks = Array.from(document.querySelectorAll(".main-nav a[href^='#']"));
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);
if (sections.length && "IntersectionObserver" in window) {
  const setActive = (id) => {
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
  };
  const sectionObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }),
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

const progressBar = document.querySelector(".scroll-progress i");
const timeline = document.querySelector(".timeline");
let timelineWasComplete = false;
if (timeline && !timeline.dataset.enhanced) {
  timeline.dataset.enhanced = "true";
  const shimmer = document.createElement("span");
  shimmer.className = "timeline-shimmer";
  timeline.appendChild(shimmer);
}
const updateScroll = () => {
  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    progressBar.style.transform = `scaleX(${pct})`;
  }
  if (timeline) {
    const rect = timeline.getBoundingClientRect();
    const startY = window.innerHeight * 0.78;
    const endY = window.innerHeight * 0.35;
    const progress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
    timeline.style.setProperty("--timeline-progress", progress.toFixed(3));

    const items = Array.from(timeline.querySelectorAll("li"));
    const lineItems = items.filter((el) => !el.classList.contains("timeline-finale"));
    const lineCount = lineItems.length || 1;
    lineItems.forEach((item, index) => {
      const itemCenterPct = ((index + 0.5) / lineCount) * 100;
      const threshold = (itemCenterPct - 8) / 84;
      item.classList.toggle("is-active", progress >= threshold);
    });
    const finale = items.find((el) => el.classList.contains("timeline-finale"));
    if (finale) finale.classList.toggle("is-active", progress >= 0.92);

    const isComplete = progress >= 0.85;
    if (isComplete && !timelineWasComplete) {
      timeline.classList.add("is-complete");
      timelineWasComplete = true;
    } else if (!isComplete && timelineWasComplete) {
      timeline.classList.remove("is-complete");
      timelineWasComplete = false;
    }
  }
};
updateScroll();
window.addEventListener("scroll", updateScroll, { passive: true });
window.addEventListener("resize", updateScroll);

document.getElementById("cursorDot")?.remove();
document.getElementById("cursorRing")?.remove();

const yearEl = document.getElementById("footerYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const backToTop = document.getElementById("backToTop");
if (backToTop) {
  const toggle = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

const greetingTrack = document.querySelector("[data-greeting]");
if (greetingTrack) {
  const items = Array.from(greetingTrack.children);
  if (items.length) {
    let idx = 0;
    items[0].classList.add("is-active");
    if (!reduceMotion) {
      setInterval(() => {
        items[idx].classList.remove("is-active");
        idx = (idx + 1) % items.length;
        items[idx].classList.add("is-active");
      }, 3200);
    }
  }
}

const dotNav = document.getElementById("dotNav");
if (dotNav) {
  const dotLinks = Array.from(dotNav.querySelectorAll("a"));
  const dotSections = dotLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const toggleDotNav = () => {
    dotNav.classList.toggle("is-visible", window.scrollY > 320);
  };
  toggleDotNav();
  window.addEventListener("scroll", toggleDotNav, { passive: true });
  if (dotSections.length && "IntersectionObserver" in window) {
    const setDotActive = (id) => {
      dotLinks.forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`)
      );
    };
    const dotObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setDotActive(entry.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    dotSections.forEach((s) => dotObserver.observe(s));
  }
  dotLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });
}

const signature = document.querySelector(".footer-signature");
if (signature && "IntersectionObserver" in window) {
  const sigObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          signature.classList.add("is-drawn");
          sigObserver.unobserve(signature);
        }
      });
    },
    { threshold: 0.4 }
  );
  sigObserver.observe(signature);
}

const heroSection = document.querySelector(".hero");
const heroSpotlight = heroSection?.querySelector(".hero-spotlight");
if (heroSection && heroSpotlight && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  heroSection.addEventListener("mousemove", (event) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroSpotlight.style.setProperty("--spot-x", `${x * 60}px`);
    heroSpotlight.style.setProperty("--spot-y", `${y * 40}px`);
  });
  heroSection.addEventListener("mouseleave", () => {
    heroSpotlight.style.setProperty("--spot-x", "0px");
    heroSpotlight.style.setProperty("--spot-y", "0px");
  });
}

const marquee = document.querySelector(".clients-track");
if (marquee && !marquee.dataset.cloned) {
  marquee.innerHTML += marquee.innerHTML;
  marquee.dataset.cloned = "true";
  marquee.style.animation = "none";
  marquee.offsetHeight;
  marquee.style.animation = "";
}

const form = document.getElementById("contactForm");
if (form) {
  const status = form.querySelector(".contact-status");
  const submit = form.querySelector(".contact-submit");
  const recipient = "m@mahmoud.jp";

  const setError = (name, message) => {
    const control = form.querySelector(`[name="${name}"]`);
    const field = control?.closest(".field");
    const errorEl = form.querySelector(`[data-error="${name}"]`);
    if (!field) return;
    field.classList.toggle("has-error", Boolean(message));
    control?.setAttribute("aria-invalid", String(Boolean(message)));
    if (errorEl) errorEl.textContent = message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.className = "contact-status";
    status.textContent = "";
    const data = Object.fromEntries(new FormData(form).entries());
    let ok = true;

    if (!String(data.name || "").trim()) {
      setError("name", "Please enter your name.");
      ok = false;
    } else setError("name", "");

    if (!String(data.email || "").trim()) {
      setError("email", "Please enter your email.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      setError("email", "Please enter a valid email.");
      ok = false;
    } else setError("email", "");

    if (!String(data.message || "").trim() || String(data.message).trim().length < 10) {
      setError("message", "Please describe the request in 10+ characters.");
      ok = false;
    } else setError("message", "");

    if (!ok) {
      status.classList.add("is-error");
      status.textContent = "Please fix the fields above.";
      return;
    }

    submit.disabled = true;
    submit.textContent = "Opening email...";
    const subject = `Portfolio inquiry from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Service: ${data.service}`,
      "",
      "Message:",
      data.message,
    ].join("\n");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      submit.disabled = false;
      submit.textContent = "Open email";
      status.classList.add("is-success");
      status.textContent = "Your email app should be open now.";
    }, 900);
  });
}
