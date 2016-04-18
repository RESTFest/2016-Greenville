(function() {
  new Vue({
    data: {
      features: {}
    },
    created: function() {
      this.loadFeatures();
    },
    watch: {
      features: function() {
        /** app **/
        var map = L.map('map').setView([55.9483,-3.1969], 15);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={access_token}', {
          id: 'mapbox.light',
          access_token: 'pk.eyJ1IjoiYmlnYmx1ZWhhdCIsImEiOiJLeGNqSzFvIn0.dQINOF7Ur8PwlaKO8tZPbA',
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
        }).addTo(map);

        L.geoJson(this.features).addTo(map);
      }
    },
    methods: {
      loadFeatures: function() {
        this.$http({
          method: 'GET',
          url: 'location.geojson'
        }).then(function(resp) {
          this.$set('features', resp.data)
        }).catch(console.log.bind(console));
      }
    }
  });
})();
