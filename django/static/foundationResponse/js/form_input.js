// Function to update the indices of the formset rows after deleting or inserting a row.
// To make sure that the rows are fed to the foundation-response-predictor API in the right order.
function updateFormsetIndexes(tbody) {
    const rows = Array.from(tbody.querySelectorAll('.soil-table-input-row'));

    rows.forEach((row, index) => {
        const inputs = row.querySelectorAll('input');

        inputs.forEach(input => {
            input.name = input.name.replace(/\d+/, index);
            input.id = input.id.replace(/\d+/, index);
        });
    });
}

function updateDeleteButton(tbody) {
    const rows = tbody.querySelectorAll('.soil-table-input-row');

    // Disabling if the row is the last row
    if (rows.length === 1) {
        tbody.querySelector('.delete-row').disabled = true;
    } else {
        tbody.querySelectorAll('.delete-row').forEach(btn => btn.disabled = false);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('dynamic-table');

  // 1) Add new row when last one is filled
    tbody.addEventListener('input', e => {
        const rows = tbody.querySelectorAll('.soil-table-input-row');
        const rowsCount = rows.length;
        const lastRow = rows[rowsCount - 1];

        // Returning nothing if the last row doesn't contain the trigger.
        if (!lastRow.contains(e.target)) return;

        // Returning nothing if any of the last rows inputs are empty.
        const inputs = Array.from(lastRow.querySelectorAll('input'));
        if (inputs.some(i => i.value.trim() == '' && i.disabled == false )) return;

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

        updateDeleteButton(tbody);
    }); 

  // 2) Delete row
    tbody.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('delete-row')) {
            const row = e.target.closest('tr');
            row.remove();

            // Update TOTAL_FORMS so Django expects the new row
            const totalFormsInput = document.querySelector('input[name="soils-TOTAL_FORMS"]');
            const rows = tbody.querySelectorAll('.soil-table-input-row');
            totalFormsInput.value = rows.length;

            updateFormsetIndexes(tbody);
            updateDeleteButton(tbody);
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
            const rows = tbody.querySelectorAll('.soil-table-input-row');
            totalFormsInput.value = rows.length;

            updateFormsetIndexes(tbody);
            updateDeleteButton(tbody);
        }
    });


});
