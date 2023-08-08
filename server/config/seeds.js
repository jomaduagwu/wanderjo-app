const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Travel Supplies' },
    { name: 'Electronics and Accessories' },
    { name: 'Health and Safety' },
    { name: 'Miscellaneous' }
  ]);
  
  console.log('categories seeded');
  
  await Product.deleteMany();
  
  const products = await Product.insertMany([
    {
      name: 'Travel Snacks',
      description:
        'A variety of snacks for your journey, perfect for satisfying your hunger on the go.',
      image: 'travel-snacks.png',
      category: categories[0]._id,
      price: 5.99,
      quantity: 500
    },
    {
      name: 'Japanese Box Snacks',
      description:
        '"Dagashi" makes people happy. They are loved by young and old. Everyone loves them. Eat what you like and be happy. "Dagashi" is a delicious and fun gift.',
      image: 'japanese-snacks.png',
      category: categories[0]._id,
      price: 22.70,
      quantity: 50
    },
    {
      name: 'Travel Adapter',
      description:
        'A universal travel adapter that allows you to charge your devices in different countries.',
      image: 'travel-adapter.png',
      category: categories[2]._id,
      price: 12.99,
      quantity: 200
    },
    {
      name: 'Portable Power Bank',
      description:
        'Never run out of battery with this portable power bank, essential for long trips.',
      image: 'power-bank.png',
      category: categories[2]._id,
      price: 25.99,
      quantity: 100
    },
    {
      name: 'First Aid Kit',
      description:
        'Be prepared for emergencies with this compact first aid kit, containing essential medical supplies.',
      image: 'first-aid-kit.png',
      category: categories[3]._id,
      price: 15.99,
      quantity: 50
    },
    {
      name: 'Travel Pillow',
      description:
        'Get a good night\'s sleep while traveling with this comfortable and compact travel pillow.',
      image: 'travel-pillow.png',
      category: categories[4]._id,
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Travel Backpack',
      description:
        'A durable and spacious backpack, perfect for carrying your essentials while exploring new places.',
      image: 'travel-backpack.png',
      category: categories[1]._id,
      price: 39.99,
      quantity: 50
    },
    {
      name: 'Mini Umbrella',
      description:
        'Anti-ultraviolet summer outdoor pocket sun umbrella sunny and rainy dual-use sunscreen anti-ultraviolet compact portable pocket umbrella',
      image: 'mini-umbrella.png',
      category: categories[1]._id,
      price: 13.60,
      quantity: 500
    },
    {
      name: 'Travel Water Bottle',
      description:
        'Stay hydrated on your journey with this reusable and leak-proof travel water bottle.',
      image: 'travel-water-bottle.png',
      category: categories[1]._id,
      price: 12.99,
      quantity: 100
    },
    
    {
      name: 'Travel Journal',
      description:
        'Document your travel experiences and memories in this beautifully crafted travel journal.',
      image: 'travel-journal.png',
      category: categories[4]._id,
      price: 8.99,
      quantity: 80
    },
    {
      name: 'Travel Adapter with USB Ports',
      description:
        'Charge multiple devices simultaneously with this travel adapter featuring built-in USB ports.',
      image: 'travel-adapter-usb.png',
      category: categories[2]._id,
      price: 19.99,
      quantity: 40
    },
  ]);
  
  console.log('products seeded');
 
  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
