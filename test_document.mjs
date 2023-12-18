import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";


(async () => {
  // Assumes credentials are available through the default credential chain
  const client = DynamoDBDocumentClient.from(new DynamoDBClient({
    region: "us-east-1",
  }));
  client.middlewareStack.identifyOnResolve(true);
  client.middlewareStack.addRelativeTo((next, context) => args => {
    // console.log(JSON.stringify(context, null, 2));
    return next(args);
  }, {
    name: "CUSTOM CONTEXT IDENTIFIER",
    toMiddleware: "httpSigningMiddleware",
    relation: "after",
  });
  const command = new ScanCommand({
    TableName: "hello",
  });
  console.log({
    response: await client.send(command)
  });
})();
