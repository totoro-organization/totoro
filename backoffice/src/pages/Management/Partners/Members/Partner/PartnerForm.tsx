import { Stack, Button } from '@mui/material';
import { FormContainer, TextFieldElement, DatePickerElement } from 'react-hook-form-mui'
import { Partner } from 'src/models/partner';

const PartnerForm = (props: { partner: Partner }) => {
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

export default PartnerForm 