import { FC } from 'react';
import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid } from '@mui/material';

interface PageTitleProps {
    heading?: string;
    subHeading?: string;
    link?: string;
}

const PageTitle: FC<PageTitleProps> = ({
    heading = '',
    subHeading = '',
    link = '',
    ...rest
}) => {
    return (
        <Grid container justifyContent="space-between" alignItems="center" {...rest}>
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    {heading}
                </Typography>
                <Typography variant="subtitle2">
                    {subHeading}
                </Typography>
            </Grid>
            { link && <Grid item>
                <Button
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                >
                    {heading} Documentation
                </Button>
            </Grid>}
        </Grid>
    );
};

PageTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    link: PropTypes.string,
};

export default PageTitle;
