const tg = Telegram.WebApp;

tg.ready();

if (tg.isVersionAtLeast('8.0')) {
  tg.requestFullscreen();
}

const canvas = document.getElementById('colorSpace');

canvas.addEventListener('pointerdown', e => {
  canvas.setPointerCapture(e.pointerId);
  updatePicker(e);
});

canvas.addEventListener('pointermove', e => {
  if (e.buttons !== 1) return;
  updatePicker(e);
});

canvas.addEventListener('pointerup', e => {
  canvas.releasePointerCapture(e.pointerId);
});

function updatePicker(e) {
  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  picker.x = x;
  picker.y = y;

  render();
}
