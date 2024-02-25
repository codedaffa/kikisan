import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RocketLaunchIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { SpeedTest } from "@/types/SpeedTest";
import { Uji } from "@/types/Uji";
import Button from "./Button";
import Ngrok from "@/types/Ngrok";

type Props = {
  onClose: () => void;
};

function Modal({ onClose }: Props) {
  const { register, handleSubmit } = useForm();
  const [isLoadingSpeed, setIsLoadingSpeed] = useState(false);
  const [isLoadingUji, setIsLoadingUji] = useState(false);
  const [activeTab, setActiveTab] = useState("SpeedTest Internet Server");
  const [modalTitle, setModalTitle] = useState("SpeedTest Internet Server");
  const [speed, setSpeed] = useState<SpeedTest | null>(null);
  const [uji, setUji] = useState<Uji | null>(null);

  const onSpeed = async (data: any) => {
    setIsLoadingSpeed(true);
    try {
      const response = await fetch(data.speed, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const speedTests: SpeedTest = {
          speed_download: responseData.speed_download,
          speed_upload: responseData.speed_upload,
          ping_time_ms: responseData.ping_time_ms,
          ping_packet_loss: responseData.ping_packet_loss,
          nilai_fuzzy: responseData.nilai_fuzzy,
          penilaian_fuzzy: responseData.penilaian_fuzzy,
        };
        setSpeed(speedTests);
      } else {
        console.error("Request failed with status:", response.status);
        // Lakukan penanganan kesalahan jika diperlukan
      }
    } catch (error) {
      console.error("Error:", error);
      // Lakukan penanganan kesalahan jika diperlukan
    }
    setIsLoadingSpeed(false);
  };

  const onUji = async (data: any) => {
    setIsLoadingUji(true);
    try {
      const response = await fetch(data.uji, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const uji: Uji = {
          precision: responseData.precision,
          recall: responseData.recall,
          f1_score: responseData.f1_score,
          total_data: responseData.total_data,
          hasil: responseData.hasil,
        };
        setUji(uji);
      } else {
        console.error("Request failed with status:", response.status);
        // Lakukan penanganan kesalahan jika diperlukan
      }
    } catch (error) {
      console.error("Error:", error);
      // Lakukan penanganan kesalahan jika diperlukan
    }
    setIsLoadingUji(false);
  };

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    setModalTitle(`${tab}`);
  };

  return (
    <AnimatePresence>
      <Dialog
        open={true} // Set the open prop to manage modal visibility
        as={motion.div}
        className="inset-0 overflow-y-auto z-50"
        onClose={onClose}
      >
        <Dialog.Overlay
          as={motion.div}
          className="fixed inset-0 bg-gray-500 bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
        >
          <div className="bg-white w-3/5 rounded-lg shadow-lg p-4 relative">
            <div className="sm:flex sm:items-start">
            <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                onHoverStart={e => {}}
                onHoverEnd={e => {}}
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-6 md:right-6 md:top-6 lg:right-8 lg:top-6"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </motion.button>
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <RocketLaunchIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="text-center sm:mt-2 sm:ml-2 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-bold text-gray-600"
                >
                  {modalTitle}
                </Dialog.Title>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <div className="flex">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleTabClick("SpeedTest Internet Server")}
                  className={`w-full px-4 py-2 rounded-tl-lg rounded-tr-lg focus:outline-none ${
                    activeTab === "SpeedTest Internet Server"
                      ? "bg-green-500 text-white font-medium"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  SpeedTest Internet Server
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleTabClick("Metrik Evaluasi Fuzzy")}
                  className={`w-full px-4 py-2 rounded-tr-lg rounded-tl-lg focus:outline-none ${
                    activeTab === "Metrik Evaluasi Fuzzy"
                      ? "bg-green-500 text-white font-medium"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Metrik Evaluasi Fuzzy
                </motion.button>
              </div>
              {activeTab === "SpeedTest Internet Server" && (
                <form onSubmit={handleSubmit(onSpeed)}>
                  {
                    <>
                      <div className="mt-10">
                        <div className="flex justify-between mt-2">
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {speed?.penilaian_fuzzy || "None"}
                            </p>
                            <p className="text-sm">Rating Fuzzy</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {speed?.nilai_fuzzy || 0}
                            </p>
                            <p className="text-sm">Nilai Fuzzy</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {speed?.speed_download || 0}
                            </p>
                            <p className="text-sm">Speed Download (Mbps)</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {speed?.speed_upload || 0}
                            </p>
                            <p className="text-sm">Speed Upload (Mbps)</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {speed?.ping_time_ms || 0}
                            </p>
                            <p className="text-sm">Ping (ms)</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {speed?.ping_packet_loss || 0}
                            </p>
                            <p className="text-sm">Packet Loss (%)</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-10 mt-14">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pilihan Server
                        </label>
                        <select
                          {...register("speed", { required: true })}
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Pilih Server</option>
                          <option value={`${Ngrok.getUrl('httpx')}/speedhttpx`}>
                            Server Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('asynchttpx')}/speedasynchttpx`}>
                            Server Async Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('threadhttpx')}/speedthreadhttpx`}>
                            Server Thread Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('playwright')}/speedplaywright`}>
                            Server Async Playwright
                          </option>
                          <option value={`${Ngrok.getUrl('playwrighthttpx')}/speedplaywrighthttpx`}>
                            Server Async Playwright Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('selenium')}/speedselenium`}>
                            Server Thread Selenium
                          </option>
                          <option value={`${Ngrok.getUrl('seleniumhttpx')}/speedseleniumhttpx`}>
                            Server Thread Selenium Httpx
                          </option>
                        </select>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          isLoading={isLoadingSpeed}
                          style="text-gray-100 bg-green-500 rounded-lg border border-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          icon={<RocketLaunchIcon className="w-8 h-10" />}
                          loadingStyle="h-10 w-8"
                        />
                      </div>
                    </>
                  }
                </form>
              )}
              {activeTab === "Metrik Evaluasi Fuzzy" && (
                <form onSubmit={handleSubmit(onUji)}>
                  {
                    <>
                      <div className="mt-4">
                        <div className="flex justify-between mt-2">
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {uji?.precision || 0}
                            </p>
                            <p className="text-sm">Precision</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {uji?.recall || 0}
                            </p>
                            <p className="text-sm">Recall</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {uji?.f1_score || 0}
                            </p>
                            <p className="text-sm">F1 Score</p>
                          </div>
                          <div className="text-gray-600">
                            <p className="text-lg font-bold">
                              {uji?.total_data || 0}
                            </p>
                            <p className="text-sm">Jumlah Data</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pilihan Jumlah Data Uji
                        </label>
                        <select
                          {...register("uji", { required: true })}
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Pilih Jumlah Data Uji</option>
                          <option value={`${Ngrok.getUrl('httpx')}/ujihttpx`}>
                            10 Data uji ~ Server Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('asynchttpx')}/ujiasynchttpx`}>
                            25 Data Uji ~ Server Async Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('threadhttpx')}/ujithreadhttpx`}>
                            50 Data Uji ~ Server Thread Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('playwright')}/ujiplaywright`}>
                            100 Data Uji ~ Server Async Playwright
                          </option>
                          <option value={`${Ngrok.getUrl('playwrighthttpx')}/ujiplaywrighthttpx`}>
                            200 Data Uji ~ Server Async Playwright Httpx
                          </option>
                          <option value={`${Ngrok.getUrl('selenium')}/ujiselenium`}>
                            300 Data Uji ~ Server Thread Selenium
                          </option>
                          <option value={`${Ngrok.getUrl('seleniumhttpx')}/ujiseleniumhttpx`}>
                            300 Data Uji ~ Server Thread Selenium Httpx
                          </option>
                        </select>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          isLoading={isLoadingUji}
                          style="bg-green-500 text-gray-100 bg-green-500 rounded-lg border border-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          text="Evaluasi"
                          loadingStyle="h-5 w-5"
                        />
                      </div>
                      <div className="mt-6 max-h-48 overflow-y-auto">
                        {/* Menambahkan max-height dan overflow-y */}
                        <table className="table-auto min-w-full text-center text-gray-700 bg-white border border-gray-300">
                          <thead>
                            <tr>
                              <th className="py-2 px-4 border-b">No</th>
                              <th className="py-2 px-4 border-b">
                                Download (Mbps)
                              </th>
                              <th className="py-2 px-4 border-b">
                                Upload (Mbps)
                              </th>
                              <th className="py-2 px-4 border-b">Ping (ms)</th>
                              <th className="py-2 px-4 border-b">
                                Packet Loss (%)
                              </th>
                              <th className="py-2 px-4 border-b">Rating</th>
                              <th className="py-2 px-4 border-b">
                                Nilai Fuzzy
                              </th>
                              <th className="py-2 px-4 border-b">
                                Rating Fuzzy
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {uji?.hasil.map((item, index) => (
                              <tr key={index}>
                                <td className="py-2 px-4 border-b">
                                  {index + 1}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {item.speed_download}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {item.speed_upload}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {item.ping_time_ms}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {item.ping_packet_loss}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {item.penilaian}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {item.hasil_fuzzy}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {item.penilaian_fuzzy}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  }
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
}

export default Modal;
