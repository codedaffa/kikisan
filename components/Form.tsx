import React, { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  ScissorsIcon,
} from "@heroicons/react/24/solid";
import Button from "./Button";
import * as ExcelJS from "exceljs";
import { Monitoring } from "@/types/Monitoring";
import { Stats } from "./Stats";
import Charts from "./Charts";
import Script from "next/script";
import { motion } from 'framer-motion';
import Ngrok from "@/types/Ngrok";

const pilih = [{ name: "Pilih Metode", value: "", link: "" }];
const people = [
  {
    name: "Metode Httpx",
    value: "httpx",
    link: Ngrok.getUrl('httpx') + "/httpx",
  },
  {
    name: "Metode Async Httpx",
    value: "asynchttpx",
    link: Ngrok.getUrl('asynchttpx') + "/asynchttpx",
  },
  {
    name: "Metode Thread Httpx",
    value: "threadhttpx",
    link: Ngrok.getUrl('threadhttpx') + "/threadhttpx",
  },
  {
    name: "Metode Async Playwright",
    value: "playwright",
    link: Ngrok.getUrl('playwright') + "/playwright",
  },
  {
    name: "Metode Async Playwright Httpx",
    value: "playwrighthttpx",
    link: Ngrok.getUrl('playwrighthttpx') + "/playwrighthttpx",
  },
  {
    name: "Metode Thread Selenium",
    value: "selenium",
    link: Ngrok.getUrl('selenium') + "/selenium",
  },
  {
    name: "Metode Thread Selenium Httpx",
    value: "seleniumhttpx",
    link: Ngrok.getUrl('seleniumhttpx') + "/seleniumhttpx",
  },
];

function Form() {
  const [selected, setSelected] = useState(pilih[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<Monitoring | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const constraintsRef = useRef(null)

  const onSubmit = async (data: any) => {
    data.metode = selected.value;
    setIsLoading(true);
    try {
      const response = await fetch(selected.link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.hasil && responseData.hasil.length > 0) {
          const monitorings: Monitoring = {
            cpu_core: responseData.cpu_core,
            cpu_list: responseData.cpu_list,
            cpu_rata: responseData.cpu_rata,
            cpu_type: responseData.cpu_type,
            durasi: responseData.durasi,
            jumlah_data: responseData.jumlah_data,
            user_agent: responseData.user_agent,
            keyword: responseData.keyword,
            metode: responseData.metode,
            pagination: responseData.pagination,
            paket_download: responseData.paket_download,
            paket_internet: responseData.paket_internet,
            paket_upload: responseData.paket_upload,
            ram_list: responseData.ram_list,
            ram_rata: responseData.ram_rata,
            ram_tersedia: responseData.ram_tersedia,
            ram_total: responseData.ram_total,
            waktu_list: responseData.waktu_list,
          };
          // Lakukan tindakan lain dengan responseData
          setResult(monitorings);
          handleExportToExcel(responseData);
          // onConfettiLoad();
          console.log(responseData)
        }
      } else {
        console.error("Request failed with status:", response.status);
        // Lakukan penanganan kesalahan jika diperlukan
      }
    } catch (error) {
      console.error("Error:", error);
      // Lakukan penanganan kesalahan jika diperlukan
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Lakukan scrolling otomatis ketika komponen dipasangkan
    if (scrollRef.current) {
      // scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
          window.scroll({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 2000);
    }
  }, [result]);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js" />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <motion.div ref={constraintsRef} className="container mx-8 bg-gray-900 rounded-lg p-14">
        <h1 className="flex items-center justify-center text-center font-bold text-green-500 text-4xl">
      Kikisan.
      {/* <span className="site text-gray-100">.</span> */}
      <motion.span
        drag
        whileDrag={{ scale: 1.2 }}
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        dragPropagation
        className="site text-gray-100"
        initial={{ rotate: 0, y: -50 }}
        animate={{
          rotate: [0, 30, 0], // Animasi perubahan posisi vertikal dari 0 ke -20 kembali ke 0
          y: [22, 22, 22],
        }}
        transition={{
          duration: 3, // Durasi animasi (dalam detik)
          repeat: Infinity, // Mengulangi animasi secara tak terbatas
          repeatType: "reverse", // Memutar animasi mundur setelah mencapai akhir
          ease: "easeInOut", // Efek transisi animasi
        }}
      >
            .site
            </motion.span>
        </h1>
          <p className="mx-auto font-normal text-center text-gray-100 text-base my-8 max-w-3xl">
            Dengan menggunakan Kikisan.site, Anda dapat menguji
            teknik scraping dengan tujuh metode yang telah disediakan.
            Kikisan.site mengakses dan melakukan scraping pada halaman
            pencarian produk, halaman detail produk, dan halaman toko dari
            platform online shop. Setelah proses scraping selesai, hasilnya akan
            tersedia dalam format data Excel yang diunduh secara otomatis.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-2/5">
                  <Listbox.Button className="relative w-full cursor-default rounded-l-lg bg-green-500  py-3 pl-3 pr-10 text-left shadow-xl focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-gray-100 font-bold">
                      {selected.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-100"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 text-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {people.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-green-500 text-gray-100"
                                : "text-gray-900"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>

              <div className="relative w-full rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">
                    <MagnifyingGlassIcon className="w-6" />
                  </span>
                </div>
                <input
                  type="text"
                  id="keyword"
                  className="block w-full rounded-r-lg border-0 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                  placeholder="Scraping ke Tokopedia"
                  required
                  {...register("keyword")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <input
                    type="number"
                    id="pagination"
                    className="block w-24 shadow-md rounded-md text-center font-semibold border-0 py-1 pl-3 pr-3 mr-4 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                    placeholder="0"
                    defaultValue={0}
                    required
                    {...register("pages", { valueAsNumber: true })}
                    onChange={(e) => {
                      const value = Number(e.target.value); // Convert value to a number
                      if (value < 0 || isNaN(value)) {
                        e.target.value = "0";
                      } else if (value > 100) {
                        e.target.value = "100";
                      }
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                style="bg-green-500 text-gray-100 bg-green-500 rounded-lg border border-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                icon={<ScissorsIcon className="w-6 h-6" />}
                loadingStyle="h-5 w-5"
              />
            </div>
          </form>
        </motion.div>
      </div>
      {result && (
          <div ref={scrollRef}>
            <Charts monitoring={result} />
            <Stats monitoring={result} />
          </div>
      )}
    </>
  );
}

const handleExportToExcel = (data: any) => {
  const updatedData = data.hasil.map((item: any, index: any) => {
    const updatedItem = { ...item };
    updatedItem.no = index + 1;
    updatedItem.produk_details = JSON.stringify(updatedItem.produk_details);
    updatedItem.produk_items = JSON.stringify(updatedItem.produk_items);
    return updatedItem;
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  // Menambahkan kolom "No" di awal data
  const dataWithNo = updatedData.map((item: any) => {
    const { no, produk_link,
      produk_nama,
      produk_harga,
      produk_terjual,
      produk_rating,
      produk_diskon,
      produk_harga_sebelum_diskon,
      produk_items,
      produk_details,
      produk_keterangan,
      toko_link,
      toko_nama,
      toko_status,
      toko_lokasi,
      toko_Rating_Ulasan,
      toko_Jam_operasi, ...rest } = item;
    return { No: no, produk_link: produk_link,
      produk_nama:produk_nama,
      produk_harga:produk_harga,
      produk_terjual:produk_terjual,
      produk_rating:produk_rating,
      produk_diskon:produk_diskon,
      produk_harga_sebelum_diskon:produk_harga_sebelum_diskon,
      produk_items:produk_items,
      produk_details:produk_details,
      produk_deskripsi:produk_keterangan,
      toko_link:toko_link,
      toko_nama:toko_nama,
      toko_status:toko_status,
      toko_lokasi:toko_lokasi,
      toko_Rating_Ulasan:toko_Rating_Ulasan,
      toko_Jam_operasional:toko_Jam_operasi, ...rest };
  });

  // Mengisi header dan data ke worksheet
  const headerRow = worksheet.getRow(1);
  headerRow.height = 50; // Mengatur ukuran tinggi baris header menjadi 30
  if (dataWithNo && dataWithNo.length > 0) {
    const headers = Object.keys(dataWithNo[0]);
    if (headers.length > 0) {
      headers.forEach((header, index) => {
        const cell = headerRow.getCell(index + 1);
        cell.value = header;
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ff41b549" }, // Background color
        };
        cell.border = {
          top: { style: "medium" },
          left: { style: "medium" },
          bottom: { style: "medium" },
          right: { style: "medium" },
        };
        cell.alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
        };
        cell.font = {
          bold: true,
          color: { argb: "FFFFFFFF" }, // White color
        };
        // Menentukan ukuran kolom header
        if (header === "No") {
          worksheet.getColumn(index + 1).width = 10; // Ukuran lebih kecil untuk kolom "No"
        } else if (
          header === "produk_harga" ||
          header === "produk_terjual" ||
          header === "produk_rating" ||
          header === "produk_diskon" ||
          header === "produk_harga_sebelum_diskon"
        ) {
          worksheet.getColumn(index + 1).width = 20; // Ukuran lebih kecil untuk kolom "No"
        } else {
          worksheet.getColumn(index + 1).width = 50; // Ukuran default untuk kolom lainnya
        }
      });
    }
  }

  dataWithNo.forEach((item: any, rowIndex: any) => {
    const row = worksheet.addRow(Object.values(item));
    row.eachCell((cell, cellNumber) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      // Mengatur alignment pada sel-sel body tertentu
      if (
        cellNumber === 1 ||
        cellNumber === 4 ||
        cellNumber === 5 ||
        cellNumber === 6 ||
        cellNumber === 7 ||
        cellNumber === 8
      ) {
        cell.alignment = {
          wrapText: false,
          vertical: "middle",
          horizontal: "center",
        };
      } else {
        cell.alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "left",
        };
      }
    });
    // Mengatur ukuran tinggi baris
    row.height = 50; // Mengatur tinggi baris menjadi 25
  });

  // Mengatur lebar kolom otomatis
  if (worksheet.columns) {
    worksheet.columns.forEach((column) => {
      column.width = Math.max(5, column.width!);
    });
  }

  // Menghasilkan file Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const excelData = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = data.keyword + ".xlsx";
    link.click();
  });
};

const onConfettiLoad = () => {
  const duration = 10 * 1000;
  const animationEnd = Date.now() + duration;

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  (function frame() {
    const timeLeft = animationEnd - Date.now();

    (window as any).confetti({
      particleCount: 100, // Jumlah partikel konfeti yang dihasilkan
      startVelocity: 30, // Kecepatan awal partikel
      ticks: Math.max(200, 500 * (timeLeft / duration)),
      origin: { x: 0.5, y: 1 }, // Posisi awal konfeti (tengah bawah)
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
      ],
      shapes: ["square", "circle"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.8, 1.2),
      drift: randomInRange(-0.1, 0.1),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
};

export default Form;
