/* ==========================================================
   ISI PORTOFOLIO DI SINI. Kamu cukup edit file ini.
   Tidak perlu menyentuh index.html.

   Cara menambah item:
   1. Salin satu blok { ... } lalu tempel di bawahnya (jangan lupa koma).
   2. Taruh gambarnya di folder yang sesuai:
        images/projects/       untuk gambar proyek
        images/certificates/   untuk gambar sertifikat
   3. Tulis nama file gambarnya di baris "image".
   Jika gambar belum ada, otomatis tampil kotak placeholder.
   ========================================================== */

window.PORTFOLIO = {

  /* ---------- PROJECTS ---------- */
  projects: [
    {
      title: "Nama proyek pertama",
      desc: "Jelaskan proyek ini dalam dua kalimat: apa yang dibuat, untuk siapa, dan peran kamu.",
      image: "images/projects/proyek-1.jpg",
      tags: ["HTML", "CSS", "JavaScript"],
      demo: "",   // link demo, kosongkan jika belum ada
      code: ""    // link GitHub, kosongkan jika belum ada
    },
    {
      title: "Nama proyek kedua",
      desc: "Jelaskan proyek ini dalam dua kalimat.",
      image: "images/projects/proyek-2.jpg",
      tags: ["Python"],
      demo: "",
      code: ""
    },
    {
      title: "Nama proyek ketiga",
      desc: "Jelaskan proyek ini dalam dua kalimat.",
      image: "images/projects/proyek-3.jpg",
      tags: ["Figma"],
      demo: "",
      code: ""
    }
  ],

  /* ---------- CERTIFICATES ---------- */
  certificates: [
    {
      title: "Pelatihan Gemini Academy & Beasiswa Sertifikasi Google Academy",
      issuer: "Penerbit Google & Gemini Academy",
      date: "Kamis, 19 November 2026",
      image: "images/certificates/sertifikat1.jpeg"
    },
    {
      title: "Peran Muslim IT Dalam Membangun Peradaban Di Eradigital",
      issuer: "Penerbit UKM LDK Majelis JIhad",
      date: "10 Oktober 2026",
      image: "images/certificates/sertifikat2.jpeg"
    }
  ],

  /* ---------- ACHIEVEMENTS ---------- */
  achievements: [
    {
      title: "Nama prestasi atau lomba",
      detail: "Tulis peringkat, penyelenggara, atau hal yang kamu capai.",
      year: "2026"
    }
  ],

  /* ---------- TECH STACK ----------
     "icon" adalah nama ikon dari devicon.dev (contoh: "python", "react",
     "php", "mysql", "cplusplus", "java", "nodejs"). Isi "" untuk memakai
     huruf pertama. "invert: true" membalik warna ikon yang hitam. */
  stack: [
    { name: "HTML5",      icon: "html5" },
    { name: "CSS3",       icon: "css3" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Python",     icon: "python" },
    { name: "Git",        icon: "git" },
    { name: "GitHub",     icon: "github", invert: true },
    { name: "VS Code",    icon: "vscode" },
    { name: "Figma",      icon: "figma" },
    { name: "Laragon",    image: "images/tech/laragon.jpeg" }
  ]
};
