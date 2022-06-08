import { MenuItem, Select } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { StatusContext } from "src/contexts/StatusContext";
import { changeStatus } from "src/services/status.service";
import StatusLabel from "../StatusLabel";

function StatusSelect({ statusOptions, currentItem, table, handleChangeStatus }: any) {

    const statusAll = useContext(StatusContext);
    const [options, setOptions] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);

    useEffect(() => {
        if(statusAll.length) {
            const filteredOptions = statusAll.filter((status) => {
                if(statusOptions.find(option => option.id === status.label)) return status;
            })
            setOptions(filteredOptions);
        }
        
    }, [statusAll]);


    const handleChange = async (value) => {
        setSelectedOption(value);
        const status = statusAll.find(status => status.label === value);
        console.log(status);
        const response = await changeStatus({
            tableName: table,
            id: currentItem.id,
            status_id: status.id
        });
        if('error' in response) return;
    }


    return (
        <Select
            id="admin_role"
            value={selectedOption ?? currentItem?.status.label}
            required
            onChange={(e) => handleChange(e.target.value)}
            >
                {
                    options.map((option, i) => 
                        <MenuItem  key={option.id} value={option.label}>
                            <StatusLabel status={option.label} />
                        </MenuItem>)
                }
            
            </Select>
    )
}

export default StatusSelect