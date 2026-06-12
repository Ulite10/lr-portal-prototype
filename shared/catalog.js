(function (global) {
  const LR = (global.LR = global.LR || {});
  const STORAGE_KEY = 'lr-portal-catalog';

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  LR.catalog = {
    get() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (_) {
        /* ignore corrupt storage */
      }
      return clone(LR.DEFAULT_CATALOG);
    },

    save(catalog) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
    },

    reset() {
      localStorage.removeItem(STORAGE_KEY);
    },

    findById(id) {
      const catalog = this.get();
      for (const group of ['packages', 'rentals', 'addons']) {
        const item = catalog[group].find((p) => p.id === id);
        if (item) return { item, group };
      }
      return null;
    },

    updateItem(id, updates) {
      const catalog = this.get();
      for (const group of ['packages', 'rentals', 'addons']) {
        const idx = catalog[group].findIndex((p) => p.id === id);
        if (idx !== -1) {
          catalog[group][idx] = { ...catalog[group][idx], ...updates };
          this.save(catalog);
          return { item: catalog[group][idx], group };
        }
      }
      return null;
    },

    addItem(group, item) {
      const catalog = this.get();
      if (!catalog[group]) catalog[group] = [];
      catalog[group].push(item);
      this.save(catalog);
      return item;
    },

    nextId(prefix) {
      return prefix + '-' + Date.now().toString(36);
    },
  };
})(window);
