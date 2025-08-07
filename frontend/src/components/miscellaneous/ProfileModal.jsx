// import { ViewIcon } from "@chakra-ui/icons";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   useDisclosure,
//   IconButton,
//   Text,
//   Image,
// } from "@chakra-ui/react";

// const ProfileModal = ({ user, children }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//       {children ? (
//         <span onClick={onOpen}>{children}</span>
//       ) : (
//         <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
//       )}
//       <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
//         <ModalOverlay />
//         <ModalContent h="410px">
//           <ModalHeader
//             fontSize="40px"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent="center"
//           >
//             {user.name}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody
//             d="flex"
//             flexDir="column"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <Image
//               borderRadius="full"
//               boxSize="150px"
//               src={user.pic}
//               alt={user.name}
//             />
//             <Text
//               fontSize={{ base: "28px", md: "30px" }}
//               fontFamily="Work sans"
//             >
//               Email: {user.email}
//             </Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={onClose}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default ProfileModal;

"use client"

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { Children } from "react";

const ProfileModal = ({children}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Context>
              {(store) => (
                <Dialog.Body pt="6" spaceY="3">
                  <p>Dialog is open: {store.open ? "true" : "false"}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <button onClick={() => store.setOpen(false)}>Close</button>
                </Dialog.Body>
              )}
            </Dialog.Context>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ProfileModal;






