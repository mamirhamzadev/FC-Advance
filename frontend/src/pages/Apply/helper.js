export const alphabetValidator = (e) => {
  let value = e.target.value || "";
  value = value
    .split("")
    .filter(
      (char) =>
        (char >= "A" && char <= "Z") ||
        (char >= "a" && char <= "z") ||
        char === " "
    )
    .join("");
  e.target.value = value;
};

export const numberValidator = (e) => {
  let value = e.target.value || "";
  value = value
    .split("")
    .filter((char) => char >= "0" && char <= "9")
    .join("");
  e.target.value = value;
};

export const Fields = {
  business: [
    {
      name: "business[name]",
      placeholder: "Legal Company Name",
      type: "text",
      value: "Business",
      onChange: alphabetValidator,
      required: true,
    },
    {
      name: "business[type]",
      placeholder: "Doing Business As",
      value: "IT",
      type: "text",
      onChange: null,
      required: true,
    },
    {
      name: "business[website]",
      placeholder: "Company Website",
      value: "https://youtube.com/",
      type: "text",
      onChange: null,
      required: false,
    },
    {
      name: "business[tax_id]",
      placeholder: "Tax ID/EIN",
      value: "1223",
      type: "text",
      onChange: null,
      required: true,
    },
    {
      name: "business[start_date]",
      placeholder: "Business Start Date",
      type: "date",
      value: new Date().toISOString().split("T")[0],
      max: new Date().toISOString().split("T")[0],
      onChange: null,
      required: true,
    },
    {
      name: "business[state_of_incorporation]",
      placeholder: "State of Incorporation",
      value: "Punjab",
      type: "text",
      onChange: alphabetValidator,
      required: true,
    },
    {
      name: "business[industry]",
      placeholder: "Industry",
      value: "IT",
      type: "text",
      onChange: null,
      required: true,
    },
    {
      name: "business[phone]",
      placeholder: "Phone",
      value: "9999999999",
      type: "tel",
      onChange: numberValidator,
      required: true,
    },
    {
      name: "business[address]",
      placeholder: "Address",
      value: "Lahore",
      type: "text",
      onChange: null,
      required: true,
    },
    {
      name: "business[city]",
      placeholder: "City",
      value: "Lahore",
      type: "text",
      onChange: alphabetValidator,
      required: true,
    },
    {
      name: "business[state]",
      placeholder: "State",
      value: "Punjab",
      type: "text",
      onChange: alphabetValidator,
      required: true,
    },
    {
      name: "business[zip]",
      placeholder: "Zip",
      value: "123",
      type: "text",
      onChange: numberValidator,
      required: true,
    },
  ],
  owner: [
    {
      name: "owner[full_name]",
      placeholder: "Full Name",
      value: "Hamza",
      type: "text",
      onChange: alphabetValidator,
      required: true,
    },
    {
      name: "owner[ownership_percent]",
      placeholder: "Ownership %",
      value: "90",
      type: "text",
      onChange: numberValidator,
      required: true,
    },
    {
      name: "owner[email]",
      placeholder: "Business Email",
      value: "ah5958076@gmail.com",
      type: "email",
      onChange: null,
      required: true,
    },
    {
      name: "owner[ssn]",
      placeholder: "Social Security Number",
      value: "123",
      type: "text",
      onChange: null,
      required: true,
    },
    {
      name: "owner[phone]",
      placeholder: "Mobile Phone",
      value: "999999999999",
      type: "tel",
      onChange: numberValidator,
      required: true,
    },
    {
      name: "owner[fico_score]",
      placeholder: "FICO Score",
      value: "123",
      type: "text",
      onChange: null,
      required: true,
    },
    {
      name: "owner[address][line1]",
      placeholder: "Address Line 1",
      value: "Lahore",
      type: "text",
      onChange: null,
      required: true,
    },
    {
      name: "owner[address][line2]",
      placeholder: "Address Line 2",
      type: "text",
      onChange: null,
      required: false,
    },
    {
      name: "owner[city]",
      placeholder: "City",
      value: "Lahore",
      type: "text",
      onChange: alphabetValidator,
      required: true,
    },
    {
      name: "owner[state]",
      placeholder: "State",
      type: "text",
      value: "Punjab",
      onChange: alphabetValidator,
      required: true,
    },
    {
      name: "owner[zip]",
      placeholder: "Zip",
      type: "text",
      value: "133",
      onChange: numberValidator,
      required: true,
    },
    {
      name: "owner[dob]",
      placeholder: "Date of Birth",
      type: "date",
      value: new Date().toISOString().split("T")[0],
      max: new Date().toISOString().split("T")[0],
      onChange: null,
      required: true,
    },
  ],
  partner: [
    {
      name: "partner[full_name]",
      placeholder: "Full Name",
      type: "text",
      onChange: alphabetValidator,
      required: false,
    },
    {
      name: "partner[ownership_percent]",
      placeholder: "Ownership %",
      type: "text",
      onChange: numberValidator,
      required: false,
    },
    {
      name: "partner[email]",
      placeholder: "Business Email",
      type: "email",
      onChange: null,
      required: false,
    },
    {
      name: "partner[ssn]",
      placeholder: "Social Security Number",
      type: "text",
      onChange: null,
      required: false,
    },
    {
      name: "partner[phone]",
      placeholder: "Mobile Phone",
      type: "tel",
      onChange: numberValidator,
      required: false,
    },
    {
      name: "partner[fico_score]",
      placeholder: "FICO Score",
      type: "text",
      onChange: null,
      required: false,
    },
    {
      name: "partner[address][line1]",
      placeholder: "Address Line 1",
      type: "text",
      onChange: null,
      required: false,
    },
    {
      name: "partner[address][line2]",
      placeholder: "Address Line 2",
      type: "text",
      onChange: null,
      required: false,
    },
    {
      name: "partner[city]",
      placeholder: "City",
      type: "text",
      onChange: alphabetValidator,
      required: false,
    },
    {
      name: "partner[state]",
      placeholder: "State",
      type: "text",
      onChange: alphabetValidator,
      required: false,
    },
    {
      name: "partner[zip]",
      placeholder: "Zip",
      type: "text",
      onChange: numberValidator,
      required: false,
    },
    {
      name: "partner[dob]",
      placeholder: "Date of Birth",
      type: "date",
      max: new Date().toISOString().split("T")[0],
      onChange: null,
      required: false,
    },
  ],
};
