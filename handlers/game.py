from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message
from config import Config
from utils.logger import setup_logger

logger = setup_logger(__name__)
router = Router()

GAME_SHORTNAME = "your_game_shortname"

@router.message(F.text == '/game')
async def cmd_game(message: Message, state: FSMContext):
    try:
        logger.debug(f"/game for {message.from_user.id}")
        
        await message.answer_game(GAME_SHORTNAME)
        
    except Exception as e:
        logger.error(f"Game error: {e}")
        await message.answer("Произошла ошибка, попробуйте позже")

