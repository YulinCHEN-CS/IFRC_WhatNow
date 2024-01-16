import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Suspense } from 'react';

import { theme } from './theme';
import { Homepage, Login, Register,  Content} from './load';
import Navbar from './Component/Navigator/Naver';

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="appBody">
          <Navbar />
          <Box className="appMain">
            <Routes>
              <Route path="/" element={<Suspense fallback={<div>waiting</div>}><Homepage></Homepage></Suspense>} />
              <Route path="/blog" element={<Suspense fallback={<div>waiting</div>}><Homepage></Homepage></Suspense>} />
              <Route path="/login" element={<Suspense fallback={<div>waiting</div>}><Login></Login></Suspense>} />
              <Route path="/register" element={<Suspense fallback={<div>waiting</div>}><Register></Register></Suspense>} />
              <Route path="/content" element={<Suspense fallback={<div>waiting</div>}><Content></Content></Suspense>} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
