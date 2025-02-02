import pymongo
from scrapy.exceptions import DropItem
from scrapy.utils import log

from webcrawler.settings import *
__author__ = "lewis"


class MongoDBPipeline(object):

    def __init__(self):
        connection = pymongo.MongoClient(
            MONGODB_SERVER,
            MONGODB_PORT
        )
        db = connection[MONGODB_DB]
        self.collection = db[MONGODB_COLLECTION]

    def process_item(self, item, spider):
        valid = True
        for data in item:
            if not data:
                data = False
                raise DropItem("Missing {0}!".format(data))
            if valid:
                self.collection.insert(dict(item))
                log.logger.info("Data added to MongoDB ")
            return item
