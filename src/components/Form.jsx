import { useState } from "react";

function Form() {
  //   const [formFields, setFormFields] = useState([{ name: "", age: "" }])
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState([]);
  const options = [
    "text",
    "number",
    "textarea",
    "dropdown",
    "checkbox",
    "radio",
  ];
  const options2 = ["opt-1", "opt-2", "opt-3"];

  const handleFormChange = (event, index) => {
    // console.log("11", index);
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    setFormData(() => [...formData, formFields]);
    console.log("formdata",formData)
  };

  const addField = (type) => {
    setFormFields([...formFields, { type }]);
  };
  const removeField = (index) => {
    // Remove a form field by its index
    const updatedFields = [...formFields];
    console.log(index)
    console.log("38",updatedFields)
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const renderField = (field, index) => {
    switch (field.type) {
      case "text":
        return (
          <div key={index}>
            <label>Text Input:</label>
            <input
              type="text"
              name={"name"}
              onChange={(e) => handleFormChange(e, index)}
            />
            <button onClick={() => removeField(index)}>Remove</button>
          </div>
        );
      case "number":
        return (
          <div key={index}>
            <label>Age:</label>
            <input
              type="number"
              name={"age"}
              onChange={(e) => handleFormChange(e, index)}
            />
            <button onClick={() => removeField(index)}>Remove</button>
          </div>
        );
      case "textarea":
        return (
          <div key={index}>
            <label>Text area:</label>
            <textarea
              name={"textarea"}
              type="textarea"
              onChange={(e) => handleFormChange(e, index)}
              rows="4"
              cols="50"
            />
            <button onClick={() => removeField(index)}>Remove</button>
          </div>
        );
      case "dropdown":
        return (
          <div key={index}>
            <select
              type="select"
              name="option"
              onChange={(e) => handleFormChange(e, index)}
              
            >
              <option>Please choose one option</option>
              {options2.map((option, index) => {
                return (
                  <option key={index} name={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
            <button onClick={() => removeField(index)}>Remove</button>
          </div>
        );
      case "checkbox":
        return (
          <div key={index}>
            <fieldset>
              <legend>Choose your Language</legend>

              <div>
                <input
                  type="checkbox"
                  name="java"
                  onChange={(e) => handleFormChange(e, index)}
                />
                <label htmlFor="java" value="java">
                  java
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="horns"
                  name="Javascript"
                  onChange={(e) => handleFormChange(e, index)}
                />
                <label htmlFor="Javascript" value="javacsript">
                  Javascript
                </label>
              </div>
            </fieldset>
            <button onClick={() => removeField(index)}>Remove</button>
          </div>
        );
      case "radio":
        return (
          <div key={index}>
            <fieldset>
              <legend>Select your sport:</legend>

              <div>
                <input
                  type="radio"
                  name="sport"
                  value="cricket"
                  id="huey"
                  onChange={(e) => handleFormChange(e, index)}
                />
                <label htmlFor="cricket">cricket</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="football"
                  name="sport"
                  value="football"
                  onChange={(e) => handleFormChange(e, index)}
                />
                <label htmlFor="football">football</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="tennis"
                  name="sport"
                  value="tennis"
                  onChange={(e) => handleFormChange(e, index)}
                />
                <label htmlFor="tennis">tennis</label>
              </div>
            </fieldset>
            <button onClick={() => removeField(index)}>Remove</button>
          </div>
        );

      default:
        return null;
    }
  };
  
  // console.log(formData);

  return (
    <div className="App">
      <form onSubmit={submit}>
        {formFields.map((field, index) => renderField(field, index))}
      </form>
      <div>
        <select onChange={(e) => addField(e.target.value)}>
          <option>Please choose one option</option>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default Form;
