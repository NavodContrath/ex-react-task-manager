import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/task-list' element={<TaskList />} />
            <Route path='/add-task' element={<AddTask />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
