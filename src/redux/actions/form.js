import {
  LOADING,
  RESET_STATE,
  ADD_FORM_FIELD,
  REMOVE_FIELD,
  UPDATE_FIELD,
  SAVE_FORM,
  CLEAR_FORM,
  LOAD_FORM,
  CLEAR_LOAD_FORM,
} from "../constants/form.js";

export const setLoadingState = (value) => ({
  type: LOADING,
  value,
});

export function resetState() {
  return function (dispatch) {
    dispatch({
      type: RESET_STATE,
    });
  };
}

export function addFormField(type, name) {
  return function (dispatch) {
    dispatch({
      type: ADD_FORM_FIELD,
      value: {
        type,
        validations: {},
        label: name,
        ...(type === "dropdown" && { options: ["Option 1", "Option 2"] }),
      },
    });
  };
}

export function removeField(idx) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_FIELD,
      value: idx,
    });
  };
}

export function updateField(field) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_FIELD,
      value: field,
    });
  };
}

export function saveForm() {
  return function (dispatch) {
    dispatch({
      type: SAVE_FORM,
      value: null,
    });
  };
}

export function clearForm() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_FORM,
      value: null,
    });
  };
}

export function loadForm(form) {
  return function (dispatch) {
    dispatch({
      type: LOAD_FORM,
      value: form,
    });
  };
}

export function clearLoadForm() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_LOAD_FORM,
      value: null,
    });
  };
}
