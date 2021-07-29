import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

class Page404 extends Component {
  render() {
    return (
      <Grid container direction="column" alignItems="center" className="Titulo">
        <Grid item alignContent="flex-start">
          <Typography paragraph align="left" variant={"h1"}>
            404
          </Typography>
          <Typography paragraph align="left" variant={"h4"}>
            Ups!
          </Typography>
          <Typography align="center" variant={"h5"}>
            La página que buscas no ha sido encontrada.
          </Typography>
          <Link to="/login" className="Titulo">
            {"<<< Regresar"}
          </Link>
        </Grid>
      </Grid>
    );
  }
}

export default Page404;
