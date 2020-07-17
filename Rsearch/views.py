from django.shortcuts import render
import requests
import json


# Create your views here.
def index(request):
    template_name = "Rsearch/index.html"
    return render(request, template_name)

def detail(request, rest_id):
    # apikeyの指定
    # keyid = "APIkeyをここに代入"
    keyid = "a2160037e19a0dc9baceeff0154a698d"

    # api叩く
    api = f"https://api.gnavi.co.jp/RestSearchAPI/v3/"

    params = {
        'keyid': keyid,
        'id': rest_id
    }
    response = requests.get(api, params=params).json()
    rest = response['rest'][0]

    # 結果をContextに格納する
    context = {
        'image_src': rest['image_url']['shop_image1'],
        'name': rest['name'],
        'address': rest['address'],
        'access': rest['access']['walk'],
        'tel': rest['tel'],
        'opentime': rest['opentime'],
        'holiday': rest['holiday'],
        'url': rest['url'],
        'url_monile': rest['url_mobile'],
    }
    if context['image_src'] == "":
        context['image_src'] = "../../static/img/noimage1.png"
    template_name = "Rsearch/detail.html"
    return render(request, template_name, context)