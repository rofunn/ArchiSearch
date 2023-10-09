import axios from "axios";

const getArchiInfo = async () => {
  try {
    const response = await axios.get("http://localhost:5000");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getArchiInfo };
