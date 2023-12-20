import { useState } from "react";
import { BASE_URL } from "../HostingUrl/Url";
import toast from "react-hot-toast";

import {
  Box,
  Heading,
  FormControl,
  Button,
  FormLabel,
  Input,
  Textarea,
  Text,
  Select,
} from "@chakra-ui/react";

function DailyTrack() {
  const initialdata = {
    patNumber: "",
    bodyTemperature: "",
    bloodPressure: "",
    diet: "",
    waterIntake: "",
    medicationEffectiveness: "",
    sleepDuration: "",
    nausea: false,
    tiredness: false,
    otherSymptoms: "",
  };
  const [dayTrack, setDayTrack] = useState(initialdata);

  const handleDailyTrackChange = (e) => {
    setDayTrack({
      ...dayTrack,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setDayTrack({
      ...dayTrack,
      [e.target.name]: e.target.checked,
    });
  };
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    fetch(`${BASE_URL}/dailytracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dayTrack),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Daily Track submitted successfully", { duration: 5000 });
        // Adding a timeout of 3 seconds before resetting the form and stopping loading
        setTimeout(() => {
          // reset form
          setDayTrack(initialdata);

          // stop loading
          setisLoading(false);
        }, 3000);
      })
      .catch((err) => {
        toast.error("Unknown error occurred. Try again later", {
          duration: 5000,
        });
        setisLoading(false);
        console.log(err);
      });
  };

  return (
    <Box
      maxW="1000px"
      m="auto"
      p="3"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb="4" align="center">
        Daily Health Tracker
      </Heading>
      <Text mb="4" align="center">
        We already trained you on how to fill the form if you are not able to
        fill it please visit the nearest chemist or clinic and answer the
        questions
      </Text>

      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
          <FormLabel>
            Enter patient's number(your phone Number is your patients
            number):format(712345678)
          </FormLabel>
          <Input
            type="text"
            name="patNumber"
            value={dayTrack.patNumber}
            onChange={handleDailyTrackChange}
            placeholder="712345678"
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Body Temperature (in Celsius):</FormLabel>
          <Input
            type="number"
            name="bodyTemperature"
            min={1}
            value={dayTrack.bodyTemperature}
            onChange={handleDailyTrackChange}
            placeholder="23"
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Blood Pressure:</FormLabel>
          <Input
            type="text"
            name="bloodPressure"
            value={dayTrack.bloodPressure}
            onChange={handleDailyTrackChange}
            placeholder="eg. 100/70mmHg or  100/70"
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Previous Diet:</FormLabel>
          <Textarea
            name="diet"
            rows={4}
            cols={20}
            value={dayTrack.diet}
            onChange={handleDailyTrackChange}
            placeholder="Rice and beans and a cup of water plus Mango"
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Water Intake (How many Glasses):</FormLabel>
          <Input
            type="number"
            name="waterIntake"
            value={dayTrack.waterIntake}
            onChange={handleDailyTrackChange}
            placeholder="4"
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Effectiveness of Medication:</FormLabel>
          <Select
            name="medicationEffectiveness"
            value={dayTrack.medicationEffectiveness}
            onChange={handleDailyTrackChange}
          >
            <option value="" disabled>
              Select Medication Effectiveness
            </option>
            <option value="effective">Effective</option>
            <option value="partiallyEffective">Partially Effective</option>
            <option value="notEffective">Not Effective</option>
          </Select>
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Sleep Duration (in hours):</FormLabel>
          <Input
            type="number"
            name="sleepDuration"
            min={1}
            value={dayTrack.sleepDuration}
            onChange={handleDailyTrackChange}
            placeholder="7hrs or 7 you dont have to specify the hours"
          />
        </FormControl>

        <FormControl mb="4" display="flex" alignItems="center">
          <FormLabel mb="0">Nausea:</FormLabel>
          <input
            type="checkbox"
            name="nausea"
            checked={dayTrack.nausea}
            onChange={handleCheckboxChange}
          />
        </FormControl>

        <FormControl mb="4" display="flex" alignItems="center">
          <FormLabel mb="0">Tiredness:</FormLabel>
          <input
            type="checkbox"
            name="tiredness"
            checked={dayTrack.tiredness}
            onChange={handleCheckboxChange}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Other Symptoms:</FormLabel>
          <Textarea
            name="otherSymptoms"
            rows={4}
            cols={20}
            value={dayTrack.otherSymptoms}
            onChange={handleDailyTrackChange}
            placeholder="The currect symptoms that you are getting"
            isRequired
          />
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
}

export default DailyTrack;
