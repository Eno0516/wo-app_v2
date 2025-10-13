import './App.css'
import { useRoutes } from 'react-router-dom';
import routes from './routes/index'

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  return (
      <AppRoutes />
  )
}
export default App
