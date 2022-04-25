import { Stack, Button } from '@mui/material';
import { FormContainer, TextFieldElement, DatePickerElement } from 'react-hook-form-mui'
import { Organization } from 'src/models/organization';

const OrganizationForm = (props: { organization: Organization }) => {
    return (
        <FormContainer
            defaultValues={{
                
            }}
            onSuccess={(data) => { console.log(data) }}
        >
            <Stack spacing={4}>
               
                <Button type={'submit'} variant={'contained'} color={'primary'}>Submit</Button>
            </Stack>

        </FormContainer>
    )
}

export default OrganizationForm 