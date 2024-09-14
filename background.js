chrome.downloads.onCreated.addListener((downloadItem) => {
    checkFileExists(downloadItem);
  });
  
  function calculateFileHash(filePath, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const hash = crypto.subtle.digest('SHA-256', event.target.result);
      callback(hash);
    };
    reader.readAsArrayBuffer(filePath);
  }
  
  function checkFileExists(downloadItem) {
    const filePath = `path/to/downloads/${downloadItem.filename}`;
    
    chrome.storage.local.get(['existingFiles'], (result) => {
      const existingFiles = result.existingFiles || {};
      if (existingFiles[filePath]) {
        calculateFileHash(filePath, (hash) => {
          if (existingFiles[filePath] === hash) {
            // File exists and hash matches, show popup
            chrome.storage.local.set({ currentDownload: downloadItem });
            chrome.action.openPopup();
          } else {
            // File exists but hash does not match, proceed with download
            console.log(`File ${filePath} exists but hash does not match. Proceeding with download.`);
          }
        });
      } else {
        // File does not exist, proceed with download
        console.log(`File ${filePath} does not exist. Proceeding with download.`);
      }
    });
  }
  