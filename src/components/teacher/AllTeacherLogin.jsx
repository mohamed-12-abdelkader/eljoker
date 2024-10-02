import { useState } from "react";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import {
  Box,
  Heading,
  Spinner,
  FormControl,
  Select,
  Image,
  Flex,
  Text,
  Skeleton,
  Stack,
  Card,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { MdCancelPresentation } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import GitTeacherByToken from "../../Hooks/student/GitTeacherByToken";

const AllTeacherLogin = () => {
  const [loading, teachers] = GitTeacherByToken();
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleStreamChange = (e) => {
    setSelectedStream(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredTeachers = Array.isArray(teachers)
    ? teachers.filter((teacher) => {
        let isValid = teacher.id !== 25;

        if (selectedStream === "علمي") {
          isValid =
            isValid &&
            !["علم نفس واجتماع", "فلسفة ومنطق", "تاريخ", "جغرافيا"].includes(
              teacher.subject.trim()
            );
        } else if (selectedStream === "ادبي") {
          isValid =
            isValid &&
            !["فيزياء", "كيمياء", "احياء", "جيولوجيا", "رياضيات"].includes(
              teacher.subject.trim()
            );
        }

        if (selectedSubject) {
          isValid =
            isValid && teacher.subject.trim() === selectedSubject.trim();
        }

        return isValid;
      })
    : [];

  return (
    <Box w="100%" my="5" px={{ base: "3", md: "5" }}>
      <Heading
        as="h1"
        fontSize="30px"
        display="flex"
        alignItems="center"
        mb="2"
        className="text-[#03a9f5]"
      >
        <PiChalkboardTeacherBold className=" mx-2 text-red-500" />
        المدرسين
      </Heading>
      <Flex justify="center" px="3">
        <FormControl w="200px" m="2">
          <Select placeholder="اختر الشعبة" onChange={handleStreamChange}>
            <option value="علمي">علمي</option>
            <option value="ادبي">ادبي</option>
          </Select>
        </FormControl>
        <FormControl w="200px" className="flex justify-between" m="2">
          <Select placeholder="اختر المادة" onChange={handleSubjectChange}>
            {/* قائمة المواد */}
            <option value="لغة عربية ">لغة عربية</option>
            <option value="English">لغة انجليزية</option>
            {/* باقي الخيارات */}
          </Select>
        </FormControl>
      </Flex>
      <Box>
        {loading ? (
          <Stack className="w-[90%] m-auto my-5">
            <Skeleton height="20px" className="mt-5" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            {/* مزيد من Skeletons */}
          </Stack>
        ) : filteredTeachers.length > 0 ? (
          <div
            className="w-[95%] m-auto card-content  bg- p-3 flex justify-center md:justify-start flex-wrap"
            style={{ borderRadius: "20px" }}
          >
            {filteredTeachers.map((teacher) => (
              <Card
                key={teacher.id}
                className="w-[300px] my-3 md:mx-7"
                style={{ border: "1px solid #ccc" }}
              >
                <CardBody>
                  <Link to={`teacher/${teacher.id}`}>
                    <Image
                      src={teacher.image}
                      h="220px"
                      w="100%"
                      borderRadius="10px"
                      alt="Teacher"
                    />
                    <p className="w-[100%] h-[2px] bg-[#ccc] mt-4 m-auto"></p>
                    <Flex justify="space-between" py="2">
                      <Text fontWeight="bold" mt="2">
                        {teacher.name}
                      </Text>
                      <Text fontWeight="bold" mt="2">
                        {teacher.subject}
                      </Text>
                    </Flex>
                    <div className="h-auto">
                      <h1 fontWeight="bold" className="flex font-bold my-2">
                        <FaVideo className="m-1 text-red-500" /> مدرس ال{" "}
                        {teacher.subject} للثانوية العامة
                      </h1>
                    </div>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <Flex
            justify="center"
            alignItems="center"
            bg="white"
            h="200px"
            borderRadius="20px"
          >
            <Text
              fontWeight="bold"
              display="flex"
              alignItems="center"
              color="black"
            >
              <MdCancelPresentation className="m-1 text-red-500" />
              لا يوجد مدرسين الان
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default AllTeacherLogin;
