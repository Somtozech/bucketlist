import React from 'react';
import { formatDate, formatTime } from '../utils/formatDate';

export default function BucketList({
  items,
  deleteBucketList,
  setEditedBucketList
}) {
  return (
    <div className="bucketList">
      {items.map(item => (
        <div className="bucketList_item" key={item._id}>
          <div style={{ flex: 1 }}>
            <h5
              style={{
                margin: 0,
                fontWeight: 600,
                width: '90%',
                fontSize: 18,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1
              }}
            >
              {item.name}
            </h5>
            <span style={{ fontSize: 13, color: '#283148' }}>
              {formatDate(item.date_created)} {formatTime(item.date_created)}
            </span>
          </div>
          <div className="buttons" style={{ fontSize: 30 }}>
            <i
              title="delete"
              class="far fa-times-circle"
              style={{ marginRight: 10 }}
              onClick={() => deleteBucketList(item._id)}
            ></i>
            <i
              class="fas fa-marker"
              onClick={() => setEditedBucketList(item)}
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
}
