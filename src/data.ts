import { CropSubmission, MarketProduct, SubmissionStatus, Trader, TraderOrder } from "./types";

export const IMAGES = {
  farmerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7sX1TjKfAn-qt7sNWAABRUHx3MKDZeUUBczIuN9P0tJxlgxyRYCZIT_TFeePSfLsOq8ij-hOXJc9XnCy8svYnb6MrXNQ-0qaQITWSuOeo7fwln_0CaesHTgl4jtDV2p9WQSQvz7uhZx3cNkq3wp56iUZk_RKvkbTgFolFX4MGCATUhgWqn1aWzq3z0Rl3fDCqklkZaEnAbA_Sca22kkFnPUJqK1dIuLLBRAyG-YEDRRTpOOzdSbJIsVKSbi6-0P3QH4Bk7YVmbQhx",
  heroBackground: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqjRxWALKUEQ2HmbwtcmVNXy5AkWp3yKMCgzXcde4tlcIY4Hmuh96LOiHRPPV5YJF5RZXICMEt85bW-e3xbr6KIxjsLSjECJmjbJJuBVtAqrw19-8HKFXmxMNN2G9kFZUZvox85CFXsyTHLn93RTFhGTNKw4aw6TmZv1rWOs0iBdE28MuhnD4V78am3aZBHJks2buNcgY2hPAF4tpUnRpcFEQKqM2qkcU6m98pS_lKbqdbDbHD2dJCTFhCrPuNeaP_jjTagZk9qtAy",
  productRicebowl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3zFdZZBnaEqHdFd-euvkQV-KNugCGVUfERQjTYzedcOU1MlJK4Z2kqk6S_RxHqqPEKNmIhw2bKKPx7CxfA939YwE1TG6j96TGfQz8OHvYKGIK8KkYB0VtWtfHg2_nxRHd8VgjSenElMgo9XXCDYJ6UrxdaaxlGi0HmHNa8rVpOQqwXkkQjwvr-3jibYN0QdrspJbyGxpzQosJfU8BKe8yo1RPk2z8lgeBeRWP9949DH4Xi-oeHo-a9T8Arjwe7RXwP7TK5h5-RavR",
  productChilies: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsW0ZbULKk-35COH2QuNHtoqJk6Nu0l3y-kP3dRZCmZoGxKTbGO_zvBWCgwZFDaoCZotsuvDN-n_29OJTFZh7mlvpEr8_EQ5x6vKqRdcw4vTaud14ZMKO9NpO6osq5tN2fpukn9X6JyQVcEob0FwfwdtEvz40l9W2uY9glWEo0l388c2dVZecbMKDQ6OHCsOuPyWaLg0xxK-rtpFzMikWT8l3Y7MRDhyqY4C5_SCwk-yGpQSQU_A0zf5xqZAjWc7Q06-1Ei8U3ecOF",
  productCornField: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl9clPKRtVP3zk1Yqy99-T-VTIL-4grLO-JnTlTc86IOJTZJdsVVnUCq7zpWW2VfDutu7t0-vWgv6IBzaiR4HvPff2SlhTGBwWCUknJBfSS5ds6B9pm2R_nl1A_SDWklN4yAJXs_c3O9dKacwr_mjAYbqFmxNInjZ9wnyNfAxY9-gv3VH2Ij6IJkqu9vKxY-bK36xxrBOR-BR0W4wMRH24TAS6Lydn5QaVhdmM1olju0-x5exMoFZceeedB6OML_sn_nIw6mbqGzFP",
  traderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3iF6YgpzcZycJSgVF3E0Ti34kpEvyLw6ZVwulCJUQTXj8tg3BKLsVDO5wytE0qnsumMlEUPt9dLHcgUv_8IdEF2000yaRcmMFbFcxNGPihboP9qy_z9CJo06it1mh6CWWxPxFxOzPMLrP-vlbQXu_TryI4N5Z1V7bAdufTE_jvztz2XHmDdLff9QeEotX9dcyKPyil6Lw0RXghKtawijzrrgJxgqD_EdO4--MRM4Pa6updt3RnjPvGm9M-XJMHE2KkCvfFiMA-QfW",
  sppgBadge: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE2r719jrFM0dB6jxLKpkwzGbfX8ja88zfF18QF9uHWjGmd2YkF4POGE_H-ofmFiJetiI4zoGtxojvo2h3j1YLweU5vkkro1ar7q6east4IFDLGsZ8zR4aoPo3Q0n-435R_hscKC-xF3r0KM3BcMD0pOMRmPrLZZTvZLK6te7NNYq1yDg8MmHxdQuZ3AWFVfP2IWby3RRCMHFGfuVVk2j9AMZBFwY5mNB25xNYwcWC6t9Gku529k62BZYKHzA95UEJaiDx8AKMapX9",
  terrainMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuB77XJdUpZzptsUiYM3j1L9PM1o6qpPm2IGkQcxOFmU1IWhDkfo4OZ1NZg31FPbUOcg2Fd-Fd24zI-a4aTC2oG-IweCW5-0hVwCK6ObTN_HMqdv7Lf5-e-2Pj7vMVFhye6RlhM4VvK_5XbuaTgGMXPn_smi7Ap1ytXU__BNjAtzUhRnaoD9UtNtHHKbUAwhVRIzbn-ciGt803mDdbEfQvaNvjFJ4Tn14ndasF5Z1pJ8ZeVOmRcAnEPAG5AMIlrX6jLTKYFi5swE5rn4",
  pandanWangiSteam: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQYtvFgygMd1kCb3fQzavPMk0Tmckj7WkEJWvXjW3M5SvoiFAz3PU3VrSsM3dEjKXmSjcWlg0w_A1_J6SlLlaA8tEtU1OhFb0HXSy79s0RF14L37kZ4P0VewxLxhjRsLeCsa7oOQcLOLm-6rMr2WwB-4CCA7qZpIQdIJkgDkDJ2qsajd8EXVQ4lmY0uy2OPmKJYwvQCZlynPSnTxOhJRiHHjKzwUWkGW6CfLJcJMALRSIq3oHapNHakKCZN9YKbBg5oSe7iRXh4FQ8",
  pandanWangiHands: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL5ZSkZWEcx7r6ug_K9euEM0LOC0b-UQawFz0VZwA-HoCiuVdxfDmtLhgoH14NqGTVl1PPEBBQTkFjNOMnwim5yof2tagsLFgy_bJZUFaKtba3aJoRZRrrFAEjjQC56G8JFiJvpE-nklnXVK0AXSFZLsZvx48Fmy4a_75zbOU1FPjGlqQSnmY_vupjfd1d873FubCEKsNwB4H6XayLpt6IDK6UGym3pNPBRSD1wdkGyrOzMvjTcPbq2kRw5BDu-sPgIa2asc2x6jP-",
  pandanWangiHill: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPlZXvO6NRIxQTbwKXt3OdzVyi-Rm2zhaUq_DIY_EzlLvrFZNWcn1izCpwVpdCon3uf7uYasK0Ve9SpIbwg_GsnJRT59Mz-JE1HdKoAl4HbQZlMKFyCn8Nsotox5p662DbzQUuPqxiIXyCFjpuyQoTtPxQc4bJmSOe90yn1Mzgc6qXApfGg_STmWIse1GGC451460R0xQNmxmgUy1UA_XXGbqHr5otd-g8BqAEzbec_3UwJZMtmXpFmZVcKxSHUppwyENJ7Ar5WC2m",
  pandanWangiBag: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7ET04XDMb12Ktfkx71raRR1FxvYPFyAaf2N9nIeiycCx5nXI4amxUxHm-VVQRUU8ud3cHqH8DGc4ouSg2grpMm_hT9b-sy2UULubJvpass3TIdNrngKjumsc5m1cR6UZSXkEalxwsZYEnyonvtUsJaYiNhjF0tP5HSMgHRsBrYhjKLWYHblDsF_5lUHr98bu9w7KBRtDSA6u3Bl_XMLL4Rx8m2kWTLXLNEf81n9Ey0KPd5Da3cX5S0SxE6mafk_JGfyor3Aw2dEFN",
  coopAdminAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC554_pYyl7AQD5Tocjixan5TdLSXtzr79JPF--Y1iC-1nRdsYR2P_EOTDeSglrJjIS0RAvw59KR41NVVom2WmfpKVp5OZYZR1Clw7Q6Bpu6aY_JILNuqk8r6ql3LNDT84nGmbLZrGnkYAChQfyyRzNdkR1ykjbcpYdc1KgVC9zUbBYVt0J-eMtk7uiFB6ZTvi8AglqHDVJdkAYY7VOIENSPf6b6qf80ALnP5vXbhPh3AdyaBjzZ2kGAMCOp3dkTK6kyvcC4DRuRRBK",
  traderGoldAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBanJnekUVsqcNuHO5XiBnwyDWRFwnZzrAeSE2ZUm5vLnteMhcyo-SiYGPw_z9Dwgay2R0NiRKz4bCW841HM-PLTMUXuT5Y5UZu1kxfOMJjgoxVku5DS-EDdHciUT6D_Z7VnGsZN22ptChj5kxMGKmzngT9_Pxkq6O9epGJN9ntLGmUN_Q2jzIWxjZNlaSN6oyMbVECjMkYJp6e_ThfC7qqn8kzXTQPrO8eD9Lmz0VT7z5B34ESchcZG0LJzyk0Uli70jtkoEPteOX0",
  macroStalks: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuf9xMG8vyeTdkBoPRt0h88CEm2k3FJf9LqeYRNwvpNoGTzcLq2A8uXGz6lihAnZJrotAXXVCUGeXAxAsyumr9K8-ApA7QZmS9tJQ__ED7cgnPTd5Jz-cN4NaAtZYwTYl3ZSZ_IVfA15xhlObWfQLpKoEySSQIcCeQhuY3I3Bmf4peQDMnx6OgO_wIZ1jQTVLZcASgn617I4iW0hLX7sPBAAbN3F-nlogCuiQYSEoAa1bp0hFpLJuinUmCX013ERs-4wb0n_tx73qd",
  cornPouring: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZn0AGa4MidK0VxATVUNmfxMr3HEfAefD-r4f6UaWvrj6qYuRttrc1P69SkRts4alIcl0K_gwA8TAXjjPrGztlunCOvgl2byBRH2bSXHPvTS2NyCmPZA7N1auTMQyM_DARBzM75evMlr7JfpINf4BVoXrIC6yDefFgrystV2niL6X4yahwsQpl1StNTlPUzdi7d_A02FPIXbhwWjuS7Eyrt2JT3SSV5qfxlqviZ20OKoVxJsZHVZC23krhPzPA-SggXcLvJ2eQy3Zd",
  locationStaticMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD2xbJz2sF0An7iHOquI5aj6D7BSZn1tob6mAsGn4vE_YprE6hGKLeOiO2EJdPB49NV0pFMunKt0qdzINyFZVdLcB0T8UHTwToZZC13u2YTejQWgV6IMkzJ94Ss0N1FffTnIp-fj1jsbGDgTXtdct7bLgmRBy_xUVpsbxq1Am7fYuYwCWrcDIusEqaceRYEsIMmlGLLQ6uvhnoJsozhDhmjp9mILzT63f00ed9MXNhQ8ZYpl9rt-c9J8P1tD9nHBBTBIrpD_XBH2jM"
};

// Initial Farmer crop submissions
export const initialSubmissions: CropSubmission[] = [
  {
    id: "#P-22910",
    farmerId: "KDMP-0012",
    farmerName: "Petani Sejahtera",
    commodity: "Padi Ciherang",
    type: "Padi",
    volume: 1200,
    landArea: "1.5 Hektar",
    date: "12 Okt 2023",
    status: SubmissionStatus.Diterima
  },
  {
    id: "#P-22914",
    farmerId: "KDMP-0012",
    farmerName: "Petani Sejahtera",
    commodity: "Jagung Hibrida",
    type: "Jagung",
    volume: 850,
    landArea: "0.8 Hektar",
    date: "14 Okt 2023",
    status: SubmissionStatus.Menunggu
  },
  {
    id: "#P-22921",
    farmerId: "KDMP-0012",
    farmerName: "Petani Sejahtera",
    commodity: "Padi Inpari 32",
    type: "Padi",
    volume: 1500,
    landArea: "2.2 Hektar",
    date: "16 Okt 2023",
    status: SubmissionStatus.Draft
  },
  {
    id: "#P-22899",
    farmerId: "KDMP-0012",
    farmerName: "Petani Sejahtera",
    commodity: "Kedelai Hitam",
    type: "Kedelai",
    volume: 400,
    landArea: "0.5 Hektar",
    date: "08 Okt 2023",
    status: SubmissionStatus.Ditolak
  }
];

// Initial Cooperative Submissions
export const initialCoopSubmissions: CropSubmission[] = [
  {
    id: "#P-22910",
    farmerId: "KDMP-0012",
    farmerName: "Agus Salim",
    commodity: "Padi Ciherang",
    type: "Padi",
    volume: 1200,
    landArea: "1.5 Hektar",
    date: "12 Okt 2023",
    status: SubmissionStatus.Diterima
  },
  {
    id: "#P-22914",
    farmerId: "KDMP-0014",
    farmerName: "Siti Lailatul",
    commodity: "Jagung Hibrida",
    type: "Jagung",
    volume: 850,
    landArea: "0.8 Hektar",
    date: "11 Okt 2023",
    status: SubmissionStatus.Menunggu
  },
  {
    id: "#P-22915",
    farmerId: "KDMP-0015",
    farmerName: "Wayan Nuratna",
    commodity: "Kedelai Hitam",
    type: "Kedelai",
    volume: 2200,
    landArea: "2.2 Hektar",
    date: "10 Okt 2023",
    status: SubmissionStatus.Diterima
  }
];

// Seeded Market Products
export const initialProducts: MarketProduct[] = [
  {
    id: "prod-1",
    name: "Beras Pandan Wangi Premium - 5kg",
    category: "Beras",
    origin: "Cianjur",
    price: 88500,
    unit: "sak",
    image: IMAGES.pandanWangiSteam,
    available: true,
    stock: 850,
    farmerName: "Pak Haji Mulyono",
    cooperative: "KUD Mitra Mandiri",
    harvestDate: "15 Oktober 2023",
    method: "Semi-Organik",
    elevation: "600 - 800 MDPL",
    coordinates: { lat: -7.2504, lng: 112.7688 },
    desc: "Beras Pandan Wangi asli dari lahan vulkanik Cianjur. Beras ini memiliki karakteristik butiran yang cenderung bulat, berwarna bening sedikit kekuningan, dan mengeluarkan aroma khas pandan yang alami tanpa bahan pewangi tambahan. Keunggulan beras kami adalah proses penggilingan yang dilakukan sesaat sebelum pengiriman (Freshly Milled) untuk menjaga kualitas nutrisi dan aroma. Cocok untuk hidangan istimewa keluarga maupun konsumsi harian yang sehat."
  },
  {
    id: "prod-2",
    name: "Beras Pandan Wangi Super",
    category: "Beras",
    origin: "Cianjur",
    price: 18500,
    unit: "kg",
    image: IMAGES.productRicebowl,
    available: true,
    stock: 5000,
    farmerName: "Pak Haji Mulyono",
    cooperative: "KUD Mitra Mandiri",
    harvestDate: "20 Oktober 2023",
    method: "Semi-Organik",
    elevation: "600 - 800 MDPL",
    coordinates: { lat: -7.2504, lng: 112.7688 },
    desc: "Butiran padi pilihan dari Cianjur yang telah dipoles dengan standar kedaulatan pangan modern, bebas pemutih dan wangi pandan alami."
  },
  {
    id: "prod-3",
    name: "Cabai Merah Keriting",
    category: "Sayur",
    origin: "Sukabumi",
    price: 42000,
    unit: "kg",
    image: IMAGES.productChilies,
    available: true,
    stock: 1200,
    farmerName: "Siti Lailatul",
    cooperative: "KUD Sukabumi Jaya",
    harvestDate: "12 Oktober 2023",
    method: "Organik Teguh",
    elevation: "800 - 900 MDPL",
    coordinates: { lat: -6.9181, lng: 106.9266 },
    desc: "Cabai merah segar pilihan langsung dikumpulkan dari kelompok tani pegunungan Sukabumi. Tingkat kepedasan stabil dan higienis."
  },
  {
    id: "prod-4",
    name: "Jagung Pipil Kering",
    category: "Biji-bijian",
    origin: "Kediri",
    price: 8500,
    unit: "kg",
    image: IMAGES.productCornField,
    available: true,
    stock: 15000,
    farmerName: "Wayan Nuratna",
    cooperative: "KUD Kediri Makmur",
    harvestDate: "18 Oktober 2023",
    method: "Konvensional Modern",
    elevation: "150 - 300 MDPL",
    coordinates: { lat: -7.8164, lng: 112.0119 },
    desc: "Jagung pipilan kering kadar air 14% pakan ternak berkualitas tinggi atau bahan baku industri, dipanen melimpah di Jawa Tengah."
  }
];

// Initial SPPG Trader profile data
export const defaultTrader: Trader = {
  name: "Budi Darmawan",
  tier: "Gold Tier",
  trustScore: 98,
  totalVolume: 420, // in tons
  totalSpending: 4250000000, // Rp 4.25M
  activeContracts: 14
};

// Seeded SPPG Trader transactions
export const initialOrders: TraderOrder[] = [
  {
    id: "#ORD-9421",
    commodity: "Pandan Wangi Rice",
    grade: "Premium Grade A",
    quantity: 5000,
    origin: "East Java",
    amount: 62500000,
    status: "Completed",
    date: "24 Okt, 2023",
    image: IMAGES.productRicebowl
  },
  {
    id: "#ORD-9418",
    commodity: "Gayo Arabica",
    grade: "Specialty Roast",
    quantity: 250,
    origin: "Central Java",
    amount: 45000000,
    status: "Processing",
    date: "22 Okt, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJxWQSBCOhHlgEj1_GlZeezjclJj-elQ48dDjGRoCQbH1Gj74eLMJx8pRQZ1axqfRdawJnObjtOhqGsEi0MUOfq2_01UodNhLzA3EXvrsYQHK1yYfPYgX5XJTn7skkdMEnZCXiZtOv-TykFi4uPWdb9EDRUjVfzshL8O5IZaGFICwISNYCDN7T8a9egrD968mLduN6HN6B8Jlsp__nKHroHZeMzcRXnsQCyUBQtpCyNFXto2BbgT4Cjnvnk0W3lHwxJZcyEJomaifX"
  },
  {
    id: "#ORD-9405",
    commodity: "Yellow Maize",
    grade: "Animal Feed Grade",
    quantity: 12000,
    origin: "East Java",
    amount: 50400000,
    status: "Completed",
    date: "18 Okt, 2023",
    image: IMAGES.productCornField
  },
  {
    id: "#ORD-9399",
    commodity: "Refined Sugar",
    grade: "Industrial Grade",
    quantity: 2000,
    origin: "West Java",
    amount: 29000000,
    status: "Cancelled",
    date: "15 Okt, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj4_6_gxzpV4Lfau4Yf6MGXAf_G4qEJ9N7DD-pd6r3JgwTsy4cEcGn0Aaz4Ja1xeDnZ4mHtWtC3sMMX33iof1w3GYJCsiIZqShUrNyIUFJK1kXWot480v3vtgZPdNwyadV-riP9wpIq7ESoC-wC4tO2-6coFso0wkkUJXqbFDIt4tt1ERtikrKBGZh3UQKp3R9SxzTzfe6W66h-W4qvamuITgduKF7aeLOnZ0mzHP-CgOitpmWF81UBNqmZirXlhAYl0rEg0unNEgU"
  }
];
