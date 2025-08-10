// /js/render-produtos.js  (NOVO ARQUIVO)
(function(){
  function el(tag, attrs = {}, html) {
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') e.className = v;
      else if (k === 'dataset') Object.entries(v).forEach(([dk, dv]) => e.dataset[dk] = dv);
      else if (k === 'onclick') e.addEventListener('click', v);
      else e.setAttribute(k, v);
    });
    if (html != null) e.innerHTML = html;
    return e;
  }

  function priceListHTML(precos) {
    if (!Array.isArray(precos)) return '';
    return precos.map(p => `<p><strong>${p.label}:</strong> ${p.valor}</p>`).join('');
  }

  function buildGallery(prod) {
    const g = el('div', { class:'galeria' });
    const fullPaths = prod.imagens.map(src => src); // já com 'images/...'
    prod.imagens.forEach((src, i) => {
      const img = el('img', { src, alt: `${prod.nome} ${i+1}` });
      img.addEventListener('click', () => lightbox.open(fullPaths, i));
      g.appendChild(img);
    });
    return g;
  }

  function buildDescBox(prod) {
    const box = el('div', { class:'desc-box' });
    box.appendChild(el('h3', {}, `Informações sobre ${prod.nome}`));
    box.appendChild(el('p', {}, prod.resumo));
    box.insertAdjacentHTML('beforeend', priceListHTML(prod.preco));

    const infoBtn = el('button', { class:'info-btn' }, '+ Informações');
    const infoArea = el('div', { style:'display:none;margin-top:1rem' }, prod.detalhesHTML);
    infoBtn.addEventListener('click', () => {
      infoArea.style.display = (infoArea.style.display === 'none') ? 'block' : 'none';
    });

    const buyBtn = el('button', { class:'buy-btn' }, prod.buyButtonText || `Comprar ${prod.nome}`);
    buyBtn.addEventListener('click', () => openPurchaseModal(prod));

    box.appendChild(infoBtn);
    box.appendChild(infoArea);
    box.appendChild(buyBtn);
    return box;
  }

  function sectionProduto(prod) {
    const sec = el('section', { class:'produto-section' });
    sec.appendChild(el('h3', {}, prod.nome));
    sec.appendChild(buildGallery(prod));
    sec.appendChild(buildDescBox(prod));
    return sec;
  }

  /* ===== Modal de Compra (Genérico) ===================================== */
  function ensureModal() {
    let modal = document.getElementById('modal-compra');
    if (modal) return modal;

    modal = el('div', { id:'modal-compra', class:'modal' });
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <img src="images/cor_exemplo.png" class="demo" alt="Demonstração">
        <h3 id="mc-title"></h3>
        <form id="mc-form"></form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target.dataset.close !== undefined || e.target === modal) {
        closePurchaseModal();
      }
    });

    return modal;
  }

  function closePurchaseModal() {
    const modal = document.getElementById('modal-compra');
    if (modal) modal.style.display = 'none';
  }

  function openPurchaseModal(prod) {
    const modal = ensureModal();
    const title = modal.querySelector('#mc-title');
    const form  = modal.querySelector('#mc-form');
    title.textContent = `Opções para ${prod.nome}`;
    form.innerHTML = ''; // limpa

    // Monta os grupos de opções conforme definição do produto
    (prod.options || []).forEach(opt => {
      if (opt.type === 'colorPair') {
        const group = el('div', { class:'group' });
        group.appendChild(el('p', {}, `<strong>${opt.title}</strong>`));
        opt.inputs.forEach(inp => {
          group.appendChild(el('p', {}, inp.label + ':'));
          const grid = el('div', { class:'option-grid' });
          buildColorSelector(grid, inp.name);
          group.appendChild(grid);
        });
        form.appendChild(group);
      }

      if (opt.type === 'colorSingle') {
        const group = el('div', { class:'group' });
        group.appendChild(el('p', {}, `<strong>${opt.title}</strong>`));
        const grid = el('div', { class:'option-grid' });
        buildColorSelector(grid, opt.input.name);
        group.appendChild(grid);
        form.appendChild(group);
      }

      if (opt.type === 'seedPack') {
        const group = el('div', { class:'group' });
        group.appendChild(el('p', {}, `<strong>Selecione:</strong>`));

        const labelKit = el('label', {}, `
          <input type="radio" name="seedPack" value="kit" checked> Kit 5 un – 5 000 sats
        `);
        const labelSingle = el('label', {}, `
          <input type="radio" name="seedPack" value="single"> Placa avulsa – 2 000 sats
        `);
        group.appendChild(labelKit);
        group.appendChild(el('br'));
        group.appendChild(labelSingle);

        const qtyBox = el('div', { id:'seedQtyBox', style:'display:none;margin-top:8px' });
        qtyBox.innerHTML = `
          <p>Quantidade de placas:</p>
          <input type="number" name="seedQty" min="1" max="10" value="1">
        `;
        group.appendChild(qtyBox);

        group.addEventListener('change', (e) => {
          if (e.target.name === 'seedPack') {
            qtyBox.style.display = (e.target.value === 'single') ? 'block' : 'none';
          }
        });

        form.appendChild(group);
      }
    });

    // Add-on SandSeed (checkbox) quando permitido e produto não é 'sandseed'
    if (prod.allowAddOnSeed && prod.id !== 'sandseed') {
      const groupAddon = el('div', { class:'group' });
      groupAddon.innerHTML = `
        <label>
          <input type="checkbox" name="addSeedKit">
          Adicionar <strong>Kit SandSeed (5 placas)</strong>
        </label>
      `;
      form.appendChild(groupAddon);
    }

    // CEP
    const cepGroup = el('div', { class:'group' });
    cepGroup.appendChild(el('p', {}, 'CEP:'));
    cepGroup.appendChild(el('input', { type:'text', name:'cep', placeholder:'Seu CEP', required:true }));
    form.appendChild(cepGroup);

    // Cupom
    const cupomGroup = el('div', { class:'group' });
    cupomGroup.appendChild(el('p', { style:'font-style:italic;color:#ccc' }, 'Cupom (opcional):'));
    cupomGroup.appendChild(el('input', { type:'text', name:'cupom', placeholder:'Cupom' }));
    form.appendChild(cupomGroup);

    // Ações finais
    const actions = el('div', { class:'final-actions' });
    const bWhats  = el('button', { type:'button', class:'final-btn' }, 'WhatsApp');
    const bTele   = el('button',  { type:'button', class:'final-btn' }, 'Telegram');
    bWhats.addEventListener('click', () => finalizeCompra(form, prod.id, 'whats'));
    bTele .addEventListener('click', () => finalizeCompra(form, prod.id, 'tele'));
    actions.appendChild(bWhats);
    actions.appendChild(bTele);
    form.appendChild(actions);

    // Exibe o modal
    modal.style.display = 'block';

    // Preenche cupom automaticamente se existir (cupom.js cuida globalmente, mas garantimos aqui)
    const saved = localStorage.getItem('cupom');
    if (saved) {
      const cupomInput = form.querySelector('input[name="cupom"]');
      if (cupomInput && !cupomInput.value) cupomInput.value = saved;
    }
  }

  /* ===== Renderização da página de produtos =============================== */
  window.addEventListener('DOMContentLoaded', () => {
    lightbox.mount();

    const cont = document.getElementById('produtos-container');
    cont.innerHTML = '';

    (window.PRODUTOS || []).forEach(prod => {
      cont.appendChild(sectionProduto(prod));
    });
  });
})();
