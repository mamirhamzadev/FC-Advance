import {
  faEnvelopeOpen,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export const getContactInfoData = () => [
  {
    icon: faLocationDot,
    title: "Address",
    value: "1122 Ave J Brooklyn NY 11230",
  },
  {
    icon: faEnvelopeOpen,
    title: "Send Us Mail",
    value: "info@fcadvance.com",
  },
  {
    icon: faPhone,
    title: "Call Us",
    value: "+1 (646) 707 5610",
  },
];
