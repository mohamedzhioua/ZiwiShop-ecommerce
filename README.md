 # [Ziwishop](https://ziwishop.netlify.app/) Clothes Ecommerce website and dashboard Documentation
 
   -  Welcome to the documentation for the Ziwishop Clothes an open source e-commerce built using the MERN stack (MongoDB, Express, React, Node.js) with a Vite frontend project. This document will guide you through the key features and functionalities of the application.

   ### Table of Contents
   - 🔗 Introduction
   - 🔗 Tech Stack
   - 🔗 Key Features
   - 🔗 Getting Started
   - 🔗 Installation
   - 🔗 Usage
   - 🔗 Illustration of Google Oauth process (without Passport or any googleapis npm package )
   - 🔗 Authentication
   - 🔗 Admin Dashboard
   - 🔗 User Interface
   - 🔗 Categories
   - 🔗 Products
   - 🔗 Brands
   - 🔗 Sizes
   - 🔗 Image Management
   - 🔗 Search and Filters
   - 🔗 Orders and Sales
   - 🔗 Payment Options
   - 🔗 Contributing
   - 🔗 License
 
 ---
 ###  Introduction
-  Ziwishop is a comprehensive Clothes Ecommerce application that offers a seamless shopping experience for both customers and administrators.  

-  It all began with a small old project built using 'npx create-react-app' with Bootstrap styling. However, from just trying to transform it to mui and add linkedin auth , finding myself reimagining the project using the MERN stack  with a Vite frontend project and Material-UI (MUI) version 5 for a more responsive and dynamic user interface. inspired by celio and some  other ecommerce sites... 
 
-  old Version Demo : 

 <img src="https://github.com/mohamedzhioua/ZiwiShop-ecommerce/blob/main/client/src/assets/mern-stack-social-authentication_demo.gif">


  ---
### :space_invader: Tech Stack

[![My Skills](https://skillicons.dev/icons?i=js,react,materialui,nodejs,express,mongodb)](https://skillicons.dev)

<img src="https://camo.githubusercontent.com/451061eb9714c2135705a1ad757017cc943627ca474d8a20e78209214469bf72/68747470733a2f2f6437756d7169637069373236332e636c6f756466726f6e742e6e65742f696d672f70726f647563742f65306364363161372d316336352d343561302d393765652d3737363364646335313533612f39383834313664302d323562632d346264322d623864622d6633343764306131393335642e706e67"> 
 
 <img src="https://github.com/mohamedzhioua/ZiwiShop-ecommerce/blob/main/client/src/assets/paypal-strirpe.jpeg">
  
---
### Key Features

  - [x] Fully **responsive design** to provide optimal user experience on various devices.
  - [x] **Props validation** implemented throughout the project to ensure data integrity and proper component usage.
  - [x] Implemented **input validation at both the front-end(Yup) and back-end(validator)**  to enhance data integrity and security.
  - [x] Using **formik** building forms .
  - [x] Using **nodemailer**  for User **email verification**.
  - [x] User authentication via **Google OAuth** implemented using Node.js **(without Passport or any googleapis npm package)** 
  - [x] User authentication **Facebook** for easy access.
  - [x] **Admin dashboard** for administrators to manage the platform efficiently, featuring charts and visualizations for data analysis.
  - [x] User-friendly interface for customers to explore and purchase products.
  - [x] Create, update, and delete categories with support for **nested categories**.
  - [x] Product **management**, including creation, updating, and deletion.
  - [x] "Featured" product option for highlighting products on the homepage.
  - [x] Brand management to categorize products by brand.
  - [x] Size management to define available product sizes.
  - [x] **Cloudinary** integration for **uploading and managing multiple product images**. 
  - [x] Advanced search and filter options for categories, products, sizes, and price ranges with pagination.
  - [x] Order history and sales analytics, including graphs and revenue overviews.
  - [x] Seamless order creation and the ability to add products to the cart.
  - [x] Multiple payment options, including **Stripe**, **PayPal**, and cash.
  - [ ] Migrating the project to **TypeScript and Next.js**


 ---

###  Getting Started
 -  To get started with the Ziwishop Clothes Ecommerce App, follow these steps:

## ⚙ Installation

 👉1: Clone the GitHub repository to your local machine:

```bash
git clone https://github.com/yourusername/ziwishop.git
```

👉2: Install the required dependencies for the frontend:

```bash
cd client
npm install
```

👉3: Create a .env file in the frontend directory and add the following variables:

```bash
VITE_FACEBOOK_APP_ID=<Your facebook app id>
VITE_GOOGLE_CLIENT_ID=<Your google web Client id>
VITE_GOOGLE_OAUTH_REDIRECT_URL=<Your google redicrect URL>
VITE_API_URL==<Your server URL>
```

👉4: Install the required dependencies for the backend:

```bash
cd server
npm install
```

👉5: Create a .env file in the backend directory and add the following variables:

```bash
ACCESS_TOKEN_SECRET=<Your ACCESS_TOKEN_SECRET>
ACTIVATION_SECRET=<Your ACTIVATION_SECRET here>
RESET_PASSWORD_SECRET=<Your_RESET_PASSWORD_SECRET here>
REFRESH_TOKEN_SECRET=<Your_REFRESH_TOKEN_SECRET_here>
DATABASE=<Your MongoDB Cluster URL>
PAYPAL_CLIENT_ID=<Your PayPal Client ID>
CLOUDINARY_NAME=<Your Cloudinary Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
STRIPE_API_KEY=<Your STRIPE  API KEY>
STRIPE_SECRET_KEY=<Your STRIPE  SECRET KEY>
Google_webClientId=<Your google web Client id>
Google_secretId=<Your google secret id>
googleOauthRedirectUrl=<Your google redicrect URL>
SMPT_HOST=<smtp.gmail.com>
SMPT_PORT=<465>
SMPT_SERVICE=<gmail> 
SMPT_MAIL=<Your Email_that_you_use_for_sending_emails_via Nodemailer> 
SMPT_PASSWORD=<Your password_that_you_generate_for_your_app_from_your email>
```

👉6 : Open your browser and navigate to http://localhost:3000 to access the Ziwishop application.

### Obtaining API Keys and IDs

 -  Google_webClientId , Google_secretId, and googleOauthRedirectUrl.
 ```bash
 To obtain a Google_webClientId , Google_secretId, and googleOauthRedirectUrl for your application, follow these steps:

  👉1:Create a Google Cloud Project:

🔹Go to the Google Cloud Console.
🔹Click on the project dropdown and then click "New Project".
🔹Follow the prompts to set up your new project.

  👉2:Enable the Google+ API:
🔹In your project dashboard, go to "APIs & Services" > "Library".
🔹Search for "Google+ API" and enable it. This API is used for user profile information.

  👉3: Configure OAuth Consent Screen:
🔹In the Google Cloud Console, navigate to "APIs & Services" > "OAuth consent screen".
🔹Fill in the required details like product name, user support email, etc.
🔹Add scopes needed for your application (like email, profile).
🔹Add authorized domains if needed.

  👉4:Create OAuth Credentials:
🔹In the Google Cloud Console, navigate to "APIs & Services" > "Credentials".
🔹Click "Create Credentials" and choose "OAuth client ID".
🔹Select "Web application" as the application type.
🔹Add authorized redirect URIs for your application. These are the URLs where users will be redirected after granting access.
🔹After creating, you'll receive Google_webClientId and Google_secretId. Keep them confidential.

``` 
 -  Stripe API Keys
 ```bash
To get your Stripe API keys, follow these steps:

  👉1: Sign in to your Stripe account or create a new account if you don't have one: "https://dashboard.stripe.com/login"

  👉2: In your Stripe dashboard, navigate to the "Developers" section.

  👉3: Find or create your API keys. You will have both a "Publishable Key" and a "Secret Key." Use the "Secret Key" as your STRIPE_SECRET_KEY and the "Publishable Key" in your frontend code for making client-side requests.
``` 

 -  PayPal Client ID
 ```bash
To obtain a PayPal Client ID for your application, follow these steps:

  👉1: Creating a PayPal Account:
To create a PayPal account, visit the official PayPal website at https://www.paypal.com and sign up or sign in. Follow the instructions to set up your account with your email address, personal information, and payment details.

 👉2: Creating a PayPal Developer Account:
After creating a regular PayPal account, sign up for a PayPal Developer account at https://developer.paypal.com/. This account allows you to access the PayPal Developer Dashboard and manage sandbox and live applications.

  👉3: Accessing the PayPal Developer Dashboard:
Log in to the PayPal Developer Dashboard at https://developer.paypal.com/dashboard/ using your developer account credentials. Here, you can create and manage sandbox and live applications.

  👉4: Creating a Sandbox App and Generating Client ID:
In the PayPal Developer Dashboard, navigate to the "My Apps & Credentials" section. Click on "Create App" to create a new sandbox app. Provide basic information about your application.

Once your sandbox app is created, you will find the Client ID under the "REST API apps" section. This Client ID is a key your application uses to authenticate with the PayPal REST APIs. Use this PAYPAL_CLIENT_ID in your environment variables.
``` 

 -  Cloudinary Variables
 ```bash
To configure Cloudinary, follow these steps:

  👉1: Create a Cloudinary account at https://cloudinary.com/.

  👉2: After creating an account, you will obtain a CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET. Use these values in your environment variables.
```
  -  Facebook and VITE_GOOGLE_CLIENT_ID , and VITE_GOOGLE_OAUTH_REDIRECT_URL
```bash
For your Facebook and Google client IDs, you can obtain them by creating apps on the respective platforms:

  👉 Facebook: Create an app on the Facebook for Developers platform to get your VITE_FACEBOOK_APP_ID.

  👉  Google: Follow the instructions outlined earlier to obtain your VITE_GOOGLE_CLIENT_ID and VITE_GOOGLE_OAUTH_REDIRECT_URL
  ```
## Illustration of Google Oauth process (without Passport or any googleapis npm package)
 throw this diagram you will learn how OAuth integrations work and specifically how you can set up a Google OAuth integration with your own Node.js application and it the end the concepts are the same irrespective of the service provider

<img src="https://github.com/mohamedzhioua/ZiwiShop-ecommerce/blob/main/client/src/assets/google-oauth.jpeg">

 ---
## Authentication
Ziwishop supports authentication through Google and Facebook accounts. Users can log in using their Google or Facebook credentials, providing a convenient and secure way to access the platform.

## Admin Dashboard
The Admin Dashboard is a powerful tool that allows administrators to manage various aspects of the platform. Admins can control categories, products, brands, sizes, and more. They can also view order history, sales analytics, and manage featured products.

## User Interface
The user interface is designed to provide customers with an intuitive shopping experience. Users can browse products, add them to the cart, and proceed to checkout. The interface also supports advanced search and filter options for efficient product discovery.

## Categories
Categories in Ziwishop can be organized hierarchically, allowing for nested categories. Administrators can create, update, and delete categories. Each category can be designated as a leaf or a tree, enhancing flexibility in categorization.

## Products
Product management includes the ability to create, update, and delete products. Administrators can also mark products as "featured," which will showcase them on the homepage for increased visibility.

## Brands
Ziwishop allows administrators to manage brands, enabling users to filter products by brand. Brands can be created, updated, and deleted to provide a comprehensive catalog.

## Sizes
Sizes are an integral part of the product catalog. Administrators can define available sizes for products, facilitating accurate ordering by customers.

## Image Management
The integration with Cloudinary enables efficient image management for products. Multiple images can be uploaded for each product, and administrators can easily update or delete images as needed.

## Search and Filters
Ziwishop offers advanced search and filter options for categories, products, sizes, and price ranges. Pagination ensures that results are manageable and user-friendly.

## Orders and Sales
Users can view their order history and delete any order,  and administrators have access to sales analytics. Graphs display best-selling products and revenue overviews on a weekly basis.

## Payment Options
Ziwishop provides multiple payment options for customers, including Stripe and PayPal for online payments, as well as a cash payment option for flexibility.



## Contributing

Contributions are welcome! Please open an issue if you have any questions or suggestions. Your contributions will be acknowledged. Contact me for more information.
 
 ---
 ## License

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.


<h3> 
With Ziwishop, you have a comprehensive Clothes Ecommerce application that offers a rich set of features for both administrators and customers. Start using the app to provide a seamless and enjoyable shopping experience. For any questions or assistance, contact me . Happy selling! </h2>

<h4>If you're interested in showing your support for my efforts, please consider giving a ⭐ star to my repository. Alternatively, you're welcome to get in touch with me, and we can share a coffee together ☕️❤️‍🔥.</h4>





