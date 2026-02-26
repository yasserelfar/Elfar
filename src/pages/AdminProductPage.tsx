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
    stock: 5,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
];

const Products = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
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
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
              }
            : p,
        ),
      );
    } else {
      const newProduct = {
        id: products.length + 1,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      setProducts([...products, newProduct]);
    }
    closeModal();
  };

  // 🔎 Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesStock = true;

    if (stockFilter === "In Stock") matchesStock = product.stock > 10;
    if (stockFilter === "Low Stock")
      matchesStock = product.stock > 0 && product.stock <= 10;
    if (stockFilter === "Out of Stock") matchesStock = product.stock === 0;

    return matchesSearch && matchesStock;
  });

  const getStockColor = (stock) => {
    if (stock === 0) return "bg-red-500 text-white";
    if (stock <= 10) return "bg-yellow-400 text-black";
    return "bg-green-500 text-white";
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen px-4 sm:px-10">
      <AdminNavbar className="w-full" />

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 mt-10 text-white">
        Products
      </h1>

      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Product
      </button>

      {/* 🔎 Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full"
        />

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* 📦 Products Table */}
      <div className="overflow-x-auto w-full p-4 sm:p-10">
        <table className="min-w-full bg-gray-800 rounded-3xl">
          <thead className="bg-gray-700">
            <tr className="text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="border-t border-gray-700 text-white">
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
                    $<CountUp end={p.price} duration={1.5} separator="," />
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${getStockColor(
                        p.stock,
                      )}`}
                    >
                      <CountUp end={p.stock} duration={1} />
                    </span>
                  </td>
                  <td className="py-2 px-4 flex justify-around">
                    <button
                      onClick={() => openModal(p)}
                      className="px-3 py-1 bg-sky-950 text-white rounded shadow hover:shadow-amber-50"
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📝 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <div className="flex flex-col gap-3">
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
                step="1"
                value={formData.stock}
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
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {editingProduct ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
