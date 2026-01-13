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

### Lihat isi Deploy....md

➡️ Lanjut ke **Hari ke-7: Evaluasi Minggu 1**
