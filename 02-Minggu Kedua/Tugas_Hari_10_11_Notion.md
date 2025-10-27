# 📅 Hari 10–11: Menandai Todo Selesai (Checkbox)

## 🎯 Tujuan
- Setiap todo bisa diberi status selesai / belum.
- Ketika todo selesai → teks berubah gaya (misalnya coret).
- Semua status tetap tersimpan di localStorage (karena kamu sudah punya useEffect!).

---

## 🧩 Langkah-langkah

### 1️⃣ Ubah struktur todos jadi objek
Sebelumnya `todos` kamu berupa array of string, contoh:

```js
["Belajar React", "Makan siang"]
```

Sekarang ubah jadi array of object:

```js
[
  { text: "Belajar React", completed: false },
  { text: "Makan siang", completed: true }
]
```

---

### 2️⃣ Ubah fungsi addTodo di App.jsx
```js
const addTodo = (newTodo) => {
  if (!newTodo.trim()) return;
  const updatedTodos = [...todos, { text: newTodo, completed: false }];
  setTodos(updatedTodos);
};
```

---

### 3️⃣ Tambahkan fungsi toggleTodo
```js
const toggleTodo = (index) => {
  const updatedTodos = todos.map((todo, i) =>
    i === index ? { ...todo, completed: !todo.completed } : todo
  );
  setTodos(updatedTodos);
};
```

---

### 4️⃣ Kirim toggleTodo ke TodoList
```js
<TodoList todos={todos} onToggle={toggleTodo} />
```

---

### 5️⃣ Ubah TodoList.jsx
```js
import ListItem from "./ListItem";

function TodoList({ todos, onToggle }) {
  return (
    <ul>
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
```

---

### 6️⃣ Ubah ListItem.jsx
```js
export default function ListItem({ text, completed, onToggle }) {
  return (
    <li
      onClick={onToggle}
      style={{
        cursor: "pointer",
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        style={{ marginRight: "8px" }}
      />
      {text}
    </li>
  );
}
```

---

### 7️⃣ Tes Aplikasi
1. Jalankan `npm run dev`
2. Tambahkan beberapa todo
3. Klik checkbox → todo dicoret ✨
4. Refresh browser → status tetap tersimpan (berkat useEffect minggu lalu!)

---

## ✅ Checklist Hari 10–11
| Langkah | Status |
|----------|--------|
| Ubah todos jadi array of object | ☐ |
| Tambahkan toggleTodo | ☐ |
| Implement checkbox di ListItem | ☐ |
| Pastikan status persist di localStorage | ☐ |
