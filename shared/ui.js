(function (global) {
  const LR = (global.LR = global.LR || {});

  LR.ui = {
    escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, (c) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
      );
    },

    formatMoney(amount) {
      return '$' + Number(amount).toLocaleString();
    },

    showView(view, el, navSelector) {
      document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
      document.getElementById('view-' + view).classList.add('active');
      document.querySelectorAll(navSelector).forEach((a) => a.classList.remove('active'));
      el.classList.add('active');
    },

    openModal(id) {
      document.getElementById(id).classList.add('open');
    },

    closeModal(id) {
      document.getElementById(id).classList.remove('open');
    },

    initModalOverlays() {
      document.querySelectorAll('.modal-overlay').forEach((overlay) => {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) overlay.classList.remove('open');
        });
      });
    },

    toast(message, durationMs) {
      const flash = document.createElement('div');
      flash.className = 'lr-toast';
      flash.textContent = message;
      flash.style.animationDuration = (durationMs || 2000) + 'ms';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), durationMs || 2000);
    },
  };
})(window);
