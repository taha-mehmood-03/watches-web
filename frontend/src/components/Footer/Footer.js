import React from "react";
import { motion } from "framer-motion";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Brand Center", href: "/brand" },
        { label: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Help Center",
      links: [
        { label: "Discord Server", href: "/discord" },
        { label: "Twitter", href: "/twitter" },
        { label: "Facebook", href: "/facebook" },
        { label: "Contact Us", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Licensing", href: "/licensing" },
        { label: "Terms & Conditions", href: "/terms" }
      ]
    },
    {
      title: "Download",
      links: [
        { label: "iOS", href: "/ios" },
        { label: "Android", href: "/android" },
        { label: "Windows", href: "/windows" },
        { label: "MacOS", href: "/macos" }
      ]
    }
  ];

  const socialLinks = [
    { Icon: BsFacebook, href: "#" },
    { Icon: BsTwitter, href: "#" },
    { Icon: BsInstagram, href: "#" },
    { Icon: BsGithub, href: "#" },
    { Icon: BsDribbble, href: "#" }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      className="bg-gray-900 text-white py-12 w-full"
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {footerSections.map((section) => (
          <motion.div 
            key={section.title}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="font-bold mb-4 text-blue-400">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <motion.li 
                  key={link.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="container mx-auto mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center px-4"
      >
        <p className="text-gray-400 mb-4 md:mb-0">
          © {currentYear} Watch Store. All rights reserved.
        </p>
        
        <div className="flex space-x-4">
          {socialLinks.map(({ Icon, href }) => (
            <motion.a 
              key={href} 
              href={href} 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;