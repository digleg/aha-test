import { Box, styled, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";

function Profile() {
  interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }

  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-root": {
      display: "flex",
      mixWidth: "375px",
    },
    "& .MuiButtonBase-root": {
      width: "50%",
      marginTop: "19px",
      marginRight: "0px",
      /* Subtitle/Regular */

      fontFamily: "Ubuntu",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "150%",
      /* or 24px */

      textAlign: "center",
      letterSpacing: "0.15px",

      /* GreyScale/ 500 */

      color: "#929292",

      opacity: "0.87",
    },
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      height: "2px",
      width: "100%",
      backgroundColor: "#FFFFFF",
    },
  });

  interface StyledTabProps {
    label: string;
  }

  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      /* Subtitle / Bold */

      fontFamily: "Ubuntu",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "150%",
      /* or 24px */

      textAlign: "center",
      letterSpacing: "0.15px",

      /* Primary/Main */

      color: "#FFFFFF",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  }));

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://avl-frontend-exam.herokuapp.com/api/users/all?page=1&pageSize=30"
      )
      .then((resp) => {
        console.log("Follower Resp:", resp.data.data);
        setFollowers(resp.data.data);
      });
    axios
      .get(
        "https://avl-frontend-exam.herokuapp.com/api/users/friends?page=1&pageSize=30"
      )
      .then((resp) => {
        console.log("Following Resp:", resp.data.data);
        setFollowing(resp.data.data);
      });
  }, []);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ marginLeft: "16px", marginRight: "16px", marginTop: "35px" }}
      >
        {value === index && <Typography>{children}</Typography>}
      </div>
    );
  }

  return (
    <div>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
      >
        <StyledTab label="Followers" />
        <StyledTab label="Following" />
      </StyledTabs>
      <TabPanel value={value} index={0}>
        {followers.map((followersItem: any) => (
          <UserItem
            avater={followersItem.avater}
            id={followersItem.id}
            isFollowing={followersItem.isFollowing}
            name={followersItem.name}
            username={followersItem.username}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {following.map((followersItem: any) => (
          <UserItem
            avater={followersItem.avater}
            id={followersItem.id}
            isFollowing={followersItem.isFollowing}
            name={followersItem.name}
            username={followersItem.username}
          />
        ))}
      </TabPanel>
    </div>
  );
}

export default Profile;
