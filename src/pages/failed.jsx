import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { fetchProjects, fetchClients } from "../features/dataSlice";
import { useCallback } from "react";
import { projectTypeOptions, employees, repeatOptions , consultants } from "./employees";
import Swal from 'sweetalert2';
import axios from 'axios';
import { motion } from 'framer-motion';
// Dummy data for consultants and employees



const Failed = () => {
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null); // New state for label filter
  const [selectedProject, setSelectedProject] = useState(null);
  const [reason, setReason] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [showYesModal, setShowYesModal] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null)
  const [reapeat,setReapet] = useState(null)
  const [contract, setContract] = useState(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [contractvalue, setContractValue] = useState(null)
  const [invoiced, setInvoiced] = useState(null)
  const dispatch = useDispatch();
  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const clients = useSelector((state) => state.data.clients);
// get client name
const getClientName = (clientId) => {
  const client = clients.find(client => client.id === clientId);
 
  return client ? client.client_name : 'Unknown Client';
};

  const projects = useSelector((state) => state.data.projects);
  
  const ProjectsFilter = projects.filter((project) => project.status === 'Failed');

  console.log(ProjectsFilter, "filtered with prepipeline status")

  console.log(selectedConsultant)
 console.log(selectedEmployee,"dddddddd")

  const handleYesClick = (project) => {
    setSelectedProject(project);
    setShowYesModal(true);
  };

  const handleProjectModalClick = (project)=> {
    setSelectedProject(project);
    setShowProjectModal(true)
  }


  const handleNoClick = (project) => {
    setSelectedProject(project);
    setShowNoModal(true);
  };

  const handleSelectedEmployee = (selectedOption) => {
    setSelectedEmployee(selectedOption.value);
  };

  const handleSubmitTheProject =  async () => {
   
      const updatedProject = {
        ...selectedProject,
        status: "Project",
        contract_value:contractvalue,
        invoiced_value: invoiced
      };
      try {
        const response = await axios.put(`https://databankvanguard-b3d326c04ab4.herokuapp.com/indicators/newproject/update/${selectedProject.id}/`, updatedProject);
  
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Project updated successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
            window.location.reload()
          });

       setShowNoModal(false)
       setSelectedProject(null)
        
      } catch (error) {
        console.error('Failed to update the project:', error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update project",
          showConfirmButton: false,
          timer: 1500
        });
      }
      setShowNoModal(false);

    
   
  };

  const handleCancelTheProject =  async () => {
    
      const updatedProject = {
        ...selectedProject,
        
        status: "Finalised",
      };
      try {
        const response = await axios.put(`https://databankvanguard-b3d326c04ab4.herokuapp.com/indicators/newproject/update/${selectedProject.id}/`, updatedProject);
  
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Project moved to Finalised",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          window.location.reload()
        });

       setShowNoModal(false)
       setSelectedProject(null)
        
      } catch (error) {
        console.error('Failed to update the project:', error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update project",
          showConfirmButton: false,
          timer: 1500
        });
      }
      setShowNoModal(false);
    
 
   
  };


  // Filter consultants based on project sector
  const filteredConsultants = consultants.filter(
    (consultant) => consultant.sector === null
  );

  // Calculate total project value
  
  // Create unique options for label filter
  const uniqueLabels = [...new Set(ProjectsFilter.map(project => project.label))].map(label => ({ value: label, label }));
  
  const uniqueBids = [...new Set(ProjectsFilter.map(project => project.type_of_bid))].map(label => ({ value: label, label }));

  const uniqueContractTypes = [...new Set(ProjectsFilter.map(project => project.contract_type))].map(label => ({ value: label, label }));

  // Filter projects based on selected project type and selected label
  const filteredProjects = ProjectsFilter .filter((project) => {
    const matchesTypeofBid = selectedBid ? project.type_of_bid === selectedBid.value: true
    const matchesContractType = contract ? project.contract_type === contract.value:true;
    const matchesRepeat = reapeat ? project.repeat_business === reapeat.value : true;
    const matchesProjectType = selectedProjectType ? project.projecttype === selectedProjectType.value : true;
    const matchesLabel = selectedLabel ? project.label === selectedLabel.value : true;
    return matchesProjectType && matchesLabel && matchesRepeat && matchesContractType && matchesTypeofBid;
  });

  const totalFinancialProposal = filteredProjects.reduce((total, project) => total + project.financial_proposal, 0);
  const totalinvoicedvalue = filteredProjects.reduce((total, project) => total + project.invoiced_value, 0);
  const totalcontractvalue = filteredProjects.reduce((total, project) => total + project.contract_value, 0);
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-grow p-1 w-11/12">
        <div className="mb-4 flex">
          {/* Project Type Filter Dropdown using react-select */}
          {/* <div className='pl-2'>

<label className="mr-2 font-bold">Type of bid:</label>
<Select
  options={uniqueBids}
  value={selectedBid}
  onChange={(option) => setSelectedBid(option)}
  isClearable
  placeholder="Select label..."
  className="w-34"
  />
</div> */}
{/* <div className='pl-2'>

<label className="mr-2 font-bold"> Contract Type:</label>
<Select
  options={uniqueContractTypes}
  value={contract}
  onChange={(option) => setContract(option)}
  isClearable
  placeholder="Select contract..."
  className="w-34 "
  />
  </div> */}

          {/* <div className='pl-2'>

          <label className="mr-2 font-bold"> Label:</label>
          <Select
            options={uniqueLabels}
            value={selectedLabel}
            onChange={(option) => setSelectedLabel(option)}
            isClearable
            placeholder="Select label..."
            className="w-34"
            />
        </div> */}
        {/* <div className='pl-2'>

<label className="mr-2 font-bold"> Repeated Business:</label>
<Select
  options={repeatOptions}
  value={reapeat}
  onChange={(option) => setReapet(option)}
  isClearable
  placeholder="Select project type..."
  className="w-34 "
  />
  </div> */}
   
            </div>

        <div className="overflow-x-auto  ">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-[#087ABC] text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-3 bg-[#087ABC] text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 bg-[#087ABC] text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Financial Proposal/Rwf
                </th>
                {/* <th className="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sector
                </th> */}
                <th className="px-6 py-3 bg-[#087ABC] text-left text-xs font-semibold text-white uppercase tracking-wider">
                Reason of Suspending
                </th>
                {/* <th className="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                 Invoiced Value/Rwf
                </th> */}
               
                {/* <th className="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-t"
                
                >
                  <td className="px-3 py-2 whitespace-nowrap"
                   onClick={()=>handleProjectModalClick(project)}
                  >{getClientName(project.client)}</td>
                  <td
                  onClick={()=>handleProjectModalClick(project)}
                  className="px-3 py-2 whitespace-nowrap">{project.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap"
                  onClick={()=>handleProjectModalClick(project)}
                  > {project.financial_proposal 
                    ? project.financial_proposal.toLocaleString() 
                    : "N/A"}</td>
                  <td className="px-3 py-2  flex-wrap"
                  onClick={()=>handleProjectModalClick(project)}
                  >{project.whyno}</td>
                  {/* <td className="px-3 py-2 whitespace-nowrap"
                  onClick={()=>handleProjectModalClick(project)}
                  >{project.invoiced_value}</td> */}
                 
                  {/* <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleYesClick(project)}
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                      >
                       Update
                      </button>
                      <button
                        onClick={() => handleNoClick(project)}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        Finalise
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
              {/* <tr className="border-t bg-gray-100">
                <td className="px-6 py-4 font-bold" colSpan="2">
                  Total Financial Proposal
                </td>
                <td className="px-6 py-4 font-bold">{totalFinancialProposal.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold">{totalcontractvalue.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold">{totalinvoicedvalue.toLocaleString()}</td>
                <td colSpan="3"></td>
              </tr> */}
            </tbody>
          </table>
        </div>

        {/* Yes Modal */}
        {showYesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4"> Update the Project</h2>
              <p className=' pb-8' >You are going to update "{selectedProject?.name}"?</p>

              <div className='pl-2'>
<label className="mr-2 font-bold">Contract Value:</label>
<input
        type="number"
        placeholder="Enter contract value"
       
        className="w-64 m-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(event) =>
            setContractValue(event.target.value)
          }
      />
  </div>
  <div className='pl-2'>
<label className="mr-2 font-bold">Invoiced value:</label>
<input
        type="number"
        placeholder="Enter contract value"
       
        className="w-64 m-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(event) =>
            setInvoiced(event.target.value)
          }
      />
  </div>
              {/* <div className="my-4">
                <label className="block font-bold mb-2">Select Employee to Assign</label>
                <Select
                  options={employees}
                  value={selectedEmployee}
                  onChange={handleSelectedEmployee}
                  isClearable
                  placeholder="Select Employee to lead"
                  className="w-64"
                />
              </div> */}

              {/* <div className="my-4">
                <label className="block font-bold mb-2">Select Consultant (Suggested based on Sector)</label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedConsultant}
                  onChange={(e) => setSelectedConsultant(e.target.value)}
                >
                  <option value="">Select Consultant...</option>
                  {filteredConsultants.map((consultant) => (
                    <option key={consultant.id} value={consultant.name}>{consultant.name} - {consultant.AreaofExpertise} - {consultant.YearsofExperience} </option>
                  ))}
                </select>
              </div> */}

              <div className="flex justify-between">
                <button
                  onClick={handleSubmitTheProject}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                 Update
                </button>
                <button
                  onClick={() => setShowYesModal(false)}
                  className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Modal */}
        {showNoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
             
              <motion.h2 
        className="text-2xl font-bold mb-4"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} // Scaling and rotation animation
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
      >
        Project Finalised ?
      </motion.h2>
              <p>You are confirming that the "{selectedProject?.name}"  is finalised?</p>
              
              <div className="flex justify-between">
                <button
                  onClick={handleCancelTheProject}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                 confirm
                </button>
                <button
                  onClick={() => setShowNoModal(false)}
                  className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showProjectModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-6 text-center  h-5/6">Project Details</h2>
      <table className="w-full table-auto border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold text-gray-700">Project Name:</td>
            <td className="py-3 px-4">{selectedProject?.name}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="py-3 px-4 font-semibold text-gray-700">Project Type:</td>
            <td className="py-3 px-4">{selectedProject.projecttype}</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold text-gray-700">Sector:</td>
            <td className="py-3 px-4">{selectedProject.sector}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="py-3 px-4 font-semibold text-gray-700">Status:</td>
            <td className="py-3 px-4">{selectedProject.status}</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold text-gray-700">Type of Bid:</td>
            <td className="py-3 px-4">{selectedProject.type_of_bid}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="py-3 px-4 font-semibold text-gray-700">Contract Type:</td>
            <td className="py-3 px-4">{selectedProject.contract_type}</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold text-gray-700">Repeat Business:</td>
            <td className="py-3 px-4">{selectedProject.repeat_business}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="py-3 px-4 font-semibold text-gray-700">Financial Proposal:</td>
            <td className="py-3 px-4">{ selectedProject.financial_proposal? selectedProject.financial_proposal.toLocaleString():"N/A"} Rwf</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="py-3 px-4 font-semibold text-gray-700">Bid With:</td>
            <td className="py-3 px-4">{selectedProject.bidwith}</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold text-gray-700">Label:</td>
            <td className="py-3 px-4">{selectedProject.label}</td>
          </tr>
          <tr className="border-b bg-gray-50">
            <td className="py-3 px-4 font-semibold text-gray-700">Deadline:</td>
            <td className="py-3 px-4">{selectedProject.deadline}</td>
          </tr>
         
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowProjectModal(false)}
          className="bg-gray-300 py-2 px-6 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Failed;