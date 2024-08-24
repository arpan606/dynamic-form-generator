// @mui
import {
  Checkbox,
  Stack,
  Card,
  Switch,
  Typography,
  Button,
  debounce,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import "./common-field.css";
import { updateField, removeField } from "../../redux/actions/form";

export default function CommonField({
  field,
  idx,
  helperText,
  showError = true,
  readOnly = false,
  ...other
}) {
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

// ----------------------------------------------------------------------

function InputField({ field, idx }) {
  return (
    <>
      <Stack alignItems="center" direction="row" bgcolor="#fff" gap={2}>
        <Input field={field} idx={idx} placeholder="Text Label" />
        <RequiredField field={field} idx={idx} />
        <DeleteIcon idx={idx} />
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

function TextArea({ field, idx }) {
  return (
    <Stack gap={2}>
      <Stack alignItems="center" direction="row" bgcolor="#fff" gap={2}>
        <Input field={field} idx={idx} placeholder="Text Area Label" />
        <RequiredField field={field} idx={idx} />
        <DeleteIcon idx={idx} />
      </Stack>
      <Textarea placeholder="Text Area" disabled minRows={4} />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function SwitchField({ field, idx }) {
  return (
    <Stack alignItems="center" direction="row" bgcolor="#fff" gap={2}>
      <Switch defaultChecked size="small" />
      <Input field={field} idx={idx} placeholder="Radio Button Label" />
      <DeleteIcon idx={idx} />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function CheckBoxField({ field, idx }) {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Checkbox defaultChecked size="small" />
      <Input field={field} idx={idx} placeholder="Check Box Label" />
      <DeleteIcon idx={idx} />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function DropDownField({ field, idx }) {
  const dispatch = useDispatch();

  const addOption = () => {
    const id = (field?.options?.length ?? 0) + 1;
    dispatch(
      updateField({
        ...field,
        idx: idx,
        options: [...field?.options, `Option ${id}`],
      })
    );
  };

  const deleteOption = (id) => {
    const filteredOptions =
      field?.options?.filter((val, index) => index !== id) ?? [];
    dispatch(
      updateField({
        ...field,
        idx: idx,
        options: filteredOptions,
      })
    );
  };

  const handleInputChange = debounce((e, optionIdx) => {
    let options = field?.options ?? [];
    if (options?.length > optionIdx) options[optionIdx] = e.target.value;

    dispatch(
      updateField({
        ...field,
        idx: idx,
        options: options,
      })
    );
  }, 475);

  return (
    <Stack gap={2}>
      <Stack alignItems="center" direction="row" bgcolor="#fff" gap={2}>
        <Input field={field} idx={idx} placeholder="Drop Down Label" />
        <RequiredField field={field} idx={idx} />
        <DeleteIcon idx={idx} />
      </Stack>
      <Stack gap={1}>
        {field?.options?.map((option, optionIdx) => (
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>{optionIdx + 1}.</Typography>
            <input
              type="text"
              class="bottom-border-input"
              placeholder={option || "option"}
              onChange={(e) => handleInputChange(e, optionIdx)}
            />
            {field?.options?.length > 1 && (
              <Icon
                icon="fluent-emoji-high-contrast:cross-mark"
                color="red"
                height="12"
                onClick={() => {
                  deleteOption(optionIdx);
                }}
              />
            )}
          </Stack>
        ))}
      </Stack>

      <Button variant="outlined" onClick={addOption}>
        Add Option
      </Button>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function RequiredField({ idx, field }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(
      updateField({
        ...field,
        idx: idx,
        validations: {
          ...field?.validations,
          required: event?.target?.checked || false,
        },
      })
    );
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      borderRight="1px solid rgb(224 224 224)"
      p={1}
      gap={0.5}
    >
      <Switch size="small" onChange={handleChange} />
      <Typography>Required</Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function DeleteIcon({ idx }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeField(idx));
  };

  return (
    <Icon
      icon="fluent:delete-16-regular"
      color="red"
      height="22"
      cursor="pointer"
      onClick={handleDelete}
    />
  );
}

// ----------------------------------------------------------------------

function Input({ idx, field, placeholder }) {
  const dispatch = useDispatch();

  const handleInputChange = debounce((e) => {
    dispatch(
      updateField({
        ...field,
        label: e.target.value,
        idx: idx,
      })
    );
  }, 475);

  return (
    <input
      type="text"
      class="bottom-border-input"
      placeholder={placeholder}
      onChange={handleInputChange}
      defaultValue={field?.label || placeholder}
    />
  );
}
