import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { deepPurple } from "@mui/material/colors";
import AccessLevelCard from "../AccessLevelCard";
import DialogBox from "./DialogBox";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const memberList = [
  {
    id: 0,
    name: "Daniel Fleming",
    email: "danieal@spacex.com",
    accessLevel: "Owner",
    activate: true
  },
  {
    id: 1,
    name: "Olivia Green",
    email: "olivia@spacex.com",
    accessLevel: "Manager",
    activate: true

  },
  {
    id: 2,
    name: "Jhon Purple",
    email: "jhon@spacex.com",
    accessLevel: "Viewer",
    activate: true

  }
];

const MemberPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [members, setMembers] = useState(memberList);
  const [openModal, setOpenModal] = useState(false);
  const [expandedViewer, setExpandedViewer] = useState(false);
  const [inviteMember, setInviteMember] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [curentUserId, setCurrentUserId] = useState(null)


  const handleMenuOpen = (event) => {
    setIsMenuOpen(true);
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setMenuAnchor(null);
  };
  const handleInviteClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSendInvitation = () => {

    members.push({
      id: members.length,
      name: "Jhon Purple",
      email: userEmail,
      accessLevel: inviteMember.Heading,
    });
    handleCloseModal();
  };
  const toggleViewerDetails = (curentData, userId) => {

    setMembers((preList) => {
      const updatedList = preList.map((value) => {
        if (value.id === userId) {
          value.accessLevel = curentData.Heading;
          return value;
        }
        return value;
      });
      return updatedList;
    });
    setExpandedViewer(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);


  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        mt: "60px",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          width: "50%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "25px",
        }}
      >
        <Typography fontSize="40px" fontWeight="800px">
          Members
        </Typography>
        <Button
          onClick={handleInviteClick}
          sx={{
            padding: "12px",
            bgcolor: "#00008B",
            "&:hover": {
              bgcolor: "#4863A0",
            },
            color: "white",
            borderRadius: "10px",
            width: "fit-content",
          }}
        >
          Invite member
        </Button>
      </Box>
      <Box
        sx={{
          width: "50%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          display="flex"
          gap="4px"
          justifyContent="start"
          ml="5px"
          color="grey"
          onClick={handleMenuOpen}
        >
          {members.length} members <KeyboardArrowDownSharpIcon />
        </Typography>
        <Menu
          anchorEl={menuAnchor}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleMenuClose}>Activate</MenuItem>
          <MenuItem onClick={handleMenuClose}>Deactivate</MenuItem>
        </Menu>
        <Box mt="10px">
          <Divider flexItem />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "97%",
              mx: "auto",
              padding: "6px",
            }}
          >
            <Typography color="grey">Name</Typography>
            <Typography color="grey">Access Level</Typography>
          </Box>
          <Divider flexItem />
        </Box>
        {members.map((member, memberIndex) =>

          <Box key={member.id} >
            {memberIndex <= 2 ? <Box
              //   bgcolor="greenyellow"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ paddingY: '10px', }}
            >
              <Box
                // bgcolor="yellow"
                display="flex"
                alignItems="center"
                gap="10px"
              >
                <Avatar
                  sx={{
                    bgcolor: deepPurple[300],
                    padding: "6px",
                    color: deepPurple[800],
                  }}
                >
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </Avatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  gap="1px"
                  padding="5px"
                >
                  <Typography fontWeight="800px" fontSize="20px">
                    {member.name}
                  </Typography>
                  <Typography>{member.email}</Typography>
                </Box>
              </Box>
              {member.accessLevel !== "Owner" ? (
                <Typography
                  display="flex"
                  gap="4px"
                  justifyContent="start"
                  ml="5px"
                  color="grey"
                  sx={{ cursor: "pointer" }}
                  onClick={(e) => {
                    setCurrentUserId(member.id)
                    setExpandedViewer(true);
                    setAnchorEl(e.target);
                  }}
                >
                  {member.accessLevel}
                  <KeyboardArrowDownSharpIcon />
                </Typography>
              ) : (
                <Typography
                  display="flex"
                  gap="4px"
                  justifyContent="start"
                  ml="5px"
                  color="grey"
                  sx={{ cursor: "pointer" }}
                >
                  {member.accessLevel}
                </Typography>
              )}
            </Box> : <WaitingUser userEmail={member.email} />
            }
            <Divider flexItem />
            {curentUserId === member.id && expandedViewer === true &&
              (member.accessLevel === "Viewer" ||
                member.accessLevel === "Manager" || member.accessLevel === "Signatory") && (
                <AccessLevelCard
                  anchorEl={anchorEl}
                  memberId={member.id}
                  expandedViewer={expandedViewer}
                  toggleViewerDetails={toggleViewerDetails}
                />
              )}
          </Box>

        )}
      </Box>


      {/* Invite Member Modal */}
      <DialogBox
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSendInvitation={handleSendInvitation}
        setInviteMember={setInviteMember}
        setUserEmail={setUserEmail}
      />
    </Box>
  );
};

export default MemberPage;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const WaitingUser = ({ userEmail }) => {
  const dateObject = new Date()
  const currentDate = `${dateObject.getDay()} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`
  return <Box sx={{ paddingY: '10px', width: "100%" }} display="flex" justifyContent="space-between" alignItems="center">
    <Box display="flex" alignItems="center" gap="10px">
      <Avatar
        sx={{
          bgcolor: "#F0F0F0",
          padding: "6px",
          color: "lightgray",
        }}
      >

        <AccessTimeIcon />
      </Avatar>
      <Box display="flex" flexDirection="column" alignItems="start" gap="1px" padding="5px">
        <Typography fontWeight="600" fontSize="18px" color="grey">
          {userEmail}
        </Typography>
        <Typography color="grey" >waiting for acceptance</Typography>
      </Box>
    </Box>
    <Typography
      display="flex"
      gap="4px"
      justifyContent="start"
      ml="5px"
      color="grey"
    // whiteSpace={}
    >
      invite sent <br />
      {currentDate}
    </Typography>
  </Box>


}