import React from 'react';
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import  PlaceAutocompleteClassic  from './AutocompleteClassic';


const CustomMapControl = ({
  controlPosition,
  selectedAutocompleteMode,
  onPlaceSelect
}) => {
  const { id } = selectedAutocompleteMode;

  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control w-full">
        {id === 'classic' && (
          <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
        )}

      </div>
    </MapControl>
  );
};

export default CustomMapControl;