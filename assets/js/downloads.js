const downloads = (function () {
  window.addEventListener("DOMContentLoaded", init);

  function init() {
    console.log("--      downloads.js initiated");
    setFileNames();
  }
  
  function setFileNames() {
    let fileNameCalls = [].slice.call(document.querySelectorAll('[data-file-name]'));
    fileNameCalls.map(function(fileNameCall) {
      let fileUrl = fileNameCall.getAttribute('data-file-name');
      fileNameCall.innerText = getFileName(fileUrl);
    });
  }

  function getFileName(fileString) {
    let lastIndex = fileString.lastIndexOf('/');
    return fileString.substring(lastIndex + 1);
  }
})();
