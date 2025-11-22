import { Field, Form, Formik, ErrorMessage } from "formik";
import "./InputField.css";

function InputField({ name = "", placeholder = "", type = "", iconName = "" }) {
  return (
    <div className={`${name}-field`}>
      {iconName && (
        <span className="material-symbols-outlined">{iconName}</span>
      )}
      <Field placeholder={placeholder} type={type} name={name} />
    </div>
  );
}

export default InputField;
