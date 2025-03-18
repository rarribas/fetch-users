import styles from './List.module.scss';
import User from './User';
import { UserI } from '../types/user';
import { Link } from 'react-router';

interface ListProps {
  listData: UserI[]
}

export default function List({listData}:ListProps){
  
  const getListItems = () =>{
    return listData.map((listItem: UserI)=>{
      return <li key={listItem.id}>
        <Link to={`/user/${listItem.id}/view`}>
          <User user={listItem}/>
        </Link>
      </li>
    })
  }

  return <ul className={styles['list']}>
    {getListItems()}
    <Link to="/add-user"> Add New User</Link>
  </ul>
}