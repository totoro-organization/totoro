import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { List, ListItem, ListItemButton, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface PlacesAutocompleteProps {
  name: string
}

export default function PlacesAutocomplete({ name }: PlacesAutocompleteProps) {
  const { control, setValue: setFormValue } = useFormContext();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        const address = {
          ...getFormattedAddress(results[0]),
          longitude: lng,
          latitude: lat
        };
        setFormValue(name, address);
      });
    };

  const getFormattedAddress = (data) => {
    const { address_components } = data;
    let formattedAddress = {
      address: '',
      cp: null,
      commune: null
    };
    const components = ['street_number', 'route', 'locality', 'postal_code'];
    address_components.forEach((element) => {
      components.forEach((component) => {
        if (element.types.includes(component)) {
          if (component === 'street_number' || component === 'route') {
            formattedAddress.address += ' ' + element.long_name;
          } else if (component === 'locality') {
            formattedAddress.commune = element.long_name;
          } else if (component === 'postal_code') {
            formattedAddress.cp = element.long_name;
          }
        }
      });
    });
    formattedAddress.address = formattedAddress.address.trim();
    return formattedAddress;
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <ListItem key={place_id} sx={{ pl: 0 }}>
          <ListItemButton
            role={undefined}
            onClick={handleSelect(suggestion)}
            dense
          >
            {main_text} {secondary_text}
          </ListItemButton>
          {/* <strong></strong> <small></small> */}
        </ListItem>
      );
    });

  return (
    <div ref={ref}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
          sx={{ width: '100%'}}
            label="Addresse"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Where are you going?"
          />
        )}
      />

      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <List sx={{ pl: 0, border: 'solid lightgray 1px', borderRadius: 1 }}>
          {renderSuggestions()}
        </List>
      )}
    </div>
  );
}
