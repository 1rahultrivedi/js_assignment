// data_analytics.js

const users = [
  { id: 1, name: "Amit", country: "India", premium: true },
  { id: 2, name: "John", country: "USA", premium: false },
  { id: 3, name: "Riya", country: "India", premium: true },
  { id: 4, country: "Germany", premium: false }, 
  { id: 5, name: "Neha", country: "India", premium: false },
];

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "E-book", category: "Digital", price: 15 },
  { id: 3, category: "Fashion", price: 200 }, 
  { id: 4, name: "Headphones", category: "Electronics", price: 120 },
  { id: 5, name: "Course", category: "Digital", price: 50 },
];

const orders = [
  { orderId: 1, userId: 1, productId: 1, quantity: 2 },
  { orderId: 2, userId: 2, productId: 2, quantity: 1 },
  { orderId: 3, userId: 1, productId: 4, quantity: 3 },
  { orderId: 4, userId: 5, productId: 5, quantity: 4 },
  { orderId: 5, userId: 3, productId: 3, quantity: 2 },
  { orderId: 6, userId: 9, productId: 2, quantity: 1 }, 
];

const validOrders = orders.filter(order => {
  const user = users.find(u => u.id === order.userId);
  const product = products.find(p => p.id === order.productId);
  return user && product; 
});


const totalRevenue = validOrders.reduce((sum, order) => {
  const product = products.find(p => p.id === order.productId);
  return sum + (product.price * order.quantity);
}, 0);

const totalItemsSold = validOrders.reduce((sum, order) => sum + order.quantity, 0);
const revenueByCountry = validOrders.reduce((acc, order) => {
  const user = users.find(u => u.id === order.userId);
  const product = products.find(p => p.id === order.productId);
  const revenue = product.price * order.quantity;

  acc[user.country] = (acc[user.country] || 0) + revenue;
  return acc;
}, {});

const spendingByUser = validOrders.reduce((acc, order) => {
  const user = users.find(u => u.id === order.userId);
  const product = products.find(p => p.id === order.productId);
  const spending = product.price * order.quantity;

  acc[user.name || "Unknown User"] = (acc[user.name || "Unknown User"] || 0) + spending;
  return acc;
}, {});

const topSpendingUser = Object.entries(spendingByUser)
  .sort((a, b) => b[1] - a[1])[0]; 

const productSales = validOrders.reduce((acc, order) => {
  const product = products.find(p => p.id === order.productId);
  const productName = product.name || "Unknown Product";
  acc[productName] = (acc[productName] || 0) + order.quantity;
  return acc;
}, {});

const mostSoldProduct = Object.entries(productSales)
  .sort((a, b) => b[1] - a[1])[0];

const averageOrderValue = totalRevenue / validOrders.length;
const productsWithGST = products.map(p => ({
  name: p.name || "Unknown",
  category: p.category,
  priceWithGST: (p.price * 1.1).toFixed(2)
}));

console.log("Total Revenue:", totalRevenue);
console.log("Total Items Sold:", totalItemsSold);
console.log("Revenue by Country:", revenueByCountry);
console.log("Top Spending User:", topSpendingUser);
console.log("Most Sold Product:", mostSoldProduct);
console.log("Average Order Value:", averageOrderValue.toFixed(2));
console.log("Products with GST:", productsWithGST);
