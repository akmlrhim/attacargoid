import { usePage } from "@inertiajs/react";

export default function useCompany() {
  return usePage().props.company;
}
