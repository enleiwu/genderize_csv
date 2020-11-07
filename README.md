# umbrella-digital

### Requirements
- node
- npm

### Get Started

- Clone the repo: `git clone https://github.com/enleiwu/umbrella-digital.git`
- Download dependencies: `npm install`
- Run the script: `node genderize.js <target-file> <parameters>`
- Acceptable params: `-OVR` or `--override`

### Examples
- To run the script on test3.csv in test folder: `node genderize.js ./test/test3.csv`
- To run with parameters for binary gender columns and a firstname column: `node genderize.js ./test/test3.csv -OVR`
