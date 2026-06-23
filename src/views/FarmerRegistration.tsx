import React, { useState } from "react";
import { IMAGES } from "../data";

interface FarmerRegistrationProps {
  onSuccess: (newSub: { commodity: string; type: string; volume: number; landArea: string }) => void;
  onCancel: () => void;
}

export const FarmerRegistration: React.FC<FarmerRegistrationProps> = ({
  onSuccess,
  onCancel
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Form Step 1: Personal Info
  const [fullname, setFullname] = useState("Pak Haji Mulyono");
  const [nik, setNik] = useState("321102948270003");
  const [phone, setPhone] = useState("0812-3456-7890");
  const [village, setVillage] = useState("Dusun Cigombong, Cianjur");
  const [cooperative, setCooperative] = useState("KUD Mitra Mandiri");

  // Form Step 2: Crop/GIS info
  const [cropType, setCropType] = useState("Padi Pandan Wangi");
  const [landAreaAmount, setLandAreaAmount] = useState<number>(1.8);
  const [pins, setPins] = useState<{ x: number; y: number; lat: number; lng: number }[]>([
    { x: 35, y: 40, lat: -7.2504, lng: 112.7688 },
    { x: 60, y: 45, lat: -7.2512, lng: 112.7695 }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle GIS map plot click
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Simulate GPS conversion based on standard West Java bounds
    const baseLat = -7.2500;
    const baseLng = 112.7680;
    const lat = baseLat - y * 0.0001;
    const lng = baseLng + x * 0.0001;

    if (pins.length >= 6) {
      setPins([ { x, y, lat, lng } ]); // reset or cycle
    } else {
      setPins([...pins, { x, y, lat, lng }]);
    }
  };

  // Drag and Drop simulation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const names = Array.from(e.dataTransfer.files).map((f: File) => f.name);
      setUploadedFiles([...uploadedFiles, ...names]);
    }
  };

  const triggerFileSelect = () => {
    const mockFileNames = ["Sertifikat_Lahan_Cigombong_04.pdf", "KTP_Mulyono.jpg", "Rekomendasi_PPL.pdf"];
    const randomFile = mockFileNames[Math.floor(Math.random() * mockFileNames.length)];
    if (!uploadedFiles.includes(randomFile)) {
      setUploadedFiles([...uploadedFiles, randomFile]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Finish and trigger callback to add to submissions
    onSuccess({
      commodity: cropType,
      type: "Padi",
      volume: Math.round(landAreaAmount * 2200), // conversion
      landArea: `${landAreaAmount} Hektar`
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Stepper Status Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-900 border border-green-100 font-extrabold text-lg">
            {step === 1 ? "1" : "2"}
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800">
              {step === 1 ? "Langkah 1: Profil & Informasi Pribadi" : "Langkah 2: Pemetaan Spasial GIS & Komoditas"}
            </h3>
            <p className="text-xs text-slate-400 font-medium">Lengkapi rekam data petani plasma AgroKarya terpadu.</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`w-8 h-2.5 rounded-full ${step >= 1 ? "bg-green-900" : "bg-slate-200"}`}></span>
          <span className={`w-8 h-2.5 rounded-full ${step >= 2 ? "bg-green-900" : "bg-slate-200"}`}></span>
        </div>
      </div>

      {step === 1 ? (
        /* ================= STEP 1 FORM ================= */
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="text-lg font-bold text-slate-800">Biodata Penggarap Lahan</h4>
            <p className="text-xs text-slate-400">Pastikan NIK dan data koperasi sesuai dengan keanggotaan aktif KUD Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nama Lengkap Petani</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nomor Induk Kependudukan (NIK)</label>
              <input
                type="text"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">No Handphone (WhatsApp Aktif)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Koperasi Unit Desa (KUD)</label>
              <select
                value={cooperative}
                onChange={(e) => setCooperative(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
              >
                <option value="KUD Mitra Mandiri">KUD Mitra Mandiri (Cianjur)</option>
                <option value="KUD Sukabumi Jaya">KUD Sukabumi Jaya</option>
                <option value="KUD Kediri Makmur">KUD Kediri Makmur</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Alamat / Domisili Lahan Tani</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-slate-100 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
            >
              Batal
            </button>
            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 bg-green-900 hover:bg-green-950 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Lanjutkan Langkah 2
            </button>
          </div>
        </div>
      ) : (
        /* ================= STEP 2 FORM ================= */
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-bold text-slate-800 font-sans">Pemetaan Area Lahan Basah Syariah</h4>
              <p className="text-xs text-slate-400">Klik titik batas perimeter pada peta GIS di bawah untuk mengunci poligon tanah.</p>
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border border-emerald-100">
              GPS Satellite Active
            </span>
          </div>

          {/* GIS Interactive map plotter frame */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Interactive GIS Map Canvas ({pins.length} Batas Terdaftar)</span>
              <button 
                type="button"
                onClick={() => setPins([])} 
                className="text-red-600 font-extrabold hover:underline"
              >
                Clear Pins
              </button>
            </div>

            <div 
              onClick={handleMapClick}
              className="relative rounded-3xl overflow-hidden h-72 w-full shadow-inner border border-slate-200 cursor-crosshair bg-cover bg-center select-none"
              style={{ backgroundImage: `url(${IMAGES.terrainMap})` }}
            >
              {/* Dynamic SVG polyline overlay drawing polygons if we have pins */}
              {pins.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <polygon
                    points={pins.map(p => `${p.x * 4.5},${p.y * 2.8}`).join(" ")} // scale approximations dynamically
                    className="fill-emerald-400/40 stroke-dashed stroke-emerald-600 stroke-2"
                    style={{ strokeDasharray: "4 4" }}
                  />
                </svg>
              )}

              {/* Static overlay HUD coordinates */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-[10px] text-white space-y-1 z-10 pointer-events-none font-mono">
                <p className="font-extrabold text-emerald-400">BOUND HUD v1.4</p>
                <p>Lat Range: [-7.2504 ... -7.2612]</p>
                <p>Lng Range: [112.7688 ... 112.7795]</p>
                <p className="text-slate-300">Total Bound Area: {landAreaAmount * 10000} m²</p>
              </div>

              {/* Pins markers list */}
              {pins.map((pin, i) => (
                <div
                  key={i}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group pointer-events-none"
                >
                  <span className="material-symbols-outlined text-green-900 drop-shadow-md text-2xl animate-bounce">
                    location_on
                  </span>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[9px] font-mono px-2 py-0.5 rounded shadow-xl whitespace-nowrap opacity-100 transition-opacity">
                    Pt {i+1}: {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 right-4 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold">
                Ketuk peta untuk mendesain batas tanah Anda
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Commodity Select and input */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Varietas Komoditas Utama</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                >
                  <option value="Beras Pandan Wangi Premium - 5kg">Beras Pandan Wangi Premium</option>
                  <option value="Cabai Merah Keriting">Cabai Merah Keriting Fresh</option>
                  <option value="Jagung Pipil Kering">Jagung Pipil Giling</option>
                  <option value="Padi Rojolele Super">Padi Rojolele Super</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Luas Lahan Terukur (Hektar / HA)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={landAreaAmount}
                  onChange={(e) => setLandAreaAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Drag & drop mock layout zone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Unggah Sertifikat Lahan / Surat Pernyataan</label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center h-44 ${
                  isDragging
                    ? "border-green-800 bg-green-50/70"
                    : "border-slate-200 hover:border-green-800 hover:bg-slate-50"
                }`}
              >
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
                  cloud_upload
                </span>
                <p className="text-xs font-bold text-slate-700">Tarik berkas Anda ke sini atau ketuk untuk memilih</p>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Format yang didukung: PDF, JPG, PNG (Maks 10MB)</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-1.5 max-h-24 overflow-y-auto">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Berkas Terunggah ({uploadedFiles.length})</p>
                  {uploadedFiles.map((fn, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-green-900 bg-white p-1.5 px-3 rounded-xl border border-slate-200">
                      <span className="truncate font-medium">{fn}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx));
                        }} 
                        className="text-red-500 hover:text-red-700 font-bold ml-2 text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 border-t border-slate-100 justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
            >
              Kembali
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-extrabold text-xs rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-900 hover:bg-green-950 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Simpan Registrasi Lahan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
