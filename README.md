# IDS721-Team-Final-Project
In this project, we build a PaaS machine learning prediction model and deploy it on AWS SageMaker. We also uses AWS Lambda to build a serverless backened and use Amazon API Gateway to expose the Lambda function as a RESTful API. AWS Amplify is configured to host static resources for our web application. We use Artillery and CloudWatch for load testing and monitoring. `!!!!todo`

## Requirements
* Build a containerized or PaaS machine learning prediction model and deploy it in a scalable, and elastic platform:
  * Options:
    * ML Framework
      * Sklearn, MXNet, PyTorch or Keras/TF
    * Model
      * Your own supervised ML prediction model or a Kaggle Prediction Model
    * Platform
      * Flask + Kubernetes deployed to EKS (Elastic Kubernetes) or Google Kubernetes Engine
      * Flask + Google App Engine
      * AWS Sagemaker
      * Other (Upon Request)
* Verify Elastic Scale-Up Performance via Load Test with Locust, Loader.io, or a similar load test framework. (Start with 1 container or endpoint) and verify 2 or more inference endpoints scale up to 1K requests per second.

## Architecture

The application architecture uses AWS Lambda, Amazon API Gateway and Amplify Console. Amplify Console provides continuous deployment and hosting of the static web resources. JavaScript executed in the browser sends and receives data from a public backend API built using Lambda and API Gateway.

![project_arch](assets/project_arch.png)

## Results

* Realtime Inference Sagemaker Endpoint that __scales up the number of instances__:
  
  * Load Test

    * Here, we use Artillery, which is a cloud-native and open source load-testing platform. 

      Load test with `artillery run ./script.yml`: [script.yml](lambda_api/script.yml)

      ![artillery_loadtest_result](assets/artillery_loadtest_result.png)

    * We can also monitor endpoint performance on CloudWatch consoles. 
    
      ![inference_endpoint_metrics](assets/inference_endpoint_metrics.png)

* Lambda Function with AWS API Gateway:

  Post your request to this api:
  https://gjtxc855a8.execute-api.us-east-1.amazonaws.com/DummyStage/DT

  ![postman_call_api](assets/postman_call_api.png)


* Web app hosted in AWS Amplify:

  https://master.d3saf47cr73tpe.amplifyapp.com/

## Steps
* Set up AWS SageMaker

  SageMaker Studio is an integrated development environment (IDE) for ML that provides a fully managed Jupyter notebook interface in which you can perform end-to-end ML lifecycle tasks, including model deployment. Once you successfully create a new SageMaker studio and domain, click `Launch` and choose `Studio` to open the app.
  ![domain](https://github.com/JuliaJHL/imgs_readme/blob/main/final/domain.png)
  Then create a SageMaker Studio notebook with the following settings.
  ![notebook](https://github.com/JuliaJHL/imgs_readme/blob/main/final/notebook.png)

* Build the PaaS ML wine prediction model

  We build a wine prediction model using `load_wine` dataset from sklearn and `Gradient boosting` algorithm from XGBoost. The dataset contains 13 features and 3 classes of the wine.
  ![dataset](https://github.com/JuliaJHL/imgs_readme/blob/main/final/dataset.png)
  ![train](https://github.com/JuliaJHL/imgs_readme/blob/main/final/train.png)

* Deploy the ML model

  We use AWS SDK -Boto3 to deploy our trained model to a Real-Time Inference endpoint.
  1. Create a SageMaker model from the model artifact
  ![artifact](https://github.com/JuliaJHL/imgs_readme/blob/main/final/artifact.png)
  2. Create an endpoint configuration to specify properties, including instance type and count
  ![endpoint](https://github.com/JuliaJHL/imgs_readme/blob/main/final/endpoint.png)
  3. Create the endpoint using the endpoint configuration
  ![create](https://github.com/JuliaJHL/imgs_readme/blob/main/final/create.png)
  Here's our S3 bucket url: https://wine-prediction-frontend.s3.amazonaws.com/wine.html
  
* Configure auto scaling for endpoint

  SageMaker inference auto scaling can monitor workloads and dynamically adjust the instance count to maintain steady and predictable endpoint performance at a low cost. Here, we use arget tracking scaling policy, which is triggered when a chosen scaling metric increases over a chosen target threshold.
  ![auto](https://github.com/JuliaJHL/imgs_readme/blob/main/final/auto.png)

## Reference
* [load_wine dataset](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_wine.html)
* [Deploy a Machine Learning Model to a Real-Time Inference Endpoint](https://aws.amazon.com/getting-started/hands-on/machine-learning-tutorial-deploy-model-to-real-time-inference-endpoint/?nc1=h_ls)
* [Load test and optimize an Amazon SageMaker endpoint using automatic scaling](https://aws.amazon.com/blogs/machine-learning/load-test-and-optimize-an-amazon-sagemaker-endpoint-using-automatic-scaling/)
* [Building and Load-Testing a Machine Learning Service](https://www.datacaptains.com/blog/building-and-load-testing-a-machine-learning-service)
* [artillery documentation](https://www.artillery.io/)
* [Build a Serverless Web Application](https://aws.amazon.com/getting-started/hands-on/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/)
* [Monitoring Endpoint Performance](https://catalog.us-east-1.prod.workshops.aws/workshops/44d3e2a0-ec6f-44df-9397-bcfdf129cadf/en-US/module-managing-the-production-deployment-5/monitoring-endpoint-performance-5-2)
