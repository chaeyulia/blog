import React from "react";
import { Link } from "gatsby";
import { GITHUB_URL, EMAIL_ADDRESS, PREVIOUS_BLOG_URL } from "../constants/url";
import SEO from "../components/SEO";
interface ContactItemProps {
  label: string;
  url: string;
  isEmail?: boolean;
}
const DottedLine = () => (
  <div className="h-px w-full bg-repeat-x bg-bottom bg-dotted-line" />
);

const ContactItem = ({ label, url, isEmail = false }: ContactItemProps) => (
  <div className="w-full flex items-center justify-between sm:flex-row flex-col">
    <span className="font-medium">{label}</span>
    <div className="flex-grow border-t border-dotted border-black mx-2" />
    <Link to={isEmail ? `mailto:${url}` : url} className="hover:text-cGreen!">
      {url}
    </Link>
  </div>
);

const ContactsPage = () => {
  const CONTACT_ITEM = [
    { label: "Github", url: GITHUB_URL },
    { label: "Email", url: EMAIL_ADDRESS, isEmail: true },
    { label: "Old blog", url: PREVIOUS_BLOG_URL },
  ];

  return (
    <main className="container items-center justify-center">
      <div className="relative w-[60vw] min-w-[250px] max-w-[550px] bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center mb-6">
          <p className="italic mt-0 mb-2! text-neutral-600!">How to reach me</p>
          <DottedLine />
          <h1
            className="text-5xl/14! font-black! m-0! transform-[scale(2
          )] tracking-tighter"
          >
            CONTACT
          </h1>
          <DottedLine />
        </div>

        <div className="flex flex-col items-start justify-between gap-1.5">
          {CONTACT_ITEM.map((item, index) => (
            <ContactItem key={index} {...item} />
          ))}
        </div>

        <p className="mb-0! mt-6 text-sm text-center italic text-neutral-500!">
          Last updated: 2025. 06. 08
        </p>
      </div>
    </main>
  );
};

export default ContactsPage;

export const Head = () => <SEO title="Contact" />;
