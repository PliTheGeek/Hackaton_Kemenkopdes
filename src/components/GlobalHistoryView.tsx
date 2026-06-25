/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Sprout, 
  Building, 
  ShoppingCart,
  TrendingUp,
  Coins,
  Scale
} from 'lucide-react';
import { Transaction, ViewType } from '../types';

interface GlobalHistoryViewProps {
  transactions: Transaction[];
  onNavigate: (view: ViewType) => void;
  currentRole: 'petani' | 'manager' | 'pembeli' | null;
}

export default function GlobalHistoryView({ transactions, onNavigate, currentRole }: GlobalHistoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'PETANI' | 'KDMP' | 'SPPG'>('ALL');
  const [exportToast, setExportToast] = useState('');

  // Calculations based on actual transactions list
  const totalFinancialVolume = transactions.reduce((acc, t) => acc + t.totalHarga, 0);
  const totalItemsCount = transactions.length;

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.entitas.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRole = roleFilter === 'ALL' || t.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  };

  const handleExportClick = () => {
    setExportToast('Mengekspor data ledger ekosistem ke format CSV... Sukses!');
    setTimeout(() => setExportToast(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Top */}
      <nav className="flex justify-between items-center w-full h-16 px-6 bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <Sprout className="text-secondary w-6 h-6" />
          <span className="font-sans text-xl font-bold text-primary">Kemenkopdes Ledger</span>
        </div>
        
        <div>
          <button
            onClick={() => {
              if (currentRole === 'petani') onNavigate('petani');
              else if (currentRole === 'manager') onNavigate('manager');
              else if (currentRole === 'pembeli') onNavigate('pembeli');
              else onNavigate('landing');
            }}
            className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </button>
        </div>
      </nav>

      {/* Main Panel */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Title and Subtitle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FileSpreadsheet className="text-secondary w-7 h-7" />
              Riwayat Transaksi Global (Ledger Ekosistem)
            </h1>
            <p className="text-sm text-on-surface-variant max-w-2xl">
              Ledger audit publik Kemenkopdes mencatat setiap alur komoditas pangan dari lahan petani, distribusi Koperasi KDMP, hingga pembelian SPPG.
            </p>
          </div>
          
          <button
            onClick={handleExportClick}
            className="px-4 py-2 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Ledger (.CSV)</span>
          </button>
        </div>

        {exportToast && (
          <div className="p-3 bg-secondary-container text-secondary text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in max-w-fit">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{exportToast}</span>
          </div>
        )}

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary-container/20 text-primary rounded-xl">
              <Coins className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold font-bold">Volume Likuiditas Berputar</span>
              <h2 className="text-2xl font-bold text-primary">{formatRupiah(totalFinancialVolume)}</h2>
              <p className="text-[11px] text-on-surface-variant">Transaksi Aktif Tercatat di Ledger</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
              <Scale className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold font-bold">Total Entri Transaksi</span>
              <h2 className="text-3xl font-bold text-primary">{totalItemsCount} Mutasi</h2>
              <p className="text-[11px] text-on-surface-variant">Dari Hulu Pertanian Hingga Hilir SPPG</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-tertiary-container/20 text-tertiary rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold font-bold">Stabilitas Margin Surplus</span>
              <h2 className="text-3xl font-bold text-primary">+18.4%</h2>
              <p className="text-[11px] text-secondary font-semibold">Margin Terjaga Sesuai Regulasi Koperasi</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari ID transaksi, nama produk, atau pelaku ekosistem..."
              className="block w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-secondary" />
              Saring Peran:
            </span>
            <div className="inline-flex rounded-lg border border-outline-variant overflow-hidden bg-surface">
              <button
                onClick={() => setRoleFilter('ALL')}
                className={`px-3 py-1.5 text-xs font-semibold ${
                  roleFilter === 'ALL' ? 'bg-primary text-on-primary' : 'hover:bg-slate-100 text-on-surface-variant'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setRoleFilter('PETANI')}
                className={`px-3 py-1.5 text-xs font-semibold ${
                  roleFilter === 'PETANI' ? 'bg-primary text-on-primary' : 'hover:bg-slate-100 text-on-surface-variant'
                }`}
              >
                Petani
              </button>
              <button
                onClick={() => setRoleFilter('KDMP')}
                className={`px-3 py-1.5 text-xs font-semibold ${
                  roleFilter === 'KDMP' ? 'bg-primary text-on-primary' : 'hover:bg-slate-100 text-on-surface-variant'
                }`}
              >
                KDMP
              </button>
              <button
                onClick={() => setRoleFilter('SPPG')}
                className={`px-3 py-1.5 text-xs font-semibold ${
                  roleFilter === 'SPPG' ? 'bg-primary text-on-primary' : 'hover:bg-slate-100 text-on-surface-variant'
                }`}
              >
                SPPG Pembeli
              </button>
            </div>
          </div>
        </div>

        {/* Global Ledger Table */}
        <div className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-[11px] font-bold text-primary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Tanggal Transaksi</th>
                  <th className="py-3.5 px-4">ID Transaksi</th>
                  <th className="py-3.5 px-4">Komoditas / Deskripsi</th>
                  <th className="py-3.5 px-4">Pelaku Ekosistem</th>
                  <th className="py-3.5 px-4">Kuantitas</th>
                  <th className="py-3.5 px-4">Nominal Akhir</th>
                  <th className="py-3.5 px-4 text-center">Status Ledger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-xs text-on-surface">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-on-surface-variant">
                      Tidak ada transaksi yang cocok dengan kriteria filter atau pencarian Anda.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-slate-50/50">
                      <td className="py-4 px-4 font-medium text-on-surface-variant">{trx.tanggal}</td>
                      <td className="py-4 px-4 font-mono font-bold text-primary">{trx.id}</td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-primary leading-tight">{trx.produk}</div>
                        <div className="text-[10px] text-on-surface-variant mt-0.5">{trx.detail}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          {trx.role === 'PETANI' && <Sprout className="w-3.5 h-3.5 text-secondary shrink-0" />}
                          {trx.role === 'KDMP' && <Building className="w-3.5 h-3.5 text-primary shrink-0" />}
                          {trx.role === 'SPPG' && <ShoppingCart className="w-3.5 h-3.5 text-tertiary shrink-0" />}
                          <span className="font-semibold">{trx.entitas}</span>
                        </div>
                        <span className="text-[9px] font-mono uppercase bg-slate-100 text-on-surface-variant px-1 rounded block w-max mt-0.5">{trx.role}</span>
                      </td>
                      <td className="py-4 px-4 font-mono font-semibold text-primary">{trx.kuantitas}</td>
                      <td className="py-4 px-4 font-mono font-bold text-secondary">{formatRupiah(trx.totalHarga)}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          trx.status === 'Diterima' || trx.status === 'Selesai'
                            ? 'bg-secondary-container text-secondary'
                            : trx.status === 'Tinjauan' || trx.status === 'Diproses'
                            ? 'bg-tertiary-fixed text-tertiary'
                            : 'bg-error-container text-error'
                        }`}>
                          {trx.status === 'Diterima' || trx.status === 'Selesai' ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              <span>TERVALIDASI</span>
                            </>
                          ) : trx.status === 'Tinjauan' || trx.status === 'Diproses' ? (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>PENDING AUDIT</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>DIBATALKAN</span>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
