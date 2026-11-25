export type ProductCategory = 'Buquês' | 'Arranjos' | 'Plantas' | 'Cestas';

export interface FloralProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceFormatted: string;
  summary: string;
  details: string;
  careTip: string;
  image: string;
  alt: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  alt: string;
  spanClass: string;
}

export const BUSINESS = {
  name: 'Floricultura Mundo da Flores',
  shortName: 'Mundo da Flores',
  logo: '/assets/aistudio/Captura_de_tela_2026-11-25_104926_4eaed766.png',
  phoneRaw: '5532984222024',
  phoneDisplay: '+55 32 98422-2024',
  address: 'R. Batista de Oliveira, 835 - Centro, Juiz de Fora - MG, 36010-121',
  addressShort: 'R. Batista de Oliveira, 835 · Centro, Juiz de Fora',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=R.+Batista+de+Oliveira,+835+-+Centro,+Juiz+de+Fora+-+MG,+36010-121',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_URL = buildWhatsAppUrl(
  'Olá! Vim pelo site da Floricultura Mundo da Flores e gostaria de fazer um pedido.'
);

export const CATEGORIES: readonly ('Todos' | ProductCategory)[] = [
  'Todos',
  'Buquês',
  'Arranjos',
  'Plantas',
  'Cestas',
];

export const PRODUCTS: FloralProduct[] = [
  {
    id: 'buque-rosas-jardim',
    name: 'Buquê Rosas do Jardim',
    category: 'Buquês',
    price: 165,
    priceFormatted: 'R$ 165,00',
    summary: 'Rosas vermelhas, cor-de-rosa e eucalipto fresco com laço verde.',
    details:
      'Composição romântica com 12 rosas selecionadas em tons de vermelho e rosa suave, acompanhadas de ruscus, eucalipto aromático e acabamento em fita de cetim verde folha.',
    careTip: 'Corte 1 cm da base das hastes em diagonal e renove a água do vaso a cada dois dias.',
    image: '/src/assets/images/prod_buque_rosas_1795614650082.jpg',
    alt: 'Buquê artesanal com rosas vermelhas e cor-de-rosa envolto em eucalipto e fita verde folha',
  },
  {
    id: 'buque-campo-alegre',
    name: 'Buquê Campo Alegre',
    category: 'Buquês',
    price: 135,
    priceFormatted: 'R$ 135,00',
    summary: 'Flores do campo, rosas pêssego e eucalipto em linho natural.',
    details:
      'Leve e colorido, combina rosas em tom pêssego, estátice lilás, solidago dourado e eucalipto prateado em papel de linho branco amarrado com cordão rústico.',
    careTip: 'Mantenha em ambiente ventilado, protegido do sol direto e de correntes de ar.',
    image: '/src/assets/images/prod_buque_campo_limpo_1795614668650.jpg',
    alt: 'Buquê colorido de flores do campo com estátice lilás, rosas pêssego e eucalipto em embrulho branco',
  },
  {
    id: 'arranjo-ceramica-branca',
    name: 'Arranjo Cerâmica Branca',
    category: 'Arranjos',
    price: 189,
    priceFormatted: 'R$ 189,00',
    summary: 'Hortênsias brancas, astromélias e folhagens em vaso fosco.',
    details:
      'Arranjo pronto para decorar salas e mesas especiais, montado em vaso de cerâmica branco gelo com hortênsias frescas, astromélias rosadas e folhas tropicais.',
    careTip: 'Complete a água limpa na espuma floral diariamente para preservar a firmeza das pétalas.',
    image: '/src/assets/images/prod_arranjo_ceramica_1795614650355.jpg',
    alt: 'Arranjo floral em vaso de cerâmica branca com hortênsias, astromélias rosadas e folhas de costela-de-adão',
  },
  {
    id: 'orquidea-phalaenopsis-dupla',
    name: 'Orquídea Phalaenopsis Dupla',
    category: 'Plantas',
    price: 175,
    priceFormatted: 'R$ 175,00',
    summary: 'Duas hastes floridas em cachepô minimalista com musgo vivo.',
    details:
      'Orquídea branca de floração duradoura com duas hastes arqueadas, finalizada em cachepô de cerâmica suave com cobertura de musgo verde natural.',
    careTip: 'Regue moderadamente uma vez por semana sem encharcar as raízes e ofereça boa claridade indireta.',
    image: '/src/assets/images/prod_orquidea_vaso_1795614651081.jpg',
    alt: 'Orquídea branca Phalaenopsis de duas hastes plantada em cachepô claro com musgo verde',
  },
  {
    id: 'dueto-zamioculca-lirio',
    name: 'Zamioculca & Lírio da Paz',
    category: 'Plantas',
    price: 145,
    priceFormatted: 'R$ 145,00',
    summary: 'Plantas resistentes para interiores em vaso cerâmico branco.',
    details:
      'Combinação exuberante de folhas brilhantes de zamioculca e flores brancas do lírio da paz, finalizada com seixos naturais para levar frescor duradouro ao lar.',
    careTip: 'Adapta-se bem à meia-sombra; regue quando a superfície do substrato estiver seca ao toque.',
    image: '/src/assets/images/prod_planta_folhagem_1795614668500.jpg',
    alt: 'Vaso cerâmico branco com zamioculca verde brilhante, lírio da paz florido e pedras naturais',
  },
  {
    id: 'cesta-sol-girassois',
    name: 'Cesta Sol & Girassóis',
    category: 'Cestas',
    price: 210,
    priceFormatted: 'R$ 210,00',
    summary: 'Cesta artesanal em vime com girassóis, gérberas e margaridas.',
    details:
      'Presente vibrante montado em cesta trançada com alça, reunindo girassóis abertos, gérberas laranja, flores de camomila, eucalipto e laço verde folha.',
    careTip: 'Umedeça suavemente o centro da base floral a cada dois dias para manter as flores radiantes.',
    image: '/src/assets/images/prod_cesta_flores_1795614651425.jpg',
    alt: 'Cesta de vime artesanal repleta de girassóis amarelos, gérberas laranja, margaridas e laço verde',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-atelier-hero',
    title: 'Buquê Assinatura do Ateliê',
    category: 'Buquês Autorais',
    caption: 'Rosas de jardim, lisiantos brancos, ranúnculos e eucalipto em papel natural.',
    image: '/src/assets/images/hero_bouquet_atelier_1795614649518.jpg',
    alt: 'Buquê assinatura com rosas suaves, lisiantos brancos e laço verde sobre pedra travertino',
    spanClass: 'md:col-span-7 md:row-span-2',
  },
  {
    id: 'gal-rosas',
    title: 'Clássico de Rosas & Eucalipto',
    category: 'Presentes Românticos',
    caption: 'Contraste vivo entre rosas vermelhas e pétalas rosadas com folhagens frescas.',
    image: '/src/assets/images/prod_buque_rosas_1795614650082.jpg',
    alt: 'Buquê de rosas vermelhas e cor-de-rosa com fita de cetim verde sobre mármore branco',
    spanClass: 'md:col-span-5',
  },
  {
    id: 'gal-arranjo',
    title: 'Centro de Mesa em Cerâmica',
    category: 'Arranjos Florais',
    caption: 'Hortênsias e astromélias em composição escultural para receber em casa.',
    image: '/src/assets/images/prod_arranjo_ceramica_1795614650355.jpg',
    alt: 'Arranjo de mesa com hortênsias brancas e astromélias rosadas em vaso de cerâmica',
    spanClass: 'md:col-span-5',
  },
  {
    id: 'gal-cesta',
    title: 'Cesta Radiante de Girassóis',
    category: 'Cestas Especiais',
    caption: 'Energia solar com girassóis, gérberas e pequenas margaridas em vime natural.',
    image: '/src/assets/images/prod_cesta_flores_1795614651425.jpg',
    alt: 'Cesta de flores com girassóis e gérberas coloridas finalizada com laço verde',
    spanClass: 'md:col-span-6',
  },
  {
    id: 'gal-orquidea',
    title: 'Orquídea Branca para Interiores',
    category: 'Plantas Ornamentais',
    caption: 'Beleza serena e duradoura para mesas de trabalho e salas iluminadas.',
    image: '/src/assets/images/prod_orquidea_vaso_1795614651081.jpg',
    alt: 'Orquídea Phalaenopsis branca de duas hastes em vaso minimalista',
    spanClass: 'md:col-span-6',
  },
];
