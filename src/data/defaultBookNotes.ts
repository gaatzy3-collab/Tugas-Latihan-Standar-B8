import type { BookNote } from '../types/bookNote'

export const defaultBookNotes: BookNote[] = [
  {
    id: 1,
    title: 'Clean Code',
    content: 'Nama variabel harus bermakna dan fungsi sebaiknya kecil.',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    content: 'Perubahan kecil yang konsisten lebih efektif daripada target besar.',
  },
  {
    id: 3,
    title: 'The Pragmatic Programmer',
    content: 'Jangan mengulang kode (DRY) dan selalu tulis tes.',
  },
  {
    id: 4,
    title: 'Laskar Pelangi',
    content: 'Semangat belajar tetap menyala meski fasilitas terbatas.',
  },
  { id: 5, title: 'Filosofi Teras', content: 'Fokus pada hal yang bisa dikendalikan.' },
  {
    id: 6,
    title: 'Deep Work',
    content: 'Kerja fokus tanpa gangguan menghasilkan karya bernilai.',
  },
  {
    id: 7,
    title: 'Sapiens',
    content: 'Cerita bersama membuat manusia mampu bekerja sama dalam skala besar.',
  },
  {
    id: 8,
    title: 'Bumi Manusia',
    content: 'Catatan tentang pendidikan dan keadilan pada masa kolonial.',
  },
]
