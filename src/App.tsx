import React, { Suspense } from 'react';
import MainCard from './components/MainCard';

import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  return (
    <div className="App h-svh flex flex-col justify-between">
      <header className="bg-black flex justify-center min-h-[5svh]">
        <h2 className='text-white text-3xl font-Bayon'> One!t </h2>
      </header>
      <main className='max-h-[90svh] flex w-svw justify-center mb-3 mt-3'>
        <div className='flex justify-center w-[80%] '>
          <Suspense fallback={<div>Loading...</div>}>
          <Router>
              <Routes>
                  <Route path="/quiz/:chatID" element={<Quiz/>} />
                  <Route path="/result/:chatID" element={<Results/>} />
                  <Route path="/" element={<MainCard/>}>
                  </Route>
              </Routes>
          </Router>
          </Suspense>
        </div>
      </main>
      <footer className='bg-slate-100 text-xs justify-evenly flex flex-col font-light items-center min-h-[5svh]'>
        <p>Created by Team.CLOV3R</p>
        <p>Powerd by chatGPT</p>
      </footer>
    </div>
  );
}

export default App;
