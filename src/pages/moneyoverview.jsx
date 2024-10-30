import React from "react";
import { FaBullseye, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const MoneyOverview = () => {
  const totalMoney = 5;
  const paidMoney = 3;
  const moneyLeft = totalMoney - paidMoney;

  return (
    <div className="flex flex-col items-center p-6 space-y-3  max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-[#087ABC] mb-1">Financial Overview</h1>

      {/* Total Money */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-gray-700">VEGH Revenue Target: <span className="text-[#087ABC] text-xl">{totalMoney} billions</span> </p>
          <FaBullseye className="text-[#087ABC] text-2xl" />
        </div>
        <div className="w-full h-8 bg-gray-300 rounded-full overflow-hidden">
          <div
            style={{ width: `${(totalMoney / totalMoney) * 100}%` }}
            className="h-full bg-gradient-to-r from-[#087ABC] to-blue-400 transition-all duration-500"
          ></div>
        </div>
      </div>

      {/* Revenue Achieved */}
      <div className="w-full mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-gray-700">Revenue Achieved <span className="text-green-500 text-xl">{paidMoney} billions</span></p>
          <FaCheckCircle className="text-green-500 text-2xl" />
        </div>
        <div className="w-full h-8 bg-gray-300 rounded-full overflow-hidden">
          <div
            style={{ width: `${(paidMoney / totalMoney) * 100}%` }}
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
          ></div>
        </div>
      </div>

      {/* Gap */}
      <div className="w-full mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-gray-700">Gap <span className="text-red-500 text-xl">{moneyLeft} billions</span></p>
          <FaExclamationTriangle className="text-red-500 text-2xl" />
        </div>
        <div className="w-full h-8 bg-gray-300 rounded-full overflow-hidden relative">
          <div
            style={{ width: `${(moneyLeft / totalMoney) * 100}%`, right: 0 }}
            className="h-full bg-gradient-to-l from-red-600 to-red-400 absolute transition-all duration-500"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MoneyOverview;
