import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import React, { useCallback, useEffect, useState } from "react";
import { fetchProjects, fetchClients } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { contractTypeoptions } from '../components/Barchartoptions';

const ContractChart = () => {
  const dispatch = useDispatch();

  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const projects = useSelector((state) => state.data.projects);

  const [chartData, setChartData] = useState({
    labels: ['Single Sourcing', 'Competitive', 'FWC'],
    datasets: [
      {
        label: 'Active Projects filtered by contract',
        data: [0, 0, 0],
        backgroundColor: [],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        maxBarThickness: 35,
      },
    ],
  });

  const colors = [
    "rgba(8, 122, 188)",   // Blue
    "rgba(157, 195, 229)", // Light Blue
    "rgba(140, 207, 152)"  // Green
  ];

  useEffect(() => {
    const sc = projects.filter((p) => p.contract_type === 'SingleSourcing').length;
    const c = projects.filter((p) => p.contract_type === 'Competitive').length;
    const Fwc = projects.filter((p) => p.contract_type === 'FWC').length;
    
    const data = [sc, c, Fwc];

    // Function to create a gradient for a given color
    const createGradient = (ctx, color) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, `${color.replace(')', ', 0.3)')}`); // Top with 0.3 opacity
      gradient.addColorStop(1, `${color.replace(')', ', 1)')}`);   // Bottom fully opaque
      return gradient;
    };

    // Create canvas and context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Apply gradients to each color
    const gradients = colors.map(color => createGradient(ctx, color));

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data,
          backgroundColor: gradients,  // Set each gradient as the background color for bars
        },
      ],
    }));
  }, [projects]);

  return (
    <div>
      <Bar data={chartData} options={contractTypeoptions} />
    </div>
  );
};

export default ContractChart;
