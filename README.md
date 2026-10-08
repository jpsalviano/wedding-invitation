Our wedding invitation (22/05/2024): a static page, served at
[jpsalviano.com.br/casamento](https://jpsalviano.com.br/casamento/).

`.github/workflows/ci.yml` builds the image (nginx serving the files under
`/casamento/`) and publishes it as `ghcr.io/jpsalviano/wedding-invitation:<commit>`.
The site's repo pins that image by tag: to release a change, push here, wait
for the CI, then change the tag there.

To try it locally:

```
docker build -t wedding-invitation . && docker run --rm -p 8080:80 wedding-invitation
```

and open http://localhost:8080/casamento/.
