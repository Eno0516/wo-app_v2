import './App.css'
import { useRoutes } from 'react-router-dom';
import routes from './routes/index'
import { FarmProvider } from './user/contexts/FarmContext';

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  return (
    <FarmProvider>
      <AppRoutes />
    </FarmProvider>  
  )
}
export default App
