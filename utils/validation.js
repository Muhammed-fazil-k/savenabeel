export default function validation(donation) {
  let error = {};
  const amount = donation.amount;
  if (!donation.amount) {
    error.amount = "Amount is Empty";
  } else if (!isNaN(amount) && amount <= 0) {
    error.amount = "Donation is invalid";
  }

  return error;
}
