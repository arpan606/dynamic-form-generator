/* eslint-disable import/no-anonymous-default-export */
import {
  HIDE_ERROR,
  LOADING,
  RESET_STATE,
  SHOW_ERROR,
  ADD_FORM_FIELD,
  REMOVE_FIELD,
  UPDATE_FIELD,
  CLEAR_FORM,
  SAVE_FORM,
  LOAD_FORM,
  CLEAR_LOAD_FORM,
} from "../constants/form.js";

const INITIAL_STATE = {
  fields: [],
  savedForms: [],
  showError: false,
  loading: false,
  loadedForm: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, showError: true };

    case HIDE_ERROR:
      return { ...state, showError: false };

    case LOADING:
      return { ...state, loading: action.value };

    case RESET_STATE:
      return { ...INITIAL_STATE };

    case ADD_FORM_FIELD:
      return {
        ...state,
        fields: [...state.fields, action?.value],
      };

    case REMOVE_FIELD:
      const filteredFields =
        state?.fields?.filter((val, idx) => idx !== action.value) ?? [];

      return {
        ...state,
        fields: filteredFields,
      };

    case UPDATE_FIELD:
      let updatedFields = state?.fields ?? [];
      if (action?.value?.idx >= 0) {
        updatedFields[action.value.idx] = action.value;
      }

      return {
        ...state,
        fields: updatedFields,
      };

    case CLEAR_FORM:
      return {
        ...state,
        fields: [],
      };

    case SAVE_FORM:
      return {
        ...state,
        savedForms: [...state?.savedForms, state?.fields],
        fields: [],
      };

    case LOAD_FORM:
      return {
        ...state,
        loadedForm: action.value,
      };

    case CLEAR_LOAD_FORM:
      return {
        ...state,
        loadedForm: null,
        fields: [],
      };

    default:
      return state;
  }
}
