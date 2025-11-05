
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import Cartons from "@/pages/Cartons";
import Packages from "@/pages/Packages";
import PermitGuide from "@/pages/PermitGuide";
import SafetyGuide from "@/pages/SafetyGuide";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import Sales from "@/pages/Sales";
import PermitPDRM from "@/pages/PermitPDRM";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <div className="min-h-screen bg-white text-black max-w-full overflow-x-hidden">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cartons" element={<Cartons />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/permit-guide" element={<PermitGuide />} />
                  <Route path="/suratlantikanagent" element={<PermitPDRM />} />
                  <Route path="/safety-guide" element={<SafetyGuide />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
