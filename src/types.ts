/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewType = 'landing' | 'login' | 'petani' | 'manager' | 'pembeli' | 'riwayat';

export interface Land {
  id: string;
  nama: string;
  kapasitas: number; // in Hektar
  varietas: string;
  progress: number; // percentage
  status: 'AKTIF' | 'MAINTENANCE';
  backgroundImage: string;
}

export interface Farmer {
  id: string;
  nama: string;
  idLahan: string;
  komoditas: string;
  status: 'AKTIF' | 'REVIU';
  initials: string;
  bgClass: string;
}

export interface Approval {
  id: string;
  komoditas: string;
  oleh: string;
  harga: string;
  status: 'BARU' | 'DITERIMA' | 'DITOLAK';
}

export interface CatalogItem {
  id: string;
  nama: string;
  lokasi: string;
  harga: number;
  grade?: string;
  tag?: string;
  image: string;
}

export interface Transaction {
  id: string;
  tanggal: string;
  produk: string;
  detail: string;
  entitas: string;
  role: 'KDMP' | 'PETANI' | 'SPPG';
  kuantitas: string;
  totalHarga: number;
  margin: number; // positive or negative percentage
  status: 'Diterima' | 'Tinjauan' | 'Dibatalkan' | 'Diproses' | 'Pengiriman' | 'Selesai';
  image: string;
}

export interface LandReport {
  tanggal: string;
  lahan: string;
  produk: string;
  volume: string;
  status: 'TERDIVERIFIKASI' | 'PENDING';
}

export interface ActivityLog {
  tanggal: string;
  idTransaksi: string;
  entitas: string;
  tipe: string;
  nominal: number;
  status: 'Selesai' | 'Diproses';
}

// Initial Mock Data
export const INITIAL_LANDS: Land[] = [
  {
    id: 'L-001',
    nama: 'Blok Sawah Utara A1',
    kapasitas: 2.5,
    varietas: 'IR64',
    progress: 68,
    status: 'AKTIF',
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb3LVjoVgiLxznikhV3ZkhFceIKbCe7Nm9TYy2nRTCMYCAHqHxkAPRADH-6yqrixr_QIG_ogqpCbpRHKsarfVa0bndCK8DxyiA8ne8Lkg6johDPCLbS63nRUimTv87srHUxXSsvfmBIyhEUdR2LhxMHNARkif4ChotaaAinrq6zJBwHYooZnv7KNDkVt-ExC30Nt6cjY9hGj02Ig4kbAO6YijjX9XxXE00TQKKrtrFNN359mUM64XGYAAYUwEoywu5DDwDAIEQBlY'
  },
  {
    id: 'L-002',
    nama: 'Lahan Lereng Timur',
    kapasitas: 1.2,
    varietas: 'Mentik Wangi',
    progress: 15,
    status: 'MAINTENANCE',
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkIlzkWn076bGoXBJ6-TmiVZG9_ba-lxnsgKVZXUIOWhq-czOi_She3X20vcwZW2A-Fi4JF80UUpR2SQgGAOWjPVn4N8UVsMBaIy-eE_dMq-ivOHvBzbAHAZOYga2oA_b9KBO7m1jwwtc7iPS0KVCtqvGPtgbQ4C1Nq2bF1F_IA56-Bj7FxxvilcXRBSSz6EdhLgm4kulI1DRDAjcaYo7LjMve9jAv6R0HLym5ty46x1iw1yYU8bQRVxoZyvawb5bk-gBc1QLiFWg'
  }
];

export const INITIAL_FARMERS: Farmer[] = [
  { id: 'F-001', nama: 'Ahmad Maulana', idLahan: 'LH-0021', komoditas: 'Padi IR64', status: 'AKTIF', initials: 'AM', bgClass: 'bg-secondary-container text-secondary' },
  { id: 'F-002', nama: 'Siti Indah', idLahan: 'LH-0045', komoditas: 'Jagung Hibrida', status: 'AKTIF', initials: 'SI', bgClass: 'bg-tertiary-fixed text-tertiary' },
  { id: 'F-003', nama: 'Bambang Pam', idLahan: 'LH-0112', komoditas: 'Kedelai', status: 'REVIU', initials: 'BP', bgClass: 'bg-error-container text-error' }
];

export const INITIAL_APPROVALS: Approval[] = [
  { id: 'A-001', komoditas: 'Gabah Kering Giling', oleh: 'Supriadi (Banyuwangi)', harga: 'Rp 6.800/kg', status: 'BARU' },
  { id: 'A-002', komoditas: 'Bawang Merah Super', oleh: 'Hj. Rohayati (Brebes)', harga: 'Rp 24.500/kg', status: 'BARU' }
];

export const INITIAL_CATALOG: CatalogItem[] = [
  {
    id: 'C-001',
    nama: 'Padi Ciherang Premium',
    lokasi: 'Grobogan, Jateng',
    harga: 12500,
    grade: 'Grade A',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9NK5jP6dfAQnwBg2F9qd9uGF12mJ4X5XNd_sIS4UBaugwfw2bomFQj2sYlWTC6Qgm-oja8mAlaocUpVDqAzJQY8n5uy7IK80vEZKPuvrjbWc4BM-SBbEulcxy_zG1VScqa8gp1OMVEKkniUZQO-cDN9Kz3nEckjWPnQDp2ryVX3Z7mKsywxdoXTC7GI0wXO7iFWA9QpvGWIdQtf7BQ7S6dFpHPdsoHI2xdblKyo2XTjBVtCfDnhl81pLqzPSMJzXLFwTwdKXnbNc'
  },
  {
    id: 'C-002',
    nama: 'Cabai Merah Keriting',
    lokasi: 'Malang, Jatim',
    harga: 45000,
    tag: 'Stok Terbatas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtv1Pn7e9174iLGKNfhQp3-HpDeg3WUj3BOtZaqPgG9vzRHgKbmX6akvaGaJfT460y_mz5Zs3vBFxltD0YyTTL75r02wYSQlwC6x6kjexbz0eG0tH_OC0RuUry4XdD8BApMmrGdKvcX6FvLLBGKt12pYn8ry329vIPMVDUCAbDdvvMZgAPgNQY168R54B55ePRbAT2sfXpx2bwFB-nIm382b-YDaQVTCOTP6borLCJV-bOHGi554535L0CWibAw4_1Duz3Vnh22YQ'
  },
  {
    id: 'C-003',
    nama: 'Jagung Pakan Super',
    lokasi: 'Lampung, Sumsel',
    harga: 5200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5EbmX2ri20jVo3aS_HQqP7Whd4Q8kskM3qsdPy-pWw_d5aAV2gnDmJwKoEpnqXYetEHGkEvNLXLd89VfTHPRNRDFW2CGeaVQ6oyczStlsuHahMvBwB8nZ3Ama1jM7MhxTo_YE6oJphSu3GsRHb7AG4_lg_B6pfA1W1DLoTzbY1iMPtSsdqTQ0jfCCfCHnFfvM34KdaJ-dejeL71Z3a86ZajAu_BEdRQLD3fxsqQ2PnyL6OA9SLo-zjKIUZSfRXTukplNj5HBt2k'
  },
  {
    id: 'C-004',
    nama: 'Kentang Granola',
    lokasi: 'Dieng, Jateng',
    harga: 15800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKPq903pSHvMlRfPwwLUE7RMNK9serCM9UjhbEXVKjF6ANp6OVhxx9NCjgP7kQgA_aRCv6DZtkfGUsNynb2U9Jca0_IbowwNZ_hrsakN-JDinz6fkSdpLkoRaq9Nr8F78V2XEBf4-50r3GZSKA6Sz9nbZeVhRY-090jeXBqwbXKDXreSqYIj1IoRTrpE1FZiKjDcWtaEQb4iHgYZFCMRD_iOp6v396dkfKq_MDtprzIyrVqbqVJjyszVd-8-DDQkRH-Cy9e5c4CG8'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-98210',
    tanggal: '12 Okt 2023, 14:20',
    produk: 'Beras Pandan Wangi Super',
    detail: 'Grade A • Kemasan 50kg',
    entitas: 'Koperasi Desa Mandiri',
    role: 'KDMP',
    kuantitas: '15,000 Kg',
    totalHarga: 187500000,
    margin: 4.5,
    status: 'Diterima',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1fIrH7nkXwh46F7uxGxMT72GLQhahVQyGolN3OMI5ejRnE-afgu7YuFrDL4RTbQsstvg7h0Kv25V3jpllCqWv3cEFGAlRWwDaKeWXF-WsL5uhGzIiDVO-mXKmg0QUBzAu8iGXyc7rcnoOABI3GtqR64qiAktC3G8ZJGmosnjfPrvxkFBOlntkJ2bdhmLpMCap-_cUQI54CrbUPs9WB8LUfJTrCFp7Kjlo8heJcfJV9_he0Dy23bgDye5F0qWBiL19OUq1MAyGPPQ'
  },
  {
    id: 'TRX-98209',
    tanggal: '12 Okt 2023, 11:05',
    produk: 'Jagung Pipil Kering',
    detail: 'Pakan Ternak • Kadar Air 12%',
    entitas: 'Sutaryo (Petani)',
    role: 'PETANI',
    kuantitas: '2,450 Kg',
    totalHarga: 12250000,
    margin: 0.0,
    status: 'Tinjauan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRMcxQvLpKXC-PV0ZwXpMH16XVVRnMWn5wbkModTojJ-QoeJ9ecriDwLkwOU51wzq0nyP657eIV6OjtIXpNWi3qV8i4MGwd_Bs4QGnOOwIADe4Vsvta7UJJNo0jc8ntQ-uoASdCCLmxjyYZ4kbl67OfiXebOhWxDR7vYKegR5j051LBcD-rVYcU6tcUaIZBkIHriAizhVbA3BbyfcyyVFP2yt6dpVb3mu6xey9XJcrJOv7Fqo32bR5IX4q9-8MfIFTzwVPq-xxtpY'
  },
  {
    id: 'TRX-98208',
    tanggal: '11 Okt 2023, 16:50',
    produk: 'Kacang Hijau Ekspor',
    detail: 'Standar SNI • Curah',
    entitas: 'Sentra Pengolah SPPG-01',
    role: 'SPPG',
    kuantitas: '5,000 Kg',
    totalHarga: 85000000,
    margin: 2.1,
    status: 'Diterima',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC22HwcHanU49woTrOYKTouzbY5vvuyRLzuWbYCDMylzp_Vh5u4n3AOVirfYdS62r2SpQBn8Ke14tf5ULpXfS9ILtKDJWm5ktMPr_dclS0sS6h498eSrpkjXR7JlnXdfniXiLXEvTDNPuM-_J2ZZS1DKdZZNejVpXJwYonB0acOi-Xtj4JxK_mAl8iONuZWsJVsQYJkusNNw15dbOWWQZCJoS1g9qoIJKChWR0ynszyZ-GYKZy2F7y1yuPOz63T-TDMXSjX85EWa6o'
  },
  {
    id: 'TRX-98207',
    tanggal: '11 Okt 2023, 09:30',
    produk: 'Pupuk Organik Cair',
    detail: 'Distribusi Subsidi • Botol 1L',
    entitas: 'Koperasi Tani Jaya',
    role: 'KDMP',
    kuantitas: '500 Units',
    totalHarga: 37500000,
    margin: -1.2,
    status: 'Dibatalkan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpnTpD3Hy5-bnpSzsCVvi9nifPrHoXxDoShNLHkbxkzrW0QsDmNJ9hmIRs-gWEiLe7gT9iCcaXb9SmEf2NjVr7tqSJQAlCIXx8lzCxfxb-kRHafovAP2fIWRSNd-0qf5_O_jPT93Y4_tOe-otLWu-dgH_hMxDrymWmwBVbmRfyWg0oU9KGlhLxOXvCzQK5MqeA53_TjtokIJQYQwDgYcLDOTuwWXJdVPpilulc5hrExRklDB130iWB6DdFggJSgSYXzxzMFbyc744'
  }
];

export const INITIAL_LAND_REPORTS: LandReport[] = [
  { tanggal: '12 Okt 2023', lahan: 'Blok Sawah Utara A1', produk: 'Padi IR64', volume: '450 Kg', status: 'TERDIVERIFIKASI' },
  { tanggal: '08 Okt 2023', lahan: 'Lahan Lereng Timur', produk: 'Mentik Wangi', volume: '120 Kg', status: 'PENDING' },
  { tanggal: '05 Okt 2023', lahan: 'Blok Sawah Utara A1', produk: 'Padi IR64', volume: '890 Kg', status: 'TERDIVERIFIKASI' }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  { tanggal: '12 Okt 2023, 14:20', idTransaksi: 'TX-882190', entitas: 'Koperasi Unit Desa Makmur', tipe: 'Pencairan Dana', nominal: 125000000, status: 'Selesai' },
  { tanggal: '12 Okt 2023, 11:05', idTransaksi: 'TX-882188', entitas: 'Bpk. Slamet Sugiono', tipe: 'Penjualan Gabah', nominal: 12450000, status: 'Selesai' },
  { tanggal: '11 Okt 2023, 16:45', idTransaksi: 'TX-882185', entitas: 'CV. Pangan Sejahtera', tipe: 'Distribusi Pupuk', nominal: 45000000, status: 'Diproses' }
];
