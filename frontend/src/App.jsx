import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import allRoutesMapper from './routes';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {allRoutesMapper?.map((singleRoute, index) => (
            <Route
              key={'route' + index + 1}
              path={singleRoute?.path}
              element={singleRoute?.component}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
