import { React, useEffect, useState } from "react";
import axios from "axios";
import { useKhotianContext } from "../hooks/useKhotianContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "react-calendar/dist/Calendar.css";
import KhotianCalendar from "../components/KhotianCalendar";

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fetchKhotians();
    }
  }, [dispatch, user, khotianList]);


  //filtering
  // UseEffect to filter khotians whenever filterType changes
  useEffect(() => {
    //function for different filtering
    const filterKhotians = () => {
      let currentList = khotianList;
      if (filterType !== "All") {
        currentList = currentList.filter(
          (khotian) => khotian.taskType === filterType
        );
      }
      if (priorityType !== "All") {
        currentList = currentList.filter(
          (khotian) => khotian.priority === priorityType
        );
      }
      return currentList;
    };

    const filteredList = filterKhotians();

    setFilteredKhotians(filteredList);

  }, [priorityType, filterType, khotianList]);

  


  return (
    
    <div className="home">
      
      <div className="khotians">
        <div className="filter-container">
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="All">All Assessments</option>
            <option value="CT">CT</option>
            <option value="OFFLINE">OFFLINE</option>
            <option value="ONLINE">ONLINE</option>
            <option value="ASSIGNMENT">ASSIGNMENT</option>
            <option value="EVALUATION">EVALUATION</option>
            <option value="THESIS">THESIS WORK</option>
            <option value="PRESENTATION">PRESENTATION</option>
            <option value="LAB QUIZ">LAB QUIZ</option>
          </select>

          <select
            value={priorityType}
            onChange={(e) => {
              setpriorityType(e.target.value);
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

      <div>
      <div className="calendar-container">
          {khotianList !== null && (
            <KhotianCalendar khotianList={filteredKhotians} />
          )}
        </div>
        <KhotianForm />  
      </div>
    </div>
  );
};

export default Home;
