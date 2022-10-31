import {
  Button,
  ButtonProps,
  Divider,
  FormControl,
  Slider,
  SliderProps,
  styled,
  SvgIcon,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

function Search() {
  const [resultsNumber, setResultsNumber] = useState<number>(15);
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [resultsResp, setResultsResp] = useState<any>([]);

  let keyword = "";
  let page = 1;

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

  const marks = [
    {
      value: 3,
      label: "3",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 12,
      label: "12",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 18,
      label: "50",
    },
  ];

  const ResultsSlider = styled(Slider)<SliderProps>(({ theme }) => ({
    "& .MuiSlider-rail": {
      color: "#5d5d5d",
    },
    "& .MuiSlider-track": {
      color: "#181818",
      backgroundImage: "linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%)",
    },
    "& .MuiSlider-thumb": {
      color: "#181818",
      width: "20px",
      height: "20px",
      border: "6px solid #FFD05D",
    },
    "& .MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover": {
      color: "#181818",
      boxShadow: "none !important",
    },
    "& .MuiSlider-mark": {
      display: "none",
    },
    "& .MuiSlider-markLabel": {
      fontFamily: "Ubuntu",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "150%",
      letterSpacing: "0.15px",
      color: "#FFFFFF",
      opacity: "0.5",
      marginLeft: "2px",
    },
    "& .MuiSlider-markLabelActive": {
      color: "#FFFFFF",
      opacity: "1",
    },
    height: 8,
    color: "#5d5d5d",
  }));

  const handleResultsSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setResultsNumber(newValue as number);
  };

  const SearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "100%",
    width: "343px",
    height: "40px",
    color: theme.palette.getContrastText("#FFFFFF"),
    backgroundColor: "#FFFFFF",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
  }));

  const ArrowButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    width: "20px",
    lineHeight: 1.5,
    backgroundColor: "#181818",
    "&:hover": {
      backgroundColor: "#181818",
      borderColor: "#181818",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#181818",
      borderColor: "#181818",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem #181818",
    },
  });

  return (
    <div className="home">
      {isSearch ? (
        <div className="search">
          <div>
            <FormControl className="search__formControl" variant="outlined">
              <span className="search__label mt-54">Search</span>
              <div className="keyword">
                <KeywordField
                  id="keyword"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  placeholder="Keyword"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    keyword = event.target.value;
                  }}
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
              <span
                className="search__label mt-30"
                style={{ fontFamily: "Ubuntu" }}
              >
                # of results per page
              </span>
              <div className="flex items-end">
                <div
                  className="font-bold text-5xl flex items-center mt-5"
                  style={{ color: " #ffffff", fontFamily: "Ubuntu" }}
                >
                  {resultsNumber === 18 ? 50 : resultsNumber}
                </div>

                <span
                  className="font-normal text-base leading-6"
                  style={{
                    color: " #ffffff",
                    marginLeft: "10px",
                    letterSpacing: "0.15px",
                    fontFamily: "Ubuntu",
                  }}
                >
                  results
                </span>
              </div>
              <Box sx={{ maxWidth: "718px" }}>
                <ResultsSlider
                  value={resultsNumber}
                  step={null}
                  marks={marks}
                  min={3}
                  max={18}
                  onChange={handleResultsSliderChange}
                />
              </Box>
              <Divider
                sx={{
                  marginTop: "30px",
                  opacity: "0.1",
                  borderBottomWidth: "1px",
                  borderColor: "#FFFFFF",
                }}
              />
            </FormControl>
          </div>
          <div className="search__button">
            <SearchButton
              onClick={() => {
                setIsSearch(false);
                // reset the pages
                page = 1;
                axios
                  .get(
                    `https://avl-frontend-exam.herokuapp.com/api/users/all?page=1&pageSize=${
                      resultsNumber === 18 ? 50 : resultsNumber
                    }&keyword=${keyword}`
                  )
                  .then((resp) => {
                    setResultsResp(resp.data.data);
                  });
              }}
              variant="contained"
            >
              SEARCH
            </SearchButton>
          </div>
        </div>
      ) : (
        <div className="results">
          <div
            className="flex items-center"
            style={{ marginTop: "92px", marginLeft: "-44.5px" }}
          >
            <ArrowButton
              disableRipple
              aria-label="arrow"
              onClick={() => {
                setIsSearch(true);
              }}
            >
              <SvgIcon>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_6_416)">
                    <path
                      d="M19.2702 4.10349L17.3333 2.16663L6.5 13L17.3333 23.8333L19.2702 21.8964L10.3737 13L19.2702 4.10349Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_416">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </SvgIcon>
            </ArrowButton>
            <div
              className="text-3xl font-normal leading-6"
              style={{ letterSpacing: "0.25px", color: "#ffffff" }}
            >
              Results
            </div>
          </div>
          <div className="results__frame">
            {resultsResp.length &&
              resultsResp.map((result: any, index: any) => (
                <div className="results__result" key={result.id.concat(index)}>
                  <div className="results__resultImg">
                    <img src={result.avater} alt={result.name} />
                  </div>
                  <div className="results__resultName">{result.name}</div>
                  <div className="results__resultUsername">
                    by {result.username}
                  </div>
                </div>
              ))}
            {/* width: 253, height: 228 */}
          </div>
          <div className="search__button">
            <SearchButton
              onClick={() => {
                setIsSearch(false);
                page = page + 1;
                axios
                  .get(
                    `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=${
                      resultsNumber === 18 ? 50 : resultsNumber
                    }&keyword=${keyword}`
                  )
                  .then((resp) => {
                    setResultsResp([...resultsResp, ...resp.data.data]);
                  });
              }}
              variant="contained"
            >
              More
            </SearchButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
