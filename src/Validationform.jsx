
import React, { useState } from "react";
import "./Validation.css";
import { FaCross, FaTimes } from "react-icons/fa";

function Validation() {
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isname = (name) =>
    /^[a-zA-Z0-9\s.,`&\-\(\)\/]*[a-zA-Z0-9.\s\(\)]$/.test(name);

  const isweb = (web) =>
    /^(https?:\/\/)?(www\.)?[A-Za-z-]+\.(in|com)$/.test(web);

  const [values, setValues] = useState({
    email: "",
    name: "",
    web: ""
  });

  const [errors, setErrors] = useState({});
  const [issubmited, setissubmited] = useState(false);
  const [chipVisible, setChipVisible] = useState(true);


  const getDomain = (web) =>
    web.replace(/^(https?:\/\/)?(www\.)?/, "").toLowerCase();


  let rawDomain = getDomain(values.web);

  const domain = rawDomain.endsWith(".in")
    ? rawDomain.replace(".in", ".com")
    : rawDomain;
  const validateAndSubmitForm = (e) => {
    e.preventDefault();

    const errors = {};
    const formweb = values.web.replace(/^(https?:\/\/)?(www\.)?/, "").toLowerCase();
    const emailValue = values.email.trim().toLowerCase();
    const finalEmail = domain && chipVisible
      ? `${emailValue}@${domain}`
      : emailValue;

    if (!isname(values.name)) {
      errors.name = "Company name is required ";
    }

    if (!isweb(values.web)) {
      errors.web = "Website is required";
    }

    if (!finalEmail) {
      errors.email = "Email is required";
    } else if (!isEmail(finalEmail)) {
      errors.email = "Enter a valid email";
    }


    if (domain && chipVisible && !finalEmail.endsWith(`@${domain}`)) {

      errors.email = (
        <p style={{ color: "blue" }}>
          Email must end with domain name xxx@{formweb}
        </p>
      );
    }

    setErrors(errors);

    if (!Object.keys(errors).length) {
      setissubmited(true);
      setValues({ email: "", name: "", web: "" });
      console.log(finalEmail)
    }
  };

  const Email = (e) => {
    const emailvalue = e.target.value;
    setValues((prev) => ({ ...prev, email: emailvalue }));

    if (!isEmail(emailvalue)) {
      let formweb = values.web ? values.web.toLowerCase() : "";
      let forname = values.name ? values.name.toLowerCase() : "";

      if (!formweb) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter your company website name"
        }));
      } else {
        const companyRegex = new RegExp(`^[A-Z0-9._%+-]+@{formweb}$`, "i");

        if (!companyRegex.test(emailvalue)) {
          setErrors((prev) => ({
            ...prev,
            email: (
              <p style={{ color: "blue" }}>
                Hi {forname}, please enter a valid email like xxxx@{formweb}.
              </p>
            )
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter your company email"
          }));
        }
      }
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const Name = (e) => {
    const namevalue = e.target.value;
    setValues((prev) => ({ ...prev, name: namevalue }));

    if (namevalue.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: "Enter name"
      }));
    }

    if (!isname(namevalue)) {
      setErrors((prev) => ({
        ...prev,
        name:
          "Enter a name without special characters and end with letters or numbers"
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const Web = (e) => {
    const webvalue = e.target.value;
    setValues((prev) => ({ ...prev, web: webvalue }));

    if (webvalue.trim()) {
      setErrors((prev) => ({
        ...prev,
        web: "Enter website name"
      }));
    }

    if (!isweb(webvalue)) {
      setErrors((prev) => ({
        ...prev,
        web: "Enter correct website name like example.in or example.com"
      }));
    } else {
      setErrors((prev) => ({ ...prev, web: "" }));
    }
  };

  return (
    <div className="container box">
      <div className="row mx-auto d-flex justify-content-center mt-5">
        <div className="col-5 border rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">

          <form onSubmit={validateAndSubmitForm} className="row g-2 needs-validation p-5">

            {issubmited && (
              <h6 className="bg-success p-2 text-white bg-opacity-75 rounded text-center fw-medium">
                Form Submitted Successfully!
              </h6>
            )}

            <h2 className="text-center text-primary fw-medium">
              Validating in ReactJS
            </h2>

            {/* NAME */}
            <span>Enter Company name: </span>
            <input
              className="form-control"
              type="text"
              value={values.name}
              onChange={Name}
            />
            <span className="text-danger fst-italic">{errors.name}</span>

            {/* WEBSITE */}
            <span>Enter Company website: </span>
            <input
              className="form-control"
              type="text"
              value={values.web}
              onChange={Web}
            />
            <span className="text-danger fst-italic">{errors.web}</span>

            {/* EMAIL  */}
            <span>Enter Email: </span>

            <div className="form-control d-flex align-items-center flex-wrap">

              {/* USER INPUT */}
              <input
                style={{
                  border: "none",
                  outline: "none",
                  flex: "1",
                  minWidth: "120px"
                }}
                type="text"
                value={values.email}
                onChange={Email}
                onKeyDown={(e) => {
                  if (chipVisible && e.key === "@") {
                    e.preventDefault(); }
                }}
              />

              {/* CHIP INSIDE INPUT */}
              {domain && chipVisible && (
                <span
                  className="badge bg-secondary d-flex align-items-center ms-1 fs-6"
                  style={{  gap: "6px", cursor: "pointer", }}
                ><span className="chip">
                    @  {domain}

                    <span
                      className="cross"
                      style={{ cursor: "pointer", marginTop: "-2px", fontSize: "0.75rem" }}
                      onClick={() => setChipVisible(false)}
                    >
                      <FaTimes className="fatime" />
                    </span>
                  </span>
                </span>
              )}

            </div>

            <span className="text-danger fst-italic">{errors.email}</span>

            <button className="btn btn-primary mt-3">SUBMIT</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Validation;