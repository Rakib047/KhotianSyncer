import {React,useEffect} from 'react'
import axios from "axios"
import { useKhotianContext } from '../hooks/useKhotianContext'

//components
import KhotianDetails from "../components/khotianDetails"
import KhotianForm from '../components/khotianForm'

const Home = () => {
    //const [khotianList,setkhotianList]=useState(null) //no longer needed

    const {khotianList,dispatch} =useKhotianContext()

   //this function will be fired once as soon as this component is rendered
  useEffect(()=>{
        axios.get("/api/khotian")
                .then(response=>{dispatch({type:"SET_KHOTIANS",payload:response.data})})
                .catch(err=>{console.log(err)})
  },[])
  return (
    <div className="home">
      <div className="khotians">
        {khotianList && khotianList.map((singleKhotian)=>(
            <KhotianDetails key={singleKhotian._id} singleKhotian={singleKhotian} />
        ))}
      </div>
      <KhotianForm/>
    </div>
  )
}

export default Home
