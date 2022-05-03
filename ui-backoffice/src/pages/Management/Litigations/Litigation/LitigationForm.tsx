// @ts-nocheck
import { Litigation } from 'src/models/litigation';
import { Stack, Button } from '@mui/material';
import { FormContainer, TextFieldElement, DatePickerElement } from 'react-hook-form-mui'

const LitigationForm = (props: { litigation: Litigation }) => {
    return (
        <FormContainer
            defaultValues={{
                object: props.litigation.litigation_object.label,
                date: props.litigation.date,
                description: props.litigation.message,
                author: props.litigation.author.username,
                target: props.litigation.target.username,
                status: props.litigation.status.label
            }}
            onSuccess={(data) => { console.log(data) }}
        >
            <Stack spacing={4}>
                <TextFieldElement name="title" label="Titre" required />
                <TextFieldElement multiline name="description" label="Description" required />
                {/* <DateFnsProvider>
                    <DatePickerElement
                        label="Date"
                        name="date"
                    />
                </DateFnsProvider> */}
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

export default LitigationForm 