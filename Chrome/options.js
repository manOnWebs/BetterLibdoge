document.addEventListener('DOMContentLoaded', () => {
    // Function to update the display of the dictionary
    const updateDisplay = () => {
        chrome.storage.local.get(['globaldictionary'], function(result) {
            const globalDictionary = result.globaldictionary;

            if (globalDictionary) {
                // Display meta data
                document.getElementById('meta-data').textContent = JSON.stringify(globalDictionary.meta, null, 2);
                
                // Display content data
                document.getElementById('content-data').textContent = JSON.stringify(globalDictionary.content, null, 2);
            } else {
                document.getElementById('meta-data').textContent = 'No meta data found.';
                document.getElementById('content-data').textContent = 'No content data found.';
            }
        });
    };

    updateDisplay(); // Initial display update

    // Clear dictionary button
    document.getElementById('clear-button').addEventListener('click', () => {
        chrome.storage.local.remove('globaldictionary', () => {
            alert('Global dictionary cleared!');
            updateDisplay();
        });
    });

    // Remove entry button
    document.getElementById('remove-button').addEventListener('click', () => {
        const entryToRemove = document.getElementById('remove-entry').value.trim();
        chrome.storage.local.get(['globaldictionary'], function(result) {
            let globalDictionary = result.globaldictionary;

            if (globalDictionary) {
                // Remove entry from meta and content
                globalDictionary.meta = globalDictionary.meta.filter(word => word !== entryToRemove);
                globalDictionary.content = globalDictionary.content.filter(word => word !== entryToRemove);
                
                // Save the updated dictionary
                chrome.storage.local.set({ globaldictionary: globalDictionary }, () => {
                    alert(`Removed entry: "${entryToRemove}"`);
                    updateDisplay(); // Refresh the display
                });
            } else {
                alert('No global dictionary found.');
            }
        });
    });

    // Download dictionary as JSON
    document.getElementById('download-button').addEventListener('click', () => {
        chrome.storage.local.get(['globaldictionary'], function(result) {
            const globalDictionaryJSON = JSON.stringify(result.globaldictionary, null, 2);
            if (globalDictionaryJSON) {
                const blob = new Blob([globalDictionaryJSON], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'globaldictionary.json'; // File name for download
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url); // Clean up
            } else {
                alert('No global dictionary found to download.');
            }
        });
    });
});
