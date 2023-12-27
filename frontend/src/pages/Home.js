import {React,useEffect} from 'react'
import axios from "axios"
import { useKhotianContext } from '../hooks/useKhotianContext'
import {useAuthContext} from '../hooks/useAuthContext'
//components
import KhotianDetails from "../components/khotianDetails"
import KhotianForm from '../components/khotianForm'

const Home = () => {
    //const [khotianList,setkhotianList]=useState(null) //no longer needed

    const {khotianList,dispatch} =useKhotianContext()
    const {user}=useAuthContext()

   //this function will be fired once as soon as this component is rendered
   useEffect(() => {
    const fetchKhotians = async () => {
      try {
        const response = await axios.get('/api/khotian', {
          headers: { 'Authorization' : `Bearer ${user.jwtToken}` },
        });

        if (response.status === 200) {
          const json = response.data;
          dispatch({ type: 'SET_KHOTIANS', payload: json });
        }
      } catch (error) {
        // Handle error, e.g., set an error state or dispatch an error action
        console.error('Error fetching khotians:', error);
      }
    };

    if (user) {
      fetchKhotians();
    }
  }, [dispatch, user]);

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
