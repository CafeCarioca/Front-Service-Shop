import {
  numero1,
  numero1single,
  numero2,
  numero2single,
  numero3,
  numero3single,
  numero4,
  numero4single,
  numero5,
  numero5single,
  Tradicional,
  Tradicionalsingle,
} from "../../assets/images/index";
const coffeeBlendsData = [
  {
    listImg: numero1,
    singleImg: numero1single,
    blendName: "Extra Fuerte",
    to: "Extra Fuerte",
    description:
      "Combinación exacta de granos, 75% arábica y 25% robusta. Fiel a nuestro estilo artesanal, lo que colmará sus expectativas de saborear un producto con identidad propia. Fuerte, de buen cuerpo y aroma inconfundible. Éstas bondades surgen de la importacion de partidas de calidad superior, siguiendo paso a paso la ruta de los fundadores de nuestro café.",
    roast: "Torrefacto", //nodefinido
    origin: "Brasil, Africa, India",  //nodefinido
    taste: "Toffee, Dark Chocolate, Spice", //nodefinido
    prices: {
      250: 1, //nodefinido
      500: 517, 
      1000: 960, //nodefinido
      2000: 250, //nodefinido
      5000: 600 //nodefinido
    },
    category: "coffee",
  },
  {
    listImg: numero2,
    singleImg: numero2single,
    blendName: "Fuerte",
    to: "Fuerte",
    description:
      "Nuestra mezcla exclusiva contiene la mitad de granos de café 100% torrefactos y la mitad de granos de café 100% tostados para una experiencia se sabor única. Mezclar granos torrefactos y tostados puede proporcionar un equilibrio entre los sabores fuertes y cítricos que suelen encontrarse en los granos torrefactos y la suavidad y dulzura que se asocian con los granos tostados. ¡Espero que disfrutes de tu café ",
    roast: "Torrefacto, Tostado medio", //nodefinido
    origin: "Brasil", //nodefinido
    taste: "Caramel, Milk Chocolate, Hazelnut", //nodefinido
    prices: {
      250: 1, //nodefinido
      500: 619,
      1000: 1150, //nodefinido
      2000: 2197, 
      5000: 5490 
    },
    category: "coffee",
  },
  {
    listImg: numero3,
    singleImg: numero3single,
    blendName: "Selecto",
    to: "Selecto",
    description:
      "Desarrollado en tiempos modernos, comenzando la tendencia de cafés tostados diferenciados, entramos a la sutileza de nuestros productos de Alta Gama. Asi lo detectamosen sus características por la mezcla de tres tipos de granos 75% Arábicos y 25% Robusta, logrando un perfecto aroma, buena presencia en boca dada por notas de chocolate, aceitunas negras y el toque jsuto de acidez. Recomendado para acompañar postres",
    roast: "Medium / Dark", //nodefinido
    origin: "South America, Africa, India", //nodefinido
    taste: "Rich, Bold, Spicy", //nodefinido
    prices: {
      250: 1, //nodefinido
      500: 617,
      1000: 130, //nodefinido
      2000: 2411,
      5000: 6028
    },
    category: "coffee",
  },
  {
    listImg: numero4,
    singleImg: numero4single,
    blendName: "Supremo",
    to: "Supremo",
    description:
      "Inmerso en la constante perfeccion de nuestros cafés de Alta Gama, los deleitamos con esta mezcla de dos granos Arábicos, uno de ellos tradicional Bebida Río, y un toque de café de altura denominado Bebida Dura. Las características dan como resultado su nombre, siendo bajo en cafeína y acidez. Para todo momento, especialmente para Espress en sobremesa ",
    roast: "Medium", //nodefinido
    origin: "Central America, South America, Africa", //nodefinido
    taste: "Sweet, Nutty, Caramel tones", //nodefinido
    prices: {
      250: 1, //nodefinido
      500: 958,
      1000: 0, //nodefinido
      2000: 3423,
      5000: 8558
    },
    category: "coffee",
  },
  {
    listImg: numero5,
    singleImg: numero5single,
    blendName: "Gourmet",
    to: "Gourmet",
    description: `Café varietal que no presenta mezcla con ningun otro grano. Con sólo uno, es capáz de dar todos los atributos de este complejo producto. Gourmet Carioca es ideal para beber sin agregados de azúcar o edulcorante. Recomendado para tomar en preparacion espress a toda hora.`,
    roast: "Dark", //nodefinido
    origin: "Central & South America, India, Africa",   //nodefinido
    taste: "Strong, Nutty, Dark Chocolate", //nodefinido
    prices: {
      250: 1, //nodefinido
      500: 1.109,
      1000: 130, //nodefinido
      2000: 3.940,
      5000: 9.849
    },
    category: "coffee",
  },
  {
    listImg: Tradicional,
    singleImg: Tradicionalsingle,
    blendName: "Tradicional",
    to: "Tradicional",
    description: `Combinación exacta de granos, 75% arábica y 25% robusta. Fiel a nuestro estilo artesanal, lo que colmará sus expectativas de saborear un producto con identidad propia. Fuerte, de buen cuerpo y aroma inconfundible. Éstas bondades surgen de la importacion de partidas de calidad superior, siguiendo paso a paso la ruta de los fundadores de nuestro café.`,
    roast: "", //nodefinido
    origin: "Brasil", //nodefinido
    taste: "", //nodefinido
    prices: {
      100: 114,
      250: 272,
      500: 517,
      1000: 985,
      2000: 1830,
      5000: 4576
    },
    linkTitle: "",
    link: "",
    category: "coffee",
  },





];

export default coffeeBlendsData;
