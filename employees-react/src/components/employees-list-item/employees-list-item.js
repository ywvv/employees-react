import './employees-list-item.css'
import classNames from 'classnames'

const EmployeesListItem = (props) => {
  let {name, salary, onDelete, onToggleProp, increase, rise, onChangeValue} = props

  const itemClass = classNames(
    'list-group-item d-flex justify-content-between',
    increase ? 'increase' : '',
    rise ? 'like' : ''
  )

  return (
    <li className={itemClass}>
      <span
        className="list-group-item-label"
        data-toggle="rise"
        tabIndex="1"
        onClick={onToggleProp}>{name}</span>
      <input
        type="text"
        className="list-group-item-input"
        defaultValue={salary + '$'}
        name={name}
        onChange={onChangeValue}/>
      <div className='d-flex justify-content-center align-items-center'>
        <button
          type="button"
          className="btn-cookie btn-sm "
          data-toggle="increase"
          onClick={onToggleProp}>
          <i className="fas fa-cookie"></i>
        </button>

        <button type="button" className="btn-trash btn-sm " onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </div>
    </li>
  )
}

export default EmployeesListItem