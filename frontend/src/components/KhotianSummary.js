// UpcomingAssessmentsCard.js
import React from "react";

const KhotianSummary = () => {
  // Dummy data for upcoming assessments
  const upcomingAssessments = ["CT", "Viva", "Lab Exam", "Coding Assignments"];

  return (
    <div className="upcoming-assessments-card">
      <h1 className="logo-khotian">
        <span>Upcoming Assessments</span>
      </h1>
      <ul>
        {upcomingAssessments.map((assessment, index) => (
          <li key={index}>{assessment}</li>
        ))}
      </ul>
    </div>
  );
};

export default KhotianSummary;
