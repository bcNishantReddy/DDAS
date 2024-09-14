document.getElementById('goToFile').addEventListener('click', () => {
    chrome.storage.local.get(['currentDownload'], (result) => {
      const downloadItem = result.currentDownload;
      const filePath = `path/to/downloads/${downloadItem.filename}`;
      chrome.downloads.showDefaultFolder();
      chrome.downloads.search({ filename: filePath }, (results) => {
        if (results.length > 0) {
          chrome.downloads.show(results[0].id);
        }
      });
    });
  });
  
  document.getElementById('cancelDownload').addEventListener('click', () => {
    chrome.storage.local.get(['currentDownload'], (result) => {
      const downloadItem = result.currentDownload;
      chrome.downloads.cancel(downloadItem.id);
    });
  });
  
  document.getElementById('downloadAnyway').addEventListener('click', () => {
    chrome.storage.local.get(['currentDownload'], (result) => {
      const downloadItem = result.currentDownload;
      chrome.downloads.resume(downloadItem.id);
    });
  });
  