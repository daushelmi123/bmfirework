import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { useLocation, Link, useNavigate, useSearchParams, Routes, Route, MemoryRouter } from "react-router-dom";
import * as React from "react";
import { createContext, useState, useEffect, useContext, useRef } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, MessageCircle, ChevronRight, Check, Circle, Menu, ChevronDown, Globe, ShoppingCart, Moon, Star, Sparkles, Play, Package, FileText, Factory, MapPin, ShieldCheck, CalendarDays, TrendingUp, ChevronUp, Search, Minus, Plus, Trash2, AlertTriangle, CheckCircle, Shield, Eye, Users, Flame, Quote, Phone, Mail, Clock, PhoneCall, CheckCircle2, Truck, ChevronLeft, CalendarIcon, Loader2, Download } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as LabelPrimitive from "@radix-ui/react-label";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format } from "date-fns";
import { toast as toast$1 } from "sonner";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const CartContext = createContext(void 0);
const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("fireworksCart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fireworksCart", JSON.stringify(items));
    }
  }, [items]);
  const addToCart = (newItem) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map(
          (item) => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(
      (prev) => prev.map(
        (item) => item.id === id ? { ...item, quantity } : item
      )
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return /* @__PURE__ */ jsx(CartContext.Provider, { value: {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  }, children });
};
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
const LanguageContext = createContext(void 0);
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.fireworks": "Fireworks & Sparklers",
    "nav.packages": "Event Packages",
    "nav.permitGuide": "Permit Guide",
    "nav.safetyGuide": "Safety Tips",
    "nav.testimonials": "Reviews",
    "nav.contact": "Contact Us",
    // Homepage
    "home.hero.title": "BMFireworks — Malaysia’s Licensed Fireworks Partner",
    "home.hero.subtitle": "100% Legal • Premium Quality • Event-Ready Support",
    "home.hero.description": "Bearboom × BMFireworks delivers licensed fireworks with complete documentation, permit guidance, and on-ground coordination for weddings, festive celebrations, and corporate activations.",
    "home.hero.viewFireworks": "View Full Catalogue",
    "home.section.title": "What Experience Are You Planning?",
    "home.section.description": "From Raya open houses to countdown finales, our team recommends the right effects, permit steps, and safety preparations.",
    "home.card.fireworks.title": "Curated Fireworks Library",
    "home.card.fireworks.description": "Browse 100+ licensed items — handheld sparklers, aerial cakes, rockets, and professional finale shells.",
    "home.card.packages.title": "Ready-to-Run Packages",
    "home.card.packages.description": "Save time with themed combinations for weddings, community events, and brand launches. Permit templates included.",
    "home.card.permit.title": "Permit Advisory",
    "home.card.permit.description": "We supply checklists, templates, and coaching so your PDRM application is submitted right the first time.",
    "home.why.title": "Why partners choose Bearboom × BMFireworks",
    "home.why.licensed": "✅ Licensed & Compliant",
    "home.why.licensed.desc": "Registered supplier with audited storage and government-approved inventory.",
    "home.why.products": "🎆 Extensive Inventory",
    "home.why.products.desc": "Eight product categories covering family-friendly sparklers up to stadium-size finale cakes.",
    "home.why.permit": "📝 Permit Guidance",
    "home.why.permit.desc": "Step-by-step advisory for PDRM submissions, local council notifications, and event timings.",
    "home.why.support": "💬 Responsive Support",
    "home.why.support.desc": "Dedicated WhatsApp line, reference videos, and optional on-site coordination.",
    // Price download
    "price.section.title": "Need the latest price list?",
    "price.section.description": "Fill out this quick form and receive the current catalogue instantly. The PDF download starts right after submission.",
    "price.section.button": "Fill form & download price list",
    "price.form.title": "Contact details",
    "price.form.nameLabel": "Full name",
    "price.form.namePlaceholder": "e.g. Ahmad Firdaus",
    "price.form.phoneLabel": "Phone number",
    "price.form.phonePlaceholder": "e.g. 012 345 6789",
    "price.form.stateLabel": "State (Peninsular Malaysia)",
    "price.form.statePlaceholder": "Select state",
    "price.form.submit": "Submit & download PDF",
    "price.form.processing": "Processing…",
    "price.form.note": "We only follow up to confirm stock availability and wholesale packages. Zero spam.",
    "price.form.error.name": "Please enter your full name.",
    "price.form.error.phone": "Please provide a valid phone number.",
    "price.form.error.state": "Please choose your state.",
    "price.form.error.technical": "Download is ready, but your details could not be saved. We will reconcile manually.",
    "price.downloadFilename": "bmfireworks-price-list.pdf",
    // Factory section
    "factory.section.badge": "Licensed factory network",
    "factory.section.title": "Four Bearboom × BMFireworks factories on standby",
    "factory.section.description": "Every facility is operated with government-approved SOPs to ensure compliant inventory and reliable bulk deliveries.",
    "factory.section.cta": "Schedule site visit & bulk stock pickup",
    "factory.section.note": "Visits are by appointment only for serious resellers, event planners, and wholesale buyers.",
    "factory.cards.seelong.location": "Seelong, Johor",
    "factory.cards.seelong.role": "HQ & Primary Production",
    "factory.cards.seelong.description": "Largest production capacity with premium fireworks stocked year-round.",
    "factory.cards.seelong.strength": "Quality control hub and private-label packaging for partners.",
    "factory.cards.muar.location": "Muar, Johor",
    "factory.cards.muar.role": "Southern Wholesale & Event Hub",
    "factory.cards.muar.description": "Specialised in bundling event kits and fulfilling wholesale orders across the South.",
    "factory.cards.muar.strength": "Rapid truck loading bays for daily dispatch.",
    "factory.cards.simpangRenggam.location": "Simpang Renggam, Johor",
    "factory.cards.simpangRenggam.role": "Fulfilment & Repack Facility",
    "factory.cards.simpangRenggam.description": "Dedicated crew for reseller repacks and custom customer branding.",
    "factory.cards.simpangRenggam.strength": "Custom packages for wedding planners, event organisers, and bazaar sellers.",
    "factory.cards.ipoh.location": "Ipoh, Perak",
    "factory.cards.ipoh.role": "Central & Northern Distribution",
    "factory.cards.ipoh.description": "Maintains buffer stock for West Coast and northern state deliveries.",
    "factory.cards.ipoh.strength": "Fast turnaround to Perak, Penang, and Greater Klang Valley.",
    // Peak season section
    "peak.section.badge": "Annual sales surges",
    "peak.section.title": "Major festivals drive massive sales",
    "peak.section.description": "Bearboom × BMFireworks products fly off the shelves during these peak celebrations. Secure inventory early to multiply your revenue.",
    "peak.section.note": "We help you lock supply and plan marketing so you never run out during the busiest festive weeks.",
    "peak.cards.deepavali.festival": "Deepavali",
    "peak.cards.deepavali.period": "Sep – Nov",
    "peak.cards.deepavali.description": "Colourful aerials and community event packages in constant demand.",
    "peak.cards.deepavali.opportunity": "Retail sales spike 2–3×; temple and family bundles move fastest.",
    "peak.cards.aidilfitri.festival": "Hari Raya Aidilfitri",
    "peak.cards.aidilfitri.period": "Mar – Apr",
    "peak.cards.aidilfitri.description": "Village celebrations and buka puasa gatherings need family-friendly effects.",
    "peak.cards.aidilfitri.opportunity": "Secure stock early—family and kids bundles sell out quickly.",
    "peak.cards.cny.festival": "Chinese New Year",
    "peak.cards.cny.period": "Dec – Feb",
    "peak.cards.cny.description": "Restaurants and family reunions require multi-shot cakes, rockets, and finales.",
    "peak.cards.cny.opportunity": "Highest wholesale volume of the year—perfect for premium combos.",
    "peak.cards.christmas.festival": "Christmas & New Year Countdown",
    "peak.cards.christmas.period": "Nov – Jan",
    "peak.cards.christmas.description": "Hotels, event planners, and city squares commission professional displays.",
    "peak.cards.christmas.opportunity": "High-margin showcase packages with optional installation services.",
    // States (Peninsular Malaysia)
    "states.johor": "Johor",
    "states.kedah": "Kedah",
    "states.kelantan": "Kelantan",
    "states.melaka": "Melaka",
    "states.negeriSembilan": "Negeri Sembilan",
    "states.pahang": "Pahang",
    "states.perak": "Perak",
    "states.perlis": "Perlis",
    "states.pulauPinang": "Penang",
    "states.selangor": "Selangor",
    "states.terengganu": "Terengganu",
    "states.wilayahPersekutuanKualaLumpur": "Kuala Lumpur (Federal Territory)",
    "states.wilayahPersekutuanPutrajaya": "Putrajaya (Federal Territory)",
    // Products
    "products.title": "Fireworks Catalogue",
    "products.description": "Filter by category, view demo videos, and add licensed products to your order. Delivery available across Malaysia.",
    "products.search.placeholder": "Search by product name or keyword…",
    "products.category.all": "All Products",
    "products.category.premium": "Specialty Cakes & Finales",
    "products.category.sparkle": "Sparkles & Handhelds",
    "products.category.kidsFirecrackers": "Kid-Friendly Picks",
    "products.category.poppop": "Pop-Pop & Novelty",
    "products.category.fountainBlast": "Fountains & Ground FX",
    "products.category.oneshot": "Single Shot / Thunder",
    "products.category.rocket": "Rockets & Flyers",
    "products.category.reddragon": "Red Dragon Classics",
    "products.noResults": "No products matched your search. Try another keyword or category.",
    "products.addToCart": "Add to cart",
    "products.watchVideo": "Watch demo",
    // Safety Guide
    "safety.hero.title": "Safety First",
    "safety.hero.subtitle": "Use licensed fireworks responsibly so every celebration stays memorable and compliant.",
    "safety.warning.title": "⚠️ Important reminder",
    "safety.warning.description": "Only trained adults should handle ignition. Always follow the permit timing and location requirements.",
    "safety.tips.title": "Quick safety tips",
    "safety.tip1.title": "👨‍👩‍👧‍👦 Adult supervision only",
    "safety.tip1.desc": "Assign a responsible adult to manage lighting and crowd distance at all times.",
    "safety.tip2.title": "👓 Protective gear",
    "safety.tip2.desc": "Keep faces away from ignition points and provide eye protection for crew members.",
    "safety.tip3.title": "🏃‍♂️ Safe perimeter",
    "safety.tip3.desc": "Mark a minimum 8–10 metre exclusion zone around the launch area.",
    "safety.tip4.title": "🚿 Water on standby",
    "safety.tip4.desc": "Prepare buckets of water or an extinguisher before lighting any effect.",
    "safety.steps.title": "Step-by-step checklist",
    "safety.before.title": "📋 Before lighting",
    "safety.before.step1": "Read the instructions for every item in the show sequence.",
    "safety.before.step2": "Clear the launch zone of debris and flammable materials.",
    "safety.before.step3": "Set up safety gear, barricades, and emergency water.",
    "safety.before.step4": "Brief the team on the firing order and emergency plan.",
    "safety.before.step5": "Verify permit timings and inform neighbours when necessary.",
    "safety.during.title": "🔥 During the show",
    "safety.during.step1": "Ignite one item at a time using a long lighter or punk stick.",
    "safety.during.step2": "Move to a safe distance immediately after lighting.",
    "safety.during.step3": "Do not lean over effects once the fuse is lit.",
    "safety.during.step4": "If an item misfires, wait 20 minutes and soak it before disposal.",
    "safety.during.step5": "Keep pets and children indoors throughout the display.",
    "safety.after.title": "🧹 After the display",
    "safety.after.step1": "Allow debris to cool before handling.",
    "safety.after.step2": "Soak spent shells and misfires in water before disposal.",
    "safety.after.step3": "Dispose of all remnants in sealed rubbish bags.",
    "safety.emergency.title": "🚨 Emergency contacts",
    "safety.emergency.description": "Contact the authorities immediately if unexpected incidents occur.",
    "safety.emergency.numbers": "Emergency Numbers",
    "safety.emergency.fire": "🚒 Fire Department: 994",
    "safety.emergency.police": "👮‍♂️ Police: 999",
    "safety.emergency.ambulance": "🚑 Ambulance: 999",
    // Permit Guide
    "permit.hero.title": "Permit paperwork made simple",
    "permit.hero.subtitle": "We prepare document checklists, templates, and submission timelines for PDRM and local councils.",
    "permit.requirements.title": "Documents you will need",
    "permit.requirements.step1": "Company or organiser identification (IC/ROC).",
    "permit.requirements.step2": "Venue approval letter from the relevant municipal council.",
    "permit.requirements.step3": "Site plan with launch and safety zones marked clearly.",
    "permit.requirements.step4": "Insurance coverage or indemnity letter for public events.",
    "permit.process.title": "Permit submission flow",
    "permit.process.step1": "Collect supporting letters and risk assessments.",
    "permit.process.step2": "Submit the application at the nearest district police station.",
    "permit.process.step3": "Provide fire department notification when required.",
    "permit.process.step4": "Settle processing fees and keep receipts for inspection.",
    "permit.process.step5": "Await written approval before scheduling rehearsals.",
    "permit.tips.title": "Helpful tips",
    "permit.tips.tip1": "Apply at least 14 working days before the event.",
    "permit.tips.tip2": "Attach photos or videos of previous shows to build confidence.",
    "permit.tips.tip3": "Maintain a spreadsheet of who signs each form and when.",
    "permit.tips.tip4": "Review safety briefing notes with the local police liaison.",
    "permit.help.title": "Need an experienced coordinator?",
    "permit.help.description": "Contact our team and we will walk you through each requirement, including on-site standby options.",
    // Contact
    "contact.hero.title": "Talk to our fireworks specialists",
    "contact.hero.subtitle": "Share your event concept, budget, and permit timeline — we will propose a compliant solution within 24 hours.",
    "contact.whatsapp.title": "WhatsApp consultation",
    "contact.whatsapp.description": "Fastest response. Our team replies within business hours with suggestions and availability.",
    "contact.whatsapp.number": "+60 13-734 0415",
    "contact.whatsapp.button": "Start WhatsApp chat",
    "contact.email.title": "Email enquiries",
    "contact.email.description": "Send detailed briefs, technical riders, or procurement documents to our inbox.",
    "contact.email.address": "hello@bmfirework.com",
    "contact.hours.title": "Office hours",
    "contact.hours.weekdays": "Monday – Friday: 9.00am – 6.00pm",
    "contact.hours.saturday": "Saturday: 9.00am – 2.00pm",
    "contact.hours.sunday": "Sunday & public holidays: On-call only",
    "contact.location.title": "Showroom & logistics hub",
    "contact.location.address": "Klang Valley operations centre (exact location shared after permit confirmation).",
    // Cart
    "cart.title": "Your Quote Summary",
    "cart.empty": "No products selected yet. Browse the catalogue to build your order.",
    "cart.empty.button": "Browse fireworks",
    "cart.item.remove": "Remove",
    "cart.item.quantity": "Quantity",
    "cart.subtotal": "Subtotal",
    "cart.delivery": "Logistics estimate",
    "cart.total": "Projected total",
    "cart.checkout": "Request quotation",
    "cart.continue": "Continue browsing",
    "cart.delivery.note": "Delivery fees vary by volume and destination. Our team will confirm in the official quotation.",
    "cart.update": "Update",
    "cart.clear": "Clear selection",
    // Packages
    "packages.hero.title": "Curated fireworks programmes",
    "packages.hero.subtitle": "Choose a pre-built package or request a custom show engineered around your venue and budget.",
    "packages.wedding.title": "Wedding highlight packages",
    "packages.wedding.description": "Romantic sparkler entrances, cake fountains, and choreographed finales for ballroom or outdoor receptions.",
    "packages.wedding.price": "From RM299",
    "packages.raya.title": "Festive open house bundles",
    "packages.raya.description": "Family-friendly mixes with managed sound levels and safety signage for residential celebrations.",
    "packages.raya.price": "From RM199",
    "packages.birthday.title": "Birthday & private party sets",
    "packages.birthday.description": "Handheld sparklers, low-level fountains, and surprise bursts tailored to home compounds or boutique venues.",
    "packages.birthday.price": "From RM149",
    "packages.newyear.title": "Countdown spectacles",
    "packages.newyear.description": "High-impact aerial cakes, timed finales, and music-sync options for corporate or public countdowns.",
    "packages.newyear.price": "From RM399",
    "packages.custom.title": "Design a custom display",
    "packages.custom.description": "Share your concept and we will assemble a licensed show sequence, crew, and permit documentation.",
    "packages.custom.button": "Request custom plan",
    "packages.whatsIncluded": "Package includes",
    "packages.orderNow": "Request quotation",
    // Testimonials
    "testimonials.hero.title": "Partners who trust BMFireworks",
    "testimonials.hero.subtitle": "Event planners, resorts, and corporate teams share how our crew supported their celebrations.",
    "testimonials.review1.name": "Azlan • Event Planner (KL)",
    "testimonials.review1.text": "“Bearboom × BMFireworks handled permit submission, rehearsal, and finale cueing flawlessly. Client was impressed with the professionalism.”",
    "testimonials.review1.rating": "⭐⭐⭐⭐⭐",
    "testimonials.review2.name": "Melissa • Resort Manager (Langkawi)",
    "testimonials.review2.text": "“They supplied a customised beachfront show with clear safety briefings and on-site standby. Zero incidents, maximum wow factor.”",
    "testimonials.review2.rating": "⭐⭐⭐⭐⭐",
    "testimonials.review3.name": "Iqbal • Wedding Planner (Penang)",
    "testimonials.review3.text": "“From handheld sparklers to a surprise aerial finale, everything was delivered on time with proper licensing. Highly recommended.”",
    "testimonials.review3.rating": "⭐⭐⭐⭐⭐",
    "testimonials.review4.name": "Samantha • Brand Activation Lead",
    "testimonials.review4.text": "“Great communication, detailed risk assessments, and edit-friendly show files for our approval process. Will book again next quarter.”",
    "testimonials.review4.rating": "⭐⭐⭐⭐⭐",
    "testimonials.cta.title": "Plan your next celebration with us",
    "testimonials.cta.button": "Schedule a consultation",
    // Footer
    "footer.description": "Bearboom × BMFireworks is Malaysia’s trusted partner for licensed fireworks, permit advisory, and event support.",
    "footer.quickLinks": "Quick links",
    "footer.links.catalogue": "Product catalogue",
    "footer.links.packages": "Event packages",
    "footer.links.permit": "Permit guide",
    "footer.links.safety": "Safety guide",
    "footer.links.testimonials": "Testimonials",
    "footer.links.contact": "Contact us",
    "footer.categories": "Popular categories",
    "footer.support": "Customer support",
    "footer.whatsapp": "WhatsApp",
    "footer.email": "Email",
    "footer.contact.title": "Contact",
    "footer.contact.phone": "📱 WhatsApp: +60 13-734 0415",
    "footer.contact.email": "📧 Email: hello@bmfirework.com",
    "footer.contact.hours": "🕒 Mon–Sat: 9AM–6PM",
    "footer.contact.location": "📍 Kuala Lumpur, Malaysia",
    "footer.hours": "Operating hours",
    "footer.hours.time": "Mon–Fri 9am–6pm • Sat 9am–2pm",
    "footer.partnership": "Bearboom × BMFireworks Partnership 🎆",
    "footer.legalNote": "Operations comply with Malaysian fireworks licensing guidelines.",
    "footer.legal": "Legal info",
    "footer.privacy": "Privacy policy",
    "footer.terms": "Terms & conditions",
    "footer.license": "Licensed supplier • SSM & PDRM-compliant",
    "footer.copyright": "© 2025 BMFireworks. All rights reserved.",
    // Common
    "whatsapp.text": "💬 Tekan sini untuk WhatsApp BMFireworks",
    "common.price": "RM",
    "common.products": "products",
    "common.loading": "Loading...",
    "common.error": "Oops! There's an error. Try again.",
    "common.success": "Success! Thank you!"
  },
  ms: {
    // Navigation
    "nav.home": "Utama",
    "nav.fireworks": "Mercun & Bunga Api",
    "nav.packages": "Pakej raya",
    "nav.permitGuide": "Panduan Permit",
    "nav.safetyGuide": "Tips Keselamatan",
    "nav.testimonials": "Ulasan",
    "nav.contact": "Hubungi Kami",
    // Homepage
    "home.hero.title": "BMFireworks — Rakan Mercun Berlesen Malaysia",
    "home.hero.subtitle": "100% Sah • Stok Premium • Support Acara",
    "home.hero.description": "Bearboom × BMFireworks sediakan mercun berlesen lengkap dengan dokumen, nasihat permit dan crew acara untuk perkahwinan, korporat serta perayaan.",
    "home.hero.viewFireworks": "Lihat Semua Produk",
    "home.section.title": "Acara apa yang anda rancang?",
    "home.section.description": "Daripada open house raya hingga countdown tahun baru, kami cadangkan kombinasi efek, panduan permit dan langkah keselamatan.",
    "home.card.fireworks.title": "Perpustakaan Mercun Lengkap",
    "home.card.fireworks.description": "Pilih lebih 100 item berlesen — sparklers, aerial cake, roket dan finale profesional.",
    "home.card.packages.title": "Pakej Siap Guna",
    "home.card.packages.description": "Jimatan masa dengan pakej bertema untuk kahwin, komuniti dan aktivasi jenama. Template permit turut disertakan.",
    "home.card.permit.title": "Bantuan Permit",
    "home.card.permit.description": "Kami sediakan senarai semak, contoh surat dan coaching supaya permohonan PDRM diluluskan tanpa drama.",
    "home.why.title": "Kenapa pilih Bearboom × BMFireworks",
    "home.why.licensed": "✅ Berlesen & Pematuhan",
    "home.why.licensed.desc": "Pembekal berdaftar dengan stor beraudit serta stok diluluskan agensi kerajaan.",
    "home.why.products": "🎆 Inventori Menyeluruh",
    "home.why.products.desc": "Lapan kategori produk merangkumi sparklers keluarga hingga cake finale skala stadium.",
    "home.why.permit": "📝 Panduan Permit",
    "home.why.permit.desc": "Langkah demi langkah untuk permohonan PDRM, notis PBT dan jadual acara.",
    "home.why.support": "💬 Sokongan Pantas",
    "home.why.support.desc": "WhatsApp khusus, rujukan video dan pilihan crew standby di lokasi.",
    // Price download
    "price.section.title": "Nak harga terkini?",
    "price.section.description": "Isi borang ringkas ini untuk dapatkan katalog semasa. Muat turun PDF bermula sebaik borang dihantar.",
    "price.section.button": "Isi borang & muat turun harga",
    "price.form.title": "Maklumat hubungan",
    "price.form.nameLabel": "Nama penuh",
    "price.form.namePlaceholder": "Contoh: Ahmad Firdaus",
    "price.form.phoneLabel": "Nombor telefon",
    "price.form.phonePlaceholder": "Contoh: 012 345 6789",
    "price.form.stateLabel": "Negeri (Semenanjung Malaysia)",
    "price.form.statePlaceholder": "Pilih negeri",
    "price.form.submit": "Hantar & muat turun PDF",
    "price.form.processing": "Sedang diproses…",
    "price.form.note": "Kami hanya hubungi semula untuk sahkan stok dan pakej borong. Tiada spam.",
    "price.form.error.name": "Sila masukkan nama penuh anda.",
    "price.form.error.phone": "Sila masukkan nombor telefon yang sah.",
    "price.form.error.state": "Sila pilih negeri anda.",
    "price.form.error.technical": "Muat turun tersedia, tetapi maklumat anda gagal disimpan. Kami akan rekod secara manual.",
    "price.downloadFilename": "bmfireworks-senarai-harga.pdf",
    // Factory section
    "factory.section.badge": "Rangkaian kilang berlesen",
    "factory.section.title": "4 kilang Bearboom × BMFireworks sedia stok",
    "factory.section.description": "Setiap fasiliti beroperasi dengan SOP diluluskan kerajaan untuk menjamin stok patuh dan penghantaran pukal yang lancar.",
    "factory.section.cta": "Tempah lawatan gudang & pengambilan stok borong",
    "factory.section.note": "Lawatan hanya melalui temujanji untuk reseller serius, event planner dan pembeli borong.",
    "factory.cards.seelong.location": "Seelong, Johor",
    "factory.cards.seelong.role": "HQ & Pengeluaran Utama",
    "factory.cards.seelong.description": "Kapasiti pengeluaran terbesar dengan stok premium sepanjang tahun.",
    "factory.cards.seelong.strength": "Hab kawalan kualiti serta pembungkusan label pelanggan.",
    "factory.cards.muar.location": "Muar, Johor",
    "factory.cards.muar.role": "Hab Borong & Acara Selatan",
    "factory.cards.muar.description": "Pakar dalam set acara dan permintaan borong seluruh Zon Selatan.",
    "factory.cards.muar.strength": "Lorong loading pantas untuk penghantaran setiap hari.",
    "factory.cards.simpangRenggam.location": "Simpang Renggam, Johor",
    "factory.cards.simpangRenggam.role": "Pusat Fulfillment & Repack",
    "factory.cards.simpangRenggam.description": "Krew khas untuk repack reseller dan label khas pelanggan.",
    "factory.cards.simpangRenggam.strength": "Pakej custom untuk wedding planner, penganjur acara dan peniaga bazar.",
    "factory.cards.ipoh.location": "Ipoh, Perak",
    "factory.cards.ipoh.role": "Distribusi Tengah & Utara",
    "factory.cards.ipoh.description": "Menyimpan stok buffer untuk penghantaran pantai barat hingga negeri utara.",
    "factory.cards.ipoh.strength": "Penghantaran pantas ke Perak, Pulau Pinang dan Lembah Klang.",
    // Peak season section
    "peak.section.badge": "Lonjakan jualan tahunan",
    "peak.section.title": "Perayaan besar = jualan meletup",
    "peak.section.description": "Produk Bearboom × BMFireworks sentiasa habis ketika musim puncak ini. Kunci stok awal untuk gandakan jualan anda.",
    "peak.section.note": "Kami bantu anda kunci bekalan dan kempen supaya jualan tak putus sepanjang musim perayaan.",
    "peak.cards.deepavali.festival": "Deepavali",
    "peak.cards.deepavali.period": "Sep – Nov",
    "peak.cards.deepavali.description": "Permintaan tinggi untuk bancuhan warna-warni dan pakej komuniti.",
    "peak.cards.deepavali.opportunity": "Jualan runcit naik 2–3×; bundle kuil dan keluarga paling laris.",
    "peak.cards.aidilfitri.festival": "Hari Raya Aidilfitri",
    "peak.cards.aidilfitri.period": "Mac – Apr",
    "peak.cards.aidilfitri.description": "Kampung dan majlis berbuka perlukan set mesra keluarga.",
    "peak.cards.aidilfitri.opportunity": "Kunci stok lebih awal kerana pakej keluarga dan kanak-kanak cepat habis.",
    "peak.cards.cny.festival": "Tahun Baru Cina",
    "peak.cards.cny.period": "Dis – Feb",
    "peak.cards.cny.description": "Keluarga dan restoran perlukan cake berbilang tembakan, roket dan finale.",
    "peak.cards.cny.opportunity": "Volume borong tertinggi setahun—sesuai untuk combo premium.",
    "peak.cards.christmas.festival": "Krismas & Countdown Tahun Baru",
    "peak.cards.christmas.period": "Nov – Jan",
    "peak.cards.christmas.description": "Hotel, event planner dan bandar perlukan show profesional.",
    "peak.cards.christmas.opportunity": "Margin tinggi untuk pakej showcase beserta pemasangan tapak.",
    // States (Semenanjung Malaysia)
    "states.johor": "Johor",
    "states.kedah": "Kedah",
    "states.kelantan": "Kelantan",
    "states.melaka": "Melaka",
    "states.negeriSembilan": "Negeri Sembilan",
    "states.pahang": "Pahang",
    "states.perak": "Perak",
    "states.perlis": "Perlis",
    "states.pulauPinang": "Pulau Pinang",
    "states.selangor": "Selangor",
    "states.terengganu": "Terengganu",
    "states.wilayahPersekutuanKualaLumpur": "Wilayah Persekutuan Kuala Lumpur",
    "states.wilayahPersekutuanPutrajaya": "Wilayah Persekutuan Putrajaya",
    // Products
    "products.title": "Senarai Mercun",
    "products.description": "Tapis ikut kategori, tonton video demo dan tambah barangan berlesen ke senarai pesanan anda. Penghantaran tersedia di seluruh Malaysia.",
    "products.search.placeholder": "Cari nama produk atau kata kunci…",
    "products.category.all": "Semua Produk",
    "products.category.premium": "Cake & Finale Istimewa",
    "products.category.sparkle": "Sparkler & Handheld",
    "products.category.kidsFirecrackers": "Pilihan Mesra Kanak-kanak",
    "products.category.poppop": "Pop-Pop & Novelti",
    "products.category.fountainBlast": "Fountain & Ground FX",
    "products.category.oneshot": "Single Shot / Thunder",
    "products.category.rocket": "Roket & Penerbangan",
    "products.category.reddragon": "Red Dragon Classics",
    "products.noResults": "Maaf, tiada produk sepadan. Cuba kata kunci atau kategori lain.",
    "products.addToCart": "Tambah ke senarai",
    "products.watchVideo": "Tonton demo",
    // Safety Guide
    "safety.hero.title": "Utamakan keselamatan",
    "safety.hero.subtitle": "Gunakan mercun berlesen secara terancang supaya setiap acara kekal meriah dan sah.",
    "safety.warning.title": "⚠️ Peringatan penting",
    "safety.warning.description": "Hanya kru dewasa terlatih dibenarkan mengendalikan percikan. Ikut masa dan lokasi yang diluluskan dalam permit.",
    "safety.tips.title": "Tip pantas keselamatan",
    "safety.tip1.title": "👨‍👩‍👧‍👦 Awasan dewasa",
    "safety.tip1.desc": "Lantik penyelia bertanggungjawab untuk kawal jarak orang ramai sepanjang pertunjukan.",
    "safety.tip2.title": "👓 Peralatan perlindungan",
    "safety.tip2.desc": "Elak muka daripada kawasan sumbu dan sediakan pelindung mata untuk kru.",
    "safety.tip3.title": "🏃‍♂️ Zon selamat",
    "safety.tip3.desc": "Tandakan zon larangan sekurang-kurangnya 8–10 meter dari kawasan pelancaran.",
    "safety.tip4.title": "🚿 Air standby",
    "safety.tip4.desc": "Sediakan baldi air atau alat pemadam sebelum menyalakan sebarang efek.",
    "safety.steps.title": "Langkah demi langkah",
    "safety.before.title": "📋 Sebelum nyala",
    "safety.before.step1": "Baca arahan setiap item mengikut turutan pertunjukan.",
    "safety.before.step2": "Kosongkan kawasan pelancaran daripada objek dan bahan mudah terbakar.",
    "safety.before.step3": "Letak peralatan keselamatan, penghadang dan sumber air kecemasan.",
    "safety.before.step4": "Brief kru tentang urutan tembakan serta pelan kecemasan.",
    "safety.before.step5": "Sahkan masa permit dan maklumkan jiran jika perlu.",
    "safety.during.title": "🔥 Semasa pertunjukan",
    "safety.during.step1": "Nyalakan satu item pada satu masa guna pemetik panjang.",
    "safety.during.step2": "Berundur segera ke zon selamat selepas menyalakan.",
    "safety.during.step3": "Jangan bongkok ke arah efek selepas sumbu dinyalakan.",
    "safety.during.step4": "Jika misfire, tunggu 20 minit sebelum rendam dan lupuskan.",
    "safety.during.step5": "Pastikan haiwan peliharaan dan kanak-kanak berada di dalam rumah.",
    "safety.after.title": "🧹 Selepas pertunjukan",
    "safety.after.step1": "Biarkan sisa sejuk sebelum menyentuhnya.",
    "safety.after.step2": "Rendam casing dan item misfire sebelum dibuang.",
    "safety.after.step3": "Buang semua sisa dalam beg sampah tertutup.",
    "safety.emergency.title": "🚨 Nombor kecemasan",
    "safety.emergency.description": "Hubungi pihak berkuasa segera jika berlaku insiden di luar jangka.",
    "safety.emergency.numbers": "Nombor Kecemasan",
    "safety.emergency.fire": "🚒 Bomba: 994",
    "safety.emergency.police": "👮‍♂️ Polis: 999",
    "safety.emergency.ambulance": "🚑 Ambulans: 999",
    // Permit Guide
    "permit.hero.title": "Proses permit jadi mudah",
    "permit.hero.subtitle": "Kami siap dengan senarai dokumen, contoh surat dan jadual serahan untuk PDRM serta PBT.",
    "permit.requirements.title": "Dokumen diperlukan",
    "permit.requirements.step1": "Salinan IC/SSM penganjur atau syarikat.",
    "permit.requirements.step2": "Surat sokongan lokasi daripada majlis perbandaran berkaitan.",
    "permit.requirements.step3": "Pelan tapak lengkap dengan zon pelancaran dan garis keselamatan.",
    "permit.requirements.step4": "Polisi insurans atau surat tanggungan untuk acara awam.",
    "permit.process.title": "Aliran serahan permit",
    "permit.process.step1": "Kumpul semua dokumen sokongan dan penilaian risiko.",
    "permit.process.step2": "Serah borang di balai polis daerah terdekat.",
    "permit.process.step3": "Maklumkan bomba jika perlu untuk pemeriksaan lokasi.",
    "permit.process.step4": "Selesaikan bayaran pemprosesan dan simpan resit.",
    "permit.process.step5": "Tunggu kelulusan bertulis sebelum jadualkan latihan.",
    "permit.tips.title": "Tip berguna",
    "permit.tips.tip1": "Mohon sekurang-kurangnya 14 hari bekerja sebelum acara.",
    "permit.tips.tip2": "Lampirkan foto atau video show terdahulu sebagai rujukan.",
    "permit.tips.tip3": "Catat siapa tanda tangan setiap dokumen dan tarikh serahan.",
    "permit.tips.tip4": "Semak nota taklimat keselamatan bersama pegawai liaison polis.",
    "permit.help.title": "Perlu bantuan penuh?",
    "permit.help.description": "Hubungi kami dan kami akan bimbing setiap langkah hingga permit lulus, termasuk opsyen crew standby.",
    // Contact
    "contact.hero.title": "Berbincang dengan pasukan mercun kami",
    "contact.hero.subtitle": "Kongsi idea acara, bajet dan tarikh permit — kami cadangkan solusi patuh peraturan dalam 24 jam.",
    "contact.whatsapp.title": "Sesi WhatsApp",
    "contact.whatsapp.description": "Respons terpantas. Team kami balas pada waktu pejabat dengan cadangan dan slot tersedia.",
    "contact.whatsapp.number": "+60 13-734 0415",
    "contact.whatsapp.button": "Mula chat WhatsApp",
    "contact.email.title": "Emel pertanyaan",
    "contact.email.description": "Hantar brief lengkap, rider teknikal atau dokumen perolehan ke peti mel kami.",
    "contact.email.address": "hello@bmfirework.com",
    "contact.hours.title": "Waktu operasi",
    "contact.hours.weekdays": "Isnin – Jumaat: 9.00 pagi – 6.00 petang",
    "contact.hours.saturday": "Sabtu: 9.00 pagi – 2.00 petang",
    "contact.hours.sunday": "Ahad & cuti umum: On-call sahaja",
    "contact.location.title": "Showroom & hub logistik",
    "contact.location.address": "Klang Valley (lokasi tepat dikongsi selepas pengesahan permit).",
    // Cart
    "cart.title": "Ringkasan sebut harga",
    "cart.empty": "Belum ada produk dalam senarai. Rujuk katalog untuk mula pilih.",
    "cart.empty.button": "Lihat katalog",
    "cart.item.remove": "Buang",
    "cart.item.quantity": "Kuantiti",
    "cart.subtotal": "Anggaran subtotal",
    "cart.delivery": "Anggaran logistik",
    "cart.total": "Jumlah anggaran",
    "cart.checkout": "Hantar permohonan sebut harga",
    "cart.continue": "Teruskan pilih",
    "cart.delivery.note": "Kos penghantaran bergantung kepada jumlah dan destinasi. Anggaran tepat diberi dalam sebut harga rasmi.",
    "cart.update": "Kemaskini",
    "cart.clear": "Kosongkan senarai",
    // Packages
    "packages.hero.title": "Pakej mercun dipilih pakar",
    "packages.hero.subtitle": "Pilih pakej sedia ada atau tempah pertunjukan khas ikut venue dan bajet.",
    "packages.wedding.title": "Pakej kahwin",
    "packages.wedding.description": "Entrance sparkler, fountain kek, dan finale romantik untuk resepsi indoor atau outdoor.",
    "packages.wedding.price": "Dari RM299",
    "packages.raya.title": "Pakej rumah terbuka",
    "packages.raya.description": "Gabungan mesra keluarga dengan kawalan bunyi serta papan tanda keselamatan.",
    "packages.raya.price": "Dari RM199",
    "packages.birthday.title": "Pakej hari jadi / private party",
    "packages.birthday.description": "Sparkler tangan, fountain rendah, dan surprise burst untuk laman rumah atau venue butik.",
    "packages.birthday.price": "Dari RM149",
    "packages.newyear.title": "Pakej countdown",
    "packages.newyear.description": "Cake impak tinggi, finale bertema dan pilihan sync muzik untuk acara korporat atau awam.",
    "packages.newyear.price": "Dari RM399",
    "packages.custom.title": "Tempah rancangan khas",
    "packages.custom.description": "Kongsikan konsep anda dan kami bina turutan show berlesen, crew serta dokumen permit.",
    "packages.custom.button": "Minta pelan custom",
    "packages.whatsIncluded": "Dalam pakej",
    "packages.orderNow": "Mohon sebut harga",
    // Testimonials
    "testimonials.hero.title": "Klien yang yakin dengan BMFireworks",
    "testimonials.hero.subtitle": "Event planner, resort dan pasukan korporat berkongsi pengalaman mereka dengan crew kami.",
    "testimonials.review1.name": "Azlan • Event Planner (KL)",
    "testimonials.review1.text": "“Bearboom × BMFireworks urus permit, rehearsal dan finale tepat masa. Klien puji proses yang sangat profesional.”",
    "testimonials.review1.rating": "⭐⭐⭐⭐⭐",
    "testimonials.review2.name": "Melissa • Pengurus Resort (Langkawi)",
    "testimonials.review2.text": "“Show pantai custom dengan briefing keselamatan jelas dan crew standby. Zero insiden, semua tetamu teruja.”",
    "testimonials.review2.rating": "⭐⭐⭐⭐⭐",
    "testimonials.review3.name": "Iqbal • Wedding Planner (Pulau Pinang)",
    "testimonials.review3.text": "“Daripada sparkler tetamu hingga finale meletup, semuanya dihantar on time dengan kelulusan lengkap.”",
    "testimonials.review3.rating": "⭐⭐⭐⭐⭐",
    "testimonials.review4.name": "Samantha • Lead Aktivasi Jenama",
    "testimonials.review4.text": "“Komunikasi laju, laporan risiko terperinci, dan file show mudah untuk audit dalaman kami. Akan bekerjasama lagi.”",
    "testimonials.review4.rating": "⭐⭐⭐⭐⭐",
    "testimonials.cta.title": "Jom rancang pertunjukan seterusnya",
    "testimonials.cta.button": "Tempah sesi konsultasi",
    // Footer
    "footer.description": "Bearboom × BMFireworks ialah rakan mercun berlesen untuk bekalan, nasihat permit dan crew acara.",
    "footer.quickLinks": "Pautan pantas",
    "footer.links.catalogue": "Katalog produk",
    "footer.links.packages": "Pakej acara",
    "footer.links.permit": "Panduan permit",
    "footer.links.safety": "Panduan keselamatan",
    "footer.links.testimonials": "Testimoni",
    "footer.links.contact": "Hubungi kami",
    "footer.categories": "Kategori popular",
    "footer.support": "Sokongan pelanggan",
    "footer.whatsapp": "WhatsApp",
    "footer.email": "Emel",
    "footer.contact.title": "Hubungi",
    "footer.contact.phone": "📱 WhatsApp: +60 13-734 0415",
    "footer.contact.email": "📧 Emel: hello@bmfirework.com",
    "footer.contact.hours": "🕒 Isnin–Sabtu: 9AM–6PM",
    "footer.contact.location": "📍 Kuala Lumpur, Malaysia",
    "footer.hours": "Waktu operasi",
    "footer.hours.time": "Isn–Jum 9pg–6ptg • Sab 9pg–2ptg",
    "footer.partnership": "Bearboom × BMFireworks Partnership 🎆",
    "footer.legalNote": "Operasi mematuhi garis panduan & permit mercun Malaysia.",
    "footer.legal": "Info undang-undang",
    "footer.privacy": "Dasar privasi",
    "footer.terms": "Terma & syarat",
    "footer.license": "Pembekal sah • Pematuhan SSM & PDRM",
    "footer.copyright": "© 2025 BMFireworks. Semua hak terpelihara.",
    // Common
    "whatsapp.text": "💬 Tekan sini untuk WhatsApp BMFireworks",
    "common.price": "RM",
    "common.products": "produk",
    "common.loading": "Memuatkan...",
    "common.error": "Alamak! Ada masalah. Cuba lagi.",
    "common.success": "Berjaya! Terima kasih!"
  }
};
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const t = (key) => {
    return translations[language][key] || key;
  };
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value: { language, setLanguage, t }, children });
};
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === void 0) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
const themeConfigs = {
  // Black/Gold - Premium Licensed Theme
  "mercunberlesen.com": {
    name: "Premium Black & Gold",
    colors: {
      primary: "214 27% 10%",
      // Black
      primaryForeground: "45 93% 75%",
      // Gold
      secondary: "45 93% 75%",
      // Gold
      secondaryForeground: "214 27% 10%",
      // Black
      accent: "45 93% 75%",
      // Gold
      accentForeground: "214 27% 10%",
      // Black
      cartColors: {
        above: "from-slate-800 to-slate-700",
        below: "from-red-800 to-red-700",
        border: "border-yellow-400",
        icon: "text-yellow-400",
        text: "text-yellow-100"
      }
    },
    branding: {
      title: "Mercuncelebrasi",
      subtitle: "Distributor Mercun celebrasi Rasmi #1 Malaysia",
      description: "100% legal, kualiti premium, dokumentasi lengkap",
      positioning: "premium licensed distributor"
    }
  },
  // Red/Silver - Raya Celebration Theme
  "rayafireworks.com": {
    name: "Red & Silver Raya",
    colors: {
      primary: "0 84% 60%",
      // Red-600 (#DC2626)
      primaryForeground: "220 13% 91%",
      // Gray-200 (#E5E7EB)
      secondary: "220 13% 91%",
      // Silver/Gray-200
      secondaryForeground: "0 84% 60%",
      // Red
      accent: "0 84% 60%",
      // Red
      accentForeground: "220 13% 91%",
      // Silver
      cartColors: {
        above: "from-red-600 to-red-700",
        below: "from-red-800 to-red-900",
        border: "border-gray-300",
        icon: "text-gray-400",
        text: "text-gray-100"
      }
    },
    branding: {
      title: "RayaFireworks",
      subtitle: "Specialist Bunga Api Hari Raya Malaysia",
      description: "Sambutan Raya yang meriah dan selamat untuk keluarga",
      positioning: "raya celebration specialist"
    }
  },
  // Green/Yellow - Traditional Raya Theme (for mercunraya.com reference)
  "mercunraya.com": {
    name: "Green & Yellow Traditional",
    colors: {
      primary: "120 100% 25%",
      // Green
      primaryForeground: "60 100% 95%",
      // Light Yellow
      secondary: "60 100% 50%",
      // Yellow
      secondaryForeground: "120 100% 25%",
      // Green
      accent: "60 100% 50%",
      // Yellow
      accentForeground: "120 100% 25%",
      // Green
      cartColors: {
        above: "from-green-600 to-green-700",
        below: "from-red-800 to-red-700",
        border: "border-yellow-400",
        icon: "text-yellow-400",
        text: "text-yellow-100"
      }
    },
    branding: {
      title: "MercunRaya",
      subtitle: "Bunga Api Hari Raya Terbaik Malaysia",
      description: "Koleksi istimewa untuk sambutan Raya yang meriah",
      positioning: "traditional raya fireworks"
    }
  },
  // Blue Theme (for fireworksmalaysia.com reference)
  "fireworksmalaysia.com": {
    name: "Blue Professional",
    colors: {
      primary: "217 91% 60%",
      // Blue
      primaryForeground: "220 13% 91%",
      // Light Gray
      secondary: "220 13% 91%",
      // Light Gray
      secondaryForeground: "217 91% 60%",
      // Blue
      accent: "217 91% 60%",
      // Blue
      accentForeground: "220 13% 91%",
      // Light Gray
      cartColors: {
        above: "from-blue-600 to-blue-700",
        below: "from-red-800 to-red-700",
        border: "border-blue-400",
        icon: "text-blue-400",
        text: "text-blue-100"
      }
    },
    branding: {
      title: "FireworksMalaysia",
      subtitle: "Professional Fireworks Supplier Malaysia",
      description: "Quality fireworks for all occasions and celebrations",
      positioning: "professional fireworks supplier"
    }
  },
  // Brown/Green Theme - BM Firework (Bear Mascot)
  "bmfirework.com": {
    name: "Brown & Green Bear",
    colors: {
      primary: "25 60% 35%",
      // Brown (#7D5A3D)
      primaryForeground: "120 40% 95%",
      // Light Green
      secondary: "130 50% 45%",
      // Green (#3D9970)
      secondaryForeground: "25 60% 95%",
      // Light Brown
      accent: "130 50% 45%",
      // Green
      accentForeground: "25 60% 95%",
      // Light Brown
      cartColors: {
        above: "from-green-600 to-green-700",
        below: "from-amber-800 to-amber-700",
        border: "border-green-400",
        icon: "text-green-400",
        text: "text-green-100"
      }
    },
    branding: {
      title: "BMFireworks x BearBoom",
      subtitle: "Mercun & Bunga Api Berkualiti Malaysia",
      description: "Harga berpatutan, kualiti terjamin untuk sambutan meriah",
      positioning: "quality affordable fireworks"
    }
  }
};
const getCurrentTheme = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    return themeConfigs[hostname] || themeConfigs["bmfirework.com"];
  }
  return themeConfigs["bmfirework.com"];
};
const applyTheme = (theme) => {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.colors.primary);
    root.style.setProperty("--primary-foreground", theme.colors.primaryForeground);
    root.style.setProperty("--secondary", theme.colors.secondary);
    root.style.setProperty("--secondary-foreground", theme.colors.secondaryForeground);
    root.style.setProperty("--accent", theme.colors.accent);
    root.style.setProperty("--accent-foreground", theme.colors.accentForeground);
  }
};
const ThemeContext = createContext(void 0);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getCurrentTheme());
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
    applyTheme(currentTheme);
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, isLoading }, children });
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
const WhatsAppButton = () => {
  const { t } = useLanguage();
  const whatsappNumber = "+60137340415";
  const message = "Hi, inquiries bmfirework";
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleWhatsAppClick,
      className: "fixed bottom-24 right-6 bg-primary hover:bg-accent text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center space-x-2 group",
      "aria-label": "Contact us on WhatsApp",
      children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-sm font-medium group-hover:block", children: t("whatsapp.text") })
      ]
    }
  );
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.fireworks"), href: "/products" },
    { name: "Cartons", href: "/cartons" },
    { name: t("nav.packages"), href: "/packages" },
    { name: t("nav.permitGuide"), href: "/permit-guide" },
    { name: "Surat Lantikan Agent", href: "/suratlantikanagent" },
    { name: t("nav.safetyGuide"), href: "/safety-guide" },
    { name: t("nav.testimonials"), href: "/testimonials" },
    { name: t("nav.contact"), href: "/contact" }
  ];
  const isActive = (path) => location.pathname === path;
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ms" : "en");
  };
  return /* @__PURE__ */ jsx("nav", { className: "bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-yellow-400 sticky top-0 z-50 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-20 gap-4", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1762139873/bearboom_x_bmfireworks_1_ec7aua.png",
          alt: "Bearboom × BMFireworks",
          className: "h-10 w-auto",
          loading: "eager",
          decoding: "async"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive("/") ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg" : "text-yellow-200 hover:bg-slate-700 hover:text-yellow-100"}`,
            children: t("nav.home")
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/products",
            className: `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive("/products") ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg" : "text-yellow-200 hover:bg-slate-700 hover:text-yellow-100"}`,
            children: t("nav.fireworks")
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/cartons",
            className: `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive("/cartons") ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg" : "text-yellow-200 hover:bg-slate-700 hover:text-yellow-100"}`,
            children: "Cartons"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/permit-guide",
            className: `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive("/permit-guide") ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg" : "text-yellow-200 hover:bg-slate-700 hover:text-yellow-100"}`,
            children: t("nav.permitGuide")
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/contact",
            className: `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive("/contact") ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg" : "text-yellow-200 hover:bg-slate-700 hover:text-yellow-100"}`,
            children: t("nav.contact")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 flex-shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              Button,
              {
                size: "sm",
                className: "border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium px-3 text-sm h-10 shadow-lg",
                children: [
                  /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4 mr-2" }),
                  "More",
                  /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 ml-2" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", className: "w-48 bg-slate-800 border-2 border-yellow-400", children: navigation.filter((item) => !["/products", "/", "/permit-guide", "/cartons", "/contact"].includes(item.href)).map((item) => /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
              Link,
              {
                to: item.href,
                className: `w-full cursor-pointer text-yellow-200 hover:bg-slate-700 hover:text-yellow-100 px-3 py-2 rounded transition-all duration-200 ${isActive(item.href) ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 font-medium" : ""}`,
                children: item.name
              }
            ) }, item.name)) })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              onClick: toggleLanguage,
              className: "border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium px-3 text-sm h-10 shadow-lg",
              children: [
                /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 mr-2" }),
                language === "en" ? "BM" : "EN"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/cart",
            className: "relative p-2 sm:p-3 text-yellow-300 hover:bg-yellow-400 hover:text-slate-900 rounded-lg transition-all duration-200 border-2 border-yellow-400 bg-gradient-to-br from-slate-800 to-slate-700 min-w-[48px] h-12 flex items-center justify-center shadow-lg",
            children: [
              /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5 sm:h-6 sm:w-6" }),
              getTotalItems() > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-bold border-2 border-white", children: getTotalItems() })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            onClick: () => setIsOpen(!isOpen),
            className: "border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium px-2 text-xs h-10 shadow-lg",
            children: isOpen ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" })
          }
        ) })
      ] })
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "lg:hidden border-t-2 border-yellow-400 bg-gradient-to-b from-slate-800 to-slate-900", children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-4 pb-6 space-y-2", children: [
      navigation.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.href,
          onClick: () => setIsOpen(false),
          className: `block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${isActive(item.href) ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 shadow-lg" : "text-yellow-200 hover:bg-slate-700 hover:text-yellow-100"}`,
          children: item.name
        },
        item.name
      )),
      /* @__PURE__ */ jsx("div", { className: "pt-2 border-t border-yellow-400", children: /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => {
            toggleLanguage();
            setIsOpen(false);
          },
          className: "w-full border-2 border-yellow-400 text-yellow-300 bg-slate-700 hover:bg-yellow-400 hover:text-slate-900 font-medium py-3 shadow-lg",
          children: [
            /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 mr-2" }),
            language === "en" ? "Switch to Bahasa Malaysia" : "Switch to English"
          ]
        }
      ) })
    ] }) })
  ] }) });
};
const Footer = () => {
  const { t } = useLanguage();
  const quickLinks = [
    { to: "/products", label: t("footer.links.catalogue") },
    { to: "/packages", label: t("footer.links.packages") },
    { to: "/permit-guide", label: t("footer.links.permit") },
    { to: "/safety-guide", label: t("footer.links.safety") },
    { to: "/testimonials", label: t("footer.links.testimonials") },
    { to: "/contact", label: t("footer.links.contact") }
  ];
  const contactInfo = [
    t("footer.contact.phone"),
    t("footer.contact.email"),
    t("footer.contact.hours"),
    t("footer.contact.location")
  ];
  return /* @__PURE__ */ jsxs("footer", { className: "bg-gradient-to-br from-slate-800 to-slate-900 text-yellow-50 py-8 sm:py-12 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-8 h-full", children: Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-yellow-300 rounded-full w-8 h-8" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 sm:col-span-2 lg:col-span-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 mb-4", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1762139873/bearboom_x_bmfireworks_1_ec7aua.png",
              alt: "Bearboom × BMFireworks",
              className: "h-12 w-auto",
              loading: "lazy",
              decoding: "async"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "text-yellow-100 mb-4 text-sm sm:text-base", children: t("footer.description") }),
          /* @__PURE__ */ jsx("p", { className: "text-yellow-200 text-sm sm:text-base", children: t("footer.partnership") })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold mb-4 text-yellow-100", children: t("footer.quickLinks") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: quickLinks.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: item.to, className: "text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base", children: item.label }) }, item.to)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold mb-4 text-yellow-100", children: t("footer.contact.title") }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 text-yellow-200 text-sm sm:text-base", children: contactInfo.map((line, index) => /* @__PURE__ */ jsx("p", { children: line }, index)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-600 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-yellow-200", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-base", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " BMFireworks. All rights reserved."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs sm:text-sm", children: t("footer.legalNote") })
      ] })
    ] })
  ] });
};
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const fireworksData = [
  {
    id: 27,
    name: { en: "Classic Pop Pop", ms: "Pop Pop Klasik" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
    videoUrl: "",
    category: "pop_pop",
    section: "POP-POP"
  },
  {
    id: 28,
    name: { en: "Jumbo Pop Pop", ms: "Pop Pop Jumbo" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
    videoUrl: "",
    category: "pop_pop",
    section: "POP-POP"
  },
  {
    id: 29,
    name: { en: "Color Pop Pop", ms: "Pop Pop Berwarna" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
    videoUrl: "",
    category: "pop_pop",
    section: "POP-POP"
  },
  {
    id: 30,
    name: { en: "Super Pop Pop", ms: "Pop Pop Super" },
    price: 45,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
    videoUrl: "",
    category: "pop_pop",
    section: "POP-POP"
  },
  {
    id: 31,
    name: { en: "Pop Pop Party Pack", ms: "Pek Parti Pop Pop" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198878/fireworks_400x400/fireworks_400x400/resized_framed_product_39_Pop_Pop_Besar.jpg",
    videoUrl: "",
    category: "pop_pop",
    section: "POP-POP"
  },
  {
    id: 97,
    name: { en: "4 138 Shot Merdeka", ms: "4 138 Shot Merdeka" },
    price: 100,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199058/fireworks_400x400/fireworks_400x400/resized_framed_product_91_4_138_Shoot_Cake_4_138.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077619/HunterBoom/cm4shk2s0000g03ju9jme3n1g_wrp2hg.mp4",
    category: "premium",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 901,
    name: { en: "5138 Shoot Cake ABC", ms: "5138 Shoot Cake (ABC)" },
    price: 250,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198938/fireworks_400x400/fireworks_400x400/resized_framed_product_0_5138_Shoot_Cake_28ABC29.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076871/HunterBoom/cm4l31g5200010cmq8qeahfje_gjzsmh.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 902,
    name: { en: "8 Feet (BOM)", ms: "8 Feet (Bom)" },
    price: 7,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198958/fireworks_400x400/fireworks_400x400/resized_framed_8_Feet_BOM.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 903,
    name: { en: "8 Feet 1.0 Super Red 1.0", ms: "8 Feet 1.0 Super Red" },
    price: 13,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199029/fireworks_400x400/fireworks_400x400/resized_framed_product_2_8_Feet_1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076882/HunterBoom/cm3fcqwsm00080dkxfqkt9q7h_jhwrtd.mp4",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 904,
    name: { en: "8 Feet 1.0 Super Rose 1.0", ms: "8 Feet 1.0 Super Rose" },
    price: 13,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199085/fireworks_400x400/fireworks_400x400/resized_framed_product_3_8_Feet_1.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 905,
    name: { en: "8 Feet 1.0 Super Gold 1.0", ms: "8 Feet 1.0 Super Gold" },
    price: 13,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199075/fireworks_400x400/fireworks_400x400/resized_framed_product_4_8_Feet_1.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 906,
    name: { en: "12 Feet 1.2 Super Gold (1.2)", ms: "12 Feet 1.2 Super Gold" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199003/fireworks_400x400/fireworks_400x400/resized_framed_product_5_12_Feet_1.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 907,
    name: { en: "18 Feet 1.2 Super Red 18 (1.2)", ms: "18 Feet 1.2 Super Red" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199060/fireworks_400x400/fireworks_400x400/resized_framed_product_6_18_Feet_1.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 908,
    name: { en: "18 Feet 1.2 Super Rose 18 (1.2)", ms: "18 Feet 1.2 Super Rose" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198978/fireworks_400x400/fireworks_400x400/resized_framed_product_7_18_Feet_1.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 909,
    name: { en: "18 Feet 1.2 Super Gold 18 (1.2)", ms: "18 Feet 1.2 Super Gold" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199089/fireworks_400x400/fireworks_400x400/resized_framed_product_8_18_Feet_1.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 910,
    name: { en: "28 Feet Super Gold Gift Box 28", ms: "28 Feet Super Gold (Gift Box)" },
    price: 45,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198919/fireworks_400x400/fireworks_400x400/resized_framed_product_9_28_Feet_Super_Gold_Gift_Box_28.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076893/HunterBoom/cm3fcklnr00020cmk4ox5hesv_c4wd5e.mp4",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 911,
    name: { en: "38 Feet Red", ms: "38 Feet Super Red" },
    price: 55,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198946/fireworks_400x400/fireworks_400x400/resized_framed_product_10_B_006_R_38_Feet_Super_Red_38.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 912,
    name: { en: "38 Feet Rose", ms: "38 Feet Rose" },
    price: 55,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199118/fireworks_400x400/fireworks_400x400/resized_framed_product_11_B_006_P_38_Feet_Rose_38.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 913,
    name: { en: "38 Feet Gold", ms: "38 Feet Gold" },
    price: 55,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198924/fireworks_400x400/fireworks_400x400/resized_framed_product_12_B_006_G_38_Feet_Gold_38.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 914,
    name: { en: "66 Feet Mix Super Red Rose", ms: "66 Feet Mix (Super Red Rose)" },
    price: 100,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199045/fireworks_400x400/fireworks_400x400/resized_framed_product_17_88_Feet_Mix_Super_Red_Rose_88.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 915,
    name: { en: "88 Feet Red", ms: "88 Feet Super Red" },
    price: 220,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199024/fireworks_400x400/fireworks_400x400/resized_framed_product_14_88_Feet_Super_Red_88.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 916,
    name: { en: "88 Feet Rose", ms: "88 Feet Super Rose" },
    price: 220,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198880/fireworks_400x400/fireworks_400x400/resized_framed_product_15_88_Feet_Super_Rose_88.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 917,
    name: { en: "88 Feet Gold", ms: "88 Feet Super Gold" },
    price: 220,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199077/fireworks_400x400/fireworks_400x400/resized_framed_product_16_88_Feet_Super_Gold_88.jpg",
    videoUrl: "",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 918,
    name: { en: "88 Feet Mix Super Red Rose", ms: "88 Feet Mix (Super Red Rose)" },
    price: 250,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199045/fireworks_400x400/fireworks_400x400/resized_framed_product_17_88_Feet_Mix_Super_Red_Rose_88.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076903/HunterBoom/cm3fek40900040dmk0yynbalc_ynqvah.mp4",
    category: "traditional",
    section: "RED DRAGON FIRECRACKERS"
  },
  {
    id: 919,
    name: { en: "Sunset Kayu Tiga Warna", ms: "Sunset Kayu Tiga Warna" },
    price: 15,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199081/fireworks_400x400/fireworks_400x400/resized_framed_product_18_Sunset_Kayu_Tiga_Warna.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076913/HunterBoom/cm3flps0e000a0clb8e5pay1e_rzzlcl.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 920,
    name: { en: "Sunset Besar", ms: "Sunset Besar" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199091/fireworks_400x400/fireworks_400x400/resized_framed_product_19_Sunset_Besar.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076923/HunterBoom/cm3flt42v00020cjwe6jg8qf6_jccz6a.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 921,
    name: { en: "Asap Color", ms: "Asap Color" },
    price: 8,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198962/fireworks_400x400/fireworks_400x400/resized_framed_product_20_Asap_Color.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076934/HunterBoom/cm3flwhbe000a0ckw4pm768ja_rewkth.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 922,
    name: { en: "Asap", ms: "Asap" },
    price: 8,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198948/fireworks_400x400/fireworks_400x400/resized_framed_product_21_Asap.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076946/HunterBoom/cm3fm4uk200070cl9aimr6np8_pu9rlo.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 923,
    name: { en: "Sunset 4 Color", ms: "Sunset 4 Color" },
    price: 40,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198930/fireworks_400x400/fireworks_400x400/resized_framed_product_22_Sunset_4_Color.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076956/HunterBoom/cm3fm751x00030cjv1jticujs_hcsqvb.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 924,
    name: { en: "C018 7 Inch Besi 7", ms: "C018 7 Inch Besi 7" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198893/fireworks_400x400/fireworks_400x400/resized_framed_product_23_C_018_7_Inch_Besi_7.jpg",
    videoUrl: "",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 925,
    name: { en: "14 Inch Besi 14", ms: "14 Inch Besi 14" },
    price: 70,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198993/fireworks_400x400/fireworks_400x400/resized_framed_product_24_14_Inch_Besi_14.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076966/HunterBoom/cm3fmggy000050cl2g5esh2a4_fzrrwr.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 926,
    name: { en: "18 Inch Besi 18", ms: "18 Inch Besi 18" },
    price: 90,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198967/fireworks_400x400/fireworks_400x400/resized_framed_product_25_18_Inch_Besi_18.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076978/HunterBoom/cm3fmin2800060cl27xtic2ae_rhxy2g.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 927,
    name: { en: "Magic Stick (1 Minute)", ms: "Magic Stick (1 Minute)" },
    price: 10,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199007/fireworks_400x400/fireworks_400x400/resized_framed_Magic_Stick_1_Minute.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076989/HunterBoom/cm3fnyuab00000ckyfbrt8wvf_cvsdwm.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 928,
    name: { en: "15 Kali Magic 15", ms: "15 Kali Magic 15" },
    price: 15,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198975/fireworks_400x400/fireworks_400x400/resized_framed_product_27_15_Kali_Magic_15.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076999/HunterBoom/cm3fo80ko00000cjhdgg929tm_nqqsui.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 929,
    name: { en: "20 Kali Magic 20", ms: "20 Kali Magic 20" },
    price: 20,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199043/fireworks_400x400/fireworks_400x400/resized_framed_product_28_20_Kali_Magic_20.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077010/HunterBoom/cm3foao1000010cl2dwks4ja7_ndcb6a.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 930,
    name: { en: "30 Kali Magic 30", ms: "30 Kali Magic 30" },
    price: 30,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199051/fireworks_400x400/fireworks_400x400/resized_framed_product_29_30_Kali_Magic_30.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077020/HunterBoom/cm3fobsv5000d0cmd1g4p6uer_rx8d89.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 931,
    name: { en: "10 Kali Pili Rain 10", ms: "10 Kali Pili Rain 10" },
    price: 20,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198952/fireworks_400x400/fireworks_400x400/resized_framed_product_30_10_Kali_Pili_Rain_10.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077031/HunterBoom/cm3foin1h000j0cmddfdtaa4z_dlvbtx.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 932,
    name: { en: "388 Shot Machine Gun 388", ms: "388 Shot Machine Gun 388" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198882/fireworks_400x400/fireworks_400x400/resized_framed_388_Shot_Machine_Gun_388.jpg",
    videoUrl: "",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 933,
    name: { en: "888 Shot Machine Gun", ms: "888 Shot Machine Gun" },
    price: 88,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198969/fireworks_400x400/fireworks_400x400/resized_framed_product_32_888_Shot_Machine_Gun_888.jpg",
    videoUrl: "",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 934,
    name: { en: "688 Shot Machine Gun 688", ms: "688 Shot Machine Gun 688" },
    price: 68,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198895/fireworks_400x400/fireworks_400x400/resized_framed_688_Shot_Machine_Gun_688.jpg",
    videoUrl: "",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 935,
    name: { en: "Blue Ocean Machine Gun", ms: "Blue Ocean Machine Gun" },
    price: 90,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199025/fireworks_400x400/fireworks_400x400/resized_framed_product_34_Blue_Ocean_Machine_Gun.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077041/HunterBoom/cm4nyh3v8000c0cjj37ic01jv_dhcjl2.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 936,
    name: { en: "Mancis", ms: "Mancis" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198921/fireworks_400x400/fireworks_400x400/resized_framed_product_35_Mancis.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077051/HunterBoom/cm3h1c4ni00020cjq1xzo6888_mg9lzx.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 937,
    name: { en: "Gasing", ms: "Gasing" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198999/fireworks_400x400/fireworks_400x400/resized_framed_Gasing.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm3h504ye00000cky15mu1caf.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 938,
    name: { en: "Lotus", ms: "Lotus" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198903/fireworks_400x400/fireworks_400x400/resized_framed_product_37_Lotus.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077072/HunterBoom/cm3h53ace00020cmi1mn98djd_udrjjb.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 939,
    name: { en: "Pop Pop", ms: "Pop Pop" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
    videoUrl: "",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 940,
    name: { en: "Pop Pop Besar", ms: "Pop Pop Besar" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198878/fireworks_400x400/fireworks_400x400/resized_framed_product_39_Pop_Pop_Besar.jpg",
    videoUrl: "",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 941,
    name: { en: "Cili Padi", ms: "Cili Padi" },
    price: 5,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198995/fireworks_400x400/fireworks_400x400/resized_framed_product_40_Cili_Padi.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077082/HunterBoom/cm3h5i48h00020cl21q1c1hj3_tvjbrd.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 942,
    name: { en: "Dragon Egg", ms: "Dragon Egg" },
    price: 15,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198971/fireworks_400x400/fireworks_400x400/resized_framed_product_41_Dragon_Egg.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077094/HunterBoom/cm3h5l1ha00040cid2pkh5fg2_b8fvwl.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 943,
    name: { en: "Dragon Egg Besar", ms: "Dragon Egg Besar" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199022/fireworks_400x400/fireworks_400x400/resized_framed_product_42_Dragon_Egg_Besar.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077105/HunterBoom/cm3h5mitf00030ci89ilr128t_spn6ne.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 944,
    name: { en: "Naga 3 Minute", ms: "Naga 3 Minute" },
    price: 20,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199049/fireworks_400x400/fireworks_400x400/resized_framed_product_43_Naga_3_Minute.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077116/HunterBoom/cm3h61r5g00000cl5glngbzr5_qccqp9.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 945,
    name: { en: "Naga 3 Minute Besar", ms: "Naga 3 Minute Besar" },
    price: 30,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198884/fireworks_400x400/fireworks_400x400/resized_framed_product_44_Naga_3_Minute_Besar.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077126/HunterBoom/cm3h6944d00010cl9amkl4vj5_lmvyz7.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 946,
    name: { en: "Mancis Pop Pop", ms: "Mancis Pop Pop" },
    price: 40,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199033/fireworks_400x400/fireworks_400x400/resized_framed_product_45_Mancis_Pop_Pop.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077136/HunterBoom/cm4jh480a00090cl86kxk4e08_ddqqdp.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 947,
    name: { en: "Thunder Clap", ms: "Thunder Clap" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198906/fireworks_400x400/fireworks_400x400/resized_framed_product_46_Thunder_Clap.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077151/HunterBoom/cm3h762d800010cmb8vpi0nz1_pcf2fz.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 948,
    name: { en: "Thunder Clap Besar", ms: "Thunder Clap Besar" },
    price: 55,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198917/fireworks_400x400/fireworks_400x400/resized_framed_product_47_Thunder_Clap_Besar.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077161/HunterBoom/cm3h7a2v200010cl4bh3jbbyu_k6ikmj.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 950,
    name: { en: "Moon Travel", ms: "Moon Travel" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199071/fireworks_400x400/fireworks_400x400/resized_framed_product_49_Moon_Travel.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077183/HunterBoom/cm3h84sp300070cl9h4oie88d_ezcal8.mp4",
    category: "traditional",
    section: "ROCKET SKY SHOW"
  },
  {
    id: 951,
    name: { en: "Jet Flighter", ms: "Jet Flighter" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199102/fireworks_400x400/fireworks_400x400/resized_framed_product_50_Jet_Flighter.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077193/HunterBoom/cm3h899ws00010cjs8ewv7uer_us6uda.mp4",
    category: "traditional",
    section: "ROCKET SKY SHOW"
  },
  {
    id: 952,
    name: { en: "Big Butterfly", ms: "Big Butterfly" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199041/fireworks_400x400/fireworks_400x400/resized_framed_product_51_Big_Butterfly.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077203/HunterBoom/cm3h8b4p200060cl6ccz27jkc_jdfrqz.mp4",
    category: "traditional",
    section: "ROCKET SKY SHOW"
  },
  {
    id: 953,
    name: { en: "50 Shot Tikus 50", ms: "50 Shot Tikus 50" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199017/fireworks_400x400/fireworks_400x400/resized_framed_product_52_50_Shot_Tikus_50.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077213/HunterBoom/cm3h8dbwc00050cl4ez6v0k0n_kzjh8b.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 954,
    name: { en: "100 Shot Tikus 100", ms: "100 Shot Tikus 100" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198912/fireworks_400x400/fireworks_400x400/resized_framed_product_53_100_Shot_Tikus_100.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077224/HunterBoom/cm3h8efm200070cjrbdj7aygl_jpm9tn.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 955,
    name: { en: "100 Shoot Flying Dragon 100", ms: "100 Shoot Flying Dragon 100" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199035/fireworks_400x400/fireworks_400x400/resized_framed_product_54_100_Shoot_Flying_Dragon_100.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077235/HunterBoom/cm3h8pi2e000a0cl95egh7b6x_u4cwcs.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 956,
    name: { en: "Jelly Fish LINK", ms: "Jelly Fish (LINK)" },
    price: 20,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198886/fireworks_400x400/fireworks_400x400/resized_framed_product_55_Jelly_Fish_28LINK29.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077247/HunterBoom/cm3h9lci500050cl00a4f0lo5_c88xv6.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 957,
    name: { en: "Jelly Fish SINGLE", ms: "Jelly Fish (SINGLE)" },
    price: 20,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198997/fireworks_400x400/fireworks_400x400/resized_framed_product_56_Jelly_Fish_28SINGLE29.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077256/HunterBoom/cm3h9h3d100000cl86cku7v81_kiqkl0.mp4",
    category: "traditional",
    section: 'KIDS" FIRECRACKERS'
  },
  {
    id: 958,
    name: { en: "Romantic Fountain Fountain V Fireworks", ms: "Romantic Fountain (Fountain V Fireworks)" },
    price: 40,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198910/fireworks_400x400/fireworks_400x400/resized_framed_product_57_Romantic_Fountain_Fountain_V_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077268/HunterBoom/cm3r0ujr500030cmjew7xet44_hzxgmd.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 959,
    name: { en: "Volcano Fireworks Fountain V Fireworks", ms: "Volcano Fireworks (Fountain V Fireworks)" },
    price: 50,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199115/fireworks_400x400/fireworks_400x400/resized_framed_product_58_Volcano_Fireworks_Fountain_V_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077279/HunterBoom/cm3r1vdh100080cl82g9w37lb_elesoe.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 960,
    name: { en: "Super Flash Rocket", ms: "Super Flash Rocket" },
    price: 75,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198989/fireworks_400x400/fireworks_400x400/resized_framed_Super_Flash_Rocket.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077290/HunterBoom/cm5c2q9uj000803l7h1nt59uk_dvl6n9.mp4",
    category: "traditional",
    section: "ROCKET SKY SHOW"
  },
  {
    id: 961,
    name: { en: "Explosive Gold Rocket", ms: "Explosive Gold Rocket" },
    price: 75,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199037/fireworks_400x400/fireworks_400x400/resized_framed_product_60_Explosive_Gold_Rocket.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077299/HunterBoom/cm5xf09kq000f03l8g60yfqdf_t9camd.mp4",
    category: "traditional",
    section: "ROCKET SKY SHOW"
  },
  {
    id: 962,
    name: { en: "Smoke 5 Color", ms: "Smoke 5 Color" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198992/fireworks_400x400/fireworks_400x400/resized_framed_product_61_Smoke_5_Color.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077311/HunterBoom/cm3fou62o00030cl1fjz21a29_e6fbfx.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 963,
    name: { en: "Pokok Berlesen Fa Cai Shu", ms: "Pokok Berlesen (Fa Cai Shu)" },
    price: 20,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198963/fireworks_400x400/fireworks_400x400/resized_framed_product_62_Pokok_Berlesen_Fa_Cai_Shu.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077321/HunterBoom/cm3fpqma9000f0cl22cvnguto_fskowx.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 964,
    name: { en: "Pokok Berlesen Besar Big Fa Cai Shu", ms: "Pokok Berlesen Besar (Big Fa Cai Shu)" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199009/fireworks_400x400/fireworks_400x400/resized_framed_product_63_Pokok_Berlesen_Besar_Big_Fa_Cai_S.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077333/HunterBoom/cm5cjtbon000403k12i40hb2m_tzhznb.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 965,
    name: { en: "Mini Ice Cream", ms: "Mini Ice Cream" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199099/fireworks_400x400/fireworks_400x400/resized_framed_product_64_Mini_Ice_Cream.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077342/HunterBoom/cm3fq24zv00060cig5djn3muq_arpgns.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 966,
    name: { en: "C026 7 Ice Cream 7", ms: "C026 7 Ice Cream 7" },
    price: 35,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198987/fireworks_400x400/fireworks_400x400/resized_framed_product_65_C_026_7_Ice_Cream_7.jpg",
    videoUrl: "",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 967,
    name: { en: "15 Ice Cream 15", ms: "15 Ice Cream 15" },
    price: 70,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198932/fireworks_400x400/fireworks_400x400/resized_framed_product_66_15_Ice_Cream_15.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077354/HunterBoom/cm3fqtqw800010cl16gec78r2_bbrxru.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 968,
    name: { en: "Peacock TIGA", ms: "Peacock (TIGA)" },
    price: 30,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199111/fireworks_400x400/fireworks_400x400/resized_framed_product_67_Peacock_28TIGA29.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077363/HunterBoom/cm3fqzobs00000cmh9wgh0cmd_ailyot.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 969,
    name: { en: "Peacock LIMA", ms: "Peacock (LIMA)" },
    price: 40,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198934/fireworks_400x400/fireworks_400x400/resized_framed_product_68_Peacock_28LIMA29.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077373/HunterBoom/cm3fr2ch100000cl7bcm5d512_gdhcvp.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 970,
    name: { en: "Tiga Segi Fountain", ms: "Tiga Segi Fountain" },
    price: 30,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199106/fireworks_400x400/fireworks_400x400/resized_framed_product_69_Tiga_Segi_Fountain.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077385/HunterBoom/cm3fsdlf900000cjt8l45gux4_qehixs.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 971,
    name: { en: "Tiga Segi Fountain Besar", ms: "Tiga Segi Fountain Besar" },
    price: 45,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198956/fireworks_400x400/fireworks_400x400/resized_framed_product_70_Tiga_Segi_Fountain_Besar.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077394/HunterBoom/cm4jiqbre00020cmaculigfcc_tir4jp.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 972,
    name: { en: "12 Patten 160 Saat Fountain", ms: "12 Patten 160 Saat Fountain" },
    price: 60,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199083/fireworks_400x400/fireworks_400x400/resized_framed_12_Patten_160_Saat_Fountain.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077404/HunterBoom/cm3fsxxwv00030clc0z503ddc_uokg9s.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 973,
    name: { en: "Colorful Fountain Box (210 Saat)", ms: "Colorful Fountain Box (210 Saat)" },
    price: 70,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198891/fireworks_400x400/fireworks_400x400/resized_framed_product_72_Colorful_Fountain_Box_210_Saa.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077415/HunterBoom/cm3mn2l4b00050cled2iye3sr_wjtw7z.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 974,
    name: { en: "Gasing Fountain", ms: "Gasing Fountain" },
    price: 50,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199097/fireworks_400x400/fireworks_400x400/resized_framed_product_73_Gasing_Fountain.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077426/HunterBoom/cm3ftn73h00000cjnfviaf7ku_a8gi9n.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 975,
    name: { en: "Surprise Fountain", ms: "Surprise Fountain" },
    price: 70,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199020/fireworks_400x400/fireworks_400x400/resized_framed_product_74_Surprise_Fountain.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077435/HunterBoom/cm3m79p9j000r0cmh5jfe2vzm_o76vzf.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 976,
    name: { en: "Happy Go Lucky", ms: "Happy Go Lucky" },
    price: 70,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198899/fireworks_400x400/fireworks_400x400/resized_framed_product_75_Happy_Go_Lucky.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077446/HunterBoom/cm4jiap5w00020cl79c888fe1_fpw885.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 977,
    name: { en: "Golden Harmony", ms: "Golden Harmony" },
    price: 70,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198928/fireworks_400x400/fireworks_400x400/resized_framed_product_76_Golden_Harmony.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077458/HunterBoom/cm5ci9aze000103jtdwub6akf_ybrcs8.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 978,
    name: { en: "Taycan Sparkle", ms: "Taycan Sparkle" },
    price: 70,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198960/fireworks_400x400/fireworks_400x400/resized_framed_product_77_Taycan_Sparkle.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077471/HunterBoom/cm3r0q9o500010cm7f1pu2au0_hnpfw9.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 979,
    name: { en: "Water Fall Sunset", ms: "Water Fall Sunset" },
    price: 50,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199062/fireworks_400x400/fireworks_400x400/resized_framed_product_78_Water_Fall_Sunset.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077482/HunterBoom/cm4jgwftl00020ckwe3z558ku_rw2wk2.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 980,
    name: { en: "Dragon Wand", ms: "Dragon Wand" },
    price: 20,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199093/fireworks_400x400/fireworks_400x400/resized_framed_product_79_Dragon_Wand.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077493/HunterBoom/cm4jgxxi000090ckxc1j497wx_w51ocw.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 981,
    name: { en: "Kipas Fountain", ms: "Kipas Fountain" },
    price: 60,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199001/fireworks_400x400/fireworks_400x400/resized_framed_product_80_Kipas_Fountain.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077503/HunterBoom/cm4jfx1d600000cl7487jh9o3_yozqmj.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 982,
    name: { en: "Magic Fountain", ms: "Magic Fountain" },
    price: 60,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198980/fireworks_400x400/fireworks_400x400/resized_framed_product_81_Magic_Fountain.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077515/HunterBoom/cm4jgx1ub00020cmkeq874t8v_rpmvpp.mp4",
    category: "traditional",
    section: 'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!'
  },
  {
    id: 983,
    name: { en: "Thunder King", ms: "Thunder King" },
    price: 15,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198973/fireworks_400x400/fireworks_400x400/resized_framed_product_82_Thunder_King.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077526/HunterBoom/cm3h9pkw600010claepry79lh_vunny5.mp4",
    category: "traditional",
    section: "ONE SHOT, BIG BLAST!"
  },
  {
    id: 984,
    name: { en: "Banana Kecil (0.8)", ms: "Banana Kecil" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198901/fireworks_400x400/fireworks_400x400/resized_framed_product_83_Banana_Kecil_280.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077535/HunterBoom/cm3hci5r800020cjvenpn6bgx_ldzcog.mp4",
    category: "traditional",
    section: "ONE SHOT, BIG BLAST!"
  },
  {
    id: 985,
    name: { en: "Banana Besar (1.2) (1.2)", ms: "Banana Besar (1.2)" },
    price: 45,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199063/fireworks_400x400/fireworks_400x400/resized_framed_product_84_Banana_Besar_281.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077545/HunterBoom/cm3hcly4100000clee9ix79ap_noe5jk.mp4",
    category: "traditional",
    section: "ONE SHOT, BIG BLAST!"
  },
  {
    id: 986,
    name: { en: "Double Shoot Banana Besar (1.75) 1.75", ms: "Double Shoot Banana Besar (1.75)" },
    price: 75,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199108/fireworks_400x400/fireworks_400x400/resized_framed_product_85_Double_Shoot_Banana_Besar_281.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077556/HunterBoom/cm3hcptvc00030cjwacdy2wid_ize2rw.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 987,
    name: { en: "Dragon Ball (1.75) 1.75", ms: "Dragon Ball (1.75) 1.75" },
    price: 50,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198914/fireworks_400x400/fireworks_400x400/resized_framed_product_86_Dragon_Ball_281.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077567/HunterBoom/cm3r0mzzo000h0cjpcs6sgax5_ox6hqc.mp4",
    category: "traditional",
    section: "ONE SHOT, BIG BLAST!"
  },
  {
    id: 988,
    name: { en: "8 Shoot Roma Candle 0.8", ms: "8 Shoot Roma Candle (0.8)" },
    price: 45,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199013/fireworks_400x400/fireworks_400x400/resized_framed_product_87_8_Shoot_Roma_Candle_280.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077577/HunterBoom/cm3hcscy400070cle9y0fc0qv_n2ni5r.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 989,
    name: { en: "4 25 Shoot Cake 4", ms: "4 25 Shoot Cake 4" },
    price: 25,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199046/fireworks_400x400/fireworks_400x400/resized_framed_product_88_4_25_Shoot_Cake_4_25.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077588/HunterBoom/cm4shf52l000703mteyab9izo_tpvhu7.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 990,
    name: { en: "4 36 Shoot Cake 4", ms: "4 36 Shoot Cake 4" },
    price: 36,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198942/fireworks_400x400/fireworks_400x400/resized_framed_product_89_4_36_Shoot_Cake_4_36.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077598/HunterBoom/cm4shhj0r000003mdfbe23njd_ukabrl.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 991,
    name: { en: "4 49 Shoot Cake (ABCD) 4", ms: "4 49 Shoot Cake (ABCD) 4" },
    price: 49,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198982/fireworks_400x400/fireworks_400x400/resized_framed_product_90_4_49_Shoot_Cake_28ABCD29_4_49.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077608/HunterBoom/cm4shhzku000903mt4o59h96b_es7x0u.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 992,
    name: { en: "Special Fireworks #92", ms: "Special Fireworks #92" },
    price: 50,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198882/fireworks_400x400/fireworks_400x400/resized_framed_388_Shot_Machine_Gun_388.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4shk2s0000g03ju9jme3n1g.mp4",
    category: "traditional",
    section: "FOUNTAIN BLAST"
  },
  {
    id: 993,
    name: { en: "4138 Shoot Cake", ms: "4138 Shoot Cake" },
    price: 120,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199054/fireworks_400x400/fireworks_400x400/resized_framed_product_92_4138_Shoot_Cake.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077630/HunterBoom/cm4jy49dl00120cky70snaevx_esxtka.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 994,
    name: { en: "5138 Shoot Cake (Single Abcd) 5", ms: "5138 Shoot Cake (Single Abcd) 5" },
    price: 150,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199079/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_Single_Abcd_5.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4shko51000i03ju5o9q795y.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 995,
    name: { en: "5414 Shoot Cake (ABC) (Straight V Shape) Bb51", ms: "5414 Shoot Cake (ABC) (Straight V Shape) Bb51" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198989/fireworks_400x400/fireworks_400x400/resized_framed_Super_Flash_Rocket.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4ii2fc9000c0cjsdadg2xrk.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 996,
    name: { en: "5414 Shoot Cake (ABC) (Straight V Shape) Bb51", ms: "5414 Shoot Cake (ABC) (Straight V Shape) Bb51" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199083/fireworks_400x400/fireworks_400x400/resized_framed_12_Patten_160_Saat_Fountain.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4ii399k00000clg655khz7o.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 997,
    name: { en: "5138 Shoot Cake (ABC) (V Shape) Bb5138 C", ms: "5138 Shoot Cake (ABC) (V Shape) Bb5138 C" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199039/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_ABC_V_Shape_Bb5138_C.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4ii591600000ci33jtohs4d.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 998,
    name: { en: "5138 Shoot Cake (ABC) (V Shape) Bb5138 D", ms: "5138 Shoot Cake (ABC) (V Shape) Bb5138 D" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198983/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_ABC_V_Shape_Bb5138_D.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4ii5qox00000cjx6adr5uf7.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 999,
    name: { en: "5414 Shoot Cake Thor (V Shape) 5414", ms: "5414 Shoot Cake Thor (V Shape) 5414" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199101/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Thor_V_Shape_5414.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm3m7ak5r000g0ckwaav6fnq0.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1e3,
    name: { en: "5414 Shoot Cake Thanos (V Shape) 5414", ms: "5414 Shoot Cake Thanos (V Shape) 5414" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198936/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Thanos_V_Shape_5414.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm3m7a56r000g0cmgc2qa7l1w.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1001,
    name: { en: "5414 Shoot Cake Rule The Universe 5414", ms: "5414 Shoot Cake Rule The Universe 5414" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198950/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Rule_The_Universe_5414.jpg",
    videoUrl: "",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1002,
    name: { en: "5552 Shoot Cake Four Symbols Mini (V Shape) 5", ms: "5552 Shoot Cake Four Symbols Mini (V Shape) 5" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198897/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Four_Symbols_Mini_V_Shape_5.jpg",
    videoUrl: "",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1003,
    name: { en: "5552 Shoot Cake Xiong He Xin Xi (Straight V S", ms: "5552 Shoot Cake Xiong He Xin Xi (Straight V S" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199011/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Xiong_He_Xin_Xi_Straight_V_S.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4queryp000403mkeyk73q6o.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1004,
    name: { en: "5552 Shoot Cake Fu Shou An Kang (V Shape) 555", ms: "5552 Shoot Cake Fu Shou An Kang (V Shape) 555" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198940/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Fu_Shou_An_Kang_V_Shape_555.jpg",
    videoUrl: "",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1005,
    name: { en: "8138 Shoot Cake", ms: "8138 Shoot Cake" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199068/fireworks_400x400/fireworks_400x400/resized_framed_product_104_8138_Shoot_Cake.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077728/HunterBoom/cm4jivsef00010cl21ztbbh6b_g6udgn.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1006,
    name: { en: "7276 Shoot Milan Night (Straight V Shape) 727", ms: "7276 Shoot Milan Night (Straight V Shape) 727" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199055/fireworks_400x400/fireworks_400x400/resized_framed_7276_Shoot_Milan_Night_Straight_V_Shape_727.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm5dl1fcx000303jgai1h7hgw.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1007,
    name: { en: "6414 Shoot Cake I Am The Only One (V Shape) 6", ms: "6414 Shoot Cake I Am The Only One (V Shape) 6" },
    price: 650,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199065/fireworks_400x400/fireworks_400x400/resized_framed_6414_Shoot_Cake_I_Am_The_Only_One_V_Shape_6.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm3r0gjys00000djkaama012h.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1008,
    name: { en: "9138 Shoot Cake", ms: "9138 Shoot Cake" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199016/fireworks_400x400/fireworks_400x400/resized_framed_product_117_9138_Shoot_Cake.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077868/HunterBoom/cm598lsfi000003l55pwdcx4b_j0398m.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1009,
    name: { en: "8036 Shoot Sound King 836", ms: "8036 Shoot Sound King 836" },
    price: 150,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199005/fireworks_400x400/fireworks_400x400/resized_framed_8036_Shoot_Sound_King_836.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4qrpog900010cl08qqi6byz.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1010,
    name: { en: "9138 Shoot Cake Fu Lu Shou (Straight V Shape", ms: "9138 Shoot Cake Fu Lu Shou (Straight V Shape" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198944/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Fu_Lu_Shou_Straight_V_Shape.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4kyn2zf00000cl6evyfasc7.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1011,
    name: { en: "9414 Shoot Cake Fu Lu Shou Straight V Shape 9414", ms: "9414 Shoot Cake Fu Lu Shou (Straight V Shape)" },
    price: 800,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198908/fireworks_400x400/fireworks_400x400/resized_framed_9414_Shoot_Cake_Fu_Lu_Shou_Straight_V_Shape_9414.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4kynjnt00050cjo9a2xc10a.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1012,
    name: { en: "9138 Shoot Cake God For Wealth (Straight V S", ms: "9138 Shoot Cake God For Wealth (Straight V S" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198985/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_God_For_Wealth_Straight_V_S.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4krsuma00000cl42y8x7x95.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1013,
    name: { en: "9552 Shoot Cake God For Wealth (Straight V Sh", ms: "9552 Shoot Cake God For Wealth (Straight V Sh" },
    price: 900,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199031/fireworks_400x400/fireworks_400x400/resized_framed_9552_Shoot_Cake_God_For_Wealth_Straight_V_Sh.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4krs82800040cme2rrdeu89.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1014,
    name: { en: "9138 Shoot Cake Fortune Four 9", ms: "9138 Shoot Cake Fortune Four 9" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199073/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Fortune_Four_9.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm3r2lnw200060cla8ua8d5er.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1015,
    name: { en: "9552 Shoot Cake Fortune Four 9", ms: "9552 Shoot Cake Fortune Four 9" },
    price: 900,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199069/fireworks_400x400/fireworks_400x400/resized_framed_9552_Shoot_Cake_Fortune_Four_9.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm3r2lnw200060cla8ua8d5er.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1016,
    name: { en: "9138 Shoot Cake Zhong Lu Chai Shen 9138", ms: "9138 Shoot Cake Zhong Lu Chai Shen 9138" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199095/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Zhong_Lu_Chai_Shen_9138.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm598y327000003l380dw0qhh.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1017,
    name: { en: "949 Shoot Cake", ms: "949 Shoot Cake" },
    price: 200,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198954/fireworks_400x400/fireworks_400x400/resized_framed_product_116_949_Shoot_Cake.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077856/HunterBoom/cm597rqi4000u03mqe0ml5xhk_qmk1ha.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1018,
    name: { en: "9138 Shoot Cake", ms: "9138 Shoot Cake" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199016/fireworks_400x400/fireworks_400x400/resized_framed_product_117_9138_Shoot_Cake.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077868/HunterBoom/cm598lsfi000003l55pwdcx4b_j0398m.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1019,
    name: { en: "5276 Shoot Cake Classic (V Shape) 5276", ms: "5276 Shoot Cake Classic (V Shape) 5276" },
    price: 400,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198965/fireworks_400x400/fireworks_400x400/resized_framed_5276_Shoot_Cake_Classic_V_Shape_5276.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4la2rms00130cl71m8b1hdf.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1020,
    name: { en: "Pre- Orderb912 9138 Shoot Cake (1.2) 9138", ms: "Pre- Orderb912 9138 Shoot Cake (1.2) 9138" },
    price: 500,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198926/fireworks_400x400/fireworks_400x400/resized_framed_product_119_Pre_Orderb_912_9138_Shoot_Ca.jpg",
    videoUrl: "",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1021,
    name: { en: "9276 Shoot Cake Golden Win (V Shape Gold) 9", ms: "9276 Shoot Cake Golden Win (V Shape Gold) 9" },
    price: 400,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198888/fireworks_400x400/fireworks_400x400/resized_framed_9276_Shoot_Cake_Golden_Win_V_Shape_Gold_9.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm5cj5yoc000803js4xadhqd4.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1022,
    name: { en: "9138 Shoot Cake Hong Yun Dang Tounbsp 9138", ms: "9138 Shoot Cake Hong Yun Dang Tounbsp 9138" },
    price: 450,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198904/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Hong_Yun_Dang_Tounbsp_9138.jpg",
    videoUrl: "https://storage.googleapis.com/takeapp/media/cm4ktocdv00000cl84989dzmo.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1023,
    name: { en: "Pre- Orderb902 9138 Shoot Cake Xin Xiang Shi Cheng", ms: "Pre- Orderb902 9138 Shoot Cake Xin Xiang Shi Cheng" },
    price: 500,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199027/fireworks_400x400/fireworks_400x400/resized_framed_product_122_Pre_Orderb_902_9138_Shoot_Ca.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077911/HunterBoom/cm599gv4o000303js31vc38od_xjq54k.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1024,
    name: { en: "Pre- Orderb903 9138 Shoot Cake Huang Jin Man Wu 91", ms: "Pre- Orderb903 9138 Shoot Cake Huang Jin Man Wu 91" },
    price: 500,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199104/fireworks_400x400/fireworks_400x400/resized_framed_product_123_Pre_Orderb_903_9138_Shoot_Ca.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077922/HunterBoom/cm4ktontw00050clabnkqag8q_e34tqy.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1025,
    name: { en: '5" 138 Shoot Cake 天地无双 Unparalleled', ms: '5" 138 Shoot Cake 天地无双 Unparalleled' },
    price: 450,
    image: "https://hunterboom.com/wp-content/uploads/2024/11/Website-product-photos-73.jpg",
    videoUrl: "https://www.youtube.com/embed/9cyQy8KjbqE",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1026,
    name: { en: '7" 138 Shoot Cake Fast & Furious', ms: '7" 138 Shoot Cake Fast & Furious' },
    price: 350,
    image: "https://hunterboom.com/wp-content/uploads/2024/11/7138-SHOOT-CAKE-A-74.jpg",
    videoUrl: "https://www.youtube.com/embed/BwSb6Yi9-go",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1027,
    name: { en: '8" 49 Shoot Cake 八面玲珑 Eight-Sided', ms: '8" 49 Shoot Cake 八面玲珑 Eight-Sided' },
    price: 250,
    image: "https://hunterboom.com/wp-content/uploads/2024/11/8寸49发盆花-八面玲珑-849-SHOOT-CAKE.jpg",
    videoUrl: "https://www.youtube.com/embed/-0-ADwhfGwY",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1028,
    name: { en: '9" 138 Shoot Cake 诸葛亮 Zhuge Liang', ms: '9" 138 Shoot Cake 诸葛亮 Zhuge Liang' },
    price: 450,
    image: "https://hunterboom.com/wp-content/uploads/2024/11/9寸138发盆花G-诸葛亮-9138-SHOOT-CAKE-G.jpg",
    videoUrl: "https://www.youtube.com/embed/EhloGEN5uRk",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1029,
    name: { en: "DS 5-276V MILAN NIGHT (combine2in1)", ms: "DS 5-276V MILAN NIGHT (combine2in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258170/mci_product/mci_product/mci_1_No184_184_DS_5-276V_MILAN_NIGHT_combine2.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305553/mci_product/mci_video_row_1.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1030,
    name: { en: "DS 5-414V SHI HOU DI DONG (combine3in1) Pyro", ms: "DS 5-414V SHI HOU DI DONG (combine3in1) Pyro" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258172/mci_product/mci_product/mci_2_No185_185_DS_5-414V_SHI_HOU_DI_DONG_comb.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305597/mci_product/mci_video_row_2.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1031,
    name: { en: "DS 5-414V LONG TENG SHENG SHI (combine3in1)", ms: "DS 5-414V LONG TENG SHENG SHI (combine3in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258175/mci_product/mci_product/mci_3_No186_186_DS_5-414V_LONG_TENG_SHENG_SHI_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305641/mci_product/mci_video_row_3.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1032,
    name: { en: "DS 6-552V (combine4in1)", ms: "DS 6-552V (combine4in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258177/mci_product/mci_product/mci_4_No187_187_DS_6-552V_combine4in1__DS_6-55.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305665/mci_product/mci_video_row_4.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1033,
    name: { en: "DS 9-138V CAI YUAN GUN GUN", ms: "DS 9-138V CAI YUAN GUN GUN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258179/mci_product/mci_product/mci_5_No188_188_DS_9-138V_CAI_YUAN_GUN_GUN__DS.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305706/mci_product/mci_video_row_5.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1034,
    name: { en: "DS 1.5-88 YUE LONG MEN", ms: "DS 1.5-88 YUE LONG MEN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258181/mci_product/mci_product/mci_6_No189_189_DS_15-88_YUE_LONG_MEN__DS_15-8.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305764/mci_product/mci_video_row_6.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1035,
    name: { en: "DS 1.5-138 JU CAI QI", ms: "DS 1.5-138 JU CAI QI" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258184/mci_product/mci_product/mci_7_No190_190_DS_15-138_JU_CAI_QI__DS_15-138.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753332710/mci_product/mci_video_row_7_ju_cai_qi_compressed.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1036,
    name: { en: "TP 5-276V SHI WAI TAO YUAN (combine2in1)", ms: "TP 5-276V SHI WAI TAO YUAN (combine2in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258186/mci_product/mci_product/mci_8_TL-001_173_TP_5-276V_SHI_WAI_TAO_YUAN_co.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331110/mci_product/mci_video_row_8_new.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1037,
    name: { en: "TP 6-25 FENG WU JIU TIAN", ms: "TP 6-25 FENG WU JIU TIAN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258189/mci_product/mci_product/mci_9_TL-002_174_TP_6-25_FENG_WU_JIU_TIAN__TP_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305881/mci_product/mci_video_row_9.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1038,
    name: { en: "TP 6-36 YONG PAN GAO FENG", ms: "TP 6-36 YONG PAN GAO FENG" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258192/mci_product/mci_product/mci_10_TL-003_175_TP_6-36_YONG_PAN_GAO_FENG__TP.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305895/mci_product/mci_video_row_10.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1039,
    name: { en: "TP 7-25 JIN QI LIN", ms: "TP 7-25 JIN QI LIN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258195/mci_product/mci_product/mci_11_TL-004_176_TP_7-25_JIN_QI_LIN__TP_7-25_%E9%87%91.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305903/mci_product/mci_video_row_11.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1040,
    name: { en: "TP 7-36 XING CHEN DA HAI", ms: "TP 7-36 XING CHEN DA HAI" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258197/mci_product/mci_product/mci_12_TL-005_177_TP_7-36_XING_CHEN_DA_HAI__TP_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305915/mci_product/mci_video_row_12.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1041,
    name: { en: "TP 7-49 FU LU SHUANG QUAN", ms: "TP 7-49 FU LU SHUANG QUAN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258200/mci_product/mci_product/mci_13_TL-006_178_TP_7-49_FU_LU_SHUANG_QUAN__TP.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305924/mci_product/mci_video_row_13.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1042,
    name: { en: "TP 7-138V MA DAO CHENG GONG", ms: "TP 7-138V MA DAO CHENG GONG" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258203/mci_product/mci_product/mci_14_TL-007_179_TP_7-138V_MA_DAO_CHENG_GONG__.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305932/mci_product/mci_video_row_14.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1043,
    name: { en: "TP 9-138V XING HE CUI CAN", ms: "TP 9-138V XING HE CUI CAN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258206/mci_product/mci_product/mci_15_TL-008_180_TP_9-138V_XING_HE_CUI_CAN__TP.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305945/mci_product/mci_video_row_15.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1044,
    name: { en: "TP 9-138V HUA KAI FU GUI", ms: "TP 9-138V HUA KAI FU GUI" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258209/mci_product/mci_product/mci_16_TL-009_181_TP_9-138V_HUA_KAI_FU_GUI__TP_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305955/mci_product/mci_video_row_16.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1045,
    name: { en: "TP 9-138V CHEN FENG PO LANG", ms: "TP 9-138V CHEN FENG PO LANG" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258211/mci_product/mci_product/mci_17_TL-010_182_TP_9-138V_CHEN_FENG_PO_LANG__.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305967/mci_product/mci_video_row_17.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1046,
    name: { en: "TP 10-138V YIN HE ZHI LIAN", ms: "TP 10-138V YIN HE ZHI LIAN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258214/mci_product/mci_product/mci_18_TL-011_183_TP_10-138V_YIN_HE_ZHI_LIAN__T.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305977/mci_product/mci_video_row_18.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1047,
    name: { en: "TL 5-276V JI QING YOU YU (combine2in1)", ms: "TL 5-276V JI QING YOU YU (combine2in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258216/mci_product/mci_product/mci_19_FD-001_161_TL_5-276V_JI_QING_YOU_YU_comb.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305991/mci_product/mci_video_row_19.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1048,
    name: { en: "TL 6-552V YING CHUN JIE FU (combine4in1)", ms: "TL 6-552V YING CHUN JIE FU (combine4in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258219/mci_product/mci_product/mci_20_FD-002_162_TL_6-552V_YING_CHUN_JIE_FU_co.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306008/mci_product/mci_video_row_20.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1049,
    name: { en: "TL 8-138V GONG HE XIN XI", ms: "TL 8-138V GONG HE XIN XI" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258225/mci_product/mci_product/mci_21_FD-003_163_TL_8-138V_GONG_HE_XIN_XI__TL_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306043/mci_product/mci_video_row_21.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1050,
    name: { en: "TL 9-138V XIANG YUN RUI CAI", ms: "TL 9-138V XIANG YUN RUI CAI" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258228/mci_product/mci_product/mci_22_FD-004_164_TL_9-138V_XIANG_YUN_RUI_CAI__.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306085/mci_product/mci_video_row_22.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1051,
    name: { en: "TL 9-138V JI XING GAO ZHAO", ms: "TL 9-138V JI XING GAO ZHAO" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258231/mci_product/mci_product/mci_23_FD-005_165_TL_9-138V_JI_XING_GAO_ZHAO__T.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306120/mci_product/mci_video_row_23.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1052,
    name: { en: "TL 9-138V RUI QI YING MEN", ms: "TL 9-138V RUI QI YING MEN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258234/mci_product/mci_product/mci_24_FD-006_166_TL_9-138V_RUI_QI_YING_MEN__TL.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306142/mci_product/mci_video_row_24.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1053,
    name: { en: "TL 9-138V FENG WEI FEI TIAN", ms: "TL 9-138V FENG WEI FEI TIAN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258237/mci_product/mci_product/mci_25_FD-007_167_TL_9-138V_FENG_WEI_FEI_TIAN__.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306163/mci_product/mci_video_row_25.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1054,
    name: { en: "TL 9-138V LONG FENG CHENG XIANG", ms: "TL 9-138V LONG FENG CHENG XIANG" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258241/mci_product/mci_product/mci_26_FD-008_168_TL_9-138V_LONG_FENG_CHENG_XIA.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306180/mci_product/mci_video_row_26.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1055,
    name: { en: "TL 9-138V MEI LUN MEI HUAN", ms: "TL 9-138V MEI LUN MEI HUAN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258244/mci_product/mci_product/mci_27_FD-009_169_TL_9-138V_MEI_LUN_MEI_HUAN__T.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306196/mci_product/mci_video_row_27.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1056,
    name: { en: "TL 9-138V HUA TUAN JIN CU", ms: "TL 9-138V HUA TUAN JIN CU" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258247/mci_product/mci_product/mci_28_FD-010_170_TL_9-138V_HUA_TUAN_JIN_CU__TL.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306213/mci_product/mci_video_row_28.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1057,
    name: { en: "TL 9-276V TIAN MA XING KONG (combine2in1)", ms: "TL 9-276V TIAN MA XING KONG (combine2in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258250/mci_product/mci_product/mci_29_FD-011_171_TL_9-276V_TIAN_MA_XING_KONG_c.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306233/mci_product/mci_video_row_29.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1058,
    name: { en: "TL 10-49 FENG CAI JU BAO - Special", ms: "TL 10-49 FENG CAI JU BAO - Special" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258253/mci_product/mci_product/mci_30_FD-012_172_TL_10-49_FENG_CAI_JU_BAO_-_Sp.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306255/mci_product/mci_video_row_30.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1059,
    name: { en: "FD 5-187V DA YING JIA (combine2in1)", ms: "FD 5-187V DA YING JIA (combine2in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258256/mci_product/mci_product/mci_31_HP-001_146_FD_5-187V_DA_YING_JIA_combine.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306292/mci_product/mci_video_row_31.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1060,
    name: { en: "FD 5-276V FU DAO CAI DAO (combine2in1)", ms: "FD 5-276V FU DAO CAI DAO (combine2in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258258/mci_product/mci_product/mci_32_HP-002_147_FD_5-276V_FU_DAO_CAI_DAO_comb.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306360/mci_product/mci_video_row_32.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1061,
    name: { en: "FD 5-414V CAI FU SHI JIA (combine3in1)", ms: "FD 5-414V CAI FU SHI JIA (combine3in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258260/mci_product/mci_product/mci_33_HP-003_148_FD_5-414V_CAI_FU_SHI_JIA_comb.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306433/mci_product/mci_video_row_33.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1062,
    name: { en: "FD 6-552V ZHAO CAI JIN BAO (combine4in1) | FD 6-552V 招财进宝 (4连线)", ms: "FD 6-552V ZHAO CAI JIN BAO (combine4in1) | FD 6-552V 招财进宝 (4连线)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258262/mci_product/mci_product/mci_34_HP-004_149_FD_6-552V_ZHAO_CAI_JIN_BAO_co.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306529/mci_product/mci_video_row_34.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1063,
    name: { en: "FD 9-138 TU HAO JIN", ms: "FD 9-138 TU HAO JIN" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258264/mci_product/mci_product/mci_35_HP-005_150_FD_9-138_TU_HAO_JIN__FD_9-138.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306635/mci_product/mci_video_row_35.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1064,
    name: { en: "FD 9-187V DA JI DA LI (combine2box in1)", ms: "FD 9-187V DA JI DA LI (combine2box in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258267/mci_product/mci_product/mci_36_HP-006_151_FD_9-187V_DA_JI_DA_LI_combine.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306684/mci_product/mci_video_row_36.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1065,
    name: { en: "FD 10-25 TIAN LANG (Wolf)", ms: "FD 10-25 TIAN LANG (Wolf)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258269/mci_product/mci_product/mci_37_HP-007_152_FD_10-25_TIAN_LANG_Wolf__FD_1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306717/mci_product/mci_video_row_37.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1066,
    name: { en: "FD 10-36 BEN LANG (Wolf)", ms: "FD 10-36 BEN LANG (Wolf)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258271/mci_product/mci_product/mci_38_HP-008_153_FD_10-36_BEN_LANG_Wolf__FD_10.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306733/mci_product/mci_video_row_38.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1067,
    name: { en: "FD 10-49 LANG HAO (Wolf)", ms: "FD 10-49 LANG HAO (Wolf)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258274/mci_product/mci_product/mci_39_HP-009_154_FD_10-49_LANG_HAO_Wolf__FD_10.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306753/mci_product/mci_video_row_39.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1068,
    name: { en: "FD 10-138 LANG WANG (Wolf)", ms: "FD 10-138 LANG WANG (Wolf)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258277/mci_product/mci_product/mci_40_HP-010_155_FD_10-138_LANG_WANG_Wolf__FD_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306795/mci_product/mci_video_row_40.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1069,
    name: { en: "FD 15-36 MA DAO CHENG GONG (2.0) | FD 15-36 马到成功 (2.0)", ms: "FD 15-36 MA DAO CHENG GONG (2.0) | FD 15-36 马到成功 (2.0)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258283/mci_product/mci_product/mci_41_HP-011_156_FD_15-36_MA_DAO_CHENG_GONG_20.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306843/mci_product/mci_video_row_41.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1070,
    name: { en: "FD 15-49 DING FENG XIANG JIAN (2.0)", ms: "FD 15-49 DING FENG XIANG JIAN (2.0)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258285/mci_product/mci_product/mci_42_HP-012_157_FD_15-49_DING_FENG_XIANG_JIAN.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306883/mci_product/mci_video_row_42.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1071,
    name: { en: "FD 15-187V HAO MEN SHENG YAN (combine2box in1)", ms: "FD 15-187V HAO MEN SHENG YAN (combine2box in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258365/mci_product/mci_product/mci_43_HP-013_158_FD_15-187V_HAO_MEN_SHENG_YAN_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306930/mci_product/mci_video_row_43.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1072,
    name: { en: "FD 1.5-88 HUANG JIN WAN LIANG", ms: "FD 1.5-88 HUANG JIN WAN LIANG" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258368/mci_product/mci_product/mci_44_HP-014_159_FD_15-88_HUANG_JIN_WAN_LIANG_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306970/mci_product/mci_video_row_44.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1073,
    name: { en: "FD 1.5-138 YI WAN FU WENG", ms: "FD 1.5-138 YI WAN FU WENG" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258370/mci_product/mci_product/mci_45_HP-015_160_FD_15-138_YI_WAN_FU_WENG__FD_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307002/mci_product/mci_video_row_45.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1074,
    name: { en: "HAPPY 9-276 HE TIAN XIA (combine2box in1)", ms: "HAPPY 9-276 HE TIAN XIA (combine2box in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258372/mci_product/mci_product/mci_46_FW-001_137_HAPPY_9-276_HE_TIAN_XIA_combi.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307087/mci_product/mci_video_row_46.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1075,
    name: { en: "HAPPY 10-98 HUAN LE XUAN CAI (combine2in1)", ms: "HAPPY 10-98 HUAN LE XUAN CAI (combine2in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258375/mci_product/mci_product/mci_47_FW-002_138_HAPPY_10-98_HUAN_LE_XUAN_CAI_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307145/mci_product/mci_video_row_47.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1076,
    name: { en: "HAPPY 10-138 HUAN LE YAN YU", ms: "HAPPY 10-138 HUAN LE YAN YU" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258377/mci_product/mci_product/mci_48_FW-003_139_HAPPY_10-138_HUAN_LE_YAN_YU__.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307174/mci_product/mci_video_row_48.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1077,
    name: { en: "HAPPY 10-138V HUAN LE ZUI MEI", ms: "HAPPY 10-138V HUAN LE ZUI MEI" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258380/mci_product/mci_product/mci_49_FW-004_140_HAPPY_10-138V_HUAN_LE_ZUI_MEI.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307210/mci_product/mci_video_row_49.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1078,
    name: { en: "HAPPY 10-138V HUAN LE WAN JIA", ms: "HAPPY 10-138V HUAN LE WAN JIA" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258382/mci_product/mci_product/mci_50_FW-005_141_HAPPY_10-138V_HUAN_LE_WAN_JIA.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307243/mci_product/mci_video_row_50.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1079,
    name: { en: "HAPPY 11-276 DING JI FU HAO (combine2box in1)", ms: "HAPPY 11-276 DING JI FU HAO (combine2box in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258385/mci_product/mci_product/mci_51_FW-006_142_HAPPY_11-276_DING_JI_FU_HAO_c.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307294/mci_product/mci_video_row_51.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1080,
    name: { en: "HAPPY 11-414 HUAN LE ZHI ZUN (combine3box in1)", ms: "HAPPY 11-414 HUAN LE ZHI ZUN (combine3box in1)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258391/mci_product/mci_product/mci_52_FW-007_143_HAPPY_11-414_HUAN_LE_ZHI_ZUN_.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328702/mci_product/mci_video_row_52.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1081,
    name: { en: "HAPPY 12-49 HUA MAN LOU | HAPPY 12-49 花满楼", ms: "HAPPY 12-49 HUA MAN LOU | HAPPY 12-49 花满楼" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258395/mci_product/mci_product/mci_53_FW-008_144_HAPPY_12-49_HUA_MAN_LOU_%C2%A0HAPP.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328774/mci_product/mci_video_row_53.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1082,
    name: { en: "HAPPY 12-138 DA SHI JIE", ms: "HAPPY 12-138 DA SHI JIE" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258397/mci_product/mci_product/mci_54_FW-009_145_HAPPY_12-138_DA_SHI_JIE__HAPP.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328868/mci_product/mci_video_row_54.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1083,
    name: { en: "4&quot;16 Shoot Cake", ms: "4&quot;16 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258399/mci_product/mci_product/mci_55_MF-001_123_4quot16_Shoot_Cake__4%E5%AF%B8%E9%AB%9816%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328919/mci_product/mci_video_row_55.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1084,
    name: { en: "4&quot;25 Shoot Cake", ms: "4&quot;25 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258402/mci_product/mci_product/mci_56_MF-002_124_4quot25_Shoot_Cake__4%E5%AF%B8%E9%AB%9825%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328949/mci_product/mci_video_row_56.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1085,
    name: { en: "4&quot;36 Shoot Cake", ms: "4&quot;36 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258405/mci_product/mci_product/mci_57_MF-003_125_4quot36_Shoot_Cake__4%E5%AF%B8%E9%AB%9836%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328967/mci_product/mci_video_row_57.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1086,
    name: { en: "4&quot;49 Shoot Cake", ms: "4&quot;49 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258408/mci_product/mci_product/mci_58_MF-004_126_4quot49_Shoot_Cake__4%E5%AF%B8%E9%AB%9849%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328985/mci_product/mci_video_row_58.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1087,
    name: { en: "4&quot;88 Shoot Cake", ms: "4&quot;88 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258410/mci_product/mci_product/mci_59_MF-005_127_4quot88_Shoot_Cake__4%E5%AF%B8%E9%AB%9888%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329017/mci_product/mci_video_row_59.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1088,
    name: { en: "4&quot;138 Shoot Cake", ms: "4&quot;138 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258412/mci_product/mci_product/mci_60_MF-006_128_4quot138_Shoot_Cake__4%E5%AF%B8%E9%AB%98138%E5%8F%91%E7%9B%86.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329063/mci_product/mci_video_row_60.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1089,
    name: { en: "8&quot;49 Shoot Cake", ms: "8&quot;49 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258418/mci_product/mci_product/mci_61_MF-007_129_8quot49_Shoot_Cake__8%E5%AF%B8%E9%AB%9849%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329093/mci_product/mci_video_row_61.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1090,
    name: { en: "8&quot;138 Shoot Cake", ms: "8&quot;138 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258422/mci_product/mci_product/mci_62_MF-008_130_8quot138_Shoot_Cake__8%E5%AF%B8%E9%AB%98138%E5%8F%91%E7%9B%86.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329502/mci_product/mci_video_row_62.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1091,
    name: { en: "9&quot;88 Shoot Cake", ms: "9&quot;88 Shoot Cake" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258425/mci_product/mci_product/mci_63_MF-009_131_9quot88_Shoot_Cake__9%E5%AF%B8%E9%AB%9888%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329547/mci_product/mci_video_row_63.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1092,
    name: { en: "9&quot;138 Shoot Cake Box", ms: "9&quot;138 Shoot Cake Box" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258429/mci_product/mci_product/mci_64_MF-010_132_9quot138_Shoot_Cake_Box__9%E5%AF%B8%E9%AB%981.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329620/mci_product/mci_video_row_64.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1093,
    name: { en: "4&quot;138 Shoot Cake (3 type)", ms: "4&quot;138 Shoot Cake (3 type)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258431/mci_product/mci_product/mci_65_MF-011_133_4quot138_Shoot_Cake_3_type__4.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329686/mci_product/mci_video_row_65.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1094,
    name: { en: "4&quot;138 Shoot Cake (V Shape）box - 4138V  | 4寸高138发彩盒装 异形盆花", ms: "4&quot;138 Shoot Cake (V Shape）box - 4138V  | 4寸高138发彩盒装 异形盆花" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258434/mci_product/mci_product/mci_66_MF-012_134%C2%A04quot138%C2%A0Shoot_Cake_V_Shapebo.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329796/mci_product/mci_video_row_66.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1095,
    name: { en: "5&quot;138 Shoot Cake (V Shape) Box - 5138V", ms: "5&quot;138 Shoot Cake (V Shape) Box - 5138V" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258436/mci_product/mci_product/mci_67_MF-013_135_5quot138_Shoot_Cake_V_Shape_B.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331743/mci_product/mci_video_row_67_final.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  },
  {
    id: 1096,
    name: { en: "9&quot;25 Shoot Cake-Daylight Smoke Fireworks(4Colours)", ms: "9&quot;25 Shoot Cake-Daylight Smoke Fireworks(4Colours)" },
    price: 600,
    image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258439/mci_product/mci_product/mci_68_MF-014_136_9quot25_Shoot_Cake-Daylight_S.jpg",
    videoUrl: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331776/mci_product/mci_video_row_68_final.mp4",
    category: "traditional",
    section: "MERDEKA FIREWORKS"
  }
];
const sections = [
  "POP-POP",
  "ROCKET SKY SHOW",
  "RED DRAGON FIRECRACKERS",
  'SPARKLE & SHINE - KIDS" FAVORITE FIREWORKS!',
  'KIDS" FIRECRACKERS',
  "MERDEKA FIREWORKS"
];
const transformToProducts = (data) => {
  return data.map((item) => ({
    id: item.id.toString(),
    name: item.name.en,
    // Use English name by default
    price: item.price,
    image: item.image,
    video: item.videoUrl,
    category: item.section,
    section: item.section
  }));
};
const categories = sections.map((section) => ({
  name: section,
  products: transformToProducts(fireworksData.filter((item) => item.section === section))
}));
const PENINSULAR_STATES = [
  "johor",
  "kedah",
  "kelantan",
  "melaka",
  "negeriSembilan",
  "pahang",
  "perak",
  "perlis",
  "pulauPinang",
  "selangor",
  "terengganu",
  "wilayahPersekutuanKualaLumpur",
  "wilayahPersekutuanPutrajaya"
];
const PRICE_PDF_URL = "https://bmfirework.com/BMFireworks_Deepavali_Combined.pdf";
const PRICE_WEBHOOK_URL = "https://hook.integrator.boost.space/vvsyhhw9jtw2ocvsj6ccb8uaouf1882t";
const FACTORY_KEYS = ["seelong", "muar", "simpangRenggam", "ipoh"];
const PEAK_SEASON_KEYS = ["deepavali", "aidilfitri", "cny", "christmas"];
const FactoryNetworkSection = ({ factories, waUrl, copy }) => /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-white via-yellow-50 to-white relative overflow-hidden", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-10 text-4xl opacity-10", children: "🏭" }),
  /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 right-12 text-3xl opacity-10", children: "🚛" }),
  /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-yellow-100 text-slate-700 mb-3", children: copy.badge }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-800 mb-4", children: copy.title }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 max-w-3xl mx-auto text-sm sm:text-base", children: copy.description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8", children: factories.map((factory) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-yellow-200 p-6 sm:p-8 relative overflow-hidden hover:-translate-y-1 transition-all duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-yellow-400 to-slate-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(Factory, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-slate-800", children: factory.location }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: factory.role })
          ] })
        ] }),
        /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-yellow-500" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed", children: factory.description }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-start gap-2 text-sm text-slate-500", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-yellow-500 mt-1" }),
        /* @__PURE__ */ jsx("span", { children: factory.strength })
      ] })
    ] }, factory.location)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 text-center", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          size: "lg",
          className: "bg-gradient-to-r from-slate-900 to-slate-700 text-yellow-200 hover:from-slate-700 hover:to-slate-600 font-semibold shadow-xl border border-yellow-400",
          children: /* @__PURE__ */ jsx("a", { href: waUrl, target: "_blank", rel: "noreferrer", children: copy.cta })
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-3", children: copy.note })
    ] })
  ] })
] });
const PeakSeasonSection = ({ peakSeasons, copy }) => /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-10 text-4xl opacity-10", children: "🎇" }),
  /* @__PURE__ */ jsx("div", { className: "absolute bottom-12 right-12 text-3xl opacity-10", children: "🎉" }),
  /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-yellow-300/20 text-yellow-200 mb-3", children: copy.badge }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-yellow-200 mb-4", children: copy.title }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-yellow-100/90 max-w-3xl mx-auto", children: copy.description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8", children: peakSeasons.map((season) => /* @__PURE__ */ jsxs("div", { className: "bg-white/10 border border-yellow-400/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:border-yellow-300/40 transition-all duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-yellow-400/20 text-yellow-200 w-12 h-12 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(CalendarDays, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-yellow-200", children: season.festival }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-100/80", children: season.period })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-slate-100 leading-relaxed", children: season.description }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-start gap-2 text-sm text-yellow-200/90", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4 text-yellow-300 mt-1" }),
        /* @__PURE__ */ jsx("span", { children: season.opportunity })
      ] })
    ] }, season.festival)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 text-center text-xs sm:text-sm text-yellow-200/80", children: copy.note })
  ] })
] });
const PriceRequestSection = ({ states: states2, pdfUrl, webhookUrl, copy }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", state: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetForm = () => {
    setFormData({ name: "", phone: "", state: "" });
    setErrors({});
  };
  const redirectToWhatsApp = () => {
    const stateOption = states2.find((item) => item.value === formData.state);
    const stateName = (stateOption == null ? void 0 : stateOption.label) ?? formData.state;
    const message = `Hi BMFireworks! Saya ${formData.name.trim()} dari ${stateName}, nak dapatkan katalog terbaru. No telefon: ${formData.phone.trim()}`;
    const waUrl = `https://wa.me/60137340415?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };
  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = copy.errors.name;
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = copy.errors.phone;
    } else if (!/^[0-9+][0-9\s()+-]{6,}$/.test(formData.phone.trim())) {
      nextErrors.phone = copy.errors.phone;
    }
    if (!formData.state) {
      nextErrors.state = copy.errors.state;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrors({});
    const stateOption = states2.find((item) => item.value === formData.state);
    try {
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            state: formData.state,
            stateLabel: (stateOption == null ? void 0 : stateOption.label) ?? formData.state,
            source: "bmfireworks-price-download",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          })
        });
      }
    } catch (error) {
      console.error("Failed to send webhook payload", error);
      setErrors((prev) => ({ ...prev, global: copy.errors.technical }));
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 300));
      redirectToWhatsApp();
      resetForm();
      setOpen(false);
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-4 h-full", children: Array.from({ length: 36 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-yellow-400/30 transform rotate-45 w-6 h-6" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-yellow-200 mb-3", children: copy.sectionTitle }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-yellow-100/90 mb-6", children: copy.sectionDescription }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: (next) => {
        setOpen(next);
        if (!next) resetForm();
      }, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            size: "lg",
            className: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold hover:from-yellow-300 hover:to-yellow-400 shadow-xl border border-yellow-400",
            children: copy.buttonLabel
          }
        ) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl font-bold text-slate-900", children: copy.formTitle }) }),
          /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-slate-700 mb-1", htmlFor: "price-name", children: copy.nameLabel }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "price-name",
                  type: "text",
                  value: formData.name,
                  onChange: (event) => setFormData((prev) => ({ ...prev, name: event.target.value })),
                  className: "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/40",
                  placeholder: copy.namePlaceholder,
                  disabled: isSubmitting
                }
              ),
              errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-slate-700 mb-1", htmlFor: "price-phone", children: copy.phoneLabel }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "price-phone",
                  type: "tel",
                  value: formData.phone,
                  onChange: (event) => setFormData((prev) => ({ ...prev, phone: event.target.value })),
                  className: "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/40",
                  placeholder: copy.phonePlaceholder,
                  disabled: isSubmitting
                }
              ),
              errors.phone && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.phone })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-slate-700 mb-1", htmlFor: "price-state", children: copy.stateLabel }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "price-state",
                  value: formData.state,
                  onChange: (event) => setFormData((prev) => ({ ...prev, state: event.target.value })),
                  className: "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/40",
                  disabled: isSubmitting,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: copy.statePlaceholder }),
                    states2.map((state) => /* @__PURE__ */ jsx("option", { value: state.value, children: state.label }, state.value))
                  ]
                }
              ),
              errors.state && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.state })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 bg-yellow-100/40 border border-yellow-200 rounded-md p-3 text-left", children: /* @__PURE__ */ jsx("p", { children: copy.note }) }),
            errors.global && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 text-left", children: errors.global }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                className: "w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-semibold",
                disabled: isSubmitting,
                children: isSubmitting ? copy.processingLabel : copy.submitLabel
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Index = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const videos = fireworksData.filter((item) => item.videoUrl && item.videoUrl.trim() !== "").slice(0, 8);
  const WA_NUMBER2 = "60137340415";
  const WA_URL2 = `https://wa.me/${WA_NUMBER2}?text=Hi%20Bearboom%20x%20BMFireworks!%20Saya%20nak%20jadual%20lawatan%20gudang.`;
  const priceStates = PENINSULAR_STATES.map((stateKey) => ({
    value: stateKey,
    label: t(`states.${stateKey}`)
  }));
  const priceCopy = {
    sectionTitle: t("price.section.title"),
    sectionDescription: t("price.section.description"),
    buttonLabel: t("price.section.button"),
    formTitle: t("price.form.title"),
    nameLabel: t("price.form.nameLabel"),
    namePlaceholder: t("price.form.namePlaceholder"),
    phoneLabel: t("price.form.phoneLabel"),
    phonePlaceholder: t("price.form.phonePlaceholder"),
    stateLabel: t("price.form.stateLabel"),
    statePlaceholder: t("price.form.statePlaceholder"),
    submitLabel: t("price.form.submit"),
    processingLabel: t("price.form.processing"),
    note: t("price.form.note"),
    downloadFilename: t("price.downloadFilename"),
    errors: {
      name: t("price.form.error.name"),
      phone: t("price.form.error.phone"),
      state: t("price.form.error.state"),
      technical: t("price.form.error.technical")
    }
  };
  const factories = FACTORY_KEYS.map((key) => ({
    location: t(`factory.cards.${key}.location`),
    role: t(`factory.cards.${key}.role`),
    description: t(`factory.cards.${key}.description`),
    strength: t(`factory.cards.${key}.strength`)
  }));
  const factoryCopy = {
    badge: t("factory.section.badge"),
    title: t("factory.section.title"),
    description: t("factory.section.description"),
    cta: t("factory.section.cta"),
    note: t("factory.section.note")
  };
  const peakSeasons = PEAK_SEASON_KEYS.map((key) => ({
    festival: t(`peak.cards.${key}.festival`),
    period: t(`peak.cards.${key}.period`),
    description: t(`peak.cards.${key}.description`),
    opportunity: t(`peak.cards.${key}.opportunity`)
  }));
  const peakCopy = {
    badge: t("peak.section.badge"),
    title: t("peak.section.title"),
    description: t("peak.section.description"),
    note: t("peak.section.note")
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-12 sm:py-20 lg:py-32 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-10 left-10 animate-pulse", children: /* @__PURE__ */ jsx(Moon, { className: "h-8 w-8 text-yellow-400 opacity-70" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-20 right-20 animate-bounce", children: /* @__PURE__ */ jsx(Star, { className: "h-6 w-6 text-yellow-400 opacity-60" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-20 animate-pulse", children: /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-yellow-300 opacity-80" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-16 animate-bounce", children: /* @__PURE__ */ jsx(Moon, { className: "h-6 w-6 text-yellow-400 opacity-70" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-4 h-full", children: Array.from({ length: 48 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-yellow-400 transform rotate-45 w-6 h-6" }, i)) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border border-dashed border-yellow-100/20 rounded-3xl mx-4 my-6 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl text-center mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 text-6xl", children: "🌙✨" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-yellow-300 drop-shadow-2xl", children: [
          t("home.hero.title"),
          /* @__PURE__ */ jsx("span", { className: "block text-lg sm:text-2xl lg:text-3xl text-yellow-400 mt-2", children: t("home.hero.subtitle") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-xl lg:text-2xl text-yellow-100 mb-6 sm:mb-8 drop-shadow-lg", children: t("home.hero.description") }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 hover:from-yellow-300 hover:to-yellow-400 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-bold shadow-2xl border-2 border-yellow-400",
            children: /* @__PURE__ */ jsxs(Link, { to: "/products", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "mr-2 h-4 w-4 sm:h-5 sm:w-5" }),
              t("home.hero.viewFireworks")
            ] })
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-4 h-full", children: Array.from({ length: 36 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-yellow-400/40 transform rotate-45 w-6 h-6" }, i)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300", children: "Video Gallery" }),
          /* @__PURE__ */ jsx(Link, { to: "/products", className: "text-yellow-300 hover:text-yellow-200 underline-offset-4 hover:underline", children: "Lihat Semua" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: videos.map((v) => /* @__PURE__ */ jsxs("div", { className: "group bg-white/5 rounded-xl border border-yellow-400/30 overflow-hidden hover:border-yellow-400/60 transition-all", children: [
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "w-full aspect-video relative cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: v.image,
                  alt: v.name.en,
                  className: "w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity",
                  loading: "lazy",
                  decoding: "async"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-yellow-400 text-slate-900 p-3 rounded-full shadow-lg", children: /* @__PURE__ */ jsx(Play, { className: "h-6 w-6" }) }) })
            ] }) }),
            /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2", children: [
              /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg sm:text-xl font-bold text-left text-slate-900", children: v.name.en }) }),
              /* @__PURE__ */ jsx("div", { className: "aspect-video w-full", children: v.videoUrl.includes("youtube.com") || v.videoUrl.includes("youtu.be") ? /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: v.videoUrl,
                  title: v.name.en,
                  className: "w-full h-full rounded-lg",
                  allowFullScreen: true,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                }
              ) : /* @__PURE__ */ jsx(
                "video",
                {
                  src: v.videoUrl,
                  title: v.name.en,
                  className: "w-full h-full rounded-lg",
                  controls: true,
                  preload: "metadata",
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                  onContextMenu: (e) => e.preventDefault()
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-3", children: /* @__PURE__ */ jsx("h3", { className: "text-yellow-200 font-semibold text-sm line-clamp-1", children: v.name.en }) })
        ] }, v.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(PriceRequestSection, { states: priceStates, pdfUrl: PRICE_PDF_URL, webhookUrl: PRICE_WEBHOOK_URL, copy: priceCopy }),
    /* @__PURE__ */ jsx(FactoryNetworkSection, { factories, waUrl: WA_URL2, copy: factoryCopy }),
    /* @__PURE__ */ jsx(PeakSeasonSection, { peakSeasons, copy: peakCopy }),
    false,
    /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 text-3xl opacity-20", children: "🌙" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-3xl opacity-20", children: "✨" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-8 text-2xl opacity-15", children: "🎆" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-8 text-2xl opacity-15", children: "🌟" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4", children: t("home.section.title") }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto px-4", children: t("home.section.description") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 sm:h-8 sm:w-8" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4", children: t("home.card.fireworks.title") }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base", children: t("home.card.fireworks.description") }),
            /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 hover:from-slate-700 hover:to-slate-800 w-full shadow-lg", children: /* @__PURE__ */ jsx(Link, { to: "/products", children: t("home.hero.viewFireworks") }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-slate-50 border-2 border-yellow-200 rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-400", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-slate-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg", children: /* @__PURE__ */ jsx(Package, { className: "h-6 w-6 sm:h-8 sm:w-8" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4", children: t("home.card.packages.title") }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base", children: t("home.card.packages.description") }),
            /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-800 hover:from-yellow-600 hover:to-yellow-700 w-full shadow-lg", children: /* @__PURE__ */ jsx(Link, { to: "/packages", children: t("nav.packages") }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 sm:col-span-2 lg:col-span-1", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-slate-600 to-yellow-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg", children: /* @__PURE__ */ jsx(FileText, { className: "h-6 w-6 sm:h-8 sm:w-8" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4", children: t("home.card.permit.title") }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base", children: t("home.card.permit.description") }),
            /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-to-r from-slate-600 to-yellow-600 text-white hover:from-slate-700 hover:to-yellow-700 w-full shadow-lg", children: /* @__PURE__ */ jsx(Link, { to: "/permit-guide", children: t("nav.permitGuide") }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-slate-100 via-yellow-50 to-slate-100 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-8 gap-8 h-full transform rotate-12", children: Array.from({ length: 32 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border-2 border-slate-400 rounded-full w-12 h-12" }, i)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "🎉" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-yellow-700 bg-clip-text text-transparent mb-4", children: t("home.why.title") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg", children: "🏆" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-slate-800 mb-2", children: t("home.why.licensed") }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-sm sm:text-base", children: t("home.why.licensed.desc") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg", children: "🎯" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-slate-800 mb-2", children: t("home.why.products") }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-sm sm:text-base", children: t("home.why.products.desc") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-yellow-500 to-slate-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg", children: "📋" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-slate-800 mb-2", children: t("home.why.permit") }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-sm sm:text-base", children: t("home.why.permit.desc") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-slate-600 to-yellow-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg", children: "💬" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-slate-800 mb-2", children: t("home.why.support") }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-sm sm:text-base", children: t("home.why.support.desc") })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const ProductsSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  allProductsCount
}) => {
  const { t } = useLanguage();
  const getCategoryTranslation = (categoryName) => {
    switch (categoryName) {
      case "MERDEKA FIREWORKS":
        return t("products.category.premium");
      case "SPARKLE & SHINE - KIDS' FAVORITE FIREWORKS!":
        return t("products.category.sparkle");
      case "KIDS' FIRECRACKERS":
        return t("products.category.kidsFirecrackers");
      case "POP-POP":
        return t("products.category.poppop");
      case "FOUNTAIN BLAST":
        return t("products.category.fountainBlast");
      case "ONE SHOT, BIG BLAST!":
        return t("products.category.oneshot");
      case "ROCKET SKY SHOW":
        return t("products.category.rocket");
      case "RED DRAGON FIRECRACKERS":
        return t("products.category.reddragon");
      default:
        return categoryName;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 mb-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          placeholder: t("products.search.placeholder"),
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "pl-12 h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-yellow-500/20 bg-white"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-80", children: /* @__PURE__ */ jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [
      /* @__PURE__ */ jsxs(SelectTrigger, { className: "h-14 border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50 rounded-xl text-lg focus:border-yellow-500 focus:ring-yellow-500/20", children: [
        /* @__PURE__ */ jsx(SelectValue, { placeholder: t("products.category.selectCategory") }),
        /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 opacity-50" })
      ] }),
      /* @__PURE__ */ jsxs(SelectContent, { className: "bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs(
          SelectItem,
          {
            value: "All",
            className: "hover:bg-yellow-50 focus:bg-yellow-50 text-gray-900 py-3 px-4 text-base",
            children: [
              t("products.category.all"),
              " (",
              allProductsCount,
              ")"
            ]
          }
        ),
        categories.map((category) => /* @__PURE__ */ jsxs(
          SelectItem,
          {
            value: category.name,
            className: "hover:bg-yellow-50 focus:bg-yellow-50 text-gray-900 py-3 px-4 text-base",
            children: [
              getCategoryTranslation(category.name),
              " (",
              category.products.length,
              ")"
            ]
          },
          category.name
        ))
      ] })
    ] }) })
  ] }) });
};
const ProductCard = ({ product, onAddToCart, index }) => {
  const { t } = useLanguage();
  const { items, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = (cartItem == null ? void 0 : cartItem.quantity) || 0;
  const handleIncrement = () => {
    if (quantity === 0) {
      onAddToCart();
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { id: `product-${product.id}`, className: "bg-white rounded-2xl shadow-lg border-4 border-yellow-400 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-yellow-500 relative", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mr-4", children: [
      /* @__PURE__ */ jsxs(Dialog, { children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-xl overflow-hidden bg-white border-2 border-gray-200 shadow-sm cursor-pointer hover:border-gray-300 transition-colors mb-2", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: product.image,
            alt: `${product.name} murah Malaysia`,
            className: "w-full h-full object-cover no-select no-drag no-context",
            onContextMenu: (e) => e.preventDefault(),
            onDragStart: (e) => e.preventDefault()
          }
        ) }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[95vw] sm:max-w-2xl w-full", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg font-bold text-left", children: product.name }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: product.image,
              alt: `${product.name} murah Malaysia - BM Firework`,
              className: "w-full h-auto rounded-lg no-select no-drag no-context",
              onContextMenu: (e) => e.preventDefault(),
              onDragStart: (e) => e.preventDefault()
            }
          ) })
        ] })
      ] }),
      product.video && product.video.trim() !== "" && /* @__PURE__ */ jsxs(Dialog, { children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "text-xs bg-yellow-100 text-slate-700 px-2 py-1 rounded-full font-medium hover:bg-yellow-200 transition-colors flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Play, { className: "h-3 w-3" }),
          "Video"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg sm:text-xl font-bold text-left", children: product.name }) }),
          /* @__PURE__ */ jsx("div", { className: "aspect-video w-full", children: product.video.includes("youtube.com") || product.video.includes("youtu.be") ? /* @__PURE__ */ jsx(
            "iframe",
            {
              src: product.video.replace("watch?v=", "embed/"),
              title: product.name,
              className: "w-full h-full rounded-lg",
              allowFullScreen: true,
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            }
          ) : /* @__PURE__ */ jsx(
            "video",
            {
              src: product.video,
              title: product.name,
              className: "w-full h-full rounded-lg no-select no-drag no-context",
              controls: true,
              preload: "metadata",
              controlsList: "nodownload",
              disablePictureInPicture: true,
              onContextMenu: (e) => e.preventDefault()
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-3 leading-tight", children: product.name }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-gray-900", children: [
          "RM ",
          product.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleDecrement,
              disabled: quantity === 0,
              "aria-label": "Kurangkan kuantiti",
              className: "w-8 h-8 bg-slate-600 text-yellow-100 rounded-lg flex items-center justify-center font-bold text-sm disabled:opacity-40 hover:bg-slate-700 transition-colors",
              children: "-"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold min-w-[2rem] text-center text-gray-900", children: quantity }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleIncrement,
              "aria-label": "Tambah kuantiti",
              className: "w-8 h-8 bg-slate-600 text-yellow-100 rounded-lg flex items-center justify-center font-bold text-sm hover:bg-slate-700 transition-colors",
              children: "+"
            }
          )
        ] })
      ] })
    ] })
  ] }) }) });
};
const ProductsByCategory = ({ categories: categories2, searchTerm, onAddToCart }) => {
  const { t } = useLanguage();
  const getCategoryTranslation = (categoryName) => {
    switch (categoryName) {
      case "MERDEKA FIREWORKS":
        return t("products.category.premium");
      case "SPARKLE & SHINE - KIDS' FAVORITE FIREWORKS!":
        return t("products.category.sparkle");
      case "KIDS' FIRECRACKERS":
        return t("products.category.kidsFirecrackers");
      case "POP-POP":
        return t("products.category.poppop");
      case "FOUNTAIN BLAST":
        return t("products.category.fountainBlast");
      case "ONE SHOT, BIG BLAST!":
        return t("products.category.oneshot");
      case "ROCKET SKY SHOW":
        return t("products.category.rocket");
      case "RED DRAGON FIRECRACKERS":
        return t("products.category.reddragon");
      default:
        return categoryName;
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: categories2.map((category) => /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent", children: getCategoryTranslation(category.name) }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full border border-gray-200", children: [
        category.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length,
        " produk"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: category.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product, index) => /* @__PURE__ */ jsx(
      ProductCard,
      {
        product,
        onAddToCart: () => onAddToCart(product),
        index: index + 1
      },
      product.id
    )) })
  ] }, category.name)) });
};
const FilteredProducts = ({ filteredProducts, selectedCategory, onAddToCart }) => {
  const { t } = useLanguage();
  const getCategoryTranslation = (categoryName) => {
    switch (categoryName) {
      case "MERDEKA FIREWORKS":
        return t("products.category.premium");
      case "SPARKLE & SHINE - KIDS' FAVORITE FIREWORKS!":
        return t("products.category.sparkle");
      case "KIDS' FIRECRACKERS":
        return t("products.category.kidsFirecrackers");
      case "POP-POP":
        return t("products.category.poppop");
      case "FOUNTAIN BLAST":
        return t("products.category.fountainBlast");
      case "ONE SHOT, BIG BLAST!":
        return t("products.category.oneshot");
      case "ROCKET SKY SHOW":
        return t("products.category.rocket");
      case "RED DRAGON FIRECRACKERS":
        return t("products.category.reddragon");
      default:
        return categoryName;
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-gray-900 mb-10 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent", children: [
      getCategoryTranslation(selectedCategory),
      " (",
      filteredProducts.length,
      " ",
      t("common.products"),
      ")"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filteredProducts.map((product, index) => /* @__PURE__ */ jsx(
      ProductCard,
      {
        product,
        onAddToCart: () => onAddToCart(product),
        index: index + 1
      },
      product.id
    )) })
  ] });
};
const InlineCartCheckout = () => {
  var _a;
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast: toast2 } = useToast();
  const [checkoutData, setCheckoutData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("fireworksCheckoutData");
      return savedData ? JSON.parse(savedData) : {
        name: "",
        phone: "",
        email: "",
        address: "",
        postcode: "",
        state: "",
        district: ""
      };
    }
    return {
      name: "",
      phone: "",
      email: "",
      address: "",
      postcode: "",
      state: "",
      district: ""
    };
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fireworksCheckoutData", JSON.stringify(checkoutData));
    }
  }, [checkoutData]);
  const malaysianStates = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Selangor",
    "Terengganu"
  ];
  const stateDistricts = {
    "Johor": ["Batu Pahat", "Johor Bahru", "Kluang", "Kota Tinggi", "Kulai", "Mersing", "Muar", "Pontian", "Segamat", "Tangkak"],
    "Kedah": ["Baling", "Bandar Baharu", "Kota Setar", "Kuala Muda", "Kubang Pasu", "Kulim", "Langkawi", "Padang Terap", "Pendang", "Pokok Sena", "Sik", "Yan"],
    "Kelantan": ["Bachok", "Gua Musang", "Jeli", "Kota Bharu", "Kuala Krai", "Machang", "Pasir Mas", "Pasir Puteh", "Tanah Merah", "Tumpat"],
    "Kuala Lumpur": ["Bukit Bintang", "Cheras", "Kepong", "Lembah Pantai", "Seputeh", "Titiwangsa", "Wangsa Maju"],
    "Labuan": ["Labuan"],
    "Melaka": ["Alor Gajah", "Jasin", "Melaka Tengah"],
    "Negeri Sembilan": ["Jelebu", "Jempol", "Kuala Pilah", "Port Dickson", "Rembau", "Seremban", "Tampin"],
    "Pahang": ["Bentong", "Bera", "Cameron Highlands", "Jerantut", "Kuantan", "Lipis", "Maran", "Pekan", "Raub", "Rompin", "Temerloh"],
    "Penang": ["Barat Daya", "Seberang Perai Selatan", "Seberang Perai Tengah", "Seberang Perai Utara", "Timur Laut"],
    "Perak": ["Batang Padang", "Hilir Perak", "Hulu Perak", "Kampar", "Kinta", "Kuala Kangsar", "Larut, Matang dan Selama", "Manjung", "Muallim", "Perak Tengah"],
    "Perlis": ["Perlis"],
    "Putrajaya": ["Putrajaya"],
    "Selangor": ["Gombak", "Hulu Langat", "Hulu Selangor", "Klang", "Kuala Langat", "Kuala Selangor", "Petaling", "Sabak Bernam", "Sepang"],
    "Terengganu": ["Besut", "Dungun", "Hulu Terengganu", "Kemaman", "Kuala Nerus", "Kuala Terengganu", "Marang", "Setiu"]
  };
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };
  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      toast2({
        title: "Cart is empty",
        description: "Add some fireworks to your cart first!",
        variant: "destructive"
      });
      return;
    }
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.postcode || !checkoutData.state || !checkoutData.district) {
      toast2({
        title: "Missing information",
        description: "Please fill in all required fields (Name, Phone, Address, Postcode, State, District)",
        variant: "destructive"
      });
      return;
    }
    const orderDetails = items.map(
      (item) => `${item.name} (${item.type}) x${item.quantity} = RM ${(item.price * item.quantity).toFixed(2)}`
    ).join("\n");
    const message = `Hi! I'd like to place an order:

${orderDetails}

Total: RM ${getTotalPrice().toFixed(2)}

Customer Details:
Name: ${checkoutData.name}
Phone: ${checkoutData.phone}
Email: ${checkoutData.email || "Not provided"}
Address: ${checkoutData.address}
Postcode: ${checkoutData.postcode}
State: ${checkoutData.state}
District: ${checkoutData.district}`;
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white border-4 border-yellow-400 rounded-2xl p-8 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-black mb-4", children: "🛒 Your Cart" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Add some fireworks to see them here!" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border-4 border-yellow-400 rounded-2xl p-6 shadow-lg", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-black mb-6 text-center", children: "🛒 Complete Your Order" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-black", children: [
            "Cart Items (",
            getTotalItems(),
            ")"
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: clearCart,
              variant: "outline",
              size: "sm",
              className: "border-red-500 text-red-600 hover:bg-red-500 hover:text-white",
              children: "Clear Cart"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-80 overflow-y-auto", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-black text-sm", children: item.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 capitalize", children: item.type }),
              /* @__PURE__ */ jsxs("p", { className: "font-bold text-black text-sm", children: [
                "RM ",
                item.price
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleQuantityChange(item.id, item.quantity - 1),
                  className: "h-7 w-7 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500",
                  children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "w-6 text-center font-semibold text-sm", children: item.quantity }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleQuantityChange(item.id, item.quantity + 1),
                  className: "h-7 w-7 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500",
                  children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => removeFromCart(item.id),
                className: "border-red-500 text-red-600 hover:bg-red-500 hover:text-white h-7 w-7 p-0 ml-2",
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-right mt-2", children: /* @__PURE__ */ jsxs("p", { className: "font-bold text-black text-sm", children: [
            "RM ",
            (item.price * item.quantity).toFixed(2)
          ] }) })
        ] }, item.id)) })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border-2 border-black rounded-lg p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-black mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
            /* @__PURE__ */ jsx("span", { children: "Subtotal:" }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
              "RM ",
              getTotalPrice().toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-t border-gray-200", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: "Total:" }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-red-600", children: [
              "RM ",
              getTotalPrice().toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Full Name *",
              value: checkoutData.name,
              onChange: (e) => setCheckoutData({ ...checkoutData, name: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Phone Number *",
              value: checkoutData.phone,
              onChange: (e) => setCheckoutData({ ...checkoutData, phone: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Email Address",
              value: checkoutData.email,
              onChange: (e) => setCheckoutData({ ...checkoutData, email: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Address *",
              value: checkoutData.address,
              onChange: (e) => setCheckoutData({ ...checkoutData, address: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Postcode *",
              value: checkoutData.postcode,
              onChange: (e) => setCheckoutData({ ...checkoutData, postcode: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsxs(Select, { onValueChange: (value) => setCheckoutData({ ...checkoutData, state: value, district: "" }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "border-2 border-gray-300 focus:border-black", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select State *" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: malaysianStates.map((state) => /* @__PURE__ */ jsx(SelectItem, { value: state, children: state }, state)) })
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              onValueChange: (value) => setCheckoutData({ ...checkoutData, district: value }),
              disabled: !checkoutData.state,
              value: checkoutData.district,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "border-2 border-gray-300 focus:border-black", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: checkoutData.state ? "Select City/District *" : "Please select state first" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: checkoutData.state && ((_a = stateDistricts[checkoutData.state]) == null ? void 0 : _a.map((district) => /* @__PURE__ */ jsx(SelectItem, { value: district, children: district }, district))) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleWhatsAppOrder,
            disabled: !checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.postcode || !checkoutData.state || !checkoutData.district,
            className: "w-full bg-slate-500 text-white hover:bg-slate-600 disabled:bg-gray-400 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
              "Order via WhatsApp"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4 text-center", children: "* Required fields: Name, Phone, Address, Postcode, State, District. We'll contact you to confirm your order and arrange delivery." })
      ] }) })
    ] })
  ] });
};
const CartSummaryFooter = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showMinimumDialog, setShowMinimumDialog] = useState(false);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const MINIMUM_ORDER = 150;
  const isMinimumMet = totalPrice >= MINIMUM_ORDER;
  const remainingAmount = MINIMUM_ORDER - totalPrice;
  if (totalItems === 0) return null;
  const handleCartClick = () => {
    if (!isMinimumMet) {
      setShowMinimumDialog(true);
      return;
    }
    const checkoutSection = document.querySelector("[data-checkout-section]");
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/cart");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: handleCartClick,
        className: `fixed bottom-0 left-0 right-0 shadow-2xl border-t-4 z-40 cursor-pointer transition-all duration-200 ${isMinimumMet ? `bg-gradient-to-r ${theme.colors.cartColors.above} ${theme.colors.cartColors.text} ${theme.colors.cartColors.border}` : `bg-gradient-to-r ${theme.colors.cartColors.below} text-red-100 border-red-400`}`,
        children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center border-2 ${isMinimumMet ? "bg-primary/20 border-primary/30" : "bg-red-400/20 border-red-400/30"}`, style: isMinimumMet ? { backgroundColor: `hsl(${theme.colors.primary} / 0.2)`, borderColor: `hsl(${theme.colors.primary} / 0.3)` } : {}, children: /* @__PURE__ */ jsx(ShoppingCart, { className: `h-6 w-6 ${isMinimumMet ? "" : "text-red-400"}`, style: isMinimumMet ? { color: `hsl(${theme.colors.primary})` } : {} }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: `text-lg font-bold ${isMinimumMet ? "text-yellow-100" : "text-red-100"}`, children: [
                totalItems,
                " produk dipilih"
              ] }),
              /* @__PURE__ */ jsx("div", { className: `text-sm ${isMinimumMet ? "text-yellow-200/80" : "text-red-200/80"}`, children: isMinimumMet ? "(Min RM 150.00) Proceed" : `Perlu tambah RM ${remainingAmount.toFixed(2)}` })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${isMinimumMet ? "text-yellow-300" : "text-red-300"}`, children: [
              "RM ",
              totalPrice.toFixed(2)
            ] }),
            !isMinimumMet && /* @__PURE__ */ jsxs("div", { className: "text-xs text-red-400 mt-1", children: [
              "Min RM ",
              MINIMUM_ORDER.toFixed(2)
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Dialog, { open: showMinimumDialog, onOpenChange: setShowMinimumDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[95vw] max-w-sm sm:max-w-md mx-auto bg-white border-4 border-red-400 shadow-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 sm:gap-3 text-red-700 text-lg sm:text-xl font-bold", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 sm:h-6 sm:w-6 text-red-600" }) }),
        /* @__PURE__ */ jsx("span", { className: "leading-tight", children: "Minimum Order Diperlukan" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "py-3 sm:py-4 space-y-3 sm:space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center bg-red-50 p-3 sm:p-4 rounded-lg border-2 border-red-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-base sm:text-lg font-bold text-red-800 mb-2", children: [
            "RM ",
            MINIMUM_ORDER.toFixed(2),
            " Minimum Order"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm text-red-600 mb-2 sm:mb-3", children: [
            "Current total: RM ",
            totalPrice.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-lg sm:text-xl font-bold text-red-700 bg-red-200 px-3 sm:px-4 py-2 rounded-lg", children: [
            "Perlu tambah: RM ",
            remainingAmount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-center text-sm sm:text-base px-2", children: "Sila tambah produk untuk mencapai minimum order sebelum checkout." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => setShowMinimumDialog(false),
            className: "flex-1 bg-slate-600 text-yellow-100 hover:bg-slate-700 text-sm sm:text-base py-2 sm:py-2.5",
            children: "OK, Faham"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => {
              setShowMinimumDialog(false);
              navigate("/products");
            },
            className: "flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 hover:from-yellow-400 hover:to-yellow-500 text-sm sm:text-base py-2 sm:py-2.5",
            children: "Tambah Produk"
          }
        )
      ] })
    ] }) })
  ] });
};
const Products = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCartFooter, setShowCartFooter] = useState(true);
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const checkoutRef = useRef(null);
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const productId = searchParams.get("product");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (productId) {
      setTimeout(() => {
        const productElement = document.getElementById(`product-${productId}`);
        if (productElement) {
          productElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          productElement.classList.add("ring-4", "ring-yellow-400", "ring-opacity-75");
          setTimeout(() => {
            productElement.classList.remove("ring-4", "ring-yellow-400", "ring-opacity-75");
          }, 3e3);
        }
      }, 500);
    }
  }, [searchParams]);
  const allProducts = categories.flatMap((category) => category.products);
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: "product"
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (checkoutRef.current) {
        const checkoutTop = checkoutRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setShowCartFooter(checkoutTop > windowHeight * 0.5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-4xl opacity-20 animate-pulse", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 right-12 text-3xl opacity-15 animate-bounce", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-16 text-2xl opacity-10", children: "🎆" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 text-3xl opacity-15", children: "🌟" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-16 gap-6 h-full", children: Array.from({ length: 64 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-slate-400 transform rotate-45 w-4 h-4" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "🎆🌙" }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-6 drop-shadow-sm", children: t("products.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed", children: t("products.description") })
      ] }),
      /* @__PURE__ */ jsx(
        ProductsSearch,
        {
          searchTerm,
          setSearchTerm,
          selectedCategory,
          setSelectedCategory,
          allProductsCount: allProducts.length
        }
      ),
      selectedCategory === "All" ? /* @__PURE__ */ jsx(
        ProductsByCategory,
        {
          categories,
          searchTerm,
          onAddToCart: handleAddToCart
        }
      ) : /* @__PURE__ */ jsx(
        FilteredProducts,
        {
          filteredProducts,
          selectedCategory,
          onAddToCart: handleAddToCart
        }
      ),
      filteredProducts.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600", children: t("products.noResults") }) }),
      /* @__PURE__ */ jsx("div", { ref: checkoutRef, className: "mt-16", "data-checkout-section": true, children: /* @__PURE__ */ jsx(InlineCartCheckout, {}) }),
      /* @__PURE__ */ jsx("div", { className: "h-16" }),
      showCartFooter && /* @__PURE__ */ jsx(CartSummaryFooter, {})
    ] })
  ] });
};
const cartonCategories = [
  {
    name: "CARTON POP-POP",
    products: [
      {
        id: "carton-27",
        name: "Carton Classic Pop Pop",
        quantity: 30,
        price: 250,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON POP-POP"
      },
      {
        id: "carton-28",
        name: "Carton Jumbo Pop Pop",
        quantity: 26,
        price: 250,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON POP-POP"
      },
      {
        id: "carton-29",
        name: "Carton Color Pop Pop",
        quantity: 31,
        price: 280,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON POP-POP"
      },
      {
        id: "carton-30",
        name: "Carton Super Pop Pop",
        quantity: 28,
        price: 320,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON POP-POP"
      },
      {
        id: "carton-31",
        name: "Carton Pop Pop Party Pack",
        quantity: 44,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198878/fireworks_400x400/fireworks_400x400/resized_framed_product_39_Pop_Pop_Besar.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON POP-POP"
      }
    ]
  },
  {
    name: "CARTON MERDEKA FIREWORKS",
    products: [
      {
        id: "carton-97",
        name: "Carton 4 138 Shot Merdeka",
        quantity: 35,
        price: 320,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199058/fireworks_400x400/fireworks_400x400/resized_framed_product_91_4_138_Shoot_Cake_4_138.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077619/HunterBoom/cm4shk2s0000g03ju9jme3n1g_wrp2hg.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-901",
        name: "Carton 5138 Shoot Cake ABC",
        quantity: 28,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198938/fireworks_400x400/fireworks_400x400/resized_framed_product_0_5138_Shoot_Cake_28ABC29.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076871/HunterBoom/cm4l31g5200010cmq8qeahfje_gjzsmh.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-955",
        name: "Carton 100 Shoot Flying Dragon 100",
        quantity: 37,
        price: 400,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199035/fireworks_400x400/fireworks_400x400/resized_framed_product_54_100_Shoot_Flying_Dragon_100.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077235/HunterBoom/cm3h8pi2e000a0cl95egh7b6x_u4cwcs.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-986",
        name: "Carton Double Shoot Banana Besar (1.75) 1.75",
        quantity: 31,
        price: 400,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199108/fireworks_400x400/fireworks_400x400/resized_framed_product_85_Double_Shoot_Banana_Besar_281.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077556/HunterBoom/cm3hcptvc00030cjwacdy2wid_ize2rw.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-988",
        name: "Carton 8 Shoot Roma Candle 0.8",
        quantity: 26,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199013/fireworks_400x400/fireworks_400x400/resized_framed_product_87_8_Shoot_Roma_Candle_280.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077577/HunterBoom/cm3hcscy400070cle9y0fc0qv_n2ni5r.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-989",
        name: "Carton 4 25 Shoot Cake 4",
        quantity: 42,
        price: 350,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199046/fireworks_400x400/fireworks_400x400/resized_framed_product_88_4_25_Shoot_Cake_4_25.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077588/HunterBoom/cm4shf52l000703mteyab9izo_tpvhu7.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-990",
        name: "Carton 4 36 Shoot Cake 4",
        quantity: 42,
        price: 390,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198942/fireworks_400x400/fireworks_400x400/resized_framed_product_89_4_36_Shoot_Cake_4_36.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077598/HunterBoom/cm4shhj0r000003mdfbe23njd_ukabrl.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-991",
        name: "Carton 4 49 Shoot Cake (ABCD) 4",
        quantity: 30,
        price: 350,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198982/fireworks_400x400/fireworks_400x400/resized_framed_product_90_4_49_Shoot_Cake_28ABCD29_4_49.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077608/HunterBoom/cm4shhzku000903mt4o59h96b_es7x0u.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-993",
        name: "Carton 4138 Shoot Cake",
        quantity: 44,
        price: 320,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199054/fireworks_400x400/fireworks_400x400/resized_framed_product_92_4138_Shoot_Cake.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077630/HunterBoom/cm4jy49dl00120cky70snaevx_esxtka.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-994",
        name: "Carton 5138 Shoot Cake (Single Abcd) 5",
        quantity: 37,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199079/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_Single_Abcd_5.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4shko51000i03ju5o9q795y.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-995",
        name: "Carton 5414 Shoot Cake (ABC) (Straight V Shape) Bb51",
        quantity: 34,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198989/fireworks_400x400/fireworks_400x400/resized_framed_Super_Flash_Rocket.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4ii2fc9000c0cjsdadg2xrk.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-996",
        name: "Carton 5414 Shoot Cake (ABC) (Straight V Shape) Bb51",
        quantity: 39,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199083/fireworks_400x400/fireworks_400x400/resized_framed_12_Patten_160_Saat_Fountain.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4ii399k00000clg655khz7o.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-997",
        name: "Carton 5138 Shoot Cake (ABC) (V Shape) Bb5138 C",
        quantity: 40,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199039/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_ABC_V_Shape_Bb5138_C.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4ii591600000ci33jtohs4d.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-998",
        name: "Carton 5138 Shoot Cake (ABC) (V Shape) Bb5138 D",
        quantity: 38,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198983/fireworks_400x400/fireworks_400x400/resized_framed_5138_Shoot_Cake_ABC_V_Shape_Bb5138_D.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4ii5qox00000cjx6adr5uf7.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-999",
        name: "Carton 5414 Shoot Cake Thor (V Shape) 5414",
        quantity: 31,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199101/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Thor_V_Shape_5414.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm3m7ak5r000g0ckwaav6fnq0.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1000",
        name: "Carton 5414 Shoot Cake Thanos (V Shape) 5414",
        quantity: 44,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198936/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Thanos_V_Shape_5414.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm3m7a56r000g0cmgc2qa7l1w.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1001",
        name: "Carton 5414 Shoot Cake Rule The Universe 5414",
        quantity: 47,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198950/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Rule_The_Universe_5414.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1002",
        name: "Carton 5552 Shoot Cake Four Symbols Mini (V Shape) 5",
        quantity: 25,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198897/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Four_Symbols_Mini_V_Shape_5.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1003",
        name: "Carton 5552 Shoot Cake Xiong He Xin Xi (Straight V S",
        quantity: 26,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199011/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Xiong_He_Xin_Xi_Straight_V_S.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4queryp000403mkeyk73q6o.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1004",
        name: "Carton 5552 Shoot Cake Fu Shou An Kang (V Shape) 555",
        quantity: 37,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198940/fireworks_400x400/fireworks_400x400/resized_framed_5552_Shoot_Cake_Fu_Shou_An_Kang_V_Shape_555.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1005",
        name: "Carton 8138 Shoot Cake",
        quantity: 33,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199068/fireworks_400x400/fireworks_400x400/resized_framed_product_104_8138_Shoot_Cake.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077728/HunterBoom/cm4jivsef00010cl21ztbbh6b_g6udgn.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1006",
        name: "Carton 7276 Shoot Milan Night (Straight V Shape) 727",
        quantity: 49,
        price: 850,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199055/fireworks_400x400/fireworks_400x400/resized_framed_7276_Shoot_Milan_Night_Straight_V_Shape_727.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm5dl1fcx000303jgai1h7hgw.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1007",
        name: "Carton 6414 Shoot Cake I Am The Only One (V Shape) 6",
        quantity: 41,
        price: 650,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199065/fireworks_400x400/fireworks_400x400/resized_framed_6414_Shoot_Cake_I_Am_The_Only_One_V_Shape_6.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm3r0gjys00000djkaama012h.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1008",
        name: "Carton 9138 Shoot Cake",
        quantity: 35,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199016/fireworks_400x400/fireworks_400x400/resized_framed_product_117_9138_Shoot_Cake.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077868/HunterBoom/cm598lsfi000003l55pwdcx4b_j0398m.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1009",
        name: "Carton 8036 Shoot Sound King 836",
        quantity: 26,
        price: 250,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199005/fireworks_400x400/fireworks_400x400/resized_framed_8036_Shoot_Sound_King_836.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4qrpog900010cl08qqi6byz.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1010",
        name: "Carton 9138 Shoot Cake Fu Lu Shou (Straight V Shape",
        quantity: 34,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198944/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Fu_Lu_Shou_Straight_V_Shape.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4kyn2zf00000cl6evyfasc7.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1011",
        name: "Carton 9414 Shoot Cake Fu Lu Shou Straight V Shape 9414",
        quantity: 29,
        price: 800,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198908/fireworks_400x400/fireworks_400x400/resized_framed_9414_Shoot_Cake_Fu_Lu_Shou_Straight_V_Shape_9414.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4kynjnt00050cjo9a2xc10a.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1012",
        name: "Carton 9138 Shoot Cake God For Wealth (Straight V S",
        quantity: 47,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198985/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_God_For_Wealth_Straight_V_S.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4krsuma00000cl42y8x7x95.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1013",
        name: "Carton 9552 Shoot Cake God For Wealth (Straight V Sh",
        quantity: 43,
        price: 900,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199031/fireworks_400x400/fireworks_400x400/resized_framed_9552_Shoot_Cake_God_For_Wealth_Straight_V_Sh.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4krs82800040cme2rrdeu89.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1014",
        name: "Carton 9138 Shoot Cake Fortune Four 9",
        quantity: 44,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199073/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Fortune_Four_9.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm3r2lnw200060cla8ua8d5er.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1015",
        name: "Carton 9552 Shoot Cake Fortune Four 9",
        quantity: 46,
        price: 950,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199069/fireworks_400x400/fireworks_400x400/resized_framed_9552_Shoot_Cake_Fortune_Four_9.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm3r2lnw200060cla8ua8d5er.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1016",
        name: "Carton 9138 Shoot Cake Zhong Lu Chai Shen 9138",
        quantity: 32,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199095/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Zhong_Lu_Chai_Shen_9138.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm598y327000003l380dw0qhh.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1017",
        name: "Carton 949 Shoot Cake",
        quantity: 49,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198954/fireworks_400x400/fireworks_400x400/resized_framed_product_116_949_Shoot_Cake.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077856/HunterBoom/cm597rqi4000u03mqe0ml5xhk_qmk1ha.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1018",
        name: "Carton 9138 Shoot Cake",
        quantity: 43,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199016/fireworks_400x400/fireworks_400x400/resized_framed_product_117_9138_Shoot_Cake.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077868/HunterBoom/cm598lsfi000003l55pwdcx4b_j0398m.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1019",
        name: "Carton 5276 Shoot Cake Classic (V Shape) 5276",
        quantity: 49,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198965/fireworks_400x400/fireworks_400x400/resized_framed_5276_Shoot_Cake_Classic_V_Shape_5276.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4la2rms00130cl71m8b1hdf.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1020",
        name: "Carton Pre- Orderb912 9138 Shoot Cake (1.2) 9138",
        quantity: 37,
        price: 1e3,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198926/fireworks_400x400/fireworks_400x400/resized_framed_product_119_Pre_Orderb_912_9138_Shoot_Ca.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1021",
        name: "Carton 9276 Shoot Cake Golden Win (V Shape Gold) 9",
        quantity: 26,
        price: 1e3,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198888/fireworks_400x400/fireworks_400x400/resized_framed_9276_Shoot_Cake_Golden_Win_V_Shape_Gold_9.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm5cj5yoc000803js4xadhqd4.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1022",
        name: "Carton 9138 Shoot Cake Hong Yun Dang Tounbsp 9138",
        quantity: 45,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198904/fireworks_400x400/fireworks_400x400/resized_framed_9138_Shoot_Cake_Hong_Yun_Dang_Tounbsp_9138.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4ktocdv00000cl84989dzmo.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1023",
        name: "Carton Pre- Orderb902 9138 Shoot Cake Xin Xiang Shi Cheng",
        quantity: 49,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199027/fireworks_400x400/fireworks_400x400/resized_framed_product_122_Pre_Orderb_902_9138_Shoot_Ca.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077911/HunterBoom/cm599gv4o000303js31vc38od_xjq54k.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1024",
        name: "Carton Pre- Orderb903 9138 Shoot Cake Huang Jin Man Wu 91",
        quantity: 34,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199104/fireworks_400x400/fireworks_400x400/resized_framed_product_123_Pre_Orderb_903_9138_Shoot_Ca.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077922/HunterBoom/cm4ktontw00050clabnkqag8q_e34tqy.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1025",
        name: 'Carton 5" 138 Shoot Cake 天地无双 Unparalleled',
        quantity: 33,
        price: 400,
        image: "https://hunterboom.com/wp-content/uploads/2024/11/Website-product-photos-73.jpg",
        video: "https://www.youtube.com/embed/9cyQy8KjbqE",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1026",
        name: 'Carton 7" 138 Shoot Cake Fast & Furious',
        quantity: 47,
        price: 500,
        image: "https://hunterboom.com/wp-content/uploads/2024/11/7138-SHOOT-CAKE-A-74.jpg",
        video: "https://www.youtube.com/embed/BwSb6Yi9-go",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1027",
        name: 'Carton 8" 49 Shoot Cake 八面玲珑 Eight-Sided',
        quantity: 29,
        price: 500,
        image: "https://hunterboom.com/wp-content/uploads/2024/11/8寸49发盆花-八面玲珑-849-SHOOT-CAKE.jpg",
        video: "https://www.youtube.com/embed/-0-ADwhfGwY",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1028",
        name: 'Carton 9" 138 Shoot Cake 诸葛亮 Zhuge Liang',
        quantity: 50,
        price: 600,
        image: "https://hunterboom.com/wp-content/uploads/2024/11/9寸138发盆花G-诸葛亮-9138-SHOOT-CAKE-G.jpg",
        video: "https://www.youtube.com/embed/EhloGEN5uRk",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1029",
        name: "Carton DS 5-276V MILAN NIGHT (combine2in1)",
        quantity: 38,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258170/mci_product/mci_product/mci_1_No184_184_DS_5-276V_MILAN_NIGHT_combine2.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305553/mci_product/mci_video_row_1.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1030",
        name: "Carton DS 5-414V SHI HOU DI DONG (combine3in1) Pyro",
        quantity: 40,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258172/mci_product/mci_product/mci_2_No185_185_DS_5-414V_SHI_HOU_DI_DONG_comb.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305597/mci_product/mci_video_row_2.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1031",
        name: "Carton DS 5-414V LONG TENG SHENG SHI (combine3in1)",
        quantity: 27,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258175/mci_product/mci_product/mci_3_No186_186_DS_5-414V_LONG_TENG_SHENG_SHI_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305641/mci_product/mci_video_row_3.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1032",
        name: "Carton DS 6-552V (combine4in1)",
        quantity: 31,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258177/mci_product/mci_product/mci_4_No187_187_DS_6-552V_combine4in1__DS_6-55.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305665/mci_product/mci_video_row_4.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1033",
        name: "Carton DS 9-138V CAI YUAN GUN GUN",
        quantity: 47,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258179/mci_product/mci_product/mci_5_No188_188_DS_9-138V_CAI_YUAN_GUN_GUN__DS.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305706/mci_product/mci_video_row_5.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1034",
        name: "Carton DS 1.5-88 YUE LONG MEN",
        quantity: 30,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258181/mci_product/mci_product/mci_6_No189_189_DS_15-88_YUE_LONG_MEN__DS_15-8.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305764/mci_product/mci_video_row_6.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1035",
        name: "Carton DS 1.5-138 JU CAI QI",
        quantity: 28,
        price: 650,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258184/mci_product/mci_product/mci_7_No190_190_DS_15-138_JU_CAI_QI__DS_15-138.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753332710/mci_product/mci_video_row_7_ju_cai_qi_compressed.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1036",
        name: "Carton TP 5-276V SHI WAI TAO YUAN (combine2in1)",
        quantity: 43,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258186/mci_product/mci_product/mci_8_TL-001_173_TP_5-276V_SHI_WAI_TAO_YUAN_co.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331110/mci_product/mci_video_row_8_new.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1037",
        name: "Carton TP 6-25 FENG WU JIU TIAN",
        quantity: 27,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258189/mci_product/mci_product/mci_9_TL-002_174_TP_6-25_FENG_WU_JIU_TIAN__TP_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305881/mci_product/mci_video_row_9.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1038",
        name: "Carton TP 6-36 YONG PAN GAO FENG",
        quantity: 35,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258192/mci_product/mci_product/mci_10_TL-003_175_TP_6-36_YONG_PAN_GAO_FENG__TP.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305895/mci_product/mci_video_row_10.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1039",
        name: "Carton TP 7-25 JIN QI LIN",
        quantity: 28,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258195/mci_product/mci_product/mci_11_TL-004_176_TP_7-25_JIN_QI_LIN__TP_7-25_%E9%87%91.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305903/mci_product/mci_video_row_11.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1040",
        name: "Carton TP 7-36 XING CHEN DA HAI",
        quantity: 46,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258197/mci_product/mci_product/mci_12_TL-005_177_TP_7-36_XING_CHEN_DA_HAI__TP_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305915/mci_product/mci_video_row_12.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1041",
        name: "Carton TP 7-49 FU LU SHUANG QUAN",
        quantity: 47,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258200/mci_product/mci_product/mci_13_TL-006_178_TP_7-49_FU_LU_SHUANG_QUAN__TP.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305924/mci_product/mci_video_row_13.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1042",
        name: "Carton TP 7-138V MA DAO CHENG GONG",
        quantity: 48,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258203/mci_product/mci_product/mci_14_TL-007_179_TP_7-138V_MA_DAO_CHENG_GONG__.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305932/mci_product/mci_video_row_14.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1043",
        name: "Carton TP 9-138V XING HE CUI CAN",
        quantity: 48,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258206/mci_product/mci_product/mci_15_TL-008_180_TP_9-138V_XING_HE_CUI_CAN__TP.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305945/mci_product/mci_video_row_15.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1044",
        name: "Carton TP 9-138V HUA KAI FU GUI",
        quantity: 43,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258209/mci_product/mci_product/mci_16_TL-009_181_TP_9-138V_HUA_KAI_FU_GUI__TP_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305955/mci_product/mci_video_row_16.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1045",
        name: "Carton TP 9-138V CHEN FENG PO LANG",
        quantity: 29,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258211/mci_product/mci_product/mci_17_TL-010_182_TP_9-138V_CHEN_FENG_PO_LANG__.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305967/mci_product/mci_video_row_17.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1046",
        name: "Carton TP 10-138V YIN HE ZHI LIAN",
        quantity: 49,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258214/mci_product/mci_product/mci_18_TL-011_183_TP_10-138V_YIN_HE_ZHI_LIAN__T.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305977/mci_product/mci_video_row_18.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1047",
        name: "Carton TL 5-276V JI QING YOU YU (combine2in1)",
        quantity: 32,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258216/mci_product/mci_product/mci_19_FD-001_161_TL_5-276V_JI_QING_YOU_YU_comb.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753305991/mci_product/mci_video_row_19.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1048",
        name: "Carton TL 6-552V YING CHUN JIE FU (combine4in1)",
        quantity: 49,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258219/mci_product/mci_product/mci_20_FD-002_162_TL_6-552V_YING_CHUN_JIE_FU_co.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306008/mci_product/mci_video_row_20.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1049",
        name: "Carton TL 8-138V GONG HE XIN XI",
        quantity: 50,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258225/mci_product/mci_product/mci_21_FD-003_163_TL_8-138V_GONG_HE_XIN_XI__TL_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306043/mci_product/mci_video_row_21.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1050",
        name: "Carton TL 9-138V XIANG YUN RUI CAI",
        quantity: 32,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258228/mci_product/mci_product/mci_22_FD-004_164_TL_9-138V_XIANG_YUN_RUI_CAI__.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306085/mci_product/mci_video_row_22.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1051",
        name: "Carton TL 9-138V JI XING GAO ZHAO",
        quantity: 36,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258231/mci_product/mci_product/mci_23_FD-005_165_TL_9-138V_JI_XING_GAO_ZHAO__T.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306120/mci_product/mci_video_row_23.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1052",
        name: "Carton TL 9-138V RUI QI YING MEN",
        quantity: 33,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258234/mci_product/mci_product/mci_24_FD-006_166_TL_9-138V_RUI_QI_YING_MEN__TL.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306142/mci_product/mci_video_row_24.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1053",
        name: "Carton TL 9-138V FENG WEI FEI TIAN",
        quantity: 28,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258237/mci_product/mci_product/mci_25_FD-007_167_TL_9-138V_FENG_WEI_FEI_TIAN__.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306163/mci_product/mci_video_row_25.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1054",
        name: "Carton TL 9-138V LONG FENG CHENG XIANG",
        quantity: 35,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258241/mci_product/mci_product/mci_26_FD-008_168_TL_9-138V_LONG_FENG_CHENG_XIA.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306180/mci_product/mci_video_row_26.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1055",
        name: "Carton TL 9-138V MEI LUN MEI HUAN",
        quantity: 45,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258244/mci_product/mci_product/mci_27_FD-009_169_TL_9-138V_MEI_LUN_MEI_HUAN__T.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306196/mci_product/mci_video_row_27.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1056",
        name: "Carton TL 9-138V HUA TUAN JIN CU",
        quantity: 36,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258247/mci_product/mci_product/mci_28_FD-010_170_TL_9-138V_HUA_TUAN_JIN_CU__TL.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306213/mci_product/mci_video_row_28.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1057",
        name: "Carton TL 9-276V TIAN MA XING KONG (combine2in1)",
        quantity: 44,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258250/mci_product/mci_product/mci_29_FD-011_171_TL_9-276V_TIAN_MA_XING_KONG_c.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306233/mci_product/mci_video_row_29.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1058",
        name: "Carton TL 10-49 FENG CAI JU BAO - Special",
        quantity: 31,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258253/mci_product/mci_product/mci_30_FD-012_172_TL_10-49_FENG_CAI_JU_BAO_-_Sp.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306255/mci_product/mci_video_row_30.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1059",
        name: "Carton FD 5-187V DA YING JIA (combine2in1)",
        quantity: 38,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258256/mci_product/mci_product/mci_31_HP-001_146_FD_5-187V_DA_YING_JIA_combine.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306292/mci_product/mci_video_row_31.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1060",
        name: "Carton FD 5-276V FU DAO CAI DAO (combine2in1)",
        quantity: 35,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258258/mci_product/mci_product/mci_32_HP-002_147_FD_5-276V_FU_DAO_CAI_DAO_comb.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306360/mci_product/mci_video_row_32.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1061",
        name: "Carton FD 5-414V CAI FU SHI JIA (combine3in1)",
        quantity: 31,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258260/mci_product/mci_product/mci_33_HP-003_148_FD_5-414V_CAI_FU_SHI_JIA_comb.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306433/mci_product/mci_video_row_33.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1062",
        name: "Carton FD 6-552V ZHAO CAI JIN BAO (combine4in1) | FD 6-552V 招财进宝 (4连线)",
        quantity: 45,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258262/mci_product/mci_product/mci_34_HP-004_149_FD_6-552V_ZHAO_CAI_JIN_BAO_co.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306529/mci_product/mci_video_row_34.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1063",
        name: "Carton FD 9-138 TU HAO JIN",
        quantity: 49,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258264/mci_product/mci_product/mci_35_HP-005_150_FD_9-138_TU_HAO_JIN__FD_9-138.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306635/mci_product/mci_video_row_35.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1064",
        name: "Carton FD 9-187V DA JI DA LI (combine2box in1)",
        quantity: 44,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258267/mci_product/mci_product/mci_36_HP-006_151_FD_9-187V_DA_JI_DA_LI_combine.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306684/mci_product/mci_video_row_36.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1065",
        name: "Carton FD 10-25 TIAN LANG (Wolf)",
        quantity: 48,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258269/mci_product/mci_product/mci_37_HP-007_152_FD_10-25_TIAN_LANG_Wolf__FD_1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306717/mci_product/mci_video_row_37.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1066",
        name: "Carton FD 10-36 BEN LANG (Wolf)",
        quantity: 46,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258271/mci_product/mci_product/mci_38_HP-008_153_FD_10-36_BEN_LANG_Wolf__FD_10.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306733/mci_product/mci_video_row_38.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1067",
        name: "Carton FD 10-49 LANG HAO (Wolf)",
        quantity: 35,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258274/mci_product/mci_product/mci_39_HP-009_154_FD_10-49_LANG_HAO_Wolf__FD_10.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306753/mci_product/mci_video_row_39.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1068",
        name: "Carton FD 10-138 LANG WANG (Wolf)",
        quantity: 46,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258277/mci_product/mci_product/mci_40_HP-010_155_FD_10-138_LANG_WANG_Wolf__FD_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306795/mci_product/mci_video_row_40.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1069",
        name: "Carton FD 15-36 MA DAO CHENG GONG (2.0) | FD 15-36 马到成功 (2.0)",
        quantity: 43,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258283/mci_product/mci_product/mci_41_HP-011_156_FD_15-36_MA_DAO_CHENG_GONG_20.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306843/mci_product/mci_video_row_41.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1070",
        name: "Carton FD 15-49 DING FENG XIANG JIAN (2.0)",
        quantity: 49,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258285/mci_product/mci_product/mci_42_HP-012_157_FD_15-49_DING_FENG_XIANG_JIAN.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306883/mci_product/mci_video_row_42.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1071",
        name: "Carton FD 15-187V HAO MEN SHENG YAN (combine2box in1)",
        quantity: 50,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258365/mci_product/mci_product/mci_43_HP-013_158_FD_15-187V_HAO_MEN_SHENG_YAN_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306930/mci_product/mci_video_row_43.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1072",
        name: "Carton FD 1.5-88 HUANG JIN WAN LIANG",
        quantity: 32,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258368/mci_product/mci_product/mci_44_HP-014_159_FD_15-88_HUANG_JIN_WAN_LIANG_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753306970/mci_product/mci_video_row_44.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1073",
        name: "Carton FD 1.5-138 YI WAN FU WENG",
        quantity: 45,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258370/mci_product/mci_product/mci_45_HP-015_160_FD_15-138_YI_WAN_FU_WENG__FD_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307002/mci_product/mci_video_row_45.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1074",
        name: "Carton HAPPY 9-276 HE TIAN XIA (combine2box in1)",
        quantity: 35,
        price: 700,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258372/mci_product/mci_product/mci_46_FW-001_137_HAPPY_9-276_HE_TIAN_XIA_combi.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307087/mci_product/mci_video_row_46.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1075",
        name: "Carton HAPPY 10-98 HUAN LE XUAN CAI (combine2in1)",
        quantity: 29,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258375/mci_product/mci_product/mci_47_FW-002_138_HAPPY_10-98_HUAN_LE_XUAN_CAI_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307145/mci_product/mci_video_row_47.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1076",
        name: "Carton HAPPY 10-138 HUAN LE YAN YU",
        quantity: 46,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258377/mci_product/mci_product/mci_48_FW-003_139_HAPPY_10-138_HUAN_LE_YAN_YU__.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307174/mci_product/mci_video_row_48.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1077",
        name: "Carton HAPPY 10-138V HUAN LE ZUI MEI",
        quantity: 48,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258380/mci_product/mci_product/mci_49_FW-004_140_HAPPY_10-138V_HUAN_LE_ZUI_MEI.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307210/mci_product/mci_video_row_49.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1078",
        name: "Carton HAPPY 10-138V HUAN LE WAN JIA",
        quantity: 40,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258382/mci_product/mci_product/mci_50_FW-005_141_HAPPY_10-138V_HUAN_LE_WAN_JIA.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307243/mci_product/mci_video_row_50.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1079",
        name: "Carton HAPPY 11-276 DING JI FU HAO (combine2box in1)",
        quantity: 40,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258385/mci_product/mci_product/mci_51_FW-006_142_HAPPY_11-276_DING_JI_FU_HAO_c.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753307294/mci_product/mci_video_row_51.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1080",
        name: "Carton HAPPY 11-414 HUAN LE ZHI ZUN (combine3box in1)",
        quantity: 35,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258391/mci_product/mci_product/mci_52_FW-007_143_HAPPY_11-414_HUAN_LE_ZHI_ZUN_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328702/mci_product/mci_video_row_52.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1081",
        name: "Carton HAPPY 12-49 HUA MAN LOU | HAPPY 12-49 花满楼",
        quantity: 50,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258395/mci_product/mci_product/mci_53_FW-008_144_HAPPY_12-49_HUA_MAN_LOU_%C2%A0HAPP.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328774/mci_product/mci_video_row_53.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1082",
        name: "Carton HAPPY 12-138 DA SHI JIE",
        quantity: 35,
        price: 600,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258397/mci_product/mci_product/mci_54_FW-009_145_HAPPY_12-138_DA_SHI_JIE__HAPP.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328868/mci_product/mci_video_row_54.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1083",
        name: "Carton 4&quot;16 Shoot Cake",
        quantity: 26,
        price: 800,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258399/mci_product/mci_product/mci_55_MF-001_123_4quot16_Shoot_Cake__4%E5%AF%B8%E9%AB%9816%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328919/mci_product/mci_video_row_55.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1084",
        name: "Carton 4&quot;25 Shoot Cake",
        quantity: 41,
        price: 900,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258402/mci_product/mci_product/mci_56_MF-002_124_4quot25_Shoot_Cake__4%E5%AF%B8%E9%AB%9825%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328949/mci_product/mci_video_row_56.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1085",
        name: "Carton 4&quot;36 Shoot Cake",
        quantity: 37,
        price: 1e3,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258405/mci_product/mci_product/mci_57_MF-003_125_4quot36_Shoot_Cake__4%E5%AF%B8%E9%AB%9836%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328967/mci_product/mci_video_row_57.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1086",
        name: "Carton 4&quot;49 Shoot Cake",
        quantity: 25,
        price: 1100,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258408/mci_product/mci_product/mci_58_MF-004_126_4quot49_Shoot_Cake__4%E5%AF%B8%E9%AB%9849%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753328985/mci_product/mci_video_row_58.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1087",
        name: "Carton 4&quot;88 Shoot Cake",
        quantity: 43,
        price: 1500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258410/mci_product/mci_product/mci_59_MF-005_127_4quot88_Shoot_Cake__4%E5%AF%B8%E9%AB%9888%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329017/mci_product/mci_video_row_59.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1088",
        name: "Carton 4&quot;138 Shoot Cake",
        quantity: 36,
        price: 1800,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258412/mci_product/mci_product/mci_60_MF-006_128_4quot138_Shoot_Cake__4%E5%AF%B8%E9%AB%98138%E5%8F%91%E7%9B%86.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329063/mci_product/mci_video_row_60.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1089",
        name: "Carton 8&quot;49 Shoot Cake",
        quantity: 32,
        price: 18688,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258418/mci_product/mci_product/mci_61_MF-007_129_8quot49_Shoot_Cake__8%E5%AF%B8%E9%AB%9849%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329093/mci_product/mci_video_row_61.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1090",
        name: "Carton 8&quot;138 Shoot Cake",
        quantity: 43,
        price: 24224,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258422/mci_product/mci_product/mci_62_MF-008_130_8quot138_Shoot_Cake__8%E5%AF%B8%E9%AB%98138%E5%8F%91%E7%9B%86.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329502/mci_product/mci_video_row_62.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1091",
        name: "Carton 9&quot;88 Shoot Cake",
        quantity: 43,
        price: 29457,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258425/mci_product/mci_product/mci_63_MF-009_131_9quot88_Shoot_Cake__9%E5%AF%B8%E9%AB%9888%E5%8F%91%E7%9B%86%E8%8A%B1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329547/mci_product/mci_video_row_63.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1092",
        name: "Carton 9&quot;138 Shoot Cake Box",
        quantity: 37,
        price: 25353,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258429/mci_product/mci_product/mci_64_MF-010_132_9quot138_Shoot_Cake_Box__9%E5%AF%B8%E9%AB%981.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329620/mci_product/mci_video_row_64.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1093",
        name: "Carton 4&quot;138 Shoot Cake (3 type)",
        quantity: 36,
        price: 19989,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258431/mci_product/mci_product/mci_65_MF-011_133_4quot138_Shoot_Cake_3_type__4.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329686/mci_product/mci_video_row_65.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1094",
        name: "Carton 4&quot;138 Shoot Cake (V Shape）box - 4138V  | 4寸高138发彩盒装 异形盆花",
        quantity: 27,
        price: 17217,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258434/mci_product/mci_product/mci_66_MF-012_134%C2%A04quot138%C2%A0Shoot_Cake_V_Shapebo.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753329796/mci_product/mci_video_row_66.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1095",
        name: "Carton 5&quot;138 Shoot Cake (V Shape) Box - 5138V",
        quantity: 46,
        price: 29857,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258436/mci_product/mci_product/mci_67_MF-013_135_5quot138_Shoot_Cake_V_Shape_B.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331743/mci_product/mci_video_row_67_final.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      },
      {
        id: "carton-1096",
        name: "Carton 9&quot;25 Shoot Cake-Daylight Smoke Fireworks(4Colours)",
        quantity: 33,
        price: 18664,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753258439/mci_product/mci_product/mci_68_MF-014_136_9quot25_Shoot_Cake-Daylight_S.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753331776/mci_product/mci_video_row_68_final.mp4",
        category: "CARTON MERDEKA FIREWORKS"
      }
    ]
  },
  {
    name: "CARTON SPARKLE & SHINE",
    products: [
      {
        id: "carton-919",
        name: "Carton Sunset Kayu Tiga Warna",
        quantity: 45,
        price: 410,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199081/fireworks_400x400/fireworks_400x400/resized_framed_product_18_Sunset_Kayu_Tiga_Warna.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076913/HunterBoom/cm3flps0e000a0clb8e5pay1e_rzzlcl.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-920",
        name: "Carton Sunset Besar",
        quantity: 29,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199091/fireworks_400x400/fireworks_400x400/resized_framed_product_19_Sunset_Besar.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076923/HunterBoom/cm3flt42v00020cjwe6jg8qf6_jccz6a.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-921",
        name: "Carton Asap Color",
        quantity: 29,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198962/fireworks_400x400/fireworks_400x400/resized_framed_product_20_Asap_Color.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076934/HunterBoom/cm3flwhbe000a0ckw4pm768ja_rewkth.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-922",
        name: "Carton Asap",
        quantity: 26,
        price: 500,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198948/fireworks_400x400/fireworks_400x400/resized_framed_product_21_Asap.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076946/HunterBoom/cm3fm4uk200070cl9aimr6np8_pu9rlo.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-923",
        name: "Carton Sunset 4 Color",
        quantity: 36,
        price: 400,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198930/fireworks_400x400/fireworks_400x400/resized_framed_product_22_Sunset_4_Color.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076956/HunterBoom/cm3fm751x00030cjv1jticujs_hcsqvb.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-924",
        name: "Carton C018 7 Inch Besi 7",
        quantity: 48,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198893/fireworks_400x400/fireworks_400x400/resized_framed_product_23_C_018_7_Inch_Besi_7.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-925",
        name: "Carton 14 Inch Besi 14",
        quantity: 33,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198993/fireworks_400x400/fireworks_400x400/resized_framed_product_24_14_Inch_Besi_14.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076966/HunterBoom/cm3fmggy000050cl2g5esh2a4_fzrrwr.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-926",
        name: "Carton 18 Inch Besi 18",
        quantity: 42,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198967/fireworks_400x400/fireworks_400x400/resized_framed_product_25_18_Inch_Besi_18.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076978/HunterBoom/cm3fmin2800060cl27xtic2ae_rhxy2g.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-927",
        name: "Carton Magic Stick (1 Minute)",
        quantity: 36,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199007/fireworks_400x400/fireworks_400x400/resized_framed_Magic_Stick_1_Minute.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076989/HunterBoom/cm3fnyuab00000ckyfbrt8wvf_cvsdwm.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-928",
        name: "Carton 15 Kali Magic 15",
        quantity: 43,
        price: 480,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198975/fireworks_400x400/fireworks_400x400/resized_framed_product_27_15_Kali_Magic_15.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076999/HunterBoom/cm3fo80ko00000cjhdgg929tm_nqqsui.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-929",
        name: "Carton 20 Kali Magic 20",
        quantity: 27,
        price: 550,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199043/fireworks_400x400/fireworks_400x400/resized_framed_product_28_20_Kali_Magic_20.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077010/HunterBoom/cm3foao1000010cl2dwks4ja7_ndcb6a.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-930",
        name: "Carton 30 Kali Magic 30",
        quantity: 38,
        price: 590,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199051/fireworks_400x400/fireworks_400x400/resized_framed_product_29_30_Kali_Magic_30.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077020/HunterBoom/cm3fobsv5000d0cmd1g4p6uer_rx8d89.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-979",
        name: "Carton Water Fall Sunset",
        quantity: 45,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199062/fireworks_400x400/fireworks_400x400/resized_framed_product_78_Water_Fall_Sunset.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077482/HunterBoom/cm4jgwftl00020ckwe3z558ku_rw2wk2.mp4",
        category: "CARTON SPARKLE & SHINE"
      },
      {
        id: "carton-982",
        name: "Carton Magic Fountain",
        quantity: 40,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198980/fireworks_400x400/fireworks_400x400/resized_framed_product_81_Magic_Fountain.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077515/HunterBoom/cm4jgx1ub00020cmkeq874t8v_rpmvpp.mp4",
        category: "CARTON SPARKLE & SHINE"
      }
    ]
  },
  {
    name: "CARTON KIDS FIRECRACKERS",
    products: [
      {
        id: "carton-931",
        name: "Carton 10 Kali Pili Rain 10",
        quantity: 44,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198952/fireworks_400x400/fireworks_400x400/resized_framed_product_30_10_Kali_Pili_Rain_10.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077031/HunterBoom/cm3foin1h000j0cmddfdtaa4z_dlvbtx.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-932",
        name: "Carton 388 Shot Machine Gun 388",
        quantity: 47,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198882/fireworks_400x400/fireworks_400x400/resized_framed_388_Shot_Machine_Gun_388.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-933",
        name: "Carton 888 Shot Machine Gun",
        quantity: 32,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198969/fireworks_400x400/fireworks_400x400/resized_framed_product_32_888_Shot_Machine_Gun_888.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-934",
        name: "Carton 688 Shot Machine Gun 688",
        quantity: 49,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198895/fireworks_400x400/fireworks_400x400/resized_framed_688_Shot_Machine_Gun_688.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-935",
        name: "Carton Blue Ocean Machine Gun",
        quantity: 37,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199025/fireworks_400x400/fireworks_400x400/resized_framed_product_34_Blue_Ocean_Machine_Gun.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077041/HunterBoom/cm4nyh3v8000c0cjj37ic01jv_dhcjl2.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-936",
        name: "Carton Mancis",
        quantity: 31,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198921/fireworks_400x400/fireworks_400x400/resized_framed_product_35_Mancis.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077051/HunterBoom/cm3h1c4ni00020cjq1xzo6888_mg9lzx.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-937",
        name: "Carton Gasing",
        quantity: 43,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198999/fireworks_400x400/fireworks_400x400/resized_framed_Gasing.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm3h504ye00000cky15mu1caf.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-938",
        name: "Carton Lotus",
        quantity: 49,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198903/fireworks_400x400/fireworks_400x400/resized_framed_product_37_Lotus.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077072/HunterBoom/cm3h53ace00020cmi1mn98djd_udrjjb.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-939",
        name: "Carton Pop Pop",
        quantity: 36,
        price: 801,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199087/fireworks_400x400/fireworks_400x400/resized_framed_product_38_Pop_Pop.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-940",
        name: "Carton Pop Pop Besar",
        quantity: 49,
        price: 1440,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198878/fireworks_400x400/fireworks_400x400/resized_framed_product_39_Pop_Pop_Besar.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-941",
        name: "Carton Cili Padi",
        quantity: 34,
        price: 192,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198995/fireworks_400x400/fireworks_400x400/resized_framed_product_40_Cili_Padi.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077082/HunterBoom/cm3h5i48h00020cl21q1c1hj3_tvjbrd.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-942",
        name: "Carton Dragon Egg",
        quantity: 36,
        price: 485,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198971/fireworks_400x400/fireworks_400x400/resized_framed_product_41_Dragon_Egg.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077094/HunterBoom/cm3h5l1ha00040cid2pkh5fg2_b8fvwl.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-943",
        name: "Carton Dragon Egg Besar",
        quantity: 27,
        price: 615,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199022/fireworks_400x400/fireworks_400x400/resized_framed_product_42_Dragon_Egg_Besar.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077105/HunterBoom/cm3h5mitf00030ci89ilr128t_spn6ne.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-944",
        name: "Carton Naga 3 Minute",
        quantity: 45,
        price: 1065,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199049/fireworks_400x400/fireworks_400x400/resized_framed_product_43_Naga_3_Minute.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077116/HunterBoom/cm3h61r5g00000cl5glngbzr5_qccqp9.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-945",
        name: "Carton Naga 3 Minute Besar",
        quantity: 33,
        price: 1035,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198884/fireworks_400x400/fireworks_400x400/resized_framed_product_44_Naga_3_Minute_Besar.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077126/HunterBoom/cm3h6944d00010cl9amkl4vj5_lmvyz7.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-946",
        name: "Carton Mancis Pop Pop",
        quantity: 37,
        price: 1728,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199033/fireworks_400x400/fireworks_400x400/resized_framed_product_45_Mancis_Pop_Pop.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077136/HunterBoom/cm4jh480a00090cl86kxk4e08_ddqqdp.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-947",
        name: "Carton Thunder Clap",
        quantity: 26,
        price: 940,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198906/fireworks_400x400/fireworks_400x400/resized_framed_product_46_Thunder_Clap.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077151/HunterBoom/cm3h762d800010cmb8vpi0nz1_pcf2fz.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-948",
        name: "Carton Thunder Clap Besar",
        quantity: 43,
        price: 2364,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198917/fireworks_400x400/fireworks_400x400/resized_framed_product_47_Thunder_Clap_Besar.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077161/HunterBoom/cm3h7a2v200010cl4bh3jbbyu_k6ikmj.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-953",
        name: "Carton 50 Shot Tikus 50",
        quantity: 47,
        price: 969,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199017/fireworks_400x400/fireworks_400x400/resized_framed_product_52_50_Shot_Tikus_50.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077213/HunterBoom/cm3h8dbwc00050cl4ez6v0k0n_kzjh8b.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-954",
        name: "Carton 100 Shot Tikus 100",
        quantity: 45,
        price: 1878,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198912/fireworks_400x400/fireworks_400x400/resized_framed_product_53_100_Shot_Tikus_100.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077224/HunterBoom/cm3h8efm200070cjrbdj7aygl_jpm9tn.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-956",
        name: "Carton Jelly Fish LINK",
        quantity: 44,
        price: 1e3,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198886/fireworks_400x400/fireworks_400x400/resized_framed_product_55_Jelly_Fish_28LINK29.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077247/HunterBoom/cm3h9lci500050cl00a4f0lo5_c88xv6.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      },
      {
        id: "carton-957",
        name: "Carton Jelly Fish SINGLE",
        quantity: 32,
        price: 685,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198997/fireworks_400x400/fireworks_400x400/resized_framed_product_56_Jelly_Fish_28SINGLE29.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077256/HunterBoom/cm3h9h3d100000cl86cku7v81_kiqkl0.mp4",
        category: "CARTON KIDS FIRECRACKERS"
      }
    ]
  },
  {
    name: "CARTON FOUNTAIN BLAST",
    products: [
      {
        id: "carton-958",
        name: "Carton Romantic Fountain Fountain V Fireworks",
        quantity: 33,
        price: 1369,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198910/fireworks_400x400/fireworks_400x400/resized_framed_product_57_Romantic_Fountain_Fountain_V_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077268/HunterBoom/cm3r0ujr500030cmjew7xet44_hzxgmd.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-959",
        name: "Carton Volcano Fireworks Fountain V Fireworks",
        quantity: 32,
        price: 1305,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199115/fireworks_400x400/fireworks_400x400/resized_framed_product_58_Volcano_Fireworks_Fountain_V_.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077279/HunterBoom/cm3r1vdh100080cl82g9w37lb_elesoe.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-962",
        name: "Carton Smoke 5 Color",
        quantity: 26,
        price: 579,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198992/fireworks_400x400/fireworks_400x400/resized_framed_product_61_Smoke_5_Color.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077311/HunterBoom/cm3fou62o00030cl1fjz21a29_e6fbfx.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-963",
        name: "Carton Pokok Berlesen Fa Cai Shu",
        quantity: 26,
        price: 562,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198963/fireworks_400x400/fireworks_400x400/resized_framed_product_62_Pokok_Berlesen_Fa_Cai_Shu.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077321/HunterBoom/cm3fpqma9000f0cl22cvnguto_fskowx.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-964",
        name: "Carton Pokok Berlesen Besar Big Fa Cai Shu",
        quantity: 28,
        price: 824,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199009/fireworks_400x400/fireworks_400x400/resized_framed_product_63_Pokok_Berlesen_Besar_Big_Fa_Cai_S.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077333/HunterBoom/cm5cjtbon000403k12i40hb2m_tzhznb.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-965",
        name: "Carton Mini Ice Cream",
        quantity: 49,
        price: 1254,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199099/fireworks_400x400/fireworks_400x400/resized_framed_product_64_Mini_Ice_Cream.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077342/HunterBoom/cm3fq24zv00060cig5djn3muq_arpgns.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-966",
        name: "Carton C026 7 Ice Cream 7",
        quantity: 39,
        price: 1209,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198987/fireworks_400x400/fireworks_400x400/resized_framed_product_65_C_026_7_Ice_Cream_7.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-967",
        name: "Carton 15 Ice Cream 15",
        quantity: 28,
        price: 2081,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198932/fireworks_400x400/fireworks_400x400/resized_framed_product_66_15_Ice_Cream_15.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077354/HunterBoom/cm3fqtqw800010cl16gec78r2_bbrxru.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-968",
        name: "Carton Peacock TIGA",
        quantity: 45,
        price: 1213,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199111/fireworks_400x400/fireworks_400x400/resized_framed_product_67_Peacock_28TIGA29.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077363/HunterBoom/cm3fqzobs00000cmh9wgh0cmd_ailyot.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-969",
        name: "Carton Peacock LIMA",
        quantity: 49,
        price: 2165,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198934/fireworks_400x400/fireworks_400x400/resized_framed_product_68_Peacock_28LIMA29.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077373/HunterBoom/cm3fr2ch100000cl7bcm5d512_gdhcvp.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-970",
        name: "Carton Tiga Segi Fountain",
        quantity: 27,
        price: 762,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199106/fireworks_400x400/fireworks_400x400/resized_framed_product_69_Tiga_Segi_Fountain.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077385/HunterBoom/cm3fsdlf900000cjt8l45gux4_qehixs.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-971",
        name: "Carton Tiga Segi Fountain Besar",
        quantity: 40,
        price: 1941,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198956/fireworks_400x400/fireworks_400x400/resized_framed_product_70_Tiga_Segi_Fountain_Besar.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077394/HunterBoom/cm4jiqbre00020cmaculigfcc_tir4jp.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-972",
        name: "Carton 12 Patten 160 Saat Fountain",
        quantity: 45,
        price: 2731,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199083/fireworks_400x400/fireworks_400x400/resized_framed_12_Patten_160_Saat_Fountain.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077404/HunterBoom/cm3fsxxwv00030clc0z503ddc_uokg9s.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-973",
        name: "Carton Colorful Fountain Box (210 Saat)",
        quantity: 45,
        price: 3412,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198891/fireworks_400x400/fireworks_400x400/resized_framed_product_72_Colorful_Fountain_Box_210_Saa.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077415/HunterBoom/cm3mn2l4b00050cled2iye3sr_wjtw7z.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-974",
        name: "Carton Gasing Fountain",
        quantity: 36,
        price: 1751,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199097/fireworks_400x400/fireworks_400x400/resized_framed_product_73_Gasing_Fountain.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077426/HunterBoom/cm3ftn73h00000cjnfviaf7ku_a8gi9n.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-975",
        name: "Carton Surprise Fountain",
        quantity: 46,
        price: 2795,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199020/fireworks_400x400/fireworks_400x400/resized_framed_product_74_Surprise_Fountain.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077435/HunterBoom/cm3m79p9j000r0cmh5jfe2vzm_o76vzf.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-976",
        name: "Carton Happy Go Lucky",
        quantity: 38,
        price: 2516,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198899/fireworks_400x400/fireworks_400x400/resized_framed_product_75_Happy_Go_Lucky.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077446/HunterBoom/cm4jiap5w00020cl79c888fe1_fpw885.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-977",
        name: "Carton Golden Harmony",
        quantity: 44,
        price: 3074,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198928/fireworks_400x400/fireworks_400x400/resized_framed_product_76_Golden_Harmony.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077458/HunterBoom/cm5ci9aze000103jtdwub6akf_ybrcs8.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-978",
        name: "Carton Taycan Sparkle",
        quantity: 35,
        price: 2920,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198960/fireworks_400x400/fireworks_400x400/resized_framed_product_77_Taycan_Sparkle.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077471/HunterBoom/cm3r0q9o500010cm7f1pu2au0_hnpfw9.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-980",
        name: "Carton Dragon Wand",
        quantity: 30,
        price: 618,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199093/fireworks_400x400/fireworks_400x400/resized_framed_product_79_Dragon_Wand.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077493/HunterBoom/cm4jgxxi000090ckxc1j497wx_w51ocw.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-981",
        name: "Carton Kipas Fountain",
        quantity: 47,
        price: 2794,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199001/fireworks_400x400/fireworks_400x400/resized_framed_product_80_Kipas_Fountain.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077503/HunterBoom/cm4jfx1d600000cl7487jh9o3_yozqmj.mp4",
        category: "CARTON FOUNTAIN BLAST"
      },
      {
        id: "carton-992",
        name: "Carton Special Fireworks #92",
        quantity: 46,
        price: 2262,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198882/fireworks_400x400/fireworks_400x400/resized_framed_388_Shot_Machine_Gun_388.jpg",
        video: "https://storage.googleapis.com/takeapp/media/cm4shk2s0000g03ju9jme3n1g.mp4",
        category: "CARTON FOUNTAIN BLAST"
      }
    ]
  },
  {
    name: "CARTON ONE SHOT BIG BLAST",
    products: [
      {
        id: "carton-983",
        name: "Carton Thunder King",
        quantity: 36,
        price: 537,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198973/fireworks_400x400/fireworks_400x400/resized_framed_product_82_Thunder_King.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077526/HunterBoom/cm3h9pkw600010claepry79lh_vunny5.mp4",
        category: "CARTON ONE SHOT BIG BLAST"
      },
      {
        id: "carton-984",
        name: "Carton Banana Kecil (0.8)",
        quantity: 31,
        price: 835,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198901/fireworks_400x400/fireworks_400x400/resized_framed_product_83_Banana_Kecil_280.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077535/HunterBoom/cm3hci5r800020cjvenpn6bgx_ldzcog.mp4",
        category: "CARTON ONE SHOT BIG BLAST"
      },
      {
        id: "carton-985",
        name: "Carton Banana Besar (1.2) (1.2)",
        quantity: 36,
        price: 1553,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199063/fireworks_400x400/fireworks_400x400/resized_framed_product_84_Banana_Besar_281.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077545/HunterBoom/cm3hcly4100000clee9ix79ap_noe5jk.mp4",
        category: "CARTON ONE SHOT BIG BLAST"
      },
      {
        id: "carton-987",
        name: "Carton Dragon Ball (1.75) 1.75",
        quantity: 42,
        price: 2223,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198914/fireworks_400x400/fireworks_400x400/resized_framed_product_86_Dragon_Ball_281.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077567/HunterBoom/cm3r0mzzo000h0cjpcs6sgax5_ox6hqc.mp4",
        category: "CARTON ONE SHOT BIG BLAST"
      }
    ]
  },
  {
    name: "CARTON ROCKET SKY SHOW",
    products: [
      {
        id: "carton-950",
        name: "Carton Moon Travel",
        quantity: 29,
        price: 664,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199071/fireworks_400x400/fireworks_400x400/resized_framed_product_49_Moon_Travel.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077183/HunterBoom/cm3h84sp300070cl9h4oie88d_ezcal8.mp4",
        category: "CARTON ROCKET SKY SHOW"
      },
      {
        id: "carton-951",
        name: "Carton Jet Flighter",
        quantity: 36,
        price: 994,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199102/fireworks_400x400/fireworks_400x400/resized_framed_product_50_Jet_Flighter.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077193/HunterBoom/cm3h899ws00010cjs8ewv7uer_us6uda.mp4",
        category: "CARTON ROCKET SKY SHOW"
      },
      {
        id: "carton-952",
        name: "Carton Big Butterfly",
        quantity: 46,
        price: 1905,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199041/fireworks_400x400/fireworks_400x400/resized_framed_product_51_Big_Butterfly.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077203/HunterBoom/cm3h8b4p200060cl6ccz27jkc_jdfrqz.mp4",
        category: "CARTON ROCKET SKY SHOW"
      },
      {
        id: "carton-960",
        name: "Carton Super Flash Rocket",
        quantity: 37,
        price: 3116,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198989/fireworks_400x400/fireworks_400x400/resized_framed_Super_Flash_Rocket.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077290/HunterBoom/cm5c2q9uj000803l7h1nt59uk_dvl6n9.mp4",
        category: "CARTON ROCKET SKY SHOW"
      },
      {
        id: "carton-961",
        name: "Carton Explosive Gold Rocket",
        quantity: 27,
        price: 1624,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199037/fireworks_400x400/fireworks_400x400/resized_framed_product_60_Explosive_Gold_Rocket.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077299/HunterBoom/cm5xf09kq000f03l8g60yfqdf_t9camd.mp4",
        category: "CARTON ROCKET SKY SHOW"
      }
    ]
  },
  {
    name: "CARTON RED DRAGON FIRECRACKERS",
    products: [
      {
        id: "carton-902",
        name: "Carton 8 Feet (BOM)",
        quantity: 38,
        price: 297,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198958/fireworks_400x400/fireworks_400x400/resized_framed_8_Feet_BOM.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-903",
        name: "Carton 8 Feet 1.0 Super Red 1.0",
        quantity: 45,
        price: 692,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199029/fireworks_400x400/fireworks_400x400/resized_framed_product_2_8_Feet_1.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076882/HunterBoom/cm3fcqwsm00080dkxfqkt9q7h_jhwrtd.mp4",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-904",
        name: "Carton 8 Feet 1.0 Super Rose 1.0",
        quantity: 34,
        price: 448,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199085/fireworks_400x400/fireworks_400x400/resized_framed_product_3_8_Feet_1.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-905",
        name: "Carton 8 Feet 1.0 Super Gold 1.0",
        quantity: 30,
        price: 426,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199075/fireworks_400x400/fireworks_400x400/resized_framed_product_4_8_Feet_1.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-906",
        name: "Carton 12 Feet 1.2 Super Gold (1.2)",
        quantity: 40,
        price: 1102,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199003/fireworks_400x400/fireworks_400x400/resized_framed_product_5_12_Feet_1.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-907",
        name: "Carton 18 Feet 1.2 Super Red 18 (1.2)",
        quantity: 28,
        price: 1005,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199060/fireworks_400x400/fireworks_400x400/resized_framed_product_6_18_Feet_1.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-908",
        name: "Carton 18 Feet 1.2 Super Rose 18 (1.2)",
        quantity: 28,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198978/fireworks_400x400/fireworks_400x400/resized_framed_product_7_18_Feet_1.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-909",
        name: "Carton 18 Feet 1.2 Super Gold 18 (1.2)",
        quantity: 30,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199089/fireworks_400x400/fireworks_400x400/resized_framed_product_8_18_Feet_1.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-910",
        name: "Carton 28 Feet Super Gold Gift Box 28",
        quantity: 29,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198919/fireworks_400x400/fireworks_400x400/resized_framed_product_9_28_Feet_Super_Gold_Gift_Box_28.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076893/HunterBoom/cm3fcklnr00020cmk4ox5hesv_c4wd5e.mp4",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-911",
        name: "Carton 38 Feet Red",
        quantity: 35,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198946/fireworks_400x400/fireworks_400x400/resized_framed_product_10_B_006_R_38_Feet_Super_Red_38.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-912",
        name: "Carton 38 Feet Rose",
        quantity: 46,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199118/fireworks_400x400/fireworks_400x400/resized_framed_product_11_B_006_P_38_Feet_Rose_38.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-913",
        name: "Carton 38 Feet Gold",
        quantity: 34,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198924/fireworks_400x400/fireworks_400x400/resized_framed_product_12_B_006_G_38_Feet_Gold_38.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-914",
        name: "Carton 66 Feet Mix Super Red Rose",
        quantity: 45,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199045/fireworks_400x400/fireworks_400x400/resized_framed_product_17_88_Feet_Mix_Super_Red_Rose_88.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-915",
        name: "Carton 88 Feet Red",
        quantity: 42,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199024/fireworks_400x400/fireworks_400x400/resized_framed_product_14_88_Feet_Super_Red_88.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-916",
        name: "Carton 88 Feet Rose",
        quantity: 47,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198880/fireworks_400x400/fireworks_400x400/resized_framed_product_15_88_Feet_Super_Rose_88.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-917",
        name: "Carton 88 Feet Gold",
        quantity: 26,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199077/fireworks_400x400/fireworks_400x400/resized_framed_product_16_88_Feet_Super_Gold_88.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "CARTON RED DRAGON FIRECRACKERS"
      },
      {
        id: "carton-918",
        name: "Carton 88 Feet Mix Super Red Rose",
        quantity: 29,
        price: 450,
        image: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199045/fireworks_400x400/fireworks_400x400/resized_framed_product_17_88_Feet_Mix_Super_Red_Rose_88.jpg",
        video: "https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076903/HunterBoom/cm3fek40900040dmk0yynbalc_ynqvah.mp4",
        category: "CARTON RED DRAGON FIRECRACKERS"
      }
    ]
  }
];
const CartonsSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  allProductsCount
}) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("div", { className: "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 mb-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          placeholder: "Cari produk carton...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "pl-12 h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-yellow-500/20 bg-white"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-80", children: /* @__PURE__ */ jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [
      /* @__PURE__ */ jsxs(SelectTrigger, { className: "h-14 border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50 rounded-xl text-lg focus:border-yellow-500 focus:ring-yellow-500/20", children: [
        /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih kategori" }),
        /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 opacity-50" })
      ] }),
      /* @__PURE__ */ jsxs(SelectContent, { className: "bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs(
          SelectItem,
          {
            value: "All",
            className: "hover:bg-yellow-50 focus:bg-yellow-50 text-gray-900 py-3 px-4 text-base",
            children: [
              "Semua Kategori (",
              allProductsCount,
              ")"
            ]
          }
        ),
        cartonCategories.map((category) => /* @__PURE__ */ jsxs(
          SelectItem,
          {
            value: category.name,
            className: "hover:bg-yellow-50 focus:bg-yellow-50 text-gray-900 py-3 px-4 text-base",
            children: [
              category.name,
              " (",
              category.products.length,
              ")"
            ]
          },
          category.name
        ))
      ] })
    ] }) })
  ] }) });
};
const CartonProductCard = ({ product, onAddToCart, index }) => {
  const { t } = useLanguage();
  const { items, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = (cartItem == null ? void 0 : cartItem.quantity) || 0;
  const handleIncrement = () => {
    if (quantity === 0) {
      onAddToCart();
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-lg border-4 border-yellow-400 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-yellow-500 relative", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mr-4", children: [
      /* @__PURE__ */ jsxs(Dialog, { children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-xl overflow-hidden bg-white border-2 border-gray-200 shadow-sm cursor-pointer hover:border-gray-300 transition-colors mb-2", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: product.image,
            alt: product.name,
            className: "w-full h-full object-cover no-select no-drag no-context",
            onContextMenu: (e) => e.preventDefault(),
            onDragStart: (e) => e.preventDefault()
          }
        ) }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[95vw] sm:max-w-2xl w-full", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg font-bold text-left", children: product.name }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: product.image,
              alt: product.name,
              className: "w-full h-auto rounded-lg no-select no-drag no-context",
              onContextMenu: (e) => e.preventDefault(),
              onDragStart: (e) => e.preventDefault()
            }
          ) })
        ] })
      ] }),
      product.video && /* @__PURE__ */ jsxs(Dialog, { children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "text-xs bg-yellow-100 text-slate-700 px-2 py-1 rounded-full font-medium hover:bg-yellow-200 transition-colors flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Play, { className: "h-3 w-3" }),
          "Video"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg sm:text-xl font-bold text-left", children: product.name }) }),
          /* @__PURE__ */ jsx("div", { className: "aspect-video w-full", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              src: product.video.replace("watch?v=", "embed/"),
              title: product.name,
              className: "w-full h-full rounded-lg",
              allowFullScreen: true,
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-1 leading-tight", children: product.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-2", children: [
        "Kuantiti: ",
        product.quantity,
        " pcs"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-gray-900", children: [
          "RM ",
          product.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleDecrement,
              disabled: quantity === 0,
              "aria-label": "Kurangkan kuantiti",
              className: "w-8 h-8 bg-slate-600 text-yellow-100 rounded-lg flex items-center justify-center font-bold text-sm disabled:opacity-40 hover:bg-slate-700 transition-colors",
              children: "-"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold min-w-[2rem] text-center text-gray-900", children: quantity }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleIncrement,
              "aria-label": "Tambah kuantiti",
              className: "w-8 h-8 bg-slate-600 text-yellow-100 rounded-lg flex items-center justify-center font-bold text-sm hover:bg-slate-700 transition-colors",
              children: "+"
            }
          )
        ] })
      ] })
    ] })
  ] }) }) });
};
const CartonsByCategory = ({ categories: categories2, searchTerm, onAddToCart }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx(Fragment, { children: categories2.map((category) => /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent", children: category.name }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full border border-gray-200", children: [
        category.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length,
        " produk"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: category.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product, index) => /* @__PURE__ */ jsx(
      CartonProductCard,
      {
        product,
        onAddToCart: () => onAddToCart(product),
        index: index + 1
      },
      product.id
    )) })
  ] }, category.name)) });
};
const FilteredCartons = ({ filteredProducts, selectedCategory, onAddToCart }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-gray-900 mb-10 bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent", children: [
      selectedCategory,
      " (",
      filteredProducts.length,
      " produk)"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filteredProducts.map((product, index) => /* @__PURE__ */ jsx(
      CartonProductCard,
      {
        product,
        onAddToCart: () => onAddToCart(product),
        index: index + 1
      },
      product.id
    )) })
  ] });
};
const InlineCartCheckoutCarton = () => {
  var _a;
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast: toast2 } = useToast();
  const [checkoutData, setCheckoutData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("fireworksCheckoutDataCarton");
      return savedData ? JSON.parse(savedData) : {
        name: "",
        phone: "",
        email: "",
        address: "",
        postcode: "",
        state: "",
        district: ""
      };
    }
    return {
      name: "",
      phone: "",
      email: "",
      address: "",
      postcode: "",
      state: "",
      district: ""
    };
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fireworksCheckoutDataCarton", JSON.stringify(checkoutData));
    }
  }, [checkoutData]);
  const malaysianStates = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Selangor",
    "Terengganu"
  ];
  const stateDistricts = {
    "Johor": ["Batu Pahat", "Johor Bahru", "Kluang", "Kota Tinggi", "Kulai", "Mersing", "Muar", "Pontian", "Segamat", "Tangkak"],
    "Kedah": ["Baling", "Bandar Baharu", "Kota Setar", "Kuala Muda", "Kubang Pasu", "Kulim", "Langkawi", "Padang Terap", "Pendang", "Pokok Sena", "Sik", "Yan"],
    "Kelantan": ["Bachok", "Gua Musang", "Jeli", "Kota Bharu", "Kuala Krai", "Machang", "Pasir Mas", "Pasir Puteh", "Tanah Merah", "Tumpat"],
    "Kuala Lumpur": ["Bukit Bintang", "Cheras", "Kepong", "Lembah Pantai", "Seputeh", "Titiwangsa", "Wangsa Maju"],
    "Labuan": ["Labuan"],
    "Melaka": ["Alor Gajah", "Jasin", "Melaka Tengah"],
    "Negeri Sembilan": ["Jelebu", "Jempol", "Kuala Pilah", "Port Dickson", "Rembau", "Seremban", "Tampin"],
    "Pahang": ["Bentong", "Bera", "Cameron Highlands", "Jerantut", "Kuantan", "Lipis", "Maran", "Pekan", "Raub", "Rompin", "Temerloh"],
    "Penang": ["Barat Daya", "Seberang Perai Selatan", "Seberang Perai Tengah", "Seberang Perai Utara", "Timur Laut"],
    "Perak": ["Batang Padang", "Hilir Perak", "Hulu Perak", "Kampar", "Kinta", "Kuala Kangsar", "Larut, Matang dan Selama", "Manjung", "Muallim", "Perak Tengah"],
    "Perlis": ["Perlis"],
    "Putrajaya": ["Putrajaya"],
    "Selangor": ["Gombak", "Hulu Langat", "Hulu Selangor", "Klang", "Kuala Langat", "Kuala Selangor", "Petaling", "Sabak Bernam", "Sepang"],
    "Terengganu": ["Besut", "Dungun", "Hulu Terengganu", "Kemaman", "Kuala Nerus", "Kuala Terengganu", "Marang", "Setiu"]
  };
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };
  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      toast2({
        title: "Cart is empty",
        description: "Add some cartons to your cart first!",
        variant: "destructive"
      });
      return;
    }
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.postcode || !checkoutData.state || !checkoutData.district) {
      toast2({
        title: "Missing information",
        description: "Please fill in all required fields (Name, Phone, Address, Postcode, State, District)",
        variant: "destructive"
      });
      return;
    }
    const orderDetails = items.map(
      (item) => `${item.name} (${item.type}) x${item.quantity} boxes = RM ${(item.price * item.quantity).toFixed(2)}`
    ).join("\n");
    const message = `Hi! I'd like to place a CARTON order:

${orderDetails}

Total: RM ${getTotalPrice().toFixed(2)}

Customer Details:
Name: ${checkoutData.name}
Phone: ${checkoutData.phone}
Email: ${checkoutData.email || "Not provided"}
Address: ${checkoutData.address}
Postcode: ${checkoutData.postcode}
State: ${checkoutData.state}
District: ${checkoutData.district}

Note: This is a CARTON/BOX order for wholesale quantities.`;
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white border-4 border-yellow-400 rounded-2xl p-8 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-black mb-4", children: "📦 Your Carton Cart" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Add some carton boxes to see them here!" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border-4 border-yellow-400 rounded-2xl p-6 shadow-lg", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-black mb-6 text-center", children: "📦 Complete Your Carton Order" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-black", children: [
            "Carton Items (",
            getTotalItems(),
            " boxes)"
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: clearCart,
              variant: "outline",
              size: "sm",
              className: "border-red-500 text-red-600 hover:bg-red-500 hover:text-white",
              children: "Clear Cart"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-80 overflow-y-auto", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-black text-sm", children: item.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 capitalize", children: [
                item.type,
                " - Per Box"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "font-bold text-black text-sm", children: [
                "RM ",
                item.price,
                "/box"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleQuantityChange(item.id, item.quantity - 1),
                  className: "h-7 w-7 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500",
                  children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "w-6 text-center font-semibold text-sm", children: item.quantity }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleQuantityChange(item.id, item.quantity + 1),
                  className: "h-7 w-7 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500",
                  children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => removeFromCart(item.id),
                className: "border-red-500 text-red-600 hover:bg-red-500 hover:text-white h-7 w-7 p-0 ml-2",
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-right mt-2", children: /* @__PURE__ */ jsxs("p", { className: "font-bold text-black text-sm", children: [
            "RM ",
            (item.price * item.quantity).toFixed(2),
            " (",
            item.quantity,
            " boxes)"
          ] }) })
        ] }, item.id)) })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border-2 border-black rounded-lg p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-black mb-4", children: "Carton Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
            /* @__PURE__ */ jsx("span", { children: "Total Boxes:" }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
              getTotalItems(),
              " boxes"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
            /* @__PURE__ */ jsx("span", { children: "Subtotal:" }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
              "RM ",
              getTotalPrice().toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-t border-gray-200", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: "Total:" }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-red-600", children: [
              "RM ",
              getTotalPrice().toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Full Name *",
              value: checkoutData.name,
              onChange: (e) => setCheckoutData({ ...checkoutData, name: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Phone Number *",
              value: checkoutData.phone,
              onChange: (e) => setCheckoutData({ ...checkoutData, phone: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Email Address",
              value: checkoutData.email,
              onChange: (e) => setCheckoutData({ ...checkoutData, email: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Address *",
              value: checkoutData.address,
              onChange: (e) => setCheckoutData({ ...checkoutData, address: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Postcode *",
              value: checkoutData.postcode,
              onChange: (e) => setCheckoutData({ ...checkoutData, postcode: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsxs(Select, { onValueChange: (value) => setCheckoutData({ ...checkoutData, state: value, district: "" }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "border-2 border-gray-300 focus:border-black", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select State *" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: malaysianStates.map((state) => /* @__PURE__ */ jsx(SelectItem, { value: state, children: state }, state)) })
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              onValueChange: (value) => setCheckoutData({ ...checkoutData, district: value }),
              disabled: !checkoutData.state,
              value: checkoutData.district,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "border-2 border-gray-300 focus:border-black", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: checkoutData.state ? "Select City/District *" : "Please select state first" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: checkoutData.state && ((_a = stateDistricts[checkoutData.state]) == null ? void 0 : _a.map((district) => /* @__PURE__ */ jsx(SelectItem, { value: district, children: district }, district))) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleWhatsAppOrder,
            disabled: !checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.postcode || !checkoutData.state || !checkoutData.district,
            className: "w-full bg-slate-500 text-white hover:bg-slate-600 disabled:bg-gray-400 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
              "Order Cartons via WhatsApp"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4 text-center", children: "* Required fields: Name, Phone, Address, Postcode, State, District. Carton orders are sold by boxes for wholesale quantities." })
      ] }) })
    ] })
  ] });
};
const Cartons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCartFooter, setShowCartFooter] = useState(true);
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const checkoutRef = useRef(null);
  const allProducts = cartonCategories.flatMap((category) => category.products);
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: "carton"
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (checkoutRef.current) {
        const checkoutTop = checkoutRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setShowCartFooter(checkoutTop > windowHeight * 0.5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-12 left-12 text-4xl opacity-20 animate-pulse", children: "📦" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 right-16 text-3xl opacity-15 animate-bounce", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-24 left-20 text-2xl opacity-10", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-40 right-24 text-3xl opacity-15", children: "🎆" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-8 h-full", children: Array.from({ length: 48 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border-2 border-slate-400 transform rotate-12 w-6 h-6" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "📦🌙" }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-6 drop-shadow-sm", children: "Produk Carton celebrasi" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed", children: "Koleksi borong mercun celebrasi terbaik - beli carton jimat lebih! 🎉" })
      ] }),
      /* @__PURE__ */ jsx(
        CartonsSearch,
        {
          searchTerm,
          setSearchTerm,
          selectedCategory,
          setSelectedCategory,
          allProductsCount: allProducts.length
        }
      ),
      selectedCategory === "All" ? /* @__PURE__ */ jsx(
        CartonsByCategory,
        {
          categories: cartonCategories,
          searchTerm,
          onAddToCart: handleAddToCart
        }
      ) : /* @__PURE__ */ jsx(
        FilteredCartons,
        {
          filteredProducts,
          selectedCategory,
          onAddToCart: handleAddToCart
        }
      ),
      filteredProducts.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600", children: "Tiada produk carton dijumpai" }) }),
      /* @__PURE__ */ jsx("div", { ref: checkoutRef, className: "mt-16", "data-checkout-section": true, children: /* @__PURE__ */ jsx(InlineCartCheckoutCarton, {}) }),
      /* @__PURE__ */ jsx("div", { className: "h-16" }),
      showCartFooter && /* @__PURE__ */ jsx(CartSummaryFooter, {})
    ] })
  ] });
};
const packages = [
  {
    id: "wedding-package",
    name: "Wedding Package",
    price: 899,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600",
    description: "Perfect for your special day with romantic aerial displays and elegant fountain fireworks.",
    fireworks: [
      "Heart-shaped aerial fireworks × 6",
      "Golden fountain displays × 4",
      "Wedding sparklers × 20",
      "Romantic color wheels × 2",
      "Grand finale aerial × 1"
    ]
  },
  {
    id: "hari-raya-package",
    name: "Hari Berlesen Package",
    price: 649,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600",
    description: "Celebrate Hari Berlesen with traditional colors and festive displays for the whole family.",
    fireworks: [
      "Green & gold aerial displays × 8",
      "Family-safe fountain × 6",
      "Colorful wheels × 4",
      "Kids sparklers × 30",
      "Traditional firecrackers × 10"
    ]
  },
  {
    id: "birthday-package",
    name: "Birthday Package",
    price: 399,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600",
    description: "Make birthdays extra special with colorful and fun fireworks safe for all ages.",
    fireworks: [
      "Birthday cake fountains × 4",
      "Rainbow aerial displays × 6",
      "Number sparklers × 1 set",
      "Fun wheels × 3",
      "Safe indoor sparklers × 20"
    ]
  },
  {
    id: "new-year-package",
    name: "New Year Package",
    price: 1299,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600",
    description: "Ring in the new year with spectacular displays and countdown fireworks.",
    fireworks: [
      "Countdown timer display × 1",
      "Midnight aerial show × 12",
      "Golden shower fountains × 8",
      "Celebration wheels × 6",
      "Grand finale package × 1"
    ]
  },
  {
    id: "festival-package",
    name: "Festival Package",
    price: 799,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=600",
    description: "Perfect for cultural festivals, community events, and large celebrations.",
    fireworks: [
      "Multi-color aerial displays × 10",
      "Community fountain shows × 6",
      "Festival wheels × 4",
      "Group sparklers × 50",
      "Cultural firecrackers × 15"
    ]
  }
];
const Packages = () => {
  const { addToCart } = useCart();
  const handleAddToCart = (pkg) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      type: "package"
    });
  };
  const handleWhatsAppOrder = (pkg) => {
    const message = `Hi! I'm interested in the ${pkg.name} (RM ${pkg.price}). Can you help me with the order?`;
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-4xl opacity-20 animate-pulse", children: "🎁" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 right-12 text-3xl opacity-15 animate-bounce", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-16 text-2xl opacity-10", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 text-3xl opacity-15", children: "🎉" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-10 gap-8 h-full", children: Array.from({ length: 40 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border-2 border-slate-400 rounded-lg w-8 h-8" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "🎁🌙" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm", children: "Pakej Berlesen Istimewa" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-700 max-w-3xl mx-auto", children: "Pakej mercun siap sedia untuk sambutan Berlesen & majlis khas. Setiap pakej dipilih khas untuk atmosphere yang sempurna! 🎆" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: packages.map((pkg) => /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-video bg-gray-100 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: pkg.image,
            alt: pkg.name,
            className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-slate-800", children: pkg.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold bg-gradient-to-r from-yellow-600 to-slate-700 bg-clip-text text-transparent", children: [
              "RM ",
              pkg.price
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-6", children: pkg.description }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-slate-800 mb-3", children: "Apa Yang Termasuk:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: pkg.fireworks.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start text-slate-700", children: [
              /* @__PURE__ */ jsx("span", { className: "text-yellow-600 mr-2", children: "✨" }),
              item
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => handleAddToCart(pkg),
                className: "flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 hover:from-slate-700 hover:to-slate-800 shadow-lg",
                children: [
                  /* @__PURE__ */ jsx(ShoppingCart, { className: "mr-2 h-4 w-4" }),
                  "Masuk Troli"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => handleWhatsAppOrder(pkg),
                variant: "outline",
                className: "flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-slate-800 shadow-lg",
                children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                  "Order WhatsApp"
                ]
              }
            )
          ] })
        ] })
      ] }, pkg.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-gradient-to-br from-slate-700 to-yellow-600 text-white rounded-xl p-8 text-center shadow-2xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 text-2xl opacity-30", children: "🌙" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-2xl opacity-30", children: "✨" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-6 text-xl opacity-20", children: "🎆" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-6 text-xl opacity-20", children: "🎉" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "🎁" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", children: "Nak Pakej Khas?" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-yellow-100 mb-6 max-w-2xl mx-auto", children: "Tak jumpa yang sesuai? Kami boleh buat pakej mercun custom untuk majlis & budget awak! 🌟" }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => {
                const message = "Hi! Nak tanya pasal pakej mercun custom untuk majlis saya.";
                const whatsappNumber = "+60137340415";
                const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
                window.open(url, "_blank");
              },
              className: "bg-yellow-500 text-slate-800 hover:bg-yellow-400 shadow-xl",
              size: "lg",
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-5 w-5" }),
                "WhatsApp Untuk Pakej Custom"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
};
const PermitGuide = () => {
  const handleWhatsAppConsultation = () => {
    const message = "Hi! I need help with fireworks permit application. Can you provide consultation?";
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-4xl opacity-20 animate-pulse", children: "📄" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 right-12 text-3xl opacity-15 animate-bounce", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-16 text-2xl opacity-10", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 text-3xl opacity-15", children: "🔍" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-10 gap-8 h-full", children: Array.from({ length: 40 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-slate-400 w-8 h-8" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "📄🌙" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm", children: "Panduan Permit Bunga Api" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-700 max-w-3xl mx-auto", children: "Nak main mercun celebrasi dengan selamat & sah? Ikut panduan ni step by step! 🎆" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-red-50 to-yellow-50 border-2 border-red-300 rounded-xl p-6 mb-8 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-red-800 mb-2", children: "Penting Untuk Diingat!" }),
          /* @__PURE__ */ jsx("p", { className: "text-red-700", children: "Main mercun tanpa permit adalah salah di sisi undang-undang Malaysia. Boleh kena denda atau penjara tau! Pastikan ada permit sebelum beli atau main mercun." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-8 mb-8 shadow-xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-slate-800 mb-8 text-center", children: "Cara Mohon Permit Step-by-Step" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg", children: "1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Check Kelayakan" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-slate-700 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "✨ Warganegara Malaysia atau penduduk tetap" }),
                /* @__PURE__ */ jsx("li", { children: "✨ Umur minimum: 21 tahun" }),
                /* @__PURE__ */ jsx("li", { children: "✨ Tiada rekod jenayah berkaitan letupan" }),
                /* @__PURE__ */ jsx("li", { children: "✨ Ada sebab munasabah (sambutan celebrasi, majlis, etc.)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-slate-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg", children: "2" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Sediakan Dokumen" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-slate-700 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "🌙 Salinan IC (depan & belakang)" }),
                /* @__PURE__ */ jsx("li", { children: "🌙 Borang permohonan lengkap (Borang PDRM)" }),
                /* @__PURE__ */ jsx("li", { children: "🌙 Detail majlis & peta lokasi" }),
                /* @__PURE__ */ jsx("li", { children: "🌙 Pelan keselamatan" }),
                /* @__PURE__ */ jsx("li", { children: "🌙 Bukti insurans (kalau perlu)" }),
                /* @__PURE__ */ jsx("li", { children: "🌙 Resit bayaran yuran permohonan" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-slate-600 to-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg", children: "3" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Hantar Permohonan" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-slate-700 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "🚓 Pergi balai polis (PDRM) terdekat" }),
                /* @__PURE__ */ jsx("li", { children: "🚓 Serahkan semua dokumen" }),
                /* @__PURE__ */ jsx("li", { children: "🚓 Bayar yuran (RM 50 - RM 200)" }),
                /* @__PURE__ */ jsx("li", { children: "🚓 Ambil resit pengakuan" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-yellow-600 to-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg", children: "4" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Proses & Kelulusan" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-slate-700 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "✅ Masa proses: 7-14 hari bekerja" }),
                /* @__PURE__ */ jsx("li", { children: "✅ Polis mungkin buat pemeriksaan lokasi" }),
                /* @__PURE__ */ jsx("li", { children: "✅ Ada syarat-syarat kelulusan" }),
                /* @__PURE__ */ jsx("li", { children: "✅ Ambil permit bila dah lulus" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 shadow-lg", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-slate-800 mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "mr-3 h-6 w-6 text-slate-600" }),
            "Syarat Keselamatan"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-slate-700", children: [
            /* @__PURE__ */ jsx("li", { children: "🎆 Minimum 50m dari bangunan" }),
            /* @__PURE__ */ jsx("li", { children: "🎆 Ada alat pemadam api" }),
            /* @__PURE__ */ jsx("li", { children: "🎆 Ada pengendali terlatih" }),
            /* @__PURE__ */ jsx("li", { children: "🎆 Laluan kecemasan jelas" }),
            /* @__PURE__ */ jsx("li", { children: "🎆 Check cuaca dulu" }),
            /* @__PURE__ */ jsx("li", { children: "🎆 Kawalan orang ramai" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-200 rounded-xl p-6 shadow-lg", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-slate-800 mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "mr-3 h-6 w-6 text-red-600" }),
            "Kawasan Larangan"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-slate-700", children: [
            /* @__PURE__ */ jsx("li", { children: "⛔ Dekat lapangan terbang" }),
            /* @__PURE__ */ jsx("li", { children: "⛔ Hospital & klinik" }),
            /* @__PURE__ */ jsx("li", { children: "⛔ Sekolah & institusi pendidikan" }),
            /* @__PURE__ */ jsx("li", { children: "⛔ Stesen minyak & gas" }),
            /* @__PURE__ */ jsx("li", { children: "⛔ Hutan simpan & taman" }),
            /* @__PURE__ */ jsx("li", { children: "⛔ Kawasan perumahan (tanpa kebenaran)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-slate-100 to-yellow-100 rounded-xl p-8 text-center shadow-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "🤝" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-slate-800 mb-6", children: "Nak Bantuan Mohon Permit?" }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleWhatsAppConsultation,
            className: "bg-gradient-to-r from-slate-500 to-slate-600 text-yellow-100 hover:from-slate-600 hover:to-slate-700 shadow-lg",
            size: "lg",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-5 w-5" }),
              "WhatsApp Konsultasi"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-700 max-w-2xl mx-auto", children: "Team kami ada pengalaman bantu customer buat permohonan permit. WhatsApp je untuk panduan lengkap supaya permohonan lulus dengan mudah!" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gradient-to-br from-yellow-50 to-slate-50 border-2 border-slate-300 rounded-xl p-6 shadow-lg", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-4", children: "Info Tambahan" }),
        /* @__PURE__ */ jsxs("div", { className: "text-slate-700 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { children: "🌙 Permit untuk satu majlis sahaja, tak boleh transfer" }),
          /* @__PURE__ */ jsx("p", { children: "🌙 Mercun tertentu perlu lesen khas" }),
          /* @__PURE__ */ jsx("p", { children: "🌙 Display profesional perlu pyrotechnician bertauliah" }),
          /* @__PURE__ */ jsx("p", { children: "🌙 Insurans mungkin wajib untuk majlis besar" }),
          /* @__PURE__ */ jsx("p", { children: "🌙 Mungkin perlu kelulusan majlis tempatan juga" })
        ] })
      ] })
    ] })
  ] });
};
const SafetyGuide = () => {
  const { t } = useLanguage();
  const safetyTips = [
    {
      icon: Shield,
      title: t("safety.tip1.title"),
      description: t("safety.tip1.desc")
    },
    {
      icon: Eye,
      title: t("safety.tip2.title"),
      description: t("safety.tip2.desc")
    },
    {
      icon: Users,
      title: t("safety.tip3.title"),
      description: t("safety.tip3.desc")
    },
    {
      icon: Flame,
      title: t("safety.tip4.title"),
      description: t("safety.tip4.desc")
    }
  ];
  const beforeSteps = [
    t("safety.before.step1"),
    t("safety.before.step2"),
    t("safety.before.step3"),
    t("safety.before.step4"),
    t("safety.before.step5")
  ];
  const duringSteps = [
    t("safety.during.step1"),
    t("safety.during.step2"),
    t("safety.during.step3"),
    t("safety.during.step4"),
    t("safety.during.step5")
  ];
  const afterSteps = [
    t("safety.after.step1"),
    t("safety.after.step2"),
    t("safety.after.step3")
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-4xl opacity-20 animate-pulse", children: "🛫" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 right-12 text-3xl opacity-15 animate-bounce", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-16 text-2xl opacity-10", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 text-3xl opacity-15", children: "🔥" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-6 h-full", children: Array.from({ length: 48 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-slate-400 rounded-full w-6 h-6 transform rotate-45" }, i)) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative bg-gradient-to-br from-slate-800 to-yellow-700 text-white py-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "bg-yellow-400 text-slate-800 p-4 rounded-full shadow-2xl", children: /* @__PURE__ */ jsx(Shield, { className: "h-16 w-16" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4", children: "🛫🌙" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-bold mb-4 text-yellow-100 drop-shadow-lg", children: t("safety.hero.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-yellow-50 max-w-3xl mx-auto drop-shadow", children: t("safety.hero.subtitle") })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative py-8 bg-gradient-to-r from-red-50 to-yellow-50 border-l-4 border-red-500 shadow-lg mx-4 lg:mx-auto lg:max-w-7xl mt-8 rounded-r-xl", children: /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "h-8 w-8 text-red-500 flex-shrink-0 mt-1 animate-pulse" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-red-800 mb-2", children: t("safety.warning.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-red-700 text-lg", children: t("safety.warning.description") })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "💡" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4", children: t("safety.tips.title") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: safetyTips.map((tip, index) => /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border-2 border-slate-200 hover:shadow-2xl hover:border-yellow-400 transition-all hover:-translate-y-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-100 p-3 rounded-full shadow-lg", children: /* @__PURE__ */ jsx(tip.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: tip.title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: tip.description })
        ] })
      ] }) }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "📝" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4", children: t("safety.steps.title") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-300 shadow-lg", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-slate-800 mb-4 text-center", children: t("safety.before.title") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: beforeSteps.map((step, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-700", children: step })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-300 shadow-lg", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-yellow-800 mb-4 text-center", children: t("safety.during.title") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: duringSteps.map((step, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-yellow-700", children: step })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-slate-50 to-yellow-50 p-6 rounded-xl border-2 border-slate-300 shadow-lg", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-slate-800 mb-4 text-center", children: t("safety.after.title") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: afterSteps.map((step, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-700", children: step })
          ] }, index)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-8 gap-4 h-full", children: Array.from({ length: 32 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-white rounded-full w-8 h-8" }, i)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white text-red-600 p-4 rounded-full inline-block mb-6 shadow-2xl", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-16 w-16" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold mb-4 text-yellow-100 drop-shadow-lg", children: t("safety.emergency.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-6 text-yellow-50", children: t("safety.emergency.description") }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-yellow-50 text-black p-6 rounded-xl shadow-2xl", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-red-800", children: t("safety.emergency.numbers") }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-lg text-red-700", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "999" }),
                " - ",
                t("safety.emergency.fire")
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "999" }),
                " - ",
                t("safety.emergency.police")
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "999" }),
                " - ",
                t("safety.emergency.ambulance")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-yellow-50 to-slate-50 text-black p-6 rounded-xl shadow-2xl", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-slate-800", children: "Hubungi Kami / Contact Us" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: /* @__PURE__ */ jsx("strong", { children: "+60 13-734 0415" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Untuk bantuan segera / For immediate assistance" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const testimonials = [
  {
    id: 1,
    name: "Ahmad Rahman",
    event: "Majlis Tunang celebrasi",
    rating: 5,
    text: "Mercun untuk majlis tunang masa celebrasi memang terbaik! Team Mercuncelebrasi tolong settle permit semua. Tetamu puji habis display mercun malam tu!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    event: "Sambutan Hari celebrasi",
    rating: 5,
    text: "Perfect untuk sambutan celebrasi! Pakej keluarga memang best, selamat dan semua suka. Anak-anak excited gila tengok bunga api. Highly recommended!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
  },
  {
    id: 3,
    name: "David Lim",
    event: "Open House celebrasi Company",
    rating: 5,
    text: "Service memang professional! Diorang handle semua permit untuk open house celebrasi company. Display mercun malam tu memang spectacular!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
  },
  {
    id: 4,
    name: "Priya Sharma",
    event: "Majlis Doa Selamat celebrasi",
    rating: 5,
    text: "Buat surprise untuk family masa majlis doa selamat celebrasi. Pakej yang ambil memang cantik - warna-warni dan selamat. Terima kasih Mercuncelebrasi!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150"
  },
  {
    id: 5,
    name: "Raj Kumar",
    event: "Majlis Reunion celebrasi",
    rating: 5,
    text: "Kualiti mercun memang top! WhatsApp support dia laju je reply. Next celebrasi confirm order lagi untuk reunion family!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
  },
  {
    id: 6,
    name: "Lisa Wong",
    event: "Majlis Akad Nikah Syawal",
    rating: 5,
    text: "Surprise untuk majlis akad nikah bulan Syawal dengan mercun. Display romantik sangat! Senang je nak order dan team bantu untuk permit.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
  }
];
const Testimonials = () => {
  const renderStars = (rating) => {
    return /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
      Star,
      {
        className: `h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`
      },
      i
    )) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-4xl opacity-20 animate-pulse", children: "🎆" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 right-12 text-3xl opacity-15 animate-bounce", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-16 text-2xl opacity-10", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 text-3xl opacity-15", children: "⭐" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-10 gap-8 h-full", children: Array.from({ length: 40 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-slate-400 rounded-lg w-8 h-8 transform rotate-12" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "🌟🌙" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm", children: "Testimoni Pelanggan celebrasi" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-700 max-w-3xl mx-auto", children: "Dengar sendiri cerita best dari customer yang dah meriah celebrasi dengan mercun kami! 🎉" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border-2 border-slate-200 shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-2", children: "500+" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-700", children: "Pelanggan Gembira" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl border-2 border-yellow-200 shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold bg-gradient-to-r from-yellow-600 to-slate-700 bg-clip-text text-transparent mb-2", children: "1000+" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-700", children: "Majlis celebrasi Meriah" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border-2 border-slate-200 shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-2", children: "4.9/5" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-700", children: "Rating Terbaik" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: testimonials.map((testimonial) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-slate-100 to-yellow-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(Quote, { className: "h-8 w-8 text-slate-600" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: renderStars(testimonial.rating) }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-700 text-center mb-6 italic", children: [
              '"',
              testimonial.text,
              '"'
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: testimonial.image,
                  alt: testimonial.name,
                  className: "w-12 h-12 rounded-full object-cover mr-4"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-slate-800", children: testimonial.name }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-600", children: testimonial.event })
              ] })
            ] })
          ]
        },
        testimonial.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-gradient-to-br from-slate-700 to-yellow-600 text-white rounded-xl p-8 text-center shadow-2xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 text-2xl opacity-30", children: "🌙" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-2xl opacity-30", children: "✨" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-6 text-xl opacity-20", children: "🎆" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-6 text-xl opacity-20", children: "🎉" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "🎆" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4 text-yellow-100", children: "Nak celebrasi Meriah Macam Ni Juga?" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-yellow-50 mb-6 max-w-2xl mx-auto", children: "Join ratusan pelanggan yang dah percaya kami untuk majlis celebrasi diorang. Jom buat celebrasi tahun ni paling memorable dengan mercun premium kami!" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/products",
                className: "bg-yellow-400 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 shadow-lg",
                children: "Tengok Mercun"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/packages",
                className: "border-2 border-yellow-400 text-yellow-100 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-slate-800 transition-colors duration-200 shadow-lg",
                children: "Lihat Pakej"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 bg-gradient-to-br from-yellow-50 to-slate-50 rounded-xl p-8 text-center border-2 border-slate-200 shadow-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-4", children: "💬" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-slate-800 mb-4", children: "celebrasi Best Dengan Mercuncelebrasi?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-6", children: "Share la pengalaman & gambar celebrasi korang! Kami nak dengar cerita best korang." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              const message = "Hi! Nak share testimoni pasal mercun celebrasi dari Mercuncelebrasi.";
              const whatsappNumber = "+60137340415";
              const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            },
            className: "bg-gradient-to-r from-slate-500 to-slate-600 text-yellow-100 px-6 py-3 rounded-lg font-semibold hover:from-slate-600 hover:to-slate-700 transition-all duration-200 shadow-lg",
            children: "Share Review Anda"
          }
        )
      ] })
    ] })
  ] });
};
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const { toast: toast2 } = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast2({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    console.log("Form submitted:", formData);
    toast2({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours."
    });
    setFormData({ name: "", phone: "", message: "" });
  };
  const handleWhatsAppDirect = () => {
    const message = `Hi! I'm interested in your fireworks. Here are my details:

Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}`;
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-4xl opacity-20 animate-pulse", children: "💬" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 right-12 text-3xl opacity-15 animate-bounce", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-16 text-2xl opacity-10", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 text-3xl opacity-15", children: "📧" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-6 h-full", children: Array.from({ length: 48 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-slate-400 rounded-full w-6 h-6" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "💬🌙" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm", children: "Hubungi Kami" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-700 max-w-3xl mx-auto", children: "Ada soalan mercun celebrasi? Nak buat order besar-besaran? WhatsApp je terus - kami sedia membantu! 🎉" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-black mb-8", children: "Get in Touch" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-slate-500 text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "WhatsApp (Recommended)" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "+60 13-734 0415" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Reply pantas masa office hours" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "Phone" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "+60 13-734 0415" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Isnin-Sabtu: 9:00 AM - 6:00 PM" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(Mail, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "Email" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "info@mercunberlesen.com" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Reply dalam 24 jam" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "Lokasi" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "Kuala Lumpur, Malaysia" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Penghantaran seluruh Malaysia" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-black text-white p-3 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "Waktu Operasi" }),
                /* @__PURE__ */ jsxs("div", { className: "text-slate-700", children: [
                  /* @__PURE__ */ jsx("p", { children: "Isnin - Sabtu: 9:00 AM - 6:00 PM" }),
                  /* @__PURE__ */ jsx("p", { children: "Ahad: Tutup (celebrasi tetap buka! 🎉)" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gradient-to-br from-yellow-50 to-slate-50 border-2 border-yellow-300 rounded-xl p-6 shadow-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl text-center mb-3", children: "🌙" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-4", children: "Nak Order Cepat?" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-4", children: "Untuk order urgent atau nak tanya harga borong, WhatsApp je terus!" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => {
                  const message = "Hi! Nak tanya pasal mercun celebrasi. Boleh bantu?";
                  const whatsappNumber = "+60137340415";
                  const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
                  window.open(url, "_blank");
                },
                className: "bg-gradient-to-r from-slate-500 to-slate-600 text-yellow-100 hover:from-slate-600 hover:to-slate-700 w-full shadow-lg",
                children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                  "WhatsApp Sekarang!"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-8 shadow-xl", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-6", children: "Hantar Mesej" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-slate-800 mb-2", children: "Nama Penuh *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "name",
                    type: "text",
                    value: formData.name,
                    onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                    placeholder: "Masukkan nama penuh anda",
                    className: "border-2 border-gray-300 focus:border-black",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-slate-800 mb-2", children: "No. Telefon *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "phone",
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                    placeholder: "cth: +60 12-345 6789",
                    className: "border-2 border-gray-300 focus:border-black",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-slate-800 mb-2", children: "Mesej *" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "message",
                    value: formData.message,
                    onChange: (e) => setFormData({ ...formData, message: e.target.value }),
                    placeholder: "Bagitahu kami pasal majlis celebrasi, soalan, atau keperluan anda...",
                    rows: 5,
                    className: "border-2 border-gray-300 focus:border-black",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "submit",
                    className: "bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 hover:from-slate-700 hover:to-slate-800 w-full shadow-lg",
                    children: "Hantar Mesej"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    onClick: handleWhatsAppDirect,
                    variant: "outline",
                    className: "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-slate-800 w-full shadow-lg",
                    children: [
                      /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                      "Hantar via WhatsApp"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gradient-to-br from-slate-50 to-yellow-50 rounded-xl p-6 border border-slate-200", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-4", children: "Soalan Lazim" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: "S: Ada bantu buat permit PDRM tak?" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "J: Ada! Kami sedia bantu dari A-Z untuk permohonan permit PDRM." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: "S: Hantar ke mana je?" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "J: Seluruh Malaysia! Klang Valley ada rate special untuk celebrasi." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: "S: Boleh buat pakej custom?" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "J: Boleh! WhatsApp je untuk pakej celebrasi special ikut budget." })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast: toast2 } = useToast();
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };
  const handleCheckout = () => {
    const MINIMUM_ORDER = 150;
    const totalPrice = getTotalPrice();
    if (items.length === 0) {
      toast2({
        title: "Cart is empty",
        description: "Add some fireworks to your cart first!",
        variant: "destructive"
      });
      return;
    }
    if (totalPrice < MINIMUM_ORDER) {
      toast2({
        title: "Minimum order not met",
        description: `Minimum order RM ${MINIMUM_ORDER.toFixed(2)} diperlukan. Anda perlu tambah RM ${(MINIMUM_ORDER - totalPrice).toFixed(2)} lagi.`,
        variant: "destructive"
      });
      return;
    }
    if (!checkoutData.name || !checkoutData.phone) {
      toast2({
        title: "Missing information",
        description: "Please fill in your name and phone number",
        variant: "destructive"
      });
      return;
    }
    toast2({
      title: "Order placed!",
      description: "We'll contact you shortly to confirm your order."
    });
    clearCart();
    setCheckoutData({ name: "", phone: "", email: "", address: "" });
  };
  const handleWhatsAppOrder = () => {
    const MINIMUM_ORDER = 150;
    const totalPrice = getTotalPrice();
    if (items.length === 0) {
      toast2({
        title: "Cart is empty",
        description: "Add some fireworks to your cart first!",
        variant: "destructive"
      });
      return;
    }
    if (totalPrice < MINIMUM_ORDER) {
      toast2({
        title: "Minimum order not met",
        description: `Minimum order RM ${MINIMUM_ORDER.toFixed(2)} diperlukan. Anda perlu tambah RM ${(MINIMUM_ORDER - totalPrice).toFixed(2)} lagi.`,
        variant: "destructive"
      });
      return;
    }
    const orderDetails = items.map(
      (item) => `${item.name} (${item.type}) x${item.quantity} = RM ${(item.price * item.quantity).toFixed(2)}`
    ).join("\n");
    const message = `Hi! I'd like to place an order:

${orderDetails}

Total: RM ${getTotalPrice().toFixed(2)}

Customer Details:
Name: ${checkoutData.name || "Not provided"}
Phone: ${checkoutData.phone || "Not provided"}
Email: ${checkoutData.email || "Not provided"}
Address: ${checkoutData.address || "Not provided"}`;
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen py-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsx(ShoppingCart, { className: "h-24 w-24 text-gray-300 mx-auto mb-6" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-black mb-4", children: "Your Cart is Empty" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-8", children: "Browse our amazing collection of fireworks and start building your perfect celebration!" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-black text-white hover:bg-gray-800", children: /* @__PURE__ */ jsx("a", { href: "/products", children: "Browse Fireworks" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "border-black text-black hover:bg-black hover:text-white", children: /* @__PURE__ */ jsx("a", { href: "/packages", children: "View Packages" }) })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-black mb-8", children: "Shopping Cart" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border-4 border-yellow-400 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-black", children: [
            "Cart Items (",
            getTotalItems(),
            ")"
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: clearCart,
              variant: "outline",
              size: "sm",
              className: "border-red-500 text-red-600 hover:bg-red-500 hover:text-white",
              children: "Clear Cart"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: items.map((item) => /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-200", children: item.image && /* @__PURE__ */ jsx(
            "img",
            {
              src: item.image,
              alt: item.name,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-black text-lg", children: item.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 capitalize", children: item.type }),
              /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-black", children: [
                "RM ",
                item.price
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => handleQuantityChange(item.id, item.quantity - 1),
                    className: "h-8 w-8 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500",
                    children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "w-8 text-center font-semibold", children: item.quantity }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => handleQuantityChange(item.id, item.quantity + 1),
                    className: "h-8 w-8 p-0 bg-teal-400 text-white border-teal-400 hover:bg-teal-500",
                    children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => removeFromCart(item.id),
                  className: "border-red-500 text-red-600 hover:bg-red-500 hover:text-white",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs("p", { className: "font-bold text-black text-lg", children: [
              "RM ",
              (item.price * item.quantity).toFixed(2)
            ] }) })
          ] })
        ] }) }, item.id)) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-black rounded-lg p-6 sticky top-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-black mb-6", children: "Checkout" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
            /* @__PURE__ */ jsx("span", { children: "Subtotal:" }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
              "RM ",
              getTotalPrice().toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-t border-gray-200", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: "Total:" }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold", children: [
              "RM ",
              getTotalPrice().toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Full Name *",
              value: checkoutData.name,
              onChange: (e) => setCheckoutData({ ...checkoutData, name: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Phone Number *",
              value: checkoutData.phone,
              onChange: (e) => setCheckoutData({ ...checkoutData, phone: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Email Address",
              value: checkoutData.email,
              onChange: (e) => setCheckoutData({ ...checkoutData, email: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Delivery Address",
              value: checkoutData.address,
              onChange: (e) => setCheckoutData({ ...checkoutData, address: e.target.value }),
              className: "border-2 border-gray-300 focus:border-black"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleCheckout,
              className: "w-full bg-black text-white hover:bg-gray-800",
              children: "Place Order"
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleWhatsAppOrder,
              variant: "outline",
              className: "w-full border-slate-500 text-slate-600 hover:bg-slate-500 hover:text-white",
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                "Order via WhatsApp"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 mt-4 text-center", children: "* Wajib diisi. Kami akan hubungi untuk confirm order & arrange delivery." })
      ] }) })
    ] })
  ] }) });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-4xl opacity-20 animate-pulse", children: "🔍" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 right-12 text-3xl opacity-15 animate-bounce", children: "🌙" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-16 text-2xl opacity-10", children: "✨" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 text-3xl opacity-15", children: "❓" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-8 gap-8 h-full", children: Array.from({ length: 32 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border-2 border-slate-400 rounded-full w-12 h-12" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center relative bg-gradient-to-br from-white to-yellow-50 p-12 rounded-2xl shadow-2xl border-2 border-slate-200", children: [
      /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "🌙❓" }),
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl text-slate-700 mb-6", children: "Alamak! Halaman tak jumpa la!" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-600 mb-8", children: "Mungkin mercun dah habis terjual atau link salah? 😅" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-block bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 px-8 py-4 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
          children: "🏠 Balik Homepage"
        }
      )
    ] })
  ] });
};
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const WA_NUMBER = "60137340415";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hi%20BMFireworks!%20Saya%20berminat%20dengan%20program%20rakan%20niaga.`;
const Sales = () => {
  const demoItems = fireworksData.filter((i) => i.videoUrl && i.videoUrl.trim() !== "").slice(0, 6);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-slate-900 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.12),_transparent_55%)] pointer-events-none", "aria-hidden": true }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://res.cloudinary.com/de8w3ykvy/image/upload/v1762139873/bearboom_x_bmfireworks_1_ec7aua.png",
            alt: "Bearboom × BMFireworks",
            className: "h-16 w-auto mb-6 drop-shadow-lg",
            loading: "eager",
            decoding: "async"
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-300 leading-tight", children: "Mercun Harga Kilang • Tak Perlu Beli Banyak" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg sm:text-xl text-yellow-100", children: "Terus dari kilang BM Fireworks — stok sah, siap bantu urus permit." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-2 text-yellow-200 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "px-2 py-1 border border-yellow-400/60 rounded", children: "Licensed & Legal" }),
          /* @__PURE__ */ jsx("span", { className: "px-2 py-1 border border-yellow-400/60 rounded", children: "Fast Response" }),
          /* @__PURE__ */ jsx("span", { className: "px-2 py-1 border border-yellow-400/60 rounded", children: "Nationwide Delivery" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold", children: /* @__PURE__ */ jsx(Link, { to: "/products", children: "Lihat Senarai Harga" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-emerald-500 hover:bg-emerald-400 text-white font-bold", children: /* @__PURE__ */ jsx("a", { href: WA_URL, target: "_blank", rel: "noreferrer", children: "WhatsApp Sekarang" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-800 mb-8", children: "Kenapa Pilih Kami" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "✅ Harga Kilang Asli" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-2", children: "Terus dari BM Fireworks — bukan reseller biasa." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "🚫 Tiada MOQ" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-2", children: "Boleh mula kecil-kecilan. Fleksibel ikut bajet." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "📜 Bimbingan Permit" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-2", children: "Kami guide proses PDRM sampai lulus." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border border-slate-200 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "🚚 Hantar Seluruh Malaysia" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-2", children: "Pilihan lori / courier khas mengikut stok." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-yellow-50 via-white to-yellow-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-800 text-center mb-8", children: "Kami Bantu Semua Jenis Peniaga Mercun" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border-2 border-yellow-200 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: "💼" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Starter Reseller" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-1", children: "Baru nak mula? Boleh start 1 karton, harga fleksibel." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border-2 border-yellow-200 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: "🎉" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Event & Wedding Planner" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-1", children: "Mercun premium, sparklers, dengan panduan keselamatan." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border-2 border-yellow-200 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: "🚛" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Dealer Tetap" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-1", children: "Volume tinggi? Diskaun khas & stok priority." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-800 mb-8", children: "Proses Urusan" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white border border-slate-200 rounded-xl", children: [
          /* @__PURE__ */ jsx(PhoneCall, { className: "h-6 w-6 text-slate-700" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 text-lg font-semibold", children: "Isi Borang / WhatsApp" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-1", children: "Hubungi kami, kami akan cadangkan item sesuai." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white border border-slate-200 rounded-xl", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "h-6 w-6 text-slate-700" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 text-lg font-semibold", children: "Pilih Stok & Jadual" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-1", children: "Sahkan pilihan & tetapkan penghantaran." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white border border-slate-200 rounded-xl", children: [
          /* @__PURE__ */ jsx(Truck, { className: "h-6 w-6 text-slate-700" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 text-lg font-semibold", children: "Barang Dihantar" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-1", children: "Support lepas jualan sentiasa tersedia." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-video w-full border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-sm uppercase tracking-wide", children: "Video Proses Warehouse Placeholder" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-2", children: "Letak video proses gudang Bearboom × BM Fireworks di sini." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-yellow-300 mb-6", children: "Produk & Video Demo" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: demoItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl border border-yellow-400/30 overflow-hidden", children: [
        /* @__PURE__ */ jsxs(Dialog, { children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "w-full aspect-video relative cursor-pointer", children: [
            /* @__PURE__ */ jsx("img", { src: item.image, alt: item.name.en, className: "w-full h-full object-cover" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-yellow-400 text-slate-900 p-3 rounded-full shadow-lg", children: /* @__PURE__ */ jsx(Play, { className: "h-6 w-6" }) }) })
          ] }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2", children: [
            /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg sm:text-xl font-bold text-left text-slate-900", children: item.name.en }) }),
            /* @__PURE__ */ jsx("div", { className: "aspect-video w-full", children: item.videoUrl.includes("youtube.com") || item.videoUrl.includes("youtu.be") ? /* @__PURE__ */ jsx(
              "iframe",
              {
                src: item.videoUrl.replace("watch?v=", "embed/"),
                title: item.name.en,
                className: "w-full h-full rounded-lg",
                allowFullScreen: true,
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              }
            ) : /* @__PURE__ */ jsx(
              "video",
              {
                src: item.videoUrl,
                title: item.name.en,
                className: "w-full h-full rounded-lg",
                controls: true,
                preload: "metadata",
                controlsList: "nodownload",
                disablePictureInPicture: true,
                onContextMenu: (e) => e.preventDefault()
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-3", children: /* @__PURE__ */ jsx("h3", { className: "text-yellow-200 font-semibold text-sm line-clamp-1", children: item.name.en }) })
      ] }, item.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-yellow-400 text-slate-900 hover:bg-yellow-300", children: /* @__PURE__ */ jsx(Link, { to: "/products", children: "Lihat Semua Video" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-emerald-500 hover:bg-emerald-400 text-white", children: /* @__PURE__ */ jsx("a", { href: WA_URL, target: "_blank", rel: "noreferrer", children: "Minta Senarai Produk" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-800 mb-6", children: "Testimoni Rakan Niaga" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "p-6 bg-slate-50 rounded-xl border border-slate-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-slate-200" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
              "Pelanggan #",
              i
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Peniaga Bazar" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-700", children: "“Tak sangka senang urus permit bila join Bearboom. Harga pun betul-betul kilang!”" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 text-amber-400", children: "★★★★★" })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-800 mb-6 text-center", children: "FAQ & Permit Support" }),
      /* @__PURE__ */ jsxs(Accordion, { type: "single", collapsible: true, className: "w-full", children: [
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q1", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Perlu lesen ke?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Kami hanya bekalkan produk sah & berlesen. Kami juga boleh bimbing proses permit PDRM." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q2", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Berapa lama penghantaran?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Biasanya 2–5 hari bekerja bergantung pada lokasi & kuantiti." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q3", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Cara bayaran?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Online banking / tunai semasa pickup (untuk volum tertentu). Resit rasmi disediakan." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q4", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Produk apa yang ada?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Pop-Pop, Sparkle, Fountain, Rocket, One Shot, Cake 49/88/138/… dan lain-lain." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 p-5 rounded-xl border-2 border-yellow-300 bg-yellow-50 text-slate-800 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Nak Mohon Permit PDRM? Kami Boleh Bantu." }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 flex justify-center", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold", children: /* @__PURE__ */ jsx("a", { href: WA_URL, target: "_blank", rel: "noreferrer", children: "Dapatkan Bantuan Permit" }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-800 mb-4", children: "Sokongan Komuniti" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-700 max-w-3xl", children: "Bearboom × BM Fireworks bangga menyokong aktiviti komuniti & perayaan tempatan — meraikan tradisi Malaysia dengan cara yang sah & selamat." }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 h-44 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500", children: "Ruang gambar sponsor/event komuniti (placeholder)" })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-16 bg-slate-900 text-white overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506968430777-bf7784a87f23?q=80&w=2000')] bg-cover bg-center opacity-20" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-yellow-300", children: "Sedia Jadi Rakan Niaga Bearboom? Dapatkan Harga Kilang Sekarang!" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold", children: /* @__PURE__ */ jsx(Link, { to: "/products", children: "Isi Borang Borong" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-emerald-500 hover:bg-emerald-400 text-white font-bold", children: /* @__PURE__ */ jsx("a", { href: WA_URL, target: "_blank", rel: "noreferrer", children: "WhatsApp Sekarang" }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-yellow-100/90 text-sm", children: "📞 WhatsApp • ✉️ Emel • ⏰ Isnin–Sabtu 9AM–6PM • 📜 Licensed by Malaysian Govt" })
      ] })
    ] })
  ] });
};
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ ..._props }) => /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        IconRight: ({ ..._props }) => /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const states = [
  { value: "johor", label: "Johor" },
  { value: "kedah", label: "Kedah" },
  { value: "kelantan", label: "Kelantan" },
  { value: "melaka", label: "Melaka" },
  { value: "negeri_sembilan", label: "Negeri Sembilan" },
  { value: "pahang", label: "Pahang" },
  { value: "penang", label: "Pulau Pinang" },
  { value: "perak", label: "Perak" },
  { value: "perlis", label: "Perlis" },
  { value: "sabah", label: "Sabah" },
  { value: "sarawak", label: "Sarawak" },
  { value: "selangor", label: "Selangor" },
  { value: "terengganu", label: "Terengganu" },
  { value: "wp_kuala_lumpur", label: "WP Kuala Lumpur" },
  { value: "wp_labuan", label: "WP Labuan" },
  { value: "wp_putrajaya", label: "WP Putrajaya" }
];
const countryCodes = [
  { value: "60", label: "+60 (MY)" },
  { value: "65", label: "+65 (SG)" },
  { value: "62", label: "+62 (ID)" },
  { value: "66", label: "+66 (TH)" }
];
const applicationTypes = [
  { value: "deepavali", label: "Deepavali" },
  { value: "cny", label: "Chinese New Year" },
  { value: "raya", label: "Hari Raya" },
  { value: "merdeka", label: "Hari Merdeka" },
  { value: "wedding", label: "Majlis Kahwin" },
  { value: "corporate", label: "Acara Korporat" },
  { value: "other", label: "Lain-lain" }
];
const PermitPDRM = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicationType: "",
    fullName: "",
    icNumber: "",
    occupation: "",
    countryCode: "60",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    state: "",
    companyName: "",
    companySsm: "",
    applicationDate: void 0,
    businessLocation: "",
    businessAddress1: "",
    businessAddress2: "",
    businessState: "",
    ipdName: ""
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.applicationType || !formData.fullName || !formData.icNumber || !formData.phone || !formData.companyName || !formData.companySsm || !formData.applicationDate) {
      toast$1.error("Sila lengkapkan semua medan wajib (*)");
      return;
    }
    setIsSubmitting(true);
    try {
      const fullPhone = `${formData.countryCode}${formData.phone.replace(/^0+/, "")}`;
      const formattedDate = formData.applicationDate ? format(formData.applicationDate, "dd/MM/yyyy") : "";
      const payload = {
        applicationType: formData.applicationType,
        fullName: formData.fullName,
        icNumber: formData.icNumber,
        occupation: formData.occupation,
        phone: fullPhone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        postcode: formData.postcode,
        state: formData.state,
        companyName: formData.companyName,
        companySsm: formData.companySsm,
        applicationDate: formattedDate,
        businessLocation: formData.businessLocation,
        businessAddress1: formData.businessAddress1,
        // Add trailing space to fix concatenation spacing in PDF output
        businessAddress2: formData.businessAddress2 ? formData.businessAddress2.trim() + " " : "",
        businessState: formData.businessState,
        ipdName: formData.ipdName
      };
      const response = await fetch("https://bmfirework.com:3001/api/generate-permit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error("Gagal menjana dokumen permit");
      }
      const result = await response.json();
      if (result.pdfUrl) {
        window.open(result.pdfUrl, "_blank");
        toast$1.success("Dokumen permit berjaya dijana!");
      }
      setTimeout(() => {
        var _a;
        const stateLabel = ((_a = states.find((s) => s.value === formData.state)) == null ? void 0 : _a.label) || formData.state;
        const message = `Hi BMFireworks! Saya ${formData.fullName} dari ${stateLabel}. Saya dah isi borang permohonan permit untuk ${formData.applicationType}. Boleh bantu proses? No telefon: ${fullPhone}`;
        const waUrl = `https://wa.me/60137340415?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank");
      }, 1e3);
      setFormData({
        applicationType: "",
        fullName: "",
        icNumber: "",
        occupation: "",
        countryCode: "60",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
        state: "",
        companyName: "",
        companySsm: "",
        applicationDate: void 0,
        businessLocation: "",
        businessAddress1: "",
        businessAddress2: "",
        businessState: "",
        ipdName: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast$1.error("Maaf, ada masalah semasa hantar borang. Sila cuba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen py-16 bg-gradient-to-br from-amber-50 via-green-50 to-amber-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-semibold border border-green-300", children: "Surat Lantikan Agent" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 via-green-700 to-amber-700 bg-clip-text text-transparent", children: "Satu Borang Untuk Semua Dokumen PDRM" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-slate-700 max-w-2xl mx-auto", children: "Isi maklumat perniagaan anda sekali sahaja. Sistem BMFireworks akan auto isi 3-5 dokumen wajib (Surat Lantikan Agent, Borang IPD, Borang PBT) dan simpan dengan selamat." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-green-300 bg-white shadow-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-1.5 p-6 border-b border-green-200 bg-gradient-to-r from-green-50 to-amber-50", children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-amber-900", children: "Maklumat Pemohon & Perniagaan" }) }),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-amber-900", children: "Jenis Permohonan" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Pilih jenis permohonan berdasarkan perayaan yang anda mohon." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "applicationType", children: "Permohonan Untuk *" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: formData.applicationType,
                onValueChange: (value) => handleInputChange("applicationType", value),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: "applicationType", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih jenis permohonan" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: applicationTypes.map((type) => /* @__PURE__ */ jsx(SelectItem, { value: type.value, children: type.label }, type.value)) })
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Sistem akan auto isi Surat Lantikan Agent yang bersesuaian dengan jenis permohonan." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full bg-green-200" }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-amber-900", children: "Maklumat Pemohon" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Pastikan maklumat sama seperti dalam IC untuk elak permohonan ditolak." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "fullName", children: "Nama Penuh *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "fullName",
                  placeholder: "contoh: Ahmad bin Ali",
                  value: formData.fullName,
                  onChange: (e) => handleInputChange("fullName", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "icNumber", children: "No. Kad Pengenalan *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "icNumber",
                  placeholder: "900101-14-1234",
                  value: formData.icNumber,
                  onChange: (e) => handleInputChange("icNumber", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "occupation", children: "Pekerjaan *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "occupation",
                  placeholder: "contoh: Usahawan",
                  value: formData.occupation,
                  onChange: (e) => handleInputChange("occupation", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-[140px_minmax(0,1fr)]", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "countryCode", children: "Kod Negara" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: formData.countryCode,
                    onValueChange: (value) => handleInputChange("countryCode", value),
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { id: "countryCode", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsx(SelectContent, { children: countryCodes.map((code) => /* @__PURE__ */ jsx(SelectItem, { value: code.value, children: code.label }, code.value)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "No. Telefon *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "phone",
                    placeholder: "0123456789 (tanpa +60)",
                    value: formData.phone,
                    onChange: (e) => handleInputChange("phone", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Taip nombor tanpa kod negara. Sistem akan simpan sebagai 60XXXXXXXXX." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full bg-green-200" }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-amber-900", children: "Alamat Kediaman" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Digunakan untuk tujuan rujukan dan verifikasi PDRM." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "addressLine1", children: "Alamat Rumah 1 *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "addressLine1",
                  placeholder: "No 12, Jalan Bunga Api",
                  value: formData.addressLine1,
                  onChange: (e) => handleInputChange("addressLine1", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "addressLine2", children: "Alamat Rumah 2" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "addressLine2",
                  placeholder: "Taman Harmoni, Mukim Tebrau",
                  value: formData.addressLine2,
                  onChange: (e) => handleInputChange("addressLine2", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "city", children: "Bandar *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "city",
                    placeholder: "Johor Bahru",
                    value: formData.city,
                    onChange: (e) => handleInputChange("city", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "postcode", children: "Poskod *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "postcode",
                    placeholder: "81100",
                    maxLength: 5,
                    value: formData.postcode,
                    onChange: (e) => handleInputChange("postcode", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "state", children: "Negeri *" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: formData.state,
                    onValueChange: (value) => handleInputChange("state", value),
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { id: "state", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih negeri" }) }),
                      /* @__PURE__ */ jsx(SelectContent, { children: states.map((state) => /* @__PURE__ */ jsx(SelectItem, { value: state.value, children: state.label }, state.value)) })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full bg-green-200" }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-amber-900", children: "Maklumat Syarikat" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Maklumat ini digunakan untuk surat lantikan dan dokumen sokongan." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "companyName", children: "Nama Syarikat (SSM) *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "companyName",
                  placeholder: "BMFireworks Enterprise",
                  value: formData.companyName,
                  onChange: (e) => handleInputChange("companyName", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "companySsm", children: "No. SSM *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "companySsm",
                  placeholder: "202401234567",
                  value: formData.companySsm,
                  onChange: (e) => handleInputChange("companySsm", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-w-sm", children: [
            /* @__PURE__ */ jsx(Label, { children: "Tarikh Permohonan *" }),
            /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  className: cn(
                    "w-full justify-start text-left font-normal",
                    !formData.applicationDate && "text-muted-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                    formData.applicationDate ? format(formData.applicationDate, "PPP") : /* @__PURE__ */ jsx("span", { children: "Pilih tarikh" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsx(
                Calendar,
                {
                  mode: "single",
                  selected: formData.applicationDate,
                  onSelect: (date) => handleInputChange("applicationDate", date),
                  initialFocus: true
                }
              ) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full bg-green-200" }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-amber-900", children: "Maklumat Tapak Perniagaan" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Pilih negeri tapak berniaga dan IPD yang menjaga kawasan tersebut." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "businessLocation", children: "Tempat Berniaga *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "businessLocation",
                  placeholder: "cth: Tapak Pasaraya Lotus, Desa Cemerlang",
                  value: formData.businessLocation,
                  onChange: (e) => handleInputChange("businessLocation", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "businessAddress1", children: "Alamat Berniaga 1 *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "businessAddress1",
                  placeholder: "No Lot / Gerai",
                  value: formData.businessAddress1,
                  onChange: (e) => handleInputChange("businessAddress1", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "businessAddress2", children: "Alamat Berniaga 2" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "businessAddress2",
                  placeholder: "Tambahan alamat seperti taman, landmark, atau maklumat lokasi",
                  rows: 3,
                  value: formData.businessAddress2,
                  onChange: (e) => handleInputChange("businessAddress2", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "businessState", children: "Negeri Tapak *" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: formData.businessState,
                    onValueChange: (value) => handleInputChange("businessState", value),
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { id: "businessState", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih negeri" }) }),
                      /* @__PURE__ */ jsx(SelectContent, { children: states.map((state) => /* @__PURE__ */ jsx(SelectItem, { value: state.value, children: state.label }, state.value)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "ipdName", children: "Nama IPD *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "ipdName",
                    placeholder: "cth: IPD Johor Bahru Selatan",
                    value: formData.ipdName,
                    onChange: (e) => handleInputChange("ipdName", e.target.value)
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-12 text-lg",
              children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-5 w-5 animate-spin" }),
                "Sedang Proses..."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Download, { className: "mr-2 h-5 w-5" }),
                "Jana Surat Lantikan Agent"
              ] })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 text-center mt-4", children: "Dengan klik butang di atas, Surat Lantikan Agent akan dijana dan anda akan dihubungkan ke WhatsApp kami." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gradient-to-br from-amber-50 to-green-50 border border-green-300 rounded-xl p-6 shadow-lg", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-amber-900 mb-4 flex items-center", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "mr-3 h-6 w-6 text-green-600" }),
        "Nak Bantuan?"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-4", children: "Team BMFireworks ada pengalaman bantu customer buat Surat Lantikan Agent. WhatsApp je untuk panduan lengkap supaya permohonan lulus dengan mudah!" }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => {
            const message = "Hi BMFireworks! Saya nak tanya tentang Surat Lantikan Agent untuk mercun.";
            const waUrl = `https://wa.me/60137340415?text=${encodeURIComponent(message)}`;
            window.open(waUrl, "_blank");
          },
          variant: "outline",
          className: "border-green-600 text-green-700 hover:bg-green-50",
          children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
            "WhatsApp Konsultasi"
          ]
        }
      )
    ] })
  ] }) });
};
const queryClient = new QueryClient();
const App = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(LanguageProvider, { children: /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-black max-w-full overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/products", element: /* @__PURE__ */ jsx(Products, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/cartons", element: /* @__PURE__ */ jsx(Cartons, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/packages", element: /* @__PURE__ */ jsx(Packages, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/sales", element: /* @__PURE__ */ jsx(Sales, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/permit-guide", element: /* @__PURE__ */ jsx(PermitGuide, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/suratlantikanagent", element: /* @__PURE__ */ jsx(PermitPDRM, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/safety-guide", element: /* @__PURE__ */ jsx(SafetyGuide, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/testimonials", element: /* @__PURE__ */ jsx(Testimonials, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/cart", element: /* @__PURE__ */ jsx(Cart, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] })
] }) }) }) }) });
function render(url) {
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(MemoryRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) })
  );
  return html;
}
export {
  render
};
