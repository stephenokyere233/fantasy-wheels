export const CARS = [
  {
    id: 100,
    path: "bmw",
    name: "BMW",
    price: 500,
    brand: "BMW",
    image: "/assets/Bmw.jpg",
    description:
      "BMW is a renowned German luxury automobile manufacturer known for its high-performance and innovative engineering.",
  },
  {
    id: 200,
    path: "ferrari",
    name: "Ferrari",
    price: 1500,
    brand: "Ferrari",
    image: "/assets/Ferrari.jpg",
    description:
      "Ferrari is an iconic Italian sports car manufacturer famous for its powerful engines and striking designs.",
  },
  {
    id: 300,
    name: "Ford",
    path: "ford",
    price: 15200,
    brand: "Ford",
    image: "/assets/Ford.jpg",
    description:
      "Ford is an American multinational automaker that produces a wide range of vehicles, from family cars to rugged trucks.",
  },
  {
    id: 400,
    path: "rolls_royce",
    name: "Rolls Royce",
    price: 59000,
    brand: "RollsRoyce",
    image: "/assets/RR.jpg",
    description:
      "Rolls-Royce is a prestigious British luxury car brand known for crafting elegant and opulent automobiles.",
  },
  {
    id: 500,
    path:"masseratti",
    name: "Masseratti",
    price: 50000,
    brand: "Masseratti",
    image: "/assets/Maserati.jpg",
    description:
      "Maserati is an Italian luxury car manufacturer that blends performance and style to create captivating driving experiences.",
  },
  {
    id: 600,
    path:"hell_cat",
    name: "Hell Cat",
    price: 81000,
    brand: "HellCat",
    image: "/assets/Hellcat.jpg",
    description:
      "Hellcat is a high-performance variant of Dodge muscle cars, known for its immense power and thrilling speed.",
  },
];

export const SPARE_PARTS = [
  {
    id: 700,
    name: "break disk",
    path: "break_disk",
    price: 380.99,
    image: "/assets/Break_disc.png",
    description: "High-quality break disk for efficient braking performance.",
  },
  {
    id: 800,
    path: "exhaust",
    name: "Exhaust",
    price: 380.99,
    image: "/assets/Exhaust.png",
    description: "Durable exhaust system for optimal engine performance.",
  },
  {
    id: 900,
    name: "Oil Filter",
    path: "oil_filter",
    price: 380.99,
    image: "/assets/Oil_Filter.png",
    description: "Premium oil filter to keep your engine running smoothly.",
  },
  {
    id: 1000,
    name: "Tyre",
    path:"tyre",
    price: 380.99,
    image: "/assets/Tyre.png",
    description: "High-performance tyre for a comfortable and safe ride.",
  },
  {
    id: 1100,
    name: "W Engine",
    path:"w_engine",
    price: 380.99,
    image: "/assets/Engine.png",
    description: "Powerful W engine to enhance your vehicle's performance.",
  },
  {
    id: 1200,
    name: "Car Battery",
    path:"car_battery",
    price: 380.99,
    image: "/assets/Bettery.jpg",
    description:
      "Reliable car battery to ensure smooth starting and operation.",
  },
];

export const BLOGS = [
  {
    title: "How To Purchase BMW M5 F90 At A Low Price",
    date: "Dec 18 2022",
    image: "/assets/Bmw.jpg",
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
    image: "/assets/Ford.jpg",
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
    image: "/assets/Hellcat.jpg",
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
