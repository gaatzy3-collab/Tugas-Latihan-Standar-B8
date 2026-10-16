# Catatan Buku (Tugas Latihan Standar B8)

Antarmuka frontend untuk API latihan "Catatan Buku", dikerjakan sebagai tugas latihan standar track Frontend Web PT. LSKK. Fitur: login, daftar catatan dengan pagination, serta form tambah dan edit.

> Backend belum tersedia. Semua request tetap memakai instance Axios (`src/lib/axios.ts`), tetapi dijawab oleh `axios-mock-adapter` yang menyimpan data ke `localStorage` dan mengembalikan bentuk `IResponseEntity<T>`. Saat backend siap, cukup isi `VITE_API_URL` dan set `VITE_USE_MOCK=false` tanpa mengubah service maupun komponen.

## Stack

- TypeScript, React (functional components), Vite
- Tailwind CSS (mobile-first) dan Ant Design
- MUI X Data Grid untuk tabel daftar
- Axios (instance + interceptor token), axios-mock-adapter, dan TanStack Query
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

## Konfigurasi environment

Salin `.env.example` menjadi `.env` jika ingin mengubah pengaturan. Tanpa file `.env`, mock tetap aktif.

| Variabel        | Fungsi                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| `VITE_API_URL`  | URL backend. Kosongkan selama memakai mock.                               |
| `VITE_USE_MOCK` | `true` memakai mock adapter (bawaan). Set `false` saat backend sudah ada. |

File `.env` tidak boleh di-commit.

## Endpoint mock

| Method   | Path              | Fungsi                           |
| -------- | ----------------- | -------------------------------- |
| `POST`   | `/auth/login`     | Login, mengembalikan token       |
| `GET`    | `/book-notes`     | Daftar catatan (`page`, `limit`) |
| `GET`    | `/book-notes/:id` | Detail satu catatan              |
| `POST`   | `/book-notes`     | Tambah catatan                   |
| `PUT`    | `/book-notes/:id` | Ubah catatan                     |
| `DELETE` | `/book-notes/:id` | Hapus catatan                    |

Semua response memakai `IResponseEntity<T>`, dan daftar catatan menyertakan `meta` (`ImetaPagination`).

## Struktur folder

```
src/
├── components/   # ProtectedRoute, PublicOnlyRoute, BookNoteActions
├── data/         # data awal (dummy)
├── hooks/        # hook TanStack Query (useBookNotes, dst.)
├── lib/          # axios instance, helper pesan error
├── mocks/        # axios-mock-adapter: handler dan penyimpanan localStorage
├── pages/        # Login, List, Form, dan lazy.tsx (lazy loading)
├── schemas/      # skema Zod
├── services/     # pemanggilan API lewat instance Axios
├── stores/       # Zustand (authStore)
├── types/        # IResponseEntity, ImetaPagination, BookNote
├── router.tsx    # createHashRouter
└── main.tsx      # entry point, mengaktifkan mock jika VITE_USE_MOCK bukan "false"
```

## Catatan

- Seluruh response API memakai `IResponseEntity<T>`. Pesan error untuk pengguna diambil dari field `message`, dan kode 500 ditampilkan sebagai pesan generik.
- Halaman dimuat dengan lazy loading (`React.lazy` dan `Suspense`).
- Komponen baris tabel dan handler pada halaman List dimemoize (`React.memo`, `useMemo`, `useCallback`).
- Alamat aplikasi memakai hash, misalnya `http://localhost:5173/#/login`.
