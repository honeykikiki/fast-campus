import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { NotificationProps } from 'pages/notification';
import { useNavigate } from 'react-router-dom';
import styles from './notifications.module.scss';

export default function NotificationsBox({
  notifications,
}: {
  notifications: NotificationProps;
}) {
  const nav = useNavigate();

  const onClickNotification = async (url: string) => {
    // isRead 없데이트
    let ref = doc(db, 'notifications', notifications.id);
    await updateDoc(ref, {
      isRead: true,
    });
    console.log(url);

    nav(url);
  };

  return (
    <div className={styles.notification}>
      <div className="" onClick={() => onClickNotification(notifications.url)}>
        <div className={styles.notification__flex}>
          <div className={styles.notification__createdAt}>
            {notifications.createdAt}
          </div>
          {notifications.isRead === false && (
            <div className={styles.notification__unread}></div>
          )}
        </div>
        <div>{notifications.content}</div>
      </div>
    </div>
  );
}
