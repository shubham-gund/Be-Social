const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} BeeSocial. All Rights Reserved.
            </p>
          </div>
          <div className="flex space-x-6 justify-center sm:justify-end">
            <a
              href="/terms-and-conditions"
              className="text-sm hover:text-purple-500 transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy-policy"
              className="text-sm hover:text-purple-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/contact-us"
              className="text-sm hover:text-purple-500 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
