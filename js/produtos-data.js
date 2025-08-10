// /js/produtos-data.js  (NOVO ARQUIVO) — adicione novos produtos aqui
window.PRODUTOS = [
  {
    id: 'jade',
    nome: 'Jade DIY',
    imagens: [
      'images/jade1.png','images/jade2.png','images/jade3.png',
      'images/jade4.png','images/jade5.png','images/jade6.png',
      'images/jade7.png','images/jade8.png','images/jade9.png'
    ],
    resumo: 'Carteira de hardware open-source, segura e flexível.',
    preco: [
      { label: 'Jade DIY', valor: 'R$ 230' },
      { label: 'Box de Proteção', valor: 'R$ 70' }
    ],
    detalhesHTML: `
      <h4>Documentação do Dispositivo JADE DIY</h4>
      <p><strong>Introdução:</strong> dispositivo seguro e transparente.</p>
      <p><strong>Por que hardware open source?</strong> <a href="https://plebs.substack.com/p/hard-wallets-seguras" target="_blank">Artigo</a></p>
      <p><strong>Conectividade:</strong> GreenWallet • SideSwap • Sparrow • Electrum</p>
      <p><strong>Atualizações:</strong> via navegador / binários Sandmann / compilação GitHub</p>
      <p><strong>Bateria:</strong> interna (indicação limitada)</p>
      <p><strong>Segurança:</strong> Secure-element virtual Oracle</p>
      <p>Tutorial: <a href="https://www.youtube.com/watch?v=k-maFZiKSw4" target="_blank">YouTube</a></p>
      <p><a href="https://docs.google.com/document/d/1Bf8O-R478woq8z7Z8DnN9XlfGf9B3GT8rn0qgJiAUHM/edit?usp=sharing" target="_blank">Documentação completa</a></p>
    `,
    options: [
      { type: 'colorPair', title: 'Jade DIY', inputs: [
        { name:'jadeColor',   label:'Case'   },
        { name:'buttonColor', label:'Botões' }
      ]},
      { type: 'colorPair', title: 'Box de Proteção', inputs: [
        { name:'boxColor',    label:'Box'   },
        { name:'handleColor', label:'Alças' }
      ]}
    ],
    allowAddOnSeed: true,
    buyButtonText: 'Comprar Jade DIY'
  },

  {
    id: 'krux',
    nome: 'Krux Yahboom Modcase',
    imagens: ['images/krux1.png','images/krux2.png','images/krux3.png','images/krux4.png'],
    resumo: 'Modcase com bateria; placa eletrônica não inclusa.',
    preco: [
      { label: 'Modcase', valor: 'R$ 250' },
      { label: 'Box de Proteção', valor: 'R$ 89' }
    ],
    detalhesHTML: `
      <h4>Detalhes Técnicos</h4>
      <p>Inclui bateria e box de proteção (placa não inclusa).</p>
      <p>Tutorial: <a href="https://www.youtube.com/watch?v=V48RpmuZEwI" target="_blank">YouTube</a></p>
      <p>Placa referência: <a href="https://pt.aliexpress.com/item/1005007945453981.html" target="_blank">AliExpress</a></p>
      <p>Documentação: <a href="https://docs.google.com/document/d/1s70HUmdX3XX08GbINxEAay5eK_D3c4RLReKuautZYB4/edit?usp=sharing" target="_blank">Google Docs</a></p>
      <p>Encomenda completa: ~25 dias • R$ 775 + R$ 89 (box)</p>
    `,
    options: [
      { type: 'colorSingle', title: 'Modcase (opcional)', input: { name: 'kruxColor', label: 'Modcase' } },
      { type: 'colorPair', title: 'Box de Proteção (opcional)', inputs: [
        { name:'kruxBoxColor',    label:'Box'   },
        { name:'kruxHandleColor', label:'Alças' }
      ]}
    ],
    allowAddOnSeed: true,
    buyButtonText: 'Comprar Modcase'
  },

  {
    id: 'nerd',
    nome: 'NerdMiner',
    imagens: ['images/nm1.png','images/nm2.png','images/nm3.png'],
    resumo: 'Mini-miner (TTGO T-Display) rodando NerdMiner-v2.',
    preco: [{ label: 'NerdMiner (sem bateria)', valor: 'R$ 170' }],
    detalhesHTML: `
      <p>• ~55 KH/s • Stratum / pools self-custody.<br>
      • Firmware: <a href="https://github.com/BitMaker-hub/NerdMiner_v2" target="_blank">GitHub</a>.<br>
      • USB-C 5 V • Tutorial: <a href="https://www.youtube.com/watch?v=Cq0y1034oq8" target="_blank">YouTube</a>.</p>
    `,
    options: [
      { type: 'colorPair', title: 'Configurações de Case e Botões', inputs: [
        { name:'nerdCaseColor',   label:'Case'   },
        { name:'nerdButtonColor', label:'Botões' }
      ]}
    ],
    allowAddOnSeed: true,
    buyButtonText: 'Comprar NerdMiner'
  },

  {
    id: 'sandseed',
    nome: 'SandSeed – placas para backup de seed',
    imagens: ['images/sandseed1.png','images/sandseed2.png'],
    resumo: 'Kit Stakbit 1248 – 5 placas plásticas (3 lisas + 2 perfuradas, padrão BIP-39).',
    preco: [
      { label: 'Placa Avulsa', valor: '2 000 sats' },
      { label: 'Kit 5 un', valor: '5 000 sats' }
    ],
    detalhesHTML: `
      <p><strong>Como usar:</strong> coloque a placa sobre base firme e perfure cada letra com estilete, agulha grossa ou punção.</p>
      <p><strong>Utilidade:</strong> permite gravar, de forma física, offline e resistente ao fogo/água, as 24 palavras da sua seed BIP-39.</p>
      <p>Tutorial: <a href="https://stackbit.me/tutorial-stackbit-1248/" target="_blank">Vídeo oficial (Stackbit)</a></p>
      <p style="font-size:.9rem;color:#ccc">Design original por <a href="https://twitter.com/valandro" target="_blank">@Valandro</a>. Versão em aço inox disponível na <a href="https://stackbit.me/tutorial-stackbit-1248/#loja" target="_blank">loja do autor</a>.</p>
    `,
    options: [
      { type: 'seedPack' }  // radios "kit" e "single" + quantidade
    ],
    allowAddOnSeed: false,
    buyButtonText: 'Comprar SandSeed'
  }
];
