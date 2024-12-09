import { useEffect } from "react";

const PharmacyPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rxvaletapi.com/api/omdrx/member_login.php"
        );
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here, for example, show a notification or redirect to a fallback page
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Pharmacy page on progress
      </h1>
      <p className="text-xl font-semibold text-center">
        We are building something amaizing for you
      </p>
    </div>
  );
};

export default PharmacyPage;
