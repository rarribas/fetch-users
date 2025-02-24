import { Link } from 'react-router';
import styles from './List.module.scss';
import User from './User';/* eslint-disable react/prop-types */
export default function List({listData, onItemClicked}){

  const getListItems = () =>{
    return listData.map((listItem)=>{
      return <li key={listItem.id} onClick={() => onItemClicked(listItem.id)}>
        <User user={listItem}/>
      </li>
    })
  }

  return <ul className={styles['list']}>
    {getListItems()}
    <Link to="/add-user"> Add New User</Link>
  </ul>
}