document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('dynamic-table');

  // 1) Add new row when last one is filled
    tbody.addEventListener('input', e => {
        const rows = tbody.querySelectorAll('.input-row');
        const rowsCount = rows.length;
        const lastRow = rows[rowsCount - 1];
        if (!lastRow.contains(e.target)) return; // If its not the last row that is the trigger.

        const inputs = Array.from(lastRow.querySelectorAll('input'));
        if (inputs.some(i => i.value.trim() == '')) return;

        const clone = lastRow.cloneNode(true);

        clone.querySelectorAll('input').forEach(i => {
            i.value = '';
            const name = i.name;
            const newName = name.replace(/\d+/, rowsCount); // e.g., "soils-1-level"
            i.name = newName;
        });

        tbody.appendChild(clone);

        // Update TOTAL_FORMS so Django expects the new row
        const totalFormsInput = document.querySelector('input[name="soils-TOTAL_FORMS"]');
        totalFormsInput.value = rowsCount + 1;
    }); 

  // 2) Delete row
    tbody.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('delete-row')) {
            const row = e.target.closest('tr');
            row.remove();

            // Update TOTAL_FORMS so Django expects the new row
            const totalFormsInput = document.querySelector('input[name="soils-TOTAL_FORMS"]');
            const rows = tbody.querySelectorAll('.input-row');
            totalFormsInput.value = rows.length; 
        }
    });

  // 3) Add row
    tbody.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('insert-row')) {
            const row = e.target.closest('tr');

            const newRow = row.cloneNode(true);
            newRow.querySelectorAll('input').forEach(i => i.value = '');
            tbody.insertBefore(newRow, row);

            // Update TOTAL_FORMS so Django expects the new row
            const totalFormsInput = document.querySelector('input[name="soils-TOTAL_FORMS"]');
            const rows = tbody.querySelectorAll('.input-row');
            totalFormsInput.value = rows.length;
        }
    });

    // Fading delete button if only one child
    tbody.addEventListener()
});
