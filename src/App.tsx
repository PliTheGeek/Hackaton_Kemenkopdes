import { useState } from "react";
import { Sidebar, UserRole } from "./components/Sidebar";
import { Header } from "./components/Header";
import { FarmerDashboard } from "./views/FarmerDashboard";
import { FarmerRegistration } from "./views/FarmerRegistration";
import { PasarTani } from "./views/PasarTani";
import { ProductDetail } from "./views/ProductDetail";
import { AdminDashboard } from "./views/AdminDashboard";
import { TraderDashboard } from "./views/TraderDashboard";
import { CropSubmission, MarketProduct, SubmissionStatus, Trader, TraderOrder } from "./types";
import { initialSubmissions, initialCoopSubmissions, initialProducts, defaultTrader, initialOrders, IMAGES } from "./data";

export default function App() {
  // UI Roles & active navigation state
  const [role, setRole] = useState<UserRole>("farmer");
  const [activeTab, setActiveTab] = useState<string>("f_dashboard");

  // Global Interactive States linking the circular agrarian economy
  const [submissions, setSubmissions] = useState<CropSubmission[]>([
    ...initialSubmissions,
    ...initialCoopSubmissions
  ]);
  const [products, setProducts] = useState<MarketProduct[]>(initialProducts);
  const [traderProfile, setTraderProfile] = useState<Trader>(defaultTrader);
  const [traderOrders, setTraderOrders] = useState<TraderOrder[]>(initialOrders);

  // Detail item viewing state
  const [selectedProduct, setSelectedProduct] = useState<MarketProduct | null>(null);

  // UI utility states
  const [cartCount, setCartCount] = useState<number>(3); // simulated starting count
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [recentAlerts, setRecentAlerts] = useState<string[]>([
    "Sistem Terpadu: Selamat datang di portal digital AgroKarya Kemenkopdes.",
    "Batas Lahan baru berhasil direkam oleh Satelit Mitra GPS.",
    "Admin: Silakan verifikasi pengajuan panen jagung siti lailatul."
  ]);

  // Handle a new harvest submission from the Farmer dashboard modal or manual registry
  const handleAddSubmission = (newSub: { commodity: string; type: string; volume: number; landArea: string }) => {
    const randomId = `#P-${Math.floor(22930 + Math.random() * 100)}`;
    const freshSubmission: CropSubmission = {
      id: randomId,
      farmerId: "KDMP-0012",
      farmerName: "Petani Sejahtera",
      commodity: newSub.commodity,
      type: newSub.type,
      volume: newSub.volume,
      landArea: newSub.landArea,
      date: "Hari Ini",
      status: SubmissionStatus.Menunggu
    };

    setSubmissions([freshSubmission, ...submissions]);
    
    // Add real-time notification log
    setRecentAlerts([
      `Pengajuan baru ${newSub.commodity} (${newSub.volume} Kg) berhasil diajukan ke KUD.`,
      ...recentAlerts
    ]);

    // Triggers feedback message toast
    alert(`Sukses Lapor Panen! Pengajuan ${newSub.commodity} telah dikirim ke KUD Mitra Mandiri dengan ID: ${randomId}.`);
  };

  // Farmer registration success callback
  const handleRegistrationSuccess = (newSub: { commodity: string; type: string; volume: number; landArea: string }) => {
    handleAddSubmission(newSub);
    // Automatically navigate back to dashboard
    setActiveTab("f_dashboard");
  };

  // Cooperative Admin actions: Approve a crop submission
  const handleApproveSubmission = (id: string) => {
    const subToApprove = submissions.find(s => s.id === id);
    if (!subToApprove) return;

    // 1. Update submissions status to Diterima (Approved)
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: SubmissionStatus.Diterima } : s));

    // 2. Insert approved submission as a new purchasable product in Pasar Tani catalogue!
    const isRice = subToApprove.commodity.toLowerCase().includes("padi") || subToApprove.commodity.toLowerCase().includes("beras");
    const freshCat = isRice ? "Beras" : subToApprove.type === "Sayur" ? "Sayur" : "Biji-bijian";
    
    const newMarketProduct: MarketProduct = {
      id: `prod-approved-${subToApprove.id}`,
      name: `${subToApprove.commodity} Segar - Hasil Panen Unggul`,
      category: freshCat as any,
      origin: "Cianjur",
      price: isRice ? 15000 : 8500, // standard price
      unit: "kg",
      image: isRice ? IMAGES.pandanWangiHands : IMAGES.productChilies,
      available: true,
      stock: subToApprove.volume,
      farmerName: subToApprove.farmerName,
      cooperative: "KUD Mitra Mandiri",
      harvestDate: "Segera Diproses",
      method: "Petani Plasma Unggul",
      elevation: "500 - 700 MDPL",
      coordinates: { lat: -7.2515, lng: 112.7711 },
      desc: `Produk pertanian premium terpilih hasil panen langsung dari lahan terdata sah milik ${subToApprove.farmerName}. Diproses secara aman dengan asiatik kedaulatan pangan modern, bebas residu pestisida kimia.`
    };

    setProducts([newMarketProduct, ...products]);

    // 3. Log notification
    setRecentAlerts([
      `Koperasi menyetujui pengajuan ${subToApprove.id} (${subToApprove.commodity}) milik ${subToApprove.farmerName}!`,
      ...recentAlerts
    ]);

    alert(`Sukses Verifikasi! Pengajuan ${subToApprove.id} milik ${subToApprove.farmerName} telah disetujui & otomatis dipasarkan di Pasar Tani Digital.`);
  };

  // Cooperative Admin actions: Reject a crop submission
  const handleRejectSubmission = (id: string) => {
    const subToReject = submissions.find(s => s.id === id);
    if (!subToReject) return;

    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: SubmissionStatus.Ditolak } : s));

    setRecentAlerts([
      `Koperasi menolak pengajuan ${subToReject.id} demi keakuratan standard sertifikat lahan.`,
      ...recentAlerts
    ]);
  };

  // Cooperative Admin: Add a submission manually
  const handleAddNewCoopSubmission = (newSub: CropSubmission) => {
    setSubmissions([newSub, ...submissions]);
    setRecentAlerts([
      `Petani baru ${newSub.farmerName} terdaftar secara manual oleh Admin.`,
      ...recentAlerts
    ]);
  };

  // SPPG Trader checkout buy action
  const handleTraderBulkBuy = (product: MarketProduct, quantity: number) => {
    // 1. Deduct Product stock
    setProducts(products.map(p => {
      if (p.id === product.id) {
        const remainingStock = Math.max(0, p.stock - quantity);
        return {
          ...p,
          stock: remainingStock,
          available: remainingStock > 0
        };
      }
      return p;
    }));

    // 2. Add as a purchase order trace in Trader active history
    const isRice = product.name.toLowerCase().includes("beras") || product.name.toLowerCase().includes("padi");
    const freshGrade = isRice ? "Premium Grade A" : "Indonesian Grade 1";
    
    const freshTraderOrder: TraderOrder = {
      id: `#ORD-${Math.floor(9430 + Math.random() * 100)}`,
      commodity: product.name.split("-")[0].trim(),
      grade: freshGrade,
      quantity: quantity,
      origin: product.origin,
      amount: quantity * product.price,
      status: "Processing",
      date: "Hari Ini",
      image: product.image
    };

    setTraderOrders([freshTraderOrder, ...traderOrders]);
    setCartCount(cartCount + 1); // visually increment cart size

    // 3. Log alert
    setRecentAlerts([
      `Trader Budi Darmawan membeli borongan ${quantity.toLocaleString("id-ID")} unit komoditas ${product.name}!`,
      ...recentAlerts
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Sidebar navigation context */}
      <Sidebar
        role={role}
        setRole={setRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => {
          alert("Aksi logout disimulasikan. Hubungi Dinas Kemenkopdes.");
        }}
      />

      {/* Main Content Pane */}
      <div className="flex-grow pl-80 flex flex-col min-h-screen">
        
        {/* Header toolbar */}
        <Header
          role={role}
          activeTab={activeTab}
          cartCount={cartCount}
          onCartClick={() => {
            alert(`Keranjang belanja terisi produk borongan hasil tani KUD.`);
          }}
          onNewOrderClick={() => {
            setActiveTab("f_market");
          }}
          onSearch={(term) => setSearchTerm(term)}
          searchTerm={searchTerm}
          onOpenNotifications={() => setShowNotifications(!showNotifications)}
        />

        {/* Global Notifications Drawer toggled from bell */}
        {showNotifications && (
          <div className="mx-8 mt-6 bg-green-950 text-white rounded-3xl p-5 border border-emerald-500/20 shadow-lg space-y-3 animate-fade-in relative">
            <button
              onClick={() => setShowNotifications(false)}
              className="absolute top-4 right-4 text-emerald-400 hover:text-white font-black text-sm"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>Notifikasi Sistem Kelompok Tani Terpadu</span>
            </div>
            <div className="divide-y divide-emerald-800/40 font-medium text-xs text-slate-100 max-h-36 overflow-y-auto space-y-2 pt-2">
              {recentAlerts.map((alertItem, idx) => (
                <div key={idx} className="pt-2 flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">notifications_active</span>
                  <span>{alertItem}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Pane Wrapper */}
        <main className="p-8 flex-grow">
          
          {/* Active Navigation Renderers */}
          {activeTab === "f_dashboard" && (
            <FarmerDashboard
              submissions={submissions.filter(s => s.farmerId === "KDMP-0012")} // simulate just show logged farmer
              addSubmission={handleAddSubmission}
              onGoToRegistration={() => setActiveTab("f_registration")}
              onGoToMarket={() => setActiveTab("f_market")}
            />
          )}

          {activeTab === "f_registration" && (
            <FarmerRegistration
              onSuccess={handleRegistrationSuccess}
              onCancel={() => setActiveTab("f_dashboard")}
            />
          )}

          {activeTab === "f_market" && (
            <PasarTani
              products={products}
              searchTerm={searchTerm}
              onSelectProduct={(prod) => {
                setSelectedProduct(prod);
                setActiveTab("f_product_detail");
              }}
            />
          )}

          {activeTab === "f_product_detail" && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              role={role}
              onAddToCart={handleTraderBulkBuy}
              onGoBack={() => {
                setSelectedProduct(null);
                setActiveTab("f_market");
              }}
            />
          )}

          {activeTab === "c_dashboard" && (
            <AdminDashboard
              submissions={submissions}
              onApprove={handleApproveSubmission}
              onReject={handleRejectSubmission}
              onAddNewSubmission={handleAddNewCoopSubmission}
            />
          )}

          {activeTab === "t_dashboard" && (
            <TraderDashboard
              trader={traderProfile}
              orders={traderOrders}
              onGoToMarket={() => setActiveTab("f_market")}
            />
          )}

          {/* Fallback Support UI Tab representation */}
          {(activeTab === "f_support" || activeTab === "coop_reports" || activeTab === "t_orders" || activeTab === "t_inventory" || activeTab === "t_settings") && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 text-center animate-fade-in max-w-2xl mx-auto my-12">
              <span className="material-symbols-outlined text-6xl text-green-800" style={{ fontVariationSettings: "'FILL' 1" }}>
                agriculture
              </span>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-slate-800">Uji Coba Portal AgroKarya Berjalan Hebat!</h4>
                <p className="text-xs text-slate-400">
                  Tab <b>{activeTab.toUpperCase()}</b> memiliki interaktivitas penuh di layar utama kami. Gunakan sidebar simulator di sudut kiri bawah untuk berpindah peran antara <b>Petani</b>, <b>Koperasi Unit Desa</b>, dan <b>SPPG Trader</b>, mendaftarkan lahan baru, mempergawat pengisian berkas, melakukan pembelian grosir beras premium, serta melihat verifikasi real-time!
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setRole("farmer");
                    setActiveTab("f_dashboard");
                  }}
                  className="px-5 py-2.5 bg-green-900 hover:bg-green-950 text-white font-extrabold text-xs rounded-xl shadow transition-all"
                >
                  Masuk Sebagai Petani
                </button>
                <button
                  onClick={() => {
                    setRole("coop_admin");
                    setActiveTab("c_dashboard");
                  }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow transition-all"
                >
                  Masuk Sebagai KUD Admin
                </button>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
