# Forester

Web UI for the Forester project. Renders two styles of raster tiles for the
world maps (credits: [https://www.openstreetmap.org/](OpenStreetMap) - streets
and [https://s2maps.eu](EOX Sentinel 2 Cloudless - terrain)) and two sets of
overlays with data from the free API of [http://resourcewatch.org](Resource Watch)
(Forest Cover Loss Data for 2001-2019 and vectorized WDPA protected areas).

## Building

```bash
npm i && npm run build
```

## Running

```bash
npm start
```

## Configuration

The application is configured via environment variables. The variables that
need to be set are in the `.env.example` file. Copy the file to `.env` and set the
values accordingly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
