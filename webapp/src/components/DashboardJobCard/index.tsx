import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { config } from "src/api/config"
import { APP_PATHS } from "src/appPaths"
import FallbackAvatar from "src/components/FallbackAvatar"
import { Job } from "src/models"
import getFormatLocalDate from "src/utils/getFormatLocalDate"

interface DashboardJobCardProps {
    job: Job
}

function DashboardJobCard({ job }: DashboardJobCardProps) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
            <FallbackAvatar
            variant="rounded"
            src={config.server + job.author.user.avatar}
            fallback={job.author.user.firstname + ' ' + job.author.user.lastname}
            alt={job.author.user.firstname + ' ' + job.author.user.lastname}
            />
        }
        title={job.title}
        subheader={'Ajouté par ' + job.author.user.firstname + ' ' + job.author.user.lastname}
      />
      <CardMedia
        component="img"
        height="194"
        image={config.server + job.attachments[0].image}
        alt="Job"
      />
      <CardContent>
        <Typography variant="body1">
        {`${getFormatLocalDate(job.start_date)} - ${getFormatLocalDate(job.end_date)}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { job.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={APP_PATHS.ORGANIZATION_JOB(job.id)}>Voir la mission</Link>
      </CardActions>
    </Card>
  )
}

export default DashboardJobCard