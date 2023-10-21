import { Box, Divider, Menu, MenuItem, Typography } from "@mui/material";

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

const AccessLevelCard = ({ expandedViewer, toggleViewerDetails, anchorEl ,memberId}) => {
  return (
    <Menu
      id="basic-menu"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorEl={anchorEl}
      open={expandedViewer}
      onClose={toggleViewerDetails}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        role: "listbox",
      }}
      PaperProps={{
        sx: {
          maxWidth: "550px",
          bgcolor: "white",
          border: "1px solid #ccc",
          boxShadow: "0px 0px 5px #ccc",
          // mr:"120px"
        },
      }}

    >
      {/* Your expanded content for Viewer */}
      <Box
        width="90%"
        mx="auto"
        // mt="20px"
        // mb="20px"
        display="flex"
        flexDirection="column"
        gap="4px"
        padding="10px"
        textAlign="start"
        // bgcolor="yellowgreen"
      >
        {getArray.map((item, index) => (
          <>
            <MenuItem
              key={index}
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
                onClick={()=>toggleViewerDetails(item,memberId)}
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
            {/* <MenuItem ></MenuItem> */}
          </>
        ))}
        <Divider flexItem />
        <MenuItem variant="subtitle1" fontWeight="bold">
          Deactivate
        </MenuItem>
      </Box>
      {/* </Box> */}
    </Menu>
  );
};
export default AccessLevelCard;
