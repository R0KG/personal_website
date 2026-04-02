import { Link } from 'react-router-dom';

export default function AppLink({ to, className, children, ...props }) {
  if (
    typeof to === 'string' &&
    (to.startsWith('http') ||
      to.startsWith('mailto:') ||
      to.startsWith('tel:') ||
      to.startsWith('#') ||
      props.download !== undefined ||
      props.target === '_blank')
  ) {
    return (
      <a className={className} href={to} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={to} {...props}>
      {children}
    </Link>
  );
}
