import { DataUsageTwoTone } from '@mui/icons-material';
import {
    Button,
    Card,
    Box,
    Grid,
    Typography,
    Hidden,
    Avatar,
    Divider,
    ListItem,
    ListItemText,
    TextField,
    List,
    ListItemAvatar,
    Autocomplete
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import DateFnsProvider from 'src/components/DateFnsProvider';
import { DatePicker } from '@mui/x-date-pickers';

function CreatingCard() {

    const jobOptions = [
        'tag1', 'tag 2', 'tag3'
       ];

    const [date, setDate] = useState<Date | null>(null);


/*     const { createmission, loading } = createdMission();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        createmission({
            missionstype: data.get('missiontype'),
            tag: data.get('tag'),
            tokens: data.get('tokens'),
            startingdate: date,
        }) */

    return (
           
        <Card component="form" noValidate style={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="missionType"
                    label="Type de mission"
                    name="missionstype"
                />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={jobOptions}
                        renderInput={(params) => (
                            <TextField {...params} label="Choisissez un tag" placeholder="Favorites" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DateFnsProvider>
                        <DatePicker
                            label="Basic example"
                            value={date}
                            onChange={(newDate) => {
                            setDate(newDate);
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </DateFnsProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        required
                        label="Tokens gagnés"
                        id="outlined-start-adornment"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">tokens</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        required
                        label="Nombre de places"
                        id="outlined-start-adornment"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">places</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        multiline
                        rows={4}
                        fullWidth
                        id="missionDescription"
                        label="Description"
                        name="missiondescription"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="upload-photo"
                        type="file"
                    />
                </Grid>
                <Button
                    disabled={false}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Créer mission
                </Button>
            </Grid>
        </Card>
    )
        
  }

export default CreatingCard;