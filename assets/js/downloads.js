let downloads = (function () {
  window.addEventListener("DOMContentLoaded", init);

  function init() {
    console.log("--      downloads.js initiated");
    setFileSizes();
  }

  function getFileSize(url) {
    var fileSize = "";
    var http = new XMLHttpRequest();
    http.open("HEAD", url, true);
    http.onreadystatechange = function () {
      if(this.readyState == this.DONE) {
        if(this.status === 200) {
          fileSize = this.getResponseHeader("content-length");
          console.log("fileSize = " + fileSize);
        }
      }
    };
    http.send();
    return;
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
})();
