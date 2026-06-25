/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  TrendingUp, 
  Plus, 
  CheckCircle, 
  Clock, 
  LogOut, 
  Wheat, 
  FileSpreadsheet, 
  Scale, 
  Info,
  DollarSign
} from 'lucide-react';
import { Land, LandReport, ViewType, Transaction } from '../types';

interface FarmerDashboardViewProps {
  lands: Land[];
  landReports: LandReport[];
  transactions: Transaction[];
  onAddLandReport: (report: LandReport) => void;
  onLogout: () => void;
  onNavigate: (view: ViewType) => void;
}

export default function FarmerDashboardView({
  lands,
  landReports,
  transactions,
  onAddLandReport,
  onLogout,
  onNavigate
}: FarmerDashboardViewProps) {
  const [selectedLandId, setSelectedLandId] = useState(lands[0]?.id || '');
  const [volume, setVolume] = useState('500');
  const [varietas, setVarietas] = useState('Padi IR64');
  const [estimatedHpp, setEstimatedHpp] = useState('4200');
  const [statusMessage, setStatusMessage] = useState('');

  const selectedLandObj = lands.find(l => l.id === selectedLandId);

  // Total estimates calculation
  const totalVolume = landReports.reduce((acc, curr) => {
    const num = parseInt(curr.volume.replace(/[^0-9]/g, '')) || 0;
    return acc + num;
  }, 0);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volume || !varietas || !selectedLandId) {
      setStatusMessage('Mohon isi semua data laporan dengan benar.');
      return;
    }

    const landName = selectedLandObj ? selectedLandObj.nama : 'Lahan Petani';
    const newReport: LandReport = {
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      lahan: landName,
      produk: varietas,
      volume: `${volume} Kg`,
      status: 'PENDING'
    };

    onAddLandReport(newReport);
    setStatusMessage('Laporan panen berhasil dikirim ke Koperasi KDMP untuk diverifikasi!');
    setVolume('');
    
    // Auto clear status message
    setTimeout(() => {
      setStatusMessage('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="bg-primary text-on-primary shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Sprout className="text-secondary w-6 h-6" />
            <span className="font-sans text-xl font-bold tracking-tight">Kemenkopdes</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm">
                SY
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold leading-tight">Sutaryo</div>
                <div className="text-[10px] text-secondary-fixed leading-tight">Petani Banyuwangi</div>
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

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Headline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Selamat Datang, Pak Sutaryo!</h1>
            <p className="text-sm text-on-surface-variant">
              Kelola aktivitas lahan pertanian Anda, catat estimasi panen, dan pantau verifikasi dari KDMP.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('riwayat')}
              className="px-4 py-2 bg-white text-primary border border-outline-variant text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-secondary" />
              <span>Buka Log Global</span>
            </button>
          </div>
        </div>

        {/* Statistik Lahan Aktif Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
              <Scale className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Total Laporan Hasil</span>
              <h2 className="text-3xl font-bold text-primary">{(totalVolume / 1000).toFixed(2)} Ton</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">Berasal dari {landReports.length} kali pelaporan</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary-container/20 text-primary rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Lahan Tervalidasi</span>
              <h2 className="text-3xl font-bold text-primary">2 / 2</h2>
              <p className="text-[11px] text-secondary font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Sertifikasi Kemenkopdes Aktif
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-tertiary-container/20 text-tertiary rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Biaya HPP Rata-rata</span>
              <h2 className="text-3xl font-bold text-primary">{formatRupiah(parseInt(estimatedHpp))} / kg</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">HPP Teroptimasi Subsidi Koperasi</p>
            </div>
          </div>
        </div>

        {/* Lahan Detail & Input Panen Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-outline-variant shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="font-sans text-lg font-bold text-primary flex items-center gap-1.5">
                <Wheat className="text-secondary w-5 h-5" />
                Input Hasil Panen &amp; Proyeksi HPP
              </h3>
              <p className="text-xs text-on-surface-variant">
                Isi data di bawah untuk mengirim laporan hasil panen langsung ke Koperasi Unit Desa (KDMP).
              </p>
            </div>

            {statusMessage && (
              <div className="p-3 bg-secondary-container/40 text-secondary rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Pilih Blok Lahan</label>
                <select
                  value={selectedLandId}
                  onChange={(e) => setSelectedLandId(e.target.value)}
                  className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  {lands.map(land => (
                    <option key={land.id} value={land.id}>{land.nama} ({land.kapasitas} Ha)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Volume (Kg)</label>
                  <input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="Contoh: 1500"
                    className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Estimasi HPP/Kg</label>
                  <div className="relative rounded-xl shadow-sm">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-on-surface-variant">Rp</span>
                    <input
                      type="number"
                      value={estimatedHpp}
                      onChange={(e) => setEstimatedHpp(e.target.value)}
                      placeholder="4200"
                      className="block w-full pl-8 pr-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Komoditas &amp; Varietas</label>
                <input
                  type="text"
                  value={varietas}
                  onChange={(e) => setVarietas(e.target.value)}
                  placeholder="Contoh: Padi IR64"
                  className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <button
                id="btn-petani-submit"
                type="submit"
                className="w-full h-11 bg-secondary text-on-secondary rounded-xl font-body-md font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Submit Laporan Panen
              </button>
            </form>
          </div>

          {/* Right: Lahan Monitor & Active Progress bar */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
              <h3 className="font-sans text-lg font-bold text-primary">Monitoring Real-time Blok Lahan</h3>
              <p className="text-xs text-on-surface-variant">
                Visualisasi tingkat kesiapan panen dan status pemeliharaan berdasarkan data sensor lapangan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {lands.map(land => (
                  <div key={land.id} className="border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="h-32 relative">
                      <img className="w-full h-full object-cover" src={land.backgroundImage} alt={land.nama} referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="text-xs font-mono opacity-80">{land.id}</div>
                        <h4 className="font-bold text-sm leading-tight">{land.nama}</h4>
                      </div>
                      <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold ${
                        land.status === 'AKTIF' 
                          ? 'bg-secondary text-on-secondary' 
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}>
                        {land.status}
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-on-surface-variant">Varietas: <strong className="text-primary">{land.varietas}</strong></span>
                        <span className="text-on-surface-variant">Luas: <strong className="text-primary">{land.kapasitas} Ha</strong></span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold">
                          <span className="text-on-surface-variant">Progress Siklus</span>
                          <span className="text-secondary">{land.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${land.status === 'AKTIF' ? 'bg-secondary' : 'bg-outline'}`}
                            style={{ width: `${land.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Table */}
            <div className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="p-6 border-b border-outline-variant">
                <h3 className="font-sans text-lg font-bold text-primary">Riwayat &amp; Status Verifikasi Panen</h3>
                <p className="text-xs text-on-surface-variant">Daftar laporan panen yang disubmit oleh Anda.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-outline-variant text-[11px] font-bold text-primary uppercase tracking-wider">
                      <th className="py-3 px-4">Tanggal</th>
                      <th className="py-3 px-4">Blok Lahan</th>
                      <th className="py-3 px-4">Komoditas</th>
                      <th className="py-3 px-4">Volume</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-xs text-on-surface">
                    {landReports.map((report, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-medium">{report.tanggal}</td>
                        <td className="py-3 px-4 font-semibold text-primary">{report.lahan}</td>
                        <td className="py-3 px-4">{report.produk}</td>
                        <td className="py-3 px-4 font-mono font-bold">{report.volume}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            report.status === 'TERDIVERIFIKASI'
                              ? 'bg-secondary-container text-secondary'
                              : 'bg-tertiary-fixed text-tertiary'
                          }`}>
                            {report.status === 'TERDIVERIFIKASI' ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                <span>VERIFIKASI</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" />
                                <span>PENDING</span>
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
