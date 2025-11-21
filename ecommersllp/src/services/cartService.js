class CartService {
  constructor() {
    this.api = "http://localhost:3000/api/cart";
  }

  // Add Product to Cart
  async addToCart(productId, quantity = 1, userId) {
    console.log("userId: ", userId);
    const body = { productId, quantity, userId };

    const res = await fetch(`${this.api}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return this.http.post(`${this.api}/cart/add/${userId}`, {
      productId,
      quantity,
    });
  }

  // Get Cart of a User
  async getCart(userId) {
    console.log("Fetching cart for user:", userId);

    const res = await fetch(`${this.api}/${userId}`, { method: "GET" });
    return res.json();
  }

  // Remove Product from Cart
  async removeItem(userId, productId) {
    const res = await fetch(`${this.api}/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });

    return res.json();
  }

  // Update quantity
  async updateQuantity(userId, productId, quantity) {
    const res = await fetch(`${this.api}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    return res.json();
  }

  // Clear cart
  async clearCart(userId) {
    const res = await fetch(`${this.api}/clear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    return res.json();
  }
}

module.exports = CartService;
