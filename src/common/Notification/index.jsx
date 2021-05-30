import React, { useEffect, useState, useRef } from 'react';
import './Notification.scss';

const Notification = ({ notice, bubbling }) => {
  const [noticeData, setNoticeData] = useState([]);
  const noticeID = useRef(1);

  const createNotice = () => {
    const params = {
      id: noticeID.current,
      message: notice.message,
      status: notice.error ? 'notice__item_wrong' : 'notice__item_correct',
    };
    setNoticeData((prevState) => [{ ...params }, ...prevState]);
    noticeID.current += 1;
  };

  const deleteNotice = () => {
    setTimeout(() => {
      setNoticeData((prevState) => prevState.splice(0, prevState.length - 1));
    }, 2000);
  };

  useEffect(() => {
    if (!bubbling) {
      return;
    }
    createNotice();
  }, [bubbling]);

  useEffect(() => {
    if (noticeData.length) {
      deleteNotice();
    }
  }, [noticeID.current]);

  return (
    <div className={`notice notice_top notice_left`}>
      {noticeData.map((note) => (
        <div key={note.id} className={`notice__item ${note.status}`}>
          <div className="notice__text">{note.message}</div>
        </div>
      ))}
    </div>
  );
};

Notification.defaultProps = {
  notice: { error: false, message: '' },
  message: 'message text',
};

export default Notification;
