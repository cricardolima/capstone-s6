import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

export const ButtonBack = () => {
  const history = useHistory();
  const handleBack = () => {
    return history.push("/");
  };
  return (
    <Button
      width="80px"
      height="60px"
      bgColor="primary"
      color="baseDefault"
      textAlign="start"
      onClick={handleBack}
    >
      <FaArrowLeft />
    </Button>
  );
};
