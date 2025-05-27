import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header.jsx';
import { Main } from './components/Main.jsx';

import { HomePage } from './pages/HomePage.jsx';
import { Details } from './pages/Details.jsx';
import { NotFound } from './pages/NotFound.jsx';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/country/:name" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
