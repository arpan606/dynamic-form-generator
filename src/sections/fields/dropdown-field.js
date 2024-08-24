// @mui
import {
    Stack,
    Typography,
    Button,
    debounce,
  } from "@mui/material";
  import { useDispatch } from "react-redux";
  import { Icon } from "@iconify/react";
  import "./common-field.css";
  import { updateField } from "../../redux/actions/form";
  import { Input } from "./input";
  import { DeleteIcon } from "./delete-icon-field";
  import { RequiredField } from "./requires-field";

export function DropDownField({ field, idx }) {
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