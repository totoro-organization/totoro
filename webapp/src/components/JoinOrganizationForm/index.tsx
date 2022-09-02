import { Box, Paper, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOrganizations } from 'src/api/organizations/hooks';
import Searchbar from 'src/components/Searchbar';
import { Organization } from 'src/models';
import SuspenseLoader from '../SuspenseLoader';
import JoinOrganizationList from './components/List';

const filterData = (query: string, data: Organization[]) => {
  console.log(query);

  if (!query) {
    console.log('no query');

    return data;
  } else {
    return data.filter((d: Organization) =>
      d.name.toLowerCase().includes(query)
    );
  }
};

const paperClasses = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 2,
  padding: 2
}


function JoinOrganizationForm() {
  const { data: organizations, loading } = useOrganizations();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  // const [checked, setChecked] = useState([0]);

  useEffect(() => {
      const dataFiltered = filterData(searchQuery, organizations?.data);
      setFilteredItems(dataFiltered);
  }, [searchQuery]);

  useEffect(() => {
    if (organizations?.data) {
      setFilteredItems(organizations?.data);
    }
  }, [organizations?.data]);
  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };
  
  return (
    <Paper sx={paperClasses} component={Box}>
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {filteredItems ? (
        <JoinOrganizationList organizations={filteredItems} />
      ) : (
        <SuspenseLoader />
      )}
    </Paper>
  );
}

export default JoinOrganizationForm;
