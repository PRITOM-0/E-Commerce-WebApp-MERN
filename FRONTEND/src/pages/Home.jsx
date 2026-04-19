import { useState, useMemo } from "react";

const SAMPLE_PRODUCTS = [
  { _id: "69df710ac7dd94267ec9e5f4", title: "iPhone 15", description: "6.1-inch Super Retina XDR display, A16 Bionic chip, 48MP camera system", price: 1200, catagory: "Smartphone", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", stock: 12, createdAt: "2026-04-15T11:05:46.321Z" },
  { _id: "69df710ac7dd94267ec9e5f5", title: "Samsung Galaxy S24", description: "6.2-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 50MP camera", price: 999, catagory: "Smartphone", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop", stock: 8, createdAt: "2026-04-14T10:00:00.000Z" },
  { _id: "69df710ac7dd94267ec9e5f6", title: "MacBook Pro 14\"", description: "M3 Pro chip, 14.2-inch Liquid Retina XDR, 18GB unified memory", price: 1999, catagory: "Laptop", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", stock: 5, createdAt: "2026-04-13T09:00:00.000Z" },
  { _id: "69df710ac7dd94267ec9e5f7", title: "Sony WH-1000XM5", description: "Industry-leading noise cancellation, 30hr battery, multipoint connection", price: 349, catagory: "Audio", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop", stock: 20, createdAt: "2026-04-12T08:00:00.000Z" },
  { _id: "69df710ac7dd94267ec9e5f8", title: "iPad Pro 12.9\"", description: "M2 chip, Liquid Retina XDR, Apple Pencil 2nd gen support", price: 1099, catagory: "Tablet", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", stock: 0, createdAt: "2026-04-11T07:00:00.000Z" },
  { _id: "69df710ac7dd94267ec9e5f9", title: "Dell XPS 15", description: "Intel Core i9, 15.6-inch OLED, NVIDIA RTX 4070, 32GB RAM", price: 2199, catagory: "Laptop", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop", stock: 3, createdAt: "2026-04-10T06:00:00.000Z" },
  { _id: "69df710ac7dd94267ec9e5fa", title: "Apple Watch Ultra 2", description: "Titanium case, 49mm, up to 60hr battery, precision GPS", price: 799, catagory: "Wearable", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop", stock: 15, createdAt: "2026-04-09T05:00:00.000Z" },
  { _id: "69df710ac7dd94267ec9e5fb", title: "Google Pixel 8 Pro", description: "6.7-inch LTPO OLED, Google Tensor G3, 50MP triple camera", price: 899, catagory: "Smartphone", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", stock: 7, createdAt: "2026-04-08T04:00:00.000Z" },
];

const CATEGORIES = ["All", ...new Set(SAMPLE_PRODUCTS.map((p) => p.catagory))];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name A–Z", value: "name_asc" },
];

function StockBadge({ stock }) {
  if (stock === 0) return <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">Out of Stock</span>;
  if (stock <= 5) return <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Only {stock} left</span>;
  return <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">In Stock</span>;
}

function ProductCard({ product, onAddToCart, isWishlisted, onToggleWishlist }) {
  const [imgError, setImgError] = useState(false);
  const inStock = product.stock > 0;

  return (
    <div className="group relative bg-[#111318] border border-white/5 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.3)] hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#0d0f14] aspect-square">
        <img
          src={imgError ? `https://placehold.co/400x400/1a1d27/6366f1?text=${encodeURIComponent(product.title)}` : product.image}
          alt={product.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold tracking-widest uppercase bg-indigo-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg">
            {product.catagory}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => onToggleWishlist(product._id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-lg transition-all duration-200 hover:scale-110"
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-indigo-300 transition-colors">
            {product.title}
          </h3>
          <StockBadge stock={product.stock} />
        </div>

        <p className="text-sm text-white/40 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div>
            <span className="text-2xl font-black text-white tracking-tight">${product.price.toLocaleString()}</span>
            <span className="text-xs text-white/30 ml-1">USD</span>
          </div>

          <button
            disabled={!inStock}
            onClick={() => onAddToCart(product)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              inStock
                ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.6)] active:scale-95"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            <span>🛒</span> {inStock ? "Add" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#111318] border-l border-white/10 flex flex-col h-full shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-black text-white">Cart ({cart.length})</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl transition-colors">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 && <p className="text-white/30 text-sm text-center mt-10">Your cart is empty</p>}
          {cart.map((item) => (
            <div key={item._id} className="flex gap-3 bg-white/5 rounded-xl p-3">
              <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover bg-white/10" onError={(e) => { e.target.src = `https://placehold.co/56x56/1a1d27/6366f1?text=📦`; }} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{item.title}</p>
                <p className="text-indigo-400 text-sm font-bold">${item.price} × {item.qty}</p>
              </div>
              <button onClick={() => onRemove(item._id)} className="text-white/20 hover:text-red-400 transition-colors text-lg self-start">✕</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-white font-black text-lg">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.5)] active:scale-95">
              Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) return prev.map((i) => i._id === product._id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`"${product.title}" added to cart`);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast("Removed from wishlist"); }
      else { next.add(id); showToast("Added to wishlist ❤️"); }
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = SAMPLE_PRODUCTS;
    if (category !== "All") list = list.filter((p) => p.catagory === category);
    if (search.trim()) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    switch (sort) {
      case "price_asc": return [...list].sort((a, b) => a.price - b.price);
      case "price_desc": return [...list].sort((a, b) => b.price - a.price);
      case "name_asc": return [...list].sort((a, b) => a.title.localeCompare(b.title));
      default: return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [search, category, sort]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            <span className="text-xl font-black tracking-tight text-white">Quick<span className="text-indigo-400">Shop</span></span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all"
            />
          </div>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.5)] active:scale-95"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 rounded-full text-xs flex items-center justify-center font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? "bg-indigo-600 text-white shadow-[0_0_12px_-2px_rgba(99,102,241,0.5)]"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + view */}
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white/5 border border-white/10 text-white/70 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500/60 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <div className="flex bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <button onClick={() => setViewMode("grid")} className={`px-3 py-2 text-sm transition-colors ${viewMode === "grid" ? "bg-indigo-600 text-white" : "text-white/40 hover:text-white"}`}>▦</button>
              <button onClick={() => setViewMode("list")} className={`px-3 py-2 text-sm transition-colors ${viewMode === "list" ? "bg-indigo-600 text-white" : "text-white/40 hover:text-white"}`}>☰</button>
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="text-white/30 text-sm mb-6">
          Showing <span className="text-white font-semibold">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
          {category !== "All" ? ` in "${category}"` : ""}
          {search ? ` for "${search}"` : ""}
        </p>

        {/* Grid / List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">🔭</span>
            <p className="text-white/40 text-lg font-semibold">No products found</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="text-indigo-400 hover:text-indigo-300 text-sm underline underline-offset-4">Clear filters</button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlist.has(product._id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((product) => (
              <div key={product._id} className="group flex gap-4 bg-[#111318] border border-white/5 rounded-2xl overflow-hidden p-4 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(99,102,241,0.2)]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 rounded-xl object-cover bg-white/10 flex-shrink-0"
                  onError={(e) => { e.target.src = `https://placehold.co/80x80/1a1d27/6366f1?text=📦`; }}
                />
                <div className="flex-1 min-w-0 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold tracking-widest uppercase bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded">{product.catagory}</span>
                      <StockBadge stock={product.stock} />
                    </div>
                    <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors truncate">{product.title}</h3>
                    <p className="text-sm text-white/40 truncate">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-xl font-black text-white">${product.price.toLocaleString()}</span>
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="text-xl hover:scale-110 transition-transform"
                    >
                      {wishlist.has(product._id) ? "❤️" : "🤍"}
                    </button>
                    <button
                      disabled={product.stock === 0}
                      onClick={() => handleAddToCart(product)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${product.stock > 0 ? "bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                    >
                      {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={handleRemoveFromCart} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1d27] border border-white/10 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}