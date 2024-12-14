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

document.querySelector('.newNote').addEventListener('click',()=>{
    window.location.href='/cnNote'
})

document.addEventListener('DOMContentLoaded', async () => {
    const notesContainer = document.querySelector('.notes-container');

    try {
        const response = await fetch('/fetchNotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }

        const notes = await response.json();

        // Populate notes into the container
        notesContainer.innerHTML = notes
            .map(
                (note) => `
                <div class="note" data-id="${note._id}">
                    <h3>${note.name}</h3>
                    <p>${note.note}</p>
                    <span class="seen-status">${note.seen ? '✔✔' : '✔'}</span>
                </div>`
            )
            .join('');

        // Add event listeners for redirection
        const noteElements = notesContainer.querySelectorAll('.note');
        noteElements.forEach((noteElement) => {
            noteElement.addEventListener('click', () => {
                const noteId = noteElement.getAttribute('data-id');
                console.log('Redirecting to note ID:', noteId);
                window.location.href = `/edvNote/${noteId}`;
            });
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        notesContainer.innerHTML = '<p>Error loading notes. Please try again later.</p>';
    }
});
