## JALUR — Jaringan Langsung Usaha Rakyat

Platform digital yang menghubungkan petani desa langsung ke Satuan Pelayanan Pemenuhan Gizi (SPPG) melalui KDMP sebagai agregator, memotong ketergantungan pada tengkulak.

Akses Demo Aplikasi : http://20.6.33.91:8080/

Figma : https://www.figma.com/design/AsRiEAVkfxSp5DRDi50w4C/Kemenkop-UI-UX?node-id=58-2&t=M6MWGuvPAKT6ZvBx-1


## Latar Belakang Masalah

Petani desa Indonesia secara struktural berada dalam posisi tawar yang lemah. Tanpa fasilitas penyimpanan yang memadai, komoditas hasil panen cepat membusuk sehingga memaksa petani menjual dengan harga murah ke tengkulak daripada merugi lebih besar. Di sisi lain, tidak ada sistem yang menghubungkan petani langsung ke SPPG, sehingga meskipun permintaan dari dapur MBG ada, petani tidak tahu harus menjual ke mana.

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

---


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
