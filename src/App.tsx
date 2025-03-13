import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import { ModeProvider } from "./contexts/ModeContext";

const App = () => (
  <ModeProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </TooltipProvider>
  </ModeProvider>
);

export default App;
