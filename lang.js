document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-key]");
  const originalText = {};

  // Store original English text in memory
  elements.forEach(el => {
    const key = el.getAttribute("data-key");
    originalText[key] = el.textContent.trim();
  });

  // -----------------------------
  // Handle default language
  // -----------------------------
  let savedLang = localStorage.getItem("lang");

  // If no language saved, set English by default
  if (!savedLang) {
    savedLang = "en";
    localStorage.setItem("lang", "en");
  }

  // Apply saved language
  if (savedLang !== "en") {
    loadLanguage(savedLang);
  }

  // -----------------------------
  // Dropdown listener (if exists)
  // -----------------------------
  const switcher = document.getElementById("languageSwitcher");
  if (switcher) {
    switcher.value = savedLang;
    switcher.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("lang", lang);
      if (lang === "en") restoreEnglish();
      else loadLanguage(lang);
    });
  }

  // -----------------------------
  // Functions
  // -----------------------------
  function loadLanguage(lang) {
    fetch(`lang/${lang}.json`)
      .then(res => res.json())
      .then(data => {
        elements.forEach(el => {
          const key = el.getAttribute("data-key");
          if (data[key]) el.textContent = data[key];
        });
      })
      .catch(err => console.error("Error loading language file:", err));
  }

  function restoreEnglish() {
    elements.forEach(el => {
      const key = el.getAttribute("data-key");
      el.textContent = originalText[key];
    });
  }
});
