export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'como-comecar-a-investir-do-zero',
    title: 'Como comecar a investir do zero em 2026',
    summary:
      'Um guia pratico para quem nunca investiu e quer dar os primeiros passos no mundo dos investimentos.',
    date: '2026-04-18',
    readTime: '5 min',
    tags: ['Iniciante', 'Educacao'],
    content: `
Investir pode parecer complicado no inicio, mas a verdade e que qualquer pessoa pode comecar com pouco dinheiro e ir evoluindo aos poucos.

## Por que investir?

Deixar dinheiro parado na conta corrente e perder poder de compra todo mes por causa da inflacao. Investir e fazer seu dinheiro trabalhar por voce.

## Passo 1: Monte sua reserva de emergencia

Antes de qualquer investimento, tenha de 3 a 6 meses de gastos guardados em um lugar seguro e com liquidez. O Tesouro Selic e uma otima opcao pra isso.

## Passo 2: Entenda seu perfil de investidor

Voce e conservador, moderado ou arrojado? Isso vai definir como distribuir seus investimentos:

- Conservador: mais renda fixa, menos risco
- Moderado: equilibrio entre renda fixa e variavel
- Arrojado: mais renda variavel, aceita mais volatilidade

## Passo 3: Comece pela renda fixa

Pra quem ta comecando, renda fixa e o caminho mais seguro:

- Tesouro Direto (Selic, IPCA+, Prefixado)
- CDBs de bancos solidos
- LCIs e LCAs (isentas de IR pra pessoa fisica)

## Passo 4: Diversifique aos poucos

Conforme for ganhando confianca, comece a diversificar:

- Fundos imobiliarios (FIIs) pra renda passiva
- ETFs pra exposicao ao mercado de acoes
- Acoes de empresas solidas

## O mais importante

Comece. Nao espere ter muito dinheiro. O habito de investir e mais importante que o valor. R$ 50 por mes ja faz diferenca no longo prazo gracas aos juros compostos.
`,
  },
  {
    slug: 'o-poder-dos-juros-compostos',
    title:
      'O poder dos juros compostos: por que Einstein chamou de 8a maravilha',
    summary:
      'Entenda como os juros compostos podem transformar pequenos aportes em grandes patrimonios ao longo do tempo.',
    date: '2026-04-15',
    readTime: '4 min',
    tags: ['Juros Compostos', 'Educacao'],
    content: `
Albert Einstein teria dito que os juros compostos sao a oitava maravilha do mundo. Quem entende, ganha. Quem nao entende, paga.

## O que sao juros compostos?

Juros compostos sao juros sobre juros. Diferente dos juros simples, onde voce ganha sempre sobre o valor inicial, nos juros compostos voce ganha sobre o valor acumulado.

## Um exemplo pratico

Imagine que voce investe R$ 1.000 por mes a 1% ao mes:

- Em 5 anos: R$ 81.670 (investiu R$ 60.000)
- Em 10 anos: R$ 230.039 (investiu R$ 120.000)
- Em 20 anos: R$ 989.255 (investiu R$ 240.000)

Perceba que em 20 anos, os juros geraram mais de R$ 749 mil — mais de 3x o que voce investiu.

## O fator tempo

O tempo e o ingrediente mais importante dos juros compostos. Quanto antes voce comecar, mais tempo seu dinheiro tem pra crescer exponencialmente.

## Como aproveitar ao maximo

1. Comece o mais cedo possivel
2. Seja consistente nos aportes mensais
3. Reinvista os rendimentos
4. Tenha paciencia — o efeito bola de neve leva tempo

Use nossa calculadora de juros compostos pra simular diferentes cenarios e ver o impacto no seu patrimonio.
`,
  },
  {
    slug: 'renda-fixa-vs-renda-variavel',
    title: 'Renda fixa vs renda variavel: qual escolher?',
    summary:
      'Comparacao entre as duas principais classes de investimento e como montar uma carteira equilibrada.',
    date: '2026-04-10',
    readTime: '6 min',
    tags: ['Renda Fixa', 'Renda Variavel', 'Carteira'],
    content: `
Uma das primeiras decisoes de todo investidor e como dividir o dinheiro entre renda fixa e renda variavel. Vamos entender as diferencas.

## Renda Fixa

Na renda fixa, voce sabe (ou tem uma boa previsao) de quanto vai receber no vencimento.

Principais opcoes:
- Tesouro Direto
- CDBs
- LCIs e LCAs
- Debentures

Vantagens: previsibilidade, menor risco, boa pra reserva de emergencia.

## Renda Variavel

Na renda variavel, o retorno nao e garantido. Pode ser maior, mas tambem pode ser negativo.

Principais opcoes:
- Acoes
- Fundos Imobiliarios (FIIs)
- ETFs
- BDRs

Vantagens: potencial de retorno maior no longo prazo, dividendos, protecao contra inflacao.

## Como equilibrar?

Uma regra simples (nao e lei, e ponto de partida):

- 20 anos: 80% renda variavel, 20% renda fixa
- 30 anos: 70% renda variavel, 30% renda fixa
- 40 anos: 60% renda variavel, 40% renda fixa
- 50 anos: 40% renda variavel, 60% renda fixa

## O mais importante

Nao existe resposta certa. Depende do seu perfil, objetivos e prazo. O ideal e ter assessoria pra montar uma carteira personalizada.
`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}
