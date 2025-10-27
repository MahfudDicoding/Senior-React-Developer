/*
TODO: Tugas Hari Kelima dan Keenam

! 📌 Hari 5–6: Refactor + Deploy
    ? Fokus: Rapikan struktur kode (refactor) dan publish project ke internet (deploy).

! ✅ Langkah 1: Refactor Komponen
    ? Tujuannya: Pemisahan komponen agar rapi dan reusable. Berikut checklist-nya:

! 🔹 1.1. Pisahkan Komponen:

Komponen	    Isi / Tanggung Jawab
Header.jsx	    Judul halaman (misalnya <h1>Todo List)
TodoForm.jsx	Input dan tombol tambah
TodoList.jsx	Menampilkan daftar todo
ListItem.jsx	Menampilkan satu todo item

! 🔹 1.2. Contoh Struktur Folder:


src/
├── App.jsx
├── components/
│   ├── Header.jsx
│   ├── TodoForm.jsx
│   ├── TodoList.jsx   ← ← ← Panggil ListItem di sini
│   └── ListItem.jsx   ← ← ← Digunakan oleh TodoList

! ✅ 1.3. TodoForm.jsx
    ? Tanggung jawab: Menangani input dan tombol tambah

import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tambah todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Tambah</button>
    </form>
  );
}

export default TodoForm;

* 🧠 Penjelasan Singkat:
    ? - inputValue → menyimpan nilai input saat user mengetik.

    ? - onAdd(inputValue) → memanggil fungsi dari App.jsx untuk menambahkan todo.

    ? - Setelah submit, input dikosongkan lagi (setInputValue('')).

! ✅ 1.4. TodoList.jsx
    ? Tanggung jawab: Menampilkan daftar todo item

import ListItem from './ListItem';

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ListItem key={index} text={todo} />
      ))}
    </ul>
  );
}

export default TodoList;

* 🧠 Penjelasan Singkat:
    ? - Menerima array todos dari App.jsx

    ? - map() digunakan untuk render setiap todo sebagai <li>

    ? - Gunakan key={index} sebagai identifikasi (meskipun sebaiknya gunakan id unik di real project — tapi ini cukup untuk mini project awal)

!🔹 1.5. Refactor App.jsx
    ? Setelah refactor, App.jsx akan terlihat seperti ini:

import { useState } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    if (!newTodo.trim()) return;
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <Header />
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </>
  );
}

export default App;


! ✅ Langkah 2: Minta Feedback
Kamu bisa kirimkan:

Screenshot atau isi file App.jsx dan komponen-komponennya

Atau repo GitHub-nya

Aku akan bantu:

Review apakah komponen sudah reusable

Cek penamaan dan struktur folder

Kasih saran improvement jika ada

! ✅ LANGKAH-LANGKAH DEPLOY REACT VITE KE GITHUB PAGES

todo: Setelah jadi aplikasi di Vite langkah selanjutnya adalah melakukan deploy ke Github Pages. Untuk memudahkan proses deploy, kita dapat menggunakan Github Action. Dengan Github Action, kita dapat membuat sebuah workflow untuk mengotomatisasi proses build dan deploy aplikasi kita ke Github Pages.

* 1. JANGAN LUPA EDIT TERLEBIH DAHULU INDEX.HTML DI VSCODE, DI BAGIAN

```jsx
<link *rel*="icon" *type*="image/svg+xml" *href*="/vite.svg" />
GANTI JADI
<link *rel*="icon" *type*="image/svg+xml" *href*="./vite.svg" />
```

* 2. Di CLI VSCode, tuliskan tiga perintah ini

```
git init
git add .
git commit -m "init vite project"

```

* 3. Di akun GITHUB, **Buat repositori GitHub baru** Pastikan **Publik** dipilih jika Anda tidak memiliki akun premium. Jika tidak, Anda tidak akan dapat menghosting aplikasi Anda menggunakan halaman GitHub.

* 4. Setelah repo dibuat, salin dan tempel instruksi yang mirip dengan ini ke terminal Anda

    `git remote add origin [git@github.com](mailto:git@github.com):sitek94/vite-deploy-demo.git
    git branch -M main
    git push -u origin main`


* 5. Jalankan perintah:

```
npm install gh-pages --save-dev
```

* 6. Perbarui `vite.config.js`untuk memasukkan nama repo Anda:

```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-to-gh-pages/',
  plugins: [react()],
})
```

* 7. Jalankan 'npm run build' di terminal Anda.

* 8. Tambahkan `/dist`folder ke repo Anda dengan menjalankan`git add dist -f`

* 9. Jalankan`git commit -m "Adding dist"`

* 10. Jalankan`git subtree push --prefix dist origin gh-pages`

* 11. Buka halaman GitHub Pages repo kamu untuk memastikan situs sudah live dengan tujuan hanya men-cek saja (Pergi ke Settings repo, cari “Pages” di panel kiri).

* 12. Untuk mengizinkan GitHub Action memperbarui bangunan kami, buka Settings > Actions > General > Workflow untuk memilih `Read and write permissions`dan klik "Simpan". Perubahan kami akan memungkinkan tindakan untuk memperbarui build di cabang gh-pages dengan setiap push ke cabang utama.

* 13. Tambahkan `.github/workflows/node.js.yml`di folder proyek root. Isi file dengan teks berikut:

    `# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node`

    `# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs`

    `name: Node.js CI`

    `on:`

    `push:`

    `branches: [ "main" ]`

    `pull_request:`

    `branches: [ "main" ]`

    `jobs:`

    `build:`

    `runs-on: ubuntu-latest`

    `strategy:`

    `matrix:`

    `node-version: [18.x]`

    `# See supported Node.js release schedule at https://nodejs.org/en/about/releases/`

    `steps:`

    `- uses: actions/checkout@v3`

    `- uses: actions/setup-node@v3`

    `with:`

    `node-version: '18.x'`

    `- run: npm install`

    `- run: npm run build`

    `- name: Deploy`

    `uses: peaceiris/actions-gh-pages@v3`

    `with:`

    `github_token: ${{ secrets.GITHUB_TOKEN }}`

    `publish_dir: ./dist`

* 14. Jalankan `git add .`

* 15. Jalankan`git commit -m "add GH Action"`

* 16. Jalankan`git push`

* 17. Buka aplikasi web GitHub Pages kamu untuk memastikan perubahan sudah diterapkan. Kamu bisa memantau prosesnya dengan klik tab “Actions” di navigasi atas.

Sumber: https://chihiro-and-justin.medium.com/deploy-a-react-vite-app-using-github-actions-and-github-pages-a370df30da97

? Lanjut ke Hari ke-7: Evaluasi Minggu 1
*/