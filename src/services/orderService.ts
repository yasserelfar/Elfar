// orderService.ts
// mock service handling order-related operations

// In a real application these would make HTTP requests to a backend API.
// For now we emulate async behavior with setTimeout.

const dummyOrders: Order[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    quantity: 2,
    customer: "John Doe",
    status: "Pending",
    image:
      "https://m.media-amazon.com/images/I/51sWxhvZ5DL._AC_SX300_SY300_QL70_ML2_.jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    quantity: 1,
    customer: "Alice Smith",
    status: "Shipped",
    image:
      "https://m.media-amazon.com/images/I/61rK2UbzFTL._AC_SY300_SX300_QL70_ML2_.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    quantity: 3,
    customer: "Bob Johnson",
    status: "Delivered",
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 4,
    name: "Keyboard",
    price: 75,
    quantity: 2,
    customer: "Daniel Brown",
    status: "Cancelled",
    image:
      "https://m.media-amazon.com/images/I/51lC3Y0s+0L._AC_SY300_SX300_QL70_ML2_.jpg",
  },
];

export const fetchOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyOrders);
    }, 500);
  });
};

export const updateOrderStatus = async (
  orderId: number,
  status: string,
): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = dummyOrders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        resolve(order);
      } else {
        reject(new Error("Order not found"));
      }
    }, 500);
  });
};

// type definition used within this file and exported
export interface Order {
  id: number;
  name: string;
  price: number;
  quantity: number;
  customer: string;
  status: string;
  image: string;
}
