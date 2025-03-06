import styles from './List.module.scss';
import User from './User';
import { Link } from 'react-router';
export default function List({listData}){

  const getListItems = () =>{
    return listData.map((listItem)=>{
      return <li key={listItem.id}>
        <Link to={`/user/${listItem.id}/view`}>
          <User user={listItem}/>
        </Link>
      </li>
    })
  }

  return <ul className={styles['list']}>
    {getListItems()}
    <Link className='add-button' to="/add-user"> Add New User</Link>
  </ul>
}