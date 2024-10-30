import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import React, { useCallback, useEffect, useState } from "react";
import { fetchProjects, fetchClients } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { allprojectsoptions } from '../components/Barchartoptions';

const colors = [
  "rgba(8, 122, 188)",
  "rgba(157, 195, 229)",
  "rgba(140, 207, 152)",
  "rgba(127, 127, 127)",
  "rgba(73, 113, 30)",
  "rgba(3, 80, 127)",
  "rgba(11, 157, 0)",
  "rgba(0, 162, 255)",
];

const AllProject = () => {
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
    labels: ['Waiting', 'Projects', 'Failed', 'Suspended', 'Finalised'],
    datasets: [
      {
        label: 'Overview of the bids',
        data: [0, 0, 0, 0,0],
        backgroundColor: [],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        maxBarThickness: 35,
      },
    ],
  });

  useEffect(() => {
    const w = projects.filter((p) => p.status === 'Waiting').length;
    const p = projects.filter((p) => p.status === 'Project').length;
    const f = projects.filter((p) => p.status === 'Failed').length;
    const s = projects.filter((p) => p.status === 'Suspended').length;
    const fin = projects.filter((p) => p.status === 'Finalised').length;
    const data = [w, p, f, s, fin];

    // Create a gradient for each color in the colors array
    const createGradient = (ctx, color) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, `${color}, 0.3)`.replace(')', ', 0.3)')); // Color with opacity at the top
        gradient.addColorStop(1, `${color}, 1)`.replace(')', ', 1)'));   // Full color at the bottom
        return gradient;
      };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Generate gradients based on the colors array
    const backgroundColors = colors.slice(0, data.length).map((color) => createGradient(ctx, color));

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data,
          backgroundColor: backgroundColors,  // Set individual gradients for each bar
        },
      ],
    }));
  }, [projects]);

  return (
    <div>
      <Bar data={chartData} options={allprojectsoptions} />
    </div>
  );
};

export default AllProject;
