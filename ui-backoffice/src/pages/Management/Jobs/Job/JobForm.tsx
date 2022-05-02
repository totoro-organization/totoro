import { Job } from 'src/models/job';
import { Stack, Button } from '@mui/material';
import { FormContainer, TextFieldElement, DatePickerElement } from 'react-hook-form-mui'
import DateFnsProvider from 'src/components/DateFnsProvider';

const JobForm = (props: { job: Job }) => {
    return (
        <FormContainer
            defaultValues={{
                title: props.job.title,
                date: props.job.date,
                description: props.job.description,
                tokens: props.job.tokens,
                capacity: props.job.capacity,
                participants: props.job.participants
            }}
            onSuccess={(data) => { console.log(data) }}
        >
            <Stack spacing={4}>
                <TextFieldElement name="title" label="Titre" required />
                <TextFieldElement multiline name="description" label="Description" required />
                <DateFnsProvider>
                    <DatePickerElement
                        label="Date"
                        name="date"
                    />
                </DateFnsProvider>
                <TextFieldElement type="number" name="tokens" label="Tokens" required />
                <TextFieldElement type="number" name="capacity" label="Nombre de participants max" required />
                <TextFieldElement inputProps={
					{ readOnly: true, }
				} type="number" name="participants" label="Nombre de participants" required />
                <Button type={'submit'} variant={'contained'} color={'primary'}>Submit</Button>
            </Stack>

        </FormContainer>
    )
}

export default JobForm