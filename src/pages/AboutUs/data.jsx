import {
  faBullseye,
  faLightbulb,
  faMagnifyingGlass,
  faPersonChalkboard,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  ABOUT_US_APPLY,
  ABOUT_US_GET_APPROVAL,
  ABOUT_US_QUALIFY,
  ABOUT_US_RECEIVE_FUNDING,
  ABOUT_US_RENEW,
} from "../../constants/images";

export const getAboutUsTabsData = () => [
  {
    name: "Our Mission",
    text: [
      "FC advance Solutions mission is to empower small and medium-sized businesses by providing access to flexible and innovative financing solutions. Our goal is to help businesses overcome financial obstacles, allowing them to grow and reach their full potential.",
      "We believe that every business should have the opportunity to succeed, and we are dedicated to providing personalized and efficient financial services to support our clients' unique needs.",
      "At FC advance Solutions, we are committed to building strong, long-lasting relationships with our clients. We value transparency, honesty, and exceptional customer service, and we strive to always operate with the highest level of integrity.",
      "Our mission is to be the trusted financial partner for businesses everywhere, providing access to the funds they need to achieve their goals and make their dreams a reality.",
    ],
  },
  {
    name: "Our Vision",
    text: [
      "Our team of experts is passionate about helping businesses achieve their goals, and we are committed to providing exceptional customer service and support. We understand that every business is different, and that's why we work closely with each of our clients to create customized financing solutions that meet their specific needs.",
      "Whether you're looking to cover unexpected expenses, invest in new equipment, or expand your business, FC advancefunding solutions is here to help. Our quick and simple application process means that you can get the funds you need in as little as 48 hours, and our team is always available to answer any questions you may have.",
    ],
  },
  {
    name: "Who We Are",
    text: [
      "At FC advance Solutions , we believe in building long-lasting relationships with our clients. We are committed to providing the best possible service, and we are dedicated to helping businesses grow and succeed. If you're looking for a reliable and trusted partner to help you achieve your goals, look no further than FC advance Solutions.",
      "Contact us today to learn more about how we can help your business thrive.",
    ],
  },
];

export const getAdvanceSolutionsData = () => [
  {
    icon: faRocket,
    title: "Fast and Easy Access to Funds",
    desc: "With our quick and simple application process, you can get the funds you need in as little as 48 hours. We understand that time is of the essence when it comes to growing your business, And we are dedicated to providing fast and efficient financing solutions.",
  },
  {
    icon: faLightbulb,
    title: "Tailored Financing Solutions",
    desc: "We understand that every business is unique, and that's why we work closely with each of our clients to tailor our financing solutions to meet their individual needs. Whether you're looking for a cash advance to cover unexpected expenses or to invest in new equipment, we have a financing solution that's right for you.",
  },
  {
    icon: faPersonChalkboard,
    title: "Exceptional Customer Service",
    desc: "Our team of experts is passionate about helping businesses succeed, and we are committed to providing exceptional customer service and support. We are always available to answer any questions you may have, and we strive to make the financing process as seamless and stress-free as possible.",
  },
  {
    icon: faBullseye,
    title: "Reliable and Trusted Partner",
    desc: "At fC advance Solutions we believe in building long-lasting relationships with our clients. We are a reliable and trusted financial partner that you can count on to help you grow and succeed.",
  },
  {
    icon: faLightbulb,
    title: "Innovative Financing Solutions",
    desc: "Our innovative financing solutions are designed to help businesses overcome financial obstacles and achieve their goals. Whether you're looking to cover unexpected expenses, invest in new equipment, or expand your business, we have a solution that's right for you.",
  },
  {
    icon: faMagnifyingGlass,
    title: "Overall",
    desc: "fC advance Solutions is the perfect partner for businesses looking for fast and easy access to funds, exceptional customer service, and tailored financing solutions. Contact us today to learn more about how we can help your business thrive.",
  },
];

export const getWorkProcessData = () => [
  {
    title: "Qualify",
    tagline: "Meet Simple Requirements",
  },
  {
    title: "Apply",
    tagline: "Provide Basic Business Info",
  },
  {
    title: "Get Approval",
    tagline: "Find Out Within Hours",
  },
  {
    title: "Receive Funding",
    tagline: "Have funds deposited often same-day",
  },
  {
    title: "Renew",
    tagline: "Consider additional funding",
  },
];

export const getWorkProcessVisualData = () => [
  {
    img: ABOUT_US_QUALIFY,
    title: "Qualify",
    desc: "Because we specialize in providing capital to underserved small businesses who may not qualify elsewhere, we keep our eligibility requirements simple and attainable. Businesses must be in business in the U.S. for at least one year, make $10,000+ in monthly revenue, and owners must have a 500+ credit score.",
  },
  {
    img: ABOUT_US_APPLY,
    title: "Apply",
    desc: "Our application only requires basic information – owner’s name, social security number, business name, Tax ID, and last three months’ business bank statements. Customers also provide some minimal documentation – driver’s license, voided check, signed contract, and bank verification. Rarely, other documents may be needed, such as a tax return or proof of ownership..",
  },
  {
    img: ABOUT_US_GET_APPROVAL,
    title: "Get Approval",
    desc: "Once we receive the necessary information and documentation, we jump right into reviewing everything and conducting a full, upfront underwrite. That means when we issue an approval, our deals stick and typically do not need to be modified. Customers are usually informed of the outcome of their application within a few hours.",
  },
  {
    img: ABOUT_US_RECEIVE_FUNDING,
    title: "Receive Funding",
    desc: "If a customer accepts our approval, we hold a funding call with all new customers. The goal is to be very clear about the features of revenue-based financing and the terms of the contract. When the customer feels confident about their funding details and has had their questions answered, we are often able to transfer the funds into the business bank account that same day.",
  },
  {
    img: ABOUT_US_RENEW,
    title: "Renew",
    desc: "We make every effort to provide the funding a customer needs to help their business thrive. If a customer is up-to-date with payments and has paid about half of their balance, they may qualify for a renewal – an additional round of funding that can be used for any business purpose. Customers simply contact their dedicated Account Executive to get started.",
  },
];
