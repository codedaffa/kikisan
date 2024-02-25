import { Monitoring } from "@/types/Monitoring";
import {
  ServerStackIcon,
  DocumentChartBarIcon,
  ClockIcon,
  ScissorsIcon,
} from "@heroicons/react/24/solid";

export const Stats = ({ monitoring }: Props) => {
  return (
    <div className="bg-gray-100 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <ScissorsIcon className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10" />
          </div>
          <p className="mb-2 font-bold text-md">Info Scraping</p>
          <p className="text-gray-700">Metode : {monitoring?.metode || "None"}</p>
          <p className="text-gray-700">Pages : {monitoring?.pagination || "None"}</p>
          <p className="text-gray-700">Keyword : {monitoring?.keyword || "None"}</p>
          <p className="text-gray-700">User Agent : {monitoring?.user_agent || "None"}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <DocumentChartBarIcon className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10" />
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            {monitoring?.jumlah_data || 0}
          </h6>
          <p className="mb-2 font-bold text-md">Jumlah Data</p>
          <p className="text-gray-700">
            Berikut adalah jumlah data produk Tokopedia yang berhasil di-scrape
            oleh Kikisan.site.
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <ClockIcon className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10" />
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            {monitoring?.durasi || "00:00:00"}
          </h6>
          <p className="mb-2 font-bold text-md">Durasi</p>
          <p className="text-gray-700">
            Berikut adalah durasi waktu yang diperlukan oleh Kikisan untuk
            melakukan proses scraping.
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <ServerStackIcon className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10" />
          </div>

          <p className="mb-2 font-bold text-md">Info Server</p>
          <p className="text-gray-700">Type CPU : {monitoring?.cpu_type || "None"}</p>
          <p className="text-gray-700">CPU Core : {monitoring?.cpu_core || "None"}</p>
          <p className="text-gray-700">Ram Usage : {monitoring?.ram_total || "None"}</p>
          <p className="text-gray-700">
            Ram Available : {monitoring?.ram_tersedia || "None"}
          </p>
        </div>
      </div>
    </div>
  );
};

interface Props {
  monitoring?: Monitoring | null;
}
