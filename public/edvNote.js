const menuToggle = document.querySelector('.menu-toggle');
const menuDropdown = document.querySelector('.menu-dropdown');

// Toggle the dropdown menu
menuToggle.addEventListener('click', () => {
    menuDropdown.style.display =
        menuDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.style.display = 'none';
    }
});

const noteInput = document.querySelector('#note');

/*document.addEventListener('DOMContentLoaded', () => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
        noteInput.value = savedNote;
    }
});*/

noteInput.addEventListener('input', () => {
    const note = noteInput.value;
    localStorage.setItem('note', note);
});

document.querySelector('#save').addEventListener('click', () => {
    const note = localStorage.getItem('note'); // Retrieve the note from localStorage

    // Extract the ID from the current URL
    const path = window.location.pathname;
    console.log(path)
    
        fetch(path, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ note: note }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update the note');
            }
            return response.json();
        })
        .then(data => {
            console.log('Note updated successfully:', data);
            localStorage.removeItem('note'); // Remove note only after success
        })
        .catch(error => {
            console.error('Error updating the note:', error);
        });
});
