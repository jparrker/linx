mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'show-map',
    style: 'mapbox://styles/mapbox/light-v10', 
    center: golfcourse.geometry.coordinates,
    zoom: 10 
});
map.addControl(new mapboxgl.NavigationControl(), 'bottom-left')

new mapboxgl.Marker()
    .setLngLat(golfcourse.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${golfcourse.title}</h3><p>${golfcourse.location}</p>`
            )
    )
    .addTo(map)