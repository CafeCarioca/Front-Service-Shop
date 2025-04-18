import {
  Roma,
  Romasingle,
  Venezia,
  Veneziasingle,
  Torino,
  Torinosingle,
  Firenze,
  Firenzesingle,
  Napoli,
  Napolisingle,
  Mocachino,
  Mocachinosingle,
  Capuchino,
  Capuchinosingle,
  Bayleys,
  Bayleyssingle,
  Caramel,
  Caramelsingle,
  blanco,
  blancosingle,
  Cremebrule,
  Cremebrulesingle,
  Cortado,
  Cortadosingle,
  Chocolate,
  Chocolatesingle,
  Avellana,
  Avellanasingle,
  Tradicional,
  Tradicionalsingle,
  Capuchinocaramel,
  Capuchinocaramelsingle,
} from "../../assets/images/index";
const CapsulesData = [
  {
    listImg: Roma,
    singleImg: Romasingle,
    blendName: "Roma",
    to: "Roma",
    description: `Roma en cápsulas compatibles con Dolce Gusto®* se caracteriza por un sabor pleno y rico con un cuerpo significativo creado por un tueste lento y medio/oscuro. Es un café muy intenso donde se aprecian notas de grano de cacao, galleta y frutos secos.`,
    roast: "Tostado medio/oscuro",
    origin: "Italia",
    taste: "Grano de cacao, galleta y frutos secos",
    price: 409,
    linkTitle: "Disaster relief australia",
    link: "https://disasterreliefaus.org/",
    category: "capsules",
  },
  {
    listImg: Venezia,
    singleImg: Veneziasingle,
    blendName: "Venezia",
    to: "Venezia",
    description:
      "Venezia en cápsulas compatibles con Dolce Gusto®* es un café extremadamente armonioso y refinado. Se tuesta lentamente a intensidad media, creando un equilibrio perfecto entre dulzor y cuerpo, permitiendo que emerjan delicadas notas florales y de caramelo.",
    roast: "Tostado Medio", 
    origin: "Italia", 
    taste: "Floral, miel, cereales tostados",
    price: 409,
    linkTitle: "",
    link: "",
    category: "capsules",
  },
  {
    listImg: Torino,
    singleImg: Torinosingle,
    blendName: "Torino",
    to: "Torino",
    description: `Torino en cápsulas compatibles con Dolce Gusto®* es un café robusto y con mucho cuerpo. El tueste es lento y extremo para dar un sabor fuerte y decidido con una crema densa y un retrogusto amargo y persistente donde afloran notas de almendras y pan tostado`,
    roast: "Tostado Oscuro", 
    origin: "Italia", 
    taste: "Frutos secos tostados, almendras y pan tostado",
    price: 409,
    linkTitle: "",
    link: "",
    category: "capsules",
  },
  {
    listImg: Firenze,
    singleImg: Firenzesingle,
    blendName: "Firenze",
    to: "Firenze",
    description: `Firenze en cápsulas compatibles con Dolce Gusto®* es un café con excelente cremosidad y vivacidad. El tueste lento y medio resalta su intensidad, dejando espacio para delicadas notas de chocolate y avellanas. La crema es abundante y el retrogusto es fuerte y persistente.`,
    roast: "Tostado medio",
    origin: "Italia",   
    taste: "Notas de chocolate y avellanas",
    price: 409,
    linkTitle: "",
    link: "",
    category: "capsules",
  },
  // {
  //   listImg: Napoli,
  //   singleImg: Napolisingle,
  //   blendName: "Napoli",
  //   to: "Napoli",
  //   description: `Napoli en cápsulas compatibles Dolce Gusto®* es un café con gran cuerpo y cremosidad. El tueste, lento y oscuro, da fuerza a este coupage que se caracteriza por su intensidad y su agradable y persistente amargor. Un espresso sin concesiones, con una crema espesa y dorada y un sabor vigoroso donde destacan notas de cacao, especias y avellanas tostadas. `,
  //   roast: "Tostado oscuro",
  //   origin: "Italia",  
  //   taste: "Cacao, especias y avellanas tostadas",
  //   price: 409,
  //   linkTitle: "",
  //   link: "",
  //   category: "capsules",
  // },
  {
    listImg: Mocachino,
    singleImg: Mocachinosingle,
    blendName: "Mocachino",
    to: "Mocachino",
    description: `Cápsulas de Mocaccino compatibles con Dolce Gusto®*. La bebida ideal para quienes quieren combinar el aporte energético del café con el dulzor y sabor del chocolate. ¡Una preparación soluble para servir caliente y en vaso, para revivir la experiencia del mejor bar en casa! `,
    roast: "*",
    origin: "*",
    taste: "*",
    price: 454,
    linkTitle: "",
    link: "",
    category: "capsules",
  },
  // {
  //   listImg: Capuchino,
  //   singleImg: Capuchinosingle,
  //   blendName: "Capuchino",
  //   to: "Capuchino",
  //   description: ` Compatible con Dolce Gusto®*, Cappuccino: para un auténtico desayuno italiano. Después del café, el protagonista de los desayunos típicos italianos es sin duda el capuchino, que hoy encontramos en cápsulas compatibles con Dolce Gusto®* por su comodidad y rapidez de uso que garantiza una bebida única, cremosa y con una espuma consistente y perfecta, que nace del encuentro entre Granos de arábica y leche entera.`,
  //   roast: "*",
  //   origin: "*",
  //   taste: "*",
  //   price: 454,
  //   linkTitle: "",
  //   link: "",
  //   category: "capsules",
  // },
  {
    listImg: Bayleys,
    singleImg: Bayleyssingle,
    blendName: "Bayleys",
    to: "Bayleys",
    description: `Bebida soluble sabor Baileys, compatibles con cafeteras Nescafè Dolce Gusto. La bebida sabor Baileys es una experiencia deliciosa y envolvente que combina el característico sabor dulce y cremoso del licor irlandés con la cálida sensación de una bebida relajante.`,
    roast: "*",
    origin: "*",
    taste: "*",
    price: 454,
    linkTitle: "",
    link: "",
    category: "capsules",
  },
  // {
  //   listImg: Caramel,
  //   singleImg: Caramelsingle,
  //   blendName: "Caramel",
  //   to: "Caramel",
  //   description: `The Pineapple Express is a veteran-owned and operated coffee company that is dedicated to supporting veterans and their families. They have a range of delicious coffee blends that are perfect for any coffee lover. `,
  //   roast: "",
  //   origin: "",
  //   taste: "",
  //   price: 39.0,
  //   linkTitle: "",
  //   link: "",
  //   category: "capsules",
  // },
  {
    listImg: blanco,
    singleImg: blancosingle,
    blendName: "Chocolate Blanco",
    to: "Chocolate Blanco",
    description: `El impulso adecuado para empezar el día. Las cápsulas compatibles con Chocolate Blanco Dolce Gusto®* son ideales para quienes quieren disfrutar de un chocolate espeso y cremoso rico en leche. Gracias a las cápsulas compatibles con Dolce Gusto®* podrás disfrutar de un delicioso chocolate blanco caliente en la comodidad de tu casa. `,
    roast: "*",
    origin: "*",
    taste: "*",
    price: 454,
    linkTitle: "",
    link: "",
    category: "capsules",
  },
  {
    listImg: Cremebrule,
    singleImg: Cremebrulesingle,
    blendName: "Cremebrule",
    to: "Cremebrule",
    description: `Crème brûlée compatible con Dolce Gusto®*: una bebida rica y placentera. Una deliciosa creación inspirada en el famoso postre francés, ideal para quienes aman la delicadeza de una bebida dulce y cremosa. `,
    roast: "*",
    origin: "*",
    taste: "*",
    price: 454,
    linkTitle: "",
    link: "",
    category: "capsules",
  },
  // {
  //   listImg: Cortado,
  //   singleImg: Cortadosingle,
  //   blendName: "Cortado",
  //   to: "Cortado",
  //   description: `Compatible Dolce Gusto®* Cortado: la proporción perfecta entre café y leche. La bebida Cortado en cápsulas compatibles con Dolce Gusto®* tiene un color intenso y oscuro con una espuma ligera en la superficie. Cortado ofrece un sabor de espresso intenso y con cuerpo, pero la presencia de leche atenúa su amargor, dándole un dulzor delicado y una textura aterciopelada. `,
  //   roast: "*",
  //   origin: "*",
  //   taste: "*",
  //   price: 454,
  //   linkTitle: "",
  //   link: "",
  //   category: "capsules",
  // },
  // {
  //   listImg: Chocolate,
  //   singleImg: Chocolatesingle,
  //   blendName: "Chocolate",
  //   to: "Chocolate",
  //   description: `¡toda la energía del cacao en una taza! Una bebida densa y sabrosa que envuelve el paladar con ricos sabores, para disfrutar desde la comodidad del sofá de casa, lista en tan solo unos minutos gracias a las cápsulas compatibles con Dolce Gusto®*  Cioccolata. ¡Déjate conquistar por esta deliciosa bebida de cacao, ideal para afrontar el día con la dosis justa de energía! `,
  //   roast: "*",
  //   origin: "*",
  //   taste: "*",
  //   price: 454,
  //   linkTitle: "",
  //   link: "",
  //   category: "capsules",
  // },
  {
    listImg: Avellana,
    singleImg: Avellanasingle,
    blendName: "Avellana",
    to: "Avellana",
    description: `Un auténtico placer para el paladar, que combina sabores intensos, cremosidad y dulzor. Es la elección ideal para los amantes de las avellanas y de los postres refinados, que desean disfrutar de un momento de puro placer gustativo.`,
    roast: "*",
    origin: "*",
    taste: "*",
    price: 454,
    linkTitle: "",
    link: "",
    category: "capsules",
  },

  {
    listImg: Capuchinocaramel,
    singleImg: Capuchinocaramelsingle,
    blendName: "Capuchino Caramel",
    to: "Capuchino Caramel",
    description: `Capuchino con sabor a caramelo compatible con Dolce Gusto®*. La bebida perfecta para darle un toque delicioso a tu desayuno o pausa de la tarde. Ideal tanto durante los meses fríos como en verano, esta bebida ofrece una mezcla de notas fragantes generadas por el café, combinadas con la cremosidad de la leche y el dulzor del caramelo.`,
    roast: "*",
    origin: "*",
    taste: "*",
    price: 454,
    linkTitle: "",
    link: "",
    category: "capsules",
  },


 

];

export default CapsulesData;
