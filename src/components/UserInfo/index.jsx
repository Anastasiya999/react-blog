import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.user}>
      <img src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userDetailsName}>{fullName}</span>
        <span className={styles.userDetailsAdditional}>{additionalText}</span>
      </div>
    </div>
  );
};
