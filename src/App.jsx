import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './features/store'; // Import your Redux store
import TabsComponent from './components/topnav';
import Overview from './pages/Dashboard';
import RegisterProjects from './pages/Register'
import NewPrepipeline from './pages/prepipeline';
import ActiveBids from './pages/active';
import Waiting from './pages/waiting';
import Projects from './pages/project';
import Archive from './pages/archive';
import Failed from './pages/failed';
function App() {
  return (
    <Provider store={store}> {/* Wrap your app in Provider */}
      <Router>
          <TabsComponent />
        <div className=" bg-[#e1eaed]">
          <Routes>
            
            <Route path="/" element={<Overview />} />
            <Route path="/register" element={<RegisterProjects />} />
            <Route path="/prepipeline" element={<NewPrepipeline />} />
            <Route path="/activeBids" element={<ActiveBids/>} />
            <Route path="/waiting" element={<Waiting/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/archive" element={<Archive/>} />
            <Route path="/failed" element={<Failed/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
