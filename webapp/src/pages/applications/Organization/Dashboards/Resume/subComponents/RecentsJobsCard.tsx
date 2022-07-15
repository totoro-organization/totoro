import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import getFormatLocalDate from "src/utils/getFormatLocalDate";


function RecentsJobsCard({jobs}: any) {   
  return (
      <>
        <Typography p={3} variant="h3">Missions récente(s)</Typography>
        <Card>
          <Grid p={3} spacing={0} container>
            <Grid item xs={12}>
              {jobs.length ? (
                jobs.map((job) => (
                  <>
                  <Box display="flex" alignItems="center" justifyContent="space-between"  p={3}>
                    <Typography>
                      <Link to={`/association/gestion/missions/${job?.id}`}>{job?.title}</Link>
                    </Typography>
                    <Typography>{`Créé le ${getFormatLocalDate(job.createdAt)}`}</Typography>
                  </Box>
                  </>
                ))
              ):
              <Typography> Aucune mission n'a été créée récement</Typography>}
            </Grid>
          </Grid>
        </Card>
    </>
  )
}

export default RecentsJobsCard