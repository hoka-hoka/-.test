import React, { useEffect, useState, useRef } from 'react';
import './Notification.scss';

const Notification = ({ error, message, bubbling }) => {
  const [notice, setNotice] = useState([]);
  const noticeID = useRef(1);

  const createNotice = () => {
    const params = {
      id: noticeID.current,
      message: noticeID.current,
      status: error ? 'notice__item_wrong' : 'notice__item_correct',
    };
    setNotice((prevState) => [{ ...params }, ...prevState]);
    noticeID.current += 1;
  };

  const deleteNotice = () => {
    setTimeout(() => {
      setNotice((prevState) => prevState.splice(0, prevState.length - 1));
    }, 2000);
  };

  useEffect(() => {
    if (!bubbling) {
      return;
    }

    createNotice();
  }, [bubbling]);

  useEffect(() => {
    if (notice.length) {
      deleteNotice();
    }
  }, [noticeID.current]);

  return (
    <div className={`notice notice_top notice_left`}>
      {notice.map((note) => (
        <div key={note.id} className={`notice__item ${note.status}`}>
          <div className="notice__text">{note.message}</div>
        </div>
      ))}
    </div>
  );
};

Notification.defaultProps = {
  error: false,
  bubbling: false,
  message: 'message text',
};

export default Notification;
