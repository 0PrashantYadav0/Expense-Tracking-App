# Expense Tracker App 

## To install dependencies:

```bash
bun install

cd frontend
bun install
```
## Add .env file as given in .env.example file

## To run:
 You need two terminals to run the project. One for the frontend and one for the backend.
### Backend: 
```bash
  bun run dev
```

### Frontend:
```bash
  cd frontend
  bun run dev
```
## Docker use :

If you want to run directly on you device you can use my docker image for that.
  
  ```bash
  docker pull 0prashantyadav0/expense-tracker
  ```
  ```bash
  docker run -p 3000:3000 -p 3000:3000 0prashantyadav0/expense-tracker
  ```
  Now you can access the app on localhost:3000

This project was created using `bun init` in bun v1.1.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
