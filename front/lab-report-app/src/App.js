
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layout/Navbar'
import Home from './reports/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddReport from './reports/AddReport';
import EditReport from './reports/EditReport';
import ViewReport from './reports/ViewReport';
import LaborantHome from './pages/LaborantHome';
import UserHome from './reports/UserHome';

function App() {
  return (
    <BrowserRouter>
      
        <Navbar/>
        <Routes>
            <Route index element={<Home/>}></Route>
            <Route exact path="/laborantPage" element={<LaborantHome/>}></Route>
            <Route exact path="/userPage" element={<UserHome/>}></Route>
            <Route exact path="/addreport" element={<AddReport/>}></Route>
            <Route exact path="/editreport/:id" element={<EditReport/>}></Route>
            <Route exact path="/viewreport/:id" element={<ViewReport/>}></Route>
        </Routes>
        
        
      
      
    </BrowserRouter>
  );
}

export default App;
