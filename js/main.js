"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // 数値カウントアップ
  const counters = document.querySelectorAll(".stats__number");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  };

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => statsObserver.observe(el));

  // スムーズスクロール（ナビリンク）
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector(".header").offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // モバイルメニュー
  const menuBtn = document.querySelector(".header__menu");
  const navList = document.querySelector(".nav__list");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      navList.style.display =
        navList.style.display === "flex" ? "none" : "flex";
    });
  }
});
