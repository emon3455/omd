export default function formatDate(dateInput) {
  const date = new Date(dateInput); // Convert input to a Date object
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Convert to string and pad
  const day = date.getDate().toString().padStart(2, "0"); // Convert to string and pad
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
