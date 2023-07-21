export const CARS = [
  {
    brand: "BMW",
    image: "/assets/Bmw.jpg",
    description:
      "BMW is a renowned German luxury automobile manufacturer known for its high-performance and innovative engineering.",
  },
  {
    brand: "Ferrari",
    image: "/assets/Ferrari.jpg",
    description:
      "Ferrari is an iconic Italian sports car manufacturer famous for its powerful engines and striking designs.",
  },
  {
    brand: "Ford",
    image: "/assets/Ford.jpg",
    description:
      "Ford is an American multinational automaker that produces a wide range of vehicles, from family cars to rugged trucks.",
  },
  {
    brand: "RollsRoyce",
    image: "/assets/RR.jpg",
    description:
      "Rolls-Royce is a prestigious British luxury car brand known for crafting elegant and opulent automobiles.",
  },
  {
    brand: "Masseratti",
    image: "/assets/Maserati.jpg",
    description:
      "Maserati is an Italian luxury car manufacturer that blends performance and style to create captivating driving experiences.",
  },
  {
    brand: "HellCat",
    image: "/assets/Hellcat.jpg",
    description:
      "Hellcat is a high-performance variant of Dodge muscle cars, known for its immense power and thrilling speed.",
  },
];

export const SPARE_PARTS = [
  {
    name: "break disk",
    price: "$380.99",
    image: "/assets/Break_disc.png",
    description: "High-quality break disk for efficient braking performance.",
  },
  {
    name: "Exhaust",
    price: "$380.99",
    image: "/assets/Exhaust.png",
    description: "Durable exhaust system for optimal engine performance.",
  },
  {
    name: "OilFilter",
    price: "$380.99",
    image: "/assets/Oil_Filter.png",
    description: "Premium oil filter to keep your engine running smoothly.",
  },
  {
    name: "Tyre",
    price: "$380.99",
    image: "/assets/Tyre.png",
    description: "High-performance tyre for a comfortable and safe ride.",
  },
  {
    name: "W Engine",
    price: "$380.99",
    image: "/assets/Engine.png",
    description: "Powerful W engine to enhance your vehicle's performance.",
  },
  {
    name: "Car Battery",
    price: "$380.99",
    image: "/assets/Bettery.jpg",
    description:
      "Reliable car battery to ensure smooth starting and operation.",
  },
];


export const BLOGS = [
  {
    title: "How To Purchase BMW M5 F90 At A Low Price",
    date: "Dec 18 2022",
    image:"/assets/Bmw.jpg",
    frontMatter:
      "BMW M5 F90- 4.4 v8 600hp, 2018 for sale in dublin for £89,995 on donedeal",
    blog: `
      <div className="box">
        <Image src="/assets/Bmw.jpg" alt="" width={300} height={300} />
        <span className="text-brand">Dec 18 2022</span>
        <h3 className="font-bold text-xl">How To Purchase BMW M5 F90 At A Low Price</h3>
        <p>BMW M5 F90- 4.4 v8 600hp, 2018 for sale in dublin for £89,995 on donedeal</p>
        <a href="#" className="blog-btn">Read More</a>
      </div>
    `,
  },
  {
    title: "How To Get A Ford GT At A Low Price",
    date: "Dec 18 2022",
    image:"/assets/Ford.jpg",
    frontMatter:
      "Ford currently sells the $500,00 GT that was launched in 2017",
    blog: `
      <div className="box">
        <Image src="/assets/Ford.jpg" alt="" width={300} height={300} />
        <span className="text-brand">Dec 18 2022</span>
        <h3 className="font-bold text-xl">How To Get A Ford GT At A Low Price</h3>
        <p>Ford currently sells the $500,00 GT that was launched in 2017</p>
        <a href="#" className="blog-btn">Read More</a>
      </div>
    `,
  },
  {
    title: "How To Get Dodge Challenger SRT Hellcat At A Low Price",
    date: "Dec 18 2022",
    image:"/assets/Hellcat.jpg" ,
    frontMatter:
      "It's one of the last coupes with American-style V8 thunder under its hood",
    blog: `
      <div className="box">
        <Image src="/assets/Hellcat.jpg" alt="" width={300} height={300} />
        <span className="text-brand">Dec 18 2022</span>
        <h3 className="font-bold text-xl">How To Get Dodge Challenger SRT Hellcat At A Low Price</h3>
        <p>It's one of the last coupes with American-style V8 thunder under its hood</p>
        <a href="#" className="blog-btn">Read More</a>
      </div>
    `,
  },
];
