import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import CountUp from "react-countup";
const dummyProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    stock: 10,
    image:
      "https://m.media-amazon.com/images/I/51sWxhvZ5DL._AC_SX300_SY300_QL70_ML2_.jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    stock: 25,
    image:
      "https://m.media-amazon.com/images/I/61rK2UbzFTL._AC_SY300_SX300_QL70_ML2_.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    stock: 50,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 4,
    name: "Headphones",
    price: 150,
    stock: 50,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 5,
    name: "Headphones",
    price: 150,
    stock: 50,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 6,
    name: "Headphones",
    price: 150,
    stock: 50,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 7,
    name: "Headphones",
    price: 150,
    stock: 50,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 8,
    name: "Headphones",
    price: 150,
    stock: 50,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 9,
    name: "Headphones",
    price: 150,
    stock: 50,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
];

const Products = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", price: "", stock: "", image: "" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", stock: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (editingProduct) {
      // Edit existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...editingProduct, ...formData } : p,
        ),
      );
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        ...formData,
      };
      setProducts([...products, newProduct]);
    }
    closeModal();
  };

  return (
    <div className="flex flex-col items-center">
      <AdminNavbar className="w-full " />
      <h1 className="text-3xl font-bold mb-6 text-center mt-10 ">Products</h1>

      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Product
      </button>

      {/* Products Table */}
      <div className="overflow-x-auto w-full p-10">
        <table className="min-w-full  shadow rounded-lg">
          <thead>
            <tr className="">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-2 px-4">{p.id}</td>
                <td className="py-2 px-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">
                  <CountUp end={p.price} duration={2} separator="," />
                </td>

                <td className="py-2 px-4">
                  <CountUp end={p.stock} duration={1} separator="," />
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => openModal(p)}
                    className="px-3 py-1 bg-sky-950 text-white rounded shadow hover:shadow-yellow-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className=" p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                step="1"
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingProduct ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
