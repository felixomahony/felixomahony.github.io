import Home from './Home';
import Articles from './Articles'
import Game from './Game'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    );
  }

export default App;