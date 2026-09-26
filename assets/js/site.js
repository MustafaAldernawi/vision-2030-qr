(() => {
  const downloadUrl = new URL('download.html', window.location.href);
  const canvas = document.getElementById('qr-code');
  const copyButton = document.getElementById('copy-download-link');
  const copyStatus = document.getElementById('copy-status');
  const saveButton = document.getElementById('save-qr');
  const qrStatus = document.getElementById('qr-status');

  function drawQr() {
    if (!canvas || typeof qrcode !== 'function') return;
    const qr = qrcode(0, 'M');
    qr.addData(downloadUrl.href);
    qr.make();
    const moduleCount = qr.getModuleCount();
    const quietZone = 4;
    const cellSize = Math.floor(canvas.width / (moduleCount + quietZone * 2));
    const size = cellSize * (moduleCount + quietZone * 2);
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    context.fillStyle = '#fffdf7';
    context.fillRect(0, 0, size, size);
    context.fillStyle = '#3f4635';
    for (let row = 0; row < moduleCount; row += 1) {
      for (let column = 0; column < moduleCount; column += 1) {
        if (qr.isDark(row, column)) context.fillRect((column + quietZone) * cellSize, (row + quietZone) * cellSize, cellSize, cellSize);
      }
    }
  }

  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(downloadUrl.href);
      copyStatus.textContent = 'تم نسخ رابط صفحة التحميل.';
    } catch {
      copyStatus.textContent = 'تعذر النسخ تلقائياً. انسخ الرابط من شريط العنوان.';
    }
  });

  saveButton?.addEventListener('click', () => {
    try {
      const link = document.createElement('a');
      link.download = 'vision-2030-download-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      qrStatus.textContent = 'تم تجهيز رمز QR للحفظ.';
    } catch {
      qrStatus.textContent = 'تعذر حفظ الرمز. حاول مرة أخرى.';
    }
  });

  drawQr();
})();
