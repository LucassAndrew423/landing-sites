import type { ContentCard, FaqItem, HeroWord } from '@features/views/home/home.interface';

export const HERO_TITLE = 'Seu negócio aparecendo no Google e recebendo clientes todos os dias.';

export const HERO_WORDS: readonly HeroWord[] = [
  { text: 'Seu', isAccent: false },
  { text: 'negócio', isAccent: false },
  { text: 'aparecendo', isAccent: true },
  { text: 'no', isAccent: true },
  { text: 'Google', isAccent: true },
  { text: 'e', isAccent: false },
  { text: 'recebendo', isAccent: false },
  { text: 'clientes', isAccent: false },
  { text: 'todos', isAccent: false },
  { text: 'os', isAccent: false },
  { text: 'dias.', isAccent: false },
];

export const HERO_BADGES: readonly string[] = ['Orçamento sem compromisso', 'Resposta rápida', 'Site pronto para celular'];

export const MARQUEE_ITEMS: readonly string[] = [
  '🍽️ Restaurantes',
  '💇 Salões e barbearias',
  '🩺 Clínicas e consultórios',
  '🛍️ Lojas e comércio',
  '🔧 Oficinas e serviços',
  '📸 Fotógrafos e autônomos',
  '🏋️ Academias e estúdios',
  '🐶 Pet shops',
];

export const BENEFITS: readonly ContentCard[] = [
  { icon: '🔎', title: 'Seja encontrado', description: 'Apareça quando alguém pesquisar pelo seu serviço na sua cidade.' },
  { icon: '🤝', title: 'Passe confiança', description: 'Um site profissional mostra que seu negócio é sério e bem estabelecido.' },
  { icon: '📱', title: 'Perfeito no celular', description: 'A maioria dos clientes pesquisa pelo telefone. Seu site funciona bem em qualquer tela.' },
  { icon: '💬', title: 'Chamada direta', description: 'Botão de WhatsApp em destaque para o cliente falar com você em um toque.' },
];

export const STEPS: readonly ContentCard[] = [
  { title: 'Conversamos', description: 'Você me conta sobre o seu negócio e o que precisa. Eu respondo com uma proposta clara.' },
  { title: 'Eu crio', description: 'Desenvolvo o site com seu logo, suas cores, fotos e textos. Você acompanha e pede ajustes.' },
  { title: 'No ar', description: 'Publico o site, configuro o domínio e te explico tudo o que precisa saber.' },
];

export const INCLUDED_ITEMS: readonly ContentCard[] = [
  { title: 'Design sob medida', description: 'Visual moderno alinhado à identidade do seu negócio.' },
  { title: 'Botão de WhatsApp', description: 'Seus clientes chamam você sem precisar digitar nada.' },
  { title: 'Google Maps e horários', description: 'Endereço, mapa e horário de funcionamento sempre à vista.' },
  { title: 'Otimizado para o Google', description: 'Estrutura pensada para facilitar que você seja encontrado.' },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'Quanto custa um site?',
    answer: 'Depende do que o seu negócio precisa. Envie o formulário e eu retorno com um orçamento claro, sem compromisso.',
  },
  {
    question: 'Em quanto tempo fica pronto?',
    answer: 'Sites simples costumam ficar prontos em poucos dias, depois que recebo seus textos e imagens.',
  },
  {
    question: 'Preciso entender de tecnologia?',
    answer: 'Não. Eu cuido de toda a parte técnica e explico tudo em linguagem simples.',
  },
  {
    question: 'Posso pedir alterações depois?',
    answer: 'Sim. Combinamos isso na proposta para você nunca ficar na mão.',
  },
];
