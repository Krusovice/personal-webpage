(function() {
    const tbody = document.getElementById('dynamic-table');

    // 1) Watch *any* typing in the table body
    tbody.addEventListener('input', e => {

        // 2) Find the last <tr> and ignore other rows
        const rows   = tbody.querySelectorAll('.input-row');
        const last   = rows[rows.length - 1];
        if (!last.contains(e.target)) return;

        // 3) Check if *all* inputs in that row are non-empty
        const inputs = Array.from(last.querySelectorAll('input'));
        if (!inputs.every(i => i.value.trim() !== '')) return;

        // 4) Clone the row, clear its values, and append it
        const clone = last.cloneNode(true);
        clone.querySelectorAll('input').forEach(i => i.value = '');
        tbody.appendChild(clone);
    });
})();