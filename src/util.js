export const getAvailableCrypto = (cryptos) => Object.keys(cryptos)

export const fetchData = async (desiredPair) => {
    const data = await fetch(`http://localhost:3001/currencypair?pair=${desiredPair}`, {
        method: 'GET',
    })
        .then(res => res.json())

    return data;
};

export const fetchAssets = async () => {
    const data = await fetch(`http://localhost:3001/assets`, {
        method: 'GET',
    })
        .then(res => res.json())
    return getAvailableCrypto(data);
};

export const getHighValue = (highArr) => {
    const numArr = highArr.map(value => Number(value))
    return Math.max(...numArr);
};