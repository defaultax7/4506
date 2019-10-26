from collections import OrderedDict
import jsons


class JsonClass(OrderedDict):
    """Docstring for JsonClass. """
    def __init__(self, **kwargs):
        """TODO: to be defined1. """
        self.items = {}
        for key, value in kwargs.items():
            self.items[key] = value
    # def __init__(self, id, name, imagePath, desc, foodType, foods, priceLv, feature, minPrice, fee, rating):
        OrderedDict.__init__(self, self.items)


if __name__ == "__main__":
    aaa = JsonClass(id=1, name="johnson", className="2B")
    print(aaa.items["name"])
    aaa = jsons.dump(aaa)
    print(aaa)
