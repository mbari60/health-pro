import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages.js/home";
import Footer from "./Components/Footer";
import "react-toastify/dist/ReactToastify.css";
import PatientForm from "./Pages.js/PatientForm";
import DailyTrack from "./Pages.js/DailyTrack";
import { useEffect, useState } from "react";
import { BASE_URL } from "./HostingUrl/Url";
import Lists from "./Pages.js/Lists";

function App() {
  const [patientsData, setPatientData] = useState([]);
  //fetching data of patient list from the database
  useEffect(() => {
    fetch(`${BASE_URL}/patientform`)
      .then((res) => res.json())
      .then((data) => setPatientData(data))
      .catch((err) =>
        console.log("There was a problem retrieving patients data", err)
      );
  },[]);
  const [patientsDailyTack, setPatientsDailyTrack] = useState([]);
  // Fetching dailytrack list from the database
  useEffect(() => {
    fetch(`${BASE_URL}/dailytracks`)
      .then((res) => res.json())
      .then((data) => setPatientsDailyTrack(data))
      .catch((err) =>
        console.log("There was a problem retrieving dailytrack data", err)
      );
  },[]);

  const handleDelete = (phone) => {
    fetch(`${BASE_URL}/patientform/${phone}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete data");
        }
        // Removing the deleted patient from the list
        setPatientData((prevPatients) =>
          prevPatients.filter((patient) => patient.phone !== phone)
        );
      })
      .catch((err) => {
        console.log("There was an error deleting data", err);
      });
  };

const handleDeleteDailyTrack = (patNumber) => {
  fetch(`${BASE_URL}/dailytracks/${patNumber}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete data");
      }
      //removing the patient if the res is ok 
      setPatientsDailyTrack((prevPatients) =>
        prevPatients.filter((patient) => patient.patNumber !== patNumber)
      );
    })
    .catch((err) => {
      console.log("There was an error deleting data", err);
    });
};

  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PatientForm" element={<PatientForm />} />
        <Route path="DailyTrack" element={<DailyTrack />} />
        <Route
          path="Lists"
          element={
            <Lists
              patientsData={patientsData}
              patientsDailyTack={patientsDailyTack}
              handleDelete={handleDelete}
              handleDeleteDailyTrack={handleDeleteDailyTrack}
            />
          }
        />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
