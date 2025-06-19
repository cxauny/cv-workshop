import { Experience } from "../../types/types";
import styles from "./ExperienceModal.module.css";
import { ExperienceChip } from "./ExperienceChip";

interface ExperienceModalProps {
  experience: Experience;
  onClose: () => void
  isOpen: boolean;
}

export function ExperienceModal({
  experience,
  onClose,
  isOpen,
}: ExperienceModalProps) {
  function getMonth(date: string) {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleDateString("nb-NO", { month: "long" });
    const year = dateObj.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }

  const formattedStartDate = getMonth(experience.startDate);
  const formattedEndDate = experience.endDate
    ? getMonth(experience.endDate)
    : "Present";


  if (!isOpen) {
    return null;
  }
        
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;{" "}
      </button>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>{experience.title}</h2>
        <h3 className={styles.modalCompany}>{experience.company}</h3>
        <p className={styles.modalRole}>{experience.role}</p>
        <ExperienceChip type={experience.type} />
        <p className={styles.modalDates}>
          {formattedStartDate} - {formattedEndDate}
        </p>
        {experience.description && (
          <p className={styles.modalDescription}>{experience.description}</p>
        )}
        {experience.imageUrl && (
          <img
            src={experience.imageUrl}
            alt={`${experience.company} logo`}
            className={styles.modalImage}
          />
        )}
      </div>
    </div>
  );
}