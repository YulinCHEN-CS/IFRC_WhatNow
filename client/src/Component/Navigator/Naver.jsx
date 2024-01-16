import { Toolbar, Container, Typography, Box, Button, AppBar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
  
import LoginButton from "./Login";
import AvatarDropdown from "./AvatarDropdown";
import NavItems from "./NavItems";
import ChangeLanguageDropdown from "../../multiLanguage/dropdown/ChangeLanguageDropdown";
  
  const NavbarComponent = (props: any) => {
    const { firstNavBarItems } = NavItems();
    const location = useLocation();
    const { isLoggedIn } = useSelector((state: any) => state.auth);
  
    return (
      <div className="header">
        <AppBar 
          position="static"
          color="primary"
        >
          <Container maxWidth="lg">
            <Toolbar
              sx={{
                paddingLeft: "0px !important",
                paddingRight: "0px !important"
              }}
            >
              <Box sx={{ flexGrow: { xs: 1, sm: 0 } }}>
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={process.env.PUBLIC_URL + '/logo.png'} alt="WHATNOW LOGO HERE" style={{width: "171px", height: "54px"}} />
                </Link>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "inline", marginLeft: "1rem"},
                }}
                fontWeight={"bold"}
                fontSize={"18px"}
              >
                {/* <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  WHATNOW
                </Link> */}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: { xs: "none", sm: "inline" } }}>
                  {firstNavBarItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        key={item.name}
                        sx={{
                          padding: "6px 0.5rem",
                          textTransform: "capitalize",
                          paddingRight: "15px",
                        }}
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            borderBottom: "1px solid transparent",
                            ...(location.pathname === item.path && {
                              borderBottomColor: "#f5333f",
                              paddingBottom: "2px",
                              marginBottom: "-2px",
                            }),
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Button>
                    </Link>
                  ))}
                  <ChangeLanguageDropdown />
                </Box>
                {isLoggedIn ? <AvatarDropdown /> : <LoginButton />}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  };
  
  export default NavbarComponent;
  