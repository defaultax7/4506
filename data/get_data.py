import time
import random
import json
from requests_html import HTMLSession
import jsons

from restaurant import Restaurant
from json_class import JsonClass

session = HTMLSession()
r = session.get("https://www.foodpanda.hk/restaurants/lat/22.342422/lng/114.1062419/city/Hong%20Kong/address/Hong%2520Kong%2520Institute%2520Of%2520Vocational%2520Education%2520(Tsing%2520Yi%2520Campus)%252C%252020%2520Tsing%2520Yi%2520Rd%252C%2520Sai%2520Shan%252C%2520Hong%2520Kong/Tsing%2520Yi%2520Road/20%2520Hong%2520Kong%2520Institute%2520of%2520Vocational%2520Education%2520(Tsing%2520Yi%2520Campus)?")


def getFood(url):
    r = session.get(url)

    address = r.html.find(".vendor-location", first=True).text
    desc = r.html.find("meta")
    shop = {"address": address, "foods": []}
    fobj = r.html.find(".dish-card.h-product.menu__item")
    print(len(fobj))
    if len(fobj) > 5:
        fobj = fobj[:5]
    else:
        pass
    for obj in fobj:
        name = obj.find(".dish-name.fn.p-name > span", first=True).text
        print(name)
        price = float(obj.find("span.price.p-price", first=True).text.split("$")[1])
        print(price)
        desc = obj.find(".dish-description.e-description.ingredients", first=True)
        if desc is None:
            desc = None
        else:
            desc = desc.text.split("$")[1]
        imagePath = obj.find(".photo.u-photo", first=True)
        if imagePath is None:
            imagePath = None
        else:
            imagePath = imagePath.attrs["data-src"].split("|")[0]
            food = {"name": name, "price": price, "desc": desc, "imagePath": imagePath}
            shop["foods"].append(food)
    return shop


rests = []
# ul.vendor-list .headline
figs = r.html.find("ul.vendor-list .vendor-tile")
max = int(input("Please enter the max(" + str(len(figs)) + ") : "))
if max <= len(figs):
    pass
else:
    raise Exception("larger than max")
# print(len(figs))
# print(len(pics))
for i in range(max):
    id = i + 4
    name = figs[i].find(".name.fn", first=True).text
    imagePath = figs[i].find(".vendor-picture", first=True).attrs["data-src"].split("|")[0]
    rating = figs[i].find(".rating strong", first=True)
    if rating is None:
        rating = 0
    else:
        rating = int(float(rating.text.split("/")[0]))
    desc = "No Description"
    foodType = figs[i].find(".vendor-characteristic span:first-child", first=True).text
    pnum = figs[i].find(".categories.summary > li:first-child > span.budget-symbol--filled")
    priceLv = len(pnum)
    temp = figs[i].find(".vendor-characteristic span")
    feature = []
    for each in temp:
        feature.append(each.text)
    urls = r.html.find("ul.vendor-list > li > a")
    url = urls[i].find("a", first=True).absolute_links

    extraInfo = figs[i].find(".extra-info.mov-df-extra-info", first=True)
    minPrice = float(extraInfo.find("li:first-child", first=True).text.split("$")[1].split(" ")[0])
    fee = float(extraInfo.find("li:last-child > span", first=True).text.split("$")[1].split(" ")[0])
    # print(url.pop())
    shop = getFood(url.pop())
    rrr = JsonClass(id=id, name=name, imagePath=imagePath, desc=desc, foodType=foodType, foods=shop["foods"], priceLv=priceLv, feature=feature, minPrice=minPrice, fee=fee, address=shop["address"], rating=rating)
    # def __init__(self, id, name, imagePath, desc, foodType, foods, priceLv, feature, minPrice, fee, rating):
    aaa = jsons.dump(rrr)
    rests.append(aaa)
    time.sleep(random.uniform(0.3, 1))



    # print(priceLv)
    # print(feature)
    # print(minPrice)
    # print(fee)
    # print(id)
    # print(foodType)
    # print(imagePath)
    # print(name.text)
    # print(rating)


filename = "pytest.json"
with open(filename, "w") as fp:
    json.dump(rests, fp)


"""

import jsons
from collections import OrderedDict


a = Restaurant(1, "Mcdonald", "img/mcdonald.jpg|abc",
               "McDonald's Corporation is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States. They rechristened their business as a hamburger stand, and later turned the company into a franchise, with the Golden Arches logo being introduced in 1953 at a location in Phoenix, Arizona. In 1955, Ray Kroc, a businessman, joined the company as a franchise agent and proceeded to purchase the chain from the McDonald brothers. McDonald's had its original headquarters in Oak Brook, Illinois, but moved its global headquarters to Chicago in early 2018.",
               "fastfood")

# print(json.dumps(a))
max = int(input("Please enter the max : "))
figs = [1, 2]
if max <= len(figs):
    pass
else:
    pass
print(jsons.dumps(a))
"""
