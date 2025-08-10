// /js/compras.js  (NOVO ARQUIVO)
(function(){
  const COMPOSERS = {
    jade(d) {
      const hasJade = d.jadeColor && d.buttonColor;
      const hasBox  = d.boxColor  && d.handleColor;

      if ((d.jadeColor && !d.buttonColor) || (!d.jadeColor && d.buttonColor))
        return { ok:false, alert:'Selecione ambas as cores para a Jade DIY (Case e Botões) ou deixe ambas em branco.' };

      if ((d.boxColor && !d.handleColor) || (!d.boxColor && d.handleColor))
        return { ok:false, alert:'Selecione ambas as cores para a Box de Proteção (Box e Alças) ou deixe ambas em branco.' };

      if (!hasJade && !hasBox)
        return { ok:false, alert:'Selecione ao menos Jade DIY ou Box de Proteção.' };

      let msg = 'vim pelo site sandlabs.store e gostaria de pedir uma\n';
      if (hasJade) msg += `-jade (${d.jadeColor}) com botões (${d.buttonColor})\n`;
      if (hasJade && hasBox) msg += 'e uma \n';
      if (hasBox)  msg += `-box de proteção (${d.boxColor}) com alças (${d.handleColor})\n`;
      return { ok:true, msg };
    },

    krux(d) {
      const hasMod  = !!d.kruxColor;
      const hasBox  = d.kruxBoxColor && d.kruxHandleColor;

      if ((d.kruxBoxColor && !d.kruxHandleColor) || (!d.kruxBoxColor && d.kruxHandleColor))
        return { ok:false, alert:'Selecione ambas as cores para o Box de Proteção (Box e Alças) ou deixe ambas em branco.' };

      if (!hasMod && !hasBox)
        return { ok:false, alert:'Selecione a cor do Modcase ou as cores do Box de Proteção.' };

      let msg = 'vim pelo site sandlabs.store e gostaria de pedir uma\n';
      if (hasMod) msg += `-krux yahboom modcase: Modcase (${d.kruxColor})\n`;
      if (hasMod && hasBox) msg += 'e uma \n';
      if (hasBox) msg += `-box de proteção: Box (${d.kruxBoxColor}) com Alças (${d.kruxHandleColor})\n`;
      return { ok:true, msg };
    },

    nerd(d) {
      const caseCol = d.nerdCaseColor, btnCol = d.nerdButtonColor;

      if ((caseCol && !btnCol) || (!caseCol && btnCol))
        return { ok:false, alert:'Selecione ambas as cores do NerdMiner (Case e Botões) ou deixe ambas em branco.' };

      if (!caseCol && !btnCol)
        return { ok:false, alert:'Selecione a cor do Case e dos Botões do NerdMiner.' };

      let msg = 'vim pelo site sandlabs.store e gostaria de pedir um\n';
      msg += `-NerdMiner: Case (${caseCol}) com Botões (${btnCol})\n`;
      return { ok:true, msg };
    },

    sandseed(d) {
      let msg = 'vim pelo site sandlabs.store e gostaria de pedir\n';
      if (d.seedPack === 'kit' || !d.seedPack) {
        msg += '-SandSeed: kit 5 un (3 lisas + 2 perfuradas) – 5 000 sats\n';
      } else {
        const q = Math.max(1, Number(d.seedQty || 1));
        msg += `-SandSeed: ${q} placa(s) avulsas – ${q * 2000} sats\n`;
      }
      return { ok:true, msg };
    }
  };

  function finalizeCompra(form, produtoId, plataforma) {
    const data = Object.fromEntries(new FormData(form).entries());
    const produto = (window.PRODUTOS || []).find(p => p.id === produtoId);
    if (!produto) { alert('Produto não encontrado.'); return; }

    const cep = (data.cep || '').trim();
    const cupom = (data.cupom || '').trim();

    const composer = COMPOSERS[produtoId];
    if (!composer) { alert('Produto não suportado.'); return; }

    const res = composer(data);
    if (!res.ok) { alert(res.alert || 'Verifique as opções selecionadas.'); return; }

    let msg = res.msg;

    // Add-on SandSeed (para produtos que não são SandSeed e permitem o extra)
    if (produto.allowAddOnSeed && produtoId !== 'sandseed' && data.addSeedKit) {
      msg += '-SandSeed: kit 5 un (3 lisas + 2 perfuradas) – 5 000 sats\n';
    }

    msg += `\nPode calcular o frete para o CEP: ${cep}`;
    if (cupom) msg += `\nvim pelo (${cupom})`;

    const url = (plataforma === 'whats')
      ? `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`
      : `https://t.me/${CONFIG.telegramUsername}?text=${encodeURIComponent(msg)}`;

    window.open(url, '_blank');
  }

  window.finalizeCompra = finalizeCompra;
})();
