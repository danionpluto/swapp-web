import { Field, Form, Formik, ErrorMessage } from "formik";
import "./InputField.css";

function InputField({
  name = "",
  placeholder = "",
  type = "",
  iconName = "",
  trailing = [],
}) {
  return (
    <div className={`${name}-field`}>
      {iconName && (
        <span className="material-symbols-outlined">{iconName}</span>
      )}
      <Field placeholder={placeholder} type={type} name={name} />
      {trailing}
    </div>
  );
}

export default InputField;
