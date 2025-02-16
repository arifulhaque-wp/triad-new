import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TriadQuestion from "./ListApproach/TriadQuestion.jsx"; // Ensure correct import path
import QuestionList from "./ListApproach/QuestionList.jsx";
import TriadParent from "./ListApproach/TriadParent.jsx"; // Keeping for reference

export const qc = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
    mutations: {
      retry: 2,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <TriadParent></TriadParent>, // ✅ Now TriadQuestion is the default
      },
      {
        path: "/TriadQuestion",
        element: <TriadQuestion></TriadQuestion>, // ✅ Now TriadQuestion is the default
      },
      {
        path: "/Questions",
        element: <QuestionList></QuestionList>, // ✅ Optional: Keep QuestionList at /questions
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={qc}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
