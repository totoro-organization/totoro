import { Box, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logo from 'src/assets/image/logo/totoro-logo.svg';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        flex-direction: column;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
        margin-top: 4px;
        transform: scale(.8);
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {


  return (
    <LogoWrapper to="/dashboards/statistiques">
      <LogoSignWrapper>
          <img src={logo} alt="" />
      </LogoSignWrapper>
      <Hidden smDown>
        <LogoText>Admin Dashboard</LogoText>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
