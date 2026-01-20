let idleTime = 2000; // da mettere 600000 = 10min
let timeout;
let isIdle = false;
const statusDiv = document.getElementById("status");
function setIdle() {
  isIdle = true;
  window.location.href = 'index.html';
}
function setActive() {
  isIdle = false;
  clearTimeout(timeout);
  timeout = setTimeout(setIdle, idleTime);
}
["mousemove", "keydown", "scroll", "touchstart", "click"].forEach(event => {
  document.addEventListener(event, setActive);
});
setActive();