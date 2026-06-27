## JALUR — Jaringan Langsung Usaha Rakyat

Platform digital yang menghubungkan petani desa langsung ke Satuan Pelayanan Pemenuhan Gizi (SPPG) melalui KDMP sebagai agregator, memotong ketergantungan pada tengkulak.

Akses Demo Aplikasi : http://20.6.33.91:8080/

Figma : https://www.figma.com/design/AsRiEAVkfxSp5DRDi50w4C/Kemenkop-UI-UX?node-id=58-2&t=M6MWGuvPAKT6ZvBx-1


## Latar Belakang Masalah

Petani desa Indonesia secara struktural berada dalam posisi tawar yang lemah. Tanpa fasilitas penyimpanan yang memadai, komoditas hasil panen cepat membusuk sehingga memaksa petani menjual dengan harga murah ke tengkulak daripada merugi lebih besar. Di sisi lain, tidak ada sistem yang menghubungkan petani langsung ke SPPG, sehingga meskipun permintaan dari dapur MBG ada, petani tidak tahu harus menjual ke mana.

**Data konkrit yang menggambarkan kondisi ini:**

- **NTP Hortikultura turun 5,31% (April 2026, BPS)** — Harga jual komoditas seperti cabai, kol, dan bawang merah di tingkat petani anjlok, sementara biaya produksi justru naik. Fenomena *double squeeze* ini menekan margin petani hingga titik terendah.
- **Petani lokal belum benar-benar masuk rantai pasok MBG (Mei 2026)** — Kebutuhan pangan SPPG masih banyak dipasok dari distributor besar, sehingga nilai ekonomi dinikmati rantai distribusi, bukan petani.
- **Biaya logistik Indonesia 14,9% dari PDB** — Tertinggi di Asia Tenggara, membuat distribusi komoditas dari desa ke SPPG tidak ekonomis bagi petani kecil.
- **Kerusakan produk hortikultura mencapai 20–30%** — Akibat minimnya fasilitas cold storage di tingkat desa, memaksa petani menjual cepat dengan harga murah daripada merugi karena busuk.
- **Kopdes Merah Putih belum siap jadi offtaker (Juni 2026)** — Hambatan utama bukan regulasi, melainkan modal kerja: koperasi harus beli panen dari petani, simpan stok, lalu tunggu pembayaran dari SPPG.

Dua kondisi ini saling memperparah:
- Petani tidak punya waktu mencari pembeli yang lebih baik karena komoditasnya tidak bisa disimpan lama
- Petani tidak punya akses informasi untuk menemukan pembeli tersebut

Akibatnya, nilai ekonomi yang seharusnya dinikmati petani desa justru terserap di tengah rantai distribusi.

---

## Solusi

JALUR hadir sebagai platform e-commerce berbasis gotong royong yang menempatkan **KDMP (Koperasi Desa Merah Putih) sebagai agregator dan fasilitator antara petani dan SPPG. Dengan JALUR:

- Petani dapat mendistribusikan hasil tani langsung ke SPPG tanpa melalui tengkulak
- SPPG dapat membeli bahan baku dengan harga lebih wajar langsung dari sumbernya
- KDMP berperan sebagai agregator, penyedia cold storage, logistik, sekaligus koperasi simpan pinjam bagi petani

---

## 💡 Kebaruan & Diferensiasi

**Yang benar-benar baru dari JALUR:**

- **Ekosistem tertutup petani–KDMP–SPPG** — Satu-satunya platform yang menghubungkan ketiga aktor ini secara langsung tanpa perantara tengkulak.
- **Visitasi & quality control terdigitalisasi** — Ada alur approval resmi berbasis kunjungan lapangan, bukan sekadar upload foto sepihak.
- **Fleksibilitas pembayaran ke petani** — Opsi cash langsung atau tempo cicilan 3/6/12 bulan, menjawab masalah desakan likuiditas petani.
- **Koperasi simpan pinjam terintegrasi** — Petani bisa akses modal di platform yang sama tempat dia menjual komoditas.
- **Ledger transparan** — Mencegah praktik koperasi "jadi-jadian" yang berpotensi merugikan petani dan SPPG.

---

## Fitur Utama

### Dashboard KDMP
- Agregator dan fasilitator distribusi hasil tani dari petani ke SPPG
- Manajemen visitasi dan approval kualitas hasil tani
- Manajemen pengiriman (antar ke SPPG atau SPPG ambil sendiri)
- Layanan koperasi simpan pinjam untuk modal kerja petani
- Ledger — pencatatan seluruh riwayat transaksi secara transparan

### Dashboard Petani
- Pendaftaran dan pengisian data hasil tani beserta kualitasnya
- Pengajuan penjualan hasil tani ke KDMP
- Pemilihan metode pembayaran: **cash** (langsung) atau **tempo** (cicilan 3/6/12 bulan)
- Pengajuan pinjaman modal kerja kepada KDMP

### Dashboard SPPG
- Pengecekan ketersediaan bahan baku di portal KDMP
- Pengajuan pemesanan dan pembayaran langsung ke KDMP
- Pemilihan metode pengiriman: diantar oleh KDMP atau diambil sendiri

---

## Alur Kerja
```
Petani mengisi data & kualitas hasil tani
        ↓
KDMP melakukan visitasi & pengecekan lapangan
        ↓
Approval → Hasil tani listing di portal KDMP
Tolak   → Banding atau turun kategori kualitas
        ↓
SPPG melihat ketersediaan & mengajukan pemesanan
        ↓
KDMP approval & proses pengiriman
        ↓
Pembayaran SPPG → KDMP → Petani (cash / tempo)
```

## Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| React | UI Framework |
| TypeScript | Type-safe JavaScript |
| Vite | Build tool & dev server |
| CSS | Styling |

---

## Relevansi

JALUR dikembangkan dalam konteks "Hackathon Digital Cooperatives Expo 2026" yang diselenggarakan oleh Kemenkop RI, sebagai solusi untuk Pilar 1 — Peningkatan Volume Usaha Koperasi, dengan solusi digital untuk mengoptimalkan rantai pasok, pembukuan, dan volume transaksi KDKMP secara real-time.



> "Bukan sekadar e-commerce — JALUR adalah jembatan ekonomi antara desa dan dapur bangsa."
