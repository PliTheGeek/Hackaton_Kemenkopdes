import React from "react";
import { IMAGES } from "../data";

export type UserRole = "farmer" | "coop_admin" | "trader";

interface SidebarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  setRole,
  activeTab,
  setActiveTab,
  onLogout
}) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-80 z-40 bg-white border-r border-slate-200 shadow-sm flex flex-col justify-between p-6">
      <div className="flex flex-col h-full gap-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-green-800 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            agriculture
          </span>
          <h1 className="text-2xl font-black text-green-900 tracking-tight">Kemenkopdes</h1>
        </div>

        {/* Profile Card Section */}
        {role === "farmer" && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 shadow-sm">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-green-700"
              src={IMAGES.farmerAvatar}
              alt="Petani Sejahtera"
            />
            <div>
              <p className="text-base font-bold text-green-900 leading-tight">Petani Sejahtera</p>
              <p className="text-xs text-slate-500 font-medium">Desa Maju Jaya</p>
              <span className="inline-block mt-1 text-[9px] bg-green-800/10 text-green-800 px-2 py-0.5 rounded-full uppercase font-extrabold tracking-wider">
                Verified Farmer
              </span>
            </div>
          </div>
        )}

        {role === "coop_admin" && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 shadow-sm">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-green-800"
              src={IMAGES.coopAdminAvatar}
              alt="Admin Koperasi"
            />
            <div>
              <p className="text-base font-bold text-green-950 leading-tight">Admin Koperasi</p>
              <p className="text-xs text-slate-500 font-medium">Desa Maju Jaya</p>
              <span className="inline-block mt-1 text-[9px] bg-blue-800/10 text-blue-800 px-2 py-0.5 rounded-full uppercase font-extrabold tracking-wider">
                Super Admin
              </span>
            </div>
          </div>
        )}

        {role === "trader" && (
          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-amber-50/70 border border-amber-100 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-600 shadow-sm"
                src={IMAGES.traderGoldAvatar}
                alt="SPPG Trader"
              />
              <div>
                <p className="text-base font-bold text-amber-950 leading-tight">SPPG Trader</p>
                <p className="text-xs text-slate-500 font-medium">Verified Buyer</p>
              </div>
            </div>
            <div className="text-center bg-amber-900/10 text-amber-900 border border-amber-900/20 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">
              Official Marketplace Member
            </div>
          </div>
        )}

        {/* Dynamic Navigation Base */}
        <nav className="flex-grow flex flex-col gap-1.5 mt-4">
          
          {/* Universal Roles / Navigation */}
          {role === "farmer" && (
            <>
              <button
                onClick={() => setActiveTab("f_dashboard")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "f_dashboard"
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("f_registration")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "f_registration"
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">potted_plant</span>
                <span>Registrasi Hasil Tani</span>
              </button>

              <button
                onClick={() => setActiveTab("f_market")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "f_market" || activeTab === "f_product_detail"
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">storefront</span>
                <span>Pasar Tani</span>
              </button>

              <button
                onClick={() => setActiveTab("f_support")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "f_support"
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">support_agent</span>
                <span>Bantuan</span>
              </button>
            </>
          )}

          {role === "coop_admin" && (
            <>
              <button
                onClick={() => setActiveTab("c_dashboard")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "c_dashboard"
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">account_balance</span>
                <span>Manajemen Koperasi</span>
              </button>

              <button
                onClick={() => setActiveTab("f_market")}
                className="flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full text-slate-600 hover:bg-slate-50 transition-all"
              >
                <span className="material-symbols-outlined">storefront</span>
                <span>Lihat Pasar</span>
              </button>

              <button
                onClick={() => setActiveTab("coop_reports")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "coop_reports"
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">analytics</span>
                <span>Analisis Panen</span>
              </button>

              <button
                onClick={() => setActiveTab("f_support")}
                className="flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full text-slate-600 hover:bg-slate-50 transition-all"
              >
                <span className="material-symbols-outlined">support_agent</span>
                <span>Kontak Kemenkop</span>
              </button>
            </>
          )}

          {role === "trader" && (
            <>
              <button
                onClick={() => setActiveTab("t_dashboard")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "t_dashboard"
                    ? "bg-amber-800 text-white shadow-md shadow-amber-800/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span>Dashboard SPPG</span>
              </button>

              <button
                onClick={() => setActiveTab("f_market")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 animate-pulse ${
                  activeTab === "f_market"
                    ? "bg-amber-800 text-white shadow-md"
                    : "text-amber-800 bg-amber-50 hover:bg-amber-100"
                }`}
              >
                <span className="material-symbols-outlined">shopping_basket</span>
                <span>Beli Hasil Panen</span>
              </button>

              <button
                onClick={() => setActiveTab("t_orders")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "t_orders"
                    ? "bg-amber-800 text-white shadow-md shadow-amber-800/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">receipt_long</span>
                <span>Riwayat Pembelian</span>
              </button>

              <button
                onClick={() => setActiveTab("t_inventory")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "t_inventory"
                    ? "bg-amber-800 text-white shadow-md shadow-amber-800/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">inventory_2</span>
                <span>Gudang Komoditas</span>
              </button>

              <button
                onClick={() => setActiveTab("t_settings")}
                className={`flex items-center gap-3 py-3 px-4 font-semibold text-sm rounded-full transition-all duration-200 ${
                  activeTab === "t_settings"
                    ? "bg-amber-800 text-white shadow-md shadow-amber-800/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined">settings</span>
                <span>Pengaturan</span>
              </button>
            </>
          )}

        </nav>

        {/* Role Switching Simulator in Sidebar */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Simulasi Ganti Akun:
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setRole("farmer");
                setActiveTab("f_dashboard");
              }}
              title="Farmer Portal"
              className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                role === "farmer"
                  ? "bg-white text-green-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Petani
            </button>
            <button
              onClick={() => {
                setRole("coop_admin");
                setActiveTab("c_dashboard");
              }}
              title="Cooperative Admin"
              className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                role === "coop_admin"
                  ? "bg-white text-green-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Koperasi
            </button>
            <button
              onClick={() => {
                setRole("trader");
                setActiveTab("t_dashboard");
              }}
              title="SPPG Buyer / Trader"
              className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                role === "trader"
                  ? "bg-white text-amber-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Trader
            </button>
          </div>
        </div>

        {/* Logout section */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all rounded-full font-bold text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>{role === "trader" ? "Sign Out" : "Keluar"}</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
