import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import Admin pages
import AdminListPage from './Pages/Admin/List/List';
import AdminCreatePage from './Pages/Admin/Create/Create';
import AdminEditPage from './Pages/Admin/Edit/Edit';
import AdminShowPage from './Pages/Admin/Show/Show';

// Import Event pages
import EventListPage from './Pages/Events/List/List';
import EventShowPage from './Pages/Events/Show/Show';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Events</Link>
            </li>
            <li>
              <Link to="/admins">Admins</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<EventListPage />} />
            
            {/* Admin Routes */}
            <Route path="/admins" element={<AdminListPage />} />
            <Route path="/admins/create" element={<AdminCreatePage />} />
            <Route path="/admins/:id/edit" element={<AdminEditPage />} />
            <Route path="/admins/:id" element={<AdminShowPage />} />

            {/* Event Routes */}
            <Route path="/events/:id" element={<EventShowPage />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
