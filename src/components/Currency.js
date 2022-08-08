import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { getHighValue } from "../util";

function Currency({ pairData }) {

  const [quantity, setQuantity] = useState(1);

  const { h, pairName } = pairData;
  const high = getHighValue(h);

  const handleChange = (e) => setQuantity(e.target.value);

  return (
      <div id="pair-container">
        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField
          id="pairName"
          label="Pair"
          value={pairName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="highest"
          label="High value"
          value={high}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="quantity"
          label="Quantity"
          sx={{ maxWidth: '100px' }}
          value={quantity}
          onChange={handleChange}
        />
        <TextField
          id="price"
          label="price"
          value={high * quantity}
          InputProps={{
            readOnly: true,
          }}
        />
        </Box>
      </div>
  )
}
export default Currency