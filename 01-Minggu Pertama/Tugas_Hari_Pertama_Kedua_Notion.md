# Tugas Hari Pertama dan Kedua

## 🎯 Goal Minggu 1
**Todo List + Hello React + JSX**

Berikut langkah praktis dan terstruktur yang bisa langsung kamu mulai:

---

## 🚀 Langkah-Langkah Minggu 1 (Project Todo List Mini)

### 📌 Hari 1: Setup Project React + JSX

**✅ Apa yang dilakukan:**

1. Buat folder baru proyek React kamu.
2. Jalankan perintah untuk inisialisasi proyek:

```bash
npm create vite@latest my-todo-app -- --template react
cd my-todo-app
npm install
npm run dev
```

3. Buka di browser: [http://localhost:5173/](http://localhost:5173/)
4. Edit file `App.jsx` dan tampilkan:

```jsx
<h1>Hello React</h1>
```

---

### 📌 Hari 2: Buat Komponen Dasar (Header, ListItem)

**✅ Apa yang dilakukan:**

1. Buat folder baru `src/components/`
2. Tambahkan file:
   - `Header.jsx`
   - `ListItem.jsx`
3. Isi awalnya bisa seperti ini:

```jsx
// Header.jsx
export default function Header() {
  return <h2>Todo List</h2>;
}

// ListItem.jsx
export default function ListItem({ text }) {
  return <li>{text}</li>;
}
```

4. Import dan render di `App.jsx`:

```jsx
import Header from './components/Header';
import ListItem from './components/ListItem';

function App() {
  return (
    <>
      <Header />
      <ul>
        <ListItem text="Belajar React" />
        <ListItem text="Kerjakan tugas" />
      </ul>
    </>
  );
}

export default App;
```
