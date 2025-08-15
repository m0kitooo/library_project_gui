import { NavLink } from "react-router-dom";

export default function DefaultNavLink({ to, children, end = true }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => (isActive ? 'active-link' : '')}
    >
      <span>{children}</span>
    </NavLink>
  );
}