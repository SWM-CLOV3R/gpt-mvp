import React, { ReactElement, Suspense } from 'react';

import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { Spinner } from './components/ui/spinner';
import { useAtomsDevtools } from 'jotai-devtools';
const MainCard = React.lazy(() => import('./components/MainCard'));
const Quiz = React.lazy(() => import('./components/Quiz'));
const Results = React.lazy(() => import('./components/Results'));

const AtomsDevtools = ({ children }: { children: ReactElement }) => {
  useAtomsDevtools("demo");
  return children;
};

function App() {
  return (
    <div className="App h-svh flex flex-col justify-between">
      <header className="bg-black flex justify-center min-h-[5svh] align-middle">
        <h2 className='text-white text-3xl font-Bayon'> One!t </h2>
      </header>
      <main className='max-h-[90svh] flex w-svw justify-center mb-3 mt-3'>
        <div className='flex justify-center w-[80%] '>
        <AtomsDevtools>
          <Suspense fallback={<Spinner size="large" />}>
          <Router>
              <Routes>
                  <Route path="/quiz/:chatID" element={<Quiz/>} />
                  <Route path="/result/:chatID" element={<Results/>} />
                  <Route path="/" element={<MainCard/>}>
                  </Route>
              </Routes>
          </Router>
          </Suspense>
        </AtomsDevtools>
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
