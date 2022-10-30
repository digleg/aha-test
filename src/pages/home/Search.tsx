import { Divider, FormControl, styled, TextField } from "@mui/material";
import React from "react";
import "./Search.css";

function Search() {
  interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const KeywordField = styled(TextField)({
    width: "100%",
    marginTop: "20px",
    "& label.Mui-focused": {
      color: "#FF9B33",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FF9B33",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFFFFF",
      },
      "&:hover fieldset": {
        borderColor: "#FF9B33",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF9B33",
      },
      input: {
        "&::placeholder": {
          fontFamily: "Ubuntu",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "150%",
          display: "flex",
          alignItems: "center",
          letterSpacing: "0.25px,",
          color: "#FFFFFF",
          opacity: 0.3,
        },
        fontFamily: "Ubuntu",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "150%",
        display: "flex",
        alignItems: "center",
        letterSpacing: "0.25px",
        color: "#FFFFFF",
      },
    },
  });

  return (
    <div className="search">
      <FormControl className="search__formControl" variant="outlined">
        <span className="search__label">Search</span>
        <div className="keyword">
          <KeywordField
            id="keyword"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            placeholder="Keyword"
          />
        </div>
        <Divider
          sx={{
            marginTop: "30px",
            opacity: "0.1",
            borderBottomWidth: "1px",
            borderColor: "#FFFFFF",
          }}
        />
        <span className="search__label"># of results per page</span>
      </FormControl>
    </div>
  );
}

export default Search;
