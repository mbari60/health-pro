import React, { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

function Lists({ patientsData, patientsDailyTack ,handleDelete , handleDeleteDailyTrack, isDeleting}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatientsData =
    patientsData &&
    patientsData.filter((patient) => {
      const phone = patient.phone && String(patient.phone);
      return phone && phone.includes(searchTerm);
    });

  const filteredPatientsDailyTrack =
    patientsDailyTack &&
    patientsDailyTack.filter((dailyTrack) =>
      String(dailyTrack.patNumber).includes(String(searchTerm))
    );

  return (
    <Stack spacing={4} p={4}>
      <Input
        type="number"
        placeholder="Search by phone number or patNumber"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Heading as="h2" size="md">
        Patient Data Table
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Age</Th>
            <Th>Gender</Th>
            <Th>Disease</Th>
            <Th>Dose Start Date</Th>
            <Th>Dose End Date</Th>
            <Th>Selected Doctor</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patientsData &&
            filteredPatientsData.map((patient, index) => (
              <Tr key={index}>
                <Td>{patient.name}</Td>
                <Td>{patient.phone}</Td>
                <Td>{patient.age}</Td>
                <Td>{patient.gender}</Td>
                <Td>{patient.disease}</Td>
                <Td>{patient.doseStartDate}</Td>
                <Td>{patient.doseEndDate}</Td>
                <Td>{patient.selectedDoctor}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(patient.phone)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Heading as="h2" size="md">
        Daily Track Data Table
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Pat Number</Th>
            <Th>Body Temperature</Th>
            <Th>Blood Pressure</Th>
            <Th>Diet</Th>
            <Th>Water Intake</Th>
            <Th>Medication Effectiveness</Th>
            <Th>Sleep Duration</Th>
            <Th>Nausea</Th>
            <Th>Tiredness</Th>
            <Th>Other Symptoms</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredPatientsDailyTrack.map((dailyTrack, index) => (
            <Tr key={index}>
              <Td>{dailyTrack.patNumber}</Td>
              <Td>{dailyTrack.bodyTemperature}</Td>
              <Td>{dailyTrack.bloodPressure}</Td>
              <Td>{dailyTrack.diet}</Td>
              <Td>{dailyTrack.waterIntake}</Td>
              <Td>{dailyTrack.medicationEffectiveness}</Td>
              <Td>{dailyTrack.sleepDuration}</Td>
              <Td>{dailyTrack.nausea ? "Yes" : "No"}</Td>
              <Td>{dailyTrack.tiredness ? "Yes" : "No"}</Td>
              <Td>{dailyTrack.otherSymptoms}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteDailyTrack(dailyTrack.patNumber)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
}

export default Lists;
