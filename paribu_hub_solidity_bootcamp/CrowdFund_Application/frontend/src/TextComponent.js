import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
const TextComponent = ({title, textfields, onSubmit, buttonText}) => {
    return(
        <div>
        <h3>{title}</h3>


        {textfields && textfields.map((text, i) => {
            return (
              <div>
                <TextField
                key={i}
                name={text.name}
                floatingLabelText={text.label}
                value={text.value}
                onChange={text.onChange}
                label = {text.name}
                />
                <br />
              </div>
                
            );
        })}
        
        <br />
        <Button
          type="submit"
          variant="contained"
          onClick={onSubmit}
          href="#contained-buttons"
        >
          {buttonText}
        </Button>
        <br />
    </div>
    )
}

export default TextComponent;