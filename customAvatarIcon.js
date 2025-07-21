import React from 'react';
import { Avatar } from 'react-native-paper';

const CustomAvatarIcon = ({ icon, ...props }) => {
  return (
    <Avatar.Icon
      {...props}
      icon={icon}
      color="#FFFF"                       // default icon color
      style={[{ backgroundColor: '#FF9933' }, props.style]} // default background
    />
  );
};

export default CustomAvatarIcon;