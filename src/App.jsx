import React, { useState, useMemo, useEffect } from 'react';
import {
  ShoppingCart, Trash2, CreditCard, ChevronRight,
  CheckCircle, Plus, Minus, ScanBarcode, Store, Search,
  Tag, Clock, Receipt, Printer, ArrowLeft
} from 'lucide-react';
import qrisImage from './assets/qris.png';

// ── DATA KATALOG MEGA SUPERMARKET (18 Kategori) ──
const PRODUCTS = [
  // 🍚 1. Beras, Mie, Pasta & Bahan Pokok
  { id: 1001, name: 'Beras Premium 5kg', price: 72000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80' },
  { id: 1002, name: 'Beras Medium 5kg', price: 58000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1723475158232-819e29803f4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 1003, name: 'Beras Merah 1kg', price: 23000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1646980720696-5520b992c129?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlcmFzJTIwa2V0YW4lMjBtZXJhaHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 1004, name: 'Beras Ketan Putih 500g', price: 15000, category: 'Pokok', image: 'https://plus.unsplash.com/premium_photo-1674654419403-1a80edb26881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJlcmFzJTIwa2V0YW4lMjBwdXRpaHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 1005, name: 'Mie Instan Goreng', price: 3000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=400&q=80' },
  { id: 1006, name: 'Mie Instan Kuah', price: 3000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1605311525808-ea0daef137b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWllJTIwa3VhaHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 1007, name: 'Mie Korea Pedas', price: 12500, category: 'Pokok', image: 'https://media.istockphoto.com/id/1438896490/id/foto/mie-dingin-pedas-korea-bibim-guksu-closeup-di-mangkuk-tampilan-atas-horizontal.webp?a=1&b=1&s=612x612&w=0&k=20&c=wyCwR6PNNGxd5l0JWE7p3bzu_leFf_tg00YQvXNICzU=' },
  { id: 1008, name: 'Mie Telur Kering 200g', price: 8500, category: 'Pokok', image: 'https://media.istockphoto.com/id/1214757157/id/foto/sup-ramen-jepang-tradisional-dengan-jamur-bok-choy-sayuran-hijau-dalam-dua-mangkuk-hitam-di.webp?a=1&b=1&s=612x612&w=0&k=20&c=_92ZCf-7yT7ChwkDn7VANXMFxWIb8X4kMmF1fR1vGCk=' },
  { id: 1010, name: 'Kwetiau Kering 250g', price: 10000, category: 'Pokok', image: 'data:image/jpeg;base64,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' },
  { id: 1011, name: 'Pasta Spaghetti 450g', price: 18500, category: 'Pokok', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80' },
  { id: 1012, name: 'Macaroni 400g', price: 16000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80' },
  { id: 1013, name: 'Tepung Terigu Serbaguna 1kg', price: 13500, category: 'Pokok', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80' },
  { id: 1014, name: 'Tepung Beras 500g', price: 9000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80' },
  { id: 1015, name: 'Tepung Tapioka 500g', price: 8500, category: 'Pokok', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80' },
  { id: 1016, name: 'Tepung Bumbu Serbaguna 250g', price: 11000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80' },
  { id: 1017, name: 'Tepung Sagu 500g', price: 10500, category: 'Pokok', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80' },
  { id: 1018, name: 'Gula Pasir 1kg', price: 16000, category: 'Pokok', image: 'https://plus.unsplash.com/premium_photo-1726072362679-2b2023862024?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VnYXJ8ZW58MHx8MHx8fDA%3D' },
  { id: 1019, name: 'Gula Merah 500g', price: 14000, category: 'Pokok', image: 'https://images.unsplash.com/photo-1551849326-3164898e3b32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3VsYSUyMG1lcmFofGVufDB8fDB8fHww' },
  { id: 1020, name: 'Garam Beryodium 500g', price: 4500, category: 'Pokok', image: 'https://media.istockphoto.com/id/2194922482/id/foto/garam-dari-dekat.webp?a=1&b=1&s=612x612&w=0&k=20&c=-Le2DvQblHiYgdCoYeiLpYuTU9dBecxZPX0GISQMjck=' },

  // 🥩 2. Daging, Ayam, Ikan & Seafood
  { id: 2001, name: 'Ayam Utuh /kg', price: 38000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1707735507043-2b1536feadb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF5YW0lMjBwb3Rvbmd8ZW58MHx8MHx8fDA%3D' },
  { id: 2002, name: 'Ayam Potong /kg', price: 36000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1708782342351-74f02e9a16c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXlhbSUyMHBvdG9uZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2003, name: 'Dada Ayam Fillet 500g', price: 35000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFkYSUyMGF5YW0lMjBmaWxsZXR8ZW58MHx8MHx8fDA%3D' },
  { id: 2004, name: 'Paha Ayam 500g', price: 28000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1624364543842-b0472614eb68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhaGElMjBheWFtfGVufDB8fDB8fHww' },
  { id: 2005, name: 'Sayap Ayam 500g', price: 24000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=400&q=80' },
  { id: 2006, name: 'Daging Sapi /kg', price: 135000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=400&q=80' },
  { id: 2007, name: 'Daging Giling 500g', price: 68000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=400&q=80' },
  { id: 2008, name: 'Iga Sapi /kg', price: 145000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80' },
  { id: 2009, name: 'Steak Sapi Sirloin 250g', price: 75000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=400&q=80' },
  { id: 2010, name: 'Daging Kambing /kg', price: 140000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80' },
  { id: 2011, name: 'Ikan Lele Segar /kg', price: 28000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1569409431589-64c14223c008?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGlrYW4lMjBsZWxlJTIwcG90b25nfGVufDB8fDB8fHww' },
  { id: 2013, name: 'Ikan Gurame Segar /kg', price: 48000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1618120995338-f1344edc054a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aWthbiUyMGd1cmFtZSUyMHBvdG9uZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2014, name: 'Ikan Bandeng Segar /kg', price: 35000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1517115358639-5720b8e02219?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWthbiUyMGJhbmRlbmclMjBwb3Rvbmd8ZW58MHx8MHx8fDA%3D' },
  { id: 2015, name: 'Salmon Fillet 250g', price: 95000, category: 'Daging & Seafood', image: 'https://plus.unsplash.com/premium_photo-1723478431094-4854c4555fc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsbW9ufGVufDB8fDB8fHww' },
  { id: 2016, name: 'Udang Segar /kg', price: 85000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80' },
  { id: 2017, name: 'Cumi Segar /kg', price: 65000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1711010345097-225bb361ff3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VtaSUyMHNlZ2FyfGVufDB8fDB8fHww' },
  { id: 2018, name: 'Kerang Segar /kg', price: 42000, category: 'Daging & Seafood', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80' },

  // 🥬 3. Sayur & Buah
  { id: 3001, name: 'Kangkung Ikat', price: 4500, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1662318183265-5bbe6578d1b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FuZ2t1bmd8ZW58MHx8MHx8fDA%3D' },
  { id: 3002, name: 'Bayam Ikat', price: 4500, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3003, name: 'Sawi Hijau Ikat', price: 5000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3004, name: 'Pakcoy Ikat', price: 5500, category: 'Sayur & Buah', image: 'https://media.istockphoto.com/id/2214669141/id/foto/kubis-cina-pak-choi.webp?a=1&b=1&s=612x612&w=0&k=20&c=2GO7BnEkJQYkO4ly9BMOg3xUTErsDSdaDsoJYiIVueM=' },
  { id: 3005, name: 'Selada Segar 250g', price: 8500, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1693667660375-653320dbebb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VsYWRhJTIwc2VnYXJ8ZW58MHx8MHx8fDA%3D' },
  { id: 3006, name: 'Kol Putih /pcs', price: 7000, category: 'Sayur & Buah', image: 'https://plus.unsplash.com/premium_photo-1700028099716-f9915f53624e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGtvbCUyMHB1dGlofGVufDB8fDB8fHww' },
  { id: 3007, name: 'Wortel 500g', price: 14000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80' },
  { id: 3008, name: 'Kentang 1kg', price: 18000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80' },
  { id: 3009, name: 'Tomat 500g', price: 12000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80' },
  { id: 3010, name: 'Cabai Merah 250g', price: 15000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?auto=format&fit=crop&w=400&q=80' },
  { id: 3011, name: 'Bawang Merah 250g', price: 13000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80' },
  { id: 3012, name: 'Bawang Putih 250g', price: 12500, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80' },
  { id: 3013, name: 'Jagung Manis /pcs', price: 4000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80' },
  { id: 3014, name: 'Brokoli 500g', price: 18500, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=400&q=80' },
  { id: 3015, name: 'Kembang Kol 500g', price: 16000, category: 'Sayur & Buah', image: 'https://plus.unsplash.com/premium_photo-1661963465934-55eeb52f64d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a29sJTIwcHV0aWh8ZW58MHx8MHx8fDA%3D' },
  { id: 3016, name: 'Apel Fuji /kg', price: 45000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1676664936321-a9f0068ab7b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBlbCUyMHB1dGlofGVufDB8fDB8fHww' },
  { id: 3017, name: 'Jeruk Manis /kg', price: 28000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80' },
  { id: 3018, name: 'Pisang Cavendish 1 Sisir', price: 24500, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlzYW5nfGVufDB8fDB8fHww' },
  { id: 3019, name: 'Mangga Harum Manis /kg', price: 32000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=400&q=80' },
  { id: 3020, name: 'Melon Jingga /pcs', price: 25000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=400&q=80' },
  { id: 3021, name: 'Semangka /pcs', price: 30000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80' },
  { id: 3022, name: 'Anggur Merah Seedless /kg', price: 55000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1621435708274-30561995eaa3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5nZ3VyfGVufDB8fDB8fHww' },
  { id: 3023, name: 'Pepaya California /pcs', price: 14000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&w=400&q=80' },
  { id: 3024, name: 'Pir /kg', price: 38000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=400&q=80' },
  { id: 3025, name: 'Kiwi /pcs', price: 8500, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=400&q=80' },
  { id: 3026, name: 'Alpukat /kg', price: 28000, category: 'Sayur & Buah', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80' },

  // 🥚 4. Telur & Produk Dingin
  { id: 4001, name: 'Telur Ayam (Isi 10)', price: 28500, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=400&q=80' },
  { id: 4002, name: 'Telur Omega (Isi 10)', price: 34000, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=400&q=80' },
  { id: 4003, name: 'Telur Bebek (Isi 6)', price: 21000, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80' },
  { id: 4004, name: 'Telur Puyuh (Isi 20)', price: 12000, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80' },
  { id: 4005, name: 'Tahu Putih 6 Pcs', price: 6500, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=400&q=80' },
  { id: 4006, name: 'Tempe 2 Papan', price: 7000, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=400&q=80' },
  { id: 4007, name: 'Tofu Sutra 300g', price: 9500, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=400&q=80' },
  { id: 4008, name: 'Susu Fresh Milk 1L', price: 21000, category: 'Telur & Dingin', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },

  // 🧊 5. Frozen Food
  { id: 5001, name: 'Nugget Ayam 500g', price: 42000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
  { id: 5002, name: 'Nugget Ikan 500g', price: 39000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
  { id: 5003, name: 'Sosis Sapi (Isi 6)', price: 38000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=400&q=80' },
  { id: 5004, name: 'Bakso Sapi 500g', price: 32000, category: 'Frozen Food', image: 'https://plus.unsplash.com/premium_photo-1713082860949-029bd31a0ca2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFrc28lMjBzYXBpfGVufDB8fDB8fHww' },
  { id: 5005, name: 'Otak-otak Ikan 250g', price: 22000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80' },
  { id: 5006, name: 'Tempura Ikan 250g', price: 24000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80' },
  { id: 5007, name: 'Chicken Karaage 500g', price: 36000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80' },
  { id: 5008, name: 'Kentang Frozen 500g', price: 28000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80' },
  { id: 5009, name: 'French Fries 1kg', price: 35000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80' },
  { id: 5010, name: 'Seafood Mix Frozen 500g', price: 45000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80' },
  { id: 5011, name: 'Dumpling Frozen 250g', price: 26000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80' },
  { id: 5012, name: 'Siomay Frozen 250g', price: 23000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80' },
  { id: 5013, name: 'Es Krim Vanilla Cup', price: 12000, category: 'Frozen Food', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80' },

  // 🥛 6. Susu, Yogurt, Keju & Dairy
  { id: 6001, name: 'Susu UHT Full Cream 1L', price: 22500, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },
  { id: 6002, name: 'Susu Pasteurisasi 1L', price: 21000, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },
  { id: 6003, name: 'Susu Bubuk 800g', price: 65000, category: 'Dairy', image: 'https://images.unsplash.com/photo-1693996045369-781799bbaea0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1c3UlMjBidWJ1a3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 6004, name: 'Susu Kental Manis 370g', price: 13500, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },
  { id: 6005, name: 'Yogurt Plain Cup 200g', price: 14000, category: 'Dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80' },
  { id: 6006, name: 'Keju Slice 170g', price: 24000, category: 'Dairy', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80' },
  { id: 6007, name: 'Keju Blok Cheddar 180g', price: 26500, category: 'Dairy', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80' },
  { id: 6008, name: 'Butter Tawar 200g', price: 26000, category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80' },
  { id: 6009, name: 'Margarin Serbaguna 200g', price: 9500, category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80' },
  { id: 6010, name: 'Cooking Cream 250ml', price: 18500, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },

  // 🍞 7. Roti, Kue & Baking
  { id: 7001, name: 'Roti Tawar Kupas', price: 15000, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
  { id: 7002, name: 'Roti Manis Isi Coklat', price: 13000, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=400&q=80' },
  { id: 7003, name: 'Donat Kemasan (Isi 6)', price: 18000, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=400&q=80' },
  { id: 7004, name: 'Cake Cokelat Slice', price: 16000, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80' },
  { id: 7005, name: 'Biskuit Cokelat Krim 133g', price: 9500, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80' },
  { id: 7006, name: 'Tepung Kue Serbaguna 500g', price: 14500, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80' },
  { id: 7007, name: 'Baking Powder 100g', price: 7500, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80' },
  { id: 7008, name: 'Coklat Batang Masak 200g', price: 22000, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80' },
  { id: 7009, name: 'Selai Coklat 200g', price: 17500, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
  { id: 7010, name: 'Selai Kacang 200g', price: 19500, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&q=80' },
  { id: 7011, name: 'Selai Stroberi 200g', price: 16500, category: 'Roti & Baking', image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=400&q=80' },

  // 🍫 8. Snack & Cemilan
  { id: 8001, name: 'Keripik Kentang 68g', price: 12500, category: 'Snack', image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyaXBpayUyMGtlbnRhbmd8ZW58MHx8MHx8fDA%3D' },
  { id: 8002, name: 'Kerupuk Udang 250g', price: 11000, category: 'Snack', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80' },
  { id: 8003, name: 'Wafer Coklat', price: 8500, category: 'Snack', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=400&q=80' },
  { id: 8004, name: 'Biskuit Sandwich Krim', price: 9000, category: 'Snack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80' },
  { id: 8005, name: 'Coklat Bar Premium 58g', price: 16500, category: 'Snack', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80' },
  { id: 8006, name: 'Permen Mint Kemasan', price: 6500, category: 'Snack', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80' },
  { id: 8007, name: 'Kacang Tanah Panggang 200g', price: 14500, category: 'Snack', image: 'https://images.unsplash.com/photo-1524594345772-c953a3ae53e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FjYW5nJTIwdGFuYWglMjBwYW5nZ2FuZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 8008, name: 'Popcorn Manis Kemasan', price: 13000, category: 'Snack', image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80' },
  { id: 8009, name: 'Snack Kentang Stik', price: 10500, category: 'Snack', image: 'https://images.unsplash.com/photo-1615485290836-4ebcebf44aaf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2VudGFuZyUyMHN0aWt8ZW58MHx8MHx8fDA%3D' },
  { id: 8010, name: 'Snack Jagung Renyah', price: 9500, category: 'Snack', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80' },
  { id: 8011, name: 'Biskuit Sandwich Oreo', price: 9500, category: 'Snack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80' },
  { id: 8012, name: 'Wafer Good Time Cookies', price: 11500, category: 'Snack', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80' },
  { id: 8013, name: 'Keripik Kentang Piattos', price: 13000, category: 'Snack', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtlbnRhbmclMjBzdGlrfGVufDB8fDB8fHww' },
  { id: 8014, name: 'Snack Jagung Cheetos', price: 12000, category: 'Snack', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80' },
  { id: 8015, name: 'Biskuit Kaleng Khong Guan', price: 35000, category: 'Snack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80' },
  { id: 8016, name: 'Wafer Karamel Beng-Beng', price: 2500, category: 'Snack', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=400&q=80' },
  { id: 8017, name: 'Coklat Batang SilverQueen', price: 13500, category: 'Snack', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80' },

  // ☕ 9. Kopi, Teh & Minuman Bubuk
  { id: 9001, name: 'Kopi Sachet Instan 3in1', price: 1500, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=400&q=80' },
  { id: 9002, name: 'Kopi Bubuk 165g', price: 18500, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80' },
  { id: 9003, name: 'Kopi Premium Arabika 200g', price: 45000, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80' },
  { id: 9004, name: 'Teh Celup (Isi 25)', price: 12500, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=400&q=80' },
  { id: 9005, name: 'Teh Bubuk 200g', price: 14000, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=400&q=80' },
  { id: 9006, name: 'Milo Bubuk 400g', price: 32000, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1676936832831-ec706fb193a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1c3UlMjBjb2tsYXQlMjBidWJ1a3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 9007, name: 'Susu Coklat Bubuk 400g', price: 28000, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1676936832831-ec706fb193a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1c3UlMjBjb2tsYXQlMjBidWJ1a3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 9008, name: 'Minuman Vitamin Sachet', price: 2500, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80' },
  { id: 9009, name: 'Minuman Serbuk Rasa Jeruk', price: 4000, category: 'Kopi & Teh Bubuk', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80' },

  // 🥤 10. Minuman Botol & Kaleng
  { id: 10001, name: 'Air Mineral Botol 600ml', price: 3500, category: 'Minuman Botol & Kaleng', image: 'https://plus.unsplash.com/premium_photo-1737362946604-5b0d174dab40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWlyJTIwbWluZXJhbHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 10002, name: 'Teh Botol Melati 450ml', price: 5500, category: 'Minuman Botol & Kaleng', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80' },
  { id: 10003, name: 'Jus Buah Kemasan 250ml', price: 7500, category: 'Minuman Botol & Kaleng', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80' },
  { id: 10004, name: 'Minuman Soda Kaleng 330ml', price: 6500, category: 'Minuman Botol & Kaleng', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80' },
  { id: 10005, name: 'Minuman Energi Kaleng', price: 8000, category: 'Minuman Botol & Kaleng', image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=400&q=80' },
  { id: 10006, name: 'Minuman Isotonik 500ml', price: 7000, category: 'Minuman Botol & Kaleng', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80' },
  { id: 10007, name: 'Kopi Kaleng Siap Minum', price: 8500, category: 'Minuman Botol & Kaleng', image: 'https://images.unsplash.com/photo-1644418665364-d4ef9427f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a29waSUyMGthbGVuZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 10008, name: 'Susu Kotak UHT 200ml', price: 6000, category: 'Minuman Botol & Kaleng', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },

  // 🧂 11. Bumbu Dapur
  { id: 11001, name: 'Minyak Goreng 2L', price: 32000, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80' },
  { id: 11002, name: 'Kecap Manis 275ml', price: 14000, category: 'Bumbu Dapur', image: 'https://media.istockphoto.com/id/2210148945/id/foto/saus-tiram.webp?a=1&b=1&s=612x612&w=0&k=20&c=jpJrn468JZikYgo8VVrI6myYXmByQap4Ee4313ChImM=' },
  { id: 11003, name: 'Kecap Asin 135ml', price: 9500, category: 'Bumbu Dapur', image: 'https://media.istockphoto.com/id/171330314/id/foto/kecap.webp?a=1&b=1&s=612x612&w=0&k=20&c=HcuFu2UbbeT9DE77LBcDyQFdTCr55085qlFFtnk9siE=' },
  { id: 11004, name: 'Saus Sambal Ekstra Pedas 340ml', price: 15500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1608949621301-dc970e104c90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhdXN8ZW58MHx8MHx8fDA%3D' },
  { id: 11005, name: 'Saus Tomat Botol 340ml', price: 13500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?auto=format&fit=crop&w=400&q=80' },
  { id: 11006, name: 'Mayones Botol 230ml', price: 19500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80' },
  { id: 11007, name: 'Sambal Botolan Pedas 200ml', price: 12500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1598103466091-d1e35f5822c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhdXN8ZW58MHx8MHx8fDA%3D' },
  { id: 11008, name: 'Kaldu Bubuk Ayam Sachet', price: 5500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
  { id: 11009, name: 'Bumbu Instan Rendang', price: 6500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
  { id: 11010, name: 'Bumbu Instan Soto', price: 6000, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
  { id: 11011, name: 'Bumbu Instan Ayam Goreng', price: 5500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
  { id: 11012, name: 'Bumbu Instan Gulai', price: 6500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
  { id: 11013, name: 'Merica Bubuk 50g', price: 8500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1640958899669-12f9b327d38f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVyaWNhJTIwYnVidWt8ZW58MHx8MHx8fDA%3D' },
  { id: 11014, name: 'Ketumbar Bubuk 50g', price: 5500, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1640958899669-12f9b327d38f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVyaWNhJTIwYnVidWt8ZW58MHx8MHx8fDA%3D' },
  { id: 11015, name: 'Cabai Bubuk 50g', price: 7000, category: 'Bumbu Dapur', image: 'https://images.unsplash.com/photo-1702041295471-01b73fd39907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FiYWklMjBidWJ1a3xlbnwwfHwwfHx8MA%3D%3D' },

  // 🥫 12. Makanan Kaleng
  { id: 12001, name: 'Sarden Kaleng 425g', price: 16500, category: 'Makanan Kaleng', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80' },
  { id: 12002, name: 'Kornet Sapi Kaleng 340g', price: 28500, category: 'Makanan Kaleng', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80' },
  { id: 12003, name: 'Tuna Kaleng 150g', price: 17500, category: 'Makanan Kaleng', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80' },
  { id: 12004, name: 'Kacang Polong Kaleng 300g', price: 12000, category: 'Makanan Kaleng', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80' },
  { id: 12005, name: 'Buah Cocktail Kaleng 425g', price: 18000, category: 'Makanan Kaleng', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80' },

  // 🥜 13. Sarapan
  { id: 13001, name: 'Sereal Jagung 250g', price: 32000, category: 'Sarapan', image: 'https://images.unsplash.com/photo-1506368197720-c242fdaa44dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VyZWFsJTIwamFndW5nfGVufDB8fDB8fHww' },
  { id: 13002, name: 'Oatmeal Instan 800g', price: 45000, category: 'Sarapan', image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=400&q=80' },
  { id: 13003, name: 'Granola Mix 400g', price: 38000, category: 'Sarapan', image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=400&q=80' },
  { id: 13004, name: 'Selai Kacang 200g', price: 19500, category: 'Sarapan', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&q=80' },
  { id: 13005, name: 'Madu Murni 250ml', price: 35000, category: 'Sarapan', image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFkdXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 13006, name: 'Peanut Butter Krim 350g', price: 28000, category: 'Sarapan', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&q=80' },

  // 🧼 14. Kebutuhan Rumah Tangga
  { id: 14001, name: 'Deterjen Bubuk 800g', price: 19500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=400&q=80' },
  { id: 14002, name: 'Deterjen Cair 700ml', price: 21000, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=400&q=80' },
  { id: 14003, name: 'Pelembut Pakaian 800ml', price: 17500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=400&q=80' },
  { id: 14004, name: 'Pewangi Pakaian Sekali Bilas 800ml', price: 18000, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=400&q=80' },
  { id: 14005, name: 'Sabun Cuci Piring 750ml', price: 14500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80' },
  { id: 14006, name: 'Spons Cuci Piring (Isi 3)', price: 6500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80' },
  { id: 14007, name: 'Pembersih Lantai 800ml', price: 16500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80' },
  { id: 14008, name: 'Karbol Pembersih 800ml', price: 15500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80' },
  { id: 14009, name: 'Pembersih Kaca 500ml', price: 13500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80' },
  { id: 14010, name: 'Kantong Sampah (Isi 20)', price: 9500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=400&q=80' },
  { id: 14011, name: 'Tisu Wajah 250 Sheet', price: 18500, category: 'Rumah Tangga', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=400&q=80' },

  // 🧴 15. Personal Care
  { id: 15001, name: 'Sabun Mandi Cair 450ml', price: 28500, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=400&q=80' },
  { id: 15002, name: 'Shampoo Anti Ketombe 340ml', price: 32000, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
  { id: 15003, name: 'Conditioner Rambut 340ml', price: 31000, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
  { id: 15004, name: 'Pasta Gigi Mint 190g', price: 12500, category: 'Personal Care', image: 'https://media.istockphoto.com/id/1396344574/id/foto/pria-meremas-pasta-gigi-di-sikat-gigi.webp?a=1&b=1&s=612x612&w=0&k=20&c=bgTES3s9jvA41p2wiCq6mCMoIpT4rE5EV-d9KG7xNI0=' },
  { id: 15005, name: 'Sikat Gigi (Isi 2)', price: 9500, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1520013573795-38516d2661e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lrYXQlMjBnaWdpfGVufDB8fDB8fHww' },
  { id: 15006, name: 'Deodorant Roll On 50ml', price: 17500, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
  { id: 15007, name: 'Parfum Body Mist 100ml', price: 35000, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80' },
  { id: 15008, name: 'Skincare Pelembap Wajah 50ml', price: 45000, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
  { id: 15009, name: 'Hand Sanitizer 100ml', price: 12000, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=400&q=80' },
  { id: 15010, name: 'Pembalut Wanita (Isi 8)', price: 14500, category: 'Personal Care', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=400&q=80' },

  // 👶 16. Bayi
  { id: 16001, name: 'Popok Bayi Ukuran M (Isi 30)', price: 65000, category: 'Bayi', image: 'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wb2t8ZW58MHx8MHx8fDA%3D' },
  { id: 16002, name: 'Susu Formula Bayi 800g', price: 125000, category: 'Bayi', image: 'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wb2t8ZW58MHx8MHx8fDA%3D' },
  { id: 16003, name: 'Tissue Basah Bayi (Isi 80)', price: 16500, category: 'Bayi', image: 'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wb2t8ZW58MHx8MHx8fDA%3D' },
  { id: 16004, name: 'Sabun Bayi Cair 200ml', price: 22000, category: 'Bayi', image: 'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wb2t8ZW58MHx8MHx8fDA%3D' },
  { id: 16005, name: 'Shampoo Bayi 200ml', price: 24000, category: 'Bayi', image: 'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wb2t8ZW58MHx8MHx8fDA%3D' },
  { id: 16006, name: 'Bedak Bayi 100g', price: 18500, category: 'Bayi', image: 'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wb2t8ZW58MHx8MHx8fDA%3D' },

  // 🐶 17. Hewan Peliharaan
  { id: 17001, name: 'Makanan Kucing Kering 1kg', price: 48000, category: 'Hewan Peliharaan', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80' },
  { id: 17002, name: 'Makanan Anjing Kering 1kg', price: 52000, category: 'Hewan Peliharaan', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80' },
  { id: 17003, name: 'Pasir Kucing Gumpal 5L', price: 35000, category: 'Hewan Peliharaan', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80' },
  { id: 17004, name: 'Snack Hewan Stick 60g', price: 15000, category: 'Hewan Peliharaan', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80' },

  // 🔋 18. Barang Tambahan
  { id: 18001, name: 'Baterai AA (Isi 4)', price: 15000, category: 'Barang Tambahan', image: 'https://plus.unsplash.com/premium_photo-1683120793196-0797cec08a7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmF0ZXJhaXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 18002, name: 'Lampu LED 9W', price: 22000, category: 'Barang Tambahan', image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFtcHUlMjBsZWR8ZW58MHx8MHx8fDA%3D' },
  { id: 18003, name: 'Alat Tulis Pulpen (Isi 5)', price: 12500, category: 'Barang Tambahan', image: 'https://plus.unsplash.com/premium_photo-1775818103627-bf0412beb2c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHVscGVufGVufDB8fDB8fHww' },
  { id: 18004, name: 'Plastik Wrap Makanan 30m', price: 11000, category: 'Barang Tambahan', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=400&q=80' },
  { id: 18005, name: 'Kotak Penyimpanan Plastik', price: 25000, category: 'Barang Tambahan', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80' },
  { id: 18006, name: 'Peralatan Dapur Set Kecil', price: 38000, category: 'Barang Tambahan', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80' },
];

const CATEGORIES = [
  'Semua', 'Pokok', 'Daging & Seafood', 'Sayur & Buah', 'Telur & Dingin',
  'Frozen Food', 'Dairy', 'Roti & Baking', 'Snack', 'Kopi & Teh Bubuk',
  'Minuman Botol & Kaleng', 'Bumbu Dapur', 'Makanan Kaleng', 'Sarapan',
  'Rumah Tangga', 'Personal Care', 'Bayi', 'Hewan Peliharaan', 'Barang Tambahan'
];

export default function SmartTrolleyApp() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Update Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setVisibleProducts(8);
  }, [searchQuery, selectedCategory]);

  // Format Rupiah
  const formatRp = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  // Tanggal untuk Struk
  const receiptDate = currentTime.toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  // Logika Keranjang
  const handleScanItem = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem.qty > 1) {
        return prevCart.map(item => item.id === productId ? { ...item, qty: item.qty - 1 } : item);
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const totalBelanja = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const totalItem = cart.reduce((total, item) => total + item.qty, 0);

  // Filter & Pencarian
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Fungsi Simulasi Cetak Struk
  const handlePrint = () => {
    window.print();
  };

  // Halaman succes url
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.get('status') === 'success') {
    setView('success');
  }
}, []);

  // ── TAMPILAN QRIS ──
  if (view === 'qris') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-['Plus_Jakarta_Sans']">
        <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-x-hidden flex flex-col md:flex-row border border-slate-200">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 md:w-1/2 flex flex-col justify-between relative overflow-x-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-emerald-400 font-bold mb-2 uppercase tracking-widest text-sm flex items-center gap-2">
                <CheckCircle size={16} /> Checkout Pembayaran
              </p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 text-white">{formatRp(totalBelanja)}</h2>
              <div className="space-y-4 border-t border-slate-700/50 pt-6 text-lg">
                <div className="flex justify-between text-slate-300">
                  <span>Jumlah Barang</span><span className="font-bold text-white">{totalItem} Item</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Troli ID</span><span className="font-bold text-white">TRL-007</span>
                </div>
              </div>
            </div>
            <button onClick={() => setView('shop')} className="relative z-10 mt-12 w-full px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-bold text-lg backdrop-blur-md border border-white/10">
              Batal & Kembali
            </button>
          </div>
          <div className="p-6 md:p-12 md:w-1/2 flex flex-col items-center justify-center text-center bg-white">
            <h3 className="text-3xl font-black text-slate-900 mb-2">Scan QRIS</h3>
            <p className="text-slate-500 mb-10 text-lg">Buka aplikasi M-Banking atau e-Wallet Anda.</p>
            <div className="w-64 h-64 bg-white rounded-3xl border-4 border-emerald-500 p-3 shadow-2xl shadow-emerald-500/20 mb-10 relative group cursor-pointer transition-transform hover:scale-105" onClick={() => setView('success')}>
              <img src={qrisImage} alt="QRIS Code" className="w-full h-full object-contain opacity-90"/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-2xl backdrop-blur-sm">
                <span className="bg-emerald-500 text-white font-black px-6 py-3 rounded-xl shadow-lg">Simulasi Bayar Lunas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TAMPILAN SUKSES & STRUK DIGITAL ──
  if (view === 'success') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-['Plus_Jakarta_Sans'] py-12 overflow-y-auto">
        
        {/* Pesan Sukses */}
        <div className="text-center mb-8 animate-in slide-in-from-bottom-10 duration-500">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Pembayaran Berhasil!</h2>
          <p className="text-slate-500 mt-2 font-medium">Kunci roda troli terbuka. Berikut adalah struk digital Anda.</p>
        </div>

        {/* E-Receipt / Struk Thermal */}
        <div className="bg-white w-full max-w-md shadow-2xl rounded-t-lg rounded-b-sm overflow-x-hidden mb-8 animate-in zoom-in-95 duration-700 relative">
          {/* Ornamen Struk (Dashed line effect top/bottom) */}
          <div className="h-2 w-full bg-[radial-gradient(circle,transparent_4px,#fff_4px)] bg-[length:12px_12px] -mt-1 relative z-10 drop-shadow-sm rotate-180"></div>
          
          <div className="p-8 font-mono text-sm text-slate-700">
            {/* Header Struk */}
            <div className="text-center border-b-2 border-dashed border-slate-300 pb-6 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">MEGA SUPERMARKET</h3>
              <h4 className="text-lg font-bold text-emerald-600 mb-2">BUBUR KAMPIUN</h4>
              <p className="text-xs text-slate-500">Jl. Margonda Raya, Depok, Jawa Barat</p>
              <p className="text-xs text-slate-500">Troli ID: TRL-007 | Kasir: Smart IoT</p>
            </div>

            {/* Meta Data */}
            <div className="flex justify-between text-xs mb-6 font-semibold">
              <span>{receiptDate}</span>
              <span>TRX: #{Math.floor(Math.random() * 1000000)}</span>
            </div>

            {/* List Barang */}
            <div className="space-y-4 border-b-2 border-dashed border-slate-300 pb-6 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.qty} x {formatRp(item.price)}</p>
                  </div>
                  <p className="font-bold">{formatRp(item.qty * item.price)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="space-y-2 mb-8">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({totalItem} Item)</span>
                <span>{formatRp(totalBelanja)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Pajak (Termasuk)</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between text-xl font-black text-slate-900 mt-2 pt-2 border-t border-slate-200">
                <span>TOTAL</span>
                <span>{formatRp(totalBelanja)}</span>
              </div>
            </div>

            {/* Footer Struk */}
            <div className="text-center">
              <div className="inline-block border-2 border-emerald-500 text-emerald-500 px-4 py-1 rounded-full font-bold text-sm tracking-widest rotate-[-5deg] mb-6 shadow-sm">
                LUNAS - QRIS
              </div>
              <p className="text-xs text-slate-500">Terima kasih atas kunjungan Anda.<br/>Barang yang sudah dibeli tidak dapat ditukar.</p>
            </div>
          </div>
          
          {/* Bottom Zigzag */}
          <div className="h-3 w-full bg-[radial-gradient(circle,transparent_4px,#fff_4px)] bg-[length:12px_12px] -mb-1 relative z-10 drop-shadow-md"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={handlePrint}
            className="flex-1 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Printer size={20} /> Cetak Struk
          </button>
          <button 
            onClick={() => { setCart([]); setView('shop'); }}
            className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 transition-all"
          >
            Selesai Belanja <ArrowLeft size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ── TAMPILAN UTAMA ──
  return (
    <div className="min-h-screen bg-[#f1f5f9] font-['Plus_Jakarta_Sans'] flex flex-col xl:flex-row overflow-x-hidden">
      
      {/* KIRI: Katalog Barang */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        
        {/* ── HEADER PREMIUM ── */}
        <div className="p-6 pb-2 z-10">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[2rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 flex flex-col lg:flex-row justify-between items-center gap-6 border border-slate-700">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 border border-emerald-300/50">
                <Store size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  Smart Trolley IoT
                </h1>
                <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs mt-1">
                  Mega Supermarket Bubur Kampiun
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end mr-4">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Waktu Sistem</span>
                <span className="text-white font-mono font-bold">{currentTime.toLocaleTimeString('id-ID')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 rounded-xl border border-slate-600/50 text-emerald-400 shadow-inner backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-sm tracking-wide">Scanner Aktif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-6 py-4 z-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center bg-white p-2 rounded-2xl">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Cari beras, daging, susu, kopi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-semibold text-slate-800"
              />
            </div>
            <div className="w-px h-8 bg-slate-200 mx-2"></div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full lg:w-auto pr-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Produk Foto Nyata */}
        <div className="flex-1 overflow-y-auto px-6 pb-10 z-0">
          {filteredProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-slate-200 border-dashed">
              <Search size={64} className="mb-6 opacity-20" />
              <h3 className="text-2xl font-bold text-slate-600 mb-2">Pencarian tidak ditemukan</h3>
              <p className="text-lg">Coba gunakan kata kunci lain (misal: "Ayam", "Kopi", "Susu").</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.slice(0, visibleProducts).map(product => (
                <div 
                  key={product.id} 
                  onClick={() => handleScanItem(product)}
                  className="bg-white rounded-[1.5rem] p-3 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border border-slate-200 group flex flex-col h-full"
                >
                  <div className="h-44 w-full rounded-2xl relative overflow-x-hidden bg-slate-100 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm flex items-center gap-1">
                      <Tag size={10} /> {product.category}
                    </div>
                  </div>
                  
                  <div className="px-2 pb-2 flex flex-col flex-1 justify-between">
                    <h3 className="font-bold text-slate-800 mb-3 line-clamp-2 text-sm leading-snug group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-slate-900 font-black text-lg">{formatRp(product.price)}</p>
                      <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-emerald-500/30 group-hover:rotate-90">
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {visibleProducts < filteredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleProducts(prev => prev + 8)}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
            >
              Lihat Lainnya
            </button>
          </div>
        )}
      </div>

      {/* KANAN: Keranjang Premium */}
      <div className="w-full xl:w-[480px] bg-white shadow-[-30px_0_60px_rgba(0,0,0,0.05)] xl:min-h-screen flex flex-col z-20 shrink-0 border-l border-slate-200 relative">
        <div className="p-8 border-b border-slate-100 bg-white">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Keranjang</h2>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
              <ShoppingCart size={24} className="text-emerald-500" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-full">Troli TRL-007</span>
            <p className="text-slate-500 font-medium text-sm">Berisi <span className="text-emerald-600 font-bold">{totalItem} Item</span></p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-6">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                <ShoppingCart size={48} className="text-slate-200" />
              </div>
              <p className="font-medium text-lg text-slate-500">Troli masih kosong.<br/>Silakan scan barang Anda.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-3 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover bg-slate-50" />
                  
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="font-bold text-slate-800 text-sm leading-tight mb-2 truncate group-hover:text-emerald-600 transition-colors">{item.name}</h4>
                    <p className="text-slate-900 font-black text-base">{formatRp(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 mr-2">
                    <button onClick={() => handleRemoveItem(item.id)} className="w-8 h-8 flex items-center justify-center bg-white text-slate-500 rounded-lg hover:bg-rose-50 hover:text-rose-500 shadow-sm transition-colors border border-slate-100"><Minus size={16} /></button>
                    <span className="font-bold w-6 text-center text-slate-800">{item.qty}</span>
                    <button onClick={() => handleScanItem(item)} className="w-8 h-8 flex items-center justify-center bg-white text-slate-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 shadow-sm transition-colors border border-slate-100"><Plus size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 bg-white border-t border-slate-100 shadow-[0_-20px_40px_rgba(0,0,0,0.03)] z-10">
          <div className="flex justify-between items-end mb-8">
            <span className="text-slate-500 font-bold text-lg">Total Pembayaran</span>
            <span className="text-4xl font-black text-slate-900 tracking-tight">{formatRp(totalBelanja)}</span>
          </div>
          <button 
            onClick={() => setView('qris')}
            disabled={cart.length === 0}
            className={`w-full py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 transition-all duration-300 ${
              cart.length === 0 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 border border-emerald-400/50'
            }`}
          >
            <CreditCard size={24} /> Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}