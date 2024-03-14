import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const handleClick = () => {
    const referrer = document.referrer;
    const currentDomain = window.location.origin;

    // Check if the referrer URL is from the same domain
    if (referrer.includes(currentDomain)) {
      window.history.back();
    } else {
      // Redirect to the homepage or any other desired page
      window.location.href = "/";
    }
  };

  return (
    <IconButton onClick={handleClick} aria-label="back">
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;