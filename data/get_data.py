from bs4 import BeautifulSoup
from requests_html import HTMLSession

session = HTMLSession()
r = session.get("https://www.foodpanda.hk/restaurants/lat/22.342422/lng/114.1062419/city/Hong%20Kong/address/Hong%2520Kong%2520Institute%2520Of%2520Vocational%2520Education%2520(Tsing%2520Yi%2520Campus)%252C%252020%2520Tsing%2520Yi%2520Rd%252C%2520Sai%2520Shan%252C%2520Hong%2520Kong/Tsing%2520Yi%2520Road/20%2520Hong%2520Kong%2520Institute%2520of%2520Vocational%2520Education%2520(Tsing%2520Yi%2520Campus)?")

pics = r.html.find(".vendor-picture")
figs = r.html.find(".vendor-tile")
# print(len(figs))
# print(len(pics))
for i in range(len(pics)):
    # imgPath = pics[i].attrs("data-src")
    # cap = fig.find("figcation")
    # name = cap.find("span", first=True).text
    print(pics[i]["data-src"])
    # print(name)