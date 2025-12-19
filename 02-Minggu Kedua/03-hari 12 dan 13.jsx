/*
TODO: 📅 Hari 12–13: Styling Modern dengan Tailwind CSS

* 🎯 Tujuan:

  ! - Mengenal Tailwind CSS, framework styling yang populer di kalangan React Developer.

  ! - Membuat tampilan todo-list yang modern dan responsif.

  ! - Latihan berpikir seperti Front-End Engineer profesional (struktur + UI/UX).

* 🧩 Langkah-langkah

? 1️⃣ Instalasi Tailwind CSS di Vite

! Jalankan perintah di terminal proyek kamu:

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

* 2️⃣ Konfigurasi file tailwind.config.js

? Buka file tailwind.config.js

! Lalu ubah bagian content jadi seperti ini:

*/

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};


/*
* 3️⃣ Tambahkan Tailwind ke file CSS utama

? Buka file src/index.css, lalu ganti isinya jadi:

@tailwind base;
@tailwind components;
@tailwind utilities;

? 4️⃣ Tambahkan gaya ke komponen

! 📁 App.jsx
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6">
        <Header />
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

! 📁 Header.jsx
export default function Header() {
  return (
    <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
      📝 Todo List
    </h2>
  );
}

! 📁 TodoForm.jsx
import { useState } from "react";

function TodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Tambah todo..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
      >
        Tambah
      </button>
    </form>
  );
}

export default TodoForm;

! 📁 ListItem.jsx
export default function ListItem({ text, completed, onToggle }) {
  return (
    <li
      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
        completed ? "line-through text-gray-500" : ""
      }`}
      onClick={onToggle}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="accent-blue-600"
      />
      <span>{text}</span>
    </li>
  );
}

! 📁 TodoList.jsx
import ListItem from "./ListItem";

function TodoList({ todos, onToggle }) {
  return (
    <ul className="space-y-2">
      {todos.map((todo, index) => (
        <ListItem
          key={index}
          text={todo.text}
          completed={todo.completed}
          onToggle={() => onToggle(index)}
        />
      ))}
    </ul>
  );
}

export default TodoList;

* 5️⃣ Jalankan dan lihat hasilnya 🎉

npm run dev


? - Harusnya aplikasi todo-mu sekarang:

  ! - Sudah berwarna, modern, dan responsif.

  ! - Tetap menyimpan data ke localStorage.

  ! - Punya pengalaman UI seperti app profesional.

* ✅ Checklist Hari 12–13

| Langkah                          | Status |
| -------------------------------- | ------ |
| Instal Tailwind CSS              | ☐      |
| Konfigurasi `tailwind.config.js` | ☐      |
| Gaya modern di semua komponen    | ☐      |
| Tes tampilan di browser          | ☐      |


*/
