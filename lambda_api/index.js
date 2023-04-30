var AWS = require('aws-sdk');
 
exports.handler = (event, context, callback) => {
        AWS.config.region = "us-east-1";
        var body;
        var sl= Math.floor(Math.random() * (8 * 10 - 0 * 10) + 0 * 10) / (1*10);
        var sw= Math.floor(Math.random() * (8 * 10 - 0 * 10) + 0 * 10) / (1*10);
        var pl= Math.floor(Math.random() * (8 * 10 - 0 * 10) + 0 * 10) / (1*10);
        var pw= Math.floor(Math.random() * (8 * 10 - 0 * 10) + 0 * 10) / (1*10);
        if (event.body !== null && event.body !== undefined) {
           body = event.body;
         } else {
             body = JSON.stringify(sl)+","+JSON.stringify(sw)+","+JSON.stringify(pl)+","+JSON.stringify(pw);
         }
         console.log(body, typeof(body))
         var sagemakerruntime = new AWS.SageMakerRuntime();
         var params = {
             Body: body,
             EndpointName: "sagemaker-xgboost-2023-04-25-18-33-28-097-endpoint",
             ContentType: 'text/csv'
          };
          sagemakerruntime.invokeEndpoint(params, function(err, data) {
              if (err) {
                   callback(null, 
                      {
                          statusCode: err.statusCode,
                          headers: {
                              'Content-Type': 'text/plain'
                          },
                          body: "ERROR occurred: " + err
                      });  
                }
                  else     {
                    console.log(data.Body.toString());
                    callback(null, 
                  {
                      statusCode: 200,
                      headers: {
                        'Content-Type': 'text/plain'
                      },
                      body: 'Your Wine class is Cultivar ' + (Math.round(data.Body)).toString()
                  });
               }
               return
             });
};