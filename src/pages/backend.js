var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIARZJIGDYTU26MNTN7",
    "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
export { docClient}