# regelingen-check

## Development

```
$ docker-compose -f docker-compose.dev.yml up --build
```

## Production

```
# Expose web application through Traefik on the Docker network "proxy"

$ echo "<KVK_PROD_KEY>" > /secrets/kvk_prod_key.txt
$ docker-compose build
$ docker-compose up -d
```