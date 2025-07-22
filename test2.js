import axios from 'axios'

const stdinArray = ['NSAxMA==', 'NSAxNA==', 'NiAxNA==']; // Example stdin values
const expectedOutputArray = ['MTU=', 'MTU=', 'MTU=']; // Example expected outputs

// Ensure the arrays have the same length
if (stdinArray.length !== expectedOutputArray.length) {
  console.error("Error: stdinArray and expectedOutputArray must have the same length.");
} else {
  // Construct submissions dynamically
  const submissions = stdinArray.map((stdin, index) => ({
    language_id: 105,
    source_code: 'I2luY2x1ZGU8aW9zdHJlYW0+CiAgdXNpbmcgbmFtZXNwYWNlIHN0ZDsgaW50IG1haW4oKQogICAgICAgICAgICAgICAgICB7IGludCBhLGI7IGNpbj4+YT4+YjsgICBjb3V0PDxhK2I7fQ==', // Your base64-encoded source code
    stdin,
    expected_output: expectedOutputArray[index]
  }));

  // Define the request options
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: { base64_encoded: 'true' },
    headers: {
      'x-rapidapi-key': 'd817368f7amsh9ff920878753839p1a01dfjsnd7efbaba0966',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: { submissions },
  };

  // Make the API request
  (async () => {
    try {
      const response = await axios.request(options);
      const tokens = response.data.map((submission) => submission.token); // Extract tokens
      console.log("Submission successful. Tokens:", tokens);
    } catch (error) {
      console.error("Error during submission:", error.response ? error.response.data : error.message);
    }
  })();
}
