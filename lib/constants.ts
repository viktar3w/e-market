export const CATEGORIES = ["Phones", "Toys", "Cars", "Food", "Soaps"];
export const DEFAULT_ACTIVE_CATEGORY = "Phones";

export const DEFAULT_COMPONENT_SIZE = 10;
export const DEFAULT_PRODUCT_SIZE = 10;
export const DEFAULT_PRODUCT_NUMBER_PAGE = 1;

export const MIN_PRICE = 0;
export const MAX_PRICE = 3000;
export const PRICE_STEP = 10;

export const CHECKBOX_ITEMS_LIMIT = 5;

export const GET_ID_KEY = "variant";

export const DEFAULT_TYPES_CHECKBOXES = [
  { text: "Food", value: "1" },
  { text: "Cars", value: "2" },
  { text: "Toys", value: "3" },
  { text: "Phones", value: "4" },
  { text: "Soaps", value: "5" },
  { text: "Something", value: "6" },
  { text: "Tables", value: "7" },
  { text: "Chair", value: "8" },
];

export const PRODUCTS = [
  {
    id: "1",
    name: "Product A",
    variants: [
      {
        id: "1-1",
        name: "Variant A1",
        price: 9.99,
      },
      {
        id: "1-2",
        name: "Variant A2",
        price: 10.99,
      },
    ],
    price: 12.99,
  },
  {
    id: "2",
    name: "Product B",
    variants: [
      {
        id: "2-1",
        name: "Variant B1",
        price: 15.99,
      },
    ],
    price: 17.99,
  },
  {
    id: "3",
    name: "Product C",
    variants: [
      {
        id: "2-34",
        name: "Variant 20.99",
        price: 20.99,
      },
    ],
    price: 20.99,
  },
  {
    id: "4",
    name: "Product D",
    variants: [
      {
        id: "4-1",
        name: "Variant D1",
        price: 7.99,
      },
      {
        id: "4-2",
        name: "Variant D2",
        price: 8.99,
      },
    ],
    price: 10.99,
  },
  {
    id: "5",
    name: "Product E",
    price: 5.99,
    variants: [
      {
        id: "34534531",
        name: "Variant 345345",
        price: 12.99,
      },
    ],
  },
  {
    id: "6",
    name: "Product F",
    variants: [
      {
        id: "6-1",
        name: "Variant F1",
        price: 12.99,
      },
    ],
    price: 14.99,
  },
  {
    id: "7",
    name: "Product G",
    price: 18.99,
    variants: [
      {
        id: "8-1",
        name: "Variant H1",
        price: 6.99,
      },
      {
        id: "8-2",
        name: "Variant H2",
        price: 7.49,
      },
    ],
  },
  {
    id: "8",
    name: "Product H",
    variants: [
      {
        id: "8-ыва",
        name: "Variant ываы",
        price: 6.99,
      },
    ],
    price: 8.99,
  },
  {
    id: "9",
    name: "Product I",
    price: 21.99,
    variants: [
      {
        id: "8-434",
        name: "Variant 343",
        price: 453.34,
      },
    ],
  },
  {
    id: "10",
    name: "Product J",
    variants: [
      {
        id: "10-1",
        name: "Variant J1",
        price: 9.49,
      },
    ],
    price: 11.49,
  },
];

export const DEFAULT_TYPES_LIMIT = 6;

export const DEFAULT_CATEGORY_SCROLLED = "1";
