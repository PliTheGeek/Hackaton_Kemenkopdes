import React, { useState } from "react";
import { Trader, TraderOrder } from "../types";
import { IMAGES } from "../data";

interface TraderDashboardProps {
  trader: Trader;
  orders: TraderOrder[];
  onGoToMarket: () => void;
}

export const TraderDashboard: React.FC<TraderDashboardProps> = ({
  trader,
  orders,
  onGoToMarket
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Math totals calculation
  const totalSpent = orders
    .filter(o => o.status === "Delivered" || o.status === "Completed" || o.status === "Processing")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const activeDeliveries = orders.filter(o => o.status === "Processing").length;

  const totalVolTons = orders
    .filter(o => o.status !== "Cancelled")
    .reduce((acc, curr) => acc + curr.quantity, 0) / 1000; // in tons

  // Interactive Commodity price trend chart data representation
  const chartData = [
    { name: "Pandan Rice", price: 17500, change: "+4.2%", color: "#1b5e20" },
    { name: "Gayo Coffee", price: 185000, change: "+11.5%", color: "#bc8a5f" },
    { name: "Yellow Maize", price: 8900, change: "-1.8%", color: "#fbc02d" },
    { name: "Refined Sugar", price: 14500, change: "+0.4%", color: "#78909c" },
    { name: "Red Chilies", price: 42000, change: "+14.8%", color: "#d84315" }
  ];

  const getOrderStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
      case "Completed":
        return "bg-emerald-100 text-emerald-850 border-emerald-200";
      case "Processing":
        return "bg-amber-100 text-amber-850 border-amber-200 animate-pulse";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Upper Grid Layout: Profile & Overall Stats (Bento 3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card & Membership detail */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 rounded-3xl p-6 text-white shadow-lg border border-amber-800/40 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-amber-850 border border-amber-700 font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full text-amber-300">
                Gold Tier Member
              </span>
              <img src={IMAGES.sppgBadge} className="w-10 h-10 object-contain drop-shadow" alt="SPPG logo" />
            </div>

            <div className="flex items-center gap-4">
              <img 
                src={IMAGES.traderGoldAvatar} 
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md"
                alt={trader.name}
              />
              <div>
                <h3 className="text-xl font-black tracking-tight">{trader.name}</h3>
                <p className="text-xs text-amber-200 font-medium leading-none mt-1">SPPG Trader ID: TR-99421</p>
                
                {/* Score bar */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">
                    Score {trader.trustScore}%
                  </span>
                  <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Amanah Prima</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 bg-white/5 rounded-2xl p-3">
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Kontak Aktif</span>
              <p className="text-lg font-black text-amber-300">{trader.activeContracts} Suplier</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Lisensi Dagang</span>
              <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                <span>RESMI KEMENKOPDES</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Spendings Stats card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h4 className="text-base font-extrabold text-slate-800">Alokasi Anggaran Borongan</h4>
              <p className="text-xs text-slate-400">Total belanja hasil tani terekam dalam sirkulasi KUD.</p>
            </div>
            <span className="material-symbols-outlined text-amber-800 bg-amber-50 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              payments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Belanja Berjalan</span>
              <h5 className="text-xl font-black text-slate-800 mt-0.5">Rp {(totalSpent + trader.totalSpending).toLocaleString("id-ID")}</h5>
              <p className="text-[10px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                <span>Active Spending</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Volume Borong</span>
              <h5 className="text-xl font-black text-slate-800 mt-0.5">{(totalVolTons + trader.totalVolume).toLocaleString("id-ID")} Ton</h5>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Komoditas Lahan Basah</p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pengiriman Antrean</span>
              <h5 className="text-xl font-black text-amber-700 mt-0.5">{activeDeliveries} Kontrak</h5>
              <p className="text-[10px] text-slate-500 font-bold mt-1">Sertifikasi KUD Mandiri</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">Butuh borong hasil panen baru hari ini?</span>
            <button
              onClick={onGoToMarket}
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all"
            >
              Cari Hasil Panen
            </button>
          </div>
        </div>

      </div>

      {/* Price Trends chart with fully custom SVG bars */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        <div>
          <h4 className="text-lg font-bold text-slate-800">Visualizer Harga Pasar Komoditas (Rp/Kg)</h4>
          <p className="text-xs text-slate-400">Harga sirkulasi eceran & partai besar resmi diatur Kemenkopdes per kuartal ini.</p>
        </div>

        {/* Fully responsive custom SVG styled Bar Chart */}
        <div className="relative h-64 w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex-grow flex items-end justify-around gap-4 h-40 pt-4 relative">
            {/* Horizontal lines */}
            <div className="absolute inset-x-0 top-1/4 border-t border-slate-200/50 pointer-events-none"></div>
            <div className="absolute inset-x-0 top-2/4 border-t border-slate-200/50 pointer-events-none"></div>
            <div className="absolute inset-x-0 top-3/4 border-t border-slate-200/50 pointer-events-none"></div>

            {chartData.map((item, idx) => {
              // Normalized height mapping
              const maxHeight = 190000;
              const heightPct = (item.price / maxHeight) * 100;
              
              return (
                <div 
                  key={idx} 
                  className="flex flex-col items-center flex-grow max-w-[80px] group relative cursor-pointer"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip on hover */}
                  {hoveredBar === idx && (
                    <div className="absolute bottom-full mb-3 bg-slate-900 border border-slate-700 text-white text-[10px] px-3 py-1.5 rounded-xl shadow-xl z-30 font-mono text-center">
                      <p className="font-bold text-amber-400">{item.name}</p>
                      <p className="font-extrabold">Rp {item.price.toLocaleString("id-ID")}/Kg</p>
                      <p className="text-emerald-400">Tren: {item.change}</p>
                    </div>
                  )}

                  {/* SVG Rounded Bar */}
                  <div 
                    className="w-8 rounded-full transition-all duration-300 relative shadow-sm border border-slate-250 hover:opacity-90"
                    style={{ 
                      height: `${Math.max(12, heightPct)}%`,
                      backgroundColor: item.color 
                    }}
                  />

                  {/* Crop Icon above/under */}
                  <span className="text-[10px] font-black text-slate-500 mt-2 font-mono whitespace-nowrap">{item.name}</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Pemutakhiran Terkini: Real-time API Sektor Tani</span>
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>LIVE FEED ACTIVE</span>
            </span>
          </div>
        </div>
      </div>

      {/* Recents Orders History List representation */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        <div>
          <h4 className="text-lg font-bold text-slate-800">Riwayat Pembelian Borongan Anda</h4>
          <p className="text-xs text-slate-400">Arsip kontrak pengadaan barang serta komoditas impor tervalidasi sertifikasi.</p>
        </div>

        {/* Table list */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-4 px-6">ID Kontrak</th>
                <th className="py-4 px-6">Hasil Komoditas</th>
                <th className="py-4 px-6">Asal Wilayah</th>
                <th className="py-4 px-6">Kualitas Mutu</th>
                <th className="py-4 px-6">Volume</th>
                <th className="py-4 px-6">Total Belanja</th>
                <th className="py-4 px-6">Tanggal Panen</th>
                <th className="py-4 px-6">Status Kontrak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs text-slate-900 font-bold">{ord.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={ord.image} className="w-9 h-9 rounded-xl object-cover border border-slate-100 shadow-sm" alt="" />
                      <span className="font-bold text-slate-800">{ord.commodity}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{ord.origin}</td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {ord.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6">{ord.quantity.toLocaleString("id-ID")} Kg</td>
                  <td className="py-4 px-6 font-black text-emerald-800">Rp {ord.amount.toLocaleString("id-ID")}</td>
                  <td className="py-4 px-6 text-xs text-slate-400">{ord.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 status-badge border ${getOrderStatusStyle(ord.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
