import { useParams } from "react-router";
export default function UserItem(){
  let params = useParams();
  console.log(params);
  return <h1>User Item Page</h1>
}