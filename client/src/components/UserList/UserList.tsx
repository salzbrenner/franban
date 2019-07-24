import React, { FC } from 'react';
import './UserList.css';

const LightenDarkenColor = (col: string, amt: number) => {
  let usePound = false;

  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (
    (usePound ? '#' : '') +
    (g | (b << 8) | (r << 16)).toString(16)
  );
};

type UserListProps = {
  users: { email: string; id: string }[];
};
const UserList: FC<UserListProps> = ({ users }) => {
  function mouseEnter(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    // event.currentTarget.style.zIndex = '1';
  }

  function mouseLeave(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    // event.currentTarget.style.zIndex = '0';
  }

  return (
    <div className={`user-list`}>
      {users.map((user, index) => {
        return (
          <div
            className={`user-list__user`}
            onMouseEnter={mouseEnter}
            style={{
              left: `${index * 30}px`,
            }}
            key={user.id}
          >
            <div
              className={`user-list__avatar`}
              style={{
                background: `${LightenDarkenColor(
                  '#324063',
                  30 * index
                )}`,
              }}
            >
              <span>{user.email[0]}</span>
              <span className={`user-list__detail`}>
                {user.email}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
