import { usePage } from "@inertiajs/react";

/**
 * Company contact info (phone, WhatsApp, email, social links), managed via
 * the admin panel and shared on every Inertia response.
 */
export default function useCompany() {
  return usePage().props.company;
}
