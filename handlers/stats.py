from aiogram import Router, F
from aiogram.types import Message
from config import Config
from utils.logger import setup_logger
from database import Database

logger = setup_logger(__name__)
router = Router()

@router.message(F.text == '/stats')
async def cmd_stats(message: Message):
    try:
        logger.debug(f"/stats for {message.from_user.id}")
        
        await message.answer(f"в разработке")

    except Exception as e:
        logger.error(f"Stats error: {e}")
        await message.answer("Ошибка получения статистики")