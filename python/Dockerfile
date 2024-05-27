FROM python:3.9-slim

WORKDIR /

COPY main.py .
COPY requirements.txt .

RUN pip install -r requirements.txt

CMD ["python", "./main.py"]