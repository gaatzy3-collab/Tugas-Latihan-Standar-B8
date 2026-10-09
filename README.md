# Catatan Buku (Tugas Latihan Standar B8)

Antarmuka frontend untuk API latihan "Catatan Buku", dikerjakan sebagai tugas latihan standar track Frontend Web PT. LSKK. Fitur: login, daftar catatan dengan pagination, serta form tambah dan edit.

> Backend belum tersedia, jadi data berasal dari service mock yang menyimpan ke `localStorage` dan mengembalikan bentuk `IResponseEntity<T>`. Saat backend siap, cukup ganti isi service ke Axios tanpa mengubah komponen.

## Stack

- TypeScript, React (functional components), Vite
- Tailwind CSS (mobile-first) dan Ant Design
- MUI X Data Grid untuk tabel daftar
- Axios (instance + interceptor token) dan TanStack Query
- Zustand (state auth, persist)
- React Router `createHashRouter` dengan `ProtectedRoute`
- React Hook Form + Zod
- ESLint (default Vite) dan Prettier

## Menjalankan project

```bash
npm install
npm run dev
```

| Perintah               | Fungsi                         |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Menjalankan server development |
| `npm run build`        | Type-check dan build produksi  |
| `npm run lint`         | Menjalankan ESLint             |
| `npm run format`       | Memformat kode dengan Prettier |
| `npm run format:check` | Mengecek format tanpa mengubah |

Login memakai simulasi: email dan password bebas, selama format email valid.

## Struktur folder

```
src/
├── components/   # ProtectedRoute, PublicOnlyRoute
├── data/         # data awal (dummy)
├── hooks/        # hook TanStack Query (useBookNotes, dst.)
├── lib/          # axios instance, helper pesan error
├── pages/        # Login, List, Form, dan lazy.tsx (lazy loading)
├── schemas/      # skema Zod
├── services/     # service mock (auth, catatan buku)
├── stores/       # Zustand (authStore)
├── types/        # IResponseEntity, ImetaPagination, BookNote
├── router.tsx    # createHashRouter
└── main.tsx
```

## Catatan

- Seluruh response API memakai `IResponseEntity<T>`. Pesan error untuk pengguna diambil dari field `message`, dan kode 500 ditampilkan sebagai pesan generik.
- Halaman dimuat dengan lazy loading (`React.lazy` dan `Suspense`).
- Alamat aplikasi memakai hash, misalnya `http://localhost:5173/#/login`.
