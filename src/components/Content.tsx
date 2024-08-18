"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Button } from "@/components/ui/button"

export function Content() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] overflow-auto">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="overflow-y-auto flex-1">
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <Button onClick={() => window.open(active.ctaLink, '_blank')}>
                    {active.ctaText}
                  </Button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top filter blur-[1px] transition duration-200 ease-in-out hover:blur-none"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Awal Pergerakan Nasional",
    title: "1908-1942",
    src: "/bendera-indonesia.png",
    ctaText: "More Info",
    ctaLink: "https://www.kompas.com/skola/read/2020/01/30/060000269/pergerakan-nasional-di-indonesia-diawali-organisasi-budi-utomo?page=all",
    content: () => {
      return (
        <p>
          <b>Budi Utomo (1908)</b> <br />
          Budi Utomo didirikan pada 20 Mei 1908 oleh Dr. Soetomo dan mahasiswa STOVIA (School Tot Opleiding van Indische Artsen) di Jakarta. Organisasi ini adalah tonggak awal pergerakan nasionalisme di Indonesia, dengan tujuan meningkatkan pendidikan dan kesadaran bangsa. <br/><br/>
          <b>Sarekat Islam (1912)</b> <br />
          Sarekat Islam awalnya didirikan sebagai organisasi dagang untuk melindungi pedagang-pedagang pribumi dari persaingan pedagang asing, terutama Tionghoa. Namun, seiring waktu, organisasi ini berkembang menjadi salah satu organisasi politik terbesar dan berpengaruh dalam sejarah pergerakan nasional Indonesia, dengan tujuan memperjuangkan hak-hak rakyat Indonesia.<br/><br/>
          <b>Indische Partij (1912)</b> <br />
          Indische Partij didirikan oleh Tiga Serangkai: Douwes Dekker, Tjipto Mangunkusumo, dan Ki Hajar Dewantara. Ini adalah partai politik pertama di Hindia Belanda yang secara eksplisit menuntut kemerdekaan dari kolonialisme Belanda. <br/><br/>
          <b>Partai Nasional Indonesia (1927)</b> <br />
          Didirikan oleh Soekarno, Partai Nasional Indonesia (PNI) berfokus pada pencapaian kemerdekaan Indonesia melalui perlawanan tanpa kekerasan dan politik. Soekarno berhasil menggalang kekuatan dari berbagai kalangan untuk mendukung cita-cita kemerdekaan.
        </p>
      );
    },
  },
  {
    description: "Pendudukan Jepang",
    title: "1942-1945",
    src: "/jepang.png",
    ctaText: "More Info",
    ctaLink: "https://kebudayaan.kemdikbud.go.id/muspres/indonesia-dalam-pendudukan-jepang-1942-1945",
    content: () => {
      return (
        <p>
          <b>Invasi Jepang (1942)</b> <br/> Jepang menginvasi Indonesia pada Maret 1942, menggantikan pemerintahan kolonial Belanda. Selama masa pendudukan, Jepang memanfaatkan sumber daya Indonesia untuk perang, namun juga menjanjikan kemerdekaan untuk menarik dukungan rakyat Indonesia. <br/><br/>
          <b>Pembentukan BPUPKI (1945)</b> <br/> Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia (BPUPKI) dibentuk oleh Jepang sebagai langkah awal menuju kemerdekaan. Organisasi ini bertugas menyusun konstitusi dan dasar negara Indonesia merdeka. <br/><br/>
          <b>Pendidikan dan Pelatihan Militer</b> <br/> Selama pendudukan, Jepang memberikan pelatihan militer kepada pemuda Indonesia (seperti PETA) yang nantinya berperan penting dalam perjuangan fisik melawan Belanda setelah proklamasi.
        </p>
      );
    },
  },
  {
    description: "Proklamasi Kemerdekaan",
    title: "17 Agustus 1945",
    src: "/proklamasi.png",
    ctaText: "More Info",
    ctaLink: "https://id.wikipedia.org/wiki/Proklamasi_Kemerdekaan_Indonesia",
    content: () => {
      return (
        <p>
          <b>Kekalahan Jepang</b> <br/> Pada Agustus 1945, Jepang menyerah kepada Sekutu, meninggalkan kekosongan kekuasaan di Indonesia. Kesempatan ini digunakan oleh para pemimpin Indonesia untuk mendeklarasikan kemerdekaan. <br/><br/>
          <b>Rengasdengklok (16 Agustus 1945)</b> <br/> Sebelum proklamasi, Soekarno dan Hatta diculik oleh golongan muda ke Rengasdengklok untuk mendesak mereka segera memproklamasikan kemerdekaan. Akhirnya, setelah melalui perdebatan, diputuskan bahwa kemerdekaan akan diproklamasikan pada 17 Agustus 1945. <br/><br/>
          <b>Proklamasi (17 Agustus 1945)</b> <br/> Soekarno dan Hatta memproklamasikan kemerdekaan Indonesia di kediaman Soekarno, Jalan Pegangsaan Timur No. 56, Jakarta. Proklamasi ini menandai lahirnya Republik Indonesia yang merdeka. 
        </p>
      );
    },
  },
  {
    description: "Mempertahankan Kemerdekaan",
    title: "1945-1949",
    src: "/1949.png",
    ctaText: "More Info",
    ctaLink: "https://id.wikipedia.org/wiki/Revolusi_Nasional_Indonesia",
    content: () => {
      return (
        <p>
          <b>Agresi Militer Belanda</b><br/> Setelah proklamasi, Belanda berusaha kembali menguasai Indonesia melalui Agresi Militer I (1947) dan II (1948). Namun, perlawanan gigih dari rakyat dan tentara Indonesia, serta tekanan internasional, menghambat usaha Belanda.<br/><br/>
          <b>Diplomasi dan Perundingan</b><br/> Berbagai perundingan dilakukan, seperti Perundingan Linggarjati (1947) dan Perundingan Renville (1948), meskipun hasilnya tidak selalu memuaskan Indonesia. Namun, upaya diplomasi terus dilanjutkan untuk mencapai pengakuan kedaulatan.<br/><br/>
          <b>Konferensi Meja Bundar (1949)</b><br/> Setelah tekanan dari internasional dan perjuangan rakyat, akhirnya pada 27 Desember 1949, Belanda mengakui kedaulatan Indonesia melalui Konferensi Meja Bundar (KMB) di Den Haag, Belanda. Indonesia diakui sebagai negara berdaulat dengan nama Republik Indonesia Serikat (RIS).
        </p>
      );
    },
  },
  {
    description: "Masa Awal Kemerdekaan",
    title: "1950-an hingga 1960-an",
    src: "/awal-kemerdekaan.png",
    ctaText: "More Info",
    ctaLink: "https://cimahikota.go.id/index.php/artikel/detail/1221-sejarah-indonesia-",
    content: () => {
      return (
        <p>
          <b>Kembali ke NKRI (1950)</b><br/> Pada 17 Agustus 1950, Indonesia kembali menjadi Negara Kesatuan Republik Indonesia (NKRI), menggantikan Republik Indonesia Serikat (RIS).<br/><br/>
          <b>Demokrasi Liberal (1950-1959)</b><br/> Periode ini ditandai dengan pergantian kabinet yang sering dan ketidakstabilan politik, serta beberapa pemberontakan di berbagai daerah.<br/><br/>
          <b>Dekrit Presiden (1959)</b><br/> Soekarno mengeluarkan Dekrit Presiden pada 5 Juli 1959, mengembalikan konstitusi 1945 dan memulai era Demokrasi Terpimpin, di mana Soekarno memegang kendali penuh.
        </p>
      );
    },
  },
  {
    description: "Orde Baru",
    title: "1966-1998",
    src: "/orde-baru.png",
    ctaText: "More Info",
    ctaLink: "https://id.wikipedia.org/wiki/Orde_Baru",
    content: () => {
      return (
        <p>
          <b>Awal Orde Baru (1966)</b><br/> Soeharto naik ke tampuk kekuasaan setelah mengakhiri era Demokrasi Terpimpin Soekarno. Periode ini ditandai dengan upaya stabilisasi ekonomi dan politik serta penumpasan Gerakan 30 September/PKI.<br/><br/>
          <b>Pembangunan Nasional (1970-an)</b><br/> Orde Baru menjalankan program pembangunan yang ambisius melalui Repelita (Rencana Pembangunan Lima Tahun). Pada saat ini, terjadi pertumbuhan ekonomi yang pesat, namun juga disertai dengan korupsi, kolusi, dan nepotisme.<br/><br/>
          <b>Reformasi (1998)</b><br/> Krisis ekonomi pada akhir 1990-an dan ketidakpuasan terhadap pemerintahan yang otoriter memicu gerakan mahasiswa dan rakyat yang akhirnya menggulingkan Soeharto dari kekuasaan pada Mei 1998.
        </p>
      );
    },
  },
  {
    description: "Era Reformasi",
    title: "1998-2004",
    src: "/reformasi.png",
    ctaText: "More Info",
    ctaLink: "https://id.wikipedia.org/wiki/Reformasi_(Indonesia)",
    content: () => {
      return (
        <p>
          <b>Krisis Ekonomi dan Kejatuhan Suharto (1998)</b> <br/> Krisis ekonomi Asia memperburuk kondisi sosial dan politik di Indonesia, yang berujung pada demonstrasi besar-besaran. Suharto akhirnya mundur pada Mei 1998.<br/><br/>
          <b>Reformasi</b><br/>Setelah jatuhnya Suharto, Indonesia memasuki era Reformasi yang membawa perubahan besar seperti desentralisasi, kebebasan pers, dan penguatan lembaga-lembaga demokrasi.<br/><br/>
          <b>Pemilihan Umum Pertama di Era Reformasi (1999)</b>Pemilu pertama di era Reformasi berlangsung pada tahun 1999, menandai dimulainya demokrasi yang lebih terbuka di Indonesia.
        </p>
      );
    },
  },
  {
    description: "Indonesia Modern",
    title: "2004-sekarang",
    src: "/jakarta.png",
    ctaText: "More Info",
    ctaLink: "https://www.setneg.go.id/baca/index/pidato_kenegaraan_terakhir_presiden_jokowi_sampaikan_permohonan_maaf_dan_harapan_untuk_indonesia_emas_2045",
    content: () => {
      return (
        <p>
          <b>Konsolidasi Demokrasi</b> <br/> Indonesia telah melaksanakan beberapa pemilihan umum yang bebas dan adil sejak era Reformasi, memperkuat sistem demokrasi yang ada.<br/><br/>

          <b>Ekonomi dan Peran Global</b> <br/> Sebagai ekonomi terbesar di Asia Tenggara, Indonesia memainkan peran penting di tingkat regional dan global, baik dalam ekonomi maupun politik.<br/><br/>

          <b>Tantangan dan Peluang</b> <br/> Indonesia menghadapi berbagai tantangan seperti korupsi, ketimpangan sosial, dan masalah lingkungan, namun juga memiliki banyak peluang untuk berkembang sebagai negara demokratis dan makmur.
        </p>
      );
    },
  },
];