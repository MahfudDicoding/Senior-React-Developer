\# 📘 Deploy React Vite ke GitHub Pages



Dokumentasi lengkap cara deploy aplikasi React Vite ke GitHub Pages menggunakan GitHub Actions. Cocok untuk pemula!



---



\## 📚 Daftar Isi



\- \[Persiapan Awal](#persiapan-awal)

\- \[Setup GitHub Actions](#setup-github-actions)

\- \[Troubleshooting](#troubleshooting)

\- \[Tips \& Best Practices](#tips--best-practices)



---



\## 🎯 Persiapan Awal



\### 1. Edit `index.html`



Ganti path icon dari absolute ke relative agar tidak error saat deploy:



```html











```



---



\### 2. Inisialisasi Git Repository



```bash

git init

git add .

git commit -m "Initial commit: Vite React project"

```



---



\### 3. Buat Repository GitHub Baru



1\. Buka GitHub → \*\*New Repository\*\*

2\. \*\*Repository name:\*\* `nama-project-anda` (contoh: `my-vite-app`)

3\. \*\*Visibility:\*\* Public (agar bisa di-host di GitHub Pages)

4\. \*\*JANGAN\*\* centang "Add README" atau "Add .gitignore"

5\. Klik \*\*Create repository\*\*



---



\### 4. Tambahkan Remote \& Push ke GitHub



> ⚠️ \*\*PENTING:\*\* Gunakan SSH, bukan HTTPS!



```bash

\# Ganti 'username' dan 'nama-repo' sesuai milik Anda

\# Untuk multi-account, gunakan SSH alias (contoh: git@github-username)

git remote add origin git@github-username:username/nama-repo.git

git branch -M main

git push -u origin main

```



\*\*Verifikasi remote:\*\*



```bash

git remote -v

\# Output harusnya:

\# origin  git@github-username:username/nama-repo.git (fetch)

\# origin  git@github-username:username/nama-repo.git (push)

```



---



\### 5. Update `vite.config.js`



> ⚠️ \*\*CRITICAL:\*\* `base` HARUS sama dengan nama repository!



```javascript

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'



export default defineConfig({

&nbsp; base: '/nama-repo/', // ← GANTI dengan nama repo Anda!

&nbsp; plugins: \[react()],

})

```



\*\*Contoh:\*\*

\- Repository: `my-vite-app`

\- Maka `base: '/my-vite-app/'`



---



\## ⚙️ Setup GitHub Actions



\### 1. Skip `gh-pages` Package



Kita \*\*tidak perlu\*\* install `gh-pages` package. GitHub Actions akan handle deployment secara otomatis.



---



\### 2. Aktifkan GitHub Actions Permissions



1\. Buka repository di GitHub

2\. \*\*Settings\*\* → \*\*Actions\*\* → \*\*General\*\*

3\. Scroll ke \*\*Workflow permissions\*\*

4\. Pilih \*\*Read and write permissions\*\*

5\. Klik \*\*Save\*\*



---



\### 3. Buat Workflow File



Buat struktur folder dan file workflow:



```bash

\# Buat folder (kalau belum ada)

mkdir -p .github/workflows



\# Buat file workflow

touch .github/workflows/deploy.yml

```



\*\*Isi file `.github/workflows/deploy.yml`:\*\*



```yaml

name: Deploy to GitHub Pages



on:

&nbsp; push:

&nbsp;   branches: \[ "main" ]



jobs:

&nbsp; build-and-deploy:

&nbsp;   runs-on: ubuntu-latest



&nbsp;   steps:

&nbsp;     - name: Checkout code

&nbsp;       uses: actions/checkout@v4



&nbsp;     - name: Setup Node.js

&nbsp;       uses: actions/setup-node@v4

&nbsp;       with:

&nbsp;         node-version: '20.x'

&nbsp;         cache: 'npm'



&nbsp;     - name: Install dependencies

&nbsp;       run: npm ci



&nbsp;     - name: Build project

&nbsp;       run: npm run build



&nbsp;     - name: Deploy to GitHub Pages

&nbsp;       uses: peaceiris/actions-gh-pages@v4

&nbsp;       with:

&nbsp;         github\_token: ${{ secrets.GITHUB\_TOKEN }}

&nbsp;         publish\_dir: ./dist

```



---

\### 3a. Lakukan Build



```bash

npm run buil

```



\### 4. Commit \& Push Workflow



```bash

git add .github/workflows/deploy.yml

git commit -m "Add GitHub Actions workflow for auto deploy"

git push origin main

```



---



\### 5. Setup GitHub Pages



1\. \*\*Settings\*\* → \*\*Pages\*\*

2\. Source: \*\*Deploy from a branch\*\*

3\. Branch: \*\*gh-pages\*\* → \*\*/ (root)\*\*

4\. Klik \*\*Save\*\*



---



\### 6. Monitor Deploy



1\. Buka tab \*\*Actions\*\* di repository

2\. Lihat workflow \*\*"Deploy to GitHub Pages"\*\* sedang running

3\. Tunggu sampai \*\*✅ hijau (Success)\*\*

4\. Kalau \*\*❌ merah (Failed)\*\*, klik untuk lihat error log



---



\### 7. Verifikasi Deployment



Tunggu 1-2 menit setelah workflow success, lalu buka:



```

https://username.github.io/nama-repo/

```



\*\*Aplikasi harusnya sudah live!\*\* 🎉



---



\### 8. Update Aplikasi di Masa Depan



Setelah setup selesai, workflow deploy akan \*\*otomatis berjalan\*\* setiap kali Anda push ke branch `main`:



```bash

\# 1. Edit code di VSCode



\# 2. Commit \& push

git add .

git commit -m "Update: deskripsi perubahan"

git push origin main



\# 3. GitHub Actions OTOMATIS build \& deploy! ✅

\# (Cek progress di tab Actions)

```



---



\## 🐛 Troubleshooting



\### Error: 404 Not Found



\*\*Penyebab:\*\* `base` di `vite.config.js` tidak sesuai dengan nama repository.



\*\*Solusi:\*\*



```javascript

// Pastikan NAMA REPOSITORY sama persis!

export default defineConfig({

&nbsp; base: '/nama-repo-yang-benar/', // ← Cek ini!

&nbsp; plugins: \[react()],

})

```



Setelah fix, commit dan push ulang:



```bash

git add vite.config.js

git commit -m "Fix: correct base URL"

git push origin main

```



---



\### Error: Assets 404 (CSS/JS tidak load)



\*\*Gejala:\*\* Halaman putih, di console browser muncul error:



```

GET https://username.github.io/assets/index-xxx.js 404 (Not Found)

```



\*\*Penyebab:\*\* Build dilakukan sebelum `base` di `vite.config.js` diupdate.



\*\*Solusi:\*\* Clear cache dan rebuild:



```bash

\# Hapus cache

rm -rf dist node\_modules/.vite



\# Build ulang

npm run build



\# Commit \& push

git add .

git commit -m "Rebuild with correct base URL"

git push origin main

```



---



\### Error: `$GIT\_DIR too big`



\*\*Penyebab:\*\* Path folder project terlalu panjang (Windows limitation).



\*\*Solusi 1: Pindah ke folder lebih pendek\*\*



```bash

\# Pindah project ke C:\\Projects\\

mkdir -p /c/Projects

cp -r . /c/Projects/nama-project

cd /c/Projects/nama-project



\# Deploy ulang

git push origin main

```



\*\*Solusi 2: Manual push ke gh-pages\*\*



```bash

cd /c/

git clone -b gh-pages git@github-username:username/nama-repo.git temp

cd temp

rm -rf \*

cp -r /path/ke/project/dist/\* .

git add .

git commit -m "Deploy"

git push origin gh-pages

cd ..

rm -rf temp

```



---



\### Error: Workflow Failed



\*\*Langkah debug:\*\*



1\. Tab \*\*Actions\*\* → Klik workflow yang failed

2\. Lihat error message detail

3\. Common issues:

&nbsp;  - `npm install failed` → Cek `package.json` syntax

&nbsp;  - `npm run build failed` → Cek `vite.config.js` syntax

&nbsp;  - `Deploy failed` → Cek permissions (Step 2: Aktifkan GitHub Actions Permissions)



---



\### Error: Branch `gh-pages` Kosong



\*\*Solusi:\*\* Manual deploy sekali untuk initialize branch:



```bash

\# Install gh-pages

npm install gh-pages --save-dev



\# Manual deploy

npm run build

npx gh-pages -d dist

```



Setelah itu, GitHub Actions akan bisa deploy otomatis.



---



\### Error: JSON Parse Error di `package.json`



\*\*Penyebab:\*\* Missing comma atau syntax error di JSON.



\*\*Solusi:\*\* Gunakan validator online:



1\. Copy isi `package.json`

2\. Buka https://jsonlint.com/

3\. Paste \& klik \*\*"Validate JSON"\*\*

4\. Fix error yang muncul



\*\*Common mistakes:\*\*



```json

// ❌ SALAH - Missing comma

{

&nbsp; "scripts": {

&nbsp;   "build": "vite build"

&nbsp;   "deploy": "gh-pages -d dist"

&nbsp; }

}



// ✅ BENAR - Ada comma

{

&nbsp; "scripts": {

&nbsp;   "build": "vite build",

&nbsp;   "deploy": "gh-pages -d dist"

&nbsp; }

}

```



---



\## 💡 Tips \& Best Practices



\### 1. Gunakan `.gitignore` yang Benar



Pastikan folder `dist/` \*\*tidak di-commit\*\* ke branch `main`:



```gitignore

\# .gitignore

node\_modules/

dist/

.env

.DS\_Store

\*.log

```



\*\*Kenapa?\*\*

\- Folder `dist/` auto-generated saat build

\- Tidak perlu di-commit (bloat repository)

\- GitHub Actions akan build sendiri



---



\### 2. Test Lokal Sebelum Deploy



```bash

\# Build \& preview lokal

npm run build

npm run preview



\# Buka http://localhost:4173

\# Pastikan semua jalan dengan benar

```



---



\### 3. Hard Refresh Browser



Kalau setelah deploy tampilan masih lama, lakukan hard refresh:



\- \*\*Windows/Linux:\*\* `Ctrl + Shift + R` atau `Ctrl + F5`

\- \*\*Mac:\*\* `Cmd + Shift + R`



---



\### 4. Monitor Workflow Secara Berkala



Cek tab \*\*Actions\*\* secara berkala untuk memastikan:

\- ✅ Workflow success (hijau)

\- ⏱️ Build time tidak terlalu lama

\- 📊 Tidak ada warning yang perlu diperhatikan



---



\### 5. Gunakan SSH untuk Git



\*\*Keuntungan SSH vs HTTPS:\*\*

\- ✅ Tidak perlu input password/token setiap push

\- ✅ Lebih aman (key-based authentication)

\- ✅ Support multi-account dengan SSH alias

\- ✅ Kompatibel dengan GitHub Actions



---



\## ✅ Checklist Deployment



Sebelum deploy, pastikan checklist ini lengkap:



\- \[ ] `vite.config.js` → `base` sesuai nama repository

\- \[ ] `index.html` → Icon path pakai `./vite.svg` (relative)

\- \[ ] `package.json` → Syntax valid (tidak ada missing comma)

\- \[ ] Remote origin pakai \*\*SSH\*\* (bukan HTTPS)

\- \[ ] `npm run build` berhasil (ada folder `dist/`)

\- \[ ] File `.github/workflows/deploy.yml` sudah dibuat

\- \[ ] GitHub Actions permissions: \*\*Read and write\*\*

\- \[ ] GitHub Pages settings: Branch \*\*gh-pages\*\*, folder \*\*/\*\*

\- \[ ] Workflow di Actions tab \*\*✅ Success\*\* (hijau)

\- \[ ] Test di browser: `https://username.github.io/nama-repo/`



---



\## 📚 Referensi



\- \[Vite - Static Deploy](https://vitejs.dev/guide/static-deploy.html)

\- \[GitHub Pages Documentation](https://docs.github.com/en/pages)

\- \[GitHub Actions Documentation](https://docs.github.com/en/actions)

\- \[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)



---



\## 🎓 Lessons Learned



> \*\*"Error adalah bagian dari proses belajar. Setiap error yang Anda fix adalah skill baru yang Anda dapatkan!"\*\*



Common errors yang sering dialami pemula:

\- ✅ `base` URL tidak sesuai nama repo → Fixed dengan teliti cek nama repo

\- ✅ Path terlalu panjang → Fixed dengan pindah ke folder pendek

\- ✅ JSON syntax error → Fixed dengan validator online

\- ✅ SSH vs HTTPS confusion → Fixed dengan konsisten pakai SSH

\- ✅ Cache issue → Fixed dengan clear cache \& rebuild



\*\*Setiap error membuat Anda lebih mahir!\*\* 💪



---



\## 🚀 Next Steps



Setelah berhasil deploy:



1\. \*\*Custom Domain\*\* (opsional) - Setup domain sendiri

2\. \*\*CI/CD Advanced\*\* - Tambah testing, linting, dll

3\. \*\*Environment Variables\*\* - Setup untuk dev/staging/production

4\. \*\*Performance Optimization\*\* - Code splitting, lazy loading

5\. \*\*Analytics\*\* - Track visitor dengan Google Analytics



---



\## 📝 Kontribusi



Dokumentasi ini dibuat berdasarkan pengalaman nyata troubleshooting dan pembelajaran bertahap. Feel free untuk:



\- ⭐ Star repository ini

\- 🐛 Report bug atau error baru

\- 💡 Suggest improvement

\- 🔀 Fork dan customize sesuai kebutuhan



---



\*\*Happy Deploying! 🎉\*\*



Dibuat dengan ❤️ untuk membantu developer pemula deploy React Vite ke GitHub Pages.



---



\## 📄 License



MIT License - Free to use, modify, and distribute.



---



\*\*Last Updated:\*\* 2026-01-08

