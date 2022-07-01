import { Avatar, AvatarProps } from '@mui/material';
import { getStringToColor } from 'src/utils/getStringToColor';

interface FallbackAvatarProps extends AvatarProps {
  fallback: string;
}

export default function FallbackAvatar(props: FallbackAvatarProps) {
  const { fallback, ...avatarProps } = props;

  

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: getStringToColor(name)
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  }

  return <Avatar {...stringAvatar(fallback)} {...avatarProps} />;
}
