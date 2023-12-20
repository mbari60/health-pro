import { Link } from "react-router-dom";
import { Box, Heading, Text, Image } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      maxW="1200px"
      m="auto"
      p="3"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      <Heading as="h1" mb="4">
        Welcome to Health Tracker App
      </Heading>
      <Image
        src="https://liveminimal.com/wp-content/uploads/2020/06/LiveMinimalPlanners-Daily-Health-Tracker.png"
        alt="Health Tracker Image"
        mb="4"
      />

      <Text fontSize="lg" mb="4">
        This app is designed to track and facilitate communication between
        patients and doctors.
      </Text>

      <Text fontSize="lg" mb="4">
        If you are an existing patient, you can track your progress by filling
        out the daily tracker form.
      </Text>

      <Text fontSize="lg" mb="4">
        The Doctor will always rich out to you within the next minute you fill
        the form and not more than an hour after filling the form.
      </Text>

      <Link to="/DailyTrack">
        <Box
          as="button"
          bg="teal"
          color="white"
          fontSize="lg"
          p="2"
          borderRadius="md"
          cursor="pointer"
        >
          Go to Daily Tracker
        </Box>
      </Link>

      <Text fontSize="lg" mt="4">
        If you are a new Patient and want to be tracked, you can provide your
        details by filling out the patient form.
      </Text>

      <Text fontSize="lg" mt="4">
        Always note that your health is our concern
      </Text>

      <Link to="/PatientForm">
        <Box
          as="button"
          bg="teal"
          color="white"
          fontSize="lg"
          p="2"
          borderRadius="md"
          cursor="pointer"
          mt="2"
        >
          Fill out Patient Form
        </Box>
      </Link>
    </Box>
  );
};

export default Home;
