// iOS viewport height fix
function setFullHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setFullHeight);
setFullHeight();

// Vital signs default values
let bpSys = 120, bpDia = 80, hr = 75, temp = 37.0, rr = 16;
const defaultVals = { bpSys: 120, bpDia: 80, hr: 75, temp: 37.0, rr: 16 };

// Elements
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
const doritosSlider = document.getElementById('Doritos');
const doritosValue = document.getElementById('Doritos-value');

const applyBtn = document.getElementById('apply-factor');
const resetBtn = document.getElementById('reset');

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
  doritosValue.textContent = doritosSlider.value + (doritosSlider.value == 1 ? " serving" : " servings");
}

lisinoprilSlider.addEventListener('input', () => {
  lisinoprilValue.textContent = lisinoprilSlider.value + " mg";
});

doritosSlider.addEventListener('input', () => {
  doritosValue.textContent = doritosSlider.value + (doritosSlider.value == 1 ? " serving" : " servings");
});

bpSysSlider.addEventListener('input', () => {
  bpSys = parseInt(bpSysSlider.value);
  updateDisplay();
});
bpDiaSlider.addEventListener('input', () => {
  bpDia = parseInt(bpDiaSlider.value);
  updateDisplay();
});
hrSlider.addEventListener('input', () => {
  hr = parseInt(hrSlider.value);
  updateDisplay();
});
tempSlider.addEventListener('input', () => {
  temp = parseFloat(tempSlider.value);
  updateDisplay();
});
rrSlider.addEventListener('input', () => {
  rr = parseInt(rrSlider.value);
  updateDisplay();
});

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

applyBtn.onclick = () => {
  const lisinoprilDose = parseInt(lisinoprilSlider.value);
  const doritosAmount = parseInt(doritosSlider.value);

  bpSys = clamp(defaultVals.bpSys - Math.floor(lisinoprilDose / 10) * 5 + doritosAmount * 4, 80, 200);
  bpDia = clamp(defaultVals.bpDia - Math.floor(lisinoprilDose / 10) * 3 + doritosAmount, 40, 120);
  hr = clamp(defaultVals.hr + doritosAmount * 2, 30, 180);
  temp = clamp(defaultVals.temp + doritosAmount * 0.1, 34, 42);
  rr = clamp(defaultVals.rr + doritosAmount, 8, 40);

  updateDisplay();
};

resetBtn.onclick = () => {
  bpSys = defaultVals.bpSys;
  bpDia = defaultVals.bpDia;
  hr = defaultVals.hr;
  temp = defaultVals.temp;
  rr = defaultVals.rr;
  lisinoprilSlider.value = 0;
  doritosSlider.value = 0;
  updateDisplay();
};

updateDisplay();

