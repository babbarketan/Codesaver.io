document.addEventListener('DOMContentLoaded', loadCodeSnippets);

document.getElementById('codeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const title = document.getElementById('codeTitle').value;
    const snippet = document.getElementById('codeSnippet').value;

    // Get the current date and time
    const dateTime = new Date().toLocaleString();

    // Create a code snippet object
    const codeSnippet = {
        title: title,
        snippet: snippet,
        dateTime: dateTime
    };

    // Save to local storage
    saveSnippetToLocalStorage(codeSnippet);
    
    // Clear the form
    document.getElementById('codeForm').reset();

    // Load snippets to display
    loadCodeSnippets();
});

function saveSnippetToLocalStorage(codeSnippet) {
    const existingSnippets = JSON.parse(localStorage.getItem('codeSnippets')) || [];
    existingSnippets.push(codeSnippet);
    localStorage.setItem('codeSnippets', JSON.stringify(existingSnippets));
}

function loadCodeSnippets() {
    const codeDisplay = document.getElementById('codeDisplay');
    codeDisplay.innerHTML = ''; // Clear existing snippets

    const snippets = JSON.parse(localStorage.getItem('codeSnippets')) || [];
    snippets.forEach((snippet, index) => {
        const codeItem = document.createElement('div');
        codeItem.classList.add('code-item');
        
        const codeHeader = document.createElement('div');
        codeHeader.style.display = 'flex';
        codeHeader.style.justifyContent = 'space-between';
        codeHeader.style.alignItems = 'center';

        const codeTitle = document.createElement('h2');
        codeTitle.textContent = snippet.title;

        const codeDateTime = document.createElement('span');
        codeDateTime.textContent = snippet.dateTime;
        codeDateTime.style.fontSize = '0.8em';
        codeDateTime.style.color = '#666'; // Optional styling for the date/time

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.backgroundColor = '#dc3545';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '4px';
        deleteButton.style.cursor = 'pointer';

        // Add click event to delete the snippet
        deleteButton.addEventListener('click', () => {
            deleteSnippetFromLocalStorage(index);
            loadCodeSnippets();
        });

        // Append title, date/time, and delete button to the header
        codeHeader.appendChild(codeTitle);
        codeHeader.appendChild(codeDateTime);
        codeHeader.appendChild(deleteButton);
        
        const codeContent = document.createElement('pre');
        codeContent.textContent = snippet.snippet;
        
        codeItem.appendChild(codeHeader);
        codeItem.appendChild(codeContent);
        codeDisplay.appendChild(codeItem);
    });
}

function deleteSnippetFromLocalStorage(index) {
    const existingSnippets = JSON.parse(localStorage.getItem('codeSnippets')) || [];
    existingSnippets.splice(index, 1); // Remove the snippet at the specified index
    localStorage.setItem('codeSnippets', JSON.stringify(existingSnippets));
}
