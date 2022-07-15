import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StatusLabel from "src/components/StatusLabel";


function RecentsMembersCard({ members }: any) {
  console.log(members);

  return (
    <>
      <Typography p={3} variant="h3">Membres récent(s)</Typography>
      <Card>
        <Grid p={3} spacing={0} container>
          <Grid item xs={12}>
            {members.length ? (
              members.map((member) => (
                <>
                  <Box display="flex" alignItems="center" justifyContent="space-between" p={3}>
                    <Box>
                      <Typography>
                        {`${member.user.firstname} ${member.user.lastname}`}
                      </Typography>
                      <Typography>
                        {member.user.email}
                      </Typography>
                    </Box>
                    <p>{member.role.label}</p>
                  </Box>
                </>
              ))
            ) :
              <Typography> Aucun membre n'a été rejoint l'association récement</Typography>}
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default RecentsMembersCard