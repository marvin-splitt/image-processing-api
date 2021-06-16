
# Image processing API

This project is part of the Udacity Full-Stack Javascript Nanodegree

It is an express server which is able to take images located in a folder and create a resized thumb version of it and save it on the disk. Once created a thumb version it just serves the processed image through the api endpoint.


## API Reference

#### Create thumb version of image

```http
  GET /api/images/?{filename}&height={height}&width={width}
```

| Parameter  | Type     | Description                                               |
| :--------  | :------- | :-------------------------------------------------------- |
| `filename` | `string` | **Required**. filename of the desired image to be resized |
| `height`   | `number` | **Required**. desired height                              |
| `width`    | `number` | **Required**. desired width                               |

- This will create a thumb version of the image (if it does not exist already)
- Futhermore it will be delivered as the response to the client

  
## Run Locally

Clone the project

```bash
  git clone https://gitlab.com/msplitt/image-processing-api.git
```

Go to the project directory

```bash
  cd image-processing-api
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```
  
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

  
## Author

Marvin Splitt ([@msplitt](https://gitlab.com/msplitt))

  