/* eslint-disable react/prop-types */
export default function User({user, onUserClick}){
  return (
    <div>
       <h4>{`${user.firstname} ${user.lastname}`}</h4>
       <p><span>Email:</span>{user.email}</p>
    </div>
  )
}