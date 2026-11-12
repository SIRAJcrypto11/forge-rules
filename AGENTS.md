# Identitas usaha dan standar ekosistem SNISHOP

Dokumen ini merangkum aturan wajib untuk agen AI atau developer yang membuat atau mengubah aplikasi, situs, atau layanan di ekosistem SNISHOP. Patuhi tanpa menimpa aturan repo yang sudah lebih spesifik, kecuali aturan lama bertentangan dengan identitas resmi di bawah — dalam hal itu, identitas resmi yang dipakai.

## Identitas resmi (12 November 2026, ditetapkan pemilik)

- Badan usaha: PT SNISHOP NETWORK INDONESIA
- Merek: SNISHOP
- NIB: 1708230040395
- Alamat: Perumahan Puri Pedati, Nomor B17, Pasar Pedati, Kecamatan Pondok Kelapa, Kabupaten Bengkulu Tengah, Bengkulu 38371
- Email utama (kontak publik, schema, llms.txt): snishopsolusinetwork@gmail.com
- Email cadangan: sirajnurihrom@snishop.com
- WhatsApp/telepon resmi: +62 851-8515-1356 (https://wa.me/6285185151356)
- Situs merek: https://snishop.com/
- Pemesanan: https://app.snishop.com/
- ERP: https://erp.snishop.com/
- Skill Studio: https://skills.snishop.com/
- Usahakan Digital: https://usahakan.digital/
- Jangan memakai alamat lama Puri Pedati B8.

## Produk dan klaim

- Jangan membuat rating, ulasan, atau klaim (garansi resmi, bantuan 24/7, angka omzet/margin, jumlah pengguna) yang tidak ada sumbernya.
- Jangan menampilkan atau menawarkan produk akun bersama, akses streaming, atau akun game (misalnya Netflix shared, Canva Pro shared, CapCut shared, ChatGPT Plus shared, akun Mobile Legends/Free Fire) di profil atau permukaan bisnis OpenAI/ChatGPT. Kebijakan Commerce OpenAI melarang itu.
- Skill Studio: pembelian final, tanpa refund.
- Hasil yang ditulis harus nyata; jangan memalsukan ulasan atau rating.

## URL, SEO, dan GEO

- URL publik jangan berakhiran `.php` (rewrite bersih).
- Setiap halaman penting: title dan meta description faktual, schema Organization/Product/FAQ/Breadcrumb sesuai jenis halaman, sitemap, `llms.txt`, `robots.txt` yang mengizinkan crawler AI (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended) kecuali ada alasan keamanan.
- Konten antarmuka dan pemasaran utama berbahasa Indonesia.
- Schema Organization memakai legalName, NIB, alamat B17, email utama, telepon resmi.

## Keamanan dan data

- Jangan menaruh rahasia (kunci, token, kata sandi, nomor rekening) di repo, chat, atau berkas yang ter-commit. Placeholder saja.
- Jaga CSRF, validasi unggahan, dan otorisasi. Jangan menjalankan skrip destruktif terhadap data live; uji pada salinan.
- Akun uji hanya `@snishop.test`, hapus setelah selesai. Jangan mengubah data pesanan milik pemilik.
- Jangan menyentuh logika callback, tanda tangan, atau verifikasi pembayaran Tripay.
- DNS, email hosting, dan billing tidak diubah tanpa izin pemilik.

## Cara bekerja

- Backup sebelum mengubah. Langkah kecil dan aman. Tes regresi halaman kunci: `/`, `/products`, `/turnitin`, `/login`, `/register`, `/skills/`, `/ebook/`, `/tentang` (sesuai situs yang disentuh). Jika rusak, rollback.
- Aplikasi Base44: tes di preview sebelum publish. Jangan publish tanpa persetujuan pemilik.
- Google Cloud: jangan memodifikasi proyek yang sudah ada untuk aplikasi lain. Login baru selalu mendapat proyek baru. Proyek ERP (fluent-spring-511908-i9) milik Base44; jangan dipakai untuk aplikasi lain.
- UI jangan terasa generik atau "AI slop". Mobile compact, target sentuh minimal 44px.
- Identitas git: `SNISHOP.COM Team <noreply@snishop.com>`.
- Untuk repo app.snishop.com (snishop-app): merge ke `main` hanya lewat PR; deploy produksi mengikuti `AGENTS.md` dan `deploy/PULL-DEPLOY.md` di repo itu (termasuk token `[owner-approved]` pada commit yang memang harus tayang).
