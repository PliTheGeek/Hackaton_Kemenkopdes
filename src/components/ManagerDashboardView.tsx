/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building, 
  UserPlus, 
  TrendingUp, 
  Archive, 
  CheckCircle, 
  XCircle,
  Plus, 
  Trash2, 
  Scale, 
  FileSpreadsheet, 
  LogOut,
  User,
  Activity,
  Award,
  DollarSign
} from 'lucide-react';
import { LandReport, Farmer, Approval, ViewType, Transaction } from '../types';

interface ManagerDashboardViewProps {
  farmers: Farmer[];
  landReports: LandReport[];
  approvals: Approval[];
  transactions: Transaction[];
  onAddFarmer: (farmer: Farmer) => void;
  onAddApproval: (approval: Approval) => void;
  onVerifyReport: (idx: number) => void;
  onLogout: () => void;
  onNavigate: (view: ViewType) => void;
}

export default function ManagerDashboardView({
  farmers,
  landReports,
  approvals,
  transactions,
  onAddFarmer,
  onAddApproval,
  onVerifyReport,
  onLogout,
  onNavigate
}: ManagerDashboardViewProps) {
  // Tabs: 'verifikasi' | 'petani' | 'margin'
  const [activeSubTab, setActiveSubTab] = useState<'verifikasi' | 'petani' | 'margin'>('verifikasi');

  // Register farmer state
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newFarmerLand, setNewFarmerLand] = useState('LH-0115');
  const [newFarmerKomoditas, setNewFarmerKomoditas] = useState('Padi Ciherang');
  const [farmerSuccess, setFarmerSuccess] = useState('');

  // Propose price state
  const [newKomoditasPrice, setNewKomoditasPrice] = useState('');
  const [newOlehPrice, setNewOlehPrice] = useState('');
  const [newHargaPrice, setNewHargaPrice] = useState('Rp 7.500/kg');
  const [priceSuccess, setPriceSuccess] = useState('');

  const pendingReportsCount = landReports.filter(r => r.status === 'PENDING').length;

  const handleRegisterFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmerName || !newFarmerKomoditas) {
      return;
    }

    const initials = newFarmerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'P';
    
    // Choose a color class dynamically
    const bgClasses = [
      'bg-secondary-container text-secondary',
      'bg-tertiary-fixed text-tertiary',
      'bg-primary-fixed text-primary',
      'bg-error-container text-error'
    ];
    const bgClass = bgClasses[farmers.length % bgClasses.length];

    const newFarmer: Farmer = {
      id: `F-${String(farmers.length + 1).padStart(3, '0')}`,
      nama: newFarmerName,
      idLahan: newFarmerLand,
      komoditas: newFarmerKomoditas,
      status: 'AKTIF',
      initials,
      bgClass
    };

    onAddFarmer(newFarmer);
    setNewFarmerName('');
    setFarmerSuccess('Petani Binaan Baru Berhasil Terdaftar!');
    setTimeout(() => setFarmerSuccess(''), 4000);
  };

  const handleProposePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKomoditasPrice || !newOlehPrice || !newHargaPrice) {
      return;
    }

    const newApproval: Approval = {
      id: `A-${String(approvals.length + 1).padStart(3, '0')}`,
      komoditas: newKomoditasPrice,
      oleh: newOlehPrice,
      harga: newHargaPrice,
      status: 'BARU'
    };

    onAddApproval(newApproval);
    setNewKomoditasPrice('');
    setNewOlehPrice('');
    setNewHargaPrice('Rp 8.000/kg');
    setPriceSuccess('Usulan harga berhasil dikirim untuk diproses!');
    setTimeout(() => setPriceSuccess(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-primary text-on-primary shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Building className="text-secondary w-6 h-6" />
            <span className="font-sans text-xl font-bold tracking-tight">Kemenkopdes KDMP</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center font-bold text-sm">
                AK
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold leading-tight">Admin Koperasi</div>
                <div className="text-[10px] text-secondary-fixed leading-tight">Wilayah Banyuwangi</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-on-primary"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome and Tabs Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Manajemen Koperasi Desa Mandiri Pangan (KDMP)</h1>
            <p className="text-sm text-on-surface-variant">
              Gunakan panel ini untuk mengaudit hasil panen petani, mengelola anggota binaan, serta menetapkan margin harga.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('riwayat')}
              className="px-4 py-2 bg-white text-primary border border-outline-variant text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-secondary" />
              <span>Log Mutasi Global</span>
            </button>
          </div>
        </div>

        {/* Indikator Koperasi Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Margin Penjualan Rata-rata</span>
              <h2 className="text-3xl font-bold text-primary">+18.4%</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">Target Akhir Tahun Koperasi: +20.0%</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary-container/20 text-primary rounded-xl">
              <Archive className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Volume Gudang Tersedia</span>
              <h2 className="text-3xl font-bold text-primary">45.2 Ton</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">Beras Premium, Jagung Pipil, Kedelai</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-tertiary-container/20 text-tertiary rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Antrean Audit Panen</span>
              <h2 className="text-3xl font-bold text-primary">{pendingReportsCount} Laporan</h2>
              <p className="text-[11px] text-error font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Butuh Verifikasi Segera
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="border-b border-outline-variant flex gap-6">
          <button
            onClick={() => setActiveSubTab('verifikasi')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeSubTab === 'verifikasi'
                ? 'border-secondary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            Audit &amp; Verifikasi Padi ({pendingReportsCount})
          </button>
          
          <button
            onClick={() => setActiveSubTab('petani')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeSubTab === 'petani'
                ? 'border-secondary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            Kelola Petani Binaan ({farmers.length})
          </button>

          <button
            onClick={() => setActiveSubTab('margin')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeSubTab === 'margin'
                ? 'border-secondary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            Apresiasi Harga &amp; HPP
          </button>
        </div>

        {/* Tab Content 1: Verifikasi Panen */}
        {activeSubTab === 'verifikasi' && (
          <div className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant">
              <h3 className="font-sans text-lg font-bold text-primary">Sistem Verifikasi Padi &amp; Komoditas Petani</h3>
              <p className="text-xs text-on-surface-variant">
                Klik setujui untuk memperbarui ledger transaksi dan mempublikasikan kuantitas terverifikasi ke katalog pembeli SPPG.
              </p>
            </div>
            
            {landReports.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant text-sm">
                Belum ada laporan panen yang masuk.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-outline-variant text-[11px] font-bold text-primary uppercase tracking-wider">
                      <th className="py-3 px-4">Tanggal</th>
                      <th className="py-3 px-4">Blok Lahan / Pengirim</th>
                      <th className="py-3 px-4">Komoditas Utama</th>
                      <th className="py-3 px-4">Kuantitas</th>
                      <th className="py-3 px-4 text-center">Status Laporan</th>
                      <th className="py-3 px-4 text-right">Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-xs text-on-surface">
                    {landReports.map((report, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-medium">{report.tanggal}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-primary">{report.lahan}</div>
                          <div className="text-[10px] text-on-surface-variant">Sutaryo (Mitra Tani)</div>
                        </td>
                        <td className="py-3 px-4 font-medium text-on-surface-variant">{report.produk}</td>
                        <td className="py-3 px-4 font-mono font-bold text-primary">{report.volume}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            report.status === 'TERDIVERIFIKASI'
                              ? 'bg-secondary-container text-secondary'
                              : 'bg-tertiary-fixed text-tertiary animate-pulse'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {report.status === 'PENDING' ? (
                            <button
                              id={`btn-verify-${idx}`}
                              onClick={() => onVerifyReport(idx)}
                              className="px-3 py-1.5 bg-secondary text-on-secondary font-sans text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all cursor-pointer"
                            >
                              Setujui &amp; Verifikasi
                            </button>
                          ) : (
                            <span className="text-xs font-mono text-secondary font-bold flex items-center justify-end gap-1">
                              <CheckCircle className="w-3.5 h-3.5" />
                              TERAUDIT
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Kelola Petani */}
        {activeSubTab === 'petani' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Pendaftaran */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4 h-fit">
              <div className="space-y-1">
                <h3 className="font-sans text-lg font-bold text-primary flex items-center gap-1.5">
                  <UserPlus className="text-secondary w-5 h-5" />
                  Tambah Petani Binaan Baru
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Daftarkan nama petani baru ke dalam ledger binaan Koperasi KDMP.
                </p>
              </div>

              {farmerSuccess && (
                <div className="p-3 bg-secondary-container/40 text-secondary rounded-xl text-xs font-medium animate-fade-in">
                  {farmerSuccess}
                </div>
              )}

              <form onSubmit={handleRegisterFarmer} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Nama Lengkap Petani</label>
                  <input
                    type="text"
                    value={newFarmerName}
                    onChange={(e) => setNewFarmerName(e.target.value)}
                    placeholder="Contoh: Ahmad Maulana"
                    className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">ID Alokasi Lahan</label>
                    <input
                      type="text"
                      value={newFarmerLand}
                      onChange={(e) => setNewFarmerLand(e.target.value)}
                      placeholder="LH-0115"
                      className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Komoditas Utama</label>
                    <input
                      type="text"
                      value={newFarmerKomoditas}
                      onChange={(e) => setNewFarmerKomoditas(e.target.value)}
                      placeholder="Padi Ciherang"
                      className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <button
                  id="btn-add-petani"
                  type="submit"
                  className="w-full h-11 bg-primary text-on-primary rounded-xl font-body-md font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  Daftarkan Anggota Baru
                </button>
              </form>
            </div>

            {/* List Petani */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="p-6 border-b border-outline-variant">
                <h3 className="font-sans text-lg font-bold text-primary">Daftar Petani Binaan Aktif</h3>
                <p className="text-xs text-on-surface-variant">Rincian status sertifikasi kelompok tani wilayah Banyuwangi.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-outline-variant text-[11px] font-bold text-primary uppercase tracking-wider">
                      <th className="py-3 px-4">Petani</th>
                      <th className="py-3 px-4">ID Lahan</th>
                      <th className="py-3 px-4">Komoditas Utama</th>
                      <th className="py-3 px-4 text-right">Status Koperasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-xs text-on-surface">
                    {farmers.map((farmer) => (
                      <tr key={farmer.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${farmer.bgClass}`}>
                            {farmer.initials}
                          </div>
                          <div>
                            <div className="font-bold text-primary">{farmer.nama}</div>
                            <div className="text-[10px] font-mono text-on-surface-variant">{farmer.id}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-on-surface-variant">{farmer.idLahan}</td>
                        <td className="py-3 px-4 font-semibold text-primary">{farmer.komoditas}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            farmer.status === 'AKTIF'
                              ? 'bg-secondary-container text-secondary'
                              : 'bg-error-container text-error'
                          }`}>
                            {farmer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Kelola Margin */}
        {activeSubTab === 'margin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Usulan Harga */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4 h-fit">
              <div className="space-y-1">
                <h3 className="font-sans text-lg font-bold text-primary flex items-center gap-1.5">
                  <DollarSign className="text-secondary w-5 h-5" />
                  Proposalkan Kesepakatan Harga Baru
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Usulkan pagu harga eceran tertinggi komoditas wilayah agar didokumentasikan di SPPG.
                </p>
              </div>

              {priceSuccess && (
                <div className="p-3 bg-secondary-container/40 text-secondary rounded-xl text-xs font-medium animate-fade-in">
                  {priceSuccess}
                </div>
              )}

              <form onSubmit={handleProposePrice} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Nama Komoditas / Produk</label>
                  <input
                    type="text"
                    value={newKomoditasPrice}
                    onChange={(e) => setNewKomoditasPrice(e.target.value)}
                    placeholder="Contoh: Gabah Kering Giling"
                    className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Oleh (Wilayah)</label>
                    <input
                      type="text"
                      value={newOlehPrice}
                      onChange={(e) => setNewOlehPrice(e.target.value)}
                      placeholder="Hj. Rohayati (Brebes)"
                      className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Pagu Harga Kesepakatan</label>
                    <input
                      type="text"
                      value={newHargaPrice}
                      onChange={(e) => setNewHargaPrice(e.target.value)}
                      className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <button
                  id="btn-add-harga"
                  type="submit"
                  className="w-full h-11 bg-primary text-on-primary rounded-xl font-body-md font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  Kirim Usulan Harga
                </button>
              </form>
            </div>

            {/* List Usulan Harga */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="p-6 border-b border-outline-variant">
                <h3 className="font-sans text-lg font-bold text-primary">Daftar Pagu Harga Terdaftar</h3>
                <p className="text-xs text-on-surface-variant">Harga patokan regional yang berlaku untuk kesepakatan dagang petani dan koperasi.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-outline-variant text-[11px] font-bold text-primary uppercase tracking-wider">
                      <th className="py-3 px-4">Komoditas</th>
                      <th className="py-3 px-4">Oleh / Wilayah</th>
                      <th className="py-3 px-4">Pagu Harga</th>
                      <th className="py-3 px-4 text-right">Status Usulan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-xs text-on-surface">
                    {approvals.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-primary">{app.komoditas}</td>
                        <td className="py-3 px-4 text-on-surface-variant font-medium">{app.oleh}</td>
                        <td className="py-3 px-4 font-mono font-bold text-secondary">{app.harga}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] bg-secondary-container text-secondary font-bold">
                            <CheckCircle className="w-3 h-3" />
                            <span>DISETUJUI</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
