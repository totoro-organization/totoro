// @ts-nocheck
import { Stack, Button } from '@mui/material';
import { FormContainer, TextFieldElement, DatePickerElement } from 'react-hook-form-mui'
import { MembershipRequest } from 'src/models/membership_request';

const MembershipRequestForm = (props: { request: MembershipRequest }) => {
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

export default MembershipRequestForm 