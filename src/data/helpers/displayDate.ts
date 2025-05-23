import { formatDistanceToNow, format } from "date-fns";

export const displayDate = (uploadDate: Date | string) => {
    const now = new Date();
    const parsedUploadDate = new Date(uploadDate); // Ensure we have a valid Date object
    const uploadDateTime = parsedUploadDate?.getTime();
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
  
    if (isNaN(uploadDateTime)) {
      // Handle invalid date input
      return "Invalid date";
    }
  
    if (now.getTime() - uploadDateTime > twoDaysInMillis) {
      // More than 2 days ago
      return format(parsedUploadDate, "MMM dd, yyyy");
    } else {
      // Less than 2 days ago
      return formatDistanceToNow(parsedUploadDate, { addSuffix: true });
    }
  };