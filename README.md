# umbrella-digital

The code is written in Javascript

### Requirements
- node
- npm

### Get Started

- Clone the repo: `git clone https://github.com/enleiwu/umbrella-digital.git`
- Download dependencies: `npm install`
- Replace process.env.GENDERIZE_API_KEY with genderize api key in ./genderize.js OR create a .env file in the root directory and insert the line `GENDERIZE_API_KEY=<genderize-api-key>`
- Run the script: `node genderize.js <target-file> <parameters>`
- Acceptable params: `-OVR` or `--override`

### Examples
- To run the script on test3.csv in test folder: `node genderize.js ./test/test3.csv`
- To run with parameters for binary gender columns and a firstname column: `node genderize.js ./test/test3.csv -OVR`

### Notes
- The npm JS library provided by genderize.io lacks many key features including batching and the probability and count column from the result sets, so I decided to implement genderize via their API instead.
