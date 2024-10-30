import Select from "react-select";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, fetchProjects } from "../features/dataSlice";
import { useCallback } from "react";
import axios from "axios";
import Clients from "../components/client";
const RegisterProjects = () => {
  const [isloding, setLoading] = useState(false);

  const projectttype = [
    { label: "Research", value: "Research" },
    { label: "Strategy", value: "Strategy" },
    { label: "M&E", value: "M&E" },
    { label: "Implementation", value: "Implementation" },
    { label: "Other", value: "Other" },
  ];
  const RepeatBusinessArray = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const sector = [
    { label: "Agriculture", value: "Agriculture" },
    { label: "Food Systems & Nutrition", value: "Food Systems" },
    { label: "Finance", value: "Finance" },
    { label: "Trade Policy&Export Dev", value: "Trade Policy&Export Dev" },
    { label: "Gender & Inclusion", value: "Gender & Inclusion" },
    { label: "Private Sector Development", value: "Private Sector Development" },
    { label: "Climate and Env", value: "Climate and Env" },
    { label: "Education", value: "Education" },
    { label: "Other", value: "Other" },
  ];

  const contractType = [
    { label: "SingleSourcing", value: "SingleSourcing" },
    { label: "Competitive", value: "Competitive" },
    { label: "FWC", value: "FWC" },
  ];
  const Label = [
    { label: "Sambaza", value: "Sambaza" },
    { label: "Snail", value: "Snail" },
    { label: "Whale", value: "Whale" },
    { label: "Dolphin", value: "Dolphin" },
  ];
  const currency = [
    { label: "RWF", value: "RWF" },
    { label: "USD", value: "USD" },
  ];

  const natureofpaternship= [
    { label: "Sole consultancy", value: "Sole consultancy" },
    { label: "Joint Venture", value: "Joint Venture" },
    { label: "Consortium", value: "Consortium" },
  ]
  const Active = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const TypeofBid = [
    { label: "Proposal", value: "Proposal" },
    { label: "EOI", value: "EOI" },
    { label: "Grant Application", value: "Grant Application" },
    { label: "Concept note", value: "Concept note" },
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

  const clientss = clients.map((org) => ({
    value: org.id,
    label: org.client_name,
  }));

  const [thename, setName] = useState(null);
  const [type, setType] = useState(null);
  const [thesector, setSector] = useState(null);
  const [reapeat, setRepeat] = useState(null);
  const [financialcontract, setFinancialContract] = useState(null);
  const [active, setActive] = useState(null);
  const [contractTypee, setContractType] = useState(null);
  const [client, setClients] = useState(null);
  const [loee, setLOE] = useState(null);
  const [currencyy, setCurrency] = useState(null);
  const [typeofbid, setTypeofBid] = useState(null);
  const [thelabel, setLabel] = useState(null);
  const [bidwith, setBidwith] = useState(null);
  const [submissiondate, setSubmissiondate] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const handleType = (selectedOption) => {
    setType(selectedOption.value);
  };

  const handleSecto = (selectedOption) => {
    setSector(selectedOption.value);
  };
  const handleRepeat = (selectedOption) => {
    setRepeat(selectedOption.value);
  };

   const handleNatureof= (selectedOption)=>{
    setBidwith(selectedOption.value)
   }
  const handleTypeofBid = (selectedOption) => {
    setTypeofBid(selectedOption.value);
  };
  const handleActive = (selectedOption) => {
    setActive(selectedOption.value);
  };
  const handleContractType = (selectedOption) => {
    setContractType(selectedOption.value);
  };
  const handleClients = (selectedOption) => {
    setClients(selectedOption.value);
  };

  const handleLoe = (selectedOption) => {
    setLOE(selectedOption.value);
  };
  const handleCurrency = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  const handleLabel = (selectedOption) => {
    setLabel(selectedOption.value);
  };
  const createProject = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://databankvanguard-b3d326c04ab4.herokuapp.com/indicators/newproject/create/",
        {
          name: thename,
          projecttype: type,
          sector: thesector,
          status: "Prepipeline",
          type_of_bid: typeofbid,
          contract_type: contractTypee,
          repeat_business: reapeat,
          financial_proposal: financialcontract,
          client: client,
          label: thelabel,
          bidwith: bidwith,
          submitteddate: deadline,
          deadline: deadline,
        }
      );

      console.log(response.data);
      alert("Done");
      setLoading(false);
      // Log the response data if needed
    } catch (err) {
      setLoading(false);
      alert("failed");
      console.error("Error creating project:", err);
    }
  };

  return (
    <>
      <div className="">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden m-5">
          <div className="col-span-full xl:col-span-8 bg-white  shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 mb-3">
            {/* <!-- Contact Form --> */}
            <div className="">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black ">
                  Register a prepipeline project
                </h3>
              </div>
              <form action="#" className="w-full">
                {" "}
                <div className="p-6.5">
                  <div className=" mb-4">
                    <label className="mb-2.5 block text-black ">
                      Name of The Project{" "}
                      <span className="text-meta-1 text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your Project"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">Client</label>
                      <Select options={clientss} onChange={handleClients} />
                    </div>{" "}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Project Type
                      </label>
                      <Select options={projectttype} onChange={handleType} />
                    </div>{" "}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">Sector</label>
                      <Select options={sector} onChange={handleSecto} />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Type of Bid
                      </label>
                      <Select options={TypeofBid} onChange={handleTypeofBid} />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Contract Type
                      </label>
                      <Select
                        options={contractType}
                        onChange={handleContractType}
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Repeat Business
                      </label>
                      <Select
                        options={RepeatBusinessArray}
                        onChange={handleRepeat}
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {/* <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black ">
                      Active
                    </label>
                    <Select  options={Active} 
                    onChange={handleActive}
                    />
                  </div> */}
                    {/* <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black ">
                      Level of Effort
                    </label>
                    <Select options={loe} 
                    onChange={handleLoe}
                    />
                  </div> */}
                    {/* <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black ">
                      Currency
                    </label>
                    <Select options={currency}
                    onChange={handleCurrency}
                    />
                  </div> */}
                    {/* {currencyy ==='USD'?   <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black">
                      Exchange rate
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Signed Contract"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>: null}   */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Financial Contract
                      </label>
                      <input
                        type="number"
                        placeholder="Proposal contract"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event) =>
                          setFinancialContract(event.target.value)
                        }
                      />
                    </div>

                    {/* <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Bid With
                      </label>
                      <input
                        type="text"
                        placeholder="Enter the name of company we are bidding with"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event) => setBidwith(event.target.value)}
                      />
                    </div> */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">Nature of paternship</label>
                      <Select options={natureofpaternship} onChange={handleNatureof} />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">Label</label>
                      <Select options={Label} onChange={handleLabel} />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Deadline
                      </label>
                      <input
                        type="date"
                        placeholder="Enter submission date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event) => setDeadline(event.target.value)}
                      />
                    </div>
                    {/* <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black ">
                        Submission Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter submission date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event) =>
                          setSubmissiondate(event.target.value)
                        }
                      />
                    </div> */}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      createProject();
                    }}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 bg-[#087ABC] my-3  text-cyan-50"
                  >
                    {isloding ? "loading" : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Clients />
    </>
  );
};

export default RegisterProjects;
