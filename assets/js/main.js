/**
 * Template Name: MyResume - v4.7.0
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
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
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active")
    this.classList.toggle("bi-list")
    this.classList.toggle("bi-x")
  })

  /**
   * Scroll with offset on links with a class name .scrollto
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
   * Scroll with offset on page load with hash links in the url
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
  const Typed = window.Typed
  const typed = select(".typed")
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items")
    typed_strings = typed_strings.split(",")
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
  }

  /**
   * Skills animation
   */
  const Waypoint = window.Waypoint
  const skilsContent = select(".skills-content")
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: (direction) => {
        const progress = select(".progress .progress-bar", true)
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%"
        })
      },
    })
  }

  /**
   * Porfolio isotope and filter
   */
  const Isotope = window.Isotope
  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container")
    if (portfolioContainer) {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      })

      const portfolioFilters = select("#portfolio-flters li", true)

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault()
          portfolioFilters.forEach((el) => {
            el.classList.remove("filter-active")
          })
          this.classList.add("filter-active")

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          })
          portfolioIsotope.on("arrangeComplete", () => {
            window.AOS.refresh()
          })
        },
        true,
      )
    }
  })

  /**
   * Portfolio details slider
   */
  const Swiper = window.Swiper
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  })

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  })

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    window.AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  })

  /**
   * Language Switching
   */
  function switchLang() {
    try {
      const enElements = document.querySelectorAll('[lang="en"]')
      const uaElements = document.querySelectorAll('[lang="ua"]')

      const isEnglishVisible = enElements.length > 0 && window.getComputedStyle(enElements[0]).display !== "none"

      if (isEnglishVisible) {
        enElements.forEach((el) => (el.style.display = "none"))
        uaElements.forEach((el) => (el.style.display = "block"))
      } else {
        uaElements.forEach((el) => (el.style.display = "none"))
        enElements.forEach((el) => (el.style.display = "block"))
      }
    } catch (error) {
      console.error("Language switch error:", error)
    }
  }

  // Initialize language on page load
  window.addEventListener("load", () => {
    try {
      const uaElements = document.querySelectorAll('[lang="ua"]')
      const enElements = document.querySelectorAll('[lang="en"]')

      uaElements.forEach((el) => (el.style.display = "none"))
      enElements.forEach((el) => (el.style.display = "block"))

      const button = document.getElementById("languagebutton")
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault()
          switchLang()
        })
      }
    } catch (error) {
      console.error("Language initialization error:", error)
    }
  })
})()
