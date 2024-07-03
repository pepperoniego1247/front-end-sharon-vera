import './App.css';
// import { NavBar } from './common/navBar';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRouter from './router';
import { NotificationProvider } from './context/notification';


function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </NotificationProvider>
    </div>
  );
}

export default App;
