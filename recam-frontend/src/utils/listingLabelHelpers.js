// Property Type Label
export function getPropertyTypeLabel(type) {
  switch (type) {
    case 1:
      return "For Sale";
    case 2:
      return "For Rent";
    case 3:
      return "Auction";
    default:
      return "Unknown";
  }
}

// Listing Case Status Label
export function getListcasesStatusLabel(status) {
  switch (status) {
    case 1:
      return "Created";
    case 2:
      return "Pending";
    case 3:
      return "Delivered";
    default:
      return "Unknown";

  }
}