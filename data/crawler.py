from lxml import etree

import requests

diy_url = 'https://wiki.biligame.com/dongsen/DIY%E9%85%8D%E6%96%B9'

r = requests.get(diy_url)

selector = etree.HTML(r.content)

tbody = selector.xpath(".//tbody")[1]

result = []

for tr in tbody[1:]:
    name = tr.xpath('td')[0].xpath('a')[0].text
    access = tr.xpath('td')[2].text.strip()

    materials_string = tr.xpath('td')[4].xpath('string(.)')
    materials_list = []
    for x in materials_string.split('+'):
        m, c = x.split('*')
        materials_list.append({"name": m, "count": int(c)})

    result.append({"name": name, "access": access,"materials":materials_list})


# from pprint import pprint

# pprint(result)
import json
with open('manual.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)