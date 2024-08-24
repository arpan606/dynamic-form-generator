// @mui
import { useDispatch } from "react-redux";
import "./common-field.css";
import { removeField } from "../../redux/actions/form";
import { Icon } from "@iconify/react";

export function DeleteIcon({ idx }) {
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
