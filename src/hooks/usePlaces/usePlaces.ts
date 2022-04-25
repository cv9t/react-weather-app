import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

function usePlaces() {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY,
    options: {
      input: '',
      types: ['(cities)'],
    },
  });

  return { placePredictions, getPlacePredictions, isPlacePredictionsLoading };
}

export { usePlaces };
