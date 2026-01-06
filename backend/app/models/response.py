from pydantic import BaseModel
from datetime import datetime

class QueryResponse(BaseModel):
    response: str
    query: str
    timestamp: datetime