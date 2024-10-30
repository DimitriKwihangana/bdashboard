import React, { useCallback, useEffect, useState } from "react";
import { fetchProjects, fetchClients } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { sectoroptions, useractiveoptions, Datesoptions, contractTypeoptions

 } from "../components/Barchartoptions";

 import UserActiveChart from "./kwihamba";
import ContractChart from "./contractchart";
import AllProject from "./allprojects";
import Label from "./label";
import MoneyOverview from "./moneyoverview";



const Overview = () => {
  const [statusArrays, setStatusArrays] = useState({});
  const [countprojects, setCountprojects] = useState(0);
  const [active, setActive] = useState(0);
  const [waitingcount, setWaiting] = useState(0);
  const [prepipeline, setPrepipeline] = useState(0);
 const  [EOI, setEOI] = useState(null)
 const [GrantApplication, setGrantApplication] = useState(null)
 const [proposals, setProposal] = useState(null)
 const [concept, setConcept] = useState(null)
 const [singleSOurcing, setSIngleSourcing] = useState(null)
 const [Competitive, setCompetitive] = useState(null)
 const [FWC, setFWC] = useState(null)
 const [contracttypeData, setcontractTypeData] = useState([])

  const dispatch = useDispatch();

  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const projects = useSelector((state) => state.data.projects);
  
  useEffect(() => {
    if (projects.length === 0) return; // Avoid running if projects haven't loaded.

    const organizeProjectsByStatus = () => {
      const tempStatusArrays = projects.reduce((acc, project) => {
        acc[project.status] = acc[project.status] || [];
        acc[project.status].push(project);
        return acc;
      }, {});
      setStatusArrays(tempStatusArrays);
    };

    organizeProjectsByStatus();
  }, [projects]);

  useEffect(() => {
    if (Object.keys(statusArrays).length === 0) return; // Only run if statusArrays is populated.

    const projectCount = statusArrays.Project?.length || 0;
    setCountprojects(projectCount);

    const waitingCount = projects.filter((project) => project.status === "Waiting").length;
    setWaiting(waitingCount);

    // new code about official status
    const prepipelineCount = projects.filter((project) => project.status === "Prepipeline").length;
    setPrepipeline(prepipelineCount);
    // counting the projects
    const activeCount = projects.filter((project) => project.status === "Active").length;
    setActive(activeCount);

    // sorting out active projects

    const activeprojects = projects.filter((project) => project.status === "Active")

// contract Type


    const singleSOurcingCounts = activeprojects.filter((project) => project.contract_type === "SingleSourcing").length;
    setSIngleSourcing(singleSOurcingCounts)

const competitiveCOunts = activeprojects.filter((project) => project.contract_type === "Copetitive").length;
    setCompetitive(competitiveCOunts)


    const FWCcounts = activeprojects.filter((project) => project.contract_type === "FWC").length;
    setFWC(FWCcounts)

    setcontractTypeData([singleSOurcing, Competitive, FWC]);

    console.log(contracttypeData, 'array')

    const EOIcounts = activeprojects.filter((project) => project.type_of_bid === "EOI").length;
    setEOI(EOIcounts)

    const Grantapplicationcount = activeprojects.filter((project) => project.type_of_bid === "Grant Application").length;
    setGrantApplication(Grantapplicationcount)

    const proposalcounts = activeprojects.filter((project) => project.type_of_bid === "Proposal").length;
    setProposal(proposalcounts)
 
    const conceptnote = activeprojects.filter((project) => project.type_of_bid === "Concept note").length;
    setConcept(conceptnote)
    const theprojects = statusArrays.Project ? statusArrays.Project : [];

    const countProjectsBySector = (projects, sector) => {
      let count = 0;
      projects.forEach((project) => {
        if (project.sector.includes(sector)) {
          count++;
        }
      });
      return count;
    };

    const Environment = countProjectsBySector(
      theprojects,
      "Environment&Climate"
    );
    const TradePolicyExportDev = countProjectsBySector(theprojects, "Trade Policy&Export Dev");
    const Finance = countProjectsBySector(theprojects, "Finance");
    const Foodsystems = countProjectsBySector(theprojects, "Food Systems & Nutrition");
    const Other = countProjectsBySector(theprojects, "Other");
    const Gender = countProjectsBySector(theprojects, "Gender & Inclusion");
    const Education = countProjectsBySector(theprojects, "Education");
    const Agriculture = countProjectsBySector(theprojects, "Agriculture");
    const Private = countProjectsBySector(theprojects, "Private Sector Development");
   
    
    
    setUseractive((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: [ concept, GrantApplication, EOI, proposals],
        },
      ],
    }));
    
    setContractType((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: [singleSOurcing, Competitive,FWC],
        },
      ],
    }));
    
    setSector((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: [
            Agriculture,
            Foodsystems,
            TradePolicyExportDev,
            Private,
            Education,
            Environment,
            Gender,
            Finance,
            Other,
          ],
        },
      ],
    }));
  }, [statusArrays]);

  // Chart data


  const generateBlueToWhiteGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)"); // Blue
    gradient.addColorStop(1, "rgba(8, 122, 188, 1)"); // White
    return gradient;
  };
  
  const [useractive, setUseractive] = useState({
    labels: ["Concept Note", "Grant App", "EOI", "Proposals"],
    datasets: [
      {
        label: ["Concept Note", "Grant App", "EOI", "Proposals"],
        data: [0, 0, 0, 0],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return generateBlueToWhiteGradient(ctx, chartArea);
        },
        borderColor: "rgba(8, 122, 188, 1)",
        borderWidth: 1,
        maxBarThickness: 25,
      },
    ],
  });
  

  const [contractType, setContractType] = useState({
    labels: [ "Single Sourcing ", "Competitive", "FWC"],
    datasets: [
      {
        label: ["Concept Note", "Grant App", "EOI", "Proposals"],
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
        
          
        ],
        borderColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
         
        ],
        borderWidth: 1,
        maxBarThickness: 25,
      },
    ],
  });

  const [usersector, setSector] = useState({
    labels: [
      "Agriculture",
      "Food&Nutrition",
      "TradePolicy &Export Dev",
      "Private Sector Dev",
      "Education",
      "Climate & Env",
      "Gender & Inclusion",
      "Finance",
      "Other",
    ],
    datasets: [
      {
        label: [
          "Agriculture",
          "Food Systems & Nutrition",
          "Trade Policy & Export Dev",
          "Private Sector Dev",
          "Education",
          "Climate & Env",
          "Gender & Inclusion",
          "Finance",
          "Other",
        ],
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(157, 195, 229)",

        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const sumbmittedBids  = projects.filter((project) => project.status === "Active" || "Waiting" || "Fialed" ||"Finalised" || "Suspended"|| "Project")
  
  const [bidsPerMonth, setBidsPerMonth] = useState([]);
  

  

  useEffect(() => {
    // Count how many bids were submitted in each month
    const bidsCount = Array(12).fill(0); // Array to hold counts for each month
    sumbmittedBids.forEach((project) => {
      const deadlineDate = new Date(project.deadline);
      const month = deadlineDate.getMonth(); // January is 0, December is 11
      bidsCount[month] += 1; // Increment the count for that month
    });

    setBidsPerMonth(bidsCount);
    
  }, [sumbmittedBids]); // The dependency array is now empty, so it runs only once after the initial render

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
  const chartcolor =[
    "rgba(157, 195, 229)",
  ]

  const generateGradient = (ctx, chartArea, index) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    const color2 = colors[index % chartcolor.length]; 
    const color1 = `rgba(255,255, 255, 0.7)`; 
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };


  const chartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Bids per Month",
        data: bidsPerMonth,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return bidsPerMonth.map((_, index) => generateGradient(ctx, chartArea, index));
        },
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" px-5 min-h-screen  text-white">
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      {/* Dashboard Header */}
      <div className="">
        <h2 className="text-2xl font-bold text-black "> 2024 Overview </h2>
      
      </div>

      {/* Cards for Project Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full">
        {[
          { label: "Pre - Pipeline", value: prepipeline },
          { label: "Active Bids", value: active },
          { label: "Submitted & Waiting", value: waitingcount },
          { label: "Projects", value: countprojects },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#087ABC] to-[#63B5E6] shadow-lg rounded-lg p-3 hover:scale-105 transition-transform duration-200"
          >
            <h3 className="text-white text-xl font-semibold">{item.label}</h3>
            <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-6 w-full">
        <div className="bg-white shadow-lg rounded-lg p-1">
          <Bar data={chartData} options={Datesoptions} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-1">
          <MoneyOverview/>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-1">
             <AllProject/>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6 w-full">
        <div className="bg-white shadow-lg rounded-lg p-1">
        <UserActiveChart /> 
       
        </div>
        <div className="bg-white shadow-lg rounded-lg p-1 ">
          <Label/>
        {/* <UserActiveChart />  */}
       
        </div>
        <div className="bg-white shadow-lg rounded-lg p-1 ">
        <ContractChart />
       
        </div>
      </div>
    </div>
  </div>

  );
};

export default Overview;
