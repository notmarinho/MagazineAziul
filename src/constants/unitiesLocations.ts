const unitiesLocations = {
  'Porto Alegre': {
    latitude: -30.0346471,
    longitude: -51.217658,
  },
  Florianopolis: {
    latitude: -27.5969032,
    longitude: -48.5494544,
  },
  Curitiba: {
    latitude: -25.4284,
    longitude: -49.2733,
  },
  'Sao Paulo': {
    latitude: -23.5505,
    longitude: -46.6333,
  },
  'Rio de Janeiro': {
    latitude: -22.9068,
    longitude: -43.1729,
  },
  'Belo Horizonte': {
    latitude: -19.9208,
    longitude: -43.9378,
  },
  Vitória: {
    latitude: -20.3157,
    longitude: -40.3128,
  },
  'Campo Grande': {
    latitude: -20.4428,
    longitude: -54.6468,
  },
  Goiania: {
    latitude: -16.6781,
    longitude: -49.2539,
  },
  Cuiaba: {
    latitude: -15.6011,
    longitude: -56.0979,
  },
} as const;

export default unitiesLocations;

export type UnityCoordsLocation = keyof typeof unitiesLocations;
