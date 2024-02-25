import React, { useEffect, useState } from "react";
import ChartJS, { ChartItem } from "chart.js/auto";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Monitoring } from "@/types/Monitoring";

interface ChartData {
  label: string;
  data: {
    labels: string[];
    download?: number[];
    upload?: number[];
    cpu?: number[];
    ram?: number[];
    total?: string;
  };
}

function Charts({ monitoring }: Props) {
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    generateData();
  }, [monitoring]);

  useEffect(() => {
    if (chartData) {
      renderChart(chartData);
    }
  }, [chartData, selectedOption]);
  const generateData = () => {
    if (monitoring) {
      const dates = {
        internet: {
          total: monitoring.paket_internet,
          data: {
            labels: monitoring.waktu_list,
            download: monitoring.paket_download,
            upload: monitoring.paket_upload,
          },
        },
        cpu: {
          total: monitoring.cpu_rata,
          data: {
            labels: monitoring.waktu_list,
            cpu: monitoring.cpu_list,
          },
        },
        ram: {
          total: monitoring.ram_rata,
          data: {
            labels: monitoring.waktu_list,
            ram: monitoring.ram_list,
          },
        },
      };

      const data: ChartData[] = [
        {
          label: "Internet",
          data: {
            labels: dates["internet"].data.labels,
            download: dates["internet"].data.download,
            upload: dates["internet"].data.upload,
            total: dates["internet"].total,
          },
        },
        {
          label: "CPU",
          data: {
            labels: dates["cpu"].data.labels,
            cpu: dates["cpu"].data.cpu,
            total: dates["cpu"].total,
          },
        },
        {
          label: "RAM",
          data: {
            labels: dates["ram"].data.labels,
            ram: dates["ram"].data.ram,
            total: dates["ram"].total,
          },
        },
      ];

      setChartData(data);
    }
  };

  const renderChart = (data: ChartData[]) => {
    const canvas = document.getElementById("chart") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d")!;

      // Retrieve the existing chart instance
      const existingChart = ChartJS.getChart(ctx);

      // Destroy the existing chart if it exists
      if (existingChart) {
        existingChart.destroy();
      }

      // Create a new chart
      let chart = new ChartJS(ctx, {
        type: "line",
        data: {
          labels:
            (data &&
              data[selectedOption] &&
              data[selectedOption].data &&
              data[selectedOption].data.labels) ||
            [],

          datasets: [],
        },
        options: {
          scales: {
            y: {
              grid: {
                display: false,
              },
              ticks: {
                callback: function (
                  tickValue: string | number,
                  index: number,
                  ticks: any[]
                ) {
                  if (selectedOption === 0) {
                    const value =
                      typeof tickValue === "string"
                        ? parseFloat(tickValue)
                        : tickValue;
                    if (value < 1024) {
                      return value + " B";
                    } else if (value < 1048576) {
                      return (value / 1024).toFixed(1) + " KB";
                    } else if (value < 1073741824) {
                      return (value / 1048576).toFixed(1) + " MB";
                    } else {
                      return (value / 1073741824).toFixed(1) + " GB";
                    }
                  } else if (selectedOption === 1 || selectedOption === 2) {
                    const value =
                      typeof tickValue === "string"
                        ? parseFloat(tickValue)
                        : tickValue;
                    return value + " %";
                  }
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || "";
                  const value = context.parsed.y || 0;

                  if (selectedOption === 0) {
                    if (value < 1024) {
                      return label + ": " + value + " B";
                    } else if (value < 1048576) {
                      return label + ": " + (value / 1024).toFixed(1) + " KB";
                    } else if (value < 1073741824) {
                      return (
                        label + ": " + (value / 1048576).toFixed(1) + " MB"
                      );
                    } else {
                      return (
                        label + ": " + (value / 1073741824).toFixed(1) + " GB"
                      );
                    }
                  } else if (selectedOption === 1 || selectedOption === 2) {
                    return label + ": " + value + "%";
                  }

                  return "";
                },
              },
            },
          },
        },
      });

      // Check if data is available for the selected option
      if (data && data[selectedOption] && data[selectedOption].data) {
        const { upload, download, cpu, ram } = data[selectedOption].data;

        // Check if download data is available for the selected option
        if (download) {
          // Add download dataset to the chart
          chart.data.datasets.push({
            label: "Download",
            backgroundColor: "rgba(102, 126, 234, 0.25)",
            borderColor: "rgba(102, 126, 234, 1)",
            pointBackgroundColor: "rgba(102, 126, 234, 1)",
            data: download || [],
          });
        }

        // Add upload dataset to the chart
        if (upload) {
          chart.data.datasets.push({
            label: "Upload",
            backgroundColor: "rgba(25, 145, 112, 1.0)",
            borderColor: "rgba(47, 244, 79, 1.0)",
            pointBackgroundColor: "rgba(127, 255, 212, 0.5)",
            data: upload || [],
          });
        }

        if (cpu) {
          // Add upload dataset to the chart
          chart.data.datasets.push({
            label: "CPU",
            backgroundColor: "rgba(210, 38, 30, 0.5)",
            borderColor: "rgba(210, 38, 30, 0.75)",
            pointBackgroundColor: "rgba(210, 38, 30, 1.0)",
            data: cpu || [],
          });
        }
        if (ram) {
          // Add upload dataset to the chart
          chart.data.datasets.push({
            label: "RAM",
            backgroundColor: "rgba(237, 100, 166, 0.25)",
            borderColor: "rgba(237, 100, 166, 1)",
            pointBackgroundColor: "rgba(237, 100, 166, 1)",
            data: ram || [],
          });
        }
      }

      // Update the chart
      chart.update();
    }
  };

  const selectOption = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-800 text-gray-500 rounded shadow-xl py-5 px-5 w-full md:w-5/6">
        <div className="flex flex-wrap items-end">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-tight">
              {chartData?.[selectedOption]?.label}
            </h3>
          </div>
          <div className="relative">
            <button
              className="flex text-xs hover:text-gray-300 h-6 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{chartData?.[selectedOption]?.label}</span>
              <ChevronDownIcon className="ml-1 w-3 h-3" />
            </button>
            {dropdownOpen && (
              <div className="bg-gray-700 shadow-lg rounded text-sm absolute top-auto right-0 min-w-full w-32 z-30 mt-1 -mr-3">
                <span className="absolute top-0 right-0 w-3 h-3 bg-gray-700 transform rotate-45 -mt-1 mr-3"></span>
                <div className="bg-gray-700 rounded w-full relative z-10 py-1">
                  <ul className="list-reset text-xs">
                    {chartData &&
                      chartData.map((item, index) => (
                        <li
                          key={index}
                          className={`px-4 py-2 hover:bg-gray-600 hover:text-white transition-colors duration-100 cursor-pointer ${
                            selectedOption === index ? "text-white" : ""
                          }`}
                          onClick={() => selectOption(index)}
                        >
                          {item.label}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-end mb-5">
          <h4 className="text-2xl lg:text-3xl text-white font-semibold leading-tight inline-block mr-2">
            {chartData?.[selectedOption]?.data?.total || 0}
          </h4>
        </div>
        <div>
          <canvas id="chart" className="w-full"></canvas>
        </div>
      </div>
    </div>
  );
}

interface Props {
  monitoring?: Monitoring | null;
}

export default Charts;
