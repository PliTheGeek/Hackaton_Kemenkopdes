/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  Truck, 
  Archive, 
  Scale, 
  LogOut, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Plus,
  X,
  Info
} from 'lucide-react';
import { CatalogItem, Transaction, ViewType } from '../types';

interface BuyerDashboardViewProps {
  catalog: CatalogItem[];
  transactions: Transaction[];
  onAddTransaction: (transaction: Transaction) => void;
  onLogout: () => void;
  onNavigate: (view: ViewType) => void;
}

export default function BuyerDashboardView({
  catalog,
  transactions,
  onAddTransaction,
  onLogout,
  onNavigate
}: BuyerDashboardViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [quantity, setQuantity] = useState('1000');
  const [address, setAddress] = useState('Gudang Induk Distribusi Jakarta, Blok B No. 4');
  const [paymentMethod, setPaymentMethod] = useState('Koperasi Virtual Account (VA)');
  const [checkoutSuccess, setCheckoutSuccess] = useState('');

  // Filter transactions belonging to SPPG or global purchases
  const sppgTransactions = transactions;

  // Total expenditure calculation
  const totalExpenditure = transactions
    .filter(t => t.status === 'Diterima')
    .reduce((acc, curr) => acc + curr.totalHarga, 0);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  };

  const handleBeliCepatClick = (product: CatalogItem) => {
    setSelectedProduct(product);
    setCheckoutSuccess('');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) {
      return;
    }

    const qtyNum = parseInt(quantity) || 0;
    const totalHarga = selectedProduct.harga * qtyNum;
    const trxId = `TRX-${Math.floor(10000 + Math.random() * 90000)}`;

    const newTrx: Transaction = {
      id: trxId,
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      produk: selectedProduct.nama,
      detail: `${selectedProduct.grade || 'Grade Premium'} • Curah`,
      entitas: 'Sentra Pengolah SPPG-01',
      role: 'SPPG',
      kuantitas: `${qtyNum.toLocaleString('id-ID')} Kg`,
      totalHarga,
      margin: 1.8,
      status: 'Diterima',
      image: selectedProduct.image
    };

    onAddTransaction(newTrx);
    setCheckoutSuccess(`Checkout Berhasil! Transaksi ${trxId} telah masuk ke dalam ledger blockchain Kemenkopdes.`);
    
    // Reset form after a small delay
    setTimeout(() => {
      setSelectedProduct(null);
      setCheckoutSuccess('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-primary text-on-primary shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <ShoppingCart className="text-secondary w-6 h-6" />
            <span className="font-sans text-xl font-bold tracking-tight">Kemenkopdes SPPG</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center font-bold text-sm">
                BH
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold leading-tight">Budi Hartono</div>
                <div className="text-[10px] text-secondary-fixed leading-tight">Mitra Pembeli SPPG</div>
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
        
        {/* Title and Subtitle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Sentra Pelayanan Pertanian Gede (SPPG)</h1>
            <p className="text-sm text-on-surface-variant">
              Akses rantai pasok agrikultur terpercaya dengan asuransi mutu dari Koperasi Unit Desa.
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('riwayat')}
            className="px-4 py-2 bg-white text-primary border border-outline-variant text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-secondary" />
            <span>Riwayat Transaksi Global</span>
          </button>
        </div>

        {/* Indikator Belanja Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Total Nilai Pembelian</span>
              <h2 className="text-2xl font-bold text-primary">{formatRupiah(totalExpenditure || 284700000)}</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">Berdasarkan data audit blockchain</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary-container/20 text-primary rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Efisiensi Sourcing</span>
              <h2 className="text-3xl font-bold text-primary">+12.8%</h2>
              <p className="text-[11px] text-secondary font-medium">Direct Sourcing Koperasi Tani</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm flex items-start gap-4">
            <div className="p-3 bg-tertiary-container/20 text-tertiary rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">SLA Pengiriman Kontrak</span>
              <h2 className="text-3xl font-bold text-primary">100%</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">Pengiriman Terlacak Real-time GPS</p>
            </div>
          </div>
        </div>

        {/* Catalog Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Product Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-sans text-lg font-bold text-primary">Katalog Komoditas Pangan Verified</h3>
                  <p className="text-xs text-on-surface-variant">Hasil bumi bersertifikasi kualitas hulu dari Koperasi Unit Desa Mandiri.</p>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {catalog.map(product => (
                  <div key={product.id} className="border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-secondary transition-all">
                    <div className="h-40 relative">
                      <img className="w-full h-full object-cover" src={product.image} alt={product.nama} referrerPolicy="no-referrer" />
                      {product.grade && (
                        <div className="absolute top-3 left-3 bg-secondary text-on-secondary px-2 py-0.5 rounded text-[10px] font-bold">
                          {product.grade}
                        </div>
                      )}
                      {product.tag && (
                        <div className="absolute top-3 right-3 bg-error text-on-error px-2 py-0.5 rounded text-[10px] font-bold">
                          {product.tag}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-primary leading-tight">{product.nama}</h4>
                        <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-secondary" />
                          {product.lokasi}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-outline-variant/60">
                        <div>
                          <div className="text-[10px] text-on-surface-variant">Harga Pagu Koperasi</div>
                          <div className="font-mono text-sm font-bold text-primary">{formatRupiah(product.harga)}/Kg</div>
                        </div>
                        
                        <button
                          id={`btn-beli-${product.id}`}
                          onClick={() => handleBeliCepatClick(product)}
                          className="px-3 py-1.5 bg-primary text-on-primary font-sans text-xs font-semibold rounded-lg hover:bg-secondary hover:text-on-secondary transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Beli Cepat
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Checkout or Transactions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Checkout Area */}
            {selectedProduct ? (
              <div className="bg-white p-6 rounded-2xl border-2 border-secondary shadow-lg space-y-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h3 className="font-sans text-lg font-bold text-primary flex items-center gap-2">
                    <ShoppingCart className="text-secondary w-5 h-5" />
                    Form Checkout Langsung
                  </h3>
                  <button onClick={() => setSelectedProduct(null)} className="p-1 hover:bg-slate-100 rounded-full">
                    <X className="w-5 h-5 text-on-surface-variant" />
                  </button>
                </div>

                {checkoutSuccess && (
                  <div className="p-3 bg-secondary-container text-secondary rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{checkoutSuccess}</span>
                  </div>
                )}

                <div className="p-3 bg-surface border border-outline-variant rounded-xl flex items-center gap-3">
                  <img className="w-12 h-12 object-cover rounded-lg" src={selectedProduct.image} alt={selectedProduct.nama} referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-sm font-bold text-primary">{selectedProduct.nama}</h4>
                    <p className="text-xs text-on-surface-variant">{selectedProduct.lokasi} • {formatRupiah(selectedProduct.harga)}/Kg</p>
                  </div>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Jumlah Kuantitas Belanja (Kg)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Contoh: 1000"
                      className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Alamat Pengiriman Logistik</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Metode Pembayaran Digital</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="block w-full px-3 py-2 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none"
                    >
                      <option value="Koperasi Virtual Account (VA)">Koperasi Virtual Account (VA)</option>
                      <option value="Direct Bank Transfer (BUMN)">Direct Bank Transfer (BUMN)</option>
                      <option value="Escrow Kemenkopdes">Escrow Kemenkopdes</option>
                    </select>
                  </div>

                  {/* Calculations */}
                  <div className="pt-3 border-t border-outline-variant space-y-1.5">
                    <div className="flex justify-between text-xs text-on-surface-variant">
                      <span>Harga Satuan:</span>
                      <span>{formatRupiah(selectedProduct.harga)}/Kg</span>
                    </div>
                    <div className="flex justify-between text-xs text-on-surface-variant">
                      <span>Kuantitas:</span>
                      <span>{(parseInt(quantity) || 0).toLocaleString('id-ID')} Kg</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-primary pt-1 border-t border-dashed border-outline-variant">
                      <span>Total Biaya:</span>
                      <span className="text-secondary font-mono">{formatRupiah((parseInt(quantity) || 0) * selectedProduct.harga)}</span>
                    </div>
                  </div>

                  <button
                    id="btn-buyer-checkout"
                    type="submit"
                    className="w-full h-11 bg-secondary text-on-secondary rounded-xl font-body-md font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Konfirmasi Pembelian
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant border-dashed text-center space-y-2">
                <Info className="w-8 h-8 text-secondary mx-auto" />
                <h4 className="text-sm font-bold text-primary">Instruksi Pembelian Cepat</h4>
                <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                  Silakan pilih komoditas pangan bersertifikasi di katalog sebelah kiri lalu klik tombol <strong className="text-primary">Beli Cepat</strong> untuk melangsungkan checkout digital hulu ke hilir.
                </p>
              </div>
            )}

            {/* Riwayat Pembelian SPPG */}
            <div className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="p-6 border-b border-outline-variant">
                <h3 className="font-sans text-lg font-bold text-primary">Riwayat Pembelian SPPG</h3>
                <p className="text-xs text-on-surface-variant">Data kontrak pasokan fisik yang telah Anda konfirmasikan.</p>
              </div>
              <div className="divide-y divide-outline-variant max-h-[380px] overflow-y-auto">
                {sppgTransactions.map((trx) => (
                  <div key={trx.id} className="p-4 flex gap-3 hover:bg-slate-50/50 transition-colors">
                    <img className="w-10 h-10 object-cover rounded-lg shrink-0 border" src={trx.image} alt={trx.produk} referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-primary truncate pr-2">{trx.produk}</h4>
                        <span className="font-mono text-[10px] font-bold text-secondary text-right">{formatRupiah(trx.totalHarga)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-on-surface-variant">
                        <span>Vol: <strong className="text-primary">{trx.kuantitas}</strong></span>
                        <span>{trx.tanggal.split(',')[0]}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-mono text-[9px] text-on-surface-variant bg-slate-100 px-1.5 py-0.5 rounded">{trx.id}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          trx.status === 'Diterima' ? 'bg-secondary-container text-secondary' : 'bg-tertiary-fixed text-tertiary'
                        }`}>{trx.status === 'Diterima' ? 'LUNAS / SENT' : trx.status.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
