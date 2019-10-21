from collections import OrderedDict
from requests_html import HTMLSession


class Restaurant(OrderedDict):
    """Docstring for Restaurant. """
    def __init__(self, cid, name, imagePath, desc, foodType, foods: list, priceLv, feature: list, minPrice, fee, rating):
        """TODO: to be defined1. """
        self.id = cid
        self.name = name
        self.imagePath = imagePath.split("|")[0]
        self.desc = desc
        self.foodType = foodType
        if len(foods) == 0:
            self.foods = []
        else:
            self.foods = foods
        self.priceLv = priceLv
        if len(feature) == 0:
            self.feature = []
        else:
            self.feature = feature
        self.minPrice = minPrice
        self.fee = fee
        self.rating = rating
    # def __init__(self, id, name, imagePath, desc, foodType, foods, priceLv, feature, minPrice, fee, rating):
        OrderedDict.__init__(self, id=self.id, name=self.name, imagePath=self.imagePath,
                             desc=self.desc, type=self.foodType, foods=self.foods,
                             priceLv=self.priceLv, feature=self.feature,
                             minPrice=self.minPrice, fee=self.fee, rating=self.rating)


