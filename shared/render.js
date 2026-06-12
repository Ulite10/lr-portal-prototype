(function (global) {
  const LR = (global.LR = global.LR || {});
  const { escapeHtml, formatMoney } = LR.ui;

  const DEVICE_SVG = {
    iphone: (clipId) => `
      <svg width="140" height="240" viewBox="0 0 140 280" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="${clipId}">
            <rect x="5" y="6" width="130" height="268" rx="18" ry="18"/>
          </clipPath>
        </defs>
        <rect x="0" y="0" width="140" height="280" rx="22" ry="22" fill="#1a1a1a"/>
        <image href="https://res.cloudinary.com/demn0xk8w/image/upload/v1781128785/app_home_krcr2l.png"
               x="5" y="6" width="130" height="268"
               preserveAspectRatio="xMidYMid slice"
               clip-path="url(#${clipId})"/>
        <rect x="50" y="14" width="40" height="9" rx="4.5" fill="#000"/>
        <rect x="50" y="265" width="40" height="3" rx="1.5" fill="#000" opacity="0.65"/>
      </svg>`,
    ipad: (clipId) => `
      <svg width="200" height="240" viewBox="0 0 240 290" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="${clipId}">
            <rect x="10" y="12" width="220" height="266" rx="6" ry="6"/>
          </clipPath>
        </defs>
        <rect x="0" y="0" width="240" height="290" rx="18" ry="18" fill="#1a1a1a"/>
        <image href="https://res.cloudinary.com/demn0xk8w/image/upload/v1781128589/app_welcome_ez5yxd.png"
               x="10" y="12" width="220" height="266"
               preserveAspectRatio="xMidYMid slice"
               clip-path="url(#${clipId})"/>
        <circle cx="120" cy="6" r="2" fill="#444"/>
      </svg>`,
  };

  function addonPriceLabel(addon) {
    if (addon.priceUnit === 'block') return formatMoney(addon.price) + ' / block';
    return formatMoney(addon.price);
  }

  function addonPriceSuffix(addon) {
    if (addon.priceUnit === 'block') return ' / block';
    return ' flat';
  }

  function packagePillClass(name) {
    const n = (name || '').toLowerCase();
    if (n === 'basic') return 'basic';
    if (n === 'enterprise') return 'ent';
    if (n === 'pro') return 'pro';
    return '';
  }

  LR.render = {
    adminPackageCard(pkg) {
      const features = pkg.features
        .map((f) => `<li>${escapeHtml(f)}</li>`)
        .join('');
      return `
        <div class="pkg-card" data-catalog-id="${escapeHtml(pkg.id)}">
          <div class="name">${escapeHtml(pkg.name)}</div>
          <div class="price-row">
            <div class="price">${formatMoney(pkg.price)}</div>
            <div class="per">/ event</div>
          </div>
          <div class="lic-count">${escapeHtml(pkg.licenses)}<span class="lbl">licenses</span></div>
          <ul class="feat">${features}</ul>
          <div class="edit-row">
            <a href="#" data-action="edit-product">Edit →</a>
          </div>
        </div>`;
    },

    adminRentalCard(rental, index) {
      const clipId = rental.device + '-clip-adm-' + index;
      const svg = DEVICE_SVG[rental.device](clipId);
      return `
        <div class="rental-card-adm" data-catalog-id="${escapeHtml(rental.id)}">
          <div class="visual">
            <div class="tag">${escapeHtml(rental.tag)}</div>
            <div class="device">${svg}</div>
          </div>
          <div class="body">
            <div class="name">${escapeHtml(rental.name)}</div>
            <div class="desc">${escapeHtml(rental.description)}</div>
            <div class="amt">${formatMoney(rental.price)}<span class="per">/ device</span></div>
            <a class="edit-link" href="#" data-action="edit-product">Edit product</a>
          </div>
        </div>`;
    },

    adminAddonRow(addon) {
      return `
        <tr data-catalog-id="${escapeHtml(addon.id)}">
          <td><div class="name-cell"><div class="icon-box">${escapeHtml(addon.icon)}</div><div><b>${escapeHtml(addon.name)}</b><div class="d">${escapeHtml(addon.description)}</div></div></div></td>
          <td>${escapeHtml(addon.category)}</td>
          <td class="price">${addonPriceLabel(addon)}</td>
          <td class="actions-cell"><a href="#" data-action="edit-product">Edit</a></td>
        </tr>`;
    },

    exhibitorPackageCard(pkg, currentPackageId, allPackages) {
      const isCurrent = pkg.id === currentPackageId;
      let isLower = false;
      let currentPkgName = '';
      if (allPackages) {
        const idx = allPackages.findIndex((p) => p.id === pkg.id);
        const currentIdx = allPackages.findIndex((p) => p.id === currentPackageId);
        isLower = idx >= 0 && currentIdx >= 0 && idx < currentIdx;
        if (currentIdx >= 0) currentPkgName = allPackages[currentIdx].name;
      }
      let btnLabel, btnClass = '', disabled = '';
      if (isCurrent) {
        btnLabel = 'Current plan';
      } else if (isLower) {
        btnLabel = '✓ Included in ' + (currentPkgName || 'your plan');
        btnClass = ' included';
        disabled = ' disabled';
      } else {
        btnLabel = 'Upgrade to ' + pkg.name;
      }
      const features = pkg.features
        .map((f) => `<li>${escapeHtml(f)}</li>`)
        .join('');
      return `
        <div class="pkg-opt${isCurrent ? ' current' : ''}" data-catalog-id="${escapeHtml(pkg.id)}">
          <div class="name">${escapeHtml(pkg.name)}</div>
          <div class="price">${formatMoney(pkg.price)} <small>/ event</small></div>
          <div class="lic-count">${escapeHtml(pkg.licenses)}<span class="lbl">licenses</span></div>
          <ul>${features}</ul>
          <button class="opt-btn${btnClass}"${disabled}>${btnLabel}</button>
        </div>`;
    },

    exhibitorRentalCard(rental, index, defaultQty) {
      const clipId = rental.device + '-clip-ex-' + index;
      const svg = DEVICE_SVG[rental.device](clipId);
      const qty = defaultQty != null ? defaultQty : 0;
      return `
        <div class="rental-card" data-catalog-id="${escapeHtml(rental.id)}" data-price="${rental.price}" data-name="${escapeHtml(rental.name)}">
          <div class="visual">
            <div class="tag">${escapeHtml(rental.tag)}</div>
            <div class="device">${svg}</div>
          </div>
          <div class="body">
            <div class="name">${escapeHtml(rental.name)}</div>
            <div class="desc">${escapeHtml(rental.description)}</div>
            <div class="amt">${formatMoney(rental.price)}<span class="per">/ device</span></div>
            <div class="qty-control">
              <span class="qty-lbl">Quantity</span>
              <button data-action="qty-dec">−</button>
              <span class="num">${qty}</span>
              <button data-action="qty-inc">+</button>
            </div>
          </div>
        </div>`;
    },

    exhibitorAddonRow(addon) {
      return `
        <div class="addon-row" data-catalog-id="${escapeHtml(addon.id)}" data-price="${addon.price}" data-name="${escapeHtml(addon.name)}">
          <div class="ic">${escapeHtml(addon.icon)}</div>
          <div class="info">
            <b>${escapeHtml(addon.name)}</b>
            <p>${escapeHtml(addon.description)}</p>
          </div>
          <div class="price-col">${formatMoney(addon.price)}<span class="per">${addonPriceSuffix(addon)}</span></div>
          <div class="qty">
            <button data-action="qty-dec">−</button>
            <input type="text" value="0" />
            <button data-action="qty-inc">+</button>
          </div>
          <div class="total-col"><span class="zero">$0</span></div>
        </div>`;
    },

    exhibitorRow(ex) {
      const pkgCell =
        ex.package === '—'
          ? '—'
          : `<span class="pill ${packagePillClass(ex.package)}">${escapeHtml(ex.package)}</span>`;
      const statusLabels = {
        paid: 'Paid',
        pending: 'Pending',
        'not-accepted': 'Not accepted invitation',
      };
      const contactLine =
        ex.contact === '—'
          ? '—'
          : `${escapeHtml(ex.contact)} · ${escapeHtml(ex.role)}`;
      const totalStyle = ex.total === '—' ? ' style="color:var(--text-3);"' : '';
      const dataAttrs = Object.entries(ex)
        .filter(([k]) => k !== 'id')
        .map(([k, v]) => `data-${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}="${escapeHtml(v)}"`)
        .join(' ');

      return `
        <tr data-exhibitor-id="${escapeHtml(ex.id)}" ${dataAttrs}>
          <td class="company"><b>${escapeHtml(ex.name)}</b></td>
          <td><b>${escapeHtml(ex.booth)}</b><div style="color:var(--text-3);font-size:11px;">${escapeHtml(ex.hall)}</div></td>
          <td><b>${escapeHtml(ex.email)}</b><div style="color:var(--text-3);font-size:11.5px;">${contactLine}</div></td>
          <td>${pkgCell}</td>
          <td class="addons">${escapeHtml(ex.addons)}</td>
          <td class="total"${totalStyle}>${escapeHtml(ex.total)}</td>
          <td><span class="status ${escapeHtml(ex.status)}">${statusLabels[ex.status] || ex.status}</span></td>
        </tr>`;
    },

    adminProducts(catalog) {
      return {
        packages: catalog.packages.map((p) => this.adminPackageCard(p)).join(''),
        rentals: catalog.rentals
          .map((r, i) => this.adminRentalCard(r, i))
          .join(''),
        addons: catalog.addons.map((a) => this.adminAddonRow(a)).join(''),
      };
    },

    exhibitorProducts(catalog, pricing) {
      return {
        packages: catalog.packages
          .map((p) => this.exhibitorPackageCard(p, pricing.currentPackageId, catalog.packages))
          .join(''),
        rentals: catalog.rentals
          .map((r, i) =>
            this.exhibitorRentalCard(r, i, pricing.defaultRentalQty[r.id])
          )
          .join(''),
        addons: catalog.addons.map((a) => this.exhibitorAddonRow(a)).join(''),
      };
    },

    exhibitors(rows) {
      return rows.map((ex) => this.exhibitorRow(ex)).join('');
    },
  };
})(window);
