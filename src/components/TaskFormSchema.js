import * as Yup from "yup";

const TaskFormSchema = Yup.object().shape({
  task: Yup.string()
    .required("A task is required for this field.")
    .min(2, "Your task title is too short.")
    .max(255, "Your task cannot be over 255 characters."),
  priority: Yup.string().required("A priority is required for this field."),
});

export default TaskFormSchema;
