from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message
from config import Config
from utils.logger import setup_logger

logger = setup_logger(__name__)
router = Router()

@router.message(F.text == '/game')
async def cmd_game(message: Message):
    try:
        logger.debug(f"/game for {message.from_user.id}")
        
        await message.answer(f"в разработке")

    except Exception as e:
        logger.error(f"Stats error: {e}")
        await message.answer("Ошибка получения статистики")