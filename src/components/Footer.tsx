 import { getDomainName } from "../utils/utils";

const Footer = () => (
  <footer className="w-full bottom-0 bg-black">
     <div className="py-5 container mx-auto px-4">
      <p>© 2002-2022 {getDomainName()}</p>
    </div> 
  </footer>
);

export default Footer;
