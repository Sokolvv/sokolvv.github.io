/**
 * Template Main JS File
 */
;(() => {
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener)
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select("#navbar .scrollto", true)
  const navbarlinksActive = () => {
    const position = window.scrollY + 200
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return
      const section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active")
      } else {
        navbarlink.classList.remove("active")
      }
    })
  }
  window.addEventListener("load", navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    })
  }

  /**
   * Back to top button
   */
  const backtotop = select(".back-to-top")
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active")
      } else {
        backtotop.classList.remove("active")
      }
    }
    window.addEventListener("load", toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active")
    this.classList.toggle("bi-list")
    this.classList.toggle("bi-x")
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        const body = select("body")
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active")
          const navbarToggle = select(".mobile-nav-toggle")
          navbarToggle.classList.toggle("bi-list")
          navbarToggle.classList.toggle("bi-x")
        }
        scrollto(this.hash)
      }
    },
    true,
  )

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  })

  /**
   * Preloader
   */
  const preloader = select("#preloader")
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove()
    })
  }

  /**
   * Hero type effect
   */
  const typed = select(".typed")
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items")
    typed_strings = typed_strings.split(",")
    const Typed = window.Typed // Declare Typed variable
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
  }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    const AOS = window.AOS // Declare AOS variable
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  })

  /**
   * Language switcher
   */
  // Set English as the default language on page load
  window.addEventListener("load", () => {
    // Hide Ukrainian content, show English content
    document.querySelectorAll('[lang="ua"]').forEach((el) => {
      el.style.display = "none"
    })
    document.querySelectorAll('[lang="en"]').forEach((el) => {
      el.style.display = "block"
    })

    // Update any language-specific classes or states if needed
    document.documentElement.setAttribute("lang", "en")
  })

  // Handle language toggle button click
  on("click", "#languagebutton", (e) => {
    e.preventDefault()

    const currentLang = document.documentElement.getAttribute("lang") || "en"
    const newLang = currentLang === "en" ? "ua" : "en"

    // Toggle visibility based on language attribute
    document.querySelectorAll('[lang="ua"]').forEach((el) => {
      el.style.display = newLang === "ua" ? "block" : "none"
    })
    document.querySelectorAll('[lang="en"]').forEach((el) => {
      el.style.display = newLang === "en" ? "block" : "none"
    })

    // Update the document language
    document.documentElement.setAttribute("lang", newLang)
  })
})()

//This function was missing
const switchLang = () => {
  const currentLang = document.documentElement.getAttribute("lang") || "en"
  const newLang = currentLang === "en" ? "ua" : "en"
  $(`[lang="${currentLang}"]`).hide()
  $(`[lang="${newLang}"]`).show()
  document.documentElement.setAttribute("lang", newLang)
}

window.onload = () => {
  $('[lang="ua"]').hide()
  const button = document.getElementById("languagebutton")
  button.addEventListener("click", switchLang)
}
