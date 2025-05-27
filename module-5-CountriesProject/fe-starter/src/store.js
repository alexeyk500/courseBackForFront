import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

import * as api from './config.js';
import { themeReducer } from './features/theme/theme-slice.js';
import { controlsReducer } from './features/controls/controls-slice.js';
import { countryReducer } from './features/countries/countries-slice.js';
import { detailsReducer } from './features/details/details-slice.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: countryReducer,
    details: detailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});
