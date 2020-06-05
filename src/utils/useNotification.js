import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default (props) => {
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
  };
  const handleClose = ()=>{
    setNotification('');
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      // key={`${vertical},${horizontal}`}
      open={!!notification}
      onClose={handleClose}
      message={notification}
    />
  );
};
