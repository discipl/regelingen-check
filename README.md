# regelingen-check

## Development

```
$ docker-compose -f docker-compose.dev.yml up --build
```

## Production

```
# Expose web application through Traefik on the Docker network "proxy"

$ sudo mkdir -m600 -p /secrets
$  sudo bash -c 'echo "<KVK_PROD_KEY>" > /secrets/kvk_prod_key.txt'  # space intended!
$ sudo chmod 600 /secrets/kvk_prod_key.txt

$ docker-compose build
$ docker-compose up -d
```
