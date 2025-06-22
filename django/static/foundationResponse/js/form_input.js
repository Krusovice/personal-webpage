document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('dynamic-table');

  // 1) Add new row when last one is filled
  tbody.addEventListener('input', e => {
    const rows = tbody.querySelectorAll('.input-row');
    const last = rows[rows.length - 1];
    if (!last.contains(e.target)) return;

    const inputs = Array.from(last.querySelectorAll('input'));
    if (!inputs.every(i => i.value.trim() !== '')) return;

    const clone = last.cloneNode(true);
    clone.querySelectorAll('input').forEach(i => i.value = '');
    tbody.appendChild(clone);
  });

  // 2) Delete row when delete button is clicked
  tbody.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('delete-row')) {
      const row = e.target.closest('tr');

      // Prevent deleting the last remaining row (optional)
      if (tbody.querySelectorAll('tr').length > 1) {
        row.remove();
      }
    }
  });
});
