import { Product } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Titanium Hammer Pro",
    description:
      "Heavy-duty titanium hammer with shock absorption grip. Perfect for framing.",
    price: 49.99,
    image: "https://picsum.photos/400/400?random=1",
    category: "Hand Tools",
  },
  {
    id: "2",
    name: "VoltMaster Cordless Drill",
    description:
      "20V Max Lithium-Ion Cordless Drill Driver Kit with 2 Batteries.",
    price: 129.0,
    image: "https://picsum.photos/400/400?random=2",
    category: "Power Tools",
  },
  {
    id: "3",
    name: "Precision Laser Level",
    description:
      "Self-leveling cross-line laser with clamp. Green beam for high visibility.",
    price: 89.5,
    image: "https://picsum.photos/400/400?random=3",
    category: "Measuring",
  },
  {
    id: "4",
    name: "Industrial Table Saw",
    description:
      "10-inch Jobsite Table Saw with Rolling Stand. Powerful 15 Amp motor.",
    price: 549.0,
    image: "https://picsum.photos/400/400?random=4",
    category: "Power Tools",
  },
  {
    id: "5",
    name: "Mechanic Socket Set",
    description: "108-Piece Mechanics Tool Set, Chrome Finish.",
    price: 75.0,
    image: "https://picsum.photos/400/400?random=5",
    category: "Hand Tools",
  },
  {
    id: "6",
    name: "Heavy Duty Tool Chest",
    description: "26 in. W 4-Drawer Tool Cabinet in Black.",
    price: 299.0,
    image: "https://picsum.photos/400/400?random=6",
    category: "Storage",
  },
];

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Admin", path: "/admin" },
];
