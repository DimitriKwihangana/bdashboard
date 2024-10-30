import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { fetchClients, fetchProjects } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

const Clients = () => {
  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState(null);

  const clientTypes = [
    { label: "Other", value: "Other" },
    { label: "Business", value: "Business" },
    { label: "NGO", value: "NGO" },
    { label: "Dvt Agency", value: "Dvt Agency" },
    { label: "Rwanda Gvt", value: "Rwanda Gvt" },
    { label: "Quasi Gvt", value: "Quasi Gvt" },
    { label: "Foundation", value: "Foundation" },
    { label: "Multilateral Org", value: "Multilateral Org" },
  ];

  const dispatch = useDispatch();

  const handleFechProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFechProjects();
  }, [handleFechProjects]);

  const clients = useSelector((state) => state.data.clients);

  const handleClientTypeChange = (selectedOption) => {
    setClientType(selectedOption.value);
  };

  const createClient = async () => {
    try {
      const response = await axios.post(
        "https://databankvanguard-b3d326c04ab4.herokuapp.com/indicators/client/create/",
        {
          client_name: clientName,
          client_type: clientType,
        }
      );
 alert("Success")
      console.log(response.data); // Log the response data if needed
    } catch (err) {
      console.error("Error creating project:", err);
      alert("error")
    }
  };

  return (
    <div className=" border border-black">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden m-5 border-inherit ">
        <form className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-gray-700"
            >
              Client Name
            </label>
            <input
  type="text"
  id="clientName"
  onChange={(event) => setClientName(event.target.value)}
  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
  placeholder="Enter client name"
  required
/>

          </div>
          <div className="mb-4">
            <label
              htmlFor="clientType"
              className="block text-sm font-medium text-gray-700"
            >
              Client Type
            </label>
            <Select
              id="clientType"
              options={clientTypes}
       
              onChange={handleClientTypeChange}
              classNamePrefix="react-select"
              required
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              createClient();
            }}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#087ABC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register Client
          </button>
        </form>

        {/* <div className="overflow-y-auto h-120 border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.client_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.client_type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default Clients;
