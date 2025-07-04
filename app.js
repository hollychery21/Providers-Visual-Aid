// Default vital sign values
let bpSys = 120, bpDia = 80, hr = 75, temp = 37.0, rr = 16;
const defaultVals = { bpSys: 120, bpDia: 80, hr: 75, temp: 37.0, rr: 16 };

// Get slider/input elements
const bpSysSlider = document.getElementById('bp-sys');
const bpDiaSlider = document.getElementById('bp-dia');
const hrSlider = document.getElementById('hr');
const tempSlider = document.getElementById('temp');
const rrSlider = document.getElementById('rr');

const bpValue = document.getElementById('bp-value');
const hrValue = document.getElementById('hr-value');
const tempValue = document.getElementById('temp-value');
const rrValue = document.getElementById('rr-value');

const lisinoprilSlider = document.getElementById('Lisinopril');
const lisinoprilValue = document.getElementById('Lisinopril-value');
const chipsSlider = document.getElementById('chips');
const chipsValue = document.getElementById('chips-value');

const applyBtn = document.getElementById('apply-factor');
const resetBtn = document.getElementById('reset');

// Update value display for sliders
function updateDisplay() {
  bpValue.textContent = `${bpSys}/${bpDia}`;
  hrValue.textContent = hr;
  tempValue.textContent = temp.toFixed(1);
  rrValue.textContent = rr;
  bpSysSlider.value = bpSys;
  bpDiaSlider.value = bpDia;
  hrSlider.value = hr;
  tempSlider.value = temp;
  rrSlider.value = rr;
  lisinoprilValue.textContent = lisinoprilSlider.value + " mg";
  chipsValue.textContent = chipsSlider.value + "serving";
}

// Listen for slider changes to update the numbers live
lisinoprilSlider.oninput = function() {
  lisinoprilValue.textContent = this.value + " mg";
};
chipsSlider.oninput = function() {
  chipsValue.textContent = this.value + " serving";
};

// Also update values for manual vital sign sliders
bpSysSlider.oninput = function() { bpSys = parseInt(this.value); updateDisplay(); }
bpDiaSlider.oninput = function() { bpDia = parseInt(this.value); updateDisplay(); }
hrSlider.oninput = function() { hr = parseInt(this.value); updateDisplay(); }
tempSlider.oninput = function() { temp = parseFloat(this.value); updateDisplay(); }
rrSlider.oninput = function() { rr = parseInt(this.value); updateDisplay(); }

// Apply effect when "Simulate time" clicked
applyBtn.onclick = function() {
  // Lisinopril: for each 10mg, lower sys by 5, dia by 3
  const lisinoprilDose = parseInt(lisinoprilSlider.value);
  const chipsAmount = parseInt(chipsSlider.value);

  bpSys = defaultVals.bpSys - Math.floor(lisinoprilDose / 10) * 5 + chipsAmount * 4;
  bpDia = defaultVals.bpDia - Math.floor(lisinoprilDose / 10) * 3 + chipsAmount;
  hr = defaultVals.hr + chipsAmount * 2;
  temp = defaultVals.temp + chipsAmount * 0.1;
  rr = defaultVals.rr + chipsAmount;

  // Clamp values to normal ranges
  bpSys = Math.max(80, Math.min(200, bpSys));
  bpDia = Math.max(40, Math.min(120, bpDia));
  hr = Math.max(30, Math.min(180, hr));
  temp = Math.max(34, Math.min(42, temp));
  rr = Math.max(8, Math.min(40, rr));

  updateDisplay();
};

// Reset to defaults
resetBtn.onclick = function() {
  bpSys = defaultVals.bpSys;
  bpDia = defaultVals.bpDia;
  hr = defaultVals.hr;
  temp = defaultVals.temp;
  rr = defaultVals.rr;
  lisinoprilSlider.value = 0;
  chipsSlider.value = 0;
  updateDisplay();
};

updateDisplay();
<script>
  function openTutorial() {
    document.getElementById("tutorialModal").style.display = "block";
  }

  function closeTutorial() {
    document.getElementById("tutorialModal").style.display = "none";
  }

  // Show tutorial once per session
  window.onload = function () {
    if (!sessionStorage.getItem("tutorialSeen")) {
      openTutorial();
      sessionStorage.setItem("tutorialSeen", "true");
    }
  };
</script>


