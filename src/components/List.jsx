import styles from './List.module.scss';
import User from './User';/* eslint-disable react/prop-types */
export default function List({listData, onItemClicked, actions}){

  const getListItems = () =>{
    return listData.map((listItem)=>{
      return <li key={listItem.id} onClick={() => onItemClicked(listItem.id)}>
        {/* TODO: Wrap this into a Link component and remove the onItemClicked */}
        <User user={listItem}/>
      </li>
    })
  }

  // TODO: Replace actions with link
  return <ul className={styles['list']}>
    {getListItems()}
    {actions}
  </ul>
}