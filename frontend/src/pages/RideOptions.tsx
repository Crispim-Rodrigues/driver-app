import { RideResponseType } from "@/types/RideRequest";
import { useLocation } from "react-router-dom"

function RideOptions() {
  const location = useLocation();
  const data:RideResponseType  = location.state
  function click(){
    console.log(data)
  }
  return (
    <button type="submit" onClick={click}>Clique</button>
  )
}

export default RideOptions