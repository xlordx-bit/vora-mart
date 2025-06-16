// Import all product images
import img1 from '../assets/1.webp';
import img2 from '../assets/2.webp';
import img3 from '../assets/3.webp';
import img4 from '../assets/4.webp';
import img5 from '../assets/5.webp';
import img6 from '../assets/6.webp';
import img7 from '../assets/7.webp';
import img8 from '../assets/8.webp';
import img9 from '../assets/9.webp';
import img10 from '../assets/10.webp';
import img11 from '../assets/11.webp';
import img12 from '../assets/12.webp';
import img13 from '../assets/13.webp';
import img14 from '../assets/14.webp';
import img15 from '../assets/15.webp';
import img16 from '../assets/16.webp';
import img17 from '../assets/17.webp';
import img18 from '../assets/18.webp';
import img19 from '../assets/19.webp';
import img20 from '../assets/20.webp';

// Create an array of all images
const productImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
];

// Function to get a random image from the array
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * productImages.length);
  return productImages[randomIndex];
};

export const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    price: 199.99,
    rating: 4.8,
    image: getRandomImage(),
    category: "Audio",
    badge: "Best Seller",
    description: "Immersive sound quality with active noise cancellation"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    rating: 4.9,
    image: getRandomImage(),
    category: "Wearables",
    badge: "New",
    description: "Advanced health tracking with ECG monitoring"
  },
  {
    id: 3,
    name: "Pro Gaming Headset",
    price: 149.99,
    rating: 4.7,
    image: getRandomImage(),
    category: "Gaming",
    badge: "Top Rated",
    description: "Crystal clear audio with RGB lighting"
  },
  {
    id: 4,
    name: "4K Ultra HD Camera",
    price: 799.99,
    rating: 4.9,
    image: getRandomImage(),
    category: "Photography",
    badge: "Premium",
    description: "Professional-grade photography made easy"
  },
  {
    id: 5,
    name: "Smart Home Hub",
    price: 249.99,
    rating: 4.6,
    image: getRandomImage(),
    category: "Smart Home",
    badge: "Popular",
    description: "Control your entire home with one device"
  },
  {
    id: 6,
    name: "Noise-Canceling Headphones",
    price: 349.99,
    rating: 4.8,
    image: getRandomImage(),
    category: "Audio",
    badge: "Editor's Choice",
    description: "Premium sound with ultimate comfort"
  }
];
