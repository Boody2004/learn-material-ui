import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Notes
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{ "& > :not(style)": { my: 3, width: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            id="outlined-basic"
            label="Note Title"
            variant="outlined"
            required
          />

          <TextField
            onChange={(e) => setDetails(e.target.value)}
            id="outlined-basic"
            label="Details"
            variant="outlined"
            multiline
            rows={4}
            required
          />
        </Box>

        <Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Note Category
            </FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="mony" control={<Radio />} label="Mony" />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminder"
                control={<Radio />}
                label="Reminder"
              />
              <FormControlLabel value="word" control={<Radio />} label="Word" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ "& button": { my: 2 } }}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}
