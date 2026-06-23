import React, { useState } from "react";
import { CropSubmission, SubmissionStatus } from "../types";
import { IMAGES } from "../data";

interface FarmerDashboardProps {
  submissions: CropSubmission[];
  addSubmission: (newSub: { commodity: string; type: string; volume: number; landArea: string }) => void;
  onGoToRegistration: () => void;
  onGoToMarket: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  submissions,
  addSubmission,
  onGoToRegistration,
  onGoToMarket
}) => {
  const [showModal, setShowModal] = useState(false);
  const [commodity, setCommodity] = useState("Padi Ciherang");
  const [type, setType] = useState("Padi");
  const [volume, setVolume] = useState<number>(1000);
  const [landArea, setLandArea] = useState("1.2 Hektar");

  const [filterStatus, setFilterStatus] = useState<string>("Semua");

  const handleCreateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commodity || volume <= 0) return;
    addSubmission({ commodity, type, volume, landArea });
    setShowModal(false);
    // Reset
    setCommodity("Padi Ciherang");
    setType("Padi");
    setVolume(1000);
    setLandArea("1.2 Hektar");
  };

  const getStatusStyle = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.Diterima:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case SubmissionStatus.Menunggu:
        return "bg-amber-100 text-amber-800 border-amber-200 animate-pulse";
      case SubmissionStatus.Draft:
        return "bg-slate-100 text-slate-800 border-slate-200";
      case SubmissionStatus.Ditolak:
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const totalVolume = submissions
    .filter((s) => s.status === SubmissionStatus.Diterima)
    .reduce((acc, curr) => acc + curr.volume, 0);

  const pendingCount = submissions.filter((s) => s.status === SubmissionStatus.Menunggu).length;

  // Render submissions table
  const filteredSubmissions = filterStatus === "Semua" 
    ? submissions 
    : submissions.filter(s => s.status === filterStatus);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner / Hero */}
      <div 
        className="relative rounded-3xl overflow-hidden h-72 flex flex-col justify-end p-8 text-white shadow-lg bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 30%, rgba(0,0,0,0.1)), url(${IMAGES.heroBackground})` }}
      >
        <div className="absolute top-6 right-6 bg-green-900/40 backdrop-blur-md text-emerald-300 font-extrabold text-[10px] uppercase.tracking-wider px-3 py-1.5 rounded-full border border-emerald-500/20">
          PROGRES KETAHANAN PANGAN 2026
        </div>
        <div className="max-w-xl">
          <p className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-1">Dinas Koperasi dan Tani</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2">
            Selamat Datang di AgroKarya Portal Kemenkopdes
          </h2>
          <p className="text-slate-200 text-sm font-medium">
            Kelola panen beras, komoditas unggul, dan petakan tanah subur Anda menuju kedaulatan pangan nasional Indonesia Sejahtera.
          </p>
        </div>
      </div>

      {/* Overview Bento Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Hasil Terverifikasi</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{(totalVolume + 1500).toLocaleString("id-ID")} Kg</h3>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+15% dari bulan lalu</span>
            </p>
          </div>
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pengajuan Aktif Koperasi</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{pendingCount} Komoditas</h3>
            <p className="text-xs font-semibold text-slate-500 mt-2">
              KUD Koperasi Mulyo Jati
            </p>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-800">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              assignment
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimasi Omset Pendapatan</span>
            <h3 className="text-2xl font-black text-emerald-800 mt-1">Rp {(totalVolume * 15000 + 22500000).toLocaleString("id-ID")}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-2">Pencairan via Transfer Bank Tani</p>
          </div>
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-800">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              payments
            </span>
          </div>
        </div>

      </div>

      {/* Riwayat Pengajuan Panen list section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-lg font-extrabold text-slate-800">Riwayat Pengajuan Hasil Panen</h4>
            <p className="text-xs text-slate-400 font-medium">Pantau status pendaftaran laporan panen Anda ke dinas Koperasi Kemenkopdes.</p>
          </div>
          
          <div className="flex items-center gap-3 self-end">
            <button
              onClick={onGoToRegistration}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">potted_plant</span>
              <span>Registrasi Lahan</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-green-900 hover:bg-green-950 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-green-950/10 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Lapor Panen Baru</span>
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
          {["Semua", "Diterima", "Menunggu", "Draft", "Ditolak"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                filterStatus === status
                  ? "bg-white text-green-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-4 px-6">ID Pengajuan</th>
                <th className="py-4 px-6">Komoditas Panen</th>
                <th className="py-4 px-6">Volume Basah</th>
                <th className="py-4 px-6">Luas Lahan</th>
                <th className="py-4 px-6">Tanggal Daftar</th>
                <th className="py-4 px-6">Status Pengajuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl block mb-2 text-slate-300">
                      assignment_late
                    </span>
                    Tidak ada data pengajuan dalam kategori ini.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-900">{sub.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-700 text-sm">
                        {sub.type === "Padi" ? "eco" : sub.type === "Jagung" ? "grass" : "nutrition"}
                      </span>
                      {sub.commodity}
                    </td>
                    <td className="py-4 px-6">{sub.volume.toLocaleString("id-ID")} Kg</td>
                    <td className="py-4 px-6 text-slate-500">{sub.landArea || "Alokasi Plasma"}</td>
                    <td className="py-4 px-6 text-slate-400 text-xs">{sub.date}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 status-badge border ${getStatusStyle(sub.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* "Lapor Panen Baru" Slide-in Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 md:p-8 space-y-6 animate-scale-up border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-800 text-2xl">eco</span>
                <h5 className="text-xl font-extrabold text-slate-800">Ajukan Pengajuan Lapor Panen</h5>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 px-2.5 bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors rounded-full font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmission} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nama Komoditas</label>
                <input
                  type="text"
                  placeholder="Contoh: Beras Pandan Wangi, Cabai Rawit Merah"
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Jenis</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                  >
                    <option value="Padi">Padi (Beras)</option>
                    <option value="Jagung">Jagung</option>
                    <option value="Kedelai">Kedelai / Biji</option>
                    <option value="Sayur">Sayur / Cabai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Luas Lahan (HA)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1.5 Hektar"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Volume Estimasi Masuk (Kg)</label>
                <input
                  type="number"
                  placeholder="Contoh: 1200"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs bg-green-900 hover:bg-green-950 text-white font-bold rounded-xl transition-all shadow-md shadow-green-900/10 cursor-pointer"
                >
                  Kirim Ajuan Koperasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
