
import styles from "./Home.module.css";
import { useUsers } from "../hooks/useUsers";
import { CxIcon } from "@computas/designsystem/icon/react";

export default function Home() {

  const { data: users, isLoading, error } = useUsers();

  const formatNorwegianDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) {
        return "Ugyldig dato";
      }
      return dateObj.toLocaleDateString("nb-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      console.error("Failed to parse date:", dateString, e);
      return "Ugyldig dato";
    }
  };
  
  if (isLoading) {
    return (
      <div className={`${styles.container} ${styles.loadingContainer}`}>
        <p className="cx-paragraph cx-paragraph--p">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${styles.errorContainer}`}>
        <p className="cx-paragraph cx-paragraph--p cx-color--status-error">
          Error loading user data. Please try again.
        </p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className={`${styles.container} ${styles.noUserContainer}`}>
        <p className="cx-paragraph cx-paragraph--p">No user profile found.</p>
      </div>
    );
  }

  const user = users[0];
    
  return (
    <div className={styles.centeredContainer}>
      <div className={styles.userProfileCard}>
        <div className={styles.imageContainer}>
          <img
            className={styles.profileImage}
            src={
              "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            }
            alt={user.name}
          />
        </div>

        <h1 className={styles.userName}>{user.name}</h1>

        {user.description && (
          <p className={styles.descriptionText}>{user.description}</p>
        )}

        <div className={styles.detailsGrid}>
          {user.birthDate && (
            <p className={styles.detailItem}>
              <CxIcon name="calendar" size="8" className={styles.icon} />
              {formatNorwegianDate(user.birthDate)}
            </p>
          )}
          {user.address && (
            <p className={styles.detailItem}>
              <CxIcon name="location" size="8" className={styles.icon} />
              {user.address}
            </p>
          )}
          {user.phone && (
            <p className={styles.detailItem}>
              <CxIcon name="phone" size="8" className={styles.icon} />
              {user.phone}
            </p>
          )}
          {user.university && (
            <p className={styles.detailItem}>
              <CxIcon name="book" size="8" className={styles.icon} />
              {user.university}
            </p>
          )}
        </div>

        {user.linkedInUrl && (
          <a
            href={user.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedinButton}
          >
            Vis LinkedIn-profil
          </a>
        )}
      </div>
    </div>
  );
}
