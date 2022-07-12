import './search-panel.css'
import {Component} from 'react'

class SearchPanel extends Component {
  state = {
    term: ''
  }

  onUpdateSearch = (e) => {
    const term = e.target.value
    this.setState({term})
    this.props.onUpdateSearch(term)
  }

  render() {
    const {term} = this.state
    const {onUpdateSearch} = this

    return (
      <input
        className="form-control search-input"
        value={term}
        type="text"
        placeholder="Найти сотрудника"
        onChange={onUpdateSearch}/>
    )
  }
}

export default SearchPanel