import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import List from './components/pages/List';
import Create from './components/pages/Create';
import Detail from './components/pages/Detail';
import Edit from './components/pages/Edit';

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>No page!!</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/update/:id" element={<Edit />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
