class QRCheckout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .qr-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .qr-modal.active {
          opacity: 1;
          pointer-events: all;
        }
        
        .qr-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          max-width: 420px;
          width: 92%;
        }
        
        .qr-image {
          width: 100%;
          max-width: 280px;
          margin: 1rem auto;
        }
        
        .btn-row { display:flex; gap:0.5rem; justify-content:center; margin-top:1rem }
        .btn { padding:0.5rem 1rem; border-radius:0.5rem; border:none; cursor:pointer }
        .btn-primary { background:#10B981; color:white }
        .btn-secondary { background:#E5E7EB }
      </style>
      
      <div class="qr-modal">
        <div class="qr-content">
          <h3>Scan to Pay</h3>
          <p>Use any UPI app to scan this QR code</p>
          <img class="qr-image" alt="UPI QR Code">
          <div class="btn-row">
            <button class="btn btn-primary paid-btn">I have paid</button>
            <button class="btn btn-secondary cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    `;

    // references will be resolved in connectedCallback
    this._onPaid = this._onPaid.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  connectedCallback() {
    const paidBtn = this.shadowRoot.querySelector('.paid-btn');
    const cancelBtn = this.shadowRoot.querySelector('.cancel-btn');
    paidBtn.addEventListener('click', this._onPaid);
    cancelBtn.addEventListener('click', this._onCancel);
  }

  disconnectedCallback() {
    const paidBtn = this.shadowRoot.querySelector('.paid-btn');
    const cancelBtn = this.shadowRoot.querySelector('.cancel-btn');
    if (paidBtn) paidBtn.removeEventListener('click', this._onPaid);
    if (cancelBtn) cancelBtn.removeEventListener('click', this._onCancel);
  }

  _onPaid() {
    // Dispatch a custom event to let the page save the order
    this.dispatchEvent(new CustomEvent('qr-payment-success', { bubbles: true, composed: true }));
    this.hide();
  }

  _onCancel() {
    this.hide();
  }

  show() {
    // Update QR image dynamically from current amount attribute
    const amount = this.getAttribute('amount') || '0';
    const qrImg = this.shadowRoot.querySelector('.qr-image');
  const upi = `upi://pay?pa=khetimitra@upi&pn=KhetiMitra&am=${amount}&cu=INR`;
    qrImg.src = `https://github.com/javinarora05/Agriculture-App/blob/main/upi.jpg?raw=true${encodeURIComponent(upi)}`;

    this.shadowRoot.querySelector('.qr-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.shadowRoot.querySelector('.qr-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
}


customElements.define('qr-checkout', QRCheckout);
