(() => {
  "use strict";

  const perguntas = [
    {
      categoria: "PRIMEIRAS IMPRESSÕES",
      enunciado: "Você conhece uma IA capaz de responder perguntas e criar imagens e áudios realistas. Qual é sua primeira reação?",
      alternativas: [
        { texto: "Isso me preocupa. Precisamos entender os riscos antes de confiar.", perfil: "cauteloso", explicacao: "Você tende a observar os riscos e pensar nas consequências antes de adotar uma nova tecnologia." },
        { texto: "Isso é incrível! Quero descobrir tudo o que ela consegue fazer.", perfil: "explorador", explicacao: "Você demonstra curiosidade e vontade de experimentar as possibilidades de novas ferramentas." }
      ]
    },
    {
      categoria: "APRENDER E PESQUISAR",
      enunciado: "Sua professora pede um trabalho sobre tecnologia. Como você decide pesquisar o assunto?",
      alternativas: [
        { texto: "Uso a IA para encontrar ideias e explicações, depois confiro as informações em fontes confiáveis.", perfil: "equilibrado", explicacao: "Você procura combinar a rapidez da IA com pesquisa, verificação e pensamento próprio." },
        { texto: "Pesquiso em sites, converso com colegas e desenvolvo minhas próprias conclusões.", perfil: "autonomo", explicacao: "Você valoriza construir suas conclusões a partir de diferentes fontes e do próprio raciocínio." }
      ]
    },
    {
      categoria: "O TRABALHO DO FUTURO",
      enunciado: "Em um debate, a turma discute como a IA pode transformar profissões. Qual ponto você destacaria?",
      alternativas: [
        { texto: "É essencial proteger trabalhadores e preparar as pessoas para mudanças nos empregos.", perfil: "cauteloso", explicacao: "Você dá importância aos impactos sociais e à necessidade de uma transição justa para os trabalhadores." },
        { texto: "A IA também pode criar profissões e ajudar pessoas a desenvolver novas habilidades.", perfil: "explorador", explicacao: "Você enxerga potencial para inovação, novas oportunidades e desenvolvimento de habilidades." }
      ]
    },
    {
      categoria: "CRIATIVIDADE",
      enunciado: "Você precisa criar uma imagem para representar sua opinião sobre inteligência artificial. O que prefere?",
      alternativas: [
        { texto: "Criar a imagem manualmente, usando uma ferramenta de desenho.", perfil: "autonomo", explicacao: "Você gosta de manter o processo criativo nas próprias mãos e controlar cada detalhe." },
        { texto: "Experimentar um gerador de imagens por IA e ajustar o resultado com minhas ideias.", perfil: "explorador", explicacao: "Você gosta de testar ferramentas novas e usá-las como ponto de partida para criar." }
      ]
    },
    {
      categoria: "ÉTICA E RESPONSABILIDADE",
      enunciado: "Um colega entrega um texto gerado por IA sem revisar nada. O que você sugere?",
      alternativas: [
        { texto: "Conferir os fatos, reescrever com as próprias palavras e acrescentar ideias do grupo.", perfil: "equilibrado", explicacao: "Você entende que a IA pode ajudar, mas a revisão, a autoria e a responsabilidade continuam humanas." },
        { texto: "Se o texto ficou pronto rápido, podemos entregar assim e ganhar tempo.", perfil: "pratico", explicacao: "Você valoriza a agilidade, mas vale lembrar que textos de IA podem conter erros e não substituir o aprendizado." }
      ]
    }
  ];

  const elementos = {
    app: document.querySelector("#app"),
    quiz: document.querySelector(".quiz"),
    contador: document.querySelector("#contador-perguntas"),
    porcentagem: document.querySelector("#porcentagem-progresso"),
    barra: document.querySelector("#barra-progresso"),
    preenchimento: document.querySelector("#preenchimento-progresso"),
    categoria: document.querySelector("#categoria-pergunta"),
    pergunta: document.querySelector("#titulo-pergunta"),
    alternativas: document.querySelector("#alternativas"),
    voltar: document.querySelector("#voltar"),
    resultado: document.querySelector("#resultado"),
    tituloResultado: document.querySelector("#titulo-resultado"),
    textoResultado: document.querySelector("#texto-resultado"),
    resumo: document.querySelector("#resumo-escolhas"),
    reiniciar: document.querySelector("#reiniciar"),
    ano: document.querySelector("#ano-atual")
  };

  let indiceAtual = 0;
  const respostas = [];

  const perfis = {
    cauteloso: {
      titulo: "O observador crítico",
      texto: "Você costuma olhar primeiro para os riscos e para as pessoas afetadas pelas mudanças. Questionar, verificar e pensar nas consequências é importante para que a tecnologia seja usada com responsabilidade."
    },
    explorador: {
      titulo: "O explorador de possibilidades",
      texto: "Você se interessa pelas novidades e pelo que a IA pode tornar possível. Sua curiosidade pode abrir caminhos — e fica ainda mais forte quando vem acompanhada de senso crítico e responsabilidade."
    },
    equilibrado: {
      titulo: "O usuário consciente",
      texto: "Você tende a ver a IA como uma ferramenta de apoio, não como substituta do julgamento humano. Verificar informações, revisar resultados e manter a autoria são atitudes importantes para usar tecnologia com consciência."
    },
    autonomo: {
      titulo: "O pensador independente",
      texto: "Você valoriza suas próprias ideias e gosta de construir respostas por conta própria. Combinar essa autonomia com fontes variadas e ferramentas úteis pode ampliar ainda mais seu aprendizado."
    },
    pratico: {
      titulo: "O solucionador prático",
      texto: "Você valoriza rapidez e eficiência. Para transformar essa praticidade em bons resultados, lembre-se de conferir os fatos e assumir a responsabilidade pelo que entrega."
    }
  };

  function atualizarProgresso() {
    const respondidas = indiceAtual + 1;
    const porcentagem = Math.round((respondidas / perguntas.length) * 100);
    elementos.contador.textContent = `PERGUNTA ${respondidas} DE ${perguntas.length}`;
    elementos.porcentagem.textContent = `${porcentagem}%`;
    elementos.preenchimento.style.width = `${porcentagem}%`;
    elementos.barra.setAttribute("aria-valuenow", String(porcentagem));
    elementos.voltar.disabled = indiceAtual === 0;
  }

  function mostrarPergunta() {
    if (indiceAtual >= perguntas.length) {
      mostrarResultado();
      return;
    }

    const pergunta = perguntas[indiceAtual];
    elementos.resultado.hidden = true;
    elementos.quiz.hidden = false;
    elementos.categoria.textContent = pergunta.categoria;
    elementos.pergunta.textContent = pergunta.enunciado;
    elementos.alternativas.replaceChildren();
    atualizarProgresso();

    pergunta.alternativas.forEach((alternativa, indiceAlternativa) => {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "alternativa";
      botao.setAttribute("aria-pressed", "false");

      const letra = document.createElement("span");
      letra.className = "alternativa-letra";
      letra.setAttribute("aria-hidden", "true");
      letra.textContent = String.fromCharCode(65 + indiceAlternativa);

      const texto = document.createElement("span");
      texto.className = "alternativa-texto";
      texto.textContent = alternativa.texto;

      const seta = document.createElement("span");
      seta.className = "alternativa-seta";
      seta.setAttribute("aria-hidden", "true");
      seta.textContent = "↗";

      botao.append(letra, texto, seta);
      if (respostas[indiceAtual] === indiceAlternativa) {
        botao.classList.add("selecionada");
        botao.setAttribute("aria-pressed", "true");
      }
      botao.addEventListener("click", () => selecionarResposta(indiceAlternativa));
      elementos.alternativas.appendChild(botao);
    });
    elementos.pergunta.focus({ preventScroll: true });
  }

  function selecionarResposta(indiceAlternativa) {
    respostas[indiceAtual] = indiceAlternativa;
    if (indiceAtual < perguntas.length - 1) {
      indiceAtual += 1;
      mostrarPergunta();
    } else {
      indiceAtual = perguntas.length;
      mostrarResultado();
    }
  }

  function mostrarResultado() {
    elementos.quiz.hidden = true;
    elementos.resultado.hidden = false;
    elementos.contador.textContent = "QUIZ CONCLUÍDO";
    elementos.porcentagem.textContent = "100%";
    elementos.preenchimento.style.width = "100%";
    elementos.barra.setAttribute("aria-valuenow", "100");

    const contagem = {};
    respostas.forEach((resposta, indice) => {
      const perfil = perguntas[indice].alternativas[resposta].perfil;
      contagem[perfil] = (contagem[perfil] || 0) + 1;
    });

    const ordemDesempate = ["equilibrado", "cauteloso", "explorador", "autonomo", "pratico"];
    const perfilVencedor = Object.keys(contagem).sort((a, b) =>
      contagem[b] - contagem[a] || ordemDesempate.indexOf(a) - ordemDesempate.indexOf(b)
    )[0] || "equilibrado";
    const perfil = perfis[perfilVencedor];

    elementos.tituloResultado.textContent = perfil.titulo;
    elementos.textoResultado.textContent = perfil.texto;
    elementos.resumo.replaceChildren();

    const tituloResumo = document.createElement("h3");
    tituloResumo.textContent = "Suas escolhas";
    elementos.resumo.appendChild(tituloResumo);

    respostas.forEach((resposta, indice) => {
      const item = document.createElement("div");
      item.className = "resumo-item";
      const numero = document.createElement("span");
      numero.className = "resumo-numero";
      numero.textContent = String(indice + 1).padStart(2, "0");
      const conteudo = document.createElement("div");
      const pergunta = document.createElement("strong");
      pergunta.textContent = perguntas[indice].categoria;
      const respostaTexto = document.createElement("p");
      respostaTexto.textContent = perguntas[indice].alternativas[resposta].texto;
      conteudo.append(pergunta, respostaTexto);
      item.append(numero, conteudo);
      elementos.resumo.appendChild(item);
    });
    elementos.reiniciar.focus({ preventScroll: true });
  }

  function reiniciarQuiz() {
    indiceAtual = 0;
    respostas.length = 0;
    mostrarPergunta();
  }

  elementos.voltar.addEventListener("click", () => {
    if (indiceAtual > 0 && indiceAtual < perguntas.length) {
      indiceAtual -= 1;
      mostrarPergunta();
    }
  });
  elementos.reiniciar.addEventListener("click", reiniciarQuiz);
  elementos.ano.textContent = String(new Date().getFullYear());

  mostrarPergunta();
})();
