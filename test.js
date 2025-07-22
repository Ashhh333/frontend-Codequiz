import axios from 'axios';

// Define the Judge0 API endpoint and headers
const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
     base64_encoded: 'true'
   },
  headers: {
    'x-rapidapi-key': 'd817368f7amsh9ff920878753839p1a01dfjsnd7efbaba0966',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
     submissions: [
          {
            language_id: 105,
            source_code: 'I2luY2x1ZGU8aW9zdHJlYW0+CiAgdXNpbmcgbmFtZXNwYWNlIHN0ZDsgaW50IG1haW4oKQogICAgICAgICAgICAgICAgICB7IGludCBhLGI7IGNpbj4+YT4+YjsgICBjb3V0PDxhK2I7fQ==',
            stdin: 'NSAxMA==',
            expected_output:'MTU='
          },
          {
               language_id: 105,
               source_code: 'I2luY2x1ZGU8aW9zdHJlYW0+CiAgdXNpbmcgbmFtZXNwYWNlIHN0ZDsgaW50IG1haW4oKQogICAgICAgICAgICAgICAgICB7IGludCBhLGI7IGNpbj4+YT4+YjsgICBjb3V0PDxhK2I7fQ==',
               stdin:'NSAxNA==',
                 expected_output:'MTU='
             },
             {
               language_id: 105,
               source_code: 'I2luY2x1ZGU8aW9zdHJlYW0+CiAgdXNpbmcgbmFtZXNwYWNlIHN0ZDsgaW50IG1haW4oKQogICAgICAgICAgICAgICAgICB7IGludCBhLGI7IGNpbj4+YT4+YjsgICBjb3V0PDxhK2I7fQ==',
               stdin: 'NiAxNA==',
                 expected_output:'MTU='
             }
        ]
        
  }
};
//console.log(atob( 'I2luY2x1ZGU8aW9zdHJlYW0KICB1c2luZyBuYW1lc3BhY2Ugc3RkOyBpbnQgbWFpbigpCiAgICAgICAgICAgICAgICAgIHsgaW50IGEsYjsgY2luPj5hPj5iOyAgIGNvdXQ8PGErYjt9'))
const HEADERS = {
  'x-rapidapi-key': 'd817368f7amsh9ff920878753839p1a01dfjsnd7efbaba0966',
  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
};

// Function to submit multiple test cases
const submitMultipleTestCases = async () => {
     try {
       // Send the batch submission request
       const response = await axios.request(options);
       const tokens = response.data.map((submission) => submission.token); // Extract tokens
       console.log("Submission successful. Tokens:", tokens);
   
     //   Construct the URL for fetching results
       const resultURL = `https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true&tokens=${tokens.join(",")}`;
   
       let results;
   
       while (true) {
         const resultResponse = await axios.get(resultURL, { headers: HEADERS });
         
         results = resultResponse.data.submissions;
      console.log(results);
         // Check if any results are still pending
         if (results.some((res) => res.status.id === 1 || res.status.id === 2)) {
           console.log("Waiting for the results...");
           await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
         } else {
           break;
         }
       }
   
       // Display the results and errors
       console.log("Results:");
       results.forEach((result, index) => {
         console.log(`Test Case ${index + 1}:`);
         console.log(`stdout: ${result.stdout}`);
         console.log(`stderr: ${result.stderr}`);
         console.log(`Status: ${result.status.description}`);
       });
      } catch (error) {
        console.error(`Error: ${error.response?.status} - ${error.response?.data || error.message}`);
      }
   };
   
// const a=async()=>{
//      const options = {
//           method: 'GET',
//           url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
//           params: {
//             tokens: '51374791-765f-414d-bcee-18ce4405c680,187c6665-346a-4aac-ae9f-ee595f5d178c,572d0f80-1a21-402d-8abb-3473ba306b46',
//             base64_encoded: 'true',
//             fields: '*'
//           },
//           headers: {
//             'x-rapidapi-key': 'd817368f7amsh9ff920878753839p1a01dfjsnd7efbaba0966',
//             'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
//           }
//         };
        
//         try {
//              const response = await axios.request(options);
//              console.log(response.data);
//         } catch (error) {
//              console.error(error);
//         }
// }

   
// Execute the function
submitMultipleTestCases();