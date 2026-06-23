import React, { useState } from "react";
import { MarketProduct } from "../types";

interface PasarTaniProps {
  products: MarketProduct[];
  onSelectProduct: (p: MarketProduct) => void;
  searchTerm?: string;
}

export const PasarTani: React.FC<PasarTaniProps> = ({
  products,
  onSelectProduct,
  searchTerm = ""
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedRegion, setSelectedRegion] = useState<string>("Semua");
  const [sortBy, setSortBy] = useState<string>("default");

  // Filtering list
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.origin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Semua" || prod.category === selectedCategory;

    const matchesRegion = selectedRegion === "Semua" || prod.origin === selectedRegion;

    return matchesSearch && matchesCategory && matchesRegion;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "stock_desc") return b.stock - a.stock;
    return 0; // default
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Search Header Info for Mobile */}
      <div className="md:hidden flex items-center bg-white border border-slate-200 rounded-2xl py-2 px-4 gap-2 shadow-sm">
        <span className="material-symbols-outlined text-slate-400">search</span>
        <input
          type="text"
          placeholder="Cari komoditas tani..."
          className="bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters Widget */}
        <div className="lg:col-span-1 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">filter_alt</span>
              <span>Filter Komoditas</span>
            </h4>
            <button 
              onClick={() => {
                setSelectedCategory("Semua");
                setSelectedRegion("Semua");
                setSortBy("default");
              }}
              className="text-[10px] font-bold text-green-800 hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Group 1: Kategorisasi */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</label>
            <div className="flex flex-col gap-1.5">
              {["Semua", "Beras", "Sayur", "Biji-bijian"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-left transition-colors ${
                    selectedCategory === cat
                      ? "bg-green-50 text-green-900 border border-green-200/50"
                      : "text-slate-600 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && (
                    <span className="material-symbols-outlined text-xs">done</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Daerah Asal */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asal Wilayah</label>
            <div className="flex flex-col gap-1.5">
              {["Semua", "Cianjur", "Sukabumi", "Kediri"].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-left transition-colors ${
                    selectedRegion === reg
                      ? "bg-green-50 text-green-900 border border-green-200/50"
                      : "text-slate-600 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <span>Java - {reg === "Semua" ? "Seluruh Kota" : reg}</span>
                  {selectedRegion === reg && (
                    <span className="material-symbols-outlined text-xs">done</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Group 3: Sorting Options */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Urutan Harga</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-800/10 focus:bg-white"
            >
              <option value="default">Rekomendasi</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
              <option value="stock_desc">Stok Melimpah</option>
            </select>
          </div>
        </div>

        {/* Gallery Listings Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Menampilkan {sortedProducts.length} Komoditas Terdaftar Kemenkopdes
            </p>
            {searchTerm && (
              <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full text-slate-500 font-medium">
                Pencarian: "{searchTerm}"
              </span>
            )}
          </div>

          {sortedProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-3">
              <span className="material-symbols-outlined text-6xl text-slate-300">
                search_off
              </span>
              <h5 className="text-lg font-bold text-slate-800">Komoditas Tidak Ditemukan</h5>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Silakan ubah filter atau kata kunci pencarian Anda untuk melihat produk hasil tani yang melimpah lainnya.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="group bg-white border border-slate-200 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative">
                    {/* Cover image */}
                    <img
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={prod.image}
                      alt={prod.name}
                    />
                    
                    {/* Category overlay */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-900 border border-emerald-100 font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                      {prod.category}
                    </span>

                    {/* Stock indicator */}
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] px-2 py-0.5 rounded">
                      STOK: {prod.stock.toLocaleString("id-ID")} {prod.unit === "sak" ? "Sak" : "Kg"}
                    </span>
                  </div>

                  {/* Body elements */}
                  <div className="p-5 flex-grow space-y-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      <span>{prod.origin}</span>
                    </div>

                    <h5 className="text-base font-bold text-slate-800 group-hover:text-green-900 transition-colors line-clamp-1">
                      {prod.name}
                    </h5>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>

                  {/* Footer billing summary link */}
                  <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between text-slate-700 bg-slate-50/50">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold leading-none">Harga Borongan</span>
                      <span className="text-base font-black text-emerald-800">
                        Rp {prod.price.toLocaleString("id-ID")}
                        <span className="text-xs font-bold text-slate-400"> / {prod.unit}</span>
                      </span>
                    </div>
                    
                    <button className="w-9 h-9 bg-green-900 text-white rounded-full flex items-center justify-center shadow transition-all group-hover:bg-green-950">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
