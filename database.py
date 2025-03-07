import sqlite3
from config import Config
from utils.logger import setup_logger

logger = setup_logger(__name__)

class Database:
    def __init__(self):
        self.conn = sqlite3.connect(Config.DB_NAME)
        self.create_tables()

    def create_tables(self):
        pass

    def add_user(self, user_id, username, full_name):
        pass

    def update_stats(self, user_id, is_correct):
        pass

    def get_stats(self, user_id):
        pass