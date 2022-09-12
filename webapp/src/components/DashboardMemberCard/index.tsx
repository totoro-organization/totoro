import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { config } from 'src/api/config';
import { OrganizationMember } from 'src/models';
import getFormatLocalDate from 'src/utils/getFormatLocalDate';
import FallbackAvatar from '../FallbackAvatar';

interface DashboardMemberCardProps {
  member: OrganizationMember;
}

function DashboardMemberCard({ member }: DashboardMemberCardProps) {
  return (
    <Card>
      <CardHeader
        avatar={
          <FallbackAvatar
            variant="rounded"
            src={config.server + member.user.avatar}
            fallback={
              member.user.firstname + ' ' + member.user.lastname
            }
            alt={member.user.firstname + ' ' + member.user.lastname}
          />
        }
        title={member.user.firstname + ' ' + member.user.lastname}
        subheader={member.user.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { 'Le ' + getFormatLocalDate(member.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardMemberCard;
