import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

const PurchaseAlert = ({
  isOpen,
  onClose,
  activationCode,
  setActivationCode,
  handleActivateCourse,
  activateLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تفعيل الكورس</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>أدخل كود التفعيل الذي حصلت عليه من المدرس:</Text>
          <Input
            placeholder="كود التفعيل"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            size="lg"
            borderRadius="xl"
            mb={2}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            mr={3}
          >
            إلغاء
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleActivateCourse}
            isLoading={activateLoading}
            disabled={!activationCode}
          >
            تأكيد الشراء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PurchaseAlert;
