import { ChangeEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { InputBase, Paper, useTheme } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

interface SearchbarProps {
  searchQuery: string,
  setSearchQuery: (value: string) => void
}

function Searchbar({setSearchQuery, searchQuery}: SearchbarProps) {

  return (
    <Paper
      component="form"
      sx={{ height: '40px', p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400 }}
    >
       <SearchIcon sx={{ p: .5}} />
       <InputBase
        sx={{ ml: 1, flex: 1 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        placeholder="Rechercher"
        inputProps={{ 'aria-label': 'Search' }}
      />
     { searchQuery && <IconButton size="small" color="secondary" aria-label="directions">
        <CancelIcon sx={{ p: .5 }}/>
      </IconButton>}
      </Paper>
  );
}
  export default Searchbar