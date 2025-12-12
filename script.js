let idleTime = 2000; // da mettere 600000 = 10min
let timeout;
let isIdle = false;
const statusDiv = document.getElementById("status");
function setIdle() {
  isIdle = true;
  statusDiv.textContent = "User is not active";
  statusDiv.style.color = "red";
  window.location.href = 'index.html';
}
function setActive() {
  if (isIdle) {
    statusDiv.textContent = "User is active";
    statusDiv.style.color = "green";
  }
  isIdle = false;
  clearTimeout(timeout);
  timeout = setTimeout(setIdle, idleTime);
}
["mousemove", "keydown", "scroll", "touchstart", "click"].forEach(event => {
  document.addEventListener(event, setActive);
});
setActive();