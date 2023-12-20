import React, { useState } from "react";
import { BASE_URL } from "../HostingUrl/Url";
import toast from "react-hot-toast";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  HStack,
} from "@chakra-ui/react";

const PatientForm = () => {
  const initialData = {
    name: "",
    phone: "",
    age: "",
    gender: "",
    disease: "",
    doseStartDate: "",
    doseEndDate: "",
    selectedDoctor: "",
  };
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    fetch(`${BASE_URL}/patientform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Patient data added successfully", { duration: 5000 });
        // Adding a timeout of 3 seconds before resetting the form and stopping loading
        setTimeout(() => {
          // reset form
          setFormData(initialData);
          // stop loading
          setisLoading(false);
        },5000);
      })
      .catch((err) => {
        toast.error("Unknown error occurred. Try again later", {
          duration: 6000,
        });
        setisLoading(false);
        console.log("There was an error posting data", err);
      });
  };
  
  return (
    <Box
      maxW="500px"
      m="auto"
      p="3"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
          <FormLabel>Full Name: eg john doe</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="john Doe"
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Phone: eg 712345678</FormLabel>
          <Input
            type="tel"
            name="phone"
            placeholder="712345678"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Age: eg 18</FormLabel>
          <Input
            type="number"
            min={1}
            name="age"
            placeholder="18"
            value={formData.age}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Gender:</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            isRequired
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="bisexual">Bi-sexual</option>
          </Select>
        </FormControl>
        <br />

        <FormControl mb="4" isRequired>
          <FormLabel>Disease: eg Malaria</FormLabel>
          <Input
            type="text"
            name="disease"
            placeholder="Malaria"
            value={formData.disease}
            onChange={handleInputChange}
          />
        </FormControl>

        <HStack mb="4">
          <FormControl isRequired>
            <FormLabel>Dose Start Date:</FormLabel>
            <Input
              type="datetime-local"
              name="doseStartDate"
              value={formData.doseStartDate}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Dose End Date:</FormLabel>
            <Input
              type="datetime-local"
              name="doseEndDate"
              value={formData.doseEndDate}
              onChange={handleInputChange}
            />
          </FormControl>
        </HStack>

        <FormControl mb="4" isRequired>
          <FormLabel>Choose Doctor:</FormLabel>
          <Select
            name="selectedDoctor"
            value={formData.selectedDoctor}
            onChange={handleInputChange}
            isRequired
          >
            <option value="" disabled>
              Select Doctor
            </option>
            {["Kevin", "Ray", "Vinn", "Mil", "jay"].map((doctor) => (
              <option key={doctor} value={doctor}>
                Dr.{doctor}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          colorScheme="teal"
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting ..... "
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PatientForm;
