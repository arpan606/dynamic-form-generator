import React from "react";
import "./home.css";
import Header from "../../sections/header/header";
import FormElement from "../elements/elements";
import { Grid } from "@mui/material";
import FormArea from "../form-area/form-area";
import DynamicForm from "../preview-form/preview-form";
import { useSelector } from "react-redux";

const Home = () => {
  const { loadedForm } = useSelector((state) => state.form);

  return (
    <div className="home-container">
      <Header />
      <Grid container minHeight="85vh" mt={15} rowGap={4} px={5}>
        <Grid item md={4} sm={12} xm={12}>
          <FormElement width="100%" />
        </Grid>

        <Grid item md={8} sm={12} xm={12} width="100%">
          {loadedForm ? <DynamicForm formConfig={loadedForm} /> : <FormArea />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
