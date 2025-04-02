import { Field, Form, Formik, ErrorMessage } from "formik";
import "./InputField.css";

function InputField({
  name = "",
  placeholder = "",
  type = "",
  iconName = "",
  trailing = [],
  id = "",
}) {
  return (
    <div className={`${name}-field`}>
      {iconName && (
        <span className="material-symbols-outlined">{iconName}</span>
      )}
      <Field placeholder={placeholder} type={type} id={id} name={name} />
      {trailing}
    </div>
  );
}

export default InputField;
