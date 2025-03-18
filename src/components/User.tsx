import { UserI } from '../types/user';

interface UserProps {
  user: UserI
}

export default function User({user}:UserProps){
  return (
    <>
       <h4>{`${user.firstname} ${user.lastname}`}</h4>
       <p><span>City: </span>{user.address?.city || '-'}</p>
    </>
  )
}