import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { useAuth } from '@clerk/clerk-react'
import CodeRoast from './pages/CodeRoast'


function App() {
  const { isSignedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/coderoast" element={isSignedIn ? <CodeRoast /> : <SignIn />} />
        <Route path="/signup" element={isSignedIn ? <CodeRoast /> : <SignUp />} />
        <Route path="/signin" element={isSignedIn ? <CodeRoast /> : <SignIn/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
