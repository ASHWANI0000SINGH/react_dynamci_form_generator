import { useState } from "react";

function DynamicForm() {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [savedConfig, setSavedConfig] = useState(null); // To store the saved JSON configuration

  const options = [
    "text",
    "number",
    "textarea",
    "dropdown",
    "checkbox",
    "radio",
  ];
  const options2 = ["opt-1", "opt-2", "opt-3"];

  const handleFormChange = (event, id) => {
    const { name, value } = event.target;

    // Update isEmpty state based on input value
    const isEmptyValue = value.trim() === "";
    setIsEmpty(isEmptyValue);

    // Update formFields state
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    );
    setFormFields(updatedFields);
  };

  const submit = (e) => {
    e.preventDefault();

    // const hasEmptyField = formFields.some((field) => field.some);
    const hasEmptyField = formFields.some((field) => field.isEmpty);
    console.log(hasEmptyField);

    // if (!hasEmptyField) {
    // Append the current formFields to formData
    setFormData((prevData) => [...prevData, formFields]);

    // Reset the formFields array
    setFormFields([]);
    // } else {
    //   console.log("One or more fields are empty.");
    // }
  };

  const addField = (type) => {
    const id = Date.now(); // Generate a unique identifier
    const newField = {
      id,
      type,
      label: "Field Label",
      options: [],
    };
    setFormFields([...formFields, newField]);
  };

  const saveFormConfiguration = () => {
    // Save formFields as JSON data
    const jsonConfig = JSON.stringify(formData);
    // Store the JSON configuration in the state
    setSavedConfig(jsonConfig);
  };

  const loadFormConfiguration = () => {
    // Load formFields from JSON data (for example, a saved configuration)
    // Parse the JSON data and update the formFields state
    try {
      const loadedConfig = JSON.parse(savedConfig);
      setFormFields(loadedConfig);
    } catch (error) {
      console.error("Error loading configuration:", error);
    }
  };
  console.log(savedConfig);

  const removeField = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const renderField = (field) => {
    return (
      <div key={field.id}>
        <label>{field.label}</label>

        {field.type === "text" && (
          <div>
            <input
              type="text"
              name={"name"}
              value={field.name || ""}
              onChange={(e) => handleFormChange(e, field.id)}
              placeholder=" write any text value"
            />
            {isEmpty && <div className="error">This field is required.</div>}
          </div>
        )}
        {field.type === "number" && (
          <div>
            <input
              type="number"
              name={"age"}
              value={field.age || ""}
              onChange={(e) => handleFormChange(e, field.id)}
              placeholder=" write any numeric value"
            />
            {isEmpty && <div className="error">This field is required.</div>}
          </div>
        )}
        {field.type === "textarea" && (
          <div>
            <textarea
              name={"textarea"}
              value={field.textarea || ""}
              onChange={(e) => handleFormChange(e, field.id)}
              rows="4"
              cols="50"
              placeholder=" write anything..."
            />
            {isEmpty && <div className="error">This field is required.</div>}
          </div>
        )}
        {field.type === "dropdown" && (
          <div>
            <select
              name="option"
              value={field.option || ""}
              onChange={(e) => handleFormChange(e, field.id)}
            >
              <option>Please choose one option</option>
              {options2.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {isEmpty && <div className="error">This field is required.</div>}
          </div>
        )}
        {field.type === "checkbox" && (
          <div>
            <fieldset>
              <legend>Choose your Language</legend>
              <div>
                <input
                  type="checkbox"
                  name="java"
                  checked={field.java || false}
                  onChange={(e) => handleFormChange(e, field.id)}
                />
                <label htmlFor="java" value="java">
                  java
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="Javascript"
                  name="Javascript"
                  checked={field.Javascript || false}
                  onChange={(e) => handleFormChange(e, field.id)}
                />
                <label htmlFor="Javascript" value="javacsript">
                  Javascript
                </label>
              </div>
            </fieldset>
            {isEmpty && <div className="error">This field is required.</div>}
          </div>
        )}
        {field.type === "radio" && (
          <div>
            <fieldset>
              <legend>Select your sport:</legend>
              <div>
                <input
                  type="radio"
                  name="sport"
                  value="cricket"
                  checked={field.sport === "cricket"}
                  onChange={(e) => handleFormChange(e, field.id)}
                />
                <label htmlFor="cricket">cricket</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="football"
                  name="sport"
                  value="football"
                  checked={field.sport === "football"}
                  onChange={(e) => handleFormChange(e, field.id)}
                />
                <label htmlFor="football">football</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="tennis"
                  name="sport"
                  value="tennis"
                  checked={field.sport === "tennis"}
                  onChange={(e) => handleFormChange(e, field.id)}
                />
                <label htmlFor="tennis">tennis</label>
              </div>
            </fieldset>
            {isEmpty && <div className="error">This field is required.</div>}
          </div>
        )}

        <button onClick={() => removeField(field.id)}>Remove</button>
      </div>
    );
  };

  return (
    <div className="App">
      <h1 style={{ margin: "auto", textAlign: "center", marginBottom: "10vh" }}>
        {" "}
        Dynamic Form Generator
      </h1>
      <form onSubmit={submit}>
        {formFields.map((field) => renderField(field))}
      </form>
      <div>
        <select onChange={(e) => addField(e.target.value)}>
          <option>Please choose one option</option>
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={submit}>Submit</button>
        <button onClick={saveFormConfiguration}>Save Configuration</button>
        <button onClick={loadFormConfiguration}>Load Configuration</button>
      </div>
    </div>
  );
}

export default DynamicForm;
