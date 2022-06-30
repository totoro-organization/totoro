import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Card,
    Box,
    Grid,
    TextField,
    Select, 
    InputLabel,
    MenuItem,
    Container,
    FormControl,
    Autocomplete
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useContext, useState, useRef, useEffect } from 'react';
import DateFnsProvider from 'src/components/DateFnsProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { addItem } from 'src/services/common.service'
import { useNavigate } from 'react-router-dom';
import { CommonsContext } from 'src/contexts/CommonsContext';
import { API_ROUTES } from 'src/services/routes';

function CreatingCard() {

    const navigate = useNavigate();

    const { tags, difficulties, categories } = useContext(CommonsContext);

    const [date, setDate] = useState<Date | null>(null);

    const [level, setLevel] = useState<Object | null>(null);;

    const [image, setImage] = useState<File>();

    const [preview, setPreview] = useState<string | null>();
    
    const fileInputRef = useRef<HTMLInputElement>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        addItem (API_ROUTES.JOBS, {
            title: data.get('jobTitle'),
            participants_max: data.get('participantsMax'),
            tags: data.get('tag'),
            startingdate: date,
            difficulties: level
        }) 
       

        .then (response => {
            if('error' in response) {
                console.log('error');
                return
            }
            navigate('/missions')
        })
    }

    useEffect(() => {
        if (image) {   
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(image);
        } else {
          setPreview(null);
        }
      }, [image]);

    difficulties.sort(function(x,y){
        var firstIndex = new Date(x.level),
        secondIndex = new Date(y.level);

        if (firstIndex < secondIndex) return -1;
        if (firstIndex > secondIndex) return 1;
        return 0
    })

    return (
        <Container maxWidth="md">
            <Card>
                <Box p={4} component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="jobTitle"
                            label="Titre de la mission"
                            name="jobTitle"
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                limitTags={4}
                                id="multiple-limit-tags"
                                options={tags.map(tag => tag.label)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Choisissez un tag" placeholder="tag" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="category"
                                options={categories}
                                renderInput={(params) => (
                                    <TextField {...params} label="Choisissez une catégorie" placeholder="catégorie" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DateFnsProvider>
                                <DatePicker
                                    label="Date de commencement"
                                    value={date}
                                    onChange={(newDate) => {
                                    setDate(newDate);
                                    }}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </DateFnsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Difficulté</InputLabel>
                                <Select
                                    fullWidth
                                    required
                                    value={level}
                                    label="Difficulté"
                                    onChange={(e) => setLevel(e.target.value)}
                                    >
                                    {difficulties.map((difficulty) => (
                                        <MenuItem key={difficulty.id} value={difficulty}>
                                            {`${difficulty.level} (${difficulty.token} tokens)`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                inputProps={{ min: 0 }}
                                type='number'
                                name="participantsMax"
                                label="Nombre de places"
                                id="participantsMax"
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
                            {preview && image ? (
                            <div style={{ display: "flex", gap: "1rem"}}>
                                <img
                                    src={preview}
                                    alt="preview attachment"
                                    style={{ objectFit: "cover", width: '200px' }}
                                    onClick={() => setImage(null)}
                                />
                                <div>
                                    <p> {image.name}</p>
                                    <p> {(image.size / (1024*1024)).toFixed(2)} MB</p>
                                    <DeleteIcon onClick={() => {setImage(null)}}></DeleteIcon>
                                </div>
                            </div>
                            ) : (
                                <Button variant="outlined"
                                    component="button"
                                    onClick={(event) => {
                                    event.preventDefault();
                                    fileInputRef.current.click();
                                    }}
                                >
                                    Ajouter une image
                                </Button>
                            )}
                            <input
                                type="file"
                                required
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file && file.type.substr(0, 5) === "image") setImage(file);
                                    else setImage(null);
                                }}
                            />
   
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Créer la mission
                        </Button>
                    </Grid>
                </Box>
            </Card>
        </Container>
    )  
  }
export default CreatingCard;