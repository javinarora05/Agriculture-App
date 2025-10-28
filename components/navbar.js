class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: var(--bg-secondary);
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid var(--border-color);
        }
.logo {
          color: #10B981;
          font-weight: 700;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        .nav-link a {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          position: relative;
        }
.nav-link a:hover {
          color: #10B981;
        }
        
        .nav-link a.active {
          color: #10B981;
          font-weight: 600;
        }
        
        .nav-link a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #10B981;
          transition: width 0.3s;
        }
        
        .nav-link a:hover::after,
        .nav-link a.active::after {
          width: 100%;
        }
        
        .nav-right {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .auth-buttons {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .btn {
          padding: 0.45rem 0.9rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: all 0.2s;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background-color: #10B981;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #0da271;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .btn-outline {
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          background-color: transparent;
        }
.btn-outline:hover {
          border-color: #9CA3AF;
          background-color: #F9FAFB;
        }
        
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          color: #374151;
          cursor: pointer;
        }
        
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          padding: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .mobile-auth-buttons {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
        }
        
        .language-selector {
          margin-left: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          background: var(--bg-secondary); /* match navbar/dark background */
          color: var(--text-primary);
          -webkit-appearance: none; /* nicer cross-browser appearance */
          appearance: none;
        }

        /* user dropdown */
        .user-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
        }

        .user-dropdown {
          position: absolute;
          right: 1rem;
          top: calc(100% + 8px);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 0.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px rgba(0,0,0,0.15);
          display: none;
          min-width: 180px;
        }

        .user-dropdown a, .user-dropdown button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 0.5rem;
          color: var(--text-primary);
          background: transparent;
          border: none;
          text-decoration: none;
        }

        .user-dropdown a:hover, .user-dropdown button:hover { background: rgba(255,255,255,0.03); }
        
        @media (max-width: 1024px) {
          .nav-links, .auth-buttons {
            display: none;
          }
          
          .mobile-menu-button {
            display: block;
          }
        }
        
        @media (min-width: 1025px) {
          .mobile-menu {
            display: none !important;
          }
        }
      </style>
      
      <nav>
        <div style="display:flex;align-items:center;gap:1.25rem;">
          <div class="logo">
            <i data-feather="leaf" class="w-6 h-6"></i>
            KhetiMitra
          </div>
          <ul class="nav-links">
            <li class="nav-link"><a href="/" class="active">Home</a></li>
            <li class="nav-link"><a href="crops.html">Crop Info</a></li>
            <li class="nav-link"><a href="marketplace.html">Marketplace</a></li>
            <li class="nav-link"><a href="ngo-partnerships.html">NGO Partnerships</a></li>
            <li class="nav-link"><a href="reminders.html">SMS Reminders</a></li>
            <li class="nav-link"><a href="disasters.html">Disaster Help</a></li>
            <li class="nav-link"><a href="policies.html">Govt. Schemes</a></li>
          </ul>
        </div>

        <div class="nav-right">
          <select id="language-select" class="language-selector" aria-label="Select language">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>

          <div class="auth-buttons" id="auth-buttons">
            <a href="login.html" class="btn btn-outline">Log In</a>
            <a href="signup.html" class="btn btn-primary">Sign Up</a>
          </div>

          <div class="user-menu hidden" id="user-menu" style="position:relative;">
            <div class="user-toggle" id="user-toggle">
              <span id="user-name" class="text-sm">User</span>
              <i data-feather="chevron-down" class="w-4 h-4" aria-hidden="true"></i>
            </div>
            <div class="user-dropdown" id="user-dropdown" role="menu" aria-hidden="true">
              <a href="profile.html">My Profile</a>
              <a href="orders.html">My Orders</a>
              <button id="logout-btn" class="text-left">Logout</button>
            </div>
          </div>

          <button id="mobile-menu-button" class="mobile-menu-button" aria-expanded="false">
            <i data-feather="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </nav>
      
      <div id="mobile-menu" class="mobile-menu hidden">
        <ul class="mobile-nav-links">
          <li><a href="/" class="active">Home</a></li>
          <li><a href="crops.html">Crop Info</a></li>
          <li><a href="marketplace.html">Marketplace</a></li>
          <li><a href="ngo-partnerships.html">NGO Partnerships</a></li>
          <li><a href="reminders.html">SMS Reminders</a></li>
          <li><a href="disasters.html">Disaster Help</a></li>
          <li><a href="policies.html">Govt. Schemes</a></li>
        </ul>
        <div style="margin-top:0.75rem">
          <label class="block text-sm text-gray-400 mb-2">Language</label>
          <select id="language-select-mobile" class="language-selector" style="width:100%;">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>

        <div class="mobile-auth-buttons" style="margin-top:0.75rem">
          <a href="login.html" class="btn btn-outline w-full">Log In</a>
          <a href="signup.html" class="btn btn-primary w-full">Sign Up</a>
        </div>

        <div class="mobile-user-menu hidden" id="mobile-user-menu" style="margin-top:0.75rem">
          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            <a href="profile.html" class="btn btn-outline w-full">My Profile</a>
            <a href="orders.html" class="btn btn-outline w-full">My Orders</a>
            <button id="mobile-logout-btn" class="btn btn-primary w-full">Logout</button>
          </div>
        </div>
      </div>
      
      <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    `;
    
    // Initialize feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
    
    // Language switching functionality
    const languageSelect = this.shadowRoot.getElementById('language-select');
    const translations = {
      en: {
        home: 'Home',
        cropInfo: 'Crop Info',
        marketplace: 'Marketplace',
        ngoPartnerships: 'NGO Partnerships',
        smsReminders: 'SMS Reminders',
        disasterHelp: 'Disaster Help',
        govtSchemes: 'Govt. Schemes',
        logIn: 'Log In',
        signUp: 'Sign Up',
        logout: 'Logout'
      },
      hi: {
        home: 'होम',
        cropInfo: 'फसल जानकारी',
        marketplace: 'बाजार',
        ngoPartnerships: 'एनजीओ साझेदारी',
        smsReminders: 'एसएमएस रिमाइंडर',
        disasterHelp: 'आपदा सहायता',
        govtSchemes: 'सरकारी योजनाएं',
        logIn: 'लॉग इन',
        signUp: 'साइन अप',
        logout: 'लॉग आउट'
      }
    };
    
    // Page-specific translations (moved to top-level so other helpers can use them)
    const pageTranslations = {
      'index.html': {
        en: {
          'welcome-title': 'Empowering Farmers with Digital Tools',
          'welcome-subtitle': 'Access crop information, marketplace, weather alerts, and government schemes - all in one place.',
          'get-started': 'Explore Features',
          'learn-more': 'Learn More'
        },
        hi: {
          'welcome-title': 'डिजिटल उपकरणों के साथ किसानों को सशक्त बनाना',
          'welcome-subtitle': 'फसल जानकारी, बाजार, मौसम अलर्ट और सरकारी योजनाओं तक पहुंचें - सब एक जगह।',
          'get-started': 'फीचर्स एक्सप्लोर करें',
          'learn-more': 'और जानें'
        }
      },
      'reminders.html': {
        en: {
          'page-title': 'SMS Reminder System',
          'page-subtitle': 'Get timely alerts for your crops based on growth stages and weather conditions',
          'add-crop-title': 'Add New Crop',
          'crop-type-label': 'Crop Type',
          'planting-date-label': 'Planting Date',
          'field-size-label': 'Field Size (hectares)',
          'location-label': 'Location',
          'phone-label': 'Phone Number',
          'language-label': 'SMS Language',
          'reminder-types': 'Reminder Types',
          'watering': 'Watering reminders',
          'fertilizer': 'Fertilizer application',
          'pest': 'Pest monitoring',
          'weather': 'Weather warnings',
          'harvest': 'Harvest notification',
          'save-button': 'Save Crop & Start Reminders',
          'active-crops': 'Your Active Crops',
          'crops-tracked': 'crops being tracked',
          'no-crops': 'No crops being tracked',
          'add-first-crop': 'Add your first crop to start receiving SMS reminders'
        },
        hi: {
          'page-title': 'एसएमएस रिमाइंडर सिस्टम',
          'page-subtitle': 'फसलों की वृद्धि अवस्था और मौसम की स्थिति के आधार पर समय पर अलर्ट प्राप्त करें',
          'add-crop-title': 'नई फसल जोड़ें',
          'crop-type-label': 'फसल का प्रकार',
          'planting-date-label': 'बुवाई की तारीख',
          'field-size-label': 'खेत का आकार (हेक्टेयर)',
          'location-label': 'स्थान',
          'phone-label': 'फोन नंबर',
          'language-label': 'एसएमएस भाषा',
          'reminder-types': 'रिमाइंडर के प्रकार',
          'watering': 'सिंचाई रिमाइंडर',
          'fertilizer': 'उर्वरक अनुप्रयोग',
          'pest': 'कीट निगरानी',
          'weather': 'मौसम चेतावनी',
          'harvest': 'फसल कटाई सूचना',
          'save-button': 'फसल सहेजें और रिमाइंडर शुरू करें',
          'active-crops': 'आपकी सक्रिय फसलें',
          'crops-tracked': 'फसलों पर नज़र रखी जा रही है',
          'no-crops': 'कोई फसल नहीं ट्रैक की जा रही',
          'add-first-crop': 'एसएमएस रिमाइंडर प्राप्त करना शुरू करने के लिए अपनी पहली फसल जोड़ें'
        }
      },
      'login.html': {
        en: {
          'page-title': 'Login to KhetiMitra',
          'page-subtitle': 'Access your farming dashboard and manage your crops',
          'email': 'Email Address',
          'password': 'Password',
          'remember-me': 'Remember me',
          'forgot-password': 'Forgot Password?',
          'login-button': 'Login',
          'or-divider': 'Or continue with',
          'no-account': "Don't have an account?",
          'signup-link': 'Sign up here'
        },
        hi: {
          'page-title': 'फार्मफेलो में लॉग इन करें',
          'page-subtitle': 'अपने कृषि डैशबोर्ड तक पहुंचें और अपनी फसलों का प्रबंधन करें',
          'email': 'ईमेल पता',
          'password': 'पासवर्ड',
          'remember-me': 'मुझे याद रखें',
          'forgot-password': 'पासवर्ड भूल गए?',
          'login-button': 'लॉग इन',
          'or-divider': 'या इसके साथ जारी रखें',
          'no-account': 'खाता नहीं है?',
          'signup-link': 'यहां साइन अप करें'
        }
      },
      'signup.html': {
        en: {
          'page-title': 'Join KhetiMitra',
          'page-subtitle': 'Create your account and start your digital farming journey',
          'full-name': 'Full Name',
          'email': 'Email Address',
          'password': 'Password',
          'confirm-password': 'Confirm Password',
          'terms': 'I agree to the Terms and Conditions',
          'signup-button': 'Create Account',
          'or-divider': 'Or sign up with',
          'have-account': 'Already have an account?',
          'login-link': 'Login here'
        },
        hi: {
          'page-title': 'फार्मफेलो में शामिल हों',
          'page-subtitle': 'अपना खाता बनाएं और अपनी डिजिटल कृषि यात्रा शुरू करें',
          'full-name': 'पूरा नाम',
          'email': 'ईमेल पता',
          'password': 'पासवर्ड',
          'confirm-password': 'पासवर्ड की पुष्टि करें',
          'terms': 'मैं नियम और शर्तों से सहमत हूं',
          'signup-button': 'खाता बनाएं',
          'or-divider': 'या इसके साथ साइन अप करें',
          'have-account': 'पहले से खाता है?',
          'login-link': 'यहां लॉग इन करें'
        }
      },
      'profile.html': {
        en: {
          'page-title': 'Complete Your Profile',
          'page-subtitle': 'Help us personalize your farming experience',
          'farm-name': 'Farm Name',
          'farm-size': 'Farm Size (acres)',
          'address': 'Address',
          'state': 'State',
          'district': 'District',
          'pincode': 'Pincode',
          'phone': 'Phone Number',
          'crops-grown': 'Crops You Grow',
          'experience': 'Farming Experience',
          'irrigation': 'Irrigation Method',
          'newsletter': 'Subscribe to newsletter',
          'save-button': 'Save Profile',
          'skip-button': 'Skip for now'
        },
        hi: {
          'page-title': 'अपनी प्रोफाइल पूरी करें',
          'page-subtitle': 'हमें अपने कृषि अनुभव को व्यक्तिगत बनाने में मदद करें',
          'farm-name': 'खेत का नाम',
          'farm-size': 'खेत का आकार (एकड़)',
          'address': 'पता',
          'state': 'राज्य',
          'district': 'जिला',
          'pincode': 'पिनकोड',
          'phone': 'फोन नंबर',
          'crops-grown': 'आप जो फसलें उगाते हैं',
          'experience': 'कृषि अनुभव',
          'irrigation': 'सिंचाई विधि',
          'newsletter': 'न्यूज़लेटर की सदस्यता लें',
          'save-button': 'प्रोफाइल सहेजें',
          'skip-button': 'अभी के लिए छोड़ें'
        }
      },
      'marketplace.html': {
        en: {
          'page-title': 'Farm Marketplace',
          'page-subtitle': 'Buy quality seeds, fertilizers, and farming equipment',
          'all-categories': 'All Categories',
          'all-companies': 'All Companies',
          'all-types': 'All Types',
          'sort-by': 'Sort by',
          'price-range': 'Price Range',
          'search-placeholder': 'Search products...',
          'add-to-cart': 'Add to Cart',
          'view-details': 'View Details'
        },
        hi: {
          'page-title': 'कृषि बाजार',
          'page-subtitle': 'गुणवत्तापूर्ण बीज, उर्वरक और कृषि उपकरण खरीदें',
          'all-categories': 'सभी श्रेणियां',
          'all-companies': 'सभी कंपनियां',
          'all-types': 'सभी प्रकार',
          'sort-by': 'क्रमबद्ध करें',
          'price-range': 'मूल्य सीमा',
          'search-placeholder': 'उत्पाद खोजें...',
          'add-to-cart': 'कार्ट में जोड़ें',
          'view-details': 'विवरण देखें'
        }
      },
      'crops.html': {
        en: {
          'page-title': 'Crop Information',
          'page-subtitle': 'Learn about different crops, their cultivation, and best practices',
          'all-categories': 'All Categories',
          'search-placeholder': 'Search crops...',
          'learn-more': 'Learn More',
          'planting-season': 'Planting Season',
          'harvest-time': 'Harvest Time',
          'water-requirements': 'Water Requirements'
        },
        hi: {
          'page-title': 'फसल जानकारी',
          'page-subtitle': 'विभिन्न फसलों, उनकी खेती और सर्वोत्तम प्रथाओं के बारे में जानें',
          'all-categories': 'सभी श्रेणियां',
          'search-placeholder': 'फसलें खोजें...',
          'learn-more': 'और जानें',
          'planting-season': 'बुवाई का मौसम',
          'harvest-time': 'कटाई का समय',
          'water-requirements': 'पानी की आवश्यकता'
        }
      },
      'disasters.html': {
        en: {
          'page-title': 'Disaster Management',
          'page-subtitle': 'Get help and guidance during agricultural disasters',
          'flood-protection': 'Flood Protection',
          'drought-management': 'Drought Management',
          'pest-outbreaks': 'Pest Outbreaks',
          'disease-control': 'Disease Control',
          'hailstorm-protection': 'Hailstorm Protection',
          'heat-wave': 'Heat Wave',
          'learn-more': 'Learn More',
          'download-resources': 'Download Resources'
        },
        hi: {
          'page-title': 'आपदा प्रबंधन',
          'page-subtitle': 'कृषि आपदाओं के दौरान सहायता और मार्गदर्शन प्राप्त करें',
          'flood-protection': 'बाढ़ सुरक्षा',
          'drought-management': 'सूखा प्रबंधन',
          'pest-outbreaks': 'कीट प्रकोप',
          'disease-control': 'रोग नियंत्रण',
          'hailstorm-protection': 'ओलावृष्टि सुरक्षा',
          'heat-wave': 'लू',
          'learn-more': 'और जानें',
          'download-resources': 'संसाधन डाउनलोड करें'
        }
      }
    ,
      'ngo-partnerships.html': {
        en: {
          'hero-title': 'NGO Partnerships',
          'hero-subtitle': 'Partner with KhetiMitra to expand outreach, deliver farmer education, and bring practical digital resources to farmers in your region.',
          'partner-cta': 'Partner Now',
          'learn-benefits': 'Learn Benefits',
          'benefits-title': 'Mutual Benefits of Partnership',
          'connect-title': 'Connect with Us',
          'faq-title': 'FAQ'
        },
        hi: {
          'hero-title': 'एनजीओ साझेदारी',
          'hero-subtitle': 'अपनी पहुंच बढ़ाने, किसान शिक्षा प्रदान करने और आपके क्षेत्र के किसानों तक डिजिटल संसाधन पहुंचाने के लिए KhetiMitra के साथ साझेदारी करें।',
          'partner-cta': 'अभी साझेदारी करें',
          'learn-benefits': 'लाभ जानें',
          'benefits-title': 'साझेदारी के पारस्परिक लाभ',
          'connect-title': 'हमसे जुड़ें',
          'faq-title': 'अक्सर पूछे जाने वाले प्रश्न'
        }
      },
      'orders.html': {
        en: {
          'page-title': 'My Orders'
        },
        hi: {
          'page-title': 'मेरे ऑर्डर'
        }
      }
    };
    
    function updateLanguage(lang) {
      const t = translations[lang] || translations.en;

      // Update navigation links by href (robust to insertion/removal of links)
      const navLinks = this.shadowRoot.querySelectorAll('.nav-link a');
      navLinks.forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href.includes('crops.html')) a.textContent = t.cropInfo;
        else if (href.includes('marketplace.html')) a.textContent = t.marketplace;
        else if (href.includes('ngo-partnerships.html')) a.textContent = t.ngoPartnerships || 'NGO Partnerships';
        else if (href.includes('reminders.html')) a.textContent = t.smsReminders;
        else if (href.includes('disasters.html')) a.textContent = t.disasterHelp;
        else if (href.includes('policies.html')) a.textContent = t.govtSchemes;
        else a.textContent = t.home;
      });

      // Update auth buttons
      const authButtons = this.shadowRoot.querySelectorAll('.auth-buttons a');
      if (authButtons.length >= 2) {
        authButtons[0].textContent = t.logIn;
        authButtons[1].textContent = t.signUp;
      }
      
      // Update user menu
      const logoutBtn = this.shadowRoot.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.textContent = t.logout;
      }
      
      // Update mobile menu links by href as well
      const mobileLinks = this.shadowRoot.querySelectorAll('.mobile-nav-links a');
      mobileLinks.forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href.includes('crops.html')) a.textContent = t.cropInfo;
        else if (href.includes('marketplace.html')) a.textContent = t.marketplace;
        else if (href.includes('ngo-partnerships.html')) a.textContent = t.ngoPartnerships || 'NGO Partnerships';
        else if (href.includes('reminders.html')) a.textContent = t.smsReminders;
        else if (href.includes('disasters.html')) a.textContent = t.disasterHelp;
        else if (href.includes('policies.html')) a.textContent = t.govtSchemes;
        else a.textContent = t.home;
      });
      
      const mobileAuthButtons = this.shadowRoot.querySelectorAll('.mobile-auth-buttons a');
      if (mobileAuthButtons.length >= 2) {
        mobileAuthButtons[0].textContent = t.logIn;
        mobileAuthButtons[1].textContent = t.signUp;
      }
      
      // Store language preference
      localStorage.setItem('language', lang);
      
      // Update all pages
      updateAllPagesLanguage(lang);
    }
    
    function updateAllPagesLanguage(lang) {
      const t = translations[lang] || translations.en;
      
      // Update page titles and content
      const pageElements = document.querySelectorAll('[data-translate]');
      pageElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
          element.textContent = t[key];
        }
      });
      
      // Update form labels and placeholders
      const formElements = document.querySelectorAll('[data-translate-placeholder]');
      formElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (t[key]) {
          element.placeholder = t[key];
        }
      });

      // Build a flat English->target-language map from our translations so
      // plain paragraph/heading text (not tagged with IDs) can be replaced.
      // This does an exact-match replacement on text nodes, so it is safe
      // (won't attempt to machine-translate) and won't touch inputs/scripts.
      try {
        const flatMap = {};

        // include top-level nav/common translations (map their english values)
        if (translations && translations.en) {
          Object.keys(translations.en).forEach(k => {
            const enText = translations.en[k];
            const newText = (translations[lang] && translations[lang][k]) ? translations[lang][k] : enText;
            if (enText && typeof enText === 'string') flatMap[enText] = newText;
          });
        }

        // include all pageTranslations (en -> lang)
        Object.keys(pageTranslations || {}).forEach(pageKey => {
          const enObj = (pageTranslations[pageKey] && pageTranslations[pageKey].en) || {};
          const targObj = (pageTranslations[pageKey] && pageTranslations[pageKey][lang]) || {};
          Object.keys(enObj).forEach(k => {
            const enText = enObj[k];
            const newText = targObj[k] || enText;
            if (enText && typeof enText === 'string') flatMap[enText] = newText;
          });
        });

        // Walk text nodes in the document body and replace exact matches.
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
          const raw = node.nodeValue;
          if (!raw || !raw.trim()) continue;
          const parent = node.parentElement;
          if (!parent) continue;
          const pt = parent.tagName && parent.tagName.toLowerCase();
          // skip script/style/code/pre/noscript and form controls
          if (['script', 'style', 'code', 'pre', 'noscript'].includes(pt)) continue;
          if (parent.closest && parent.closest('script,style,code,pre,noscript')) continue;
          if (['input', 'textarea', 'option'].includes(pt)) continue;

          // Use trimmed exact-match replacement to avoid partial/substring mistakes
          const trimmed = raw.trim();
          if (flatMap[trimmed]) {
            // preserve leading/trailing whitespace
            const leading = raw.match(/^\s*/)[0] || '';
            const trailing = raw.match(/\s*$/)[0] || '';
            node.nodeValue = leading + flatMap[trimmed] + trailing;
          }
        }
      } catch (e) {
        // if the DOM walker fails for any reason, don't block translation of
        // tagged elements — silently continue.
        console.warn('Text-node translation failed:', e);
      }
      
      // Update specific page content based on current page
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      updatePageContent(currentPage, lang);
    }
    
    function updatePageContent(page, lang) {
      const t = translations[lang] || translations.en;
      
      // Common translations for all pages
      const commonTranslations = {
        en: {
          // Add common English translations here
        },
        hi: {
          // Add common Hindi translations here
        }
      };
      
      // Page-specific translations
      const pageTranslations = {
        'index.html': {
          en: {
            'welcome-title': 'Empowering Farmers with Digital Tools',
            'welcome-subtitle': 'Access crop information, marketplace, weather alerts, and government schemes - all in one place.',
            'get-started': 'Explore Features',
            'learn-more': 'Learn More'
          },
          hi: {
            'welcome-title': 'डिजिटल उपकरणों के साथ किसानों को सशक्त बनाना',
            'welcome-subtitle': 'फसल जानकारी, बाजार, मौसम अलर्ट और सरकारी योजनाओं तक पहुंचें - सब एक जगह।',
            'get-started': 'फीचर्स एक्सप्लोर करें',
            'learn-more': 'और जानें'
          }
        },
        'reminders.html': {
          en: {
            'page-title': 'SMS Reminder System',
            'page-subtitle': 'Get timely alerts for your crops based on growth stages and weather conditions',
            'add-crop-title': 'Add New Crop',
            'crop-type-label': 'Crop Type',
            'planting-date-label': 'Planting Date',
            'field-size-label': 'Field Size (hectares)',
            'location-label': 'Location',
            'phone-label': 'Phone Number',
            'language-label': 'SMS Language',
            'reminder-types': 'Reminder Types',
            'watering': 'Watering reminders',
            'fertilizer': 'Fertilizer application',
            'pest': 'Pest monitoring',
            'weather': 'Weather warnings',
            'harvest': 'Harvest notification',
            'save-button': 'Save Crop & Start Reminders',
            'active-crops': 'Your Active Crops',
            'crops-tracked': 'crops being tracked',
            'no-crops': 'No crops being tracked',
            'add-first-crop': 'Add your first crop to start receiving SMS reminders'
          },
          hi: {
            'page-title': 'एसएमएस रिमाइंडर सिस्टम',
            'page-subtitle': 'फसलों की वृद्धि अवस्था और मौसम की स्थिति के आधार पर समय पर अलर्ट प्राप्त करें',
            'add-crop-title': 'नई फसल जोड़ें',
            'crop-type-label': 'फसल का प्रकार',
            'planting-date-label': 'बुवाई की तारीख',
            'field-size-label': 'खेत का आकार (हेक्टेयर)',
            'location-label': 'स्थान',
            'phone-label': 'फोन नंबर',
            'language-label': 'एसएमएस भाषा',
            'reminder-types': 'रिमाइंडर के प्रकार',
            'watering': 'सिंचाई रिमाइंडर',
            'fertilizer': 'उर्वरक अनुप्रयोग',
            'pest': 'कीट निगरानी',
            'weather': 'मौसम चेतावनी',
            'harvest': 'फसल कटाई सूचना',
            'save-button': 'फसल सहेजें और रिमाइंडर शुरू करें',
            'active-crops': 'आपकी सक्रिय फसलें',
            'crops-tracked': 'फसलों पर नज़र रखी जा रही है',
            'no-crops': 'कोई फसल नहीं ट्रैक की जा रही',
            'add-first-crop': 'एसएमएस रिमाइंडर प्राप्त करना शुरू करने के लिए अपनी पहली फसल जोड़ें'
          }
        },
        'login.html': {
          en: {
            'page-title': 'Login to KhetiMitra',
            'page-subtitle': 'Access your farming dashboard and manage your crops',
            'email': 'Email Address',
            'password': 'Password',
            'remember-me': 'Remember me',
            'forgot-password': 'Forgot Password?',
            'login-button': 'Login',
            'or-divider': 'Or continue with',
            'no-account': "Don't have an account?",
            'signup-link': 'Sign up here'
          },
          hi: {
            'page-title': 'फार्मफेलो में लॉग इन करें',
            'page-subtitle': 'अपने कृषि डैशबोर्ड तक पहुंचें और अपनी फसलों का प्रबंधन करें',
            'email': 'ईमेल पता',
            'password': 'पासवर्ड',
            'remember-me': 'मुझे याद रखें',
            'forgot-password': 'पासवर्ड भूल गए?',
            'login-button': 'लॉग इन',
            'or-divider': 'या इसके साथ जारी रखें',
            'no-account': 'खाता नहीं है?',
            'signup-link': 'यहां साइन अप करें'
          }
        },
        'signup.html': {
          en: {
            'page-title': 'Join KhetiMitra',
            'page-subtitle': 'Create your account and start your digital farming journey',
            'full-name': 'Full Name',
            'email': 'Email Address',
            'password': 'Password',
            'confirm-password': 'Confirm Password',
            'terms': 'I agree to the Terms and Conditions',
            'signup-button': 'Create Account',
            'or-divider': 'Or sign up with',
            'have-account': 'Already have an account?',
            'login-link': 'Login here'
          },
          hi: {
            'page-title': 'फार्मफेलो में शामिल हों',
            'page-subtitle': 'अपना खाता बनाएं और अपनी डिजिटल कृषि यात्रा शुरू करें',
            'full-name': 'पूरा नाम',
            'email': 'ईमेल पता',
            'password': 'पासवर्ड',
            'confirm-password': 'पासवर्ड की पुष्टि करें',
            'terms': 'मैं नियम और शर्तों से सहमत हूं',
            'signup-button': 'खाता बनाएं',
            'or-divider': 'या इसके साथ साइन अप करें',
            'have-account': 'पहले से खाता है?',
            'login-link': 'यहां लॉग इन करें'
          }
        },
        'profile.html': {
          en: {
            'page-title': 'Complete Your Profile',
            'page-subtitle': 'Help us personalize your farming experience',
            'farm-name': 'Farm Name',
            'farm-size': 'Farm Size (acres)',
            'address': 'Address',
            'state': 'State',
            'district': 'District',
            'pincode': 'Pincode',
            'phone': 'Phone Number',
            'crops-grown': 'Crops You Grow',
            'experience': 'Farming Experience',
            'irrigation': 'Irrigation Method',
            'newsletter': 'Subscribe to newsletter',
            'save-button': 'Save Profile',
            'skip-button': 'Skip for now'
          },
          hi: {
            'page-title': 'अपनी प्रोफाइल पूरी करें',
            'page-subtitle': 'हमें अपने कृषि अनुभव को व्यक्तिगत बनाने में मदद करें',
            'farm-name': 'खेत का नाम',
            'farm-size': 'खेत का आकार (एकड़)',
            'address': 'पता',
            'state': 'राज्य',
            'district': 'जिला',
            'pincode': 'पिनकोड',
            'phone': 'फोन नंबर',
            'crops-grown': 'आप जो फसलें उगाते हैं',
            'experience': 'कृषि अनुभव',
            'irrigation': 'सिंचाई विधि',
            'newsletter': 'न्यूज़लेटर की सदस्यता लें',
            'save-button': 'प्रोफाइल सहेजें',
            'skip-button': 'अभी के लिए छोड़ें'
          }
        },
        'marketplace.html': {
          en: {
            'page-title': 'Farm Marketplace',
            'page-subtitle': 'Buy quality seeds, fertilizers, and farming equipment',
            'all-categories': 'All Categories',
            'all-companies': 'All Companies',
            'all-types': 'All Types',
            'sort-by': 'Sort by',
            'price-range': 'Price Range',
            'search-placeholder': 'Search products...',
            'add-to-cart': 'Add to Cart',
            'view-details': 'View Details'
          },
          hi: {
            'page-title': 'कृषि बाजार',
            'page-subtitle': 'गुणवत्तापूर्ण बीज, उर्वरक और कृषि उपकरण खरीदें',
            'all-categories': 'सभी श्रेणियां',
            'all-companies': 'सभी कंपनियां',
            'all-types': 'सभी प्रकार',
            'sort-by': 'क्रमबद्ध करें',
            'price-range': 'मूल्य सीमा',
            'search-placeholder': 'उत्पाद खोजें...',
            'add-to-cart': 'कार्ट में जोड़ें',
            'view-details': 'विवरण देखें'
          }
        },
        'crops.html': {
          en: {
            'page-title': 'Crop Information',
            'page-subtitle': 'Learn about different crops, their cultivation, and best practices',
            'all-categories': 'All Categories',
            'search-placeholder': 'Search crops...',
            'learn-more': 'Learn More',
            'planting-season': 'Planting Season',
            'harvest-time': 'Harvest Time',
            'water-requirements': 'Water Requirements'
          },
          hi: {
            'page-title': 'फसल जानकारी',
            'page-subtitle': 'विभिन्न फसलों, उनकी खेती और सर्वोत्तम प्रथाओं के बारे में जानें',
            'all-categories': 'सभी श्रेणियां',
            'search-placeholder': 'फसलें खोजें...',
            'learn-more': 'और जानें',
            'planting-season': 'बुवाई का मौसम',
            'harvest-time': 'कटाई का समय',
            'water-requirements': 'पानी की आवश्यकता'
          }
        },
        'disasters.html': {
          en: {
            'page-title': 'Disaster Management',
            'page-subtitle': 'Get help and guidance during agricultural disasters',
            'flood-protection': 'Flood Protection',
            'drought-management': 'Drought Management',
            'pest-outbreaks': 'Pest Outbreaks',
            'disease-control': 'Disease Control',
            'hailstorm-protection': 'Hailstorm Protection',
            'heat-wave': 'Heat Wave',
            'learn-more': 'Learn More',
            'download-resources': 'Download Resources'
          },
          hi: {
            'page-title': 'आपदा प्रबंधन',
            'page-subtitle': 'कृषि आपदाओं के दौरान सहायता और मार्गदर्शन प्राप्त करें',
            'flood-protection': 'बाढ़ सुरक्षा',
            'drought-management': 'सूखा प्रबंधन',
            'pest-outbreaks': 'कीट प्रकोप',
            'disease-control': 'रोग नियंत्रण',
            'hailstorm-protection': 'ओलावृष्टि सुरक्षा',
            'heat-wave': 'लू',
            'learn-more': 'और जानें',
            'download-resources': 'संसाधन डाउनलोड करें'
          }
        }
      ,
      'ngo-partnerships.html': {
        en: {
          'hero-title': 'NGO Partnerships',
          'hero-subtitle': 'Partner with KhetiMitra to expand outreach, deliver farmer education, and bring practical digital resources to farmers in your region.',
          'partner-cta': 'Partner Now',
          'learn-benefits': 'Learn Benefits',
          'benefits-title': 'Mutual Benefits of Partnership',
          'connect-title': 'Connect with Us',
          'faq-title': 'FAQ'
        },
        hi: {
          'hero-title': 'एनजीओ साझेदारी',
          'hero-subtitle': 'अपनी पहुंच बढ़ाने, किसान शिक्षा प्रदान करने और आपके क्षेत्र के किसानों तक डिजिटल संसाधन पहुंचाने के लिए KhetiMitra के साथ साझेदारी करें।',
          'partner-cta': 'अभी साझेदारी करें',
          'learn-benefits': 'लाभ जानें',
          'benefits-title': 'साझेदारी के पारस्परिक लाभ',
          'connect-title': 'हमसे जुड़ें',
          'faq-title': 'अक्सर पूछे जाने वाले प्रश्न'
        }
      },
      'orders.html': {
        en: {
          'page-title': 'My Orders'
        },
        hi: {
          'page-title': 'मेरे ऑर्डर'
        }
      }
      };
      
      const currentTranslations = pageTranslations[page];
      if (currentTranslations && currentTranslations[lang]) {
        const pageT = currentTranslations[lang];
        
        // Update elements by ID
        Object.keys(pageT).forEach(key => {
          const element = document.getElementById(key);
          if (element) {
            element.textContent = pageT[key];
          }
        });
        
        // Update elements by class
        Object.keys(pageT).forEach(key => {
          const elements = document.querySelectorAll(`.${key}`);
          elements.forEach(element => {
            element.textContent = pageT[key];
          });
        });
      }
    }
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLanguage;
    updateLanguage.call(this, savedLanguage);

    // Handle language change (desktop)
    languageSelect.addEventListener('change', (e) => {
      updateLanguage.call(this, e.target.value);
    });

    // Mobile language selector (inside mobile menu)
    const languageSelectMobile = this.shadowRoot.getElementById('language-select-mobile');
    if (languageSelectMobile) {
      languageSelectMobile.value = savedLanguage;
      languageSelectMobile.addEventListener('change', (e) => {
        // keep both selectors in sync
        languageSelect.value = e.target.value;
        updateLanguage.call(this, e.target.value);
      });
    }
    
    // Authentication state management
    function updateAuthState() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      const authButtons = this.shadowRoot.getElementById('auth-buttons');
      const userMenu = this.shadowRoot.getElementById('user-menu');
      const userName = this.shadowRoot.getElementById('user-name');
      const mobileAuth = this.shadowRoot.querySelector('.mobile-auth-buttons');
      const mobileUser = this.shadowRoot.getElementById('mobile-user-menu');

      if (isLoggedIn && userData.name) {
        authButtons.classList.add('hidden');
        userMenu.classList.remove('hidden');
        if (userName) userName.textContent = userData.name;
        if (mobileAuth) mobileAuth.classList.add('hidden');
        if (mobileUser) mobileUser.classList.remove('hidden');
      } else {
        authButtons.classList.remove('hidden');
        userMenu.classList.add('hidden');
        if (mobileAuth) mobileAuth.classList.remove('hidden');
        if (mobileUser) mobileUser.classList.add('hidden');
      }
    }
    
    // Initialize auth state
    updateAuthState.call(this);
    
    // Handle logout
    const logoutBtn = this.shadowRoot.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('hasProfile');
        updateAuthState.call(this);
        window.location.href = 'index.html';
      });
    }

    // Mobile logout
    const mobileLogout = this.shadowRoot.getElementById('mobile-logout-btn');
    if (mobileLogout) {
      mobileLogout.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('hasProfile');
        updateAuthState.call(this);
        window.location.href = 'index.html';
      });
    }

    // User dropdown toggle
    const userToggle = this.shadowRoot.getElementById('user-toggle');
    const userDropdown = this.shadowRoot.getElementById('user-dropdown');
    if (userToggle && userDropdown) {
      userToggle.addEventListener('click', (e) => {
        const isHidden = userDropdown.style.display === 'none' || userDropdown.style.display === '';
        userDropdown.style.display = isHidden ? 'block' : 'none';
        userDropdown.setAttribute('aria-hidden', !isHidden);
      });
      // close when clicking outside
      document.addEventListener('click', (ev) => {
        const path = ev.composedPath ? ev.composedPath() : ev.path || [];
        if (!path.includes(userDropdown) && !path.includes(userToggle)) {
          userDropdown.style.display = 'none';
          userDropdown.setAttribute('aria-hidden', 'true');
        }
      });
    }
    
    // Mobile menu functionality
    const mobileMenuButton = this.shadowRoot.getElementById('mobile-menu-button');
    const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isOpen);
      });
    }
  }
}

customElements.define('custom-navbar', CustomNavbar);