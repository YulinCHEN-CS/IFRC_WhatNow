import React, { FC } from "react";
import { Typography } from "@mui/material";


const PageTitle: FC = ({ title }) => {
  return (
    <>
      <Typography
        variant="h1"
        textAlign="center"
        fontWeight={600}
        textTransform="capitalize"
        letterSpacing="1.6px"
        paddingBottom="10px"
      >
        {title}
      </Typography>
    </>
  );
};

export default PageTitle;
