import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { TextField } from "@mui/material";


const FormComponent = ({text, inputs ,buttonText, gridColumn, gridRow, buttonAction, date}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Box
          gridColumn={gridColumn}
          gridRow={gridRow}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={"column"}
        >

          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            {text}
          </Typography>
          <p></p>

          { inputs && inputs.map((input, index) => {
            return(
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label={input.inputText}
                onChange={input.onChange}
                value={input.inputValue}
                name={input.inputText}
                sx={{ gridColumn: "span 2" }}
                />
            )
          })} 
          
          {date}
          
          <p></p>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
          
        </Box>
    )
}

export default FormComponent