# Tugas Hari Kelima dan Keenam

## 📌 Hari 5–6: Refactor + Deploy
**Fokus:** Rapikan struktur kode (refactor) dan publish project ke internet (deploy).

---

## ✅ Langkah 1: Refactor Komponen

### 🔹 1.1. Pisahkan Komponen

| Komponen     | Isi / Tanggung Jawab |
|--------------|-----------------------|
| `Header.jsx` | Judul halaman (misalnya `<h1>Todo List`) |
| `TodoForm.jsx` | Input dan tombol tambah |
| `TodoList.jsx` | Menampilkan daftar todo |
| `ListItem.jsx` | Menampilkan satu todo item |

---

### 🔹 1.2. Contoh Struktur Folder

```
src/
├── App.jsx
├── components/
│   ├── Header.jsx
│   ├── TodoForm.jsx
│   ├── TodoList.jsx   ← ← ← Panggil ListItem di sini
│   └── ListItem.jsx   ← ← ← Digunakan oleh TodoList
```

---

### ✅ 1.3. `TodoForm.jsx`
**Tanggung jawab:** Menangani input dan tombol tambah

```jsx
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
```

🧠 **Penjelasan Singkat:**
- `inputValue` → menyimpan nilai input saat user mengetik.  
- `onAdd(inputValue)` → memanggil fungsi dari `App.jsx` untuk menambahkan todo.  
- Setelah submit, input dikosongkan lagi (`setInputValue('')`).  

---

### ✅ 1.4. `TodoList.jsx`
**Tanggung jawab:** Menampilkan daftar todo item

```jsx
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
```

🧠 **Penjelasan Singkat:**
- Menerima array `todos` dari `App.jsx`.  
- `map()` digunakan untuk render setiap todo sebagai `<li>`.  
- Gunakan `key={index}` sebagai identifikasi (meskipun sebaiknya gunakan `id` unik di real project — tapi ini cukup untuk mini project awal).  

---

### 🔹 1.5. Refactor `App.jsx`
Setelah refactor, `App.jsx` akan terlihat seperti ini:

```jsx
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
```

---

## ✅ Langkah 2: Minta Feedback
Kamu bisa kirimkan:
- Screenshot atau isi file `App.jsx` dan komponen-komponennya.  
- Atau repo GitHub-nya.  

Aku akan bantu:
- Review apakah komponen sudah reusable.  
- Cek penamaan dan struktur folder.  
- Kasih saran improvement jika ada.  

---

## ✅ Langkah 3: Deploy React Vite ke GitHub Pages

Setelah jadi aplikasi di Vite, langkah selanjutnya adalah melakukan deploy ke GitHub Pages.  
Untuk memudahkan proses deploy, kita gunakan **GitHub Actions**.

### 3.1. Edit `index.html`
```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
<!-- GANTI JADI -->
<link rel="icon" type="image/svg+xml" href="./vite.svg" />
```

### 3.2. Inisialisasi Git Repo
```bash
git init
git add .
git commit -m "init vite project"
```

### 3.3. Buat Repositori GitHub Baru
- Pastikan **Publik** dipilih agar bisa di-host di GitHub Pages.

### 3.4. Tambahkan Remote dan Push
```bash
git remote add origin git@github.com:username/vite-deploy-demo.git
git branch -M main
git push -u origin main
```

### 3.5. Install `gh-pages`
```bash
npm install gh-pages --save-dev
```

### 3.6. Update `vite.config.js`
```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-to-gh-pages/',
  plugins: [react()],
})
```

### 3.7. Build Project
```bash
npm run build
```

### 3.8. Commit dan Push Dist Folder
```bash
git add dist -f
git commit -m "Adding dist"
git subtree push --prefix dist origin gh-pages
```

### 3.9. Aktifkan GitHub Actions
- Buka Settings → Actions → General → Workflow.  
- Pilih **Read and write permissions** → klik **Simpan**.

### 3.10. Tambahkan Workflow GitHub Actions
Buat file `.github/workflows/node.js.yml`:

```yaml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - run: npm install
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3.11. Commit & Push Workflow
```bash
git add .
git commit -m "add GH Action"
git push
```

### 3.12. Cek GitHub Pages
- Pergi ke tab **Actions** untuk memantau proses.  
- Pastikan aplikasi sudah live di GitHub Pages.  

---

📌 **Sumber:** [Tutorial Medium](https://chihiro-and-justin.medium.com/deploy-a-react-vite-app-using-github-actions-and-github-pages-a370df30da97)  

---

➡️ Lanjut ke **Hari ke-7: Evaluasi Minggu 1**
