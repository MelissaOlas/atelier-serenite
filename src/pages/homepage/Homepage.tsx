import React from "react";
import {
  Box,
  Typography,
  Button as MuiButton,
  Link as MuiLink,
} from "@mui/material";
import "./homepage.css";

const Homepage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      height="100%"
    >
      <Box
        flex={1}
        height={{ xs: "auto", md: "100%" }}
        width={{ xs: "100%", md: "50%" }}
        bgcolor="#FAD9D9"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box className="imgContainer">
          <img
            src="/images/main.jpg"
            className="main-img"
            alt="marilyne profile pic"
          />
        </Box>
      </Box>
      <Box
        flex={1}
        height="100%"
        width={{ xs: "100%", md: "50%" }}
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, #a4bdec, #FAD9D9)",
            filter: "blur(50px)",
            zIndex: -1,
          }}
        />
        <Box
          position="relative"
          zIndex={1}
          p={2}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography variant="h1" className="nameTitle">
            Marilyne Lortet
          </Typography>
          <Typography variant="h1" className="contentTitle">
            Atelier sérénité
          </Typography>
          <Typography paragraph>Paragraphe en dessous du titre</Typography>
          <Box
            className="buttons"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={2}
          >
            <MuiButton variant="contained" href="/galerie">
              Galerie
            </MuiButton>
            <MuiButton variant="contained" href="/articles">
              Articles
            </MuiButton>
            <MuiButton variant="contained" href="/contact">
              Contact
            </MuiButton>
            <MuiButton variant="contained" href="/soins">
              Soins
            </MuiButton>
          </Box>
          <Box className="facebook-icon" mt={2}>
            <MuiLink
              href="https://www.facebook.com/atelierserenitemarilynelortet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/fb_icon.svg"
                alt="Facebook"
                width="24"
                height="24"
              />
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
