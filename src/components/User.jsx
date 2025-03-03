/* eslint-disable react/prop-types */
export default function User({user}){
  return (
    <>
       <h4>{`${user.firstname} ${user.lastname}`}</h4>
       <p><span>City: </span>{user.address?.city || '-'}</p>
    </>
  )
}