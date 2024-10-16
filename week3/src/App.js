import './App.css';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Intro from './components/intro';


function App() {
  return (
    <div className="App">
       <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">Week 5 application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={'/intro'}>Intro</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path={'/'} element={<p>Welcome page </p>}></Route>
          <Route path={'/intro'} element={<Intro/>}></Route>
        </Routes>
    </div>
  );
}

export default App;