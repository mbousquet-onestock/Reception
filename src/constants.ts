export interface Article {
  name: string;
  price: string;
  color: string;
  size: string;
  sku: string;
  imageUrl: string;
  quantity: number;
  receivedQuantity?: number;
  discrepancyReason?: 'Manquant' | 'Défectueux' | 'Référence incorrecte';
  discrepancyQuantity?: number;
}

export interface StockTransfer {
  id: string;
  from: string;
  date: string;
  status: 'Reçu' | 'À réceptionner';
  items: Article[];
}

export const ARTICLES: Article[] = [
  { name: "E25DUNE.V", price: "€25.00", color: "Blanc", size: "38", sku: "1562020", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_853008_7120_1.jpg", quantity: 12 },
  { name: "H25HELLO.T", price: "€10.00", color: "Marine", size: "S", sku: "2051702", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_854856_7271_1.jpg", quantity: 5 },
  { name: "E24BRAZIL.D", price: "€12.00", color: "Light stone", size: "36", sku: "1411220", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_850447_6987_1.jpg", quantity: 8 },
  { name: "E26TOKYO.D", price: "€34.19", color: "Dark grey", size: "46", sku: "2448242", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855020_7391_1.jpg", quantity: 15 },
  { name: "E26CANNES.G", price: "€59.99", color: "Kaki", size: "48", sku: "2501608", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855505_7353_1.jpg", quantity: 3 },
  { name: "E26BRESIL.V", price: "€39.99", color: "Stone", size: "48", sku: "2393993", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855155_7384_1.jpg", quantity: 10 },
  { name: "E26BRESIL.V", price: "€35.99", color: "Black washed", size: "50", sku: "2394002", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855155_7389_1.jpg", quantity: 7 },
  { name: "E26DANCING.C", price: "€31.49", color: "Jaune", size: "48", sku: "2466305", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855455_7350_1.jpg", quantity: 20 },
  { name: "H25HAPPY.T", price: "€6.00", color: "Pivoine", size: "M", sku: "1897420", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_854685_7233_1.jpg", quantity: 14 },
  { name: "E26CLELIA.R", price: "€35.99", color: "Ecru", size: "44", sku: "2506411", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855543_7322_1.jpg", quantity: 6 },
  { name: "E26COOLGIRLD", price: "€31.99", color: "Dark stone", size: "42", sku: "2501683", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855506_7382_1.jpg", quantity: 9 },
  { name: "E26POMPON.D", price: "€35.99", color: "Black", size: "40", sku: "2402487", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855084_7383_1.jpg", quantity: 11 },
  { name: "E26COOL.P", price: "€28.79", color: "Blanc cassé", size: "40", sku: "2370204", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855101_7321_1.jpg", quantity: 4 },
  { name: "H25KLEO.T", price: "€23.99", color: "Marron", size: "L", sku: "2049002", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_854826_7265_1.jpg", quantity: 18 },
  { name: "E26CLOUD.C", price: "€29.60", color: "Noir", size: "42", sku: "2791628", imageUrl: "https://medias.graindemalice.fr/products/MKP/mp_855968_7360_1.jpg", quantity: 22 },
];

export const MOCK_TRANSFERS: StockTransfer[] = [
  {
    id: "524355",
    from: "GDM-AVESNES LE COMTE",
    date: "09/06/2025",
    status: "À réceptionner",
    items: ARTICLES.slice(0, 3),
  },
  {
    id: "524356",
    from: "HAGUENAU - GDM",
    date: "10/06/2025",
    status: "À réceptionner",
    items: ARTICLES.slice(3, 6),
  },
  {
    id: "524357",
    from: "SOISSONS - GDM",
    date: "11/06/2025",
    status: "À réceptionner",
    items: ARTICLES.slice(6, 9),
  },
  {
    id: "524358",
    from: "CLERMONT FERRAND JAUDE",
    date: "12/06/2025",
    status: "Reçu",
    items: ARTICLES.slice(9, 12),
  },
  {
    id: "524359",
    from: "SELESTAT - GDM",
    date: "13/06/2025",
    status: "Reçu",
    items: ARTICLES.slice(12, 15),
  },
  {
    id: "524360",
    from: "CHALLANS - GDM",
    date: "14/06/2025",
    status: "Reçu",
    items: ARTICLES.slice(0, 2),
  },
  {
    id: "524361",
    from: "AMIENS",
    date: "15/06/2025",
    status: "Reçu",
    items: ARTICLES.slice(2, 5),
  },
  {
    id: "524362",
    from: "WASQUEHAL CC - GDM",
    date: "16/06/2025",
    status: "Reçu",
    items: ARTICLES.slice(5, 8),
  },
];
