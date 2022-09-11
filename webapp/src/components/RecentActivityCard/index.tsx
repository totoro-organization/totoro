import useUserActivity from 'src/hooks/useUserActivity';

import {
  Card,
  Avatar,
  useTheme,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Activity from './Activity';
import { Order } from 'src/utils/sortByAscOrder';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.primary.lighter};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
  `
);

function RecentActivityCard() {
  const theme = useTheme();
  // const { tags, difficulties, categories } = useContext(CommonsContext);
  const { recentActivities } = useUserActivity({
    role: 'Administrateur',
    order: Order.DESC
  });

  console.log(recentActivities);

  return (
    <Card>
      <CardContent>
        {recentActivities ? (
          recentActivities.map((activity) => (
            <Activity type={activity.activity_type} />
          ))
        ) : (
          <p>Aucune activité récente</p>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentActivityCard;
