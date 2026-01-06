from fastapi import APIRouter, HTTPException
from pydantic import ValidationError
from datetime import datetime
from app.models.request import QueryRequest
from app.models.response import QueryResponse
from app.services.llm_service import OpenRouterService, LLMError

router = APIRouter()
llm_service = OpenRouterService()

@router.post("/query", response_model=QueryResponse)
async def query_endpoint(request: QueryRequest):
    try:
        response_text = await llm_service.generate_response(request.query)
        return QueryResponse(
            response=response_text,
            query=request.query,
            timestamp=datetime.utcnow()
        )
    except ValidationError as e:
        raise HTTPException(status_code=400, detail="Invalid request data")
    except LLMError as e:
        raise HTTPException(status_code=500, detail=str(e))