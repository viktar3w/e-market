import { db } from "../db/index";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
  const category1 = await db.category.create({
    data: {
      name: "Electronics",
    },
  });

  const category2 = await db.category.create({
    data: {
      name: "Books",
    },
  });

  const category3 = await db.category.create({
    data: {
      name: "Home Appliances",
    },
  });

  const category4 = await db.category.create({
    data: {
      name: "Toys",
    },
  });

  // Создание компонентов
  const component1 = await db.component.create({
    data: {
      name: "Battery",
      price: 29.99,
      image:
        "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
    },
  });

  const component2 = await db.component.create({
    data: {
      name: "Cover",
      price: 9.99,
      image:
        "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
    },
  });

  const component3 = await db.component.create({
    data: {
      name: "Screen Protector",
      price: 19.99,
      image: "screen_protector.png",
    },
  });

  const component4 = await db.component.create({
    data: {
      name: "Memory Card",
      price: 14.99,
      image:
        "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
    },
  });

  // Создание продуктов
  const products = await db.product.createMany({
    data: [
      {
        name: "Smartphone",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
      },
      {
        name: "E-Book Reader",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
      },
      {
        name: "Laptop",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
      },
      {
        name: "Headphones",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
      },
      {
        name: "Blender",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
      },
      {
        name: "Microwave",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
      },
      {
        name: "Vacuum Cleaner",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
      },
      {
        name: "Toy Car",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
      },
      {
        name: "Board Game",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
      },
      {
        name: "Smartwatch",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
      },
      {
        name: "Camera",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
      },
      {
        name: "Tablet",
        image:
          "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
      },
    ],
  });

  // Привязка категорий и компонентов к продуктам
  const product1 = await db.product.update({
    where: { name: "Smartphone" },
    data: {
      categories: {
        connect: [{ id: category1.id }],
      },
      components: {
        connect: [
          { id: component1.id },
          { id: component2.id },
          { id: component3.id },
        ],
      },
    },
  });

  const product2 = await db.product.update({
    where: { name: "E-Book Reader" },
    data: {
      categories: {
        connect: [{ id: category2.id }],
      },
      components: {
        connect: [{ id: component2.id }],
      },
    },
  });

  const product3 = await db.product.update({
    where: { name: "Laptop" },
    data: {
      categories: {
        connect: [{ id: category1.id }],
      },
      components: {
        connect: [{ id: component1.id }, { id: component4.id }],
      },
    },
  });

  const product4 = await db.product.update({
    where: { name: "Headphones" },
    data: {
      categories: {
        connect: [{ id: category1.id }],
      },
      components: {
        connect: [{ id: component2.id }],
      },
    },
  });

  const product5 = await db.product.update({
    where: { name: "Blender" },
    data: {
      categories: {
        connect: [{ id: category3.id }],
      },
    },
  });

  const product6 = await db.product.update({
    where: { name: "Microwave" },
    data: {
      categories: {
        connect: [{ id: category3.id }],
      },
    },
  });

  const product7 = await db.product.update({
    where: { name: "Vacuum Cleaner" },
    data: {
      categories: {
        connect: [{ id: category3.id }],
      },
    },
  });

  const product8 = await db.product.update({
    where: { name: "Toy Car" },
    data: {
      categories: {
        connect: [{ id: category4.id }],
      },
    },
  });

  const product9 = await db.product.update({
    where: { name: "Board Game" },
    data: {
      categories: {
        connect: [{ id: category4.id }],
      },
    },
  });

  const product10 = await db.product.update({
    where: { name: "Smartwatch" },
    data: {
      categories: {
        connect: [{ id: category1.id }],
      },
      components: {
        connect: [{ id: component3.id }],
      },
    },
  });

  const product11 = await db.product.update({
    where: { name: "Camera" },
    data: {
      categories: {
        connect: [{ id: category1.id }],
      },
      components: {
        connect: [{ id: component4.id }],
      },
    },
  });

  const product12 = await db.product.update({
    where: { name: "Tablet" },
    data: {
      categories: {
        connect: [{ id: category1.id }],
      },
      components: {
        connect: [{ id: component1.id }, { id: component3.id }],
      },
    },
  });
  for (const product of [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
  ]) {
    await db.variant.create({
      data: {
        price: randomDecimalNumber(190, 600),
        data: { color: "black", storage: "128GB" },
        image:
          "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
        product: {
          connect: { id: product.id },
        },
      },
    });

    await db.variant.create({
      data: {
        price: randomDecimalNumber(190, 600),
        data: { color: "white", storage: "400GB" },
        image:
          "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
        product: {
          connect: { id: product.id },
        },
      },
    });

    if (Math.floor(Math.random() * 3)) {
      await db.variant.create({
        data: {
          price: randomDecimalNumber(190, 600),
          data: { color: "yellow", storage: "64GB" },
          image:
            "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
          product: {
            connect: { id: product.id },
          },
        },
      });
    }
  }
}

async function down() {
  await db.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await db.$executeRaw`TRUNCATE TABLE "Component" RESTART IDENTITY CASCADE`;
  await db.$executeRaw`TRUNCATE TABLE "Variant" RESTART IDENTITY CASCADE`;
  await db.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
