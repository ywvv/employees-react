import {Component} from 'react'
import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form'
import nextId from 'react-id-generator'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, rise: true, id: nextId()},
        {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: nextId()},
        {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: nextId()}
      ]
    }
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return ({
        data: data.filter(item => item.id !== id)
      })
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: nextId()
    }

    this.setState(({data}) => {
      const newArr = [...data, newItem]
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        return (item.id === id) ? {...item, [prop]: !item[prop]} : item
      })
    }))
  }

  render() {
    const {data} = this.state
    const {deleteItem, addItem, onToggleProp} = this

    return (
      <div className="app">
        <AppInfo data={data}/>
        <div className="search-panel">
          <SearchPanel/>
          <AppFilter/>
        </div>
        <EmployeesList
          data={data}
          onDelete={deleteItem}
          onToggleProp={onToggleProp}/>
        <EmployeesAddForm onAdd={addItem}/>
      </div>
    )
  }
}

export default App