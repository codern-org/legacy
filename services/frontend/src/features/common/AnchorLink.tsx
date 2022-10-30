import { route } from 'preact-router';

type AnchorLinkProps = {
  href: string,
  label: string,
  external?: boolean,
};

const className = 'text-blue-500 hover:text-blue-700 hover:underline'; 

export const AnchorLink = ({
  href,
  label,
  external = false,
}: AnchorLinkProps) => {
  if (external) {
    return (<a href={href} className={className}>{label}</a>);
  }

  const handleClick = () => {
    route(href);
  };

  return (
    <a href="#" onClick={handleClick} className={className}>{label}</a>
  );
};
