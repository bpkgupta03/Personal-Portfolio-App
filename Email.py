from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from email.message import EmailMessage
import asyncio
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Replace these with your MongoDB details
MONGO_URI = "mongodb+srv://bpkhandelwal03:Bpgupta03@cluster0.pohxy0f.mongodb.net/"
DB_NAME = "Email_details"
MONGO_COLLECTION="Enquiry"

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5501"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

async def save_to_mongodb(data: dict):
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db["Enquiry"]
        await collection.insert_one(data)
        print("Data saved to MongoDB successfully")
    except Exception as e:
        print(f"Error saving data to MongoDB: {e}")
    finally:
        client.close()

@app.post("/submit/")
async def submit_form(
    full_name: str = Form(...),
    Email: str = Form(...),
    message: str = Form(...),
):
    try:
        # Data to be saved to MongoDB
        data_to_save = {
            "full_name": full_name,
            "Email": Email,
            "message": message,
        }
        # Save to MongoDB
        await save_to_mongodb(data_to_save)
        # await asyncio.gather(task1)

        return JSONResponse(content={"message": f"{full_name} : Details sent to BHANU KHANDELWAL successfully"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to complete tasks. Error: {str(e)}")


if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="localhost",port=8000)