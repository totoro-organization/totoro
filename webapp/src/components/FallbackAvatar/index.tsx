import { Avatar, AvatarProps } from '@mui/material';
import { getStringToColor } from 'src/utils/getStringToColor';

interface FallbackAvatarProps extends AvatarProps {
  fallback: string;
  fallbackIcon?: JSX.Element
}

export default function FallbackAvatar(props: FallbackAvatarProps) {
  const { fallback, fallbackIcon, ...avatarProps } = props;
  
  function handleFallback() {    
      return {
        sx: {
          ...avatarProps.sx,
          bgcolor: getStringToColor(fallback ?? "N O")
        },
        children: fallback ? `${fallback.split(' ')[0][0]}${fallback.split(' ')[1][0]}` : fallbackIcon
      };
  }

  return <Avatar {...handleFallback()} {...avatarProps} />;
}
