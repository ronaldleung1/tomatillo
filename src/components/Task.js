import { Flex, Box, Button, Text, Link, Spacer } from "@chakra-ui/react";
import { Trash } from "react-feather";
export const Task = ({task, ...props}) => {
  return (
    <Flex 
      key={task.id}
      my={2}
      p={4}
      alignItems="center"
      boxShadow="base"
      textAlign="left"
      borderWidth="1px"
      borderRadius="lg"
      {...props}
    >
      <Box>
        <Text fontSize="lg" mb={task.repo && 2}>{task.title}</Text>
        {task.repo &&
        <Link href={task.repo["html_url"]} isExternal>
          <Box p={3} borderWidth="1px" borderRadius="lg">
            <Text fontWeight="bold">{task.repo["full_name"]}</Text>
            <Text color="gray.500">{task.repo["description"]}</Text>
          </Box>
        </Link>}
      </Box>
      <Spacer />
      {/* arrow function `=>` so handleDelete isn't called on render */}
      <Button ml={2} colorScheme="red" variant="ghost">
        <Trash size={18}/>
      </Button>
    </Flex>
  )
}