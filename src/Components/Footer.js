import { Box, Flex, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box p={4} mt={8} bg="teal.500" color="white">
      <Flex justify="center" align="center">
        <Text>&copy; 2023 Health App. All rights reserved.</Text>
      </Flex>
    </Box>
  );
}

export default Footer;
