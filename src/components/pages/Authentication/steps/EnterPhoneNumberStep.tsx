import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import Lottie from "lottie-react";
import phoneNumberAnim from "../../../../assets/images/phoneNumber.json";
import styles from "../SignUp.module.css";
import COUNTRIES from "../../../countryList/countryList";

// List of country codes and labels
const countries = COUNTRIES;

interface Country {
  name: string;
  code: string;
  timezone: string;
  utc: string;
  mobileCode: string;
}

function getCemoji(country: Country): string {
  const code = country.code.toUpperCase(); // Ensure the code is uppercase
  const emojiFlag = String.fromCodePoint(
    ...Array.from(code).map((char) => 0x1f1e6 + char.charCodeAt(0) - 65)
  );
  return emojiFlag;
}

interface PhoneNumberStepProps {
  setCountrycode: (value: string) => void;
  Code: string;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleNext: () => void;
  error: string;
}
console.log("خزعبلات");
const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({
  Code,
  setCountrycode,
  phoneNumber,
  setPhoneNumber,
  handleNext,
  error,
}) => {
  const [country, setCountry] = useState<Country>(countries[0]);

  setCountrycode(country.mobileCode);
  return (
    <Box className={styles.center}>
      <Typography sx={{ direction: "rtl" }}>
        شماری ای که میخای باهاش ثبت نام کنی رو وارد کن
      </Typography>
      <Lottie
        animationData={phoneNumberAnim}
        loop={false}
        style={{ width: "50%" }}
      />

      <TextField
        fullWidth
        label="شماره تلفن"
        variant="outlined"
        margin="normal"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={!!error}
        helperText={error}
        placeholder="مثال :‌ 9123456789"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Autocomplete
                value={country}
                onChange={(event, newValue) => {
                  // Ensure newValue is not null
                  if (newValue) {
                    setCountry(newValue);
                  }
                }}
                options={countries}
                getOptionLabel={(option) =>
                  `${getCemoji(option)} ${option.name} (${option.mobileCode})`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      sx: { fontSize: "0.75rem" }, // Adjust the font size here
                    }}
                  />
                )}
                disableClearable
                sx={{ width: 150 }} // Adjust width for the autocomplete
              />
            </InputAdornment>
          ),
        }}
      />

      <Box className={styles.handlebutton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          type="submit"
          disabled={!phoneNumber}
          className={styles.button}
        >
          بعدی
        </Button>
      </Box>
    </Box>
  );
};

export default PhoneNumberStep;
