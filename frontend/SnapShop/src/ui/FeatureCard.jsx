import PropTypes from "prop-types";

const FeatureCard = ({ icon, desc, title }) => (
    
  <div className="flex gap-2 bg-slate-600 px-4 py-6 font-karla">
    {icon}
    <div>
      <h2 className="font-medium text-xl text-white">{title}</h2>
      <p className="text-gray-600 dark:text-white">{desc}</p>
    </div>
  </div>
);
FeatureCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
export default FeatureCard;
