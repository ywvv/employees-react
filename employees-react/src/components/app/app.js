import {Component} from 'react'
import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form'
import nextId from 'react-id-generator'
import './app.css'

class App extends Component {
  state = {
    data: [
      {name: 'John C.', salary: 800, increase: false, rise: true, id: nextId()},
      {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: nextId()},
      {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: nextId()}
    ],
    term: '',
    filter: 'all'
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

  searchEmp = (items, term) => {
    if (!term.length) return items
    return items.filter(item => {
      return item.name.indexOf(term) !== -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterEmp = (items, filter) => {
    switch (filter) {
      case 'rise': {
        return items.filter(item => item.rise)
      }
      case 'moreThen1000': {
        return items.filter(item => item.salary > 1000)
      }
      default: {
        return items
      }
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  onChangeValue = (id, value) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        return (item.id === id) ? {...item, salary: value} : item
      })
    }))
  }

  render() {
    const {data, term, filter} = this.state
    const {deleteItem, addItem, onToggleProp, searchEmp, onUpdateSearch, filterEmp, onFilterSelect, onChangeValue} = this
    const visibleData = filterEmp(searchEmp(data, term), filter)

    return (
      <div className="app">
        <AppInfo data={data}/>
        <div className="search-panel">
          <SearchPanel onUpdateSearch={onUpdateSearch}/>
          <AppFilter filter={filter} onFilterSelect={onFilterSelect}/>
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={deleteItem}
          onToggleProp={onToggleProp}
          onChangeValue={onChangeValue}/>
        <EmployeesAddForm onAdd={addItem}/>
      </div>
    )
  }
}

export default App