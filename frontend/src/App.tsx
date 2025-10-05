import './App.css'
import { useRoutes, BrowserRouter } from 'react-router-dom';
import {routes} from './user/routes/router'

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
export default App
