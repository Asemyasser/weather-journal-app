/* Global Variables */
const apiKey = "5919939425a875a8e544a7135e0821fb";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Call functions
document.getElementById("generate").addEventListener("click", async () => {
  console.log("clicked");

  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  console.log(content);
  console.log(zipCode);

  // Basic validation for ZIP code and content
  if (zipCode.trim() === "" || content.trim() === "") {
    alert("Enter zip code and your feelings");
    return;
  }

  // Assuming US as the default country code. You can change this if needed.
  const countryCode = "e"; // Change as needed
  const zipWithCountry = `${zipCode},${countryCode}`;

  try {
    const data = await getTemp(baseUrl, zipWithCountry, apiKey);
    if (!data || !data.main) {
      throw new Error("Invalid response from API");
    }
    await postData({ date: newDate, temp: data.main.temp, content });
    await updateUi();
  } catch (error) {
    console.log("Error:", error.message);
    alert(
      "Failed to fetch weather data. Please check the ZIP code and try again."
    );
  }
});

// Get temperature
const getTemp = async (baseUrl, zipWithCountry, apiKey) => {
  const fetchTemp = await fetch(
    `${baseUrl}${zipWithCountry}&appid=${apiKey}&units=metric`
  );

  if (!fetchTemp.ok) {
    // Check if the response is OK
    throw new Error(`HTTP error! Status: ${fetchTemp.status}`);
  }

  try {
    const data = await fetchTemp.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to parse response");
  }
};

//post req
const postData = async (data) => {
  const postingData = await fetch("http://localhost:3000/sendData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await postingData.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
const updateUi = async () => {
  const fetchData = await fetch("http://localhost:3000/get");
  try {
    const data = await fetchData.json();
    document.getElementById("date").innerHTML = data[data.length - 1].date;
    document.getElementById("temp").innerHTML =
      data[data.length - 1].temp + "C";
    document.getElementById("content").innerHTML =
      data[data.length - 1].content;
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

// // call functions
// document.getElementById("generate").addEventListener("click", () => {
//   console.log("clicked");
//   const zipCode = document.getElementById("zip").value;
//   const content = document.getElementById("feelings").value;
//   console.log(content);
//   console.log(zipCode);

//   if (zipCode.trim() === "" || content.trim() === "") {
//     alert("enter zip code and your feelings");
//     return;
//   }
//   getTemp(baseUrl, zipCode, apiKey)
//     .then((data) => postData({ date: newDate, temp: data.main.temp, content }))
//     .then(() => updateUi());
// });

// //get temp
// const getTemp = async (baseUrl, zipCode, apiKey) => {
//   const fetchTemp = await fetch(
//     baseUrl + zipCode + apiKey + "&appid" + apiKey + "&units=metric"
//   );
//   try {
//     const data = await fetchTemp.json();
//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
