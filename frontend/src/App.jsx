import './App.css'
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import GetOtp from './pages/GetOtp'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import Createcompany from './components/admin/Createcompany';
import CompanySetup from './components/admin/CompanySetup';
import Job from './components/admin/Job';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';
import ProtectedRoutes from './components/admin/ProtectedRoutes';
function App() {
 
  return (
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/getOtp' element={<GetOtp/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/jobs' element={<Jobs/>}></Route>
    <Route path='/browse' element={<Browse/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/description/:id' element={<JobDescription/>}></Route>
    <Route path='/admin/companies' element={<ProtectedRoutes> <Companies/></ProtectedRoutes>  }></Route>
    <Route path='/admin/companies/create' element={ <ProtectedRoutes><Createcompany/></ProtectedRoutes>  }></Route>
    <Route path='/admin/companies/:id' element={ <ProtectedRoutes><CompanySetup/></ProtectedRoutes>   }></Route>
    <Route path='/admin/jobs' element={ <ProtectedRoutes>  <Job/></ProtectedRoutes>  }></Route>
    <Route path='/admin/jobs/create' element={ <ProtectedRoutes><PostJobs/></ProtectedRoutes>   }></Route>
    <Route path='/admin/jobs/:id/applicants'element={  <ProtectedRoutes> <Applicants/></ProtectedRoutes> }></Route>
   </Routes>
    </BrowserRouter>
  )
}

export default App
