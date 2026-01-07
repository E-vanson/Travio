import asyncio
from openai import AsyncOpenAI
from app.core.config import settings

class LLMError(Exception):
    pass

class OpenRouterService:
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=settings.openrouter_api_key,
            base_url="https://openrouter.ai/api/v1"
        )
        self.system_prompt = (
            "You are a knowledgeable travel advisor specializing in international travel requirements. "
            "When provided with origin and destination countries, analyze and provide:\n\n"
            "1. VISA REQUIREMENTS: Specify visa type needed, processing time, and cost\n"
            "2. PASSPORT REQUIREMENTS: Validity requirements, blank pages needed\n"
            "3. ADDITIONAL DOCUMENTS: Travel insurance, vaccination certificates, etc.\n"
            "4. TRAVEL ADVISORIES: Current safety or health alerts\n\n"
            "Format your response in clear sections with bullet points. Be specific with timelines and costs. "
            "If information varies by purpose of visit, ask for clarification. Maintain a helpful, reassuring tone."
        )

    async def generate_response(self, query: str) -> str:
        try:
            response = await asyncio.wait_for(
                self.client.chat.completions.create(
                    model="deepseek/deepseek-r1-0528:free",
                    messages=[
                        {"role": "system", "content": self.system_prompt},
                        {"role": "user", "content": query}
                    ],
                    max_tokens=2000,
                    temperature=0.7
                ),
                timeout=30.0
            )
            return response.choices[0].message.content
        except asyncio.TimeoutError:
            raise LLMError("Request timed out")
        except Exception as e:
            raise LLMError(f"LLM service error: {str(e)}")