class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          padding: 3rem 2rem;
          border-top: 1px solid var(--border-color);
        }
.footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .footer-about {
          max-width: 300px;
        }
        
        .footer-about p {
          color: #D1D5DB;
          margin-bottom: 1.5rem;
        }
        
        .footer-social {
          display: flex;
          gap: 1rem;
        }
        .footer-social a {
          color: var(--text-primary);
          background-color: var(--bg-primary);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          border: 1px solid var(--border-color);
        }
.footer-social a:hover {
          background-color: #10B981;
          transform: translateY(-2px);
        }
        
        .footer-heading {
          font-weight: 600;
          font-size: 1.125rem;
          margin-bottom: 1.25rem;
        }
        
        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .footer-links a {
          color: #D1D5DB;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .footer-links a:hover {
          color: #10B981;
        }
        
        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #D1D5DB;
        }
        
        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 1.5rem;
          margin-top: 3rem;
          text-align: center;
          color: #9CA3AF;
          font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <footer>
        <div class="footer-container">
          <div class="footer-about">
            <div class="footer-logo">
              <i data-feather="leaf"></i>
              KhetiMitra
            </div>
            <p>Empowering farmers with digital tools to grow better crops and increase profits.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook"><i data-feather="facebook"></i></a>
              <a href="#" aria-label="Twitter"><i data-feather="twitter"></i></a>
              <a href="#" aria-label="Instagram"><i data-feather="instagram"></i></a>
              <a href="#" aria-label="YouTube"><i data-feather="youtube"></i></a>
            </div>
          </div>
          
          <div>
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="crops.html">Crop Information</a></li>
              <li><a href="marketplace.html">Marketplace</a></li>
              <li><a href="policies.html">Government Schemes</a></li>
            </ul>
          </div>
          
          
          <div>
            <h3 class="footer-heading">Contact Us</h3>
            <div class="footer-contact-item">
              <i data-feather="mail"></i>
              help@khetimitra.com
            </div>
            <div class="footer-contact-item">
              <i data-feather="phone"></i>
              +91 98765 43210
            </div>
            <div class="footer-contact-item">
              <i data-feather="map-pin"></i>
              123 Farm Road, Agricultural Complex<br>
              New Delhi, India - 110001
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 KhetiMitra. All rights reserved. | <a href="privacy.html" class="hover:text-green-400">Privacy Policy</a> | <a href="terms.html" class="hover:text-green-400">Terms of Service</a></p>
        </div>
      </footer>
      
      <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    `;
    
    // Initialize feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}

customElements.define('custom-footer', CustomFooter);