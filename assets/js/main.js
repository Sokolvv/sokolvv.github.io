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

// Copyright modal functionality
document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  const yearSpan = document.getElementById("year")
  if (yearSpan) {
    const currentYear = new Date().getFullYear()
    yearSpan.textContent = currentYear
  }

  // Copyright modal functionality
  const copyrightText = document.getElementById("copyright")
  const copyrightModal = document.getElementById("copyrightModal")
  const copyrightModalClose = document.getElementById("copyrightModalClose")

  // Show copyright modal on click or hover
  function showCopyrightModal() {
    if (copyrightModal) {
      copyrightModal.style.display = "block"
      document.body.style.overflow = "hidden" // Prevent background scrolling
    }
  }

  // Hide copyright modal
  function hideCopyrightModal() {
    if (copyrightModal) {
      copyrightModal.style.display = "none"
      document.body.style.overflow = "" // Restore scrolling
    }
  }

  // Event listeners
  if (copyrightText) {
    // Show on click
    copyrightText.addEventListener("click", showCopyrightModal)

    // Show on hover (with slight delay)
    let hoverTimeout
    copyrightText.addEventListener("mouseenter", () => {
      hoverTimeout = setTimeout(showCopyrightModal, 500) // 500ms delay
    })

    copyrightText.addEventListener("mouseleave", () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    })
  }

  // Close modal events
  if (copyrightModalClose) {
    copyrightModalClose.addEventListener("click", hideCopyrightModal)
  }

  // Close modal when clicking outside
  if (copyrightModal) {
    copyrightModal.addEventListener("click", (e) => {
      if (e.target === copyrightModal) {
        hideCopyrightModal()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && copyrightModal && copyrightModal.style.display === "block") {
      hideCopyrightModal()
    }
  })
})

// Projects functionality
document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.getElementById("projectsGrid")
  const projectCards = document.querySelectorAll(".project-card")
  const projectModal = document.getElementById("projectModal")
  const projectSidebar = document.getElementById("projectSidebar")
  const modalClose = document.getElementById("modalClose")
  const sidebarClose = document.getElementById("sidebarClose")

  // Check if projects elements exist
  if (!projectsGrid || !projectCards.length) {
    console.log("Projects elements not found")
    return
  }

  let currentHoveredProject = null
  let lockedProject = null
  let hoverTimer = null

  // Get current language
  function getCurrentLanguage() {
    const enElements = document.querySelectorAll('[lang="en"]')
    return enElements.length > 0 && window.getComputedStyle(enElements[0]).display !== "none" ? "en" : "ua"
  }

  // Extract project data from HTML attributes
  function getProjectData(card) {
    const lang = getCurrentLanguage()

    // Get gallery data from hidden div
    const galleryData = card.querySelector(".gallery-data")
    const galleryItems = []

    if (galleryData) {
      const items = galleryData.querySelectorAll("div[data-type]")
      items.forEach((item) => {
        const galleryItem = {
          type: item.getAttribute("data-type"),
          src: item.getAttribute("data-src"),
          alt: item.getAttribute("data-alt"),
        }

        if (galleryItem.type === "video") {
          galleryItem.poster = item.getAttribute("data-poster")
        }

        galleryItems.push(galleryItem)
      })
    }

    return {
      id: card.getAttribute("data-project"),
      hasVideo: card.getAttribute("data-has-video") === "true",
      mainImage: card.getAttribute("data-main-image"),
      category: card.getAttribute("data-category"),
      title: {
        en: card.getAttribute("data-title-en"),
        ua: card.getAttribute("data-title-ua"),
      },
      description: {
        en: card.getAttribute("data-description-en"),
        ua: card.getAttribute("data-description-ua"),
      },
      detail: {
        en: card.getAttribute("data-detail-en"),
        ua: card.getAttribute("data-detail-ua"),
      },
      technologies: card.getAttribute("data-technologies") ? card.getAttribute("data-technologies").split(",") : [],
      gallery: galleryItems,
    }
  }

  // Create gallery item (image or video)
  function createGalleryItem(item, index) {
    if (item.type === "video") {
      return `
        <div class="gallery-item video-item" data-index="${index}">
          <video poster="${item.poster}" preload="metadata" muted>
            <source src="${item.src}" type="video/mp4">
          </video>
          <div class="video-overlay">
            <button class="video-play-btn">
              <i class="bi bi-play-fill"></i>
            </button>
          </div>
        </div>
      `
    } else {
      return `
        <div class="gallery-item image-item" data-index="${index}">
          <img src="${item.src}" alt="${item.alt}">
        </div>
      `
    }
  }

  // Create project detail content
  function createProjectDetail(card) {
    const project = getProjectData(card)
    const lang = getCurrentLanguage()

    return `
      <div class="project-detail">
        <span class="category-badge">${project.category}</span>
        <h3>${project.title[lang]}</h3>
        <p>${project.detail[lang]}</p>
        
        <div class="project-gallery">
          <h4>${lang === "en" ? "Project Gallery" : "Галерея проєкту"}</h4>
          <div class="gallery-grid">
            ${project.gallery.map((item, index) => createGalleryItem(item, index)).join("")}
          </div>
        </div>
        
        <div class="project-technologies">
          <h4>${lang === "en" ? "Technologies Used" : "Використані технології"}</h4>
          <div class="tech-list">
            ${project.technologies.map((tech) => `<span class="tech-tag">${tech.trim()}</span>`).join("")}
          </div>
        </div>
      </div>
    `
  }

  // Handle gallery video play
  function setupGalleryVideoHandlers(container) {
    const videoItems = container.querySelectorAll(".video-item")

    videoItems.forEach((item) => {
      const video = item.querySelector("video")
      const playBtn = item.querySelector(".video-play-btn")
      const overlay = item.querySelector(".video-overlay")

      if (!video || !playBtn || !overlay) return

      // Load the first frame immediately
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = 0.1
      })

      if (video.readyState >= 1) {
        video.currentTime = 0.1
      }

      playBtn.addEventListener("click", () => {
        if (video.paused) {
          video.currentTime = 0
          video.play()
          overlay.style.opacity = "0"
        } else {
          video.pause()
          overlay.style.opacity = "1"
        }
      })

      video.addEventListener("click", () => {
        if (video.paused) {
          video.currentTime = 0
          video.play()
          overlay.style.opacity = "0"
        } else {
          video.pause()
          overlay.style.opacity = "1"
        }
      })

      video.addEventListener("ended", () => {
        overlay.style.opacity = "1"
        video.currentTime = 0.1
      })

      video.addEventListener("pause", () => {
        overlay.style.opacity = "1"
      })

      video.addEventListener("play", () => {
        overlay.style.opacity = "0"
      })
    })
  }

  // Update project card display based on data
  function updateProjectCard(card) {
    const project = getProjectData(card)

    // Update main image
    const mainImg = card.querySelector(".project-main-image")
    if (mainImg && project.mainImage) {
      mainImg.src = project.mainImage
    }

    // Update category
    const categorySpan = card.querySelector(".project-category")
    if (categorySpan) {
      categorySpan.textContent = project.category
    }

    // Show/hide video overlay based on hasVideo
    const overlay = card.querySelector(".project-overlay")
    if (overlay) {
      if (project.hasVideo) {
        overlay.style.display = "flex"
        card.setAttribute("data-has-video", "true")
      } else {
        overlay.style.display = "none"
        card.setAttribute("data-has-video", "false")
      }
    }
  }

  // Initialize all project cards
  projectCards.forEach((card) => {
    updateProjectCard(card)
  })

  // Start timer animation
  function startTimer(card) {
    const timerProgress = card.querySelector(".timer-progress")
    if (timerProgress) {
      timerProgress.classList.add("active")
    }
  }

  // Stop timer animation
  function stopTimer(card) {
    const timerProgress = card.querySelector(".timer-progress")
    if (timerProgress) {
      timerProgress.classList.remove("active")
    }
  }

  // Show project details
  function showProjectDetails(card) {
    // Dim other cards
    projectCards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.add("dimmed")
      }
    })

    // Show details in appropriate container
    if (window.innerWidth >= 992) {
      const sidebarContent = document.getElementById("sidebarContent")
      if (sidebarContent) {
        sidebarContent.innerHTML = createProjectDetail(card)
        setupGalleryVideoHandlers(sidebarContent)
        if (projectSidebar) {
          projectSidebar.style.display = "block"
        }
      }
    } else {
      const modalBody = document.getElementById("modalBody")
      if (modalBody) {
        modalBody.innerHTML = createProjectDetail(card)
        setupGalleryVideoHandlers(modalBody)
        if (projectModal) {
          projectModal.style.display = "block"
        }
      }
    }
  }

  // Hide project details
  function hideProjectDetails() {
    if (lockedProject) return

    if (projectSidebar) {
      projectSidebar.style.display = "none"
    }
    if (projectModal) {
      projectModal.style.display = "none"
    }

    projectCards.forEach((card) => {
      card.classList.remove("dimmed")
    })
  }

  // Lock project details
  function lockProjectDetails(card) {
    lockedProject = card

    const closeBtn = card.querySelector(".project-close-btn")
    if (closeBtn) {
      closeBtn.style.display = "block"
    }

    const circleTimer = card.querySelector(".circle-timer")
    if (circleTimer) {
      circleTimer.style.display = "none"
    }

    projectCards.forEach((otherCard) => {
      if (otherCard !== card) {
        const otherTimer = otherCard.querySelector(".circle-timer")
        if (otherTimer) {
          otherTimer.style.display = "none"
        }
      }
    })
  }

  // Unlock project details
  function unlockProjectDetails() {
    if (lockedProject) {
      const closeBtn = lockedProject.querySelector(".project-close-btn")
      if (closeBtn) {
        closeBtn.style.display = "none"
      }

      projectCards.forEach((card) => {
        const circleTimer = card.querySelector(".circle-timer")
        if (circleTimer) {
          circleTimer.style.display = ""
        }
      })
    }

    lockedProject = null

    if (!currentHoveredProject) {
      hideProjectDetails()
    } else {
      showProjectDetails(currentHoveredProject)
    }
  }

  // Handle project interactions
  projectCards.forEach((card) => {
    const circleTimer = card.querySelector(".circle-timer")
    const closeBtn = card.querySelector(".project-close-btn")

    card.addEventListener("mouseenter", () => {
      currentHoveredProject = card

      if (lockedProject && lockedProject !== card) {
        return
      }

      showProjectDetails(card)

      if (lockedProject !== card) {
        startTimer(card)

        if (hoverTimer) {
          clearTimeout(hoverTimer)
        }

        hoverTimer = setTimeout(() => {
          lockProjectDetails(card)
        }, 3000)
      }
    })

    card.addEventListener("mouseleave", () => {
      if (card === currentHoveredProject) {
        currentHoveredProject = null
      }

      stopTimer(card)

      if (hoverTimer) {
        clearTimeout(hoverTimer)
        hoverTimer = null
      }

      if (lockedProject !== card) {
        hideProjectDetails()
      }
    })

    card.addEventListener("click", (e) => {
      if (lockedProject && lockedProject !== card) {
        unlockProjectDetails()
      }

      if (lockedProject === card) return

      if (hoverTimer) {
        clearTimeout(hoverTimer)
        hoverTimer = null
      }

      stopTimer(card)
      showProjectDetails(card)
      lockProjectDetails(card)
    })

    if (circleTimer) {
      circleTimer.addEventListener("click", (e) => {
        e.stopPropagation()

        if (lockedProject && lockedProject !== card) {
          unlockProjectDetails()
        }

        if (lockedProject === card) return

        if (hoverTimer) {
          clearTimeout(hoverTimer)
          hoverTimer = null
        }

        stopTimer(card)
        showProjectDetails(card)
        lockProjectDetails(card)
      })
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        unlockProjectDetails()
      })
    }
  })

  // Close modal/sidebar events
  if (modalClose) {
    modalClose.addEventListener("click", unlockProjectDetails)
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", unlockProjectDetails)
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        unlockProjectDetails()
      }
    })
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (lockedProject) {
      if (window.innerWidth >= 992) {
        if (projectModal) {
          projectModal.style.display = "none"
        }
        const sidebarContent = document.getElementById("sidebarContent")
        if (sidebarContent) {
          sidebarContent.innerHTML = createProjectDetail(lockedProject)
          setupGalleryVideoHandlers(sidebarContent)
        }
        if (projectSidebar) {
          projectSidebar.style.display = "block"
        }
      } else {
        if (projectSidebar) {
          projectSidebar.style.display = "none"
        }
        const modalBody = document.getElementById("modalBody")
        if (modalBody) {
          modalBody.innerHTML = createProjectDetail(lockedProject)
          setupGalleryVideoHandlers(modalBody)
        }
        if (projectModal) {
          projectModal.style.display = "block"
        }
      }
    } else if (currentHoveredProject) {
      showProjectDetails(currentHoveredProject)
    }
  })

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lockedProject) {
      unlockProjectDetails()
    }
  })
})


// Simple Projects Section JavaScript
document.addEventListener("DOMContentLoaded", () => {
  console.log("Projects section script loaded")

  // Basic language toggle functionality
  function updateLanguageDisplay() {
    const currentLang = document.documentElement.lang || "en"
    const elementsToShow = document.querySelectorAll(`[lang="${currentLang}"]`)
    const elementsToHide = document.querySelectorAll(`[lang]:not([lang="${currentLang}"])`)

    elementsToShow.forEach((el) => (el.style.display = "block"))
    elementsToHide.forEach((el) => (el.style.display = "none"))
  }

  // Initialize language display
  updateLanguageDisplay()

  // Simple hover effect for project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })

    // Simple click handler
    card.addEventListener("click", function () {
      console.log("Project card clicked:", this.querySelector("h3").textContent)
      // You can add more functionality here later
    })
  })
})

// Copyright modal functionality
document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  const yearSpan = document.getElementById("year")
  if (yearSpan) {
    const currentYear = new Date().getFullYear()
    yearSpan.textContent = currentYear
  }

  // Copyright modal functionality
  const copyrightText = document.getElementById("copyright")
  const copyrightModal = document.getElementById("copyrightModal")
  const copyrightModalClose = document.getElementById("copyrightModalClose")

  // Show copyright modal on click or hover
  function showCopyrightModal() {
    if (copyrightModal) {
      copyrightModal.style.display = "block"
      document.body.style.overflow = "hidden" // Prevent background scrolling
    }
  }

  // Hide copyright modal
  function hideCopyrightModal() {
    if (copyrightModal) {
      copyrightModal.style.display = "none"
      document.body.style.overflow = "" // Restore scrolling
    }
  }

  // Event listeners
  if (copyrightText) {
    // Show on click
    copyrightText.addEventListener("click", showCopyrightModal)

    // Show on hover (with slight delay)
    let hoverTimeout
    copyrightText.addEventListener("mouseenter", () => {
      hoverTimeout = setTimeout(showCopyrightModal, 500) // 500ms delay
    })

    copyrightText.addEventListener("mouseleave", () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    })
  }

  // Close modal events
  if (copyrightModalClose) {
    copyrightModalClose.addEventListener("click", hideCopyrightModal)
  }

  // Close modal when clicking outside
  if (copyrightModal) {
    copyrightModal.addEventListener("click", (e) => {
      if (e.target === copyrightModal) {
        hideCopyrightModal()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && copyrightModal && copyrightModal.style.display === "block") {
      hideCopyrightModal()
    }
  })
})

// Projects functionality
document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.getElementById("projectsGrid")
  const projectCards = document.querySelectorAll(".project-card")
  const projectModal = document.getElementById("projectModal")
  const projectSidebar = document.getElementById("projectSidebar")
  const modalClose = document.getElementById("modalClose")
  const sidebarClose = document.getElementById("sidebarClose")

  // Check if projects elements exist
  if (!projectsGrid || !projectCards.length) {
    console.log("Projects elements not found")
    return
  }

  let currentHoveredProject = null
  let lockedProject = null
  let hoverTimer = null

  // Get current language
  function getCurrentLanguage() {
    const enElements = document.querySelectorAll('[lang="en"]')
    return enElements.length > 0 && window.getComputedStyle(enElements[0]).display !== "none" ? "en" : "ua"
  }

  // Extract project data from HTML attributes
  function getProjectData(card) {
    const lang = getCurrentLanguage()

    // Get gallery data from hidden div
    const galleryData = card.querySelector(".gallery-data")
    const galleryItems = []

    if (galleryData) {
      const items = galleryData.querySelectorAll("div[data-type]")
      items.forEach((item) => {
        const galleryItem = {
          type: item.getAttribute("data-type"),
          src: item.getAttribute("data-src"),
          alt: item.getAttribute("data-alt"),
        }

        if (galleryItem.type === "video") {
          galleryItem.poster = item.getAttribute("data-poster")
        }

        galleryItems.push(galleryItem)
      })
    }

    return {
      id: card.getAttribute("data-project"),
      hasVideo: card.getAttribute("data-has-video") === "true",
      mainImage: card.getAttribute("data-main-image"),
      category: card.getAttribute("data-category"),
      title: {
        en: card.getAttribute("data-title-en"),
        ua: card.getAttribute("data-title-ua"),
      },
      description: {
        en: card.getAttribute("data-description-en"),
        ua: card.getAttribute("data-description-ua"),
      },
      detail: {
        en: card.getAttribute("data-detail-en"),
        ua: card.getAttribute("data-detail-ua"),
      },
      technologies: card.getAttribute("data-technologies") ? card.getAttribute("data-technologies").split(",") : [],
      gallery: galleryItems,
    }
  }

  // Create gallery item (image or video)
  function createGalleryItem(item, index) {
    if (item.type === "video") {
      return `
        <div class="gallery-item video-item" data-index="${index}">
          <video poster="${item.poster}" preload="metadata" muted>
            <source src="${item.src}" type="video/mp4">
          </video>
          <div class="video-overlay">
            <button class="video-play-btn">
              <i class="bi bi-play-fill"></i>
            </button>
          </div>
        </div>
      `
    } else {
      return `
        <div class="gallery-item image-item" data-index="${index}">
          <img src="${item.src}" alt="${item.alt}">
        </div>
      `
    }
  }

  // Create project detail content
  function createProjectDetail(card) {
    const project = getProjectData(card)
    const lang = getCurrentLanguage()

    return `
      <div class="project-detail">
        <span class="category-badge">${project.category}</span>
        <h3>${project.title[lang]}</h3>
        <p>${project.detail[lang]}</p>
        
        <div class="project-gallery">
          <h4>${lang === "en" ? "Project Gallery" : "Галерея проєкту"}</h4>
          <div class="gallery-grid">
            ${project.gallery.map((item, index) => createGalleryItem(item, index)).join("")}
          </div>
        </div>
        
        <div class="project-technologies">
          <h4>${lang === "en" ? "Technologies Used" : "Використані технології"}</h4>
          <div class="tech-list">
            ${project.technologies.map((tech) => `<span class="tech-tag">${tech.trim()}</span>`).join("")}
          </div>
        </div>
      </div>
    `
  }

  // Handle gallery video play
  function setupGalleryVideoHandlers(container) {
    const videoItems = container.querySelectorAll(".video-item")

    videoItems.forEach((item) => {
      const video = item.querySelector("video")
      const playBtn = item.querySelector(".video-play-btn")
      const overlay = item.querySelector(".video-overlay")

      if (!video || !playBtn || !overlay) return

      // Load the first frame immediately
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = 0.1
      })

      if (video.readyState >= 1) {
        video.currentTime = 0.1
      }

      playBtn.addEventListener("click", () => {
        if (video.paused) {
          video.currentTime = 0
          video.play()
          overlay.style.opacity = "0"
        } else {
          video.pause()
          overlay.style.opacity = "1"
        }
      })

      video.addEventListener("click", () => {
        if (video.paused) {
          video.currentTime = 0
          video.play()
          overlay.style.opacity = "0"
        } else {
          video.pause()
          overlay.style.opacity = "1"
        }
      })

      video.addEventListener("ended", () => {
        overlay.style.opacity = "1"
        video.currentTime = 0.1
      })

      video.addEventListener("pause", () => {
        overlay.style.opacity = "1"
      })

      video.addEventListener("play", () => {
        overlay.style.opacity = "0"
      })
    })
  }

  // Update project card display based on data
  function updateProjectCard(card) {
    const project = getProjectData(card)

    // Update main image
    const mainImg = card.querySelector(".project-main-image")
    if (mainImg && project.mainImage) {
      mainImg.src = project.mainImage
    }

    // Update category
    const categorySpan = card.querySelector(".project-category")
    if (categorySpan) {
      categorySpan.textContent = project.category
    }

    // Show/hide video overlay based on hasVideo
    const overlay = card.querySelector(".project-overlay")
    if (overlay) {
      if (project.hasVideo) {
        overlay.style.display = "flex"
        card.setAttribute("data-has-video", "true")
      } else {
        overlay.style.display = "none"
        card.setAttribute("data-has-video", "false")
      }
    }
  }

  // Initialize all project cards
  projectCards.forEach((card) => {
    updateProjectCard(card)
  })

  // Start timer animation
  function startTimer(card) {
    const timerProgress = card.querySelector(".timer-progress")
    if (timerProgress) {
      timerProgress.classList.add("active")
    }
  }

  // Stop timer animation
  function stopTimer(card) {
    const timerProgress = card.querySelector(".timer-progress")
    if (timerProgress) {
      timerProgress.classList.remove("active")
    }
  }

  // Show project details
  function showProjectDetails(card) {
    // Dim other cards
    projectCards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.add("dimmed")
      }
    })

    // Show details in appropriate container
    if (window.innerWidth >= 992) {
      const sidebarContent = document.getElementById("sidebarContent")
      if (sidebarContent) {
        sidebarContent.innerHTML = createProjectDetail(card)
        setupGalleryVideoHandlers(sidebarContent)
        if (projectSidebar) {
          projectSidebar.style.display = "block"
        }
      }
    } else {
      const modalBody = document.getElementById("modalBody")
      if (modalBody) {
        modalBody.innerHTML = createProjectDetail(card)
        setupGalleryVideoHandlers(modalBody)
        if (projectModal) {
          projectModal.style.display = "block"
        }
      }
    }
  }

  // Hide project details
  function hideProjectDetails() {
    if (lockedProject) return

    if (projectSidebar) {
      projectSidebar.style.display = "none"
    }
    if (projectModal) {
      projectModal.style.display = "none"
    }

    projectCards.forEach((card) => {
      card.classList.remove("dimmed")
    })
  }

  // Lock project details
  function lockProjectDetails(card) {
    lockedProject = card

    const closeBtn = card.querySelector(".project-close-btn")
    if (closeBtn) {
      closeBtn.style.display = "block"
    }

    const circleTimer = card.querySelector(".circle-timer")
    if (circleTimer) {
      circleTimer.style.display = "none"
    }

    projectCards.forEach((otherCard) => {
      if (otherCard !== card) {
        const otherTimer = otherCard.querySelector(".circle-timer")
        if (otherTimer) {
          otherTimer.style.display = "none"
        }
      }
    })
  }

  // Unlock project details
  function unlockProjectDetails() {
    if (lockedProject) {
      const closeBtn = lockedProject.querySelector(".project-close-btn")
      if (closeBtn) {
        closeBtn.style.display = "none"
      }

      projectCards.forEach((card) => {
        const circleTimer = card.querySelector(".circle-timer")
        if (circleTimer) {
          circleTimer.style.display = ""
        }
      })
    }

    lockedProject = null

    if (!currentHoveredProject) {
      hideProjectDetails()
    } else {
      showProjectDetails(currentHoveredProject)
    }
  }

  // Handle project interactions
  projectCards.forEach((card) => {
    const circleTimer = card.querySelector(".circle-timer")
    const closeBtn = card.querySelector(".project-close-btn")

    card.addEventListener("mouseenter", () => {
      currentHoveredProject = card

      if (lockedProject && lockedProject !== card) {
        return
      }

      showProjectDetails(card)

      if (lockedProject !== card) {
        startTimer(card)

        if (hoverTimer) {
          clearTimeout(hoverTimer)
        }

        hoverTimer = setTimeout(() => {
          lockProjectDetails(card)
        }, 3000)
      }
    })

    card.addEventListener("mouseleave", () => {
      if (card === currentHoveredProject) {
        currentHoveredProject = null
      }

      stopTimer(card)

      if (hoverTimer) {
        clearTimeout(hoverTimer)
        hoverTimer = null
      }

      if (lockedProject !== card) {
        hideProjectDetails()
      }
    })

    card.addEventListener("click", (e) => {
      if (lockedProject && lockedProject !== card) {
        unlockProjectDetails()
      }

      if (lockedProject === card) return

      if (hoverTimer) {
        clearTimeout(hoverTimer)
        hoverTimer = null
      }

      stopTimer(card)
      showProjectDetails(card)
      lockProjectDetails(card)
    })

    if (circleTimer) {
      circleTimer.addEventListener("click", (e) => {
        e.stopPropagation()

        if (lockedProject && lockedProject !== card) {
          unlockProjectDetails()
        }

        if (lockedProject === card) return

        if (hoverTimer) {
          clearTimeout(hoverTimer)
          hoverTimer = null
        }

        stopTimer(card)
        showProjectDetails(card)
        lockProjectDetails(card)
      })
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        unlockProjectDetails()
      })
    }
  })

  // Close modal/sidebar events
  if (modalClose) {
    modalClose.addEventListener("click", unlockProjectDetails)
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", unlockProjectDetails)
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        unlockProjectDetails()
      }
    })
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (lockedProject) {
      if (window.innerWidth >= 992) {
        if (projectModal) {
          projectModal.style.display = "none"
        }
        const sidebarContent = document.getElementById("sidebarContent")
        if (sidebarContent) {
          sidebarContent.innerHTML = createProjectDetail(lockedProject)
          setupGalleryVideoHandlers(sidebarContent)
        }
        if (projectSidebar) {
          projectSidebar.style.display = "block"
        }
      } else {
        if (projectSidebar) {
          projectSidebar.style.display = "none"
        }
        const modalBody = document.getElementById("modalBody")
        if (modalBody) {
          modalBody.innerHTML = createProjectDetail(lockedProject)
          setupGalleryVideoHandlers(modalBody)
        }
        if (projectModal) {
          projectModal.style.display = "block"
        }
      }
    } else if (currentHoveredProject) {
      showProjectDetails(currentHoveredProject)
    }
  })

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lockedProject) {
      unlockProjectDetails()
    }
  })
})


// Simple Projects Section JavaScript
document.addEventListener("DOMContentLoaded", () => {
  console.log("Projects section script loaded")

  // Basic language toggle functionality
  function updateLanguageDisplay() {
    const currentLang = document.documentElement.lang || "en"
    const elementsToShow = document.querySelectorAll(`[lang="${currentLang}"]`)
    const elementsToHide = document.querySelectorAll(`[lang]:not([lang="${currentLang}"])`)

    elementsToShow.forEach((el) => (el.style.display = "block"))
    elementsToHide.forEach((el) => (el.style.display = "none"))
  }

  // Initialize language display
  updateLanguageDisplay()

  // Simple hover effect for project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })

    // Simple click handler
    card.addEventListener("click", function () {
      console.log("Project card clicked:", this.querySelector("h3").textContent)
      // You can add more functionality here later
    })
  })
})
