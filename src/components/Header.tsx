import React from "react";
import { UserRole } from "./Sidebar";

interface HeaderProps {
  role: UserRole;
  activeTab: string;
  cartCount: number;
  onCartClick?: () => void;
  onNewOrderClick?: () => void;
  onSearch?: (term: string) => void;
  searchTerm?: string;
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  activeTab,
  cartCount,
  onCartClick,
  onNewOrderClick,
  onSearch,
  searchTerm = "",
  onOpenNotifications
}) => {
  // Determine Header Title
  let title = "Portal Petani";
  if (role === "coop_admin") {
    title = "Manajemen Pengajuan";
  } else if (role === "trader") {
    title = "Manajemen Pembelian SPPG";
  }

  if (activeTab === "f_market") {
    title = "Pasar Tani Digital";
  } else if (activeTab === "f_product_detail") {
    title = "Detail Produk Hasil Tani";
  } else if (activeTab === "f_registration") {
    title = "Registrasi Lahan & Komoditas";
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 flex-grow max-w-full">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight whitespace-nowrap">
          {title}
        </h2>

        {/* Global Search bar if we are on the Market tab */}
        {(activeTab === "f_market" || activeTab === "c_dashboard") && onSearch && (
          <div className="hidden md:flex items-center bg-slate-100 rounded-full py-1.5 px-4 gap-2 ml-8 w-full max-w-md border border-slate-200 focus-within:ring-2 focus-within:ring-green-800/10 focus-within:bg-white transition-all">
            <span className="material-symbols-outlined text-slate-400">search</span>
            <input
              type="text"
              placeholder={
                activeTab === "f_market"
                  ? "Cari beras, sayur, jagung, dll..."
                  : "Cari nama petani, komoditas, ID..."
              }
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        
        {/* Support context indicator */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-800 border border-green-100 uppercase tracking-widest text-[9px]">
            Sistem Terintegrasi
          </span>
        </div>

        {/* Notifications list with red badge */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Notifikasi"
        >
          <span className="material-symbols-outlined text-slate-600">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
        </button>

        {/* Dynamic Context elements on right */}
        {role === "farmer" && (
          <>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="text-xs text-slate-400 font-semibold uppercase">ID:</span>
              <span className="text-slate-800 font-mono text-xs">AGRO-88291</span>
            </div>
          </>
        )}

        {role === "coop_admin" && (
          <>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-800 leading-none">Budi Santoso</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Super Admin</span>
            </div>
          </>
        )}

        {role === "trader" && (
          <>
            <div className="h-6 w-px bg-slate-200"></div>
            {onNewOrderClick && (
              <button
                onClick={onNewOrderClick}
                className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                <span>Beli Baru</span>
              </button>
            )}
            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
              <span className="text-xs text-amber-800 font-bold uppercase">TIER:</span>
              <span className="text-amber-800 font-black text-xs uppercase tracking-wider">GOLD MEMBER</span>
            </div>
          </>
        )}

        {/* Global Cart Counter Widget floating next to the user details to link market purchases */}
        {activeTab === "f_market" || activeTab === "f_product_detail" ? (
          <button
            onClick={onCartClick}
            className="flex items-center gap-2 bg-green-900 hover:bg-green-950 text-white font-bold text-xs py-2 px-4 rounded-full shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            <span className="bg-white text-green-900 rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs">
              {cartCount}
            </span>
          </button>
        ) : null}

      </div>
    </header>
  );
};
