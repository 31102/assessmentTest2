import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
const getArray = [
  {
    Heading: "Signatory",
    Description:
      "Has right to sign transactions.Can change company settings and can invite new members.",
  },
  {
    Heading: "Manager",
    Description:
      "Has no sign transactions.Can change company settings and can invite new members.",
  },
  {
    Heading: "Viewer",
    Description: "Has read-only access",
  },
];
const DialogBox = ({
  openModal,
  handleCloseModal,
  handleSendInvitation,
  setInviteMember,
  setUserEmail,
}) => {
  const [selectedRole, setSelectedRole] = useState("");
  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      PaperProps={{
        style: {
          borderRadius: "15px", // Adjust the value as needed
          padding: "30px", // Adjust the value as needed
          width: "20%",
        },
      }}
    >
      <CloseIcon
        onClick={handleCloseModal}
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "35px",
        }}
      />
      <DialogTitle fontSize="25px" fontWeight="bold">
        Invite a person
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Email</Typography>
        <TextField
          placeholder="Enter email address"
          fullWidth
          onBlur={(e) => setUserEmail(e.target.value)}
        />
        <Box mt={2}>
          <Typography variant="subtitle1">Access Level</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Access Level</InputLabel>
            <Select
              value={selectedRole}
              onChange={handleChange}
              fullWidth
              label="Access Level"
              MenuProps={{
                PaperProps: {
                  style: {
                    // backgroundColor: "green", // Background color
                    width: "200px", // Width
                  },
                },
              }}
            >
              {getArray.map((item, index) => (
                <MenuItem
                  value={item.Heading}
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    // bgcolor: "red",
                    // width: "40%",
                  }}
                  onClick={() => setInviteMember(item)}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.Heading}
                  </Typography>
                  <Typography
                    color="GrayText"
                    sx={{ width: "100%", whiteSpace: "pre-line" }}
                  >
                    {item.Description}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: "20px", width: "85%", mx: "auto" }}>
        <Button
          onClick={handleCloseModal}
          sx={{ bgcolor: "#BCC6CC", color: "black" }}
        >
          Cancel
        </Button>
        <Button
          // type="submit"
          onClick={handleSendInvitation}
          variant="contained"
          color="primary"
          sx={{ bgcolor: "#4863A0" }}
        >
          Send Invitation
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(DialogBox);
