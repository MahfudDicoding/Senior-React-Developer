/*
TODO: Tugas Hari Pertama dan Kedua

* Untuk mencapai Goal Minggu 1: "Todo List + Hello React + JSX", berikut langkah praktis dan terstruktur yang bisa langsung kamu mulai:

! 🚀 Langkah-Langkah Minggu 1 (Project Todo List Mini)

*  📌 Hari 1: Setup Project React + JSX

    ? ✅ Apa yang dilakukan:

    * Buat folder baru proyek React kamu.

    * Jalankan perintah untuk inisialisasi proyek:


        npm create vite@latest my-todo-app -- --template react

        cd my-todo-app
        npm install
        npm run dev

    * Buka di browser: http://localhost:5173/

    * Edit file App.jsx dan tampilkan:

        <h1>Hello React</h1>

* 📌 Hari 2: Buat Komponen Dasar (Header, ListItem)

    ? ✅ Apa yang dilakukan:

    * Buat folder baru src/components/

    * Tambahkan file:

        Header.jsx

        ListItem.jsx

    * Isi awalnya bisa seperti ini:

        // Header.jsx
        export default function Header() {
        return <h2>Todo List</h2>;
        }

        // ListItem.jsx
        export default function ListItem({ text }) {
        return <li>{text}</li>;
        }
    
    * Import dan render di App.jsx:

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
*/