import axios from "axios"

const url = "http://localhost:5001/data";

export const assignIDs = async () => {
  try {
    const response = await axios.get(url)
    const items = response.data

    const updatePromises = items.map((item) => {
      const updatedItem = { ...item, id: crypto.randomUUID()};
      return axios.patch(`${url}/${item.id || item.name}`, updatedItem);
    })

    await Promise.all(updatePromises);

  } catch (error) {
    console.error("Error updating Items: ", error.message);
    
  }
}