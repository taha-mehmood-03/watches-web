import React,{useEffect} from "react";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import AOS from "aos";
import "aos/dist/aos.css";
const Moredetails = () => {
  const [activeSections, setActiveSections] = React.useState({
    description: false,
    shipping: false,
    returns: false,
    warranty: false,
  });
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  const handleToggle = (section) => {
    setActiveSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const currentWatch = useSelector((state) => state.watch.currentWatch);

  return (
    <div className="flex flex-col w-full  items-center gap-2  " 
       data-aos="fade-right"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false"
    data-aos-anchor-placement="top-center">
      <DetailsSection
        title="DESCRIPTION"
        section="description"
        active={activeSections.description}
        onClick={handleToggle}
        content={
          activeSections.description && (
            <TypeAnimation
              sequence={[
                `A minimalist watch with a lot of meaning. ${currentWatch.name} with Nylon Strap was started from the belief of bringing people together with diversity. The tomorrow watch comes in a wide range of colors that will match anybody's style and guide you to a brighter tomorrow. Thanks to the thin and durable pull through Nylon strap that makes this watch lightweight and easy to use. Made with stainless steel to last and a matte finish for a cool look. So come together and grow beyond borders because ${currentWatch.name} is a new day!`,
                1000,
              ]}
              wrapper="div"
              cursor={true}
              speed={90}
              repeat={0}
              className="text-center text-white w-full"
            />
          )
        }
      />

      <DetailsSection
        title="SHIPPING"
        section="shipping"
        active={activeSections.shipping}
        onClick={handleToggle}
        content={
          activeSections.shipping && (
            <TypeAnimation
              sequence={[
                `Watches.com will cover the cost for Standard International Mail* (orders over $249+) and Standard Domestic Mail (orders over $100+). Not all countries are eligible for free international shipping. Upgraded shipping options (estimated transit times and rates) will be quoted during checkout. Watches.com has been shipping worldwide since 1999 and we ship internationally daily. Most orders are processed and shipped out by 5pm (MST) Monday through Friday on regular business days. Payment/fraud verification is typically instantaneous, but in some instances may take up to 48 hours. Orders placed/received after 12:00pm (MST) will be processed the next business day. Please be aware that UPS does not deliver on weekends. Because customs fees vary by country, we do not collect duties during checkout. If duties are due, your customs agency will let you know when the package arrives in your country. It is your responsibility to pay these fees to your country. Once items are shipped, liability is covered by the terms of the carrier. We will ship to the address specified by the customer. If you did not provide the correct address, please contact us as soon as possible to correct it. Watches.com does not cover packages lost due to incorrect addresses provided by the customer. *Standard international mail is not an insured or trackable service. For insured, trackable delivery we recommend choosing FedEx or UPS.`,
                1000,
              ]}
              wrapper="div"
              cursor={true}
              speed={90}
              repeat={0}
              className="text-center text-white w-full"
            />
          )
        }
      />

      <DetailsSection
        title="RETURNS"
        section="returns"
        active={activeSections.returns}
        onClick={handleToggle}
        content={
          activeSections.returns && (
            <TypeAnimation
              sequence={[
                `We could all use some extra time. If your new, unworn item is not 100% to your satisfaction, you have 30 days from the original ship date to return it. To be eligible for a return, your item must be unused, unworn and in the same condition that you received it. It must also be in the original packaging. More details can be found on our Returns page. **Unfortunately Mystery watches are final sale and only eligible for return for store credit; a small restocking fee applies to these returns.`,
                1000,
              ]}
              wrapper="div"
              cursor={true}
              speed={90}
              repeat={0}
              className="text-center text-white w-full"
            />
          )
        }
      />

      <DetailsSection
        title="WARRANTY"
        section="warranty"
        active={activeSections.warranty}
        onClick={handleToggle}
        content={
          activeSections.warranty && (
            <TypeAnimation
              sequence={["Warranty: 1 year.", 1000]}
              wrapper="div"
              cursor={true}
              speed={90}
              repeat={0}
              className="text-center text-white w-full"
            />
          )
        }
      />
    </div>
  );
};

const DetailsSection = ({ title, section, active, onClick, content }) => {
  return (
    <div className=" w-full lg:w-[50vw] 5xl:w-[31vw] lg:px-2 ">
      <div className="w-[100%] lg:w-[99%] h-16 justify-around items-center bg-black">
        <div
          className="flex items-center h-full w-full border-t-2 border-t-white"
          onClick={() => onClick(section)}
        >
          <div className="flex-1 text-center lg:text-start text-white text-xl">
            {title}
          </div>
          {active ? (
            <KeyboardArrowUpSharpIcon className="text-white" />
          ) : (
            <KeyboardArrowDownIcon className="text-white" />
          )}
        </div>
      </div>
      {content && <div className="w-[90%]">{content}</div>}
    </div>
  );
};

export default Moredetails;
