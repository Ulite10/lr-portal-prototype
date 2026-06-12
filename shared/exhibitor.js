(function (global) {
  const LR = (global.LR = global.LR || {});
  const { ui, catalog, render, PRICING } = LR;

  function getCurrentPackage(catalogData) {
    return (
      catalogData.packages.find((p) => p.id === PRICING.currentPackageId) ||
      catalogData.packages[1]
    );
  }

  function computeOrder(items, discountRate) {
    const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
    const discount = Math.round(subtotal * discountRate);
    return { subtotal, discount, total: subtotal - discount };
  }

  function collectLineItems() {
    const catalogData = catalog.get();
    const pkg = getCurrentPackage(catalogData);
    const items = [
      {
        name: pkg.name + ' package',
        qty: 1,
        subtotal: pkg.price,
      },
    ];

    document.querySelectorAll('.rental-card[data-price]').forEach((card) => {
      const numEl = card.querySelector('.num');
      const qty = numEl ? parseInt(numEl.textContent) || 0 : 0;
      if (qty > 0) {
        const price = parseFloat(card.dataset.price);
        items.push({
          name: card.dataset.name + ' × ' + qty,
          qty,
          subtotal: price * qty,
        });
      }
    });

    document.querySelectorAll('.addon-row[data-price]').forEach((row) => {
      const qtyInput = row.querySelector('.qty input');
      const qty = qtyInput ? parseInt(qtyInput.value) || 0 : 0;
      if (qty > 0) {
        const price = parseFloat(row.dataset.price);
        items.push({
          name: row.dataset.name + (qty > 1 ? ' × ' + qty : ''),
          qty,
          subtotal: price * qty,
        });
      }
    });

    return items;
  }

  function recalculate() {
    document.querySelectorAll('.addon-row[data-price]').forEach((row) => {
      const qtyInput = row.querySelector('.qty input');
      const qty = qtyInput ? parseInt(qtyInput.value) || 0 : 0;
      const price = parseFloat(row.dataset.price);
      const subtotal = price * qty;
      const totalEl = row.querySelector('.total-col');
      if (totalEl) {
        totalEl.innerHTML =
          subtotal === 0
            ? '<span class="zero">$0</span>'
            : ui.formatMoney(subtotal);
      }
    });

    const items = collectLineItems();
    const { discount, total } = computeOrder(items, PRICING.discountRate);

    const summaryRows = document.querySelector('.summary-rows');
    if (summaryRows) {
      summaryRows.innerHTML = '';
      items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML =
          '<div class="lbl">' +
          ui.escapeHtml(item.name) +
          '</div><div class="v">' +
          ui.formatMoney(item.subtotal) +
          '</div>';
        summaryRows.appendChild(row);
      });
      const discountRow = document.createElement('div');
      discountRow.className = 'row discount';
      discountRow.innerHTML =
        '<div class="lbl">Early-bird discount (−10%)</div><div class="v">−' +
        ui.formatMoney(discount) +
        '</div>';
      summaryRows.appendChild(discountRow);
      const totalRow = document.createElement('div');
      totalRow.className = 'row total';
      totalRow.innerHTML =
        '<div class="lbl">Total</div><div class="v">' + ui.formatMoney(total) + '</div>';
      summaryRows.appendChild(totalRow);
    }

    const ckBtn = document.querySelector('.summary-actions button.primary');
    if (ckBtn) ckBtn.textContent = 'Checkout & pay ' + ui.formatMoney(total) + ' →';
  }

  function adj(btn, delta) {
    const parent = btn.parentNode;
    const input = parent.querySelector('input');
    const span = parent.querySelector('.num');
    if (input) {
      input.value = Math.max(0, (parseInt(input.value) || 0) + delta);
    } else if (span) {
      span.textContent = Math.max(0, (parseInt(span.textContent) || 0) + delta);
    }
    recalculate();
  }

  function mountProducts() {
    const catalogData = catalog.get();
    const html = render.exhibitorProducts(catalogData, PRICING);

    const pkgGrid = document.getElementById('upgradeGrid');
    const rentalGrid = document.getElementById('rentalsGrid');
    const addonsForm = document.getElementById('addonsForm');

    if (pkgGrid) pkgGrid.innerHTML = html.packages;
    if (rentalGrid) rentalGrid.innerHTML = html.rentals;
    if (addonsForm) {
      const header = addonsForm.querySelector('.addon-row.head');
      addonsForm.innerHTML = '';
      if (header) addonsForm.appendChild(header);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.addons;
      while (wrapper.firstChild) addonsForm.appendChild(wrapper.firstChild);
    }

    document.getElementById('view-order').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="qty-dec"], [data-action="qty-inc"]');
      if (!btn) return;
      adj(btn, btn.dataset.action === 'qty-inc' ? 1 : -1);
    });
  }

  LR.exhibitor = {
    init() {
      global.showView = (view, el) => ui.showView(view, el, '.tabs a');

      mountProducts();
      recalculate();

      global.adj = adj;
      global.recalculate = recalculate;
      global.openCheckout = () => {
        const items = collectLineItems();
        const { discount, total } = computeOrder(items, PRICING.discountRate);

        const body = document.getElementById('checkoutBody');
        let sumHtml = '<div class="ck-section"><div class="ck-section-lbl">Order summary</div>';
        items.forEach((item) => {
          sumHtml +=
            '<div class="ck-row"><div>' +
            ui.escapeHtml(item.name) +
            '</div><div>' +
            ui.formatMoney(item.subtotal) +
            '</div></div>';
        });
        sumHtml +=
          '<div class="ck-row" style="color: var(--success);"><div>Early-bird discount (−10%)</div><div>−' +
          ui.formatMoney(discount) +
          '</div></div>';
        sumHtml +=
          '<div class="ck-row ck-total"><div>Total to pay</div><div>' +
          ui.formatMoney(total) +
          '</div></div></div>';
        sumHtml +=
          '<div class="ck-section"><div class="ck-section-lbl">Payment method</div>' +
          '<div class="ck-card"><div class="ck-card-icon">💳</div><div class="ck-card-info">' +
          '<div class="ck-card-name">Visa •••• 4242</div><div class="ck-card-meta">Exp 04/28 · Default card</div>' +
          '</div><a href="#" class="ck-change">Change</a></div></div>';
        sumHtml +=
          '<div class="ck-section"><div class="ck-section-lbl">Billing</div>' +
          '<div class="ck-billing"><strong>Sarah Chen</strong><br/>Contoso Inc.<br/>1500 Innovation Way, Suite 400<br/>San Jose, CA 95134</div></div>';

        body.innerHTML = sumHtml;
        body.style.display = 'block';

        const foot = document.getElementById('checkoutFoot');
        foot.innerHTML =
          '<button onclick="closeCheckout()">Cancel</button>' +
          '<button class="primary" onclick="confirmPayment(' +
          total +
          ')">Confirm payment ' +
          ui.formatMoney(total) +
          '</button>';
        foot.style.display = 'flex';

        document.getElementById('checkoutSuccess').style.display = 'none';
        document.getElementById('checkoutModal').classList.add('open');
      };

      global.closeCheckout = () => {
        document.getElementById('checkoutModal').classList.remove('open');
      };

      global.confirmPayment = (total) => {
        document.getElementById('checkoutBody').style.display = 'none';
        document.getElementById('checkoutFoot').style.display = 'none';
        const success = document.getElementById('checkoutSuccess');
        const meta = success.querySelector('.ck-success-meta');
        if (meta && total) {
          const amt = meta.querySelector('div:first-child strong');
          if (amt) amt.textContent = ui.formatMoney(total);
        }
        success.style.display = 'block';
      };

      document.getElementById('checkoutModal').addEventListener('click', (e) => {
        if (e.target.id === 'checkoutModal') global.closeCheckout();
      });
    },
  };
})(window);
