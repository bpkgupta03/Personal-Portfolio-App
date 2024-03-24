from fastapi import FastAPI, Form, HTTPException,BackgroundTasks
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from fastapi.middleware.cors import CORSMiddleware
import yaml
import os

app = FastAPI()

# Load configuration from file
# with open("config.yaml", "r") as config_file:
#     config = yaml.safe_load(config_file)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins="https://bpk-portfolio.netlify.app/",
    allow_credentials=True,
    allow_methods="POST",
    allow_headers="*",
)

# Define email configuration
# conf = ConnectionConfig(
#     MAIL_USERNAME=config['email']['username'],
#     MAIL_PASSWORD=config['email']['password'],
#     MAIL_FROM=config['email']['from'],
#     MAIL_PORT=config['email']['port'],
#     MAIL_SERVER=config['email']['server'],
#     MAIL_STARTTLS=config['email']['starttls'],
#     MAIL_SSL_TLS=config['email']['ssl_tls'],
#     USE_CREDENTIALS=config['email']['use_credentials'],
#     VALIDATE_CERTS=config['email']['validate_certs']
# )

conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get('EMAIL_USERNAME'),
    MAIL_PASSWORD=os.environ.get('EMAIL_PASSWORD'),
    MAIL_FROM=os.environ.get('EMAIL_FROM'),
    MAIL_PORT=int(os.environ.get('EMAIL_PORT')),
    MAIL_SERVER=os.environ.get('EMAIL_PASSWORD'),
    MAIL_STARTTLS=os.environ.get('EMAIL_STARTTLS').lower() == 'true',
    MAIL_SSL_TLS=os.environ.get('EMAIL_SSL_TLS').lower() == 'true',
    USE_CREDENTIALS=os.environ.get('USE_CREDENTIALS').lower() == 'true',
    VALIDATE_CERTS=os.environ.get('VALIDATE_CERTS').lower() == 'true',
)

# # Replace these with your MongoDB details
# MONGO_URI = config['mongodb']['connection_string']
# DB_NAME = config['mongodb']['db_name']
# MONGO_COLLECTION=config['mongodb']['collection_name']

MONGO_URI = "mongodb+srv://bpkhandelwal03:Bpgupta03@cluster0.pohxy0f.mongodb.net"
DB_NAME = "Email_details"
MONGO_COLLECTION="Enquiry"



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

async def send_mail(name,mail_from,msg):
    html = f"""
      <h2>Name -> {name}</h2> <br/>
      <h2>From -> {mail_from}</h2> <br />
      <h2>Enquiry -> {msg}</h2>
    """
    message = MessageSchema(
        subject="Enquiry Message From Portfolio",
        recipients=["bhanukhandelwal309@gmail.com"],
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})
    
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
        task1 = save_to_mongodb(data_to_save)
        #sent mail to myself
        task2= send_mail(full_name,Email,message)
        asyncio.gather(task1,task2)
        return JSONResponse(content={"message": f" Hi {full_name} : Details sent to BHANU KHANDELWAL successfully"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to complete tasks. Error: {str(e)}")


if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="localhost",port=8000)