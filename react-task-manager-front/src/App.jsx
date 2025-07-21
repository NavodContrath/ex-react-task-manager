import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import DefaultLayout from './layout/DefaultLayout'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import TaskDetails from './pages/TaskDetails'
import Home from './pages/Home'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/task-list' element={<TaskList />} />
              <Route path='/add-task' element={<AddTask />} />
              <Route path='/task/:id' element={<TaskDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>

    </>
  )
}

export default App
