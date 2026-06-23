import React, { useState } from "react";
import { MarketProduct } from "../types";
import { IMAGES } from "../data";

interface ProductDetailProps {
  product: MarketProduct;
  onAddToCart: (p: MarketProduct, quantity: number) => void;
  onGoBack: () => void;
  role: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onGoBack,
  role
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [purchaseQty, setPurchaseQty] = useState(150); // bulk default
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Images slideshow array
  const galleryImages = [
    product.image,
    IMAGES.pandanWangiHands,
    IMAGES.pandanWangiHill,
    IMAGES.pandanWangiBag
  ];

  const handleDecrease = () => {
    if (purchaseQty > 10) {
      setPurchaseQty(purchaseQty - 10);
    }
  };

  const handleIncrease = () => {
    if (purchaseQty < product.stock) {
      setPurchaseQty(purchaseQty + 10);
    }
  };

  const currentTotal = purchaseQty * product.price;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(product, purchaseQty);
    setShowCheckoutSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Back navigation */}
      <button
        onClick={onGoBack}
        className="flex items-center gap-2 text-slate-500 hover:text-green-900 font-extrabold text-xs tracking-wider uppercase cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm font-black">arrow_back</span>
        <span>Kembali ke Pasar</span>
      </button>

      {/* Main Grid Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Display Image */}
          <div className="relative rounded-3xl overflow-hidden h-96 w-full shadow-sm bg-slate-100">
            <img
              src={galleryImages[activeImageIdx]}
              alt={product.name}
              className="w-full h-full object-cover transition-all-300"
            />
            
            {/* Source Label overlay */}
            <div className="absolute bottom-4 left-4 bg-emerald-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-emerald-300 border border-emerald-500/20 font-bold uppercase tracking-wider">
              Lahan Terdaftar No: {product.id === "prod-1" ? "#M-041" : "#A-002"}
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`rounded-2xl overflow-hidden h-20 border-2 transition-all cursor-pointer ${
                  activeImageIdx === idx ? "border-green-800 shadow" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* GIS Location static map overlay card */}
          <div className="border border-slate-200 rounded-3xl overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Pencatatan Global Map</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Koordinat Agraria Nasional</p>
              </div>
              <span className="material-symbols-outlined text-green-800 text-lg">public</span>
            </div>
            
            {/* Visual dummy map with coords */}
            <div 
              className="h-36 bg-cover bg-center relative flex items-center justify-center text-white"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${IMAGES.locationStaticMap})` }}
            >
              <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur px-3 py-2 rounded-2xl flex items-center gap-2 max-w-xs shadow-xl animate-pulse">
                <span className="material-symbols-outlined text-green-400 text-base">location_on</span>
                <div className="font-mono text-[9px] leading-tight">
                  <p className="font-bold text-slate-300">CIANJUR BOUND-GRID</p>
                  <p>Lat: {product.coordinates.lat}</p>
                  <p>Lng: {product.coordinates.lng}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Characteristics / Purchase math (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            {/* Header info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-block bg-green-900/10 text-green-900 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-green-800/10">
                  {product.category} Premium
                </span>
                <span className="text-xs text-slate-400 font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>Mitra Kemenkopdes</span>
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                {product.name}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Asal Lahan: <span className="text-green-800 underline">{product.origin}, Jawa Barat</span>
              </p>
            </div>

            {/* Description list */}
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {product.desc}
            </p>

            {/* Speeds list card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-150 p-4 space-y-2.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Karakteristik Mutu Agraria</p>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400 font-medium">Varietas Utama:</span>
                  <span className="font-bold text-slate-700">Pandan Wangi</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400 font-medium">Elevasi Lahan:</span>
                  <span className="font-bold text-slate-700">{product.elevation}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400 font-medium">Tanggal Panen:</span>
                  <span className="font-bold text-slate-700">{product.harvestDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400 font-medium">Metode Tanam:</span>
                  <span className="font-bold text-slate-700">{product.method}</span>
                </div>
              </div>
            </div>

            {/* Owner banner */}
            <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-3xl border border-emerald-100">
              <img
                src={IMAGES.pandanWangiHands}
                alt={product.farmerName}
                className="w-10 h-10 rounded-full object-cover border border-green-700"
              />
              <div className="text-xs">
                <p className="font-bold text-green-950">Dikelola oleh {product.farmerName}</p>
                <p className="text-slate-500 font-medium">Didukung penuh oleh koperasi <b className="text-green-900">{product.cooperative}</b></p>
              </div>
            </div>

          </div>

          {/* Pricing Math Box */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Harga Satuan</p>
                <div className="text-lg font-black text-slate-800">
                  Rp {product.price.toLocaleString("id-ID")}{" "}
                  <span className="text-xs text-slate-400 font-bold">/ {product.unit}</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase text-right">Tersedia</p>
                <span className="bg-green-100 text-green-900 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Stok: {product.stock.toLocaleString("id-ID")} {product.unit}
                </span>
              </div>
            </div>

            {/* Qty controller forms */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-600 uppercase">Jumlah Borong:</span>
                
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full p-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-base flex items-center justify-center cursor-pointer select-none"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={10}
                    max={product.stock}
                    value={purchaseQty}
                    onChange={(e) => setPurchaseQty(Math.min(product.stock, Math.max(1, Number(e.target.value))))}
                    className="w-20 text-center font-bold text-slate-800 focus:outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-base flex items-center justify-center cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal calculation */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Transaksi:</span>
                <span className="text-xl font-black text-emerald-800">
                  Rp {currentTotal.toLocaleString("id-ID")}
                </span>
              </div>

              {/* CTA Purchase buttons */}
              <button
                type="submit"
                disabled={product.stock <= 0}
                className={`w-full py-4 rounded-2xl font-black text-sm text-center shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === "trader"
                    ? "bg-amber-800 hover:bg-amber-900 text-white shadow-amber-800/10"
                    : "bg-green-900 hover:bg-green-950 text-white shadow-green-950/10"
                }`}
              >
                <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                <span>Borong Hasil Panen</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Checkout Success Popup Modal simulation */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 text-center space-y-6 border border-slate-100">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-800 border border-emerald-100 shadow-sm animate-bounce">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="text-xl font-black text-slate-800">Transaksi Sukses Diperoleh!</h5>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Anda telah memborong <b>{purchaseQty.toLocaleString("id-ID")} {product.unit}</b> {product.name} seharga{" "}
                <b className="text-green-900 font-black">Rp {currentTotal.toLocaleString("id-ID")}</b>.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left space-y-1 text-[11px] font-mono text-slate-600 mt-4 leading-relaxed">
                <p className="font-extrabold text-emerald-800">RINGKASAN DELIVERY:</p>
                <p>No Invoice: #INV-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p>Koperasi Unit: {product.cooperative}</p>
                <p>Status: Masuk Inventori Trader</p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowCheckoutSuccess(false);
                onGoBack(); // Go back to catalogue
              }}
              className="w-full py-3 bg-green-900 hover:bg-green-950 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Kembali ke Pasar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
