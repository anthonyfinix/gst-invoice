import React, { useState, useContext } from "react";
import "./login.css";
import Loading from "./loading";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { loginUser } from "../api";
import { AppContext } from "../App";

export default (props) => {
  const [notification, setNotification] = useState("");
  const handleNotificationClose = () => {
    setNotification("");
  };
  const {
    appDetails: { user },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginCred] = useState({
    username: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const handleLoginInputChange = (e) => {
    const el = e.currentTarget;
    const newLoginDetails = loginDetails;
    newLoginDetails[el.getAttribute("name")].value = el.value;
    setLoginCred({ ...newLoginDetails });
  };
  const handleLoginBtnClick = () => {
    if (loginDetails.username.error) return;
    if (loginDetails.password.error) return;
    setLoading(true);
    loginUser(loginDetails.username.value, loginDetails.password.value).then(
      (response) => {
        setLoading(false);
        if (response.error) {
          setNotification(response.error);
          return;
        }
          const {token,userDetails} = response;
          if(response.token) localStorage.setItem("gstInvoice", token);
          if(response.userDetails) props.setUser(userDetails)
          .then((user)=>{
            console.log(user)
            props.history.push("/app")
          });
        // localStorage.setItem("gstInvoice", response.token);
        // props.setUser(response).then((userDetails) => {
        //   console.log(userDetails);
        //   // props.history.push("/app");
        // });
      }
    );
  };
  if (user.name) {
    return <Redirect to={`/app`} />;
  } else {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <React.Fragment>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            className="login-wrapper"
          >
            <Card style={{ margin: "auto" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyItems="center"
                >
                  <Typography variant="h6">WELCOME</Typography>
                  <Typography variant="caption" style={{ marginBottom: 20 }}>
                    Please type your credentials
                  </Typography>
                  <TextField
                    variant="outlined"
                    inputProps={{ name: "username" }}
                    value={loginDetails.username.value}
                    style={{ marginBottom: 20 }}
                    onChange={handleLoginInputChange}
                    label="Username"
                    size="small"
                  />
                  <TextField
                    variant="outlined"
                    inputProps={{ name: "password" }}
                    value={loginDetails.password.value}
                    style={{ marginBottom: 20 }}
                    onChange={handleLoginInputChange}
                    label="Password"
                    type="password"
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Link to="/register">
                  <Button
                    size="small"
                    style={{ marginBottom: 5 }}
                    color="primary"
                  >
                    Register
                  </Button>
                </Link>
                <Button
                  onClick={handleLoginBtnClick}
                  size="small"
                  variant="contained"
                  style={{ marginLeft: "auto", marginBottom: 5 }}
                  color="primary"
                >
                  Login
                </Button>
              </CardActions>
            </Card>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={!!notification}
            onClose={handleNotificationClose}
            message={notification}
          />
        </React.Fragment>
      );
    }
  }
};
