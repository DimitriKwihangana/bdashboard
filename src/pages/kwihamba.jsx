import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import React, { useCallback, useEffect, useState } from "react";
import { fetchProjects, fetchClients } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useractiveoptions } from '../components/Barchartoptions';

const UserActiveChart = () => {
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
    labels: ['Concept Note', 'Grant Application', 'EOI', 'Proposals'],
    datasets: [
      {
        label: 'Active Projects',
        data: [0, 0, 0, 0],
        backgroundColor: [],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        maxBarThickness: 35,
      },
    ],
  });

  const colors = [
    "rgba(8, 122, 188)",    // Blue
    "rgba(157, 195, 229)",  // Light Blue
    "rgba(99, 181, 230)",   // Mid Blue
    "rgba(140, 207, 152)"   // Green
  ];

  useEffect(() => {
    const activeprojects = projects.filter((project) => project.status === 'Active');

    const conceptCount = activeprojects.filter((p) => p.type_of_bid === 'Concept note').length;
    const grantCount = activeprojects.filter((p) => p.type_of_bid === 'Grant Application').length;
    const eoiCount = activeprojects.filter((p) => p.type_of_bid === 'EOI').length;
    const proposalCount = activeprojects.filter((p) => p.type_of_bid === 'Proposal').length;

    const data = [conceptCount, grantCount, eoiCount, proposalCount];

    // Helper function to create a gradient for each bar
    const createGradient = (ctx, color) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, `${color.replace(')', ', 0.3)')}`); // Top with 0.3 opacity
      gradient.addColorStop(1, `${color.replace(')', ', 1)')}`);   // Bottom fully opaque
      return gradient;
    };

    // Create a canvas and context to use for the gradients
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Generate a gradient for each type
    const gradients = colors.map(color => createGradient(ctx, color));

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data,
          backgroundColor: gradients,  // Apply gradients to each bar
        },
      ],
    }));
  }, [projects]);

  return (
    <div>
      <Bar data={chartData} options={useractiveoptions} />
    </div>
  );
};

export default UserActiveChart;
