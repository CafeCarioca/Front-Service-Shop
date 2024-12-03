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
      "Bold and intense, with notes of dark chocolate and Brazil nuts. This coffee cuts fantastically well through milk and finishes with a long toffee sweetness. Not for the faint of heart.",
    roast: "Dark",
    origin: "South America, Africa, India",
    taste: "Toffee, Dark Chocolate, Spice",
    prices: {
      250: 1,
      500: 70,
      1000: 130,
      2000: 250,
      5000: 600
    },
    category: "coffee",
  },
  {
    listImg: numero2,
    singleImg: numero2single,
    blendName: "Fuerte",
    to: "Fuerte",
    description:
      "Sweet and smooth, with notes of caramel, hazelnuts and port wine. This is the perfect coffee to enjoy with or without milk. ",
    roast: "Dark",
    origin: "Central America, South America, India",
    taste: "Caramel, Milk Chocolate, Hazelnut",
    prices: {
      250: 1,
      500: 70,
      1000: 130,
      2000: 250,
      5000: 600
    },
    category: "coffee",
  },
  {
    listImg: numero3,
    singleImg: numero3single,
    blendName: "Selecto",
    to: "Selecto",
    description:
      "Our newest blend of coffee has been made with the same level of love that a soldier has for their rifle. Premium by name and by nature, get ready to enjoy the rich, bold flavour that has become synonymous with Two 14 blends. Without my premium blend I am nothing. Without me, my premium blend is nothing. Try it now!",
    roast: "Medium / Dark",
    origin: "South America, Africa, India",
    taste: "Rich, Bold, Spicy",
    prices: {
      250: 1,
      500: 70,
      1000: 130,
      2000: 250,
      5000: 600
    },
    category: "coffee",
  },
  {
    listImg: numero4,
    singleImg: numero4single,
    blendName: "Supremo",
    to: "Supremo",
    description:
      "Premium Coffee for Premium Diggers. We've partnered with the team at The Pineapple Express to craft a memorable blend worthy of what it represents. Made up of ethically sourced coffee from Africa as well as Central and South America, this coffee is surely one you will remember. Drink it black to experience the sweet, nutty, caramel tones or add milk for a perfectly mild latte.A portion of the profits will be used to support veteran mental health and ongoing charitable efforts by The Pineapple Express",
    roast: "Medium",
    origin: "Central America, South America, Africa",
    taste: "Sweet, Nutty, Caramel tones",
    prices: {
      250: 1,
      500: 70,
      1000: 130,
      2000: 250,
      5000: 600
    },
    linkTitle: "The Pineapple Express",
    link: "https://tpe-vc.com/",
    category: "coffee",
  },
  {
    listImg: numero5,
    singleImg: numero5single,
    blendName: "Gourmet",
    to: "Gourmet",
    description: `Our Veteran Support Blend has been designed to do exactly that, support Veterans. We have partnered with Soldier On to deliver a strong, nutty blend with chocolate tones. A huge portion of the proceeds from the purchase of this coffee will go directly to Soldier On to aid their ongoing efforts to support Veterans and their Families.

This is just another way that we are Helping Veterans Move Forward.

----

Soldier On is a not-for-profit veteran support organisation delivering a range of services to enable serving and ex-serving veterans and their families to thrive.

`,
    roast: "Dark",
    origin: "Central & South America, India, Africa",
    taste: "Strong, Nutty, Dark Chocolate",
    prices: {
      250: 1,
      500: 70,
      1000: 130,
      2000: 250,
      5000: 600
    },
    linkTitle: "Soldier On",
    link: "https://soldieron.org.au/",
    category: "coffee",
  },
  {
    listImg: Tradicional,
    singleImg: Tradicionalsingle,
    blendName: "Tradicional",
    to: "Tradicional",
    description: `
    `,
    roast: "",
    origin: "",
    taste: "",
    prices: {
      250: 1,
      500: 70,
      1000: 130,
      2000: 250,
      5000: 600
    },
    linkTitle: "",
    link: "",
    category: "coffee",
  },





];

export default coffeeBlendsData;
