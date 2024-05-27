import paho.mqtt.client as mqtt
import io
import base64
import json
from PIL import Image

broker_address = "34.234.109.79"
broker_port = 1883

output_topic = "cracha"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe('alexandre')
    client.subscribe('enzo')

def on_message(client, userdata, msg):
    data = msg.payload
    nome = msg.topic.capitalize()
    img_str = ''

    if data.startswith(b'\xff\xd8') and data.endswith(b'\xff\xd9'):
        img = Image.open(io.BytesIO(data))


        buffered = io.BytesIO()
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
    else:
        print('Erro no recebimento da imagem')

    data_send = {
        'nome': nome,
        'img': img_str
    }

    payload_send = json.dumps(data_send)
    client.publish(output_topic, payload_send)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(broker_address, broker_port, 60)
client.loop_forever()