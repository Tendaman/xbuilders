function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Call the function when the page loads
window.onload = loadFooter;

function initializeMenuToggle() {
    document.getElementById('menuToggle').addEventListener('click', toggleMenu);
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.metric-number');

  const resetCounter = (counter) => {
      counter.innerHTML = '0' + counter.innerHTML.replace(/\d+/g, ''); // Reset to 0 while keeping symbols
  };

  const startCounter = (counter) => {
      const updateCount = () => {
          const target = +counter.getAttribute('data-count');
          const count = +counter.innerText.replace(/\D/g, ''); // Remove any non-digit characters
          const speed = 300; // Adjust speed for counter

          const increment = target / speed;

          if(count < target) {
              counter.innerHTML = Math.ceil(count + increment) + counter.innerHTML.replace(/\d+/g, ''); // Keep the symbols
              setTimeout(updateCount, 1);
          } else {
              counter.innerHTML = target + counter.innerHTML.replace(/\d+/g, ''); // Ensure target is reached
          }
      };

      updateCount();
  };

  const observerOptions = {
      threshold: 0.5 // Counter starts when 50% of the element is in view
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              startCounter(entry.target);
          } else {
              resetCounter(entry.target);
          }
      });
  }, observerOptions);

  counters.forEach(counter => {
      observer.observe(counter);
  });
});


fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        initializeMenuToggle();
    });

const tabsBox = document.querySelector('.slider-container'),
allTabs = tabsBox.querySelectorAll('img'),
arrowIcons = document.querySelectorAll('.icon i')
  
let isDragging = false
  
  const handleIcons = scrollVal => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? 'none' : 'flex'
    arrowIcons[1].parentElement.style.display =
      maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex'
  }
  
  arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
      let scrollWidth = (tabsBox.scrollLeft += icon.id === 'left' ? -340 : 340)
      handleIcons(scrollWidth)
    })
  })
  
  allTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabsBox.querySelector('.active').classList.remove('active')
      tab.classList.add('active')
    })
  })
  
  const dragging = e => {
    if (!isDragging) return
    tabsBox.classList.add('dragging')
    tabsBox.scrollLeft -= e.movementX
    handleIcons(tabsBox.scrollLeft)
  }
  
  const dragStop = () => {
    isDragging = false
    tabsBox.classList.remove('dragging')
  }
  
  tabsBox.addEventListener('mousedown', () => (isDragging = true))
  tabsBox.addEventListener('mousemove', dragging)
  document.addEventListener('mouseup', dragStop)

  // Auto-scroll functionality
const autoScroll = () => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth
    let currentScroll = tabsBox.scrollLeft
    let newScroll = currentScroll + 340 // Adjust the scroll increment as needed

    if (newScroll >= maxScrollableWidth) {
        tabsBox.scrollLeft = 0 // Reset to the start
    } else {
        tabsBox.scrollLeft = newScroll
    }
    handleIcons(tabsBox.scrollLeft)
};

// Set interval for auto-scrolling every 5 seconds
setInterval(autoScroll, 5000)