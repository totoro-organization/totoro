import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import BeforeConfirmationIllustration from "./BeforeIllustration"

function BeforeValidationContent() {
  return (
    <>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box display="flex" flexDirection="column" rowGap={4}>
            <Typography component="h1" variant="h2">
              Vérifie tes mails et active ton compte pour commencer
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              Oups ! On dirait que ton compte n'a pas encore été activé. Pour se
              faire je t'invite à cliquer sur le lien qui t'as été envoyé par
              mail.
            </Typography>
          </Box>
          <Button
            to="/login"
            component={Link}
            sx={{ width: 'fit-content' }}
            variant="contained"
            color="primary"
          >
            Je me connecte
          </Button>
        </Box>
        <BeforeConfirmationIllustration />
      </>
  )
}

export default BeforeValidationContent