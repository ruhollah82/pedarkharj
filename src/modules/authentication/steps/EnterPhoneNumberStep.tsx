import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Autocomplete,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Lottie from "lottie-react";
import phoneNumberAnim from "../../../assets/Images/phoneNumber.json";
import styles from "../SignUp.module.css";
import COUNTRIES from "../../../data/countryList/countryList";
import Country from "../../../types/types/country.type";

// List of country codes and labels
const countries = COUNTRIES;

function getCemoji(country: Country): string {
  const code = country.code.toUpperCase(); // Ensure the code is uppercase
  const emojiFlag = String.fromCodePoint(
    ...Array.from(code).map((char) => 0x1f1e6 + char.charCodeAt(0) - 65)
  );
  return emojiFlag;
}

interface PhoneNumberStepProps {
  setCountrycode: (value: string) => void;
  countryCode: string;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleNext: () => void;
  error: string | undefined;
  isLoading?: boolean;
}

const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({
  setCountrycode,
  countryCode,
  phoneNumber,
  setPhoneNumber,
  handleNext,
  error,
  isLoading = false,
}) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [isValid, setIsValid] = useState(true);

  // Initialize country based on countryCode prop
  useEffect(() => {
    if (!country) {
      const defaultCountry =
        countries.find((c) => c.mobileCode === countryCode) || countries[0];
      setCountry(defaultCountry);
      setCountrycode(defaultCountry.mobileCode);
    }
  }, [countryCode, country, setCountrycode]);

  // Update country code when country changes
  useEffect(() => {
    if (country) {
      setCountrycode(country.mobileCode);
    }
  }, [country, setCountrycode]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && validatePhoneNumber()) {
      handleNext();
    }
  };

  const validatePhoneNumber = (): boolean => {
    // Simple validation - at least 7 digits
    const isValidNumber = /^\d{7,}$/.test(phoneNumber);
    setIsValid(isValidNumber);
    return isValidNumber;
  };

  const handleNextClick = () => {
    if (validatePhoneNumber()) {
      handleNext();
    }
  };

  return (
    <Box className={styles.center}>
      <Typography
        variant="h6"
        sx={{ direction: "rtl", mb: 2, fontWeight: "bold" }}
      >
        شماری ای که میخای باهاش ثبت نام کنی رو وارد کن
      </Typography>

      <Lottie
        animationData={phoneNumberAnim}
        loop={false}
        style={{ width: "50%", maxWidth: "300px" }}
      />

      <Box sx={{ width: "100%", maxWidth: "400px", mt: 3 }}>
        <TextField
          fullWidth
          label="شماره تلفن"
          variant="outlined"
          margin="normal"
          value={phoneNumber}
          onChange={(e) => {
            // Allow only numbers
            const value = e.target.value.replace(/\D/g, "");
            setPhoneNumber(value);
            setIsValid(true); // Reset validation on change
          }}
          onKeyDown={handleKeyDown}
          error={!!error || !isValid}
          helperText={error || (!isValid && "لطفاً شماره تلفن معتبر وارد کنید")}
          placeholder="مثال: 9123456789"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <Autocomplete
                  value={country || undefined}
                  onChange={(_, newValue) => {
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
                        sx: {
                          fontSize: "0.75rem",
                          minWidth: "140px",
                        },
                      }}
                    />
                  )}
                  disableClearable
                  sx={{ width: 180 }}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      style={{ direction: "ltr", textAlign: "right" }}
                    >
                      <span style={{ marginLeft: 8 }}>{getCemoji(option)}</span>
                      {option.name} ({option.mobileCode})
                    </li>
                  )}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className={styles.handlebutton} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextClick}
          disabled={!phoneNumber || isLoading}
          className={styles.button}
          sx={{
            minWidth: "120px",
            height: "40px",
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>در حال بررسی...</span>
              <CircularProgress size={20} sx={{ ml: 1, color: "white" }} />
            </Box>
          ) : (
            "بعدی"
          )}
        </Button>
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 2,
          color: "text.secondary",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        با وارد کردن شماره تلفن خود، شرایط استفاده و حریم خصوصی را می‌پذیرید
      </Typography>
    </Box>
  );
};

export default PhoneNumberStep;
