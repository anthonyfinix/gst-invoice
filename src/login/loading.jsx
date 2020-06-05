import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

export default () => {
  return (
    <React.Fragment>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{height:"100vh",width:'100wv'}}
      >
        <CircularProgress />
      </Box>
    </React.Fragment>
  );
};
