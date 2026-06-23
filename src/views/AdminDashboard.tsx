import React, { useState } from "react";
import { CropSubmission, SubmissionStatus } from "../types";

interface AdminDashboardProps {
  submissions: CropSubmission[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onAddNewSubmission: (newSub: CropSubmission) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  submissions,
  onApprove,
  onReject,
  onAddNewSubmission
}) => {
  const [filter, setFilter] = useState<string>("Semua");
  const [showRegModal, setShowRegModal] = useState(false);

  // New registry state Form for Coops
  const [mName, setMName] = useState("");
  const [mCommodity, setMCommodity] = useState("Padi Ciherang");
  const [mVolume, setMVolume] = useState<number>(1000);
  const [mArea, setMArea] = useState("1.0 Hektar");

  const filteredSubmissions = filter === "Semua"
    ? submissions
    : submissions.filter(s => s.status === filter);

  const totalRegisteredArea = 5.4; // HA default
  const totalSubmissionsCount = submissions.length;
  const pendingApprovalCount = submissions.filter(s => s.status === SubmissionStatus.Menunggu).length;

  const handleRegisterNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName || !mCommodity || mVolume <= 0) return;
    
    const generatedSub: CropSubmission = {
      id: `#P-${Math.floor(22900 + Math.random() * 100)}`,
      farmerId: `KDMP-00${Math.floor(10 + Math.random() * 90)}`,
      farmerName: mName,
      commodity: mCommodity,
      type: mCommodity.includes("Padi") || mCommodity.includes("Beras") ? "Padi" : mCommodity.includes("Cabai") ? "Sayur" : "Jagung",
      volume: mVolume,
      landArea: mArea,
      date: "Hari Ini",
      status: SubmissionStatus.Menunggu
    };

    onAddNewSubmission(generatedSub);
    setShowRegModal(false);
    // clear
    setMName("");
    setMCommodity("Padi Ciherang");
    setMVolume(1000);
    setMArea("1.0 Hektar");
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Admin stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Lahan Terintegrasi</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalRegisteredArea} Hektar</h3>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shield_with_heart</span>
              <span>100% Sertifikat Terpadu</span>
            </p>
          </div>
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800">
            <span className="material-symbols-outlined text-3xl">map</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Anggota Kelompok Tani</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">112 Petani Plasma</h3>
            <p className="text-xs font-bold text-slate-500 mt-2">KUD Mitra Mandiri Cianjur</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-800">
            <span className="material-symbols-outlined text-3xl">groups_3</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Laporan Menunggu Approval</span>
            <h3 className={`text-2xl font-black mt-1 ${pendingApprovalCount > 0 ? "text-amber-600 animate-pulse" : "text-slate-800"}`}>
              {pendingApprovalCount} Pengajuan
            </h3>
            <p className="text-xs font-semibold mt-2 text-slate-500">Butuh verifikasi audit segera</p>
          </div>
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-800">
            <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
          </div>
        </div>

      </div>

      {/* Main List Management */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-xl font-extrabold text-slate-800">Verifikasi Panen Kelompok Tani</h4>
            <p className="text-xs text-slate-400 font-medium">Validasi draf fisik komoditas, berat basah hasil panen & sertifikat tanah petani.</p>
          </div>

          <button
            onClick={() => setShowRegModal(true)}
            className="px-5 py-2.5 bg-green-900 hover:bg-green-950 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md self-end cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            <span>Registrasi Manual Petani</span>
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {["Semua", "Menunggu", "Diterima", "Ditolak"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === st
                    ? "bg-white text-green-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {st} {st === "Menunggu" && pendingApprovalCount > 0 && (
                  <span className="bg-amber-500 text-white font-sans text-[8px] w-4 h-4 rounded-full inline-flex items-center justify-center ml-1">
                    {pendingApprovalCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-400">
            Menampilkan {filteredSubmissions.length} dari {totalSubmissionsCount} submissions
          </span>
        </div>

        {/* Table representation of submissions */}
        <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">ID Pengajuan</th>
                <th className="py-4 px-6">Petani Plasma</th>
                <th className="py-4 px-6">Komoditas Panen</th>
                <th className="py-4 px-6">Volume Basah</th>
                <th className="py-4 px-6">Luas Lahan (HA)</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Aksi Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-medium text-slate-700">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-4xl block mb-2 text-slate-350">
                      check_circle_outline
                    </span>
                    Tidak ada draf pengajuan komoditas baru. Semua tervalidasi!
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-900 font-bold">{sub.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-green-900/10 text-green-900 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                          {sub.farmerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-none">{sub.farmerName}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{sub.farmerId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <span className="material-symbols-outlined text-green-800 text-sm">eco</span>
                        <span>{sub.commodity}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{sub.volume.toLocaleString("id-ID")} Kg</td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs">{sub.landArea || "1.0 HA"}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 status-badge border ${
                        sub.status === SubmissionStatus.Diterima
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : sub.status === SubmissionStatus.Menunggu
                          ? "bg-amber-100 text-amber-800 border-amber-200 animate-pulse"
                          : "bg-rose-100 text-rose-800 border-rose-200"
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {sub.status === SubmissionStatus.Menunggu ? (
                        <>
                          <button
                            onClick={() => onReject(sub.id)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs transition-all cursor-pointer border border-rose-100"
                          >
                            Tolak
                          </button>
                          <button
                            onClick={() => onApprove(sub.id)}
                            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer border border-emerald-600"
                          >
                            Setujui
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium font-mono">
                          Terkunci ({sub.status === SubmissionStatus.Diterima ? "Approved" : "Rejected"})
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Manual registry Modal on Admin dashboard */}
      {showRegModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 md:p-8 space-y-6 border border-slate-100 animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-900 text-2xl">person_add</span>
                <h5 className="text-xl font-extrabold text-slate-800 font-sans">Registrasi Manual Kelompok Tani</h5>
              </div>
              <button
                onClick={() => setShowRegModal(false)}
                className="p-1 px-2.5 bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors rounded-full font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterNewSubmit} className="space-y-4 text-xs font-medium text-slate-700">
              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nama Petani Utama</label>
                <input
                  type="text"
                  placeholder="Contoh: Pak Haji Ahmad"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1.5">Varian Komoditas Panen</label>
                <select
                  value={mCommodity}
                  onChange={(e) => setMCommodity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                >
                  <option value="Padi Ciherang Unggul">Padi Ciherang Unggul</option>
                  <option value="Beras Merah Cianjur">Beras Merah Cianjur Organic</option>
                  <option value="Jagung Hibrida Kuning">Jagung Hibrida Kuning Giling</option>
                  <option value="Cabai Keriting Gunung">Cabai Keriting Gunung Cab</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1.5">Volume Estimasi (Kg)</label>
                  <input
                    type="number"
                    value={mVolume}
                    onChange={(e) => setMVolume(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1.5">Luas Lahan Petakan (HA)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1.5 Hektar"
                    value={mArea}
                    onChange={(e) => setMArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRegModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-green-900 hover:bg-green-950 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Daftarkan & Menunggu Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
