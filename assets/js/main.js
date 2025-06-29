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
// Updated JavaScript with mobile-specific behavior

// Projects functionality with mobile improvements
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

  // Detect if device is mobile
  function isMobile() {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }

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
        } else if (galleryItem.type === "pdf") {
          galleryItem.title = item.getAttribute("data-title") || galleryItem.alt
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
      webpage: card.getAttribute("webpage") ? card.getAttribute("webpage") : "",
      webpagemessage: {
        en: card.getAttribute("webpagemessage-en"),
        ua: card.getAttribute("webpagemessage-ua"),
      },
      technologies: card.getAttribute("data-technologies") ? card.getAttribute("data-technologies").split(",") : [],
      gallery: galleryItems,
    }
  }

  // Create gallery item (image, video, or PDF) behind metadata choose if controls for media or muted or no controls
  function createGalleryItem(item, index) {
    if (item.type === "video") {
      return `
        <div class="gallery-item video-item" data-index="${index}">
          <video poster="${item.poster}" preload="metadata">
            <source src="${item.src}" type="video/mp4">
          </video>
          <div class="video-overlay">
            <button class="video-play-btn">
              <i class="bi bi-play-fill"></i>
            </button>
          </div>
        </div>
      `
    } else if (item.type === "pdf") {
      return `
        <div class="gallery-item pdf-item" data-index="${index}" data-pdf-src="${item.src}" data-pdf-title="${item.title || item.alt}">
          <div class="pdf-container">
            <iframe class="pdf-embed" src="${item.src}#toolbar=0&navpanes=0&scrollbar=1&view=FitH" title="${item.alt}"></iframe>
            <div class="pdf-overlay">
              <button class="pdf-open-btn">
                <i class="bi bi-file-earmark-pdf"></i>
              </button>
            </div>
            <div class="pdf-info">${item.title || item.alt}</div>
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
        ${
          project.webpage
            ? `<p><a href="${project.webpage}" target="_blank" rel="noopener">${project.webpagemessage[lang]}</a></p>`
            : ""
        }
        <br>
        
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

  // Handle gallery interactions (videos and PDFs)
  function setupGalleryHandlers(container) {
    // Video handlers
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

    // PDF handlers with improved scrolling
    const pdfItems = container.querySelectorAll(".pdf-item")

    pdfItems.forEach((item) => {
      const pdfSrc = item.getAttribute("data-pdf-src")
      const pdfTitle = item.getAttribute("data-pdf-title") || "Document"
      const openBtn = item.querySelector(".pdf-open-btn")
      const overlay = item.querySelector(".pdf-overlay")

      if (openBtn && pdfSrc) {
        openBtn.addEventListener("click", (e) => {
          e.stopPropagation()
          // Enhanced PDF URL with better scrolling support
          const enhancedPdfSrc = `${pdfSrc}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH&zoom=page-width`
          window.openPdfModal(enhancedPdfSrc, pdfTitle)
        })
      }

      if (overlay && pdfSrc) {
        overlay.addEventListener("click", (e) => {
          e.stopPropagation()
          const enhancedPdfSrc = `${pdfSrc}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH&zoom=page-width`
          window.openPdfModal(enhancedPdfSrc, pdfTitle)
        })
      }

      // Double-click to open PDF
      if (pdfSrc) {
        item.addEventListener("dblclick", () => {
          const enhancedPdfSrc = `${pdfSrc}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH&zoom=page-width`
          window.openPdfModal(enhancedPdfSrc, pdfTitle)
        })
      }
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

  // Start timer animation (only on desktop)
  function startTimer(card) {
    if (isMobile()) return // Skip timer on mobile

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

    // Always use modal on mobile, sidebar on desktop
    if (isMobile() || window.innerWidth < 992) {
      const modalBody = document.getElementById("modalBody")
      if (modalBody) {
        modalBody.innerHTML = createProjectDetail(card)
        setupGalleryHandlers(modalBody)
        if (projectModal) {
          projectModal.style.display = "block"
        }
      }
    } else {
      const sidebarContent = document.getElementById("sidebarContent")
      if (sidebarContent) {
        sidebarContent.innerHTML = createProjectDetail(card)
        setupGalleryHandlers(sidebarContent)
        if (projectSidebar) {
          projectSidebar.style.display = "block"
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

    // Hide timer on all cards when one is locked
    projectCards.forEach((otherCard) => {
      const circleTimer = otherCard.querySelector(".circle-timer")
      if (circleTimer) {
        circleTimer.style.display = "none"
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

      // Show timers again (except on mobile)
      if (!isMobile()) {
        projectCards.forEach((card) => {
          const circleTimer = card.querySelector(".circle-timer")
          if (circleTimer) {
            circleTimer.style.display = ""
          }
        })
      }
    }

    lockedProject = null

    if (!currentHoveredProject) {
      hideProjectDetails()
    } else {
      showProjectDetails(currentHoveredProject)
    }
  }

  // Handle project interactions with mobile-specific behavior
  projectCards.forEach((card) => {
    const circleTimer = card.querySelector(".circle-timer")
    const closeBtn = card.querySelector(".project-close-btn")

    if (isMobile()) {
      // Mobile behavior: immediate tap to open
      card.addEventListener("click", (e) => {
        e.preventDefault()

        if (lockedProject && lockedProject !== card) {
          unlockProjectDetails()
        }

        if (lockedProject === card) {
          unlockProjectDetails()
          return
        }

        showProjectDetails(card)
        lockProjectDetails(card)
      })

      // Disable hover effects on mobile
      card.style.pointerEvents = "auto"
    } else {
      // Desktop behavior: hover with timer
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
      if (window.innerWidth >= 992 && !isMobile()) {
        if (projectModal) {
          projectModal.style.display = "none"
        }
        const sidebarContent = document.getElementById("sidebarContent")
        if (sidebarContent) {
          sidebarContent.innerHTML = createProjectDetail(lockedProject)
          setupGalleryHandlers(sidebarContent)
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
          setupGalleryHandlers(modalBody)
        }
        if (projectModal) {
          projectModal.style.display = "block"
        }
      }
    } else if (currentHoveredProject && !isMobile()) {
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


// Enhanced PDF modal with better scrolling support

// PDF Modal Setup with enhanced scrolling
document.addEventListener("DOMContentLoaded", () => {
  // Create PDF modal if it doesn't exist
  if (!document.getElementById("pdfModal")) {
    const pdfModal = document.createElement("div")
    pdfModal.id = "pdfModal"
    pdfModal.className = "pdf-modal"
    pdfModal.innerHTML = `
      <div class="pdf-modal-content">
        <div class="pdf-modal-header">
          <h3 class="pdf-modal-title" id="pdfModalTitle">Document</h3>
          <div class="pdf-modal-controls">
            <button class="pdf-control-btn" id="pdfFullscreen" title="Fullscreen">
              <i class="bi bi-fullscreen"></i>
            </button>
            <button class="pdf-modal-close" id="pdfModalClose">×</button>
          </div>
        </div>
        <div class="pdf-modal-body">
          <iframe class="pdf-modal-embed" id="pdfModalEmbed" src="/placeholder.svg" allowfullscreen></iframe>
        </div>
      </div>
    `
    document.body.appendChild(pdfModal)
  }

  const pdfModal = document.getElementById("pdfModal")
  const pdfModalClose = document.getElementById("pdfModalClose")
  const pdfModalEmbed = document.getElementById("pdfModalEmbed")
  const pdfModalTitle = document.getElementById("pdfModalTitle")
  const pdfFullscreen = document.getElementById("pdfFullscreen")

  // Function to open PDF in modal with enhanced parameters
  window.openPdfModal = (pdfSrc, title) => {
    console.log("Opening PDF:", pdfSrc, title)

    // Enhanced PDF URL parameters for better viewing and scrolling
    const enhancedSrc = `${pdfSrc}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH&zoom=page-width&pagemode=thumbs`

    pdfModalEmbed.src = enhancedSrc
    pdfModalTitle.textContent = title || "Document"
    pdfModal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Focus on the iframe for better keyboard navigation
    setTimeout(() => {
      pdfModalEmbed.focus()
    }, 500)
  }

  // Function to close PDF modal
  function closePdfModal() {
    pdfModal.style.display = "none"
    pdfModalEmbed.src = ""
    document.body.style.overflow = ""
  }

  // Fullscreen functionality
  if (pdfFullscreen) {
    pdfFullscreen.addEventListener("click", () => {
      if (pdfModalEmbed.requestFullscreen) {
        pdfModalEmbed.requestFullscreen()
      } else if (pdfModalEmbed.webkitRequestFullscreen) {
        pdfModalEmbed.webkitRequestFullscreen()
      } else if (pdfModalEmbed.msRequestFullscreen) {
        pdfModalEmbed.msRequestFullscreen()
      }
    })
  }

  // Event listeners for PDF modal
  if (pdfModalClose) {
    pdfModalClose.addEventListener("click", closePdfModal)
  }

  if (pdfModal) {
    pdfModal.addEventListener("click", (e) => {
      if (e.target === pdfModal) {
        closePdfModal()
      }
    })
  }

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pdfModal.style.display === "block") {
      closePdfModal()
    }
  })

  // Handle iframe load to ensure proper scrolling
  if (pdfModalEmbed) {
    pdfModalEmbed.addEventListener("load", () => {
      console.log("PDF loaded successfully")
      // Try to enable scrolling in the iframe
      try {
        const iframeDoc = pdfModalEmbed.contentDocument || pdfModalEmbed.contentWindow.document
        if (iframeDoc) {
          iframeDoc.body.style.overflow = "auto"
        }
      } catch (e) {
        console.log("Cannot access iframe content (cross-origin)")
      }
    })
  }
})
