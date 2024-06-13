import React from 'react';
import MainCard from './components/MainCard';

function App() {
  return (
    <div className="App h-svh flex flex-col justify-between">
      <header className="bg-black flex justify-center min-h-[5svh]">
        <h2 className='text-white text-3xl font-Bayon'> One!t </h2>
      </header>
      <main className='max-h-[90svh] flex w-svw justify-center mb-3 mt-3'>
        <MainCard />
      </main>
      <footer className='bg-slate-100 text-xs justify-evenly flex flex-col font-light items-center min-h-[5svh]'>
        <p>Created by Team.CLOV3R</p>
        <p>Powerd by chatGPT</p>
      </footer>
    </div>
  );
}

export default App;
