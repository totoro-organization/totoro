import { MenuItem, Select } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { StatusContext } from "src/contexts/StatusContext";
import { Status, StatusEnum, StatusOptions } from "src/models";
import { changeStatus } from "src/services/status.service";
import StatusLabel from "../StatusLabel";

interface StatusSelectProps {
    statusOptions: StatusOptions,
    currentItem: {
        id: string,
        status: {
            label: keyof typeof StatusEnum
        }
    },
    table: string
}

function StatusSelect({ statusOptions, currentItem, table }: StatusSelectProps) {

    const allStatuses = useContext(StatusContext);
    const [options, setOptions] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);

    useEffect(() => {
        if(allStatuses.length) {
            const filteredOptions = allStatuses.filter((status: Status<any>) => statusOptions.find(option => option.id === status.label));
            setOptions(filteredOptions);
        }
        
    }, [allStatuses]);


    const handleChange = async (value: string) => {
        setSelectedOption(value);
        const status = allStatuses.find((status: Status<any>) => status.label === value);
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
                    options.map((option: Status<any>) => 
                        <MenuItem  key={option.id} value={option.label}>
                            <StatusLabel status={option.label} />
                        </MenuItem>)
                }
            
            </Select>
    )
}

export default StatusSelect