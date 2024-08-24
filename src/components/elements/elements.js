import {
  CardHeader,
  Card,
  Stack,
  Typography,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import Label from "../../sections/label/label";
import { useDispatch, useSelector } from "react-redux";
import {
  addFormField,
  loadForm,
  clearLoadForm,
} from "../../redux/actions/form";

export default function FormElement({ width }) {
  const { savedForms } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const elements = [
    {
      type: "Text Elements",
      elements: [
        {
          name: "Text Input",
          type: "text_input",
          icon: "fluent:text-12-regular",
        },
        {
          name: "Text Area",
          type: "text_area",
          icon: "fluent:text-more-20-regular",
        },
      ],
    },
    {
      type: "Mutli Elements",
      elements: [
        {
          name: "Dropdown",
          type: "dropdown",
          icon: "fluent-mdl2:dropdown",
        },
        {
          name: "Checkbox",
          type: "checkbox",
          icon: "fluent:checkbox-warning-24-regular",
        },
        {
          name: "Switch",
          type: "switch",
          icon: "fluent-mdl2:switch",
        },
      ],
    },
  ];

  const addField = (type, name) => {
    dispatch(addFormField(type, name));
  };

  const handleForm = (form) => {
    dispatch(loadForm(form));
  };

  const addNewForm = () => {
    dispatch(clearLoadForm());
  };

  return (
    <Stack width={width} margin="0 auto">
      <Card>
        <CardHeader title={"Tools"} subheader={"Select Elements to add fields in your form"} />
        <Divider />
        <CardContent>
          {elements.map((ele, idx) => (
            <Stack gap={2} p={2}>
              <Typography variant="h6">{ele.type}</Typography>
              <Grid container gap={2}>
                {ele.elements.map((field) => (
                  <Grid item>
                    <Label
                      name={field.name}
                      icon={field.icon}
                      onClick={() => addField(field.type, field.name)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ))}
          {savedForms?.length > 0 && (
            <Stack gap={2} p={2}>
              <Typography variant="h6">Saved Forms</Typography>
              <Grid container gap={2}>
                {savedForms?.map((form, idx) => (
                  <Grid item>
                    <Label
                      name={`Form ${idx + 1}`}
                      icon="save"
                      onClick={() => handleForm(form)}
                    />
                  </Grid>
                ))}
                <Grid item>
                  <Label
                    name={`Add Form`}
                    icon="fluent:add-12-regular"
                    onClick={() => addNewForm()}
                  />
                </Grid>
              </Grid>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
