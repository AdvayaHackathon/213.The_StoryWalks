// ===== Dashboard Main Script =====
document.addEventListener('DOMContentLoaded', function() {
  // ===== Global Variables =====
  const dashboardConfig = {
    currentUser: {
      id: 'user-123',
      name: 'Alex Johnson',
      role: 'Cultural Ambassador',
      connections: ['user-456', 'user-789'],
      registeredEvents: ['event-101', 'event-102'],
      collaborations: ['worker-201']
    },
    communityStats: {
      totalMembers: 1240,
      activeMembers: 842,
      upcomingEvents: 28,
      culturalGroups: 15
    }
  };

  // DOM Elements
  const sidebar = document.querySelector('.dashboard-sidebar');
  const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle-dash');
  const mainContent = document.querySelector('.dashboard-main');
  const profileButton = document.querySelector('.profile-button');
  const profileDropdown = document.querySelector('.profile-dropdown');
  const notificationBtn = document.querySelector('.notification-btn');
  const notificationDropdown = document.querySelector('.notification-dropdown');
  const logoutButton = document.getElementById('logout-button');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroPrevBtn = document.querySelector('.hero-prev');
  const heroNextBtn = document.querySelector('.hero-next');
  const heroIndicators = document.querySelectorAll('.hero-indicators span');
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-bar input');
  const filterBtn = document.querySelector('.filter-btn');
  const resetBtn = document.querySelector('.reset-btn');
  const inviteBtn = document.querySelector('.invite-btn');
  const viewAllButtons = document.querySelectorAll('.view-all');
  const submenuItems = document.querySelectorAll('.has-submenu');
  const locationFilter = document.getElementById('location-filter');
  const roleFilter = document.getElementById('role-filter');
  const cultureFilter = document.getElementById('culture-filter');

  // Mock Data
  const mockMembers = [
    {
      id: 'user-456',
      name: 'Maria Gonzalez',
      role: 'Traditional Weaver',
      location: 'North District',
      culture: 'Indigenous',
      status: 'online',
      tags: ['Textiles', 'Indigenous'],
      avatar: 'member1.jpg',
      featured: false,
      new: true
    },
    {
      id: 'user-789',
      name: 'James Chen',
      role: 'Cultural Historian',
      location: 'East District',
      culture: 'Immigrant',
      status: 'busy',
      tags: ['Research', 'Documentation'],
      avatar: 'member2.jpg',
      featured: true,
      new: false
    },
    {
      id: 'user-101',
      name: 'Amina Diallo',
      role: 'Dance Performer',
      location: 'South District',
      culture: 'Local Traditions',
      status: 'offline',
      tags: ['Performance', 'Workshops'],
      avatar: 'member3.jpg',
      featured: false,
      new: false
    },
    {
      id: 'user-112',
      name: 'David Wilson',
      role: 'Culinary Artist',
      location: 'West District',
      culture: 'Immigrant',
      status: 'online',
      tags: ['Food', 'Traditions'],
      avatar: 'member4.jpg',
      featured: false,
      new: false
    }
  ];

  const mockWorkers = {
    individuals: [
      {
        id: 'worker-201',
        name: 'Dr. Elena Petrova',
        title: 'Cultural Anthropologist',
        organization: 'Heritage Preservation Society',
        expertise: ['Indigenous Cultures', 'Language Revival'],
        avatar: 'worker1.jpg',
        type: 'individual'
      },
      {
        id: 'worker-202',
        name: 'Kwame Asante',
        title: 'Art Conservationist',
        organization: 'National Art Museum',
        expertise: ['Textile Preservation', 'Restoration'],
        avatar: 'worker2.jpg',
        type: 'individual'
      }
    ],
    organizations: [
      {
        id: 'org-301',
        name: 'Living Traditions',
        title: 'Non-Profit Organization',
        organization: 'Since 1995',
        expertise: ['Community Programs', 'Youth Education'],
        avatar: 'org1.jpg',
        type: 'organization'
      },
      {
        id: 'org-302',
        name: 'Cultural Bridges',
        title: 'Community Initiative',
        organization: '10 Active Projects',
        expertise: ['Intercultural Dialog', 'Festival Organization'],
        avatar: 'org2.jpg',
        type: 'organization'
      }
    ],
    institutions: [
      {
        id: 'inst-401',
        name: 'Museum of Living Cultures',
        title: 'Public Institution',
        organization: 'Government Funded',
        expertise: ['Exhibitions', 'Research'],
        avatar: 'institution1.jpg',
        type: 'institution'
      },
      {
        id: 'inst-402',
        name: 'Cultural Heritage Center',
        title: 'Educational Facility',
        organization: 'University Affiliated',
        expertise: ['Archiving', 'Documentation'],
        avatar: 'institution2.jpg',
        type: 'institution'
      }
    ]
  };

  const mockEvents = [
    {
      id: 'event-101',
      title: 'Traditional Weaving Workshop',
      date: { day: '15', month: 'Jun' },
      location: 'Community Cultural Center',
      time: '10:00 AM - 2:00 PM',
      tags: ['Workshop', 'Textiles'],
      image: 'event1.jpg',
      registered: false
    },
    {
      id: 'event-102',
      title: 'Indigenous Storytelling Night',
      date: { day: '22', month: 'Jun' },
      location: 'Riverside Amphitheater',
      time: '6:00 PM - 9:00 PM',
      tags: ['Performance', 'Family'],
      image: 'event2.jpg',
      registered: true
    },
    {
      id: 'event-103',
      title: 'Cultural Food Fair',
      date: { day: '30', month: 'Jun' },
      location: 'Main Square',
      time: '11:00 AM - 7:00 PM',
      tags: ['Food', 'Market'],
      image: 'event3.jpg',
      registered: false
    }
  ];

  // ===== Utility Functions =====
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="toast-icon ${getToastIcon(type)}"></i>
        <span>${message}</span>
      </div>
      <div class="toast-progress"></div>
    `;
    document.body.appendChild(toast);
    
    // Position toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Fade in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 10);
    
    // Progress animation
    const progress = toast.querySelector('.toast-progress');
    progress.style.width = '100%';
    progress.style.transition = 'width 3s linear';
    setTimeout(() => {
      progress.style.width = '0%';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  function getToastIcon(type) {
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
  }

  function updateConnectionStatus(userId, connect) {
    if (connect) {
      if (!dashboardConfig.currentUser.connections.includes(userId)) {
        dashboardConfig.currentUser.connections.push(userId);
        return true;
      }
    } else {
      const index = dashboardConfig.currentUser.connections.indexOf(userId);
      if (index > -1) {
        dashboardConfig.currentUser.connections.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  function updateEventRegistration(eventId, register) {
    if (register) {
      if (!dashboardConfig.currentUser.registeredEvents.includes(eventId)) {
        dashboardConfig.currentUser.registeredEvents.push(eventId);
        return true;
      }
    } else {
      const index = dashboardConfig.currentUser.registeredEvents.indexOf(eventId);
      if (index > -1) {
        dashboardConfig.currentUser.registeredEvents.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  function updateCollaboration(workerId, collaborate) {
    if (collaborate) {
      if (!dashboardConfig.currentUser.collaborations.includes(workerId)) {
        dashboardConfig.currentUser.collaborations.push(workerId);
        return true;
      }
    } else {
      const index = dashboardConfig.currentUser.collaborations.indexOf(workerId);
      if (index > -1) {
        dashboardConfig.currentUser.collaborations.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  function renderMembers(members = mockMembers) {
    const membersGrid = document.querySelector('.members-grid');
    if (!membersGrid) return;
    
    membersGrid.innerHTML = '';
    
    members.forEach(member => {
      const isConnected = dashboardConfig.currentUser.connections.includes(member.id);
      
      const memberCard = document.createElement('div');
      memberCard.className = `member-card ${member.featured ? 'featured' : ''}`;
      memberCard.innerHTML = `
        ${member.new ? '<div class="member-badge">New</div>' : ''}
        ${member.featured ? '<div class="featured-badge">Featured</div>' : ''}
        <div class="member-avatar">
          <img src="${member.avatar}" alt="${member.name}">
          <div class="member-status ${member.status}"></div>
        </div>
        <div class="member-info">
          <h3>${member.name}</h3>
          <p class="member-role"><i class="fas fa-user-tag"></i> ${member.role}</p>
          <p class="member-location"><i class="fas fa-map-marker-alt"></i> ${member.location}</p>
          <div class="member-tags">
            ${member.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="member-actions">
          <button class="connect-btn ${isConnected ? 'connected' : ''}" data-user-id="${member.id}">
            <i class="fas fa-user${isConnected ? '-check' : '-plus'}"></i>
            ${isConnected ? 'Connected' : 'Connect'}
          </button>
          <button class="message-btn" data-user-id="${member.id}">
            <i class="fas fa-envelope"></i>
          </button>
        </div>
      `;
      membersGrid.appendChild(memberCard);
    });
    
    // Reattach event listeners
    attachMemberCardEvents();
  }

  function renderWorkers() {
    const individualsContent = document.getElementById('individuals');
    const organizationsContent = document.getElementById('organizations');
    const institutionsContent = document.getElementById('institutions');
    
    if (individualsContent) {
      individualsContent.innerHTML = `
        <div class="workers-grid">
          ${mockWorkers.individuals.map(worker => `
            <div class="worker-card">
              <div class="worker-image">
                <img src="${worker.avatar}" alt="${worker.name}">
              </div>
              <div class="worker-details">
                <h3>${worker.name}</h3>
                <p class="worker-title"><i class="fas fa-briefcase"></i> ${worker.title}</p>
                <p class="worker-org"><i class="fas fa-building"></i> ${worker.organization}</p>
                <div class="worker-expertise">
                  ${worker.expertise.map(exp => `
                    <span><i class="fas fa-star"></i> ${exp}</span>
                  `).join('')}
                </div>
                <div class="worker-actions">
                  <button class="profile-btn" data-worker-id="${worker.id}">
                    View Profile
                  </button>
                  <button class="collab-btn ${dashboardConfig.currentUser.collaborations.includes(worker.id) ? 'collaborating' : ''}" 
                          data-worker-id="${worker.id}" data-worker-type="${worker.type}">
                    ${dashboardConfig.currentUser.collaborations.includes(worker.id) ? 'Collaborating' : 'Collaborate'}
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    if (organizationsContent) {
      organizationsContent.innerHTML = `
        <div class="workers-grid">
          ${mockWorkers.organizations.map(org => `
            <div class="worker-card">
              <div class="worker-image">
                <img src="${org.avatar}" alt="${org.name}">
              </div>
              <div class="worker-details">
                <h3>${org.name}</h3>
                <p class="worker-title"><i class="fas fa-briefcase"></i> ${org.title}</p>
                <p class="worker-org"><i class="fas fa-building"></i> ${org.organization}</p>
                <div class="worker-expertise">
                  ${org.expertise.map(exp => `
                    <span><i class="fas fa-star"></i> ${exp}</span>
                  `).join('')}
                </div>
                <div class="worker-actions">
                  <button class="profile-btn" data-org-id="${org.id}">
                    View Details
                  </button>
                  <button class="collab-btn" data-org-id="${org.id}" data-worker-type="${org.type}">
                    Partner
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    if (institutionsContent) {
      institutionsContent.innerHTML = `
        <div class="workers-grid">
          ${mockWorkers.institutions.map(inst => `
            <div class="worker-card">
              <div class="worker-image">
                <img src="${inst.avatar}" alt="${inst.name}">
              </div>
              <div class="worker-details">
                <h3>${inst.name}</h3>
                <p class="worker-title"><i class="fas fa-briefcase"></i> ${inst.title}</p>
                <p class="worker-org"><i class="fas fa-building"></i> ${inst.organization}</p>
                <div class="worker-expertise">
                  ${inst.expertise.map(exp => `
                    <span><i class="fas fa-star"></i> ${exp}</span>
                  `).join('')}
                </div>
                <div class="worker-actions">
                  <button class="profile-btn" data-inst-id="${inst.id}">
                    View Details
                  </button>
                  <button class="collab-btn" data-inst-id="${inst.id}" data-worker-type="${inst.type}">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Reattach event listeners
    attachWorkerCardEvents();
  }

  function renderEvents() {
    const eventsSlider = document.querySelector('.events-slider');
    if (!eventsSlider) return;
    
    eventsSlider.innerHTML = '';
    
    mockEvents.forEach(event => {
      const isRegistered = dashboardConfig.currentUser.registeredEvents.includes(event.id);
      
      const eventCard = document.createElement('div');
      eventCard.className = 'event-card';
      eventCard.innerHTML = `
        <div class="event-date">
          <span class="day">${event.date.day}</span>
          <span class="month">${event.date.month}</span>
        </div>
        <div class="event-image">
          <img src="${event.image}" alt="${event.title}">
        </div>
        <div class="event-details">
          <h3>${event.title}</h3>
          <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
          <p class="event-time"><i class="fas fa-clock"></i> ${event.time}</p>
          <div class="event-tags">
            ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <button class="event-btn ${isRegistered ? 'registered' : ''}" data-event-id="${event.id}">
            ${isRegistered ? 'Registered' : 'Register'}
          </button>
        </div>
      `;
      eventsSlider.appendChild(eventCard);
    });
    
    // Reattach event listeners
    attachEventCardEvents();
  }

  // ===== Event Listeners Attachment =====
  function attachMemberCardEvents() {
    document.querySelectorAll('.connect-btn').forEach(button => {
      button.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        const isConnected = this.classList.contains('connected');
        
        if (updateConnectionStatus(userId, !isConnected)) {
          this.classList.toggle('connected');
          this.innerHTML = `
            <i class="fas fa-user-${isConnected ? 'plus' : 'check'}"></i>
            ${isConnected ? 'Connect' : 'Connected'}
          `;
          
          const member = mockMembers.find(m => m.id === userId);
          showToast(
            `${isConnected ? 'Disconnected from' : 'Connected with'} ${member.name}`,
            isConnected ? 'info' : 'success'
          );
        }
      });
    });
    
    document.querySelectorAll('.message-btn').forEach(button => {
      button.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        const member = mockMembers.find(m => m.id === userId);
        showToast(`Opening message thread with ${member.name}`, 'info');
      });
    });
  }

  function attachWorkerCardEvents() {
    document.querySelectorAll('.profile-btn').forEach(button => {
      button.addEventListener('click', function() {
        const workerId = this.getAttribute('data-worker-id') || 
                         this.getAttribute('data-org-id') || 
                         this.getAttribute('data-inst-id');
        
        let worker;
        if (this.hasAttribute('data-worker-id')) {
          worker = mockWorkers.individuals.find(w => w.id === workerId);
        } else if (this.hasAttribute('data-org-id')) {
          worker = mockWorkers.organizations.find(o => o.id === workerId);
        } else {
          worker = mockWorkers.institutions.find(i => i.id === workerId);
        }
        
        showToast(`Viewing profile for ${worker.name}`, 'info');
      });
    });
    
    document.querySelectorAll('.collab-btn').forEach(button => {
      button.addEventListener('click', function() {
        const workerId = this.getAttribute('data-worker-id') || 
                         this.getAttribute('data-org-id') || 
                         this.getAttribute('data-inst-id');
        const workerType = this.getAttribute('data-worker-type');
        const isCollaborating = this.classList.contains('collaborating');
        
        let worker;
        if (workerType === 'individual') {
          worker = mockWorkers.individuals.find(w => w.id === workerId);
        } else if (workerType === 'organization') {
          worker = mockWorkers.organizations.find(o => o.id === workerId);
        } else {
          worker = mockWorkers.institutions.find(i => i.id === workerId);
        }
        
        if (workerType === 'individual') {
          if (updateCollaboration(workerId, !isCollaborating)) {
            this.classList.toggle('collaborating');
            this.textContent = isCollaborating ? 'Collaborate' : 'Collaborating';
            
            showToast(
              `${isCollaborating ? 'Ended collaboration with' : 'Started collaborating with'} ${worker.name}`,
              isCollaborating ? 'info' : 'success'
            );
          }
        } else {
          showToast(
            `Sent partnership request to ${worker.name}`,
            'success'
          );
        }
      });
    });
  }

  function attachEventCardEvents() {
    document.querySelectorAll('.event-btn').forEach(button => {
      button.addEventListener('click', function() {
        const eventId = this.getAttribute('data-event-id');
        const isRegistered = this.classList.contains('registered');
        
        if (updateEventRegistration(eventId, !isRegistered)) {
          this.classList.toggle('registered');
          this.textContent = isRegistered ? 'Register' : 'Registered';
          
          const event = mockEvents.find(e => e.id === eventId);
          showToast(
            `${isRegistered ? 'Cancelled registration for' : 'Successfully registered for'} ${event.title}`,
            isRegistered ? 'info' : 'success'
          );
        }
      });
    });
  }

  // ===== UI Initialization =====
  function initializeUI() {
    // Render initial data
    renderMembers();
    renderWorkers();
    renderEvents();
    
    // Initialize hero slider
    initSlider();
    
    // Initialize tab system
    activateTab('individuals');
    
    // Update community stats
    updateCommunityStats();
  }

  function updateCommunityStats() {
    const membersStat = document.querySelector('.community-stats .stat-item:first-child span');
    const eventsStat = document.querySelector('.community-stats .stat-item:nth-child(2) span');
    
    if (membersStat) membersStat.textContent = dashboardConfig.communityStats.totalMembers.toLocaleString();
    if (eventsStat) eventsStat.textContent = dashboardConfig.communityStats.upcomingEvents.toLocaleString();
  }

  // ===== Core Functionality =====
  function initSlider() {
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;

    function showSlide(index) {
      // Reset all slides
      heroSlides.forEach(slide => slide.classList.remove('active'));
      heroIndicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Handle wrap-around
      if (index >= heroSlides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = heroSlides.length - 1;
      } else {
        currentSlide = index;
      }
      
      // Show current slide
      heroSlides[currentSlide].classList.add('active');
      heroIndicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
      resetTimer();
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
      resetTimer();
    }

    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    function goToSlide(index) {
      showSlide(index);
      resetTimer();
    }

    // Initialize
    showSlide(0);
    slideTimer = setInterval(nextSlide, slideInterval);

    // Event listeners for slider controls
    heroNextBtn.addEventListener('click', nextSlide);
    heroPrevBtn.addEventListener('click', prevSlide);

    heroIndicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
    });

    // Pause on hover
    const heroSection = document.querySelector('.dashboard-hero');
    heroSection.addEventListener('mouseenter', () => clearInterval(slideTimer));
    heroSection.addEventListener('mouseleave', resetTimer);
  }

  function activateTab(tabName) {
    // Deactivate all tabs
    tabLinks.forEach(link => link.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Activate selected tab
    const selectedTabLink = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
    const selectedTabContent = document.getElementById(tabName);
    
    if (selectedTabLink && selectedTabContent) {
      selectedTabLink.classList.add('active');
      selectedTabContent.classList.add('active');
    }
  }

  // ===== Button Functionality =====
  function setupButtonInteractions() {
    // Sidebar toggle
    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    mobileMenuToggle.addEventListener('click', toggleSidebar);

    // Profile dropdown
    profileButton.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleProfileDropdown();
    });

    // Notification dropdown
    notificationBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleNotificationDropdown();
    });

    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleSearch();
    });

    // Filter functionality
    filterBtn.addEventListener('click', handleFilter);
    resetBtn.addEventListener('click', handleResetFilters);

    // Invite functionality
    inviteBtn.addEventListener('click', function() {
      showToast('Invite members feature coming soon!', 'info');
    });

    // View all buttons
    viewAllButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.closest('section').querySelector('h2').textContent;
        showToast(`Viewing all ${section}`, 'info');
      });
    });

    // Logout functionality
    logoutButton.addEventListener('click', handleLogout);
  }

  function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
      showToast(`Searching for: ${query}`, 'info');
      // In a real app, you would perform search here
    } else {
      showToast('Please enter a search term', 'warning');
    }
  }

  function handleFilter() {
    const location = locationFilter.value;
    const role = roleFilter.value;
    const culture = cultureFilter.value;
    
    if (location === 'All Regions' && role === 'All Roles' && culture === 'All Cultures') {
      showToast('Please select at least one filter', 'warning');
      return;
    }
    
    showToast(`Filtering by: ${location}, ${role}, ${culture}`, 'info');
    
    // Filter members based on selections
    const filteredMembers = mockMembers.filter(member => {
      return (location === 'All Regions' || member.location === location) &&
             (role === 'All Roles' || member.role.includes(role)) &&
             (culture === 'All Cultures' || member.culture === culture);
    });
    
    renderMembers(filteredMembers);
  }

  function handleResetFilters() {
    locationFilter.value = 'All Regions';
    roleFilter.value = 'All Roles';
    cultureFilter.value = 'All Cultures';
    showToast('Filters reset', 'info');
    renderMembers();
  }

  function handleLogout(e) {
    e.preventDefault();
    // Confirm logout
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      showToast('Logging out...', 'info');
      // In a real app, you would handle logout here
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    }
  }

  // ===== Initialize Dashboard =====
  function initDashboard() {
    initializeUI();
    setupButtonInteractions();
    
    // Simulate community growth
    setInterval(() => {
      const newMembers = Math.floor(Math.random() * 5) + 1;
      dashboardConfig.communityStats.totalMembers += newMembers;
      updateCommunityStats();
      
      if (newMembers > 3) {
        showToast(`${newMembers} new members joined the community!`, 'success');
      }
    }, 15000); // Update every 15 seconds
  }

  // Start the dashboard
  initDashboard();

  // ===== Advanced Features =====
  // Performance monitoring
  let lastClickTime = 0;
  document.addEventListener('click', function() {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      console.log('Double click detected');
    }
    lastClickTime = now;
  });

  // Error handling
  window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.message);
    showToast('An error occurred. Please try again.', 'error');
  });

  // Resize observer
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      if (entry.contentRect.width < 992) {
        sidebar.classList.remove('active');
        mainContent.style.marginLeft = '0';
      }
    });
  });
  resizeObserver.observe(document.body);

  // Network status monitoring
  window.addEventListener('online', () => {
    showToast('You are back online', 'success');
  });
  window.addEventListener('offline', () => {
    showToast('You are offline. Some features may not work', 'warning');
  });

  // Page Visibility API
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      console.log('User switched tabs');
    } else {
      console.log('User returned to tab');
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl + / to focus search
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      searchInput.focus();
    }
    
    // Esc to close dropdowns
    if (e.key === 'Escape') {
      profileDropdown.classList.remove('show');
      notificationDropdown.classList.remove('show');
    }
  });

  // Dynamic content loading
  function loadMoreContent() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition > pageHeight - 500) {
      showToast('Loading more content...', 'info');
      // In a real app, you would fetch more data here
    }
  }
  window.addEventListener('scroll', loadMoreContent);

  // Theme preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  function updateTheme() {
    if (prefersDark.matches) {
      document.documentElement.style.setProperty('--light-color', '#1a1a1a');
      document.documentElement.style.setProperty('--white', '#2d2d2d');
      document.documentElement.style.setProperty('--gray', '#333');
      document.documentElement.style.setProperty('--text-color', '#f0f0f0');
    }
  }
  prefersDark.addListener(updateTheme);
  updateTheme();
});