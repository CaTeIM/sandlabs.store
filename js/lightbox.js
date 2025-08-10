// /js/lightbox.js  (NOVO ARQUIVO)
(function(){
  const lb = {};
  let imgs = [], idx = 0;

  function mount() {
    if (document.getElementById('lightbox')) return;
    const div = document.createElement('div');
    div.id = 'lightbox';
    div.className = 'lightbox';
    div.innerHTML = `
      <span class="close-btn" data-action="close">×</span>
      <img id="imagemModal" alt="Imagem Expandida">
      <button class="nav-btn prev-btn" data-action="prev">&#10094;</button>
      <button class="nav-btn next-btn" data-action="next">&#10095;</button>
    `;
    document.body.appendChild(div);
    div.addEventListener('click', (e) => {
      const a = e.target.dataset.action;
      if (a === 'close') close();
      else if (a === 'prev') prev();
      else if (a === 'next') next();
      if (e.target === div) close();
    });
  }

  function open(images, startIndex) {
    mount();
    imgs = images.slice();
    idx = startIndex || 0;
    document.getElementById('imagemModal').src = imgs[idx];
    document.getElementById('lightbox').style.display = 'flex';
  }

  function close() {
    const l = document.getElementById('lightbox');
    if (l) l.style.display = 'none';
  }

  function prev() {
    if (!imgs.length) return;
    idx = (idx - 1 + imgs.length) % imgs.length;
    document.getElementById('imagemModal').src = imgs[idx];
  }

  function next() {
    if (!imgs.length) return;
    idx = (idx + 1) % imgs.length;
    document.getElementById('imagemModal').src = imgs[idx];
  }

  window.lightbox = { open, close, prev, next, mount };
})();
