import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  Hammer,
  Settings,
  MapPin,
  Lock,
  Edit2,
  Trash2,
  Plus,
  Save,
  ChevronLeft,
  Home,
  Package,
  Clock,
  Key,
  Image as ImageIcon,
} from "lucide-react";
import { Product, CartItem } from "./types";
import { INITIAL_PRODUCTS } from "./constants";

// --- Utilities ---
const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

// --- Components ---

const Header = ({
  cartCount,
  setPage,
  page,
  search,
  setSearch,
}: {
  cartCount: number;
  setPage: (p: string) => void;
  page: string;
  search: string;
  setSearch: (s: string) => void;
}) => (
  <header className="bg-slate-900 text-slate-50 sticky top-0 z-50 shadow-lg border-b border-gold-600/30">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
      {/* Left: Logo & Time */}
      <div className="flex items-center gap-6 shrink-0">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setPage("home")}
        >
          <Hammer className="text-gold-500 w-8 h-8" />
          <h1 className="text-2xl font-serif font-bold tracking-wide hidden md:block">
            Noor <span className="text-gold-500">Hardware</span>
          </h1>
          <h1 className="text-2xl font-serif font-bold tracking-wide md:hidden">
            Noor
          </h1>
        </div>

        {/* Store Timing - Visible on larger screens */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-400 border-l border-slate-700 pl-6 h-8">
          <Clock className="w-4 h-4 text-gold-500" />
          <span className="whitespace-nowrap">Opens at 9:00 AM</span>
        </div>
      </div>

      {/* Center: Search Bar (Desktop) */}
      <div className="flex-1 max-w-xl hidden md:block mx-4">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search for tools..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-full text-slate-200 focus:bg-slate-900 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none placeholder-slate-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setPage("products")}
          />
          <Search className="absolute left-3 top-3 text-slate-500 w-5 h-5 group-focus-within:text-gold-500 transition-colors" />
        </div>
      </div>

      {/* Right: Navigation & Cart */}
      <div className="flex items-center space-x-8 shrink-0">
        <nav className="hidden md:flex items-center space-x-8 font-sans font-medium text-sm uppercase tracking-wider text-slate-300">
          <button
            onClick={() => setPage("home")}
            className={`flex flex-col items-center gap-1 hover:text-gold-400 transition-colors ${
              page === "home" ? "text-gold-500" : ""
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setPage("products")}
            className={`flex flex-col items-center gap-1 hover:text-gold-400 transition-colors ${
              page === "products" ? "text-gold-500" : ""
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setPage("cart")}
            className="relative hover:text-gold-400 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-slate-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Search Bar */}
    <div className="md:hidden px-4 pb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-gold-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setPage("products")}
        />
        <Search className="absolute left-3 top-2.5 text-slate-500 w-5 h-5" />
      </div>
    </div>
  </header>
);

const Hero = ({ setPage }: { setPage: (p: string) => void }) => (
  <section className="relative bg-slate-800 h-[600px] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-40">
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
        alt="Hardware"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>

    <div className="container mx-auto px-4 relative z-20">
      <div className="max-w-2xl">
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-50 mb-6 leading-tight">
          Your Vision{" "}
          <span className="text-gold-500">Built with Precision</span>
        </h2>
        <p className="text-xl text-slate-300 mb-8 font-light">
          One Stop Solution for All Hardware Needs.
        </p>
        <button
          onClick={() => setPage("products")}
          className="bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold py-4 px-8 rounded-sm shadow-lg hover:shadow-gold-500/20 transition-all transform hover:-translate-y-1"
        >
          Shop Now
        </button>
      </div>
    </div>
  </section>
);

const ProductCard = ({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (p: Product) => void;
}) => (
  <div className="bg-white border border-slate-200 rounded-sm hover:shadow-xl transition-shadow group flex flex-col">
    <div className="relative overflow-hidden aspect-square bg-slate-100">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <button
        onClick={() => addToCart(product)}
        className="absolute bottom-4 right-4 bg-slate-900 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-gold-500 hover:text-slate-900"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
        {product.category}
      </p>
      <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
        {product.name}
      </h3>
      <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
        {product.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-slate-900">
          {formatPrice(product.price)}
        </span>
        <button className="text-sm font-semibold text-gold-600 hover:text-gold-700 underline">
          Details
        </button>
      </div>
    </div>
  </div>
);

// --- Admin Components ---

const AdminLogin = ({
  onLogin,
  currentPassword,
}: {
  onLogin: (status: boolean) => void;
  currentPassword: string;
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === currentPassword) {
      onLogin(true);
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full border border-slate-200">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-900 p-4 rounded-full">
            <Lock className="w-8 h-8 text-gold-500" />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-bold text-center text-slate-900 mb-2">
          Admin Access
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Please enter the security key to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition bg-white"
              placeholder="Enter Password"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-gold-500 hover:text-slate-900 transition-colors"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

const ProductForm = ({
  product,
  onSave,
  onCancel,
}: {
  product?: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "https://picsum.photos/400/400",
      category: "General",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-slate-200">
      <h3 className="text-2xl font-serif font-bold mb-6 text-slate-900 flex items-center gap-2">
        {product ? (
          <Edit2 className="w-6 h-6 text-gold-500" />
        ) : (
          <Plus className="w-6 h-6 text-gold-500" />
        )}
        {product ? "Edit Product" : "Add New Product"}
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded bg-white focus:border-gold-500 outline-none transition shadow-sm"
                placeholder="e.g. Cordless Drill"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded bg-white focus:border-gold-500 outline-none transition shadow-sm"
                placeholder="e.g. Power Tools"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Price (₹)
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded bg-white focus:border-gold-500 outline-none transition shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Product Image
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition relative overflow-hidden group">
                {formData.image ? (
                  <>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-32 object-contain mb-2 z-10"
                    />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center z-20 transition-all">
                      <p className="text-white text-sm font-bold">
                        Change Image
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <span className="text-sm text-slate-500">
                      No image selected
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                />
              </div>
              <div className="mt-2 text-center text-xs text-slate-400">OR</div>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full mt-2 p-2 text-xs border border-slate-300 rounded bg-white focus:border-gold-500 outline-none text-slate-500"
                placeholder="Enter Image URL directly..."
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-slate-300 rounded bg-white focus:border-gold-500 outline-none transition shadow-sm"
            placeholder="Detailed description of the tool..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-2 bg-gold-500 text-slate-900 font-bold rounded hover:bg-gold-600 flex items-center gap-2 shadow-lg hover:shadow-gold-500/20 transition transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

const PasswordChangeForm = ({
  onSave,
  onCancel,
}: {
  onSave: (p: string) => void;
  onCancel: () => void;
}) => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (newPass.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }
    onSave(newPass);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow border border-slate-200 mt-4">
      <h3 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">
        <Key className="w-5 h-5 text-gold-500" /> Change Admin Password
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded focus:border-gold-500 outline-none bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded focus:border-gold-500 outline-none bg-white"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gold-500 text-slate-900 font-bold rounded hover:bg-gold-600 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({
  products,
  onAdd,
  onUpdate,
  onDelete,
  onLogout,
  onChangePassword,
}: {
  products: Product[];
  onAdd: (p: Product) => void;
  onUpdate: (p: Product) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
  onChangePassword: (newPass: string) => void;
}) => {
  const [viewMode, setViewMode] = useState<"list" | "edit" | "settings">(
    "list"
  );
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined
  );

  const handleEdit = (p: Product) => {
    setCurrentProduct(p);
    setViewMode("edit");
  };

  const handleAddNew = () => {
    setCurrentProduct(undefined);
    setViewMode("edit");
  };

  const handleSaveProduct = (p: Product) => {
    if (p.id) {
      onUpdate(p);
    } else {
      onAdd({ ...p, id: Date.now().toString() });
    }
    setViewMode("list");
  };

  const handlePasswordUpdate = (newPass: string) => {
    onChangePassword(newPass);
    setViewMode("list");
    alert("Password updated successfully.");
  };

  if (viewMode === "edit") {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setViewMode("list")}
          className="flex items-center text-slate-500 hover:text-gold-600 mb-4"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="max-w-4xl mx-auto">
          <ProductForm
            product={currentProduct}
            onSave={handleSaveProduct}
            onCancel={() => setViewMode("list")}
          />
        </div>
      </div>
    );
  }

  if (viewMode === "settings") {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setViewMode("list")}
          className="flex items-center text-slate-500 hover:text-gold-600 mb-4"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <PasswordChangeForm
          onSave={handlePasswordUpdate}
          onCancel={() => setViewMode("list")}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Admin Dashboard
          </h2>
          <p className="text-slate-500">
            Manage your inventory and store settings.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode("settings")}
            className="p-2 border border-slate-300 rounded hover:bg-slate-100 text-slate-600 bg-white"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-100 bg-white"
          >
            Logout
          </button>
          <button
            onClick={handleAddNew}
            className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-gold-500 hover:text-slate-900 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">Product</th>
                <th className="p-4 font-semibold text-slate-700">Category</th>
                <th className="p-4 font-semibold text-slate-700">Price</th>
                <th className="p-4 font-semibold text-slate-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded object-cover bg-slate-100"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">
                        {p.description}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{p.category}</td>
                  <td className="p-4 font-mono font-medium">
                    {formatPrice(p.price)}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-2 text-slate-400 hover:text-gold-600 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No products found. Add some to get started!
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  // Initialize admin login state from localStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("noor_admin_session") === "true";
  });

  const [adminPassword, setAdminPassword] = useState("noorhard123");

  const handleAdminLogin = (status: boolean) => {
    setIsAdminLoggedIn(status);
    if (status) {
      localStorage.setItem("noor_admin_session", "true");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("noor_admin_session");
    setPage("home");
  };

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Product Management Logic
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-gold-200 flex flex-col">
      <Header
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        setPage={setPage}
        page={page}
        search={search}
        setSearch={setSearch}
      />

      <main className="flex-1 pb-20">
        {page === "home" && (
          <>
            <Hero setPage={setPage} />
            <div className="container mx-auto px-4 py-16">
              <h2 className="text-3xl font-serif font-bold mb-8 border-l-4 border-gold-500 pl-4">
                Featured Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
              </div>
            </div>
          </>
        )}

        {page === "products" && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-serif font-bold">All Products</h2>
              {/* Search bar removed from here as it is now in the header */}
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-xl">No tools found matching "{search}"</p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-gold-600 underline"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
              </div>
            )}
          </div>
        )}

        {page === "cart" && (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h2 className="text-3xl font-serif font-bold mb-8">
              Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded shadow-sm">
                <p className="text-slate-500">Your cart is empty.</p>
                <button
                  onClick={() => setPage("products")}
                  className="mt-4 text-gold-600 font-bold hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-slate-200">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 border-b border-slate-100 gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-slate-500 text-sm">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs mt-1 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-6 bg-slate-50 flex justify-between items-center">
                  <div>
                    <span className="text-slate-500">Total</span>
                    <p className="text-3xl font-bold text-slate-900">
                      {formatPrice(cartTotal)}
                    </p>
                  </div>
                  <button className="bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold py-3 px-8 rounded shadow-lg">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {page === "admin" && (
          <>
            {!isAdminLoggedIn ? (
              <AdminLogin
                onLogin={handleAdminLogin}
                currentPassword={adminPassword}
              />
            ) : (
              <AdminDashboard
                products={products}
                onAdd={handleAddProduct}
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
                onLogout={handleAdminLogout}
                onChangePassword={setAdminPassword}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gold-500 font-serif font-bold text-xl mb-4">
              Noor Hardware
            </h3>
            <p className="text-sm">
              Quality Tools,Best Prices,Trusted Service| Hardware That Moves
              Your Construction Forward.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>Power Tools</li>
              <li>Hand Tools</li>
              <li>Measuring</li>
              <li>Storage</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Customer Service Center</li>
              <li> Return Policy</li>
              <li> Product Recalls </li>
              <li> My Preference Center</li>
              <li> Privacy & Security Center</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>

            {/* Address Link */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Silampura+Road,+amaravati+road,+in+front+of+Ankita+talkies,+Sanjay+Nagar+Burhanpur,+Madhya+Pradesh+450331"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 mb-4 group hover:opacity-80 transition-opacity"
              title="Open in Google Maps"
            >
              <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-400 group-hover:text-gold-400 transition-colors">
                <p>Silampura Road, amaravati road,</p>
                <p>in front of Ankita talkies, Sanjay Nagar</p>
                <p>Burhanpur, Madhya Pradesh 450331</p>
              </div>
            </a>

            {/* Timing */}
            <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
              <Clock className="w-5 h-5 text-gold-500 shrink-0" />
              <div>
                <p>Opens at 9:00 AM</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm">
                <a
                  href="tel:+919399271263"
                  className="font-bold text-gold-500 hover:text-gold-400 transition-colors select-all"
                >
                  +91 9399271263
                </a>
              </p>
              <p className="text-sm">
                <a
                  href="mailto:contact@noorhardware.com"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  contact@noorhardware.com
                </a>
              </p>
            </div>

            {/* Admin Private Access Link */}
            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={() => setPage("admin")}
                className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-300 transition-colors"
              >
                <Lock className="w-3 h-3" /> Admin Access
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
