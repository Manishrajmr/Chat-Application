
import { Button, CloseButton, Dialog, Portal,Text,Input,Box } from "@chakra-ui/react"
import { Children } from "react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({children}) => {


  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = ChatState();



    const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
     alert("user added already")
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

    const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
     alert("faild to load search result");
    }
  };

    const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      alert("please fill all fields");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
    //   onClose();
      alert("new group created");
    } catch (error) {
     console.log("faild to create chat",error.message );
    }
  };

  const handleDelete=(delUser)=>{

    setSelectedUsers(selectedUsers.filter((selected)=>delUser._id!==selected._id));

  }



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
                <Dialog.Body pt="6" spaceY="3" display="flex" flexDir="column" alignItems="center"  >
                  <Text fontSize="25px" textAlign="center" mb="8" >Create Group Chat</Text>
                
                <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
                />

                <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />

{/* selected users */}


               <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>




{/* rendered searched result */}
             {loading ? (
            //   <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}

                <Box display="flex" gap="10px" >
                <Button  colorPalette="teal" variant="outline" onClick={() => store.setOpen(false)}>Close</Button>

                <Button colorPalette="teal" variant="solid" onClick={handleSubmit} colorScheme="blue">
                 Create Chat
                </Button>
                </Box>
                  
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

export default GroupChatModal;
