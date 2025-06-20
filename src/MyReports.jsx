import React from 'react';
import { FaSearch, FaServer, FaKeyboard, FaFan } from 'react-icons/fa';

const reports = [
  {
    id: 1,
    title: 'Server',
    brand: 'Dell PowerEdge',
    barcode: 'PROP-C1GBD4',
    location: 'Floor 5, Right Wing, Server Room',
    status: 'Pending',
    reportStatus: 'Not Working',
    description: 'lll',
    icon: <FaServer />,
  },
  {
    id: 2,
    title: 'Keyboard',
    brand: 'Logitech K120',
    barcode: 'PROP-Z3T8R1',
    location: 'Floor 3, Left Wing, Bay 2',
    status: 'Pending',
    reportStatus: 'Not Working',
    description: '...',
    icon: <FaKeyboard />,
  },
  {
    id: 3,
    title: 'Fan',
    brand: 'Havells Swing',
    barcode: 'PROP-W2F9L3',
    location: 'Floor 3, Corridor, Back Side',
    status: 'Pending',
    reportStatus: 'Not Working',
    description: '..',
    icon: <FaFan />,
  },
];

const MyReports = () => {
  return (
    <section className="w-full min-h-screen bg-charcoal text-white px-4 py-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">My Reports</h1>
        <p className="text-deep-gray mb-6">Track and manage your reported issues</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-dark-blue p-4 rounded-xl shadow-neon-blue text-center">
            <h2 className="text-lg font-semibold">3</h2>
            <p className="text-deep-gray">Total Reports</p>
          </div>
          <div className="bg-dark-blue p-4 rounded-xl shadow-neon-blue text-center">
            <h2 className="text-lg font-semibold text-yellow-400">3</h2>
            <p className="text-deep-gray">Pending</p>
          </div>
          <div className="bg-dark-blue p-4 rounded-xl shadow-neon-blue text-center">
            <h2 className="text-lg font-semibold text-cool-blue">0</h2>
            <p className="text-deep-gray">In Progress</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full bg-darker-blue text-white py-2 pl-10 pr-4 rounded-lg border border-glow-blue focus:outline-none"
            />
            <FaSearch className="absolute top-2.5 left-3 text-deep-gray" />
          </div>
          <select className="ml-4 bg-darker-blue border border-glow-blue text-white px-4 py-2 rounded-lg">
            <option>All Reports</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-dark-blue p-6 rounded-xl shadow-md hover:shadow-neon-green transition">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-cool-blue text-2xl">{report.icon}<span className="text-lg font-semibold text-white">{report.title}</span></div>
                <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">{report.status}</span>
              </div>
              <p className="text-sm text-deep-gray mb-1">{report.brand}</p>
              <p className="text-sm mb-2"><span className="text-deep-gray">Barcode:</span> {report.barcode}</p>
              <p className="text-sm mb-2"><span className="text-deep-gray">Location:</span> {report.location}</p>
              <p className="text-sm mb-2"><span className="text-deep-gray">Reported Status:</span> <span className="text-red-400 font-semibold">{report.reportStatus}</span></p>
              <textarea
                value={report.description}
                className="w-full mt-2 p-2 rounded bg-darker-blue text-white border border-glow-blue focus:outline-none"
                readOnly
              ></textarea>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyReports;