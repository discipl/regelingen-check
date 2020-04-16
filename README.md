# regelingen-check

## Development

```
$ docker-compose -f docker-compose.dev.yml up --build
```

## Production

```
# Expose web application through Traefik on the Docker network "proxy"

# Store production key
$ sudo mkdir -p -m750 /secrets && sudo chown root:docker /secrets
$  sudo bash -c 'echo -n "<KVK_PROD_KEY>" > /secrets/kvk_prod_key.txt'  # space intended!
$ sudo chown root:docker /secrets/kvk_prod_key.txt && sudo chmod 640 /secrets/kvk_prod_key.txt

$ docker-compose build
$ docker-compose up -d
```
