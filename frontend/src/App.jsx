import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard, SendMoney, Signin, Signup } from './pages';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/send' element={<SendMoney/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
