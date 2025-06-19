import { NavLink } from "react-router-dom";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import { useUsers } from "../../hooks/useUsers";

export default function MainHeader() {

  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div>
        <p className="cx-paragraph cx-paragraph--p">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="cx-paragraph cx-paragraph--p cx-color--status-error">
          Error loading user data. Please try again.
        </p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div>
        <p className="cx-paragraph cx-paragraph--p">No user profile found.</p>
      </div>
    );
  }

  const user = users[0];

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <h1 className={classes.title}>{user.name} sin CV</h1>
        <div className={classes.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "cx-tab cx-tab--active" : "cx-tab"
            }
            end
          >
            Om meg
          </NavLink>

        <NavLink
            to="/experiences"
            className={({ isActive }) =>
              isActive ? "cx-tab cx-tab--active" : "cx-tab"
            }
            end
          >
            Erfaringer
          </NavLink>

        </div>
      </header>
    </>
  );
}
