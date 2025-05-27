import { useNavigate } from 'react-router-dom';

import { List } from '../../components/List.jsx';
import { Card } from '../../components/Card.jsx';
import { useCountries } from './use-countries.js';

const CountryList = () => {
  const navigate = useNavigate();

  const [countries, { error, status }] = useCountries();

  return (
    <>
      {error && <h2>Cannot fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}

      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};

export { CountryList };
