import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // If you're using React Router for page navigation

export const smoothScrollTo = (targetId) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Custom Hook to smooth scroll to an element after navigating to a new page
export const useSmoothScroll = (targetId) => {
  const location = useLocation(); // Get current route

  useEffect(() => {
    // Wait for the page to load, then scroll to the target element
    const scrollToElement = () => {
      smoothScrollTo(targetId);
    };

    // Check if the target element exists after the page has rendered
    scrollToElement();

    // Adding event listener on location change to handle smooth scrolling across pages
  }, [location, targetId]); // Dependency on location ensures it runs after navigation
};
