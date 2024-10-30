import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TabsComponent = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Overview', path: '/' },
    { name: 'Prepipeline', path: '/prepipeline' },
    { name: 'Active Bids', path: '/activeBids' },
    { name: 'Submitted & Waiting', path: '/waiting' },
    { name: 'Projects', path: '/projects' },
    { name: 'Suspended', path: '/archive' },
    { name: 'Failed', path: '/failed' },
    { name: 'Register', path: '/register' },
  ];

  const mainColor = '#087abc'; // Main color
  const activeClasses = `text-[#087abc] border-b-2 border-[#087abc] font-bold`;
  const inactiveClasses = 'border-transparent text-gray-600 hover:text-[${mainColor}] hover:border-b-2 hover:border-[${mainColor}]';

  // Set active tab based on the current path
  useEffect(() => {
    const currentTab = tabs.findIndex(tab => tab.path === location.pathname);
    setActiveTab(currentTab !== -1 ? currentTab : 0);
  }, [location.pathname]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-center p-0" style={{ color: mainColor }}>
        Business Development Dashboard
      </h2>
      <div className="flex justify-between border-b-2">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            to={tab.path}
            className={`py-2 px-4 transition-all duration-300 ease-in-out 
              ${activeTab === index 
                ? activeClasses 
                : inactiveClasses
              }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
