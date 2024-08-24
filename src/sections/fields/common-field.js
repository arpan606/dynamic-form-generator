import { Card } from "@mui/material";
import "./common-field.css";
import { InputField } from "./input-field";
import { DropDownField } from "./dropdown-field";
import { CheckBoxField } from "./checkbox-field";
import { TextArea } from "./text-area";
import { SwitchField } from "./switch-field";

export default function CommonField({ field, idx }) {
  const renderField = (type) => {
    switch (type) {
      case "text_input":
        return <InputField field={field} idx={idx} />;
      case "text_area":
        return <TextArea field={field} idx={idx} />;
      case "switch":
        return <SwitchField field={field} idx={idx} />;
      case "checkbox":
        return <CheckBoxField field={field} idx={idx} />;
      case "dropdown":
        return <DropDownField field={field} idx={idx} />;
      default:
        break;
    }
  };

  return <Card sx={{ my: 3, p: 2 }}>{renderField(field.type)}</Card>;
}
