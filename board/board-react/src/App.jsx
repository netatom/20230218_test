import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import ListBoard from './components/ListBoard'
import AddBoard from './components/AddBoard'
import DetailBoard from './components/DetailBoard'
import EditBoard from './components/EditBoard'
import DeleteBoard from './components/DeleteBoard'

const App = () => {
  return (
    <div className="continer-fluid">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListBoard />} />
          <Route path='/addBoard' element={<AddBoard />} />
          <Route path='/detailBoard/:id' element={<DetailBoard />} />
          <Route path='/editBoard/:id' element={<EditBoard />} />
          <Route path='/deleteBoard/:id' element={<DeleteBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App