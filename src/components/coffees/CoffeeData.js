import {
  dark1,
  dark1Single,
  dark2,
  dark2Single,
  dark3,
  dark3Single,
  decaf,
  decafSingle,
  disaster,
  disasterSingle,
  heat,
  heatSingle,
  pineapple,
  pineappleSingle,
  support,
  supportSingle,
} from "../../assets/images/index";
const coffeeBlendsData = [
  {
    listImg: dark1,
    singleImg: dark1Single,
    blendName: "Two 14 armoured blend",
    to: "Two 14 armoured blend",

    description:
      "Bold and intense, with notes of dark chocolate and Brazil nuts. This coffee cuts fantastically well through milk and finishes with a long toffee sweetness. Not for the faint of heart.",
    roast: "Dark",
    origin: "South America, Africa, India",
    taste: "Toffee, Dark Chocolate, Spice",
    price: 39.0,
  },
  {
    listImg: dark2,
    singleImg: dark2Single,
    blendName: "Two 14 lighthorse blend",
    to: "Two 14 lighthorse blend",
    description:
      "Sweet and smooth, with notes of caramel, hazelnuts and port wine. This is the perfect coffee to enjoy with or without milk. ",
    roast: "Dark",
    origin: "Central America, South America, India",
    taste: "Caramel, Milk Chocolate, Hazelnut",
    price: 39.0,
  },
  {
    listImg: dark3,
    singleImg: dark3Single,
    blendName: "Two 14 premium blend",
    to: "Two 14 premium blend",
    description:
      "Our newest blend of coffee has been made with the same level of love that a soldier has for their rifle. Premium by name and by nature, get ready to enjoy the rich, bold flavour that has become synonymous with Two 14 blends. Without my premium blend I am nothing. Without me, my premium blend is nothing. Try it now!",
    roast: "Medium / Dark",
    origin: "South America, Africa, India",
    taste: "Rich, Bold, Spicy",
    price: 39.0,
  },
  {
    listImg: pineapple,
    singleImg: pineappleSingle,
    blendName: "THE PINEAPPLE EXPRESSO",
    to: "THE PINEAPPLE EXPRESSO",
    description:
      "Premium Coffee for Premium Diggers. We've partnered with the team at The Pineapple Express to craft a memorable blend worthy of what it represents. Made up of ethically sourced coffee from Africa as well as Central and South America, this coffee is surely one you will remember. Drink it black to experience the sweet, nutty, caramel tones or add milk for a perfectly mild latte.A portion of the profits will be used to support veteran mental health and ongoing charitable efforts by The Pineapple Express",
    roast: "Medium",
    origin: "Central America, South America, Africa",
    taste: "Sweet, Nutty, Caramel tones",
    price: 39.0,
    linkTitle: "The Pineapple Express",
    link: "https://tpe-vc.com/",
  },
  {
    listImg: support,
    singleImg: supportSingle,
    blendName: "VETERAN SUPPORT BLEND",
    to: "VETERAN SUPPORT BLEND",
    description: `Our Veteran Support Blend has been designed to do exactly that, support Veterans. We have partnered with Soldier On to deliver a strong, nutty blend with chocolate tones. A huge portion of the proceeds from the purchase of this coffee will go directly to Soldier On to aid their ongoing efforts to support Veterans and their Families.

This is just another way that we are Helping Veterans Move Forward.

----

Soldier On is a not-for-profit veteran support organisation delivering a range of services to enable serving and ex-serving veterans and their families to thrive.

`,
    roast: "Dark",
    origin: "Central & South America, India, Africa",
    taste: "Strong, Nutty, Dark Chocolate",
    price: 39.0,
    linkTitle: "Soldier On",
    link: "https://soldieron.org.au/",
  },
  {
    listImg: disaster,
    singleImg: disasterSingle,
    blendName: "DISASTER RELIEF BLEND",
    to: "DISASTER RELIEF BLEND",
    description: `Disaster Relief Australia provides disaster response to those affected by natural disasters, be they domestic or international.

By pairing the skills and experiences of military veterans with emergency responders, medical professionals, and technology solutions, Disaster Relief Australia aims to provide the greatest service and impact possible.

The Disaster Relief Blend by Two 14 Coffee Co. is a dark, heavy roast with chocolate notes - the perfect pick-me-up for exhausted emergency responders. A portion of profits will go towards the volunteer efforts of Disaster Relief Australia.`,
    roast: "Dark",
    origin: "Central America, South America, Africa",
    taste: "Rich, Heavy, Chocolate",
    price: 39.0,
    linkTitle: "Disaster relief australia",
    link: "https://disasterreliefaus.org/",
  },
  {
    listImg: decaf,
    singleImg: decafSingle,
    blendName: "SINGLE ORIGIN DECAF",
    to: "SINGLE ORIGIN DECAF",
    description:
      "Enjoy a full-flavoured coffee without the caffeine hit, with our medium-roast single-origin decaf coffee. Sourced from Columbia, our water-processed decaf packs in loads of flavour with juicy, sweet acidity and toasted cocoa notes.",
    roast: "Medium",
    origin: "Columbia (water processed)",
    taste: "Juicy sweet acidity, toasted cocoa",
    price: 39.0,
    linkTitle: "",
    link: "",
  },
  {
    listImg: heat,
    singleImg: heatSingle,
    blendName: "H.E.A.T COFFEE CAPSULES",
    to: "H.E.A.T COFFEE CAPSULES",
    description: `Our High-Energy Anti-Tiredness (H.E.A.T) Coffee Capsules are the perfect ammunition for those in need of a quick energy infusion! Plant-based and 100% biodegradable and compostable. 
    Nespresso® Compatible Pods.`,
    roast: "",
    origin: "",
    taste: "Strong & Smooth",
    price: 39.0,
    linkTitle: "",
    link: "",
  },
];

export default coffeeBlendsData;
