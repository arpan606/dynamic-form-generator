// @mui
import { debounce } from "@mui/material";
import { useDispatch } from "react-redux";
import "./common-field.css";
import { updateField } from "../../redux/actions/form";

export function Input({ idx, field, placeholder }) {
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
