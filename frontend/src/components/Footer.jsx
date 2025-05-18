import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="text-[#737373] md:px-10">
      <p className="py-20">
        <span className="">
          Developed by{" "}
          <Link
            to="https://zgboportfolio.vercel.app"
            target="_blank"
            className="hover:underline text-[#e50914]"
          >
            Emmanuel Ezeigbo
          </Link>
        </span>
        <br />
        Read about Netflix TV shows and movies and watch bonus videos on
        Tudum.com.
      </p>

      <p className="pb-5">Questions? Contact us.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 text-sm pb-10 max-w-5xl">
        <ul className="flex flex-col space-y-2">
          <li>FAQ</li>
          <li>Investor Relations</li>
          <li>Privacy</li>
          <li>Speed Test</li>
        </ul>
        <ul className="flex flex-col space-y-2">
          <li>Help Center</li>
          <li>Jobs</li>
          <li>Cookie Preferences</li>
          <li>Legal Notices</li>
        </ul>
        <ul className="flex flex-col space-y-2 mt-2 md:mt-0">
          <li>Account</li>
          <li>Ways to Watch</li>
          <li>Corporate Information</li>
          <li>Only on Netflix</li>
        </ul>
        <ul className="flex flex-col space-y-2 mt-2 md:mt-0">
          <li>Media Center</li>
          <li>Terms of Use</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
