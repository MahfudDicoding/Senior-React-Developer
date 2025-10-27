/*
TODO: Tugas Hari Ketiga dan Keempat

* 🎯 Tujuan:
Memungkinkan pengguna mengetik todo baru dan menambahkannya ke daftar dengan tombol.

✅ Langkah-Langkah Detail:
1. Tambahkan State untuk Menyimpan Todo List
Di App.jsx:

jsx
Salin kode
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // ← State utama
2. Tambahkan Input + Tombol
Masih di App.jsx, tambahkan:

jsx
Salin kode
  const [newTodo, setNewTodo] = useState(""); // ← Untuk input

  const handleAdd = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo(""); // Bersihkan input
  };

  return (
    <>
      <Header />
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Tambahkan todo"
      />
      <button onClick={handleAdd}>Tambah</button>

      <ul>
        {todos.map((item, index) => (
          <ListItem key={index} text={item} />
        ))}
      </ul>
    </>
  );
}
3. Perbarui ListItem.jsx (opsional)
jsx
Salin kode
export default function ListItem({ text }) {
  return <li>{text}</li>;
}
🧠 Penjelasan Singkat:
useState([]) menyimpan array dari todo.

useState("") menyimpan teks input user.

setTodos([...todos, newTodo]) menambah todo baru ke list.

todos.map(...) menampilkan semua item yang sudah ada.

✅ Checklist:
 Ada input dan tombol "Tambah"

 Setiap klik tombol menambah item ke list

 List ditampilkan dari useState

*/