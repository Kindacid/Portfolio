const projetos = {
  'venus': {
    nome: 'Venus',
    imagem: 'src/images/venus_logo-playstore.png',
    tecnologias: 'Java · Firebase · Android Studio',
    descricao: 'Projeto de fim de semestre feito em parceria com uma amiga. Aplicativo Android para organização de dados, utlizando livros como base, integrado a banco de dados Firebase. Desenvolvido em Java, permitindo cadastro, consulta e gerenciamento simples.',
    github: 'https://github.com/Kindacid/Venus'
  },
  'ai-therapist': {
    nome: 'AI Therapist',
    imagem: 'src/images/_195d3d15-fcd9-40ef-a0e8-414f373c18f0.jpeg',
    tecnologias: 'OpenAI API · JavaScript · HTML · CSS',
    descricao: 'Projeto em parceria com alguns colegas da faculdade. Site de conversa que utiliza da API da OpenAI para simular terapeutas e introduzir o usuário a dinâmicas terapêuticas. Não substitui acompanhamento profissional.',
    github: 'https://github.com/meldeoz/A3-git-projeto'
  }
};

// Função para pegar o ID da URL
function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Pegando ID do projeto na URL
const idProjeto = getParam('id');
const projeto = projetos[idProjeto];

// Atualizando conteúdo na página
if (projeto) {
  document.querySelector('h1').textContent = projeto.nome;
  document.querySelector('.image img').src = projeto.imagem;
  document.querySelector('h2').textContent = projeto.tecnologias;
  document.querySelector('.content p').textContent = projeto.descricao;
  document.querySelector('.actions a').href = projeto.github;
} else {
  document.querySelector('h1').textContent = 'Projeto não encontrado';
}
