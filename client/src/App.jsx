import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'



import Home from "./pages/Home"
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Layout from'./components/Layout'
import Dashboard from './pages/Dashboard'

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

      <Router>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />}/>

          <Route element={<Layout/>}>

            <Route path='/dashboard' element={<Dashboard/>}/>

          </Route>
        </Routes>

      </Router>

    </QueryClientProvider>
  )
}

export default App
