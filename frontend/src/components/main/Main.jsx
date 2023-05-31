import "./main.css";
import { useState } from "react";
import axios from "axios";
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from "@mui/material";
import placeholderImage from '../../images/place.png';
const Main = () => {
    const [prompt, setPrompt] = useState("");
    const [size, setSize] = useState("");
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const sizes = {
        small: "256x256",
        medium: "512x512",
        large: "1024x1024"
    };

    const clickHandler = async () => {
        if (!prompt || !size) {
            alert("Please enter a prompt and select a size!")
            return;
        }
        try {
            const url = "http://localhost:8181/generate";
            setLoading(true);
            const data = { prompt, size };
            const response = await axios.post(url, data);
            const imgSrc = response.data.src;
            setImg(imgSrc);
        } catch (error) {
            alert(error);
        }
        finally {
            setLoading(false);
        }

    }
    return (
        <div className="main">
            <h1 className="title">DALL-E Preview</h1>
            <Stack spacing={2} className="main-stack">
                <TextField label="Prompt" variant="outlined" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <FormControl fullWidth>
                    <InputLabel>Size</InputLabel>
                    <Select
                        value={size}
                        label="Size"
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <MenuItem value={sizes.small}>Small</MenuItem>
                        <MenuItem value={sizes.medium}>Medium</MenuItem>
                        <MenuItem value={sizes.large}>Large</MenuItem>

                    </Select>
                </FormControl>
                <Button variant="contained" onClick={clickHandler} disabled={loading}>Generate New Image</Button>
            </Stack>

            <div className="image-placeholder">
                {loading && <CircularProgress style={{ color: 'blue' }} />}
                <img src={img !== "" ? img : placeholderImage} alt="Image" />
                {loading && <div className="overlay"></div>}
            </div>

        </div>
    );
};

export default Main;