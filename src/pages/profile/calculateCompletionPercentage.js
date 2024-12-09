export const calculateCompletionPercentage = (profile, requiredFields) => {
  let totalFields = 0;
  let completedFields = 0;

  const checkFields = (obj, fields) => {
    for (const field of fields) {
      if (typeof field === "string") {
        totalFields++;
        if (obj[field] && obj[field]?.toString()?.trim() !== "") {
          completedFields++;
        }
      } else if (typeof field === "object" && field !== null) {
        const [key, subFields] = Object.entries(field)[0];
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item) => checkFields(item, subFields));
        } else if (obj[key]) {
          checkFields(obj[key], subFields);
        }
      }
    }
  };

  checkFields(profile, requiredFields);

  return ((completedFields / totalFields) * 100).toFixed(2);
};
