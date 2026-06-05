export const categories = [
  { id: '1', name: 'Classiques', slug: 'classiques' },
  { id: '2', name: 'Fruités', slug: 'fruites' },
  { id: '3', name: 'Gourmands', slug: 'gourmands' },
  { id: '4', name: 'Signatures', slug: 'signatures' },
];

export const products = [
  {
    id: 'p1',
    name: 'Sauce Chocolat Noir',
    slug: 'sauce-chocolat-noir',
    description: 'Un assemblage secret de fèves rares d\'Équateur pour une longueur en bouche exceptionnelle. 70% Cacao, texture veloutée.',
    price: 18.00,
    category_id: '1',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYxCCqdKXQONq8TCxSOn0-KmVnsgwGgDlaiXBFvB8LOq239loUT_zmB_P4bUkIvyAMrg8yKaxfArGpWdL-eybp4TdCqlTa89tfTb7UlFt29ZfCfF3OK5kbgWm_5T0E8B8-JvH3qffDMs1gx10hbgrb9WBmq14qM_bxsnhwc0RLr5IZYynBVIqwoGeeccdOyuVKoIkRP9yzKlmWtzpVjcTpLex8kF01ecBGvjijRidFLKugqTMbQcxnidIZveETXKroYIO5zaVC6Ppb',
    badge: 'Le Grand Classique',
    ingredients: ['Cacao Équateur 70%', 'Crème fraîche de Normandie', 'Sucre de canne non raffiné'],
    nutrition: { calories: '350', fat: '25g', sugar: '30g' },
    flavor_profile: 'Profondeur'
  },
  {
    id: 'p2',
    name: 'Fraise Mara des Bois',
    slug: 'fraise-mara-des-bois',
    description: 'L\'intensité pure du fruit rouge fraîchement cueilli. Récolte manuelle, notes de sous-bois.',
    price: 22.00,
    category_id: '2',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXHKgBXjmbWV74xRKjdx3tW-_n7lLuFsuWG7CiRSs9ppsjgUzXY9srj49mmwGYCTi19of1FWbYHgKK8aiwd6WQbFm2F7ujNQmurpPKAl1g4TseyLK4Mq7a2WcEDqDiv928uo-ZRMuI0vHa0SGvVkMj1t-ne0OfNPo-Bxfdd26akdZkHdN9DBoIMSIcYwEfAiS0af9ldH303jE8Y7Fr5FZ66LfGQFQaZZosAvtck0p2Y8Xh6BPfJj4Qc4x6lWoWBXrmocBPG9G1pp49',
    badge: 'Éclat',
    ingredients: ['Fraises Mara des Bois 80%', 'Sucre de canne', 'Jus de citron jaune'],
    nutrition: { calories: '120', fat: '0.5g', sugar: '25g' },
    flavor_profile: 'Éclat'
  },
  {
    id: 'p3',
    name: 'Caramel Fleur de Sel',
    slug: 'caramel-fleur-de-sel',
    description: 'La douceur dorée infusée à la fleur de sel de Guérande. Beurre AOP Charentes, onctuosité parfaite.',
    price: 19.00,
    category_id: '3',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK7i2yRaBch0F34NEmi3GF9zZIT1XP_H1D_EAJSaPZ-TW6kyZTRYD5jrmyUh5YKgCYBysXHXAHV7ZiilU39Bmv7bfWxMGViXZk9rRjXp9akFvFMfA-TstS8dAzqBlVzvMBXk5I4xuzrrzuIMlq17Jnmyfosqg11PkCtwUgIpvsWqTybXeOdfXPC5u-zI7VPdn7oRlQta7wDdy5BXtS84XU7Hy-UNHojmfpA4YuXdQA5gpEEH3E82FAwzWkM2VL_qWGC55qyPpFENWL',
    badge: 'Onctueux',
    ingredients: ['Beurre AOP Charentes', 'Sucre', 'Fleur de sel de Guérande', 'Crème entière'],
    nutrition: { calories: '420', fat: '30g', sugar: '45g' },
    flavor_profile: 'Onctueux'
  },
  {
    id: 'p4',
    name: 'Vanille de Madagascar',
    slug: 'vanille-de-madagascar',
    description: 'Gousses de Madagascar Bourbon pour une fragrance envoûtante et une pureté exceptionnelle.',
    price: 25.00,
    category_id: '1',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIVcZBAFlZQzw13cafBh27GCoxc-OTYsoNv1uX4fV4GkaYEc9ebyM3CYaIYhcyot9HM93MDGmJkeIUYCqH_Q53fSYeMJAC0eSWrf8QVYaSgvTBZhkVDhhFFaAjhsBiVqQDgSKH7joWO1BPZ4MPVJts0-ylygKWFmpAHYCE6i0TXdcpMVrEBrHRn9KucEMPKLAX5spqIDv-o7nZZ_UnmkdPzbjtX8I4RlK_30TVwJGqMYSrtOoVY_fpm_xAS7Z4pXF0eIsxAAW9p4U9',
    badge: 'Pureté',
    ingredients: ['Gousses Vanille Bourbon', 'Lait entier', 'Sucre de canne'],
    nutrition: { calories: '210', fat: '10g', sugar: '20g' },
    flavor_profile: 'Pureté'
  },
  {
    id: 'p5',
    name: 'Pistache d\'Iran',
    slug: 'pistache-iran',
    description: 'L\'élégance du vert émeraude, grillée à la perfection pour un goût intense.',
    price: 28.00,
    category_id: '4',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiphZ5X1_13iloEhyrdfbzkSDD4YlGPRKdrJRX_tiPvOq8DyKa5wVUsIl9yfds0uOt3Oc6RGeiw5Ihe3yiyXkqPTFoeeZaye3VtT_QnVI9JKVzbJ3rOpGYDxuJUNikdDQTvUaSy_e9YXoee2Putqytofl_zg8JRa9aNZjatO9be7haseIAagyzaeamELxN3IN00kcbyhU28N_naG9xz7C006oGPw_188y3XW-W6CkvDuhxULbAr3WwKS0VAVOFk2pj1hDCZWimK91z',
    badge: 'Rare',
    ingredients: ['Pistaches d\'Iran 60%', 'Huile d\'amande douce', 'Fleur de sel'],
    nutrition: { calories: '480', fat: '40g', sugar: '15g' },
    flavor_profile: 'Rare'
  }
];

export const testimonials = [
  {
    id: 't1',
    author: 'Marie Laurent',
    role: 'Critique Gastronomique',
    content: '"Une révélation. La sauce chocolat a une texture et une profondeur que je n\'avais jamais rencontrées, même dans les plus grandes maisons."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn0fl9WqS3t_53uMcSBX_jl6hfICsUNjX3zIjJL1aqikkZsTjYwZaQiyZT5HheDUQbsz_r-aiyMqHkUrRgDR7_tVrNUmOaSK0NY0j6zzZIxw5mnEMf885B8ychYRvl-9jOu6kV6Q2Ww2CtojjC7d31y3yU6wFBBYiCYVj2ZT5Ko2VwQVP-l1fHVWG2N0OsuJYlWfMKh5fJ1rXiWaqc2lvi-T6hpsy-Di6MG2fmsJaGVtDovHbWKthkfrWq_B6MpyocDsIHP4HgKEMZ'
  },
  {
    id: 't2',
    author: 'Julien Bernard',
    role: 'Chef Pâtissier',
    content: '"Le caramel fleur de sel est tout simplement addictif. L\'équilibre entre le sucré et la pointe de sel est une prouesse technique."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhLmlzo9-5wGzx-bvyjxpVbyPzdSZL8fAwq8472i7SzcAAUDTX9nT75eWjnR1VfPj_wjngdJGRR-Bn4IKrl-bSaCTAD4BIl7KZURSJU4GQsI9mOe8utKHFBXohXUvHq0SxpuCGxwrTT-XihNYDym_-oR_mkyxEeVJ3h2jWmXeW5abJ6Ml78-wGoz-PXpUjye0nfoCeK6Lz1hbS__5IutpaoFmxggAVPyhEYS4XmC0rifV7epZMgZ6dOUQQtNkTdRnG2j0A_Vp7QSux'
  },
  {
    id: 't3',
    author: 'Sophie Durand',
    role: 'Épicurienne',
    content: '"Panel est devenu le compagnon indispensable de tous mes desserts. Le packaging est aussi élégant que le contenu."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKV3RRXXRjdQr1PiXqDhPnq4GNoRLMaHQeCsko7cCg2rsq_b17jw4kN6hFT5hRRRNYzDy6JmQ3IYmbPS6lDdBwV3tAp01T4GgoNL0i1Wvv2zTPs8pJMV2ZqhkekfXqefrYD5L41jUioO3BrVeo3kJ5FvEr3uKSQveZVuQiJwxD0FFBw2qc6QNJuZ576R6ppOc-1GAxhFCRgbmE7Da3DroBqWihBzKtBUWGC66-AjnDBDByT11pQtEaYKTcXGaFEbxPwNOAcOGOi4uJ'
  }
];
