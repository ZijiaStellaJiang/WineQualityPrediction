## Steps to train and deploy model on AWS Sagemaker, and build AWS Sagemaker Realtime Inference Endpoint with Autoscaling Configurations

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