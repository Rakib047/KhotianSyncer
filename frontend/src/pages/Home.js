import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKhotianContext } from "../hooks/useKhotianContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "react-calendar/dist/Calendar.css";
import KhotianCalendar from "../components/KhotianCalendar";
import KhotianDetails from "../components/khotianDetails";
import KhotianForm from "../components/khotianForm";

const Home = () => {
  const { khotianList, dispatch } = useKhotianContext();
  const { user } = useAuthContext();
  const [filterType, setFilterType] = useState("All");
  const [priorityType, setPriorityType] = useState("All");
  const [filteredKhotians, setFilteredKhotians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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

        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching khotians:", error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    if (user) {
      fetchKhotians();
    }
  }, [dispatch, user]);

  useEffect(() => {
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
    <div>
      <h2 className="headings">
        <i className="fa-solid fa-list-check"></i> Assessments
      </h2>
      {isLoading ? (
        <div className="loader-container">
          <ClimbingBoxLoader color="#1aac83" />
        </div>
      ) : (
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
                  setPriorityType(e.target.value);
                }}
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {filteredKhotians.map((singleKhotian) => (
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
      )}
    </div>
  );
};

export default Home;
