/*
TODO: Tugas Hari kedelapan dan kesembilan


* 📘 Goal Minggu 2

    ! Tambahkan fitur penyimpanan todo ke localStorage, tampilkan status selesai, dan beri sedikit styling profesional.

* 📅 Hari 8–9: useEffect + localStorage

? 🎯 Tujuan:

    ! - Todo tetap tersimpan walau halaman di-refresh.
    ! - Mengenal side effect melalui useEffect.

* 📖 Konsep Singkat

? React memiliki hook bernama useEffect yang digunakan untuk:

    ! - Menjalankan kode setelah render.
    ! - Menyimpan data ke localStorage.
    ! - Mengambil data saat aplikasi dimuat pertama kali.

* 🧩 Langkah-langkah

? 1️⃣ Buka App.jsx

    ! Kita akan menambahkan dua useEffect: 
*/

import { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  // 🔹 Ambil data todo dari localStorage saat pertama kali render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // 🔹 Simpan ke localStorage setiap kali todos berubah
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

/*
* 2️⃣ Tes fitur

? 1. Jalankan: npm run dev

? 2. Tambahkan beberapa todo.

?  3. Refresh halaman.

    ! 👉 Todo seharusnya tetap ada! karena tersimpan di localStorage.

* 3️⃣ (Opsional) Cek di Browser

    ! Buka DevTools → Application → Local Storage → localhost:5173

    ! Kamu akan melihat key: todos dengan array value-nya.

* 📋 Checklist Hari 8–9

| Langkah                               | Status |
| ------------------------------------- | ------ |
| Tambahkan `useEffect` untuk load data | ☐      |
| Tambahkan `useEffect` untuk save data | ☐      |
| Tes persistensi (refresh browser)     | ☐      |

*/