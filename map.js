// Define predefined layers
var predefinedLayers = [
    { name: 'BOUNDARY', title: 'BOUNDARY', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3ATheni_dt1&bbox=77.16572993644529%2C9.519122977234625%2C77.72971590186668%2C10.218746153613694&width=619&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers' },
    { name: 'NDVI', title: 'NDVI', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3ANDVI&bbox=79385.82300564798%2C1054460.8237073277%2C137495.82300564798%2C1125200.8237073277&width=630&height=768&srs=EPSG%3A32644&styles=&format=application/openlayers' },
    { name: 'LULC', title: 'LULC', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3Alulc&bbox=79385.82300564798%2C1054460.8237073277%2C137495.82300564798%2C1125200.8237073277&width=630&height=768&srs=EPSG%3A32644&styles=&format=application/openlayers' },
    { name: 'SLOPE', title: 'SLOPE', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3ASlope&bbox=77.163194444575%2C9.518194443258999%2C77.698750000559%2C10.162361110441&width=638&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers' },
    { name: 'MODIS FIRE DATA', title: 'MODIS FIRE DATA', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3Amodisfir&bbox=77.26819999973026%2C9.609800000269843%2C77.67620000003001%2C10.135999999700289&width=595&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers' },
    { name: 'VIIRS FIRE DATA', title: 'VIIRS FIRE DATA', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3Aviirsfire&bbox=77.1815699995559%2C9.602990000088482%2C77.68966999977073%2C10.138550000382281&width=728&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers' },
    { name: 'DISTANCE FROM RIVER', title: 'DISTANCE FROM RIVER', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3AWaterbody_MultipleRingBuffer11&bbox=83868.36479999963%2C1068059.7745961403%2C133838.36479999963%2C1116699.7745961403&width=768&height=747&srs=EPSG%3A32644&styles=&format=application/openlayers' },
    { name: 'WILDFIRE RISK ZONE', title: 'WILDFIRE RISK ZONE', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3Awildfire_change&bbox=77.1652829058669%2C9.518548750530451%2C77.73032321957808%2C10.219234672143678&width=619&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers' },
    { name: 'RAINFAL', title: 'RAINFALL', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3ARainfall_data&bbox=77.16325528767402%2C9.518208648045498%2C77.70020167745966%2C10.162116470059356&width=640&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers' },
    { name: 'DISTANCE FROM ROAD', title: 'DISTANCE FROM ROAD', url: 'http://localhost:8080/geoserver/Theni_FF/wms?service=WMS&version=1.1.0&request=GetMap&layers=Theni_FF%3AEucDist_shp11&bbox=79620.1115638715%2C1064849.9143779743%2C137125.787267995%2C1116378.2976253969&width=768&height=688&srs=EPSG%3A32644&styles=&format=application/openlayers' },
];

// Initialize OpenLayers map and layers
var view = new ol.View({
    projection: 'EPSG:4326',
    center: [77.4735,10.0079],
    zoom: 9,
});

var base_maps = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
        new ol.layer.Tile({
            title: 'Satellite',
            type: 'base',
            visible: true,
            source: new ol.source.XYZ({
                attributions: ['Powered by Esri',
                    'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
                ],
                attributionsCollapsible: false,
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                maxZoom: 23
            })
        }),
        new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        })
    ]
});

overlays = new ol.layer.Group({
    'title': 'Overlays',
    layers: []
});

map = new ol.Map({
    target: 'map',
    view: view,
});

map.addLayer(base_maps);
map.addLayer(overlays);

var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: true,
    tipLabel: 'Layers',
    groupSelectStyle: 'children',
    collapseTipLabel: 'Collapse layers',
});
map.addControl(layerSwitcher);

layerSwitcher.renderPanel();

// Function to add selected layer to the map
function add_layer() {
    var predefinedLayer = document.querySelector('input[name="predefinedLayer"]:checked');
    if (predefinedLayer) {
        var layerName = predefinedLayer.value;
        var selectedLayer = predefinedLayers.find(layer => layer.name === layerName);

        // Ensure a valid selected layer
        if (selectedLayer) {
            var wmsSource = new ol.source.TileWMS({
                url: selectedLayer.url,
                params: {
                    'BOUNDARY': '	Theni_FF:Theni_dt1',
                    'NDVI': '	Theni_FF:NDVI',
                    'LULC': '	Theni_FF:lulc',
                    'SLOPE':'	Theni_FF:Slope',
                     'MODIS FIRE DATA':'Theni_FF:modisfir',
                     'VIIRS FIRE DATA':'Theni_FF:viirsfire',
                     'DISTANCE FROM RIVER':'Theni_FF:Waterbody_MultipleRingBuffer11',
                     'WILDFIRE RISK ZONE':'	Theni_FF:wildfire_change',
                     'DISTANCE FROM ROAD':'Theni_FF:EucDist_shp11',
                     'RAINFALL':'	Theni_FF:Rainfall_data',
                    'TILED': true
                },
                serverType: 'geoserver'
            });

            var wmsLayerTile = new ol.layer.Tile({
                source: wmsSource,
                title: selectedLayer.title
            });

            // Add the layer to the overlays group and render the layer switcher
            overlays.getLayers().push(wmsLayerTile);
            layerSwitcher.renderPanel();

            // Close the modal after adding the layer
         //   var modal = new bootstrap.Modal(document.getElementById('wms_layers_window'));
            modal.hide();
        } else {
            alert("Selected layer not found.");
        }
    } else {
        alert("Please select a layer.");
    }
}

// Function to open the modal dialog
function wms_layers() {
    var modal = new bootstrap.Modal(document.getElementById('wms_layers_window'));
    modal.show();
}

//Function to close the modal dialog
function close_wms_window() {
    console.log('close_wms_window')
    // console.log('wms_layers_window :'+document.getElementById('wms_layers_window').value)
    var modal = new bootstrap.Modal(document.getElementById('wms_layers_window'));
    console.log('modal :'+modal);
    modal.hide();
}



// Other functions like clear_all(), show_hide_legend(), info(), etc. can remain unchanged as per your needs

var mouse_position = new ol.control.MousePosition();
map.addControl(mouse_position);
var slider = new ol.control.ZoomSlider();
map.addControl(slider);



var zoom_ex = new ol.control.ZoomToExtent({
    extent: [
        65.90, 7.48,
        98.96, 40.30
    ]
});
map.addControl(zoom_ex);

var scale_line = new ol.control.ScaleLine({
    units: 'metric',
    bar: true,
    steps: 6,
    text: true,
    minWidth: 140,
    target: 'scale_bar'
});
map.addControl(scale_line);

layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: true,
    tipLabel: 'Layers',
    groupSelectStyle: 'children', 
    collapseTipLabel: 'Collapse layers',
});
map.addControl(layerSwitcher);

layerSwitcher.renderPanel();

var geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    lang: 'en',
    placeholder: 'Search for ...',
    limit: 5,
    debug: false,
    autoComplete: true,
    keepOpen: true
});
map.addControl(geocoder);

geocoder.on('addresschosen', function(evt) {
    //console.info(evt);
    if (popup) {
        popup.hide();
    }
    window.setTimeout(function() {
        popup.show(evt.coordinate, evt.address.formatted);
    }, 3000);
});

//custom Scale

function scale() {
    var resolution = map.getView().get('resolution');

    var units = map.getView().getProjection().getUnits();

    var dpi = 25.4 / 0.28;
    var mpu = ol.proj.Units.METERS_PER_UNIT[units];
    //alert(resolution);
    var scale = resolution * mpu * 39.37 * dpi;
    //alert(scale);
    if (scale >= 9500 && scale <= 950000) {
        scale = Math.round(scale / 1000) + "K";
    } else if (scale >= 950000) {
        scale = Math.round(scale / 1000000) + "M";
    } else {
        scale = Math.round(scale);
    }
    document.getElementById('scale_bar1').innerHTML = "Scale = 1 : " + scale;
}
scale();

map.getView().on('change:resolution', scale);