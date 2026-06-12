// 50 dummy leads for the Leads tab on the exhibitor portal.
// All companies are fictional (Microsoft-style names + variations).

(function () {
  const LEADS = [
    { name: 'Robert Carter', email: 'r.carter@fabrikam.com', company: 'Fabrikam Industries', title: 'Director, Platform Engineering', loc: 'Austin, TX', day: 14, time: '10:12 AM', device: 'iPhone-01', followup: 'sheet', interest: 'Analytics platform', notes: '—', optin: true },
    { name: 'Diana Voss', email: 'd.voss@northwind.com', company: 'Northwind Traders', title: 'Marketing Manager', loc: 'Denver, CO', day: 14, time: '11:48 AM', device: 'iPhone-02', followup: 'sheet', interest: 'AI integration', notes: 'Asked about Q3 demo', optin: true },
    { name: 'Joanne Park', email: 'j.park@litware.com', company: 'Litware Inc.', title: 'CEO', loc: 'Miami, FL', day: 14, time: '2:18 PM', device: 'iPhone-01', followup: 'meeting', interest: 'Partnership discussion', notes: 'Wants intro to leadership, calling next Tues', optin: true },
    { name: 'Michael Reed', email: 'm.reed@adventureworks.com', company: 'Adventure Works', title: 'Founder', loc: 'Phoenix, AZ', day: 14, time: '4:00 PM', device: 'iPad-01', followup: 'none', interest: '—', notes: '—', optin: false },
    { name: '—', email: '—', company: 'Adatum Corporation', title: '—', loc: 'San Diego, CA', day: 14, time: '5:12 PM', device: 'iPhone-03', followup: 'none', interest: '—', notes: '—', optin: false },
    { name: 'Sarah Hayes', email: 's.hayes@wingtip.com', company: 'Wingtip Solutions', title: 'VP, Procurement', loc: 'Boston, MA', day: 15, time: '9:14 AM', device: 'iPhone-02', followup: 'meeting', interest: 'Enterprise plan', notes: 'Schedule for end of Q3, sending RFP draft', optin: true },
    { name: 'David Cohen', email: 'd.cohen@treyresearch.com', company: 'Trey Research', title: 'Procurement Lead', loc: 'Seattle, WA', day: 15, time: '10:45 AM', device: 'iPhone-04', followup: 'fu', interest: 'Custom integration', notes: 'Send pricing for 50-unit deployment', optin: true },
    { name: 'Linda Park', email: 'l.park@cohovineyard.com', company: 'Coho Vineyard', title: 'Director, Operations', loc: 'Chicago, IL', day: 15, time: '11:22 AM', device: 'iPhone-01', followup: 'meeting', interest: 'Analytics platform', notes: 'Connected with team. Coffee Wed AM.', optin: true },
    { name: 'Raj Patel', email: 'r.patel@proseware.com', company: 'Proseware Inc.', title: 'Senior Engineer', loc: 'Atlanta, GA', day: 15, time: '1:03 PM', device: 'iPad-01', followup: 'sheet', interest: 'API access · Cloud platform', notes: 'Sent spec sheet, technical follow-up scheduled', optin: true },
    { name: 'Emily Wong', email: 'e.wong@lucerne.com', company: 'Lucerne Publishing', title: 'Marketing Manager', loc: 'Portland, OR', day: 15, time: '2:51 PM', device: 'iPhone-03', followup: 'fu', interest: 'General interest', notes: 'Wants newsletter subscription', optin: true },
    { name: 'Tom Bradley', email: 't.bradley@tailspin.com', company: 'Tailspin Toys', title: 'Procurement Specialist', loc: 'Dallas, TX', day: 16, time: '8:30 AM', device: 'iPhone-02', followup: 'sheet', interest: 'Security suite', notes: '—', optin: true },
    { name: 'Anna Kowalski', email: 'a.kowalski@wideworld.com', company: 'Wide World Importers', title: 'Business Development', loc: 'Nashville, TN', day: 16, time: '11:42 AM', device: 'iPhone-05', followup: 'meeting', interest: 'Custom integration', notes: 'Q4 budget discussion · Mark sending proposal', optin: true },
    { name: 'Olivia Brown', email: 'o.brown@margiestravel.com', company: "Margie's Travel", title: 'Head of Sales', loc: 'San Francisco, CA', day: 14, time: '9:35 AM', device: 'iPhone-01', followup: 'sheet', interest: 'Cloud platform', notes: 'Stopped by, took brochure', optin: true },
    { name: 'Marcus Johnson', email: 'm.johnson@alpineskihouse.com', company: 'Alpine Ski House', title: 'Director, Strategy', loc: 'Denver, CO', day: 14, time: '12:08 PM', device: 'iPhone-04', followup: 'meeting', interest: 'Enterprise plan', notes: 'Interested in multi-event package', optin: true },
    { name: 'Priya Patel', email: 'p.patel@lamna.com', company: 'Lamna Healthcare', title: 'IT Manager', loc: 'Boston, MA', day: 14, time: '1:22 PM', device: 'iPad-01', followup: 'fu', interest: 'Security suite', notes: 'Compliance questions, sending whitepaper', optin: true },
    { name: 'Lucas Schmidt', email: 'l.schmidt@bestforyou.com', company: 'Best For You Organics', title: 'COO', loc: 'Portland, OR', day: 14, time: '3:18 PM', device: 'iPhone-02', followup: 'sheet', interest: 'AI integration', notes: '—', optin: true },
    { name: 'Sofia Rodriguez', email: 's.rodriguez@firstup.com', company: 'First Up Consultants', title: 'Partner', loc: 'Chicago, IL', day: 14, time: '4:42 PM', device: 'iPhone-01', followup: 'meeting', interest: 'Partnership discussion', notes: 'Discussing reseller arrangement', optin: true },
    { name: 'Kenji Tanaka', email: 'k.tanaka@graphicdesign.com', company: 'Graphic Design Institute', title: 'Founder', loc: 'Los Angeles, CA', day: 14, time: '5:55 PM', device: 'iPhone-03', followup: 'sheet', interest: 'Cloud platform', notes: 'Solo founder, evaluating tools', optin: true },
    { name: 'Aisha Thompson', email: 'a.thompson@humongousinsurance.com', company: 'Humongous Insurance', title: 'VP, Operations', loc: 'New York, NY', day: 15, time: '8:12 AM', device: 'iPhone-04', followup: 'fu', interest: 'Enterprise plan', notes: 'Need security cert documentation', optin: true },
    { name: 'Daniel Kim', email: 'd.kim@munsons.com', company: "Munson's Pickles", title: 'Sales Director', loc: 'Detroit, MI', day: 15, time: '10:18 AM', device: 'iPhone-02', followup: 'sheet', interest: 'Mobile app', notes: 'Small team, looking for simple tool', optin: true },
    { name: 'Elena Garcia', email: 'e.garcia@relecloud.com', company: 'Relecloud', title: 'Head of Marketing', loc: 'Miami, FL', day: 15, time: '11:55 AM', device: 'iPhone-01', followup: 'meeting', interest: 'API access', notes: 'Tech-savvy team, wants demo', optin: true },
    { name: 'Samuel Cohen', email: 's.cohen@schoolfa.org', company: 'School of Fine Art', title: 'Director', loc: 'Philadelphia, PA', day: 15, time: '1:32 PM', device: 'iPad-01', followup: 'fu', interest: 'General interest', notes: '—', optin: true },
    { name: 'Maria Santos', email: 'm.santos@southridgevideo.com', company: 'Southridge Video', title: 'Producer', loc: 'Burbank, CA', day: 15, time: '2:45 PM', device: 'iPhone-05', followup: 'sheet', interest: 'Mobile app · Cloud platform', notes: 'Asking about API for video integration', optin: true },
    { name: 'James Peterson', email: 'j.peterson@thephonecompany.com', company: 'The Phone Company', title: 'CMO', loc: 'Houston, TX', day: 15, time: '4:08 PM', device: 'iPhone-03', followup: 'meeting', interest: 'Enterprise plan', notes: 'Decision maker. Follow up Monday.', optin: true },
    { name: 'Yuki Sato', email: 'y.sato@worldwide.com', company: 'World Wide Importers', title: 'Operations Lead', loc: 'Long Beach, CA', day: 15, time: '5:22 PM', device: 'iPhone-02', followup: 'fu', interest: 'Custom integration', notes: 'Multi-region rollout considerations', optin: true },
    { name: 'Hannah Schmidt', email: 'h.schmidt@trey.com', company: 'Trey Research', title: 'Analyst', loc: 'Seattle, WA', day: 15, time: '9:08 AM', device: 'iPhone-04', followup: 'none', interest: '—', notes: '—', optin: false },
    { name: 'Carlos Ramirez', email: 'c.ramirez@alpine.com', company: 'Alpine Ski House', title: 'Account Executive', loc: 'Denver, CO', day: 14, time: '6:15 PM', device: 'iPhone-01', followup: 'sheet', interest: 'Analytics platform', notes: 'Wanted price list, sent', optin: true },
    { name: 'Nina Petrov', email: 'n.petrov@lamna.com', company: 'Lamna Healthcare', title: 'Procurement Lead', loc: 'Boston, MA', day: 15, time: '3:18 PM', device: 'iPad-01', followup: 'meeting', interest: 'Security suite · Enterprise plan', notes: 'RFP coming Q4, requested timeline', optin: true },
    { name: 'Brian O\'Connor', email: 'b.oconnor@graphicdesign.com', company: 'Graphic Design Institute', title: 'Marketing Lead', loc: 'Los Angeles, CA', day: 15, time: '11:08 AM', device: 'iPhone-03', followup: 'fu', interest: 'Mobile app', notes: 'Wants iOS first', optin: true },
    { name: 'Mia Andersen', email: 'm.andersen@bestforyou.com', company: 'Best For You Organics', title: 'VP, Growth', loc: 'Portland, OR', day: 16, time: '9:42 AM', device: 'iPhone-02', followup: 'sheet', interest: 'AI integration', notes: 'Interested in lead scoring', optin: true },
    { name: 'Vikram Singh', email: 'v.singh@relecloud.com', company: 'Relecloud', title: 'Engineering Manager', loc: 'Miami, FL', day: 16, time: '10:55 AM', device: 'iPhone-05', followup: 'meeting', interest: 'API access', notes: 'Loves the developer experience', optin: true },
    { name: 'Catherine Liu', email: 'c.liu@firstup.com', company: 'First Up Consultants', title: 'Senior Consultant', loc: 'Chicago, IL', day: 16, time: '11:25 AM', device: 'iPhone-01', followup: 'sheet', interest: 'Cloud platform', notes: 'Will brief partners next week', optin: true },
    { name: 'Greg Anderson', email: 'g.anderson@thephonecompany.com', company: 'The Phone Company', title: 'Director, Tech Partnerships', loc: 'Houston, TX', day: 16, time: '12:18 PM', device: 'iPad-01', followup: 'meeting', interest: 'Partnership discussion', notes: 'Co-marketing opportunities discussed', optin: true },
    { name: '—', email: '—', company: 'Adatum Corporation', title: '—', loc: 'San Diego, CA', day: 16, time: '1:08 PM', device: 'iPhone-04', followup: 'none', interest: '—', notes: '—', optin: false },
    { name: 'Felipe Costa', email: 'f.costa@treyresearch.com', company: 'Trey Research', title: 'Director, Insights', loc: 'Seattle, WA', day: 16, time: '2:22 PM', device: 'iPhone-02', followup: 'fu', interest: 'Analytics platform', notes: 'Sent dashboard mockups', optin: true },
    { name: 'Sara Klein', email: 's.klein@humongousinsurance.com', company: 'Humongous Insurance', title: 'Underwriting Manager', loc: 'New York, NY', day: 16, time: '3:08 PM', device: 'iPhone-03', followup: 'sheet', interest: 'Security suite', notes: '—', optin: true },
    { name: 'Antonio Ricci', email: 'a.ricci@worldwide.com', company: 'World Wide Importers', title: 'Logistics Director', loc: 'Long Beach, CA', day: 16, time: '4:12 PM', device: 'iPhone-01', followup: 'meeting', interest: 'Custom integration', notes: 'Integration with their TMS', optin: true },
    { name: 'Rachel Newman', email: 'r.newman@adventureworks.com', company: 'Adventure Works', title: 'Marketing Director', loc: 'Phoenix, AZ', day: 14, time: '8:55 AM', device: 'iPhone-05', followup: 'fu', interest: 'Mobile app', notes: '—', optin: true },
    { name: 'Patrick O\'Brien', email: 'p.obrien@cohovineyard.com', company: 'Coho Vineyard', title: 'GM', loc: 'Chicago, IL', day: 14, time: '9:18 AM', device: 'iPhone-02', followup: 'sheet', interest: 'Enterprise plan', notes: 'Interested in white-label option', optin: true },
    { name: 'Akira Yamamoto', email: 'a.yamamoto@wingtip.com', company: 'Wingtip Solutions', title: 'Engineering Director', loc: 'Boston, MA', day: 15, time: '4:38 PM', device: 'iPad-01', followup: 'meeting', interest: 'API access · Custom integration', notes: 'Tech deep-dive scheduled for Friday', optin: true },
    { name: 'Lara Voss', email: 'l.voss@northwind.com', company: 'Northwind Traders', title: 'COO', loc: 'Denver, CO', day: 16, time: '5:42 PM', device: 'iPhone-04', followup: 'meeting', interest: 'Partnership discussion', notes: 'Strategic alignment session next week', optin: true },
    { name: 'Theo Müller', email: 't.muller@fabrikam.com', company: 'Fabrikam Industries', title: 'VP, Engineering', loc: 'Austin, TX', day: 14, time: '5:25 PM', device: 'iPhone-01', followup: 'fu', interest: 'API access', notes: 'Sending API docs', optin: true },
    { name: 'Maya Bennett', email: 'm.bennett@litware.com', company: 'Litware Inc.', title: 'CMO', loc: 'Miami, FL', day: 15, time: '6:08 PM', device: 'iPhone-03', followup: 'sheet', interest: 'AI integration', notes: 'CMO loved the AI demo', optin: true },
    { name: 'Henry Walsh', email: 'h.walsh@tailspin.com', company: 'Tailspin Toys', title: 'Sales VP', loc: 'Dallas, TX', day: 16, time: '9:55 AM', device: 'iPhone-02', followup: 'meeting', interest: 'Enterprise plan', notes: 'Annual contract discussion', optin: true },
    { name: 'Isabella Russo', email: 'i.russo@proseware.com', company: 'Proseware Inc.', title: 'Product Marketing', loc: 'Atlanta, GA', day: 16, time: '10:42 AM', device: 'iPad-01', followup: 'sheet', interest: 'Analytics platform', notes: 'Wants to see customer references', optin: true },
    { name: 'Kai Larsen', email: 'k.larsen@lucerne.com', company: 'Lucerne Publishing', title: 'Tech Lead', loc: 'Portland, OR', day: 15, time: '5:38 PM', device: 'iPhone-05', followup: 'fu', interest: 'Cloud platform', notes: 'Needs single sign-on', optin: true },
    { name: 'Zara Ahmad', email: 'z.ahmad@wideworld.com', company: 'Wide World Importers', title: 'CFO', loc: 'Nashville, TN', day: 14, time: '11:18 AM', device: 'iPhone-01', followup: 'meeting', interest: 'Enterprise plan', notes: 'Budget approval needed; circle back Q1', optin: true },
    { name: 'Oliver Tate', email: 'o.tate@margiestravel.com', company: "Margie's Travel", title: 'Director, Tech', loc: 'San Francisco, CA', day: 16, time: '3:42 PM', device: 'iPhone-04', followup: 'sheet', interest: 'Mobile app · Security suite', notes: '—', optin: true },
    { name: 'Nora Hassan', email: 'n.hassan@schoolfa.org', company: 'School of Fine Art', title: 'Dean', loc: 'Philadelphia, PA', day: 16, time: '4:55 PM', device: 'iPhone-02', followup: 'fu', interest: 'General interest', notes: 'Education sector — needs special pricing', optin: true },
    { name: 'Lucas Marin', email: 'l.marin@southridgevideo.com', company: 'Southridge Video', title: 'CEO', loc: 'Burbank, CA', day: 16, time: '6:18 PM', device: 'iPhone-03', followup: 'meeting', interest: 'Partnership discussion', notes: 'Big fan, asking about reseller terms', optin: true },
    { name: 'Sophie Chen', email: 's.chen@munsons.com', company: "Munson's Pickles", title: 'Founder', loc: 'Detroit, MI', day: 15, time: '12:42 PM', device: 'iPad-01', followup: 'sheet', interest: 'Mobile app', notes: 'Solo founder, simple needs', optin: true },
  ];

  const PILL_CLASSES = { meeting: 'meeting', sheet: 'sheet', fu: 'fu', none: 'none' };
  const PILL_LABELS = { meeting: 'Meeting', sheet: 'Product sheets', fu: 'Follow-up email', none: '—' };

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function rowHtml(lead) {
    const optinHtml = lead.optin
      ? '<span class="opt">✓</span>'
      : '<span class="opt no">—</span>';
    const followupHtml = '<span class="pill ' + PILL_CLASSES[lead.followup] + '">' + escapeHtml(PILL_LABELS[lead.followup]) + '</span>';
    const titleLine = lead.title && lead.title !== '—' ? '<div class="t">' + escapeHtml(lead.title) + '</div>' : '<div class="t">—</div>';
    const emailLine = lead.email && lead.email !== '—' ? '<div class="e">' + escapeHtml(lead.email) + '</div>' : '<div class="e">—</div>';
    const searchText = (lead.name + ' ' + lead.email + ' ' + lead.company + ' ' + lead.title + ' ' + lead.loc + ' ' + lead.interest).toLowerCase();
    return '<tr data-search="' + escapeHtml(searchText) + '">' +
      '<td class="nm"><b>' + escapeHtml(lead.name) + '</b>' + emailLine + '</td>' +
      '<td class="co"><b>' + escapeHtml(lead.company) + '</b>' + titleLine + '</td>' +
      '<td>Oct ' + lead.day + ', ' + escapeHtml(lead.time) + '</td>' +
      '<td>' + followupHtml + '</td>' +
      '<td>' + escapeHtml(lead.interest) + '</td>' +
      '<td class="notes-cell">' + escapeHtml(lead.notes) + '</td>' +
      '<td>' + optinHtml + '</td>' +
    '</tr>';
  }

  const PAGE_SIZE = 20;
  let currentPage = 1;
  let filteredLeads = LEADS.slice();

  function render() {
    const tbody = document.getElementById('leadsTbody');
    if (!tbody) return;
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageLeads = filteredLeads.slice(start, end);
    tbody.innerHTML = pageLeads.map(rowHtml).join('');
    updateCount();
    renderPagination();
  }

  function updateCount() {
    const counter = document.getElementById('leadsCount');
    if (!counter) return;
    const total = filteredLeads.length;
    if (total === 0) {
      counter.textContent = 'No leads match your search';
      return;
    }
    const start = (currentPage - 1) * PAGE_SIZE + 1;
    const end = Math.min(currentPage * PAGE_SIZE, total);
    const grandTotal = LEADS.length;
    if (total === grandTotal) {
      counter.textContent = 'Showing ' + start + '–' + end + ' of ' + total + ' leads';
    } else {
      counter.textContent = 'Showing ' + start + '–' + end + ' of ' + total + ' (filtered from ' + grandTotal + ')';
    }
  }

  function renderPagination() {
    const wrap = document.getElementById('leadsPagination');
    if (!wrap) return;
    const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
    if (totalPages <= 1) {
      wrap.innerHTML = '';
      return;
    }
    let html = '<button class="pg-btn" onclick="goLeadsPage(' + (currentPage - 1) + ')"' + (currentPage === 1 ? ' disabled' : '') + '>← Prev</button>';
    for (let i = 1; i <= totalPages; i++) {
      html += '<button class="pg-btn' + (i === currentPage ? ' active' : '') + '" onclick="goLeadsPage(' + i + ')">' + i + '</button>';
    }
    html += '<button class="pg-btn" onclick="goLeadsPage(' + (currentPage + 1) + ')"' + (currentPage === totalPages ? ' disabled' : '') + '>Next →</button>';
    wrap.innerHTML = html;
  }

  window.goLeadsPage = function (page) {
    const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
    currentPage = Math.max(1, Math.min(totalPages, page));
    render();
    document.querySelector('.leads-table-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.filterLeads = function () {
    const q = (document.getElementById('leadsSearch').value || '').trim().toLowerCase();
    if (!q) {
      filteredLeads = LEADS.slice();
    } else {
      filteredLeads = LEADS.filter(lead => {
        const text = (lead.name + ' ' + lead.email + ' ' + lead.company + ' ' + lead.title + ' ' + lead.loc + ' ' + lead.interest).toLowerCase();
        return text.includes(q);
      });
    }
    currentPage = 1;
    render();
  };

  window.toggleExportMenu = function () {
    document.getElementById('exportMenu').classList.toggle('open');
  };

  window.doExport = function (fmt) {
    document.getElementById('exportMenu').classList.remove('open');
    toast('✓ Exporting leads as ' + fmt.toUpperCase() + '…');
  };

  window.pushToCrm = function () {
    toast('✓ Pushing 50 leads to Salesforce…');
  };

  function toast(msg) {
    const flash = document.createElement('div');
    flash.textContent = msg;
    flash.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#10B981;color:white;padding:10px 18px;border-radius:8px;font-weight:600;font-size:13px;font-family:Inter,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,0.18);z-index:2000;';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2500);
  }

  // Close the export menu when clicking elsewhere
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('exportMenu');
    const btn = e.target.closest('.export-btn');
    if (!menu) return;
    if (!btn && !e.target.closest('.export-menu')) {
      menu.classList.remove('open');
    }
  });

  document.addEventListener('DOMContentLoaded', render);
})();
