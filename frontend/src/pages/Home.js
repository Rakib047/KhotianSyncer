import { React, useEffect, useState } from "react";
import axios from "axios";
import { useKhotianContext } from "../hooks/useKhotianContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import KhotianDetails from "../components/khotianDetails";
import KhotianForm from "../components/khotianForm";

const Home = () => {
  //const [khotianList,setkhotianList]=useState(null) //no longer needed

  const { khotianList, dispatch } = useKhotianContext();
  const { user } = useAuthContext();
  const [filterType, setFilterType] = useState("All");
  const [priorityType, setpriorityType] = useState("All");
  const [filteredKhotians, setFilteredKhotians] = useState([]);

  //this function will be fired once as soon as this component is rendered
  useEffect(() => {
    const fetchKhotians = async () => {
      try {
        const response = await axios.get("/api/khotian", {
          headers: { Authorization: `Bearer ${user.jwtToken}` },
        });

        if (response.status === 200) {
          const json = response.data;
          dispatch({ type: "SET_KHOTIANS", payload: json });
        }
      } catch (error) {
        // Handle error, e.g., set an error state or dispatch an error action
        console.error("Error fetching khotians:", error);
      }
    };

    if (user) {
      fetchKhotians();
    }
  }, [dispatch, user,khotianList]);

  //filtering
  // UseEffect to filter khotians whenever filterType changes
  useEffect(() => {
    const filteredList = filterKhotians();

    setFilteredKhotians(filteredList);

  }, [priorityType,filterType, khotianList]);

  //function for different filtering 
  const filterKhotians = () => {
      let currentList=khotianList
      if(filterType!=="All"){
        currentList=currentList.filter((khotian) => khotian.taskType === filterType)
      }
      if(priorityType!=="All"){
        currentList=currentList.filter((khotian) => khotian.priority === priorityType)
      }
      return currentList
  };

  return (
    <div className="home">
      <div className="khotians">
        <div className="filter-container">
          <select
            
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value)
            }}
            
          >
            <option value="All">All Assessments</option>
            <option value="CT">CT</option>
            <option value="OFFLINE">Offline</option>
            <option value="ONLINE">Online</option>
            <option value="ASSIGNMENT">Assignment</option>
            <option value="EVALUATION">Evaluation</option>
            <option value="THESIS">THESIS WORK</option>
            <option value="PRESENTATION">PRESENTATION</option>
            <option value="LAB QUIZ">LAB QUIZ</option>
          </select>

          <select
            
            value={priorityType}
            onChange={(e) => {
              setpriorityType(e.target.value)
              
            }}
          >
            <option value="All">All Priorites</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {filteredKhotians &&
          filteredKhotians.map((singleKhotian) => (
            <KhotianDetails
              key={singleKhotian._id}
              singleKhotian={singleKhotian}
            />
          ))}
      </div>
      <KhotianForm />
    </div>
  );
};

export default Home;
