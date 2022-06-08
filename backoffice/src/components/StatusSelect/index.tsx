import { MenuItem, Select } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { StatusContext } from "src/contexts/StatusContext";

function StatusSelect({ statusOptions, currentStatus }) {

    const statusAll = useContext(StatusContext);
    const [options, setOptions] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<any>(currentStatus?.label);

    // useEffect(() => {
    //     if(currentStatus) setSelectedOption(currentStatus)
    // }, [currentStatus]);

    useEffect(() => {
        if(statusAll.length) {
            const filteredOptions = statusAll.filter((status) => {
                if(statusOptions.find(option => option.id === status.label)) return status;
            })
            setOptions(filteredOptions);
        }
        
    }, [statusAll]);


    return (
        <Select
            id="admin_role"
            defaultValue={selectedOption}
            displayEmpty
            label="Modifier le Rôle"
            required
            onChange={(e) => console.log(e.target.value)}
            >
                {
                    options.map((option, i) => <MenuItem  key={option.id} value={option.label}>{option.label}</MenuItem>)
                }
            
            </Select>
    )
}

export default StatusSelect