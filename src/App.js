import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Preloader from './components/preloader/preloader';
const Mint = lazy(() => import('./pages/mint/mint'));

function App() {

  // window.onload = () => {
  //   document.querySelector(".preloader").style.display = "none";
  //   document.querySelector(".App").style.display = "block";
  // }

  return (
    <>
      <div className="App">
        <ToastContainer pauseOnFocusLoss={false} />
        <Router>
          <Routes>
            <Route exact path={'/'} element={
              <Suspense fallback={<div>Loading...</div>}>
                <Mint />
              </Suspense>
            } />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
