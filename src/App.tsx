import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { CelebrationProvider } from "@/contexts/celebration-context";
import Index from "./pages/Index";

const App = () => (
  <TooltipProvider>
    <CelebrationProvider>
      <Toaster />
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </CelebrationProvider>
  </TooltipProvider>
);

export default App;
