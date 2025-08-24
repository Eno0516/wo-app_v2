import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './user/pages/HomePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}
export default App
