from requests_html import HTMLSession
import json

session = HTMLSession()
url = "https://www.foodpanda.hk/restaurant/w3ph/soup-plus-cheung-fat-plaza"
r = session.get(url)
foods = []
fobj = r.html.find(".dish-card.h-product.menu__item")
print(len(fobj))
if len(fobj) > 5:
    fobj = fobj[:5]
else:
    pass
for obj in fobj:
    name = obj.find(".dish-name.fn.p-name > span", first=True).text
    print(name)
    price = obj.find("span.price.p-price", first=True).text.split("$")[1]
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
    foods.append(food)


print(json.dumps(foods))
print(type(foods))
