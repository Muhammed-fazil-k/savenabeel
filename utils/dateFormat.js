function formatTimestamp(timestampObject) {
  // Validate input type (optional but recommended)
  if (
    typeof timestampObject !== "object" ||
    !timestampObject.hasOwnProperty("seconds") ||
    !timestampObject.hasOwnProperty("nanoseconds")
  ) {
    throw new Error(
      "Invalid timestamp object provided. Expected format: { seconds: number, nanoseconds: number }"
    );
  }

  // Extract seconds and nanoseconds
  const seconds = timestampObject.seconds;
  const nanoseconds = timestampObject.nanoseconds;

  // Calculate milliseconds (considering potential edge cases)
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000); // More accurate calculation

  // Create a Date object from milliseconds
  const dateObject = new Date(milliseconds);

  // Format the date and time using toLocaleString (customizable)
  const formattedDateTime = dateObject.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDateTime;
}
export default formatTimestamp;
