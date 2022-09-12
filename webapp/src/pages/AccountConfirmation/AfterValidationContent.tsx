import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { APP_PATHS } from "src/appPaths"
import AfterConfirmationIllustration from "./AfterIllustration"

function BeforeValidationContent() {
  return (
    <>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box display="flex" flexDirection="column" rowGap={4}>
            <Typography component="h1" variant="h2">
              Ton compte a été validé avec succès
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              lorem ipsum
            </Typography>
          </Box>
          <Button
            to={APP_PATHS.LOGIN}
            component={Link}
            sx={{ width: 'fit-content' }}
            variant="contained"
            color="primary"
          >
            Je me connecte
          </Button>
        </Box>
        <AfterConfirmationIllustration />
      </>
  )
}

export default BeforeValidationContent