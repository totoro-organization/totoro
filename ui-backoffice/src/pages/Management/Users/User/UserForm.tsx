import { Stack, Button } from '@mui/material';
import { FormContainer, TextFieldElement, DatePickerElement } from 'react-hook-form-mui'
import { User } from 'src/models/user';

const UserForm = (props: { user: User }) => {
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

export default UserForm 