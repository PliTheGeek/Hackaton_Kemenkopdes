/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowRight, 
  Sprout, 
  TrendingUp, 
  CheckCircle, 
  Warehouse, 
  ChevronRight, 
  Globe, 
  Share2, 
  Mail, 
  MapPin, 
  Phone,
  Building,
  Archive,
  Menu,
  X
} from 'lucide-react';
import { ViewType } from '../types';

interface LandingPageViewProps {
  onNavigate: (view: ViewType) => void;
}

export default function LandingPageView({ onNavigate }: LandingPageViewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center w-full h-16 px-6 bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <Sprout className="text-secondary w-6 h-6" />
          <span className="font-headline-lg text-xl md:text-2xl font-bold text-primary">Kemenkopdes</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#tentang">Tentang Kami</a>
          <a className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#layanan">Layanan</a>
          <a className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#pilar">Koperasi</a>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <button 
            id="btn-masuk-nav"
            onClick={() => onNavigate('login')} 
            className="px-4 py-2 font-body-md text-sm text-primary hover:bg-surface-container transition-colors rounded-lg font-medium"
          >
            Masuk
          </button>
          <button 
            id="btn-gabung-nav"
            onClick={() => onNavigate('login')} 
            className="px-4 py-2 font-body-md text-sm bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 transition-opacity font-semibold"
          >
            Mulai Bergabung
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant p-4 space-y-3 sticky top-16 z-50 animate-fade-in">
          <a className="block font-body-md text-sm py-2 text-on-surface-variant hover:text-primary cursor-pointer" onClick={() => setMobileMenuOpen(false)} href="#tentang">Tentang Kami</a>
          <a className="block font-body-md text-sm py-2 text-on-surface-variant hover:text-primary cursor-pointer" onClick={() => setMobileMenuOpen(false)} href="#layanan">Layanan</a>
          <a className="block font-body-md text-sm py-2 text-on-surface-variant hover:text-primary cursor-pointer" onClick={() => setMobileMenuOpen(false)} href="#pilar">Koperasi</a>
          <hr className="border-outline-variant" />
          <div className="flex gap-2 pt-2">
            <button 
              id="btn-masuk-mobile"
              onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }} 
              className="flex-1 py-2 border border-outline-variant rounded-lg text-sm text-primary font-medium"
            >
              Masuk
            </button>
            <button 
              id="btn-gabung-mobile"
              onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }} 
              className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold"
            >
              Mulai Bergabung
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header id="tentang" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">
                <CheckCircle className="text-secondary w-4 h-4" />
                <span className="font-mono">Program Digitalisasi Desa 2024</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-primary leading-tight">
                Modernisasi Koperasi, <br /> Sejahterakan <span className="text-secondary">Petani Indonesia.</span>
              </h1>
              <p className="font-body-md text-lg text-on-surface-variant max-w-lg leading-relaxed">
                Membangun ekosistem agrikultur digital yang transparan dan efisien. Menghubungkan input pertanian, manajemen koperasi, hingga akses pasar global dalam satu platform terpadu.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  id="hero-btn-mulai"
                  onClick={() => onNavigate('login')} 
                  className="h-12 px-6 bg-primary text-on-primary font-body-md font-semibold rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
                >
                  Mulai Bergabung
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  id="hero-btn-ekosistem"
                  onClick={() => {
                    const el = document.getElementById('pilar');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-12 px-6 border-2 border-primary text-primary font-body-md font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/5 transition-all"
                >
                  Lihat Ekosistem
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-square md:aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden shadow-2xl relative border border-outline-variant">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A cinematic aerial view of terraced rice fields"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDeJN0J9MQC88Q0uHq39XxPm0L9b_BCdsMTvmjsgHCQ6l25xXE0dTbqeUA_Lz_4L_4E39WxVJpZCv-ivVBJYLYWQLUf08u_QHP9c6L42v2smU185zqOI8f6JbOnyWBuVoN3jt5XqUMNwasklOz-gikUZd4sK1WHaUY9ItABMePRShFrb1LU544z1HSNuegsZnCNbgT6oKlMlmtclCp1VSZssr_t2NZItHtfiNAohLXLzlyY1Dlkyc8PyxT3TlpnWzpcafBZYOKjWk"
                />
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-3 border border-white/20">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-on-secondary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-on-surface-variant font-semibold">Kenaikan Margin</div>
                    <div className="font-sans text-xl font-bold text-primary">+24.5%</div>
                  </div>
                </div>
              </div>
              {/* Decorative background blur */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-primary-container text-on-primary-container px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:divide-x md:divide-on-primary-container/20">
            <div className="space-y-1">
              <div className="font-mono text-xs text-primary-fixed-dim uppercase tracking-widest font-semibold">Pemberdayaan Aktif</div>
              <div className="text-4xl md:text-5xl font-sans font-bold">1,000+</div>
              <div className="text-sm opacity-80">Petani Terverifikasi</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-xs text-primary-fixed-dim uppercase tracking-widest font-semibold">Jejaring Desa</div>
              <div className="text-4xl md:text-5xl font-sans font-bold">50+</div>
              <div className="text-sm opacity-80">Koperasi Aktif</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-xs text-primary-fixed-dim uppercase tracking-widest font-semibold">Total Perputaran</div>
              <div className="text-4xl md:text-5xl font-sans font-bold">Rp 10M+</div>
              <div className="text-sm opacity-80">Transaksi Ekosistem</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section id="pilar" className="py-20 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary">Tiga Pilar Utama Ekosistem</h2>
            <p className="font-body-md text-on-surface-variant">
              Menciptakan nilai tambah melalui integrasi hulu ke hilir dengan tata kelola digital yang akuntabel.
            </p>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            {/* Petani Card */}
            <div className="col-span-12 md:col-span-8 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant hover:border-primary transition-all flex flex-col md:flex-row gap-6 group">
              <div className="md:w-1/2 space-y-4">
                <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold text-primary">Modul Petani (Input &amp; HPP)</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Digitalisasi pencatatan biaya produksi (HPP) dan pengelolaan input pertanian. Petani mendapatkan kepastian modal dan panduan siklus tanam berbasis data.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                    <CheckCircle className="text-secondary w-5 h-5 shrink-0" />
                    <span>Kalkulasi HPP Real-time</span>
                  </li>
                  <li className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                    <CheckCircle className="text-secondary w-5 h-5 shrink-0" />
                    <span>Akses Saprotan Terjamin</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 rounded-xl overflow-hidden bg-surface-container border border-outline-variant relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[200px]" 
                  alt="A detailed dashboard screen on a modern tablet showing agricultural data analytics"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCemEqp2bPUEkJriANYgRfR4kJz6TRmU4snXwgtjRhD-aocq2IVbiIyVkqKf9tsIq9qVMGza2nwsUlqs1fcdkGeeF9FpXu6gZFuimLS9_6POEBzHmKRZqbXb_wXF8ZUbBsM8BNkejlJtw5pkiqjdSj9NYKJ8oqBxY2S3IWME9ESD9F5IHt5w8qIqEyoAM-V4cBJV6QDFa3pC_BrWTg94jRSKSTEjfkskVzuSq8a2e3gYq_csQO0FbpZ2qr17WkDUKUrVfusiY4q2kc"
                />
              </div>
            </div>

            {/* KDMP Card */}
            <div className="col-span-12 md:col-span-4 bg-primary text-on-primary p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all border border-outline-variant">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-primary/10 rounded-lg flex items-center justify-center text-on-primary">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold">KDMP Management</h3>
                <p className="font-body-md text-sm text-primary-fixed opacity-90 leading-relaxed">
                  Sistem manajemen margin dan inventori untuk Koperasi Desa Mandiri Pangan yang lebih transparan dan efisien.
                </p>
              </div>
              <div className="pt-6 border-t border-on-primary/20 mt-6 space-y-1">
                <div className="font-mono text-xs text-secondary-fixed uppercase tracking-wider font-semibold">Fitur Utama</div>
                <div className="text-sm font-medium">Audit Stok Otomatis &amp; Optimasi Margin Penjualan.</div>
              </div>
            </div>

            {/* SPPG Card */}
            <div className="col-span-12 md:col-span-4 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant hover:border-secondary transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center">
                  <Archive className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold text-primary">SPPG Distribution</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Sentra Pelayanan Pertanian Gede untuk manajemen katalog produk, pelacakan kualitas produk, dan rantai pasok ke pasar hilir.
                </p>
              </div>
              <button 
                id="pilar-btn-katalog"
                onClick={() => onNavigate('login')}
                className="mt-6 flex items-center gap-1 text-primary font-sans text-sm font-bold hover:gap-2 transition-all self-start"
              >
                <span>Pelajari Katalog</span>
                <ChevronRight className="w-4 h-4 text-secondary" />
              </button>
            </div>

            {/* Impact Card */}
            <div className="col-span-12 md:col-span-8 bg-surface-container-high p-6 md:p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 border border-outline-variant">
              <div className="md:w-1/2 z-10 space-y-4">
                <h3 className="font-sans text-xl md:text-2xl font-bold text-primary">Transparansi Dari Hulu</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Melalui platform kami, setiap transaksi tercatat dalam ledger digital, memastikan keadilan bagi semua stakeholder ekosistem.
                </p>
                <div className="mt-4 flex -space-x-2">
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-secondary-container text-secondary flex items-center justify-center text-xs font-bold font-mono">P</div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-tertiary-fixed text-tertiary flex items-center justify-center text-xs font-bold font-mono font-semibold">K</div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold font-mono">S</div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold font-mono">+1k</div>
                </div>
              </div>
              <div className="md:w-1/2 h-full min-h-[180px] w-full relative z-10">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-outline-variant">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="A modern logistics center with stacked crates of fresh produce"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__llKJ4flZqSCHXG8gcV2cRw1TvbVYAqb-6hvaWSBo6rxafrsR_rI1ifMgBg1fQ0DGjMq7lEul7SGa4Fp42VW_QbLKIuga2sB-leGaWkfRdOVzSNZUenyZo_OmF__tJOqXVI68kYpx9TixMq8vpM7zoICGhapT3LXnV5_xROxoH9I7k3XTMTDrln91l6ciAKc2r2God6eXQZdcvH2dTQ8XoLieLtXv21DLzNmcheKpMP-IzhLiHF9eq_2TIhe_QzXNruQ85l98SU"
                  />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="layanan" className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="lg:w-2/3 z-10 text-center lg:text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-on-primary leading-tight">Siap mendigitalisasi Koperasi Anda?</h2>
              <p className="font-body-md text-lg text-on-primary opacity-80">
                Bergabunglah dengan ribuan petani dan puluhan koperasi yang telah merasakan manfaat efisiensi digital Kemenkopdes.
              </p>
            </div>
            <div className="lg:w-1/3 z-10 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button 
                id="cta-btn-daftar"
                onClick={() => onNavigate('login')} 
                className="w-full sm:w-48 lg:w-full h-12 bg-secondary text-on-secondary rounded-xl font-body-md font-bold shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Daftar Sekarang
              </button>
              <button 
                id="cta-btn-konsul"
                onClick={() => onNavigate('login')} 
                className="w-full sm:w-48 lg:w-full h-12 bg-white/10 text-on-primary border border-white/20 rounded-xl font-body-md hover:bg-white/20 transition-all cursor-pointer"
              >
                Konsultasi Gratis
              </button>
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/15 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <Sprout className="text-secondary w-6 h-6" />
                <span className="font-sans text-2xl font-bold text-primary">Kemenkopdes</span>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Membangun Kedaulatan Pangan melalui Transformasi Digital Koperasi Desa. Terintegrasi, Transparan, dan Terpercaya.
              </p>
              <div className="flex gap-3">
                <a className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="#">
                  <Globe className="w-4 h-4" />
                </a>
                <a className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="#">
                  <Share2 className="w-4 h-4" />
                </a>
                <a className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="#">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wider">Layanan</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary" href="#">Sistem Petani</a></li>
                <li><a className="hover:text-primary" href="#">Manajemen KDMP</a></li>
                <li><a className="hover:text-primary" href="#">Katalog SPPG</a></li>
                <li><a className="hover:text-primary" href="#">Data Analytics</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wider">Ekosistem</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary" href="#">Cari Koperasi</a></li>
                <li><a className="hover:text-primary" href="#">Jaringan Desa</a></li>
                <li><a className="hover:text-primary" href="#">Mitra Usaha</a></li>
                <li><a className="hover:text-primary" href="#">FAQ</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wider">Kontak Kami</h4>
              <div className="space-y-3 text-sm text-on-surface-variant font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="text-secondary w-5 h-5 shrink-0" />
                  <span>Gedung Pusat Agrikultur, Lt. 12<br />Jl. Jenderal Sudirman No. 45, Jakarta</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-secondary w-5 h-5 shrink-0" />
                  <span>+62 21 555 1234</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-secondary w-5 h-5 shrink-0" />
                  <span>kontak@kemenkopdes.go.id</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-outline-variant pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
            <p>© 2026 Kemenkopdes Platform. Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex gap-6">
              <a className="hover:text-primary" href="#">Kebijakan Privasi</a>
              <a className="hover:text-primary" href="#">Syarat &amp; Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
