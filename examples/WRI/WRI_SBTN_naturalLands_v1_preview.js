var dataset = ee.Image('WRI/SBTN/naturalLands/v1/2020').select('natural');

var lon = 0;
var lat = 0;

Map.setCenter(lon, lat, 3);

// Degrees in EPSG:4326
var delta = 180;
// Width and height of the thumbnail image.
var pixels = 256;

var areaOfInterest = ee.Geometry.Rectangle(
    [lon - delta, lat - delta, lon + delta, lat + delta], null, false);

var visParams = {
  dimensions: [pixels, pixels],
  region: areaOfInterest,
  crs: 'EPSG:4326',
  format: 'png',
};

var waterLand = ee.Image('NOAA/NGDC/ETOPO1').select('bedrock').gt(0.0);
var waterLandBackground =
    waterLand.visualize({palette: ['cadetblue', 'lightgray']});
Map.addLayer(waterLandBackground);

var imageWithBg = waterLandBackground.blend(dataset.visualize({}));

print(ui.Thumbnail({image: imageWithBg, params: visParams}));

Map.addLayer(imageWithBg, {}, 'Natural Lands');
