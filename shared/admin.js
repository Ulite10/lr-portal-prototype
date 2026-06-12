(function (global) {
  const LR = (global.LR = global.LR || {});
  const { ui, catalog, render, DEFAULT_EXHIBITORS } = LR;

  let currentEditId = null;
  let currentAddType = 'package';
  let currentAddDisplay = 'card';
  let lastDetailRow = null;

  function mountProducts() {
    const catalogData = catalog.get();
    const html = render.adminProducts(catalogData);
    document.getElementById('packagesGrid').innerHTML = html.packages;
    document.getElementById('rentalCards').innerHTML = html.rentals;
    document.getElementById('addonTableBody').innerHTML = html.addons;
    wireAddonRowClicks();
  }

  function mountExhibitors() {
    const tbody = document.getElementById('exhibitorTableBody');
    if (!tbody) return;
    tbody.innerHTML = render.exhibitors(DEFAULT_EXHIBITORS);
    tbody.querySelectorAll('tr').forEach((row) => {
      row.addEventListener('click', () => openExhibitor(row));
    });
    filterExhibitors();
  }

  function wireAddonRowClicks() {
    document.querySelectorAll('.addon-table tbody tr').forEach((row) => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.actions-cell a')) return;
        openAddonDetail(row);
      });
    });
  }

  function itemToEditForm(found) {
    const { item } = found;
    if (item.type === 'package') {
      return {
        name: item.name,
        price: String(item.price),
        licenses: String(item.licenses),
        bullets: item.features || [],
        showLicenses: true,
      };
    }
    if (item.type === 'rental') {
      return {
        name: item.name,
        price: String(item.price),
        licenses: null,
        bullets: [item.description],
        showLicenses: false,
      };
    }
    return {
      name: item.name,
      price: String(item.price),
      licenses: null,
      bullets: [item.description],
      showLicenses: false,
      priceSuffix: item.priceUnit === 'block' ? ' / block' : '',
    };
  }

  function openEdit(catalogId) {
    const found = catalog.findById(catalogId);
    if (!found) return;
    currentEditId = catalogId;

    const form = itemToEditForm(found);
    document.getElementById('editTitle').textContent = 'Edit ' + form.name;
    document.getElementById('editName').value = form.name;
    document.getElementById('editPrice').value = form.price;

    const licRow = document.getElementById('editLicensesRow');
    if (!form.showLicenses) {
      licRow.style.display = 'none';
    } else {
      licRow.style.display = 'block';
      document.getElementById('editLicenses').value = form.licenses;
    }

    renderBullets(form.bullets);
    ui.openModal('editModal');
  }

  function saveEdit() {
    if (!currentEditId) return ui.closeModal('editModal');

    const found = catalog.findById(currentEditId);
    if (!found) return ui.closeModal('editModal');

    const newName = document.getElementById('editName').value.trim();
    const newPrice = parseFloat(document.getElementById('editPrice').value) || 0;
    const newLicenses = document.getElementById('editLicenses').value.trim();
    const bullets = Array.from(document.querySelectorAll('#editBullets .bullet-input input'))
      .map((i) => i.value.trim())
      .filter(Boolean);

    const { item, group } = found;
    const updates = { name: newName, price: newPrice };

    if (item.type === 'package') {
      updates.licenses = parseInt(newLicenses) || item.licenses;
      updates.features = bullets;
    } else if (item.type === 'rental') {
      updates.description = bullets[0] || item.description;
    } else {
      updates.description = bullets[0] || item.description;
    }

    catalog.updateItem(currentEditId, updates);
    mountProducts();
    currentEditId = null;
    ui.closeModal('editModal');
    ui.toast('✓ Saved');
  }

  function renderBullets(bullets) {
    const container = document.getElementById('editBullets');
    container.innerHTML = '';
    bullets.forEach((b) => container.appendChild(makeBulletRow(b)));
  }

  function makeBulletRow(value) {
    const row = document.createElement('div');
    row.className = 'bullet-input';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    const rm = document.createElement('button');
    rm.className = 'rm';
    rm.textContent = '×';
    rm.onclick = () => row.remove();
    row.appendChild(input);
    row.appendChild(rm);
    return row;
  }

  function addBullet() {
    document.getElementById('editBullets').appendChild(makeBulletRow(''));
  }

  function openAdd() {
    document.querySelectorAll('#addModal .radio-opt').forEach((o) => o.classList.remove('checked'));
    document.querySelectorAll('#addModal .radio-group').forEach((g) => {
      const first = g.querySelector('.radio-opt');
      if (first) first.classList.add('checked');
    });
    currentAddType = 'package';
    currentAddDisplay = 'card';
    ['addName', 'addPrice', 'addLicenses', 'addDesc'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('addLicensesRow').style.display = 'block';
    ui.openModal('addModal');
  }

  function pickType(el, type) {
    currentAddType = type;
    el.parentNode.querySelectorAll('.radio-opt').forEach((o) => o.classList.remove('checked'));
    el.classList.add('checked');
    document.getElementById('addLicensesRow').style.display =
      type === 'addon' ? 'none' : 'block';
  }

  function pickDisplay(el, mode) {
    currentAddDisplay = mode;
    el.parentNode.querySelectorAll('.radio-opt').forEach((o) => o.classList.remove('checked'));
    el.classList.add('checked');
  }

  function saveAdd() {
    const name = (document.getElementById('addName').value || 'Untitled').trim();
    const price = parseFloat(document.getElementById('addPrice').value) || 0;
    const licenses = (document.getElementById('addLicenses').value || '1').trim();
    const desc = (document.getElementById('addDesc').value || '').trim();

    const typeIcons = { package: '📦', rental: '📱', addon: '✨' };

    if (currentAddDisplay === 'inline' || currentAddType === 'addon') {
      catalog.addItem('addons', {
        id: catalog.nextId('addon'),
        type: 'addon',
        icon: typeIcons[currentAddType] || '✨',
        name,
        description: desc || 'New product',
        category: currentAddType === 'rental' ? 'Rental' : currentAddType === 'package' ? 'Package' : 'Feature',
        price,
        priceUnit: 'flat',
      });
    } else if (currentAddType === 'package') {
      catalog.addItem('packages', {
        id: catalog.nextId('pkg'),
        type: 'package',
        name,
        price,
        licenses: parseInt(licenses) || 1,
        features: desc ? [desc] : [],
      });
    } else if (currentAddType === 'rental') {
      catalog.addItem('rentals', {
        id: catalog.nextId('rental'),
        type: 'rental',
        device: 'iphone',
        tag: 'Hardware',
        name,
        price,
        description: desc || 'New rental item.',
      });
    }

    mountProducts();
    ui.closeModal('addModal');
    ui.toast('✓ Product added');
  }

  function openInvite() {
    document.getElementById('inviteEmail').value = '';
    document.getElementById('inviteCompany').value = '';
    document.getElementById('inviteMessage').value = '';
    ui.openModal('inviteModal');
  }

  function switchInviteTab(btn, tab) {
    document.querySelectorAll('.invite-tab').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('invite-email').style.display = tab === 'email' ? 'block' : 'none';
    document.getElementById('invite-import').style.display = tab === 'import' ? 'block' : 'none';
  }

  function sendInvite() {
    const email = document.getElementById('inviteEmail').value.trim();
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    ui.closeModal('inviteModal');
    ui.toast('✓ Invitation sent to ' + email, 3000);
  }

  function openExhibitor(row) {
    const d = row.dataset;
    document.getElementById('exDetailName').textContent = d.name;
    document.getElementById('exDetailCompany').textContent = d.name;
    document.getElementById('exDetailMeta').textContent = d.industry + ' · ' + d.location;
    document.getElementById('exDetailLogo').textContent = d.name.charAt(0);

    document.getElementById('exDetailContactName').textContent = d.contact || '—';
    document.getElementById('exDetailRole').textContent = d.role || '—';
    document.getElementById('exDetailEmail').textContent = d.email || '—';
    document.getElementById('exDetailPhone').textContent = d.phone || '—';

    document.getElementById('exDetailWebsite').textContent = d.website || '—';
    document.getElementById('exDetailIndustry').textContent = d.industry || '—';
    document.getElementById('exDetailSize').textContent = d.size || '—';
    document.getElementById('exDetailLocation').textContent = d.location || '—';

    document.getElementById('exDetailBooth').textContent = '#' + d.booth + ' · ' + d.hall;
    document.getElementById('exDetailPackage').textContent = d.package || '—';
    document.getElementById('exDetailAddons').textContent = d.addons || '—';
    document.getElementById('exDetailTotal').textContent = d.total || '—';

    const statusLabels = {
      paid: '● Paid',
      pending: '● Pending',
      'not-accepted': '○ Not accepted invitation',
    };
    const statusColors = {
      paid: '#10B981',
      pending: '#F59E0B',
      'not-accepted': '#94A3B8',
    };
    document.getElementById('exDetailStatusWrap').innerHTML =
      '<span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:11.5px;font-weight:700;background:' +
      statusColors[d.status] +
      '22;color:' +
      statusColors[d.status] +
      ';">' +
      statusLabels[d.status] +
      '</span>';

    const contactBtn = document.getElementById('exDetailContactBtn');
    const resendBtn = document.getElementById('exDetailResendBtn');
    contactBtn.onclick = () => {
      window.location.href = 'mailto:' + d.email;
    };
    contactBtn.textContent = '📧 Contact ' + (d.contact || 'exhibitor').split(' ')[0];

    if (d.status === 'not-accepted') {
      resendBtn.style.display = 'inline-flex';
      resendBtn.onclick = () => {
        ui.toast('✓ Invitation re-sent to ' + d.email, 3000);
        ui.closeModal('exhibitorDetailModal');
      };
    } else {
      resendBtn.style.display = 'none';
    }

    ui.openModal('exhibitorDetailModal');
  }

  function filterExhibitors() {
    const q = document.getElementById('exhibitorSearch').value.toLowerCase().trim();
    const rows = document.querySelectorAll('#exhibitorTable tbody tr');
    let visible = 0;
    rows.forEach((row) => {
      const text = (
        row.dataset.name +
        ' ' +
        row.dataset.booth +
        ' ' +
        (row.dataset.contact || '') +
        ' ' +
        (row.dataset.email || '') +
        ' ' +
        (row.dataset.hall || '')
      ).toLowerCase();
      const match = !q || text.includes(q);
      row.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    document.getElementById('exhibitorCount').textContent = q
      ? 'Showing ' + visible + ' of ' + rows.length + ' exhibitors'
      : 'Showing all ' + rows.length + ' exhibitors';
  }

  function openAddonDetail(row) {
    lastDetailRow = row;
    const found = catalog.findById(row.dataset.catalogId);
    const name = row.querySelector('.name-cell b').textContent.trim();
    const desc = row.querySelector('.name-cell .d').textContent.trim();
    const icon = row.querySelector('.icon-box').textContent.trim();
    const type = row.children[1].textContent.trim();
    const price = row.querySelector('.price').textContent.trim();
    document.getElementById('addonDetailName').textContent = name;
    document.getElementById('addonDetailDesc').textContent = desc;
    document.getElementById('addonDetailIcon').textContent = icon;
    document.getElementById('addonDetailType').textContent = type;
    document.getElementById('addonDetailPrice').textContent = price;
    if (found) currentEditId = found.item.id;
    ui.openModal('addonDetailModal');
  }

  function openEditFromDetail() {
    if (lastDetailRow) {
      openEdit(lastDetailRow.dataset.catalogId);
      ui.closeModal('addonDetailModal');
    }
  }

  LR.admin = {
    init() {
      global.showView = (view, el) => ui.showView(view, el, '.sidebar nav a');

      mountProducts();
      mountExhibitors();

      document.getElementById('view-products').addEventListener('click', (e) => {
        const link = e.target.closest('[data-action="edit-product"]');
        if (!link) return;
        e.preventDefault();
        const card = link.closest('[data-catalog-id]');
        if (card) openEdit(card.dataset.catalogId);
      });

      global.openEdit = openEdit;
      global.saveEdit = saveEdit;
      global.addBullet = addBullet;
      global.openAdd = openAdd;
      global.pickType = pickType;
      global.pickDisplay = pickDisplay;
      global.saveAdd = saveAdd;
      global.openInvite = openInvite;
      global.switchInviteTab = switchInviteTab;
      global.sendInvite = sendInvite;
      global.openExhibitor = openExhibitor;
      global.filterExhibitors = filterExhibitors;
      global.openAddonDetail = openAddonDetail;
      global.openEditFromDetail = openEditFromDetail;
      global.closeModal = ui.closeModal;

      ui.initModalOverlays();
    },
  };
})(window);
