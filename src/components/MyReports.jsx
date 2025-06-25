import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaServer,
  FaKeyboard,
  FaFan,
  FaExclamationTriangle,
} from "react-icons/fa";

const typeIcons = {
  server: <FaServer />,
  keyboard: <FaKeyboard />,
  fan: <FaFan />,
};

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "https://etrack-backend.onrender.com/report/get"
        );
        console.log(response.data);
        setReports(response.data || []); // adjust based on backend response format
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(
    (report) =>
      report.deviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.deviceBarcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen bg-charcoal text-white px-4 py-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">My Reports</h1>
        <p className="text-deep-gray mb-6">
          Track and manage your reported issues
        </p>

        {/* Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-dark-blue p-4 rounded-xl shadow-neon-blue text-center">
            <h2 className="text-lg font-semibold">{reports.length}</h2>
            <p className="text-deep-gray">Total Reports</p>
          </div>
          <div className="bg-dark-blue p-4 rounded-xl shadow-neon-blue text-center">
            <h2 className="text-lg font-semibold text-yellow-400">
              {reports.filter((r) => r.status === "Pending").length}
            </h2>
            <p className="text-deep-gray">Pending</p>
          </div>
          <div className="bg-dark-blue p-4 rounded-xl shadow-neon-blue text-center">
            <h2 className="text-lg font-semibold text-cool-blue">
              {reports.filter((r) => r.status === "In Progress").length}
            </h2>
            <p className="text-deep-gray">In Progress</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-darker-blue text-white py-2 pl-10 pr-4 rounded-lg border border-glow-blue focus:outline-none"
            />
            <FaSearch className="absolute top-2.5 left-3 text-deep-gray" />
          </div>
          <select className="ml-4 bg-darker-blue border border-glow-blue text-white px-4 py-2 rounded-lg">
            <option>All Reports</option>
          </select>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const type = report.deviceName?.toLowerCase().includes("keyboard")
              ? "keyboard"
              : report.deviceName?.toLowerCase().includes("server")
              ? "server"
              : report.deviceName?.toLowerCase().includes("fan")
              ? "fan"
              : null;

            return (
              <div
                key={report._id}
                className="bg-dark-blue p-6 rounded-xl shadow-md hover:shadow-neon-green transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-cool-blue text-2xl">
                    {typeIcons[type] || <FaExclamationTriangle />}
                    <span className="text-lg font-semibold text-white">
                      {report.deviceName || "Unknown"}
                    </span>
                  </div>
                  <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                    {report.status || "Pending"}
                  </span>
                </div>
                <p className="text-sm mb-1">
                  <span className="text-deep-gray">Barcode:</span>{" "}
                  {report.deviceBarcode}
                </p>
                <p className="text-sm mb-2">
                  <span className="text-deep-gray">Reported Status:</span>{" "}
                  <span className="text-red-400 font-semibold">
                    {report.deviceStatus}
                  </span>
                </p>
                {/* <textarea
                  value={report.description}
                  className="w-full mt-2 p-2 rounded bg-darker-blue text-white border border-glow-blue focus:outline-none"
                  readOnly
                ></textarea> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default MyReports;
