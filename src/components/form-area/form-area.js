import {
  CardHeader,
  Card,
  Button,
  Box,
  Stack,
  Divider,
  CardContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CommonField from "../../sections/fields/common-field";
import "./form-area.css";
import { clearForm, saveForm } from "../../redux/actions/form";

export default function FormArea({ width }) {
  const { fields } = useSelector((store) => store.form);
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearForm());
  };

  const save = () => {
    dispatch(saveForm());
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "95%",
        overflow: "hidden",
        margin: "0 auto",
        minHeight: "650px",
        pb: 1,
      }}
    >
      <CardHeader
        title={"Create Form"}
        subheader="Add Elements to build your form"
      />

      <Divider />

      <CardContent>
        <Card class="form-area">
          {fields.map((field, idx) => (
            <CommonField field={field} idx={idx}/>
          ))}
        </Card>

        <Stack direction="row" gap={2} justifyContent="flex-end" py={2}>
          <Box>
            <Button variant="outlined" onClick={clear}>
              Clear
            </Button>
          </Box>
          <Box>
            <Button variant="contained" onClick={save}>
              SAVE
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
