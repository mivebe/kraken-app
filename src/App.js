import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import AppBar from '@mui/material/AppBar';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import Currency from './components/Currency';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchAssets, fetchData } from './util';

function App() {

  const [crypto, setCrypto] = useState('');
  const [currency, setCurrency] = useState('');
  const [desiredPair, setDesiredPair] = useState('');
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState('');

  const location = useLocation();

  useEffect(() => {
    const getAssets = async () => {

      const res = await fetchAssets();

      const assetEntries = Object.entries(res);
      const assetNames = assetEntries.map(entry => entry[1]);

      res && setAssets(assetNames);
    };
    getAssets();
  }, []);

  const getData = useCallback(async (pair) => {
    const res = await fetchData(pair);

    const pairName = Object.keys(res)[0];
    const pairData = { ...res[pairName], pairName };

    if (pairData) {
      setDesiredPair(pairData);
      setLoading(false);
    }

  }, []);

  useEffect(() => {

    if (location.pathname !== '/') {
      getData(location.pathname.slice(1));
    };

  }, [location, getData]);

  useEffect(() => {
    const intervalCall = setInterval(() => {
      if (location.pathname !== '/' && !crypto && !currency) {
        getData(location.pathname.slice(1));
      };
      if (crypto && currency) {
        getData(`${crypto}${currency}`);
      };
    }, 5000);
    return () => {
      clearInterval(intervalCall);
    };
  }, [location, getData, crypto, currency]);

  const handleSubmit = () => {
    setLoading(true);
    getData(`${crypto}${currency}`);
  };

  const handleAssetClick = (e) => {
    const firstLetter = e.target.name.charAt(0).toLowerCase();

    firstLetter === 'z' && setCurrency(e.target.name);
    firstLetter === 'x' && setCrypto(e.target.name);
  };

  const handleChange = (e) => {
    e.target.id === 'crypto' && setCrypto(e.target.value);
    e.target.id === 'currency' && setCurrency(e.target.value);
  };

  return (
    <div id="app-container">
      <AppBar position='static' sx={{ minHeight: '50px', padding: "20px", fontSize: '20px' }}>Tiny Krakent App</AppBar>
      <div id='Home'>
        <Accordion sx={{ margin: '40px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="tradable-assets"
            id="tradable-assets-accordion"
          >
            <Typography>Tradable Assets</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {assets && assets.map(asset =>
              <Button
                key={asset}
                name={asset}
                onClick={handleAssetClick}
              >
                {asset}
              </Button>)}
          </AccordionDetails>
        </Accordion>
        <div id='currency-input'>
          <TextField
            id="crypto"
            label="Crypto"
            sx={{ maxWidth: '100px' }}
            value={crypto}
            onChange={handleChange}
          />
          <p className='divider'> / </p>
          <TextField
            id="currency"
            label="Currency"
            sx={{ maxWidth: '100px' }}
            value={currency}
            onChange={handleChange}
          />
          <LoadingButton id='submit' loading={loading} variant="outlined" onClick={handleSubmit}>Search</LoadingButton>
        </div>
        <div id='results-container' >
          {desiredPair && <Currency pairData={desiredPair} />}
        </div>
      </div>
    </div>
  );
};

export default App;
